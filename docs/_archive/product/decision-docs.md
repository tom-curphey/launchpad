> **Archived 2026-09-22.** Rewritten to match the master context.
>
> **Replaced by:** [product/decision-docs.md](../../product/decision-docs.md)

---

# Product — Decision Docs

> Describes Launchpad's Decision Docs — the human-readable reasoning layer that explains why work exists, how decisions change, and how everything stays traceable.

---

## Decision Documents — the reasoning layer

**Status:** ✅ Confirmed 2026-09-02

**Decision:**

Every meaningful product decision is captured as a human-readable **Decision Doc**. Decision Docs are the user's thinking and reasoning behind doing something, captured at the **app level** — not as per-ticket artifacts.

- **Linear tickets own the WHAT** — what to build. Example: *"Build GitHub Authentication"*
- **Decision Docs own the WHY** — the reasoning. Example: *"We need GitHub auth as developers are our target audience and we need to sync directly to repos to build projects/apps"*

**Consumers:**

1. **Coding agents, during implementation** (identified 2026-09-01 as the primary driver) — agents follow links from tickets to get product context, so they never have to invent intent to unblock themselves.
2. **Humans** — a browsable, readable map of why the product works the way it does, without hunting through tickets or AI conversation history.

**Decision Doc structure (human-readable):** Decision / Reason / Context / Alternatives / Consequences / Related Work.

**Relationship:** bidirectional links — ticket → Decision Doc ("why am I doing this?"), Decision Doc → tickets ("how is this being implemented?").

**Related docs:** early product/tech decisions now live across `data/`, `architecture/`, and `scope/`; the ticket breakdown design lives in [Draft Ticket Structure](draft-ticket-structure.md) and [Linear Ticket Structure](linear-ticket-structure.md).

---

## Decisions can change — history is preserved

Decision Docs are persistent but not immutable. When a decision changes (V1 → V2), Launchpad retains: the original decision, why it was originally made, what caused the change, the new decision, when it changed, and which tickets were affected. Launchpad identifies the work impacted by a changed decision.

## End-to-end traceability

The chain **Pitch → Decision Doc → Linear ticket → branch → PR → merge → deploy → UAT** is walkable backwards from any point: from a PR ("why was this built?"), from a decision ("how was this implemented?"), from UAT ("why is this supposed to work this way?").

*Source: architecture decision review, confirmed 2026-09-02.*
