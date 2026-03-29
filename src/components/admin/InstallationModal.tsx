import { useEffect, useMemo, useState } from "react";
import { X, Calendar as CalendarIcon, CheckCircle2, Star, IndianRupee } from "lucide-react";
import type { Tables } from "@/integrations/supabase/types";

export type InstallationPayload = {
  completionDate: string;
  projectValue?: number | null;
  warrantyStatus?: string;
  finalNotes?: string;
  clientSatisfaction: number;
};

interface InstallationModalProps {
  lead: Tables<"leads"> | null;
  onSubmit: (payload: InstallationPayload) => void;
  onClose: () => void;
}

const InstallationModal = ({ lead, onSubmit, onClose }: InstallationModalProps) => {
  const today = useMemo(() => new Date().toISOString().split("T")[0], []);
  const [completionDate, setCompletionDate] = useState(today);
  const [projectValue, setProjectValue] = useState<string>("");
  const [warrantyStatus, setWarrantyStatus] = useState("");
  const [finalNotes, setFinalNotes] = useState("");
  const [clientSatisfaction, setClientSatisfaction] = useState(5);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (lead) {
      setCompletionDate(lead.completion_date ? lead.completion_date.substring(0, 10) : today);
      setProjectValue(lead.project_value ? lead.project_value.toString() : "");
      setWarrantyStatus(lead.warranty_status || "");
      setFinalNotes(lead.final_notes || "");
      setClientSatisfaction(lead.client_satisfaction || 5);
    }
  }, [lead, today]);

  if (!lead) return null;

  const handleSave = () => {
    setSaving(true);
    onSubmit({
      completionDate,
      projectValue: projectValue ? Number(projectValue) : null,
      warrantyStatus,
      finalNotes,
      clientSatisfaction,
    });
    setSaving(false);
  };

  return (
    <div className="fixed inset-0 z-[90] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4" onClick={onClose}>
      <div className="glass-card-premium rounded-2xl border border-emerald-400/25 w-full max-w-xl p-6 relative" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute right-4 top-4 p-2 rounded-lg hover:bg-secondary/30 text-muted-foreground hover:text-foreground transition-colors">
          <X className="w-4 h-4" />
        </button>
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-2xl bg-emerald-500/15 text-emerald-300 flex items-center justify-center">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[11px] text-emerald-200 uppercase tracking-[0.25em]">Mark Installation Complete</p>
            <p className="text-lg font-heading font-semibold text-foreground">Move to Installed</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-3">
            <div>
              <p className="text-[11px] text-muted-foreground mb-1">Completion Date</p>
              <div className="input-premium flex items-center gap-2">
                <CalendarIcon className="w-4 h-4 text-emerald-300" />
                <input type="date" value={completionDate} onChange={(e) => setCompletionDate(e.target.value)} className="bg-transparent outline-none text-sm flex-1" />
              </div>
            </div>
            <div>
              <p className="text-[11px] text-muted-foreground mb-1">Project Value</p>
              <div className="input-premium flex items-center gap-2">
                <IndianRupee className="w-4 h-4 text-emerald-300" />
                <input
                  type="number"
                  value={projectValue}
                  onChange={(e) => setProjectValue(e.target.value)}
                  placeholder="₹"
                  className="bg-transparent outline-none text-sm flex-1"
                />
              </div>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-3">
            <div>
              <p className="text-[11px] text-muted-foreground mb-1">Warranty Status (optional)</p>
              <div className="input-premium">
                <input
                  value={warrantyStatus}
                  onChange={(e) => setWarrantyStatus(e.target.value)}
                  placeholder="e.g. Pending handover docs"
                  className="bg-transparent outline-none text-sm w-full px-3 py-2"
                />
              </div>
            </div>
            <div>
              <p className="text-[11px] text-muted-foreground mb-1">Client Satisfaction</p>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((num) => (
                  <button
                    key={num}
                    onClick={() => setClientSatisfaction(num)}
                    className={`p-2 rounded-lg transition-all ${clientSatisfaction >= num ? "text-amber-300" : "text-muted-foreground"} hover:scale-110`}
                    aria-label={`Rate ${num} star${num > 1 ? "s" : ""}`}
                  >
                    <Star className="w-4 h-4 fill-current" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div>
            <p className="text-[11px] text-muted-foreground mb-1">Final Notes</p>
            <div className="input-premium p-0">
              <textarea
                value={finalNotes}
                onChange={(e) => setFinalNotes(e.target.value)}
                rows={3}
                placeholder="Testing/commissioning notes, handover remarks..."
                className="w-full bg-transparent px-4 py-3 text-sm resize-none outline-none"
              />
            </div>
          </div>

          <div className="flex gap-2 justify-end pt-2">
            <button onClick={onClose} className="px-4 py-2 rounded-xl border border-border/50 text-muted-foreground text-sm hover:bg-secondary/20">Cancel</button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-400 text-slate-900 text-sm font-semibold flex items-center gap-1 shadow-[0_10px_40px_rgba(16,185,129,0.35)] hover:shadow-[0_12px_50px_rgba(16,185,129,0.45)] transition-all disabled:opacity-50"
            >
              {saving ? "Saving..." : "Mark Installed"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstallationModal;
