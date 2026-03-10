import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeading, GlassCard, StatCard, ScrollReveal, FloatingParticles, SectionDivider, StaggerContainer, StaggerChild } from "@/components/ui/shared";
import { Shield, Zap, Award, Users, Building2, Wrench, ChevronRight, CheckCircle2, Phone, Mail, MapPin, ChevronDown, PhoneCall, ArrowRight, Home, Building, Hospital, Hotel, Factory, Search, PenTool, Settings, HardHat, BadgeCheck, Send, Activity, Star, Leaf, Volume2, Brain, Smartphone, BarChart3 } from "lucide-react";
import { TrustBadges } from "@/components/CTABanner";
import { AnimatedList } from "@/components/AnimatedList";
import { useState } from "react";
import { submitLead, SUCCESS_MESSAGE } from "@/lib/submitLead";
import { toast } from "@/hooks/use-toast";

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
          <span className="shiny-text">Exceeding</span><br /><span className="shiny-text-gold">Trust</span>
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

const missionVisionCards = [
  {
    icon: <Shield className="w-7 h-7" />,
    title: "Our Mission",
    description:
      "To deliver innovative and reliable elevator solutions that combine advanced engineering, safety excellence, and superior performance for every building we serve.",
    delay: 0,
  },
  {
    icon: <Zap className="w-7 h-7" />,
    title: "Our Vision",
    description:
      "To be recognized as a trusted leader in vertical mobility, setting new benchmarks in innovation, quality, and customer experience across the elevator industry.",
    delay: 0.15,
  },
];

const MissionVision = () => (
  <section className="py-24 lg:py-32 section-glow relative overflow-hidden">
    {/* Section-level ambient glow */}
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_60%,hsl(43_66%_52%/0.04),transparent_70%)] pointer-events-none" />
    <div className="container mx-auto px-4 lg:px-8 relative z-10">
      <SectionHeading
        badge="Who We Are"
        title="Our Mission & Vision"
        subtitle="Committed to transforming vertical mobility with innovation and safety"
      />
      <div className="grid md:grid-cols-2 gap-8 lg:gap-10 max-w-5xl mx-auto">
        {missionVisionCards.map((card) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 45 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, delay: card.delay, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -10, transition: { duration: 0.3, ease: "easeOut" } }}
            className="group relative rounded-3xl overflow-hidden cursor-pointer"
            style={{
              background:
                "linear-gradient(160deg, hsl(212 50% 15% / 0.65) 0%, hsl(212 48% 10% / 0.45) 55%, hsl(212 55% 8% / 0.5) 100%)",
              backdropFilter: "blur(32px) saturate(1.3)",
              WebkitBackdropFilter: "blur(32px) saturate(1.3)",
              border: "1px solid hsl(43 66% 52% / 0.1)",
              boxShadow:
                "inset 0 1px 0 hsl(0 0% 100% / 0.06), inset 0 -1px 0 hsl(213 62% 3% / 0.3), 0 16px 64px hsl(213 62% 3% / 0.5), 0 4px 16px hsl(213 62% 3% / 0.3)",
            }}
          >
            {/* Hover border glow */}
            <div
              className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{
                boxShadow:
                  "0 0 0 1px hsl(43 66% 52% / 0.22), 0 0 50px hsl(43 66% 52% / 0.1), 0 0 100px hsl(43 66% 52% / 0.05)",
              }}
            />

            {/* Subtle light-sweep reflection on hover */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              initial={{ opacity: 0, x: "-100%" }}
              whileHover={{ opacity: 1, x: "150%", transition: { duration: 0.6, ease: "easeInOut" } }}
              style={{
                background:
                  "linear-gradient(105deg, transparent 40%, hsl(0 0% 100% / 0.04) 50%, transparent 60%)",
                width: "60%",
              }}
            />

            {/* Top shimmer line */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Background inner glow (always present, intensifies on hover) */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            <div className="relative z-10 p-8 lg:p-10">
              {/* Icon area with pulsing orb */}
              <div className="relative mb-8 w-fit">
                {/* Pulsing orb */}
                <motion.div
                  className="absolute inset-0 rounded-2xl bg-primary/25 blur-2xl"
                  animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0.55, 0.3] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                />
                {/* Halo ring */}
                <div
                  className="absolute -inset-2 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background:
                      "radial-gradient(ellipse 80% 80% at 50% 50%, hsl(43 66% 52% / 0.14), transparent 70%)",
                  }}
                />
                {/* Icon container */}
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="relative w-16 h-16 rounded-2xl flex items-center justify-center text-primary"
                  style={{
                    background:
                      "linear-gradient(135deg, hsl(43 66% 52% / 0.2) 0%, hsl(43 66% 52% / 0.07) 100%)",
                    boxShadow:
                      "0 0 28px hsl(43 66% 52% / 0.18), inset 0 1px 0 hsl(0 0% 100% / 0.1), 0 0 0 1px hsl(43 66% 52% / 0.15)",
                  }}
                >
                  <div className="group-hover:[filter:drop-shadow(0_0_10px_hsl(43_66%_52%/0.7))] transition-all duration-300">
                    {card.icon}
                  </div>
                </motion.div>
              </div>

              {/* Title */}
              <h3 className="text-2xl lg:text-3xl font-heading font-bold text-foreground mb-4 tracking-tight">
                {card.title}
              </h3>

              {/* Separator */}
              <div className="w-10 h-px bg-gradient-to-r from-primary/60 to-transparent mb-5 group-hover:w-16 transition-all duration-500" />

              {/* Description */}
              <p className="text-muted-foreground/75 text-sm lg:text-base leading-relaxed">
                {card.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);


const ImpactMetrics = () => (
  <section className="py-24 lg:py-32 relative overflow-hidden">
    <SectionDivider />
    {/* Rich background orbs */}
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,hsl(43_66%_52%/0.04),transparent_70%)]" />
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
    <div className="container mx-auto px-4 lg:px-8 pt-8 relative z-10">
      <SectionHeading badge="Our Impact" badgeClassName="text-lg md:text-xl lg:text-2xl px-6 py-3 tracking-[0.25em]" title="Numbers That Speak" titleClassName="text-3xl md:text-4xl lg:text-5xl tracking-tight text-foreground/80" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-7 max-w-5xl mx-auto">
        <StatCard value="75+" label="Projects Installed" icon={<Building2 className="w-7 h-7" />} delay={0} />
        <StatCard value="120+" label="Happy Customers" icon={<Users className="w-7 h-7" />} delay={0.1} />
        <StatCard value="99%" label="Uptime Rate" icon={<Zap className="w-7 h-7" />} delay={0.2} />
        <StatCard value="25+" label="Team Members" icon={<Award className="w-7 h-7" />} delay={0.3} />
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
    { icon: <Search className="w-5 h-5 lg:w-6 lg:h-6" />, title: "Consultation", desc: "Understanding your building requirements and providing tailored elevator solutions." },
    { icon: <MapPin className="w-5 h-5 lg:w-6 lg:h-6" />, title: "Site Inspection", desc: "Our engineers visit your site to assess requirements, shaft dimensions, and structural feasibility." },
    { icon: <CheckCircle2 className="w-5 h-5 lg:w-6 lg:h-6" />, title: "Order Confirmation", desc: "Finalizing custom elevator design, capacity, and aesthetics before kicking off manufacturing." },
    { icon: <Settings className="w-5 h-5 lg:w-6 lg:h-6" />, title: "Production", desc: "Precision manufacturing with quality-controlled components, ready for seamless installation." },
    { icon: <HardHat className="w-5 h-5 lg:w-6 lg:h-6" />, title: "Installation", desc: "Professional installation by certified technicians with minimal disruption to your building operations." },
    { icon: <Activity className="w-5 h-5 lg:w-6 lg:h-6" />, title: "Testing & Commissioning", desc: "Comprehensive system testing and commissioning to ensure smooth operation and compliance with safety standards." },
    { icon: <BadgeCheck className="w-5 h-5 lg:w-6 lg:h-6" />, title: "Safety & Quality", desc: "Rigorous testing and government certification ensuring your elevator meets all safety standards." },
    { icon: <Award className="w-5 h-5 lg:w-6 lg:h-6" />, title: "Handover to Client", desc: "Final demonstration of features, handover of keys, and initiation of your warranty period." },
  ];

  return (
    <section className="py-24 lg:py-32 section-glow relative">
      <SectionDivider />
      <div className="container mx-auto px-4 lg:px-8 pt-8 relative z-10 text-center">
        <SectionHeading badge="Our Process" title="How Elevator Installation Works" subtitle="A streamlined 8-step process from consultation to certification" />
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
            {steps.map((step, i) => (
              <ScrollReveal key={step.title} delay={i * 0.1}>
                <div className="relative h-full">
                  <GlassCard className="p-5 lg:p-6 text-center relative overflow-hidden group h-full flex flex-col" premium tilt>
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="text-primary/10 group-hover:text-primary/20 transition-colors font-heading font-extrabold text-4xl lg:text-5xl absolute top-3 lg:top-4 right-3 lg:right-4 pointer-events-none">
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center text-primary mx-auto mb-3 lg:mb-4 icon-glow relative z-10">
                      {step.icon}
                    </div>
                    <h3 className="text-foreground text-sm lg:text-base font-heading font-semibold mb-2 relative z-10">{step.title}</h3>
                    <p className="text-muted-foreground text-[11px] lg:text-xs leading-relaxed opacity-70 relative z-10 flex-1">{step.desc}</p>
                  </GlassCard>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center text-sm lg:text-base font-medium text-gradient-gold tracking-wide"
        >
          Quick and efficient delivery timeline
        </motion.p>
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
    {
      id: "basic",
      icon: "B",
      iconBg: "bg-slate-500/30 text-slate-300 border border-slate-500/30",
      title: "Basic",
      price: "₹6 Lakhs onwards",
      subtitle: "MS Powder-Coated",
      features: [
        "MS powder-coated cabin finish",
        "Standard push button panel",
        "Basic LED cabin lighting",
        "Manual/Auto door operation",
        "1-year comprehensive warranty"
      ],
      badge: null,
      cardStyle: "glass-card border-white/5 text-emerald-500",
      priceStyle: "text-white",
      highlight: false
    },
    {
      id: "standard",
      icon: "S",
      iconBg: "bg-blue-600/30 text-blue-400 border border-blue-500/30",
      title: "Standard",
      price: "₹7 Lakhs onwards",
      subtitle: "SS Cabin + SS Door",
      features: [
        "Stainless steel cabin and door finish (with design)",
        "304 grade with scratch proof protection",
        "Digital floor indicator display",
        "Energy-efficient LED lighting",
        "Automatic door operation",
        "1-year comprehensive warranty"
      ],
      badge: null,
      cardStyle: "glass-card border-white/5 text-emerald-500",
      priceStyle: "text-white",
      highlight: false
    },
    {
      id: "premium-lite",
      icon: "PL",
      iconBg: "bg-[#8b5cf6]/30 text-[#a78bfa] border border-[#8b5cf6]/40",
      title: "Premium Lite",
      price: "₹8 Lakhs onwards",
      subtitle: "Fully Customized Luxury",
      features: [
        "Any luxury look (fully customized)",
        "Designed cabin interior with premium materials",
        "Digital floor indicator display",
        "Automatic door operation",
        "1-year comprehensive warranty"
      ],
      badge: { text: "New Trend", color: "bg-[#8b5cf6] text-white", icon: <Star className="w-3 h-3 mr-1.5" /> },
      cardStyle: "bg-[#0f172a] border-[#8b5cf6]/50 shadow-xl text-[#F5D061]",
      priceStyle: "text-gradient-gold",
      highlight: true
    },
    {
      id: "premium-plus",
      icon: "P+",
      iconBg: "bg-[#D4AF37]/30 text-[#F5D061] border border-[#D4AF37]/40",
      title: "Premium Plus",
      price: "₹9 Lakhs onwards",
      subtitle: "Gold/Rose Gold/Black Design/Wooden",
      features: [
        "Luxury gold/rose gold/black/wooden finish",
        "Smart touchscreen control panel",
        "Premium IoT-enabled monitoring",
        "Designer cabin interior with premium materials",
        "2-year comprehensive warranty"
      ],
      badge: { text: "Most Popular", color: "bg-gradient-to-r from-[#D4AF37] to-[#F5D061] text-zinc-900", icon: <Star className="w-3 h-3 mr-1.5 fill-zinc-900" /> },
      cardStyle: "bg-[#0f172a] border-[#D4AF37] shadow-[0_0_40px_hsl(43_66%_52%/0.15)] ring-1 ring-[#D4AF37]/50 text-[#F5D061]",
      priceStyle: "text-gradient-gold",
      highlight: true,
      glow: true
    }
  ];

  return (
    <section className="py-24 lg:py-32 relative">
      <SectionDivider />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_30%_at_50%_50%,hsl(43_66%_52%/0.03),transparent)]" />

      {/* SECTION HEADER */}
      <div className="container mx-auto px-4 lg:px-8 relative z-10 text-center mb-16">
        {/* Animated glowing divider above the header */}
        <div className="w-full max-w-4xl mx-auto h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent mb-12 opacity-50 glow-gold-strong" />

        <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-[10px] md:text-xs font-bold tracking-widest uppercase mb-4 border border-primary/20">
          PREMIUM SOLUTIONS
        </span>
        <h2 className="text-4xl md:text-5xl lg:text-5xl font-heading font-extrabold text-white mb-5 tracking-tight">
          Finishes & Pricing
        </h2>
        <p className="text-muted-foreground/80 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
          Select from our curated collection of premium finishes, meticulously designed to complement your building's architectural elegance and align with your investment requirements.
        </p>
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {finishes.map((f) => (
            <div key={f.id} className="relative h-full flex pt-4">
              {/* Badge positioned above the card */}
              {f.badge && (
                <div className={`absolute top-0 left-1/2 -translate-x-1/2 z-20 px-3.5 py-1.5 rounded-full text-[11px] font-bold tracking-wider uppercase flex items-center shadow-lg ${f.badge.color}`}>
                  {f.badge.icon}
                  {f.badge.text}
                </div>
              )}

              <div className={`relative flex flex-col w-full h-full p-8 rounded-xl border transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl ${f.cardStyle}`}>

                {/* Highlight/Glow effects */}
                {f.glow && (
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
                )}

                {/* Icon Circle */}
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-heading font-bold text-lg mb-6 shadow-md ${f.iconBg}`}>
                  {f.icon}
                </div>

                {/* Header info */}
                <h3 className="text-xl font-heading font-bold text-white mb-1.5">{f.title}</h3>
                <p className={`text-[22px] font-heading font-extrabold mb-1.5 ${f.highlight ? "text-gradient-gold" : "text-white"}`}>{f.price}</p>
                <p className="text-[13px] text-muted-foreground mb-8 min-h-[35px] border-b border-white/10 pb-4">{f.subtitle}</p>

                {/* Features list */}
                <ul className="space-y-4 mb-10 flex-grow">
                  {f.features.map((feat, idx) => (
                    <li key={idx} className="text-[13px] text-foreground/80 flex items-start gap-3">
                      <CheckCircle2 className={`w-4 h-4 mt-0.5 shrink-0 ${f.highlight ? "text-[#D4AF37]" : "text-emerald-500"}`} />
                      <span className="leading-snug">{feat}</span>
                    </li>
                  ))}
                </ul>

                {/* Button */}
                <Link to="/contact" className="mt-auto w-full py-3 rounded-lg font-semibold text-sm transition-all duration-300 flex items-center justify-center bg-gradient-to-r from-[#D4AF37] to-[#F5D061] text-zinc-900 hover:shadow-[0_0_20px_hsl(43_66%_52%/0.3)] hover:scale-[1.02]">
                  Get Quote
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Technology = () => {
  const cards = [
    {
      title: "Real-Time Monitoring",
      description: "Live tracking of elevator performance, usage patterns, and system health through IoT sensors.",
      features: ["24/7 system monitoring", "Performance analytics", "Usage tracking", "Remote diagnostics"],
      icon: <Activity className="w-6 h-6" />
    },
    {
      title: "Predictive Maintenance",
      description: "AI-powered algorithms predict potential issues before they become problems, reducing downtime significantly.",
      features: ["Prevent breakdowns", "Reduce maintenance costs", "Extend equipment life", "Minimize disruptions"],
      icon: <Brain className="w-6 h-6" />
    },
    {
      title: "Smart Controls",
      description: "Touchless operation, destination dispatch, and mobile app integration for modern convenience.",
      features: ["Contactless operation", "Mobile app control", "Voice activation", "Gesture controls"],
      icon: <Smartphone className="w-6 h-6" />
    },
    {
      title: "Analytics Dashboard",
      description: "Comprehensive data insights for building managers to optimize elevator efficiency and usage.",
      features: ["Usage analytics", "Energy consumption tracking", "Performance reports", "Cost optimization"],
      icon: <BarChart3 className="w-6 h-6" />
    }
  ];

  return (
    <section className="py-24 lg:py-32 section-glow relative">
      <SectionDivider />
      <div className="container mx-auto px-4 lg:px-8 pt-8 relative z-10">
        <SectionHeading 
          badge="IoT Enabled" 
          title="Intelligent Elevator Systems" 
          subtitle="Experience the future with our IoT-enabled smart elevators featuring predictive maintenance, touchless controls, and real-time monitoring for optimal performance." 
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto mt-12">
          {cards.map((card, idx) => (
            <div key={idx} className="group flex flex-col items-center sm:items-start text-center sm:text-left">
              <div className="text-primary/50 font-heading font-extrabold text-2xl -translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 md:-mb-1 md:ml-4 flex items-center gap-2">
                <span className="w-4 h-px bg-primary/40 hidden md:block"></span>
                0{idx + 1}
              </div>
              <div className="rounded-xl bg-black/20 backdrop-blur-md border border-white/10 p-6 flex flex-col gap-3 hover:-translate-y-[6px] hover:shadow-lg transition-all duration-300 w-full relative z-10">
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 mb-1">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    {card.icon}
                  </div>
                  <div className="flex flex-col gap-2 mt-1 sm:mt-0">
                    <h3 className="text-xl font-heading font-bold text-white">
                      {card.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed opacity-90 max-w-sm">
                      {card.description}
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4 mt-auto pt-4 border-t border-white/5 sm:pl-16">
                  {card.features.map((feature, fIdx) => (
                    <div key={fIdx} className="flex items-center justify-center sm:justify-start gap-2">
                      <span className="text-primary text-[10px]">●</span>
                      <span className="text-xs text-foreground/80">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

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
          <AnimatedList delay={150}>
            {faqs.map((faq, i) => (
              <div key={i} className={`glass-card-premium rounded-2xl overflow-hidden transition-all duration-500 ${openIndex === i ? 'glow-gold' : ''}`}>
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
              </div>
            ))}
          </AnimatedList>
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

const ContactSection = () => {
  const [form, setForm] = useState({ name: "", phone: "", email: "", company_name: "", elevator_type: "", number_of_floors: "", building_type: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim()) {
      toast({ title: "Required fields missing", description: "Please enter your name and phone number.", variant: "destructive" });
      return;
    }
    setSubmitting(true);
    const { success, error } = await submitLead({ ...form, lead_source: "website_form" });
    setSubmitting(false);
    if (success) {
      toast({ title: "✅ Thank You!", description: SUCCESS_MESSAGE });
      setForm({ name: "", phone: "", email: "", company_name: "", elevator_type: "", number_of_floors: "", building_type: "", message: "" });
    } else {
      toast({ title: "Submission failed", description: error, variant: "destructive" });
    }
  };
  return (
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
              <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground/80 mb-1.5">Full Name *</label>
                    <input name="name" value={form.name} onChange={handleChange} placeholder="John Doe" className="input-premium w-full" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground/80 mb-1.5">Phone Number *</label>
                    <input name="phone" value={form.phone} onChange={handleChange} placeholder="+91 98765 43210" className="input-premium w-full" required />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground/80 mb-1.5">Email Address</label>
                    <input name="email" value={form.email} onChange={handleChange} placeholder="john@company.com" type="email" className="input-premium w-full" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground/80 mb-1.5">Company Name</label>
                    <input name="company_name" value={form.company_name} onChange={handleChange} placeholder="Your Company" className="input-premium w-full" />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground/80 mb-1.5">Elevator Type</label>
                    <select name="elevator_type" value={form.elevator_type} onChange={handleChange} className="w-full input-premium text-muted-foreground/60">
                      <option value="">Select type</option>
                      <option value="Residential">Residential</option>
                      <option value="Commercial">Commercial</option>
                      <option value="Hospital">Hospital</option>
                      <option value="Capsule">Capsule</option>
                      <option value="Goods">Goods</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground/80 mb-1.5">Number of Floors</label>
                    <select name="number_of_floors" value={form.number_of_floors} onChange={handleChange} className="w-full input-premium text-muted-foreground/60">
                      <option value="">Floors</option>
                      <option value="2-3 Floors">2-3 Floors</option>
                      <option value="4-6 Floors">4-6 Floors</option>
                      <option value="7-10 Floors">7-10 Floors</option>
                      <option value="10+ Floors">10+ Floors</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground/80 mb-1.5">Building Type</label>
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
                <div>
                  <label className="block text-sm font-medium text-foreground/80 mb-1.5">Project Details</label>
                  <textarea name="message" value={form.message} onChange={handleChange} placeholder="Tell us about your project requirements, timeline, budget, or any specific needs..." rows={5} className="w-full input-premium resize-none" />
                </div>
                <button type="submit" disabled={submitting} className="w-full bg-gradient-to-r from-primary to-gold-light text-primary-foreground py-4 rounded-xl font-semibold text-sm transition-all duration-400 hover:shadow-[0_0_40px_hsl(43_66%_52%/0.35)] hover:scale-[1.02] active:scale-100 btn-glow flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
                  <Send className="w-4 h-4" /> {submitting ? "Submitting..." : "Submit Request"}
                </button>
                <p className="text-center text-muted-foreground/50 text-xs">By submitting, you agree to our privacy policy. No spam, ever.</p>
              </form>
            </GlassCard>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

const TechnologySelector = () => {
  const [activeMotor, setActiveMotor] = useState(0);

  const features = [
    { icon: <Zap className="w-5 h-5" />, title: "Premium Quality", subtitle: "Italian engineering excellence" },
    { icon: <Leaf className="w-5 h-5" />, title: "Energy Efficiency", subtitle: "Advanced power-saving technology" },
    { icon: <Shield className="w-5 h-5" />, title: "Durability", subtitle: "Long-lasting components" },
    { icon: <Volume2 className="w-5 h-5" />, title: "Smooth Operation", subtitle: "Superior ride comfort" },
  ];

  const motors = [
    {
      id: "hydraulic",
      name: "Italian Hydraulic Unit",
      tagline: "Smooth operation for low-rise buildings",
      points: [
        "Ideal for low-rise buildings, villas, bungalows, and private homes",
        "Smooth start and stop due to hydraulic operation",
        "Safe in power failure – lift can be lowered to the nearest floor",
        "No overhead machine room required",
        "Can carry heavy loads – best for goods/passenger lifts",
        "Works well for irregular shafts and retrofit projects",
        "Cost-effective solution for buildings up to 5–6 floors",
        "Less wear & tear since hydraulic system has fewer moving parts",
        "Noise-free and vibration-free operation",
        "Backed by Italian GMV technology – known for global quality",
        "No counterweight required, saving space and cost"
      ]
    },
    {
      id: "gearless",
      name: "Italian Gearless Motor",
      tagline: "Space-saving design without machine room",
      points: [
        "Highly energy-efficient, saving up to 50% on power consumption",
        "Ideal for mid-to-high-rise buildings and heavy usage",
        "Compact design without requiring a dedicated machine room (MRL)",
        "Extremely smooth, noise-free, and vibrationless rides",
        "Environmentally friendly since it requires no oil or lubrication",
        "Requires less maintenance due to fewer moving parts",
        "High-speed performance with accurate floor leveling",
        "Perfect for modern aesthetics and glass capsule elevators",
        "Long operational lifespan with superior durability",
        "Powered by advanced PMSM (Permanent Magnet Synchronous Motor) tech"
      ]
    },
    {
      id: "geared",
      name: "Italian Geared Motor",
      tagline: "Traditional setup with dedicated machine room",
      points: [
        "Reliable and proven technology for traditional elevator setups",
        "Cost-effective option for mid-rise buildings",
        "Requires a dedicated machine room at the top of the shaft",
        "Easy availability of spare parts and straightforward maintenance",
        "Heavy-duty performance built for moderate to high traffic",
        "Solid construction with durable bronze gears and steel worms",
        "Can be upgraded with modern V3F drives for improved efficiency",
        "Classic operational feel with robust safety mechanisms",
        "Excellent load-bearing capabilities for commercial use",
        "Lower initial installation cost compared to gearless systems"
      ]
    }
  ];

  return (
    <section className="mt-24 mb-24 relative z-10 w-full overflow-hidden">
      <div className="container mx-auto px-4 lg:px-6 max-w-7xl">
        {/* PART 1: Feature Highlights Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feat, idx) => (
            <div key={idx} className="flex items-center gap-4 p-4 rounded-xl bg-black/20 border border-white/5 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-primary/30 group">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-300 shrink-0">
                {feat.icon}
              </div>
              <div>
                <h4 className="text-white font-semibold text-sm mb-0.5">{feat.title}</h4>
                <p className="text-muted-foreground text-xs">{feat.subtitle}</p>
              </div>
            </div>
          ))}
        </div>

        {/* PART 2: Technology Selector Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* Left Side - Menu */}
          <div className="lg:col-span-1 flex flex-col space-y-4">
            {motors.map((motor, idx) => {
              const isActive = activeMotor === idx;
              return (
                <button
                  key={motor.id}
                  onClick={() => setActiveMotor(idx)}
                  className={`w-full text-left p-6 rounded-xl border transition-all duration-300 flex flex-col gap-1 ${isActive
                      ? "bg-black/30 border-[#D4AF37] border-l-4 shadow-[0_0_20px_hsl(43_66%_52%/0.12)]"
                      : "bg-black/10 border-white/5 hover:bg-black/20 hover:border-white/10"
                    }`}
                >
                  <h3 className={`font-semibold text-base ${isActive ? "text-[#D4AF37]" : "text-white"}`}>
                    {motor.name}
                  </h3>
                  <p className="text-muted-foreground text-sm">{motor.tagline}</p>
                </button>
              );
            })}
          </div>

          {/* Right Side - Detail Panel */}
          <div className="lg:col-span-2">
            <div className="rounded-xl bg-black/20 border border-white/5 backdrop-blur-md p-8 min-h-full">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeMotor}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  <h2 className="text-2xl font-bold text-white mb-2">{motors[activeMotor].name}</h2>
                  <p className="text-[#D4AF37] text-sm font-medium mb-8">{motors[activeMotor].tagline}</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {motors[activeMotor].points.map((point, idx) => (
                      <div key={idx} className="flex items-start gap-3 p-4 rounded-lg bg-black/20 border border-white/5 transition-colors duration-300 hover:bg-black/30 hover:border-primary/30">
                        <CheckCircle2 className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
                        <span className="text-sm text-foreground/80 leading-snug">{point}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

const Index = () => (
  <>
    <Hero />
    <TrustBadges />
    <MissionVision />
    <ImpactMetrics />
    <IndustriesServed />
    <Solutions />
    <ProcessSection />
    <Finishes />
    <TechnologySelector />
    <Technology />
    <AMCPlans />
    <CTASection />
    <FAQ />
    <ContactSection />
  </>
);

export default Index;
