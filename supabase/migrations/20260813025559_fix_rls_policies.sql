-- Fix RLS policies for users and projects tables
-- Users can only access their own data

-- Drop existing policies if they exist (to avoid conflicts)
DROP POLICY IF EXISTS "Users can insert their own user record" ON users;
DROP POLICY IF EXISTS "Users can view their own user record" ON users;
DROP POLICY IF EXISTS "Users can update their own user record" ON users;

DROP POLICY IF EXISTS "Users can create projects" ON projects;
DROP POLICY IF EXISTS "Users can see their own projects" ON projects;
DROP POLICY IF EXISTS "Users can update their own projects" ON projects;
DROP POLICY IF EXISTS "Users can delete their own projects" ON projects;

-- Enable RLS on both tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Users table policies
-- Users can insert their own record (for initial creation via auth trigger or API)
CREATE POLICY "Users can insert their own user record"
ON users
FOR INSERT
WITH CHECK (email = auth.jwt() ->> 'email');

-- Users can view their own record
CREATE POLICY "Users can view their own user record"
ON users
FOR SELECT
USING (email = auth.jwt() ->> 'email');

-- Users can update their own record
CREATE POLICY "Users can update their own user record"
ON users
FOR UPDATE
USING (email = auth.jwt() ->> 'email');

-- Projects table policies
-- Users can create projects (they become the owner)
CREATE POLICY "Users can create projects"
ON projects
FOR INSERT
WITH CHECK (user_id = auth.uid());

-- Users can see only their own projects
CREATE POLICY "Users can see their own projects"
ON projects
FOR SELECT
USING (user_id = auth.uid());

-- Users can update their own projects
CREATE POLICY "Users can update their own projects"
ON projects
FOR UPDATE
USING (user_id = auth.uid());

-- Users can delete their own projects
CREATE POLICY "Users can delete their own projects"
ON projects
FOR DELETE
USING (user_id = auth.uid());
