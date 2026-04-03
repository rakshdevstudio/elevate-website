import { ReactNode, useEffect, useRef, useState } from "react";
import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import StarBorder from "../StarBorder";

interface SectionHeadingProps {
  badge?: string;
  badgeClassName?: string;
  title: ReactNode;
  titleClassName?: string;
  subtitle?: string;
  center?: boolean;
  children?: ReactNode;
}

export const SectionHeading = ({ badge, badgeClassName, title, titleClassName, subtitle, center = true }: SectionHeadingProps) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    className={`mb-8 ${center ? "text-center" : ""}`}
  >
    {badge && (
      <motion.span
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className={`inline-block px-5 py-2 rounded-full bg-primary/8 text-primary font-semibold tracking-[0.2em] uppercase mb-5 border border-primary/12 backdrop-blur-sm ${badgeClassName || "text-xs"}`}
      >
        {badge}
      </motion.span>
    )}
    <h2 className={`font-heading font-bold text-foreground mb-4 tracking-tight leading-[1.1] ${titleClassName || "text-3xl md:text-4xl lg:text-5xl xl:text-[3.5rem]"}`}>
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
  /** When true, a radial glow follows the cursor within the card */
  glowFollow?: boolean;
}

export const GlassCard = ({ children, className = "", hover = true, delay = 0, premium = false, tilt = false, glowFollow = false }: GlassCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [3, -3]), { stiffness: 200, damping: 30 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-3, 3]), { stiffness: 200, damping: 30 });
  const [glow, setGlow] = useState<{ x: number; y: number; visible: boolean }>({ x: 50, y: 50, visible: false });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width;
    const ny = (e.clientY - rect.top) / rect.height;
    if (tilt) { mouseX.set(nx - 0.5); mouseY.set(ny - 0.5); }
    if (glowFollow) setGlow({ x: nx * 100, y: ny * 100, visible: true });
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    if (glowFollow) setGlow(prev => ({ ...prev, visible: false }));
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
      className={`rounded-2xl ${hover ? "transition-all duration-500 cursor-pointer text-left" : ""} ${premium ? "h-full" : `glass-card ${className}`}`}
    >
      {premium ? (
        <StarBorder speed="5s" color="#D4AF37" className={`w-full h-full ${className.includes('group') ? 'group' : ''}`} innerClassName={`glass-card-premium glare-hover w-full h-full ${className.replace('group', '')}`}>
          {glowFollow && (
            <div
              aria-hidden
              className="absolute inset-0 rounded-2xl pointer-events-none z-0 transition-opacity duration-300"
              style={{
                opacity: glow.visible ? 1 : 0,
                background: `radial-gradient(circle 180px at ${glow.x}% ${glow.y}%, hsl(43 66% 52% / 0.10), transparent 70%)`,
              }}
            />
          )}
          {children}
        </StarBorder>
      ) : (
        <>
          {glowFollow && (
            <div
              aria-hidden
              className="absolute inset-0 rounded-2xl pointer-events-none z-0 transition-opacity duration-300"
              style={{
                opacity: glow.visible ? 1 : 0,
                background: `radial-gradient(circle 180px at ${glow.x}% ${glow.y}%, hsl(43 66% 52% / 0.10), transparent 70%)`,
              }}
            />
          )}
          {children}
        </>
      )}
    </motion.div>
  );
};

interface StatCardProps {
  value: string;
  label: string;
  icon?: ReactNode;
  delay?: number;
}

export const StatCard = ({ value, label, icon, delay = 0 }: StatCardProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const [displayValue, setDisplayValue] = useState("0");

  useEffect(() => {
    if (!isInView) return;
    const numericMatch = value.match(/(\d+)/);
    if (!numericMatch) { setDisplayValue(value); return; }
    const target = parseInt(numericMatch[1]);
    const suffix = value.replace(/\d+/, "");
    const duration = 1800;
    const startTime = Date.now();
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(Math.round(target * eased) + suffix);
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [isInView, value]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -8, transition: { duration: 0.28, ease: "easeOut" } }}
      className="group relative rounded-2xl h-full cursor-pointer"
    >
      <StarBorder speed="5s" color="#D4AF37" className="w-full h-full" innerClassName="glass-card-premium glare-hover w-full h-full overflow-hidden">
        {/* Background radial glow that intensifies on hover */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/6 via-transparent to-primary/4 opacity-70 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        {/* Top shimmer line */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        {/* Hover glow ring */}
        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{ boxShadow: "0 0 40px hsl(43 66% 52% / 0.12), 0 0 80px hsl(43 66% 52% / 0.06)" }} />

        <div className="relative z-10 p-8 lg:p-10 flex flex-col items-center text-center">
          {/* Icon area: circular gradient container with pulsing orb */}
          {icon && (
            <div className="relative mb-7">
              {/* Pulsing background orb */}
              <motion.div
                className="absolute inset-0 rounded-full bg-primary/20 blur-xl"
                animate={{ scale: [1, 1.35, 1], opacity: [0.35, 0.6, 0.35] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              />
              {/* Icon container */}
              <motion.div
                whileHover={{ scale: 1.12 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="relative w-16 h-16 rounded-2xl flex items-center justify-center text-primary"
                style={{
                  background: "linear-gradient(135deg, hsl(43 66% 52% / 0.18) 0%, hsl(43 66% 52% / 0.06) 100%)",
                  boxShadow: "0 0 24px hsl(43 66% 52% / 0.15), inset 0 1px 0 hsl(0 0% 100% / 0.08), 0 0 0 1px hsl(43 66% 52% / 0.12)",
                }}
              >
                <div className="group-hover:[filter:drop-shadow(0_0_10px_hsl(43_66%_52%/0.6))] transition-all duration-300">
                  {icon}
                </div>
              </motion.div>
            </div>
          )}

          {/* Animated number */}
          <div className="text-4xl md:text-5xl font-heading font-extrabold text-gradient-gold text-shadow-glow tracking-tight mb-3">
            {displayValue}
          </div>

          {/* Separator */}
          <div className="w-12 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent mb-3 group-hover:w-20 transition-all duration-500" />

          {/* Label */}
          <div className="text-muted-foreground/80 text-sm font-medium tracking-wide leading-snug">
            {label}
          </div>
        </div>
      </StarBorder>
    </motion.div>
  );
};

// Keep backward compat alias
export const AnimatedCounter = StatCard;

interface PageHeroProps {
  badge?: string;
  title: ReactNode;
  subtitle: ReactNode;
  backgroundImage?: string;
}

export const PageHero = ({ badge, title, subtitle, backgroundImage }: PageHeroProps) => (
  <section className="relative overflow-hidden min-h-[80vh] lg:min-h-[85vh] flex items-center">
    <div className="absolute inset-0 bg-navy-gradient" />
    {backgroundImage && (
      <div className="absolute inset-0">
        <img src={backgroundImage} alt="" className="w-full h-full object-cover opacity-40" loading="eager" />
      </div>
    )}
    <div className="absolute inset-0 bg-gradient-to-b from-[hsl(213_62%_6%/0.75)] via-[hsl(213_62%_6%/0.55)] to-[hsl(213_62%_6%/0.9)]" />
    <div className="absolute inset-0 bg-gradient-to-r from-[hsl(213_62%_6%/0.3)] via-transparent to-[hsl(213_62%_6%/0.3)]" />
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-primary/4 rounded-full blur-[180px]" />
      <div className="absolute bottom-1/3 left-1/3 w-[500px] h-[500px] bg-[hsl(210_60%_40%/0.03)] rounded-full blur-[150px]" />
    </div>
    <FloatingParticles count={15} />
    <div className="container mx-auto px-4 lg:px-8 text-center relative z-10 pt-24 pb-16">
      <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}>
        {badge && (
          <span className="inline-block px-5 py-2 rounded-full bg-primary/8 text-primary text-xs font-semibold tracking-[0.2em] uppercase mb-6 border border-primary/12 backdrop-blur-sm">
            {badge}
          </span>
        )}
        <h1 className="text-4xl md:text-5xl lg:text-7xl font-heading font-extrabold text-foreground mb-6 tracking-tight leading-[1.05] text-shadow-hero">{title}</h1>
        <p className="text-muted-foreground text-lg lg:text-xl max-w-2xl mx-auto leading-relaxed opacity-80 mb-10">{subtitle}</p>
        <Link to="/contact" className="group inline-flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-gold-light text-primary-foreground px-10 py-4 rounded-full font-semibold text-base transition-all duration-300 hover:shadow-[0_0_40px_hsl(43_66%_52%/0.4)] hover:scale-105 btn-glow">
          Reach us <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </motion.div>
    </div>
    <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-background via-background/80 to-transparent" />
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
