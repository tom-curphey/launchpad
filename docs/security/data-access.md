# Security — Data Access

> How Project data is isolated between users, Projects and agent runs.

**Status:** Decided · **Updated:** 2026-09-22

## Decision

1. **Row Level Security is on** for every Launchpad table, keyed to the Supabase Auth user and their Project membership.
2. **Projects are isolated.** The dashboard aggregates only what the user can access, and no query crosses Projects without a membership check.
3. **Runs are isolated.** An agent run can only access its own Project, its own repository and its supplied context. See [AI — Context](../ai/context.md).
4. The service role key is used only in trusted server code (the Engine and webhooks), never for requests acting on behalf of a user.

## Legacy implementation

1. **Gap:** RLS is **disabled** on `users` and `projects` (migration `20260813031811_disable_rls.sql`), and `lib/supabase.ts` uses the **anon key** for server operations. Anyone with the anon key can currently read and write these tables directly. Fix this as part of the move to Supabase Auth.

## Related

- [Architecture — Authentication](../architecture/authentication.md)
