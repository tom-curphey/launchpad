# Integrations — GitHub

> What Launchpad uses GitHub for.

**Status:** Current plan · **Updated:** 2026-09-22

## Decision

1. **Login.** GitHub sign-in via Supabase Auth is the only UI-based integration.
2. **Roles.** Organisation roles and repository permissions are synced on every login. See [Users — Roles](../../users/roles.md).
3. **Source of truth for code.** GitHub owns the repository, branches, commits, Pull Requests and history. One Project = one repository.
4. **Agent access.** A **GitHub App** installed on the company's organisation provides per-repository installation tokens. Its keys are set in the environment during install.
5. **Agent actions.** Agents clone into the sandbox, branch, commit, push, open Pull Requests and read diffs for review.
6. **Events.** GitHub webhooks (Pull Request opened or merged, checks completed, membership changed) trigger Engine re-evaluation and role updates.

## Related

- [Architecture — Authentication](../../architecture/authentication.md)
- [Security — Secrets](../../security/secrets.md)
