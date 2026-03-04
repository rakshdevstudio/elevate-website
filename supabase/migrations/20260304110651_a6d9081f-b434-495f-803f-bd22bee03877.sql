
-- Create lead status enum
CREATE TYPE public.lead_status AS ENUM ('new', 'contacted', 'inspection_scheduled', 'quotation_sent', 'converted', 'lost');

-- Create lead source enum
CREATE TYPE public.lead_source AS ENUM ('website_form', 'whatsapp', 'phone', 'referral', 'walk_in', 'other');

-- Create leads table
CREATE TABLE public.leads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  building_type TEXT,
  number_of_floors TEXT,
  elevator_type TEXT,
  message TEXT,
  company_name TEXT,
  lead_source lead_source NOT NULL DEFAULT 'website_form',
  status lead_status NOT NULL DEFAULT 'new',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create lead notes table
CREATE TABLE public.lead_notes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  lead_id UUID NOT NULL REFERENCES public.leads(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  note TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lead_notes ENABLE ROW LEVEL SECURITY;

-- Create app_role enum and user_roles table
CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');

CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  UNIQUE (user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- RLS policies for leads (admin only)
CREATE POLICY "Admins can view all leads" ON public.leads
  FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update leads" ON public.leads
  FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete leads" ON public.leads
  FOR DELETE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Anyone can insert leads (from website forms)
CREATE POLICY "Anyone can submit leads" ON public.leads
  FOR INSERT TO anon, authenticated
  WITH CHECK (true);

-- RLS policies for lead notes (admin only)
CREATE POLICY "Admins can view lead notes" ON public.lead_notes
  FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can add lead notes" ON public.lead_notes
  FOR INSERT TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete their notes" ON public.lead_notes
  FOR DELETE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- RLS for user_roles
CREATE POLICY "Admins can view roles" ON public.user_roles
  FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Updated_at trigger
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_leads_updated_at
  BEFORE UPDATE ON public.leads
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
