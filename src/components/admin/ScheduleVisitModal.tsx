import { useState } from "react";
import { X, Calendar, Clock, MapPin, User, FileText } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

interface ScheduleVisitModalProps {
  leadId: string;
  leadName: string;
  leadPhone: string;
  onClose: () => void;
  onScheduled: () => void;
}

const ScheduleVisitModal = ({ leadId, leadName, leadPhone, onClose, onScheduled }: ScheduleVisitModalProps) => {
  const [visitDate, setVisitDate] = useState("");
  const [visitTime, setVisitTime] = useState("");
  const [location, setLocation] = useState("");
  const [engineer, setEngineer] = useState("");
  const [notes, setNotes] = useState("");
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!visitDate) return;
    setSaving(true);

    const { error } = await supabase.from("site_visits").insert({
      lead_id: leadId,
      scheduled_date: visitDate,
      scheduled_time: visitTime || null,
      address: location || null,
      engineer_name: engineer || null,
      notes: notes || null,
      customer_name: leadName,
      phone: leadPhone,
      status: "scheduled",
    });

    if (error) {
      toast({ title: "Error", description: "Failed to schedule visit.", variant: "destructive" });
      setSaving(false);
      return;
    }

    // Update lead status to inspection_scheduled
    await supabase.from("leads").update({ status: "inspection_scheduled" }).eq("id", leadId);
    await supabase.from("lead_history").insert({
      lead_id: leadId,
      action: "visit_scheduled",
      new_value: visitDate,
    });
    await supabase.from("lead_history").insert({
      lead_id: leadId,
      action: "status_change",
      old_value: "new",
      new_value: "inspection_scheduled",
    });

    toast({ title: "✅ Visit Scheduled", description: `Site visit for ${leadName} on ${visitDate}` });
    setSaving(false);
    onScheduled();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4" onClick={onClose}>
      <div className="glass-card-premium rounded-2xl p-6 w-full max-w-md" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-foreground font-heading font-semibold text-base">Schedule Site Visit</h3>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-secondary/30 text-muted-foreground hover:text-foreground transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="mb-4 p-3 rounded-xl bg-secondary/15">
          <p className="text-foreground text-sm font-medium">{leadName}</p>
          <p className="text-muted-foreground text-xs">{leadPhone}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-muted-foreground text-xs mb-1.5 flex items-center gap-1.5">
              <Calendar className="w-3 h-3" /> Visit Date *
            </label>
            <input type="date" value={visitDate} onChange={(e) => setVisitDate(e.target.value)} required className="input-premium w-full text-sm" />
          </div>
          <div>
            <label className="text-muted-foreground text-xs mb-1.5 flex items-center gap-1.5">
              <Clock className="w-3 h-3" /> Visit Time
            </label>
            <input type="time" value={visitTime} onChange={(e) => setVisitTime(e.target.value)} className="input-premium w-full text-sm" />
          </div>
          <div>
            <label className="text-muted-foreground text-xs mb-1.5 flex items-center gap-1.5">
              <MapPin className="w-3 h-3" /> Location
            </label>
            <input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Site address" className="input-premium w-full text-sm" />
          </div>
          <div>
            <label className="text-muted-foreground text-xs mb-1.5 flex items-center gap-1.5">
              <User className="w-3 h-3" /> Assigned Engineer
            </label>
            <input value={engineer} onChange={(e) => setEngineer(e.target.value)} placeholder="Engineer name" className="input-premium w-full text-sm" />
          </div>
          <div>
            <label className="text-muted-foreground text-xs mb-1.5 flex items-center gap-1.5">
              <FileText className="w-3 h-3" /> Notes
            </label>
            <textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Additional notes..." rows={3} className="input-premium w-full text-sm resize-none" />
          </div>

          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="flex-1 px-4 py-2.5 rounded-xl border border-border text-muted-foreground text-sm hover:bg-secondary/20 transition-colors">
              Cancel
            </button>
            <button type="submit" disabled={saving || !visitDate} className="flex-1 bg-gradient-to-r from-primary to-gold-light text-primary-foreground px-4 py-2.5 rounded-xl font-semibold text-sm hover:shadow-[0_0_20px_hsl(43_66%_52%/0.3)] transition-all disabled:opacity-50">
              {saving ? "Scheduling..." : "Schedule Visit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ScheduleVisitModal;
