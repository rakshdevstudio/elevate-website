import { PageHero, SectionHeading, GlassCard, SectionDivider, ScrollReveal } from "@/components/ui/shared";
import { Phone, Mail, MapPin, Globe, Clock, Headphones, MessageSquare, Send, PhoneCall } from "lucide-react";

const Contact = () => (
  <>
    <PageHero badge="Contact" title="Get In Touch" subtitle="Ready to elevate your building? Reach out for a free consultation and site inspection." backgroundImage="/images/hero-contact.webp" />

    <section className="py-24 lg:py-32 relative">
      <SectionDivider />
      <div className="container mx-auto px-4 lg:px-8 pt-8 max-w-5xl">
        <ScrollReveal>
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-extrabold text-foreground mb-6 tracking-tight">Let's Discuss Your Project</h2>
            <p className="text-muted-foreground text-base lg:text-lg leading-relaxed max-w-3xl opacity-80">
              Whether you're building a new structure or modernizing existing elevators, we're here to help. Fill out the form and our team will get back to you within 24 hours with a customized solution.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-20">
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

    <section className="py-24 lg:py-32 section-glow relative">
      <SectionDivider />
      <div className="container mx-auto px-4 lg:px-8 pt-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 max-w-6xl mx-auto">
          <ScrollReveal direction="left">
            <div>
              <h3 className="text-2xl lg:text-3xl font-heading font-bold text-foreground mb-2">Request a Quote</h3>
              <p className="text-muted-foreground text-sm mb-8 opacity-70">Fill out the form below and we'll get back to you within 24 hours.</p>
              <GlassCard className="p-8 lg:p-10 relative overflow-hidden" hover={false} premium>
                <div className="absolute inset-0 bg-gradient-to-br from-primary/3 via-transparent to-primary/2 pointer-events-none" />
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/5 rounded-full blur-[60px] pointer-events-none" />
                <form className="space-y-5 relative z-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-foreground text-sm font-medium mb-2">Full Name <span className="text-primary">*</span></label>
                      <input placeholder="John Doe" className="w-full input-premium" />
                    </div>
                    <div>
                      <label className="block text-foreground text-sm font-medium mb-2">Phone Number <span className="text-primary">*</span></label>
                      <input placeholder="+91 98765 43210" className="w-full input-premium" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-foreground text-sm font-medium mb-2">Email Address <span className="text-primary">*</span></label>
                      <input placeholder="john@company.com" type="email" className="w-full input-premium" />
                    </div>
                    <div>
                      <label className="block text-foreground text-sm font-medium mb-2">Company Name</label>
                      <input placeholder="Your Company" className="w-full input-premium" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    <div>
                      <label className="block text-foreground text-sm font-medium mb-2">Elevator Type</label>
                      <select className="w-full input-premium text-muted-foreground/60">
                        <option>Select type</option>
                        <option>Residential</option>
                        <option>Commercial</option>
                        <option>Hospital</option>
                        <option>Capsule</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-foreground text-sm font-medium mb-2">Number of Floors</label>
                      <select className="w-full input-premium text-muted-foreground/60">
                        <option>Floors</option>
                        <option>2-3 Floors</option>
                        <option>4-6 Floors</option>
                        <option>7-10 Floors</option>
                        <option>10+ Floors</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-foreground text-sm font-medium mb-2">Building Type</label>
                      <select className="w-full input-premium text-muted-foreground/60">
                        <option>Type</option>
                        <option>Residential</option>
                        <option>Commercial</option>
                        <option>Hospital</option>
                        <option>Hotel</option>
                        <option>Industrial</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-foreground text-sm font-medium mb-2">Project Details</label>
                    <textarea placeholder="Tell us about your project requirements, timeline, budget, or any specific needs..." rows={5} className="w-full input-premium resize-none" />
                  </div>
                  <button type="button" className="w-full bg-gradient-to-r from-primary to-gold-light text-primary-foreground py-4 rounded-xl font-semibold text-base transition-all duration-300 hover:shadow-[0_0_40px_hsl(43_66%_52%/0.35)] hover:scale-[1.02] active:scale-100 btn-glow flex items-center justify-center gap-2">
                    <Send className="w-4 h-4" /> Submit Request
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
                { icon: <Clock className="w-5 h-5" />, title: "Business Hours", info: "Mon - Sat: 9:00 AM - 6:00 PM" },
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

    <section className="py-24 lg:py-32 relative">
      <SectionDivider />
      <div className="container mx-auto px-4 lg:px-8 max-w-4xl pt-8">
        <ScrollReveal>
          <div className="relative rounded-2xl overflow-hidden p-8 lg:p-12" style={{ background: 'linear-gradient(160deg, hsl(212 50% 14% / 0.7) 0%, hsl(212 48% 10% / 0.5) 100%)' }}>
            <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/5 rounded-full blur-[80px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-red-500/4 rounded-full blur-[60px] pointer-events-none" />
            <div className="absolute inset-0 border border-red-500/10 rounded-2xl pointer-events-none" />
            <div className="flex items-start gap-5 mb-8 relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-red-500/15 flex items-center justify-center shrink-0">
                <PhoneCall className="w-7 h-7 text-red-400" />
              </div>
              <div>
                <h3 className="text-2xl lg:text-3xl font-heading font-bold text-foreground mb-2">24/7 Emergency Support</h3>
                <p className="text-muted-foreground text-sm opacity-80">Elevator stuck? Call us immediately!</p>
              </div>
            </div>
            <a href="tel:+916384961909" className="relative z-10 flex items-center justify-center gap-3 w-full py-4 rounded-xl bg-red-500 hover:bg-red-600 text-white font-semibold text-base transition-all duration-300 hover:shadow-[0_0_30px_hsl(0_80%_50%/0.3)] hover:scale-[1.02] active:scale-100">
              <PhoneCall className="w-5 h-5" /> Call Emergency: +91 6384961909
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  </>
);

export default Contact;
