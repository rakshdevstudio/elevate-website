import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  X,
  Sparkles,
  Phone,
  Mail,
  MapPin,
  Building2,
  Gauge,
  Flame,
  Snowflake,
  Zap,
  UserCheck,
  Mic,
  CheckCircle2,
  Trophy,
  MessageSquare,
  Wand2,
  Rocket,
  PartyPopper,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";
import { calculateLeadScore, getScoreBg, getScoreColor } from "@/lib/lead-utils";
import { toast } from "@/hooks/use-toast";
import { clampBudgetRange, MAX_BUDGET_LAKHS, MIN_BUDGET_LAKHS } from "@/lib/submitLead";

const sourceOptions = [
  { id: "walk_in", label: "Walk-in", icon: Building2 },
  { id: "phone", label: "Phone Call", icon: Phone },
  { id: "whatsapp", label: "WhatsApp", icon: MessageSquare },
  { id: "referral", label: "Referral", icon: UserCheck },
  { id: "event_expo", label: "Event / Expo", icon: Trophy },
  { id: "manual_entry", label: "Manual Entry", icon: Wand2 },
];

const urgencyLevels = [
  { id: "hot", label: "Hot", icon: Flame, copy: "Engage immediately" },
  { id: "warm", label: "Warm", icon: Zap, copy: "Respond within 24 hrs" },
  { id: "cold", label: "Cold", icon: Snowflake, copy: "Nurture with value" },
];

const buildingTypes = ["Residential", "Commercial", "Hospital", "Industrial"];

const elevatorSuggestions: Record<string, string[]> = {
  Residential: ["Machine-room-less", "Home lift", "Compact cabin"],
  Commercial: ["MRL with high traffic", "Destination control", "Glass wall"],
  Hospital: ["Stretcher lift", "Anti-bacterial finish", "Smooth start/stop"],
  Industrial: ["Freight", "Rugged cabin", "High capacity"],
};

const engineerRoster = [
  { name: "Aditi • Pune", zones: ["pune", "maharashtra", "hinjewadi"] },
  { name: "Rahul • Mumbai", zones: ["mumbai", "thane", "navi"] },
  { name: "Kabir • Bengaluru", zones: ["bangalore", "bengaluru", "whitefield"] },
  { name: "Devika • Hyderabad", zones: ["hyderabad", "hitech", "gachibowli"] },
  { name: "Field Pool", zones: [] },
];

export type CaptureLeadAction = "save" | "hot" | "followup";

interface CaptureLeadModalProps {
  open: boolean;
  onClose: () => void;
  onCreated?: (lead: Tables<"leads">) => void;
}

const formatPhone = (value: string) => {
  const digits = value.replace(/\D/g, "").slice(0, 12);
  if (digits.startsWith("91")) {
    return `+91 ${digits.slice(2, 7)} ${digits.slice(7)}`.trim();
  }
  if (digits.length > 10) return `${digits.slice(0, 5)} ${digits.slice(5)}`;
  if (digits.length > 5) return `${digits.slice(0, 5)} ${digits.slice(5)}`;
  return digits;
};

const voiceSupported = () => typeof window !== "undefined" && ("SpeechRecognition" in window || "webkitSpeechRecognition" in window);

// Minimal typings for web speech API where DOM lib may be incomplete
type WebSpeechRecognitionResult = { 0: { transcript: string } };
type WebSpeechRecognitionEvent = { results: Array<WebSpeechRecognitionResult> | SpeechRecognitionResultList };
type WebSpeechRecognition = {
  lang: string;
  onstart?: () => void;
  onend?: () => void;
  onerror?: () => void;
  onresult?: (event: WebSpeechRecognitionEvent) => void;
  start: () => void;
};
type WebSpeechRecognitionCtor = new () => WebSpeechRecognition;

const CaptureLeadModal = ({ open, onClose, onCreated }: CaptureLeadModalProps) => {
  const [source, setSource] = useState<string>(sourceOptions[0].id);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const [buildingType, setBuildingType] = useState<string>(buildingTypes[0]);
  const [floors, setFloors] = useState<number>(6);
  const [elevatorType, setElevatorType] = useState("");
  const [budget, setBudget] = useState<number>(20);
  const [urgency, setUrgency] = useState<string>("hot");
  const [assignedTo, setAssignedTo] = useState("");
  const [notes, setNotes] = useState("");
  const [saving, setSaving] = useState(false);
  const [successLead, setSuccessLead] = useState<Tables<"leads"> | null>(null);
  const [listening, setListening] = useState(false);

  useEffect(() => {
    if (!open) {
      setSuccessLead(null);
    }
  }, [open]);

  const numericPhone = phone.replace(/\D/g, "");
  const phoneValid = numericPhone.length >= 10;
  const normalizedBudget = clampBudgetRange(budget);

  const valueInLakhs = useMemo(() => {
    const min = Math.max(MIN_BUDGET_LAKHS, normalizedBudget - 2);
    const max = Math.min(MAX_BUDGET_LAKHS, normalizedBudget + 6);
    return { min, max };
  }, [normalizedBudget]);

  const enrichedLeadScore = useMemo(() => {
    const baseScore = calculateLeadScore({
      building_type: buildingType,
      number_of_floors: floors.toString(),
      elevator_type: elevatorType || elevatorSuggestions[buildingType]?.[0],
      email,
      estimated_value: normalizedBudget * 100000,
    });
    const urgencyBoost = urgency === "hot" ? 10 : urgency === "warm" ? 5 : 0;
    return Math.min(100, baseScore + urgencyBoost + (source === "referral" ? 5 : 0));
  }, [buildingType, floors, elevatorType, email, normalizedBudget, urgency, source]);

  const suggestedEngineer = useMemo(() => {
    const city = location.toLowerCase();
    return engineerRoster.find((e) => e.zones.some((z) => city.includes(z)))?.name || "Field Pool";
  }, [location]);

  const followupCopy = useMemo(() => {
    if (urgency === "hot") return "Follow up within 24 hrs";
    if (urgency === "warm") return "Follow up within 48 hrs";
    return "Send value email this week";
  }, [urgency]);

  const resetForm = () => {
    setSource(sourceOptions[0].id);
    setName("");
    setPhone("");
    setEmail("");
    setLocation("");
    setBuildingType(buildingTypes[0]);
    setFloors(6);
    setElevatorType("");
    setBudget(20);
    setUrgency("hot");
    setAssignedTo("");
    setNotes("");
    setSuccessLead(null);
  };

  const startVoice = () => {
    if (!voiceSupported()) {
      toast({ title: "Voice capture unavailable", description: "Browser does not support Speech Recognition." });
      return;
    }
    const Recognition: WebSpeechRecognitionCtor | undefined =
      (window as unknown as { SpeechRecognition?: WebSpeechRecognitionCtor }).SpeechRecognition ||
      (window as unknown as { webkitSpeechRecognition?: WebSpeechRecognitionCtor }).webkitSpeechRecognition;
    if (!Recognition) {
      toast({ title: "Voice capture unavailable", description: "Browser does not support Speech Recognition." });
      return;
    }
    const recognition = new Recognition();
    recognition.lang = "en-IN";
    recognition.onstart = () => setListening(true);
    recognition.onend = () => setListening(false);
    recognition.onerror = () => setListening(false);
    recognition.onresult = (event: WebSpeechRecognitionEvent) => {
      const transcript = Array.from(event.results as Array<WebSpeechRecognitionResult>)
        .map((result) => result[0].transcript)
        .join(" ");
      setNotes((prev) => (prev ? `${prev} ${transcript}` : transcript));
    };
    recognition.start();
  };

  const saveLead = async (action: CaptureLeadAction) => {
    if (!name || !phoneValid) {
      toast({ title: "Missing details", description: "Name and a valid phone number are required.", variant: "destructive" });
      return;
    }

    setSaving(true);
    const payload = {
      name: name.trim(),
      phone: numericPhone,
      email: email.trim() || null,
      building_type: buildingType,
      number_of_floors: floors.toString(),
      elevator_type: elevatorType || elevatorSuggestions[buildingType]?.[0] || null,
      lead_source: source === "event_expo" ? "other" : source,
      assigned_to: assignedTo || suggestedEngineer || null,
      lead_score: enrichedLeadScore,
      estimated_value: normalizedBudget * 100000,
      status: action === "hot" ? "contacted" : "new",
      message: [
        `Offline source: ${sourceOptions.find((s) => s.id === source)?.label || "Offline"}`,
        `Urgency: ${urgency.toUpperCase()}`,
        `Budget: ₹${normalizedBudget} Lakhs`,
        `Expected: ₹${valueInLakhs.min} Lakhs - ₹${valueInLakhs.max} Lakhs`,
        notes ? `Notes: ${notes}` : null,
      ].filter(Boolean).join(" | "),
    } as Record<string, unknown>;

    // Insert lead (types may lag schema, so cast to any for safety)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data, error } = await (supabase.from("leads") as any)
      .insert(payload)
      .select()
      .single();

    if (error || !data) {
      setSaving(false);
      toast({ title: "Could not capture lead", description: error?.message || "Unexpected error", variant: "destructive" });
      return;
    }

    // Record follow-up intent
    if (action === "followup") {
      const suggestedDate = new Date();
      suggestedDate.setDate(suggestedDate.getDate() + (urgency === "hot" ? 1 : urgency === "warm" ? 2 : 4));
      await supabase.from("lead_history").insert({
        lead_id: data.id,
        action: "follow_up",
        new_value: suggestedDate.toISOString().split("T")[0],
      });
    }

    if (action === "hot") {
      await supabase.from("lead_history").insert({
        lead_id: data.id,
        action: "status_change",
        old_value: "new",
        new_value: "contacted",
      });
    }

    setSaving(false);
    setSuccessLead(data as Tables<"leads">);
    onCreated?.(data as Tables<"leads">);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[70] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div className="absolute inset-0 bg-black/60 backdrop-blur-2xl" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} />

          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 10 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-6xl h-[90vh] overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent blur-3xl" />
            <div className="relative h-full glass-card-premium border border-primary/20 rounded-3xl shadow-[0_30px_120px_rgba(0,0,0,0.45)] overflow-hidden">
              <div className="flex items-center gap-3 px-6 py-4 border-b border-border/40">
                <div className="w-10 h-10 rounded-2xl bg-primary/20 text-primary flex items-center justify-center shadow-inner shadow-primary/20">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-[0.2em]">Offline Lead Capture</p>
                  <p className="text-lg font-heading font-semibold">Capture Lead</p>
                </div>
                <div className="ml-auto flex items-center gap-2 text-xs text-muted-foreground">
                  <Gauge className="w-3.5 h-3.5" /> Ultra-fast flow
                </div>
                <button onClick={onClose} className="p-2 rounded-xl hover:bg-secondary/40 text-muted-foreground hover:text-foreground transition-colors">
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Success state */}
              {successLead ? (
                <div className="h-[calc(90vh-72px)] flex flex-col items-center justify-center text-center px-8 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/10 via-primary/5 to-transparent" />
                  <PartyPopper className="w-10 h-10 text-primary mb-4 animate-bounce" />
                  <p className="text-2xl font-heading font-semibold mb-2">Lead Successfully Captured 🚀</p>
                  <p className="text-muted-foreground max-w-md mb-6">{successLead.name} is in the pipeline with offline tag. Next suggested action: {followupCopy}.</p>
                  <div className="grid sm:grid-cols-3 gap-4 w-full max-w-3xl">
                    <div className={`p-4 rounded-2xl border ${getScoreBg(enrichedLeadScore)} bg-opacity-40`}>
                      <p className="text-xs text-muted-foreground">Lead Score</p>
                      <p className={`text-3xl font-heading font-bold ${getScoreColor(enrichedLeadScore)}`}>{enrichedLeadScore}</p>
                    </div>
                    <div className="p-4 rounded-2xl border border-primary/20 bg-primary/5">
                      <p className="text-xs text-muted-foreground">Expected Deal Size</p>
                      <p className="text-xl font-heading font-semibold">₹{valueInLakhs.min}L – ₹{valueInLakhs.max}L</p>
                    </div>
                    <div className="p-4 rounded-2xl border border-border/50 bg-secondary/30">
                      <p className="text-xs text-muted-foreground">Source</p>
                      <p className="text-sm font-medium text-foreground">{sourceOptions.find((s) => s.id === source)?.label}</p>
                    </div>
                  </div>
                  <div className="mt-6 flex flex-wrap gap-3 justify-center">
                    <button onClick={() => { resetForm(); }} className="px-5 py-3 rounded-xl bg-primary text-primary-foreground font-semibold shadow-[0_10px_40px_rgba(255,215,128,0.25)]">
                      Capture Another Lead
                    </button>
                    <button onClick={onClose} className="px-5 py-3 rounded-xl border border-border/60 text-muted-foreground hover:text-foreground">Close</button>
                  </div>
                </div>
              ) : (
                <div className="h-[calc(90vh-72px)] overflow-y-auto p-6 space-y-4">
                  {/* Source hero */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                    {sourceOptions.map((opt) => {
                      const Icon = opt.icon;
                      const active = source === opt.id;
                      return (
                        <button
                          key={opt.id}
                          onClick={() => setSource(opt.id)}
                          className={`relative overflow-hidden rounded-2xl p-4 text-left transition-all duration-200 ${
                            active ? "border-2 border-primary/60 shadow-[0_0_25px_rgba(255,215,128,0.25)]" : "border border-border/60"
                          } glass-card`}
                        >
                          <div className={`absolute inset-0 ${active ? "animate-pulse bg-primary/10" : "bg-transparent"}`} />
                          <div className="relative flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${active ? "bg-primary/20 text-primary" : "bg-secondary/40 text-muted-foreground"}`}>
                              <Icon className="w-5 h-5" />
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-foreground">{opt.label}</p>
                              <p className="text-[11px] text-muted-foreground">Offline source</p>
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>

                <div className="grid lg:grid-cols-3 gap-4">
                  {/* Form left */}
                  <div className="lg:col-span-2 space-y-4">
                    <div className="grid sm:grid-cols-2 gap-3">
                      <div className="relative">
                        <label className="text-[11px] text-muted-foreground">Name *</label>
                        <div className="input-premium mt-1 flex items-center gap-2">
                          <Sparkles className="w-4 h-4 text-primary" />
                          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Client name" className="bg-transparent outline-none flex-1 text-sm" />
                        </div>
                      </div>
                      <div className="relative">
                        <label className="text-[11px] text-muted-foreground">Phone *</label>
                        <div className={`input-premium mt-1 flex items-center gap-2 ${!phoneValid && phone ? "border-red-500/50" : ""}`}>
                          <Phone className="w-4 h-4 text-primary" />
                          <input
                            value={phone}
                            onChange={(e) => setPhone(formatPhone(e.target.value))}
                            placeholder="91 98765 43210"
                            className="bg-transparent outline-none flex-1 text-sm"
                            inputMode="tel"
                          />
                        </div>
                        {!phoneValid && phone && <p className="text-[10px] text-red-400 mt-1">Enter at least 10 digits</p>}
                      </div>
                      <div>
                        <label className="text-[11px] text-muted-foreground">Email</label>
                        <div className="input-premium mt-1 flex items-center gap-2">
                          <Mail className="w-4 h-4 text-primary" />
                          <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Optional" className="bg-transparent outline-none flex-1 text-sm" />
                        </div>
                      </div>
                      <div>
                        <label className="text-[11px] text-muted-foreground">Location</label>
                        <div className="input-premium mt-1 flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-primary" />
                          <input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="City / Area" className="bg-transparent outline-none flex-1 text-sm" />
                        </div>
                        {suggestedEngineer && <p className="text-[10px] text-primary mt-1">Suggested engineer: {suggestedEngineer}</p>}
                      </div>
                    </div>

                    <div className="glass-card rounded-2xl p-4 border border-border/60">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <p className="text-xs text-muted-foreground">Project Details</p>
                          <p className="text-sm font-semibold">Sales-ready snapshot</p>
                        </div>
                        <Flame className="w-4 h-4 text-primary" />
                      </div>
                      <div className="grid sm:grid-cols-2 gap-3">
                        <div>
                          <p className="text-[11px] text-muted-foreground mb-2">Building Type</p>
                          <div className="grid grid-cols-2 gap-2">
                            {buildingTypes.map((type) => (
                              <button
                                key={type}
                                onClick={() => setBuildingType(type)}
                                className={`px-3 py-2 rounded-xl border text-left text-sm ${buildingType === type ? "border-primary/60 bg-primary/10 text-primary" : "border-border/60 text-foreground/80"}`}
                              >
                                {type}
                              </button>
                            ))}
                          </div>
                        </div>
                        <div>
                          <p className="text-[11px] text-muted-foreground mb-2">Floors</p>
                          <div className="flex items-center gap-3">
                            <input
                              type="range"
                              min={1}
                              max={30}
                              value={floors}
                              onChange={(e) => setFloors(parseInt(e.target.value))}
                              className="w-full accent-primary"
                            />
                            <span className="w-10 text-sm text-center font-semibold">{floors}</span>
                          </div>
                        </div>
                        <div>
                          <p className="text-[11px] text-muted-foreground mb-2">Elevator Type</p>
                          <div className="input-premium flex items-center gap-2">
                            <Building2 className="w-4 h-4 text-primary" />
                            <input
                              value={elevatorType}
                              onChange={(e) => setElevatorType(e.target.value)}
                              placeholder={elevatorSuggestions[buildingType]?.[0] || ""}
                              className="bg-transparent outline-none flex-1 text-sm"
                            />
                          </div>
                          <div className="flex flex-wrap gap-2 mt-2">
                            {elevatorSuggestions[buildingType]?.map((opt) => (
                              <button key={opt} onClick={() => setElevatorType(opt)} className="text-[11px] px-2 py-1 rounded-lg bg-secondary/40 text-muted-foreground hover:text-primary hover:bg-primary/10">
                                {opt}
                              </button>
                            ))}
                          </div>
                        </div>
                        <div>
                          <p className="text-[11px] text-muted-foreground mb-2">Budget Range (₹ Lakhs)</p>
                          <div className="input-premium flex items-center gap-3">
                            <Gauge className="w-4 h-4 text-primary" />
                            <input
                              type="range"
                              min={MIN_BUDGET_LAKHS}
                              max={MAX_BUDGET_LAKHS}
                              step={1}
                              value={budget}
                              onChange={(e) => setBudget(Math.min(MAX_BUDGET_LAKHS, Math.max(MIN_BUDGET_LAKHS, parseInt(e.target.value))))}
                              className="flex-1 accent-primary"
                            />
                            <span className="text-sm font-semibold min-w-[88px] text-right">₹{normalizedBudget} Lakhs</span>
                          </div>
                          <p className="text-[11px] text-muted-foreground mt-1">Expected ₹{valueInLakhs.min} Lakhs – ₹{valueInLakhs.max} Lakhs</p>
                        </div>
                        <div>
                          <p className="text-[11px] text-muted-foreground mb-2">Urgency</p>
                          <div className="grid grid-cols-3 gap-2">
                            {urgencyLevels.map((lvl) => {
                              const Icon = lvl.icon;
                              const active = urgency === lvl.id;
                              return (
                                <button
                                  key={lvl.id}
                                  onClick={() => setUrgency(lvl.id)}
                                  className={`rounded-xl px-2 py-2 border text-left text-xs ${active ? "border-primary/60 bg-primary/10 text-primary" : "border-border/60 text-foreground/80"}`}
                                >
                                  <div className="flex items-center gap-1.5">
                                    <Icon className="w-3.5 h-3.5" />
                                    <span className="font-semibold text-sm">{lvl.label}</span>
                                  </div>
                                  <p className="text-[10px] text-muted-foreground leading-tight">{lvl.copy}</p>
                                </button>
                              );
                            })}
                          </div>
                        </div>
                        <div>
                          <p className="text-[11px] text-muted-foreground mb-2">Assign Engineer</p>
                          <div className="input-premium flex items-center gap-2">
                            <UserCheck className="w-4 h-4 text-primary" />
                            <input value={assignedTo} onChange={(e) => setAssignedTo(e.target.value)} placeholder={suggestedEngineer} className="bg-transparent outline-none flex-1 text-sm" />
                          </div>
                          <p className="text-[10px] text-primary mt-1">AI suggestion: {suggestedEngineer}</p>
                        </div>
                      </div>
                    </div>

                    <div className="glass-card rounded-2xl p-4 border border-border/60">
                      <div className="flex items-center gap-2 mb-2">
                        <Mic className={`w-4 h-4 ${listening ? "text-primary animate-pulse" : "text-muted-foreground"}`} />
                        <p className="text-sm font-semibold">Notes</p>
                        <span className="text-[11px] text-muted-foreground">What did the client say?</span>
                      </div>
                      <textarea
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        rows={4}
                        placeholder="What did the client say? Any special requirements?"
                        className="w-full bg-transparent border border-border/40 rounded-xl p-3 text-sm focus:border-primary/60 focus:outline-none"
                      />
                      <div className="flex items-center gap-3 mt-2">
                        <button type="button" onClick={startVoice} className="px-3 py-2 rounded-lg border border-border/50 text-xs text-muted-foreground hover:text-primary hover:border-primary/40">
                          🎤 Voice to text
                        </button>
                        <p className="text-[11px] text-muted-foreground">Rich text allowed; we will keep source tagged as Offline.</p>
                      </div>
                    </div>
                  </div>

                  {/* Insights column */}
                  <div className="space-y-3">
                    <div className="glass-card rounded-2xl p-4 border border-primary/20">
                      <p className="text-xs text-muted-foreground mb-1">Smart Insights</p>
                      <p className="text-sm font-semibold mb-3">Live intelligence as you type</p>
                      <div className="space-y-2">
                        <div className={`p-3 rounded-xl border ${getScoreBg(enrichedLeadScore)}`}>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-muted-foreground">Lead Score</span>
                            <span className={`text-lg font-heading font-bold ${getScoreColor(enrichedLeadScore)}`}>{enrichedLeadScore}</span>
                          </div>
                          <p className="text-[11px] text-muted-foreground">{enrichedLeadScore >= 70 ? "High value lead" : enrichedLeadScore >= 40 ? "Medium potential" : "Needs nurture"}</p>
                        </div>
                        <div className="p-3 rounded-xl border border-border/60 bg-secondary/30">
                          <p className="text-xs text-muted-foreground">Expected deal size</p>
                          <p className="text-sm font-semibold">₹{valueInLakhs.min}L – ₹{valueInLakhs.max}L</p>
                        </div>
                        <div className="p-3 rounded-xl border border-primary/20 bg-primary/5">
                          <p className="text-xs text-muted-foreground">Recommended follow-up</p>
                          <p className="text-sm font-semibold">{followupCopy}</p>
                          <p className="text-[11px] text-muted-foreground">Auto-adjusts with urgency</p>
                        </div>
                        <div className="p-3 rounded-xl border border-border/50">
                          <p className="text-xs text-muted-foreground">Offline Tag</p>
                          <p className="text-sm font-semibold">Pipeline & Analytics will show \"Offline\" source</p>
                        </div>
                      </div>
                    </div>

                    <div className="glass-card rounded-2xl p-4 border border-border/60">
                      <p className="text-xs text-muted-foreground mb-3">Actions</p>
                      <div className="flex flex-col gap-2">
                        <button
                          onClick={() => saveLead("save")}
                          disabled={saving}
                          className="w-full justify-center px-4 py-3 rounded-xl bg-gradient-to-r from-primary to-gold-light text-primary-foreground font-semibold shadow-[0_10px_40px_rgba(255,215,128,0.2)] hover:shadow-[0_12px_50px_rgba(255,215,128,0.25)] transition-all disabled:opacity-50"
                        >
                          {saving ? "Saving..." : "Save Lead"}
                        </button>
                        <button
                          onClick={() => saveLead("hot")}
                          disabled={saving}
                          className="w-full justify-center px-4 py-3 rounded-xl border border-primary/40 text-primary font-semibold hover:bg-primary/10 transition-all"
                        >
                          Save & Mark as Hot
                        </button>
                        <button
                          onClick={() => saveLead("followup")}
                          disabled={saving}
                          className="w-full justify-center px-4 py-3 rounded-xl border border-border/60 text-muted-foreground font-semibold hover:text-foreground hover:bg-secondary/30 transition-all"
                        >
                          Save & Schedule Follow-up
                        </button>
                      </div>
                    </div>

                    <div className="glass-card rounded-2xl p-4 border border-border/60">
                      <div className="flex items-center gap-2 mb-2">
                        <Rocket className="w-4 h-4 text-primary" />
                        <p className="text-sm font-semibold">Zero lag feel</p>
                      </div>
                      <p className="text-[12px] text-muted-foreground leading-relaxed">Full-screen, glassy experience tuned for fast walk-in captures. Auto-calculates score, tags source as Offline, and feeds pipeline + analytics instantly.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CaptureLeadModal;
