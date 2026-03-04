import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import FloatingButtons from "./components/FloatingButtons";
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

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          {/* Admin routes - no Navbar/Footer */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="leads" element={<AdminLeads />} />
            <Route path="lead/:id" element={<AdminLeadDetail />} />
            <Route path="analytics" element={<AdminAnalytics />} />
          </Route>

          {/* Public routes */}
          <Route
            path="*"
            element={
              <>
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
