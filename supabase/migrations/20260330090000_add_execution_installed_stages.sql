-- Add missing visited_meeting and new post-conversion statuses
ALTER TYPE public.lead_status ADD VALUE IF NOT EXISTS 'visited_meeting' AFTER 'inspection_scheduled';
ALTER TYPE public.lead_status ADD VALUE IF NOT EXISTS 'execution_wip' AFTER 'converted';
ALTER TYPE public.lead_status ADD VALUE IF NOT EXISTS 'installed' AFTER 'execution_wip';

-- Track execution and installation lifecycle metadata
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'installation_status') THEN
    CREATE TYPE public.installation_status AS ENUM ('pending', 'in_progress', 'near_completion');
  END IF;
END $$;

ALTER TABLE public.leads
  ADD COLUMN IF NOT EXISTS execution_start_date date,
  ADD COLUMN IF NOT EXISTS execution_engineer text,
  ADD COLUMN IF NOT EXISTS execution_notes text,
  ADD COLUMN IF NOT EXISTS installation_status public.installation_status,
  ADD COLUMN IF NOT EXISTS completion_date date,
  ADD COLUMN IF NOT EXISTS project_value numeric,
  ADD COLUMN IF NOT EXISTS warranty_status text,
  ADD COLUMN IF NOT EXISTS final_notes text,
  ADD COLUMN IF NOT EXISTS client_satisfaction integer;
