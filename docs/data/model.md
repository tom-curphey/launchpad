# Data — Model

> The conceptual domain model: Launchpad's entities and how they relate.

**Status:** Current plan · **Updated:** 2026-09-22

## Decision

```text
installation (one company, one GitHub organisation)
user (GitHub identity, org role synced at login) ──< repository_permission >── project (1 project = 1 repository)
project ── product_definition ──< user_flow
project ──< decision_doc ──< decision_doc_chunk (pgvector)
project ──< assumption
project ──< draft_ticket ──< draft_ticket_dependency
draft_ticket ──> decision_doc (links)            draft_ticket ──> linear_ticket_id (after send)
project ──< agent_run  (agent_type, run_id, linear_ticket_id?, draft_ticket_id?, status,
                        blocked_reason, timestamps, usage/cost, artifacts, failure)
agent_run ──< human_intervention (question, context, answer, resolved_by, decision_doc_id?)
project ──< uat_check (linear_ticket_id, acceptance_criteria, outcome PASS|FIX|IGNORE, bugfix_linear_ticket_id?)
project ──< deployment (environment, approval, status, live_verified_at)
project ──< activity_event
installation ── agent_config (per agent_type: provider, model — credentials live in env vars, not the DB)
```

**Linear and GitHub data is referenced by ID, not copied.** Only IDs and Launchpad-owned state are stored. See [Source of Truth](../product/source-of-truth.md).

The concrete tables belong in `data/schema.md`, which gets written once this model is implemented.

## Legacy implementation

1. The current tables are `users`, `user_settings`, `projects` (with `pitch_answers` and `draft_tickets` JSONB), `project_answers`, `userflows`, `features` and `tickets`.
2. Draft Tickets live in JSONB, not in their own table.
3. There are no agent_run, human_intervention, decision_doc or uat_check tables.

## Related

- [Database](database.md)
- [AI — Architecture](../ai/architecture.md)
