# Workflows — Dependencies

> How dependencies decide readiness and execution order.

**Status:** Decided · **Updated:** 2026-09-22

## Decision

1. Work is `ready` only when all its dependencies are done.
2. Work with incomplete dependencies is `blocked`, without the `human` label, and is cleared automatically.
3. Independent work runs in parallel.
4. When work finishes, the Engine re-evaluates what becomes available next.

```text
ACT-1 → ACT-2 ─┬─ ACT-3
               └─ ACT-4 → ACT-5
```

How Launchpad stores and edits dependencies is covered in [Tickets — Dependencies](../product/tickets/dependencies.md).

## Related

- [Product — Launchpad Engine](../product/launchpad-engine.md)
