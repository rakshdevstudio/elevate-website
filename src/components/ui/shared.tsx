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
  delay?: number;
}

export const GlassCard = ({ children, className = "", hover = true, delay = 0 }: GlassCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-30px" }}
    transition={{ duration: 0.5, delay, ease: "easeOut" }}
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
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: "easeOut" }}>
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

// Scroll-triggered reveal wrapper for sections
interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "right";
}

export const ScrollReveal = ({ children, className = "", delay = 0, direction = "up" }: ScrollRevealProps) => {
  const directionMap = {
    up: { x: 0, y: 40 },
    left: { x: -40, y: 0 },
    right: { x: 40, y: 0 },
  };
  const offset = directionMap[direction];

  return (
    <motion.div
      initial={{ opacity: 0, x: offset.x, y: offset.y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Staggered children container
interface StaggerContainerProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
}

export const StaggerContainer = ({ children, className = "", staggerDelay = 0.1 }: StaggerContainerProps) => (
  <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: "-40px" }}
    variants={{
      hidden: {},
      visible: { transition: { staggerChildren: staggerDelay } },
    }}
    className={className}
  >
    {children}
  </motion.div>
);

export const staggerChildVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export const StaggerChild = ({ children, className = "" }: { children: ReactNode; className?: string }) => (
  <motion.div variants={staggerChildVariants} className={className}>
    {children}
  </motion.div>
);
