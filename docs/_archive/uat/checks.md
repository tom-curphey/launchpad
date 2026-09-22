> **Archived 2026-09-22.** A manual test checklist for one ticket (ACT-20). This is a work artifact, not a decision.
>
> **Replaced by:** [uat/strategy.md](../../uat/strategy.md)

---

# ACT-20 Testing Checklist - Project Detail Page

> UAT checks — human acceptance checklists for shipped work. Current checklist: ACT-20 project detail page.

---

**Ticket:** [ACT-20: Test project detail page](https://linear.app/tomcurphey/issue/ACT-20)

**Date:** _Add date when testing_

**Tester:** _Add your name_

**Dev Server:** `http://localhost:3000`

---

## Instructions

1. Copy this file to a new location if you want to keep your test results
2. Mark each test with one of:
   - ✅ PASS
   - ❌ FAIL
   - ⚠️ PARTIAL
   - ⏭️ SKIPPED
3. Add notes for any failures or issues
4. Copy the result back to Claude when done

---

## Pre-Test Setup

- [ ] Dev server running on `localhost:3000`
- [ ] Logged into the app
- [ ] At least one project exists (create one if needed)

---

## Test Cases

### 1. Page Load & Display

| Test | Result | Notes |
|------|-------|-------|
| Navigate to `/dashboard` | | |
| Click on a project from dashboard | | |
| Project detail page loads | | |
| Project name displays in header | | |
| Status badge shows correct value (draft/active/completed/archived) | | |
| Status badge has correct color | | |
| Description displays (or "No description yet" if empty) | | |
| Created date shows formatted (e.g., "Jan 15, 2026") | | |
| Updated date shows formatted | | |
| Vision displays if filled out | | |
| Target Audience displays if filled out | | |
| Stats show (Userflows, Features, Tickets) | | |
| "Get Started" card displays | | |
| "Answer Questions" button links to `/projects/[id]/questions` | | |

**Section Result:** _____ (✅ / ❌ / ⚠️ / ⏭️)

**Notes:**
```

```

---

### 2. Edit Modal - Open & Display

| Test | Result | Notes |
|------|-------|-------|
| "Edit" button visible in header | | |
| Click "Edit" button | | |
| Modal opens with backdrop overlay | | |
| Modal title says "Edit Project" | | |
| Close (X) button visible in top-right | | |
| **Form fields pre-fill correctly:** | | |
| → Name field shows current project name | | |
| → Description field shows current description | | |
| → Status dropdown shows current status | | |
| → Vision field shows current vision | | |
| → Target Audience field shows current target audience | | |
| "Cancel" button visible | | |
| "Save Changes" button visible | | |
| Click outside modal (backdrop) | | |
| Modal closes (optional UX - document behavior) | | |

**Section Result:** _____ (✅ / ❌ / ⚠️ / ⏭️)

**Notes:**
```

```

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
| Check database - values persisted | | |

**Section Result:** _____ (✅ / ❌ / ⚠️ / ⏭️)

**Notes:**
```

```

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

**Notes:**
```

```

---

### 5. Navigation

| Test | Result | Notes |
|------|-------|-------|
| Click "Overview" tab | | |
| Stays on current page (it's already Overview) | | |
| Click "Questions" tab | | |
| Navigates to `/projects/[id]/questions` | | |
| Click back button in browser | | |
| Returns to project detail page | | |
| Click "Tickets" tab | | |
| Navigates to `/projects/[id]/tickets` | | |
| Click back arrow icon (←) in header | | |
| Navigates back to `/dashboard` | | |

**Section Result:** _____ (✅ / ❌ / ⚠️ / ⏭️)

**Notes:**
```

```

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

**Notes:**
```

```

---

### 7. Error Handling - Project Not Found

| Test | Result | Notes |
|------|-------|-------|
| While logged in, navigate to fake project URL | | |
| Use a non-existent UUID like `/projects/fake-id-here` | | |
| "Project Not Found" message displays | | |
| 😕 emoji displays | | |
| Helpful error message shows | | |
| "Back to Dashboard" button visible | | |
| Click "Back to Dashboard" | | |
| Navigates to `/dashboard` | | |

**Section Result:** _____ (✅ / ❌ / ⚠️ / ⏭️)

**Notes:**
```

```

---

### 8. Console Errors

| Test | Result | Notes |
|------|-------|-------|
| Open browser DevTools (F12 or Cmd+Option+I) | | |
| Go to Console tab | | |
| Navigate to project detail page | | |
| No red errors in console | | |
| Open and close Edit modal | | |
| No red errors in console | | |
| Save a change | | |
| No red errors in console | | |
| Navigate between tabs | | |
| No red errors in console | | |

**Section Result:** _____ (✅ / ❌ / ⚠️ / ⏭️)

**Console output (if any errors):**
```

```

---

### 9. Mobile Responsive

| Test | Result | Notes |
|------|-------|-------|
| Open browser DevTools | | |
| Enable device toolbar (Cmd+Shift+M) | | |
| Select iPhone (375px width) | | |
| Header layout adapts (items stack or adjust) | | |
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

**Notes:**
```

```

---

### 10. Form Validation

| Test | Result | Notes |
|------|-------|-------|
| Open Edit modal | | |
| Clear the project name field | | |
| Click "Save Changes" | | |
| Browser validation prevents submit (required attribute) | | |
| Or custom error shows "Name is required" | | |
| Cancel and retry with valid data | | |
| Save succeeds | | |

**Section Result:** _____ (✅ / ❌ / ⚠️ / ⏭️)

**Notes:**
```

```

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
```

```

2.
```

```

3.
```

```

---

## Environment

| Item | Value |
|------|-------|
| Browser | _e.g., Chrome 120, Safari 17_ |
| OS | _e.g., macOS 14, Windows 11_ |
| Screen Size | _e.g., 1920x1080_ |
| Date/Time | _When testing was performed_ |

---

**Testing Completed:** _____________

**Reviewed By:** _____________
