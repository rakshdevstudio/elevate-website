import { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Phone, MessageSquare, Building2, ArrowRight, GripVertical, CalendarDays, MapPin, Handshake, Wrench, Hammer, CheckCircle2, Sparkles } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { format, subMonths, startOfMonth, endOfMonth } from "date-fns";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { Tables, Enums } from "@/integrations/supabase/types";
import { statusColors, statusLabels, statusDotColors, pipelineStatuses, calculateLeadScore, getScoreColor } from "@/lib/lead-utils";
import CaptureVisitModal, { VisitCapturePayload } from "@/components/admin/CaptureVisitModal";
import ExecutionModal, { ExecutionPayload } from "@/components/admin/ExecutionModal";
import InstallationModal, { InstallationPayload } from "@/components/admin/InstallationModal";

type PipelineStatus = Tables<"leads">["status"] | "execution_wip" | "installed";
type PipelineLead = Omit<Tables<"leads">, "status"> & { status: PipelineStatus };

const AdminPipeline = () => {
  const [leads, setLeads] = useState<PipelineLead[]>([]);
  const [loading, setLoading] = useState(true);
  const [draggedLead, setDraggedLead] = useState<string | null>(null);
  const [dragOverStatus, setDragOverStatus] = useState<string | null>(null);
  const [selectedMonth, setSelectedMonth] = useState<string>("this_month");
  const [visitModalLead, setVisitModalLead] = useState<PipelineLead | null>(null);
  const [executionLead, setExecutionLead] = useState<PipelineLead | null>(null);
  const [installationLead, setInstallationLead] = useState<PipelineLead | null>(null);
  const [visitMeta, setVisitMeta] = useState<Record<string, VisitCapturePayload & { interestTag: "high" | "medium" | "low" }>>({});

  // Generate last 6 months for the filter
  const monthOptions = useMemo(() => Array.from({ length: 6 }).map((_, i) => {
      const date = subMonths(new Date(), i);
      const value = format(date, "yyyy-MM");

      let label = format(date, "MMMM yyyy");
      if (i === 0) label = "This Month";
      if (i === 1) label = "Last Month";

      return { value, label, date };
    }), []);

  useEffect(() => {
    const fetchLeads = async () => {
      setLoading(true);
      let query = supabase.from("leads").select("*").order("created_at", { ascending: false });

      if (selectedMonth !== "all") {
        const option = monthOptions.find((o) => o.value === selectedMonth);
        if (option) {
          const start = startOfMonth(option.date).toISOString();
          const end = endOfMonth(option.date).toISOString();
          query = query.gte("created_at", start).lte("created_at", end);
        }
      }

      const { data } = await query;
      setLeads((data || []) as PipelineLead[]);
      setLoading(false);
    };
    fetchLeads();

    const channel = supabase
      .channel("pipeline-leads")
      .on("postgres_changes", { event: "*", schema: "public", table: "leads" }, () => { fetchLeads(); })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [selectedMonth, monthOptions]);

  const handleDragStart = (e: React.DragEvent, leadId: string) => {
    setDraggedLead(leadId);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent, status: string) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    setDragOverStatus(status);
  };

  const handleDragLeave = () => {
    setDragOverStatus(null);
  };

  const handleDrop = async (e: React.DragEvent, newStatus: PipelineStatus) => {
    e.preventDefault();
    setDragOverStatus(null);
    if (!draggedLead) return;

    const lead = leads.find((l) => l.id === draggedLead);
    if (!lead || lead.status === newStatus) { setDraggedLead(null); return; }

    if (newStatus === "visited_meeting") {
      setVisitModalLead(lead);
      setDraggedLead(null);
      return;
    }
    if (newStatus === "execution_wip") {
      setExecutionLead(lead);
      setDraggedLead(null);
      return;
    }
    if (newStatus === "installed") {
      setInstallationLead(lead);
      setDraggedLead(null);
      return;
    }

    // Optimistic update
    setLeads((prev) => prev.map((l) => l.id === draggedLead ? { ...l, status: newStatus } : l));
    setDraggedLead(null);

    await supabase.from("leads").update({ status: newStatus as Enums<"lead_status"> }).eq("id", draggedLead);
    await supabase.from("lead_history").insert({
      lead_id: draggedLead,
      action: "status_change",
      old_value: lead.status,
      new_value: newStatus as Enums<"lead_status">,
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-card/30 p-4 rounded-2xl border border-border/30">
        <p className="text-muted-foreground text-xs sm:text-sm">Drag and drop leads between columns to update their status</p>

        <div className="flex items-center gap-2">
          <CalendarDays className="w-4 h-4 text-muted-foreground" />
          <Select value={selectedMonth} onValueChange={setSelectedMonth}>
            <SelectTrigger className="w-[180px] bg-secondary/20 border border-border/50 rounded-xl h-9 text-xs">
              <SelectValue placeholder="Filter by date" />
            </SelectTrigger>
            <SelectContent>
              {monthOptions.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
              ))}
              <SelectItem value="all">All Leads</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-4" style={{ minHeight: "70vh" }}>
        {(pipelineStatuses as PipelineStatus[]).map((status) => {
          const columnLeads = leads.filter((l) => l.status === status);
          const isDragOver = dragOverStatus === status;

          const glowClass = status === "execution_wip"
            ? "bg-amber-500/5 ring-1 ring-amber-300/40 shadow-[0_10px_40px_rgba(234,179,8,0.18)]"
            : status === "installed"
              ? "bg-emerald-500/5 ring-1 ring-emerald-300/35 shadow-[0_10px_40px_rgba(34,197,94,0.2)]"
              : isDragOver
                ? "bg-primary/5 ring-1 ring-primary/20 shadow-[0_10px_40px_rgba(99,102,241,0.25)]"
                : "";

          return (
            <div
              key={status}
              className={`flex-shrink-0 w-[260px] flex flex-col rounded-2xl transition-all duration-200 ${glowClass}`}
              onDragOver={(e) => handleDragOver(e, status)}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, status)}
            >
              {/* Column header */}
              <div className="p-3 border-b border-border/20">
                <div className="flex items-center gap-2">
                  <div className={`w-2.5 h-2.5 rounded-full ${statusDotColors[status]}`} />
                  <span className="text-foreground text-xs font-heading font-semibold flex items-center gap-1">
                    {(status === "visited_meeting") && <Handshake className="w-3 h-3 text-indigo-300" />}
                    {(status === "execution_wip") && <Wrench className="w-3 h-3 text-amber-300" />}
                    {(status === "installed") && <CheckCircle2 className="w-3 h-3 text-emerald-300" />}
                    {statusLabels[status]}
                  </span>
                  <span className="ml-auto text-muted-foreground text-[10px] bg-secondary/30 px-2 py-0.5 rounded-full">{columnLeads.length}</span>
                </div>
              </div>

              {/* Lead cards */}
              <div className="flex-1 p-2 space-y-2 overflow-y-auto max-h-[calc(70vh-60px)]">
                {columnLeads.map((lead) => {
                  const score = lead.lead_score ?? calculateLeadScore(lead);
                  const isExecution = lead.status === "execution_wip";
                  const isInstalled = lead.status === "installed";

                  return (
                    <motion.div
                      key={lead.id}
                      draggable
                      onDragStartCapture={(e) => handleDragStart(e, lead.id)}
                      layout
                      className={`glass-card rounded-xl p-3 cursor-grab active:cursor-grabbing group hover:border-primary/15 transition-all ${
                        draggedLead === lead.id ? "opacity-50" : ""
                      } ${lead.status === "visited_meeting" ? "ring-1 ring-indigo-500/30 shadow-[0_12px_50px_rgba(99,102,241,0.25)]" : ""} ${
                        isExecution ? "ring-1 ring-amber-400/50 shadow-[0_16px_60px_rgba(234,179,8,0.22)] animate-pulse" : ""
                      } ${
                        isInstalled ? "ring-1 ring-emerald-400/50 shadow-[0_16px_60px_rgba(16,185,129,0.28)]" : ""
                      }`}
                      animate={
                        lead.status === "visited_meeting"
                          ? { scale: 1.02 }
                          : isExecution
                            ? { scale: 1.02 }
                            : { scale: 1 }
                      }
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                      <div className="flex items-start gap-2">
                        <GripVertical className="w-3 h-3 text-muted-foreground/30 mt-0.5 shrink-0 group-hover:text-muted-foreground transition-colors" />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2">
                            <p className="text-foreground text-xs font-medium truncate">{lead.name}</p>
                            <span className={`text-[10px] font-bold ${getScoreColor(score)}`}>{score}</span>
                          </div>
                          <p className="text-muted-foreground text-[10px] flex items-center gap-1 mt-1">
                            <Phone className="w-2.5 h-2.5" />{lead.phone}
                          </p>
                          {lead.building_type && (
                            <p className="text-muted-foreground text-[10px] flex items-center gap-1 mt-0.5">
                              <Building2 className="w-2.5 h-2.5" />{lead.building_type}
                            </p>
                          )}
                          <div className="flex flex-wrap items-center gap-2 mt-2">
                            {isExecution && (
                              <>
                                <span className="text-[10px] px-2 py-1 rounded-full bg-amber-500/15 text-amber-100 border border-amber-400/30 flex items-center gap-1">
                                  <CalendarDays className="w-3 h-3" /> {lead.execution_start_date ? format(new Date(lead.execution_start_date), "dd MMM") : "Start date"}
                                </span>
                                {lead.execution_engineer && (
                                  <span className="text-[10px] px-2 py-1 rounded-full bg-amber-500/10 text-amber-100 border border-amber-300/30 flex items-center gap-1">
                                    <Hammer className="w-3 h-3" /> {lead.execution_engineer}
                                  </span>
                                )}
                                <span className="text-[10px] px-2 py-1 rounded-full bg-amber-500/10 text-amber-50 border border-amber-300/30 flex items-center gap-1">
                                  <Sparkles className="w-3 h-3" />
                                  {lead.installation_status?.replace(/_/g, " ") || "Pending"}
                                </span>
                              </>
                            )}
                            {isInstalled && (
                              <>
                                {lead.completion_date && (
                                  <span className="text-[10px] px-2 py-1 rounded-full bg-emerald-500/15 text-emerald-100 border border-emerald-400/40 flex items-center gap-1">
                                    <CheckCircle2 className="w-3 h-3" /> {format(new Date(lead.completion_date), "dd MMM")}
                                  </span>
                                )}
                                {lead.project_value && (
                                  <span className="text-[10px] px-2 py-1 rounded-full bg-emerald-500/10 text-emerald-100 border border-emerald-300/30 flex items-center gap-1">
                                    ₹{(lead.project_value / 100000).toFixed(1)}L
                                  </span>
                                )}
                                {lead.warranty_status && (
                                  <span className="text-[10px] px-2 py-1 rounded-full bg-emerald-500/10 text-emerald-50 border border-emerald-300/30">
                                    Warranty: {lead.warranty_status}
                                  </span>
                                )}
                                {lead.client_satisfaction && (
                                  <span className="text-[10px] px-2 py-1 rounded-full bg-emerald-500/10 text-emerald-50 border border-emerald-300/30 flex items-center gap-1">
                                    <Sparkles className="w-3 h-3" /> {Array.from({ length: lead.client_satisfaction }).map((_, i) => "⭐").join("")}
                                  </span>
                                )}
                              </>
                            )}
                            {lead.status === "visited_meeting" && (
                              <>
                                <span className="text-[10px] px-2 py-1 rounded-full bg-indigo-500/15 text-indigo-200 border border-indigo-500/30 flex items-center gap-1">
                                  <MapPin className="w-3 h-3" /> {(visitMeta[lead.id]?.visitType || "Visited")}
                                </span>
                                {visitMeta[lead.id]?.visitDate && (
                                  <span className="text-[10px] px-2 py-1 rounded-full bg-secondary/30 text-muted-foreground border border-border/40">
                                    {visitMeta[lead.id]?.visitDate}
                                  </span>
                                )}
                                {visitMeta[lead.id]?.engineer && (
                                  <span className="text-[10px] px-2 py-1 rounded-full bg-secondary/20 text-muted-foreground border border-border/30">
                                    👷 {visitMeta[lead.id]?.engineer}
                                  </span>
                                )}
                                {visitMeta[lead.id]?.interestLevel === "High" && (
                                  <span className="text-[10px] px-2 py-1 rounded-full bg-emerald-500/15 text-emerald-200 border border-emerald-500/30">
                                    Hot Lead 🔥
                                  </span>
                                )}
                              </>
                            )}
                            <a
                              href={`https://wa.me/${lead.phone.replace(/\D/g, "")}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="p-1 rounded-md bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 transition-colors"
                            >
                              <MessageSquare className="w-3 h-3" />
                            </a>
                            <a
                              href={`tel:${lead.phone}`}
                              onClick={(e) => e.stopPropagation()}
                              className="p-1 rounded-md bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                            >
                              <Phone className="w-3 h-3" />
                            </a>
                            <Link
                              to={`/admin/lead/${lead.id}`}
                              onClick={(e) => e.stopPropagation()}
                              className="p-1 rounded-md bg-secondary/20 text-muted-foreground hover:text-foreground ml-auto transition-colors"
                            >
                              <ArrowRight className="w-3 h-3" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
                {columnLeads.length === 0 && (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground/40 text-[10px]">Drop leads here</p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
      <CaptureVisitModal
        lead={visitModalLead as Tables<"leads"> | null}
        onClose={() => setVisitModalLead(null)}
        onSubmit={async (payload) => {
          if (!visitModalLead) return;
          const { id } = visitModalLead;
          const base = visitModalLead.lead_score ?? calculateLeadScore(visitModalLead);
          const interestBoost = payload.interestLevel === "High" ? 15 : payload.interestLevel === "Medium" ? 5 : -5;
          const newScore = Math.max(0, Math.min(100, base + interestBoost));

          setLeads((prev) => prev.map((l) => l.id === id ? { ...l, status: "visited_meeting", lead_score: newScore } : l));
          setVisitMeta((prev) => ({
            ...prev,
            [id]: { ...payload, interestTag: payload.interestLevel === "High" ? "high" : payload.interestLevel === "Medium" ? "medium" : "low" },
          }));

          await supabase.from("leads").update({ status: "visited_meeting", lead_score: newScore }).eq("id", id);
          await supabase.from("lead_history").insert({
            lead_id: id,
            action: "status_change",
            old_value: visitModalLead.status,
            new_value: "visited_meeting",
          });
          await supabase.from("lead_history").insert({
            lead_id: id,
            action: "visit_completed",
            new_value: JSON.stringify(payload),
            user_id: null,
          });
          await supabase.from("site_visits").insert({
            lead_id: id,
            scheduled_date: payload.visitDate,
            scheduled_time: null,
            engineer_name: payload.engineer || visitModalLead.assigned_to || null,
            notes: `${payload.visitType} • Interest: ${payload.interestLevel} • Next: ${payload.nextAction} • ${payload.notes || ""}`,
            status: "completed",
            customer_name: visitModalLead.name,
            phone: visitModalLead.phone,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            address: (visitModalLead as any).address || null,
          });
          setVisitModalLead(null);
        }}
      />
      <ExecutionModal
        lead={executionLead as Tables<"leads"> | null}
        onClose={() => setExecutionLead(null)}
        onSubmit={async (payload: ExecutionPayload) => {
          if (!executionLead) return;
          const { id } = executionLead;
          setLeads((prev) => prev.map((l) => l.id === id ? {
            ...l,
            status: "execution_wip",
            execution_start_date: payload.startDate,
            execution_engineer: payload.engineer || null,
            installation_status: payload.installationStatus,
            execution_notes: payload.notes ?? null,
          } : l));

          await supabase.from("leads").update({
            status: "execution_wip" as Enums<"lead_status">,
            execution_start_date: payload.startDate,
            execution_engineer: payload.engineer || null,
            installation_status: payload.installationStatus,
            execution_notes: payload.notes ?? null,
          }).eq("id", id);
          await supabase.from("lead_history").insert({
            lead_id: id,
            action: "status_change",
            old_value: executionLead.status,
            new_value: "execution_wip",
          });
          await supabase.from("lead_history").insert({
            lead_id: id,
            action: "execution_started",
            new_value: JSON.stringify(payload),
            user_id: null,
          });
          setExecutionLead(null);
        }}
      />
      <InstallationModal
        lead={installationLead as Tables<"leads"> | null}
        onClose={() => setInstallationLead(null)}
        onSubmit={async (payload: InstallationPayload) => {
          if (!installationLead) return;
          const { id } = installationLead;
          const projectValueNumber = payload.projectValue ? Number(payload.projectValue) : null;
          setLeads((prev) => prev.map((l) => l.id === id ? {
            ...l,
            status: "installed",
            completion_date: payload.completionDate,
            project_value: projectValueNumber,
            warranty_status: payload.warrantyStatus || null,
            final_notes: payload.finalNotes || null,
            client_satisfaction: payload.clientSatisfaction,
            installation_status: "near_completion",
          } : l));

          await supabase.from("leads").update({
            status: "installed" as Enums<"lead_status">,
            completion_date: payload.completionDate,
            project_value: projectValueNumber,
            warranty_status: payload.warrantyStatus || null,
            final_notes: payload.finalNotes || null,
            client_satisfaction: payload.clientSatisfaction,
            installation_status: "near_completion",
          }).eq("id", id);
          await supabase.from("lead_history").insert({
            lead_id: id,
            action: "status_change",
            old_value: installationLead.status,
            new_value: "installed",
          });
          await supabase.from("lead_history").insert({
            lead_id: id,
            action: "installation_completed",
            new_value: JSON.stringify(payload),
            user_id: null,
          });
          setInstallationLead(null);
        }}
      />
    </div>
  );
};

export default AdminPipeline;
