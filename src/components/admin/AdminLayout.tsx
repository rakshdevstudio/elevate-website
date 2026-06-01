import { useEffect } from "react";
import { Link, useLocation, useNavigate, Outlet } from "react-router-dom";
import {
  LayoutDashboard, Users, BarChart3, LogOut, ChevronRight, Menu, X, Kanban, CalendarDays, Briefcase
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import logo from "@/assets/logo.png";
import { useState } from "react";
import { adminRoute } from "@/lib/adminRoute";

const navItems = [
  { label: "Dashboard", path: adminRoute("dashboard"), icon: LayoutDashboard },
  { label: "Pipeline", path: adminRoute("pipeline"), icon: Kanban },
  { label: "Leads", path: adminRoute("leads"), icon: Users },
  { label: "Site Visits", path: adminRoute("site-visits"), icon: CalendarDays },
  { label: "Careers", path: adminRoute("careers"), icon: Briefcase },
  { label: "Analytics", path: adminRoute("analytics"), icon: BarChart3 },
];

const AdminLayout = () => {
  const { user, isAdmin, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!loading && (!user || !isAdmin)) {
      navigate(adminRoute(), { replace: true });
    }
  }, [user, isAdmin, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user || !isAdmin) return null;

  return (
    <div className="min-h-screen bg-background flex">
      {sidebarOpen && (
        <div className="fixed inset-0 bg-background/60 backdrop-blur-sm z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      <aside className={`fixed lg:sticky top-0 left-0 h-screen w-64 bg-card/50 backdrop-blur-xl border-r border-border/40 z-50 flex flex-col transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}>
        <div className="p-6 flex items-center gap-3 border-b border-border/30">
          <img src={logo} alt="X Elevators" className="h-10 w-10 object-contain" />
          <div>
            <p className="text-foreground font-heading font-bold text-sm">X Elevators</p>
            <p className="text-muted-foreground text-xs">Secure staff access</p>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden ml-auto text-muted-foreground hover:text-foreground">
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path || (item.path === adminRoute("leads") && location.pathname.startsWith(adminRoute("lead/")));
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group ${isActive
                  ? "bg-primary/10 text-primary border border-primary/15"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary/30"
                  }`}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
                {isActive && <ChevronRight className="w-3 h-3 ml-auto" />}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-border/30">
          <button
            onClick={signOut}
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all duration-200 w-full"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-h-screen">
        <header className="sticky top-0 z-30 h-14 flex items-center px-4 lg:px-8 bg-background/80 backdrop-blur-xl border-b border-border/30">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 text-muted-foreground hover:text-foreground mr-3">
            <Menu className="w-5 h-5" />
          </button>
          <h2 className="text-foreground font-heading font-semibold text-sm">
            {navItems.find((n) => location.pathname.startsWith(n.path))?.label || "Lead Details"}
          </h2>
          <div className="ml-auto text-xs text-muted-foreground">
            {user.email}
          </div>
        </header>
        <main className="flex-1 p-4 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
