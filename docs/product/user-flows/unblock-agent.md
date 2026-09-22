# User Flow — Unblock an Agent

> How a human unblocks an AI agent from the browser or a phone, and how the run resumes.

**Status:** Decided · **Updated:** 2026-09-22

## Decision

This is the core away-from-computer flow and a major part of Launchpad's value.

## Flow

1. The Dev Agent is working on `ACT-118` and hits a missing product decision.
2. The agent calls its `request_human` tool. Launchpad sets the Linear Ticket to `status = blocked` with the `human` label, and stores the question and context. The Eve run pauses and uses no compute while it waits.
3. The dashboard shows the item under **Needs Human**, with a notification to the user.
4. The Developer opens it on a browser or phone and sees:
   ```text
   ACT-118 — Dev Agent BLOCKED
   Question: "What should happen if GitHub OAuth succeeds but no local user record exists?"
   [ View Context ] [ Answer Agent ] [ Create / Update Decision ] [ Reassign ] [ Pause ]
   ```
5. The Developer answers, e.g. "Create the user automatically, persist the GitHub identity, then redirect to /dashboard."
6. Launchpad records the answer. If it's a product decision, it creates or updates a Decision Doc.
7. Launchpad removes the `human` label and clears `blocked`.
8. The Launchpad Engine re-evaluates the Workflow.
9. The paused run resumes from its checkpoint with the answer added to its context.

**Alternate paths:** Reassign moves the ticket to a Developer, and the run is cancelled. Pause holds the run until it's resumed.

## Legacy implementation

1. Not built. Depends on the Engine, agent runs on Eve, and Linear integration.

## Related

- [Dashboard](../dashboard.md)
- [Tickets — Human Label](../tickets/human-label.md)
- [AI — Agent Harness](../../ai/agent-harness.md)
