# Architecture — Environments

> Which environments exist and how each is configured.

**Status:** Current plan · **Updated:** 2026-09-22

## Decision

### Environments

1. **Local** is for humans developing Launchpad or a company's customisations. Keys live in `.env`.
2. **Production** is the deployed installation. Keys live in the Vercel environment variables.
3. **Preview and UAT** use the host's preview deployments. See [UAT — Strategy](../uat/strategy.md).

### Environment variables

The full list lives in `.env.example`.

| Group | Variables (indicative) |
|---|---|
| Supabase | `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY` |
| GitHub | `GITHUB_ORG`, OAuth client ID and secret (configured in Supabase Auth), GitHub App ID, private key and webhook secret |
| Linear | `LINEAR_API_KEY`, `LINEAR_WEBHOOK_SECRET` |
| PostHog | `NEXT_PUBLIC_POSTHOG_KEY`, `NEXT_PUBLIC_POSTHOG_HOST` |
| AI provider | Agent API keys, e.g. `ANTHROPIC_API_KEY`, `OPENAI_API_KEY` (or `AI_GATEWAY_API_KEY`). Human subscriptions are never stored here |

1. `NEXT_PUBLIC_*` variables are the only ones exposed to the browser.
2. Nothing else is exposed, and `.env` is never committed.

## Related

- [Product — Installation](../product/installation.md)
- [Security — Secrets](../security/secrets.md)
