'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

// Sidebar configuration for Launchpad docs
interface DocItem {
  title: string;
  file: string;
  content: string;
}

interface DocCategory {
  title: string;
  items: DocItem[];
}

const sidebarConfig: DocCategory[] = [
  {
    title: 'Getting Started',
    items: [
      {
        title: 'Launchpad Documentation',
        file: 'launchpad-documentation',
        content: `# 🚀 Launchpad Documentation

## Overview

**Launchpad** is an AI-assisted product development and project management platform that takes a product from idea to live.

### Core Value Proposition

- **Tell us your idea** — rough thought, brain dump, or vague concept
- **We help you develop the pitch** to customers and validate demand
- **Organise everything** into a clear, prioritised plan
- **Break it into small, human-doable tasks**
- **Review and test** code for reliability and scalability
- **Act on PRs** with real oversight
- **Govern the process** — see what's actually working
- **Evolve the product** based on what shipped

## The PAD Method

### P — Pitch
**Define what you're building.**

- Turn an idea into a clear product definition
- Explore user flows and requirements
- Validate product intent before building
- Stop guessing, start knowing

### A — Assemble
**Build it.**

- Turn definition into an executable roadmap
- Break down into achievable units
- Develop with controlled progress
- Technical testing and review

### D — Deploy
**Launch it.**

- User Acceptance Testing
- Production-readiness checks
- Routing and publishing
- Take it live safely
`,
      },
    ],
  },
  {
    title: 'Project Status',
    items: [
      {
        title: 'Decisions',
        file: 'decisions',
        content: `# Decisions & Architecture

This document tracks key architectural decisions, reasoning, and context for Launchpad.

## Quick Links

- [Product Vision](#product-vision)
- [Database Architecture](#database-architecture-decisions)
- [Reference Databases](#reference-database-analysis)
- [Build Strategy](#build-strategy)
- [Authentication](#authentication-setup)
- [GitHub Integration](#github-integration-requirements)
- [Scaling Strategy](#scaling-strategy)

## Product Vision

### Target Users
1. Primary: Solo founders (including the founder)
2. Secondary: Teams (future consideration)

### Core Userflows
1. Pitch → Outline Business
2. Tickets → Organize Work
3. AI Completes Tasks
4. AI Creates & Reviews PRs
5. Human Review

### Tech Stack
- Next.js 16 (App Router)
- Tailwind CSS v4
- Supabase (Postgres)
- NextAuth v5 with GitHub OAuth

## Database Architecture

**Single Database Approach** ✅

One Supabase database for all data. 20 projects = ~17k rows (trivial for Postgres).

Real bottlenecks: AI token costs, GitHub API rate limits, agent execution time.

## Reference Databases

### Wayfinder (Product Development)
- Features with RICE, MoSCoW, acceptance criteria
- Product decision tracking
- Delivery cycles

### Pathfinder (AI Agent Management)
- Agent blueprints and packages
- Action tracking with costs
- Performance metrics

## Build Strategy

Full userflows, not piecemeal features. Complete pitch → tickets → AI → PR → review flow.

## Authentication

NextAuth v5 with GitHub OAuth. ✅ Complete and working.

## GitHub Integration

Three aspects: AI writes code, creates PRs, runs tests. Human reviews in GitHub.

## Scaling Strategy

Current target: 20 projects. Single database handles this easily. Reconsider at 10,000+ projects.

*See full documentation in the source file for detailed reasoning.*
`,
      },
      {
        title: 'Current Phase',
        file: 'current-phase',
        content: `# Current Phase

## Phase 1: Landing Page ✅

**Status:** Complete

The landing page is live and includes:

- [x] Hero section with Launchpad branding
- [x] Problem section (pain points)
- [x] PAD Framework explanation
- [x] How Launchpad Works (detailed steps)
- [x] Footer with links
- [x] Metadata and favicon

## Upcoming Phases

### Phase 2: Authentication (Planned)
- User signup/login
- Team workspaces
- OAuth providers (Google, GitHub)

### Phase 3: Idea Input (Planned)
- Rough idea capture form
- Voice-to-text input
- File/document upload

### Phase 4: Validation Tools (Planned)
- Customer interview scripts
- Survey builder
- Feedback collection

### Phase 5: Planning & Organisation (Planned)
- Feature prioritisation matrix
- Dependency mapping
- Roadmap visualisation

### Phase 6: Linear Integration (Planned)
- Auto-create tickets from plans
- Sync status back to Launchpad

### Phase 7: Code Review & Testing (Planned)
- PR tracking dashboard
- Test coverage requirements

### Phase 8: Analytics & Governance (Planned)
- Success metrics dashboard
- Feature performance tracking

### Phase 9: Feedback & Evolution (Planned)
- Customer feedback collection
- A/B testing coordination
`,
      },
      {
        title: 'Database Research',
        file: 'database-research',
        content: `# Database Research

## Overview

Research into existing database schemas for inspiration in building Launchpad.

## Reference Databases

### Wayfinder
**Product development & feature management system**

Core tables:
- \`features\` — Comprehensive feature tracking with acceptance criteria, RICE prioritization, MoSCoW method
- \`decisions\` — Product decision tracking with questions, options, recommendations
- \`delivery_cycles\` — Timeboxed releases
- \`context_documents\` — Product docs storage for AI reference
- \`activity\` — Full audit log

**Relevance:** Covers pitch → tickets workflow

### Pathfinder
**AI agent management & execution platform**

Core tables:
- \`agent_blueprints\` — Agent templates with system prompts, voice, expertise
- \`agent_packages\` — Pre-packaged agent teams
- \`agent_actions\` — Track every AI action with token costs
- \`agent_instructions\` — Custom instructions per project
- \`agent_model_performance\` — Model performance metrics

**Relevance:** Covers AI execution & PR workflow

## Launchpad Vision

### Target Users
1. Primary: Solo founders
2. Secondary: Teams (future)

### Core Userflows

1. **Pitch → Outline Business**
   - Forms to capture product vision
   - Define problem, solution, target users
   - Document decisions with rationale

2. **Tickets → Organize Work**
   - Create tickets grouped by features/userflows
   - Test-driven development approach
   - Acceptance criteria & dependency management

3. **AI Completes Tasks**
   - AI writes code locally
   - AI creates pull requests in GitHub
   - AI runs tests automatically

4. **AI Creates & Reviews PRs**
   - AI generates pull requests
   - AI reviews code
   - AI enforces standards

5. **Human Review**
   - Review PRs to merge
   - Pull branches locally to test userflows
   - Final approval before deployment

## Gaps to Fill

### Missing from Reference Databases:

**Pull Request Workflow**
- \`pull_requests\` table
- \`code_reviews\` table
- States: draft → open → review → approved → merged

**Test Coverage**
- \`test_cases\` linked to features/tickets
- \`test_results\` from AI execution
- TDD enforcement

**Human Review Queue**
- \`review_queue\` table
- Work pending human approval
- Priority, assignment, SLAs

**GitHub Integration Tables**
- \`github_repos\`
- \`github_branches\`
- \`github_sync_status\`
- Webhook handling
`,
      },
      {
        title: 'Wayfinder CSV',
        file: 'wayfinder-csv',
        content: `# Wayfinder CSV Reference

**Path:** \`~/Downloads/Wayfinder.csv\`

## Key Tables

### features
Comprehensive feature tracking with:
- Problem statements, user value, business value
- User stories, functional requirements, business rules
- Acceptance criteria, out of scope
- Priority (1-4), sizing (XS/S/M/L/XL), confidence levels
- RICE prioritization (reach, impact, value)
- MoSCoW method
- Status tracking (idea → in progress → done)
- Linear integration

### decisions
Product decision tracking:
- Question, options, recommendations
- Final decision + rationale
- Owner, date decided, status
- Storyboard linking

### delivery_cycles
Timeboxed releases with dates

### feature_* junction tables
Dependencies between features and links to:
- Goals, hypotheses, risks, pain points, users, findings
- Jobs-to-be-done mapping

### context_documents
Product docs storage:
- Files for AI reference
- MIME types, sizes, content or paths
- Marked for AI use

### activity
Full audit log

**Relevance to Launchpad:** Covers pitch → tickets workflow
`,
      },
      {
        title: 'Pathfinder CSV',
        file: 'pathfinder-csv',
        content: `# Pathfinder CSV Reference

**Path:** \`~/Downloads/Pathfinder.csv\`

## Key Tables

### agent_blueprints
Agent templates with:
- System prompts, voice/personality
- Expertise areas, approach, constraints
- Recommended skills & rules
- Model preferences (Anthropic, Claude Sonnet, etc.)
- Autonomy levels

### agent_packages
Pre-packaged agent teams:
- Multiple agents, skills, rules, instructions bundled
- Team size, org chart
- Categories, tags

### agent_actions
Track every AI action:
- Token costs
- Status (pending/success/failed)
- Entity references
- Execution timestamps

### agent_instructions
Custom instructions per project/org

### agent_config_revisions
Version history for config changes

### agent_model_performance
Model performance metrics:
- Success/failure rates
- Average token usage
- Per-task-category tracking

### access_codes
Invite codes with plans, expiry

### activity_events
Full audit log

**Relevance to Launchpad:** Covers AI execution & PR workflow
`,
      },
    ],
  },
  {
    title: 'Testing',
    items: [
      {
        title: 'ACT-20: Project Detail Page',
        file: 'act-20-testing-checklist',
        content: `# ACT-20 Testing Checklist - Project Detail Page

**Ticket:** [ACT-20: Test project detail page](https://linear.app/tomcurphey/issue/ACT-20)

**Dev Server:** \`http://localhost:3000\`

---

## Instructions

1. Mark each test with one of:
   - ✅ PASS
   - ❌ FAIL
   - ⚠️ PARTIAL
   - ⏭️ SKIPPED
2. Add notes for any failures or issues
3. Copy the result back to Claude when done

---

## Pre-Test Setup

- [ ] Dev server running on \`localhost:3000\`
- [ ] Logged into the app
- [ ] At least one project exists (create one if needed)

---

## Test Cases

### 1. Page Load & Display

| Test | Result | Notes |
|------|-------|-------|
| Navigate to \`/dashboard\` | | |
| Click on a project from dashboard | | |
| Project detail page loads | | |
| Project name displays in header | | |
| Status badge shows correct value | | |
| Status badge has correct color | | |
| Description displays (or "No description yet" if empty) | | |
| Created date shows formatted | | |
| Updated date shows formatted | | |
| Vision displays if filled out | | |
| Target Audience displays if filled out | | |
| Stats show (Userflows, Features, Tickets) | | |
| "Get Started" card displays | | |
| "Answer Questions" button links to \`/projects/[id]/questions\` | | |

**Section Result:** _____ (✅ / ❌ / ⚠️ / ⏭️)

---

### 2. Edit Modal - Open & Display

| Test | Result | Notes |
|------|-------|-------|
| "Edit" button visible in header | | |
| Click "Edit" button | | |
| Modal opens with backdrop overlay | | |
| Modal title says "Edit Project" | | |
| Close (X) button visible | | |
| Name field pre-fills correctly | | |
| Description field pre-fills correctly | | |
| Status dropdown shows current status | | |
| Vision field pre-fills correctly | | |
| Target Audience field pre-fills correctly | | |
| "Cancel" button visible | | |
| "Save Changes" button visible | | |

**Section Result:** _____ (✅ / ❌ / ⚠️ / ⏭️)

---

### 3. Edit Modal - Save Changes

| Test | Result | Notes |
|------|-------|-------|
| Open Edit modal | | |
| Modify project name | | |
| Modify description | | |
| Change status dropdown | | |
| Click "Save Changes" | | |
| Button text changes to "Saving..." | | |
| Modal closes after save | | |
| Page refreshes automatically | | |
| Updated project name shows in header | | |
| Updated description displays | | |
| Updated status badge shows new value | | |
| Updated "Updated" date reflects change time | | |

**Section Result:** _____ (✅ / ❌ / ⚠️ / ⏭️)

---

### 4. Edit Modal - Cancel

| Test | Result | Notes |
|------|-------|-------|
| Open Edit modal | | |
| Modify a field | | |
| Click "Cancel" button | | |
| Modal closes | | |
| Changes NOT saved on page | | |
| Original data still displays | | |

**Section Result:** _____ (✅ / ❌ / ⚠️ / ⏭️)

---

### 5. Navigation

| Test | Result | Notes |
|------|-------|-------|
| Click "Overview" tab | | |
| Click "Questions" tab | | |
| Navigates to \`/projects/[id]/questions\` | | |
| Click back button in browser | | |
| Returns to project detail page | | |
| Click "Tickets" tab | | |
| Navigates to \`/projects/[id]/tickets\` | | |
| Click back arrow icon (←) in header | | |
| Navigates back to \`/dashboard\` | | |

**Section Result:** _____ (✅ / ❌ / ⚠️ / ⏭️)

---

### 6. Error Handling - Unauthorized Access

| Test | Result | Notes |
|------|-------|-------|
| Log out of the app | | |
| Direct navigate to a project detail URL | | |
| Page redirects to login OR shows empty state | | |
| No sensitive project data displays | | |
| Log back in | | |
| Navigate to same project | | |
| Project displays correctly | | |

**Section Result:** _____ (✅ / ❌ / ⚠️ / ⏭️)

---

### 7. Error Handling - Project Not Found

| Test | Result | Notes |
|------|-------|-------|
| While logged in, navigate to fake project URL | | |
| Use a non-existent UUID like \`/projects/fake-id-here\` | | |
| "Project Not Found" message displays | | |
| 😕 emoji displays | | |
| Helpful error message shows | | |
| "Back to Dashboard" button visible | | |
| Click "Back to Dashboard" | | |
| Navigates to \`/dashboard\` | | |

**Section Result:** _____ (✅ / ❌ / ⚠️ / ⏭️)

---

### 8. Console Errors

| Test | Result | Notes |
|------|-------|-------|
| Open browser DevTools (F12 or Cmd+Option+I) | | |
| Navigate to project detail page | | |
| No red errors in console | | |
| Open and close Edit modal | | |
| No red errors in console | | |
| Save a change | | |
| No red errors in console | | |
| Navigate between tabs | | |
| No red errors in console | | |

**Section Result:** _____ (✅ / ❌ / ⚠️ / ⏭️)

---

### 9. Mobile Responsive

| Test | Result | Notes |
|------|-------|-------|
| Open browser DevTools | | |
| Enable device toolbar (Cmd+Shift+M) | | |
| Select iPhone (375px width) | | |
| Header layout adapts | | |
| Project name truncates with ellipsis if too long | | |
| Status badge still visible | | |
| Edit button still accessible | | |
| Tabs stack horizontally or show scroll | | |
| Edit modal fits on screen | | |
| Modal is scrollable if content overflows | | |
| Form fields are full width on mobile | | |
| Save/Cancel buttons are accessible | | |
| Test at 320px (very small mobile) | | |
| Layout doesn't break | | |

**Section Result:** _____ (✅ / ❌ / ⚠️ / ⏭️)

---

### 10. Form Validation

| Test | Result | Notes |
|------|-------|-------|
| Open Edit modal | | |
| Clear the project name field | | |
| Click "Save Changes" | | |
| Browser validation prevents submit | | |
| Cancel and retry with valid data | | |
| Save succeeds | | |

**Section Result:** _____ (✅ / ❌ / ⚠️ / ⏭️)

---

## Overall Results

| Section | Result |
|---------|--------|
| 1. Page Load & Display | _____ |
| 2. Edit Modal - Open & Display | _____ |
| 3. Edit Modal - Save Changes | _____ |
| 4. Edit Modal - Cancel | _____ |
| 5. Navigation | _____ |
| 6. Error Handling - Unauthorized | _____ |
| 7. Error Handling - Not Found | _____ |
| 8. Console Errors | _____ |
| 9. Mobile Responsive | _____ |
| 10. Form Validation | _____ |

**Final Result:** _____ (✅ PASS / ❌ FAIL / ⚠️ PARTIAL)

---

## Issues Found

List any bugs or issues discovered during testing:

1.
\`\`\`

\`\`\`

2.
\`\`\`

\`\`\`

3.
\`\`\`

\`\`\`

---

## Environment

| Item | Value |
|------|-------|
| Browser | _e.g., Chrome 120, Safari 17_ |
| OS | _e.g., macOS 14, Windows 11_ |
| Screen Size | _e.g., 1920x1080_ |
| Date/Time | _When testing was performed_ |
`,
      },
    ],
  },
  {
    title: 'Tech Stack',
    items: [
      {
        title: 'Technology Overview',
        file: 'tech-stack',
        content: `# Technology Stack

## Frontend

- **Framework**: Next.js 15+ (App Router, React Server Components)
- **Styling**: Tailwind CSS
- **Theme**: Zinc dark mode with amber/orange gradients

## Backend (Planned)

- **API**: Next.js API Routes / Server Actions
- **Database**: TBD (Supabase, Neon, or similar)
- **Task Management**: Linear API integration
- **Code Integration**: GitHub API integration

## External Integrations (Planned)

- **Linear API** — Ticket creation, status updates, project management
- **GitHub API** — PR tracking, code review, status syncing
- **Slack** — Notifications, updates, team coordination (optional)

## Why Next.js?

- **App Router** — Modern React with Server Components
- **API Routes** — Full-stack in one repo
- **Vercel deployment** — Zero-config hosting
- **Great DX** — Fast refresh, TypeScript support

## Why Linear Integration?

- **Best-in-class PM tool** — Clean, fast, developer-focused
- **Great API** — Easy ticket creation and syncing
- **Our target users** — Dev teams already using Linear

## Why GitHub Integration?

- **Where code lives** — PRs are the actual work
- **Status tracking** — Connect tasks to PRs
- **Code review workflow** — Built into GitHub
`,
      },
    ],
  },
];

export default function DocsPage() {
  const [selectedDoc, setSelectedDoc] = useState<string>('launchpad-documentation');
  const [docContent, setDocContent] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set(['Getting Started']));

  // Load doc content
  useEffect(() => {
    const loadDoc = async () => {
      setIsLoading(true);

      // For full documentation, fetch from API
      if (selectedDoc === 'launchpad-documentation') {
        try {
          const response = await fetch(`/api/docs?doc=launchpad-documentation`);
          const data = await response.json();
          if (data.content) {
            setDocContent(data.content);
            setIsLoading(false);
            return;
          }
        } catch (error) {
          console.error('Failed to fetch doc:', error);
        }
      }

      // Fall back to hardcoded content for other docs
      const category = sidebarConfig.flatMap((cat) => cat.items).find((item) => item.file === selectedDoc);
      if (category) {
        setDocContent(category.content);
      }
      setIsLoading(false);
    };

    loadDoc();
  }, [selectedDoc]);

  const toggleCategory = (categoryTitle: string) => {
    setExpandedCategories((prev) => {
      const next = new Set(prev);
      if (next.has(categoryTitle)) {
        next.delete(categoryTitle);
      } else {
        next.add(categoryTitle);
      }
      return next;
    });
  };

  const currentDoc = sidebarConfig.flatMap((cat) => cat.items).find((d) => d.file === selectedDoc);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      {/* Header */}
      <header className="border-b border-zinc-800 bg-zinc-950 sticky top-0 z-50">
        <div className="flex items-center justify-between px-4 lg:px-6 h-16">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="lg:hidden p-2 rounded-md hover:bg-zinc-900"
              aria-label="Toggle sidebar"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <Link href="/" className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-amber-400 to-orange-600 flex items-center justify-center text-xl">
                🚀
              </div>
              <span className="font-semibold text-zinc-100">Launchpad Docs</span>
            </Link>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="https://github.com/tom-curphey/launchPad"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-md hover:bg-zinc-900"
              aria-label="GitHub"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </a>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`
            fixed lg:sticky top-16 left-0 z-40
            h-[calc(100vh-4rem)]
            w-72
            bg-zinc-950
            border-r border-zinc-800
            overflow-y-auto
            transition-transform duration-300 ease-in-out
            ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          `}
        >
          <nav className="p-4">
            {sidebarConfig.map((category) => {
              const isExpanded = expandedCategories.has(category.title);
              return (
                <div key={category.title} className="mb-4">
                  <button
                    onClick={() => toggleCategory(category.title)}
                    className="w-full flex items-center justify-between px-2 py-2 text-xs font-semibold text-zinc-500 uppercase tracking-wider hover:bg-zinc-900 rounded-md transition-colors duration-200"
                  >
                    <span>{category.title}</span>
                    <svg
                      className={`w-4 h-4 transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                  {isExpanded && (
                    <ul className="space-y-1 mt-1 ml-2">
                      {category.items.map((item) => {
                        const isActive = selectedDoc === item.file;
                        return (
                          <li key={item.file}>
                            <button
                              onClick={() => setSelectedDoc(item.file)}
                              className={`
                                w-full text-left px-3 py-2 rounded-md text-sm
                                transition-colors duration-200
                                ${
                                  isActive
                                    ? 'bg-amber-900/30 text-amber-400 font-medium'
                                    : 'text-zinc-400 hover:bg-zinc-900 hover:text-zinc-300'
                                }
                              `}
                            >
                              {item.title}
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </div>
              );
            })}
          </nav>
        </aside>

        {/* Overlay for mobile */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-30 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Main content */}
        <main className="flex-1 min-w-0">
          <div className="max-w-4xl mx-auto px-6 lg:px-8 py-8">
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <div className="text-zinc-500">Loading documentation...</div>
              </div>
            ) : currentDoc ? (
              <article className="prose prose-invert prose-amber max-w-none">
                <div
                  className="markdown-body"
                  dangerouslySetInnerHTML={{
                    __html: renderMarkdown(docContent),
                  }}
                />
              </article>
            ) : null}
          </div>

          {/* Table of Contents (on desktop, right side) */}
          {currentDoc && (
            <div className="hidden xl:block fixed right-0 top-16 w-64 h-[calc(100vh-4rem)] overflow-y-auto bg-zinc-900 border-l border-zinc-800">
              <div className="p-6">
                <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-4">
                  On this page
                </h3>
                <TableOfContents content={docContent} />
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

// Table of contents component
function TableOfContents({ content }: { content: string }) {
  const headings = content.match(/^#{2,3} .+$/gm) || [];

  if (headings.length === 0) return null;

  return (
    <ul className="space-y-2">
      {headings.map((heading, index) => {
        const level = heading.match(/^#+/)?.[0].length || 0;
        const text = heading.replace(/^#{2,3} /, '');
        const id = text.toLowerCase().replace(/\s+/g, '-');
        const indent = level - 2;

        return (
          <li key={index} style={{ paddingLeft: `${indent * 0.75}rem` }}>
            <a
              href={`#${id}`}
              className="text-sm text-zinc-500 hover:text-amber-400 hover:underline transition-colors"
            >
              {text}
            </a>
          </li>
        );
      })}
    </ul>
  );
}

// Enhanced markdown renderer
function renderMarkdown(markdown: string): string {
  if (!markdown) return '';

  let html = markdown;

  // Escape HTML tags first
  html = html.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

  // Code blocks (must be before inline code)
  html = html.replace(
    /```(\w+)?\n([\s\S]*?)```/g,
    (_, lang, code) =>
      `<pre class="bg-zinc-900 p-4 rounded-lg overflow-x-auto text-sm my-4 border border-zinc-800"><code class="language-${lang || 'text'}">${code}</code></pre>`
  );

  // Inline code
  html = html.replace(
    /`([^`]+)`/g,
    '<code class="px-1.5 py-0.5 bg-zinc-900 rounded text-sm text-amber-400">$1</code>'
  );

  // Headers with IDs for anchor links
  html = html.replace(
    /^#### (.*)$/gm,
    '<h4 id="$1" class="scroll-mt-16 font-semibold text-lg mt-6 mb-2 text-zinc-100">$1</h4>'
  );
  html = html.replace(
    /^### (.*)$/gm,
    '<h3 id="$1" class="scroll-mt-16 font-semibold text-xl mt-8 mb-3 text-zinc-100">$1</h3>'
  );
  html = html.replace(
    /^## (.*)$/gm,
    '<h2 id="$1" class="scroll-mt-16 font-semibold text-2xl mt-10 mb-4 text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-600">$1</h2>'
  );
  html = html.replace(
    /^# (.*)$/gm,
    '<h1 id="$1" class="scroll-mt-16 font-bold text-3xl mt-12 mb-6 text-zinc-100">$1</h1>'
  );

  // Bold and italic
  html = html.replace(/\*\*\*(.*?)\*\*\*/g, '<strong><em>$1</em></strong>');
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/\*([^*]+)\*/g, '<em>$1</em>');

  // Links
  html = html.replace(
    /\[([^\]]+)\]\(([^)]+)\)/g,
    '<a href="$2" class="text-amber-400 hover:text-amber-300 hover:underline" target="_blank" rel="noopener noreferrer">$1</a>'
  );

  // Blockquotes
  html = html.replace(
    /^&gt; (.*)$/gm,
    '<blockquote class="border-l-4 border-amber-600 pl-4 italic my-4 text-zinc-400">$1</blockquote>'
  );

  // Horizontal rules
  html = html.replace(/^---$/gm, '<hr class="my-8 border-zinc-800" />');

  // Unordered lists
  html = html.replace(/^- (.*)$/gm, '<li class="ml-4">$1</li>');
  html = html.replace(
    /(<li[^>]*>.*<\/li>\n?)+/g,
    (match) => `<ul class="list-disc my-4 pl-6 space-y-1">${match}</ul>`
  );

  // Ordered lists
  html = html.replace(/^\d+\. (.*)$/gm, '<oli class="ml-4">$1</oli>');
  html = html.replace(
    /(<oli[^>]*>.*<\/oli>\n?)+/g,
    (match) => `<ol class="list-decimal my-4 pl-6 space-y-1">${match.replace(/<\/?oli>/g, '<li>')}</ol>`
  );

  // Checkboxes
  html = html.replace(/^- \[x\] (.*)$/gim, '<li class="ml-4"><input type="checkbox" checked disabled class="mr-2"> $1</li>');
  html = html.replace(/^- \[ \] (.*)$/gim, '<li class="ml-4"><input type="checkbox" disabled class="mr-2"> $1</li>');

  // Tables (must be before line breaks/paragraphs)
  html = html.replace(
    /(\|[^|\n]+\|[^\n]*\n)+/g,
    (match) => {
      const rows = match.trim().split('\n');
      if (rows.length < 2) return match;

      const tableRows = rows.map((row, i) => {
        const cells = row.split('|').filter(cell => cell.trim() !== '');
        if (i === 1) {
          // Header separator row - skip
          return '';
        }
        const tag = i === 0 ? 'th' : 'td';
        const cellClass = i === 0 ? 'bg-zinc-800 font-semibold text-zinc-100' : 'text-zinc-400';
        return `<tr>${cells.map(cell => `<${tag} class="px-4 py-2 border border-zinc-700 ${cellClass}">${cell.trim()}</${tag}>`).join('')}</tr>`;
      }).filter(row => row !== '').join('');

      return `<table class="w-full my-4 border-collapse">${tableRows}</table>`;
    }
  );

  // Line breaks and paragraphs
  html = html.replace(/\n\n+/g, '</p><p class="my-4 leading-relaxed text-zinc-400">');
  html = '<p class="my-4 leading-relaxed text-zinc-400">' + html + '</p>';

  // Clean up empty paragraphs and fix nesting
  html = html
    .replace(/<p class="my-4 leading-relaxed text-zinc-400"><\/p>/g, '')
    .replace(
      /<p class="my-4 leading-relaxed text-zinc-400">(<(h[1-6]|ul|ol|li|blockquote|hr|pre))>/g,
      '<$1>'
    )
    .replace(/(<\/(h[1-6]|ul|ol|li|blockquote|hr|pre)>)<\/p>/g, '$1');

  return html;
}
