import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Calendar as CalendarIcon, Clock, User, MapPin, ChevronLeft, ChevronRight,
  Filter, X, CheckCircle, XCircle, Search,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";
import { toast } from "@/hooks/use-toast";
import { adminRoute } from "@/lib/adminRoute";

type VisitWithLead = Tables<"site_visits"> & { lead_name?: string; lead_phone?: string };

const statusBadge = (status: string) => {
  if (status === "completed") return "bg-emerald-500/15 text-emerald-400 border-emerald-500/20";
  if (status === "cancelled") return "bg-red-500/15 text-red-400 border-red-500/20";
  return "bg-blue-500/15 text-blue-400 border-blue-500/20";
};

const AdminSiteVisits = () => {
  const [visits, setVisits] = useState<VisitWithLead[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Filters
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterEngineer, setFilterEngineer] = useState("");
  const [filterDate, setFilterDate] = useState("");

  useEffect(() => {
    fetchVisits();
  }, []);

  const fetchVisits = async () => {
    const { data: visitsData } = await supabase.from("site_visits").select("*").order("scheduled_date", { ascending: true });
    if (visitsData) {
      const leadIds = [...new Set(visitsData.map((v) => v.lead_id))];
      const { data: leadsData } = await supabase.from("leads").select("id, name, phone").in("id", leadIds);
      const leadMap = new Map(leadsData?.map((l) => [l.id, { name: l.name, phone: l.phone }]) || []);
      setVisits(
        visitsData.map((v) => ({
          ...v,
          lead_name: (v as any).customer_name || leadMap.get(v.lead_id)?.name || "Unknown",
          lead_phone: (v as any).phone || leadMap.get(v.lead_id)?.phone || "",
        }))
      );
    }
    setLoading(false);
  };

  const updateVisitStatus = async (visitId: string, newStatus: string) => {
    const { error } = await supabase.from("site_visits").update({ status: newStatus }).eq("id", visitId);
    if (error) {
      toast({ title: "Error", description: "Failed to update visit status.", variant: "destructive" });
      return;
    }
    setVisits((prev) => prev.map((v) => (v.id === visitId ? { ...v, status: newStatus } : v)));
    toast({ title: "✅ Updated", description: `Visit marked as ${newStatus}` });
  };

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const prevMonth = () => { setCurrentMonth(new Date(year, month - 1)); setSelectedDay(null); };
  const nextMonth = () => { setCurrentMonth(new Date(year, month + 1)); setSelectedDay(null); };

  const getVisitsForDay = (day: number) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    return visits.filter((v) => v.scheduled_date === dateStr);
  };

  const formatPrettyDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric" });

  const today = new Date();
  const isToday = (day: number) => today.getFullYear() === year && today.getMonth() === month && today.getDate() === day;

  // Get all unique engineers
  const engineers = [...new Set(visits.map((v) => v.engineer_name).filter(Boolean))];

  // Filter visits for upcoming panel
  const filteredVisits = visits.filter((v) => {
    if (filterStatus !== "all" && v.status !== filterStatus) return false;
    if (filterEngineer && v.engineer_name !== filterEngineer) return false;
    if (filterDate && v.scheduled_date !== filterDate) return false;
    return true;
  });

  const upcomingVisits = filteredVisits
    .filter((v) => new Date(v.scheduled_date) >= new Date(today.toISOString().split("T")[0]) && v.status === "scheduled")
    .sort((a, b) => {
      const aDate = new Date(a.scheduled_date).getTime();
      const bDate = new Date(b.scheduled_date).getTime();
      if (aDate === bDate) {
        // optional: sort by time if present (HH:MM)
        if (a.scheduled_time && b.scheduled_time) {
          return a.scheduled_time.localeCompare(b.scheduled_time);
        }
      }
      return aDate - bDate;
    })
    .slice(0, 10);

  const selectedDayVisits = selectedDay ? getVisitsForDay(selectedDay) : [];
  const selectedVisits = selectedDate ? visits.filter((v) => v.scheduled_date === selectedDate) : [];

  if (loading) {
    return <div className="flex items-center justify-center h-64"><div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" /></div>;
  }

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="input-premium pl-9 pr-8 text-xs appearance-none cursor-pointer min-w-[140px]">
            <option value="all">All Statuses</option>
            <option value="scheduled">Scheduled</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
        <div className="relative">
          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
          <select value={filterEngineer} onChange={(e) => setFilterEngineer(e.target.value)} className="input-premium pl-9 pr-8 text-xs appearance-none cursor-pointer min-w-[160px]">
            <option value="">All Engineers</option>
            {engineers.map((eng) => <option key={eng} value={eng!}>{eng}</option>)}
          </select>
        </div>
        <input type="date" value={filterDate} onChange={(e) => setFilterDate(e.target.value)} className="input-premium text-xs" />
        {(filterStatus !== "all" || filterEngineer || filterDate) && (
          <button onClick={() => { setFilterStatus("all"); setFilterEngineer(""); setFilterDate(""); }} className="inline-flex items-center gap-1 px-3 py-2 rounded-xl bg-red-500/10 text-red-400 text-xs hover:bg-red-500/20 transition-colors">
            <X className="w-3 h-3" /> Clear
          </button>
        )}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <div className="lg:col-span-2 glass-card rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-foreground font-heading font-semibold text-sm">
              {currentMonth.toLocaleDateString("en-IN", { month: "long", year: "numeric" })}
            </h3>
            <div className="flex gap-2">
              <button onClick={prevMonth} className="p-2 rounded-lg hover:bg-secondary/30 text-muted-foreground hover:text-foreground transition-colors">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button onClick={nextMonth} className="p-2 rounded-lg hover:bg-secondary/30 text-muted-foreground hover:text-foreground transition-colors">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Day headers */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
              <div key={d} className="text-center text-muted-foreground text-[10px] font-medium py-1">{d}</div>
            ))}
          </div>

          {/* Calendar grid */}
          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: firstDay }, (_, i) => (
              <div key={`empty-${i}`} className="aspect-square" />
            ))}
            {Array.from({ length: daysInMonth }, (_, i) => {
              const day = i + 1;
              const dayVisits = getVisitsForDay(day);
              const isSelected = selectedDay === day;
              return (
                <button
                  key={day}
                  onClick={() => {
                    setSelectedDay(isSelected ? null : day);
                    const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
                    setSelectedDate(dateStr);
                    setIsModalOpen(true);
                  }}
                  className={`aspect-square rounded-lg p-1 text-center relative transition-all cursor-pointer ${
                    isSelected ? "bg-primary/20 border border-primary/40 ring-1 ring-primary/20"
                    : isToday(day) ? "bg-primary/15 border border-primary/30"
                    : "hover:bg-secondary/20"
                  }`}
                >
                  <span className={`text-[11px] ${isToday(day) ? "text-primary font-bold" : isSelected ? "text-primary font-semibold" : "text-foreground"}`}>{day}</span>
                  {dayVisits.length > 0 && (
                    <div className="absolute bottom-1 left-1/2 -translate-x-1/2 flex gap-0.5">
                      {dayVisits.slice(0, 3).map((v, vi) => (
                        <div key={vi} className={`w-1.5 h-1.5 rounded-full ${v.status === "completed" ? "bg-emerald-400" : v.status === "cancelled" ? "bg-red-400" : "bg-primary"}`} />
                      ))}
                      {dayVisits.length > 3 && <span className="text-[8px] text-muted-foreground ml-0.5">+{dayVisits.length - 3}</span>}
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Selected day detail */}
          {selectedDay && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6 border-t border-border/30 pt-4">
              <h4 className="text-foreground font-heading font-semibold text-xs mb-3">
                {new Date(year, month, selectedDay).toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long" })}
                <span className="text-muted-foreground font-normal ml-2">({selectedDayVisits.length} visit{selectedDayVisits.length !== 1 ? "s" : ""})</span>
              </h4>
              {selectedDayVisits.length === 0 ? (
                <p className="text-muted-foreground text-xs py-4 text-center">No visits on this day</p>
              ) : (
                <div className="space-y-3">
                  {selectedDayVisits.map((visit) => (
                    <div key={visit.id} className="p-4 rounded-xl bg-secondary/15 space-y-2">
                      <div className="flex items-center justify-between">
                        <Link to={adminRoute(`lead/${visit.lead_id}`)} className="text-foreground text-sm font-medium hover:text-primary transition-colors">
                          {visit.lead_name}
                        </Link>
                        <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full border ${statusBadge(visit.status)}`}>
                          {visit.status}
                        </span>
                      </div>
                      <div className="flex flex-wrap items-center gap-3 text-muted-foreground text-xs">
                        {visit.scheduled_time && <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{visit.scheduled_time}</span>}
                        {visit.engineer_name && <span className="flex items-center gap-1"><User className="w-3 h-3" />{visit.engineer_name}</span>}
                        {visit.address && <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{visit.address}</span>}
                      </div>
                      {visit.notes && <p className="text-muted-foreground text-xs italic">{visit.notes}</p>}
                      {visit.status === "scheduled" && (
                        <div className="flex gap-2 pt-1">
                          <button onClick={() => updateVisitStatus(visit.id, "completed")} className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 text-[11px] font-medium hover:bg-emerald-500/20 transition-colors">
                            <CheckCircle className="w-3 h-3" /> Complete
                          </button>
                          <button onClick={() => updateVisitStatus(visit.id, "cancelled")} className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-red-500/10 text-red-400 text-[11px] font-medium hover:bg-red-500/20 transition-colors">
                            <XCircle className="w-3 h-3" /> Cancel
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </div>

        {/* Upcoming visits */}
        <div className="glass-card rounded-2xl p-6">
          <h3 className="text-foreground font-heading font-semibold text-sm mb-4">Upcoming Visits</h3>
          <div className="space-y-3 max-h-[600px] overflow-y-auto">
            {upcomingVisits.map((visit) => (
              <Link key={visit.id} to={adminRoute(`lead/${visit.lead_id}`)} className="block p-3 rounded-xl bg-secondary/15 hover:bg-secondary/25 transition-colors">
                <div className="flex items-center justify-between">
                  <p className="text-foreground text-xs font-medium">{visit.lead_name}</p>
                  {visit.lead_phone && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open(`https://wa.me/${visit.lead_phone.replace(/\D/g, "")}?text=${encodeURIComponent(`Hi ${visit.lead_name}, reminder: your site visit is scheduled for ${new Date(visit.scheduled_date).toLocaleDateString("en-IN", { day: "numeric", month: "long" })}${visit.scheduled_time ? ` at ${visit.scheduled_time}` : ""}. - X Elevators`)}`, "_blank", "noopener,noreferrer");
                      }}
                      className="text-emerald-400 hover:text-emerald-300 transition-colors"
                      title="Send WhatsApp reminder"
                      type="button"
                    >
                      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                    </button>
                  )}
                </div>
                <div className="flex items-center gap-2 text-muted-foreground text-[10px] mt-1">
                  <CalendarIcon className="w-3 h-3" />
                  {new Date(visit.scheduled_date).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                  {visit.scheduled_time && <><Clock className="w-3 h-3 ml-1" />{visit.scheduled_time}</>}
                </div>
                <div className="flex items-center gap-2 text-muted-foreground text-[10px] mt-0.5">
                  {visit.engineer_name && <><User className="w-3 h-3" />{visit.engineer_name}</>}
                  {visit.address && <><MapPin className="w-3 h-3 ml-1" />{visit.address}</>}
                </div>
              </Link>
            ))}
            {upcomingVisits.length === 0 && (
              <p className="text-muted-foreground text-xs text-center py-6">No upcoming visits</p>
            )}
          </div>
        </div>
      </div>

      {isModalOpen && selectedDate && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => { setIsModalOpen(false); }}
        >
          <div
            className="w-[420px] max-h-[80vh] overflow-y-auto rounded-2xl bg-gradient-to-br from-[#0b1a2a] to-[#0d2238] border border-white/10 shadow-2xl p-5 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-white">
                {formatPrettyDate(selectedDate)}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="text-white/60 hover:text-white">
                ✕
              </button>
            </div>

            {selectedVisits.length === 0 && (
              <div className="text-center text-white/50 py-10">
                No visits scheduled
              </div>
            )}

            <div className="space-y-3">
              {selectedVisits.map((visit) => (
                <div key={visit.id} className="p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all">
                  <div className="text-white font-medium">
                    {visit.lead_name || "Client"}
                  </div>
                  <div className="text-sm text-white/60 mt-1">
                    ⏰ {visit.scheduled_time || "—"}
                  </div>
                  <div className="text-sm text-white/60">
                    📍 {visit.address || "Location TBD"}
                  </div>
                  <div className="text-sm text-white/40">
                    👷 {visit.engineer_name || "Not assigned"}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* All visits table */}
      <div className="glass-card rounded-2xl p-6">
        <h3 className="text-foreground font-heading font-semibold text-sm mb-4">All Visits ({filteredVisits.length})</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-border/20">
                <th className="text-left text-muted-foreground font-medium py-2 px-3">Customer</th>
                <th className="text-left text-muted-foreground font-medium py-2 px-3">Date</th>
                <th className="text-left text-muted-foreground font-medium py-2 px-3">Time</th>
                <th className="text-left text-muted-foreground font-medium py-2 px-3">Engineer</th>
                <th className="text-left text-muted-foreground font-medium py-2 px-3">Location</th>
                <th className="text-left text-muted-foreground font-medium py-2 px-3">Status</th>
                <th className="text-left text-muted-foreground font-medium py-2 px-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredVisits.map((visit) => (
                <tr key={visit.id} className="border-b border-border/10 hover:bg-secondary/10 transition-colors">
                  <td className="py-2.5 px-3">
                    <Link to={adminRoute(`lead/${visit.lead_id}`)} className="text-foreground font-medium hover:text-primary transition-colors">
                      {visit.lead_name}
                    </Link>
                  </td>
                  <td className="py-2.5 px-3 text-muted-foreground">
                    {new Date(visit.scheduled_date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                  </td>
                  <td className="py-2.5 px-3 text-muted-foreground">{visit.scheduled_time || "—"}</td>
                  <td className="py-2.5 px-3 text-muted-foreground">{visit.engineer_name || "—"}</td>
                  <td className="py-2.5 px-3 text-muted-foreground truncate max-w-[150px]">{visit.address || "—"}</td>
                  <td className="py-2.5 px-3">
                    <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full border ${statusBadge(visit.status)}`}>
                      {visit.status}
                    </span>
                  </td>
                  <td className="py-2.5 px-3">
                    {visit.status === "scheduled" && (
                      <div className="flex gap-1">
                        <button onClick={() => updateVisitStatus(visit.id, "completed")} className="p-1 rounded text-emerald-400 hover:bg-emerald-500/10 transition-colors" title="Mark completed">
                          <CheckCircle className="w-3.5 h-3.5" />
                        </button>
                        <button onClick={() => updateVisitStatus(visit.id, "cancelled")} className="p-1 rounded text-red-400 hover:bg-red-500/10 transition-colors" title="Cancel">
                          <XCircle className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredVisits.length === 0 && <p className="text-muted-foreground text-xs text-center py-6">No visits found</p>}
        </div>
      </div>
    </div>
  );
};

export default AdminSiteVisits;
