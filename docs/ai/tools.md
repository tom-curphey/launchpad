# AI — Tools

> The tools each agent may use.

**Status:** Current plan · **Updated:** 2026-09-22

## Decision

Tools are narrow, explicit and scoped to the agent's role and to the current Project.

| Agent | Tools |
|---|---|
| Planning | get Product Definition, get Decision Docs, get Draft Tickets, get Linear Tickets, search repository, create or update Draft Tickets, `request_human` |
| Dev | read file, search repository, edit file, run commands and tests (in the sandbox), inspect Git, commit, push, create Pull Request, `request_human` |
| Review | read Pull Request, read diff, get Linear Ticket, get Decision Docs, run tests, search repository, post review |

`request_human` sets `blocked` + `human` on the Linear Ticket and pauses the run. See [User Flow — Unblock an Agent](../product/user-flows/unblock-agent.md).

A Launchpad MCP server that exposes these tools to external clients is a possible later addition.

## Related

- [Agents](agents.md)
- [Security — Secrets](../security/secrets.md)
