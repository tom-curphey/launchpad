> **Archived 2026-09-22.** Rewritten. The pgvector and 'Retrain Agents' decisions were carried forward.
>
> **Replaced by:** [ai/retrieval.md](../../ai/retrieval.md)

---

# AI — Retrieval

> Describes the retrieval strategy — the RAG index over Decision Docs that lets coding agents pull relevant decision context while building.

---

## RAG index over Decision Docs

**Decision:**

A retrieval (RAG) index sits on top of Decision Docs so coding agents can quickly pull relevant decision context while building.

- **Storage:** `pgvector` in the existing Supabase project — no new infrastructure.
- Decision Docs are chunked and embedded; agents query semantically at build time (e.g. *"why did we choose this auth provider?"*) and receive the most relevant decision context.
- The same retrieval serves **ticket generation** later: proposed tickets are generated from decisions, with the agent pulling the deepest relevant reasoning rather than raw pitch answers alone.
- The index is a **derived, rebuildable artifact**. Decision Docs remain the canonical source of truth — if the index is ever stale or wrong, it is regenerated from the docs. Important knowledge must never exist only inside the index.
- With a small corpus, plain links between tickets and docs suffice; the index earns its keep as the corpus grows. Building it early means agents always have it available.

## "Retrain Agents" button

**Decision:**

After Decision Docs are created or updated, the user has a manual **"Retrain Agents"** button that recreates the pgvector index (re-chunk and re-embed all Decision Docs).

- Rebuild is **user-triggered**, not automatic on every save — the user controls cost and churn, and can batch doc edits then retrain once.
- Accepted tradeoff: the index can be temporarily stale until retrained.
- Label note: *"Retrain Agents"* is the user-facing label — it communicates the effect (the agents' knowledge is updated). The underlying technical action is a full re-embed of the Decision Doc index.
- Embedding provider: chosen at implementation time (candidates: Voyage, OpenAI embeddings, or a local model).

## Schema impact (to build)

- `decision_docs` — human-readable decision content + metadata
- `decision_doc_chunks` — chunk text + pgvector embedding + reference to parent doc
- Tickets carry `decision_doc_id` references (Decision Links)

*Source: architecture decision review, confirmed 2026-09-02.*
