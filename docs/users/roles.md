# Users — Roles

> How a user's Launchpad role is decided: it mirrors GitHub.

**Status:** Current plan · **Updated:** 2026-09-22

## Decision

1. **GitHub is the source of truth for roles.** Launchpad keeps no separate role management.
2. **Company level:** the installation is linked to one GitHub organisation.

   | GitHub organisation role | Launchpad role |
   |---|---|
   | Owner | Owner |
   | Member | Member |
   | Not in the organisation | No access (outside collaborators only see Projects for repositories they can access) |

3. **Project level:** one Project = one repository, so access to a Project follows the user's permission on that repository (`admin`, `maintain`, `write`, `triage`, `read`). See [Permissions](permissions.md).
4. **Synced on every login.** Launchpad reads the user's organisation role and repository permissions from GitHub at each sign-in and updates its records. Removing someone in GitHub removes their access at their next login. A periodic re-sync or GitHub webhook can revoke access sooner.
5. **No seat billing.** Launchpad will never charge per user.

## Why

Companies already manage people and access in GitHub. Mirroring it avoids a second place to invite, promote or remove people, and it keeps Project access aligned with code access.

## Alternatives considered

1. **Launchpad-managed roles:** rejected because it duplicates GitHub.
2. **First user becomes owner:** rejected because ownership comes from GitHub.

## Related

- [Architecture — Authentication](../architecture/authentication.md)
- [Integrations — GitHub](../product/integrations/github.md)
