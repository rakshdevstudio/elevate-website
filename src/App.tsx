import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Analytics } from "@vercel/analytics/react";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import FloatingButtons from "./components/FloatingButtons";
import ClickSpark from "./components/ClickSpark";
import SeoManager from "./components/SeoManager";
import Index from "./pages/Index";
import About from "./pages/About";
import Services from "./pages/Services";
import Products from "./pages/Products";
import Careers from "./pages/Careers";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminLayout from "./components/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminLeads from "./pages/admin/AdminLeads";
import AdminLeadDetail from "./pages/admin/AdminLeadDetail";
import AdminAnalytics from "./pages/admin/AdminAnalytics";
import AdminPipeline from "./pages/admin/AdminPipeline";
import AdminSiteVisits from "./pages/admin/AdminSiteVisits";
import AdminCareers from "./pages/admin/AdminCareers";
import { ADMIN_BASE_PATH } from "./lib/adminRoute";
import { isTrackableWebsitePath } from "./lib/websiteAnalytics";

const queryClient = new QueryClient();

const PublicAnalytics = () => {
  const { pathname } = useLocation();

  return isTrackableWebsitePath(pathname) ? <Analytics /> : null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <SeoManager />
        <ScrollToTop />
        <PublicAnalytics />
        <Routes>
          {/* Hidden admin routes */}
          <Route path="/admin" element={<Navigate to="/" replace />} />
          <Route path="/admin/*" element={<Navigate to="/" replace />} />
          <Route path={ADMIN_BASE_PATH} element={<AdminLogin />} />
          <Route path={ADMIN_BASE_PATH} element={<AdminLayout />}>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="pipeline" element={<AdminPipeline />} />
            <Route path="leads" element={<AdminLeads />} />
            <Route path="lead/:id" element={<AdminLeadDetail />} />
            <Route path="site-visits" element={<AdminSiteVisits />} />
            <Route path="analytics" element={<AdminAnalytics />} />
            <Route path="careers" element={<AdminCareers />} />
          </Route>

          {/* Public routes */}
          <Route
            path="*"
            element={
              <>
                <ClickSpark />
                <Navbar />
                <main className="min-h-screen">
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/services" element={<Services />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/careers" element={<Careers />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </main>
                <Footer />
                <FloatingButtons />
              </>
            }
          />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
