# Tickets — Assignment

> How assignment is represented on Draft Tickets and Linear Tickets, and who may change it.

**Status:** Decided · **Updated:** 2026-09-22

## Decision

1. **Assignees.** Work can be assigned to the Dev Agent, a Developer, another supported specialist role, or no one (`unassigned`).
2. **Proposed during planning.** The Planning Agent proposes an assignee on each Draft Ticket, and the human confirms or changes it in `draft_ticket_review`.
3. **Assignment is not a status.** It is a separate field.
4. **Linear owns it after approval.** Humans can reassign in Linear or from the dashboard.
5. **Humans are respected.** When a human self-assigns in Linear, that is final. Launchpad never silently takes work away from a human.
6. **Unassigned stays unassigned.** Launchpad never silently assigns an AI agent unless an explicit rule allows it.
7. **A human takes work by assigning it to themselves in Linear.** From then on the Engine won't dispatch an agent, and the Developer works locally with their own AI subscription. See [Integrations — AI Providers](../integrations/ai-providers.md).
8. **The Dev Agent is shown as a Linear assignee**, e.g. a dedicated Linear user or app actor for the agent, so humans can see who owns the work.

How the Engine acts on assignment is in [Workflows — Assignment](../../workflows/assignment.md).

## Related

- [Launchpad Engine](../launchpad-engine.md)
