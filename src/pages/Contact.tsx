import { PageHero, SectionHeading, GlassCard } from "@/components/ui/shared";
import { Phone, Mail, MapPin, Globe, Clock } from "lucide-react";

const Contact = () => (
  <>
    <PageHero badge="Contact" title="Get In Touch" subtitle="Ready to elevate your building? Reach out for a free consultation and site inspection." />

    <section className="py-20 border-t border-border">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <div className="space-y-6">
            <SectionHeading badge="Reach Us" title="Contact Information" center={false} />
            {[
              { icon: <Phone className="w-5 h-5" />, title: "Phone", info: "+91 9844002026\n+91 6384961909" },
              { icon: <Mail className="w-5 h-5" />, title: "Email", info: "info@xelevators.in" },
              { icon: <Globe className="w-5 h-5" />, title: "Website", info: "xelevators.in" },
              { icon: <MapPin className="w-5 h-5" />, title: "Locations", info: "Bangalore & Chennai, India" },
              { icon: <Clock className="w-5 h-5" />, title: "Business Hours", info: "Mon - Sat: 9:00 AM - 6:00 PM" },
            ].map((c, i) => (
              <GlassCard key={i} className="p-5 flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">{c.icon}</div>
                <div>
                  <h4 className="text-foreground font-semibold text-sm mb-1">{c.title}</h4>
                  <p className="text-muted-foreground text-sm whitespace-pre-line">{c.info}</p>
                </div>
              </GlassCard>
            ))}
          </div>

          <div>
            <SectionHeading badge="Write to Us" title="Send a Message" center={false} />
            <GlassCard className="p-8" hover={false}>
              <form className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <input placeholder="Full Name" className="bg-secondary/50 border border-border rounded-lg px-4 py-3 text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors" />
                  <input placeholder="Phone Number" className="bg-secondary/50 border border-border rounded-lg px-4 py-3 text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors" />
                </div>
                <input placeholder="Email Address" className="w-full bg-secondary/50 border border-border rounded-lg px-4 py-3 text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors" />
                <select className="w-full bg-secondary/50 border border-border rounded-lg px-4 py-3 text-muted-foreground text-sm focus:outline-none focus:border-primary transition-colors">
                  <option>Select Service</option>
                  <option>Residential Elevator</option>
                  <option>Commercial Elevator</option>
                  <option>Hospital Elevator</option>
                  <option>AMC Plan</option>
                  <option>Modernization</option>
                </select>
                <textarea placeholder="Your Message" rows={4} className="w-full bg-secondary/50 border border-border rounded-lg px-4 py-3 text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors resize-none" />
                <button type="button" className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-semibold text-sm hover:bg-gold-light transition-colors">
                  Send Message
                </button>
              </form>
            </GlassCard>
          </div>
        </div>
      </div>
    </section>

    <section className="py-20 border-t border-border">
      <div className="container mx-auto px-4 lg:px-8 text-center max-w-2xl">
        <SectionHeading badge="Emergency" title="24/7 Emergency Support" subtitle="For urgent elevator issues, call our emergency hotline anytime" />
        <GlassCard className="p-8 glow-gold border-primary/20">
          <Phone className="w-10 h-10 text-primary mx-auto mb-4" />
          <p className="text-gradient-gold text-3xl font-heading font-bold mb-2">+91 9844002026</p>
          <p className="text-muted-foreground text-sm mb-4">Available 24 hours a day, 7 days a week</p>
          <a href="https://wa.me/919844002026" target="_blank" rel="noopener noreferrer" className="inline-block bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold text-sm hover:bg-gold-light transition-colors">
            Chat on WhatsApp
          </a>
        </GlassCard>
      </div>
    </section>
  </>
);

export default Contact;
