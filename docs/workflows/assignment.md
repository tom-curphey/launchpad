# Workflows — Assignment

> How assignment decides who executes ready work.

**Status:** Decided · **Updated:** 2026-09-22

## Decision

| Ready work assigned to | What happens |
|---|---|
| Dev Agent | The Engine dispatches a Dev Agent Run |
| Developer | The Engine waits and observes Linear and GitHub |
| Unassigned | Nothing. It stays visible in the dashboard |

1. **Reassigning to a human mid-run** cancels the agent run. Its branch and notes are kept for the Developer.
2. **Human and AI work share one Workflow.** The same dependencies apply to both.

## Related

- [Tickets — Assignment](../product/tickets/assignment.md)
