# Testing — Strategy

> What Dev Testing covers, and how it differs from UAT.

**Status:** Decided · **Updated:** 2026-09-22

## Decision

- **Dev Testing** asks *did we build it correctly?*
- **UAT** asks *did we build the right thing?*

1. **Dev Testing** can include unit, integration, type checking, build verification, lint, end-to-end, regression and security checks.
2. **When it runs:** in the Dev Agent's sandbox before a Pull Request is opened, and again in CI on the Pull Request.
3. **Where tests live:** co-located with the code they test, per the [code standards](../development/coding-standards.md).
4. **Engine logic must be well unit-tested,** because it is deterministic and critical.

## Legacy implementation

1. There's no test framework or tests. Checks are `lint` only, plus manual checklists (now archived).

## Related

- [UAT — Strategy](../uat/strategy.md)
