/**
 * Ticket Breakdown Agent
 *
 * Converts pitch answers into a structured draft ticket board:
 * columns of feature areas, each holding human-sized tickets with
 * dependencies mapped (deps/blocks at ticket level, dependsOnColumns
 * at column level).
 *
 * Output is schema-constrained via structured outputs, then normalized
 * in code: dangling references repaired, deps/blocks made consistent,
 * column phases (P1/P2/...) recalculated from the dependency graph and
 * ticket order re-indexed.
 */

import Anthropic from "@anthropic-ai/sdk"
import { z } from "zod"
import { zodOutputFormat } from "@anthropic-ai/sdk/helpers/zod"
import { PITCH_SECTIONS } from "@/lib/pitch-questions"

// ---------- Schemas (shape matches projects.draft_tickets in the DB) ----------

export const DraftTicketSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  deps: z.array(z.string()),
  blocks: z.array(z.string()),
  order: z.number().int(),
})

export const DraftColumnSchema = z.object({
  id: z.string(),
  name: z.string(),
  dependsOnColumns: z.array(z.string()),
  milestone: z.string(),
  tickets: z.array(DraftTicketSchema),
})

export const TicketBreakdownSchema = z.object({
  columns: z.array(DraftColumnSchema),
})

export type DraftTicket = z.infer<typeof DraftTicketSchema>
export type DraftColumn = z.infer<typeof DraftColumnSchema>

// ---------- Agent ----------

const MODEL = "claude-fable-5"
// Streaming request, so we can afford headroom for a big board plus thinking
const MAX_TOKENS = 64000

const SYSTEM_PROMPT = `You are a senior technical product manager and tech lead. You convert a product pitch into an implementation board: columns of feature areas, each containing granular, human-sized development tickets.

## Ticket sizing rules (critical)

Every ticket must satisfy ALL of these:

1. ONE thing per ticket — a single feature or a single UI component with a single testable outcome. Never bundle two features into one ticket.
2. Large enough to deserve its own test file.
3. Small enough for one human to complete in a single day.
4. The resulting pull request should take a reviewer 10-15 minutes.

Anti-patterns (never generate these):
- "Build authentication system" — far too broad. Split it: auth provider setup, session handling, sign-in page, sign-out, protected route middleware, auth error states...
- "Fix bugs", "Polish", "Setup" — not outcomes.
- Tickets covering two user-visible behaviours, or needing "and then" in the description.

If a feature would take more than a day, split it into separate tickets for UI, logic/state, data, integration, and error/edge-case handling as appropriate.

## Ticket count

Do NOT target a specific number of tickets. Generate every ticket the product genuinely needs at this granularity — for most products this is a large number, often well over 100. Under-generating is a failure; so is filler. Every ticket must be real work this product needs.

## Columns

- Group tickets into coherent feature areas (typically 4-8 columns).
- id: short kebab-case (e.g. "auth", "billing-ui").
- name: human label with one fitting emoji (e.g. "🔐 Authentication").
- dependsOnColumns: ids of columns whose work must be complete before this column starts. Must form a DAG — no cycles. Foundational columns (project scaffolding, database/schema, auth) typically have none.
- milestone: write "P?: <column name without emoji>" — phase numbers are calculated from the dependency graph afterwards; you do not need to get them right.

## Ticket fields

- id: "{COLUMN_PREFIX}-{n}" — prefix is the column id uppercased, numbered sequentially. Ids must be unique across the whole board.
- title: imperative, specific, outcome-focused (e.g. "Add password reset request form").
- description: 1-2 sentences — what to build plus the key constraint or acceptance hint. Concrete enough that a test file could be written from it.
- deps: ticket ids that must be completed first (may live in other columns).
- blocks: ticket ids that cannot start until this one is done.
- Keep deps/blocks mutually consistent: if A lists B in blocks, B must list A in deps. Never reference a ticket id that does not exist. No circular chains.

## Fidelity to the pitch

Base the board only on what the pitch answers support. Where answers are thin, cover the minimal credible path for that feature area — do not invent product features nobody asked for.`

export class TicketBreakdownError extends Error {
  constructor(
    message: string,
    public readonly status: number
  ) {
    super(message)
  }
}

function buildUserContent(
  projectName: string,
  pitchAnswers: Record<string, string>
): string {
  const lines: string[] = [`# Project: ${projectName}`, "", "## Pitch answers", ""]

  for (const section of PITCH_SECTIONS) {
    lines.push(`### ${section.title}`, "")
    for (const question of section.questions) {
      const answer = pitchAnswers[question.id]?.trim()
      lines.push(`**${question.question}**`)
      lines.push(answer || "(not answered)")
      lines.push("")
    }
  }

  return lines.join("\n")
}

/**
 * Repair and finalize a model-generated board:
 * - drop empty columns and references to them
 * - drop dangling / self ticket references, de-duplicate
 * - make deps/blocks mutually consistent
 * - recalculate milestone phases from the column dependency DAG (cycle-safe)
 * - re-index ticket order within each column
 */
export function normalizeBreakdown(columns: DraftColumn[]): DraftColumn[] {
  // 1. Drop empty columns
  const nonEmpty = columns.filter((c) => c.tickets.length > 0)

  // 2. Remove references to dropped columns
  const keptColumnIds = new Set(nonEmpty.map((c) => c.id))
  const withCleanColumnDeps = nonEmpty.map((c) => ({
    ...c,
    dependsOnColumns: c.dependsOnColumns.filter((id) => keptColumnIds.has(id)),
  }))

  // 3. Drop dangling/self ticket references, de-duplicate
  const ticketIds = new Set(
    withCleanColumnDeps.flatMap((c) => c.tickets.map((t) => t.id))
  )
  const withCleanTicketRefs = withCleanColumnDeps.map((c) => ({
    ...c,
    tickets: c.tickets.map((t) => ({
      ...t,
      deps: [...new Set(t.deps)].filter((id) => id !== t.id && ticketIds.has(id)),
      blocks: [...new Set(t.blocks)].filter((id) => id !== t.id && ticketIds.has(id)),
    })),
  }))

  // 4. Make deps/blocks mutually consistent (A blocks B <=> B deps A)
  const byId = new Map<string, DraftTicket>()
  for (const c of withCleanTicketRefs) {
    for (const t of c.tickets) byId.set(t.id, t)
  }
  for (const t of byId.values()) {
    for (const depId of t.deps) {
      const dep = byId.get(depId)
      if (dep && !dep.blocks.includes(t.id)) dep.blocks.push(t.id)
    }
    for (const blockId of t.blocks) {
      const blocked = byId.get(blockId)
      if (blocked && !blocked.deps.includes(t.id)) blocked.deps.push(t.id)
    }
  }

  // 5. Column phases from the dependency DAG (longest path, cycle-safe)
  const depth = new Map<string, number>()
  const columnOf = (id: string) => withCleanTicketRefs.find((c) => c.id === id)
  function columnDepth(id: string, seen: Set<string>): number {
    const memoized = depth.get(id)
    if (memoized !== undefined) return memoized
    if (seen.has(id)) return 0 // cycle guard: treat the back-edge as a root
    seen.add(id)
    const deps = columnOf(id)?.dependsOnColumns ?? []
    const d =
      deps.length === 0 ? 1 : Math.max(...deps.map((dep) => columnDepth(dep, seen) + 1))
    depth.set(id, d)
    return d
  }

  // 6. Recalculate milestones, re-index order
  return withCleanTicketRefs.map((c) => {
    const phase = columnDepth(c.id, new Set())
    const cleanName = c.name.replace(/^[^\p{L}\p{N}]+/u, "").trim()
    return {
      ...c,
      milestone: `P${phase}: ${cleanName || c.id}`,
      tickets: c.tickets.map((t, i) => ({ ...t, order: i })),
    }
  })
}

export interface TicketBreakdownResult {
  columns: DraftColumn[]
  ticketCount: number
}

export async function generateTicketBreakdown(input: {
  projectName: string
  pitchAnswers: Record<string, string>
}): Promise<TicketBreakdownResult> {
  if (!process.env.ANTHROPIC_API_KEY) {
    throw new TicketBreakdownError(
      "AI service is not configured (missing ANTHROPIC_API_KEY)",
      500
    )
  }

  const client = new Anthropic()

  // fallbacks: "default" — if Fable declines for safety reasons the API
  // re-runs the request on a fallback model within the same call
  const stream = client.beta.messages.stream({
    model: MODEL,
    max_tokens: MAX_TOKENS,
    betas: ["server-side-fallback-2026-07-01"],
    fallbacks: "default",
    thinking: { type: "adaptive" },
    system: [
      {
        type: "text",
        text: SYSTEM_PROMPT,
        cache_control: { type: "ephemeral" },
      },
    ],
    messages: [
      {
        role: "user",
        content: buildUserContent(input.projectName, input.pitchAnswers),
      },
    ],
    output_config: {
      format: zodOutputFormat(TicketBreakdownSchema),
    },
  })

  const message = await stream.finalMessage()

  if (message.stop_reason === "refusal") {
    throw new TicketBreakdownError(
      "The AI declined to generate tickets for this project",
      502
    )
  }
  if (message.stop_reason === "max_tokens") {
    throw new TicketBreakdownError(
      "Ticket generation ran out of room mid-board — try again",
      502
    )
  }

  const parsed = message.parsed_output
  if (!parsed) {
    throw new TicketBreakdownError(
      "AI response could not be parsed into a ticket board",
      502
    )
  }

  const columns = normalizeBreakdown(parsed.columns)
  const ticketCount = columns.reduce((n, c) => n + c.tickets.length, 0)

  return { columns, ticketCount }
}
