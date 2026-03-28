import type { Enums } from "@/integrations/supabase/types";

export const statusColors: Record<string, string> = {
  new: "bg-blue-500/15 text-blue-400 border-blue-500/20",
  contacted: "bg-amber-500/15 text-amber-400 border-amber-500/20",
  inspection_scheduled: "bg-purple-500/15 text-purple-400 border-purple-500/20",
  visited_meeting: "bg-gradient-to-r from-indigo-500/15 to-blue-500/15 text-indigo-200 border-indigo-500/20",
  quotation_sent: "bg-cyan-500/15 text-cyan-400 border-cyan-500/20",
  negotiation: "bg-orange-500/15 text-orange-400 border-orange-500/20",
  converted: "bg-emerald-500/15 text-emerald-400 border-emerald-500/20",
  lost: "bg-red-500/15 text-red-400 border-red-500/20",
};

export const statusDotColors: Record<string, string> = {
  new: "bg-blue-400",
  contacted: "bg-amber-400",
  inspection_scheduled: "bg-purple-400",
  visited_meeting: "bg-indigo-400",
  quotation_sent: "bg-cyan-400",
  negotiation: "bg-orange-400",
  converted: "bg-emerald-400",
  lost: "bg-red-400",
};

export const statusLabels: Record<string, string> = {
  new: "New Lead",
  contacted: "Contacted",
  inspection_scheduled: "Inspection Scheduled",
  visited_meeting: "Visited / Meeting Done",
  quotation_sent: "Quotation Sent",
  negotiation: "Negotiation",
  converted: "Converted",
  lost: "Lost",
};

export const allStatuses: Enums<"lead_status">[] = [
  "new", "contacted", "inspection_scheduled", "visited_meeting", "quotation_sent", "negotiation", "converted", "lost",
];

export const pipelineStatuses: Enums<"lead_status">[] = [
  "new", "contacted", "inspection_scheduled", "visited_meeting", "quotation_sent", "negotiation", "converted", "lost",
];

export const STATUS_CHART_COLORS: Record<string, string> = {
  new: "#3b82f6",
  contacted: "#f59e0b",
  inspection_scheduled: "#a855f7",
  visited_meeting: "#6366f1",
  quotation_sent: "#06b6d4",
  negotiation: "#f97316",
  converted: "#10b981",
  lost: "#ef4444",
};

export function calculateLeadScore(lead: {
  building_type?: string | null;
  number_of_floors?: string | null;
  elevator_type?: string | null;
  email?: string | null;
  company_name?: string | null;
  estimated_value?: number | null;
}): number {
  let score = 0;
  if (lead.email) score += 15;
  if (lead.company_name) score += 10;
  if (lead.building_type) score += 10;
  if (lead.elevator_type) score += 10;

  const floors = parseInt(lead.number_of_floors || "0");
  if (floors >= 10) score += 25;
  else if (floors >= 5) score += 15;
  else if (floors >= 2) score += 10;

  if (lead.estimated_value) {
    if (lead.estimated_value >= 2000000) score += 30;
    else if (lead.estimated_value >= 1000000) score += 20;
    else if (lead.estimated_value >= 500000) score += 10;
  }

  return Math.min(score, 100);
}

export function getScoreColor(score: number): string {
  if (score >= 70) return "text-emerald-400";
  if (score >= 40) return "text-amber-400";
  return "text-red-400";
}

export function getScoreBg(score: number): string {
  if (score >= 70) return "bg-emerald-500/15 border-emerald-500/20";
  if (score >= 40) return "bg-amber-500/15 border-amber-500/20";
  return "bg-red-500/15 border-red-500/20";
}

export const sourceLabels: Record<string, string> = {
  website_form: "Website",
  whatsapp: "WhatsApp",
  phone: "Phone Call · Offline",
  referral: "Referral · Offline",
  walk_in: "Walk-in · Offline",
  other: "Offline",
  meta_ads: "Meta Ads",
  google_ads: "Google Ads",
  manual_entry: "Manual Entry · Offline",
};

export const SOURCE_CHART_COLORS: Record<string, string> = {
  website_form: "#3b82f6",
  whatsapp: "#22c55e",
  phone: "#f59e0b",
  referral: "#a855f7",
  walk_in: "#06b6d4",
  other: "#6b7280",
  meta_ads: "#3b5998",
  google_ads: "#ea4335",
  manual_entry: "#8b5cf6",
};
