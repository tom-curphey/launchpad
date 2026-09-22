# Architecture — Hosting

> Where each company's Launchpad installation runs.

**Status:** Current plan · **Updated:** 2026-09-22

## Decision

1. **One installation per company.** It uses the company's own Supabase project and hosting account. There's no shared Launchpad runtime.
2. **Vercel is the host.** It runs the Next.js app, the Launchpad Engine and the Eve agents.
3. **Vercel only for now.** Other hosts such as Netlify are out of scope. Eve depends on Vercel Workflows, Sandbox and AI Gateway, and Netlify would need a self-hosted Eve.
4. **One installation, many Projects.** Each Project maps to one repository in the company's GitHub organisation.
5. **The dashboard is always reachable.** It's the deployed app, usable from any browser or phone with no local machine running.
6. **Installation and updates:** see [Product — Installation](../product/installation.md).

## Related

- [Environments](environments.md)
- [AI — Agent Harness](../ai/agent-harness.md)
