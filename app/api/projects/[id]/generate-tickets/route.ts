import { auth } from "@/lib/auth"
import { supabase } from "@/lib/supabase"
import {
  generateTicketBreakdown,
  TicketBreakdownError,
} from "@/lib/agents/ticket-breakdown-agent"
import { NextRequest, NextResponse } from "next/server"
import Anthropic from "@anthropic-ai/sdk"

// Ticket generation can run for minutes on a big pitch — use the full window
export const maxDuration = 300

interface DraftTicketsStorage {
  columns: unknown[]
  generatedAt: string | null
  linearProjectId: string | null
  submittedAt: string | null
}

// Helper to ensure user exists in Supabase
async function ensureUser(email: string, name: string, image?: string | null) {
  const { data: user } = await supabase
    .from("users")
    .select("id")
    .eq("email", email)
    .single()

  if (user) {
    return user
  }

  const { data: newUser, error: createError } = await supabase
    .from("users")
    .insert({
      email,
      name,
      avatar_url: image,
      username: email.split("@")[0],
      updated_at: new Date().toISOString(),
    })
    .select()
    .single()

  if (createError) {
    throw new Error("Failed to create user")
  }

  return newUser
}

// POST /api/projects/[id]/generate-tickets
// Runs the AI ticket breakdown on the project's pitch answers and
// saves the result to projects.draft_tickets
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const session = await auth()

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const user = await ensureUser(session.user.email!, session.user.name!, session.user.image)

    const { data: project } = await supabase
      .from("projects")
      .select("id, name, pitch_answers, draft_tickets")
      .eq("id", id)
      .eq("user_id", user.id)
      .single()

    if (!project) {
      return NextResponse.json(
        { error: "Project not found" },
        { status: 404 }
      )
    }

    const answers = (project.pitch_answers as Record<string, string>) || {}
    const answeredCount = Object.values(answers).filter(
      (a) => typeof a === "string" && a.trim().length > 0
    ).length

    if (answeredCount === 0) {
      return NextResponse.json(
        { error: "Answer some pitch questions before generating tickets" },
        { status: 400 }
      )
    }

    const existing = (project.draft_tickets as DraftTicketsStorage | null) || null
    if (existing?.submittedAt) {
      return NextResponse.json(
        {
          error:
            "These draft tickets were already submitted to Linear — regenerating would break the Linear mapping",
        },
        { status: 409 }
      )
    }

    const result = await generateTicketBreakdown({
      projectName: project.name || "Untitled project",
      pitchAnswers: answers,
    })

    const generatedAt = new Date().toISOString()
    const draftTickets = {
      columns: result.columns,
      generatedAt,
      linearProjectId: existing?.linearProjectId ?? null,
      submittedAt: existing?.submittedAt ?? null,
    }

    const { error: updateError } = await supabase
      .from("projects")
      .update({ draft_tickets: draftTickets })
      .eq("id", id)

    if (updateError) {
      console.error("Error saving draft_tickets:", updateError)
      return NextResponse.json(
        { error: "Failed to save generated tickets" },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      generatedAt,
      ticketCount: result.ticketCount,
      draftTickets,
    })
  } catch (error) {
    if (error instanceof TicketBreakdownError) {
      console.error("Ticket breakdown failed:", error.message)
      return NextResponse.json({ error: error.message }, { status: error.status })
    }
    if (error instanceof Anthropic.AuthenticationError) {
      console.error("Anthropic authentication failed — check ANTHROPIC_API_KEY")
      return NextResponse.json(
        { error: "AI service is not configured correctly" },
        { status: 500 }
      )
    }
    if (error instanceof Anthropic.RateLimitError) {
      return NextResponse.json(
        { error: "AI service is busy — try again in a moment" },
        { status: 429 }
      )
    }
    if (error instanceof Anthropic.APIError) {
      console.error(`Anthropic API error ${error.status}:`, error.message)
      return NextResponse.json(
        { error: "AI service error — try again" },
        { status: 502 }
      )
    }
    console.error("Error in generate-tickets API:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
