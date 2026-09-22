# Workflows — Bugfix

> How problems found during UAT or development become work.

**Status:** Decided · **Updated:** 2026-09-22

## Decision

1. A **bugfix** is a Linear Ticket that corrects a problem found during UAT or development.
2. A UAT Check with outcome **FIX** creates a new bugfix Linear Ticket, linked to the original ticket and its acceptance criteria.
3. Bugfixes go back into the normal Workflow and Assemble process: the same Engine, assignment and review.
4. Previously unknown work becomes real work through the normal Draft Ticket and Linear Ticket path. Work outside the agreed scope is flagged as `scope_creep`.

## Related

- [UAT — Strategy](../uat/strategy.md)
