# UAT — Strategy

> How User Acceptance Testing works, and its three outcomes.

**Status:** Decided · **Updated:** 2026-09-22

## Decision

UAT asks *did we build the right thing?* After merge, work is deployed to a UAT environment. A **UAT Check** uses the acceptance criteria, and the related user_flows, to validate the behaviour the user actually sees.

### Outcomes

| Outcome | Meaning | Next |
|---|---|---|
| **PASS** | The behaviour meets the acceptance criteria | Counts towards UAT complete |
| **FIX** | Corrective work is needed | Launchpad creates a new **bugfix** Linear Ticket, which goes back into the Workflow |
| **IGNORE** | The behaviour is intentionally accepted | No work. The reason is recorded |

When every check is PASS or IGNORE, UAT is complete, and the work moves on to approval and deployment. UAT Checks awaiting a human appear under **Needs Human** in the dashboard.

## Legacy implementation

1. Not built. Earlier manual checklists for individual tickets are archived.

## Related

- [Workflows — Bugfix](../workflows/bugfix.md)
- [Deployment — Process](../deployment/process.md)
- [Tickets — Acceptance Criteria](../product/tickets/acceptance-criteria.md)
