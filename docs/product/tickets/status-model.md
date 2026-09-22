# Tickets — Status Model

> The Linear Ticket statuses Launchpad reads, and what each one means to the Launchpad Engine.

**Status:** Current plan · **Updated:** 2026-09-22

## Decision

Launchpad **reads** status from Linear; it doesn't own it. Each Linear workflow state maps to one Launchpad meaning:

| Launchpad meaning | Meaning |
|---|---|
| `ready` | Dependencies met and work can start |
| in progress | The Dev Agent or a Developer is working on it |
| `in_review` | A Pull Request is open and review is pending |
| `uat` | Merged to the UAT environment and awaiting UAT Checks |
| done | UAT passed and deployed to production |
| `blocked` | Can't progress. Add the `human` label if a human must act |

A ticket leaving `blocked` returns to its previous state: `ready` if work hadn't started, otherwise in progress.

## Legacy implementation

1. Not built. Linear status polling or webhooks are still to be implemented.

## Related

- [Human Label](human-label.md)
- [Integrations — Linear](../integrations/linear.md)
