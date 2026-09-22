# Launchpad Docs

> The index for Launchpad's Decision Docs, and the rules for adding new ones.

Launchpad takes a product from idea to live: **Pitch → Assemble → Deploy → Live**. Start with [Product Overview](product/overview.md), then read [Ontology](product/ontology.md) for the terms every doc uses.

---

## Rules

1. **Every file in `docs/` is a Decision Doc.** There is no separate `decisions/` folder.
2. **Every template file already exists.** Files with `Status: Not started` are templates with the question they answer. Write into the matching file when the decision is made. Create a new file when a topic has no home.
3. **Reusable vs product-specific.** Before placing a doc outside `product/`, ask: *would this topic make sense as a standard decision category for a completely different software product?* If not, it belongs in `product/`.
4. **Use the ontology.** Use the terms in [Ontology](product/ontology.md). Don't reintroduce removed terms.
5. **Plan vs code.** A doc states the decision. When the code differs, describe the gap under `Current implementation`. `Legacy implementation` sections describe the pre-rebuild code (on the `legacy` branch) and get removed as the rebuild replaces it.
6. **Superseded docs go to [`_archive/`](_archive/).** Each archived file carries a note at the top saying why it was archived and what replaced it.
7. **Naming.** Folder and file names use kebab-case, matching the [code standards](development/coding-standards.md).

## Doc format

```md
# <Category> — <Topic>

> One line: what this doc decides.

**Status:** Not started | Under evaluation | Current plan | Decided · **Updated:** YYYY-MM-DD

## Decision
## Why
## Details                  (optional)
## Alternatives considered  (optional)
## Current implementation   (only when the code differs)
## Related
```

- **Not started** means a template waiting for its first decision.
- **Decided** means an intentional current decision. Change it only with a new Decision Doc update.
- **Current plan** means the direction we're working to. It may change.
- **Under evaluation** means not decided. The options are recorded.

When a decision changes, update the doc and add a `## History` entry: what changed, why, when, and which work was affected.

---

## Index

Listed here are docs with content. Every other file in the folder template exists as a `Not started` template.

### Product (Launchpad-specific)

- [Overview](product/overview.md): what Launchpad is and why it exists
- [Installation](product/installation.md): `pnpm dlx start-launchpad`, Manual and Guided install, updates
- [Lifecycle](product/lifecycle.md): Pitch → Assemble → Deploy → Live and the end-to-end workflow
- [Ontology](product/ontology.md): canonical terms and removed terms
- [Source of Truth](product/source-of-truth.md): what Launchpad, Linear and GitHub each own
- [Pitch](product/pitch.md): the guided Pitch process and the Product Definition
- [Decision Docs](product/decision-docs.md): how decisions are captured and traced
- [Launchpad Engine](product/launchpad-engine.md): deterministic orchestration
- [Dashboard](product/dashboard.md): the cross-project dashboard and remote intervention
- [User Flows](product/user-flows/): [Unblock an Agent](product/user-flows/unblock-agent.md)
- Tickets: [Draft Ticket](product/tickets/draft-ticket.md) · [Linear Ticket](product/tickets/linear-ticket.md) · [Scope](product/tickets/scope.md) · [Acceptance Criteria](product/tickets/acceptance-criteria.md) · [Dependencies](product/tickets/dependencies.md) · [Assignment](product/tickets/assignment.md) · [Status Model](product/tickets/status-model.md) · [Human Label](product/tickets/human-label.md) · [Ticket Change](product/tickets/ticket-change.md)
- Integrations: [GitHub](product/integrations/github.md) · [Linear](product/integrations/linear.md) · [Supabase](product/integrations/supabase.md) · [AI Providers](product/integrations/ai-providers.md) · [PostHog](product/integrations/posthog.md)

### Reusable categories

- **Pitch:** [Concept](pitch/concept.md) · [Problem](pitch/problem.md) · [Differentiators](pitch/differentiators.md) · [Vision](pitch/vision.md)
- **Experience:** [Principles](experience/principles.md)
- **Scope:** [Core](scope/core.md) · [Priorities](scope/priorities.md) · [Future](scope/future.md) · [Exclusions](scope/exclusions.md)
- **Users:** [User Types](users/user-types.md) · [Roles](users/roles.md) · [Permissions](users/permissions.md)
- **Business:** [Revenue Model](business/revenue-model.md) · [Pricing](business/pricing.md)
- **Architecture:** [System](architecture/system.md) · [Authentication](architecture/authentication.md) · [Hosting](architecture/hosting.md) · [Environments](architecture/environments.md)
- **Data:** [Database](data/database.md) · [Model](data/model.md) · [Analytics](data/analytics.md)
- **AI:** [Architecture](ai/architecture.md) · [Agents](ai/agents.md) · [Agent Harness](ai/agent-harness.md) · [Models](ai/models.md) · [Tools](ai/tools.md) · [Context](ai/context.md) · [Retrieval](ai/retrieval.md)
- **Workflows:** [Planning](workflows/planning.md) · [Dependencies](workflows/dependencies.md) · [Assignment](workflows/assignment.md) · [Development](workflows/development.md) · [Review](workflows/review.md) · [Bugfix](workflows/bugfix.md)
- **Development:** [Coding Standards](development/coding-standards.md) · [Pull Requests](development/pull-requests.md)
- **Testing:** [Strategy](testing/strategy.md)
- **UAT:** [Strategy](uat/strategy.md)
- **Deployment:** [Process](deployment/process.md)
- **Security:** [Secrets](security/secrets.md) · [Data Access](security/data-access.md)
- **Design:** [Responsive](design/responsive.md)

---

## Folder template

Every file below exists. Templates are filled in as decisions are made.

```text
pitch/         concept, problem, audience, outcomes, alternatives, value-proposition, differentiators,
               assumptions, validation, success-criteria, product-market-fit, vision
experience/    principles, outcomes, aha-moment, friction, retention, sharing, anti-experience, accessibility
scope/         core, launch, post-launch, future, exclusions, priorities, quality-bar
users/         user-types, roles, permissions
business/      customer, customer-value, buying-trigger, revenue-model, pricing, unit-economics, growth, defensibility
architecture/  system, frontend, backend, services, state-management, authentication, realtime, background-jobs,
               caching, storage, search, hosting, environments, ci-cd, observability, backups, disaster-recovery
data/          model, database, schema, migrations, indexing, retention, audit, analytics
ai/            architecture, models, agents, agent-harness, tools, context, retrieval, model-routing
workflows/     planning, dependencies, assignment, development, review, bugfix, uat, deployment
development/   process, branching, commits, pull-requests, merge-strategy, code-quality, coding-standards
testing/       strategy, unit, integration, end-to-end, regression, security, test-data
uat/           strategy, checks
deployment/    process, approval, rollback, live-verification
security/      secrets, data-access, privacy, logging, audit, threat-model
design/        principles, design-system, navigation, layout, responsive, interactions, feedback, errors
product/       anything specific to Launchpad (user-flows/, integrations/, tickets/, ...)
```

Keep these pairs distinct. Authentication (*who are you?*) belongs in `architecture/authentication.md`; permissions (*what are you allowed to do?*) belong in `users/permissions.md`. `data/model.md` is the conceptual model, `data/database.md` is the technology and strategy, and `data/schema.md` is the concrete structure.
