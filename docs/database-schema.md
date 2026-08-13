# Launchpad Database Schema

Complete database schema for Phase 1 features of Launchpad.

## Overview

Launchpad uses a relational database (Supabase/PostgreSQL) to store:
- User profiles and settings
- Projects with AI-generated breakdowns
- Guided question answers
- Userflows, features, and tickets

## Entity Relationship Diagram

```
┌─────────────┐     ┌──────────────────┐     ┌──────────────┐
│   users     │────<│ user_settings    │     │   tickets     │
└─────────────┘     └──────────────────┘     └──────────────┘
       │                                            │
       │                                            │
       ▼                                            ▼
┌─────────────┐     ┌──────────────────┐     ┌──────────────┐
│  projects   │────<│ project_answers   │     │   features    │
└─────────────┘     └──────────────────┘     └──────────────┘
       │
       │
       ▼
┌─────────────┐     ┌──────────────────┐
│  userflows  │     │ userflow_questions│
└─────────────┘     └──────────────────┘
       │
       ▼
┌─────────────┐
│  features   │
└─────────────┘
```

## Tables

### users

Stores user account information synced from GitHub OAuth.

```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  github_id TEXT UNIQUE,
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  avatar_url TEXT,
  username TEXT,
  bio TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_sign_in_at TIMESTAMP WITH TIME ZONE,
);
```

**Indexes:**
- `idx_users_github_id` on `github_id`
- `idx_users_email` on `email`

### user_settings

User preferences and application settings.

```sql
CREATE TABLE user_settings (
  user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  theme TEXT DEFAULT 'dark' CHECK (theme IN ('light', 'dark', 'system')),
  email_notifications BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
);
```

### projects

Main project records created by users.

```sql
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'active', 'completed', 'archived')),
  vision TEXT,
  target_audience TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  completed_at TIMESTAMP WITH TIME ZONE,
);
```

**Indexes:**
- `idx_projects_user_id` on `user_id`
- `idx_projects_status` on `status`
- `idx_projects_updated_at` on `updated_at` DESC

### project_answers

Stores user's answers to guided product discovery questions.

```sql
CREATE TABLE project_answers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  question_key TEXT NOT NULL,
  answer TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(project_id, question_key)
);
```

**Indexes:**
- `idx_project_answers_project_id` on `project_id`
- `idx_project_answers_question_key` on `question_key`

**Question Keys:**
- `problem_statement` - What problem are you solving?
- `target_audience` - Who is this for?
- `value_proposition` - Why would they care?
- `current_alternatives` - What do they use now?
- `unfair_advantage` - What makes you different?

### userflows

User journey flows that make up the product experience.

```sql
CREATE TABLE userflows (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  sequence_number INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
);
```

**Indexes:**
- `idx_userflows_project_id` on `project_id`
- `idx_userflows_sequence` on `project_id, sequence_number`

### features

Specific features within each userflow.

```sql
CREATE TABLE features (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  userflow_id UUID NOT NULL REFERENCES userflows(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  sequence_number INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
);
```

**Indexes:**
- `idx_features_userflow_id` on `userflow_id`
- `idx_features_sequence` on `userflow_id, sequence_number`

### tickets

Actionable work items derived from features.

```sql
CREATE TABLE tickets (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  feature_id UUID NOT NULL REFERENCES features(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'todo' CHECK (status IN ('todo', 'in_progress', 'done', 'blocked')),
  priority TEXT DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
  sequence_number INTEGER NOT NULL,
  linear_ticket_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  completed_at TIMESTAMP WITH TIME ZONE,
);
```

**Indexes:**
- `idx_tickets_feature_id` on `feature_id`
- `idx_tickets_status` on `status`
- `idx_tickets_priority` on `priority`
- `idx_tickets_sequence` on `feature_id, sequence_number`

## Row Level Security (RLS)

All tables use RLS to ensure users can only access their own data:

```sql
-- Users table policies
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own profile" ON users FOR SELECT USING (id = auth.uid());
CREATE POLICY "Users can update own profile" ON users FOR UPDATE USING (id = auth.uid());
CREATE POLICY "Users can insert own profile" ON users FOR INSERT WITH CHECK (id = auth.uid());

-- Projects table policies
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own projects" ON projects FOR SELECT USING (user_id = auth.uid());
CREATE POLICY "Users can insert own projects" ON projects FOR INSERT WITH CHECK (user_id = auth.uid());
CREATE POLICY "Users can update own projects" ON projects FOR UPDATE USING (user_id = auth.uid());
CREATE POLICY "Users can delete own projects" ON projects FOR DELETE USING (user_id = auth.uid());

-- Similar policies for all other tables...
```

## Functions and Triggers

### Updated At Trigger

Automatically updates the `updated_at` column:

```sql
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply to all tables with updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
-- (repeat for each table)
```

### Project Completion Trigger

Updates project completion timestamp when status changes to 'completed':

```sql
CREATE OR REPLACE FUNCTION update_project_completion()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.status = 'completed' AND OLD.status != 'completed' THEN
    NEW.completed_at = NOW();
  ELSIF NEW.status != 'completed' THEN
    NEW.completed_at = NULL;
  END IF;
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_project_completion BEFORE UPDATE ON projects
  FOR EACH ROW EXECUTE FUNCTION update_project_completion();
```

## Migration Strategy

1. **Phase 1 (Current):** Core tables (users, user_settings, projects)
2. **Phase 2:** AI-generated content tables (project_answers, userflows, features)
3. **Phase 3:** Task management (tickets)

## Data Integrity

- **Foreign Keys:** All relationships use `ON DELETE CASCADE` to prevent orphaned records
- **Unique Constraints:** Prevent duplicate data (emails, project_id + question_key pairs)
- **Check Constraints:** Validate enum-like fields (status, priority, theme)
- **Not Null:** Required fields are enforced at the database level

## Performance Considerations

- **Indexes:** Added on foreign keys, frequently filtered columns, and sort columns
- **Query Patterns:** Designed for common access patterns (user's projects, project's userflows, etc.)
- **Cascade Deletes:** Keep data clean when parent records are removed
- **RLS Overhead:** Minimal impact with indexed user_id columns

## Next Steps

1. Run migrations in Supabase
2. Create migration scripts for version control
3. Add data seeding for development
4. Consider adding full-text search for project descriptions
5. Add audit logging for project changes
