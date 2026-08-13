-- Verification Query for Launchpad Schema
-- Run this to verify all tables were created successfully

-- Check all tables exist
SELECT table_name, table_schema
FROM information_schema.tables
WHERE table_schema = 'public'
AND table_name IN ('users', 'user_settings', 'projects', 'project_answers', 'userflows', 'features', 'tickets')
ORDER BY table_name;

-- Check indexes were created
SELECT tablename, indexname
FROM pg_indexes
WHERE schemaname = 'public'
AND tablename IN ('users', 'user_settings', 'projects', 'project_answers', 'userflows', 'features', 'tickets')
ORDER BY tablename, indexname;

-- Check triggers were created
SELECT trigger_name, event_object_table
FROM information_schema.triggers
WHERE trigger_schema = 'public'
ORDER BY event_object_table, trigger_name;

-- Check RLS policies were created
SELECT schemaname, tablename, policyname
FROM pg_policies
WHERE schemaname = 'public'
ORDER BY tablename, policyname;

-- Expected Results:
-- 7 tables: users, user_settings, projects, project_answers, userflows, features, tickets
-- 12+ indexes across all tables
-- 8 triggers (7 updated_at + 1 project_completion)
-- 24 RLS policies (4 per table for users, projects, user_settings; 6+ for related tables)
