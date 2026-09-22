# Architecture — System

> The system's shape, its layers and the current technology stack.

**Status:** Current plan · **Updated:** 2026-09-22

## Decision

### Four layers

```text
AI ACCOUNT / PROVIDER   = authentication + model usage + billing (the customer's own)
LAUNCHPAD               = product knowledge + project state + orchestration (Engine)
AGENT RUNTIME           = runs individual agent tasks (Eve)
AGENT                   = specialist reasoning + tool use for one task
```

### Control layer

```text
                         HUMAN
                  Browser Dashboard (phone-friendly)
                           │
                       LAUNCHPAD  (Next.js app on Vercel)
              Product Knowledge │ Project Control
                           │
                    Launchpad Engine  (deterministic)
          ┌────────────────┼────────────────┐
     Planning Agent     Dev Agent       Review Agent
          └────────────────┼────────────────┘
                   Agent Runtime: Eve
          ┌────────────────┼────────────────┐
     Models (BYO)     Sandbox           Integrations
  Claude/OpenAI/…   repo + commands    GitHub / Linear
                           │
                  Supabase (Postgres, Auth, pgvector)
```

### Stack

| Area | Choice |
|---|---|
| Frontend + backend | Next.js (App Router) + React + TypeScript |
| Styling | Tailwind CSS |
| Database / auth | Supabase: Postgres, Supabase Auth with GitHub, `pgvector` |
| Agent runtime | Eve. See [AI — Agent Harness](../ai/agent-harness.md) |
| Hosting | Vercel. See [Hosting](hosting.md) |
| Source control | GitHub |
| Approved work | Linear |
| Validation | Zod |
| Code standards | Hide & Seek Digital standards. See [Coding Standards](../development/coding-standards.md) |

## Legacy implementation

1. Next.js 16.3, React 19, Tailwind v4 and Zod 4 are in place.
2. Auth is NextAuth v5 with GitHub, not Supabase Auth.
3. There's a direct Anthropic SDK dependency.
4. There are no Engine, Eve, sandbox or integration layers yet.

## Related

- [Product — Source of Truth](../product/source-of-truth.md)
- [Product — Launchpad Engine](../product/launchpad-engine.md)
