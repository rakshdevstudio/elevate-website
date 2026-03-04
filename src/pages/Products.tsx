import { Link } from "react-router-dom";
import { PageHero, SectionHeading, GlassCard } from "@/components/ui/shared";
import { CheckCircle2, Home, Building2, Palette } from "lucide-react";

const residentialProducts = [
  { name: "Home Lift", capacity: "2-4 Persons", speed: "0.4 m/s", features: ["Compact design", "Low noise", "Energy efficient", "Multiple finishes"] },
  { name: "Villa Elevator", capacity: "4-6 Persons", speed: "0.6 m/s", features: ["Spacious cabin", "Panoramic options", "Smart controls", "Premium finishes"] },
  { name: "Bungalow Lift", capacity: "6-8 Persons", speed: "1.0 m/s", features: ["Large cabin", "Wheelchair accessible", "Auto door", "Luxury interiors"] },
];

const commercialProducts = [
  { name: "Passenger Elevator", capacity: "8-20 Persons", speed: "1.0-2.5 m/s", features: ["High traffic", "Energy regeneration", "Group control", "Fire rated"] },
  { name: "Freight Elevator", capacity: "1-5 Tons", speed: "0.5-1.0 m/s", features: ["Heavy duty", "Wide doors", "Industrial finish", "Overload protection"] },
  { name: "Hospital Elevator", capacity: "13-26 Persons", speed: "1.0-1.75 m/s", features: ["Stretcher size", "Antibacterial", "Emergency priority", "Smooth ride"] },
];

const pricingTiers = [
  { name: "Essential", price: "₹3.5 - 5L", desc: "Perfect for small homes", features: ["2-4 person capacity", "Standard finishes", "Basic controls", "1-year warranty"] },
  { name: "Premium", price: "₹5 - 8L", desc: "Ideal for villas & apartments", features: ["4-6 person capacity", "Premium finishes", "Smart controls", "2-year warranty"], popular: true },
  { name: "Luxury", price: "₹8 - 15L+", desc: "For commercial & luxury projects", features: ["8+ person capacity", "Custom finishes", "IoT enabled", "5-year warranty"] },
];

const customizations = [
  "Stainless Steel Mirror Finish",
  "Rose Gold Hairline",
  "Wooden Veneer Panels",
  "Glass Panoramic Walls",
  "LED Ceiling Designs",
  "Custom Flooring Options",
  "Touchscreen Controls",
  "Designer Handrails",
];

const Products = () => (
  <>
    <PageHero badge="Our Products" title="Elevator Solutions for Every Need" subtitle="From compact home lifts to high-capacity commercial elevators, discover the perfect solution." />

    <section className="py-20 border-t border-border">
      <div className="container mx-auto px-4 lg:px-8">
        <SectionHeading badge="Residential" title="Residential Elevators" subtitle="Elegant, safe, and space-efficient elevators designed for modern homes" />
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {residentialProducts.map((p, i) => (
            <GlassCard key={i} className="p-6">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <Home className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-heading font-bold text-foreground mb-1">{p.name}</h3>
              <div className="flex gap-4 mb-4">
                <span className="text-primary text-xs font-medium">{p.capacity}</span>
                <span className="text-muted-foreground text-xs">{p.speed}</span>
              </div>
              <ul className="space-y-2">
                {p.features.map((f) => (
                  <li key={f} className="text-muted-foreground text-sm flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0" /> {f}
                  </li>
                ))}
              </ul>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>

    <section className="py-20 border-t border-border">
      <div className="container mx-auto px-4 lg:px-8">
        <SectionHeading badge="Commercial" title="Commercial Elevators" subtitle="High-performance elevators for offices, malls, hospitals, and more" />
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {commercialProducts.map((p, i) => (
            <GlassCard key={i} className="p-6">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <Building2 className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-heading font-bold text-foreground mb-1">{p.name}</h3>
              <div className="flex gap-4 mb-4">
                <span className="text-primary text-xs font-medium">{p.capacity}</span>
                <span className="text-muted-foreground text-xs">{p.speed}</span>
              </div>
              <ul className="space-y-2">
                {p.features.map((f) => (
                  <li key={f} className="text-muted-foreground text-sm flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0" /> {f}
                  </li>
                ))}
              </ul>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>

    <section className="py-20 border-t border-border">
      <div className="container mx-auto px-4 lg:px-8">
        <SectionHeading badge="Customization" title="Design Your Elevator" subtitle="Choose from a wide range of finishes and design options" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {customizations.map((c) => (
            <GlassCard key={c} className="p-4 text-center">
              <Palette className="w-5 h-5 text-primary mx-auto mb-2" />
              <span className="text-foreground text-sm font-medium">{c}</span>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>

    <section className="py-20 border-t border-border">
      <div className="container mx-auto px-4 lg:px-8">
        <SectionHeading badge="Pricing" title="Pricing Plans" subtitle="Transparent pricing with no hidden costs" />
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {pricingTiers.map((t, i) => (
            <GlassCard key={i} className={`p-8 text-center ${t.popular ? "border-primary/30 glow-gold" : ""}`}>
              {t.popular && <span className="inline-block px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-semibold mb-3">Most Popular</span>}
              <h3 className="text-xl font-heading font-bold text-foreground mb-1">{t.name}</h3>
              <p className="text-muted-foreground text-xs mb-4">{t.desc}</p>
              <p className="text-gradient-gold text-3xl font-heading font-bold mb-6">{t.price}</p>
              <ul className="space-y-3 mb-6">
                {t.features.map((f) => (
                  <li key={f} className="text-muted-foreground text-sm flex items-center gap-2 justify-center">
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0" /> {f}
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
  </>
);

export default Products;
