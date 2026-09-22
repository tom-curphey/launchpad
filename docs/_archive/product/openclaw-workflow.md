> **Archived 2026-09-22.** OpenClaw as the conversational control room. Replaced: the browser dashboard is the first interface, and Eve is the agent runtime for now. Chat-app control is kept only as a possible future interface.
>
> **Replaced by:** [product/dashboard.md](../../product/dashboard.md) · [ai/agent-harness.md](../../ai/agent-harness.md) · [scope/future.md](../../scope/future.md)

---

# Activatus Launchpad — Full Workflow with OpenClaw

> The end-to-end Launchpad workflow with OpenClaw as the conversational control room — where it sits, how it connects, and the one-door rule.

---

## Purpose

This document maps the full Launchpad workflow end-to-end and shows where **OpenClaw** — the human-facing conversational control layer — sits within it.

**Related docs:**

- [Decision Docs](decision-docs.md) — the Pitch → Assemble → Deploy architecture review
- [Assignment](assignment.md) — assignment, dispatch rules, Linear ownership
- [Overview](overview.md) — the complete Launchpad guide

---

## The Full Workflow

```
                         ┌──────────────────────────┐
                         │          HUMAN           │
                         │                          │
                         │ Product decisions        │
                         │ Approvals                │
                         │ Questions / Commands     │
                         │ Manual development work  │
                         │ UAT / Release approval   │
                         └────────────┬─────────────┘
                                      │
                         ┌────────────┴─────────────┐
                         │                          │
                         ▼                          │
              ┌──────────────────────┐              │
              │      OPENCLAW        │              │
              │                      │              │
              │ Conversational       │              │
              │ Control Room         │              │
              │                      │              │
              │ • What's happening?  │              │
              │ • What's blocked?    │              │
              │ • What needs me?     │              │
              │ • Who is doing what? │              │
              │ • Run / pause work   │              │
              │ • Relay decisions    │              │
              │ • Reassign work      │              │
              │ • Is UAT ready?      │              │
              │ • Can we deploy?     │              │
              └──────────┬───────────┘              │
                         │                          │
                         │ Launchpad API / MCP      │
                         ▼                          │
┌─────────────────────────────────────────────────────────────────────┐
│                       LAUNCHPAD ENGINE                              │
│                                                                     │
│                  ORCHESTRATION — NOT AN AGENT                       │
│                                                                     │
│  Understands:                                                       │
│                                                                     │
│  • What work is ready                                               │
│  • Who each ticket is assigned to                                   │
│  • Dependencies                                                     │
│  • What can run in parallel                                         │
│  • What is blocked                                                  │
│  • What has passed / failed                                         │
│  • What requires human judgment                                     │
│  • What is ready for UAT                                            │
│  • What is approved for production                                  │
│  • What should happen next                                          │
│                                                                     │
│  DOES NOT silently reassign approved work                           │
└───────────────┬───────────────────────────────┬─────────────────────┘
                │                               ▲
                │ reads / writes                │ events / status
                ▼                               │
       ┌──────────────────┐            ┌────────┴─────────┐
       │      LINEAR      │◄───────────│  GITHUB / GIT    │
       │                  │            │                  │
       │ Source of truth  │            │ Branches         │
       │ for approved     │            │ Commits          │
       │ tickets +        │            │ Pull Requests    │
       │ assignment       │            │ CI / Tests       │
       └────────┬─────────┘            └────────▲─────────┘
                │                               ▲
                │ ready ticket                  │
                ▼                               │
       ┌──────────────────────┐                 │
       │   ENGINE EVALUATES   │                 │
       │      NEXT WORK       │                 │
       │                      │                 │
       │ • READY?             │                 │
       │ • BLOCKED?           │                 │
       │ • DEPENDENCIES?      │                 │
       │ • PARALLEL?          │                 │
       └──────────┬───────────┘                 │
                  │                             │
                  ▼                             │
       ┌──────────────────────┐                 │
       │    CHECK ASSIGNEE    │                 │
       └──────────┬───────────┘                 │
                  │                             │
          ┌───────┴─────────┬───────────────┐   │
          │                 │               │   │
          ▼                 ▼               ▼   │
 ┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐
 │   AI ASSIGNEE   │ │ HUMAN ASSIGNEE  │ │   UNASSIGNED    │
 │                 │ │                 │ │                 │
 │ Alex / Marcus / │ │ Tom / Developer │ │ No owner yet    │
 │ Sophie / etc.   │ │                 │ │                 │
 └────────┬────────┘ └────────┬────────┘ └────────┬────────┘
          │                   │                   │
          │                   │                   ▼
          │                   │          ┌──────────────────┐
          │                   │          │ DO NOT EXECUTE   │
          │                   │          │                  │
          │                   │          │ Wait for human   │
          │                   │          │ assignment in    │
          │                   │          │ Linear           │
          │                   │          └──────────────────┘
          │                   │
          ▼                   ▼
 ┌─────────────────┐  ┌──────────────────────────┐
 │   JOB / RUNNER  │  │     HUMAN DEVELOPER      │
 │                 │  │                          │
 │ Prepare context │  │ Works normally on their  │
 │ for AI agent:   │  │ computer using:          │
 │                 │  │                          │
 │ • Linear ticket │  │ • Linear                 │
 │ • Decision Docs │  │ • IDE / Terminal         │
 │ • Repo          │  │ • GitHub                 │
 │ • Dependencies  │  │ • Figma                  │
 │ • Acceptance    │  │ • Supabase               │
 │   criteria      │  │ • Browser / tools        │
 └────────┬────────┘  │                          │
          │           │ OpenClaw is NOT required │
          ▼           │ to perform manual work   │
 ┌─────────────────┐  └────────────┬─────────────┘
 │  CODING AGENT   │               │
 │                 │               │
 │ Named AI worker │               │
 │                 │               │
 │ Builds the work │               │
 └────────┬────────┘               │
          │                        │
          └───────────┬────────────┘
                      │
                      ▼
             ┌─────────────────────┐
             │ IMPLEMENTATION      │
             │ COMPLETE / READY    │
             │ FOR VERIFICATION    │
             └──────────┬──────────┘
                        │
                        ▼
             ┌─────────────────────┐
             │  TECHNICAL CHECKS   │
             │                     │
             │ • Unit tests        │
             │ • Integration       │
             │ • Type check        │
             │ • Build             │
             │ • E2E               │
             │ • Review            │
             └──────────┬──────────┘
                        │
                  ┌─────┴─────┐
                  │           │
                FAIL         PASS
                  │           │
                  ▼           ▼
           ┌────────────┐  ┌─────────────────┐
           │ FIX / RETRY│  │    CREATE PR    │
           └──────┬─────┘  └────────┬────────┘
                  │                 │
                  │                 └──────────────────────► GITHUB / GIT
                  │
                  └──► Return to current assignee
                       Human or AI


                         GITHUB / GIT
                              │
                              ▼
                    ┌───────────────────┐
                    │ HUMAN-READABLE PR │
                    │                   │
                    │ • What changed    │
                    │ • Why             │
                    │ • User impact     │
                    │ • Decision links  │
                    │ • Testing         │
                    └─────────┬─────────┘
                              │
                              ▼
                        REVIEW / MERGE
                              │
                              ▼
                    MERGE TO UAT / STAGING
                              │
                              ▼
             ┌────────────────────────────────┐
             │             DEPLOY             │
             │                                │
             │      USER ACCEPTANCE TESTING   │
             │                                │
             │ Launchpad presents the human   │
             │ with what needs to be checked  │
             │                                │
             │ • Intended outcome             │
             │ • Expected behaviour           │
             │ • Relevant Decision Docs       │
             │ • UAT steps                    │
             │ • Approval / Report Issue      │
             └───────────────┬────────────────┘
                             │
                       ┌─────┴─────┐
                       │           │
                     FAIL        APPROVE
                       │           │
                       ▼           ▼
              ┌────────────────┐  ┌────────────────────┐
              │ CLASSIFY ISSUE │  │ PRODUCTION READY   │
              └───────┬────────┘  └─────────┬──────────┘
                      │                     │
          ┌───────────┼───────────┐         ▼
          │           │           │   MERGE / PROMOTE
          ▼           ▼           ▼    TO PRODUCTION
   ┌────────────┐ ┌────────────┐ ┌────────────┐
   │ BUILD      │ │ MISSING    │ │ DECISION   │
   │ ISSUE      │ │ WORK       │ │ ISSUE      │
   └─────┬──────┘ └─────┬──────┘ └─────┬──────┘
         │              │              │
         ▼              ▼              ▼
     ASSEMBLE        ASSEMBLE         PITCH
         │              │              │
         │              │              ▼
         │              │       UPDATE DECISION DOC
         │              │              │
         └──────────────┴───────┬──────┘
                                │
                                ▼
                         UPDATE / CREATE WORK
                                │
                                ▼
                       TECHNICAL CHECKS AGAIN
                                │
                                ▼
                              PASS
                                │
                                ▼
                           UAT AGAIN


                    MERGE / PROMOTE TO PRODUCTION
                                │
                                ▼
                    ┌────────────────────────┐
                    │  PRODUCTION DEPLOYMENT │
                    └────────┬───────────────┘
                                 │
                                 ▼
                    ┌────────────────────────┐
                    │      VERIFY LIVE       │
                    │                        │
                    │ • Production healthy   │
                    │ • Routes working       │
                    │ • Migrations applied   │
                    │ • Critical flows work  │
                    └────────────┬───────────┘
                                 │
                           ┌─────┴─────┐
                           │           │
                         FAIL        PASS
                           │           │
                           ▼           ▼
                     ROLLBACK /      ┌──────────────┐
                     FIX ISSUE       │ LIVE PRODUCT │
                           │         └──────┬───────┘
                           │                │
                           └────────┐       ▼
                                    │  LINEAR UPDATED
                                    │       │
                                    │       ▼
                                    │ ┌───────────────────┐
                                    │ │ LAUNCHPAD ENGINE  │
                                    │ │                   │
                                    │ │ Re-evaluate whole │
                                    │ │ dependency graph  │
                                    │ └─────────┬─────────┘
                                    │           │
                                    │           ▼
                                    │     NEXT READY WORK
                                    │           │
                                    │           └──────────► LOOP
                                    │
                                    └──► Issue returns to
                                         appropriate workflow
```

---

## OpenClaw's Role

OpenClaw sits above Launchpad as the human-facing conversational control layer. Launchpad remains the system that owns product intent, decisions, ticket relationships, dependencies, orchestration, UAT state and overall project progress. OpenClaw does not replace the Launchpad engine and it does not directly perform development work. Instead, it gives the human a natural way to ask Launchpad what is happening and to issue commands without needing to inspect every ticket, agent, PR or dependency manually.

Through OpenClaw, a user should be able to ask things like "What is Alex working on?", "What is blocked?", "What needs my attention?", "Who is working on authentication?", "Is UAT ready?", or "Assign this ticket to Sophie." OpenClaw translates those requests into actions or queries against Launchpad, then reports the result back in clear human language. In that sense, Launchpad is the orchestration brain and source of project intelligence, while OpenClaw is the conversational control room that lets the human understand and steer that system.

---

## OpenClaw Integration Model

*Confirmed 2026-09-02.*

### What OpenClaw is (and isn't)

OpenClaw is the **existing assistant harness** running on the user's Mac — it hears messages, spins up a Claude session with tools, and returns the answer. **Claude is the intelligence; OpenClaw is the rig around the conversation.** Launchpad does **not** build a chat UI — the chat already exists.

### Two independent axes

**Where you talk from (channels)** and **what OpenClaw reaches into (sources)** are separate:

| You're at | "Why" questions (Mac files) | "Right now" questions (Launchpad MCP) |
|---|---|---|
| Terminal (today) | ✅ works now | ❌ until the MCP server exists |
| Telegram (once wired) | ✅ works | ❌ until the MCP server exists |

The channel never changes what is answerable — the **source** does. Some questions mix both: *"Why is LP-142 blocked?"* needs live state (which ticket blocks it) *and* files (the Decision Doc explaining why that dependency exists).

### Two kinds of questions

| Bucket | Example | Answered by |
|---|---|---|
| **Static knowledge** (the WHY) | "Why are we using GitHub auth?" | Claude reads Decision Docs as files — works today, no Launchpad involvement |
| **Live state** (the NOW) | "What's blocked?" "What needs me?" "Is UAT ready?" "Assign LP-142 to Sophie" | Claude calls **Launchpad MCP tools** — state lives in Supabase/Linear, not in files |

### Connection phases

1. **OpenClaw → Mac files** ✅ works today — Claude reads `docs/` and answers "why" questions. Zero build.
2. **OpenClaw → Telegram** — pure OpenClaw channel config; nothing to do with Launchpad's code.
3. **OpenClaw → Launchpad** — the one Launchpad build: an **MCP server** exposing live state and actions.

### The one-door rule

> **OpenClaw connects to Launchpad only — never directly to Linear or Supabase.**

Claude-inside-OpenClaw is just **another client of the Launchpad API** (same as the web UI). It never touches the database directly, and the engine keeps enforcing the rules — no silently reassigning approved work, no dispatching to human-assigned tickets, product decisions bounce to the human. Claude can *ask* for anything; the engine decides what is allowed. This keeps OpenClaw the control room, not a second brain.

```
Telegram / terminal → OpenClaw (Claude) → Launchpad MCP → Engine → Linear / GitHub / Supabase
```

### The Launchpad MCP server (built)

- **Endpoint:** `POST /api/mcp` — stateless JSON-RPC (MCP Streamable HTTP), single JSON response per call
- **Auth:** `Authorization: Bearer <LAUNCHPAD_MCP_TOKEN>` (env var; requests without it get `401`)
- **v1 tools (read-only, honest to what exists today):**
  - `list_projects` — all projects with status and draft-ticket counts
  - `get_project` — project detail incl. pitch answers summary and board summary
  - `get_draft_tickets` — the full AI-generated draft board: columns, milestones, tickets with dependencies
- **Later tools** (as the underlying features exist): needs-you queue, UAT checklist status, reassign ticket, record decision, approve UAT check

### Connecting OpenClaw

Register an MCP server in OpenClaw's config with:

- **URL:** `http://localhost:3000/api/mcp` (dev — for phone use via Telegram, Launchpad must be reachable from the internet, e.g. deployed or tunneled)
- **Header:** `Authorization: Bearer <value of LAUNCHPAD_MCP_TOKEN>`

---

*Last updated: 2 September 2026*

---

*Sections 18–19 from the ticket assignment decision log.*

## 18. OpenClaw Uses Agent Names

OpenClaw is the conversational interface into this project state.

**See also:** this document — the full workflow map showing where OpenClaw sits above the Launchpad engine.

Named AI agents make project discussions much easier.

The user should be able to ask:

> What is Alex working on?

> What has Marcus completed?

> Is Sophie blocked?

> Who is working on authentication?

> What tickets does Tom have?

> What is Tom currently blocking?

> Give LP-142 to Sophie.

> Assign the remaining onboarding tickets to Alex.

OpenClaw should translate these conversational instructions into Launchpad / Linear actions where appropriate.

---

## 19. Example OpenClaw Project Update

Instead of:

> Agent 1 has completed LP-103. Agent 2 is blocked on LP-106. Three human tasks remain.

OpenClaw should communicate naturally:

> Alex has finished the authentication API and opened a PR.
>
> Marcus is working on the database migration.
>
> Sophie is currently blocked waiting for Marcus to finish LP-106.
>
> Tom has two ready tickets assigned to him: the settings screen and production Stripe configuration.

This makes the AI development environment feel understandable without hiding the underlying ticket structure.

---

