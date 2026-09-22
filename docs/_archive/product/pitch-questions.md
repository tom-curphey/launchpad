> **Archived 2026-09-22.** Described the Pitch Questions form (storage and UI). Pitch is now defined as a guided, conversational process.
>
> **Replaced by:** [product/pitch.md](../../product/pitch.md)

---

# Pitch Questions System

> The Pitch Questions system — how structured questions are stored, migrated, and edited per project.

---

## Overview

The Pitch Questions system is designed to help founders craft their pitch through structured, grouped questions with a smooth, focused editing experience.

## Data Architecture

### Storage Approach

Each project stores question metadata directly on the project record:

```typescript
interface ProjectQuestionMetadata {
  questions: {
    id: string
    section: string
    question: string
    answer?: string
    order: number
    deprecated?: boolean
  }[]
  last_migration_run: number // timestamp of last applied migration
}
```

### Migration Layer

Questions can evolve over time through migrations:

1. Each project stores `last_migration_run`
2. On load, run any migrations that haven't been applied yet
3. Migrations update the stored metadata directly
4. UI renders based on current stored metadata

**This gives you:**
- Reorder questions without breaking existing data
- Move questions between sections
- Deprecate old questions (they stay in user data but hidden from UI)
- No heavy framework required

## UI Design

### Layout Pattern

```
┌─────────────────────────────────────────────────────────────┐
│  Left Sidebar              │  Main Content Area            │
│  ─────────────              │  ────────────────             │
│                             │                               │
│  ▼ Problem Questions       │  ━━━━━━━━━━━━━━━━━━━━━━━━━━━  │
│  ▼ Solution Questions      │  ▼ Problem Statement           │
│  ▼ Market Questions        │  ━━━━━━━━━━━━━━━━━━━━━━━━━━━  │
│  ▼ Business Model          │                                 │
│                             │  Q: What problem are you...    │
│  ▼ Team Questions          │  │                              │
│                             │  │ [editable answer field]      │
│                             │  │                              │
│                             │  Q: How big is the problem...   │
│                             │  │                              │
│                             │                                 │
│                             │  ━━━━━━━━━━━━━━━━━━━━━━━━━━━  │
│                             │  ▼ Solution (collapsed)         │
│                             │  ━━━━━━━━━━━━━━━━━━━━━━━━━━━  │
└─────────────────────────────────────────────────────────────┘
```

### Content Area Design

**Choice:** Scrollable page with all questions visible, grouped by collapsible accordion sections.

**Why this approach:**
- Flow state — work through questions naturally without click-heavy navigation
- Progress visibility — see where you're at and what's coming
- Jump navigation — sidebar lets you hop back to specific sections
- Context preservation — each question can include examples, hints, or guidance

### Interaction Behaviour

| Action | Result |
|--------|--------|
| Click sidebar item | Jump to section + expand accordion if collapsed |
| Click section heading | Toggle accordion open/closed |
| Scroll through page | Sidebar highlights current section |
| Edit answer | Auto-save (debounced) or save on blur |

### Section Structure

Each question section has:
- **Clear section heading** — visually distinct, acts as accordion toggle
- **Questions listed** — each with question text and editable answer field
- **Optional context** — examples, hints, or guidance per question
- **Collapsed state** — shows heading + question count, hides content

## Question Groups (Initial)

Based on standard pitch structure:

1. **Problem Questions** — The problem you're solving
2. **Solution Questions** — Your solution and how it works
3. **Market Questions** — Market size, opportunity, competition
4. **Business Model** — How you make money
5. **Team Questions** — Who's building it
6. **Traction** — Progress, customers, metrics
7. **Ask** — What you're raising for

## Implementation Notes

- Save behaviour: Debounced autosave (500-1000ms) or on blur
- Each question gets a stable ID for migration tracking
- Section ordering stored in metadata
- Deprecated questions persist in data but are hidden from UI
- Sidebar syncs with scroll position for current-section highlighting
