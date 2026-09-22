> **Archived 2026-09-22.** Earlier assignment thinking. It used named AI agents, the removed 'Needs You' concept and a 'Confirmation' stage. The core rules (humans respected, unassigned stays unassigned, Linear owns assignment after approval) were carried forward.
>
> **Replaced by:** [product/tickets/assignment.md](../../product/tickets/assignment.md) · [workflows/assignment.md](../../workflows/assignment.md)

---

# Activatus Launchpad — Ticket Assignment & Execution Decisions

> How work is assigned — AI agents by default at draft, humans take what they want, Linear owns assignment after approval.

---

## Purpose

This document records the current decisions around how Launchpad assigns work to AI agents and human developers.

The goal is to keep assignment simple, understandable, and aligned with Linear rather than creating a second assignment system inside Launchpad.

The key principle is:

> **Draft determines WHAT gets built, HOW the work is divided, and WHO owns it. Assemble determines WHEN each piece can run.**

**Related docs:** [Status Model](status-model.md), [Draft Ticket Structure](draft-ticket-structure.md), and [UAT](uat.md) — from the Pitch → Assemble → Deploy architecture review.

---

## 1. Assignment Happens During Draft / Confirmation

Launchpad generates proposed implementation tickets after the relevant product decisions have been made.

These tickets initially exist inside Launchpad / Supabase.

At this point they are still:

> **Draft Tickets**

They have not yet been created inside Linear.

The Draft / Confirmation stage is where the user reviews:

- What tickets have been created
- Whether tickets need to be split
- Whether tickets should be merged
- Whether anything is missing
- Dependencies between tickets
- What can happen in parallel
- Who is responsible for each ticket

Assignment is therefore part of confirming the build plan.

---

## 2. AI Agents Are Assigned by Default

When Launchpad generates the draft tickets, the default assumption is that the work will be performed by AI agents.

Launchpad should assign each draft ticket to an appropriate named AI agent.

For example:

    Authentication API
    Assigned: Marcus [AI]

    Login Screen
    Assigned: Alex [AI]

    Database Schema
    Assigned: Marcus [AI]

    Onboarding
    Assigned: Sophie [AI]

The exact agent selection logic can evolve later.

The important principle is:

> **Draft tickets should normally already have an AI owner before the confirmation screen is shown.**

---

## 3. AI Agents Have Human-Readable Names

AI agents should have names rather than being exposed to the user as generic identifiers such as:

- Agent 1
- Agent 2
- Worker 3
- Coding Agent A

For example:

- Alex
- Marcus
- Sophie

These names represent persistent AI workers or agent identities inside the Launchpad development environment.

This makes the system easier to understand conversationally.

Instead of:

> Agent 3 is working on LP-142.

Launchpad / OpenClaw can say:

> Alex is working on the account settings screen.

Instead of:

> Worker 2 is blocked.

It can say:

> Marcus is blocked waiting for LP-138.

This becomes particularly useful when controlling or discussing the project through OpenClaw.

---

## 4. Draft Confirmation UI

The Draft / Confirmation UI should make assignment highly visible.

A user should be able to see something like:

    Authentication API        Marcus [AI]
    Login Screen              Alex [AI]
    Database Schema           Marcus [AI]
    Onboarding                Sophie [AI]
    Settings Screen           Alex [AI]

The user should then be able to select one or more tickets and reassign them.

For example:

    ☑ Login Screen
    ☑ Settings Screen

    Assign Selected → Tom

The result becomes:

    Authentication API        Marcus [AI]
    Login Screen              Tom [Human]
    Database Schema           Marcus [AI]
    Onboarding                Sophie [AI]
    Settings Screen           Tom [Human]

The user should be able to do this individually or in bulk.

---

## 5. Human Developers Can Take Work

A human developer does not require a special "Manual" ticket type.

Assignment itself determines who is doing the work.

If a human wants to perform a ticket, they simply assign the ticket to themselves.

For example:

    Ticket: Settings Screen
    Assignee: Tom

That means:

> **Tom owns this work.**

Launchpad should not separately classify this as:

> Manual = true

There is no need for a separate:

- Manual status
- Human execution mode
- Hybrid execution mode

The assignee is enough to determine who owns the work.

---

## 6. Assignment Is Not a Ticket Status

Assignment and ticket status are separate concepts.

For example:

    Status: Ready
    Assignee: Tom

or:

    Status: In Progress
    Assignee: Alex [AI]

or:

    Status: Blocked
    Assignee: Marcus [AI]

"Human" or "AI" is not a workflow state.

The workflow state describes:

> **Where is this work?**

The assignee describes:

> **Who owns this work?**

---

## 7. Approval Confirms the Build Plan

The Draft / Confirmation stage should act as a meaningful approval gate.

The user is confirming:

## Work

Are these the correct pieces of work?

## Scope

Should all of these tickets actually be built?

## Dependencies

Are the dependencies correct?

## Parallelisation

Which tickets can happen simultaneously?

## Assignment

Who should perform each piece of work?

Once this has been reviewed, the user confirms the plan.

For example:

> **Approve Build Plan**

At this point Launchpad can create the approved tickets inside Linear.

---

## 8. Approved Assignment Is Sent to Linear

When a draft ticket is approved and created inside Linear, its approved assignee should be carried across.

For example:

Draft:

    Login Screen
    Assigned: Tom

becomes:

    Linear Issue: LP-142
    Login Screen
    Assignee: Tom

Likewise:

    Authentication API
    Assigned: Marcus [AI]

becomes:

    Linear Issue: LP-143
    Authentication API
    Assignee: Marcus [AI]

Linear should therefore begin with the assignment decisions already made during Draft / Confirmation.

---

## 9. Linear Becomes the Source of Truth After Approval

Before approval:

> **Launchpad / Supabase owns the draft assignment.**

After approval:

> **Linear owns the live assignment.**

Launchpad should observe the assignment from Linear rather than maintaining a competing assignment state.

This maintains the existing architectural principle:

> **Do not rebuild Linear.**

---

## 10. Humans Can Reassign Work in Linear

Assignment is not permanently locked when the build plan is approved.

A human developer may later open Linear and:

- Assign a ticket to themselves
- Assign it to another human
- Assign it to an AI agent
- Remove the assignee

Launchpad should detect and respect those changes.

For example:

    LP-142
    Previous Assignee: Alex [AI]
    New Assignee: Tom [Human]

Launchpad should immediately understand:

> Tom now owns LP-142.

The AI agent should no longer be dispatched to perform that work.

---

## 11. Unassigned Work Remains Unassigned

If an approved Linear ticket has no assignee:

    Assignee: Unassigned

Launchpad should NOT automatically decide to give it to an AI agent.

An unassigned ticket means:

> **Nobody currently owns this work.**

A human can manually assign it inside Linear.

This avoids Launchpad unexpectedly claiming work that a developer may intend to perform.

The rule is:

> **After approval, Launchpad does not silently assign unassigned tickets.**

---

## 12. Assemble Uses Assignment Rather Than Choosing Ownership

Once the project enters Assemble, Launchpad does not need to continually ask:

> Who should do this?

That decision has normally already been made during Draft / Confirmation.

Instead, when a ticket becomes ready, the engine asks:

    TICKET BECOMES READY
            ↓
       CHECK ASSIGNEE
            ↓
    ┌───────────────┬───────────────┬───────────────┐
    │               │               │
    ▼               ▼               ▼
    AI AGENT        HUMAN           UNASSIGNED
    │               │               │
    Dispatch        Wait for        Do not execute
    work            human           automatically
    │               │               │
    └───────────────┴───────────────┴───────────────┘

The engine primarily determines:

> **When can this ticket run?**

rather than:

> **Who should own this ticket?**

---

## 13. AI-Agent Tickets

If a ticket is assigned to a named AI agent:

    Status: Ready
    Assignee: Alex [AI]

and its dependencies are satisfied, Launchpad can dispatch the work.

For example:

    LP-142 becomes READY
          ↓
    Assignee = Alex
          ↓
    Launchpad dispatches LP-142 to Alex
          ↓
    Alex receives:
        - Linear ticket
        - Decision Docs
        - Repository context
        - Dependencies
        - Acceptance criteria
          ↓
    Alex performs work
          ↓
    Tests
          ↓
    Pull Request
          ↓
    Launchpad observes result

---

## 14. Human Tickets

If a ticket is assigned to a human:

    Status: Ready
    Assignee: Tom

Launchpad should NOT dispatch an AI agent.

The ticket simply becomes available for Tom to perform.

Tom can work using the normal tools appropriate to the task:

- IDE
- Linear
- GitHub
- Figma
- Supabase
- Stripe
- Browser
- Infrastructure tools
- Other systems

Launchpad does not require the human to perform the work through OpenClaw.

The human works normally.

Launchpad observes the resulting project state.

---

## 15. Human and AI Work Share the Same Dependency Graph

Human work and AI work should not exist in separate project-management systems.

They all participate in the same project dependency graph.

For example:

                 ┌── LP-102 → Alex [AI]
    LP-101 ──────┼── LP-103 → Tom [Human]
                 └── LP-104 → Marcus [AI]
                            ↓
                          LP-105

Launchpad understands that:

- Alex can work on LP-102
- Tom can work on LP-103
- Marcus can work on LP-104
- These may happen in parallel
- LP-105 must wait for the required dependencies

The engine orchestrates around both humans and AI.

---

## 16. Human Assignment Prevents AI Dispatch

There must be a simple safety rule:

> **If a ticket is assigned to a human, Launchpad must not dispatch an AI agent to perform it.**

Likewise, if a named AI agent has already begun a ticket, that ownership should be visible.

This prevents humans and AI accidentally performing the same work simultaneously.

---

## 17. Reassignment During Execution

Tickets may be reassigned after work begins.

For example:

    Marcus [AI]
        ↓
    Technical blocker discovered
        ↓
    Human decides to take over
        ↓
    Linear reassigned to Tom
        ↓
    Launchpad detects assignment change
        ↓
    Marcus stops owning the work
        ↓
    Tom becomes the current owner

The reverse may also happen.

A human may decide:

> Give this ticket to Sophie.

If Sophie is a recognised AI agent and the ticket is ready, Launchpad can dispatch it accordingly.

---

## 20. Needs You Is Different From Human Assignment

A ticket being assigned to a human does NOT automatically mean:

> Needs You

Human-assigned work is normal planned work.

For example:

    LP-142
    Settings Screen
    Assigned: Tom
    Status: Ready

This does not necessarily require an alert.

"Needs You" should instead be reserved for situations where the system requires human judgment or action before work can continue.

Examples:

- Product decision required
- Draft tickets require approval
- A scope decision is required
- PR requires review
- A blocker needs clarification
- UAT requires approval
- Deployment requires approval

Therefore:

> **Human Assignment = planned human work**

while:

> **Needs You = human intervention is required to unblock or approve something**

---

## 21. Draft Assignment Rules

The current intended rules are:

1. Launchpad generates proposed tickets inside Supabase.

2. Proposed tickets are assigned to named AI agents by default.

3. Launchpad should attempt to choose an appropriate AI agent for each ticket.

4. The Draft / Confirmation UI shows the assignment for every ticket.

5. Humans can select one or multiple draft tickets.

6. Selected tickets can be bulk-assigned to a human developer.

7. Individual tickets can be reassigned to another AI agent.

8. Individual tickets can be reassigned to another human.

9. Assignment is reviewed before tickets are approved.

10. Approval confirms both the work plan and the ownership of the work.

---

## 22. Post-Approval Assignment Rules

Once tickets have been created in Linear:

1. Linear becomes the source of truth for assignment.

2. Launchpad observes Linear assignment changes.

3. Humans can assign tickets to themselves directly inside Linear.

4. Humans can assign tickets to other humans.

5. Humans can assign tickets to named AI agents.

6. An unassigned ticket remains unassigned.

7. Launchpad must not silently assign unassigned approved work to AI.

8. A human-assigned ticket must not be dispatched to an AI agent.

9. An AI-assigned ticket can be dispatched when its dependencies and orchestration rules allow it.

10. Assignment changes should immediately affect Launchpad's orchestration state.

---

## 23. Responsibility Split

## Draft / Confirmation

Determines:

> **WHAT are we building?**

> **HOW has the work been divided?**

> **WHO owns each piece?**

---

## Linear

Maintains:

> **Who currently owns the approved ticket?**

and:

> **What state is that ticket currently in?**

---

## Assemble

Determines:

> **WHEN can each ticket happen?**

> **What can happen in parallel?**

> **What is blocked?**

> **What becomes ready next?**

---

## AI Agents / Humans

Perform:

> **The actual work.**

---

## OpenClaw

Provides:

> **A human-readable conversational view and control surface over the project.**

---

## 24. Core Mental Model

The workflow is:

    DECISION DOCS
          ↓
    DRAFT TICKETS
          ↓
    AI ASSIGNMENT BY DEFAULT
          ↓
    HUMAN REVIEWS PLAN
          ↓
    HUMAN TAKES ANY WORK THEY WANT
          ↓
    CONFIRM ASSIGNMENTS
          ↓
    APPROVE BUILD PLAN
          ↓
    CREATE LINEAR TICKETS
          ↓
    LINEAR OWNS ASSIGNMENT
          ↓
    ASSEMBLE WATCHES DEPENDENCIES
          ↓
    READY TICKET
          ↓
    CHECK ASSIGNEE
          ↓
    ┌────────────────┬─────────────────┬─────────────────┐
    │                │                 │
    AI AGENT         HUMAN             UNASSIGNED
    │                │                 │
    Dispatch         Human performs    Wait for human
    automatically    work manually     assignment
    │                │                 │
    └────────────────┴─────────────────┴─────────────────┘
                          ↓
                    WORK COMPLETES
                          ↓
                ENGINE RE-EVALUATES
                  DEPENDENCY GRAPH
                          ↓
                     NEXT WORK

---

## 25. Core Decision

The system should not introduce unnecessary concepts such as:

- Manual mode
- AI mode
- Hybrid mode

Assignment already answers the important question:

> **Who owns this work?**

The architecture should therefore remain simple:

> **If the assignee is an AI agent, Launchpad may execute the work through that agent.**

> **If the assignee is a human, Launchpad waits for the human to perform the work.**

> **If the ticket is unassigned, Launchpad leaves it unassigned until a human chooses an owner.**

---

## 26. One-Line Principle

> **Launchpad assigns AI work by default during Draft, humans take the work they want before approval, Linear owns assignment after approval, and Assemble orchestrates around whoever currently owns each ticket.**

---

*Last updated: 2 September 2026*

---

*The two sections below are from the architecture decision review (confirmed 2026-09-02).*

## Parallel work

Derived from the dependency graph: tickets with no unmet dependencies can run simultaneously. Launchpad surfaces this — the user does not hand-orchestrate.

## Agent assignment is agent-agnostic

Launchpad's contract is *"this work must move planned → built → verified."* Whether Claude, another coding agent, a specialist agent, or a human performs the work can change over time.
