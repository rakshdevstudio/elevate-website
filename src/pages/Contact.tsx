import { PageHero, SectionHeading, GlassCard, SectionDivider } from "@/components/ui/shared";
import { Phone, Mail, MapPin, Globe, Clock } from "lucide-react";
import { ScrollReveal } from "@/components/ui/shared";

const Contact = () => (
  <>
    <PageHero badge="Contact" title="Get In Touch" subtitle="Ready to elevate your building? Reach out for a free consultation and site inspection." />

    <section className="py-20 section-glow relative">
      <SectionDivider />
      <div className="container mx-auto px-4 lg:px-8 pt-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <ScrollReveal direction="left">
            <div className="space-y-6">
              <SectionHeading badge="Reach Us" title="Contact Information" center={false} />
              {[
                { icon: <Phone className="w-5 h-5" />, title: "Phone", info: "+91 9844002026\n+91 6384961909" },
                { icon: <Mail className="w-5 h-5" />, title: "Email", info: "info@xelevators.in" },
                { icon: <Globe className="w-5 h-5" />, title: "Website", info: "xelevators.in" },
                { icon: <MapPin className="w-5 h-5" />, title: "Locations", info: "Bangalore & Chennai, India" },
                { icon: <Clock className="w-5 h-5" />, title: "Business Hours", info: "Mon - Sat: 9:00 AM - 6:00 PM" },
              ].map((c, i) => (
                <GlassCard key={i} className="p-5 flex items-start gap-4" premium delay={i * 0.06}>
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center text-primary shrink-0 icon-glow">{c.icon}</div>
                  <div>
                    <h4 className="text-foreground font-semibold text-sm mb-1">{c.title}</h4>
                    <p className="text-muted-foreground text-sm whitespace-pre-line">{c.info}</p>
                  </div>
                </GlassCard>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right">
            <div>
              <SectionHeading badge="Write to Us" title="Send a Message" center={false} />
              <GlassCard className="p-8 relative overflow-hidden" hover={false} premium>
                <div className="absolute inset-0 bg-gradient-to-br from-primary/3 to-transparent pointer-events-none" />
                <form className="space-y-4 relative z-10">
                  <div className="grid grid-cols-2 gap-4">
                    <input placeholder="Full Name" className="input-premium" />
                    <input placeholder="Phone Number" className="input-premium" />
                  </div>
                  <input placeholder="Email Address" className="w-full input-premium" />
                  <select className="w-full input-premium text-muted-foreground">
                    <option>Select Service</option>
                    <option>Residential Elevator</option>
                    <option>Commercial Elevator</option>
                    <option>Hospital Elevator</option>
                    <option>AMC Plan</option>
                    <option>Modernization</option>
                  </select>
                  <textarea placeholder="Your Message" rows={4} className="w-full input-premium resize-none" />
                  <button type="button" className="w-full bg-gradient-to-r from-primary to-gold-light text-primary-foreground py-3.5 rounded-xl font-semibold text-sm transition-all duration-300 hover:shadow-[0_0_30px_hsl(43_66%_52%/0.3)] hover:scale-[1.02] active:scale-100">
                    Send Message
                  </button>
                </form>
              </GlassCard>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>

    <section className="py-20 relative">
      <SectionDivider />
      <div className="container mx-auto px-4 lg:px-8 text-center max-w-2xl pt-8">
        <SectionHeading badge="Emergency" title="24/7 Emergency Support" subtitle="For urgent elevator issues, call our emergency hotline anytime" />
        <GlassCard className="p-8 border-primary/20 glow-gold-strong relative overflow-hidden" premium>
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
          <Phone className="w-10 h-10 text-primary mx-auto mb-4 relative z-10" />
          <p className="text-gradient-gold text-3xl font-heading font-bold mb-2 text-shadow-glow relative z-10">+91 9844002026</p>
          <p className="text-muted-foreground text-sm mb-4 relative z-10">Available 24 hours a day, 7 days a week</p>
          <a href="https://wa.me/919844002026" target="_blank" rel="noopener noreferrer" className="relative z-10 inline-block bg-gradient-to-r from-primary to-gold-light text-primary-foreground px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 hover:shadow-[0_0_24px_hsl(43_66%_52%/0.3)] hover:scale-105">
            Chat on WhatsApp
          </a>
        </GlassCard>
      </div>
    </section>
  </>
);

export default Contact;
