import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { SectionHeading, GlassCard, StatCard } from "@/components/ui/shared";
import { Shield, Zap, Award, Users, Building2, Wrench, ChevronRight, CheckCircle2, Phone, Mail, MapPin, ChevronDown } from "lucide-react";
import { useState } from "react";

const Hero = () => (
  <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
    <div className="absolute inset-0 bg-navy-gradient" />
    <div className="absolute inset-0 opacity-20">
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-[100px]" />
    </div>
    <div className="container mx-auto px-4 lg:px-8 relative z-10">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold tracking-wider uppercase mb-6">
            Premium Elevator Solutions
          </span>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-heading font-extrabold text-foreground mb-6 leading-tight">
            Exceeding <span className="text-gradient-gold">Trust</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            India's premier elevator company delivering world-class vertical transportation solutions with unmatched safety, innovation, and elegance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/products" className="bg-primary text-primary-foreground px-8 py-4 rounded-xl font-semibold text-base hover:bg-gold-light transition-all glow-gold">
              Explore Products
            </Link>
            <Link to="/contact" className="border border-primary/30 text-foreground px-8 py-4 rounded-xl font-semibold text-base hover:bg-primary/10 transition-all">
              Request Consultation
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

const MissionVision = () => (
  <section className="py-20">
    <div className="container mx-auto px-4 lg:px-8">
      <SectionHeading badge="Who We Are" title="Our Mission & Vision" subtitle="Committed to transforming vertical mobility with innovation and safety" />
      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <GlassCard className="p-8">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
            <Shield className="w-6 h-6 text-primary" />
          </div>
          <h3 className="text-xl font-heading font-bold text-foreground mb-3">Our Mission</h3>
          <p className="text-muted-foreground text-sm leading-relaxed">
            To provide world-class elevator solutions that combine cutting-edge technology with uncompromising safety standards, making vertical transportation accessible and reliable for every building in India.
          </p>
        </GlassCard>
        <GlassCard className="p-8">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
            <Zap className="w-6 h-6 text-primary" />
          </div>
          <h3 className="text-xl font-heading font-bold text-foreground mb-3">Our Vision</h3>
          <p className="text-muted-foreground text-sm leading-relaxed">
            To become India's most trusted elevator brand by 2030, setting new benchmarks in design, technology, and customer satisfaction while building lasting relationships with every client.
          </p>
        </GlassCard>
      </div>
    </div>
  </section>
);

const ImpactMetrics = () => (
  <section className="py-20 border-y border-border">
    <div className="container mx-auto px-4 lg:px-8">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard value="500+" label="Elevators Installed" icon={<Building2 className="w-7 h-7" />} />
        <StatCard value="15+" label="Years Experience" icon={<Award className="w-7 h-7" />} />
        <StatCard value="200+" label="Happy Clients" icon={<Users className="w-7 h-7" />} />
        <StatCard value="24/7" label="Service Support" icon={<Wrench className="w-7 h-7" />} />
      </div>
    </div>
  </section>
);

const Solutions = () => {
  const solutions = [
    { icon: <Building2 className="w-6 h-6" />, title: "Residential Elevators", desc: "Elegant home elevators designed for comfort and style, perfect for villas and apartments." },
    { icon: <Zap className="w-6 h-6" />, title: "Commercial Elevators", desc: "High-performance elevators for offices, malls, and commercial complexes with maximum efficiency." },
    { icon: <Wrench className="w-6 h-6" />, title: "Maintenance & AMC", desc: "Comprehensive annual maintenance contracts ensuring your elevator runs flawlessly year-round." },
    { icon: <Shield className="w-6 h-6" />, title: "Modernization", desc: "Upgrade your existing elevator with latest technology, safety features, and modern aesthetics." },
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto px-4 lg:px-8">
        <SectionHeading badge="What We Offer" title="Complete Elevator Solutions" subtitle="End-to-end elevator services from design and installation to maintenance and modernization" />
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {solutions.map((s, i) => (
            <GlassCard key={i} className="p-6 group cursor-pointer">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                {s.icon}
              </div>
              <h3 className="text-lg font-heading font-semibold text-foreground mb-2">{s.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">{s.desc}</p>
              <span className="text-primary text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                Learn more <ChevronRight className="w-4 h-4" />
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
    { name: "Stainless Steel", price: "Starting ₹4.5L", features: ["Mirror finish", "Anti-fingerprint coating", "Durable & elegant"] },
    { name: "Glass Panoramic", price: "Starting ₹6.5L", features: ["Full glass cabin", "LED lighting", "360° view experience"] },
    { name: "Wooden Luxury", price: "Starting ₹5.5L", features: ["Premium veneer", "Custom patterns", "Warm aesthetic feel"] },
  ];

  return (
    <section className="py-20 border-t border-border">
      <div className="container mx-auto px-4 lg:px-8">
        <SectionHeading badge="Premium Finishes" title="Finishes & Pricing" subtitle="Choose from our range of premium elevator finishes to match your space" />
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {finishes.map((f, i) => (
            <GlassCard key={i} className={`p-8 text-center ${i === 1 ? "border-primary/30 glow-gold" : ""}`}>
              {i === 1 && <span className="inline-block px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-semibold mb-3">Most Popular</span>}
              <h3 className="text-xl font-heading font-bold text-foreground mb-2">{f.name}</h3>
              <p className="text-gradient-gold text-2xl font-heading font-bold mb-6">{f.price}</p>
              <ul className="space-y-3 mb-6">
                {f.features.map((feat) => (
                  <li key={feat} className="text-muted-foreground text-sm flex items-center gap-2 justify-center">
                    <CheckCircle2 className="w-4 h-4 text-primary" /> {feat}
                  </li>
                ))}
              </ul>
              <Link to="/contact" className="block w-full py-3 rounded-lg bg-primary/10 text-primary font-semibold text-sm hover:bg-primary hover:text-primary-foreground transition-all">
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
  <section className="py-20 border-t border-border">
    <div className="container mx-auto px-4 lg:px-8">
      <SectionHeading badge="Innovation" title="Intelligent Elevator Systems" subtitle="Powered by smart technology for safety, efficiency, and seamless operation" />
      <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {[
          { title: "IoT Monitoring", desc: "Real-time remote monitoring of elevator performance, diagnostics, and predictive maintenance alerts." },
          { title: "Energy Efficient Drives", desc: "Regenerative drives that reduce energy consumption by up to 50% while ensuring smooth rides." },
          { title: "Smart Safety Systems", desc: "Multi-layered safety with emergency braking, door sensors, overload protection, and battery backup." },
        ].map((t, i) => (
          <GlassCard key={i} className="p-6">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4 font-heading font-bold">
              0{i + 1}
            </div>
            <h3 className="text-lg font-heading font-semibold text-foreground mb-2">{t.title}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">{t.desc}</p>
          </GlassCard>
        ))}
      </div>
    </div>
  </section>
);

const AMCPlans = () => {
  const plans = [
    { name: "Basic", price: "₹8,000/yr", features: ["2 visits per year", "Basic maintenance", "Phone support", "Parts at extra cost"] },
    { name: "Standard", price: "₹15,000/yr", features: ["4 visits per year", "Preventive maintenance", "Priority support", "10% discount on parts"], popular: true },
    { name: "Premium", price: "₹25,000/yr", features: ["Monthly visits", "Full maintenance", "24/7 support", "Free parts replacement"] },
  ];

  return (
    <section className="py-20 border-t border-border">
      <div className="container mx-auto px-4 lg:px-8">
        <SectionHeading badge="Maintenance" title="AMC Plans" subtitle="Keep your elevator running perfectly with our Annual Maintenance Contracts" />
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((p, i) => (
            <GlassCard key={i} className={`p-8 text-center ${p.popular ? "border-primary/30 glow-gold" : ""}`}>
              {p.popular && <span className="inline-block px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-semibold mb-3">Recommended</span>}
              <h3 className="text-xl font-heading font-bold text-foreground mb-2">{p.name}</h3>
              <p className="text-gradient-gold text-3xl font-heading font-bold mb-6">{p.price}</p>
              <ul className="space-y-3 mb-6">
                {p.features.map((f) => (
                  <li key={f} className="text-muted-foreground text-sm flex items-center gap-2 justify-center">
                    <CheckCircle2 className="w-4 h-4 text-primary" /> {f}
                  </li>
                ))}
              </ul>
              <Link to="/contact" className="block w-full py-3 rounded-lg bg-primary/10 text-primary font-semibold text-sm hover:bg-primary hover:text-primary-foreground transition-all">
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
    <section className="py-20 border-t border-border">
      <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
        <SectionHeading badge="FAQ" title="Frequently Asked Questions" subtitle="Find answers to common questions about our elevator solutions" />
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div key={i} className="glass-card rounded-xl overflow-hidden">
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-5 text-left"
              >
                <span className="text-foreground font-medium text-sm pr-4">{faq.q}</span>
                <ChevronDown className={`w-5 h-5 text-primary shrink-0 transition-transform ${openIndex === i ? "rotate-180" : ""}`} />
              </button>
              {openIndex === i && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="px-5 pb-5">
                  <p className="text-muted-foreground text-sm leading-relaxed">{faq.a}</p>
                </motion.div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ContactSection = () => (
  <section className="py-20 border-t border-border">
    <div className="container mx-auto px-4 lg:px-8">
      <SectionHeading badge="Get In Touch" title="Contact Us" subtitle="Ready to elevate your building? Reach out for a free consultation" />
      <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
        <div className="space-y-6">
          {[
            { icon: <Phone className="w-5 h-5" />, title: "Call Us", info: "+91 123 456 7890" },
            { icon: <Mail className="w-5 h-5" />, title: "Email Us", info: "info@xelevators.com" },
            { icon: <MapPin className="w-5 h-5" />, title: "Visit Us", info: "123 Elevator Tower, Business District, Mumbai 400001" },
          ].map((c, i) => (
            <GlassCard key={i} className="p-5 flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">{c.icon}</div>
              <div>
                <h4 className="text-foreground font-semibold text-sm mb-1">{c.title}</h4>
                <p className="text-muted-foreground text-sm">{c.info}</p>
              </div>
            </GlassCard>
          ))}
        </div>
        <GlassCard className="p-8" hover={false}>
          <form className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <input placeholder="Full Name" className="bg-secondary/50 border border-border rounded-lg px-4 py-3 text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors" />
              <input placeholder="Phone Number" className="bg-secondary/50 border border-border rounded-lg px-4 py-3 text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors" />
            </div>
            <input placeholder="Email Address" className="w-full bg-secondary/50 border border-border rounded-lg px-4 py-3 text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors" />
            <select className="w-full bg-secondary/50 border border-border rounded-lg px-4 py-3 text-muted-foreground text-sm focus:outline-none focus:border-primary transition-colors">
              <option>Select Service</option>
              <option>Residential Elevator</option>
              <option>Commercial Elevator</option>
              <option>AMC Plan</option>
              <option>Modernization</option>
            </select>
            <textarea placeholder="Your Message" rows={4} className="w-full bg-secondary/50 border border-border rounded-lg px-4 py-3 text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors resize-none" />
            <button type="button" className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-semibold text-sm hover:bg-gold-light transition-colors">
              Send Message
            </button>
          </form>
        </GlassCard>
      </div>
    </div>
  </section>
);

const Index = () => (
  <>
    <Hero />
    <MissionVision />
    <ImpactMetrics />
    <Solutions />
    <Finishes />
    <Technology />
    <AMCPlans />
    <FAQ />
    <ContactSection />
  </>
);

export default Index;
