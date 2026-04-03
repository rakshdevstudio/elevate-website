import { useState } from "react";
import { InteractiveCareers } from "@/components/InteractiveCareers";
import { PageHero, SectionHeading, GlassCard, SectionDivider, ScrollReveal } from "@/components/ui/shared";
import { Briefcase, MapPin, Clock, TrendingUp, Users, BookOpen, Heart, Shield, Zap } from "lucide-react";
import { CTABanner } from "@/components/CTABanner";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";

const cultureCards = [
  { icon: <TrendingUp className="w-6 h-6" />, title: "Growth", desc: "We invest in your career growth with training programs, certifications, and clear advancement paths." },
  { icon: <Users className="w-6 h-6" />, title: "Team Culture", desc: "Collaborative and supportive work environment where every team member's contribution is valued." },
  { icon: <BookOpen className="w-6 h-6" />, title: "Learning", desc: "Continuous learning opportunities with access to the latest elevator technology and industry best practices." },
  { icon: <Heart className="w-6 h-6" />, title: "Work-Life Balance", desc: "Flexible schedules and supportive policies that help you maintain a healthy work-life balance." },
  { icon: <Shield className="w-6 h-6" />, title: "Safety First", desc: "Comprehensive safety training and top-of-the-line protective equipment for all field operations." },
  { icon: <Zap className="w-6 h-6" />, title: "Innovation", desc: "Work with cutting-edge technology including IoT systems, smart controls, and AI-powered diagnostics." },
];

const openings = [
  { title: "Installation Engineer", dept: "Operations", location: "Bangalore & Chennai", type: "Full-time" },
  { title: "Service Technician", dept: "Maintenance", location: "Chennai", type: "Full-time" },
  { title: "Sales Executive", dept: "Sales", location: "Bangalore & Chennai", type: "Full-time" },
  { title: "Project Manager", dept: "Operations", location: "Bangalore", type: "Full-time" },
];

const Careers = () => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", position: "", experience: "", about: "" });
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ];

    if (!allowedTypes.includes(selectedFile.type)) {
      toast({ title: "Invalid File Type", description: "Only PDF, DOC, and DOCX files are allowed.", variant: "destructive" });
      return;
    }

    if (selectedFile.size > 5 * 1024 * 1024) {
      toast({ title: "File Too Large", description: "Resume file must be under 5MB.", variant: "destructive" });
      return;
    }

    setFile(selectedFile);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const missing: string[] = [];
    if (!form.name) missing.push("Full Name");
    if (!form.email) missing.push("Email");
    if (!form.phone) missing.push("Phone");
    if (!form.position) missing.push("Position");
    if (!file) missing.push("Resume");

    if (missing.length) {
      toast({
        title: "Missing Fields",
        description: `Please add: ${missing.join(", ")}.`,
        variant: "destructive"
      });
      return;
    }

    setLoading(true);

    try {
      // 1. Upload Resume
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}_${form.name.replace(/\s+/g, '_')}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('resumes')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // 2. Insert Application Record
      const { error: insertError } = await supabase
        .from('job_applications')
        .insert({
          full_name: form.name,
          email: form.email,
          phone: form.phone,
          position: form.position,
          experience_years: form.experience,
          about: form.about,
          resume_url: filePath
        });

      if (insertError) throw insertError;

      toast({ title: "Application Submitted Successfully", description: "Our team will contact you soon!" });
      setForm({ name: "", email: "", phone: "", position: "", experience: "", about: "" });
      setFile(null);
    } catch (error: any) {
      console.error("Submission error:", error);
      toast({ title: "Submission Failed", description: error.message || "An error occurred while submitting your application.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handleJobClick = (jobTitle: string) => {
    setForm((prev) => ({ ...prev, position: jobTitle }));

    if (typeof document !== "undefined") {
      requestAnimationFrame(() => {
        document.getElementById("apply")?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }
  };

  return (
    <>
      <PageHero
        badge="Build the Future With Us"
        title="Join India's Vertical Engineering Vanguard"
        subtitle="Engineers, project leaders, and technicians execute programmes that keep millions moving with exacting precision. Bring your curiosity for controls, structural integration, or digital maintenance into a disciplined environment that prizes long-term reliability."
        backgroundImage="/images/hero-careers.webp"
      />

      <InteractiveCareers />

     <section className="py-10 md:py-16 section-glow relative">
        <SectionDivider />
        <div className="container mx-auto px-6 pt-8 relative z-10">
          <SectionHeading badge="Openings" title="Current Openings" subtitle="Explore available positions and find your perfect role" />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {openings.map((job, i) => (
              <ScrollReveal key={i} delay={i * 0.08}>
                <GlassCard className="p-6" premium tilt>
                  <h3 className="text-lg font-heading font-bold text-foreground mb-3">{job.title}</h3>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-muted-foreground text-sm">
                      <Briefcase className="w-4 h-4 text-primary shrink-0" /> {job.dept}
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground text-sm">
                      <MapPin className="w-4 h-4 text-primary shrink-0" /> {job.location}
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground text-sm">
                      <Clock className="w-4 h-4 text-primary shrink-0" /> {job.type}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleJobClick(job.title)}
                    className="block w-full py-2.5 rounded-xl bg-primary/10 text-primary font-semibold text-sm hover:bg-gradient-to-r hover:from-primary hover:to-gold-light hover:text-primary-foreground transition-all duration-300 text-center hover:shadow-[0_0_20px_hsl(43_66%_52%/0.2)]"
                  >
                    Apply Now
                  </button>
                </GlassCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section id="apply" className="py-10 md:py-16 relative">
        <SectionDivider />
        <div className="container mx-auto px-6 max-w-2xl pt-8">
          <SectionHeading badge="Apply" title="Apply Now" subtitle="Fill in your details and we'll get back to you" />
          <GlassCard className="p-8 relative overflow-hidden" hover={false} premium>
            <div className="absolute inset-0 bg-gradient-to-br from-primary/3 to-transparent pointer-events-none" />
            <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input name="name" value={form.name} onChange={handleChange} placeholder="Full Name *" required className="input-premium" />
                <input name="email" value={form.email} onChange={handleChange} placeholder="Email Address *" required type="email" className="input-premium" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone Number *" required className="input-premium" />
                <select name="position" value={form.position} onChange={handleChange} required className="input-premium text-muted-foreground">
                  <option value="">Select Position *</option>
                  <option>Installation Engineer</option>
                  <option>Service Technician</option>
                  <option>Sales Executive</option>
                  <option>Project Manager</option>
                  <option>Other</option>
                </select>
              </div>
              <input name="experience" value={form.experience} onChange={handleChange} placeholder="Years of Experience" className="w-full input-premium" />
              <textarea name="about" value={form.about} onChange={handleChange} placeholder="Tell us about yourself..." rows={4} className="w-full input-premium resize-none" />
              <div className="border-2 border-dashed border-border/50 rounded-xl p-6 text-center bg-secondary/10 relative">
                <p className="text-muted-foreground text-sm mb-2">{file ? file.name : "Upload Resume (PDF/DOC) *"}</p>
                <label className="inline-block px-6 py-2 rounded-xl bg-secondary/30 text-foreground text-sm font-medium cursor-pointer hover:bg-primary/10 transition-all duration-300 border border-border/50">
                  {file ? "Change File" : "Choose File"}
                  <input type="file" accept=".pdf,.doc,.docx" onChange={handleFileChange} className="hidden" />
                </label>
              </div>
              <button disabled={loading} type="submit" className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-gold-light text-primary-foreground py-3.5 rounded-xl font-semibold text-sm transition-all duration-300 hover:shadow-[0_0_30px_hsl(43_66%_52%/0.3)] hover:scale-[1.02] active:scale-100 disabled:opacity-50 disabled:cursor-not-allowed">
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Submit Application"}
              </button>
            </form>
          </GlassCard>
        </div>
      </section>

      <CTABanner variant="whatsapp" />
    </>
  );
};

export default Careers;
