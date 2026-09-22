# Data — Analytics

> What product analytics are collected, with which tool, and how privacy is respected.

**Status:** Current plan · **Updated:** 2026-09-22

## Decision

1. **PostHog.** It uses the company's own project. See [Integrations — PostHog](../product/integrations/posthog.md).
2. **What it tracks:** dashboard usage events (sign-in, Project opened, agent answered, Draft Ticket confirmed, UAT outcome) and time-to-unblock.
3. **No sensitive content:** no secrets, code or Decision Doc content is sent to analytics.

## Related

- [Security — Privacy](../security/privacy.md)
