# Product — Ontology

> The canonical Launchpad terms, the rules for using them, and the terms that were deliberately removed.

**Status:** Decided · **Updated:** 2026-09-22

## Decision

Use these terms consistently in docs, code, database names, prompts and UI.

### Product / Knowledge

`project` · `repository` · `pitch` · `product_definition` · `product` · `target_market` · `ideal_user` · `product_market_fit` · `user_flow` · `product_scope` · `feature_scope` · `ticket_scope` · `assumption` · `decision` · `decision_doc` · `context` · `knowledge` · `ontology` · `retrieval`

### AI

`agent` · `agent_harness` · `planning_agent` · `dev_agent` · `review_agent` · `model` · `tool` · `mcp`

### Work

`draft_ticket` · `draft_ticket_review` · `approval` · `build_plan` · `linear_ticket` · `dependency` · `workflow` · `ready` · `blocked` · `blocker` · `assignee` · `unassigned` · `in_review` · `human` · `developer` · `human_label` · `launchpad_engine` · `assemble`

### Implementation / Delivery

`ticket_change` · `acceptance_criteria` · `dev_testing` · `pull_request` · `pull_request_review` · `deploy` · `uat` · `uat_check` · `bugfix` · `scope_creep` · `deployment` · `production` · `live` · `relationship`

## Key distinctions

| Term | Means | Not |
|---|---|---|
| **Workflow** | How we plan and build the app: work relationships, dependencies, readiness | `work_graph` |
| **User Flow** | How the user uses the app | `user_journey` |
| **Draft Ticket / Linear Ticket** | Work before approval (Launchpad) vs approved work (Linear) | generic `ticket` |
| **Ticket Change** | What was actually changed | generic `changes` / `implementation` |
| **Dev Testing** | *Did we build it correctly?* | `technical_check` |
| **UAT** | *Did we build the right thing?* | |
| **Launchpad Engine** | Deterministic orchestration. Not an AI agent | |
| **Developer** | A human doing development work | |
| **Dev Agent** | The AI development worker | |
| **Agent / Agent Run** | Reusable role vs one scoped execution of it | |
| **Ontology / Agent Harness** | What concepts mean vs how an agent behaves | |
| **blocked + `human` label** | Can't continue until a human acts | `needs_you` |

Use specific review terms: `draft_ticket_review`, `pull_request_review`, `review_agent`, `in_review`.

## Removed terms

Don't reintroduce these without first explaining why in a Decision Doc:

generic `outcome` · generic `experience` · `user_journey` · generic `scope` · `open_question` · temporary agent name `alex` · generic `implementation` · generic `changes` · `technical_check` · generic `review` · `confirmation` (as a stage) · generic `ticket` · `work_graph` · `needs_you` · `implementation_issue` · `decision_issue` · `fix_issue` · `missing_work`

Unknown work found later becomes real work through the normal Draft Ticket / Linear Ticket path. Work outside the agreed scope is `scope_creep`.

## Legacy implementation

1. The code uses legacy names in places: a `userflows` table, generic `tickets`, columns and milestones in the draft board, and `P1/P2` phases. Rename these as the affected code is touched.
2. The in-app docs page (`app/docs/page.tsx`) holds a large amount of hard-coded legacy documentation, e.g. the PAD method and `context_documents`, and should be reduced to rendering files from `docs/`.

## Related

- [Overview](overview.md)
- [Lifecycle](lifecycle.md)
