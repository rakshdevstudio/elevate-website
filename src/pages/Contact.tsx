import { useState } from "react";
import { PageHero, SectionHeading, GlassCard, SectionDivider, ScrollReveal } from "@/components/ui/shared";
import { Phone, Mail, MapPin, Globe, Clock, Headphones, MessageSquare, Send, PhoneCall } from "lucide-react";
import { submitLead, SUCCESS_MESSAGE } from "@/lib/submitLead";
import { toast } from "@/hooks/use-toast";
import BrochureDownload from "@/components/BrochureDownload";
import { TrustBadges } from "@/components/CTABanner";

const Contact = () => {
  const [form, setForm] = useState({
    name: "", phone: "", email: "", company_name: "",
    elevator_type: "", number_of_floors: "", building_type: "", message: "", address: "",
  });
  const [budget, setBudget] = useState(15);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim() || !form.email.trim()) {
      toast({ title: "Please fill required fields", description: "Name, phone and email are required.", variant: "destructive" });
      return;
    }
    setSubmitting(true);
    try {
      const { success, error } = await submitLead({
        name: form.name,
        phone: form.phone,
        email: form.email,
        company_name: form.company_name,
        elevator_type: form.elevator_type,
        number_of_floors: form.number_of_floors,
        building_type: form.building_type,
        message: form.message,
        address: form.address,
        budget_range: budget,
        lead_source: "website_form",
      });
      if (!success) {
        toast({ title: "Submission failed", description: error, variant: "destructive" });
      } else {
        toast({ title: "✅ Thank You!", description: SUCCESS_MESSAGE });
        setForm({ name: "", phone: "", email: "", company_name: "", elevator_type: "", number_of_floors: "", building_type: "", message: "", address: "" });
        setBudget(15);
      }
    } catch {
      toast({ title: "Unexpected error", description: "Please try again later.", variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <PageHero title="Get In Touch" subtitle="Transform your vertical mobility vision into reality. Partner with our experts for a comprehensive, no-obligation site evaluation and tailored elevator strategy." backgroundImage="/images/hero-contact.webp" />

      <TrustBadges />

      <section className="py-10 md:py-16 relative">
        <SectionDivider />
        <div className="container mx-auto px-6 pt-8 max-w-5xl">
          <ScrollReveal>
            <div className="mb-8">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-extrabold text-foreground mb-6 tracking-tight">Let's Discuss About Your Project</h2>
              <p className="text-muted-foreground text-base lg:text-lg leading-relaxed max-w-3xl opacity-80">
                Whether you're building a new structure or modernizing existing elevators, we're here to help. Fill out the form and our team will get back to you within 24 hours with a customized solution.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8 mb-10 md:mb-12">
            {[
              { icon: <Clock className="w-7 h-7" />, title: "<60 Min Response", desc: "Emergency support" },
              { icon: <Headphones className="w-7 h-7" />, title: "24/7 Helpline", desc: "Always available" },
              { icon: <MessageSquare className="w-7 h-7" />, title: "WhatsApp Support", desc: "Quick responses" },
            ].map((item, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/15 to-primary/5 flex items-center justify-center text-primary mb-4 icon-glow">
                    {item.icon}
                  </div>
                  <h3 className="text-foreground font-heading font-bold text-base mb-1">{item.title}</h3>
                  <p className="text-muted-foreground text-sm opacity-70">{item.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-10 md:py-16 section-glow relative">
        <SectionDivider />
        <div className="container mx-auto px-6 pt-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-6 md:gap-8 max-w-6xl mx-auto">
            <ScrollReveal direction="left">
              <div>
                <h3 className="text-2xl lg:text-3xl font-heading font-bold text-foreground mb-2">Request a Quote</h3>
                <p className="text-muted-foreground text-sm mb-8 opacity-70">Fill out the form below and we'll get back to you within 24 hours.</p>
                <GlassCard className="p-8 lg:p-10 relative overflow-hidden" hover={false} premium>
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/3 via-transparent to-primary/2 pointer-events-none" />
                  <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/5 rounded-full blur-[60px] pointer-events-none" />
                  <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-foreground text-sm font-medium mb-2">Full Name <span className="text-primary">*</span></label>
                        <input name="name" value={form.name} onChange={handleChange} placeholder="John Doe" className="w-full input-premium" required />
                      </div>
                      <div>
                        <label className="block text-foreground text-sm font-medium mb-2">Phone Number <span className="text-primary">*</span></label>
                        <input name="phone" value={form.phone} onChange={handleChange} placeholder="+91 98765 43210" className="w-full input-premium" required />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-foreground text-sm font-medium mb-2">Email Address <span className="text-primary">*</span></label>
                        <input name="email" value={form.email} onChange={handleChange} placeholder="john@company.com" type="email" className="w-full input-premium" required />
                      </div>
                      <div>
                        <label className="block text-foreground text-sm font-medium mb-2">Company Name</label>
                        <input name="company_name" value={form.company_name} onChange={handleChange} placeholder="Your Company" className="w-full input-premium" />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                      <div>
                        <label className="block text-foreground text-sm font-medium mb-2">Elevator Type</label>
                        <select name="elevator_type" value={form.elevator_type} onChange={handleChange} className="w-full input-premium text-muted-foreground/60">
                          <option value="">Select type</option>
                          <option value="Residential">Residential</option>
                          <option value="Commercial">Commercial</option>
                          <option value="Hospital">Hospital</option>
                          <option value="Capsule">Capsule</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-foreground text-sm font-medium mb-2">Number of Floors</label>
                        <select name="number_of_floors" value={form.number_of_floors} onChange={handleChange} className="w-full input-premium text-muted-foreground/60">
                          <option value="">Floors</option>
                          <option value="2-3 Floors">2-3 Floors</option>
                          <option value="4-6 Floors">4-6 Floors</option>
                          <option value="7-10 Floors">7-10 Floors</option>
                          <option value="10+ Floors">10+ Floors</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-foreground text-sm font-medium mb-2">Building Type</label>
                        <select name="building_type" value={form.building_type} onChange={handleChange} className="w-full input-premium text-muted-foreground/60">
                          <option value="">Type</option>
                          <option value="Residential">Residential</option>
                          <option value="Commercial">Commercial</option>
                          <option value="Hospital">Hospital</option>
                          <option value="Hotel">Hotel</option>
                          <option value="Industrial">Industrial</option>
                        </select>
                      </div>
                    </div>
                    <div className="space-y-5">
                      <div>
                        <label className="block text-foreground text-sm font-medium mb-2">Address</label>
                        <input name="address" value={form.address} onChange={handleChange} placeholder="Your site / building address" className="w-full input-premium" />
                      </div>
                      <div>
                        <label className="block text-foreground text-sm font-medium mb-2">Budget Range</label>
                        <div className="px-1">
                          <input
                            type="range"
                            min="5"
                            max="50"
                            step="1"
                            value={budget}
                            onChange={(e) => setBudget(Number(e.target.value))}
                            className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-white/10"
                            style={{ accentColor: "hsl(43 66% 52%)" }}
                          />
                          <div className="flex justify-between items-center mt-2">
                            <span className="text-muted-foreground/50 text-xs">₹5 Lakhs</span>
                            <span className="text-primary font-semibold text-sm">Selected: ₹{budget} Lakhs</span>
                            <span className="text-muted-foreground/50 text-xs">₹50 Lakhs</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <label className="block text-foreground text-sm font-medium mb-2">Project Details</label>
                      <textarea name="message" value={form.message} onChange={handleChange} placeholder="Tell us about your project requirements, timeline, or any specific needs..." rows={4} className="w-full input-premium resize-none" />
                    </div>
                    <button type="submit" disabled={submitting} className="w-full bg-gradient-to-r from-primary to-gold-light text-primary-foreground py-4 rounded-xl font-semibold text-base transition-all duration-300 hover:shadow-[0_0_40px_hsl(43_66%_52%/0.35)] hover:scale-[1.02] active:scale-100 btn-glow flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
                      <Send className="w-4 h-4" /> {submitting ? "Submitting..." : "Submit Request"}
                    </button>
                    <p className="text-muted-foreground/50 text-xs text-center">By submitting, you agree to our privacy policy. No spam, ever.</p>
                  </form>
                </GlassCard>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right">
              <div className="space-y-6">
                <SectionHeading badge="Reach Us" title="Contact Information" center={false} />
                {[
                  { icon: <Phone className="w-5 h-5" />, title: "Phone", info: "+91 9844002026\n+91 6384961909" },
                  { icon: <Mail className="w-5 h-5" />, title: "Email", info: "info@xelevators.in" },
                  { icon: <Globe className="w-5 h-5" />, title: "Website", info: "xelevators.in" },
                  { icon: <MapPin className="w-5 h-5" />, title: "Locations", info: "Bangalore & Chennai, India" },
                ].map((c, i) => (
                  <GlassCard key={i} className="p-6 flex items-start gap-5" premium delay={i * 0.06} tilt>
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center text-primary shrink-0 icon-glow">{c.icon}</div>
                    <div>
                      <h4 className="text-foreground font-semibold text-sm mb-1.5">{c.title}</h4>
                      <p className="text-muted-foreground text-sm whitespace-pre-line opacity-80">{c.info}</p>
                    </div>
                  </GlassCard>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <BrochureDownload />

      <section className="py-10 md:py-16 relative">
        <SectionDivider />
        <div className="container mx-auto px-6 max-w-3xl pt-8">
          <ScrollReveal>
            <div className="relative rounded-2xl overflow-hidden p-6 lg:p-8" style={{ background: 'linear-gradient(160deg, hsl(212 50% 14% / 0.7) 0%, hsl(212 48% 10% / 0.5) 100%)' }}>
              <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/5 rounded-full blur-[80px] pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-red-500/4 rounded-full blur-[60px] pointer-events-none" />
              <div className="absolute inset-0 border border-red-500/10 rounded-2xl pointer-events-none" />
              <div className="flex flex-col sm:flex-row items-center gap-6 mb-8 relative z-10 text-center sm:text-left">
                <div className="w-16 h-16 rounded-2xl bg-red-500/15 flex items-center justify-center shrink-0">
                  <PhoneCall className="w-8 h-8 text-red-400" />
                </div>
                <div>
                  <h3 className="text-2xl font-heading font-bold text-foreground mb-2">Available 24/7 for Sales and HR Queries</h3>
                  <p className="text-muted-foreground text-sm opacity-80 max-w-lg">Contact our team anytime for sales inquiries, service information, or HR-related support. We are available 24/7 to assist you.</p>
                </div>
              </div>
              <a href="tel:+916384961909" className="relative z-10 flex items-center justify-center gap-2 max-w-xs mx-auto py-3.5 rounded-xl bg-red-500 hover:bg-red-600 text-white font-semibold text-base transition-all duration-300 hover:shadow-[0_0_30px_hsl(0_80%_50%/0.3)] hover:scale-[1.02] active:scale-100">
                <PhoneCall className="w-4 h-4" /> Call Now
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
};

export default Contact;
