# Security — Secrets

> How credentials are held and used.

**Status:** Current plan · **Updated:** 2026-09-22

## Decision

1. **Environment variables only.** Keys live in `.env` locally and in the host's environment variables in production. They are never entered or stored in the dashboard, and never kept in the database.
2. **Server-side only.** Only `NEXT_PUBLIC_*` values reach the browser.
3. **Scoped in sandboxes.** Agent sandboxes get short-lived, repository-scoped tokens (a GitHub App installation token) and only the secrets that run needs.
4. **Nothing committed.** `.env` is ignored by git, and `.env.example` documents every variable.
5. **One set of keys per company.** They're never shared across installations.

## Related

- [Architecture — Environments](../architecture/environments.md)
- [Data Access](data-access.md)
