import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Users, UserPlus, CalendarDays, TrendingUp, ArrowRight, Phone, Building2,
  Bell, Star, MessageSquare, DollarSign, MapPin,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";
import { statusColors, statusLabels, pipelineStatuses, calculateLeadScore, getScoreColor } from "@/lib/lead-utils";
import { toast } from "@/hooks/use-toast";

const AdminDashboard = () => {
  const [leads, setLeads] = useState<Tables<"leads">[]>([]);
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState<Tables<"leads">[]>([]);

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

    // Real-time subscription for new leads
    const channel = supabase
      .channel("new-leads")
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "leads" }, (payload) => {
        const newLead = payload.new as Tables<"leads">;
        setLeads((prev) => [newLead, ...prev]);
        setNotifications((prev) => [newLead, ...prev.slice(0, 9)]);
        toast({
          title: "🔔 New Lead!",
          description: `${newLead.name} just submitted a lead from ${newLead.lead_source.replace(/_/g, " ")}`,
        });
      })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
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
  const converted = leads.filter((l) => l.status === "converted").length;
  const conversionRate = totalLeads > 0 ? ((converted / totalLeads) * 100).toFixed(1) : "0";
  const totalValue = leads.reduce((sum, l) => sum + (l.estimated_value || 0), 0);

  const stats = [
    { label: "Total Leads", value: totalLeads, icon: Users, color: "from-primary/20 to-primary/5" },
    { label: "Today", value: leadsToday, icon: UserPlus, color: "from-emerald-500/20 to-emerald-500/5" },
    { label: "This Week", value: leadsWeek, icon: CalendarDays, color: "from-blue-500/20 to-blue-500/5" },
    { label: "This Month", value: leadsMonth, icon: TrendingUp, color: "from-purple-500/20 to-purple-500/5" },
    { label: "Conversion Rate", value: `${conversionRate}%`, icon: Star, color: "from-amber-500/20 to-amber-500/5" },
    { label: "Pipeline Value", value: totalValue > 0 ? `₹${(totalValue / 100000).toFixed(1)}L` : "₹0", icon: DollarSign, color: "from-cyan-500/20 to-cyan-500/5" },
  ];

  const recentLeads = leads.slice(0, 8);
  const highScoreLeads = [...leads]
    .map((l) => ({ ...l, score: calculateLeadScore(l) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Notifications */}
      {notifications.length > 0 && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="glass-card rounded-2xl p-4 border-primary/20">
          <div className="flex items-center gap-2 mb-2">
            <Bell className="w-4 h-4 text-primary animate-pulse" />
            <h3 className="text-foreground font-heading font-semibold text-xs">New Notifications</h3>
            <button onClick={() => setNotifications([])} className="ml-auto text-muted-foreground text-xs hover:text-foreground">Clear</button>
          </div>
          {notifications.slice(0, 3).map((n) => (
            <Link key={n.id} to={`/admin/lead/${n.id}`} className="block text-xs text-muted-foreground hover:text-foreground py-1">
              🔔 <span className="text-foreground font-medium">{n.name}</span> submitted a new lead
            </Link>
          ))}
        </motion.div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {stats.map((stat, i) => (
          <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }} className="glass-card-premium rounded-2xl p-5">
            <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-2`}>
              <stat.icon className="w-4 h-4 text-primary" />
            </div>
            <p className="text-2xl font-heading font-bold text-foreground">{stat.value}</p>
            <p className="text-muted-foreground text-[10px] mt-0.5">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Pipeline overview */}
      <div className="glass-card rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-foreground font-heading font-semibold text-sm">Lead Pipeline</h3>
          <Link to="/admin/pipeline" className="text-primary text-xs font-medium flex items-center gap-1 hover:gap-2 transition-all">
            Open Board <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
        <div className="grid grid-cols-4 lg:grid-cols-7 gap-3">
          {pipelineStatuses.map((key) => {
            const count = leads.filter((l) => l.status === key).length;
            return (
              <div key={key} className="text-center">
                <p className="text-xl font-heading font-bold text-foreground">{count}</p>
                <span className={`inline-block mt-1 text-[9px] font-medium px-2 py-0.5 rounded-full border ${statusColors[key]}`}>
                  {statusLabels[key]}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent leads */}
        <div className="glass-card rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-foreground font-heading font-semibold text-sm">Recent Leads</h3>
            <Link to="/admin/leads" className="text-primary text-xs font-medium flex items-center gap-1 hover:gap-2 transition-all">
              View All <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="space-y-2">
            {recentLeads.map((lead) => (
              <Link key={lead.id} to={`/admin/lead/${lead.id}`} className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-secondary/20 transition-all group">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary/15 to-primary/5 flex items-center justify-center text-primary text-xs font-bold shrink-0">
                  {lead.name.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-foreground text-xs font-medium truncate">{lead.name}</p>
                  <p className="text-muted-foreground text-[10px] flex items-center gap-1"><Phone className="w-2.5 h-2.5" />{lead.phone}</p>
                </div>
                <span className={`text-[9px] font-medium px-2 py-0.5 rounded-full border shrink-0 ${statusColors[lead.status]}`}>
                  {statusLabels[lead.status]}
                </span>
              </Link>
            ))}
            {recentLeads.length === 0 && (
              <p className="text-muted-foreground text-xs text-center py-6">No leads yet.</p>
            )}
          </div>
        </div>

        {/* High-value leads */}
        <div className="glass-card rounded-2xl p-6">
          <h3 className="text-foreground font-heading font-semibold text-sm mb-4">🔥 Top Scored Leads</h3>
          <div className="space-y-2">
            {highScoreLeads.map((lead) => (
              <Link key={lead.id} to={`/admin/lead/${lead.id}`} className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-secondary/20 transition-all">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary/15 to-primary/5 flex items-center justify-center text-primary text-xs font-bold shrink-0">
                  {lead.name.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-foreground text-xs font-medium truncate">{lead.name}</p>
                  <p className="text-muted-foreground text-[10px]">{lead.building_type || "N/A"} · {lead.number_of_floors || "?"} floors</p>
                </div>
                <div className={`text-xs font-bold ${getScoreColor(lead.score)}`}>
                  {lead.score}
                </div>
              </Link>
            ))}
            {highScoreLeads.length === 0 && (
              <p className="text-muted-foreground text-xs text-center py-6">No leads yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
