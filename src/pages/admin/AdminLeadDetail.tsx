import { useEffect, useState, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft, Phone, Mail, Building2, Layers, Box, MessageSquare, Calendar, Clock, Send,
  ChevronDown, Star, User, History, MapPin, Download,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import type { Tables, Enums } from "@/integrations/supabase/types";
import { statusColors, statusLabels, allStatuses, calculateLeadScore, getScoreColor, getScoreBg } from "@/lib/lead-utils";

const AdminLeadDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const [lead, setLead] = useState<Tables<"leads"> | null>(null);
  const [notes, setNotes] = useState<Tables<"lead_notes">[]>([]);
  const [history, setHistory] = useState<Tables<"lead_history">[]>([]);
  const [siteVisits, setSiteVisits] = useState<Tables<"site_visits">[]>([]);
  const [newNote, setNewNote] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [assignedTo, setAssignedTo] = useState("");
  const [estimatedValue, setEstimatedValue] = useState("");
  const [activeTab, setActiveTab] = useState<"notes" | "timeline" | "visits">("notes");

  // Schedule visit state
  const [visitDate, setVisitDate] = useState("");
  const [visitTime, setVisitTime] = useState("");
  const [visitEngineer, setVisitEngineer] = useState("");
  const [visitAddress, setVisitAddress] = useState("");

  useEffect(() => {
    const fetchAll = async () => {
      if (!id) return;
      const [leadRes, notesRes, historyRes, visitsRes] = await Promise.all([
        supabase.from("leads").select("*").eq("id", id).single(),
        supabase.from("lead_notes").select("*").eq("lead_id", id).order("created_at", { ascending: false }),
        supabase.from("lead_history").select("*").eq("lead_id", id).order("created_at", { ascending: false }),
        supabase.from("site_visits").select("*").eq("lead_id", id).order("scheduled_date", { ascending: false }),
      ]);
      setLead(leadRes.data);
      setNotes(notesRes.data || []);
      setHistory(historyRes.data || []);
      setSiteVisits(visitsRes.data || []);
      if (leadRes.data) {
        setAssignedTo(leadRes.data.assigned_to || "");
        setEstimatedValue(leadRes.data.estimated_value?.toString() || "");
      }
      setLoading(false);
    };
    fetchAll();
  }, [id]);

  const score = useMemo(() => lead ? calculateLeadScore(lead) : 0, [lead]);

  const updateStatus = async (status: Enums<"lead_status">) => {
    if (!id || !lead) return;
    const oldStatus = lead.status;
    await supabase.from("leads").update({ status }).eq("id", id);
    await supabase.from("lead_history").insert({ lead_id: id, action: "status_change", old_value: oldStatus, new_value: status });
    setLead((prev) => prev ? { ...prev, status } : null);
    setHistory((prev) => [{ id: crypto.randomUUID(), lead_id: id, user_id: user?.id || null, action: "status_change", old_value: oldStatus, new_value: status, created_at: new Date().toISOString() }, ...prev]);
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
        <Link to="/admin/leads" className="text-primary text-sm mt-2 inline-block">← Back to leads</Link>
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
  ].filter((i) => i.value);

  const historyIcons: Record<string, string> = {
    status_change: "🔄",
    note_added: "📝",
    assigned: "👤",
    visit_scheduled: "📅",
  };

  return (
    <div className="space-y-6 max-w-5xl">
      <Link to="/admin/leads" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground text-sm transition-colors">
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
        <div className="grid sm:grid-cols-2 gap-3 mt-5">
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
        </div>

        {/* Quick actions */}
        <div className="flex flex-wrap gap-3 mt-5">
          <a href={`tel:${lead.phone}`} className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary/10 text-primary text-xs font-medium hover:bg-primary/20 transition-colors">
            <Phone className="w-3.5 h-3.5" /> Call
          </a>
          <a href={`https://wa.me/${lead.phone.replace(/\D/g, "")}?text=${encodeURIComponent(`Hi ${lead.name}, this is X Elevators. We received your inquiry about elevator installation. How can we help you?`)}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500/10 text-emerald-400 text-xs font-medium hover:bg-emerald-500/20 transition-colors">
            <MessageSquare className="w-3.5 h-3.5" /> WhatsApp
          </a>
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
