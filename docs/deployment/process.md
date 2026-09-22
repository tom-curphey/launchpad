# Deployment — Process

> How completed, accepted work goes to production and is confirmed live.

**Status:** Decided · **Updated:** 2026-09-22

## Decision

```text
UAT complete → approval (human) → deployment → production → live verification
```

1. **A human approves** every production deployment. It appears under Needs Human.
2. **The deploy** can be run by an agent or a human after approval.
3. **Live verification:** Launchpad should eventually confirm the intended change is actually live and working.
4. **Rollback** is defined in `deployment/rollback.md` once the hosting pipeline exists.

## Related

- [UAT — Strategy](../uat/strategy.md)
- [Architecture — Hosting](../architecture/hosting.md)
