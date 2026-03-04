
ALTER TABLE public.site_visits ADD COLUMN IF NOT EXISTS customer_name text;
ALTER TABLE public.site_visits ADD COLUMN IF NOT EXISTS phone text;
