import { ReactNode } from "react";
import { motion } from "framer-motion";

interface SectionHeadingProps {
  badge?: string;
  title: string;
  subtitle?: string;
  center?: boolean;
  children?: ReactNode;
}

export const SectionHeading = ({ badge, title, subtitle, center = true }: SectionHeadingProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.5 }}
    className={`mb-12 ${center ? "text-center" : ""}`}
  >
    {badge && (
      <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold tracking-wider uppercase mb-4">
        {badge}
      </span>
    )}
    <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-4">{title}</h2>
    {subtitle && <p className="text-muted-foreground max-w-2xl mx-auto text-base lg:text-lg">{subtitle}</p>}
  </motion.div>
);

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export const GlassCard = ({ children, className = "", hover = true }: GlassCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-30px" }}
    transition={{ duration: 0.4 }}
    className={`glass-card rounded-xl p-6 ${hover ? "hover:border-primary/30 hover:glow-gold transition-all duration-300" : ""} ${className}`}
  >
    {children}
  </motion.div>
);

interface StatCardProps {
  value: string;
  label: string;
  icon?: ReactNode;
}

export const StatCard = ({ value, label, icon }: StatCardProps) => (
  <GlassCard className="text-center p-8">
    {icon && <div className="text-primary mb-3 flex justify-center">{icon}</div>}
    <div className="text-3xl md:text-4xl font-heading font-bold text-gradient-gold mb-2">{value}</div>
    <div className="text-muted-foreground text-sm">{label}</div>
  </GlassCard>
);

interface PageHeroProps {
  badge?: string;
  title: string;
  subtitle: string;
}

export const PageHero = ({ badge, title, subtitle }: PageHeroProps) => (
  <section className="pt-28 pb-16 lg:pt-36 lg:pb-20">
    <div className="container mx-auto px-4 lg:px-8 text-center">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        {badge && (
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold tracking-wider uppercase mb-4">
            {badge}
          </span>
        )}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-foreground mb-4">{title}</h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">{subtitle}</p>
      </motion.div>
    </div>
  </section>
);
