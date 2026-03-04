import { PageHero, SectionHeading, GlassCard } from "@/components/ui/shared";
import { Phone, Mail, MapPin, Clock, AlertTriangle } from "lucide-react";

const Contact = () => (
  <>
    <PageHero badge="Contact Us" title="Let's Connect" subtitle="Have a question or ready to start your project? We'd love to hear from you." />

    <section className="py-20 border-t border-border">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto mb-16">
          {[
            { icon: <Phone className="w-6 h-6" />, title: "Phone", info: "+91 123 456 7890", sub: "Mon-Sat, 9AM-7PM" },
            { icon: <Mail className="w-6 h-6" />, title: "Email", info: "info@xelevators.com", sub: "We reply within 24hrs" },
            { icon: <MapPin className="w-6 h-6" />, title: "Office", info: "Mumbai, Maharashtra", sub: "123 Elevator Tower" },
            { icon: <Clock className="w-6 h-6" />, title: "Hours", info: "Mon - Sat", sub: "9:00 AM - 7:00 PM" },
          ].map((c, i) => (
            <GlassCard key={i} className="p-6 text-center">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mx-auto mb-3">{c.icon}</div>
              <h4 className="text-foreground font-heading font-semibold mb-1">{c.title}</h4>
              <p className="text-foreground text-sm font-medium">{c.info}</p>
              <p className="text-muted-foreground text-xs mt-1">{c.sub}</p>
            </GlassCard>
          ))}
        </div>

        <div className="max-w-3xl mx-auto">
          <SectionHeading badge="Enquiry" title="Send Us a Message" subtitle="Fill out the form and our team will get back to you shortly" />
          <GlassCard className="p-8" hover={false}>
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input placeholder="Full Name" className="bg-secondary/50 border border-border rounded-lg px-4 py-3 text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors" />
                <input placeholder="Phone Number" className="bg-secondary/50 border border-border rounded-lg px-4 py-3 text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors" />
              </div>
              <input placeholder="Email Address" className="w-full bg-secondary/50 border border-border rounded-lg px-4 py-3 text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors" />
              <select className="w-full bg-secondary/50 border border-border rounded-lg px-4 py-3 text-muted-foreground text-sm focus:outline-none focus:border-primary transition-colors">
                <option>I'm interested in...</option>
                <option>Residential Elevator</option>
                <option>Commercial Elevator</option>
                <option>AMC Plan</option>
                <option>Modernization</option>
                <option>Other</option>
              </select>
              <input placeholder="City / Location" className="w-full bg-secondary/50 border border-border rounded-lg px-4 py-3 text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors" />
              <textarea placeholder="Tell us about your project..." rows={5} className="w-full bg-secondary/50 border border-border rounded-lg px-4 py-3 text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors resize-none" />
              <button type="button" className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-semibold text-sm hover:bg-gold-light transition-colors">
                Submit Enquiry
              </button>
            </form>
          </GlassCard>
        </div>
      </div>
    </section>

    <section className="py-20 border-t border-border">
      <div className="container mx-auto px-4 lg:px-8 text-center max-w-2xl">
        <SectionHeading badge="Emergency" title="24/7 Emergency Helpline" subtitle="Elevator stuck? Need urgent assistance? Call our emergency line anytime." />
        <GlassCard className="p-8 glow-gold-strong border-primary/20">
          <AlertTriangle className="w-10 h-10 text-primary mx-auto mb-4" />
          <p className="text-gradient-gold text-4xl font-heading font-bold mb-2">+91 123 456 7890</p>
          <p className="text-muted-foreground text-sm">Our emergency team responds within 30 minutes</p>
        </GlassCard>
      </div>
    </section>
  </>
);

export default Contact;
