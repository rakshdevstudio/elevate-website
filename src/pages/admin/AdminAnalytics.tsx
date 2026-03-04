import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, CartesianGrid } from "recharts";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";

const STATUS_COLORS: Record<string, string> = {
  new: "#3b82f6",
  contacted: "#f59e0b",
  inspection_scheduled: "#a855f7",
  quotation_sent: "#06b6d4",
  converted: "#10b981",
  lost: "#ef4444",
};

const statusLabels: Record<string, string> = {
  new: "New",
  contacted: "Contacted",
  inspection_scheduled: "Inspection",
  quotation_sent: "Quotation",
  converted: "Converted",
  lost: "Lost",
};

const AdminAnalytics = () => {
  const [leads, setLeads] = useState<Tables<"leads">[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase.from("leads").select("*").order("created_at", { ascending: true });
      setLeads(data || []);
      setLoading(false);
    };
    fetch();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Leads per day (last 30 days)
  const last30 = new Date();
  last30.setDate(last30.getDate() - 30);
  const dailyMap = new Map<string, number>();
  for (let i = 0; i <= 30; i++) {
    const d = new Date(last30);
    d.setDate(d.getDate() + i);
    dailyMap.set(d.toISOString().split("T")[0], 0);
  }
  leads.forEach((l) => {
    const day = l.created_at.split("T")[0];
    if (dailyMap.has(day)) dailyMap.set(day, (dailyMap.get(day) || 0) + 1);
  });
  const dailyData = Array.from(dailyMap, ([date, count]) => ({
    date: new Date(date).toLocaleDateString("en-IN", { day: "numeric", month: "short" }),
    leads: count,
  }));

  // Leads per month (last 12 months)
  const monthlyMap = new Map<string, number>();
  for (let i = 11; i >= 0; i--) {
    const d = new Date();
    d.setMonth(d.getMonth() - i);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
    monthlyMap.set(key, 0);
  }
  leads.forEach((l) => {
    const key = l.created_at.substring(0, 7);
    if (monthlyMap.has(key)) monthlyMap.set(key, (monthlyMap.get(key) || 0) + 1);
  });
  const monthlyData = Array.from(monthlyMap, ([month, count]) => {
    const [y, m] = month.split("-");
    return {
      month: new Date(+y, +m - 1).toLocaleDateString("en-IN", { month: "short", year: "2-digit" }),
      leads: count,
    };
  });

  // Status distribution
  const statusData = Object.entries(statusLabels).map(([key, label]) => ({
    name: label,
    value: leads.filter((l) => l.status === key).length,
    fill: STATUS_COLORS[key],
  })).filter((d) => d.value > 0);

  // Source distribution
  const sourceMap = new Map<string, number>();
  leads.forEach((l) => {
    const src = l.lead_source.replace(/_/g, " ");
    sourceMap.set(src, (sourceMap.get(src) || 0) + 1);
  });
  const sourceData = Array.from(sourceMap, ([name, count]) => ({ name, leads: count }));

  // Conversion rate
  const converted = leads.filter((l) => l.status === "converted").length;
  const conversionRate = leads.length > 0 ? ((converted / leads.length) * 100).toFixed(1) : "0";

  const tooltipStyle = {
    contentStyle: {
      background: "hsl(212 55% 11%)",
      border: "1px solid hsl(212 40% 16%)",
      borderRadius: "12px",
      fontSize: "12px",
      color: "white",
    },
  };

  return (
    <div className="space-y-6">
      {/* Top stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Leads", value: leads.length },
          { label: "Converted", value: converted },
          { label: "Conversion Rate", value: `${conversionRate}%` },
          { label: "Active Pipeline", value: leads.filter((l) => !["converted", "lost"].includes(l.status)).length },
        ].map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} className="glass-card-premium rounded-2xl p-5 text-center">
            <p className="text-2xl font-heading font-bold text-foreground">{s.value}</p>
            <p className="text-muted-foreground text-xs mt-1">{s.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Charts grid */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Daily leads */}
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card rounded-2xl p-6">
          <h3 className="text-foreground font-heading font-semibold text-sm mb-4">Leads Per Day (Last 30 Days)</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dailyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(212 40% 16%)" />
                <XAxis dataKey="date" tick={{ fontSize: 10, fill: "hsl(212 25% 68%)" }} interval={4} />
                <YAxis tick={{ fontSize: 10, fill: "hsl(212 25% 68%)" }} allowDecimals={false} />
                <Tooltip {...tooltipStyle} />
                <Bar dataKey="leads" fill="hsl(43 66% 52%)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Monthly leads */}
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-card rounded-2xl p-6">
          <h3 className="text-foreground font-heading font-semibold text-sm mb-4">Leads Per Month</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(212 40% 16%)" />
                <XAxis dataKey="month" tick={{ fontSize: 10, fill: "hsl(212 25% 68%)" }} />
                <YAxis tick={{ fontSize: 10, fill: "hsl(212 25% 68%)" }} allowDecimals={false} />
                <Tooltip {...tooltipStyle} />
                <Line type="monotone" dataKey="leads" stroke="hsl(43 66% 52%)" strokeWidth={2} dot={{ fill: "hsl(43 66% 52%)", r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Status pie */}
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="glass-card rounded-2xl p-6">
          <h3 className="text-foreground font-heading font-semibold text-sm mb-4">Lead Status Distribution</h3>
          <div className="h-64 flex items-center justify-center">
            {statusData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={statusData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={90} innerRadius={50} paddingAngle={3} label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`} labelLine={{ stroke: "hsl(212 25% 68%)" }} fontSize={10}>
                    {statusData.map((entry, index) => (
                      <Cell key={index} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip {...tooltipStyle} />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-muted-foreground text-sm">No data yet</p>
            )}
          </div>
        </motion.div>

        {/* Source */}
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="glass-card rounded-2xl p-6">
          <h3 className="text-foreground font-heading font-semibold text-sm mb-4">Lead Sources</h3>
          <div className="h-64">
            {sourceData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={sourceData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(212 40% 16%)" />
                  <XAxis type="number" tick={{ fontSize: 10, fill: "hsl(212 25% 68%)" }} allowDecimals={false} />
                  <YAxis dataKey="name" type="category" tick={{ fontSize: 10, fill: "hsl(212 25% 68%)" }} width={80} />
                  <Tooltip {...tooltipStyle} />
                  <Bar dataKey="leads" fill="hsl(43 66% 52%)" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-muted-foreground text-sm text-center pt-20">No data yet</p>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminAnalytics;
