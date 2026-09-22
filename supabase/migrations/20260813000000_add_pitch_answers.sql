-- Add pitch_answers JSONB column to projects table
-- Stores answers to guided product discovery questions
-- Structure: { "question-id": "answer text", ... }

ALTER TABLE projects
ADD COLUMN IF NOT EXISTS pitch_answers JSONB DEFAULT '{}'::jsonb;

-- Add index for efficient querying if needed
CREATE INDEX IF NOT EXISTS idx_projects_pitch_answers ON projects USING gin(pitch_answers);

-- Add comment for documentation
COMMENT ON COLUMN projects.pitch_answers IS 'JSON object storing answers to pitch questions. Keys are question IDs, values are user answers.';
