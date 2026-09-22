> **Archived 2026-09-22.** Earlier 'Activatus Launchpad' product bible. It used the PAD method with no Live stage, plus terms since removed: 'User Journeys', 'Open Questions', generic 'ticket'. Rewritten from the master context.
>
> **Replaced by:** [product/overview.md](../../product/overview.md) · [product/lifecycle.md](../../product/lifecycle.md) · [product/ontology.md](../../product/ontology.md) · [product/pitch.md](../../product/pitch.md)

---

# Activatus Launchpad

> The Launchpad product bible — what Launchpad is, the PAD method (Pitch → Assemble → Deploy), the product journey, and technical specs.

---

## Product Definition & PAD Methodology

> **From idea to live.**

**Launchpad** is an AI-assisted product development and project management tool that takes an idea from initial conversation through planning, development, testing and ultimately deployment.

It exists to solve the gap between:

> "I know what I want to build."

and:

> "It's built, tested and live."

The core methodology is deliberately simple:

# Pitch → Assemble → Deploy

Or:

# PAD

The complexity exists **inside** these three stages, not in the user's mental model.

---

# 1. Why Launchpad Exists

AI has dramatically reduced the effort required to write software.

That creates a new problem.

**Writing code faster doesn't necessarily mean building products better.**

A person can now describe an idea to an AI coding tool and immediately start generating components, database tables, APIs and features.

But fundamental questions still remain:

- What exactly are we building?
- What should the user be able to do?
- What does the complete user journey look like?
- What decisions have already been made?
- What assumptions haven't been resolved?
- What should be built first?
- What depends on what?
- What does "done" mean?
- How do we know the implementation matches the original intent?
- What needs human review?
- What is blocked?
- What has passed testing?
- What is ready for UAT?
- What is actually safe to deploy?

AI makes **production** faster.

It doesn't automatically create **clarity, structure or continuity of intent**.

Launchpad provides that structure.

---

# 2. What Launchpad Is

Launchpad is an **AI-assisted product development and project orchestration system**.

Its job is to take a product from:

**Idea**

↓

**Definition**

↓

**Plan**

↓

**Development**

↓

**Testing**

↓

**User Acceptance**

↓

**Deployment**

↓

**Live Product**

Launchpad maintains the context, decisions, roadmap and progress required to move through that journey.

The user should always be able to answer:

> **Where is my project?**

> **What's happening right now?**

> **What's blocking it?**

> **What needs my attention?**

> **What happens next?**

---

# 3. What Launchpad Is Not

## Launchpad is not a business-building platform

Launchpad does not attempt to manage the entire business lifecycle.

It isn't responsible for:

- Marketing strategy
- Sales
- Lead generation
- Advertising
- Business growth
- Customer acquisition
- Brand strategy
- General product-market fit

Those concepts may exist elsewhere within Activatus.

Launchpad has a deliberately clear boundary:

> **It starts with a product idea and ends with a deployed product.**

---

## Launchpad is not simply a vibe-coding tool

AI is deeply involved in Launchpad, but Launchpad isn't based around:

> Prompt → Generate → Look → Change Prompt → Generate Again

That approach can be useful for experimentation, but it can also result in the product emerging accidentally during development.

Launchpad puts **intent before implementation**.

The broad process is:

> Understand what we're building → create a path → build against that path → verify the result → deploy.

AI assists throughout that journey.

It doesn't remove the product-development process.

It makes the process dramatically more efficient.

---

# 4. Launchpad Is More Than a Ticket Manager

Traditional project-management software generally begins **after someone has already determined what needs to happen**.

Someone has already:

- Defined the product
- Designed the functionality
- Made product decisions
- Created requirements
- Broken down the project

Then the project-management software tracks:

- Epics
- Issues
- Tickets
- Priorities
- Milestones
- Statuses
- Assignments

Launchpad begins **before this point**.

A user should be able to arrive with:

> "I've got an idea..."

And Launchpad helps turn that idea into something structured enough to build.

Instead of:

**Idea → Human figures everything out → Project management software → Development**

Launchpad becomes:

**Idea → Launchpad → Live Product**

---

# 5. The Launchpad Product Journey

At the highest level:

    IDEA
      │
      ▼
    ┌───────────┐
    │   PITCH   │
    └─────┬─────┘
          │
     What are we
      building?
          │
          ▼
    ┌───────────┐
    │ ASSEMBLE  │
    └─────┬─────┘
          │
       Build it
          │
          ▼
    ┌───────────┐
    │  DEPLOY   │
    └─────┬─────┘
          │
     Get it safely
         live
          │
          ▼
        LIVE

The entire product can therefore be understood through three words:

# Pitch. Assemble. Deploy.

---

# 6. The PAD Method

PAD is the methodology underlying Launchpad.

## P — Pitch

> **Define what we're building.**

## A — Assemble

> **Turn that definition into a working product.**

## D — Deploy

> **Verify it and take it live.**

Each stage represents a genuine phase of product development.

The acronym exists because the methodology works — rather than creating an acronym first and forcing artificial stages into it.

---

# 7. P — Pitch

## The fundamental question

> **What are we building?**

Pitch is where an unstructured idea becomes a **clear product concept**.

This is not primarily market validation.

Launchpad isn't trying to determine whether the user has discovered the next billion-dollar company.

It is validating the **product itself**.

Questions include:

- Does the concept make sense?
- How should it work?
- Who interacts with it?
- What should happen?
- What are the user flows?
- Where are the gaps?
- What decisions need to be made?
- What functionality is required?
- What shouldn't be included?
- What needs to be resolved before development?

---

# 8. Starting With an Idea

The starting input can be extremely rough.

A user might enter:

> "I want to build an app that calls grandparents and records their life stories."

That's enough to begin.

Launchpad then discusses the product with the user.

It could explore:

- What happens when someone signs up?
- Who is the primary user?
- Who receives the call?
- How is the family member invited?
- How does scheduling work?
- What happens when a call isn't answered?
- Where are recordings stored?
- What happens after a conversation?
- How does someone view a story?
- Who can access it?
- What permissions exist?
- What happens during onboarding?
- What does the dashboard contain?
- What is MVP?
- What belongs in a later release?
- What edge cases haven't been considered?

The AI shouldn't simply respond:

> "Great idea! Let's build it."

Its job is to help the user **think through the product**.

---

# 9. Pitch Should Be Conversational

A normal project tool gives the user empty fields:

- Title
- Description
- Requirements
- Acceptance Criteria

But people don't naturally think in ticket schemas.

They think through **conversation**.

Launchpad should allow someone to discuss their idea naturally.

The system progressively extracts structure from that conversation.

The user gets to remain focused on:

> **What am I trying to create?**

Launchpad handles turning that thinking into a structured product definition.

---

# 10. Pitch Becomes an Artefact

The conversation shouldn't disappear into chat history.

Launchpad continuously turns the discussion into a living **Pitch**.

The Pitch could contain:

## Product

What is being created?

## Problem / Purpose

Why does this product exist?

## Users

Who interacts with it?

## Core Experience

What should the product allow them to accomplish?

## User Journeys

How do people move through the product?

## Features

What functionality is required?

## Rules

How should the system behave?

## Decisions

What has already been agreed?

## Open Questions

What still needs resolution?

## Constraints

Technical, product or operational limitations.

## MVP Scope

What belongs in this build?

## Future Scope

What has explicitly been excluded for now?

The Pitch becomes the **source of truth for product intent**.

---

# 11. Validation Inside Pitch

Validation within Launchpad does not primarily mean:

> "Will the market buy this?"

It means:

> **Have we thought through the product sufficiently to confidently plan the build?**

Launchpad should actively identify ambiguity.

For example:

> "You've said users can share stories with family members, but we haven't defined whether recipients require an account."

Or:

> "The onboarding flow asks the customer to nominate someone to receive calls, but we haven't defined how consent works."

Launchpad should find **holes in the product definition before those holes become development problems.**

---

# 12. Pitch Has an Exit Condition

Pitch should not continue indefinitely.

Eventually Launchpad should determine:

> **This product is sufficiently defined to assemble.**

That doesn't mean every future decision has been made.

It means there is enough clarity to create a reliable build plan.

The progression becomes:

**Conversation**

↓

**Product Definition**

↓

**Validation**

↓

**Pitch Approved**

↓

# Assemble

---

# 13. A — Assemble

## The fundamental question

> **How do we turn this into a working product?**

This is where Launchpad transitions from **thinking** into **production**.

The approved Pitch contains the product intent.

Assemble converts that intent into an executable development system.

---

# 14. Assemble Starts With the Roadmap

The first job isn't coding.

It's determining:

> **What needs to happen, and in what order?**

Launchpad takes the approved Pitch and creates a roadmap.

For example:

    PROJECT

    01 — Foundation
    02 — Authentication
    03 — Onboarding
    04 — Core Data Model
    05 — Primary User Journey
    06 — Supporting Features
    07 — Administration
    08 — Error Handling
    09 — Testing
    10 — Release Preparation

The exact structure depends on the product.

The important principle is:

> **The user shouldn't have to manually translate their idea into project-management architecture.**

Launchpad does that.

---

# 15. The Roadmap Becomes Executable Units

Launchpad decomposes the roadmap into **small, achievable, ordered units of work**.

Each unit should contain enough context that a human developer or AI coding agent can complete it without needing to reinterpret the entire project.

A unit could include:

## Objective

What needs to be achieved?

## Context

Why does it exist?

## Requirements

What needs to happen?

## User Behaviour

What should the user experience?

## Technical Considerations

Relevant architecture or dependencies.

## Acceptance Criteria

What must be true before completion?

## Testing Requirements

How should it be technically verified?

## Dependencies

What must exist first?

---

# 16. Controlled Development

Launchpad isn't simply giving an AI a huge specification and saying:

> "Go build this."

Instead, it creates controlled units.

    PITCH
      ↓
    ROADMAP
      ↓
    MILESTONE
      ↓
    TASK
      ↓
    BUILD
      ↓
    TEST
      ↓
    REVIEW
      ↓
    COMPLETE

This allows the project to move **linearly enough to understand**, even if the underlying development process is complex.

---

# 17. Assemble Is Also Project Management

Once development begins, Launchpad becomes the control centre.

The user shouldn't need to understand every technical detail to understand:

> **Where is my project?**

The dashboard could surface:

- Overall project completion
- Current milestone
- Current task
- Completed work
- Work in progress
- Blocked work
- Failed tests
- Open issues
- Pull requests awaiting review
- Decisions requiring human input
- Changes to scope
- Dependencies
- Upcoming work
- Path to completion

This is where Launchpad moves beyond being an AI planning assistant.

It becomes a **living project-management environment**.

---

# 18. Humans and AI Can Both Build

Launchpad should not be philosophically dependent on any specific development technology.

It should not be defined as:

> "Claude writes the code."

Today the development ecosystem might include:

- Claude
- Human developers
- GitHub
- Linear
- Automated CI
- Testing systems

Tomorrow it could include:

- Multiple coding agents
- Specialist review agents
- Autonomous QA
- Different repositories
- Different issue-management systems
- New development environments

Launchpad shouldn't care.

Its abstraction is:

> **This work needs to move from planned → built → verified.**

Who or what performs that work can change.

This is one reason **Assemble** is useful terminology.

It describes the outcome rather than the underlying technology.

---

# 19. Technical Testing Lives Inside Assemble

Development and technical testing aren't separate high-level phases.

They're a loop:

**Develop**

↓

**Test**

↓

**Fix**

↓

**Test**

↓

**Review**

↓

**Complete**

A task shouldn't become complete simply because code exists.

It becomes complete when it satisfies its acceptance criteria.

Testing may include:

- Unit tests
- Integration tests
- Type checks
- Linting
- Build checks
- End-to-end tests
- Security checks
- Code review
- AI review
- Human review where required

Therefore:

> **Technical testing is part of assembling the product correctly.**

This leaves User Acceptance Testing for a different job.

---

# 20. D — Deploy

## The fundamental question

> **Is this ready to go live?**

Deploy should not simply be a button.

Deploy is the final controlled process that takes an assembled product and moves it into production.

---

# 21. UAT Belongs Inside Deploy

Technical testing asks:

> **Does the software work according to its specification?**

User Acceptance Testing asks:

> **Does the product actually work as intended for the person using it?**

These are different.

A feature can pass every automated test and still be wrong.

For example:

- The flow is confusing.
- The wording is wrong.
- A screen technically works but isn't what the user intended.
- A requirement was interpreted incorrectly.
- Something important was forgotten.
- The overall experience doesn't feel right.

Before deployment:

> **The human experiences the product.**

---

# 22. The Deploy Pipeline

The Deploy phase contains four major processes:

# 1. UAT

## User Acceptance Testing

The owner/user walks through the product.

Launchpad can present exactly what needs approval.

For example:

> **Onboarding Flow — Ready for UAT**
>
> Test:
>
> 1. Create account.
> 2. Verify email.
> 3. Complete profile.
> 4. Add first family member.
> 5. Schedule first conversation.
>
> Expected outcome:
>
> User reaches the dashboard with the scheduled conversation visible.

The user can then:

**Approve**

or

**Report Issue**

If an issue is found, it feeds back into Assemble.

---

# 23. Pipeline Testing

Once UAT is approved, Launchpad runs production-readiness checks.

These could include:

- Production build
- Type checking
- Unit tests
- Integration tests
- End-to-end tests
- Environment validation
- Database migrations
- Security checks
- Production configuration
- Deployment prerequisites

Failures block deployment.

---

# 24. Routing

Launchpad then confirms **where everything is going**.

Depending on the architecture, this could include:

- Production environment
- Domain
- DNS
- API routes
- Database
- Environment variables
- Authentication callbacks
- Webhooks
- Storage
- CDN
- Serverless functions
- Third-party integrations

The purpose is to ensure the product isn't merely working locally.

It must be correctly connected to its production environment.

---

# 25. Publishing

Finally:

> **Take it live.**

Launchpad can:

- Build the production version
- Deploy
- Verify health
- Confirm the production URL
- Record the release
- Confirm successful publishing

The final result is:

# Live Product

---

# 26. Deploy Is a Gate

Deployment should feel like a controlled readiness process.

For example:

## Deployment Readiness

| Gate | Status |
|---|---|
| User Acceptance Testing | ✓ Approved |
| Pipeline Testing | ✓ Passed |
| Routing | ✓ Ready |
| Production Build | ✓ Passed |
| Publishing | Ready |
| **Deployment** | **READY** |

Once every gate passes:

# READY TO DEPLOY

**Launch Product →**

The user gains confidence that deployment is not happening accidentally.

---

# 27. The Complete PAD Model

# P — PITCH

### Define it.

**Input:** Idea

**Process:**

Conversation → Exploration → User Flows → Requirements → Decisions → Validation

**Output:**

**Approved Pitch**

↓

# A — ASSEMBLE

### Build it.

**Input:** Approved Pitch

**Process:**

Roadmap → Itemise → Sequence → Develop → Technical Test → PR → Review → Fix → Complete

**Output:**

**Working Product**

↓

# D — DEPLOY

### Launch it.

**Input:** Working Product

**Process:**

UAT → Pipeline Testing → Routing → Publishing

**Output:**

**Live Product**

---

# 28. Each Stage Produces the Input for the Next

The methodology forms a clear chain:

    IDEA
     │
     ▼
    PITCH
     │
     └──► Approved Product Definition
                    │
                    ▼
                ASSEMBLE
                    │
                    └──► Working Product
                               │
                               ▼
                            DEPLOY
                               │
                               └──► Live Product

There is no artificial stage added simply to create an acronym.

---

# 29. Feedback Can Travel Backwards

PAD is directional, but it should not be rigid.

During **Assemble**, development may uncover something that invalidates part of the Pitch.

Therefore:

**Assemble → Pitch**

During **Deploy/UAT**, the user may discover something needs changing.

Therefore:

**Deploy → Assemble**

If the feedback changes the underlying concept:

**Deploy → Pitch**

The model becomes:

    PITCH  →  ASSEMBLE  →  DEPLOY
      ↑          ↑            │
      └──────────┴────────────┘
              FEEDBACK

The goal is always forward movement.

But **new information is allowed to change the path.**

---

# 30. Why the Product Is Called Launchpad

A launchpad has a real-world purpose:

> **It is the infrastructure from which something is prepared, supported and launched.**

That is almost exactly what the product does.

The idea is the thing being launched.

Launchpad provides the structure underneath it.

It doesn't invent the destination.

It doesn't own the idea.

It doesn't replace the creator.

It provides the infrastructure required to get the idea **off the ground**.

---

# 31. Launchpad vs Pathfinder

The original product concept was called **Pathfinder**.

Pathfinder focused on:

> **Finding the way forward.**

That concept still exists inside Launchpad.

But Launchpad more accurately represents what the product has become.

Pathfinder says:

> "Here's the path."

Launchpad says:

> "Here's the path. Now let's get this thing built and launched."

Launchpad therefore represents both:

- Direction
- Execution

It doesn't simply find the path.

It helps the user travel it.

---

# 32. Why Launchpad Fits Activatus

Activatus contains a broader philosophy and product ecosystem.

The core journey is:

## Legacy

Perspective.

## Identity

Clarity.

## Fuel

Assets and focus.

## Elevate

Skills.

These are concepts about **how someone develops their life**.

Launchpad is different.

Launchpad is a **tool**.

Therefore, it doesn't need to sound like another pillar.

The architecture can be:

    ACTIVATUS

    THE JOURNEY
    │
    ├── Legacy
    ├── Identity
    ├── Fuel
    └── Elevate


    TOOLS
    │
    ├── Launchpad
    └── ...

This distinction is important.

Launchpad supports the philosophy without becoming part of the philosophical framework itself.

---

# 33. Launchpad and Fuel

Launchpad has a particularly natural relationship with **Fuel**.

Fuel asks:

> **What matters most?**

↓

> **Where should I focus?**

↓

> **What assets should I build?**

↓

> **How do those assets fuel my life?**

Once someone determines:

> **This is an asset worth building.**

Launchpad can help them actually build it.

Therefore:

> **Fuel helps identify what deserves your energy.**

> **Launchpad helps turn that focus into something real.**

Launchpad is an execution tool rather than another philosophical pillar.

---

# 34. The Energy Metaphor

Launchpad also fits the broader language of Activatus.

Activatus contains ideas around:

- Activation
- Fuel
- Energy
- Focus
- Growth
- Direction
- Assets
- Skills
- Expression

Launchpad sits naturally within that world.

Something currently exists only as potential.

Launchpad gives it the structure required to move.

The product helps transform:

> **Potential → Direction → Action → Reality**

---

# 35. Why PAD Matters to the Brand

Launchpad is the product name.

PAD is the methodology underneath it.

# Launchpad

### Powered by the PAD Method

**Pitch → Assemble → Deploy**

This gives the product its own language.

Users can naturally say:

> "The project is still in Pitch."

> "We've moved it into Assemble."

> "It's ready for Deploy."

> "There are three projects on my Launchpad."

> "UAT failed, so it's gone back into Assemble."

> "The Pitch changed, so Launchpad rebuilt the affected roadmap."

The methodology therefore becomes part of the product experience.

---

# 36. PAD Creates the UI Architecture

The project dashboard can use the three stages as its primary navigation.

# PITCH

- Concept
- User Journeys
- Requirements
- Decisions
- Open Questions
- MVP Scope
- Validation
- Approval

# ASSEMBLE

- Roadmap
- Milestones
- Tasks
- Development
- Pull Requests
- Automated Testing
- Issues
- Blockers
- Reviews
- Progress

# DEPLOY

- UAT
- Pipeline Testing
- Routing
- Production Readiness
- Publishing
- Deployment
- Release History

This means the user's mental model of the product and the information architecture of the software are the same.

---

# 37. Example Project View

A project might look like:

    PROJECT: LIVING LEGACY

    PITCH
    ✓ Concept
    ✓ User Journeys
    ✓ Requirements
    ✓ MVP Scope
    ✓ Approved

    ASSEMBLE
    ✓ Roadmap
    ✓ 84 / 97 Tasks
    ! 3 Issues
    ! 2 PRs Awaiting Review
    ○ 10 Remaining

    DEPLOY
    ○ UAT
    ○ Pipeline
    ○ Routing
    ○ Publish

The user can understand the state of the entire project within seconds.

---

# 38. Portfolio Dashboard

Launchpad should eventually allow multiple projects to be managed simultaneously.

For example:

## Your Launchpad

| Project | Stage | Progress | Needs You |
|---|---|---:|---|
| Living Legacy | Assemble | 74% | 2 PR reviews |
| Activatus Website | Deploy | 96% | UAT |
| Identity App | Pitch | 32% | 3 decisions |
| Business Dashboard | Assemble | 48% | 1 blocker |

The purpose is not simply to show activity.

It is to answer:

> **What requires my attention?**

---

# 39. "Needs You"

This could become one of Launchpad's most important concepts.

The tool should prevent the human from becoming the project-management bottleneck.

Instead of requiring the user to constantly inspect every project, repository, issue tracker and AI session, Launchpad surfaces:

# Needs You

Examples:

## Pitch

- Three product decisions require answers.
- One user flow needs approval.

## Assemble

- One architectural decision is blocked.
- Two PRs require review.
- One task cannot proceed without clarification.

## Deploy

- UAT is ready.
- Production deployment requires approval.

Everything else can continue.

The user focuses their attention where **human judgment creates the most value**.

---

# 40. Launchpad as an Orchestration Layer

Long term, the most valuable thing Launchpad owns may not be code generation.

It may be **context and orchestration**.

Launchpad knows:

- What we're building
- Why we're building it
- How it should work
- What decisions were made
- What the roadmap is
- What has been completed
- What is currently being built
- What failed
- What requires attention
- What has been approved
- What still needs testing
- What is ready to deploy
- What is live

Different humans, AI agents and development systems can come and go without the project losing its memory.

Launchpad becomes the persistent intelligence surrounding the project.

---

# 41. The Three Architectural Layers

The PAD methodology can also be understood as three deeper layers.

## PITCH = INTENT

> **What should exist?**

Pitch preserves the original product intention.

---

## ASSEMBLE = EXECUTION

> **Turn intent into reality.**

The project is planned, decomposed, developed, technically tested and reviewed.

---

## DEPLOY = ACCEPTANCE

> **Does reality match intent closely enough to release?**

The user experiences the result, approves it and takes it live.

Therefore:

# Intent → Execution → Acceptance

maps directly to:

# Pitch → Assemble → Deploy

---

# 42. The Core Product Loop

The deeper Launchpad loop becomes:

    INTENT
      │
      ▼
    PITCH
      │
      ▼
    PLAN
      │
      ▼
    DEVELOP
      │
      ▼
    TECHNICAL TEST
      │
      ▼
    UAT
      │
      ▼
    ACCEPT
      │
      ▼
    DEPLOY
      │
      ▼
    LIVE

If something fails:

    ISSUE
      │
      ├── Product issue ──────► PITCH
      │
      ├── Planning issue ─────► ASSEMBLE / ROADMAP
      │
      └── Build issue ────────► ASSEMBLE / DEVELOPMENT

The project always retains a path forward.

---

# 43. Core Product Promise

Launchpad should not primarily position itself as:

> "AI project management."

That is technically true but undersells the product.

It also shouldn't simply be:

> "AI software development."

That market is broad and crowded.

The deeper promise is:

> **Turn a product idea into a clear path to launch — and manage every step required to get it there.**

The simplest version is:

# From idea to live.

And the PAD methodology explains how:

# Pitch it.
# Assemble it.
# Deploy it.

---

# 44. Brand Hierarchy

The recommended hierarchy is:

# ACTIVATUS

## Launchpad

### From idea to live.

**Powered by the PAD Method**

### Pitch
Define what you're building.

↓

### Assemble
Turn it into a working product.

↓

### Deploy
Verify it and take it live.

---

# 45. Three Levels of Understanding

One of the strengths of Launchpad + PAD is that the concept can be understood at different levels.

## In 3 Seconds

> **Pitch → Assemble → Deploy**

## In 30 Seconds

> **Define it → Build it → Launch it**

## In Detail

### Pitch

Conversation → Product Definition → User Flows → Requirements → Validation → Approval

### Assemble

Roadmap → Tasks → Development → Technical Testing → PRs → Review → Completion

### Deploy

UAT → Pipeline Testing → Routing → Publishing → Live

This means the methodology remains simple for non-technical users while still containing enough structure for developers and project managers.

---

# 46. Product Design Principle: Complexity Beneath Simplicity

Launchpad can eventually become technically sophisticated.

It may orchestrate:

- AI agents
- Repositories
- Branches
- Pull requests
- Testing systems
- Databases
- Deployments
- Infrastructure
- Issue trackers
- Documentation
- Human approvals
- Product decisions
- Release pipelines

But the user should not need to think about all of those systems simultaneously.

Their mental model remains:

# Pitch

What are we building?

↓

# Assemble

Let's build it.

↓

# Deploy

Let's get it live.

This should be a foundational product-design principle:

> **Complexity beneath simplicity.**

---

# 47. Product Boundary

The most important boundary to protect is that Launchpad should not gradually become:

> **"Build my entire business for me."**

Launchpad does not need to own:

- Marketing
- Sales
- Customer acquisition
- Advertising
- Business strategy
- Growth
- Lead generation

Those can be handled elsewhere within the broader Activatus ecosystem.

Launchpad has a clear beginning and end:

# START

**I have a product idea.**

↓

# LAUNCHPAD

**Pitch → Assemble → Deploy**

↓

# END

**The product is live.**

That clarity is one of the product's greatest strengths.

---

# 48. The Launchpad Vision

Launchpad should ultimately become the place where a creator can bring an idea and progressively turn it into reality without losing the original intent along the way.

The creator shouldn't need to manually translate ideas between:

- Chat conversations
- Planning documents
- Ticket systems
- Development agents
- Git repositories
- Pull requests
- Testing environments
- Deployment systems

Launchpad maintains the thread connecting all of them.

It understands the idea.

It understands the decisions.

It understands the roadmap.

It understands the work.

It understands the current state.

It understands what needs human attention.

It understands what has been approved.

And it understands what is ready to launch.

The result is not simply faster coding.

It is a more controlled path from **thought to reality**.

---

# Final Definition

## Activatus Launchpad

**Launchpad is an AI-assisted product development and project management platform that takes a product from idea to live.**

It preserves the original product intent, turns that intent into an executable roadmap, manages development across humans and AI, surfaces the decisions that require human attention, verifies the resulting experience and manages the path into production.

Its operating methodology is **PAD**:

### P — Pitch
**Define it.**

Turn an idea into a clear, validated product definition.

### A — Assemble
**Build it.**

Turn the Pitch into a roadmap, executable work and ultimately a technically verified working product.

### D — Deploy
**Launch it.**

Move the assembled product through UAT, pipeline testing, routing and publishing until it is safely live.

---

# ACTIVATUS LAUNCHPAD

> ## From idea to live.

### The PAD Method

**Pitch → Assemble → Deploy**

**Define it. Build it. Launch it.**

---

## Core Userflows

*From the original decisions log.*

1. **Pitch → Outline Business** — Forms to capture product vision, define problem/solution/users, document decisions
2. **Tickets → Organize Work** — Create tickets grouped by features/userflows with TDD approach
3. **AI Completes Tasks** — AI writes code locally, creates PRs in GitHub, runs tests automatically
4. **AI Creates & Reviews PRs** — AI generates pull requests, reviews code, enforces standards
5. **Human Review** — Review PRs to merge, pull branches locally to test userflows, final approval
