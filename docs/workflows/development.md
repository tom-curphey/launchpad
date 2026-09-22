# Workflows — Development

> How approved work gets built, by the Dev Agent or a Developer.

**Status:** Decided · **Updated:** 2026-09-22

## Decision

```text
Linear Ticket (ready + assigned)
  → Dev Agent Run in sandbox | Developer locally
  → branch → Ticket Change → Dev Testing → Pull Request
```

1. There's one branch and one Pull Request per Linear Ticket.
2. The Dev Agent works only inside ticket_scope. It requests a human for missing decisions, and new work it discovers becomes a proposed Draft Ticket rather than scope creep.
3. Dev Testing must pass before the Pull Request goes to review.

## Related

- [AI — Agents](../ai/agents.md)
- [Development — Coding Standards](../development/coding-standards.md)
- [Testing — Strategy](../testing/strategy.md)
