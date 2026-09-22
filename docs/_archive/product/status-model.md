> **Archived 2026-09-22.** Board-column status model (READY … COMPLETE). Rewritten so that Launchpad reads Linear statuses.
>
> **Replaced by:** [product/tickets/status-model.md](../../product/tickets/status-model.md)

---

# Product — Status Model

> Describes the Launchpad ticket status model — the board states work moves through, and the principle that Launchpad reads state rather than owning it.

---

## Assemble orchestration

Assemble **reads** state (Linear, GitHub, CI) — it never owns it. Launchpad derives an orchestration view and works out what should happen next.

### Work states (board columns)

| State | Meaning |
|---|---|
| `READY` | Dependencies met — work can start |
| `IN PROGRESS` | Agent or human working on it |
| `IN REVIEW` | PR open, review pending |
| `UAT` | Work merged into the UAT environment, awaiting human acceptance — the start of the Deploy stage (see [Product — UAT](uat.md)) |
| `COMPLETE` | All UAT checks confirmed; deployed to production. Terminal state |
| `BLOCKED` | Cannot progress — its own column; the blocker tag records why (see [Product — Human Label](human-label.md)) |

*Source: architecture decision review, confirmed 2026-09-02.*
