> **Archived 2026-09-22.** Moved into product/tickets/ and aligned with the master context.
>
> **Replaced by:** [product/tickets/scope.md](../../product/tickets/scope.md)

---

# Product — Ticket Scope

> Defines ticket scope rules — the sizing constraints every generated ticket must satisfy, and the anti-patterns to avoid.

---

## Ticket Generation Constraints

**AI must generate tickets that satisfy:**

1. **Single outcome** - One clear thing accomplished per ticket
2. **Human-sized** - Completable in ≤1 day without AI assistance
3. **Review-sized PR** - Code review takes 10-15 minutes
4. **Testable** - Clear verification criteria

**Anti-patterns to avoid:**

- "Build authentication system" (too broad)
- "Fix bugs" (not specific)
- "Setup" (not an outcome)

**Good examples:**

- "Set up auth provider & login flow"
- "Build projects list page"
- "Add 'Start Project' button & empty state"

*Source: AI Ticket Breakdown & Linear Sync design, 2026-08-17.*
