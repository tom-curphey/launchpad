# Product — Decision Docs

> How Launchpad captures product decisions as human-readable Decision Docs and keeps work traceable back to them.

**Status:** Decided · **Updated:** 2026-09-22

## Decision

Every meaningful product choice becomes an explicit **Decision**. Important Decisions are captured in human-readable **Decision Docs**, which are app-level documents rather than per-ticket notes.

- **Linear Tickets own the *what*.** Example: "Build GitHub authentication."
- **Decision Docs own the *why*.** Example: "Developers are our audience and we must sync directly to their repositories."

A Decision Doc explains what was decided and why, the relevant context, alternatives considered, consequences, affected product behaviour and related work. It also records later changes.

## Why

Agents and future developers need to trace implementation back to intent, so they never have to invent a product decision to unblock themselves.

```text
WHY → DECISION → WORK → TICKET CHANGE
```

## Details

1. **Consumers.** Coding agents read Decision Docs during a run (the primary driver). Humans read them as a browsable map of why the product works the way it does.
2. **Links in both directions.** Ticket → Decision Doc answers "why am I doing this?", and Decision Doc → tickets answers "how is this being implemented?"
3. **History is preserved.** When a decision changes, keep the original decision and its reason, what triggered the change, the new decision, the date, and the affected work. Launchpad identifies the work impacted by a changed decision.
4. **Traceability chain.** Pitch → Decision Doc → Linear Ticket → branch → Pull Request → merge → deploy → UAT. It can be walked backwards from any point.
5. **Structure.** The `docs/` folder framework and the reusable-vs-product rule are defined in the [docs README](../README.md). The same framework is used for Launchpad itself and for every project Launchpad manages.

## Legacy implementation

1. Decision Docs exist only as markdown files in this repository. There's no `decision_docs` table and no ticket ↔ decision link yet.

## Related

- [AI — Retrieval](../ai/retrieval.md)
- [Development — Pull Requests](../development/pull-requests.md)
