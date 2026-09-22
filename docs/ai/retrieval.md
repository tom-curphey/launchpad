# AI — Retrieval

> How agents find relevant knowledge.

**Status:** Current plan · **Updated:** 2026-09-22

## Decision

1. **Explicit links come first.** Draft Tickets and Linear Tickets link to their Decision Docs, and those links are the primary context.
2. **A `pgvector` index over Decision Docs** in the existing Supabase database supports semantic lookup as the corpus grows, e.g. "why did we choose this auth provider?"
3. **The index is derived and rebuildable.** Decision Docs stay the source of truth, and knowledge must never exist only in the index.
4. **User-triggered rebuild.** A manual "Retrain Agents" action re-chunks and re-embeds Decision Docs. It isn't run on every save, so the user controls cost. A temporarily stale index is an accepted trade-off.
5. The embedding provider is chosen at implementation time. Retrieval technology is an implementation detail, not ontology.

## Legacy implementation

1. Not built.

## Related

- [Context](context.md)
- [Product — Decision Docs](../product/decision-docs.md)
