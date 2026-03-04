import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, Filter, Phone, Mail, Building2, ArrowRight, ChevronDown, Download, MessageSquare, Star, CalendarPlus } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import type { Tables, Enums } from "@/integrations/supabase/types";
import { statusColors, statusLabels, allStatuses, calculateLeadScore, getScoreColor, sourceLabels } from "@/lib/lead-utils";
import ScheduleVisitModal from "@/components/admin/ScheduleVisitModal";

const AdminLeads = () => {
  const [leads, setLeads] = useState<Tables<"leads">[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [visitModal, setVisitModal] = useState<{ leadId: string; leadName: string; leadPhone: string } | null>(null);

  useEffect(() => {
    const fetchLeads = async () => {
      const { data } = await supabase.from("leads").select("*").order("created_at", { ascending: false });
      setLeads(data || []);
      setLoading(false);
    };
    fetchLeads();

    const channel = supabase
      .channel("leads-list")
      .on("postgres_changes", { event: "*", schema: "public", table: "leads" }, () => { fetchLeads(); })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, []);

  const filtered = leads.filter((lead) => {
    const matchesSearch = !search ||
      lead.name.toLowerCase().includes(search.toLowerCase()) ||
      lead.phone.includes(search) ||
      (lead.email && lead.email.toLowerCase().includes(search.toLowerCase())) ||
      (lead.building_type && lead.building_type.toLowerCase().includes(search.toLowerCase())) ||
      (lead.assigned_to && lead.assigned_to.toLowerCase().includes(search.toLowerCase()));
    const matchesStatus = statusFilter === "all" || lead.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const updateStatus = async (id: string, status: Enums<"lead_status">) => {
    const lead = leads.find((l) => l.id === id);
    await supabase.from("leads").update({ status }).eq("id", id);
    if (lead) {
      await supabase.from("lead_history").insert({ lead_id: id, action: "status_change", old_value: lead.status, new_value: status });
    }
    setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, status } : l)));
  };

  const exportCSV = () => {
    const headers = ["Name", "Phone", "Email", "Building Type", "Floors", "Elevator Type", "Status", "Source", "Assigned To", "Score", "Created"];
    const rows = filtered.map((l) => [
      l.name, l.phone, l.email || "", l.building_type || "", l.number_of_floors || "",
      l.elevator_type || "", statusLabels[l.status], l.lead_source.replace(/_/g, " "),
      l.assigned_to || "", calculateLeadScore(l).toString(),
      new Date(l.created_at).toLocaleDateString("en-IN"),
    ]);
    const csv = [headers, ...rows].map((r) => r.map((c) => `"${c}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `leads-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (loading) {
    return <div className="flex items-center justify-center h-64"><div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" /></div>;
  }

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search leads, engineers..." className="input-premium w-full pl-11" />
        </div>
        <div className="relative">
          <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="input-premium pl-11 pr-10 appearance-none cursor-pointer min-w-[180px]">
            <option value="all">All Statuses</option>
            {allStatuses.map((s) => (<option key={s} value={s}>{statusLabels[s]}</option>))}
          </select>
          <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
        </div>
        <button onClick={exportCSV} className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-primary/10 text-primary text-xs font-medium hover:bg-primary/20 transition-colors whitespace-nowrap">
          <Download className="w-4 h-4" /> Export CSV
        </button>
      </div>

      <p className="text-muted-foreground text-xs">{filtered.length} lead{filtered.length !== 1 ? "s" : ""} found</p>

      {/* Lead cards */}
      <div className="space-y-3">
        {filtered.map((lead, i) => {
          const score = calculateLeadScore(lead);
          return (
            <motion.div key={lead.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: Math.min(i * 0.02, 0.3) }}>
              <div className="glass-card rounded-xl p-4 lg:p-5 flex flex-col lg:flex-row lg:items-center gap-4 group hover:border-primary/15 transition-all duration-200">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/15 to-primary/5 flex items-center justify-center text-primary text-sm font-bold shrink-0">
                    {lead.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-foreground text-sm font-medium truncate">{lead.name}</p>
                      <span className={`text-[10px] font-bold ${getScoreColor(score)}`}><Star className="w-2.5 h-2.5 inline" /> {score}</span>
                    </div>
                    <div className="flex items-center gap-3 text-muted-foreground text-xs mt-0.5 flex-wrap">
                      <span className="flex items-center gap-1"><Phone className="w-3 h-3" />{lead.phone}</span>
                      {lead.email && <span className="flex items-center gap-1"><Mail className="w-3 h-3" />{lead.email}</span>}
                      {lead.building_type && <span className="flex items-center gap-1"><Building2 className="w-3 h-3" />{lead.building_type}</span>}
                      {lead.assigned_to && <span className="text-primary/70">👤 {lead.assigned_to}</span>}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => { e.stopPropagation(); setVisitModal({ leadId: lead.id, leadName: lead.name, leadPhone: lead.phone }); }}
                    className="p-2 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                    title="Schedule Site Visit"
                  >
                    <CalendarPlus className="w-3.5 h-3.5" />
                  </button>
                  <a href={`https://wa.me/${lead.phone.replace(/\D/g, "")}`} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 transition-colors" onClick={(e) => e.stopPropagation()}>
                    <MessageSquare className="w-3.5 h-3.5" />
                  </a>
                  <div className="relative">
                    <select
                      value={lead.status}
                      onChange={(e) => updateStatus(lead.id, e.target.value as Enums<"lead_status">)}
                      className={`text-[11px] font-medium px-3 py-1.5 rounded-full border appearance-none cursor-pointer pr-7 ${statusColors[lead.status]}`}
                      style={{ background: "transparent" }}
                    >
                      {allStatuses.map((s) => (<option key={s} value={s} className="bg-card text-foreground">{statusLabels[s]}</option>))}
                    </select>
                    <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 pointer-events-none" />
                  </div>
                  <span className="text-muted-foreground text-xs whitespace-nowrap">
                    {new Date(lead.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                  </span>
                  <Link to={`/admin/lead/${lead.id}`} className="p-2 rounded-lg hover:bg-secondary/30 text-muted-foreground hover:text-primary transition-all">
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </motion.div>
          );
        })}
        {filtered.length === 0 && <p className="text-muted-foreground text-sm text-center py-12">No leads match your search.</p>}
      </div>

      {visitModal && (
        <ScheduleVisitModal
          leadId={visitModal.leadId}
          leadName={visitModal.leadName}
          leadPhone={visitModal.leadPhone}
          onClose={() => setVisitModal(null)}
          onScheduled={() => {
            // Refresh leads to reflect status change
            supabase.from("leads").select("*").order("created_at", { ascending: false }).then(({ data }) => setLeads(data || []));
          }}
        />
      )}
    </div>
  );
};

export default AdminLeads;
