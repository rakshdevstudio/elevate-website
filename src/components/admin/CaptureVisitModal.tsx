import { useMemo, useState } from "react";
import { X, MapPin, Calendar as CalendarIcon, ClipboardList, Sparkles, Flame, Zap, Snowflake, Send } from "lucide-react";
import type { Tables } from "@/integrations/supabase/types";

export type VisitCapturePayload = {
  visitType: "Site Visit" | "Office Meeting" | "Video Call";
  visitDate: string;
  notes: string;
  interestLevel: "High" | "Medium" | "Low";
  nextAction: "Send Quotation" | "Follow-up Call" | "Waiting for client";
  engineer?: string | null;
};

interface CaptureVisitModalProps {
  lead: Tables<"leads"> | null;
  onSubmit: (payload: VisitCapturePayload) => void;
  onClose: () => void;
}

const interestOptions = [
  { id: "High", label: "High", icon: Flame, desc: "Strong interest" },
  { id: "Medium", label: "Medium", icon: Zap, desc: "Some signals" },
  { id: "Low", label: "Low", icon: Snowflake, desc: "Needs nurture" },
] as const;

const nextActions: VisitCapturePayload["nextAction"][] = ["Send Quotation", "Follow-up Call", "Waiting for client"];

const CaptureVisitModal = ({ lead, onSubmit, onClose }: CaptureVisitModalProps) => {
  const [visitType, setVisitType] = useState<VisitCapturePayload["visitType"]>("Site Visit");
  const today = useMemo(() => new Date().toISOString().split("T")[0], []);
  const [visitDate, setVisitDate] = useState<string>(today);
  const [notes, setNotes] = useState("");
  const [interestLevel, setInterestLevel] = useState<VisitCapturePayload["interestLevel"]>("High");
  const [nextAction, setNextAction] = useState<VisitCapturePayload["nextAction"]>("Send Quotation");
  const [saving, setSaving] = useState(false);

  if (!lead) return null;

  const handleSave = () => {
    setSaving(true);
    onSubmit({
      visitType,
      visitDate,
      notes,
      interestLevel,
      nextAction,
      engineer: lead.assigned_to,
    });
    setSaving(false);
  };

  return (
    <div className="fixed inset-0 z-[80] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4" onClick={onClose}>
      <div className="glass-card-premium rounded-2xl border border-primary/20 w-full max-w-xl p-6 relative" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute right-4 top-4 p-2 rounded-lg hover:bg-secondary/30 text-muted-foreground hover:text-foreground transition-colors">
          <X className="w-4 h-4" />
        </button>
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-2xl bg-primary/15 text-primary flex items-center justify-center">
            <MapPin className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-[0.25em]">Capture Visit Details</p>
            <p className="text-lg font-heading font-semibold text-foreground">Visited / Meeting Done</p>
          </div>
          <Sparkles className="w-4 h-4 text-primary ml-auto" />
        </div>

        <div className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-3">
            <div>
              <p className="text-[11px] text-muted-foreground mb-1">Visit Type</p>
              <div className="grid grid-cols-3 gap-2">
                {(["Site Visit", "Office Meeting", "Video Call"] as VisitCapturePayload["visitType"][]).map((t) => (
                  <button
                    key={t}
                    onClick={() => setVisitType(t)}
                    className={`text-[11px] px-3 py-2 rounded-xl border ${visitType === t ? "border-primary/50 text-primary bg-primary/10" : "border-border/50 text-muted-foreground"}`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="text-[11px] text-muted-foreground mb-1">Visit Date</p>
              <div className="input-premium flex items-center gap-2">
                <CalendarIcon className="w-4 h-4 text-primary" />
                <input type="date" value={visitDate} onChange={(e) => setVisitDate(e.target.value)} className="bg-transparent outline-none text-sm flex-1" />
              </div>
            </div>
          </div>

          <div>
            <p className="text-[11px] text-muted-foreground mb-1">Interest Level</p>
            <div className="grid grid-cols-3 gap-2">
              {interestOptions.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setInterestLevel(opt.id)}
                  className={`rounded-xl px-3 py-2 border text-left ${interestLevel === opt.id ? "border-primary/50 bg-primary/10 text-primary" : "border-border/50 text-muted-foreground"}`}
                >
                  <div className="flex items-center gap-1">
                    <opt.icon className="w-3.5 h-3.5" />
                    <span className="text-sm font-semibold">{opt.label}</span>
                  </div>
                  <p className="text-[10px] text-muted-foreground">{opt.desc}</p>
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-[11px] text-muted-foreground mb-1">Next Action</p>
            <div className="grid grid-cols-3 gap-2">
              {nextActions.map((act) => (
                <button
                  key={act}
                  onClick={() => setNextAction(act)}
                  className={`rounded-xl px-3 py-2 border text-[11px] ${nextAction === act ? "border-primary/50 bg-primary/10 text-primary" : "border-border/50 text-muted-foreground"}`}
                >
                  {act}
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
                placeholder="What happened in the meeting?"
                className="w-full bg-transparent px-4 py-3 text-sm resize-none outline-none"
              />
            </div>
          </div>

          <div className="flex gap-2 justify-end pt-2">
            <button onClick={onClose} className="px-4 py-2 rounded-xl border border-border/50 text-muted-foreground text-sm hover:bg-secondary/20">Cancel</button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-500 to-blue-500 text-white text-sm font-semibold flex items-center gap-1 shadow-[0_10px_40px_rgba(99,102,241,0.35)] hover:shadow-[0_12px_50px_rgba(99,102,241,0.45)] transition-all disabled:opacity-50"
            >
              <Send className="w-4 h-4" /> {saving ? "Saving..." : "Save Visit"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaptureVisitModal;
