# Launchpad Decisions & Architecture

## Context Preservation

This document tracks key architectural decisions, reasoning, and context for the Launchpad project. Updated as we build.

---

## Product Vision

### Target Users
1. **Primary:** Solo founders (including the founder)
2. **Secondary:** Teams (future consideration)

### Core Userflows
1. **Pitch → Outline Business** — Forms to capture product vision, define problem/solution/users, document decisions
2. **Tickets → Organize Work** — Create tickets grouped by features/userflows with TDD approach
3. **AI Completes Tasks** — AI writes code locally, creates PRs in GitHub, runs tests automatically
4. **AI Creates & Reviews PRs** — AI generates pull requests, reviews code, enforces standards
5. **Human Review** — Review PRs to merge, pull branches locally to test userflows, final approval

### Tech Stack
- **Framework:** Next.js 16 (App Router)
- **Styling:** Tailwind CSS v4
- **Database:** Supabase (Postgres)
- **Auth:** NextAuth v5 with GitHub OAuth
- **Theme:** Zinc dark mode with amber/orange gradients

---

## Database Architecture Decisions

### Single Database Approach ✅
**Decision:** Use single Supabase database for all data

**Reasoning:**
- 20 projects maximum = ~17k rows total (trivial for Postgres)
- Tight coupling between product management (Wayfinder-style) and AI execution (Pathfinder-style)
- Splitting adds complexity: cross-database queries, distributed transactions, consistency issues
- Postgres handles millions of rows easily

**Scaling Considerations:**
- Real bottlenecks: AI token costs, GitHub API rate limits, agent execution time
- Database only becomes concern at 10,000+ projects
- Use Row Level Security (RLS) for multi-tenancy instead of separate databases

**Schema Pattern:**
```sql
organizations (id, name, plan, limits...)
users (id, org_id, github_id...)
projects (id, org_id, name, repo_url...)
features (id, project_id...)
agent_actions (id, org_id, project_id, agent_id...)
pull_requests (id, project_id...)
```

---

## Reference Database Analysis

### Wayfinder (Product Development)
**Path:** `/Users/tom/Downloads/Wayfinder.csv`

**Relevant Tables for Launchpad:**
- `features` — Comprehensive feature tracking (RICE, MoSCoW, acceptance criteria)
- `decisions` — Product decision tracking (questions, options, recommendations, rationale)
- `delivery_cycles` — Timeboxed releases
- `context_documents` — Product docs storage for AI reference

**Covers:** Pitch → Tickets workflow

### Pathfinder (AI Agent Management)
**Path:** `/Users/tom/Downloads/Pathfinder.csv`

**Relevant Tables for Launchpad:**
- `agent_blueprints` — Agent templates (prompts, voice, expertise, model preferences)
- `agent_packages` — Pre-packaged agent teams
- `agent_actions` — Track every AI action (token costs, status, entity references)
- `agent_instructions` — Custom instructions per project
- `agent_model_performance` — Model performance metrics

**Covers:** AI execution & PR workflow

### Gaps to Fill
**Neither database covers:**
- Pull request workflow (`pull_requests`, `code_reviews`)
- Test coverage (`test_cases`, `test_results`)
- Human review queue (`review_queue`)
- GitHub integration layer (`github_repos`, `github_branches`, `github_sync_status`)

---

## Build Strategy

### Approach: Full Userflows, Not Piecemeal Features
**Decision:** Build complete end-to-end userflows rather than isolated features

**Reasoning:**
- User can experience the full value from day one
- Easier to validate the workflow works end-to-end
- Reduces risk of building disconnected features

### MVP Scope
**Full experience including:**
- Complete pitch → tickets → AI work → PR → review flow
- Not a phased rollout of AI capabilities

---

## Authentication Setup

### GitHub OAuth Implementation
**Decision:** Use NextAuth v5 with GitHub OAuth provider

**Configuration:**
- Client ID & Secret from GitHub OAuth App (not GitHub App)
- Callback URL: `http://localhost:3000/api/auth/callback/github`
- Homepage URL: `http://localhost:3000`

**Status:** ✅ Complete and working

**Files:**
- `.env` — GitHub credentials
- `lib/auth.ts` — Auth configuration
- `app/api/auth/[...nextauth]/route.ts` — API handlers
- `middleware.ts` — Session protection
- `app/auth/signin/page.tsx` — Sign-in page
- `app/dashboard/page.tsx` — Protected dashboard

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

---

## Scaling Strategy

### Current Capacity Target
- **Maximum projects:** 20 at once
- **Estimated data:** ~17k rows total
- **Database:** Single Supabase instance

### Real Bottlenecks to Monitor
1. **AI Token Costs** — Per-project limits & cost tracking
2. **GitHub API Rate Limits** — Caching, batching, queueing
3. **Agent Execution Time** — Job queue, worker pool, prioritization

### When to Reconsider Architecture
- 10,000+ projects
- Billions of rows with slow queries
- Different compliance needs per segment

---

## Next Steps

### Immediate Priorities
1. Design Launchpad database schema
2. Define GitHub integration architecture
3. Map out complete userflows
4. Plan agent system for task execution
5. Design human review workflow

### Build Order
1. Database schema design
2. Core userflow implementation (pitch → tickets → AI → PR → review)
3. GitHub integration
4. AI agent system
5. Testing & iteration

---

*Last updated: 12 August 2026*
