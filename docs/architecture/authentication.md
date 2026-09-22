# Architecture — Authentication

> How users sign in to Launchpad (who are you?).

**Status:** Current plan · **Updated:** 2026-09-22

## Decision

**GitHub sign-in through Supabase Auth.** This is the only login method and the only integration done in the UI.

```text
User → Launchpad → Supabase Auth → Sign in with GitHub → role sync from GitHub → dashboard
```

1. Supabase Auth issues the session, and the user's ID drives Row Level Security.
2. On every login, Launchpad syncs the user's GitHub organisation role and repository permissions. See [Users — Roles](../users/roles.md).
3. The OAuth scopes requested are the minimum needed to read identity, organisation membership and repository permissions.
4. Agents' repository access uses the GitHub App, not a user's login token.

## Why

It uses one identity system with the database, so RLS works natively. GitHub is also where the company already manages its people.

## Legacy implementation

1. Legacy code (moving to a `legacy` branch) uses NextAuth v5 with a GitHub OAuth App.
2. RLS is disabled there. The rebuild uses Supabase Auth from the start.

## Related

- [Users — Permissions](../users/permissions.md)
- [Security — Data Access](../security/data-access.md)
