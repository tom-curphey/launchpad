# Launchpad Development Tasks

> **Phase 1: Pitch — From idea to structured plan**
> 
> This document tracks all development tasks for building the Pitch phase of Launchpad.

---

## Task Legend

- 🔐 Authentication & User Management
- 🏠 Dashboard & Projects
- 📝 Create Project Flow
- 🎯 Project Detail Page
- 💡 Guided Questions Framework
- 🤖 AI Breakdown Generation
- 🎫 Ticket Editor UI
- 🔗 Linear Integration
- 📊 Database & Schema
- 🧪 Testing & Polish

---

## 🔐 Authentication & User Management (3 tickets)

### 1. Set up auth provider & login flow
**Priority:** 1 — Must be first

**Description:**
Implement authentication system so users can log in and access their workspace.

**What to build:**
- Choose auth provider (Clerk, Auth0, or similar)
- Set up OAuth flow
- Create login page
- Handle auth callback
- Store user session

**Acceptance Criteria:**
- User can click "Login" and authenticate
- After login, user is redirected to dashboard
- Session persists across page refreshes
- Logout button works

**Dependencies:** None

---

### 2. Create user profile & session management
**Priority:** 2 — Blocks all user-specific features

**Description:**
Store user information and manage their session state across the app.

**What to build:**
- Create `users` table in database
- Store user profile data (name, email, avatar)
- Create session context/provider
- Add user settings storage

**Acceptance Criteria:**
- User profile persists in database
- Session is accessible from any page
- User can view and edit their profile
- Settings are saved and loaded correctly

**Dependencies:** Ticket #1

---

### 3. Protect routes with middleware
**Priority:** 3 — Security requirement

**Description:**
Ensure authenticated users can only access protected routes.

**What to build:**
- Create middleware to check auth state
- Protect dashboard and all project routes
- Redirect unauthenticated users to login
- Handle edge cases (expired sessions, errors)

**Acceptance Criteria:**
- Unauthenticated users redirected to login
- Authenticated users can access protected routes
- Session expiry redirects to login
- No console errors during redirect flow

**Dependencies:** Ticket #1, #2

---

## 🏠 Dashboard & Projects (4 tickets)

### 4. Build projects list page
**Priority:** 4 — Core navigation entry point

**Description:**
Display all projects belonging to the logged-in user.

**What to build:**
- Create dashboard page at `/dashboard`
- Fetch user's projects from database
- Display projects in a clean list/grid
- Handle empty state

**Acceptance Criteria:**
- Page loads with user's projects
- Shows project name, status, last updated date
- Empty state shows helpful message and "Start Project" button
- Loading state while fetching

**Dependencies:** Ticket #2, #3

---

### 5. Add "Start Project" button & empty state
**Priority:** 5 — Primary action for new users

**Description:**
Clear call-to-action for creating a new project.

**What to build:**
- Add prominent "Start Project" button to dashboard
- Design beautiful empty state with illustration
- Link button to create project flow

**Acceptance Criteria:**
- Button is clearly visible on dashboard
- Empty state looks professional and inviting
- Button navigates to `/projects/new`
- Works for users with zero projects

**Dependencies:** Ticket #4

---

### 6. Build project card component
**Priority:** 6 — Core UI component

**Description:**
Reusable component to display project information.

**What to build:**
- Create `ProjectCard` component
- Display project name, description, status
- Show last updated date
- Add click-to-navigate to detail page

**Acceptance Criteria:**
- Component displays all project metadata correctly
- Hover state provides visual feedback
- Clicking navigates to project detail
- Responsive on mobile

**Dependencies:** Ticket #4

---

### 7. Add navigation & layout shell
**Priority:** 7 — Required for all pages

**Description:**
Consistent navigation and layout across the application.

**What to build:**
- Create app layout component
- Add sidebar navigation
- Add header with user menu
- Ensure mobile responsiveness

**Acceptance Criteria:**
- Nav appears on all pages
- User menu shows profile dropdown
- Mobile hamburger menu works
- Active page is highlighted in nav

**Dependencies:** Ticket #3

---

## 📝 Create Project Flow (5 tickets)

### 8. Build "New Project" form
**Priority:** 8 — Core creation flow

**Description:**
Simple form to create a new project.

**What to build:**
- Create `/projects/new` page
- Form with "Project Name" text input
- "Create" button
- Form validation
- Cancel option

**Acceptance Criteria:**
- Form renders correctly
- Validation prevents empty project names
- Submit button is disabled when form is invalid
- Cancel returns to dashboard

**Dependencies:** Ticket #7

---

### 9. Create `projects` table & API route
**Priority:** 9 — Data persistence layer

**Description:**
Database schema and API to store projects.

**What to build:**
- Design `projects` table schema
- Create table in Supabase
- Build API route at `/api/projects`
- Implement POST endpoint for creation

**Acceptance Criteria:**
- Table stores project data correctly
- API route accepts project data
- Returns created project with ID
- Handles errors gracefully

**Dependencies:** Ticket #2

---

### 10. Handle form submission & create project record
**Priority:** 10 — Connect form to database

**Description:**
Wire up the form to actually create projects in the database.

**What to build:**
- Form submit handler
- Call `/api/projects` endpoint
- Handle success response
- Handle error response
- Show loading state during submission

**Acceptance Criteria:**
- Submitting creates project in database
- Success redirects to project detail
- Errors show helpful message
- Loading state prevents double-submit

**Dependencies:** Ticket #8, #9

---

### 11. Redirect to project detail page after creation
**Priority:** 11 — Complete the flow

**Description:**
After project creation, navigate to the new project's detail page.

**What to build:**
- Create `/projects/[id]` route
- Redirect after successful creation
- Pass project ID in URL

**Acceptance Criteria:**
- After creating project, user lands on detail page
- URL contains correct project ID
- Page loads with project data
- Browser back button works correctly

**Dependencies:** Ticket #10

---

### 12. Test create flow end-to-end
**Priority:** 12 — Quality gate

**Description:**
Verify the entire project creation flow works correctly.

**What to test:**
- Login → Dashboard
- Click "Start Project"
- Enter name → Create
- Land on project detail page
- Verify project appears in dashboard list

**Acceptance Criteria:**
- All steps work without errors
- Project persists correctly
- Navigation is smooth
- No console errors

**Dependencies:** Ticket #11

---

## 🎯 Project Detail Page (4 tickets)

### 13. Build project detail shell
**Priority:** 13 — Container for all project features

**Description:**
Basic layout for viewing a single project.

**What to build:**
- Create `/projects/[id]/page.tsx`
- Build header with project name
- Add tab navigation
- Create content area

**Acceptance Criteria:**
- Page renders with project data
- Header displays project name
- Tabs are visible (Overview, Questions, Tickets)
- Responsive layout

**Dependencies:** Ticket #11

---

### 14. Display project metadata
**Priority:** 14 — Core information display

**Description:**
Show key project information on the detail page.

**What to build:**
- Fetch project by ID from API
- Display name, description, status
- Show created date, last updated
- Add "Edit" button

**Acceptance Criteria:**
- All metadata displays correctly
- Loading state while fetching
- Error state if project not found
- Dates formatted nicely

**Dependencies:** Ticket #13

---

### 15. Add "Edit project" button & modal
**Priority:** 15 — Core edit functionality

**Description:**
Allow users to update project details.

**What to build:**
- Add "Edit" button to detail page
- Create edit modal with form
- Implement update API call
- Handle save and cancel

**Acceptance Criteria:**
- Modal opens on button click
- Form pre-fills with current data
- Save updates database
- Cancel closes without saving

**Dependencies:** Ticket #14

---

### 16. Test project detail page
**Priority:** 16 — Quality gate

**Description:**
Verify project detail page works correctly.

**What to test:**
- Page loads with correct project
- Edit modal works
- Changes persist
- Navigation works

**Acceptance Criteria:**
- All features work as expected
- No console errors
- Responsive on mobile

**Dependencies:** Ticket #15

---

## 💡 Guided Questions Framework (6 tickets)

### 17. Research & pick a product discovery framework
**Priority:** 17 — Foundation for questions

**Description:**
Research and choose a framework for guiding users through product definition.

**What to research:**
- Jobs-to-be-done (JTBD)
- User story mapping
- Product vision board
- Other product discovery frameworks

**Deliverable:**
- Document chosen framework
- Explain why it fits Launchpad
- Map framework to question flow

**Acceptance Criteria:**
- Framework documented in `/docs/decisions.md`
- Clear rationale for choice
- Framework mapped to questions

**Dependencies:** None

---

### 18. Design question flow UI
**Priority:** 18 — UX foundation

**Description:**
Design the step-by-step wizard for guided questions.

**What to design:**
- Question flow layout
- Progress indicator
- Navigation buttons (Back, Next, Finish)
- Question card design
- Animations between steps

**Acceptance Criteria:**
- Figma mockup or component specification
- Clear visual hierarchy
- Mobile-responsive design
- Accessibility considered

**Dependencies:** Ticket #17

---

### 19. Build question components
**Priority:** 19 — Core question UI

**Description:**
Components to render different question types.

**What to build:**
- Text input component
- Textarea component
- Select/dropdown component
- Multi-select component
- Radio button component
- Checkbox component

**Acceptance Criteria:**
- All input types work correctly
- Validation works per question type
- Labels and help text display
- Keyboard navigation works

**Dependencies:** Ticket #18

---

### 20. Store answers in database
**Priority:** 20 — Persist question responses

**Description:**
Save user's answers to the guided questions.

**What to build:**
- Design `project_answers` table
- Create API route to save answers
- Implement save on each question step
- Handle draft vs. final answers

**Acceptance Criteria:**
- Answers save to database correctly
- Draft answers can be retrieved
- Final answers marked as complete
- API handles errors gracefully

**Dependencies:** Ticket #19

---

### 21. Add progress indicator & navigation
**Priority:** 21 — UX enhancement

**Description:**
Help users understand where they are in the question flow.

**What to build:**
- Progress bar showing completion
- Step indicator (1 of X)
- Back button functionality
- Next button validation
- Finish button behavior

**Acceptance Criteria:**
- Progress updates correctly
- Back restores previous answer
- Next validates before proceeding
- Finish marks answers as complete

**Dependencies:** Ticket #20

---

### 22. Test guided question flow
**Priority:** 22 — Quality gate

**Description:**
Verify the entire question flow works correctly.

**What to test:**
- Start question flow
- Answer each type of question
- Use back/next navigation
- Complete and save
- Retrieve saved answers

**Acceptance Criteria:**
- All question types work
- Navigation is smooth
- Answers persist correctly
- No data loss

**Dependencies:** Ticket #21

---

## 🤖 AI Breakdown Generation (5 tickets)

### 23. Design prompt for project breakdown
**Priority:** 23 — AI foundation

**Description:**
Create the prompt that turns user answers into a structured project plan.

**What to design:**
- Prompt template
- Input format (user answers)
- Output format (structured plan)
- Instructions for grouping into userflows/features

**Deliverable:**
- Documented prompt in `/docs/prompts.md`
- Example input/output pairs

**Acceptance Criteria:**
- Prompt documented
- Examples provided
- Output format specified

**Dependencies:** Ticket #22

---

### 24. Build API route for AI breakdown
**Priority:** 24 — Connect to Claude

**Description:**
Create endpoint that calls Claude with project context.

**What to build:**
- API route at `/api/projects/[id]/breakdown`
- Fetch user's answers from database
- Call Claude API with prompt
- Return structured response

**Acceptance Criteria:**
- Endpoint calls Claude successfully
- Passes project context correctly
- Returns parsed response
- Handles API errors

**Dependencies:** Ticket #23

---

### 25. Parse AI response into structure
**Priority:** 25 — Process AI output

**Description:**
Convert Claude's response into structured userflows and features.

**What to build:**
- Parser for AI response format
- Validation of parsed structure
- Error handling for malformed responses
- Storage in database

**Acceptance Criteria:**
- Valid responses parse correctly
- Invalid responses show helpful error
- Parsed data saves to database
- User can retry on failure

**Dependencies:** Ticket #24

---

### 26. Store breakdown in database
**Priority:** 26 — Persist AI-generated plan

**Description:**
Save the structured breakdown for editing and ticket creation.

**What to build:**
- Design `userflows` table
- Design `features` table
- Design `tickets` table
- Save breakdown with relationships

**Acceptance Criteria:**
- All data persists correctly
- Relationships work (userflow → features → tickets)
- Can retrieve by project ID
- Update operations work

**Dependencies:** Ticket #25

---

### 27. Test AI breakdown flow
**Priority:** 27 — Quality gate

**Description:**
Verify the AI produces usable project breakdowns.

**What to test:**
- Sample project answers
- AI breakdown generation
- Parsing and storage
- Display of results

**Acceptance Criteria:**
- AI returns valid structure
- Parsing succeeds
- Data stores correctly
- Results display for user

**Dependencies:** Ticket #26

---

## 🎫 Ticket Editor UI (6 tickets)

### 28. Build ticket list view
**Priority:** 28 — Core tickets display

**Description:**
Display all tickets grouped by userflow/feature.

**What to build:**
- Create tickets view component
- Group tickets by parent
- Display ticket title, status
- Add expand/collapse for groups
- Add search/filter

**Acceptance Criteria:**
- Tickets load and display correctly
- Grouping works as expected
- Expand/collapse works
- Search filters tickets

**Dependencies:** Ticket #27

---

### 29. Build ticket edit modal
**Priority:** 29 — Core edit functionality

**Description:**
Modal for editing individual ticket details.

**What to build:**
- Edit modal component
- Fields: title, description, acceptance criteria
- Save and cancel buttons
- Form validation

**Acceptance Criteria:**
- Modal opens on ticket click
- Form pre-fills with current data
- Save updates database
- Cancel closes without saving

**Dependencies:** Ticket #28

---

### 30. Add inline editing
**Priority:** 30 — Quick edit enhancement

**Description:**
Allow quick edits without opening modal.

**What to build:**
- Inline edit mode for title
- Auto-save on blur
- Visual indicator for edited tickets

**Acceptance Criteria:**
- Click to edit title inline
- Changes save automatically
- Visual feedback on save
- Escape cancels edit

**Dependencies:** Ticket #29

---

### 31. Add delete ticket functionality
**Priority:** 31 — Core delete flow

**Description:**
Allow users to remove tickets they don't want.

**What to build:**
- Delete button on each ticket
- Confirmation dialog
- Delete API call
- Update UI to remove ticket

**Acceptance Criteria:**
- Delete button appears on hover
- Confirmation dialog shows ticket title
- Delete removes from database
- UI updates immediately

**Dependencies:** Ticket #29

---

### 32. Add create new ticket button
**Priority:** 32 — Manual ticket creation

**Description:**
Allow users to manually add tickets beyond AI generation.

**What to build:**
- "Add Ticket" button
- Empty ticket creation form
- Link to parent userflow/feature
- Save to database

**Acceptance Criteria:**
- Button opens creation form
- Form saves new ticket
- Ticket appears in list
- Correctly linked to parent

**Dependencies:** Ticket #29

---

### 33. Test all ticket editing operations
**Priority:** 33 — Quality gate

**Description:**
Verify all ticket editing features work correctly.

**What to test:**
- Edit via modal
- Inline edit
- Delete ticket
- Create new ticket
- All operations persist

**Acceptance Criteria:**
- All operations work
- No data loss
- UI updates correctly
- No console errors

**Dependencies:** Ticket #32

---

## 🔗 Linear Integration (4 tickets)

### 34. Add Linear API config to user settings
**Priority:** 34 — Prerequisite for sync

**Description:**
Allow users to configure their Linear API credentials.

**What to build:**
- Settings page section
- API key input field
- Workspace name input
- Save configuration
- Validate API key works

**Acceptance Criteria:**
- Settings page has Linear section
- API key saves securely
- Validation confirms access
- Error handling for invalid keys

**Dependencies:** Ticket #3

---

### 35. Build "Sync to Linear" button
**Priority:** 35 — Primary Linear action

**Description:**
Button and flow to push tickets to Linear.

**What to build:**
- "Sync to Linear" button on tickets page
- Loading state during sync
- Success/error feedback
- Progress indicator for multiple tickets

**Acceptance Criteria:**
- Button clearly visible
- Loading state shows progress
- Success message confirms sync
- Errors show helpful message

**Dependencies:** Ticket #34

---

### 36. Map Launchpad tickets → Linear issues
**Priority:** 36 — Core sync logic

**Description:**
Convert Launchpad tickets to Linear issues via API.

**What to build:**
- Fetch tickets from database
- Call Linear API for each ticket
- Map fields (title, description, acceptance criteria)
- Store Linear issue ID back in database

**Acceptance Criteria:**
- Each ticket creates Linear issue
- Field mapping is correct
- Linear ID stored for reference
- Failed syncs are retriable

**Dependencies:** Ticket #35

---

### 37. Test Linear sync end-to-end
**Priority:** 37 — Quality gate

**Description:**
Verify tickets appear in Linear correctly.

**What to test:**
- Configure Linear API
- Click sync button
- Verify tickets appear in Linear
- Check field mapping
- Verify Linear IDs stored

**Acceptance Criteria:**
- All tickets sync correctly
- Fields match Launchpad data
- Tickets are editable in Linear
- Sync can be run again (update vs create)

**Dependencies:** Ticket #36

---

## 📊 Database & Schema (4 tickets)

### 38. Design complete schema
**Priority:** 38 — Data model foundation

**Description:**
Finalize the database schema for all Phase 1 features.

**What to design:**
- `users` table
- `projects` table
- `project_answers` table
- `userflows` table
- `features` table
- `tickets` table
- All relationships and indexes

**Deliverable:**
- Schema document in `/docs/database-schema.md`
- ERD diagram

**Acceptance Criteria:**
- All tables designed
- Relationships specified
- Indexes planned
- Document complete

**Dependencies:** None (can run in parallel)

---

### 39. Set up Supabase & create tables
**Priority:** 39 — Database implementation

**Description:**
Create the actual database in Supabase.

**What to build:**
- Create Supabase project
- Run table creation scripts
- Set up relationships
- Create indexes

**Acceptance Criteria:**
- All tables exist
- Relationships work
- Indexes created
- Can query via Supabase client

**Dependencies:** Ticket #38

---

### 40. Add Row Level Security policies
**Priority:** 40 — Security requirement

**Description:**
Ensure users can only access their own data.

**What to build:**
- RLS policies for each table
- User isolation rules
- Admin access rules
- Test policies work

**Acceptance Criteria:**
- Users see only their data
- Policies are enforced
- No data leakage
- Documented in schema doc

**Dependencies:** Ticket #39

---

### 41. Test CRUD operations
**Priority:** 41 — Database verification

**Description:**
Verify all database operations work correctly.

**What to test:**
- Create records
- Read records
- Update records
- Delete records
- Query with joins
- RLS enforcement

**Acceptance Criteria:**
- All CRUD operations work
- Queries return correct data
- RLS blocks unauthorized access
- No data corruption

**Dependencies:** Ticket #40

---

## 🧪 Testing & Polish (4 tickets)

### 42. Set up test framework
**Priority:** 42 — Testing foundation

**Description:**
Set up Playwright for end-to-end testing.

**What to build:**
- Install Playwright
- Create test structure
- Set up test database
- Configure CI to run tests

**Acceptance Criteria:**
- Playwright installed
- Tests can run locally
- CI runs tests on PR
- Test database isolates test data

**Dependencies:** None (can run in parallel)

---

### 43. Write critical path tests
**Priority:** 43 — Core test coverage

**Description:**
E2E tests for the main user flows.

**What to test:**
- Login flow
- Create project
- Complete questions
- Generate breakdown
- Edit tickets
- Sync to Linear

**Acceptance Criteria:**
- Each flow has test
- Tests pass consistently
- Failed tests give clear errors
- Tests run in CI

**Dependencies:** Ticket #42

---

### 44. Fix bugs found in testing
**Priority:** 44 — Quality improvements

**Description:**
Address any issues discovered during testing.

**What to do:**
- Review test failures
- Fix bugs
- Add regression tests
- Re-verify fixes

**Acceptance Criteria:**
- All tests pass
- No known critical bugs
- Edge cases handled
- Document any limitations

**Dependencies:** Ticket #43

---

### 45. Polish UI & UX
**Priority:** 45 — Final polish

**Description:**
Improve the overall feel and finish of the application.

**What to polish:**
- Loading states
- Error handling
- Empty states
- Transitions and animations
- Mobile responsiveness
- Accessibility

**Acceptance Criteria:**
- All states have UI
- Errors are helpful
- Empty states guide users
- Smooth transitions
- Works on mobile
- Accessible (keyboard nav, screen readers)

**Dependencies:** Ticket #44

---

## Priority Order Summary

Tickets are ordered by dependency chain — start at the top and work down. Each ticket builds on the ones before it.

**Critical Path (must complete in order):**
1 → 2 → 3 → 7 → 4 → 5 → 6 → 8 → 9 → 10 → 11 → 12

**Can run in parallel:**
- Ticket #38 (schema design) — do anytime
- Ticket #42 (test framework) — do anytime
- Ticket #17 (framework research) — do anytime

---

*Last updated: 12 August 2026*
