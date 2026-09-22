# Product — Launchpad Engine

> The deterministic orchestration layer that decides when work happens and who does it.

**Status:** Decided · **Updated:** 2026-09-22

## Decision

The **Launchpad Engine** is deterministic code. It is explicitly **not an AI agent**.

- The Engine decides **when** something should happen and **who** should do it.
- The specialist agent decides **how** to do its job.

## Why

Readiness, dependencies and assignment must be predictable, testable and auditable. Putting orchestration logic in an LLM prompt makes it brittle and unexplainable.

## Details

### Inputs the Engine evaluates

Workflow, dependencies, Linear Ticket status, readiness, assignment, blockers, agent run state and human intervention state.

### Rules

| Condition | Engine action |
|---|---|
| Dependencies incomplete | `blocked`, no dispatch |
| `ready` + assigned to Dev Agent | Dispatch a Dev Agent Run |
| Assigned to a Developer | Wait and observe. Never dispatch AI |
| `unassigned` | Do nothing. Never silently assign an AI agent |
| `blocked` + `human` label | Surface in the dashboard as "Needs Human". Wait |
| Human resolves a blocker | Re-evaluate the Workflow and resume or dispatch |
| Pull Request opened by a Dev Agent Run | Dispatch a Review Agent Run |

### Triggers

The Engine re-evaluates on events: a Linear webhook, a GitHub webhook, an agent run finishing or blocking, or a human action in the dashboard. A periodic sweep catches missed events.

### Relationship to the runtime

The Engine runs inside the Launchpad app. It *starts* agent runs through the agent runtime ([Eve](../ai/agent-harness.md)) and reacts to their results. Eve runs agents; it does not make orchestration decisions.

## Legacy implementation

1. There is no Engine yet. The only AI call, ticket breakdown, is triggered manually from an API route.

## Related

- [Workflows — Dependencies](../workflows/dependencies.md)
- [Workflows — Assignment](../workflows/assignment.md)
- [Tickets — Human Label](tickets/human-label.md)
