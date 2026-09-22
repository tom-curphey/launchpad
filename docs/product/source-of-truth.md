# Product — Source of Truth

> Which system owns which data, and the one-project-one-repository invariant.

**Status:** Decided · **Updated:** 2026-09-22

## Decision

Launchpad doesn't replace tools that already own part of the software lifecycle. It may display and interpret their data, but it must not create competing sources of truth.

| Owner | Owns |
|---|---|
| **Launchpad / Supabase** | Pitch, Product Definition, Decision Docs, Draft Tickets and their relationships, Workflow relationships, orchestration state, agent run state, UAT context, product context, user and project configuration |
| **Linear** | Approved implementation work: Linear Ticket ID, status, assignee, implementation lifecycle |
| **GitHub** | Repository, branches, commits, Pull Requests, code history |

**Hard invariant:** one Launchpad Project = exactly one Git repository.

## Why

Duplicated state drifts. Once a Draft Ticket is approved and sent to Linear, Linear is the only place its status and assignee change. Launchpad reads that state and reacts to it.

## Legacy implementation

1. A `projects` row stores `linear_team_id` and `linear_project_id`, and Draft Tickets are stored as JSONB in `projects.draft_tickets`.
2. Linear submission isn't built yet. The "Sync to Linear" button exists in the UI with no endpoint behind it.
3. There's no GitHub repository link on a project yet.

## Related

- [Integrations — Linear](integrations/linear.md)
- [Integrations — GitHub](integrations/github.md)
- [Integrations — Supabase](integrations/supabase.md)
