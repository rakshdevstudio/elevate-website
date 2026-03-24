import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { SectionHeading, GlassCard, SectionDivider, ScrollReveal, FloatingParticles } from "@/components/ui/shared";
import { CheckCircle2, Heart, ArrowRight, Layers, PanelTop, Lamp, Monitor, Grip, Square, Sparkles } from "lucide-react";
import { CTABanner, TrustBadges } from "@/components/CTABanner";
import { motion, AnimatePresence } from "framer-motion";
import TiltedCard from "@/components/TiltedCard";
import StarBorder from "@/components/StarBorder";
import BrochureDownload from "@/components/BrochureDownload";
import { CinematicFeatureSection } from "@/components/CinematicFeatureSection";

const elevatorProducts = [
  {
    title: "Residential Elevators",
    desc: "Designed for modern homes and apartments, our residential elevators blend seamlessly into your living space with whisper-quiet operation and premium finishes that complement any interior aesthetic.",
    features: ["Smart Home Integration", "Silent Operation", "Compact Shaft Design", "Luxury Cabin Finish"],
    image: "/images/product-residential.webp",
    accent: "from-primary/20 to-gold-light/10",
  },
  {
    title: "Commercial Elevators",
    desc: "Engineered for high-traffic environments, our commercial elevators deliver exceptional performance with intelligent group management systems and energy-efficient drives.",
    features: ["High Speed Transport", "Large Capacity", "Advanced Control Systems", "Energy Efficient Drive"],
    image: "/images/product-commercial.webp",
    accent: "from-[hsl(210_60%_40%/0.15)] to-primary/10",
  },
  {
    title: "Hospital Elevators",
    desc: "Purpose-built for healthcare environments with stretcher-compatible cabins, ultra-smooth ride technology, and antibacterial interiors that meet the strictest medical standards.",
    features: ["Stretcher Compatible", "Smooth Ride Technology", "Antibacterial Interiors", "Emergency Backup Systems"],
    image: "/images/HOSPITAL ELEVATOR.webp",
    accent: "from-[hsl(170_50%_40%/0.12)] to-primary/10",
  },
  {
    title: "Capsule Elevators",
    desc: "A stunning architectural statement piece — panoramic glass elevators that transform vertical transportation into a breathtaking visual experience for prestigious buildings.",
    features: ["Panoramic Glass Design", "Architectural Aesthetics", "Scenic Viewing Experience", "Premium Materials"],
    image: "/images/CAPSULE ELEVATOR .webp",
    accent: "from-primary/15 to-[hsl(280_40%_40%/0.1)]",
  },
  {
    title: "Structured Lift",
    desc: "Maximum efficiency without the need for a conventional concrete shaft. Perfect for existing buildings and quick installations with self-supporting steel structures.",
    features: ["No Concrete Shaft Required", "Quick Installation", "Space Optimized", "Self-Supporting Structure"],
    image: "/images/STRUCTURED LIFT.webp",
    accent: "from-[hsl(210_60%_40%/0.1)] to-primary/10",
  },
  {
    title: "Goods Lift",
    desc: "Heavy-duty vertical transportation for industrial and warehouse use. Engineered to handle significant loads with maximum safety and durability.",
    features: ["Heavy Load Capacity", "Robust Construction", "Safety Interlocks", "Industrial Grade Durability"],
    image: "/images/GOODS LIFT.webp",
    accent: "from-[hsl(0_0%_40%/0.1)] to-primary/10",
  },
];





const designCategories = [
  { name: "Door Design", image: "/images/DOOR DESIGN.webp", icon: <Layers className="w-5 h-5" /> },
  { name: "Cabin Design", image: "/images/CABIN DESIGN.webp", icon: <Square className="w-5 h-5" />, isHero: true },
  { name: "False Ceiling", image: "/images/_FALSE CEILING.webp", icon: <Lamp className="w-5 h-5" /> },
  { name: "COP / LOP Panels", image: "/images/COP _ LOP PANELS.webp", icon: <PanelTop className="w-5 h-5" /> },
  { name: "Hand Rails", image: "/images/HAND RAILS.webp", icon: <Grip className="w-5 h-5" /> },
];

const ProductShowcase = ({ product, index }: { product: typeof elevatorProducts[0]; index: number }) => {
  const isReversed = index % 2 !== 0;

  return (
    <section className="py-8 md:py-12 relative">
      <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(ellipse 50% 50% at ${isReversed ? '30%' : '70%'} 50%, hsl(43 66% 52% / 0.03), transparent 70%)` }} />
      <div className="container mx-auto px-6 relative z-10">
        <div className={`flex flex-col ${isReversed ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-6 md:gap-8 items-center max-w-6xl mx-auto`}>
          <ScrollReveal direction={isReversed ? 'right' : 'left'} className="lg:w-1/2">
            <TiltedCard
              src={product.image}
              alt={product.title}
              overlayClass={product.accent}
              maxTilt={12}
            />
          </ScrollReveal>
          <ScrollReveal direction={isReversed ? 'left' : 'right'} className="lg:w-1/2">
            <div>
              <span className="inline-block px-4 py-1.5 rounded-full bg-primary/8 text-primary text-xs font-semibold tracking-[0.15em] uppercase mb-5 border border-primary/10">0{index + 1}</span>
              <h3 className="text-3xl lg:text-4xl font-heading font-bold text-foreground mb-4 tracking-tight leading-tight">{product.title}</h3>
              <p className="text-muted-foreground text-base leading-relaxed mb-8 opacity-80">{product.desc}</p>
              <div className="space-y-3.5 mb-8">
                {product.features.map((f, i) => (
                  <motion.div key={f} initial={{ opacity: 0, x: -15 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 + i * 0.08, duration: 0.5 }} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-lg bg-primary/10 flex items-center justify-center shrink-0"><CheckCircle2 className="w-3.5 h-3.5 text-primary" /></div>
                    <span className="text-foreground/90 text-sm font-medium">{f}</span>
                  </motion.div>
                ))}
              </div>
              <Link to="/contact" className="group/btn inline-flex items-center gap-2 bg-gradient-to-r from-primary to-gold-light text-primary-foreground px-8 py-3.5 rounded-xl font-semibold text-sm transition-all duration-300 hover:shadow-[0_0_30px_hsl(43_66%_52%/0.3)] hover:scale-105 active:scale-100">
                Book Free Inspection <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

const Products = () => {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden min-h-[80vh] lg:min-h-[85vh] flex items-center">
        <div className="absolute inset-0 bg-navy-gradient" />
        <div className="absolute inset-0">
          <img src="/images/hero-products.webp" alt="" className="w-full h-full object-cover opacity-40" loading="eager" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-[hsl(213_62%_6%/0.75)] via-[hsl(213_62%_6%/0.55)] to-[hsl(213_62%_6%/0.9)]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[hsl(213_62%_6%/0.3)] via-transparent to-[hsl(213_62%_6%/0.3)]" />
        <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[180px]" />
        <div className="absolute bottom-1/3 left-1/4 w-[400px] h-[400px] bg-[hsl(210_60%_40%/0.04)] rounded-full blur-[140px]" />
        <FloatingParticles count={15} />
        <div className="container mx-auto px-6 text-center relative z-10 pt-20 pb-16">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}>

            <span className="inline-block px-6 py-2 rounded-full bg-primary/10 text-primary text-xs font-semibold tracking-[0.2em] uppercase mb-6 border border-primary/20 backdrop-blur-sm">
              Built for Performance. Designed for Excellence.
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-heading font-extrabold text-foreground mb-6 tracking-tight leading-[1.05] text-shadow-hero">
              Elevator Systems Engineered for Demanding Indian Infrastructure
            </h1>
            <p className="text-muted-foreground text-lg lg:text-xl max-w-2xl mx-auto mb-10 leading-relaxed opacity-80">
              Modular drives, recovered energy, and precision safety networks merge with sculpted cabins, creating a premium presence that endures high throughput. Each model is calibrated for long-term uptime and field-ready maintainability, so builders and facility teams have consistent performance metrics aligned with global benchmarks.
            </p>

          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-background via-background/80 to-transparent" />
      </section>

      <TrustBadges />

      {/* ELEVATOR SHOWCASE */}
      <div>
        <div className="container mx-auto px-6 pt-8 md:pt-10">
          <SectionHeading badge="Categories" title="Our Elevator Solutions" subtitle="Choose the right elevator for your building type" />
        </div>
        {elevatorProducts.map((product, i) => (
          <ProductShowcase key={i} product={product} index={i} />
        ))}
      </div>

      <SectionDivider />

      {/* FINISHES & PRICING */}
      <section className="py-10 md:py-16 section-glow relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_50%_40%,hsl(43_66%_52%/0.04),transparent)]" />
        <div className="container mx-auto px-6 relative z-10">
          <SectionHeading badge="Pricing" title="Finishes & Pricing" subtitle="Choose from our range of elevator finishes to match your budget and style" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {/* Basic Tier */}
            <div className="relative h-full flex pt-4">
              <div className="relative flex flex-col w-full h-full p-8 rounded-xl border transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl glass-card border-white/5">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center font-heading font-bold text-lg mb-6 shadow-md bg-slate-500/30 text-slate-300 border border-slate-500/30">B</div>
                <h3 className="text-xl font-heading font-bold text-white mb-1.5">Basic</h3>
                <p className="text-[22px] font-heading font-extrabold mb-1.5 text-white">₹6 Lakhs onwards</p>
                <p className="text-[13px] text-muted-foreground mb-8 min-h-[35px] border-b border-white/10 pb-4">MS Powder-Coated</p>
                <ul className="space-y-4 mb-10 flex-grow">
                  {["MS powder-coated cabin finish", "Standard push button panel", "Basic LED cabin lighting", "Manual/Auto door operation", "1-year comprehensive warranty"].map((feat) => (
                    <li key={feat} className="text-[13px] text-foreground/80 flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0 text-emerald-500" />
                      <span className="leading-snug">{feat}</span>
                    </li>
                  ))}
                </ul>
                <Link className="mt-auto w-full py-3 rounded-lg font-semibold text-sm transition-all duration-300 flex items-center justify-center bg-gradient-to-r from-[#D4AF37] to-[#F5D061] text-zinc-900 hover:shadow-[0_0_20px_hsl(43_66%_52%/0.3)] hover:scale-[1.02]" to="/contact">Book Free Inspection</Link>
              </div>
            </div>

            {/* Standard Tier */}
            <div className="relative h-full flex pt-4">
              <div className="relative flex flex-col w-full h-full p-8 rounded-xl border transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl glass-card border-white/5">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center font-heading font-bold text-lg mb-6 shadow-md bg-blue-600/30 text-blue-400 border border-blue-500/30">S</div>
                <h3 className="text-xl font-heading font-bold text-white mb-1.5">Standard</h3>
                <p className="text-[22px] font-heading font-extrabold mb-1.5 text-white">₹7 Lakhs onwards</p>
                <p className="text-[13px] text-muted-foreground mb-8 min-h-[35px] border-b border-white/10 pb-4">SS Cabin + SS Door</p>
                <ul className="space-y-4 mb-10 flex-grow">
                  {["Stainless steel cabin and door finish (with design)", "304 grade with scratch proof protection", "Digital floor indicator display", "Energy-efficient LED lighting", "Automatic door operation", "1-year comprehensive warranty"].map((feat) => (
                    <li key={feat} className="text-[13px] text-foreground/80 flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0 text-emerald-500" />
                      <span className="leading-snug">{feat}</span>
                    </li>
                  ))}
                </ul>
                <Link className="mt-auto w-full py-3 rounded-lg font-semibold text-sm transition-all duration-300 flex items-center justify-center bg-gradient-to-r from-[#D4AF37] to-[#F5D061] text-zinc-900 hover:shadow-[0_0_20px_hsl(43_66%_52%/0.3)] hover:scale-[1.02]" to="/contact">Book Free Inspection</Link>
              </div>
            </div>

            {/* Premium Lite Tier - New Trend */}
            <div className="relative h-full flex pt-4">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 z-20 px-3.5 py-1.5 rounded-full text-[11px] font-bold tracking-wider uppercase flex items-center shadow-lg bg-primary text-zinc-900">
                <Sparkles className="w-3 h-3 mr-1.5" />New Trend
              </div>
              <div className="relative flex flex-col w-full h-full p-8 rounded-xl border transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl bg-[#0f172a] border-primary/50 shadow-xl">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center font-heading font-bold text-lg mb-6 shadow-md bg-primary/20 text-primary border border-primary/40">PL</div>
                <h3 className="text-xl font-heading font-bold text-white mb-1.5">Premium Lite</h3>
                <p className="text-[22px] font-heading font-extrabold mb-1.5 text-gradient-gold">₹8 Lakhs onwards</p>
                <p className="text-[13px] text-muted-foreground mb-8 min-h-[35px] border-b border-white/10 pb-4">Fully Customized Luxury</p>
                <ul className="space-y-4 mb-10 flex-grow">
                  {["Any luxury look (fully customized)", "Designed cabin interior with premium materials", "Digital floor indicator display", "Automatic door operation", "1-year comprehensive warranty"].map((feat) => (
                    <li key={feat} className="text-[13px] text-foreground/80 flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0 text-primary" />
                      <span className="leading-snug">{feat}</span>
                    </li>
                  ))}
                </ul>
                <Link className="mt-auto w-full py-3 rounded-lg font-semibold text-sm transition-all duration-300 flex items-center justify-center bg-gradient-to-r from-[#D4AF37] to-[#F5D061] text-zinc-900 hover:shadow-[0_0_20px_hsl(43_66%_52%/0.3)] hover:scale-[1.02]" to="/contact">Book Free Inspection</Link>
              </div>
            </div>

            {/* Premium Plus Tier - Most Popular */}
            <div className="relative h-full flex pt-4">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 z-20 px-3.5 py-1.5 rounded-full text-[11px] font-bold tracking-wider uppercase flex items-center shadow-lg bg-gradient-to-r from-[#D4AF37] to-[#F5D061] text-zinc-900">
                <Heart className="w-3 h-3 mr-1.5 fill-zinc-900" />Most Popular
              </div>
              <div className="relative flex flex-col w-full h-full p-8 rounded-xl border transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl bg-[#0f172a] border-[#D4AF37] shadow-[0_0_40px_hsl(43_66%_52%/0.15)] ring-1 ring-[#D4AF37]/50">
                <div className="absolute inset-0 rounded-xl bg-gradient-to-b from-primary/5 to-transparent pointer-events-none"></div>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center font-heading font-bold text-lg mb-6 shadow-md bg-[#D4AF37]/30 text-[#F5D061] border border-[#D4AF37]/40">P+</div>
                <h3 className="text-xl font-heading font-bold text-white mb-1.5">Premium Plus</h3>
                <p className="text-[22px] font-heading font-extrabold mb-1.5 text-gradient-gold">₹9 Lakhs onwards</p>
                <p className="text-[13px] text-muted-foreground mb-8 min-h-[35px] border-b border-white/10 pb-4">Gold/Rose Gold/Black Design/Wooden</p>
                <ul className="space-y-4 mb-10 flex-grow">
                  {["Luxury gold/rose gold/black/wooden finish", "Smart touchscreen control panel", "Premium IoT-enabled monitoring", "Designer cabin interior with premium materials", "2-year comprehensive warranty"].map((feat) => (
                    <li key={feat} className="text-[13px] text-foreground/80 flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0 text-[#D4AF37]" />
                      <span className="leading-snug">{feat}</span>
                    </li>
                  ))}
                </ul>
                <Link className="mt-auto w-full py-3 rounded-lg font-semibold text-sm transition-all duration-300 flex items-center justify-center bg-gradient-to-r from-[#D4AF37] to-[#F5D061] text-zinc-900 hover:shadow-[0_0_20px_hsl(43_66%_52%/0.3)] hover:scale-[1.02]" to="/contact">Book Free Inspection</Link>
              </div>
            </div>
          </div>
        </div>
      </section>



      <SectionDivider />

      {/* DESIGN CUSTOMIZATION GALLERY */}
      <section className="py-10 md:py-16 section-glow relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <SectionHeading badge="Choose your Design" title="Design Customization" subtitle="Personalize every detail of your elevator" />
          
          <div className="flex flex-col lg:flex-row items-center justify-center max-w-[1400px] mx-auto mt-12 gap-6 lg:gap-8">
            
            {/* Left Stack (Door & COP) */}
            <div className="flex flex-col gap-6 w-full lg:w-[300px]">
              {[designCategories[0], designCategories[3]].map((cat) => (
                <div key={cat.name} className="relative w-full aspect-[4/3] rounded-2xl group overflow-hidden border border-white/10 bg-black/40 shadow-lg cursor-pointer">
                  <div className="absolute inset-0 transition-transform duration-500 ease-out group-hover:scale-105">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10" />
                    <img src={cat.image} alt={cat.name} className="w-full h-full object-cover object-center opacity-80 group-hover:opacity-100 transition-opacity duration-300" loading="lazy" />
                  </div>
                  <div className="absolute inset-0 z-20 rounded-2xl border-2 border-transparent group-hover:border-[#D4AF37]/40 group-hover:shadow-[0_0_30px_hsl(43_66%_52%/0.15)] transition-all duration-300 pointer-events-none" />
                  <div className="absolute bottom-0 left-0 w-full p-6 z-30 text-left">
                    <div className="flex flex-col gap-2 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                      <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37] mb-1 backdrop-blur-sm">{cat.icon}</div>
                      <h4 className="text-lg font-medium text-white tracking-wider uppercase">{cat.name}</h4>
                      <div className="w-10 h-0.5 bg-[#D4AF37] transform origin-left transition-all duration-500 group-hover:w-16" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Center Hero (Cabin Design) */}
            <div className="order-first lg:order-none w-full lg:w-[450px]">
              <div className="relative w-full aspect-[3/4] rounded-2xl group overflow-hidden border border-[#D4AF37]/30 bg-black/50 shadow-[0_0_40px_hsl(43_66%_52%/0.1)] cursor-pointer">
                <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-105">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent z-10" />
                  <img src={designCategories[1].image} alt={designCategories[1].name} className="w-full h-full object-cover object-center opacity-90 group-hover:opacity-100 transition-opacity duration-500" loading="lazy" />
                </div>
                <div className="absolute inset-0 z-20 rounded-2xl border-2 border-[#D4AF37]/20 group-hover:border-[#D4AF37]/60 group-hover:shadow-[inset_0_0_30px_hsl(43_66%_52%/0.2)] transition-all duration-300 pointer-events-none" />
                <div className="absolute top-6 right-6 z-30">
                  <span className="px-3 py-1 text-xs font-semibold text-[#D4AF37] bg-[#D4AF37]/10 rounded-full border border-[#D4AF37]/20 backdrop-blur-md">START HERE</span>
                </div>
                <div className="absolute bottom-0 left-0 w-full p-8 z-30 text-left">
                  <div className="flex flex-col gap-3 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                    <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/20 flex items-center justify-center text-[#D4AF37] mb-2 backdrop-blur-md shadow-lg">{designCategories[1].icon}</div>
                    <h4 className="text-2xl font-bold text-white tracking-wider uppercase drop-shadow-md">{designCategories[1].name}</h4>
                    <p className="text-[#D4AF37]/80 text-sm font-medium w-full max-w-[250px]">Configure your core aesthetic</p>
                    <div className="w-12 h-1 bg-[#D4AF37] transform origin-left transition-all duration-500 group-hover:w-24 mt-2" />
                  </div>
                </div>
              </div>
            </div>

            {/* Right Stack (Ceiling & Hand Rails) */}
            <div className="flex flex-col gap-6 w-full lg:w-[300px]">
              {[designCategories[2], designCategories[4]].map((cat) => (
                <div key={cat.name} className="relative w-full aspect-[4/3] rounded-2xl group overflow-hidden border border-white/10 bg-black/40 shadow-lg cursor-pointer">
                  <div className="absolute inset-0 transition-transform duration-500 ease-out group-hover:scale-105">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10" />
                    <img src={cat.image} alt={cat.name} className="w-full h-full object-cover object-center opacity-80 group-hover:opacity-100 transition-opacity duration-300" loading="lazy" />
                  </div>
                  <div className="absolute inset-0 z-20 rounded-2xl border-2 border-transparent group-hover:border-[#D4AF37]/40 group-hover:shadow-[0_0_30px_hsl(43_66%_52%/0.15)] transition-all duration-300 pointer-events-none" />
                  <div className="absolute bottom-0 left-0 w-full p-6 z-30 text-left">
                    <div className="flex flex-col gap-2 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                      <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37] mb-1 backdrop-blur-sm">{cat.icon}</div>
                      <h4 className="text-lg font-medium text-white tracking-wider uppercase">{cat.name}</h4>
                      <div className="w-10 h-0.5 bg-[#D4AF37] transform origin-left transition-all duration-500 group-hover:w-16" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
          </div>
        </div>

      </section>

      <CinematicFeatureSection />
    </>
  );
};

export default Products;
