# Tickets — Linear Ticket

> What a Linear Ticket is and which fields Linear owns once work is approved.

**Status:** Decided · **Updated:** 2026-09-22

## Decision

A confirmed Draft Ticket sent to Linear becomes a **Linear Ticket**. Linear is the source of truth for its ID, status, assignee and implementation lifecycle.

## Details

1. Always say *Draft Ticket* or *Linear Ticket* when the difference matters. Never use a generic "ticket".
2. Each Linear Ticket's description carries its ticket_scope, acceptance criteria and a link back to the relevant Decision Docs and the Launchpad Draft Ticket.
3. Dependencies are mirrored as Linear issue relations (blocked by / blocks).
4. A bugfix is also a Linear Ticket. See [Workflows — Bugfix](../../workflows/bugfix.md).

## Legacy implementation

1. Not built. See [Integrations — Linear](../integrations/linear.md).

## Related

- [Draft Ticket](draft-ticket.md)
- [Status Model](status-model.md)
