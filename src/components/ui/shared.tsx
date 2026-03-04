import { ReactNode, useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

interface SectionHeadingProps {
  badge?: string;
  title: string;
  subtitle?: string;
  center?: boolean;
  children?: ReactNode;
}

export const SectionHeading = ({ badge, title, subtitle, center = true }: SectionHeadingProps) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    className={`mb-14 ${center ? "text-center" : ""}`}
  >
    {badge && (
      <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold tracking-[0.15em] uppercase mb-4 border border-primary/10">
        {badge}
      </span>
    )}
    <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-4 tracking-tight">{title}</h2>
    {subtitle && <p className="text-muted-foreground max-w-2xl mx-auto text-base lg:text-lg leading-relaxed">{subtitle}</p>}
  </motion.div>
);

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  delay?: number;
  premium?: boolean;
}

export const GlassCard = ({ children, className = "", hover = true, delay = 0, premium = false }: GlassCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-30px" }}
    transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    whileHover={hover ? { y: -6, transition: { duration: 0.3 } } : undefined}
    className={`${premium ? "glass-card-premium" : "glass-card"} rounded-2xl p-6 ${
      hover ? "hover:border-primary/20 hover:shadow-[0_0_30px_hsl(43_66%_52%/0.1),0_20px_60px_hsl(213_62%_4%/0.4)] transition-all duration-500" : ""
    } ${className}`}
  >
    {children}
  </motion.div>
);

interface StatCardProps {
  value: string;
  label: string;
  icon?: ReactNode;
}

export const AnimatedCounter = ({ value, label, icon }: StatCardProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [displayValue, setDisplayValue] = useState("0");

  useEffect(() => {
    if (!isInView) return;
    const numericMatch = value.match(/(\d+)/);
    if (!numericMatch) { setDisplayValue(value); return; }
    const target = parseInt(numericMatch[1]);
    const suffix = value.replace(/\d+/, "");
    const duration = 2000;
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(target * eased);
      setDisplayValue(current + suffix);
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [isInView, value]);

  return (
    <GlassCard className="text-center p-8 relative overflow-hidden" premium>
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
      {icon && <div className="text-primary mb-3 flex justify-center relative z-10">{icon}</div>}
      <div ref={ref} className="text-3xl md:text-4xl font-heading font-bold text-gradient-gold mb-2 text-shadow-glow relative z-10">
        {displayValue}
      </div>
      <div className="w-12 h-0.5 mx-auto bg-gradient-to-r from-transparent via-primary/50 to-transparent mb-2" />
      <div className="text-muted-foreground text-sm relative z-10">{label}</div>
    </GlassCard>
  );
};

export const StatCard = AnimatedCounter;

interface PageHeroProps {
  badge?: string;
  title: string;
  subtitle: string;
}

export const PageHero = ({ badge, title, subtitle }: PageHeroProps) => (
  <section className="pt-28 pb-16 lg:pt-36 lg:pb-20 relative overflow-hidden">
    <div className="absolute inset-0 bg-navy-gradient" />
    <div className="absolute inset-0">
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[150px]" />
      <div className="absolute bottom-0 left-1/3 w-[400px] h-[400px] bg-primary/3 rounded-full blur-[120px]" />
    </div>
    <div className="container mx-auto px-4 lg:px-8 text-center relative z-10">
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>
        {badge && (
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold tracking-[0.15em] uppercase mb-4 border border-primary/10">
            {badge}
          </span>
        )}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-foreground mb-4 tracking-tight">{title}</h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">{subtitle}</p>
      </motion.div>
    </div>
  </section>
);

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
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

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
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
};

export const StaggerChild = ({ children, className = "" }: { children: ReactNode; className?: string }) => (
  <motion.div variants={staggerChildVariants} className={className}>
    {children}
  </motion.div>
);

// Floating particles background component
export const FloatingParticles = ({ count = 20 }: { count?: number }) => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {Array.from({ length: count }).map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-1 h-1 rounded-full bg-primary/20"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
        }}
        animate={{
          y: [0, -30, 0],
          opacity: [0.2, 0.6, 0.2],
          scale: [1, 1.5, 1],
        }}
        transition={{
          duration: 4 + Math.random() * 4,
          repeat: Infinity,
          delay: Math.random() * 3,
          ease: "easeInOut",
        }}
      />
    ))}
  </div>
);

// Section divider with gradient
export const SectionDivider = () => (
  <div className="gradient-separator" />
);
