# Product — Pitch

> How Pitch works as a guided product-thinking process, the questions it explores, and the Product Definition it produces.

**Status:** Decided · **Updated:** 2026-09-22

## Decision

Pitch is **not a static form**. It is a guided, conversational product-thinking process that shapes and pressure-tests the idea, and it produces a **Product Definition**. It doesn't simply accept everything the user says.

## Details

### Question sets

**MVP**

1. What's the idea?
2. What problem does it solve?
3. Who has this problem?
4. What's the key outcome?
5. How do they solve it today?
6. What makes your approach better or different?
7. What needs to be true for this idea to work?
8. What's the simplest experience that could test that?
9. How would we know if it worked?

**User experience:** top user outcomes; what they can now do that they couldn't before; the "this is amazing" moment; how it should feel; what should feel effortless or immediate; reasons to return and to tell someone; what isn't required; what would make it poor; what it should never feel like; friction that would ruin it; what the user should never have to do; what to deliberately leave out.

**Features and scope:** what makes it unique; what people would describe to others; what could be removed before it stops feeling special; what must exist for the core experience and before users; what comes after launch; what only becomes valuable with real users or data; where it could go; exciting-but-distracting ideas; what it could eventually become.

**Business:** who pays, and are they the user; what they pay for; what they spend today; their current workaround; why they'd pay or switch; what gets more valuable over time; the revenue model, when they pay, and subscription vs one-off vs usage; multiple revenue streams; what to charge for and what to keep free; upgrade drivers; pricing models to test; conditions for profitability; network effects; defensibility; features that invite non-users.

### Assumptions are first-class

For every important claim, ask: **why do we believe this is true?** Each assumption must be verified, supported with evidence, clarified with a human, tested, or explicitly accepted as an assumption. Assumptions must never silently become facts. Planning and implementation agents must not invent missing product truth.

### Product Definition

The Product Definition is the structured, detailed understanding of the product. It should be rich enough that later agents don't need to reinvent the product. It may include:

- **The product:** concept, problem, purpose, target market, ideal users, product-market-fit thinking and desired outcomes.
- **What's being built:** user_flows, features, product scope, exclusions, assumptions and constraints.
- **Experience and business:** experience principles, design intent, business model, pricing direction and marketing considerations.
- **Technical direction:** architecture, technology, data strategy, integrations, security and important product decisions.

Important choices in the Product Definition become [Decision Docs](decision-docs.md). User Flows capture *what the user sees → does → how the system responds → branches → success path → error paths*.

## Legacy implementation

1. Pitch is currently a **static question form**: sections are defined in `lib/pitch-questions.ts` and answers are stored as JSONB in `projects.pitch_answers`. It isn't conversational yet.
2. The Ticket Breakdown agent (`lib/agents/ticket-breakdown-agent.ts`) generates Draft Tickets directly from the raw pitch answers. There's no Product Definition or Decision Doc step in between.

## Related

- [Decision Docs](decision-docs.md)
- [Pitch — Concept](../pitch/concept.md)
- [Workflows — Planning](../workflows/planning.md)
