import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar as CalendarIcon, Clock, User, MapPin, ChevronLeft, ChevronRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";

const AdminSiteVisits = () => {
  const [visits, setVisits] = useState<(Tables<"site_visits"> & { lead_name?: string })[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  useEffect(() => {
    const fetchVisits = async () => {
      const { data: visitsData } = await supabase.from("site_visits").select("*").order("scheduled_date", { ascending: true });
      if (visitsData) {
        const leadIds = [...new Set(visitsData.map((v) => v.lead_id))];
        const { data: leadsData } = await supabase.from("leads").select("id, name").in("id", leadIds);
        const leadMap = new Map(leadsData?.map((l) => [l.id, l.name]) || []);
        setVisits(visitsData.map((v) => ({ ...v, lead_name: leadMap.get(v.lead_id) || "Unknown" })));
      }
      setLoading(false);
    };
    fetchVisits();
  }, []);

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const prevMonth = () => setCurrentMonth(new Date(year, month - 1));
  const nextMonth = () => setCurrentMonth(new Date(year, month + 1));

  const getVisitsForDay = (day: number) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    return visits.filter((v) => v.scheduled_date === dateStr);
  };

  const today = new Date();
  const isToday = (day: number) => today.getFullYear() === year && today.getMonth() === month && today.getDate() === day;

  const upcomingVisits = visits
    .filter((v) => new Date(v.scheduled_date) >= new Date(today.toISOString().split("T")[0]))
    .slice(0, 8);

  if (loading) {
    return <div className="flex items-center justify-center h-64"><div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" /></div>;
  }

  return (
    <div className="space-y-6">
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
              return (
                <div
                  key={day}
                  className={`aspect-square rounded-lg p-1 text-center relative transition-all ${
                    isToday(day) ? "bg-primary/15 border border-primary/30" : "hover:bg-secondary/20"
                  }`}
                >
                  <span className={`text-[11px] ${isToday(day) ? "text-primary font-bold" : "text-foreground"}`}>{day}</span>
                  {dayVisits.length > 0 && (
                    <div className="absolute bottom-1 left-1/2 -translate-x-1/2 flex gap-0.5">
                      {dayVisits.slice(0, 3).map((_, vi) => (
                        <div key={vi} className="w-1 h-1 rounded-full bg-primary" />
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Upcoming visits */}
        <div className="glass-card rounded-2xl p-6">
          <h3 className="text-foreground font-heading font-semibold text-sm mb-4">Upcoming Visits</h3>
          <div className="space-y-3">
            {upcomingVisits.map((visit) => (
              <Link key={visit.id} to={`/admin/lead/${visit.lead_id}`} className="block p-3 rounded-xl bg-secondary/15 hover:bg-secondary/25 transition-colors">
                <p className="text-foreground text-xs font-medium">{visit.lead_name}</p>
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
    </div>
  );
};

export default AdminSiteVisits;
