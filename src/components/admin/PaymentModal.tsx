import { useState } from "react";
import { X, CreditCard, Calendar as CalendarIcon, FileText } from "lucide-react";
import type { Tables } from "@/integrations/supabase/types";

type PaymentModalProps = {
  lead: Tables<"leads"> | null;
  onSubmit: (payload: { amount: number; paid_on: string; method: string; note: string }) => Promise<void>;
  onClose: () => void;
};

const methods = ["bank", "cash", "upi", "card"];

const PaymentModal = ({ lead, onSubmit, onClose }: PaymentModalProps) => {
  const today = new Date().toISOString().split("T")[0];
  const [amount, setAmount] = useState("");
  const [paidOn, setPaidOn] = useState(today);
  const [method, setMethod] = useState("bank");
  const [note, setNote] = useState("");
  const [saving, setSaving] = useState(false);

  if (!lead) return null;

  const handleSave = async () => {
    if (!amount) return;
    setSaving(true);
    await onSubmit({
      amount: Number(amount),
      paid_on: paidOn,
      method,
      note,
    });
    setSaving(false);
  };

  return (
    <div className="fixed inset-0 z-[90] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4" onClick={onClose}>
      <div className="glass-card-premium rounded-2xl border border-border/40 w-full max-w-md p-6 relative" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute right-4 top-4 p-2 rounded-lg hover:bg-secondary/30 text-muted-foreground hover:text-foreground transition-colors">
          <X className="w-4 h-4" />
        </button>
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-2xl bg-primary/15 text-primary flex items-center justify-center">
            <CreditCard className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[11px] text-muted-foreground uppercase tracking-[0.25em]">Collect Payment</p>
            <p className="text-lg font-heading font-semibold text-foreground">{lead.name}</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <p className="text-[11px] text-muted-foreground mb-1">Amount</p>
            <div className="input-premium flex items-center gap-2">
              <span className="text-muted-foreground text-sm font-semibold">₹</span>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="bg-transparent outline-none text-sm flex-1"
                placeholder="Enter amount"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <p className="text-[11px] text-muted-foreground mb-1">Paid On</p>
              <div className="input-premium flex items-center gap-2">
                <CalendarIcon className="w-4 h-4 text-primary" />
                <input type="date" value={paidOn} onChange={(e) => setPaidOn(e.target.value)} className="bg-transparent outline-none text-sm flex-1" />
              </div>
            </div>
            <div>
              <p className="text-[11px] text-muted-foreground mb-1">Method</p>
              <select value={method} onChange={(e) => setMethod(e.target.value)} className="input-premium text-sm w-full">
                {methods.map((m) => <option key={m} value={m} className="bg-card text-foreground">{m}</option>)}
              </select>
            </div>
          </div>

          <div>
            <p className="text-[11px] text-muted-foreground mb-1">Note</p>
            <div className="input-premium flex items-start gap-2">
              <FileText className="w-4 h-4 text-primary mt-2" />
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                rows={3}
                className="bg-transparent outline-none text-sm flex-1 resize-none py-2"
                placeholder="Add a short note (optional)"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button onClick={onClose} className="px-4 py-2 rounded-xl border border-border/50 text-muted-foreground text-sm hover:bg-secondary/20">Cancel</button>
            <button
              onClick={handleSave}
              disabled={saving || !amount}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-primary to-blue-500 text-white text-sm font-semibold flex items-center gap-1 shadow-[0_10px_40px_rgba(99,102,241,0.35)] hover:shadow-[0_12px_50px_rgba(99,102,241,0.45)] transition-all disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save Payment"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;
