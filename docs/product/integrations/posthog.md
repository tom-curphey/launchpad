# Integrations — PostHog

> How Launchpad uses PostHog.

**Status:** Current plan · **Updated:** 2026-09-22

## Decision

1. **The company's own PostHog project,** configured by keys in the environment.
2. **Used for product analytics** on the Launchpad dashboard itself: how people use Launchpad, where they drop off, and feature usage.
3. **Never product context.** Analytics data is never used as agent context.

## Related

- [Data — Analytics](../../data/analytics.md)
