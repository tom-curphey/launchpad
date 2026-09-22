> **Archived 2026-09-22.** Implementation plan for draft ticket generation and the board view. The concept decisions were carried forward; implementation detail belongs in code and tickets.
>
> **Replaced by:** [product/tickets/draft-ticket.md](../../product/tickets/draft-ticket.md) · [product/tickets/dependencies.md](../../product/tickets/dependencies.md) · [workflows/planning.md](../../workflows/planning.md)

---

# Product — Draft Ticket Structure

> How draft tickets are generated, structured, stored, and edited on the board — from pitch answers to a reviewable ticket breakdown, before anything reaches Linear. Linear-specific behaviour lives in [Linear Ticket Structure](linear-ticket-structure.md).

---

## Self-contained tickets

**Decision:**

Every ticket carries the full work order, in as much detail as possible:

| Section | Content |
|---|---|
| Objective | What needs to be achieved |
| Context | Why this work exists (product reason, summarised) |
| Expected User Behaviour | What should happen from the user's perspective |
| Requirements | What specifically needs to be implemented |
| Acceptance Criteria | What must be true before the work is complete |
| Dependencies | What must exist first; what this work blocks |
| Decision Links | Which Decision Docs explain why this work exists |

An agent (or a human) must be able to build from the ticket alone. Decision Docs add depth; the ticket does not depend on them being read.

## Draft ticket lifecycle after approval

**Status:** ✅ Confirmed 2026-09-02 (revised same day — manual cleanup model)

**Decision:**

- Approval is **per ticket**: `DRAFT` → `APPROVED`. Approving a ticket creates its Linear issue.
- **Drafts are retained after Linear creation, but hidden.** Deletion is manual, via a **"Delete Draft Tickets"** button.
- After submission, the ticket page shows **Linear tickets only**. Draft tickets are no longer visible; the only draft-related action available is "Delete Draft Tickets".
- **Why retain drafts:** if Linear tickets were not created properly and need to be re-created, the drafts are the recovery copy. Re-submission uses the existing drafts and **never re-runs AI generation** — no thinking/output cost. Deletion happens only when the user is satisfied everything is in Linear correctly.
- **Per-ticket Linear mapping stored:** each draft ticket records its Linear issue ID at creation time (traceability requirement from the north-star doc §8).
- **Re-submission is idempotent (upsert):** if a Linear issue already exists for a draft (ID known), update it; if missing, create it. Prevents duplicates when re-submitting after a partial failure.
- The retained drafts are a **temporary recovery copy, not a mirrored board** — hidden, read-only, disposable. Launchpad must not become a duplicate issue tracker.
- Regenerating a draft board replaces the existing draft — the UI must confirm before overwriting unapproved edits.

---

*The design below is from the AI Ticket Breakdown & Linear Sync design (2026-08-17).*

## Overview

Transform user's pitch answers into actionable, reviewable tickets that can be synced to Linear. Each ticket is human-sized (≤1 day completion, 10-15 min PR review) with a single testable outcome. Sizing rules live in [Ticket Scope](ticket-scope.md).

## User Flow

```
1. User completes pitch questions → pitch_answers stored in projects table
2. Click "Generate Tickets" → AI analyzes all answers → returns structured ticket breakdown
3. Board view displays tickets by column/phase → user can edit/delete/reorder
4. User reviews in side panel (600px slider) → adjustments as needed
5. Click "Submit to Linear" → creates milestones & issues in Linear
6. Linear becomes source of truth → LaunchPad polls for status display
```

## Architecture

```
┌─────────────────┐
│ Pitch Answers   │ (projects.pitch_answers JSONB)
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ AI Breakdown    │ (POST /generate-tickets)
│    Service      │ (LLM with structured prompt)
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Draft Tickets   │ (projects.draft_tickets JSONB)
│   Storage       │ (persists across sessions)
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Board View UI  │ (Kanban with side panel editor)
│   + CRUD        │ (fully interactive, slider panel)
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Linear Submit   │ (POST /submit)
│                 │ (creates milestones, issues, deps)
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Linear Poll     │ (GET /ticket-status)
│   for Status    │ (reads back from Linear)
└─────────────────┘
```

## Data Structures

### Draft Tickets Storage

**Schema addition:**

```sql
ALTER TABLE projects
ADD COLUMN draft_tickets JSONB DEFAULT '{
  "columns": [],
  "generatedAt": null,
  "linearProjectId": null,
  "submittedAt": null
}'::jsonb;

ALTER TABLE projects
ADD COLUMN linear_team_id TEXT,
ADD COLUMN linear_project_id TEXT;
```

**Structure:**

```json
{
  "columns": [
    {
      "id": "auth",
      "name": "🔐 Authentication",
      "dependsOnColumns": [],
      "milestone": "P1: Authentication",
      "tickets": [
        {
          "id": "ACT-5",
          "title": "Set up auth provider & login flow",
          "description": "Foundation — must be first (GitHub OAuth ready)",
          "deps": [],
          "blocks": ["ACT-6", "ACT-7"],
          "order": 0
        },
        {
          "id": "ACT-6",
          "title": "Create user profile & session management",
          "description": "Store user data, handle sessions",
          "deps": ["ACT-5"],
          "blocks": [],
          "order": 1
        }
      ]
    }
  ],
  "generatedAt": "2026-08-17T10:30:00Z",
  "linearProjectId": null,
  "submittedAt": null
}
```

The post-submission shape (with `linearProjectId` and `linearMappings`) is documented in [Linear Ticket Structure](linear-ticket-structure.md).

## Phase & Column Dependencies

**Phases determined by column dependencies:**

```
Phase 1: Columns with no dependencies (can run in parallel)
Phase 2: Columns that depend only on Phase 1 columns
Phase 3: Columns that depend on Phase 1 or Phase 2 columns
...
```

**Example:**

```json
{
  "columns": [
    {
      "id": "auth",
      "name": "🔐 Authentication",
      "dependsOnColumns": [],
      "milestone": "P1: Authentication"
    },
    {
      "id": "database",
      "name": "📊 Database",
      "dependsOnColumns": [],
      "milestone": "P1: Database"
    },
    {
      "id": "dashboard",
      "name": "🏠 Dashboard",
      "dependsOnColumns": ["auth"],
      "milestone": "P2: Dashboard"
    },
    {
      "id": "create-project",
      "name": "📝 Create Project",
      "dependsOnColumns": ["auth", "database"],
      "milestone": "P2: Create Project"
    }
  ]
}
```

**Board view displays:**

```
P1 (Phase 1):
┌─────────┐ ┌──────────┐
│  Auth   │ │ Database │
└─────────┘ └──────────┘

P2 (Phase 2):
┌─────────┐ ┌──────────────┐
│Dashboard │ │ Create Project│
└─────────┘ └──────────────┘
```

## API Endpoints

| Endpoint | Method | Purpose | Request Body | Response |
|----------|--------|---------|--------------|----------|
| `/api/projects/[id]/generate-tickets` | POST | AI generates tickets from pitch_answers | `{}` | `{ columns: [...] }` |
| `/api/projects/[id]/draft-tickets` | GET | Read draft_tickets for board view | - | `{ columns: [...] }` |
| `/api/projects/[id]/draft-tickets` | PUT | Update draft_tickets (CRUD) | `{ columns: [...] }` | `{ success: true }` |
| `/api/projects/[id]/submit` | POST | Push tickets to Linear | `{}` | `{ linearProjectId, mappings }` |
| `/api/projects/[id]/ticket-status` | GET | Poll Linear for ticket status | - | `{ tickets: { status: [...] } }` |

### Generate Tickets

**POST** `/api/projects/{id}/generate-tickets`

Reads from `project.pitch_answers`, returns structured ticket breakdown.

**AI Prompt Strategy:**

- **Context**: All pitch answers (45+ questions across MVP, UX, Features, Business)
- **Rules**: Ticket sizing (1 day max, 10-15 min PR review), single outcome, testable
- **Output**: Structured JSON with columns, tickets, dependencies
- **Dependencies**: Column-to-column dependencies calculated from ticket dependencies

**Response:**

```json
{
  "columns": [
    {
      "id": "auth",
      "name": "🔐 Authentication",
      "dependsOnColumns": [],
      "milestone": "P1: Authentication",
      "tickets": [...]
    }
  ]
}
```

### Draft Tickets CRUD

**PUT** `/api/projects/{id}/draft-tickets`

Supports full CRUD operations:

- **Create ticket**: Add to column's tickets array
- **Update ticket**: Modify title, description, deps, blocks, order
- **Delete ticket**: Remove from array
- **Move ticket**: Change column assignment
- **Reorder**: Update ticket order within column

**Request:**

```json
{
  "columns": [
    {
      "id": "auth",
      "tickets": [
        {
          "id": "ACT-5",
          "title": "Updated title",
          "deps": [],
          "blocks": ["ACT-6"],
          "order": 0
        }
      ]
    }
  ]
}
```

## UI Components

### Component Structure

```
app/projects/[id]/tickets/
├── page.tsx                  # Server component, fetches data
├── TicketsClient.tsx         # Main client component
├── BoardView.tsx             # Kanban board (columns layout)
├── PhaseHeader.tsx           # Phase headers ("P1", "P2")
├── TicketCard.tsx            # Individual ticket component
├── TicketPanel.tsx           # Right slider panel editor
│   ├── PanelHeader.tsx        # Close button, resize handle
│   ├── TicketForm.tsx         # Edit form (title, desc, deps)
│   └── ActionButtons.tsx     # Save, cancel, delete
├── LinearSyncButton.tsx      # Submit to Linear button
└── DependencyBadge.tsx       # Shows "After ACT-X", "Blocks: Y,Z"
```

### Board View Layout

```
┌─────────────────────────────────────────────────────────┐
│ Header: Project Name | Progress | Sync Button           │
├───────────────────────────────────┬───────────────────┤
│ P1 (Foundation)                   │ │ Ticket Panel     │
│ ┌────────┐ ┌────────┐ ┌────────┐ │ │ ┌─────────────┐ │
│ │  Auth  │ │Database│ │Testing │ │ │ │ Title       │ │
│ │ 3 tix  │ │ 4 tix  │ │ 4 tix  │ │ │ ├─┴─────────────┤ │
│ └────────┘ └────────┘ └────────┘ │ │ │ Description │ │
│                                   │ │ │             │ │
│ P2 (Core Features)                │ │ │ Dependencies│ │
│ ┌────────┐ ┌────────┐            │ │ │             │ │
│ │Dashboard│ │Create  │            │ │ │ [Save]      │ │
│ │ 4 tix  │ │ 5 tix  │            │ │ └─────────────┘ │
│ └────────┘ └────────┘            │ │                 │
│                                   │ │ 600px (adjust) │
└───────────────────────────────────┴───────────────────┘
```

### Ticket Panel (Right Slider)

**Features:**

- Slides in from right
- Default width: 600px (adjustable via drag handle)
- minWidth: 400px, maxWidth: 1000px
- Board remains interactive while panel open
- Click different ticket → panel updates
- Resize handle on panel edge
- Close button or click outside to close

**Panel States:**

- **Closed**: No ticket selected
- **View**: Read-only view of ticket
- **Edit**: Form with editable fields
- **Saving**: Optimistic update, show loading state

### Visual Indicators

**Dependency Badge:**

```typescript
<DependencyBadge
  dependencies={["ACT-5"]}           // "After ACT-5"
  blocks={["ACT-9", "ACT-10"]}       // "Blocks: ACT-9,10"
/>
```

**Column Styling:**

- Same phase columns share purple gradient border
- Progress bar per column (completed tickets / total)
- Parallel columns marked with "Can run in parallel" label

## AI Prompting Strategy

### Prompt Structure

**Components:**

1. **Context** - All pitch answers (45+ questions across 4 sections)
2. **Rules** - Ticket sizing constraints, PR review focus
3. **Output format** - Structured JSON schema
4. **Dependency logic** - How to determine column dependencies

**Key Directives:**

```
- Each ticket = ONE clear outcome a human can complete in ≤1 day
- Each ticket = PR that takes 10-15 minutes to review
- Group related tickets into feature columns
- Mark columns that have no dependencies as parallel (can start same time)
- Dependencies: if ticket B requires ticket A's code, list A in deps
- Testability: each ticket must have clear verification criteria
- Column dependencies: if column B needs column A to finish first, list A
```

### Output Requirements

AI must return:

- 8-12 columns (feature areas)
- 30-50 total tickets (depending on project complexity)
- Each ticket: id, title, description, deps, blocks
- Column dependencies for phase calculation
- Parallel columns clearly marked

## State Management

### Client State

```typescript
interface TicketsState {
  columns: Column[]
  selectedTicket: Ticket | null
  panelWidth: number  // 600 default
  isGenerating: boolean
  isSubmitting: boolean
  lastSaved: Date | null
}
```

### Persistence Strategy

- **Immediate UI updates**: React state (optimistic)
- **Debounced saves**: PUT to `/draft-tickets` 500ms after last change
- **Conflict resolution**: Last write wins (single user editing own project)
- **Refresh recovery**: Load from `draft_tickets` on page load

## Implementation

### Implementation Sequence

1. **Database schema** - Add `draft_tickets`, `linear_*` columns
2. **AI service** - `/generate-tickets` endpoint with prompt engineering
3. **CRUD API** - `/draft-tickets` GET/PUT endpoints
4. **Board UI** - Kanban layout, phase headers, ticket cards
5. **Side panel** - Slider with edit form, resizable
6. **Linear integration** - `/submit` endpoint, milestone/issue creation
7. **Status polling** - `/ticket-status` endpoint, display updates
8. **Testing** - End-to-end flow with real Linear project

### Step 1: Database Schema Changes

**File:** `supabase/migrations/YYYYMMDDHHMMSS_add_draft_tickets.sql`

```sql
-- Add draft_tickets JSONB column for AI-generated tickets
ALTER TABLE projects
ADD COLUMN draft_tickets JSONB DEFAULT '{
  "columns": [],
  "generatedAt": null,
  "linearProjectId": null,
  "submittedAt": null
}'::jsonb;

-- Add Linear integration columns
ALTER TABLE projects
ADD COLUMN linear_team_id TEXT,
ADD COLUMN linear_project_id TEXT;

-- Add comment for documentation
COMMENT ON COLUMN projects.draft_tickets IS 'AI-generated draft tickets before Linear sync. Stores columns, tickets, dependencies, and Linear mappings.';
COMMENT ON COLUMN projects.linear_team_id IS 'Linear team ID for this project (from user settings or project-specific)';
COMMENT ON COLUMN projects.linear_project_id IS 'Linear project ID after tickets are submitted';
```

**Verification:** Run migration, check columns exist on projects table.

### Step 2: AI Agent for Ticket Generation

**Approach:** Agent-based (not one-shot SDK) for multi-step reasoning

**Create:** `lib/agents/ticket-breakdown-agent.ts`

**Agent Responsibilities:**

1. **Analyze pitch_answers** — Understand product vision from 45+ questions
2. **Identify feature areas** — Group into coherent columns
3. **Break down to tickets** — Apply sizing rules (≤1 day, 10-15 min PR review)
4. **Validate dependencies** — Ensure technical correctness
5. **Structure output** — Format as JSON with phases calculated

**Agent Tools:**

- `validateTicketSize` — Check if ticket scope is appropriate
- `identifyDependencies` — Analyze technical relationships
- `detectGaps` — Find missing work items
- `calculatePhases` — Derive phases from column dependencies

**Model:** Fable (claude-fable-5)

**Configuration:**

```typescript
const ticketAgent = new Agent({
  model: 'claude-fable-5',
  system: `You are a senior product engineer specializing in breaking down products into human-sized tickets.

  Your job: Analyze pitch answers → identify features → break down into tickets → validate → structure.

  Rules:
  - Each ticket = ≤1 day work, 10-15 min PR review
  - Each ticket = single testable outcome
  - Dependencies must make technical sense
  - Group related tickets into feature columns
  - Mark parallel columns (no dependencies)
  `,

  tools: [
    validateTicketSize,
    identifyDependencies,
    detectGaps,
    calculatePhases
  ]
})
```

**Output Schema:** Zod schema matching `draft_tickets` structure

### Step 3: Generate Tickets API Endpoint

**File:** `app/api/projects/[id]/generate-tickets/route.ts`

**Responsibilities:**

1. Load `pitch_answers` from projects table
2. Call ticket agent with pitch_answers as input
3. Validate agent output against schema
4. Save to `draft_tickets` column
5. Return structured response

**Request:** `POST /api/projects/{id}/generate-tickets`

```json
{}
```

**Response:**

```json
{
  "columns": [
    {
      "id": "auth",
      "name": "🔐 Authentication",
      "dependsOnColumns": [],
      "milestone": "P1: Authentication",
      "tickets": [...]
    }
  ],
  "generatedAt": "2026-08-17T10:30:00Z"
}
```

**Error Handling:**

- Agent timeout
- Schema validation failure
- Missing pitch_answers (404)

### Step 4: Draft Tickets CRUD API

**File:** `app/api/projects/[id]/draft-tickets/route.ts`

**Endpoints:**

**GET** `/api/projects/{id}/draft-tickets`

- Return current `draft_tickets` from projects table
- Used by board view to render

**PUT** `/api/projects/{id}/draft-tickets`

- Update `draft_tickets` with modifications
- Supports: create/update/delete ticket, move between columns, reorder
- Request body: full `draft_tickets` structure

**Request Body:**

```json
{
  "columns": [
    {
      "id": "auth",
      "tickets": [
        {
          "id": "ACT-5",
          "title": "Updated title",
          "description": "...",
          "deps": [],
          "blocks": ["ACT-6"],
          "order": 0
        }
      ]
    }
  ]
}
```

**Response:**

```json
{
  "success": true
}
```

### Step 5: Board View UI Components

**Directory:** `app/projects/[id]/tickets/`

**Files:**

- `page.tsx` — Server component, loads draft_tickets
- `TicketsClient.tsx` — Main client component with state
- `BoardView.tsx` — Kanban layout with columns
- `PhaseHeader.tsx` — "P1", "P2" headers with parallel indicator
- `TicketCard.tsx` — Individual ticket component
- `DependencyBadge.tsx` — Shows "After ACT-X", "Blocks: Y,Z"

**Board Layout:**

```
┌─────────────────────────────────────────────────────────┐
│ Header: Project Name | Progress | Sync Button           │
├───────────────────────────────────┬───────────────────┤
│ P1 (Foundation)                   │ │ Ticket Panel     │
│ ┌────────┐ ┌────────┐ ┌────────┐ │ │                   │
│ │  Auth  │ │Database│ │Testing │ │ │     (slides in)  │
│ │ 3 tix  │ │ 4 tix  │ │ 4 tix  │ │ │                   │
│ └────────┘ └────────┘ └────────┘ │ │                   │
│                                   │ │                   │
│ P2 (Core Features)                │ │                   │
│ ┌────────┐ ┌────────┐            │ │                   │
│ │Dashboard│ │Create  │            │ │                   │
│ │ 4 tix  │ │ 5 tix  │            │ │                   │
│ └────────┘ └────────┘            │ │                   │
└───────────────────────────────────┴───────────────────┘
```

**Features:**

- Click ticket → opens side panel
- Drag ticket between columns (future)
- Phase headers show parallel work
- Progress bars per column

### Step 6: Side Panel (Slider)

**File:** `app/projects/[id]/tickets/TicketPanel.tsx`

**Components:**

- `PanelHeader.tsx` — Close button, resize handle
- `TicketForm.tsx` — Edit form (title, description, dependencies)
- `ActionButtons.tsx` — Save, cancel, delete

**Features:**

- Slides in from right (600px default)
- Resizable (min 400px, max 1000px)
- Board stays interactive while panel open
- Click different ticket → panel updates
- Optimistic updates with debounced save

**State:**

```typescript
interface TicketPanelState {
  isOpen: boolean
  ticket: Ticket | null
  width: number // 600 default
  mode: 'view' | 'edit' | 'saving'
}
```

Steps 7–8 (Linear submit and status polling) are documented in [Linear Ticket Structure](linear-ticket-structure.md).

### Step 9: UI Polish & Testing

**Polish:**

- Loading states for AI generation
- Error messages for failed operations
- Success indicators for Linear sync
- Responsive design for mobile
- Keyboard shortcuts (optional)

**Testing:**

1. **Database:** Verify migrations apply correctly
2. **Agent:** Test ticket generation with sample pitch_answers
3. **API:** Test all endpoints with curl/Postman
4. **UI:** Test board interactions, panel, CRUD operations
5. **Linear:** Test submit with real Linear project
6. **E2E:** Full flow from pitch answers → tickets → Linear

**Test Data:** Use project ID `33b6afc0-d347-4395-b298-612f17fa06cd` (has pitch_answers)

## Success Criteria

- ✅ AI generates 30-50 well-scoped tickets from pitch answers
- ✅ Tickets are human-sized (≤1 day, 10-15 min PR review)
- ✅ Board view matches reference HTML design
- ✅ Side panel allows editing while board stays interactive
- ✅ Column dependencies correctly calculate phases
- ✅ Linear sync creates milestones, issues, and dependencies
- ✅ Status polling displays current Linear state
- ✅ Drafts persist across page refreshes
