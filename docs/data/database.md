# Data — Database

> Database technology and strategy.

**Status:** Current plan · **Updated:** 2026-09-22

## Decision

1. **One Supabase Postgres database per company installation** holds all Launchpad state.
2. **Projects are isolated by Row Level Security**, not by separate databases.
3. `pgvector` in the same database handles retrieval. There's no extra infrastructure.
4. Schema changes are versioned migrations shipped with Launchpad and applied automatically on install and update.

## Why

The data volume is small: tens of Projects is thousands of rows. Splitting databases adds cross-database queries and consistency problems for no benefit. The real bottlenecks are AI cost, GitHub API rate limits and agent run time, not Postgres.

Revisit this only for very large scale or per-segment compliance needs.

## Legacy implementation

1. There are four migrations in `supabase/migrations/`, plus earlier ad-hoc SQL (now in `_archive/schema/`).
2. RLS is currently disabled on `users` and `projects`.

## Related

- [Model](model.md)
- [Integrations — Supabase](../product/integrations/supabase.md)
