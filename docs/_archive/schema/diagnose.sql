-- ARCHIVED 2026-09-22: raw SQL setup/diagnostic script, not a Decision Doc.
-- Replaced by: versioned migrations in supabase/migrations/ and docs/data/model.md.

-- Diagnostic Query - Check what exists in the database
-- Run this to see what's in your database

-- Check ALL tables in public schema
SELECT table_name
FROM information_schema.tables
WHERE table_schema = 'public'
ORDER BY table_name;

-- If no results, check ALL schemas
SELECT table_schema, table_name
FROM information_schema.tables
ORDER BY table_schema, table_name
LIMIT 20;

-- Check if we have any tables at all
SELECT COUNT(*) as total_tables
FROM information_schema.tables
WHERE table_schema = 'public';

-- Check current database and schema
SELECT current_database(), current_schema;
