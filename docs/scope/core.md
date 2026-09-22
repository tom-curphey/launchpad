# Scope — Core

> What the first version of Launchpad must include, and the build strategy.

**Status:** Current plan · **Updated:** 2026-09-22

## Decision

**Build complete end-to-end flows, not isolated features.** The core loop that must work end to end is:

1. Pitch → Product Definition and Decision Docs
2. Planning Agent → Draft Tickets → `draft_ticket_review` → Confirm & Send to Linear
3. Launchpad Engine dispatches the Dev Agent → Ticket Change → Dev Testing → Pull Request
4. Review Agent → `pull_request_review` → merge
5. Blocked agent → dashboard → human answers from a phone → run resumes
6. UAT Checks → approval → deployment

## Why

It proves the full value early, validates that the Workflow works end to end, and avoids disconnected features.

## Related

- [Priorities](priorities.md)
- [Product — Lifecycle](../product/lifecycle.md)
