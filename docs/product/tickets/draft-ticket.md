# Tickets — Draft Ticket

> What a Draft Ticket is, what humans can do with it, and how it becomes a Linear Ticket.

**Status:** Decided · **Updated:** 2026-09-22

## Decision

A **Draft Ticket** is implementation work *before* it is approved and sent to Linear. Draft Tickets belong to Launchpad.

```text
Planning Agent → Draft Tickets → draft_ticket_review → Confirm Ticket(s) → Confirm & Send to Linear → Linear Tickets
```

In `draft_ticket_review`, a human can review, edit, delete, split, merge and reorder Draft Tickets, and change their dependencies, scope, acceptance criteria and assignment. They can then confirm them. There is no separate "confirmation" stage.

## Details

1. **Self-contained.** Each Draft Ticket carries its title, ticket_scope, acceptance criteria, dependencies, proposed assignee and links to the relevant Decision Docs. An agent should be able to act on it without reading the whole board.
2. **After approval.** Once sent, the Linear Ticket is the source of truth. The Draft Ticket keeps its link to the Linear Ticket ID for traceability and stops being edited.
3. **Regeneration.** A Draft Ticket that has already been sent to Linear must never be silently regenerated or overwritten.

## Legacy implementation

1. Draft Tickets are stored as one JSONB document in `projects.draft_tickets`, grouped into columns (feature areas) with `P1/P2` phases and milestones, and fields `id, title, description, deps, blocks, order`.
2. They're missing acceptance criteria, assignee and Decision Doc links. Moving them to a proper `draft_tickets` table is expected when the data model is built.
3. Generation is in `lib/agents/ticket-breakdown-agent.ts` via `POST /api/projects/[id]/generate-tickets`. The route already refuses to regenerate after a Linear submission.

## Related

- [Linear Ticket](linear-ticket.md)
- [Workflows — Planning](../../workflows/planning.md)
- [Data — Model](../../data/model.md)
