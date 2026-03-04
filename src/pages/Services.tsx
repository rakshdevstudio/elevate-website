import { Link } from "react-router-dom";
import { PageHero, SectionHeading, GlassCard } from "@/components/ui/shared";
import { Wrench, Shield, Zap, Clock, CheckCircle2, Phone } from "lucide-react";

const amcPlans = [
  { name: "Basic AMC", price: "₹8,000/yr", features: ["2 service visits/year", "Safety inspection", "Phone support (business hrs)", "Parts at additional cost", "48hr response time"], color: "" },
  { name: "Standard AMC", price: "₹15,000/yr", features: ["4 service visits/year", "Preventive maintenance", "Priority phone support", "10% parts discount", "24hr response time"], color: "border-primary/30 glow-gold", popular: true },
  { name: "Premium AMC", price: "₹25,000/yr", features: ["Monthly service visits", "Full preventive maintenance", "24/7 emergency support", "Free parts replacement", "4hr emergency response"], color: "" },
];

const additionalServices = [
  { icon: <Zap className="w-6 h-6" />, title: "Elevator Modernization", desc: "Upgrade outdated elevators with modern controls, energy-efficient drives, and contemporary cabin designs." },
  { icon: <Shield className="w-6 h-6" />, title: "Safety Audits", desc: "Comprehensive safety assessments and compliance checks to ensure your elevator meets all regulatory standards." },
  { icon: <Clock className="w-6 h-6" />, title: "Emergency Rescue", desc: "24/7 emergency rescue and repair services with rapid response teams across all service locations." },
  { icon: <Wrench className="w-6 h-6" />, title: "Spare Parts Supply", desc: "Genuine OEM spare parts with warranty, available for all major elevator brands and models." },
];

const Services = () => (
  <>
    <PageHero badge="Our Services" title="Comprehensive Elevator Services" subtitle="From installation to lifetime maintenance, we've got every aspect of vertical transportation covered." />

    <section className="py-20 border-t border-border">
      <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
        <SectionHeading badge="Overview" title="What We Offer" subtitle="End-to-end elevator services designed to keep your building moving" />
        <div className="grid md:grid-cols-2 gap-6">
          {[
            { title: "New Installation", desc: "Complete elevator installation for new buildings including design, engineering, manufacturing, and commissioning." },
            { title: "Maintenance & Repair", desc: "Regular servicing, breakdown repairs, and preventive maintenance to keep your elevator running smoothly." },
            { title: "Modernization", desc: "Upgrade aging elevators with latest technology, improved safety features, and modern aesthetics." },
            { title: "Consultation", desc: "Expert consultation for architects and builders on elevator planning, design, and regulatory compliance." },
          ].map((s, i) => (
            <GlassCard key={i} className="p-6">
              <h3 className="text-lg font-heading font-semibold text-foreground mb-2">{s.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
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
              {p.popular && <span className="inline-block px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-semibold mb-3">Recommended</span>}
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
          {additionalServices.map((s, i) => (
            <GlassCard key={i} className="p-6 flex gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">{s.icon}</div>
              <div>
                <h3 className="text-lg font-heading font-semibold text-foreground mb-1">{s.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>

    <section className="py-20 border-t border-border">
      <div className="container mx-auto px-4 lg:px-8 text-center max-w-2xl">
        <SectionHeading badge="Emergency" title="24/7 Emergency Support" subtitle="Our emergency response team is always ready to help" />
        <GlassCard className="p-8 glow-gold border-primary/20">
          <Phone className="w-10 h-10 text-primary mx-auto mb-4" />
          <p className="text-gradient-gold text-3xl font-heading font-bold mb-2">+91 123 456 7890</p>
          <p className="text-muted-foreground text-sm">Available 24 hours a day, 7 days a week</p>
        </GlassCard>
      </div>
    </section>
  </>
);

export default Services;
