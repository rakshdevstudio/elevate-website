import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, Filter, Phone, Mail, Building2, ArrowRight, ChevronDown } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
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

const AdminLeads = () => {
  const [leads, setLeads] = useState<Tables<"leads">[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  useEffect(() => {
    const fetchLeads = async () => {
      const { data } = await supabase
        .from("leads")
        .select("*")
        .order("created_at", { ascending: false });
      setLeads(data || []);
      setLoading(false);
    };
    fetchLeads();
  }, []);

  const filtered = leads.filter((lead) => {
    const matchesSearch =
      !search ||
      lead.name.toLowerCase().includes(search.toLowerCase()) ||
      lead.phone.includes(search) ||
      (lead.email && lead.email.toLowerCase().includes(search.toLowerCase())) ||
      (lead.building_type && lead.building_type.toLowerCase().includes(search.toLowerCase()));
    const matchesStatus = statusFilter === "all" || lead.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const updateStatus = async (id: string, status: Enums<"lead_status">) => {
    await supabase.from("leads").update({ status }).eq("id", id);
    setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, status } : l)));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, phone, email..."
            className="input-premium w-full pl-11"
          />
        </div>
        <div className="relative">
          <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="input-premium pl-11 pr-10 appearance-none cursor-pointer min-w-[180px]"
          >
            <option value="all">All Statuses</option>
            {allStatuses.map((s) => (
              <option key={s} value={s}>{statusLabels[s]}</option>
            ))}
          </select>
          <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
        </div>
      </div>

      <p className="text-muted-foreground text-xs">{filtered.length} lead{filtered.length !== 1 ? "s" : ""} found</p>

      {/* Lead cards */}
      <div className="space-y-3">
        {filtered.map((lead, i) => (
          <motion.div
            key={lead.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.03 }}
          >
            <div className="glass-card rounded-xl p-4 lg:p-5 flex flex-col lg:flex-row lg:items-center gap-4 group hover:border-primary/15 transition-all duration-200">
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/15 to-primary/5 flex items-center justify-center text-primary text-sm font-bold shrink-0">
                  {lead.name.charAt(0).toUpperCase()}
                </div>
                <div className="min-w-0">
                  <p className="text-foreground text-sm font-medium truncate">{lead.name}</p>
                  <div className="flex items-center gap-3 text-muted-foreground text-xs mt-0.5 flex-wrap">
                    <span className="flex items-center gap-1"><Phone className="w-3 h-3" />{lead.phone}</span>
                    {lead.email && <span className="flex items-center gap-1"><Mail className="w-3 h-3" />{lead.email}</span>}
                    {lead.building_type && <span className="flex items-center gap-1"><Building2 className="w-3 h-3" />{lead.building_type}</span>}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="relative">
                  <select
                    value={lead.status}
                    onChange={(e) => updateStatus(lead.id, e.target.value as Enums<"lead_status">)}
                    className={`text-[11px] font-medium px-3 py-1.5 rounded-full border appearance-none cursor-pointer pr-7 ${statusColors[lead.status]}`}
                    style={{ background: "transparent" }}
                  >
                    {allStatuses.map((s) => (
                      <option key={s} value={s} className="bg-card text-foreground">{statusLabels[s]}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 pointer-events-none" />
                </div>

                <span className="text-muted-foreground text-xs whitespace-nowrap">
                  {new Date(lead.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                </span>

                <Link
                  to={`/admin/lead/${lead.id}`}
                  className="p-2 rounded-lg hover:bg-secondary/30 text-muted-foreground hover:text-primary transition-all"
                >
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
        {filtered.length === 0 && (
          <p className="text-muted-foreground text-sm text-center py-12">No leads match your search.</p>
        )}
      </div>
    </div>
  );
};

export default AdminLeads;
