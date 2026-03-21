import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { PageHero, SectionHeading, GlassCard, SectionDivider, ScrollReveal } from "@/components/ui/shared";
import { Wrench, Shield, Zap, Clock, CheckCircle2, Phone, Award, Timer, UserCheck, FileText, RefreshCw } from "lucide-react";
import { CTABanner, TrustBadges, InlineQuoteForm } from "@/components/CTABanner";
import { CinematicFeatureSection } from "@/components/CinematicFeatureSection";
import { InteractiveModernization } from "@/components/InteractiveModernization";

const amcPlans = [
  { name: "Silver", price: "₹20,000/yr", features: ["Bimonthly maintenance", "Safety inspection", "Phone support (business hrs)", "Parts at additional cost", "48hr response time"], color: "" },
  { name: "Gold", price: "₹35,000/yr", features: ["Monthly maintenance", "Preventive maintenance", "24/7 emergency support", "20% parts discount", "24hr response time"], color: "border-primary/25 glow-gold-strong", popular: true },
  { name: "Platinum", price: "₹70,000/yr", features: ["Fortnightly maintenance", "Full preventive maintenance", "24/7 priority support", "Free parts replacement", "4hr emergency response"], color: "" },
];

const ServicePhilosophySection = () => {
  return (
    <section 
      className="py-24 md:py-40 relative overflow-hidden flex flex-col items-center justify-center border-y border-white/[0.03]"
      style={{
        background: "radial-gradient(circle at center, #0b1220 0%, #05080f 60%, #000000 100%)"
      }}
    >
      {/* Noise Texture Overlay */}
      <div 
        className="absolute inset-0 z-0 opacity-[0.03] mix-blend-overlay pointer-events-none" 
        style={{ backgroundImage: "url('https://grainy-gradients.vercel.app/noise.svg')" }} 
      />

      {/* Background Magic */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        
        {/* Very Slow Animated Gradient Base Shift */}
        <motion.div 
          className="absolute inset-0 opacity-40 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))]"
          animate={{
            background: [
              "radial-gradient(ellipse at 40% 40%, rgba(30,30,50,0.4) 0%, transparent 60%)",
              "radial-gradient(ellipse at 60% 60%, rgba(30,30,50,0.4) 0%, transparent 60%)",
              "radial-gradient(ellipse at 40% 60%, rgba(30,30,50,0.4) 0%, transparent 60%)",
              "radial-gradient(ellipse at 40% 40%, rgba(30,30,50,0.4) 0%, transparent 60%)"
            ]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />

        {/* Vertical light streaks (engineering/futuristic feel) */}
        <motion.div 
          className="absolute top-0 bottom-0 left-[20%] w-[1px] bg-gradient-to-b from-transparent via-[#ffffff08] to-transparent"
          animate={{ y: ["-100%", "100%"] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        />
        <motion.div 
          className="absolute top-0 bottom-0 right-[20%] w-[1px] bg-gradient-to-b from-transparent via-[#ffffff0a] to-transparent"
          animate={{ y: ["-100%", "100%"] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear", delay: 5 }}
        />

        {/* Faint oversized word directly centered behind the text */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[45%] text-[18rem] md:text-[28rem] font-bold tracking-tighter text-white/[0.04] select-none blur-[4px] w-full text-center mask-image-[linear-gradient(to_bottom,transparent,black_40%,black_60%,transparent)]">
          PHILOSOPHY
        </div>
        
        {/* Soft radial glow directly behind the content (gold + blue mix) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] md:w-[900px] md:h-[900px] rounded-full blur-[120px]" 
             style={{ background: "radial-gradient(circle, rgba(255,200,80,0.08) 0%, rgba(30,80,200,0.06) 50%, transparent 100%)" }} />
      </div>

      <div className="container mx-auto px-6 relative z-10 w-full flex flex-col items-center">
        {/* Label */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex justify-center mb-10"
        >
          <span className="px-5 py-2 rounded-full border border-[#D4AF37]/30 text-[#D4AF37] text-[11px] font-bold tracking-[0.2em] uppercase bg-black/40 backdrop-blur-md shadow-[0_0_20px_rgba(212,175,55,0.1)]">
            Philosophy
          </span>
        </motion.div>

        <div className="flex flex-col items-center max-w-4xl mx-auto text-center w-full">
          {/* HERO STATEMENT */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mb-14"
          >
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-[1.1] mb-6">
              We don’t just fix elevators
            </h2>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <h3 className="text-2xl md:text-4xl lg:text-5xl font-medium text-white/90 tracking-tight">
                We <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#F5D061]">predict issues</span> before they happen.
              </h3>
            </motion.div>
          </motion.div>

          {/* SECONDARY LINES */}
          <motion.div 
            className="flex flex-col gap-6 md:gap-8 items-center text-center max-w-2xl"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={{
              visible: { transition: { staggerChildren: 0.25, delayChildren: 0.6 } },
              hidden: {}
            }}
          >
            <motion.p 
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } }
              }}
              className="text-lg md:text-2xl text-white/80 font-normal tracking-wide"
            >
              We communicate clearly at every step
            </motion.p>
            
            <motion.p 
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } }
              }}
              className="text-lg md:text-2xl text-white/80 font-normal tracking-wide"
            >
              Built on proactive maintenance and digital <span className="text-[#D4AF37] font-medium">transparency</span>
            </motion.p>

            <motion.p 
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } }
              }}
              className="text-lg md:text-2xl text-white/80 font-normal tracking-wide"
            >
              Driven by a commitment to <span className="text-[#D4AF37] font-medium">safety</span> and satisfaction
            </motion.p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Services = () => (
  <>
    <PageHero title="Our Services" subtitle="Expert elevator solutions covering everything from seamless installation to proactive lifecycle maintenance—designed to guarantee absolute safety, superior performance, and unmatched reliability." backgroundImage="/images/hero-services.webp" />

    <TrustBadges />

    <ServicePhilosophySection />

    <CinematicFeatureSection />

    <section className="py-10 md:py-16 section-glow relative">
      <SectionDivider />
      <div className="container mx-auto px-6 pt-8 relative z-10">
        <SectionHeading badge="AMC Plans" title="Annual Maintenance Contract Plans" subtitle="Choose a plan that fits your needs and budget" />
        <div className="grid md:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
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

    <InteractiveModernization />

  </>
);

export default Services;
