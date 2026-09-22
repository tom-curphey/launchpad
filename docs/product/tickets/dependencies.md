# Tickets — Dependencies

> How Launchpad represents and edits dependencies between Draft Tickets and Linear Tickets.

**Status:** Current plan · **Updated:** 2026-09-22

## Decision

1. Dependencies are explicit ticket-to-ticket relations: *A is blocked by B*.
2. Humans can add and remove them in `draft_ticket_review` and in the Workflow view.
3. On sending to Linear, they become Linear issue relations. After that, Linear's relations are the source of truth.
4. Circular dependencies are rejected.

How dependencies affect readiness is covered in [Workflows — Dependencies](../../workflows/dependencies.md).

## Legacy implementation

1. Draft Tickets store `deps` and `blocks` arrays, plus column-level `dependsOnColumns`. The agent output is normalised in code: dangling references are repaired, `deps`/`blocks` are made consistent, and phases are recalculated. Column-level dependencies are a legacy grouping and may be dropped.

## Related

- [Draft Ticket](draft-ticket.md)
