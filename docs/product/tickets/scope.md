# Tickets — Scope

> How big a ticket should be, so that its changes and Pull Request stay human-reviewable.

**Status:** Decided · **Updated:** 2026-09-22

## Decision

`ticket_scope` should keep work human-reviewable:

1. One meaningful feature, UI component or coherent change per ticket, with a single testable outcome.
2. Small enough for a human to understand, and finishable in a reasonable time. As a rule of thumb, a Developer could complete it in about a day.
3. Its Pull Request can be reviewed meaningfully, in roughly 10–15 minutes.
4. It has clear acceptance criteria and explicit dependencies.

Don't create arbitrary ticket counts just to look granular.

## Details

- Anti-patterns: "Build authentication system" (too broad), "Fix bugs" (not specific), "Setup" (not an outcome).
- Good: "Set up auth provider & login flow", "Build projects list page", "Add 'Start Project' button & empty state".

## Related

- [Acceptance Criteria](acceptance-criteria.md)
- [Development — Pull Requests](../../development/pull-requests.md)
