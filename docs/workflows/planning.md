# Workflows — Planning

> How product intent becomes approved implementation work.

**Status:** Decided · **Updated:** 2026-09-22

## Decision

```text
Product Definition + Decision Docs
  → Planning Agent → Draft Tickets
  → draft_ticket_review (human edits and confirms)
  → Confirm & Send to Linear → Linear Tickets
  → Workflow updated → Launchpad Engine evaluates readiness
```

1. The Planning Agent only proposes work. Humans approve it.
2. If a key product decision is missing, the Planning Agent blocks and asks rather than inventing an answer.
3. Re-planning after a decision changes proposes *new or changed* Draft Tickets. It never silently rewrites Linear Tickets.

## Related

- [AI — Agents](../ai/agents.md)
- [Tickets — Draft Ticket](../product/tickets/draft-ticket.md)
