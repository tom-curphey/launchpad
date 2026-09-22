# Product — Dashboard

> The browser dashboard: the first primary interface, with cross-project visibility and remote control of agents from any device.

**Status:** Decided · **Updated:** 2026-09-22

## Decision

The **browser dashboard** is the first primary interface. It covers every Project connected to a Launchpad installation, and it must work well on a phone.

The core goal is that **a developer can leave the computer and still run AI development**: see what needs them, answer it, and let agents continue.

## Details

### Cross-project view

```text
LAUNCHPAD
Activatus       ● 3 agents running   ⚠ 1 blocked   ✓ 14 completed
SlackProperty   ● 1 agent running    ✓ 8 completed
Launchpad       ● 2 agents running   ⚠ 2 require human input
```

It answers: what's running, which Projects are active, which agents are working, what finished, what failed, what's blocked, what needs a human, what can continue automatically, what's waiting on another ticket or on approval, and what changed recently.

### Project view

Overview · Product Definition · Decision Docs · Workflow · Draft Tickets · Linear Tickets · Agents · Pull Requests · UAT · Deployments · Activity / History · Settings

The exact navigation can evolve; the concepts stay.

### Actions

Approve · Reject · Answer · Pause · Resume · Reassign · View Ticket · View PR · View Context · Open / Create Decision

### Mobile

The phone experience is focused on intervention: **what needs me, what's running, what finished, what failed, and what decision is required.** It starts as a responsive web app, with a PWA or native app possible later. See [Design — Responsive](../design/responsive.md).

### Workflow view

The Workflow can be shown as an interactive graph. Nodes are clickable and open the related Draft Ticket or Linear Ticket.

## Legacy implementation

1. `app/dashboard/` lists the signed-in user's Projects. There's no agent, blocked or needs-human status yet.
2. `app/projects/[id]/tickets/` shows the Draft Ticket board.

## Related

- [User Flow — Unblock an Agent](user-flows/unblock-agent.md)
- [Tickets — Human Label](tickets/human-label.md)
- [Scope — Priorities](../scope/priorities.md)
