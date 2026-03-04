import { useState } from "react";
import { PageHero, SectionHeading, GlassCard } from "@/components/ui/shared";
import { Briefcase, MapPin, Clock, TrendingUp, Users, BookOpen } from "lucide-react";

const cultureCards = [
  { icon: <TrendingUp className="w-6 h-6" />, title: "Growth", desc: "We invest in your career growth with training programs, certifications, and clear advancement paths." },
  { icon: <Users className="w-6 h-6" />, title: "Team Culture", desc: "Collaborative and supportive work environment where every team member's contribution is valued." },
  { icon: <BookOpen className="w-6 h-6" />, title: "Learning", desc: "Continuous learning opportunities with access to the latest elevator technology and industry best practices." },
];

const openings = [
  { title: "Installation Engineer", dept: "Operations", location: "Bangalore & Chennai", type: "Full-time" },
  { title: "Service Technician", dept: "Maintenance", location: "Chennai", type: "Full-time" },
  { title: "Sales Executive", dept: "Sales", location: "Bangalore & Chennai", type: "Full-time" },
];

const Careers = () => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", position: "", experience: "", about: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <>
      <PageHero badge="Careers" title="Join Our Team" subtitle="Build your career with one of India's fastest-growing elevator companies. We're looking for passionate individuals who share our commitment to excellence." />

      <section className="py-20 border-t border-border">
        <div className="container mx-auto px-4 lg:px-8">
          <SectionHeading badge="Culture" title="Why Work With Us" />
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {cultureCards.map((c, i) => (
              <GlassCard key={i} className="p-6 text-center">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mx-auto mb-4">{c.icon}</div>
                <h3 className="text-lg font-heading font-semibold text-foreground mb-2">{c.title}</h3>
                <p className="text-muted-foreground text-sm">{c.desc}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 border-t border-border">
        <div className="container mx-auto px-4 lg:px-8">
          <SectionHeading badge="Openings" title="Current Openings" subtitle="Explore available positions and find your perfect role" />
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {openings.map((job, i) => (
              <GlassCard key={i} className="p-6">
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
                <a href="#apply" className="block w-full py-2.5 rounded-lg bg-primary/10 text-primary font-semibold text-sm hover:bg-primary hover:text-primary-foreground transition-all text-center">
                  Apply Now
                </a>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      <section id="apply" className="py-20 border-t border-border">
        <div className="container mx-auto px-4 lg:px-8 max-w-2xl">
          <SectionHeading badge="Apply" title="Apply Now" subtitle="Fill in your details and we'll get back to you" />
          <GlassCard className="p-8" hover={false}>
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input name="name" value={form.name} onChange={handleChange} placeholder="Full Name" className="bg-secondary/50 border border-border rounded-lg px-4 py-3 text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors" />
                <input name="email" value={form.email} onChange={handleChange} placeholder="Email Address" type="email" className="bg-secondary/50 border border-border rounded-lg px-4 py-3 text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone Number" className="bg-secondary/50 border border-border rounded-lg px-4 py-3 text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors" />
                <select name="position" value={form.position} onChange={handleChange} className="bg-secondary/50 border border-border rounded-lg px-4 py-3 text-muted-foreground text-sm focus:outline-none focus:border-primary transition-colors">
                  <option value="">Select Position</option>
                  <option>Installation Engineer</option>
                  <option>Service Technician</option>
                  <option>Sales Executive</option>
                  <option>Other</option>
                </select>
              </div>
              <input name="experience" value={form.experience} onChange={handleChange} placeholder="Years of Experience" className="w-full bg-secondary/50 border border-border rounded-lg px-4 py-3 text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors" />
              <textarea name="about" value={form.about} onChange={handleChange} placeholder="Tell us about yourself..." rows={4} className="w-full bg-secondary/50 border border-border rounded-lg px-4 py-3 text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors resize-none" />
              <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                <p className="text-muted-foreground text-sm mb-2">Upload Resume (PDF/DOC)</p>
                <label className="inline-block px-6 py-2 rounded-lg bg-secondary/50 text-foreground text-sm font-medium cursor-pointer hover:bg-primary/10 transition-colors">
                  Choose File
                  <input type="file" accept=".pdf,.doc,.docx" className="hidden" />
                </label>
              </div>
              <button type="button" className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-semibold text-sm hover:bg-gold-light transition-colors">
                Submit Application
              </button>
            </form>
          </GlassCard>
        </div>
      </section>
    </>
  );
};

export default Careers;
