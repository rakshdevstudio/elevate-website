import { useEffect, useMemo, useState } from "react";
import { X, Calendar as CalendarIcon, Wrench, ClipboardList, Hammer } from "lucide-react";
import type { Tables } from "@/integrations/supabase/types";

export type ExecutionPayload = {
  startDate: string;
  engineer?: string;
  installationStatus: "pending" | "in_progress" | "near_completion";
  notes?: string;
};

interface ExecutionModalProps {
  lead: Tables<"leads"> | null;
  onSubmit: (payload: ExecutionPayload) => void;
  onClose: () => void;
}

const statusOptions: { id: ExecutionPayload["installationStatus"]; label: string; hint: string }[] = [
  { id: "pending", label: "Pending", hint: "Waiting to mobilize" },
  { id: "in_progress", label: "In Progress", hint: "Teams on-site" },
  { id: "near_completion", label: "Near Completion", hint: "Finishing touches" },
];

const ExecutionModal = ({ lead, onSubmit, onClose }: ExecutionModalProps) => {
  const today = useMemo(() => new Date().toISOString().split("T")[0], []);
  const [startDate, setStartDate] = useState(today);
  const [engineer, setEngineer] = useState("");
  const [installationStatus, setInstallationStatus] = useState<ExecutionPayload["installationStatus"]>("in_progress");
  const [notes, setNotes] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (lead) {
      setStartDate(lead.execution_start_date ? lead.execution_start_date.substring(0, 10) : today);
      setEngineer(lead.execution_engineer || lead.assigned_to || "");
      setInstallationStatus((lead.installation_status as ExecutionPayload["installationStatus"]) || "in_progress");
      setNotes(lead.execution_notes || "");
    }
  }, [lead, today]);

  if (!lead) return null;

  const handleSave = () => {
    setSaving(true);
    onSubmit({ startDate, engineer, installationStatus, notes });
    setSaving(false);
  };

  return (
    <div className="fixed inset-0 z-[90] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4" onClick={onClose}>
      <div className="glass-card-premium rounded-2xl border border-amber-400/20 w-full max-w-xl p-6 relative" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute right-4 top-4 p-2 rounded-lg hover:bg-secondary/30 text-muted-foreground hover:text-foreground transition-colors">
          <X className="w-4 h-4" />
        </button>
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-2xl bg-amber-500/15 text-amber-300 flex items-center justify-center">
            <Wrench className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[11px] text-amber-200 uppercase tracking-[0.25em]">Start Project Execution</p>
            <p className="text-lg font-heading font-semibold text-foreground">Move to Execution (WIP)</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-3">
            <div>
              <p className="text-[11px] text-muted-foreground mb-1">Start Date</p>
              <div className="input-premium flex items-center gap-2">
                <CalendarIcon className="w-4 h-4 text-amber-300" />
                <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="bg-transparent outline-none text-sm flex-1" />
              </div>
            </div>
            <div>
              <p className="text-[11px] text-muted-foreground mb-1">Assigned Engineer</p>
              <div className="input-premium flex items-center gap-2">
                <Hammer className="w-4 h-4 text-amber-300" />
                <input
                  value={engineer}
                  onChange={(e) => setEngineer(e.target.value)}
                  placeholder="Who owns this install?"
                  className="bg-transparent outline-none text-sm flex-1"
                />
              </div>
            </div>
          </div>

          <div>
            <p className="text-[11px] text-muted-foreground mb-1">Installation Status</p>
            <div className="grid grid-cols-3 gap-2">
              {statusOptions.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setInstallationStatus(opt.id)}
                  className={`rounded-xl px-3 py-2 border text-left ${installationStatus === opt.id ? "border-amber-400/60 bg-amber-500/10 text-amber-100 shadow-[0_8px_20px_rgba(234,179,8,0.25)]" : "border-border/50 text-muted-foreground"}`}
                >
                  <p className="text-sm font-semibold flex items-center gap-1">
                    <ClipboardList className="w-3.5 h-3.5" /> {opt.label}
                  </p>
                  <p className="text-[10px] text-muted-foreground">{opt.hint}</p>
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-[11px] text-muted-foreground mb-1">Notes</p>
            <div className="input-premium p-0">
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
                placeholder="Materials assigned, site readiness, safety notes..."
                className="w-full bg-transparent px-4 py-3 text-sm resize-none outline-none"
              />
            </div>
          </div>

          <div className="flex gap-2 justify-end pt-2">
            <button onClick={onClose} className="px-4 py-2 rounded-xl border border-border/50 text-muted-foreground text-sm hover:bg-secondary/20">Cancel</button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 text-slate-900 text-sm font-semibold flex items-center gap-1 shadow-[0_10px_40px_rgba(234,179,8,0.35)] hover:shadow-[0_12px_50px_rgba(234,179,8,0.45)] transition-all disabled:opacity-50"
            >
              {saving ? "Saving..." : "Start Execution"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExecutionModal;
