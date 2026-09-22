# AI — Context

> What context an agent run receives, and what it must never receive.

**Status:** Decided · **Updated:** 2026-09-22

## Decision

Context is **deliberately supplied per run**, never inherited.

**A Dev Agent Run for `ACT-118` receives:** the Linear Ticket, ticket_scope, acceptance criteria, relevant Decision Docs, relevant Product Definition context, repository access, tools and model access.

**It must never automatically receive:** unrelated repositories or Projects, personal AI chat history or memory, unrelated customer data, or another user's agent context.

Agents don't get the whole product universe every time. Launchpad selects the relevant context through links and [retrieval](retrieval.md).

## Related

- [Architecture](architecture.md)
- [Security — Data Access](../security/data-access.md)
