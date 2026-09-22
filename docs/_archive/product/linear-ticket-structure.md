> **Archived 2026-09-22.** Linear sync implementation plan (milestones, polling). The concepts were carried forward.
>
> **Replaced by:** [product/tickets/linear-ticket.md](../../product/tickets/linear-ticket.md) · [product/integrations/linear.md](../../product/integrations/linear.md)

---

# Product — Linear Ticket Structure

> How draft tickets map onto Linear — milestones, issues, dependencies, submission, and status polling. Generation and board design live in [Draft Ticket Structure](draft-ticket-structure.md).

---

## After Linear Submission

```json
{
  "columns": [...],
  "generatedAt": "2026-08-17T10:30:00Z",
  "linearProjectId": "LIN-123",
  "linearMappings": {
    "milestones": {
      "auth": "LIN-MILESTONE-1",
      "dashboard": "LIN-MILESTONE-2"
    },
    "tickets": {
      "ACT-5": "LIN-456",
      "ACT-6": "LIN-457"
    }
  },
  "submittedAt": "2026-08-17T11:00:00Z"
}
```

## Linear Integration

### Mapping Strategy

**LaunchPad → Linear Translation:**

- LaunchPad **columns** → Linear **milestones**
- LaunchPad **tickets** → Linear **issues** (within milestones)
- LaunchPad **column deps** → Linear **milestone dependencies**

### Milestone Naming

Each column becomes one milestone:

```
Column "Authentication" (Phase 1) → Milestone "P1: Authentication"
Column "Database" (Phase 1)      → Milestone "P1: Database"
Column "Dashboard" (Phase 2)     → Milestone "P2: Dashboard"
```

### Linear API Flow

**On Submit:**

1. Create Linear project (or use existing)
2. For each column: create milestone with target date
3. For each ticket in column: create issue in that milestone
4. For each column dependency: create milestone dependency
5. Store all mappings for status polling

**On Status Poll:**

1. Query Linear issues by project
2. Map Linear issue IDs back to LaunchPad ticket IDs
3. Return current status, assignee, priority

### Linear as Source of Truth

After submission:

- LaunchPad displays Linear status
- Future CRUD operations happen in Linear
- LaunchPad becomes read-only view for tickets
- Status polling keeps LaunchPad in sync

## Implementation

### Step 7: Linear Integration — Submit Endpoint

**File:** `app/api/projects/[id]/submit/route.ts`

**Process:**

1. Get `linear_team_id` from user settings or project
2. Create/get Linear project (or use existing)
3. For each column: create milestone with name "P1: Authentication"
4. For each ticket: create issue in corresponding milestone
5. For each column dependency: create milestone dependency
6. Store mappings in `draft_tickets.linearMappings`
7. Store `linearProjectId` in `draft_tickets.linearProjectId`
8. Store `linear_project_id` on projects table

**Request:** `POST /api/projects/{id}/submit`

```json
{}
```

**Response:**

```json
{
  "linearProjectId": "LIN-123",
  "linearMappings": {
    "milestones": {
      "auth": "LIN-MILESTONE-1",
      "dashboard": "LIN-MILESTONE-2"
    },
    "tickets": {
      "ACT-5": "LIN-456",
      "ACT-6": "LIN-457"
    }
  }
}
```

**Linear Tools Used:**

- `mcp__linear-server__save_project` — Create/get project
- `mcp__linear-server__save_milestone` — Create milestones
- `mcp__linear-server__save_issue` — Create issues
- `mcp__linear-server__save_issue` (with deps) — Set dependencies

### Step 8: Ticket Status Polling

**File:** `app/api/projects/[id]/ticket-status/route.ts`

**Process:**

1. Load `draft_tickets.linearMappings` from projects table
2. Load `linear_project_id` from projects table
3. Query Linear for all issues in project
4. Map Linear issue IDs back to LaunchPad ticket IDs
5. Return current status, assignee, priority for each

**Request:** `GET /api/projects/{id}/ticket-status`

**Response:**

```json
{
  "tickets": {
    "ACT-5": {
      "linearId": "LIN-456",
      "status": "In Progress",
      "assignee": "tom-curphey",
      "priority": "High"
    },
    "ACT-6": {
      "linearId": "LIN-457",
      "status": "Todo",
      "assignee": null,
      "priority": "Medium"
    }
  }
}
```

**Linear Tools Used:**

- `mcp__linear-server__list_issues` — Get issues from project
- Filter by `projectId`

**Polling Strategy:** Client-side interval (30-60 seconds) or on-demand refresh

*Source: AI Ticket Breakdown & Linear Sync design, 2026-08-17.*
