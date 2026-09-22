> **Archived 2026-09-22.** Rewritten: one Supabase database per installation.
>
> **Replaced by:** [data/database.md](../../data/database.md)

---

# Data — Database

> Records the database selection and scaling decisions — why a single Supabase Postgres database, and when to revisit.

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
