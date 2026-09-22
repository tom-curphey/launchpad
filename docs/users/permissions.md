# Users — Permissions

> What each user is allowed to do, derived from their GitHub permissions.

**Status:** Current plan · **Updated:** 2026-09-22

## Decision

| Action | Needs |
|---|---|
| See a Project, its agents, Draft Tickets and Linear Tickets | `read` on the repository |
| Answer a blocked agent, edit and confirm Draft Tickets, run UAT Checks, pause or resume agents | `write` or higher |
| Reassign work, approve merges and approve production deployments | `maintain` or higher |
| Change Project settings | `admin` on the repository |
| Change installation settings, add Projects | GitHub organisation Owner |

1. Enforcement uses Supabase Row Level Security plus server-side checks against the synced permissions.
2. The dashboard only aggregates Projects the user can access.

## Related

- [Roles](roles.md)
- [Security — Data Access](../security/data-access.md)
