import { ReactNode, useEffect, useRef, useState } from "react";
import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";

interface SectionHeadingProps {
  badge?: string;
  title: string;
  subtitle?: string;
  center?: boolean;
  children?: ReactNode;
}

export const SectionHeading = ({ badge, title, subtitle, center = true }: SectionHeadingProps) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    className={`mb-16 ${center ? "text-center" : ""}`}
  >
    {badge && (
      <motion.span
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="inline-block px-5 py-2 rounded-full bg-primary/8 text-primary text-xs font-semibold tracking-[0.2em] uppercase mb-5 border border-primary/12 backdrop-blur-sm"
      >
        {badge}
      </motion.span>
    )}
    <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-[3.5rem] font-heading font-bold text-foreground mb-5 tracking-tight leading-[1.1]">
      {title}
    </h2>
    {subtitle && (
      <p className="text-muted-foreground max-w-2xl mx-auto text-base lg:text-lg leading-relaxed opacity-80">
        {subtitle}
      </p>
    )}
  </motion.div>
);

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  delay?: number;
  premium?: boolean;
  tilt?: boolean;
}

export const GlassCard = ({ children, className = "", hover = true, delay = 0, premium = false, tilt = false }: GlassCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [3, -3]), { stiffness: 200, damping: 30 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-3, 3]), { stiffness: 200, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!tilt || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={hover ? { y: -8, transition: { duration: 0.35, ease: "easeOut" } } : undefined}
      style={tilt ? { rotateX, rotateY, transformPerspective: 800 } : undefined}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`${premium ? "glass-card-premium" : "glass-card"} rounded-2xl ${
        hover ? "transition-all duration-500 cursor-pointer" : ""
      } ${className}`}
    >
      {children}
    </motion.div>
  );
};

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
    const duration = 2200;
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      const current = Math.round(target * eased);
      setDisplayValue(current + suffix);
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [isInView, value]);

  return (
    <GlassCard className="text-center p-8 lg:p-10 relative overflow-hidden group" premium tilt>
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-primary/3 pointer-events-none opacity-60 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-primary/8 rounded-full blur-[60px] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      {icon && <div className="text-primary mb-4 flex justify-center relative z-10 icon-glow">{icon}</div>}
      <div ref={ref} className="text-4xl md:text-5xl font-heading font-extrabold text-gradient-gold mb-3 text-shadow-glow relative z-10">
        {displayValue}
      </div>
      <div className="w-16 h-0.5 mx-auto bg-gradient-to-r from-transparent via-primary/60 to-transparent mb-3" />
      <div className="text-muted-foreground text-sm font-medium tracking-wide relative z-10">{label}</div>
    </GlassCard>
  );
};

export const StatCard = AnimatedCounter;

interface PageHeroProps {
  badge?: string;
  title: string;
  subtitle: string;
  backgroundImage?: string;
}

export const PageHero = ({ badge, title, subtitle, backgroundImage }: PageHeroProps) => (
  <section className="pt-32 pb-20 lg:pt-40 lg:pb-28 relative overflow-hidden min-h-[60vh] flex items-center">
    <div className="absolute inset-0 bg-navy-gradient" />
    {/* Background image */}
    {backgroundImage && (
      <div className="absolute inset-0">
        <img
          src={backgroundImage}
          alt=""
          className="w-full h-full object-cover opacity-35"
          loading="eager"
        />
      </div>
    )}
    {/* Multi-layer overlay */}
    <div className="absolute inset-0 bg-gradient-to-b from-[hsl(213_62%_6%/0.85)] via-[hsl(213_62%_6%/0.65)] to-[hsl(213_62%_6%/0.9)]" />
    <div className="absolute inset-0 bg-gradient-to-r from-[hsl(213_62%_6%/0.3)] via-transparent to-[hsl(213_62%_6%/0.3)]" />
    {/* Light orbs */}
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-primary/4 rounded-full blur-[180px]" />
      <div className="absolute bottom-1/3 left-1/3 w-[500px] h-[500px] bg-[hsl(210_60%_40%/0.03)] rounded-full blur-[150px]" />
    </div>
    <div className="container mx-auto px-4 lg:px-8 text-center relative z-10">
      <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}>
        {badge && (
          <span className="inline-block px-5 py-2 rounded-full bg-primary/8 text-primary text-xs font-semibold tracking-[0.2em] uppercase mb-5 border border-primary/12 backdrop-blur-sm">
            {badge}
          </span>
        )}
        <h1 className="text-4xl md:text-5xl lg:text-7xl font-heading font-extrabold text-foreground mb-6 tracking-tight leading-[1.05] text-shadow-hero">{title}</h1>
        <p className="text-muted-foreground text-lg lg:text-xl max-w-2xl mx-auto leading-relaxed opacity-80">{subtitle}</p>
      </motion.div>
    </div>
    <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background to-transparent" />
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
    up: { x: 0, y: 50 },
    left: { x: -50, y: 0 },
    right: { x: 50, y: 0 },
  };
  const offset = directionMap[direction];

  return (
    <motion.div
      initial={{ opacity: 0, x: offset.x, y: offset.y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
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
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } },
};

export const StaggerChild = ({ children, className = "" }: { children: ReactNode; className?: string }) => (
  <motion.div variants={staggerChildVariants} className={className}>
    {children}
  </motion.div>
);

// Floating particles background component
export const FloatingParticles = ({ count = 25 }: { count?: number }) => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {Array.from({ length: count }).map((_, i) => (
      <motion.div
        key={i}
        className="absolute rounded-full"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          width: `${1 + Math.random() * 2}px`,
          height: `${1 + Math.random() * 2}px`,
          background: i % 3 === 0 
            ? 'hsl(43 66% 52% / 0.3)' 
            : 'hsl(0 0% 100% / 0.15)',
        }}
        animate={{
          y: [0, -(20 + Math.random() * 40), 0],
          x: [0, (Math.random() - 0.5) * 20, 0],
          opacity: [0.15, 0.5, 0.15],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 5 + Math.random() * 6,
          repeat: Infinity,
          delay: Math.random() * 4,
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
