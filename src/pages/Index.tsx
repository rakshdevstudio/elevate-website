import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeading, GlassCard, StatCard, ScrollReveal, FloatingParticles, SectionDivider, StaggerContainer, StaggerChild } from "@/components/ui/shared";
import { Shield, Zap, Award, Users, Building2, Wrench, ChevronRight, CheckCircle2, Phone, Mail, MapPin, ChevronDown, PhoneCall, ArrowRight, Home, Building, Hospital, Hotel, Factory, Search, PenTool, Settings, HardHat, BadgeCheck, Send } from "lucide-react";
import { useState } from "react";

const Hero = () => (
  <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
    <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover">
      <source src="/videos/hero-bg.mp4" type="video/mp4" />
    </video>
    <div className="absolute inset-0 bg-gradient-to-b from-[hsl(213_62%_6%/0.65)] via-[hsl(213_62%_6%/0.35)] to-[hsl(213_62%_6%/0.88)]" />
    <div className="absolute inset-0 bg-gradient-to-r from-[hsl(213_62%_6%/0.4)] via-transparent to-[hsl(213_62%_6%/0.4)]" />
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_40%,hsl(43_66%_52%/0.06),transparent_70%)]" />
    <FloatingParticles count={30} />
    <div className="container mx-auto px-4 lg:px-8 relative z-10">
      <div className="max-w-5xl mx-auto text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.7 }} className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 mb-12">
          {[
            { icon: <Shield className="w-4 h-4" />, label: "ISO Certified" },
            { icon: <Award className="w-4 h-4" />, label: "Licensed Company" },
            { icon: <Zap className="w-4 h-4" />, label: "99% Automation" },
          ].map((badge, i) => (
            <motion.span key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 + i * 0.1, duration: 0.5 }} className="flex items-center gap-2 text-muted-foreground/80 text-sm font-medium px-4 py-2 rounded-full border border-foreground/8 backdrop-blur-sm bg-foreground/3">
              <span className="text-primary">{badge.icon}</span>
              {badge.label}
            </motion.span>
          ))}
        </motion.div>
        <motion.h1 initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 1, ease: [0.22, 1, 0.36, 1] }} className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-heading font-extrabold text-foreground mb-6 leading-[0.9] tracking-tight text-shadow-hero">
          Exceeding<br /><span className="text-gradient-gold">Trust</span>
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 0.7 }} className="text-xl md:text-2xl text-foreground/70 font-light mb-3 tracking-[0.1em] uppercase">Engineering the Future</motion.p>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 0.7 }} className="text-base md:text-lg text-muted-foreground/70 max-w-2xl mx-auto mb-12 leading-relaxed">
          Next-generation elevator solutions built on strong technical foundations, youthful leadership, and an uncompromising commitment to quality.
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1, duration: 0.6 }} className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/contact" className="group inline-flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-gold-light text-primary-foreground px-10 py-4 rounded-full font-semibold text-base transition-all duration-400 hover:shadow-[0_0_40px_hsl(43_66%_52%/0.4),0_0_80px_hsl(43_66%_52%/0.15)] hover:scale-105 active:scale-100 btn-glow">
            Get a Quote <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
          <a href="tel:+919844002026" className="group inline-flex items-center justify-center gap-2 border border-foreground/15 text-foreground px-10 py-4 rounded-full font-semibold text-base hover:bg-foreground/8 hover:border-foreground/25 transition-all duration-400 backdrop-blur-md">
            <PhoneCall className="w-4 h-4 group-hover:animate-pulse" /> Call Us Now
          </a>
        </motion.div>
      </div>
    </div>
    <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-background via-background/80 to-transparent" />
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }} className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
      <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} className="w-6 h-10 rounded-full border-2 border-foreground/20 flex items-start justify-center p-1.5">
        <motion.div className="w-1.5 h-1.5 rounded-full bg-primary" />
      </motion.div>
    </motion.div>
  </section>
);

const MissionVision = () => (
  <section className="py-24 lg:py-32 section-glow relative">
    <div className="container mx-auto px-4 lg:px-8 relative z-10">
      <SectionHeading badge="Who We Are" title="Our Mission & Vision" subtitle="Committed to transforming vertical mobility with innovation and safety" />
      <div className="grid md:grid-cols-2 gap-8 lg:gap-10 max-w-5xl mx-auto">
        <GlassCard className="p-8 lg:p-10" premium tilt>
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center mb-6 icon-glow"><Shield className="w-7 h-7 text-primary" /></div>
          <h3 className="text-xl lg:text-2xl font-heading font-bold text-foreground mb-4">Our Mission</h3>
          <p className="text-muted-foreground text-sm lg:text-base leading-relaxed opacity-80">To provide world-class elevator solutions that combine cutting-edge technology with uncompromising safety standards, making vertical transportation accessible and reliable for every building in India.</p>
        </GlassCard>
        <GlassCard className="p-8 lg:p-10" premium delay={0.15} tilt>
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center mb-6 icon-glow"><Zap className="w-7 h-7 text-primary" /></div>
          <h3 className="text-xl lg:text-2xl font-heading font-bold text-foreground mb-4">Our Vision</h3>
          <p className="text-muted-foreground text-sm lg:text-base leading-relaxed opacity-80">To become India's most trusted elevator brand by 2030, setting new benchmarks in design, technology, and customer satisfaction while building lasting relationships with every client.</p>
        </GlassCard>
      </div>
    </div>
  </section>
);

const ImpactMetrics = () => (
  <section className="py-24 lg:py-32 relative">
    <SectionDivider />
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_50%,hsl(43_66%_52%/0.03),transparent_70%)]" />
    <div className="container mx-auto px-4 lg:px-8 pt-8 relative z-10">
      <SectionHeading badge="Our Impact" title="Numbers That Speak" />
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 lg:gap-8 max-w-5xl mx-auto">
        <StatCard value="75+" label="Projects Installed" icon={<Building2 className="w-8 h-8" />} />
        <StatCard value="120+" label="Happy Customers" icon={<Users className="w-8 h-8" />} />
        <StatCard value="99%" label="Uptime Rate" icon={<Zap className="w-8 h-8" />} />
        <StatCard value="25+" label="Team Members" icon={<Award className="w-8 h-8" />} />
      </div>
    </div>
  </section>
);

const IndustriesServed = () => {
  const industries = [
    { icon: <Home className="w-7 h-7" />, label: "Residential Buildings", desc: "Villas, apartments & gated communities" },
    { icon: <Hospital className="w-7 h-7" />, label: "Hospitals & Healthcare", desc: "Stretcher-compatible medical elevators" },
    { icon: <Building className="w-7 h-7" />, label: "Malls & Commercial", desc: "High-traffic commercial complexes" },
    { icon: <Hotel className="w-7 h-7" />, label: "Hotels & Hospitality", desc: "Premium guest experience elevators" },
    { icon: <Factory className="w-7 h-7" />, label: "IT Parks & Offices", desc: "Smart elevators for modern workspaces" },
  ];

  return (
    <section className="py-24 lg:py-32 relative section-mesh">
      <SectionDivider />
      <div className="container mx-auto px-4 lg:px-8 pt-8 relative z-10">
        <SectionHeading badge="Industries" title="Industries We Serve" subtitle="Trusted across diverse sectors for premium vertical transportation" />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-6xl mx-auto">
          {industries.map((ind, i) => (
            <ScrollReveal key={ind.label} delay={i * 0.08}>
              <GlassCard className="p-6 text-center group" premium tilt>
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/15 to-primary/5 flex items-center justify-center text-primary mx-auto mb-4 icon-glow group-hover:from-primary/25 group-hover:to-primary/10 transition-all duration-300">
                  {ind.icon}
                </div>
                <h3 className="text-foreground text-sm font-heading font-semibold mb-1">{ind.label}</h3>
                <p className="text-muted-foreground text-xs opacity-70">{ind.desc}</p>
              </GlassCard>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

const ProcessSection = () => {
  const steps = [
    { icon: <Search className="w-6 h-6" />, title: "Site Inspection", desc: "Our engineers visit your site to assess requirements, shaft dimensions, and structural feasibility." },
    { icon: <PenTool className="w-6 h-6" />, title: "Design Planning", desc: "Custom elevator design tailored to your building's architecture, capacity needs, and aesthetic preferences." },
    { icon: <Settings className="w-6 h-6" />, title: "Manufacturing", desc: "Precision manufacturing with quality-controlled components, ready for seamless installation." },
    { icon: <HardHat className="w-6 h-6" />, title: "Installation", desc: "Professional installation by certified technicians with minimal disruption to your building operations." },
    { icon: <BadgeCheck className="w-6 h-6" />, title: "Safety Certification", desc: "Rigorous testing and government certification ensuring your elevator meets all safety standards." },
  ];

  return (
    <section className="py-24 lg:py-32 section-glow relative">
      <SectionDivider />
      <div className="container mx-auto px-4 lg:px-8 pt-8 relative z-10">
        <SectionHeading badge="Our Process" title="How Elevator Installation Works" subtitle="A streamlined 5-step process from consultation to certification" />
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 lg:gap-6">
            {steps.map((step, i) => (
              <ScrollReveal key={step.title} delay={i * 0.1}>
                <div className="relative">
                  <GlassCard className="p-6 text-center relative overflow-hidden group" premium tilt>
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="text-primary/30 font-heading font-extrabold text-4xl absolute top-3 right-3">
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center text-primary mx-auto mb-4 icon-glow">
                      {step.icon}
                    </div>
                    <h3 className="text-foreground text-sm font-heading font-semibold mb-2">{step.title}</h3>
                    <p className="text-muted-foreground text-xs leading-relaxed opacity-70">{step.desc}</p>
                  </GlassCard>
                  {i < steps.length - 1 && (
                    <div className="hidden md:block absolute top-1/2 -right-3 lg:-right-4 w-4 lg:w-6 h-0.5 bg-gradient-to-r from-primary/30 to-primary/10 z-20" />
                  )}
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const Solutions = () => {
  const solutions = [
    { icon: <Building2 className="w-6 h-6" />, title: "Residential Elevators", desc: "Elegant home elevators designed for comfort and style, perfect for villas and apartments." },
    { icon: <Zap className="w-6 h-6" />, title: "Commercial Elevators", desc: "High-performance elevators for offices, malls, and commercial complexes with maximum efficiency." },
    { icon: <Wrench className="w-6 h-6" />, title: "Maintenance & AMC", desc: "Comprehensive annual maintenance contracts ensuring your elevator runs flawlessly year-round." },
    { icon: <Shield className="w-6 h-6" />, title: "Modernization", desc: "Upgrade your existing elevator with latest technology, safety features, and modern aesthetics." },
  ];

  return (
    <section className="py-24 lg:py-32 section-glow section-mesh relative">
      <SectionDivider />
      <div className="container mx-auto px-4 lg:px-8 pt-8 relative z-10">
        <SectionHeading badge="What We Offer" title="Complete Elevator Solutions" subtitle="End-to-end elevator services from design and installation to maintenance and modernization" />
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-7">
          {solutions.map((s, i) => (
            <GlassCard key={i} className="p-7 group" delay={i * 0.1} premium tilt>
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/15 to-primary/5 flex items-center justify-center mb-5 text-primary group-hover:from-primary group-hover:to-gold-light group-hover:text-primary-foreground transition-all duration-500 icon-glow group-hover:shadow-[0_0_30px_hsl(43_66%_52%/0.3)]">
                {s.icon}
              </div>
              <h3 className="text-lg font-heading font-semibold text-foreground mb-3">{s.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-5 opacity-75">{s.desc}</p>
              <span className="text-primary text-sm font-medium flex items-center gap-1.5 group-hover:gap-3 transition-all duration-300">
                Explore <ChevronRight className="w-4 h-4" />
              </span>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
};

const Finishes = () => {
  const finishes = [
    { name: "Basic", price: "₹5-6 Lakhs", features: ["Standard SS finish", "Manual door", "Basic lighting", "Standard control panel"], popular: false },
    { name: "Standard", price: "₹5-8 Lakhs", features: ["Hairline SS finish", "Automatic door", "LED lighting", "Digital display", "Designer flooring"], popular: true },
    { name: "Premium", price: "₹10-20 Lakhs", features: ["Mirror/Etched SS finish", "Glass cabin options", "Designer false ceiling", "Touchscreen COP", "Customized interiors"], popular: false },
  ];

  return (
    <section className="py-24 lg:py-32 relative">
      <SectionDivider />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_30%_at_50%_50%,hsl(43_66%_52%/0.03),transparent)]" />
      <div className="container mx-auto px-4 lg:px-8 pt-8 relative z-10">
        <SectionHeading badge="Premium Finishes" title="Finishes & Pricing" subtitle="Choose from our range of elevator finishes to match your budget and style" />
        <div className="grid md:grid-cols-3 gap-8 lg:gap-10 max-w-5xl mx-auto">
          {finishes.map((f, i) => (
            <GlassCard key={i} className={`p-8 lg:p-10 text-center relative overflow-hidden ${f.popular ? "border-primary/20 glow-gold-strong" : ""}`} delay={i * 0.12} premium={f.popular} tilt>
              {f.popular && (
                <>
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
                  <span className="relative inline-block px-4 py-1.5 rounded-full bg-primary/12 text-primary text-xs font-semibold mb-4 border border-primary/15">Most Popular</span>
                </>
              )}
              <h3 className="text-xl lg:text-2xl font-heading font-bold text-foreground mb-3">{f.name}</h3>
              <p className="text-gradient-gold text-2xl lg:text-3xl font-heading font-extrabold mb-8">{f.price}</p>
              <ul className="space-y-3.5 mb-8">
                {f.features.map((feat) => (
                  <li key={feat} className="text-muted-foreground text-sm flex items-center gap-2.5 justify-center">
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0" /> {feat}
                  </li>
                ))}
              </ul>
              <Link to="/contact" className="relative block w-full py-3.5 rounded-xl bg-primary/10 text-primary font-semibold text-sm hover:bg-gradient-to-r hover:from-primary hover:to-gold-light hover:text-primary-foreground transition-all duration-400 hover:shadow-[0_0_30px_hsl(43_66%_52%/0.25)]">
                Get Quote
              </Link>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
};

const Technology = () => (
  <section className="py-24 lg:py-32 section-glow relative">
    <SectionDivider />
    <div className="container mx-auto px-4 lg:px-8 pt-8 relative z-10">
      <SectionHeading badge="Innovation" title="Intelligent Elevator Systems" subtitle="Powered by smart technology for safety, efficiency, and seamless operation" />
      <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
        {[
          { title: "IoT Monitoring", desc: "Real-time remote monitoring of elevator performance, diagnostics, and predictive maintenance alerts." },
          { title: "Energy Efficient Drives", desc: "Regenerative drives that reduce energy consumption by up to 50% while ensuring smooth rides." },
          { title: "Smart Safety Systems", desc: "Multi-layered safety with emergency braking, door sensors, overload protection, and battery backup." },
        ].map((t, i) => (
          <GlassCard key={i} className="p-7 lg:p-8 group" delay={i * 0.12} premium tilt>
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/15 to-primary/5 flex items-center justify-center text-primary mb-5 font-heading font-bold text-lg icon-glow-tech group-hover:icon-glow transition-all duration-500">0{i + 1}</div>
            <h3 className="text-lg lg:text-xl font-heading font-semibold text-foreground mb-3">{t.title}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed opacity-75">{t.desc}</p>
          </GlassCard>
        ))}
      </div>
    </div>
  </section>
);

const AMCPlans = () => {
  const plans = [
    { name: "Silver", price: "₹20,000/yr", features: ["Bimonthly maintenance", "Safety inspection", "Phone support (business hrs)", "Parts at additional cost", "48hr response time"] },
    { name: "Gold", price: "₹35,000/yr", features: ["Monthly maintenance", "Preventive maintenance", "24/7 emergency support", "20% parts discount", "24hr response time"], popular: true },
    { name: "Platinum", price: "₹70,000/yr", features: ["Fortnightly maintenance", "Full preventive maintenance", "24/7 priority support", "Free parts replacement", "4hr emergency response"] },
  ];

  return (
    <section className="py-24 lg:py-32 relative section-mesh">
      <SectionDivider />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_50%,hsl(43_66%_52%/0.03),transparent)]" />
      <div className="container mx-auto px-4 lg:px-8 pt-8 relative z-10">
        <SectionHeading badge="Maintenance" title="AMC Plans" subtitle="Keep your elevator running perfectly with our Annual Maintenance Contracts" />
        <div className="grid md:grid-cols-3 gap-8 lg:gap-10 max-w-5xl mx-auto">
          {plans.map((p, i) => (
            <GlassCard key={i} className={`p-8 lg:p-10 text-center relative overflow-hidden ${p.popular ? "border-primary/20 glow-gold-strong" : ""}`} delay={i * 0.12} premium={p.popular} tilt>
              {p.popular && (
                <>
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-b from-primary/6 to-transparent pointer-events-none" />
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
              <Link to="/contact" className="relative block w-full py-3.5 rounded-xl bg-primary/10 text-primary font-semibold text-sm hover:bg-gradient-to-r hover:from-primary hover:to-gold-light hover:text-primary-foreground transition-all duration-400 hover:shadow-[0_0_30px_hsl(43_66%_52%/0.25)]">
                Choose Plan
              </Link>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
};

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const faqs = [
    { q: "How long does elevator installation take?", a: "Typically, a residential elevator installation takes 4-6 weeks, while commercial installations may take 8-12 weeks depending on the complexity and building requirements." },
    { q: "What safety features are included?", a: "All our elevators come with emergency braking, door sensors, overload protection, intercom system, battery backup, and fire-rated doors as standard features." },
    { q: "Do you offer customization options?", a: "Yes! We offer full customization including cabin size, finishes, lighting, flooring, control panel design, and door styles to match your space perfectly." },
    { q: "What is covered under AMC?", a: "Our AMC plans cover regular maintenance visits, safety inspections, lubrication, adjustments, and depending on your plan, free parts replacement and 24/7 emergency support." },
    { q: "What is the warranty period?", a: "We provide a comprehensive 2-year warranty on all installations covering parts and labor, with extended warranty options available up to 5 years." },
  ];

  return (
    <section className="py-24 lg:py-32 section-glow relative">
      <SectionDivider />
      <div className="container mx-auto px-4 lg:px-8 max-w-3xl pt-8 relative z-10">
        <SectionHeading badge="FAQ" title="Frequently Asked Questions" subtitle="Find answers to common questions about our elevator solutions" />
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <ScrollReveal key={i} delay={i * 0.06}>
              <motion.div className={`glass-card-premium rounded-2xl overflow-hidden transition-all duration-500 ${openIndex === i ? 'glow-gold' : ''}`}>
                <button onClick={() => setOpenIndex(openIndex === i ? null : i)} className="w-full flex items-center justify-between p-6 text-left group">
                  <div className="flex items-center gap-4">
                    <span className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary/15 to-primary/5 flex items-center justify-center text-primary text-xs font-bold shrink-0 group-hover:from-primary/25 group-hover:to-primary/10 transition-all duration-300">{String(i + 1).padStart(2, "0")}</span>
                    <span className="text-foreground font-medium text-sm lg:text-base">{faq.q}</span>
                  </div>
                  <ChevronDown className={`w-5 h-5 text-primary shrink-0 transition-transform duration-400 ${openIndex === i ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence>
                  {openIndex === i && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}>
                      <div className="px-6 pb-6 pl-[4.25rem]"><p className="text-muted-foreground text-sm leading-relaxed opacity-80">{faq.a}</p></div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

const CTASection = () => (
  <section className="py-24 lg:py-32 relative">
    <SectionDivider />
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_50%,hsl(43_66%_52%/0.05),transparent)]" />
    <div className="container mx-auto px-4 lg:px-8 pt-8 relative z-10">
      <div className="max-w-4xl mx-auto text-center">
        <ScrollReveal>
          <GlassCard className="p-10 lg:p-16 relative overflow-hidden" hover={false} premium>
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/3 pointer-events-none" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-primary/8 rounded-full blur-[80px] pointer-events-none" />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-extrabold text-foreground mb-5 tracking-tight">Ready to <span className="text-gradient-gold">Elevate</span> Your Building?</h2>
              <p className="text-muted-foreground text-base lg:text-lg max-w-2xl mx-auto mb-10 leading-relaxed opacity-80">
                Get a free site inspection and personalized elevator recommendation from our expert engineers.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/contact" className="group inline-flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-gold-light text-primary-foreground px-10 py-4 rounded-full font-semibold text-base transition-all duration-300 hover:shadow-[0_0_40px_hsl(43_66%_52%/0.4)] hover:scale-105 btn-glow">
                  Request Free Site Inspection <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <a href="https://wa.me/919844002026" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 border border-primary/20 text-foreground px-10 py-4 rounded-full font-semibold text-base hover:bg-primary/10 hover:border-primary/30 transition-all duration-300">
                  Chat on WhatsApp
                </a>
              </div>
            </div>
          </GlassCard>
        </ScrollReveal>
      </div>
    </div>
  </section>
);

const ContactSection = () => (
  <section className="py-24 lg:py-32 relative">
    <SectionDivider />
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_60%_50%,hsl(43_66%_52%/0.04),transparent)]" />
    <div className="container mx-auto px-4 lg:px-8 pt-8 relative z-10">
      <SectionHeading badge="Get In Touch" title="Let's Connect" subtitle="Ready to elevate your building? Reach out for a free consultation" />
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 max-w-5xl mx-auto">
        <ScrollReveal direction="left">
          <div className="space-y-5">
            {[
              { icon: <Phone className="w-5 h-5" />, title: "Call Us", info: "+91 9844002026 / +91 6384961909" },
              { icon: <Mail className="w-5 h-5" />, title: "Email Us", info: "info@xelevators.in" },
              { icon: <MapPin className="w-5 h-5" />, title: "Visit Us", info: "Bangalore & Chennai, India" },
            ].map((c, i) => (
              <GlassCard key={i} className="p-6 flex items-start gap-5" delay={i * 0.1} premium>
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center text-primary shrink-0 icon-glow">{c.icon}</div>
                <div>
                  <h4 className="text-foreground font-semibold text-sm mb-1.5">{c.title}</h4>
                  <p className="text-muted-foreground text-sm opacity-80">{c.info}</p>
                </div>
              </GlassCard>
            ))}
          </div>
        </ScrollReveal>
        <ScrollReveal direction="right">
          <GlassCard className="p-8 lg:p-10 relative overflow-hidden" hover={false} premium>
            <div className="absolute inset-0 bg-gradient-to-br from-primary/4 via-transparent to-primary/2 pointer-events-none" />
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/5 rounded-full blur-[60px] pointer-events-none" />
            <div className="mb-6">
              <h3 className="text-xl font-heading font-bold text-foreground mb-1.5">Request a Quote</h3>
              <p className="text-muted-foreground text-sm opacity-70">Fill out the form below and we'll get back to you within 24 hours.</p>
            </div>
            <form className="space-y-5 relative z-10">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground/80 mb-1.5">Full Name *</label>
                  <input placeholder="John Doe" className="input-premium w-full" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground/80 mb-1.5">Phone Number *</label>
                  <input placeholder="+91 98765 43210" className="input-premium w-full" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground/80 mb-1.5">Email Address *</label>
                  <input placeholder="john@company.com" className="input-premium w-full" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground/80 mb-1.5">Company Name</label>
                  <input placeholder="Your Company" className="input-premium w-full" />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground/80 mb-1.5">Elevator Type</label>
                  <select className="w-full input-premium text-muted-foreground/60">
                    <option>Select type</option>
                    <option>Residential</option>
                    <option>Commercial</option>
                    <option>Hospital</option>
                    <option>Capsule</option>
                    <option>Goods</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground/80 mb-1.5">Number of Floors</label>
                  <select className="w-full input-premium text-muted-foreground/60">
                    <option>Floors</option>
                    {[...Array(20)].map((_, i) => <option key={i}>{i + 1}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground/80 mb-1.5">Building Type</label>
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
                <label className="block text-sm font-medium text-foreground/80 mb-1.5">Project Details</label>
                <textarea placeholder="Tell us about your project requirements, timeline, budget, or any specific needs..." rows={5} className="w-full input-premium resize-none" />
              </div>
              <button type="button" className="w-full bg-gradient-to-r from-primary to-gold-light text-primary-foreground py-4 rounded-xl font-semibold text-sm transition-all duration-400 hover:shadow-[0_0_40px_hsl(43_66%_52%/0.35)] hover:scale-[1.02] active:scale-100 btn-glow flex items-center justify-center gap-2">
                <Send className="w-4 h-4" /> Submit Request
              </button>
              <p className="text-center text-muted-foreground/50 text-xs">By submitting, you agree to our privacy policy. No spam, ever.</p>
            </form>
          </GlassCard>
        </ScrollReveal>
      </div>
    </div>
  </section>
);

const Index = () => (
  <>
    <Hero />
    <MissionVision />
    <ImpactMetrics />
    <IndustriesServed />
    <Solutions />
    <ProcessSection />
    <Finishes />
    <Technology />
    <AMCPlans />
    <CTASection />
    <FAQ />
    <ContactSection />
  </>
);

export default Index;
