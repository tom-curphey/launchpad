# Product — Lifecycle

> The four-stage lifecycle and the full end-to-end workflow Launchpad is designed around.

**Status:** Decided · **Updated:** 2026-09-22

## Decision

The canonical top-level lifecycle is **Pitch → Assemble → Deploy → Live**.

1. **Pitch:** understand and define the product. It produces the Product Definition and Decision Docs.
2. **Assemble:** turn product intent into approved implementation work, and execute it.
3. **Deploy:** validate the work through UAT, approve it, and move it into production.
4. **Live:** verify the intended product is actually live and working.

## Details

### End-to-end workflow

```text
HUMAN → IDEA → PITCH → PRODUCT DEFINITION → DECISIONS → DECISION DOCS
  ↓
PLANNING AGENT → DRAFT TICKETS → DRAFT TICKET REVIEW → CONFIRM & SEND TO LINEAR
  ↓
LINEAR TICKETS → WORKFLOW → LAUNCHPAD ENGINE
  ↓
ASSIGNEE ── DEV AGENT | DEVELOPER
  ↓
TICKET CHANGE → DEV TESTING → REVIEW AGENT → PULL REQUEST → PULL REQUEST REVIEW → MERGE
  ↓
UAT → UAT CHECK ── PASS | FIX | IGNORE
                        │
                        └─ FIX → new bugfix Linear Ticket → back to WORKFLOW (Assemble)
  ↓
UAT COMPLETE → APPROVAL → DEPLOYMENT → PRODUCTION → LIVE
```

### Stage ownership

| Stage | Key artifacts | Where it lives |
|---|---|---|
| Pitch | Product Definition, user_flows, Decision Docs | Launchpad / Supabase, `docs/` |
| Assemble | Draft Tickets → Linear Tickets, Workflow, agent runs, Pull Requests | Launchpad, Linear, GitHub |
| Deploy | UAT Checks, approval, deployment | Launchpad, hosting provider |
| Live | Live verification | Launchpad |

There is no separate "confirmation" stage. Confirming Draft Tickets is an action within Assemble.

## Related

- [Pitch](pitch.md)
- [Workflows — Planning](../workflows/planning.md)
- [UAT — Strategy](../uat/strategy.md)
- [Deployment — Process](../deployment/process.md)
