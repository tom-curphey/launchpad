# Integrations — Supabase

> What each installation uses Supabase for.

**Status:** Current plan · **Updated:** 2026-09-22

## Decision

1. **The company's own Supabase project.** Adding its URL and keys is the first install step.
2. **Migrations run automatically** on install and on update.
3. **What it provides:**
   1. Postgres for all Launchpad state
   2. Supabase Auth with GitHub sign-in
   3. Row Level Security for access control
   4. `pgvector` for retrieval
4. **Nothing is shared** between companies.

## Related

- [Data — Database](../../data/database.md)
- [Product — Installation](../installation.md)
