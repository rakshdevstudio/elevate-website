import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell,
  LineChart, Line, CartesianGrid, FunnelChart, Funnel, LabelList,
} from "recharts";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";
import { STATUS_CHART_COLORS, SOURCE_CHART_COLORS, statusLabels, pipelineStatuses, sourceLabels } from "@/lib/lead-utils";

const tooltipStyle = {
  contentStyle: {
    background: "hsl(212 55% 11%)",
    border: "1px solid hsl(212 40% 16%)",
    borderRadius: "12px",
    fontSize: "12px",
    color: "white",
  },
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
    return <div className="flex items-center justify-center h-64"><div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" /></div>;
  }

  // Daily data (last 30 days)
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

  // Monthly data
  const monthlyMap = new Map<string, number>();
  for (let i = 11; i >= 0; i--) {
    const d = new Date();
    d.setMonth(d.getMonth() - i);
    monthlyMap.set(`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`, 0);
  }
  leads.forEach((l) => {
    const key = l.created_at.substring(0, 7);
    if (monthlyMap.has(key)) monthlyMap.set(key, (monthlyMap.get(key) || 0) + 1);
  });
  const monthlyData = Array.from(monthlyMap, ([month, count]) => {
    const [y, m] = month.split("-");
    return { month: new Date(+y, +m - 1).toLocaleDateString("en-IN", { month: "short", year: "2-digit" }), leads: count };
  });

  // Status distribution
  const statusData = Object.entries(statusLabels).map(([key, label]) => ({
    name: label, value: leads.filter((l) => l.status === key).length, fill: STATUS_CHART_COLORS[key],
  })).filter((d) => d.value > 0);

  // Source distribution
  const sourceMap = new Map<string, number>();
  leads.forEach((l) => {
    const src = l.lead_source;
    sourceMap.set(src, (sourceMap.get(src) || 0) + 1);
  });
  const sourceData = Array.from(sourceMap, ([key, count]) => ({
    name: sourceLabels[key] || key.replace(/_/g, " "),
    leads: count,
    fill: SOURCE_CHART_COLORS[key] || "#6b7280",
  }));

  // Funnel data
  const funnelData = pipelineStatuses
    .filter((s) => s !== "lost")
    .map((status) => ({
      name: statusLabels[status],
      value: leads.filter((l) => l.status === status).length,
      fill: STATUS_CHART_COLORS[status],
    }));

  // Conversion metrics
  const converted = leads.filter((l) => l.status === "converted").length;
  const lost = leads.filter((l) => l.status === "lost").length;
  const active = leads.filter((l) => !["converted", "lost"].includes(l.status)).length;
  const conversionRate = leads.length > 0 ? ((converted / leads.length) * 100).toFixed(1) : "0";
  const lossRate = leads.length > 0 ? ((lost / leads.length) * 100).toFixed(1) : "0";
  const avgValue = leads.filter((l) => l.estimated_value).length > 0
    ? (leads.reduce((s, l) => s + (l.estimated_value || 0), 0) / leads.filter((l) => l.estimated_value).length)
    : 0;

  return (
    <div className="space-y-6">
      {/* Top stats */}
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
        {[
          { label: "Total Leads", value: leads.length },
          { label: "Active Pipeline", value: active },
          { label: "Converted", value: converted },
          { label: "Lost", value: lost },
          { label: "Conversion Rate", value: `${conversionRate}%` },
          { label: "Avg Deal Value", value: avgValue > 0 ? `₹${(avgValue / 100000).toFixed(1)}L` : "N/A" },
        ].map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }} className="glass-card-premium rounded-2xl p-4 text-center">
            <p className="text-xl font-heading font-bold text-foreground">{s.value}</p>
            <p className="text-muted-foreground text-[10px] mt-0.5">{s.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Charts grid */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Daily leads */}
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card rounded-2xl p-6">
          <h3 className="text-foreground font-heading font-semibold text-sm mb-4">Leads Per Day (30 Days)</h3>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dailyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(212 40% 16%)" />
                <XAxis dataKey="date" tick={{ fontSize: 9, fill: "hsl(212 25% 68%)" }} interval={4} />
                <YAxis tick={{ fontSize: 9, fill: "hsl(212 25% 68%)" }} allowDecimals={false} />
                <Tooltip {...tooltipStyle} />
                <Bar dataKey="leads" fill="hsl(43 66% 52%)" radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Monthly */}
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-card rounded-2xl p-6">
          <h3 className="text-foreground font-heading font-semibold text-sm mb-4">Leads Per Month</h3>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(212 40% 16%)" />
                <XAxis dataKey="month" tick={{ fontSize: 9, fill: "hsl(212 25% 68%)" }} />
                <YAxis tick={{ fontSize: 9, fill: "hsl(212 25% 68%)" }} allowDecimals={false} />
                <Tooltip {...tooltipStyle} />
                <Line type="monotone" dataKey="leads" stroke="hsl(43 66% 52%)" strokeWidth={2} dot={{ fill: "hsl(43 66% 52%)", r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Funnel */}
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="glass-card rounded-2xl p-6">
          <h3 className="text-foreground font-heading font-semibold text-sm mb-4">Pipeline Funnel</h3>
          <div className="h-56">
            {funnelData.some((d) => d.value > 0) ? (
              <ResponsiveContainer width="100%" height="100%">
                <FunnelChart>
                  <Tooltip {...tooltipStyle} />
                  <Funnel dataKey="value" data={funnelData} isAnimationActive>
                    <LabelList position="right" fill="hsl(212 25% 68%)" fontSize={10} dataKey="name" />
                    <LabelList position="center" fill="white" fontSize={12} fontWeight="bold" dataKey="value" />
                    {funnelData.map((entry, index) => (
                      <Cell key={index} fill={entry.fill} />
                    ))}
                  </Funnel>
                </FunnelChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-muted-foreground text-sm text-center pt-20">No data yet</p>
            )}
          </div>
        </motion.div>

        {/* Status pie */}
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="glass-card rounded-2xl p-6">
          <h3 className="text-foreground font-heading font-semibold text-sm mb-4">Status Distribution</h3>
          <div className="h-56 flex items-center justify-center">
            {statusData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={statusData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} innerRadius={45} paddingAngle={3} label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`} labelLine={{ stroke: "hsl(212 25% 68%)" }} fontSize={9}>
                    {statusData.map((entry, index) => (<Cell key={index} fill={entry.fill} />))}
                  </Pie>
                  <Tooltip {...tooltipStyle} />
                </PieChart>
              </ResponsiveContainer>
            ) : (<p className="text-muted-foreground text-sm">No data yet</p>)}
          </div>
        </motion.div>

        {/* Sources */}
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="glass-card rounded-2xl p-6 lg:col-span-2">
          <h3 className="text-foreground font-heading font-semibold text-sm mb-4">Lead Sources</h3>
          <div className="h-56">
            {sourceData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={sourceData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(212 40% 16%)" />
                  <XAxis type="number" tick={{ fontSize: 9, fill: "hsl(212 25% 68%)" }} allowDecimals={false} />
                  <YAxis dataKey="name" type="category" tick={{ fontSize: 9, fill: "hsl(212 25% 68%)" }} width={100} />
                  <Tooltip {...tooltipStyle} />
                  <Bar dataKey="leads" radius={[0, 4, 4, 0]}>
                    {sourceData.map((entry, index) => (
                      <Cell key={index} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            ) : (<p className="text-muted-foreground text-sm text-center pt-20">No data yet</p>)}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminAnalytics;
