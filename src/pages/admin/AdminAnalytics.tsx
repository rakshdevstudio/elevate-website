import { useEffect, useMemo, useState } from "react";
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
  const [payments, setPayments] = useState<Tables<"payments">[]>([]);
  const [history, setHistory] = useState<Tables<"lead_history">[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const [leadsRes, historyRes, paymentsRes] = await Promise.all([
        supabase.from("leads").select("*").order("created_at", { ascending: true }),
        supabase.from("lead_history").select("lead_id, action, new_value, created_at").order("created_at", { ascending: true }),
        supabase.from("payments").select("*").order("paid_on", { ascending: true }),
      ]);
      setLeads(leadsRes.data || []);
      setHistory(historyRes.data || []);
      setPayments(paymentsRes.data || []);
      setLoading(false);
    };
    fetch();
  }, []);

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
  const execution = leads.filter((l) => l.status === "execution_wip").length;
  const installed = leads.filter((l) => l.status === "installed").length;
  const lost = leads.filter((l) => l.status === "lost").length;
  const visited = leads.filter((l) => l.status === "visited_meeting").length;
  const quotation = leads.filter((l) => l.status === "quotation_sent").length;
  const active = leads.filter((l) => !["lost", "installed"].includes(l.status)).length;
  const conversionRate = leads.length > 0 ? ((converted / leads.length) * 100).toFixed(1) : "0";
  const lossRate = leads.length > 0 ? ((lost / leads.length) * 100).toFixed(1) : "0";
  const visitToQuote = visited > 0 ? ((quotation / visited) * 100).toFixed(1) : "0";
  const avgValue = leads.filter((l) => l.estimated_value).length > 0
    ? (leads.reduce((s, l) => s + (l.estimated_value || 0), 0) / leads.filter((l) => l.estimated_value).length)
    : 0;

  // Conversion -> Installation analytics using history timelines
  const conversionDates = new Map<string, string>();
  const installDates = new Map<string, string>();
  history.forEach((h) => {
    if (h.action === "status_change") {
      if (h.new_value === "converted" && !conversionDates.has(h.lead_id)) conversionDates.set(h.lead_id, h.created_at);
      if (h.new_value === "installed" && !installDates.has(h.lead_id)) installDates.set(h.lead_id, h.created_at);
    }
  });
  const conversionCount = conversionDates.size;
  const installedCount = Array.from(installDates.keys()).filter((id) => conversionDates.has(id)).length;
  const conversionToInstallRate = conversionCount > 0 ? ((installedCount / conversionCount) * 100).toFixed(1) : "0";
  const convertToInstallDurations: number[] = [];
  installDates.forEach((installDate, leadId) => {
    const convertedOn = conversionDates.get(leadId);
    if (convertedOn) {
      const delta = new Date(installDate).getTime() - new Date(convertedOn).getTime();
      if (delta > 0) convertToInstallDurations.push(delta);
    }
  });
  const avgConvertToInstallDays = convertToInstallDurations.length
    ? (convertToInstallDurations.reduce((s, d) => s + d, 0) / convertToInstallDurations.length / (1000 * 60 * 60 * 24)).toFixed(1)
    : "—";

  // Revenue Intelligence — installed leads only
  const paymentsByLead = useMemo(() => {
    const map = new Map<string, number>();
    payments.forEach((p) => {
      if (!p.lead_id) return;
      map.set(p.lead_id, (map.get(p.lead_id) || 0) + (p.amount || 0));
    });
    return map;
  }, [payments]);

  const installedLeads = leads.filter((l) => l.status === "installed");

  const revenueRows = installedLeads.map((lead) => {
    const total = lead.project_value || lead.estimated_value || 0;
    const collectedRaw = paymentsByLead.get(lead.id) || 0;
    const collected = Math.min(collectedRaw, total);
    const due = Math.max(total - collected, 0);
    const lastPayment = payments
      .filter((p) => p.lead_id === lead.id)
      .sort((a, b) => new Date(b.paid_on).getTime() - new Date(a.paid_on).getTime())[0];
    return {
      id: lead.id,
      name: lead.name,
      total,
      collected,
      due,
      progress: total > 0 ? Math.round((collected / total) * 100) : 0,
      lastPaymentDate: lastPayment ? lastPayment.paid_on : null,
      completionMonth: lead.completion_date ? lead.completion_date.substring(0, 7) : lead.updated_at.substring(0, 7),
      completionDate: lead.completion_date,
    };
  });

  const revenueSummary = revenueRows.reduce(
    (acc, row) => {
      acc.totalValue += row.total;
      acc.collected += row.collected;
      return acc;
    },
    { totalValue: 0, collected: 0 }
  );
  const revenueDue = Math.max(revenueSummary.totalValue - revenueSummary.collected, 0);
  const collectionEfficiency = revenueSummary.totalValue > 0
    ? ((revenueSummary.collected / revenueSummary.totalValue) * 100).toFixed(1)
    : "0.0";

  const monthlyRevenueMap = new Map<string, { total: number; collected: number; count: number }>();
  revenueRows.forEach((row) => {
    const key = row.completionMonth;
    const entry = monthlyRevenueMap.get(key) || { total: 0, collected: 0, count: 0 };
    entry.total += row.total;
    entry.collected += row.collected;
    entry.count += 1;
    monthlyRevenueMap.set(key, entry);
  });
  const monthlyRevenue = Array.from(monthlyRevenueMap.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([month, data]) => ({
      month: new Date(`${month}-01`).toLocaleDateString("en-IN", { month: "short", year: "2-digit" }),
      collected: data.collected,
      due: Math.max(data.total - data.collected, 0),
      total: data.total,
      count: data.count,
    }));

  if (loading) {
    return <div className="flex items-center justify-center h-64"><div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" /></div>;
  }

  // Engineer performance based on execution ownership
  const engineerMap = new Map<string, { inProgress: number; installed: number; totalDays: number; completedWithDates: number }>();
  leads.forEach((lead) => {
    const engineer = lead.execution_engineer || lead.assigned_to;
    if (!engineer) return;
    const entry = engineerMap.get(engineer) || { inProgress: 0, installed: 0, totalDays: 0, completedWithDates: 0 };
    if (lead.status === "execution_wip") entry.inProgress += 1;
    if (lead.status === "installed") {
      entry.installed += 1;
      if (lead.execution_start_date && lead.completion_date) {
        const delta = new Date(lead.completion_date).getTime() - new Date(lead.execution_start_date).getTime();
        if (delta > 0) {
          entry.totalDays += delta / (1000 * 60 * 60 * 24);
          entry.completedWithDates += 1;
        }
      }
    }
    engineerMap.set(engineer, entry);
  });
  const engineerRows = Array.from(engineerMap, ([name, stats]) => ({
    name,
    inProgress: stats.inProgress,
    installed: stats.installed,
    avgDays: stats.completedWithDates ? (stats.totalDays / stats.completedWithDates).toFixed(1) : "—",
  }))
    .sort((a, b) => b.installed - a.installed || b.inProgress - a.inProgress)
    .slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Top stats */}
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
        {[
          { label: "Total Leads", value: leads.length },
          { label: "Active Pipeline", value: active },
          { label: "Converted", value: converted },
          { label: "Execution (WIP)", value: execution },
          { label: "Installed", value: installed },
          { label: "Lost", value: lost },
          { label: "Conversion Rate", value: `${conversionRate}%` },
          { label: "Conv → Install", value: `${conversionToInstallRate}%` },
          { label: "Avg Convert → Install", value: `${avgConvertToInstallDays} days` },
          { label: "Visited → Quotation", value: `${visitToQuote}%` },
          { label: "Meetings Done", value: visited },
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

      {/* Revenue Intelligence */}
      <div className="glass-card rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-foreground font-heading font-semibold text-sm">Revenue Intelligence</h3>
          <span className="text-[11px] text-muted-foreground">Installed Projects</span>
        </div>

        {/* Summary cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
          {[
            { label: "Total Revenue", value: `₹${(revenueSummary.totalValue / 100000).toFixed(1)}L` },
            { label: "Collected", value: `₹${(revenueSummary.collected / 100000).toFixed(1)}L` },
            { label: "Pending", value: `₹${(revenueDue / 100000).toFixed(1)}L` },
            { label: "Collection Efficiency", value: `${collectionEfficiency}%` },
          ].map((card, i) => (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="p-4 rounded-xl bg-secondary/15 border border-border/30"
            >
              <p className="text-[11px] text-muted-foreground mb-1">{card.label}</p>
              <p className="text-xl font-heading font-bold text-foreground">{card.value}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Stacked bar */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-4 rounded-xl bg-secondary/10 border border-border/30">
            <h4 className="text-foreground font-heading font-semibold text-xs mb-3">Collections vs Due (by completion month)</h4>
            <div className="h-60">
              {monthlyRevenue.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthlyRevenue}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(212 40% 16%)" />
                    <XAxis dataKey="month" tick={{ fontSize: 10, fill: "hsl(212 25% 68%)" }} />
                    <YAxis tick={{ fontSize: 10, fill: "hsl(212 25% 68%)" }} />
                    <Tooltip
                      contentStyle={{
                        background: "hsl(212 55% 11%)",
                        border: "1px solid hsl(212 40% 16%)",
                        borderRadius: "12px",
                        fontSize: "12px",
                        color: "white",
                      }}
                      formatter={(value, name) => [value, name === "collected" ? "Collected" : "Pending"]}
                      labelFormatter={(label, payload) => {
                        const item = payload && payload[0]?.payload;
                        if (!item) return label;
                        return `${label} · Projects: ${item.count} · Total: ₹${item.total.toLocaleString("en-IN")}`;
                      }}
                    />
                    <Bar dataKey="collected" stackId="a" fill="#22c55e" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="due" stackId="a" fill="#ef4444" radius={[0, 0, 4, 4]} />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <p className="text-muted-foreground text-sm text-center pt-10">No installed projects yet</p>
              )}
            </div>
          </motion.div>

          {/* Revenue table */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-4 rounded-xl bg-secondary/10 border border-border/30 overflow-hidden">
            <h4 className="text-foreground font-heading font-semibold text-xs mb-3">Project Collections</h4>
            <div className="overflow-y-auto max-h-64 pr-2">
              <table className="w-full text-[11px]">
                <thead>
                  <tr className="text-muted-foreground border-b border-border/20">
                    <th className="text-left py-2">Project</th>
                    <th className="text-right py-2">Total</th>
                    <th className="text-right py-2">Collected</th>
                    <th className="text-right py-2">Pending</th>
                    <th className="text-left py-2">Progress</th>
                    <th className="text-left py-2">Last Payment</th>
                  </tr>
                </thead>
                <tbody>
                  {revenueRows.map((row) => (
                    <tr key={row.id} className="border-b border-border/10">
                      <td className="py-2 text-foreground font-medium">{row.name}</td>
                      <td className="py-2 text-right text-muted-foreground">₹{row.total.toLocaleString("en-IN")}</td>
                      <td className="py-2 text-right text-emerald-400">₹{row.collected.toLocaleString("en-IN")}</td>
                      <td className="py-2 text-right text-red-400">₹{row.due.toLocaleString("en-IN")}</td>
                      <td className="py-2">
                        <div className="w-full bg-border/30 rounded-full h-2 overflow-hidden">
                          <div
                            className="h-2 bg-gradient-to-r from-emerald-500 to-emerald-400"
                            style={{ width: `${Math.min(row.progress, 100)}%` }}
                          />
                        </div>
                        <span className="text-[10px] text-muted-foreground">{row.progress}%</span>
                      </td>
                      <td className="py-2 text-muted-foreground">
                        {row.lastPaymentDate ? new Date(row.lastPaymentDate).toLocaleDateString("en-IN", { day: "numeric", month: "short" }) : "—"}
                      </td>
                    </tr>
                  ))}
                  {revenueRows.length === 0 && (
                    <tr>
                      <td colSpan={6} className="text-center text-muted-foreground py-4">No installed projects</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Engineer performance */}
      {engineerRows.length > 0 && (
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card rounded-2xl p-6">
          <h3 className="text-foreground font-heading font-semibold text-sm mb-4">Engineer Performance</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {engineerRows.map((row) => (
              <div key={row.name} className="p-4 rounded-xl border border-border/40 bg-secondary/10">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-semibold text-foreground">{row.name}</p>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-200 border border-emerald-400/20">
                    {row.installed} installs
                  </span>
                </div>
                <p className="text-[11px] text-muted-foreground">In Execution: <span className="text-foreground font-semibold">{row.inProgress}</span></p>
                <p className="text-[11px] text-muted-foreground">Avg Exec → Install: <span className="text-foreground font-semibold">{row.avgDays} days</span></p>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default AdminAnalytics;
