# Launchpad Database Research & Vision

## Reference Databases

### Wayfinder
**Path:** `/Users/tom/Downloads/Wayfinder.csv`

**What it does:** Product development & feature management system

**Key Tables:**
- `features` — Comprehensive feature tracking with:
  - Problem statements, user value, business value
  - User stories, functional requirements, business rules
  - Acceptance criteria, out of scope
  - Priority (1-4), sizing (XS/S/M/L/XL), confidence levels
  - RICE prioritization (reach, impact, value)
  - MoSCoW method
  - Status tracking (idea → in progress → done)
  - Linear integration

- `decisions` — Product decision tracking:
  - Question, options, recommendations
  - Final decision + rationale
  - Owner, date decided, status
  - Storyboard linking

- `delivery_cycles` — Timeboxed releases with dates

- `feature_*` junction tables:
  - Dependencies between features
  - Links to goals, hypotheses, risks, pain points, users, findings
  - Jobs-to-be-done mapping

- `context_documents` — Product docs storage:
  - Files for AI reference
  - MIME types, sizes, content or paths
  - Marked for AI use

- `activity` — Audit log

**Relevance to Launchpad:** Covers steps 1-2 (pitch → tickets)

---

### Pathfinder
**Path:** `/Users/tom/Downloads/Pathfinder.csv`

**What it does:** AI agent management & execution platform

**Key Tables:**
- `agent_blueprints` — Agent templates with:
  - System prompts, voice/personality
  - Expertise areas, approach, constraints
  - Recommended skills & rules
  - Model preferences (Anthropic, Claude Sonnet, etc.)
  - Autonomy levels

- `agent_packages` — Pre-packaged agent teams:
  - Multiple agents, skills, rules, instructions bundled
  - Team size, org chart
  - Categories, tags

- `agent_actions` — Track every AI action:
  - Token costs
  - Status (pending/success/failed)
  - Entity references
  - Execution timestamps

- `agent_instructions` — Custom instructions per project/org

- `agent_config_revisions` — Version history for config changes

- `agent_model_performance` — Model performance metrics:
  - Success/failure rates
  - Average token usage
  - Per-task-category tracking

- `access_codes` — Invite codes with plans, expiry

- `activity_events` — Full audit log

**Relevance to Launchpad:** Covers steps 3-4 (AI execution, PRs)

---

## Launchpad Vision

### Target Users
1. **Primary:** Solo founders (including the founder)
2. **Secondary:** Teams (future consideration)

### Core Userflows

**1. Pitch → Outline Business**
- Forms to capture product vision
- Define problem, solution, target users
- Document decisions with rationale

**2. Tickets → Organize Work**
- Create tickets grouped by features/userflows
- Test-driven development approach
- Acceptance criteria for each ticket
- Dependency management

**3. AI Completes Tasks**
- AI writes code locally
- AI creates pull requests in GitHub
- AI runs tests automatically

**4. AI Creates & Reviews PRs**
- AI generates pull requests
- AI reviews code
- AI enforces standards

**5. Human Review**
- Review PRs to merge
- Pull branches locally to test userflows
- Final approval before deployment

### Technical Approach

**GitHub Integration (all 3 aspects):**
- AI writes code → commits to GitHub
- AI creates PRs in GitHub
- AI runs tests via GitHub

**Human Review Flow:**
- Review PRs in GitHub
- Pull branches locally for userflow testing
- Approve/merge from Launchpad or GitHub

**Launchpad Position:**
- Replaces both Wayfinder & Pathfinder
- Web app + GitHub integration
- Orchestrates AI agents + manages workflow
- Full end-to-end experience

### Build Strategy

**Scope:** Full experience from start to finish of userflows

**Approach:** Build complete, working userflows rather than isolated features

**MVP Consideration:** Full AI execution from day one (not phased rollout)

---

## Gaps in Reference Databases

### Missing from Both Wayfinder & Pathfinder:

**🔁 Pull Request Workflow**
- `pull_requests` table
- `code_reviews` table
- States: draft → open → review → approved → merged

**🧪 Test Coverage**
- `test_cases` linked to features/tickets
- `test_results` from AI execution
- TDD enforcement

**👤 Human Review Queue**
- `review_queue` table
- Work pending human approval
- Priority, assignment, SLAs

**🌐 GitHub Integration Tables**
- `github_repos`
- `github_branches`
- `github_sync_status`
- Webhook handling

---

## Database Schema Inspiration

**From Wayfinder:**
- Feature structure with rich metadata
- Decision tracking framework
- Delivery cycle management
- Context document storage

**From Pathfinder:**
- Agent blueprint system
- Action tracking with costs
- Performance metrics
- Organization-based multi-tenancy

**Custom tables needed:**
- Pull requests & code reviews
- Test cases & results
- Human review workflows
- GitHub integration layer

---

## Notes

- Wayfinder & Pathfinder are example databases only for inspiration
- Launchpad will have its own schema optimized for the full workflow
- Agents do the work: code generation, PR creation, testing, review
- Human provides oversight, strategic decisions, and final approval
- Full end-to-end experience means complete userflows, not piecemeal features

---

## Next Steps

1. Design Launchpad database schema
2. Define GitHub integration architecture
3. Map out complete userflows
4. Plan agent system for task execution
5. Design human review workflow
