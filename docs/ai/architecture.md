# AI — Architecture

> What an agent is, the difference between an agent definition and an agent run, and how agents collaborate.

**Status:** Decided · **Updated:** 2026-09-22

## Decision

### What an agent is

```text
Agent = Model + Instructions + Context + Tools + Execution Loop + Output Contract
```

The model is the brain, tools are the hands, context is what the agent knows for this run, and the harness/runtime is the environment and rules around execution.

### Definition vs run

1. An **agent definition** is a reusable specialist role, e.g. Dev Agent.
2. An **agent run** is one isolated execution of that role for a specific task, e.g. the Dev Agent Run for `ACT-118`.
3. A run records `project_id`, `agent_type`, `run_id`, the Linear Ticket or Draft Ticket ID, repository, assignee, status, timestamps, usage/cost, artifacts, failure information and blocked reason.
4. There are no permanently shared agent minds that build up unrelated context.

### Collaboration

Agents communicate through **shared artifacts and state**, not agent-to-agent chat:

```text
Product Definition → Planning Agent → Draft Tickets → Linear → Dev Agent → Pull Request → Review Agent
```

This keeps the system easy to reason about, debug, test, retry, audit and explain.

### Ways to interact

These are interaction modes, not agent types:

1. **Chat:** a human talks directly to an agent, e.g. the Planning Agent.
2. **Code:** an agent gets a sandboxed workspace with the repository. This is mainly for the Dev Agent.
3. **API:** the Engine starts an agent run programmatically, e.g. "ACT-118 is ready."

## Related

- [Agents](agents.md)
- [Agent Harness](agent-harness.md)
- [Context](context.md)
