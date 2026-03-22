import { Link } from "react-router-dom";
import Lenis from 'lenis';
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeading, GlassCard, StatCard, ScrollReveal, FloatingParticles, SectionDivider, StaggerContainer, StaggerChild } from "@/components/ui/shared";
import { Shield, Zap, Award, Users, Building2, Wrench, ChevronRight, CheckCircle2, Phone, Mail, MapPin, ChevronDown, PhoneCall, ArrowRight, ArrowLeft, Home, Building, Hospital, Hotel, Factory, Search, PenTool, Settings, HardHat, BadgeCheck, Send, Activity, Star, Leaf, Volume2, Brain, Smartphone, BarChart3, Truck, Clock, Headphones } from "lucide-react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { TrustBadges } from "@/components/CTABanner";
import BrochureDownload from "@/components/BrochureDownload";
import React, { useState, useEffect, useRef } from "react";
import { submitLead, SUCCESS_MESSAGE } from "@/lib/submitLead";
import { toast } from "@/hooks/use-toast";

const rotatingWords = ["Trust", "Safety", "Innovation", "Reliability", "Excellence"];

const Hero = () => {
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % rotatingWords.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center pt-32 lg:pt-40 pb-16 overflow-hidden">
      <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover">
        <source src="/videos/hero-bg.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.55), rgba(0,0,0,0.45), rgba(0,0,0,0.65))" }} />
      <div className="absolute inset-0 bg-gradient-to-r from-[hsl(213_62%_6%/0.4)] via-transparent to-[hsl(213_62%_6%/0.4)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_40%,hsl(43_66%_52%/0.06),transparent_70%)]" />
      <FloatingParticles count={30} />
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.7 }} className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mb-12 mt-8 lg:mt-12">
            {[
              { icon: <Shield className="w-4 h-4" />, label: "ISO Certified" },
              { icon: <Award className="w-4 h-4" />, label: "Licensed Company" },
              { icon: <Zap className="w-4 h-4" />, label: "99% Automation" },
              { icon: <Truck className="w-4 h-4" />, label: "Quick & Fast Delivery" },
            ].map((badge, i) => (
              <motion.span key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 + i * 0.1, duration: 0.5 }} className="flex items-center gap-2 text-white text-sm font-medium px-4 py-2 rounded-full border border-[rgba(255,255,255,0.2)] backdrop-blur-md bg-[rgba(255,255,255,0.08)]">
                <span className="text-primary">{badge.icon}</span>
                {badge.label}
              </motion.span>
            ))}
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 1, ease: [0.22, 1, 0.36, 1] as const }} className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-heading font-extrabold text-white mb-6 leading-[0.9] tracking-tight">
            <span
              className="shiny-text"
              style={{
                filter: "brightness(1.8) drop-shadow(0 0 24px hsl(43 66% 52% / 0.7))",
              }}
            >Exceeding</span>
            <br />
            <span className="inline-flex relative h-[1.3em] overflow-hidden align-middle justify-center px-1 text-5xl md:text-6xl lg:text-7xl xl:text-8xl mt-2 pb-2">
              {/* Invisible placeholder for fixed layout width based on the longest word */}
              <span className="invisible pointer-events-none whitespace-nowrap opacity-0">Reliability</span>
              
              <AnimatePresence>
                <motion.span
                  key={rotatingWords[wordIndex]}
                  className="shiny-text-gold absolute inset-0 flex items-center justify-center whitespace-nowrap"
                  initial={{ opacity: 0, y: 50, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -50, filter: "blur(8px)" }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
                >
                  {rotatingWords[wordIndex]}
                </motion.span>
              </AnimatePresence>
            </span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 0.7 }} className="text-xl md:text-2xl text-white/90 font-light mb-3 tracking-[0.1em] uppercase">Engineering the Future</motion.p>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 0.7 }} className="text-base md:text-lg text-white/85 max-w-2xl mx-auto mb-12 leading-relaxed">
            Next-generation elevator solutions built on strong technical foundations, youthful leadership, and an uncompromising commitment to quality.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1, duration: 0.6 }} className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="group inline-flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-gold-light text-primary-foreground px-10 py-4 rounded-full font-semibold text-base transition-all duration-400 hover:shadow-[0_0_40px_hsl(43_66%_52%/0.4),0_0_80px_hsl(43_66%_52%/0.15)] hover:scale-105 active:scale-100 btn-glow">
              Book Free Inspection <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
            <a href="tel:+919844002026" className="group inline-flex items-center justify-center gap-2 border border-foreground/15 text-foreground px-10 py-4 rounded-full font-semibold text-base hover:bg-foreground/8 hover:border-foreground/25 transition-all duration-400 backdrop-blur-md">
              <PhoneCall className="w-4 h-4 group-hover:animate-pulse" /> Call Us Now
            </a>
          </motion.div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-background via-background/80 to-transparent" />
    </section>
  );
};

const missionVisionCards = [
  {
    icon: <Zap className="w-7 h-7" />,
    label: "Vision",
    description:
      "To be a trusted and innovative elevator company, setting industry benchmarks in safety, quality, and engineering excellence while delivering reliable vertical mobility solutions. We strive for sustainable growth through integrity, advanced technology, and a strong commitment to customer satisfaction.",
    delay: 0,
  },
  {
    icon: <Shield className="w-7 h-7" />,
    label: "Mission",
    description:
      "To design and deliver safe, efficient, and reliable elevator solutions with uncompromising quality standards, ethical practices, and continuous improvement. We aim to build lasting relationships with customers, partners, and our team while contributing to modern infrastructure development.",
    delay: 0.15,
  },
  {
    icon: <Star className="w-7 h-7" />,
    label: "Quality Commitment",
    description:
      "Quality is the foundation of X Elevators Pvt. Ltd. We are committed to delivering superior elevator solutions through stringent safety compliance, proven components, precision execution, and continuous performance improvement—ensuring long-term reliability and trust.",
    delay: 0.3,
  },
];

const MissionVisionCard = ({ card }: { card: typeof missionVisionCards[0] }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = cardRef.current;
    if (!container) return;

    const canvas = document.createElement('canvas');
    canvas.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:100%;z-index:0;pointer-events:none;';
    container.insertBefore(canvas, container.firstChild);

    const ctx = canvas.getContext('2d')!;
    let animId: number;
    let isHovered = false;

    interface Particle {
      x: number; y: number;
      scatterX: number; scatterY: number;
      targetX: number; targetY: number;
      size: number; opacity: number;
    }

    let particles: Particle[] = [];

    const resize = () => {
      const rect = container.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
      buildParticles();
    };

    const buildParticles = () => {
      const w = canvas.width;
      const h = canvas.height;
      // Minimalist: exactly 50 particles per card
      const count = 50; 

      // Brackets logic scaled for card size
      const shapePoints: { x: number; y: number }[] = [];
      const cx = w / 2;
      const cy = h / 2;
      const rx = w * 0.44;  
      const ry = h * 0.40;
      const arcPoints = 25;

      for (let i = 0; i < arcPoints; i++) {
        const t = (i / arcPoints) * Math.PI - Math.PI / 2;
        shapePoints.push({
          x: cx - rx * 0.92 + Math.cos(t) * rx * 0.12,
          y: cy + Math.sin(t) * ry,
        });
      }
      for (let i = 0; i < arcPoints; i++) {
        const t = (i / arcPoints) * Math.PI - Math.PI / 2;
        shapePoints.push({
          x: cx + rx * 0.92 - Math.cos(t) * rx * 0.12,
          y: cy + Math.sin(t) * ry,
        });
      }

      particles = Array.from({ length: count }, (_, i) => {
        const sp = shapePoints[i % shapePoints.length];
        const sx = Math.random() * w;
        const sy = Math.random() * h;
        return {
          x: sx, y: sy,
          scatterX: sx, scatterY: sy,
          targetX: sp.x, targetY: sp.y,
          size: Math.random() * 0.8 + 0.6, // Smaller elegant dots
          opacity: Math.random() * 0.3 + 0.1,
        };
      });
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const goldR = 213, goldG = 168, goldB = 52;

      particles.forEach(p => {
        const gx = isHovered ? p.targetX : p.scatterX;
        const gy = isHovered ? p.targetY : p.scatterY;
        p.x += (gx - p.x) * 0.08;
        p.y += (gy - p.y) * 0.08;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${goldR},${goldG},${goldB},${isHovered ? p.opacity + 0.25 : p.opacity})`;
        ctx.fill();
      });

      animId = requestAnimationFrame(draw);
    };

    const onEnter = () => { isHovered = true; };
    const onLeave = () => { isHovered = false; };

    container.addEventListener('mouseenter', onEnter);
    container.addEventListener('mouseleave', onLeave);

    const ro = new ResizeObserver(resize);
    ro.observe(container);
    resize();
    draw();

    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
      container.removeEventListener('mouseenter', onEnter);
      container.removeEventListener('mouseleave', onLeave);
      canvas.remove();
    };
  }, []);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 45 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, delay: card.delay, ease: [0.22, 1, 0.36, 1] as const }}
      whileHover={{ y: -10, transition: { duration: 0.3, ease: "easeOut" } }}
      className="group relative rounded-3xl overflow-hidden cursor-pointer h-full"
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

      {/* Background inner glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      <div className="relative z-10 p-8 lg:p-10">
        <h3 className="text-xl lg:text-2xl font-heading font-bold text-foreground mb-5">
          Our <span className="text-primary">{card.label}</span>
        </h3>
        <div className="w-10 h-px bg-gradient-to-r from-primary/60 to-transparent mb-5 group-hover:w-16 transition-all duration-500" />
        <p className="text-muted-foreground/75 text-sm lg:text-base leading-relaxed">
          {card.description}
        </p>
      </div>
    </motion.div>
  );
};

const MissionVision = () => (
  <section className="py-10 md:py-16 section-glow relative overflow-hidden">
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_60%,hsl(43_66%_52%/0.04),transparent_70%)] pointer-events-none" />
    <div className="container mx-auto px-6 relative z-10">
      <SectionHeading
        badge="Who We Are"
        title="Our Mission & Vision"
        subtitle="Committed to transforming vertical mobility with innovation and safety"
      />
      <div className="grid md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
        {missionVisionCards.map((card) => (
          <MissionVisionCard key={card.label} card={card} />
        ))}
      </div>
    </div>
  </section>
);


const impactStats = [
  { value: "75+", label: "Projects Installed", sub: "by our hands" },
  { value: "120+", label: "Customers Served", sub: "Trusted partnerships" },
  { value: "ISO", label: "Certified Standard", sub: "Quality assured" },
  { value: "99%", label: "Automation", sub: "Digital processes" },
  { value: "Fast", label: "Quick Deliver", sub: "Timeline" },
  { value: "5", label: "Cities Covered", sub: "South India" },
  { value: "25+", label: "Peoples", sub: "Dedicated professionals committed to excellence" },
];

const impactFeatures = [
  {
    icon: <PenTool className="w-6 h-6" />,
    title: "Customization Experts",
    desc: "From basic MS powder-coated to premium gold finishes – we tailor every elevator to match your building's aesthetic perfectly.",
    tags: ["Custom Cabin Designs", "Branded Interiors", "Flexible Sizing"],
  },
  {
    icon: <BarChart3 className="w-6 h-6" />,
    title: "Transparent Pricing",
    desc: "Our Total Cost of Ownership model ensures no hidden charges. Get lifetime cost clarity from day one.",
    tags: ["No Hidden Costs", "TCO Calculator", "Flexible Payment Plans"],
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: "Certified Safety Standards",
    desc: "ISO 9001:2015 certified with multiple safety certifications ensuring the highest safety standards.",
    tags: ["ISO Certified", "CE Marked", "BIS Approved"],
  },
  {
    icon: <Smartphone className="w-6 h-6" />,
    title: "Digital-First Service",
    desc: "Experience modern service with IoT monitoring and digital maintenance records.",
    tags: ["IoT Enabled", "Digital Records", "Real-time Monitoring"],
  },
  {
    icon: <Headphones className="w-6 h-6" />,
    title: "24x7 Expert Support",
    desc: "Round-the-clock emergency support with <60 minute response time and certified technicians.",
    tags: ["Emergency Response", "Expert Technicians", "Preventive Maintenance"],
  },
];

const ImpactMetrics = () => {
  const [activeBg, setActiveBg] = useState(0);

  const bgImages = [
    "https://images.unsplash.com/photo-1541888049645-00c776d6fc1a?q=80&w=2940&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=3271&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=3174&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2940&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=2938&auto=format&fit=crop"
  ];

  return (
    <section className="py-10 md:py-16 relative overflow-hidden">
      <SectionDivider />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,hsl(43_66%_52%/0.04),transparent_70%)]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="container mx-auto px-6 pt-8 relative z-10">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as const }}
          className="mb-8 text-center"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-[3.5rem] font-heading font-bold tracking-tight leading-[1.1] mb-5">
            Our <span className="text-primary">Impact</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-base lg:text-lg leading-relaxed opacity-80">
            We don't just install elevators – we engineer complete vertical transportation solutions that combine innovation, reliability, and exceptional service.
          </p>
        </motion.div>

        {/* 7 Stat Cards Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 lg:gap-4 max-w-6xl mx-auto mb-8">
          {impactStats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] as const }}
              whileHover={{ y: -6, transition: { duration: 0.28, ease: "easeOut" } }}
              className="group relative rounded-2xl p-4 lg:p-5 text-center cursor-pointer"
              style={{
                background: "linear-gradient(160deg, hsl(212 50% 15% / 0.55) 0%, hsl(212 48% 10% / 0.4) 100%)",
                backdropFilter: "blur(20px)",
                border: "1px solid hsl(43 66% 52% / 0.1)",
                boxShadow: "inset 0 1px 0 hsl(0 0% 100% / 0.05), 0 8px 32px hsl(213 62% 3% / 0.3)",
              }}
            >
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <p className="text-2xl lg:text-3xl font-heading font-extrabold text-primary mb-1 leading-none">{stat.value}</p>
              <p className="text-foreground text-xs font-semibold mb-0.5">{stat.label}</p>
              <p className="text-muted-foreground/60 text-[10px] leading-tight">{stat.sub}</p>
            </motion.div>
          ))}
        </div>

        {/* 5 Feature Cards - Reference Styling Swiper */}
        <div className="max-w-[1100px] mx-auto relative">
          <div className="overflow-hidden">
            <Swiper
              modules={[Navigation, Autoplay]}
              loop={true}
              centeredSlides={true}
              slidesPerView={1}
              spaceBetween={28}
              autoplay={{ delay: 5000, disableOnInteraction: false }}
              navigation={{
                nextEl: '.swiper-button-next-custom',
                prevEl: '.swiper-button-prev-custom',
              }}
              breakpoints={{
                768: { slidesPerView: 3, spaceBetween: 36 },
              }}
              onSlideChange={(swiper) => setActiveBg(swiper.realIndex)}
              className="py-10 flex items-stretch h-[520px]"
            >
              {impactFeatures.map((feat, i) => (
                <SwiperSlide key={feat.title} className="transition-all duration-700 h-full flex pt-8 pb-8 md:pt-0 md:pb-0">
                  {({ isActive }) => (
                    <div className={`w-full flex justify-center items-center transition-all duration-700 h-full ${isActive ? 'scale-[1.04] z-20' : 'scale-90 z-10 opacity-70 hover:opacity-90'}`}>

                      <div
                        className={`group relative w-full h-[380px] md:h-[420px] lg:h-full flex flex-col justify-start transition-all duration-700 overflow-hidden rounded-xl ${isActive
                          ? "bg-[#0a0a0a] border border-white/10 shadow-2xl"
                          : "border border-primary/20 shadow-[0_0_24px_hsl(43_66%_52%/0.08),inset_0_1px_0_hsl(43_66%_52%/0.12)]"
                          }`}
                        style={!isActive ? {
                          background: "linear-gradient(160deg, hsl(212 50% 14% / 0.7) 0%, hsl(212 48% 9% / 0.55) 100%)",
                          backdropFilter: "blur(20px) saturate(1.4)",
                          WebkitBackdropFilter: "blur(20px) saturate(1.4)",
                        } : undefined}
                      >
                        {/* Gold shimmer top line on inactive cards */}
                        {!isActive && (
                          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent pointer-events-none" />
                        )}

                        {/* Active Card Image Layer (top 40%) */}
                        {isActive && (
                          <div className="relative w-full overflow-hidden bg-[#1a1a1a]" style={{ height: '40%' }}>
                            <img src={bgImages[i]} className="w-full h-full object-cover opacity-50" alt="" />
                            <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#0a0a0a] to-transparent pointer-events-none" />
                          </div>
                        )}

                        {/* Text Layout — 60% for active, full height centered for inactive */}
                        <div
                          className={`p-5 lg:p-6 transition-all duration-700 w-full flex flex-col ${isActive ? 'justify-start text-left' : 'h-full justify-between text-center items-center'
                            }`}
                          style={isActive ? { height: '60%' } : undefined}
                        >
                          <div>
                            <div className={`flex flex-col gap-1 ${isActive ? 'items-start' : 'items-center'}`}>
                              <span className="transition-colors font-bold text-base font-heading text-primary">
                                0{i + 1}
                              </span>
                              <h3 className={`font-heading font-extrabold text-lg md:text-xl transition-colors m-0 ${isActive ? "text-white" : "text-foreground"
                                }`}>{feat.title}</h3>
                            </div>

                            {/* Separator */}
                            <div className={`h-px mt-3 mb-3 transition-all duration-700 ${isActive
                              ? "w-14 bg-gradient-to-r from-primary via-primary/60 to-transparent opacity-100"
                              : "w-10 bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-60 mx-auto"
                              }`} />

                            <p className={`text-xs lg:text-sm leading-relaxed transition-colors ${isActive ? "text-white/80 font-medium" : "text-muted-foreground/70 hidden md:block"
                              }`}>{feat.desc}</p>
                          </div>

                          {/* Tag badges */}
                          <div className={`flex flex-wrap gap-1.5 mt-4 ${isActive ? 'justify-start' : 'justify-center'}`}>
                            {feat.tags.map((tag) => (
                              <span
                                key={tag}
                                className={`px-2.5 py-1 rounded-full text-[10px] font-semibold border whitespace-nowrap transition-all duration-500 ${
                                  isActive
                                    ? 'text-primary border-primary/30 bg-primary/10'
                                    : 'text-primary/60 border-primary/15 bg-primary/5'
                                }`}
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                    </div>
                  )}
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Custom Navigation Arrows — outside overflow-hidden so they're fully visible */}
          <div className="absolute top-1/2 -translate-y-1/2 -left-5 lg:-left-7 z-30 swiper-button-prev-custom w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-[#1a1a1a] flex items-center justify-center text-white hover:text-primary hover:bg-black cursor-pointer transition-all shadow-xl hover:scale-110 border border-white/10">
            <ArrowLeft className="w-4 h-4 lg:w-5 lg:h-5" />
          </div>
          <div className="absolute top-1/2 -translate-y-1/2 -right-5 lg:-right-7 z-30 swiper-button-next-custom w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-[#1a1a1a] flex items-center justify-center text-white hover:text-primary hover:bg-black cursor-pointer transition-all shadow-xl hover:scale-110 border border-white/10">
            <ArrowRight className="w-4 h-4 lg:w-5 lg:h-5" />
          </div>
        </div>

      </div>
    </section>
  );
};



const ScrollStack = ({ children }: { children: React.ReactNode }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
    });

    const updateCardTransforms = () => {
      if (!containerRef.current) return;
      const cards = Array.from(containerRef.current.children) as HTMLElement[];
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const stackSpacing = 40; // Overlap spacing
      const baseOffset = (windowHeight - 400) / 2; // Center cards vertically while pinning

      cards.forEach((card, i) => {
        const rect = card.getBoundingClientRect();
        const cardContainerTop = containerRef.current!.offsetTop;
        // Each card has a specific "start" point in the scroll
        const cardTargetScroll = cardContainerTop + (i * 150); 
        
        let progress = (scrollY - cardTargetScroll) / 500;
        progress = Math.max(0, Math.min(1, progress));

        // Stacking logic
        // We simulate pinning by countering the natural scroll once we reach the target
        const ty = Math.max(0, scrollY - cardTargetScroll);
        
        // Offset each card so they stack with overlap
        const stackOffset = i * stackSpacing;
        
        // Simulation of pinning + stacking
        const finalTy = ty + stackOffset;

        // Depth effect (Scale & Blur)
        const scale = 1 - (progress * 0.05 * (cards.length - 1 - i) / cards.length);
        const blur = progress * (cards.length - 1 - i) * 0.5;

        card.style.transform = `translate3d(0, ${finalTy}px, 0) scale(${1 - (progress * 0.05)})`;
        card.style.zIndex = `${i + 10}`;
        card.style.filter = `blur(${blur}px)`;
        // Optional: fade out previous cards slightly
        card.style.opacity = `${1 - (progress * 0.2 * (i < cards.length - 1 ? 1 : 0))}`;
      });
    };

    function raf(time: number) {
      lenis.raf(time);
      updateCardTransforms();
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    window.addEventListener('scroll', updateCardTransforms);

    return () => {
      lenis.destroy();
      window.removeEventListener('scroll', updateCardTransforms);
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="scroll-stack-container relative display-block max-w-[600px] mx-auto"
      style={{ 
        position: 'relative', 
        display: 'block', 
        maxWidth: '600px', 
        margin: '0 auto',
        paddingBottom: '400px' // Space for stacking
      }}
    >
      {React.Children.map(children, (child, i) => (
        <div 
          key={i} 
          className="scroll-stack-item relative mb-[100px] last:mb-0"
          style={{ 
            position: 'relative', 
            willChange: 'transform, filter',
            marginBottom: '100px'
          }}
        >
          {child}
        </div>
      ))}
    </div>
  );
};

const IndustriesServed = () => {
  const industries = [
    { icon: <Home className="w-7 h-7" />, label: "Residential Buildings", desc: "Villas, apartments & gated communities" },
    { icon: <Hospital className="w-7 h-7" />, label: "Hospitals & Healthcare", desc: "Stretcher-compatible medical elevators" },
    { icon: <Building className="w-7 h-7" />, label: "Malls & Commercial", desc: "High-traffic commercial complexes" },
    { icon: <Hotel className="w-7 h-7" />, label: "Hotels & Hospitality", desc: "Premium guest experience elevators" },
    { icon: <Factory className="w-7 h-7" />, label: "IT Parks & Offices", desc: "Smart elevators for modern workspaces" },
  ];

  return (
    <section className="py-10 md:py-16 relative section-mesh">
      <SectionDivider />
      <div className="container mx-auto px-6 pt-8 relative z-10">
        <SectionHeading badge="Industries" title="Industries We Serve" subtitle="Trusted across diverse sectors for premium vertical transportation" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 max-w-5xl mx-auto">
          {industries.map((ind, i) => (
            <ScrollReveal key={ind.label} delay={i * 0.08}>
              <GlassCard className="p-6 text-center group h-full" premium tilt>
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
    { img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&h=800&fit=crop", icon: <Search className="w-5 h-5 lg:w-6 lg:h-6" />, title: "Consultation / Site Inspection", desc: "Our engineers understand your requirements and visit your site to assess shaft dimensions and structural feasibility." },
    { img: "https://images.unsplash.com/photo-1541888049645-00c776d6fc1a?w=600&h=800&fit=crop", icon: <CheckCircle2 className="w-5 h-5 lg:w-6 lg:h-6" />, title: "Order Confirmation", desc: "Finalizing custom elevator design, capacity, and aesthetics before kicking off manufacturing." },
    { img: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&h=800&fit=crop", icon: <Settings className="w-5 h-5 lg:w-6 lg:h-6" />, title: "Production", desc: "Precision manufacturing with quality-controlled components, ready for seamless installation." },
    { img: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&h=800&fit=crop", icon: <Truck className="w-5 h-5 lg:w-6 lg:h-6" />, title: "Delivery", desc: "Components are carefully transported and delivered to your site on schedule, ready for installation." },
    { img: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=600&h=800&fit=crop", icon: <HardHat className="w-5 h-5 lg:w-6 lg:h-6" />, title: "Installation / Testing", desc: "Professional installation by certified technicians followed by comprehensive system testing and commissioning." },
    { img: "https://images.unsplash.com/photo-1584724391642-a392e21b0e2b?w=600&h=800&fit=crop", icon: <BadgeCheck className="w-5 h-5 lg:w-6 lg:h-6" />, title: "Safety & Quality / Handover", desc: "Rigorous safety certification, final demonstration of features, and handover with initiation of your warranty period." },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleClick = () => {
    setCurrentIndex(prev => {
      const next = prev + 1;
      return next > 3 ? 0 : next;
    });
  };

  return (
    <section className="py-8 md:py-12 section-glow relative bg-background">
      <SectionDivider />
      <div className="container mx-auto px-6 relative z-10 text-center mb-8 section-container" style={{ paddingTop: '40px' }}>
        <SectionHeading badge="Our Process" title="How We Deliver" subtitle="A streamlined 6-step process from consultation to handover" />
        <p className="-mt-10 mb-0 text-center text-sm lg:text-base font-medium text-gradient-gold tracking-wide">
          Quick and efficient delivery timeline
        </p>
      </div>
        
      <div 
        className="carousel-container relative w-full lg:max-w-none max-w-5xl mx-auto px-4 lg:px-[10vw] cursor-pointer lg:overflow-hidden pb-16"
        onClick={handleClick}
      >
        <div 
          className="carousel-track grid grid-cols-1 sm:grid-cols-2 gap-4 lg:flex lg:gap-[40px] transition-transform duration-[800ms] ease-in-out lg:w-max lg:[transform:translateX(var(--translate-x))]" 
          style={{ '--translate-x': `-${currentIndex * 380}px` } as React.CSSProperties}
        >
          {steps.map((step, i) => {
            return (
              <div 
                key={step.title}
                className="process-card w-full lg:min-w-[340px] lg:w-[340px] h-[380px] lg:h-[420px] lg:flex-shrink-0 transition-all duration-[350ms] ease-out relative rounded-[24px] overflow-hidden flex items-end opacity-100 hover:-translate-y-1.5 hover:scale-[1.06] hover:z-10 hover:shadow-[0_20px_40px_rgba(0,0,0,0.4),0_0_25px_hsl(43_66%_52%/0.35)] group after:absolute after:inset-0 after:rounded-[24px] after:pointer-events-none after:border after:border-transparent after:transition-colors after:duration-300 hover:after:border-primary/60"
                style={{
                  backgroundImage: `url('${step.img}')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                } as React.CSSProperties}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none transition-opacity duration-500 group-hover:from-black" />
                
                <div className="card-content relative z-[2] p-5 lg:p-[24px] text-white w-full text-left flex flex-col justify-end">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl bg-white/15 backdrop-blur-md flex items-center justify-center text-primary border border-white/20 shadow-[0_0_15px_hsl(43_66%_52%/0.3)] mt-auto">
                      {step.icon}
                    </div>
                    <div className="text-white/40 font-heading font-extrabold text-3xl lg:text-4xl">
                      {String(i + 1).padStart(2, "0")}
                    </div>
                  </div>
                  <h3 className="text-white text-lg lg:text-xl font-heading font-semibold mb-2">{step.title}</h3>
                  <p className="text-white/70 text-xs lg:text-sm leading-relaxed">{step.desc}</p>
                </div>
              </div>
            );
          })}
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
    <section className="py-10 md:py-16 section-glow section-mesh relative">
      <SectionDivider />
      <div className="container mx-auto px-6 pt-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 items-start">
          {/* LEFT SIDE: Sticky Text */}
          <div className="lg:sticky lg:top-[120px] lg:pt-10 text-center lg:text-left [&_p]:lg:mx-0">
            <SectionHeading badge="What We Offer" title="Complete Elevator Solutions" subtitle="End-to-end elevator services from design and installation to maintenance and modernization" center={false} />
          </div>

          {/* RIGHT SIDE: Scroll Stacking Cards */}
          <div className="flex flex-col relative pb-10 lg:pb-[10vh]">
            {solutions.map((s, i) => (
              <div
                key={i}
                className="relative lg:sticky mb-6 lg:mb-[35vh] transition-transform duration-500 ease-in-out"
                style={{
                  top: `calc(120px + ${i * 20}px)`,
                  zIndex: i + 10,
                }}
              >
                <GlassCard className="p-7 group w-full shadow-2xl" delay={i * 0.1} premium tilt>
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/15 to-primary/5 flex items-center justify-center mb-5 text-primary group-hover:from-primary group-hover:to-gold-light group-hover:text-primary-foreground transition-all duration-500 icon-glow group-hover:shadow-[0_0_30px_hsl(43_66%_52%/0.3)]">
                    {s.icon}
                  </div>
                  <h3 className="text-lg font-heading font-semibold text-foreground mb-3">{s.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-5 opacity-75">{s.desc}</p>
                  <span className="text-primary text-sm font-medium flex items-center gap-1.5 group-hover:gap-3 transition-all duration-300">
                    Explore <ChevronRight className="w-4 h-4" />
                  </span>
                </GlassCard>
              </div>
            ))}
          </div>
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
      iconBg: "bg-brand/20 text-brand border border-brand/40",
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
      badge: { text: "New Trend", color: "bg-brand text-white", icon: <Star className="w-3 h-3 mr-1.5" /> },
      cardStyle: "bg-[#0f172a] border-brand/50 shadow-xl text-[#F5D061]",
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
    <section className="py-10 md:py-16 relative">
      <SectionDivider />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_30%_at_50%_50%,hsl(43_66%_52%/0.03),transparent)]" />

      {/* SECTION HEADER */}
      <div className="container mx-auto px-6 relative z-10 text-center mb-8">
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

      <div className="container mx-auto px-6 relative z-10">
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

              <div className={`relative flex flex-col w-full h-full p-8 rounded-xl border transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl glare-hover ${f.cardStyle}`}>

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
                  Book Free Inspection
                </Link>
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
    {
      name: "Silver",
      price: "₹20,000",
      features: [
        "Bimonthly maintenance",
        "24/7 emergency support",
        "Non comprehensive",
        "Unlimited breakdown support",
        "Digital reports",
        "Parts at additional cost",
      ],
    },
    {
      name: "Gold",
      price: "₹35,000",
      features: [
        "Bimonthly maintenance",
        "24/7 emergency support",
        "Semi comprehensive",
        "Unlimited breakdown support",
        "Digital reports",
        "Discounted parts replacement",
      ],
      popular: true,
    },
    {
      name: "Platinum",
      price: "₹70,000",
      features: [
        "Monthly maintenance",
        "Priority emergency support",
        "Predictive maintenance",
        "Unlimited breakdown support",
        "Digital reports",
        "Comprehensive",
        "Free parts replacement",
      ],
    },
  ];

  return (
    <section className="py-10 md:py-16 relative section-mesh">
      <SectionDivider />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_50%,hsl(43_66%_52%/0.03),transparent)]" />
      <div className="container mx-auto px-6 pt-8 relative z-10">
        {/* Title matching Base44: "Annual Maintenance Contract Plans" */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as const }}
          className="mb-8 text-center"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold tracking-tight leading-[1.1]">
            Annual Maintenance{" "}
            <span className="text-primary">Contract Plans</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto items-start">
          {plans.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] as const }}
              className={`relative rounded-2xl overflow-hidden ${p.popular ? "mt-[-16px]" : ""}`}
              style={{
                background: p.popular
                  ? "linear-gradient(160deg, hsl(212 50% 14% / 0.9) 0%, hsl(212 48% 10% / 0.85) 100%)"
                  : "linear-gradient(160deg, hsl(212 50% 15% / 0.7) 0%, hsl(212 48% 10% / 0.55) 100%)",
                backdropFilter: "blur(24px)",
                border: p.popular
                  ? "1px solid hsl(43 66% 52% / 0.35)"
                  : "1px solid hsl(43 66% 52% / 0.1)",
                boxShadow: p.popular
                  ? "0 0 60px hsl(43 66% 52% / 0.12), 0 20px 60px hsl(213 62% 3% / 0.5)"
                  : "0 12px 40px hsl(213 62% 3% / 0.3)",
              }}
            >
              {/* Most Popular badge */}
              {p.popular && (
                <div className="flex justify-center pt-4 pb-2">
                  <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-primary to-gold-light text-primary-foreground text-xs font-semibold">
                    <Star className="w-3 h-3" /> Most Popular
                  </span>
                </div>
              )}

              <div className="p-8 lg:p-10">
                <h3 className="text-xl lg:text-2xl font-heading font-bold text-foreground mb-3 text-center">{p.name}</h3>
                <p className="text-center mb-8">
                  <span className="text-3xl lg:text-4xl font-heading font-extrabold text-primary">{p.price}</span>
                  <span className="text-muted-foreground/60 text-sm">/year</span>
                </p>

                <ul className="space-y-3 mb-8">
                  {p.features.map((f) => (
                    <li key={f} className="text-muted-foreground text-sm flex items-center gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-primary shrink-0" /> {f}
                    </li>
                  ))}
                </ul>

                <Link
                  to="/contact"
                  className={`block w-full py-3.5 rounded-xl font-semibold text-sm text-center transition-all duration-300 ${p.popular
                    ? "bg-gradient-to-r from-primary to-gold-light text-primary-foreground hover:shadow-[0_0_30px_hsl(43_66%_52%/0.4)] hover:scale-[1.02]"
                    : "bg-white/8 text-foreground border border-white/10 hover:bg-white/12 hover:border-white/20"
                    }`}
                >
                  Choose {p.name}
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};


const FAQ = () => {
  const [openItem, setOpenItem] = useState<number | null>(null);

  const categories = [
    {
      title: "🏆 Brand Dominance",
      items: [
        {
          id: 1,
          question: "Why is X Elevators considered a superior choice in the industry?",
          answer:
            "X Elevators delivers premium design excellence, disciplined execution timelines, and lifetime technical partnership—setting a higher standard than conventional suppliers.",
        },
        {
          id: 2,
          question: "What truly differentiates X Elevators from other elevator companies?",
          answer:
            "X Elevators combines architectural-grade cabin aesthetics, structured SOP-driven execution, and transparent pricing under one accountable system.",
        },
      ],
    },
    {
      title: "🎨 Cabin Design Excellence",
      items: [
        {
          id: 3,
          question: "How does X Elevators ensure unmatched cabin design quality?",
          answer:
            "X Elevators custom-engineers every cabin to enhance the building’s visual identity—from refined finishes to luxury statement interiors.",
        },
        {
          id: 4,
          question: "Can X Elevators match premium architectural and branding requirements?",
          answer:
            "Yes, X Elevators collaborates closely with architects and builders to deliver elevators that complement high-end project standards.",
        },
      ],
    },
    {
      title: "⚡ Timeline & Execution Discipline",
      items: [
        {
          id: 5,
          question: "How fast can X Elevators deliver a completed elevator installation?",
          answer:
            "X Elevators follows a committed execution schedule, ensuring efficient project completion without compromising quality.",
        },
        {
          id: 6,
          question: "How does X Elevators prevent project delays?",
          answer:
            "X Elevators activates engineering, procurement, and production immediately after confirmation under a strict SOP-based workflow.",
        },
      ],
    },
    {
      title: "💰 Pricing Transparency",
      items: [
        {
          id: 7,
          question: "Does X Elevators maintain transparent pricing?",
          answer:
            "X Elevators follows a clearly defined scope and cost structure—ensuring no hidden charges at any stage.",
        },
        {
          id: 8,
          question: "Can X Elevators offer both premium and value-engineered solutions?",
          answer:
            "Yes, X Elevators provides luxury customization or optimized configurations based on project priorities and budget.",
        },
      ],
    },
    {
      title: "🛡 Safety & Compliance",
      items: [
        {
          id: 9,
          question: "How does X Elevators ensure elevator safety and compliance?",
          answer:
            "X Elevators integrates certified components, multi-layer safety systems, and compliance-driven engineering in every installation.",
        },
        {
          id: 10,
          question: "Does X Elevators support statutory approvals and documentation?",
          answer:
            "Yes, X Elevators provides technical documentation and guidance required for regulatory compliance.",
        },
      ],
    },
    {
      title: "♾ Support & Lifetime Partnership",
      items: [
        {
          id: 11,
          question: "What happens after installation with X Elevators?",
          answer:
            "X Elevators continues structured maintenance guidance and technical support beyond project handover.",
        },
        {
          id: 12,
          question: "What does lifetime partnership mean at X Elevators?",
          answer:
            "X Elevators remains a long-term technical partner—supporting performance, upgrades, and service throughout the elevator’s lifecycle.",
        },
      ],
    },
  ];

  const sectionVariants = {
    hidden: { opacity: 0, y: 28 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1] as const,
        staggerChildren: 0.08,
      },
    },
  };

  const categoryVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 18 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  return (
    <motion.section
      className="py-10 md:py-16 section-glow relative overflow-hidden"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      <SectionDivider />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_40%_at_50%_45%,hsl(43_66%_52%/0.14),transparent_70%)] animate-pulse" />
      <div className="container mx-auto px-6 pt-8 relative z-10">
        <div className="max-w-5xl mx-auto">
          <SectionHeading
            badge="FAQ"
            title="Frequently Asked Questions"
            subtitle="Find answers to common questions about our elevator solutions"
          />

          <div className="mt-10 space-y-6">
            {categories.map((category) => (
              <motion.div key={category.title} variants={categoryVariants} className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] as const }}
                  className="relative"
                >
                  <div className="absolute -inset-x-1 -inset-y-1 bg-primary/10 blur-2xl pointer-events-none" />
                  <h3 className="relative text-xl md:text-2xl font-semibold text-primary tracking-tight">
                    {category.title}
                  </h3>
                </motion.div>

                <div className="space-y-4">
                  {category.items.map((item) => {
                    const isOpen = openItem === item.id;

                    return (
                      <motion.div
                        key={item.id}
                        variants={cardVariants}
                        whileHover={{ y: -4 }}
                        whileTap={{ scale: 0.995 }}
                        className={`rounded-xl p-5 backdrop-blur-xl border transition-all duration-300 ${isOpen
                          ? "bg-white/10 border-primary/45 shadow-[0_10px_30px_hsl(43_66%_52%/0.14)]"
                          : "bg-white/5 border-white/10 hover:border-primary/35 hover:shadow-[0_10px_30px_hsl(43_66%_52%/0.12)]"
                          }`}
                      >
                        <button
                          onClick={() => setOpenItem(isOpen ? null : item.id)}
                          className="w-full text-left flex items-start justify-between gap-4"
                        >
                          <div className="pr-3">
                            <p className="text-white font-semibold text-base lg:text-lg">
                              {item.id}. {item.question}
                            </p>
                          </div>
                          <motion.span
                            animate={{ rotate: isOpen ? 180 : 0 }}
                            transition={{ duration: 0.35, ease: "easeInOut" }}
                            className="shrink-0 mt-0.5"
                          >
                            <ChevronDown className="w-5 h-5 text-primary" />
                          </motion.span>
                        </button>

                        <AnimatePresence initial={false}>
                          {isOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.35, ease: "easeInOut" }}
                              className="overflow-hidden"
                            >
                              <p className="text-gray-300 leading-relaxed mt-3">{item.answer}</p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
};

const CTASection = () => (
  <section className="py-20 md:py-32 relative overflow-hidden">
    <SectionDivider />
    
    {/* Background Layers */}
    <div className="absolute inset-0 bg-background pointer-events-none" />
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(218,165,32,0.08),transparent)] pointer-events-none" />
    <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-[0.03] pointer-events-none mix-blend-overlay" />
    
    {/* Animated subtle gradient shift */}
    <motion.div 
      className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 pointer-events-none"
      animate={{
        x: ['-100%', '100%']
      }}
      transition={{
        duration: 15,
        repeat: Infinity,
        ease: "linear"
      }}
    />

    <div className="container mx-auto px-6 pt-12 relative z-10 flex justify-center">
      <ScrollReveal className="w-full max-w-[900px] relative z-10">
        <motion.div 
          className="group relative rounded-[2rem] overflow-hidden"
          whileHover={{ y: -5 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          {/* Soft Shadow + Outer Glow */}
          <div className="absolute inset-0 bg-primary/20 blur-[100px] opacity-0 group-hover:opacity-40 transition-opacity duration-1000 pointer-events-none" />

          {/* Container */}
          <div className="relative h-full w-full rounded-[2rem] bg-[#030303]/60 backdrop-blur-[30px] border border-[rgba(255,215,0,0.15)] p-12 md:p-16 lg:p-24 overflow-hidden flex flex-col items-center text-center shadow-2xl">
            
            {/* Inner Glow / Lighting */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[600px] h-[300px] bg-primary/10 blur-[120px] pointer-events-none" />

            {/* Light Sweep Effect */}
            <div className="absolute inset-0 overflow-hidden rounded-[2rem] pointer-events-none">
              <motion.div 
                className="absolute top-0 bottom-0 w-[200%] bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-45"
                animate={{
                  x: ['-150%', '150%']
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  repeatDelay: 2,
                  ease: "easeInOut"
                }}
              />
            </div>

            <div className="relative z-10 max-w-[700px] w-full flex flex-col items-center">
              <motion.h2 
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="text-4xl md:text-5xl lg:text-6xl font-heading font-extrabold text-white mb-6 tracking-tight leading-tight"
              >
                Ready to <motion.span 
                  className="text-gradient-gold inline-block font-black"
                  animate={{ textShadow: ["0 0 10px rgba(234,179,8,0.2)", "0 0 30px rgba(234,179,8,0.7)", "0 0 10px rgba(234,179,8,0.2)"] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >Elevate</motion.span> Your Prestige?
              </motion.h2>

              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="text-white/70 text-lg md:text-xl mb-12 leading-relaxed font-light max-w-[600px] mx-auto"
              >
                Get a free site inspection and personalized elevator recommendation from our expert engineers.
              </motion.p>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col sm:flex-row gap-5 w-full justify-center"
              >
                {/* Primary CTA */}
                <Link to="/contact" className="group relative inline-flex items-center justify-center gap-3 bg-gradient-to-r from-primary to-gold-light text-primary-foreground px-10 py-5 rounded-full font-semibold text-base transition-all duration-500 hover:scale-[1.03] overflow-hidden">
                  <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute -inset-1 bg-primary/50 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full" />
                  <span className="relative z-10 flex items-center gap-2">
                    Request Free Site Inspection 
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform duration-300" />
                  </span>
                </Link>

                {/* Secondary CTA */}
                <a href="https://wa.me/919844002026" target="_blank" rel="noopener noreferrer" className="group relative inline-flex items-center justify-center gap-3 bg-white/[0.03] backdrop-blur-sm border border-primary/20 text-white px-10 py-5 rounded-full font-semibold text-base transition-all duration-500 hover:bg-white/10 hover:border-primary/50 overflow-hidden">
                  <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 shadow-[inset_0_0_20px_rgba(234,179,8,0.2)] rounded-full transition-opacity duration-500" />
                  <span className="relative z-10 flex items-center gap-2">
                    Chat on WhatsApp
                  </span>
                </a>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </ScrollReveal>
    </div>
  </section>
);

const ContactSection = () => {
  const [form, setForm] = useState({ name: "", phone: "", email: "", company_name: "", elevator_type: "", number_of_floors: "", building_type: "", message: "", address: "" });
  const [budget, setBudget] = useState(15);
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
    const { success, error } = await submitLead({ ...form, budget_range: budget, lead_source: "website_form" });
    setSubmitting(false);
    if (success) {
      toast({ title: "✅ Thank You!", description: SUCCESS_MESSAGE });
      setForm({ name: "", phone: "", email: "", company_name: "", elevator_type: "", number_of_floors: "", building_type: "", message: "", address: "" });
      setBudget(15);
    } else {
      toast({ title: "Submission failed", description: error, variant: "destructive" });
    }
  };
  return (
    <section className="py-10 md:py-16 relative">
      <SectionDivider />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_60%_50%,hsl(43_66%_52%/0.04),transparent)]" />
      <div className="container mx-auto px-6 pt-8 relative z-10">
        <SectionHeading badge="Get In Touch" title="Let's Connect" subtitle="Ready to Elevate Your Prestige? Reach out for a free consultation" />
        <div className="grid lg:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
          <ScrollReveal direction="left">
            <div className="space-y-5">
              {[
                { icon: <Phone className="w-5 h-5" />, title: "Call Us", info: "+91 9844002026 / +91 6384961909" },
                { icon: <Mail className="w-5 h-5" />, title: "Email Us", info: "info@xelevators.in" },
                { icon: <MapPin className="w-5 h-5" />, title: "Visit Us", info: "Karnataka & Tamilnadu, India" },
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
                  <label className="block text-sm font-medium text-foreground/80 mb-1.5">Address</label>
                  <input name="address" value={form.address} onChange={handleChange} placeholder="Your site / building address" className="input-premium w-full" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground/80 mb-2">Budget Range</label>
                  <div className="px-1">
                    <input
                      type="range"
                      min="5"
                      max="50"
                      step="1"
                      value={budget}
                      onChange={(e) => setBudget(Number(e.target.value))}
                      className="w-full h-2 rounded-lg appearance-none cursor-pointer accent-primary bg-white/10"
                      style={{ accentColor: "hsl(43 66% 52%)" }}
                    />
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-muted-foreground/50 text-xs">₹5 Lakhs</span>
                      <span className="text-primary font-semibold text-sm">Selected: ₹{budget} Lakhs</span>
                      <span className="text-muted-foreground/50 text-xs">₹50 Lakhs</span>
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground/80 mb-1.5">Project Details</label>
                  <textarea name="message" value={form.message} onChange={handleChange} placeholder="Tell us about your project requirements, timeline, or any specific needs..." rows={4} className="w-full input-premium resize-none" />
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
  const [isPaused, setIsPaused] = useState(false);

  const features = [
    { img: "https://images.unsplash.com/photo-1541888049645-00c776d6fc1a?w=800&fit=crop", icon: <Zap className="w-5 h-5" />, title: "Premium Quality", subtitle: "Italian engineering excellence" },
    { img: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=800&fit=crop", icon: <Leaf className="w-5 h-5" />, title: "Energy Efficiency", subtitle: "Advanced power-saving technology" },
    { img: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=800&fit=crop", icon: <Shield className="w-5 h-5" />, title: "Durability", subtitle: "Long-lasting components" },
    { img: "https://images.unsplash.com/photo-1626296711019-3ee72c43ab6a?w=800&fit=crop", icon: <Volume2 className="w-5 h-5" />, title: "Smooth Operation", subtitle: "Superior ride comfort" },
  ];

  const motors = [
    {
      id: "hydraulic",
      name: "Italian Hydraulic Unit",
      tagline: "Smooth operation for low-rise buildings",
      image: "https://images.unsplash.com/photo-1541888049645-00c776d6fc1a?w=800&fit=crop",
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
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&fit=crop",
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
      image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&fit=crop",
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

  useEffect(() => {
    if (isPaused || window.innerWidth < 1024) return;
    const timer = setInterval(() => {
      setActiveMotor((prev) => (prev + 1) % motors.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [isPaused, motors.length]);

  const handleNext = () => {
    setActiveMotor((prev) => (prev + 1) % motors.length);
    setIsPaused(true);
  };
  
  const handlePrev = () => {
    setActiveMotor((prev) => (prev - 1 + motors.length) % motors.length);
    setIsPaused(true);
  };

  return (
    <section className="mt-10 md:mt-12 mb-10 md:mb-12 relative z-10 w-full overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl">
        {/* PART 1: Feature Highlights Row (Horizontal Hover Expansion) */}
        <div className="flex flex-col lg:flex-row h-auto lg:h-[300px] gap-4 lg:gap-5 mb-8 group/section feature-section">
          {features.map((feat, idx) => (
            <div 
              key={idx} 
              className="feature-card relative rounded-[20px] overflow-hidden flex flex-col justify-end p-6 bg-white/5 transition-all duration-500 ease-in-out lg:flex-1 lg:hover:flex-[2.5] group/card opacity-100 lg:group-hover/section:opacity-50 lg:hover:!opacity-100 min-h-[160px] lg:min-h-0"
            >
              {/* Hover Image */}
              <div 
                className="absolute inset-0 bg-cover bg-center opacity-40 lg:opacity-0 lg:group-hover/card:opacity-100 transition-opacity duration-500 ease-in-out z-0"
                style={{ backgroundImage: `url('${feat.img}')` }}
              />
              
              {/* Dark Overlay gradient for text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-[1]" />

              {/* Text Content */}
              <div className="relative z-[2] flex flex-col">
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center text-primary mb-3 transition-all duration-500 lg:group-hover/card:scale-110 lg:group-hover/card:bg-primary lg:group-hover/card:text-primary-foreground border border-white/10 lg:group-hover/card:border-transparent">
                  {feat.icon}
                </div>
                <h3 className="text-white font-semibold text-xl lg:text-[22px] mb-1 transition-transform duration-500 lg:-translate-y-2 lg:group-hover/card:translate-y-0">{feat.title}</h3>
                <p className="text-white/70 text-sm opacity-100 lg:opacity-0 transition-all duration-500 lg:translate-y-4 lg:group-hover/card:translate-y-0 lg:group-hover/card:opacity-100 font-medium">{feat.subtitle}</p>
              </div>
            </div>
          ))}
        </div>

        {/* PART 2: Technology Selector Panel (3-Panel Premium UI) */}
        <div 
          className="grid grid-cols-1 lg:grid-cols-[300px_420px_1fr] gap-[24px] items-stretch h-auto lg:h-[500px]"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => window.innerWidth >= 1024 && setIsPaused(false)}
        >
          {/* Column 1 - Main Cards */}
          <div className="flex flex-col h-full relative">
            <div className="flex flex-col gap-4 flex-1">
              {motors.map((motor, idx) => {
                const isActive = activeMotor === idx;
                return (
                  <button
                    key={motor.id}
                    onClick={() => {
                      setActiveMotor(idx);
                      setIsPaused(true);
                    }}
                    className={`w-full text-left p-5 rounded-2xl border transition-all duration-300 flex flex-col justify-center flex-1 ${isActive
                      ? "bg-black/40 border-[#D4AF37] shadow-[0_0_20px_hsl(43_66%_52%/0.25)] scale-[1.02]"
                      : "bg-black/20 border-white/5 hover:bg-black/30 hover:border-white/20"
                      }`}
                  >
                    <h3 className={`font-semibold text-lg ${isActive ? "text-[#D4AF37]" : "text-white"}`}>
                      {motor.name}
                    </h3>
                    <p className="text-muted-foreground text-xs leading-relaxed mt-1 opacity-80">{motor.tagline}</p>
                  </button>
                );
              })}
            </div>

            {/* Navigation Arrows */}
            <div className="flex items-center gap-3 pt-6 mt-auto">
              <button 
                onClick={handlePrev}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-black/30 border border-white/10 text-white hover:bg-primary/20 hover:border-[#D4AF37]/50 transition-colors"
                aria-label="Previous"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
              </button>
              <button 
                onClick={handleNext}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-black/30 border border-white/10 text-white hover:bg-primary/20 hover:border-[#D4AF37]/50 transition-colors"
                aria-label="Next"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
              </button>
            </div>
          </div>

          {/* Column 2 - Image Display ONLY */}
          <div className="rounded-2xl overflow-hidden bg-black/20 border border-white/5 relative min-h-[300px] h-full w-full">
            <AnimatePresence>
              <motion.img
                key={activeMotor}
                src={motors[activeMotor].image}
                initial={{ opacity: 0, scale: 1 }}
                animate={{ opacity: 1, scale: 1.05 }}
                exit={{ opacity: 0, scale: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="absolute inset-0 w-full h-full object-cover"
                alt={motors[activeMotor].name}
              />
            </AnimatePresence>
          </div>

          {/* Column 3 - Detail Content ONLY */}
          <div className="rounded-2xl bg-black/20 border border-white/5 backdrop-blur-md relative overflow-hidden h-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeMotor}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 p-6 lg:p-8 flex flex-col overflow-y-auto"
              >
                <h2 className="text-2xl font-bold text-white mb-2 shrink-0">{motors[activeMotor].name}</h2>
                <p className="text-[#D4AF37] text-sm font-medium mb-6 shrink-0">{motors[activeMotor].tagline}</p>

                <ul className="flex flex-col gap-4 pb-4">
                  {motors[activeMotor].points.map((point, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
                      <span className="text-sm text-foreground/80 leading-relaxed">{point}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>
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
    <AMCPlans />
    <BrochureDownload />
    <CTASection />
    <FAQ />
    <ContactSection />
  </>
);

export default Index;
