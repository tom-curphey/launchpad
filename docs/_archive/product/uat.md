> **Archived 2026-09-22.** Used the removed failure types 'implementation issue / missing work / decision issue'. UAT outcomes are now PASS / FIX / IGNORE.
>
> **Replaced by:** [uat/strategy.md](../../uat/strategy.md) · [workflows/bugfix.md](../../workflows/bugfix.md)

---

# Product — UAT

> Describes Launchpad-specific UAT behaviour — human acceptance via the userflow checklist, and how failures are classified.

---

## Deploy — human acceptance

`UAT` is the **start of the Deploy stage**. Deploy is the human acceptance layer — technical verification lives in Assemble; Deploy answers *"does the product actually behave the way we intended?"*

### The Deploy stage: three steps

1. **Agent merges into UAT** — finished work is merged and deployed to the UAT environment by agents. (`UAT` state = work sitting on the UAT environment, awaiting human acceptance.)
2. **Human acceptance via the userflow checklist** — the user opens the UAT site and works through the **userflow checklist experience** in Launchpad. The checklist is derived from the product's userflows defined in Pitch: the same definition of intent that drove the build becomes the measuring stick for acceptance. Each check is confirmed in Launchpad.
3. **Production deploy** — only once **all checks are confirmed**. The deploy is executed by an agent or by the human; tickets then become `COMPLETE`.

### UAT failures are classified, not just "bugs"

When a checklist check fails, Launchpad classifies it:

| Failure type | Meaning | Routes back to |
|---|---|---|
| **Implementation issue** | Decision right, ticket right, build wrong | Assemble → Development |
| **Missing work** | Decision right, but no ticket ever covered it | Assemble → new proposed tickets |
| **Decision issue** | Build matches the decision — the decision itself was wrong | Pitch → reopen the Decision Doc |

Failed checks do not gate through to production — the production deploy requires all checks confirmed. Not every UAT failure is a coding bug; some mean the thinking needs revisiting.

Detailed UAT mechanics (checklist UI, feedback capture, screenshots) — defined separately. Current acceptance checklists live in [UAT — Checks](../uat/checks.md).

*Source: architecture decision review, confirmed 2026-09-02.*
