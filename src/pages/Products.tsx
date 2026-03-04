import { Link } from "react-router-dom";
import { PageHero, SectionHeading, GlassCard } from "@/components/ui/shared";
import { Building2, Home, CheckCircle2, ChevronRight, CircleDot } from "lucide-react";
import { useState } from "react";

const elevatorCategories = [
  {
    icon: <Home className="w-8 h-8" />,
    title: "Residential Elevators",
    desc: "Elegant and space-efficient elevators designed for homes, villas, and apartment complexes.",
    features: ["MRL Technology", "Low Noise Operation", "Compact Design", "Energy Efficient", "Customizable Interiors", "Safety Certified"],
  },
  {
    icon: <Building2 className="w-8 h-8" />,
    title: "Commercial Elevators",
    desc: "High-capacity, high-speed elevators for offices, shopping malls, and commercial buildings.",
    features: ["High Speed", "Large Capacity", "Heavy Duty", "Smart Controls", "Group Management", "Fire Rated"],
  },
  {
    icon: <Building2 className="w-8 h-8" />,
    title: "Hospital Elevators",
    desc: "Specially designed elevators for hospitals with stretcher-compatible cabins and smooth operation.",
    features: ["Stretcher Compatible", "Smooth Ride", "Emergency Mode", "Anti-Bacterial Finish", "Wide Doors", "Battery Backup"],
  },
  {
    icon: <CircleDot className="w-8 h-8" />,
    title: "Capsule Elevators",
    desc: "Panoramic glass elevators that add a stunning visual element to your building's architecture.",
    features: ["Glass Cabin", "Panoramic View", "Architectural Design", "LED Lighting", "Custom Shapes", "Weather Resistant"],
  },
];

const finishes = [
  { name: "Basic", price: "₹5-6 Lakhs", features: ["Standard SS finish", "Manual door", "Basic lighting", "Standard control panel"] },
  { name: "Standard", price: "₹5-8 Lakhs", features: ["Hairline SS finish", "Automatic door", "LED lighting", "Digital display", "Designer flooring"], popular: true },
  { name: "Premium", price: "₹10-20 Lakhs", features: ["Mirror/Etched SS finish", "Glass cabin options", "Designer false ceiling", "Touchscreen COP", "Customized interiors"] },
];

const packages = [
  {
    name: "Budget Choice",
    desc: "Perfect for residential buildings looking for quality at an affordable price.",
    specs: ["4-6 Persons Capacity", "MRL Technology", "Standard SS Finish", "Manual/Auto Door", "Basic COP", "Standard Lighting"],
  },
  {
    name: "Luxury Premium Selection",
    desc: "Premium experience with top-of-the-line finishes and smart features.",
    specs: ["6-13 Persons Capacity", "VVVF Drive", "Mirror/Etched SS", "Automatic Door", "Touchscreen COP", "Designer Cabin", "IoT Enabled"],
    popular: true,
  },
  {
    name: "Hospital Standard Choice",
    desc: "Compliant with hospital standards for safe and efficient patient transportation.",
    specs: ["Stretcher Size Cabin", "Smooth VVVF Drive", "Anti-Bacterial Finish", "Wide Auto Doors", "Emergency Battery", "Fire Rated"],
  },
];

const designCategories = [
  "Door Design",
  "Cabin Design",
  "False Ceiling Design",
  "COP/LOP Design",
  "Display Types",
  "Hand Rails Types",
  "Flooring Types",
];

const tabOptions = ["MRL Based Elevators", "Full Structure Elevator"];

const Products = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <>
      <section className="pt-28 pb-16 lg:pt-36 lg:pb-20">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold tracking-wider uppercase mb-4">
            Our Products
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-foreground mb-6">Our Products</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
            Discover our range of premium elevator solutions engineered for safety, performance, and elegance.
          </p>
          <div className="flex justify-center gap-2">
            {tabOptions.map((tab, i) => (
              <button
                key={tab}
                onClick={() => setActiveTab(i)}
                className={`px-6 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                  activeTab === i ? "bg-primary text-primary-foreground" : "bg-secondary/50 text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 border-t border-border">
        <div className="container mx-auto px-4 lg:px-8">
          <SectionHeading badge="Categories" title="Elevator Solutions" subtitle="Choose the right elevator for your building type" />
          <div className="space-y-8 max-w-5xl mx-auto">
            {elevatorCategories.map((cat, i) => (
              <GlassCard key={i} className="p-8">
                <div className="flex flex-col lg:flex-row gap-8">
                  <div className="lg:w-1/3">
                    <div className="w-full aspect-[4/3] bg-secondary/50 rounded-xl flex items-center justify-center text-primary">
                      {cat.icon}
                    </div>
                  </div>
                  <div className="lg:w-2/3">
                    <h3 className="text-2xl font-heading font-bold text-foreground mb-2">{cat.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-4">{cat.desc}</p>
                    <div className="grid grid-cols-2 gap-2 mb-4">
                      {cat.features.map((f) => (
                        <div key={f} className="flex items-center gap-2 text-muted-foreground text-sm">
                          <CheckCircle2 className="w-4 h-4 text-primary shrink-0" /> {f}
                        </div>
                      ))}
                    </div>
                    <Link to="/contact" className="inline-flex items-center gap-1 text-primary text-sm font-semibold hover:gap-2 transition-all">
                      Learn More <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 border-t border-border">
        <div className="container mx-auto px-4 lg:px-8">
          <SectionHeading badge="Pricing" title="Finishes & Pricing" subtitle="Choose from our range of elevator finishes" />
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {finishes.map((f, i) => (
              <GlassCard key={i} className={`p-8 text-center ${f.popular ? "border-primary/30 glow-gold" : ""}`}>
                {f.popular && <span className="inline-block px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-semibold mb-3">Most Popular</span>}
                <h3 className="text-xl font-heading font-bold text-foreground mb-2">{f.name}</h3>
                <p className="text-gradient-gold text-2xl font-heading font-bold mb-6">{f.price}</p>
                <ul className="space-y-3 mb-6">
                  {f.features.map((feat) => (
                    <li key={feat} className="text-muted-foreground text-sm flex items-center gap-2 justify-center">
                      <CheckCircle2 className="w-4 h-4 text-primary shrink-0" /> {feat}
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

      <section className="py-20 border-t border-border">
        <div className="container mx-auto px-4 lg:px-8">
          <SectionHeading badge="Packages" title="Curated Packages" subtitle="Pre-configured elevator packages tailored for specific needs" />
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {packages.map((pkg, i) => (
              <GlassCard key={i} className={`p-8 ${pkg.popular ? "border-primary/30 glow-gold" : ""}`}>
                {pkg.popular && <span className="inline-block px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-semibold mb-3">Popular</span>}
                <h3 className="text-xl font-heading font-bold text-foreground mb-2">{pkg.name}</h3>
                <p className="text-muted-foreground text-sm mb-4">{pkg.desc}</p>
                <ul className="space-y-2 mb-6">
                  {pkg.specs.map((s) => (
                    <li key={s} className="text-muted-foreground text-sm flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary shrink-0" /> {s}
                    </li>
                  ))}
                </ul>
                <Link to="/contact" className="block w-full py-3 rounded-lg bg-primary/10 text-primary font-semibold text-sm hover:bg-primary hover:text-primary-foreground transition-all text-center">
                  Enquire Now
                </Link>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 border-t border-border">
        <div className="container mx-auto px-4 lg:px-8">
          <SectionHeading badge="Customization" title="Design Customization" subtitle="Personalize every detail of your elevator" />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {designCategories.map((cat) => (
              <GlassCard key={cat} className="p-4">
                <div className="aspect-square bg-secondary/50 rounded-lg mb-3 flex items-center justify-center">
                  <span className="text-muted-foreground text-xs">Gallery</span>
                </div>
                <h4 className="text-foreground text-sm font-heading font-semibold text-center">{cat}</h4>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Products;
