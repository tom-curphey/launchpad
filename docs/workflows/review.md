# Workflows — Review

> How Ticket Changes are reviewed before merge.

**Status:** Decided · **Updated:** 2026-09-22

## Decision

```text
Pull Request opened → Review Agent Run → pull_request_review (human) → merge
```

1. The Review Agent is independent from the Dev Agent: a separate run and context, and optionally a different model.
2. The Review Agent checks the Ticket Change against ticket_scope, acceptance criteria and Decision Docs. It doesn't only check code style.
3. A human does `pull_request_review` for meaningful changes, and a human approves the merge.
4. Linear status moves to `in_review` while the Pull Request is open.

## Related

- [Development — Pull Requests](../development/pull-requests.md)
