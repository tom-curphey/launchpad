# AI — Agent Harness

> The runtime and behaviour layer around agents. It currently uses Eve on Vercel.

**Status:** Current plan · **Updated:** 2026-09-22

## Decision

**Use [Eve](https://vercel.com/docs/eve), Vercel's open-source TypeScript agent framework, as the agent runtime, deployed on Vercel.** Confirmed as the current plan on 2026-09-22.

```text
Launchpad  = product + UI + Product Definition + Workflow + Engine
Eve        = agent runtime
Planning / Dev / Review = Launchpad agents running on Eve
Models     = the customer's own provider (Claude / GPT / Gemini / …)
```

## Why

Eve provides what Launchpad's runtime layer needs without us building it:

1. **Durable runs.** Each step is checkpointed, so runs survive crashes and deploys, and can pause and resume.
2. **Human-in-the-loop.** Runs wait indefinitely for a human answer without using compute. This is the phone-unblock flow.
3. **Sandboxed compute.** Agent code runs in isolated sandboxes (Vercel Sandbox, Docker, etc.).
4. **Provider-agnostic models.**
5. **Built for many concurrent agents**, and it fits the existing Next.js/Vercel stack.

## Boundaries

1. **The Engine stays outside Eve.** Eve runs agents; the Launchpad Engine decides when and who. Don't move orchestration logic into agents.
2. **Keep a thin adapter.** Launchpad code calls a small internal interface (start run, send human answer, pause, cancel, get status) implemented with Eve, so the runtime can be replaced.
3. **Harness vs ontology.** Methods, behaviour rules and execution instructions live in agent instructions and the harness, not in the ontology.

## Alternatives considered

1. **OpenClaw.** A personal agent that runs on the user's own machine and is controlled from chat apps. It needs the laptop to be on, shares the whole machine between runs, has known third-party skill security issues, and doesn't fit multi-project isolated runs. Rejected as the runtime. Chat-app control may come back as a future interface.
2. **A custom runtime.** Too much to build: durability, sandboxes, pause/resume.

## Build on Foreman

Eve ships a software-factory template called **[Foreman](https://vercel.com/docs/eve/software-factory)**. It routes GitHub and Linear work through classifier, analyst, implementer and reviewer agents, and ends with a reviewed draft Pull Request for a human to merge.

This overlaps heavily with Launchpad's Assemble stage (Dev Agent → Review Agent → Pull Request). **Decided 2026-09-22: build the Dev and Review agents on Foreman's patterns**, adapting them to Launchpad's terms (Linear Ticket, Ticket Change, Dev Testing, `request_human`). Launchpad's own layer stays the same: Pitch, Decision Docs, Planning, the Engine, the dashboard and UAT.

## Risks and first step

1. **Eve is in public beta** (Vercel beta terms), so its APIs may change.
2. **Vercel-only for now.** Eve relies on Vercel Workflows, Sandbox, AI Gateway and observability, and Launchpad targets Vercel only. See [Architecture — Hosting](../architecture/hosting.md).
3. **Proving test:** one Linear Ticket → Dev Agent Run in a sandbox → `request_human` → answer from a phone → resume → Pull Request. If it passes, move this doc to **Decided**.

## Legacy implementation

1. Not started. Agent calls are direct Anthropic SDK calls inside Next.js API routes.

## Related

- [Architecture](architecture.md)
- [Product — Launchpad Engine](../product/launchpad-engine.md)
- [User Flow — Unblock an Agent](../product/user-flows/unblock-agent.md)
