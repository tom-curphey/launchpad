-- Add draft_tickets JSONB column for AI-generated tickets
-- Stores AI-generated ticket breakdown before Linear sync
-- Structure: { columns: [], generatedAt: null, linearProjectId: null, submittedAt: null }

ALTER TABLE projects
ADD COLUMN draft_tickets JSONB DEFAULT '{
  "columns": [],
  "generatedAt": null,
  "linearProjectId": null,
  "submittedAt": null
}'::jsonb;

-- Add Linear integration columns
ALTER TABLE projects
ADD COLUMN linear_team_id TEXT,
ADD COLUMN linear_project_id TEXT;

-- Add comments for documentation
COMMENT ON COLUMN projects.draft_tickets IS 'AI-generated draft tickets before Linear sync. Stores columns, tickets, dependencies, and Linear mappings.';
COMMENT ON COLUMN projects.linear_team_id IS 'Linear team ID for this project (from user settings or project-specific)';
COMMENT ON COLUMN projects.linear_project_id IS 'Linear project ID after tickets are submitted';

-- Add index for efficient querying if needed (optional, for now skip GIN index on JSONB)
-- CREATE INDEX IF NOT EXISTS idx_projects_draft_tickets ON projects USING gin(draft_tickets);
