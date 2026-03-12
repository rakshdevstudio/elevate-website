-- Add budget_range (INTEGER) and address (TEXT) columns to leads table
-- Safe: uses IF NOT EXISTS so it won't fail if run more than once
ALTER TABLE public.leads ADD COLUMN IF NOT EXISTS budget_range INTEGER;
ALTER TABLE public.leads ADD COLUMN IF NOT EXISTS address TEXT;
