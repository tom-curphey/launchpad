> **Archived 2026-09-22.** Used the 'Needs Human' label and the removed 'Needs You' queue. Replaced by status blocked + the human label.
>
> **Replaced by:** [product/tickets/human-label.md](../../product/tickets/human-label.md)

---

# Product — Human Label

> Describes how human intervention is represented — the removable "Needs Human" label on blocked tickets, and the Needs You queue it feeds.

---

## Blockers: the "Needs Human" label

Blocked tickets sit in the `BLOCKED` column (see [Product — Status Model](status-model.md)). A single removable label — **"Needs Human"** — can be added to or removed from any ticket:

- The label marks that the ticket cannot progress until a human decides (product decision required, clarification, scope change). Agents never invent a product decision to unblock themselves.
- Process blockers (dependencies, technical issues) need no label — the dependency graph already records *why* a ticket is blocked, and the system clears it automatically when the cause resolves.
- A ticket leaving `BLOCKED` returns to its pre-block state: `READY` if work had not started, `IN PROGRESS` if it had.

The **Needs You** queue is a filter over tickets carrying the **"Needs Human"** label (plus UAT checklist confirmations) — human attention goes where human judgment creates value.

---

## Needs You

One focused queue surfacing everything that requires human judgment: tickets carrying the **"Needs Human"** label, UAT checklist checks awaiting confirmation, deploys awaiting approval. Everything else proceeds without unnecessary interruption.

*Source: architecture decision review, confirmed 2026-09-02.*
