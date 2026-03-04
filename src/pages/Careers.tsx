import { useState } from "react";
import { PageHero, SectionHeading, GlassCard } from "@/components/ui/shared";
import { MapPin, Clock, Briefcase } from "lucide-react";

const openings = [
  { title: "Senior Elevator Engineer", location: "Mumbai", type: "Full-time", dept: "Engineering", desc: "Lead elevator design and installation projects with 5+ years of experience in vertical transportation." },
  { title: "Service Technician", location: "Delhi NCR", type: "Full-time", dept: "Maintenance", desc: "Perform elevator maintenance, troubleshooting, and repairs across residential and commercial sites." },
  { title: "Sales Executive", location: "Bangalore", type: "Full-time", dept: "Sales", desc: "Drive business growth by acquiring new clients and managing key accounts in the elevator industry." },
  { title: "AutoCAD Designer", location: "Mumbai", type: "Full-time", dept: "Design", desc: "Create detailed elevator shaft layouts and cabin designs using AutoCAD and SolidWorks." },
  { title: "Project Manager", location: "Hyderabad", type: "Full-time", dept: "Operations", desc: "Manage end-to-end elevator installation projects, timelines, and client coordination." },
];

const Careers = () => {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", position: "", message: "" });

  return (
    <>
      <PageHero badge="Join Our Team" title="Build Your Career with Us" subtitle="Join India's fastest-growing elevator company and shape the future of vertical transportation." />

      <section className="py-20 border-t border-border">
        <div className="container mx-auto px-4 lg:px-8">
          <SectionHeading badge="Open Positions" title="Current Job Openings" subtitle="Explore exciting opportunities across engineering, sales, and operations" />
          <div className="space-y-4 max-w-4xl mx-auto">
            {openings.map((job, i) => (
              <GlassCard key={i} className="p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-heading font-semibold text-foreground mb-1">{job.title}</h3>
                    <div className="flex flex-wrap gap-3 text-sm">
                      <span className="flex items-center gap-1 text-muted-foreground"><MapPin className="w-3.5 h-3.5" />{job.location}</span>
                      <span className="flex items-center gap-1 text-muted-foreground"><Clock className="w-3.5 h-3.5" />{job.type}</span>
                      <span className="flex items-center gap-1 text-primary"><Briefcase className="w-3.5 h-3.5" />{job.dept}</span>
                    </div>
                    <p className="text-muted-foreground text-sm mt-2">{job.desc}</p>
                  </div>
                  <button
                    onClick={() => {
                      setFormData(prev => ({ ...prev, position: job.title }));
                      document.getElementById("apply-form")?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="shrink-0 bg-primary/10 text-primary px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-primary hover:text-primary-foreground transition-all"
                  >
                    Apply Now
                  </button>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      <section id="apply-form" className="py-20 border-t border-border">
        <div className="container mx-auto px-4 lg:px-8 max-w-2xl">
          <SectionHeading badge="Apply" title="Submit Your Application" subtitle="Fill in your details and we'll get back to you" />
          <GlassCard className="p-8" hover={false}>
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="bg-secondary/50 border border-border rounded-lg px-4 py-3 text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                />
                <input
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  className="bg-secondary/50 border border-border rounded-lg px-4 py-3 text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                />
              </div>
              <input
                placeholder="Phone Number"
                value={formData.phone}
                onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                className="w-full bg-secondary/50 border border-border rounded-lg px-4 py-3 text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
              />
              <select
                value={formData.position}
                onChange={(e) => setFormData(prev => ({ ...prev, position: e.target.value }))}
                className="w-full bg-secondary/50 border border-border rounded-lg px-4 py-3 text-muted-foreground text-sm focus:outline-none focus:border-primary transition-colors"
              >
                <option value="">Select Position</option>
                {openings.map((j) => <option key={j.title} value={j.title}>{j.title}</option>)}
              </select>
              <textarea
                placeholder="Why do you want to join X Elevators?"
                value={formData.message}
                onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                rows={4}
                className="w-full bg-secondary/50 border border-border rounded-lg px-4 py-3 text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors resize-none"
              />
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
