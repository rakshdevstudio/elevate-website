import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Users, UserPlus, CalendarDays, TrendingUp, ArrowRight, Phone, Mail, Building2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";

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

const AdminDashboard = () => {
  const [leads, setLeads] = useState<Tables<"leads">[]>([]);
  const [loading, setLoading] = useState(true);

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

  const now = new Date();
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const weekStart = new Date(todayStart);
  weekStart.setDate(weekStart.getDate() - weekStart.getDay());
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);

  const totalLeads = leads.length;
  const leadsToday = leads.filter((l) => new Date(l.created_at) >= todayStart).length;
  const leadsWeek = leads.filter((l) => new Date(l.created_at) >= weekStart).length;
  const leadsMonth = leads.filter((l) => new Date(l.created_at) >= monthStart).length;

  const stats = [
    { label: "Total Leads", value: totalLeads, icon: Users, color: "from-primary/20 to-primary/5" },
    { label: "Today", value: leadsToday, icon: UserPlus, color: "from-emerald-500/20 to-emerald-500/5" },
    { label: "This Week", value: leadsWeek, icon: CalendarDays, color: "from-blue-500/20 to-blue-500/5" },
    { label: "This Month", value: leadsMonth, icon: TrendingUp, color: "from-purple-500/20 to-purple-500/5" },
  ];

  const recentLeads = leads.slice(0, 8);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card-premium rounded-2xl p-6"
          >
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-3`}>
              <stat.icon className="w-5 h-5 text-primary" />
            </div>
            <p className="text-3xl font-heading font-bold text-foreground">{stat.value}</p>
            <p className="text-muted-foreground text-xs mt-1">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Pipeline overview */}
      <div className="glass-card rounded-2xl p-6">
        <h3 className="text-foreground font-heading font-semibold text-sm mb-4">Lead Pipeline</h3>
        <div className="grid grid-cols-3 lg:grid-cols-6 gap-3">
          {Object.entries(statusLabels).map(([key, label]) => {
            const count = leads.filter((l) => l.status === key).length;
            return (
              <div key={key} className="text-center">
                <p className="text-2xl font-heading font-bold text-foreground">{count}</p>
                <span className={`inline-block mt-1 text-[10px] font-medium px-2 py-0.5 rounded-full border ${statusColors[key]}`}>
                  {label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent leads */}
      <div className="glass-card rounded-2xl p-6">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-foreground font-heading font-semibold text-sm">Recent Leads</h3>
          <Link to="/admin/leads" className="text-primary text-xs font-medium flex items-center gap-1 hover:gap-2 transition-all">
            View All <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
        <div className="space-y-3">
          {recentLeads.map((lead) => (
            <Link
              key={lead.id}
              to={`/admin/lead/${lead.id}`}
              className="flex items-center gap-4 p-3 rounded-xl hover:bg-secondary/20 transition-all duration-200 group"
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/15 to-primary/5 flex items-center justify-center text-primary text-sm font-bold shrink-0">
                {lead.name.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-foreground text-sm font-medium truncate">{lead.name}</p>
                <div className="flex items-center gap-3 text-muted-foreground text-xs mt-0.5">
                  {lead.phone && <span className="flex items-center gap-1"><Phone className="w-3 h-3" />{lead.phone}</span>}
                  {lead.building_type && <span className="flex items-center gap-1"><Building2 className="w-3 h-3" />{lead.building_type}</span>}
                </div>
              </div>
              <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full border shrink-0 ${statusColors[lead.status]}`}>
                {statusLabels[lead.status]}
              </span>
              <ArrowRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
            </Link>
          ))}
          {recentLeads.length === 0 && (
            <p className="text-muted-foreground text-sm text-center py-8">No leads yet. They'll appear here when submitted through the website.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
