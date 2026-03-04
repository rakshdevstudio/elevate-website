
-- Add 'negotiation' to lead_status enum
ALTER TYPE public.lead_status ADD VALUE IF NOT EXISTS 'negotiation' AFTER 'quotation_sent';

-- Add lead scoring and assignment columns to leads
ALTER TABLE public.leads ADD COLUMN IF NOT EXISTS lead_score INTEGER DEFAULT 0;
ALTER TABLE public.leads ADD COLUMN IF NOT EXISTS assigned_to TEXT;
ALTER TABLE public.leads ADD COLUMN IF NOT EXISTS estimated_value NUMERIC;

-- Create site_visits table
CREATE TABLE public.site_visits (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  lead_id UUID NOT NULL REFERENCES public.leads(id) ON DELETE CASCADE,
  scheduled_date DATE NOT NULL,
  scheduled_time TEXT,
  engineer_name TEXT,
  address TEXT,
  notes TEXT,
  status TEXT NOT NULL DEFAULT 'scheduled',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.site_visits ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view site visits" ON public.site_visits
  FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can insert site visits" ON public.site_visits
  FOR INSERT TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update site visits" ON public.site_visits
  FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete site visits" ON public.site_visits
  FOR DELETE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Create lead_history table for timeline
CREATE TABLE public.lead_history (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  lead_id UUID NOT NULL REFERENCES public.leads(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  action TEXT NOT NULL,
  old_value TEXT,
  new_value TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.lead_history ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view lead history" ON public.lead_history
  FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can insert lead history" ON public.lead_history
  FOR INSERT TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Updated_at triggers
CREATE TRIGGER update_site_visits_updated_at
  BEFORE UPDATE ON public.site_visits
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
