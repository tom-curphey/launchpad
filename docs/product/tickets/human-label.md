# Tickets — Human Label

> How "a human must act" is represented: status `blocked` plus the `human` label.

**Status:** Decided · **Updated:** 2026-09-22

## Decision

When a Linear Ticket can't continue without human intervention, it gets:

```text
status = blocked
label  = human
```

The combination means *this work can't continue until a human does something*: make a decision, answer a question, grant access, approve something, do a manual action, or resolve ambiguous product behaviour.

## Details

1. Process blockers such as incomplete dependencies are `blocked` **without** the `human` label. The Engine clears them automatically.
2. Agents never invent a product decision to unblock themselves. They request a human instead.
3. The dashboard's **Needs Human** view lists `blocked` + `human` Linear Tickets, UAT Checks awaiting a human, and deployments awaiting approval.
4. This replaces the old `needs_you` concept.

## Related

- [User Flow — Unblock an Agent](../user-flows/unblock-agent.md)
- [Dashboard](../dashboard.md)
