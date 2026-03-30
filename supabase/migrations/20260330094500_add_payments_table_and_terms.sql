-- Extend leads with payment terms (JSONB) if missing
ALTER TABLE public.leads
  ADD COLUMN IF NOT EXISTS payment_terms jsonb;

-- Payments table for revenue tracking
CREATE TABLE IF NOT EXISTS public.payments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id uuid REFERENCES public.leads(id) ON DELETE CASCADE,
  amount numeric NOT NULL,
  paid_on date NOT NULL,
  method text,
  note text,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS payments_lead_id_idx ON public.payments(lead_id);
CREATE INDEX IF NOT EXISTS payments_paid_on_idx ON public.payments(paid_on);
