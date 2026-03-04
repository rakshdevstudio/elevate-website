import { Link } from "react-router-dom";
import { SectionHeading, GlassCard, SectionDivider, ScrollReveal, FloatingParticles } from "@/components/ui/shared";
import { Building2, Home, CheckCircle2, ChevronRight, CircleDot, Heart, Stethoscope, Package, Sparkles, ArrowRight, Layers, PanelTop, Lamp, Monitor, Grip, Square } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const tabOptions = ["MRL Based Elevators", "Full Structure Elevator"];

const elevatorProducts = [
  {
    title: "Residential Elevators",
    desc: "Designed for modern homes and apartments, our residential elevators blend seamlessly into your living space with whisper-quiet operation and premium finishes that complement any interior aesthetic.",
    features: ["Smart Home Integration", "Silent Operation", "Compact Shaft Design", "Luxury Cabin Finish"],
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80",
    accent: "from-primary/20 to-gold-light/10",
  },
  {
    title: "Commercial Elevators",
    desc: "Engineered for high-traffic environments, our commercial elevators deliver exceptional performance with intelligent group management systems and energy-efficient drives.",
    features: ["High Speed Transport", "Large Capacity", "Advanced Control Systems", "Energy Efficient Drive"],
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
    accent: "from-[hsl(210_60%_40%/0.15)] to-primary/10",
  },
  {
    title: "Hospital Elevators",
    desc: "Purpose-built for healthcare environments with stretcher-compatible cabins, ultra-smooth ride technology, and antibacterial interiors that meet the strictest medical standards.",
    features: ["Stretcher Compatible", "Smooth Ride Technology", "Antibacterial Interiors", "Emergency Backup Systems"],
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&q=80",
    accent: "from-[hsl(170_50%_40%/0.12)] to-primary/10",
  },
  {
    title: "Capsule Elevators",
    desc: "A stunning architectural statement piece — panoramic glass elevators that transform vertical transportation into a breathtaking visual experience for prestigious buildings.",
    features: ["Panoramic Glass Design", "Architectural Aesthetics", "Scenic Viewing Experience", "Premium Materials"],
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
    accent: "from-primary/15 to-[hsl(280_40%_40%/0.1)]",
  },
];

const finishes = [
  {
    name: "Basic",
    price: "₹5–6 Lakhs",
    features: ["Standard SS finish", "Manual door", "Basic lighting", "Standard control panel"],
  },
  {
    name: "Standard",
    price: "₹8–9 Lakhs",
    features: ["Hairline SS finish", "Automatic door", "LED lighting", "Digital display", "Designer flooring"],
    popular: true,
  },
  {
    name: "Premium",
    price: "₹10–20 Lakhs",
    features: ["Mirror/Etched SS finish", "Glass cabin options", "Designer false ceiling", "Touchscreen COP", "Customized interiors"],
  },
];

const packages = [
  {
    name: "Builder Choice",
    desc: "Perfect for residential buildings looking for quality at an affordable price.",
    icon: <Building2 className="w-6 h-6" />,
    specs: ["4-6 Persons Capacity", "MRL Technology", "Standard SS Finish", "Manual/Auto Door", "Basic COP", "Standard Lighting"],
  },
  {
    name: "Luxury Home Choice",
    desc: "Premium experience with top-of-the-line finishes and smart features.",
    icon: <Heart className="w-6 h-6" />,
    specs: ["6-13 Persons Capacity", "VVVF Drive", "Mirror/Etched SS", "Automatic Door", "Touchscreen COP", "Designer Cabin", "IoT Enabled"],
    popular: true,
  },
  {
    name: "Hospital Standard Choice",
    desc: "Compliant with hospital standards for safe and efficient patient transportation.",
    icon: <Stethoscope className="w-6 h-6" />,
    specs: ["Stretcher Size Cabin", "Smooth VVVF Drive", "Anti-Bacterial Finish", "Wide Auto Doors", "Emergency Battery", "Fire Rated"],
  },
];

const designCategories = [
  { name: "Door Design", image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&q=80", icon: <Layers className="w-5 h-5" /> },
  { name: "Cabin Design", image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&q=80", icon: <Square className="w-5 h-5" /> },
  { name: "False Ceiling", image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&q=80", icon: <Lamp className="w-5 h-5" /> },
  { name: "COP / LOP Panels", image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&q=80", icon: <PanelTop className="w-5 h-5" /> },
  { name: "Display Types", image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&q=80", icon: <Monitor className="w-5 h-5" /> },
  { name: "Hand Rails", image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&q=80", icon: <Grip className="w-5 h-5" /> },
  { name: "Flooring", image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&q=80", icon: <Sparkles className="w-5 h-5" /> },
];

/* ───────────── PRODUCT SHOWCASE SECTION ───────────── */
const ProductShowcase = ({ product, index }: { product: typeof elevatorProducts[0]; index: number }) => {
  const isReversed = index % 2 !== 0;

  return (
    <section className="py-16 lg:py-24 relative">
      {/* Background accent glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 50% 50% at ${isReversed ? '30%' : '70%'} 50%, hsl(43 66% 52% / 0.03), transparent 70%)`,
        }}
      />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className={`flex flex-col ${isReversed ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-10 lg:gap-16 items-center max-w-6xl mx-auto`}>
          {/* Image */}
          <ScrollReveal direction={isReversed ? 'right' : 'left'} className="lg:w-1/2">
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.5 }}
              className="relative group rounded-2xl overflow-hidden"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${product.accent} opacity-60 z-10 pointer-events-none`} />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent z-10 pointer-events-none" />
              <img
                src={product.image}
                alt={product.title}
                className="w-full aspect-[4/3] object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
              {/* Corner glow */}
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-primary/10 rounded-full blur-[40px] z-0" />
              {/* Border glow on hover */}
              <div className="absolute inset-0 border border-primary/0 group-hover:border-primary/15 rounded-2xl transition-all duration-500 z-20 pointer-events-none" />
            </motion.div>
          </ScrollReveal>

          {/* Text */}
          <ScrollReveal direction={isReversed ? 'left' : 'right'} className="lg:w-1/2">
            <div>
              <span className="inline-block px-4 py-1.5 rounded-full bg-primary/8 text-primary text-xs font-semibold tracking-[0.15em] uppercase mb-5 border border-primary/10">
                0{index + 1}
              </span>
              <h3 className="text-3xl lg:text-4xl font-heading font-bold text-foreground mb-4 tracking-tight leading-tight">
                {product.title}
              </h3>
              <p className="text-muted-foreground text-base leading-relaxed mb-8 opacity-80">
                {product.desc}
              </p>
              <div className="space-y-3.5 mb-8">
                {product.features.map((f, i) => (
                  <motion.div
                    key={f}
                    initial={{ opacity: 0, x: -15 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 + i * 0.08, duration: 0.5 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-6 h-6 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
                    </div>
                    <span className="text-foreground/90 text-sm font-medium">{f}</span>
                  </motion.div>
                ))}
              </div>
              <Link
                to="/contact"
                className="group/btn inline-flex items-center gap-2 bg-gradient-to-r from-primary to-gold-light text-primary-foreground px-8 py-3.5 rounded-xl font-semibold text-sm transition-all duration-300 hover:shadow-[0_0_30px_hsl(43_66%_52%/0.3)] hover:scale-105 active:scale-100"
              >
                Get a Quote <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

/* ───────────── MAIN PAGE ───────────── */
const Products = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <>
      {/* ─── HERO ─── */}
      <section className="pt-32 pb-20 lg:pt-40 lg:pb-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-navy-gradient" />
        {/* Background image */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&q=80"
            alt=""
            className="w-full h-full object-cover opacity-15"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
        </div>
        {/* Light orbs */}
        <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[180px]" />
        <div className="absolute bottom-1/3 left-1/4 w-[400px] h-[400px] bg-[hsl(210_60%_40%/0.04)] rounded-full blur-[140px]" />

        <FloatingParticles count={15} />

        <div className="container mx-auto px-4 lg:px-8 text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}>
            <span className="inline-block px-5 py-2 rounded-full bg-primary/8 text-primary text-xs font-semibold tracking-[0.2em] uppercase mb-6 border border-primary/12">
              Our Products
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-heading font-extrabold text-foreground mb-6 tracking-tight leading-[1.05] text-shadow-hero">
              Our Products
            </h1>
            <p className="text-muted-foreground text-lg lg:text-xl max-w-2xl mx-auto mb-10 leading-relaxed opacity-80">
              Discover our range of premium elevator solutions engineered for safety, performance, and architectural elegance.
            </p>
            <div className="flex justify-center gap-3">
              {tabOptions.map((tab, i) => (
                <motion.button
                  key={tab}
                  onClick={() => setActiveTab(i)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  className={`px-7 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
                    activeTab === i
                      ? "bg-gradient-to-r from-primary to-gold-light text-primary-foreground shadow-[0_0_30px_hsl(43_66%_52%/0.25)]"
                      : "glass-card text-muted-foreground hover:text-foreground hover:border-primary/15"
                  }`}
                >
                  {tab}
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* ─── ELEVATOR SHOWCASE ─── */}
      <div>
        <div className="container mx-auto px-4 lg:px-8 pt-12">
          <SectionHeading badge="Categories" title="Elevator Solutions" subtitle="Choose the right elevator for your building type" />
        </div>
        {elevatorProducts.map((product, i) => (
          <ProductShowcase key={i} product={product} index={i} />
        ))}
      </div>

      <SectionDivider />

      {/* ─── FINISHES & PRICING ─── */}
      <section className="py-24 lg:py-32 section-glow relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_50%_40%,hsl(43_66%_52%/0.04),transparent)]" />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <SectionHeading badge="Pricing" title="Finishes & Pricing" subtitle="Choose from our range of elevator finishes to match your budget and style" />
          <div className="grid md:grid-cols-3 gap-8 lg:gap-10 max-w-5xl mx-auto">
            {finishes.map((f, i) => (
              <GlassCard
                key={i}
                className={`p-8 lg:p-10 text-center relative overflow-hidden ${f.popular ? "border-primary/20 glow-gold-strong" : ""}`}
                premium={!!f.popular}
                delay={i * 0.12}
                tilt
              >
                {f.popular && (
                  <>
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-b from-primary/6 to-transparent pointer-events-none" />
                    <span className="relative inline-block px-4 py-1.5 rounded-full bg-primary/12 text-primary text-xs font-semibold mb-4 border border-primary/15">Most Popular</span>
                  </>
                )}
                <h3 className="text-xl lg:text-2xl font-heading font-bold text-foreground mb-3">{f.name}</h3>
                <p className="text-gradient-gold text-3xl lg:text-4xl font-heading font-extrabold mb-8">{f.price}</p>
                <ul className="space-y-3.5 mb-8">
                  {f.features.map((feat) => (
                    <li key={feat} className="text-muted-foreground text-sm flex items-center gap-2.5 justify-center">
                      <CheckCircle2 className="w-4 h-4 text-primary shrink-0" /> {feat}
                    </li>
                  ))}
                </ul>
                <Link to="/contact" className="block w-full py-3.5 rounded-xl bg-primary/10 text-primary font-semibold text-sm hover:bg-gradient-to-r hover:from-primary hover:to-gold-light hover:text-primary-foreground transition-all duration-300 hover:shadow-[0_0_30px_hsl(43_66%_52%/0.25)]">
                  Get Quote
                </Link>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ─── CURATED PACKAGES ─── */}
      <section className="py-24 lg:py-32 relative section-mesh">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_40%_50%,hsl(43_66%_52%/0.03),transparent)]" />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <SectionHeading badge="Packages" title="Curated Packages" subtitle="Pre-configured elevator packages tailored for specific needs" />
          <div className="grid md:grid-cols-3 gap-8 lg:gap-10 max-w-5xl mx-auto">
            {packages.map((pkg, i) => (
              <GlassCard
                key={i}
                className={`p-8 lg:p-10 relative overflow-hidden ${pkg.popular ? "border-primary/20 glow-gold-strong" : ""}`}
                premium={!!pkg.popular}
                delay={i * 0.1}
                tilt
              >
                {pkg.popular && (
                  <>
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
                  </>
                )}
                <div className="relative">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/15 to-primary/5 flex items-center justify-center text-primary mb-5 icon-glow">
                    {pkg.icon}
                  </div>
                  {pkg.popular && (
                    <span className="inline-block px-3 py-1 rounded-full bg-primary/12 text-primary text-xs font-semibold mb-3 border border-primary/15">Popular</span>
                  )}
                  <h3 className="text-xl lg:text-2xl font-heading font-bold text-foreground mb-2">{pkg.name}</h3>
                  <p className="text-muted-foreground text-sm mb-6 opacity-75">{pkg.desc}</p>
                  <ul className="space-y-3 mb-8">
                    {pkg.specs.map((s) => (
                      <li key={s} className="text-muted-foreground text-sm flex items-center gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-primary shrink-0" /> {s}
                      </li>
                    ))}
                  </ul>
                  <Link to="/contact" className="block w-full py-3.5 rounded-xl bg-primary/10 text-primary font-semibold text-sm hover:bg-gradient-to-r hover:from-primary hover:to-gold-light hover:text-primary-foreground transition-all duration-300 text-center hover:shadow-[0_0_30px_hsl(43_66%_52%/0.25)]">
                    Enquire Now
                  </Link>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ─── DESIGN CUSTOMIZATION GALLERY ─── */}
      <section className="py-24 lg:py-32 section-glow relative">
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <SectionHeading badge="Customization" title="Design Customization" subtitle="Personalize every detail of your elevator" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-7 max-w-6xl mx-auto">
            {designCategories.map((cat, i) => (
              <ScrollReveal key={cat.name} delay={i * 0.06}>
                <motion.div
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.35 }}
                  className="glass-card-premium rounded-2xl overflow-hidden group cursor-pointer"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="w-full aspect-square object-cover transition-transform duration-700 group-hover:scale-115"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
                    <div className="absolute inset-0 border border-primary/0 group-hover:border-primary/15 transition-all duration-500" />
                    {/* Hover glow */}
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-24 bg-primary/15 rounded-full blur-[30px] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                  <div className="p-5 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0 group-hover:bg-primary/20 transition-colors duration-300">
                      {cat.icon}
                    </div>
                    <h4 className="text-foreground text-sm font-heading font-semibold">{cat.name}</h4>
                  </div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Products;
