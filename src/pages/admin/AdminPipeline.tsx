import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Phone, MessageSquare, Building2, ArrowRight, GripVertical } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import type { Tables, Enums } from "@/integrations/supabase/types";
import { statusColors, statusLabels, statusDotColors, pipelineStatuses, calculateLeadScore, getScoreColor } from "@/lib/lead-utils";

const AdminPipeline = () => {
  const [leads, setLeads] = useState<Tables<"leads">[]>([]);
  const [loading, setLoading] = useState(true);
  const [draggedLead, setDraggedLead] = useState<string | null>(null);
  const [dragOverStatus, setDragOverStatus] = useState<string | null>(null);

  useEffect(() => {
    const fetchLeads = async () => {
      const { data } = await supabase.from("leads").select("*").order("created_at", { ascending: false });
      setLeads(data || []);
      setLoading(false);
    };
    fetchLeads();

    const channel = supabase
      .channel("pipeline-leads")
      .on("postgres_changes", { event: "*", schema: "public", table: "leads" }, () => { fetchLeads(); })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, []);

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

  const handleDrop = async (e: React.DragEvent, newStatus: Enums<"lead_status">) => {
    e.preventDefault();
    setDragOverStatus(null);
    if (!draggedLead) return;

    const lead = leads.find((l) => l.id === draggedLead);
    if (!lead || lead.status === newStatus) { setDraggedLead(null); return; }

    // Optimistic update
    setLeads((prev) => prev.map((l) => l.id === draggedLead ? { ...l, status: newStatus } : l));
    setDraggedLead(null);

    await supabase.from("leads").update({ status: newStatus }).eq("id", draggedLead);
    // Log history
    await supabase.from("lead_history").insert({
      lead_id: draggedLead,
      action: "status_change",
      old_value: lead.status,
      new_value: newStatus,
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
      <p className="text-muted-foreground text-xs">Drag and drop leads between columns to update their status</p>

      <div className="flex gap-4 overflow-x-auto pb-4" style={{ minHeight: "70vh" }}>
        {pipelineStatuses.map((status) => {
          const columnLeads = leads.filter((l) => l.status === status);
          const isDragOver = dragOverStatus === status;

          return (
            <div
              key={status}
              className={`flex-shrink-0 w-[260px] flex flex-col rounded-2xl transition-all duration-200 ${
                isDragOver ? "bg-primary/5 ring-1 ring-primary/20" : "bg-secondary/5"
              }`}
              onDragOver={(e) => handleDragOver(e, status)}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, status)}
            >
              {/* Column header */}
              <div className="p-3 border-b border-border/20">
                <div className="flex items-center gap-2">
                  <div className={`w-2.5 h-2.5 rounded-full ${statusDotColors[status]}`} />
                  <span className="text-foreground text-xs font-heading font-semibold">{statusLabels[status]}</span>
                  <span className="ml-auto text-muted-foreground text-[10px] bg-secondary/30 px-2 py-0.5 rounded-full">{columnLeads.length}</span>
                </div>
              </div>

              {/* Lead cards */}
              <div className="flex-1 p-2 space-y-2 overflow-y-auto max-h-[calc(70vh-60px)]">
                {columnLeads.map((lead) => {
                  const score = calculateLeadScore(lead);
                  return (
                    <motion.div
                      key={lead.id}
                      draggable
                      onDragStart={(e: any) => handleDragStart(e, lead.id)}
                      layout
                      className={`glass-card rounded-xl p-3 cursor-grab active:cursor-grabbing group hover:border-primary/15 transition-all ${
                        draggedLead === lead.id ? "opacity-50" : ""
                      }`}
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
                          <div className="flex items-center gap-2 mt-2">
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
    </div>
  );
};

export default AdminPipeline;
