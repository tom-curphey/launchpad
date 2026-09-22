# Integrations — Linear

> How Launchpad sends approved work to Linear and reads its state back.

**Status:** Current plan · **Updated:** 2026-09-22

## Decision

1. **Connection.** It uses a company-level `LINEAR_API_KEY` from the environment. There's no Linear setup in the UI.
2. **Sending work.** Confirm & Send to Linear creates Linear Tickets from confirmed Draft Tickets, including dependency relations and proposed assignees.
3. **After sending,** Linear is the source of truth for ID, status, assignee and lifecycle.
4. **Reading state.** Linear webhooks (status, assignee, label and relation changes) trigger Engine re-evaluation, with polling as a fallback.
5. **Writing back** happens only for defined actions:
   1. setting and clearing `blocked` + `human`
   2. advancing status when an agent run progresses
   3. creating bugfix Linear Tickets

## Related

- [Tickets — Linear Ticket](../tickets/linear-ticket.md)
- [Tickets — Status Model](../tickets/status-model.md)
