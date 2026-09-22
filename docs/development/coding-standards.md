# Development — Coding Standards

> The code standards Launchpad follows: the Hide & Seek Digital standards.

**Status:** Decided · **Updated:** 2026-09-22

## Decision

Launchpad follows the **[Hide & Seek Digital Code Standards](https://code-standards.vercel.app/)**. Where these docs and the standards disagree on *code* conventions, the standards win and these docs get updated. Where they disagree on *product concepts*, the Launchpad Decision Docs win.

### Folder structure ([source](https://code-standards.vercel.app/Structure/folder-structure))

```text
app/          routes, layouts, route groups (kebab-case); route-only components live in the route folder
components/   shared components: ui/, features/, layout/
lib/          utilities by function: permissions/, integrations/, middleware/, validation/, constants/, errors/, types/, utils/
hooks/        custom React hooks
services/     business logic
stores/       state management
public/       static assets
tests/        shared test setup (tests are co-located with the code they test)
```

**Where Launchpad code goes** (current plan):

- `services/engine/` holds the Launchpad Engine.
- `services/agents/` holds the agent definitions (Planning, Dev, Review).
- `lib/integrations/{github,linear,supabase,ai}/` holds the integration clients.

### Naming ([source](https://code-standards.vercel.app/Structure/naming-conventions))

| Item | Convention | Example |
|---|---|---|
| Component files | PascalCase | `UserProfile.tsx` |
| Utility files | camelCase | `apiUtils.ts` |
| Hooks | camelCase with `use` prefix | `useUserData.ts` |
| Route folders | kebab-case | `user-management/` |
| Component folders | camelCase | `header/` |

### Other standards

1. [API route standards](https://code-standards.vercel.app/Structure/api-routes), [component organisation](https://code-standards.vercel.app/Structure/component-organization) and [import organisation](https://code-standards.vercel.app/Structure/import-organization).
2. ESLint, Prettier, Stylelint, EditorConfig and direnv + nvm, via `pnpm dlx @hideandseekdigital/create`.
3. **[Conventional Commits](https://code-standards.vercel.app/Standards/conventional-commits).**
4. **[AGENTS.md](https://code-standards.vercel.app/Standards/agent-specs)** at the repo root, with these sections: project overview, repository layout, tech stack, essential commands, development workflow, environment variables, available skills, and out-of-scope actions. Keep it under about 300 lines.
5. The optional **Hide & Seek MCP server** (`@hideandseekdigital/mcp`, needs `HIDEANDSEEK_NPM_TOKEN`) gives agents standards checks, docs and scaffolding. Consider enabling it inside Dev Agent sandboxes.

## Legacy implementation

1. `AGENTS.md` contains only the Next.js auto-generated block and none of the required sections.
2. There are no `components/`, `hooks/`, `services/`, `stores/` or `tests/` folders yet. Shared UI is inside routes.
3. `app/projects/[id]/edit-project-modal.tsx` should be `EditProjectModal.tsx`.
4. There's no Prettier, Stylelint or EditorConfig setup, and no test framework.
5. The repo has both `package-lock.json` and `pnpm-lock.yaml`. It should be pnpm only.

## Related

- [Pull Requests](pull-requests.md)
- [Testing — Strategy](../testing/strategy.md)
