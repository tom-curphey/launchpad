# Integrations — AI Providers

> How companies connect their own AI, and who pays for which usage.

**Status:** Current plan · **Updated:** 2026-09-22

## Decision

1. **Bring your own AI.** Claude, OpenAI/Codex, Gemini and future providers.
2. **Agents use API keys.** Planning, Dev and Review agent runs use the company's provider API keys, set in the environment and routed through Eve / AI Gateway.
3. **Humans use their own subscription.** When a Linear Ticket is assigned to a human, the Developer works locally with their own AI subscription, e.g. Claude Code on a Pro or Max plan. Launchpad doesn't manage these credentials.
4. **Per-agent model choice.** For example, Planning on Claude, Dev on a coding model, and Review on an independent model.
5. **Auth is not context.** Agents never rely on a person's chat history or memory.

## Why

1. Agents run unattended in the cloud, so they need API credentials.
2. Developers already pay for subscriptions and use them in their own tools.
3. Keeping the two separate keeps billing clear and avoids depending on subscription terms for automated work.

## Related

- [AI — Models](../../ai/models.md)
- [Tickets — Assignment](../tickets/assignment.md)
- [Architecture — Environments](../../architecture/environments.md)
