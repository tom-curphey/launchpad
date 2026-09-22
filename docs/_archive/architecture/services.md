> **Archived 2026-09-22.** GitHub requirements notes. Moved to product-specific integrations.
>
> **Replaced by:** [product/integrations/github.md](../../product/integrations/github.md)

---

# Architecture — Services

> Describes external service integrations — what Launchpad requires from GitHub and Linear.

---

## GitHub Integration Requirements

### Three Aspects Required

1. **AI writes code** → Commits to GitHub
2. **AI creates PRs** → Pull requests in GitHub
3. **AI runs tests** → Via GitHub

### Human Review Flow

- Review PRs in GitHub
- Pull branches locally for userflow testing
- Approve/merge from Launchpad or GitHub
