# Product — Overview

> What Launchpad is, why it exists, and the one mental model to remember.

**Status:** Decided · **Updated:** 2026-09-22

## Decision

Launchpad is an **AI-assisted product development and software delivery system**. It takes a product from idea to live:

```text
PITCH → ASSEMBLE → DEPLOY → LIVE
```

It is not just a coding assistant, a ticket generator, a project management tool or a set of autonomous agents. It connects the whole chain: idea → product understanding → product decisions → implementation planning → approved work → development → review → UAT → deployment → live product.

## Why

AI coding systems are very good at *doing work*. They often don't reliably know:

1. why the work exists
2. what the product is supposed to be
3. which decisions have already been made
4. what is in scope, and what must stay unchanged
5. how one piece of work relates to another
6. when to stop and ask a human
7. who owns the next action
8. whether the result actually meets the intended product outcome

Launchpad provides that missing product-development layer.

## Details

### Core principle

> AI should not merely write code. It should work from an understood product, explicit decisions, controlled work, clear acceptance criteria and an observable workflow.

Humans own important product decisions. AI does specialist work inside a defined system. At any point a human should be able to answer: *why does this work exist, what was decided, what work came from it, who or what is doing it, what changed, did it meet the outcome, and is it safe to move forward?*

### Final mental model

```text
HUMAN
  ↓
LAUNCHPAD DASHBOARD
  ↓
PRODUCT DEFINITION + DECISION DOCS
  ↓
PLANNING AGENT → DRAFT TICKETS → HUMAN APPROVAL → LINEAR
  ↓
WORKFLOW → LAUNCHPAD ENGINE
  ↓
DEV AGENT / DEVELOPER → TICKET CHANGE → DEV TESTING
  ↓
REVIEW AGENT → PULL REQUEST → UAT → DEPLOY → LIVE

Throughout: Launchpad ↔ Human · AI Providers · GitHub · Linear · Supabase · Agent Runtime (Eve)
```

### Success state

> I can define what I want to build, capture why decisions were made, let Launchpad plan the work, approve it, let AI agents and humans execute it, see what's happening across every repository, unblock agents remotely (including from my phone), review changes, validate through UAT, and know when the correct product is live.

It should feel like a controlled AI software-development organisation, not a pile of disconnected prompts.

## Related

- [Lifecycle](lifecycle.md)
- [Ontology](ontology.md)
- [Source of Truth](source-of-truth.md)
- [Scope — Exclusions](../scope/exclusions.md): what Launchpad is not
- [Architecture — System](../architecture/system.md)
