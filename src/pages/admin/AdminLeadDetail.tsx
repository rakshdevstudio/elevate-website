import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft, Phone, Mail, Building2, Layers, Elevator, MessageSquare, Calendar, Clock, Send, ChevronDown,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import type { Tables, Enums } from "@/integrations/supabase/types";

const statusColors: Record<string, string> = {
  new: "bg-blue-500/15 text-blue-400 border-blue-500/20",
  contacted: "bg-amber-500/15 text-amber-400 border-amber-500/20",
  inspection_scheduled: "bg-purple-500/15 text-purple-400 border-purple-500/20",
  quotation_sent: "bg-cyan-500/15 text-cyan-400 border-cyan-500/20",
  converted: "bg-emerald-500/15 text-emerald-400 border-emerald-500/20",
  lost: "bg-red-500/15 text-red-400 border-red-500/20",
};

const statusLabels: Record<string, string> = {
  new: "New",
  contacted: "Contacted",
  inspection_scheduled: "Inspection Scheduled",
  quotation_sent: "Quotation Sent",
  converted: "Converted",
  lost: "Lost",
};

const allStatuses: Enums<"lead_status">[] = ["new", "contacted", "inspection_scheduled", "quotation_sent", "converted", "lost"];

const AdminLeadDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const [lead, setLead] = useState<Tables<"leads"> | null>(null);
  const [notes, setNotes] = useState<Tables<"lead_notes">[]>([]);
  const [newNote, setNewNote] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      if (!id) return;
      const [leadRes, notesRes] = await Promise.all([
        supabase.from("leads").select("*").eq("id", id).single(),
        supabase.from("lead_notes").select("*").eq("lead_id", id).order("created_at", { ascending: false }),
      ]);
      setLead(leadRes.data);
      setNotes(notesRes.data || []);
      setLoading(false);
    };
    fetch();
  }, [id]);

  const updateStatus = async (status: Enums<"lead_status">) => {
    if (!id) return;
    await supabase.from("leads").update({ status }).eq("id", id);
    setLead((prev) => prev ? { ...prev, status } : null);
  };

  const addNote = async () => {
    if (!newNote.trim() || !id || !user) return;
    setSaving(true);
    const { data } = await supabase
      .from("lead_notes")
      .insert({ lead_id: id, user_id: user.id, note: newNote.trim() })
      .select()
      .single();
    if (data) setNotes((prev) => [data, ...prev]);
    setNewNote("");
    setSaving(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
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
    { icon: Elevator, label: "Elevator Type", value: lead.elevator_type },
    { icon: Building2, label: "Company", value: lead.company_name },
  ].filter((i) => i.value);

  return (
    <div className="space-y-6 max-w-4xl">
      <Link to="/admin/leads" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground text-sm transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to Leads
      </Link>

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

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
          <div className="mt-6 p-4 rounded-xl bg-secondary/15">
            <div className="flex items-center gap-2 mb-2">
              <MessageSquare className="w-4 h-4 text-primary" />
              <p className="text-muted-foreground text-[10px] uppercase tracking-wider">Message</p>
            </div>
            <p className="text-foreground text-sm leading-relaxed">{lead.message}</p>
          </div>
        )}

        {/* Quick actions */}
        <div className="flex flex-wrap gap-3 mt-6">
          <a href={`tel:${lead.phone}`} className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary/10 text-primary text-xs font-medium hover:bg-primary/20 transition-colors">
            <Phone className="w-3.5 h-3.5" /> Call
          </a>
          <a href={`https://wa.me/${lead.phone.replace(/\D/g, "")}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500/10 text-emerald-400 text-xs font-medium hover:bg-emerald-500/20 transition-colors">
            <MessageSquare className="w-3.5 h-3.5" /> WhatsApp
          </a>
          {lead.email && (
            <a href={`mailto:${lead.email}`} className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-500/10 text-blue-400 text-xs font-medium hover:bg-blue-500/20 transition-colors">
              <Mail className="w-3.5 h-3.5" /> Email
            </a>
          )}
        </div>
      </motion.div>

      {/* Notes */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card rounded-2xl p-6">
        <h3 className="text-foreground font-heading font-semibold text-sm mb-4">Notes</h3>

        <div className="flex gap-3 mb-6">
          <input
            type="text"
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addNote()}
            placeholder="Add a note..."
            className="input-premium flex-1"
          />
          <button
            onClick={addNote}
            disabled={saving || !newNote.trim()}
            className="bg-gradient-to-r from-primary to-gold-light text-primary-foreground px-5 py-3 rounded-xl font-semibold text-sm hover:shadow-[0_0_20px_hsl(43_66%_52%/0.3)] transition-all disabled:opacity-50"
          >
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
          {notes.length === 0 && (
            <p className="text-muted-foreground text-xs text-center py-6">No notes yet.</p>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLeadDetail;
