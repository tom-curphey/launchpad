# Claude Code prompt: rebuild Launchpad as the `start-launchpad` installer (Phase 1: foundation)

You are rebuilding Launchpad from scratch in this repository. The old code is preserved on the `legacy` branch. Only use it as reference, e.g. `lib/pitch-questions.ts` and `lib/agents/ticket-breakdown-agent.ts`. Never merge it back.

**Start in plan mode.** Read the docs listed below, then propose a plan with the file tree, the packages and their versions, and the order of commits. Wait for my approval before writing code.

## 1. Read first (these docs are the source of truth)

1.1 `docs/README.md`: the doc rules and format.
1.2 `docs/product/overview.md`, `lifecycle.md`, `ontology.md`, `source-of-truth.md`, `installation.md`, `launchpad-engine.md` and `dashboard.md`.
1.3 `docs/users/roles.md` and `permissions.md`; `docs/architecture/system.md`, `authentication.md`, `hosting.md` and `environments.md`.
1.4 `docs/data/model.md` and `database.md`; `docs/security/secrets.md` and `data-access.md`.
1.5 `docs/ai/*.md`, especially `agent-harness.md`: Eve, and building on Foreman.
1.6 `docs/development/coding-standards.md`: the Hide & Seek Digital standards at https://code-standards.vercel.app. Follow the folder structure, naming, AGENTS.md spec and Conventional Commits.
1.7 Eve docs: https://vercel.com/docs/eve and https://eve.dev/docs. **Check every Eve API against the docs. Never guess.** Eve is in beta.

## 2. Hard rules

2.1 Use only the terms in `docs/product/ontology.md`, and never the removed terms. This applies to code, database names and UI copy.
2.2 The Launchpad Engine is deterministic TypeScript. Keep it out of prompts and out of Eve agents.
2.3 Secrets live only in env vars: `.env` locally and Vercel env vars in production. Never store them in the database or the UI. GitHub sign-in is the only integration done in the UI.
2.4 One installation = one company = one GitHub organisation. Roles mirror GitHub and re-sync on every login.
2.5 Agents use API keys through Eve / AI Gateway. Human subscriptions are never handled by Launchpad.
2.6 Target Vercel only.
2.7 Make small commits using Conventional Commits, and end each message with the repo's usual attribution lines. **Do not push.**
2.8 If a product decision is missing, stop and ask me. Don't invent one. When you make a technical decision, record it in the matching `docs/` template file: change its status and fill in Decision and Why.

## 3. Clean main

3.1 Delete the legacy app code from `main`: `app/`, `lib/`, `middleware.ts`, `supabase/`, `board-view.html`, `public/`, `package-lock.json`, `next-env.d.ts`, `next.config.ts`, `postcss.config.mjs`, `eslint.config.mjs`, `tsconfig.json`, `pnpm-lock.yaml`, `pnpm-workspace.yaml` and `package.json`.
3.2 Keep `docs/`, `.gitignore`, `README.md` (to be rewritten), `AGENTS.md` and `CLAUDE.md` (to be rewritten).
3.3 Add `graphify-out/` to `.gitignore`.

## 4. Repository layout (shadcn-style distribution, Option B)

The company's app is a **copy** of the template, and the company owns that copy. There is no runtime npm dependency on Launchpad.

```text
/
├── packages/
│   └── start-launchpad/        # the CLI published to npm as `start-launchpad`
├── template/                   # the Next.js app copied into a company's repo
│   ├── app/                    # routes (kebab-case folders)
│   ├── components/{ui,features,layout}/
│   ├── lib/{integrations/{github,linear,supabase,posthog,ai},permissions,validation,constants,errors,types,utils}/
│   ├── hooks/  services/engine/  services/agents/  stores/
│   ├── agent/ (or the Eve layout the docs prescribe)   # planning, dev and review agents
│   ├── supabase/migrations/
│   ├── .env.example  AGENTS.md  launchpad.json
│   └── package.json
├── docs/
├── pnpm-workspace.yaml  package.json  AGENTS.md  README.md
```

Use a pnpm workspace so `template/` can run locally for development (`pnpm --filter template dev`).

## 5. Build (Phase 1 scope only)

5.1 **Standards:** set up ESLint, Prettier, EditorConfig and Vitest per the Hide & Seek standards (`pnpm dlx @hideandseekdigital/create` if it works here; otherwise configure by hand to match). Write the root and template `AGENTS.md` with every required section.

5.2 **Template app:**
- 5.2.1 Latest stable Next.js App Router, React, TypeScript, Tailwind and Zod.
- 5.2.2 Supabase SSR client with **Supabase Auth using GitHub sign-in**.
- 5.2.3 On every login, sync the user's GitHub org role and repository permissions into the database, following `docs/users/roles.md`.
- 5.2.4 Access is denied if the user isn't in `GITHUB_ORG`.

5.3 **Migrations:** write SQL for the core of `docs/data/model.md`:
- installation settings, users, projects, repository_permissions
- draft_tickets and draft_ticket_dependencies, decision_docs
- agent_runs, human_interventions, uat_checks, deployments, activity_events

RLS must be **on** for every table, with policies derived from repository permissions per `docs/users/permissions.md`. Write `docs/data/schema.md` from what you build.

5.4 **Launchpad Engine:** `services/engine/` holds pure functions that take the Workflow state and return actions. It implements the rules table in `docs/product/launchpad-engine.md`, with co-located Vitest tests covering every rule. No I/O inside the engine core.

5.5 **Dashboard shell:** a cross-project dashboard and project view per `docs/product/dashboard.md`, built mobile-first per `docs/design/responsive.md`. Use real data where tables exist and empty states elsewhere. Include a **Needs Human** section.

5.6 **Eve wiring:**
- 5.6.1 Add Eve to the template following the official Next.js guide (`withEve`).
- 5.6.2 Create the planning, dev and review agent definitions, with instructions drawn from `docs/ai/agents.md`, and a `request_human` tool stub that records a `human_interventions` row.
- 5.6.3 Review the Foreman template (https://eve.dev/templates/eve-software-factory-template) and note in `docs/ai/agent-harness.md` which parts we'll reuse.
- 5.6.4 Don't implement full agent flows yet.

5.7 **CLI (`packages/start-launchpad`):**
- 5.7.1 `start-launchpad` (init) asks **Manual** or **Guided**.
  - Manual writes `.env` from `.env.example` and tells the user to fill it in.
  - Guided prompts for each key in `docs/architecture/environments.md`, validates what it can (e.g. the Supabase connection), then writes `.env` at the end.
- 5.7.2 It copies `template/` into the target folder and writes `launchpad.json` with the Launchpad version and a hash of each file.
- 5.7.3 It **runs Supabase migrations automatically** using `SUPABASE_DB_URL`.
- 5.7.4 It prints the steps that can't be automated, e.g. enabling the GitHub provider in Supabase Auth and creating the GitHub App.
- 5.7.5 It can optionally run `vercel link` and push the env vars to Vercel.
- 5.7.6 `start-launchpad update` fetches the newer template and shows a per-file diff:
  - For files unchanged locally (their hash matches `launchpad.json`), offer to apply.
  - For files changed locally, show both versions and ask whether to accept, skip or write a `.launchpad-new` copy.
  - It runs any new migrations, then updates `launchpad.json`.
- 5.7.7 Make it testable locally: `pnpm --filter start-launchpad dev -- --dir /tmp/acme`.

5.8 **Docs:** rewrite the root `README.md` (what Launchpad is and `pnpm dlx start-launchpad`). Replace each `Legacy implementation` section you make obsolete with an accurate `Current implementation` section. Fill in any template doc whose decision you made.

## 6. Done when

6.1 `pnpm install`, `pnpm lint`, `pnpm test` and `pnpm build` all pass at the root.
6.2 Running the CLI locally into `/tmp/acme` produces an app that starts with `pnpm dev`.
6.3 Against a real Supabase project: migrations apply, GitHub sign-in works, a non-org user is refused, and an org owner lands on the dashboard as Owner.
6.4 Engine tests cover every rule in the rules table.
6.5 Every link in the docs still resolves, and there are no removed ontology terms in the code.
6.6 Finish with a summary: what was built, the decisions recorded in docs, and open questions for me.
