import { useEffect, useState, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft, Phone, Mail, Building2, Layers, Box, MessageSquare, Calendar, Clock, Send,
  ChevronDown, Star, User, History, MapPin, Download, IndianRupee, Wrench, CheckCircle2,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import type { Tables, Enums } from "@/integrations/supabase/types";
import { statusColors, statusLabels, allStatuses, calculateLeadScore, getScoreColor, getScoreBg } from "@/lib/lead-utils";
import PaymentModal from "@/components/admin/PaymentModal";
import { toast } from "@/hooks/use-toast";
import { adminRoute } from "@/lib/adminRoute";

const AdminLeadDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const [lead, setLead] = useState<Tables<"leads"> | null>(null);
  const [notes, setNotes] = useState<Tables<"lead_notes">[]>([]);
  const [history, setHistory] = useState<Tables<"lead_history">[]>([]);
  const [siteVisits, setSiteVisits] = useState<Tables<"site_visits">[]>([]);
  const [payments, setPayments] = useState<Tables<"payments">[]>([]);
  const [newNote, setNewNote] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [assignedTo, setAssignedTo] = useState("");
  const [estimatedValue, setEstimatedValue] = useState("");
  const [projectValue, setProjectValue] = useState("");
  const [dispatchDate, setDispatchDate] = useState("");
  const [materialsNotes, setMaterialsNotes] = useState("");
  const [logisticsPartner, setLogisticsPartner] = useState("");
  const [activeTab, setActiveTab] = useState<"notes" | "timeline" | "visits">("notes");
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);

  // Schedule visit state
  const [visitDate, setVisitDate] = useState("");
  const [visitTime, setVisitTime] = useState("");
  const [visitEngineer, setVisitEngineer] = useState("");
  const [visitAddress, setVisitAddress] = useState("");

  useEffect(() => {
    const fetchAll = async () => {
      if (!id) return;
      const [leadRes, notesRes, historyRes, visitsRes, paymentsRes] = await Promise.all([
        supabase.from("leads").select("*").eq("id", id).single(),
        supabase.from("lead_notes").select("*").eq("lead_id", id).order("created_at", { ascending: false }),
        supabase.from("lead_history").select("*").eq("lead_id", id).order("created_at", { ascending: false }),
        supabase.from("site_visits").select("*").eq("lead_id", id).order("scheduled_date", { ascending: false }),
        supabase.from("payments").select("*").eq("lead_id", id).order("paid_on", { ascending: false }),
      ]);
      setLead(leadRes.data);
      setNotes(notesRes.data || []);
      setHistory(historyRes.data || []);
      setSiteVisits(visitsRes.data || []);
      setPayments(paymentsRes.data || []);
      if (leadRes.data) {
        setAssignedTo(leadRes.data.assigned_to || "");
        setEstimatedValue(leadRes.data.estimated_value?.toString() || "");
        setProjectValue(leadRes.data.project_value?.toString() || "");
        setDispatchDate(leadRes.data.material_dispatch_date ? leadRes.data.material_dispatch_date.split("T")[0] : "");
        setMaterialsNotes(leadRes.data.materials_notes || "");
        setLogisticsPartner(leadRes.data.logistics_partner || "");
      }
      setLoading(false);
    };
    fetchAll();
  }, [id]);

  const score = useMemo(() => lead ? calculateLeadScore(lead) : 0, [lead]);
  const totalValue = lead?.project_value || 0;
  const collectedAmount = useMemo(() => payments.reduce((sum, p) => sum + (p.amount || 0), 0), [payments]);
  const paymentProgress = totalValue ? Math.min(Math.round((collectedAmount / totalValue) * 100), 100) : 0;
  const dueAmount = totalValue ? Math.max(totalValue - collectedAmount, 0) : 0;
  const paymentActiveStatuses: Enums<"lead_status">[] = ["converted", "material_dispatched", "execution_wip", "installed", "handover"];
  const paymentsVisible = lead ? paymentActiveStatuses.includes(lead.status) : false;

  const updateStatus = async (status: Enums<"lead_status">) => {
    if (!id || !lead) return;
    if (status === "handover") {
      if (!totalValue) {
        toast({ title: "Project value missing", description: "Add project value before handover.", variant: "destructive" });
        return;
      }
      if (dueAmount > 0) {
        toast({ title: "Cannot complete handover", description: `₹${dueAmount.toLocaleString("en-IN")} still pending.`, variant: "destructive" });
        return;
      }
    }
    const oldStatus = lead.status;
    await supabase.from("leads").update({ status }).eq("id", id);
    await supabase.from("lead_history").insert({ lead_id: id, action: "status_change", old_value: oldStatus, new_value: status });
    setLead((prev) => prev ? { ...prev, status } : null);
    setHistory((prev) => [{ id: crypto.randomUUID(), lead_id: id, user_id: user?.id || null, action: "status_change", old_value: oldStatus, new_value: status, created_at: new Date().toISOString() }, ...prev]);
    if (status === "handover") {
      toast({ title: "Project successfully handed over." });
    }
  };

  const updateAssignment = async () => {
    if (!id) return;
    await supabase.from("leads").update({ assigned_to: assignedTo || null }).eq("id", id);
    await supabase.from("lead_history").insert({ lead_id: id, action: "assigned", new_value: assignedTo || "Unassigned" });
    setHistory((prev) => [{ id: crypto.randomUUID(), lead_id: id, user_id: user?.id || null, action: "assigned", old_value: null, new_value: assignedTo || "Unassigned", created_at: new Date().toISOString() }, ...prev]);
  };

  const updateValue = async () => {
    if (!id) return;
    const val = parseFloat(estimatedValue) || null;
    await supabase.from("leads").update({ estimated_value: val }).eq("id", id);
    setLead((prev) => prev ? { ...prev, estimated_value: val } : null);
  };

  const updateProjectVal = async () => {
    if (!id) return;
    const val = parseFloat(projectValue) || null;
    await supabase.from("leads").update({ project_value: val }).eq("id", id);
    setLead((prev) => prev ? { ...prev, project_value: val } : null);
    if (val) toast({ title: "Project value saved", description: `₹${val.toLocaleString("en-IN")}` });
  };

  const saveDispatch = async () => {
    if (!id || !lead) return;
    const payload = {
      material_dispatch_date: dispatchDate || null,
      materials_notes: materialsNotes || null,
      logistics_partner: logisticsPartner || null,
      status: lead.status === "converted" ? "material_dispatched" as Enums<"lead_status"> : lead.status,
    };
    await supabase.from("leads").update(payload).eq("id", id);
    await supabase.from("lead_history").insert({
      lead_id: id,
      action: "material_dispatched",
      new_value: JSON.stringify(payload),
    });
    setLead((prev) => prev ? { ...prev, ...payload } : null);
    toast({ title: "Material dispatched", description: "Dispatch details saved." });
  };

  const addNote = async () => {
    if (!newNote.trim() || !id || !user) return;
    setSaving(true);
    const { data } = await supabase.from("lead_notes").insert({ lead_id: id, user_id: user.id, note: newNote.trim() }).select().single();
    if (data) setNotes((prev) => [data, ...prev]);
    await supabase.from("lead_history").insert({ lead_id: id, action: "note_added", new_value: newNote.trim().substring(0, 50) });
    setNewNote("");
    setSaving(false);
  };

  const scheduleVisit = async () => {
    if (!visitDate || !id || !lead) return;
    const { data } = await supabase.from("site_visits").insert({
      lead_id: id, scheduled_date: visitDate, scheduled_time: visitTime, engineer_name: visitEngineer, address: visitAddress,
      customer_name: lead.name, phone: lead.phone,
    }).select().single();
    if (data) setSiteVisits((prev) => [data, ...prev]);
    await supabase.from("lead_history").insert({ lead_id: id, action: "visit_scheduled", new_value: visitDate });
    // Auto-update lead status to inspection_scheduled
    await supabase.from("leads").update({ status: "inspection_scheduled" }).eq("id", id);
    await supabase.from("lead_history").insert({ lead_id: id, action: "status_change", old_value: lead.status, new_value: "inspection_scheduled" });
    setLead((prev) => prev ? { ...prev, status: "inspection_scheduled" } : null);
    setVisitDate(""); setVisitTime(""); setVisitEngineer(""); setVisitAddress("");
  };

  if (loading) {
    return <div className="flex items-center justify-center h-64"><div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" /></div>;
  }

  if (!lead) {
    return (
      <div className="text-center py-16">
        <p className="text-muted-foreground">Lead not found.</p>
        <Link to={adminRoute("leads")} className="text-primary text-sm mt-2 inline-block">← Back to leads</Link>
      </div>
    );
  }

  const infoItems = [
    { icon: Phone, label: "Phone", value: lead.phone },
    { icon: Mail, label: "Email", value: lead.email },
    { icon: Building2, label: "Building Type", value: lead.building_type },
    { icon: Layers, label: "Floors", value: lead.number_of_floors },
    { icon: Box, label: "Elevator Type", value: lead.elevator_type },
    { icon: Building2, label: "Company", value: lead.company_name },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    { icon: IndianRupee, label: "Budget Range", value: (lead as any).budget_range ? `₹${(lead as any).budget_range} Lakhs` : null },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    { icon: MapPin, label: "Address", value: (lead as any).address },
  ].filter((i) => i.value);

  const historyIcons: Record<string, string> = {
    status_change: "🔄",
    note_added: "📝",
    assigned: "👤",
    visit_scheduled: "📅",
    visit_completed: "✅",
    material_dispatched: "🚚",
  };

  return (
    <div className="space-y-6 max-w-5xl">
      <Link to={adminRoute("leads")} className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground text-sm transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to Leads
      </Link>

      {/* Header card */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass-card-premium rounded-2xl p-6 lg:p-8">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center text-primary text-xl font-bold">
              {lead.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <h2 className="text-xl font-heading font-bold text-foreground">{lead.name}</h2>
              <div className="flex items-center gap-2 text-muted-foreground text-xs mt-1">
                <Calendar className="w-3 h-3" />
                {new Date(lead.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
                <Clock className="w-3 h-3 ml-2" />
                {new Date(lead.created_at).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Lead score badge */}
            <div className={`px-3 py-1.5 rounded-full border text-xs font-bold ${getScoreBg(score)} ${getScoreColor(score)}`}>
              <Star className="w-3 h-3 inline mr-1" />{score}/100
            </div>
            {/* Status selector */}
            <div className="relative">
              <select
                value={lead.status}
                onChange={(e) => updateStatus(e.target.value as Enums<"lead_status">)}
                className={`text-xs font-medium px-4 py-2 rounded-full border appearance-none cursor-pointer pr-8 ${statusColors[lead.status]}`}
                style={{ background: "transparent" }}
              >
                {allStatuses.map((s) => (
                  <option key={s} value={s} className="bg-card text-foreground">{statusLabels[s]}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3 h-3 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Info grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {infoItems.map((item) => (
            <div key={item.label} className="flex items-center gap-3 p-3 rounded-xl bg-secondary/15">
              <item.icon className="w-4 h-4 text-primary shrink-0" />
              <div>
                <p className="text-muted-foreground text-[10px] uppercase tracking-wider">{item.label}</p>
                <p className="text-foreground text-sm">{item.value}</p>
              </div>
            </div>
          ))}
        </div>

        {lead.message && (
          <div className="mt-5 p-4 rounded-xl bg-secondary/15">
            <div className="flex items-center gap-2 mb-2">
              <MessageSquare className="w-4 h-4 text-primary" />
              <p className="text-muted-foreground text-[10px] uppercase tracking-wider">Message</p>
            </div>
            <p className="text-foreground text-sm leading-relaxed">{lead.message}</p>
          </div>
        )}

        {/* Assignment & value */}
        <div className="grid sm:grid-cols-3 gap-3 mt-5">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-primary shrink-0" />
            <input
              value={assignedTo}
              onChange={(e) => setAssignedTo(e.target.value)}
              onBlur={updateAssignment}
              placeholder="Assign to engineer..."
              className="input-premium flex-1 text-xs py-2"
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-primary text-sm font-bold shrink-0">₹</span>
            <input
              value={estimatedValue}
              onChange={(e) => setEstimatedValue(e.target.value)}
              onBlur={updateValue}
              type="number"
              placeholder="Estimated value..."
              className="input-premium flex-1 text-xs py-2"
            />
          </div>
          {paymentActiveStatuses.includes(lead.status) && (
            <div className="flex items-center gap-2">
              <span className="text-emerald-400 text-sm font-bold shrink-0">₹</span>
              <input
                value={projectValue}
                onChange={(e) => setProjectValue(e.target.value)}
                onBlur={updateProjectVal}
                type="number"
                placeholder="Project value (required for payments)"
                className="input-premium flex-1 text-xs py-2"
              />
            </div>
          )}
        </div>

        {(lead.execution_start_date || lead.status === "execution_wip" || lead.status === "installed") && (
          <div className="grid sm:grid-cols-2 gap-3 mt-5">
            <div className="p-4 rounded-xl border border-amber-400/30 bg-amber-500/5">
              <div className="flex items-center gap-2 mb-2">
                <Wrench className="w-4 h-4 text-amber-300" />
                <p className="text-sm font-semibold text-foreground">Execution (WIP)</p>
              </div>
              <p className="text-[11px] text-muted-foreground">Start: <span className="text-foreground font-semibold">{lead.execution_start_date ? new Date(lead.execution_start_date).toLocaleDateString("en-IN", { day: "numeric", month: "short" }) : "Not set"}</span></p>
              <p className="text-[11px] text-muted-foreground">Engineer: <span className="text-foreground font-semibold">{lead.execution_engineer || lead.assigned_to || "Unassigned"}</span></p>
              <p className="text-[11px] text-muted-foreground">Install Status: <span className="text-foreground font-semibold">{lead.installation_status?.replace(/_/g, " ") || "Pending"}</span></p>
              {lead.execution_notes && <p className="text-[11px] text-muted-foreground mt-2">Notes: <span className="text-foreground">{lead.execution_notes}</span></p>}
            </div>
            {lead.status === "installed" && (
              <div className="p-4 rounded-xl border border-emerald-400/30 bg-emerald-500/5">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                  <p className="text-sm font-semibold text-foreground">Installed</p>
                </div>
                <p className="text-[11px] text-muted-foreground">Completion: <span className="text-foreground font-semibold">{lead.completion_date ? new Date(lead.completion_date).toLocaleDateString("en-IN", { day: "numeric", month: "short" }) : "Pending"}</span></p>
                <p className="text-[11px] text-muted-foreground">Project Value: <span className="text-foreground font-semibold">{lead.project_value ? `₹${(lead.project_value / 100000).toFixed(1)}L` : "N/A"}</span></p>
                {lead.warranty_status && <p className="text-[11px] text-muted-foreground">Warranty: <span className="text-foreground font-semibold">{lead.warranty_status}</span></p>}
                {lead.client_satisfaction && <p className="text-[11px] text-muted-foreground">Client Satisfaction: <span className="text-foreground font-semibold">{Array.from({ length: lead.client_satisfaction }).map(() => "⭐").join("")}</span></p>}
                {lead.final_notes && <p className="text-[11px] text-muted-foreground mt-2">Notes: <span className="text-foreground">{lead.final_notes}</span></p>}
              </div>
            )}
          </div>
        )}

        {paymentActiveStatuses.includes(lead.status) && (
          <div className="mt-6 p-4 rounded-2xl border border-border/40 glass-card space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-[11px] px-2 py-1 rounded-full bg-teal-500/15 text-teal-100 border border-teal-400/30">Material Dispatched</span>
              {lead.material_dispatch_date && <span className="text-[11px] text-muted-foreground">on {new Date(lead.material_dispatch_date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</span>}
            </div>
            <div className="grid sm:grid-cols-3 gap-3">
              <div>
                <p className="text-[11px] text-muted-foreground mb-1">Dispatch Date</p>
                <input type="date" value={dispatchDate} onChange={(e) => setDispatchDate(e.target.value)} className="input-premium text-xs w-full" />
              </div>
              <div>
                <p className="text-[11px] text-muted-foreground mb-1">Logistics Partner</p>
                <input value={logisticsPartner} onChange={(e) => setLogisticsPartner(e.target.value)} placeholder="BlueDart / Delhivery" className="input-premium text-xs w-full" />
              </div>
              <div>
                <p className="text-[11px] text-muted-foreground mb-1">Notes</p>
                <input value={materialsNotes} onChange={(e) => setMaterialsNotes(e.target.value)} placeholder="Tracking, materials list..." className="input-premium text-xs w-full" />
              </div>
            </div>
            <div className="flex justify-end">
              <button onClick={saveDispatch} className="px-4 py-2 rounded-xl bg-teal-500/15 text-teal-100 text-xs font-semibold border border-teal-400/30 hover:bg-teal-500/25 transition-colors">
                Save dispatch info
              </button>
            </div>
          </div>
        )}

        {/* Payments timeline */}
        {paymentsVisible && (
          <div className="mt-6 glass-card rounded-2xl p-4 border border-border/40">
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="text-[11px] text-muted-foreground uppercase tracking-[0.2em]">Project Financials</p>
                <h4 className="text-foreground font-heading font-semibold text-lg">Finance + Operations Lock</h4>
              </div>
              <span className={`text-[11px] px-3 py-1 rounded-full border ${
                totalValue === 0
                  ? "bg-amber-500/10 text-amber-200 border-amber-400/40"
                  : dueAmount === 0
                    ? "bg-emerald-500/15 text-emerald-100 border-emerald-400/30"
                    : "bg-red-500/10 text-red-200 border-red-400/30"
              }`}>
                {totalValue === 0 ? "Set project value" : dueAmount === 0 ? "Fully Paid ✅" : `Pending ₹${dueAmount.toLocaleString("en-IN")}`}
              </span>
            </div>
            {/* Summary cards */}
            <div className="grid sm:grid-cols-3 gap-3 mb-4">
              <div className="p-3 rounded-xl bg-secondary/10 border border-border/30">
                <p className="text-[11px] text-muted-foreground mb-1">Total Value</p>
                <p className="text-lg font-heading font-bold text-foreground">₹{(totalValue || 0).toLocaleString("en-IN")}</p>
              </div>
              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-400/30">
                <p className="text-[11px] text-emerald-200 mb-1">Collected</p>
                <p className="text-lg font-heading font-bold text-emerald-100">₹{collectedAmount.toLocaleString("en-IN")}</p>
              </div>
              <div className={`p-3 rounded-xl border ${dueAmount > 0 ? "bg-red-500/10 border-red-400/40" : "bg-emerald-500/10 border-emerald-400/30"}`}>
                <p className="text-[11px] text-muted-foreground mb-1">Due</p>
                <p className={`text-lg font-heading font-bold ${dueAmount > 0 ? "text-red-200" : "text-emerald-100"}`}>
                  ₹{dueAmount.toLocaleString("en-IN")} {dueAmount === 0 && "✅"}
                </p>
              </div>
            </div>

            {totalValue > 0 && (
              <div className="w-full bg-border/30 rounded-full h-2 mb-3 overflow-hidden">
                <div className="h-2 bg-gradient-to-r from-emerald-500 to-emerald-400" style={{ width: `${paymentProgress}%` }} />
              </div>
            )}

            <div className="flex items-center justify-between mb-3">
              <h4 className="text-foreground font-heading font-semibold text-sm">Payments Timeline</h4>
              {dueAmount > 0 ? (
                <span className="text-[11px] px-2 py-1 rounded-full bg-red-500/15 text-red-100 border border-red-400/30">Due ₹{dueAmount.toLocaleString("en-IN")}</span>
              ) : (
                <span className="text-[11px] px-2 py-1 rounded-full bg-emerald-500/15 text-emerald-100 border border-emerald-400/30">Fully Paid ✅</span>
              )}
            </div>

            <div className="space-y-3">
              {(Array.isArray(lead.payment_terms) ? lead.payment_terms : []).map((term: any, idx: number) => {
                const pct = term?.percentage || 0;
                const termAmount = totalValue ? Math.round((pct / 100) * totalValue) : 0;
                const done = collectedAmount >= termAmount;
                return (
                  <div key={idx} className="p-3 rounded-xl border border-border/30 bg-secondary/10 flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${done ? "bg-emerald-500/20 text-emerald-300" : "bg-amber-500/15 text-amber-200"}`}>
                      {pct}%
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-foreground font-semibold">{term?.label || "Milestone"}</p>
                      <p className="text-[11px] text-muted-foreground">₹{termAmount.toLocaleString("en-IN")} of ₹{totalValue.toLocaleString("en-IN")}</p>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {done ? <span className="text-emerald-400">Completed</span> : <span className="text-amber-300">Pending</span>}
                    </div>
                  </div>
                );
              })}

              {payments.length > 0 && (
                <div className="space-y-2">
                  {payments
                    .slice()
                    .sort((a, b) => new Date(b.paid_on).getTime() - new Date(a.paid_on).getTime())
                    .map((p) => (
                      <div key={p.id} className="p-3 rounded-lg bg-secondary/10 border border-border/30 flex items-center justify-between text-xs">
                        <div>
                          <p className="text-foreground font-semibold">₹{p.amount.toLocaleString("en-IN")}</p>
                          <p className="text-muted-foreground">{p.method || "payment"} · {new Date(p.paid_on).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}</p>
                          {p.note && <p className="text-muted-foreground/80 italic">{p.note}</p>}
                        </div>
                        <span className="text-muted-foreground">{new Date(p.created_at).toLocaleDateString("en-IN")}</span>
                      </div>
                    ))}
                </div>
              )}

              {payments.length === 0 && (
                <p className="text-muted-foreground text-xs text-center">No payments recorded yet.</p>
              )}

              <div className="flex flex-wrap gap-2 pt-2">
                <button
                  onClick={() => setPaymentModalOpen(true)}
                  disabled={!totalValue}
                  className="px-4 py-2 rounded-xl bg-primary/15 text-primary text-xs font-semibold hover:bg-primary/25 transition-colors disabled:opacity-50"
                >
                  Collect Payment
                </button>
                <button
                  onClick={() => {
                    const text = `Hi ${lead.name}, ₹${dueAmount.toLocaleString("en-IN")} is pending for your project. Please let us know when we can collect the payment.`;
                    window.open(`https://wa.me/${lead.phone.replace(/\D/g, "")}?text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer");
                  }}
                  className="px-4 py-2 rounded-xl bg-emerald-500/10 text-emerald-300 text-xs font-semibold hover:bg-emerald-500/20 transition-colors"
                >
                  WhatsApp Reminder
                </button>
                <button className="px-4 py-2 rounded-xl bg-secondary/20 text-muted-foreground text-xs font-semibold hover:bg-secondary/30 transition-colors">
                  Download Invoice
                </button>
              </div>
            </div>
          </div>
        )}

      <PaymentModal
        lead={paymentModalOpen ? lead : null}
        onClose={() => setPaymentModalOpen(false)}
        onSubmit={async (payload) => {
          if (!lead) return;
          const { data, error } = await supabase.from("payments").insert({
            lead_id: lead.id,
            amount: payload.amount,
            paid_on: payload.paid_on,
            method: payload.method,
            note: payload.note,
          }).select().single();
          if (!error && data) {
            setPayments((prev) => [data, ...prev]);
          }
          setPaymentModalOpen(false);
        }}
      />

      {/* Quick actions */}
      <div className="flex flex-wrap gap-3 mt-5">
        <a href={`tel:${lead.phone}`} className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary/10 text-primary text-xs font-medium hover:bg-primary/20 transition-colors">
          <Phone className="w-3.5 h-3.5" /> Call
        </a>
        <button
          onClick={() => window.open(`https://wa.me/${lead.phone.replace(/\D/g, "")}?text=${encodeURIComponent(`Hi ${lead.name}, this is X Elevators. We received your inquiry about elevator installation. How can we help you?`)}`, "_blank", "noopener,noreferrer")}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500/10 text-emerald-400 text-xs font-medium hover:bg-emerald-500/20 transition-colors"
        >
          <MessageSquare className="w-3.5 h-3.5" /> WhatsApp
        </button>
        {lead.email && (
          <a href={`mailto:${lead.email}`} className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-500/10 text-blue-400 text-xs font-medium hover:bg-blue-500/20 transition-colors">
            <Mail className="w-3.5 h-3.5" /> Email
          </a>
        )}
      </div>
      </motion.div>

      {/* Tabs */}
      <div className="flex gap-1 bg-secondary/10 p-1 rounded-xl w-fit">
        {(["notes", "timeline", "visits"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg text-xs font-medium transition-all ${
              activeTab === tab ? "bg-primary/15 text-primary" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab === "notes" ? "📝 Notes" : tab === "timeline" ? "🕐 Timeline" : "📅 Site Visits"}
          </button>
        ))}
      </div>

      {/* Notes tab */}
      {activeTab === "notes" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-card rounded-2xl p-6">
          <div className="flex gap-3 mb-6">
            <input
              type="text"
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addNote()}
              placeholder="Add a note..."
              className="input-premium flex-1"
            />
            <button onClick={addNote} disabled={saving || !newNote.trim()} className="bg-gradient-to-r from-primary to-gold-light text-primary-foreground px-5 py-3 rounded-xl font-semibold text-sm hover:shadow-[0_0_20px_hsl(43_66%_52%/0.3)] transition-all disabled:opacity-50">
              <Send className="w-4 h-4" />
            </button>
          </div>
          <div className="space-y-3">
            {notes.map((note) => (
              <div key={note.id} className="p-3 rounded-xl bg-secondary/15">
                <p className="text-foreground text-sm">{note.note}</p>
                <p className="text-muted-foreground text-[10px] mt-2">
                  {new Date(note.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })} at{" "}
                  {new Date(note.created_at).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}
                </p>
              </div>
            ))}
            {notes.length === 0 && <p className="text-muted-foreground text-xs text-center py-6">No notes yet.</p>}
          </div>
        </motion.div>
      )}

      {/* Timeline tab */}
      {activeTab === "timeline" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-card rounded-2xl p-6">
          <div className="space-y-0">
            {history.map((h, i) => (
              <div key={h.id} className="flex gap-3">
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center text-sm">
                    {historyIcons[h.action] || "📋"}
                  </div>
                  {i < history.length - 1 && <div className="w-px flex-1 bg-border/30 my-1" />}
                </div>
                <div className="pb-4 flex-1">
                  <p className="text-foreground text-xs font-medium">
                    {h.action === "status_change" && <>Status changed from <span className="text-muted-foreground">{statusLabels[h.old_value || ""] || h.old_value}</span> → <span className="text-primary">{statusLabels[h.new_value || ""] || h.new_value}</span></>}
                    {h.action === "note_added" && <>Note added: <span className="text-muted-foreground">"{h.new_value}"</span></>}
                    {h.action === "assigned" && <>Assigned to <span className="text-primary">{h.new_value}</span></>}
                    {h.action === "visit_scheduled" && <>Site visit scheduled for <span className="text-primary">{h.new_value}</span></>}
                    {h.action === "visit_completed" && (() => {
                      try {
                        const data = JSON.parse(h.new_value || "{}");
                        return (
                          <>Visited / Meeting Completed — <span className="text-primary">{data.visitType || "Visit"}</span> on <span className="text-primary">{data.visitDate}</span>{data.interestLevel ? ` · Interest: ${data.interestLevel}` : ""}{data.nextAction ? ` · Next: ${data.nextAction}` : ""}{data.notes ? ` · Notes: ${data.notes}` : ""}</>
                        );
                      } catch {
                        return <>Visited / Meeting Completed</>;
                      }
                    })()}
                    {h.action === "material_dispatched" && (() => {
                      let dateValue: string | null = null;
                      try {
                        const data = JSON.parse(h.new_value || "null");
                        dateValue = data?.material_dispatch_date || data;
                      } catch {
                        dateValue = h.new_value;
                      }
                      return <>Material dispatched {dateValue ? `on ${new Date(dateValue).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}` : ""}</>;
                    })()}
                  </p>
                  <p className="text-muted-foreground text-[10px] mt-0.5">
                    {new Date(h.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "short" })} · {new Date(h.created_at).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}
                  </p>
                </div>
              </div>
            ))}
            {history.length === 0 && <p className="text-muted-foreground text-xs text-center py-6">No activity yet.</p>}
          </div>
        </motion.div>
      )}

      {/* Site visits tab */}
      {activeTab === "visits" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-card rounded-2xl p-6">
          <h3 className="text-foreground font-heading font-semibold text-sm mb-4">Schedule Site Visit</h3>
          <div className="grid sm:grid-cols-2 gap-3 mb-6">
            <input type="date" value={visitDate} onChange={(e) => setVisitDate(e.target.value)} className="input-premium text-xs" />
            <input type="time" value={visitTime} onChange={(e) => setVisitTime(e.target.value)} className="input-premium text-xs" />
            <input value={visitEngineer} onChange={(e) => setVisitEngineer(e.target.value)} placeholder="Engineer name" className="input-premium text-xs" />
            <input value={visitAddress} onChange={(e) => setVisitAddress(e.target.value)} placeholder="Site address" className="input-premium text-xs" />
          </div>
          <button onClick={scheduleVisit} disabled={!visitDate} className="bg-gradient-to-r from-primary to-gold-light text-primary-foreground px-6 py-2.5 rounded-xl font-semibold text-xs hover:shadow-[0_0_20px_hsl(43_66%_52%/0.3)] transition-all disabled:opacity-50 mb-6">
            Schedule Visit
          </button>

          <div className="space-y-3">
            {siteVisits.map((visit) => (
              <div key={visit.id} className="p-4 rounded-xl bg-secondary/15 flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                  <Calendar className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <p className="text-foreground text-sm font-medium">
                    {new Date(visit.scheduled_date).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
                    {visit.scheduled_time && ` at ${visit.scheduled_time}`}
                  </p>
                  <div className="flex items-center gap-3 text-muted-foreground text-xs mt-0.5">
                    {visit.engineer_name && <span className="flex items-center gap-1"><User className="w-3 h-3" />{visit.engineer_name}</span>}
                    {visit.address && <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{visit.address}</span>}
                  </div>
                </div>
                <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full border ${
                  visit.status === "completed" ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/20"
                  : visit.status === "cancelled" ? "bg-red-500/15 text-red-400 border-red-500/20"
                  : "bg-blue-500/15 text-blue-400 border-blue-500/20"
                }`}>
                  {visit.status}
                </span>
              </div>
            ))}
            {siteVisits.length === 0 && <p className="text-muted-foreground text-xs text-center py-6">No site visits scheduled.</p>}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default AdminLeadDetail;
