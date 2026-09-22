# AI — Agents

> The three specialist agents and what each is responsible for.

**Status:** Decided · **Updated:** 2026-09-22

## Decision

There are three specialist agents. Never collapse them into one autonomous agent.

| Agent | Core question | Inputs | Outputs | Must not |
|---|---|---|---|---|
| **Planning Agent** | *What implementation work should exist?* | Product Definition, Decision Docs, user_flows, scope, constraints, assumptions, existing Draft Tickets and Linear Tickets, repository context | Draft Tickets with ticket_scope, acceptance criteria, dependencies, proposed assignee and ordering | Write code, redefine the product, invent missing decisions, turn uncertainty into fact. If a key decision is missing, it blocks and asks a human |
| **Dev Agent** | *How do I complete this approved Linear Ticket?* | Linear Ticket, ticket_scope, acceptance criteria, relevant Decision Docs and Product Definition context, dependencies, repository | Ticket Change: branch, commits, Dev Testing results, Pull Request | Work outside ticket_scope, or guess product decisions. It requests a human instead |
| **Review Agent** | *Does this Ticket Change correctly satisfy the intended work?* | Linear Ticket, ticket_scope, acceptance criteria, Ticket Change, Pull Request diff, Decision Docs, Dev Testing results, repository | Review verdict and comments on the Pull Request | Share context with the Dev Agent run that produced the change. It must be independent |

### Dev Agent run

```text
Linear Ticket → Dev Agent Run → sandbox → checkout repo → branch → inspect → edit
  → Dev Testing → commit → push → Pull Request → result back to Launchpad
```

## Legacy implementation

1. There's one agent: `lib/agents/ticket-breakdown-agent.ts`, a single Anthropic call with structured (Zod) output that turns pitch answers into a Draft Ticket board. It's an early Planning Agent.
2. There's no Dev Agent or Review Agent.

## Related

- [Tools](tools.md)
- [Workflows — Planning](../workflows/planning.md)
- [Workflows — Development](../workflows/development.md)
- [Workflows — Review](../workflows/review.md)
