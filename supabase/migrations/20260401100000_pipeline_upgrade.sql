-- Add new statuses to enum in order
ALTER TYPE public.lead_status ADD VALUE IF NOT EXISTS 'material_dispatched' AFTER 'converted';
ALTER TYPE public.lead_status ADD VALUE IF NOT EXISTS 'handover' AFTER 'installed';

-- Lead fields for dispatch
ALTER TABLE public.leads
  ADD COLUMN IF NOT EXISTS material_dispatch_date timestamp with time zone,
  ADD COLUMN IF NOT EXISTS materials_notes text,
  ADD COLUMN IF NOT EXISTS logistics_partner text;

-- Payments table keeps existing columns; optional notes already present as note
-- Ensure project_value exists; if missing treat as zero

-- Trigger to enforce full payment before handover
CREATE OR REPLACE FUNCTION public.check_handover_payments()
RETURNS trigger AS $$
DECLARE
  collected numeric := 0;
  total numeric := 0;
  due numeric := 0;
BEGIN
  IF NEW.status = 'handover' AND NEW.status IS DISTINCT FROM OLD.status THEN
    SELECT COALESCE(SUM(amount),0) INTO collected FROM public.payments WHERE lead_id = NEW.id;
    SELECT COALESCE(project_value, 0) INTO total FROM public.leads WHERE id = NEW.id;
    due := GREATEST(total - collected, 0);
    IF total = 0 THEN
      RAISE EXCEPTION 'Cannot complete handover. Project value missing or zero.' USING ERRCODE = 'P0001';
    END IF;
    IF due > 0 THEN
      RAISE EXCEPTION 'Cannot complete handover. ₹% still pending.', due;
    END IF;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_check_handover_payments ON public.leads;
CREATE TRIGGER trg_check_handover_payments
BEFORE UPDATE OF status ON public.leads
FOR EACH ROW
EXECUTE FUNCTION public.check_handover_payments();
