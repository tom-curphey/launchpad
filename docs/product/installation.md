# Product — Installation

> How a company installs, configures and updates Launchpad.

**Status:** Current plan · **Updated:** 2026-09-22

## Decision

### Install command

```bash
pnpm dlx start-launchpad
```

This creates the company's Launchpad app from the `start-launchpad` package.

### Two install modes

1. **Manual:** the installer creates `.env` from `.env.example`, and the user pastes the keys in directly.
2. **Guided:** the installer asks for each key in the terminal, validates it where possible, and writes them all into `.env` at the end.

### What the installer does

1. Collects the keys: Supabase, GitHub (the OAuth app for login and the GitHub App for repository access), Linear, PostHog and the AI provider. See [Architecture — Environments](../architecture/environments.md).
2. **Runs the Supabase database migrations automatically.**
3. Configures GitHub sign-in in Supabase Auth.
4. Links the GitHub organisation that decides roles. See [Users — Roles](../users/roles.md).
5. Optionally links and deploys to Vercel and copies the keys into the Vercel project's environment variables. See [Architecture — Hosting](../architecture/hosting.md).

### Keys live in environment variables

1. Locally they live in `.env`, so humans can develop.
2. In production they live in the hosting provider's environment variables.
3. **GitHub login is the only thing done through the UI.** All other keys are configured in the environment, not in the dashboard.

### First login

1. The first person signs in with GitHub.
2. Their role comes from the GitHub organisation: organisation owners are Launchpad owners. Later users follow the same rule.

### Updates (shadcn-style)

1. **The code is copied, not depended on.** `start-launchpad` copies Launchpad's source into the company's repository, and the company owns and can edit it.
2. **User-initiated updates.** Running the CLI's update command, e.g. `pnpm dlx start-launchpad update`, pulls the latest Launchpad release and shows a per-file diff against the local code. The user accepts or skips each change. Nothing updates automatically.
3. **Migrations are part of an update.** New database migrations in an accepted update run automatically.
4. **Tracking customisation.** A `launchpad.json` file records the installed Launchpad version, so the CLI knows which upstream changes are new.

## Alternatives considered

1. **npm dependency (`@launchpad/*` packages):** rejected. It's easy to update but hard for a company to customise.

## Related

- [Architecture — Hosting](../architecture/hosting.md)
- [Integrations — Supabase](integrations/supabase.md)
