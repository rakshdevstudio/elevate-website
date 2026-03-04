import { Link } from "react-router-dom";
import { PageHero, SectionHeading, GlassCard } from "@/components/ui/shared";
import { Wrench, Shield, Zap, Clock, CheckCircle2, Phone, Award, Timer, UserCheck } from "lucide-react";

const amcPlans = [
  { name: "Silver", price: "₹20,000/yr", features: ["Bimonthly maintenance", "Safety inspection", "Phone support (business hrs)", "Parts at additional cost", "48hr response time"], color: "" },
  { name: "Gold", price: "₹35,000/yr", features: ["Monthly maintenance", "Preventive maintenance", "24/7 emergency support", "20% parts discount", "24hr response time"], color: "border-primary/30 glow-gold", popular: true },
  { name: "Platinum", price: "₹70,000/yr", features: ["Fortnightly maintenance", "Full preventive maintenance", "24/7 priority support", "Free parts replacement", "4hr emergency response"], color: "" },
];

const whyChoose = [
  { icon: <Award className="w-8 h-8" />, title: "ISO Certified", desc: "ISO 9001:2015 certified processes ensuring highest quality standards in every project." },
  { icon: <Timer className="w-8 h-8" />, title: "<60 Min Response", desc: "Our emergency response team reaches you within 60 minutes for any critical elevator issue." },
  { icon: <UserCheck className="w-8 h-8" />, title: "Certified Technicians", desc: "All our technicians are factory-trained and certified for safe and professional service." },
];

const Services = () => (
  <>
    <PageHero badge="Our Services" title="Our Services" subtitle="Comprehensive elevator solutions from installation to lifetime maintenance — engineered for safety, performance, and peace of mind." />

    <section className="py-20 border-t border-border">
      <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
        <SectionHeading badge="Philosophy" title="Our Service Philosophy" />
        <GlassCard className="p-8 text-center">
          <p className="text-muted-foreground text-base leading-relaxed italic">
            "We don't just fix elevators — we predict issues before they happen and communicate clearly at every step. Our service philosophy is built on proactive maintenance, digital transparency, and a genuine commitment to your safety and satisfaction."
          </p>
        </GlassCard>
      </div>
    </section>

    <section className="py-20 border-t border-border">
      <div className="container mx-auto px-4 lg:px-8">
        <SectionHeading badge="Why Us" title="Why Choose X Elevators?" subtitle="What sets us apart in the elevator industry" />
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {whyChoose.map((item, i) => (
            <GlassCard key={i} className="p-8 text-center">
              <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center text-primary mx-auto mb-4">{item.icon}</div>
              <h3 className="text-xl font-heading font-bold text-foreground mb-2">{item.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>

    <section className="py-20 border-t border-border">
      <div className="container mx-auto px-4 lg:px-8">
        <SectionHeading badge="AMC Plans" title="Annual Maintenance Contracts" subtitle="Choose a plan that fits your needs and budget" />
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {amcPlans.map((p, i) => (
            <GlassCard key={i} className={`p-8 text-center ${p.color}`}>
              {p.popular && <span className="inline-block px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-semibold mb-3">Best Popular</span>}
              <h3 className="text-xl font-heading font-bold text-foreground mb-2">{p.name}</h3>
              <p className="text-gradient-gold text-3xl font-heading font-bold mb-6">{p.price}</p>
              <ul className="space-y-3 mb-6">
                {p.features.map((f) => (
                  <li key={f} className="text-muted-foreground text-sm flex items-center gap-2 justify-center">
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0" /> {f}
                  </li>
                ))}
              </ul>
              <Link to="/contact" className="block w-full py-3 rounded-lg bg-primary/10 text-primary font-semibold text-sm hover:bg-primary hover:text-primary-foreground transition-all">
                Get Started
              </Link>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>

    <section className="py-20 border-t border-border">
      <div className="container mx-auto px-4 lg:px-8">
        <SectionHeading badge="More Services" title="Additional Services" />
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <GlassCard className="p-6">
            <div className="flex gap-4 mb-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                <Wrench className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-heading font-semibold text-foreground mb-1">Maintenance & AMC</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">Comprehensive maintenance services to keep your elevator running at peak performance.</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {["Preventive Maintenance", "Breakdown Repairs", "Safety Audits", "Parts Replacement", "Lubrication Service", "Performance Testing"].map((f) => (
                <div key={f} className="flex items-center gap-2 text-muted-foreground text-xs">
                  <CheckCircle2 className="w-3 h-3 text-primary shrink-0" /> {f}
                </div>
              ))}
            </div>
          </GlassCard>

          <GlassCard className="p-6">
            <div className="flex gap-4 mb-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                <Zap className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-heading font-semibold text-foreground mb-1">Modernization</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">Upgrade outdated elevators with modern controls, energy-efficient drives, and contemporary designs.</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {["Controller Upgrade", "Door Modernization", "Cabin Renovation", "Safety Enhancement", "Energy Optimization", "IoT Integration"].map((f) => (
                <div key={f} className="flex items-center gap-2 text-muted-foreground text-xs">
                  <CheckCircle2 className="w-3 h-3 text-primary shrink-0" /> {f}
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>
    </section>

    <section className="py-20 border-t border-border">
      <div className="container mx-auto px-4 lg:px-8 text-center max-w-2xl">
        <SectionHeading badge="Emergency" title="24/7 Emergency Support" subtitle="Our emergency response team is always ready to help" />
        <GlassCard className="p-8 glow-gold border-primary/20">
          <Phone className="w-10 h-10 text-primary mx-auto mb-4" />
          <p className="text-gradient-gold text-3xl font-heading font-bold mb-2">+91 9844002026</p>
          <p className="text-muted-foreground text-sm">Available 24 hours a day, 7 days a week</p>
        </GlassCard>
      </div>
    </section>
  </>
);

export default Services;
