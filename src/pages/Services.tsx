import { Link } from "react-router-dom";
import { PageHero, SectionHeading, GlassCard, SectionDivider, ScrollReveal } from "@/components/ui/shared";
import { Wrench, Shield, Zap, Clock, CheckCircle2, Phone, Award, Timer, UserCheck, FileText, RefreshCw } from "lucide-react";

const whyChoose = [
  { icon: <Shield className="w-7 h-7" />, title: "ISO Certified", desc: "Quality assured with international standards" },
  { icon: <Clock className="w-7 h-7" />, title: "<60 Min Response", desc: "Emergency response within 60 minutes" },
  { icon: <Wrench className="w-7 h-7" />, title: "Certified Technicians", desc: "Factory-trained and certified professionals" },
  { icon: <FileText className="w-7 h-7" />, title: "Digital Reports", desc: "Real-time service tracking via WhatsApp" },
  { icon: <RefreshCw className="w-7 h-7" />, title: "Preventive Care", desc: "Automated reminders and scheduled maintenance" },
];

const amcPlans = [
  { name: "Silver", price: "₹20,000/yr", features: ["Bimonthly maintenance", "Safety inspection", "Phone support (business hrs)", "Parts at additional cost", "48hr response time"], color: "" },
  { name: "Gold", price: "₹35,000/yr", features: ["Monthly maintenance", "Preventive maintenance", "24/7 emergency support", "20% parts discount", "24hr response time"], color: "border-primary/25 glow-gold-strong", popular: true },
  { name: "Platinum", price: "₹70,000/yr", features: ["Fortnightly maintenance", "Full preventive maintenance", "24/7 priority support", "Free parts replacement", "4hr emergency response"], color: "" },
];

const Services = () => (
  <>
    <PageHero badge="Our Services" title="Our Services" subtitle="Comprehensive elevator solutions from installation to lifetime maintenance — engineered for safety, performance, and peace of mind." />

    <section className="py-20 relative">
      <SectionDivider />
      <div className="container mx-auto px-4 lg:px-8 max-w-4xl pt-8">
        <SectionHeading badge="Philosophy" title="Our Service Philosophy" />
        <GlassCard className="p-8 text-center" premium>
          <p className="text-muted-foreground text-base leading-relaxed italic">
            "We don't just fix elevators — we predict issues before they happen and communicate clearly at every step. Our service philosophy is built on proactive maintenance, digital transparency, and a genuine commitment to your safety and satisfaction."
          </p>
        </GlassCard>
      </div>
    </section>

    {/* Why Choose X Elevators - 5 columns matching reference */}
    <section className="py-24 lg:py-32 relative">
      <SectionDivider />
      <div className="container mx-auto px-4 lg:px-8 pt-8">
        <SectionHeading title="Why Choose X Elevators?" />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-10 max-w-6xl mx-auto">
          {whyChoose.map((item, i) => (
            <ScrollReveal key={i} delay={i * 0.08}>
              <div className="flex flex-col items-center text-center group">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/15 to-primary/5 flex items-center justify-center text-primary mb-5 group-hover:from-primary/25 group-hover:to-primary/10 transition-all duration-300 icon-glow">
                  {item.icon}
                </div>
                <h3 className="text-base lg:text-lg font-heading font-bold text-foreground mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed opacity-75">{item.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>

    {/* AMC Plans */}
    <section className="py-24 lg:py-32 section-glow relative">
      <SectionDivider />
      <div className="container mx-auto px-4 lg:px-8 pt-8 relative z-10">
        <SectionHeading badge="AMC Plans" title="Annual Maintenance Contract Plans" subtitle="Choose a plan that fits your needs and budget" />
        <div className="grid md:grid-cols-3 gap-8 lg:gap-10 max-w-5xl mx-auto">
          {amcPlans.map((p, i) => (
            <GlassCard key={i} className={`p-8 lg:p-10 text-center relative overflow-hidden ${p.color}`} premium={!!p.popular} delay={i * 0.1} tilt>
              {p.popular && (
                <>
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
                  <span className="relative inline-block px-4 py-1.5 rounded-full bg-primary/12 text-primary text-xs font-semibold mb-4 border border-primary/15">Best Value</span>
                </>
              )}
              <h3 className="text-xl lg:text-2xl font-heading font-bold text-foreground mb-3 relative">{p.name}</h3>
              <p className="text-gradient-gold text-3xl lg:text-4xl font-heading font-extrabold mb-8 relative">{p.price}</p>
              <ul className="space-y-3.5 mb-8 relative">
                {p.features.map((f) => (
                  <li key={f} className="text-muted-foreground text-sm flex items-center gap-2.5 justify-center">
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0" /> {f}
                  </li>
                ))}
              </ul>
              <Link to="/contact" className="relative block w-full py-3.5 rounded-xl bg-primary/10 text-primary font-semibold text-sm hover:bg-gradient-to-r hover:from-primary hover:to-gold-light hover:text-primary-foreground transition-all duration-300 hover:shadow-[0_0_30px_hsl(43_66%_52%/0.25)]">
                Get Started
              </Link>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>

    {/* Additional Services */}
    <section className="py-24 lg:py-32 relative">
      <SectionDivider />
      <div className="container mx-auto px-4 lg:px-8 pt-8 relative z-10">
        <SectionHeading badge="More Services" title="Additional Services" />
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-4xl mx-auto">
          <GlassCard className="p-7" premium tilt>
            <div className="flex gap-4 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center text-primary shrink-0 icon-glow">
                <Wrench className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-heading font-semibold text-foreground mb-1">Maintenance & AMC</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4 opacity-75">Comprehensive maintenance services to keep your elevator running at peak performance.</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2.5">
              {["Preventive Maintenance", "Breakdown Repairs", "Safety Audits", "Parts Replacement", "Lubrication Service", "Performance Testing"].map((f) => (
                <div key={f} className="flex items-center gap-2 text-muted-foreground text-xs">
                  <CheckCircle2 className="w-3 h-3 text-primary shrink-0" /> {f}
                </div>
              ))}
            </div>
          </GlassCard>

          <GlassCard className="p-7" premium delay={0.1} tilt>
            <div className="flex gap-4 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center text-primary shrink-0 icon-glow">
                <Zap className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-heading font-semibold text-foreground mb-1">Modernization</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4 opacity-75">Upgrade outdated elevators with modern controls, energy-efficient drives, and contemporary designs.</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2.5">
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

    {/* Emergency Support */}
    <section className="py-24 lg:py-32 section-glow relative">
      <SectionDivider />
      <div className="container mx-auto px-4 lg:px-8 text-center max-w-2xl pt-8 relative z-10">
        <SectionHeading badge="Emergency" title="24/7 Emergency Support" subtitle="Our emergency response team is always ready to help" />
        <GlassCard className="p-10 border-primary/20 glow-gold-strong relative overflow-hidden" premium>
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
          <Phone className="w-10 h-10 text-primary mx-auto mb-4 relative z-10" />
          <p className="text-gradient-gold text-3xl lg:text-4xl font-heading font-extrabold mb-2 text-shadow-glow relative z-10">+91 9844002026</p>
          <p className="text-muted-foreground text-sm relative z-10 opacity-75">Available 24 hours a day, 7 days a week</p>
        </GlassCard>
      </div>
    </section>
  </>
);

export default Services;
