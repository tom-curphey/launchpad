-- ARCHIVED 2026-09-22: raw SQL setup/diagnostic script, not a Decision Doc.
-- Replaced by: versioned migrations in supabase/migrations/ and docs/data/model.md.

-- Launchpad Initial Database Schema
-- Migration: 001_initial_schema
-- Run this in Supabase SQL Editor

-- ============================================
-- ENABLE UUID EXTENSION
-- ============================================
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- USERS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  github_id TEXT UNIQUE,
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  avatar_url TEXT,
  username TEXT,
  bio TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_sign_in_at TIMESTAMP WITH TIME ZONE
);

-- Indexes for users
CREATE INDEX IF NOT EXISTS idx_users_github_id ON users(github_id);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);

-- ============================================
-- USER SETTINGS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS user_settings (
  user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  theme TEXT DEFAULT 'dark' CHECK (theme IN ('light', 'dark', 'system')),
  email_notifications BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- PROJECTS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'active', 'completed', 'archived')),
  vision TEXT,
  target_audience TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  completed_at TIMESTAMP WITH TIME ZONE
);

-- Indexes for projects
CREATE INDEX IF NOT EXISTS idx_projects_user_id ON projects(user_id);
CREATE INDEX IF NOT EXISTS idx_projects_status ON projects(status);
CREATE INDEX IF NOT EXISTS idx_projects_updated_at ON projects(updated_at DESC);

-- ============================================
-- PROJECT ANSWERS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS project_answers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  question_key TEXT NOT NULL,
  answer TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(project_id, question_key)
);

-- Indexes for project_answers
CREATE INDEX IF NOT EXISTS idx_project_answers_project_id ON project_answers(project_id);
CREATE INDEX IF NOT EXISTS idx_project_answers_question_key ON project_answers(question_key);

-- ============================================
-- USERFLOWS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS userflows (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  sequence_number INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for userflows
CREATE INDEX IF NOT EXISTS idx_userflows_project_id ON userflows(project_id);
CREATE INDEX IF NOT EXISTS idx_userflows_sequence ON userflows(project_id, sequence_number);

-- ============================================
-- FEATURES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS features (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  userflow_id UUID NOT NULL REFERENCES userflows(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  sequence_number INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for features
CREATE INDEX IF NOT EXISTS idx_features_userflow_id ON features(userflow_id);
CREATE INDEX IF NOT EXISTS idx_features_sequence ON features(userflow_id, sequence_number);

-- ============================================
-- TICKETS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS tickets (
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
  completed_at TIMESTAMP WITH TIME ZONE
);

-- Indexes for tickets
CREATE INDEX IF NOT EXISTS idx_tickets_feature_id ON tickets(feature_id);
CREATE INDEX IF NOT EXISTS idx_tickets_status ON tickets(status);
CREATE INDEX IF NOT EXISTS idx_tickets_priority ON tickets(priority);
CREATE INDEX IF NOT EXISTS idx_tickets_sequence ON tickets(feature_id, sequence_number);

-- ============================================
-- FUNCTIONS AND TRIGGERS
-- ============================================

-- Updated At Trigger Function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply updated_at triggers to all tables
DROP TRIGGER IF EXISTS update_users_updated_at ON users;
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_user_settings_updated_at ON user_settings;
CREATE TRIGGER update_user_settings_updated_at BEFORE UPDATE ON user_settings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_projects_updated_at ON projects;
CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON projects
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_project_answers_updated_at ON project_answers;
CREATE TRIGGER update_project_answers_updated_at BEFORE UPDATE ON project_answers
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_userflows_updated_at ON userflows;
CREATE TRIGGER update_userflows_updated_at BEFORE UPDATE ON userflows
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_features_updated_at ON features;
CREATE TRIGGER update_features_updated_at BEFORE UPDATE ON features
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_tickets_updated_at ON tickets;
CREATE TRIGGER update_tickets_updated_at BEFORE UPDATE ON tickets
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Project Completion Trigger Function
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

-- Apply project completion trigger
DROP TRIGGER IF EXISTS update_project_completion ON projects;
CREATE TRIGGER update_project_completion BEFORE UPDATE ON projects
  FOR EACH ROW EXECUTE FUNCTION update_project_completion();

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================

-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_answers ENABLE ROW LEVEL SECURITY;
ALTER TABLE userflows ENABLE ROW LEVEL SECURITY;
ALTER TABLE features ENABLE ROW LEVEL SECURITY;
ALTER TABLE tickets ENABLE ROW LEVEL SECURITY;

-- Users table policies
CREATE POLICY "Users can view own profile" ON users FOR SELECT USING (id = auth.uid());
CREATE POLICY "Users can update own profile" ON users FOR UPDATE USING (id = auth.uid());
CREATE POLICY "Users can insert own profile" ON users FOR INSERT WITH CHECK (id = auth.uid());

-- User settings policies
CREATE POLICY "Users can view own settings" ON user_settings FOR SELECT USING (user_id = auth.uid());
CREATE POLICY "Users can update own settings" ON user_settings FOR UPDATE USING (user_id = auth.uid());
CREATE POLICY "Users can insert own settings" ON user_settings FOR INSERT WITH CHECK (user_id = auth.uid());

-- Projects policies
CREATE POLICY "Users can view own projects" ON projects FOR SELECT USING (user_id = auth.uid());
CREATE POLICY "Users can insert own projects" ON projects FOR INSERT WITH CHECK (user_id = auth.uid());
CREATE POLICY "Users can update own projects" ON projects FOR UPDATE USING (user_id = auth.uid());
CREATE POLICY "Users can delete own projects" ON projects FOR DELETE USING (user_id = auth.uid());

-- Project answers policies
CREATE POLICY "Users can view own project answers" ON project_answers FOR SELECT USING (
  project_id IN (SELECT id FROM projects WHERE user_id = auth.uid())
);
CREATE POLICY "Users can insert own project answers" ON project_answers FOR INSERT WITH CHECK (
  project_id IN (SELECT id FROM projects WHERE user_id = auth.uid())
);
CREATE POLICY "Users can update own project answers" ON project_answers FOR UPDATE USING (
  project_id IN (SELECT id FROM projects WHERE user_id = auth.uid())
);
CREATE POLICY "Users can delete own project answers" ON project_answers FOR DELETE USING (
  project_id IN (SELECT id FROM projects WHERE user_id = auth.uid())
);

-- Userflows policies
CREATE POLICY "Users can view own userflows" ON userflows FOR SELECT USING (
  project_id IN (SELECT id FROM projects WHERE user_id = auth.uid())
);
CREATE POLICY "Users can insert own userflows" ON userflows FOR INSERT WITH CHECK (
  project_id IN (SELECT id FROM projects WHERE user_id = auth.uid())
);
CREATE POLICY "Users can update own userflows" ON userflows FOR UPDATE USING (
  project_id IN (SELECT id FROM projects WHERE user_id = auth.uid())
);
CREATE POLICY "Users can delete own userflows" ON userflows FOR DELETE USING (
  project_id IN (SELECT id FROM projects WHERE user_id = auth.uid())
);

-- Features policies
CREATE POLICY "Users can view own features" ON features FOR SELECT USING (
  userflow_id IN (SELECT id FROM userflows WHERE project_id IN (SELECT id FROM projects WHERE user_id = auth.uid()))
);
CREATE POLICY "Users can insert own features" ON features FOR INSERT WITH CHECK (
  userflow_id IN (SELECT id FROM userflows WHERE project_id IN (SELECT id FROM projects WHERE user_id = auth.uid()))
);
CREATE POLICY "Users can update own features" ON features FOR UPDATE USING (
  userflow_id IN (SELECT id FROM userflows WHERE project_id IN (SELECT id FROM projects WHERE user_id = auth.uid()))
);
CREATE POLICY "Users can delete own features" ON features FOR DELETE USING (
  userflow_id IN (SELECT id FROM userflows WHERE project_id IN (SELECT id FROM projects WHERE user_id = auth.uid()))
);

-- Tickets policies
CREATE POLICY "Users can view own tickets" ON tickets FOR SELECT USING (
  feature_id IN (SELECT id FROM features WHERE userflow_id IN (SELECT id FROM userflows WHERE project_id IN (SELECT id FROM projects WHERE user_id = auth.uid())))
);
CREATE POLICY "Users can insert own tickets" ON tickets FOR INSERT WITH CHECK (
  feature_id IN (SELECT id FROM features WHERE userflow_id IN (SELECT id FROM userflows WHERE project_id IN (SELECT id FROM projects WHERE user_id = auth.uid())))
);
CREATE POLICY "Users can update own tickets" ON tickets FOR UPDATE USING (
  feature_id IN (SELECT id FROM features WHERE userflow_id IN (SELECT id FROM userflows WHERE project_id IN (SELECT id FROM projects WHERE user_id = auth.uid())))
);
CREATE POLICY "Users can delete own tickets" ON tickets FOR DELETE USING (
  feature_id IN (SELECT id FROM features WHERE userflow_id IN (SELECT id FROM userflows WHERE project_id IN (SELECT id FROM projects WHERE user_id = auth.uid())))
);

-- ============================================
-- COMPLETED
-- ============================================
-- All tables, indexes, functions, triggers, and RLS policies have been created.
-- The database is now ready for the Launchpad application.
