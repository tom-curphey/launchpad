-- Disable RLS - API layer handles security
-- Users access data only through authenticated API routes

ALTER TABLE users DISABLE ROW LEVEL SECURITY;
ALTER TABLE projects DISABLE ROW LEVEL SECURITY;
