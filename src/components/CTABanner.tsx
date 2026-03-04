import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, MessageCircle, Phone, Shield, Award, CheckCircle2, Zap } from "lucide-react";
import { GlassCard, ScrollReveal } from "@/components/ui/shared";

interface CTABannerProps {
  variant?: "quote" | "inspection" | "whatsapp" | "engineer";
}

export const CTABanner = ({ variant = "quote" }: CTABannerProps) => {
  const configs = {
    quote: {
      title: "Get Your Free Elevator Quote",
      subtitle: "Tell us about your project and receive a customized quote within 24 hours. No commitment required.",
      primaryLabel: "Request Free Quote",
      primaryLink: "/contact",
      secondaryLabel: "Chat on WhatsApp",
      secondaryLink: "https://wa.me/919844002026",
    },
    inspection: {
      title: "Book a Free Site Inspection",
      subtitle: "Our engineers will visit your site, assess requirements, and provide a detailed proposal — completely free.",
      primaryLabel: "Schedule Inspection",
      primaryLink: "/contact",
      secondaryLabel: "Call Us Now",
      secondaryLink: "tel:+919844002026",
    },
    whatsapp: {
      title: "Have Questions? Let's Talk",
      subtitle: "Chat with our elevator engineers on WhatsApp for instant answers about your project.",
      primaryLabel: "Chat with Engineer",
      primaryLink: "https://wa.me/919844002026",
      secondaryLabel: "View Products",
      secondaryLink: "/products",
    },
    engineer: {
      title: "Talk to an Elevator Engineer",
      subtitle: "Get expert advice on the right elevator solution for your building. Our engineers are ready to help.",
      primaryLabel: "Call an Engineer",
      primaryLink: "tel:+919844002026",
      secondaryLabel: "Get Quote Online",
      secondaryLink: "/contact",
    },
  };

  const config = configs[variant];
  const isExternal = config.primaryLink.startsWith("http") || config.primaryLink.startsWith("tel:");
  const isSecondaryExternal = config.secondaryLink.startsWith("http") || config.secondaryLink.startsWith("tel:");

  return (
    <section className="py-20 lg:py-28 relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_50%,hsl(43_66%_52%/0.05),transparent)]" />
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <ScrollReveal>
          <GlassCard className="p-10 lg:p-14 relative overflow-hidden text-center max-w-4xl mx-auto" hover={false} premium>
            <div className="absolute inset-0 bg-gradient-to-br from-primary/6 via-transparent to-primary/3 pointer-events-none" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-28 bg-primary/10 rounded-full blur-[80px] pointer-events-none" />
            <div className="relative z-10">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-heading font-extrabold text-foreground mb-4 tracking-tight">
                {config.title}
              </h2>
              <p className="text-muted-foreground text-sm lg:text-base max-w-2xl mx-auto mb-8 leading-relaxed opacity-80">
                {config.subtitle}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                {isExternal ? (
                  <a href={config.primaryLink} target={config.primaryLink.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="group inline-flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-gold-light text-primary-foreground px-8 py-3.5 rounded-full font-semibold text-sm transition-all duration-300 hover:shadow-[0_0_40px_hsl(43_66%_52%/0.4)] hover:scale-105 btn-glow">
                    {config.primaryLabel} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                ) : (
                  <Link to={config.primaryLink} className="group inline-flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-gold-light text-primary-foreground px-8 py-3.5 rounded-full font-semibold text-sm transition-all duration-300 hover:shadow-[0_0_40px_hsl(43_66%_52%/0.4)] hover:scale-105 btn-glow">
                    {config.primaryLabel} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                )}
                {isSecondaryExternal ? (
                  <a href={config.secondaryLink} target={config.secondaryLink.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 border border-primary/20 text-foreground px-8 py-3.5 rounded-full font-semibold text-sm hover:bg-primary/10 hover:border-primary/30 transition-all duration-300">
                    {config.secondaryLabel}
                  </a>
                ) : (
                  <Link to={config.secondaryLink} className="inline-flex items-center justify-center gap-2 border border-primary/20 text-foreground px-8 py-3.5 rounded-full font-semibold text-sm hover:bg-primary/10 hover:border-primary/30 transition-all duration-300">
                    {config.secondaryLabel}
                  </Link>
                )}
              </div>
            </div>
          </GlassCard>
        </ScrollReveal>
      </div>
    </section>
  );
};

export const TrustBadges = () => (
  <section className="py-12 lg:py-16 relative">
    <div className="container mx-auto px-4 lg:px-8">
      <div className="flex flex-wrap items-center justify-center gap-6 lg:gap-10">
        {[
          { icon: <Shield className="w-5 h-5" />, label: "ISO 9001:2015 Certified" },
          { icon: <Award className="w-5 h-5" />, label: "CE Marked Systems" },
          { icon: <CheckCircle2 className="w-5 h-5" />, label: "BIS Approved" },
          { icon: <Zap className="w-5 h-5" />, label: "MSME Registered" },
          { icon: <Phone className="w-5 h-5" />, label: "24/7 Emergency Support" },
        ].map((badge, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.5 }}
            className="flex items-center gap-2.5 px-5 py-2.5 rounded-full border border-foreground/8 bg-foreground/3 backdrop-blur-sm"
          >
            <span className="text-primary">{badge.icon}</span>
            <span className="text-foreground/70 text-xs font-medium whitespace-nowrap">{badge.label}</span>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export const InlineQuoteForm = () => (
  <section className="py-20 lg:py-28 relative">
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_50%_50%,hsl(43_66%_52%/0.04),transparent)]" />
    <div className="container mx-auto px-4 lg:px-8 relative z-10">
      <div className="max-w-2xl mx-auto text-center">
        <ScrollReveal>
          <GlassCard className="p-8 lg:p-10 relative overflow-hidden" hover={false} premium>
            <div className="absolute inset-0 bg-gradient-to-br from-primary/4 via-transparent to-primary/2 pointer-events-none" />
            <h3 className="text-xl lg:text-2xl font-heading font-bold text-foreground mb-2 relative z-10">Quick Quote Request</h3>
            <p className="text-muted-foreground text-sm mb-6 opacity-70 relative z-10">Get a callback within 2 hours</p>
            <form className="space-y-4 relative z-10">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input placeholder="Your Name *" className="input-premium" />
                <input placeholder="Phone Number *" className="input-premium" />
              </div>
              <select className="w-full input-premium text-muted-foreground/60">
                <option>Select Elevator Type</option>
                <option>Residential</option>
                <option>Commercial</option>
                <option>Hospital</option>
                <option>Capsule</option>
              </select>
              <button type="button" className="w-full bg-gradient-to-r from-primary to-gold-light text-primary-foreground py-3.5 rounded-xl font-semibold text-sm transition-all duration-300 hover:shadow-[0_0_30px_hsl(43_66%_52%/0.35)] hover:scale-[1.02] active:scale-100 btn-glow">
                Get Free Quote →
              </button>
            </form>
          </GlassCard>
        </ScrollReveal>
      </div>
    </div>
  </section>
);
