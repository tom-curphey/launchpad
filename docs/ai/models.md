# AI — Models

> How models are chosen, connected and paid for, without depending on one provider.

**Status:** Current plan · **Updated:** 2026-09-22

## Decision

1. **Provider-aware, not provider-locked.** No Launchpad code imports a provider SDK directly outside the model adapter.
2. **Per-agent configuration.** Each agent type has a configured provider and model, e.g. Planning → Claude, Dev → a coding model, Review → an independent model.
3. **Agents use API keys, humans use subscriptions.** Agent runs use the company's API keys. Developers working a human-assigned ticket use their own subscription locally. See [Integrations — AI Providers](../product/integrations/ai-providers.md).
4. **Credentials live in environment variables.** See [Security — Secrets](../security/secrets.md).
5. **Model routing stays simple**, a config lookup, until there's a real need for more.

## Related

- [Agent Harness](agent-harness.md)
