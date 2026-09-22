# Development — Pull Requests

> What every Pull Request must contain.

**Status:** Decided · **Updated:** 2026-09-22

## Decision

A Pull Request is never just "Fixes ACT-142". Every Pull Request created through Launchpad has these sections:

| Section | Content |
|---|---|
| What changed | Plain-English summary of the Ticket Change |
| Why | The product reason, linking the Decision Doc |
| User impact | What changes for the user |
| Implementation summary | Short technical overview |
| Key decisions | Decisions made during the work. Material ones are promoted into a Decision Doc |
| Dev Testing | What was run and the results |
| Acceptance criteria | Each criterion and how it's met |
| Related work | Linear Ticket, Decision Docs, dependencies, related Pull Requests |
| Needs attention | Anything the reviewer must look at |

1. Pull Requests are sized to be reviewable. See [Tickets — Scope](../product/tickets/scope.md). Avoid giant AI-generated Pull Requests.
2. Commit messages follow Conventional Commits.

## Related

- [Workflows — Review](../workflows/review.md)
