import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useScroll, useTransform } from "framer-motion";
import { PageHero, SectionHeading, GlassCard, SectionDivider, ScrollReveal } from "@/components/ui/shared";
import { Shield, Award, Users, Target, Building2, Heart, Lightbulb, CheckCircle2, Pencil, Cog, Clock, Monitor, HeadphonesIcon, Home, Building, Hospital, Hotel, Factory } from "lucide-react";
import { CTABanner, TrustBadges } from "@/components/CTABanner";
import BrochureDownload from "@/components/BrochureDownload";


const values = [
  { icon: <Pencil className="w-6 h-6" />, title: "Design Excellence", desc: "Every elevator is designed to match the architecture and aesthetics of your space." },
  { icon: <Cog className="w-6 h-6" />, title: "Engineering Precision", desc: "Precision-built components ensure smooth, safe, and reliable performance." },
  { icon: <Monitor className="w-6 h-6" />, title: "Digital Reports", desc: "Clear digital reports keep you updated on project progress and system status." },
  { icon: <Target className="w-6 h-6" />, title: "Transparent Pricing", desc: "Clear and honest pricing with no hidden costs, giving you full confidence in your investment." },
  { icon: <Clock className="w-6 h-6" />, title: "Fast & Efficient Delivery", desc: "Streamlined processes ensure quick installation without compromising quality." },
  { icon: <HeadphonesIcon className="w-6 h-6" />, title: "Lifetime Support", desc: "Ongoing service and maintenance to keep your elevator running reliably for years." },
];

const certifications = [
  "ISO 9001:2015 Certified",
  "CE Marked Systems",
  "BIS Approved"
];

const registrations = [
  "MSME Registered",
  "24/7 Emergency Support"
];

const aboutStats = [
  {
    value: "75+",
    label: "Projects Installed by Our Expert Team",
    sub: "Across Karnataka & Tamil Nadu",
    icon: <Building2 className="w-6 h-6" />,
  },
  {
    value: "120+",
    label: "Customers Served Across Residential & Commercial Projects",
    sub: "Trusted by builders and homeowners",
    icon: <Users className="w-6 h-6" />,
  },
  {
    value: "99%",
    label: "System Reliability & Uptime Achieved Across Installations",
    sub: "Engineered for long-term performance",
    icon: <Target className="w-6 h-6" />,
  },
  {
    value: "25+",
    label: "People",
    sub: "Professionals Driving Our Mission Forward",
    icon: <Award className="w-6 h-6" />,
  },
];

type StorySegment = {
  text: string;
  className?: string;
};

const StoryWordParagraph = ({
  segments,
  delay = 0,
  className = "",
}: {
  segments: StorySegment[];
  delay?: number;
  className?: string;
}) => {
  const words = segments.flatMap((segment) =>
    segment.text.split(" ").filter(Boolean).map((word) => ({
      word,
      className: segment.className,
    }))
  );

  return (
    <motion.p
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={{
        hidden: {
          opacity: 0,
          y: 40,
          filter: "blur(8px)",
        },
        visible: {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          transition: {
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
            delay,
            delayChildren: 0.05,
            staggerChildren: 0.03,
          },
        },
      }}
      className={className}
    >
      {words.map((item, index) => (
        <motion.span
          key={`${item.word}-${index}`}
          variants={{
            hidden: { opacity: 0, y: 12, filter: "blur(6px)" },
            visible: {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
            },
          }}
          className={`inline-block mr-[0.3em] ${item.className || ""}`}
        >
          {item.word}
        </motion.span>
      ))}
    </motion.p>
  );
};

const BrandStorySection = () => {
  const storyRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const finalLineRef = useRef<HTMLDivElement>(null);
  const headingInView = useInView(headingRef, { once: true, margin: "-100px" });
  const finalLineInView = useInView(finalLineRef, { once: true, margin: "-80px" });
  const { scrollYProgress } = useScroll({ target: storyRef, offset: ["start end", "end start"] });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const progressHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section ref={storyRef} className="py-10 md:py-16 relative overflow-hidden group/story">
      <SectionDivider />

      <motion.div
        style={{ y: parallaxY }}
        className="absolute inset-0 pointer-events-none"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_65%_45%_at_50%_45%,hsl(43_66%_52%/0.14),transparent_70%)] animate-pulse" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_85%_65%_at_50%_60%,hsl(213_62%_10%/0.55),transparent_78%)]" />
        <motion.div
          className="absolute -top-20 left-[8%] w-[420px] h-[420px] rounded-full bg-primary/10 blur-[100px]"
          animate={{ x: [0, 28, 0], y: [0, 18, 0], scale: [1, 1.08, 1] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-[-80px] right-[6%] w-[380px] h-[380px] rounded-full bg-[hsl(210_70%_45%/0.12)] blur-[120px]"
          animate={{ x: [0, -24, 0], y: [0, -14, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
      </motion.div>

      <div className="container mx-auto px-6 max-w-4xl pt-8 relative z-10 transition-all duration-500 group-hover/story:translate-y-[-2px]">
        <motion.div
          ref={headingRef}
          initial={{ opacity: 0, y: 24, scale: 0.95 }}
          animate={headingInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-8"
        >
          <span className="inline-block px-5 py-2 rounded-full bg-primary/8 text-primary font-semibold tracking-[0.2em] uppercase mb-5 border border-primary/12 backdrop-blur-sm text-xs">
            Our Story
          </span>
          <h2 className="font-heading font-bold text-foreground tracking-tight leading-[1.1] text-3xl md:text-4xl lg:text-5xl xl:text-[3.5rem]">
            The{" "}
            <span className="relative inline-block">
              <span className="text-gradient-gold">Brand</span>
              <motion.span
                aria-hidden
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent"
                initial={{ x: "-120%", opacity: 0 }}
                animate={headingInView ? { x: "140%", opacity: [0, 0.7, 0] } : {}}
                transition={{ duration: 1.2, ease: "easeInOut", delay: 0.25 }}
              />
            </span>{" "}
            Story
          </h2>
        </motion.div>

        <div className="space-y-6 text-muted-foreground/80 text-base leading-relaxed relative">
          <div className="hidden xl:flex absolute -right-12 top-2 bottom-2 items-start">
            <div className="w-[2px] h-full rounded-full bg-white/10 overflow-hidden">
              <motion.div style={{ height: progressHeight }} className="w-full bg-gradient-to-b from-primary via-gold-light to-primary" />
            </div>
          </div>

          <StoryWordParagraph
            className="text-muted-foreground/85 leading-relaxed"
            segments={[
              { text: "X Elevators Pvt. Ltd.,", className: "text-foreground font-semibold" },
              { text: "founded by" },
              { text: "Mohammed Anas", className: "text-primary font-semibold" },
              { text: ", a young and visionary Founder & CEO, is the result of ambition driven by belief and purpose. From the beginning, Anas envisioned creating an organisation that would stand apart, challenge conventions, and redefine industry standards. He never allowed limitations to define his vision; instead, his mindset empowered him to dream bigger, move faster, and aim higher." },
            ]}
          />

          <StoryWordParagraph
            delay={0.08}
            className="text-muted-foreground/85 leading-relaxed"
            segments={[
              { text: "Strengthening this vision," },
              { text: "Mohammed Asif", className: "text-primary font-semibold" },
              { text: ", as Chief Operating Officer (COO), joined hands to build and scale the foundation of their shared dream. Together, their leadership adds balance, operational strength, and strategic direction in shaping their own growing empire." },
            ]}
          />

          <motion.div
            initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ scale: 1.02 }}
            className="relative rounded-2xl p-6 lg:p-8 my-2 bg-white/5 backdrop-blur-xl border border-primary/20 shadow-[0_8px_30px_hsl(213_62%_3%/0.35)] hover:border-primary/45 hover:shadow-[0_12px_38px_hsl(43_66%_52%/0.22)] transition-all duration-300 overflow-hidden"
          >
            <motion.div
              className="absolute inset-0 pointer-events-none"
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              aria-hidden
              className="absolute -inset-y-10 -left-1/3 w-1/3 bg-gradient-to-r from-transparent via-white/20 to-transparent rotate-12"
              animate={{ x: ["-10%", "360%"] }}
              transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut", repeatDelay: 2.4 }}
            />
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_70%_60%_at_20%_0%,hsl(43_66%_52%/0.12),transparent)]" />
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/55 to-transparent" />

            <StoryWordParagraph
              className="text-foreground/80 text-sm lg:text-base mb-4 relative z-10"
              segments={[
                { text: "The foundation of X Elevators lies in the powerful meaning of the letter" },
                { text: "\"X\".", className: "text-white font-heading font-extrabold text-xl tracking-tight" },
              ]}
            />

            <StoryWordParagraph
              delay={0.08}
              className="text-foreground/75 text-sm lg:text-base leading-relaxed relative z-10"
              segments={[
                { text: "X", className: "text-foreground font-semibold" },
                { text: "represents" },
                { text: "Excellence", className: "text-primary font-semibold" },
                { text: "," },
                { text: "Exceeding expectations", className: "text-primary font-semibold" },
                { text: "," },
                { text: "Exclusivity", className: "text-primary font-semibold" },
                { text: ", and the" },
                { text: "Extraordinary", className: "text-primary font-semibold" },
                { text: ". These values define who we are and how we operate — pushing boundaries, delivering superior quality, and creating solutions that rise above the ordinary." },
              ]}
            />
          </motion.div>

          <motion.div
            ref={finalLineRef}
            initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
            animate={finalLineInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
            transition={{ duration: 0.75, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="pt-2"
          >
            <StoryWordParagraph
              delay={0.18}
              className="text-center font-heading font-semibold text-foreground text-lg lg:text-xl"
              segments={[
                { text: "X Elevators is not just a company name; it is a mindset built to elevate standards and inspire progress." },
              ]}
            />
            <motion.div
              className="mx-auto mt-3 h-px bg-gradient-to-r from-transparent via-primary/70 to-transparent"
              initial={{ width: "0%", opacity: 0 }}
              animate={finalLineInView ? { width: "44%", opacity: 1 } : {}}
              transition={{ duration: 0.75, delay: 0.45, ease: "easeInOut" }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const CoreValuesExperience = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [showAutoHint, setShowAutoHint] = useState(true);
  const mobileTrackRef = useRef<HTMLDivElement | null>(null);
  const hoverPausedRef = useRef(false);
  const resumeTimeoutRef = useRef<number | null>(null);
  const autoHintTimeoutRef = useRef<number | null>(null);
  const activeValue = values[activeIndex];
  const totalItems = values.length;
  const ORBIT_RADIUS = 246;
  const TOP_ANGLE = -90;
  const nodeSize = 84;
  const orbitRotation = TOP_ANGLE - (activeIndex / totalItems) * 360;

  useEffect(() => {
    autoHintTimeoutRef.current = window.setTimeout(() => setShowAutoHint(false), 3000);
    return () => {
      if (autoHintTimeoutRef.current) window.clearTimeout(autoHintTimeoutRef.current);
    };
  }, []);

  useEffect(() => {
    const id = window.setInterval(() => {
      const paused = hoverPausedRef.current || (resumeTimeoutRef.current !== null && Date.now() < resumeTimeoutRef.current);
      if (paused) return;
      setActiveIndex((prev) => (prev + 1) % totalItems);
    }, 3000);

    return () => window.clearInterval(id);
  }, [totalItems]);

  const pauseAutoRotation = (durationMs = 5000) => {
    if (resumeTimeoutRef.current) {
      window.clearTimeout(resumeTimeoutRef.current);
    }
    resumeTimeoutRef.current = window.setTimeout(() => {
      resumeTimeoutRef.current = null;
    }, durationMs);
  };

  const normalizeAngle = (angle: number) => {
    let normalized = angle % 360;
    if (normalized > 180) normalized -= 360;
    if (normalized < -180) normalized += 360;
    return normalized;
  };

  const getDepthMetrics = (index: number) => {
    const itemAngle = (index / totalItems) * 360;
    const worldAngle = itemAngle + orbitRotation;
    const distance = Math.abs(normalizeAngle(worldAngle - TOP_ANGLE));
    const depthRatio = 1 - Math.min(distance, 180) / 180;

    if (index === activeIndex) {
      return { scale: 1.3, opacity: 1, zIndex: 20, isActive: true };
    }

    return {
      scale: 0.7 + depthRatio * 0.15,
      opacity: 0.4 + depthRatio * 0.2,
      zIndex: 10 + Math.round(depthRatio * 6),
      isActive: false,
    };
  };

  const handleSelect = (index: number) => {
    if (index === activeIndex) {
      pauseAutoRotation();
      return;
    }
    pauseAutoRotation();
    setActiveIndex(index);
  };

  const handleMobileSelect = (index: number) => {
    handleSelect(index);
    const track = mobileTrackRef.current;
    if (!track) return;

    const nextCard = track.children[index] as HTMLElement | undefined;
    if (!nextCard) return;

    const cardLeft = nextCard.offsetLeft;
    const centeredLeft = cardLeft - (track.clientWidth - nextCard.clientWidth) / 2;
    track.scrollTo({ left: Math.max(0, centeredLeft), behavior: "smooth" });
  };

  const handleMobileScroll = () => {
    const track = mobileTrackRef.current;
    if (!track) return;

    const centerX = track.scrollLeft + track.clientWidth / 2;
    let nearestIndex = activeIndex;
    let minDistance = Number.POSITIVE_INFINITY;

    Array.from(track.children).forEach((child, index) => {
      const element = child as HTMLElement;
      const itemCenter = element.offsetLeft + element.clientWidth / 2;
      const distance = Math.abs(itemCenter - centerX);

      if (distance < minDistance) {
        minDistance = distance;
        nearestIndex = index;
      }
    });

    if (nearestIndex !== activeIndex) {
      setActiveIndex(nearestIndex);
    }
  };

  return (
    <section className="pt-24 pb-10 md:pt-28 md:pb-16 relative overflow-hidden">
      <SectionDivider />

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_52%_at_50%_48%,hsl(43_66%_52%/0.08),transparent_72%)]" />
      </div>

      <div className="container mx-auto px-6 pt-8 relative z-10">
        <SectionHeading badge="Core Values" title="What Defines Us" />

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-5xl mx-auto flex flex-col items-center"
        >
          <div className="hidden md:flex items-center justify-center w-full">
            <div
              className="relative w-full h-[600px] flex items-center justify-center"
              onMouseEnter={() => {
                hoverPausedRef.current = true;
              }}
              onMouseLeave={() => {
                hoverPausedRef.current = false;
              }}
            >
              <motion.div
                className="absolute w-[300px] h-[300px] rounded-full blur-[90px] bg-[radial-gradient(circle,hsl(43_66%_52%/0.26),transparent_70%)]"
                animate={{ opacity: [0.18, 0.34, 0.18], scale: [1, 1.05, 1] }}
                transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
              />

              <motion.div
                className="absolute inset-0 z-10"
                animate={{ rotate: orbitRotation }}
                transition={{ duration: 0.75, ease: "easeInOut" }}
                style={{ willChange: "transform" }}
              >
                {values.map((value, index) => {
                  const angle = (index / totalItems) * 360;
                  const metrics = getDepthMetrics(index);

                  return (
                    <button
                      key={value.title}
                      type="button"
                      onClick={() => handleSelect(index)}
                      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                      style={{
                        transform: `translate(-50%, -50%) rotate(${angle}deg) translate(${ORBIT_RADIUS}px) rotate(${-angle}deg)`,
                        zIndex: metrics.zIndex,
                        willChange: "transform, opacity",
                      }}
                      aria-label={value.title}
                    >
                      <motion.div
                        animate={{
                          scale: metrics.scale,
                          opacity: metrics.opacity,
                        }}
                        transition={{ duration: 0.75, ease: "easeInOut" }}
                        className={`w-[84px] h-[84px] rounded-full border backdrop-blur-xl flex items-center justify-center text-primary ${metrics.isActive
                          ? "bg-primary/24 border-primary/70 shadow-[0_0_42px_hsl(43_66%_52%/0.52)]"
                          : "bg-white/10 border-white/20"
                          }`}
                      >
                        <motion.div
                          animate={metrics.isActive ? { scale: [1.3, 1.35, 1.3] } : { scale: 1 }}
                          transition={metrics.isActive ? { duration: 1.8, repeat: Infinity, ease: "easeInOut" } : { duration: 0.3 }}
                        >
                          {value.icon}
                        </motion.div>
                      </motion.div>
                    </button>
                  );
                })}
              </motion.div>

              <div className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeValue.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.35, ease: "easeInOut" }}
                    className="max-w-[420px] w-full mx-auto rounded-[1.75rem] px-6 py-5 text-center bg-white/5 backdrop-blur-xl border border-primary/25 shadow-[0_0_40px_rgba(255,215,0,0.12)]"
                  >
                    <h3 className="text-2xl font-heading font-bold text-foreground mb-3 leading-tight text-center">
                      {activeValue.title}
                    </h3>
                    <p className="text-muted-foreground text-base leading-relaxed max-w-md mx-auto text-center">
                      {activeValue.desc}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="absolute bottom-7 left-1/2 -translate-x-1/2 z-40 flex items-center gap-2 pointer-events-auto">
                {values.map((value, index) => {
                  const isActive = index === activeIndex;
                  return (
                    <button
                      key={value.title}
                      type="button"
                      aria-label={`Show ${value.title}`}
                      onClick={() => handleSelect(index)}
                      className={`h-2.5 rounded-full transition-all duration-300 ${isActive ? "w-8 bg-primary shadow-[0_0_12px_hsl(43_66%_52%/0.45)]" : "w-2.5 bg-white/25 hover:bg-white/45"}`}
                    />
                  );
                })}
              </div>

              <AnimatePresence>
                {showAutoHint && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.35, ease: "easeInOut" }}
                    className="absolute top-8 left-1/2 -translate-x-1/2 z-40 px-3 py-1.5 rounded-full bg-white/6 border border-white/10 text-[11px] tracking-[0.18em] uppercase text-primary/90 backdrop-blur-md"
                  >
                    Auto-playing highlights
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="md:hidden w-full max-w-md mx-auto space-y-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={`mobile-active-${activeValue.title}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="rounded-[1.5rem] p-6 text-center bg-white/5 backdrop-blur-xl border border-primary/25 shadow-[0_10px_28px_hsl(213_62%_3%/0.28)]"
              >
                <div className="w-12 h-12 rounded-full bg-primary/20 border border-primary/50 flex items-center justify-center text-primary mx-auto mb-3">
                  {activeValue.icon}
                </div>
                <h3 className="text-xl font-heading font-bold text-foreground mb-2">{activeValue.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{activeValue.desc}</p>
              </motion.div>
            </AnimatePresence>

            <div
              ref={mobileTrackRef}
              onScroll={handleMobileScroll}
              className="flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
            >
              {values.map((value, index) => {
                const isActive = index === activeIndex;

                return (
                  <button
                    key={value.title}
                    type="button"
                    onClick={() => handleMobileSelect(index)}
                    className={`snap-center shrink-0 w-[78%] min-w-[78%] rounded-2xl border p-4 text-left transition-all duration-300 ${isActive
                      ? "bg-primary/14 border-primary/50 shadow-[0_0_18px_hsl(43_66%_52%/0.24)]"
                      : "bg-white/5 border-white/15"
                      }`}
                    aria-label={value.title}
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-10 h-10 rounded-full bg-primary/15 border border-primary/40 flex items-center justify-center text-primary">
                        {value.icon}
                      </span>
                      <span className="text-foreground font-medium text-sm leading-tight">{value.title}</span>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="flex items-center justify-center gap-2 pt-1">
              {values.map((value, index) => {
                const isActive = index === activeIndex;
                return (
                  <button
                    key={value.title}
                    type="button"
                    aria-label={`Show ${value.title}`}
                    onClick={() => handleMobileSelect(index)}
                    className={`h-2 rounded-full transition-all duration-300 ${isActive ? "w-7 bg-primary shadow-[0_0_10px_hsl(43_66%_52%/0.35)]" : "w-2 bg-white/25"}`}
                  />
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const About = () => (
  <>
    <PageHero
      badge="Engineering Trust. Elevating India."
      title={<>Engineering the <span className="gold-text">Vertical Future</span> of <span className="gold-text">India</span></>}
      subtitle={<>X Elevators pairs meticulous mechanical design with <span className="gold-text">data-led controls</span>, <span className="gold-text">safety protocols</span>, and refined cabin experiences tailored for the nation's skyline. Every deployment is governed by measurable quality checkpoints and lifecycle discipline, aligning Indian projects with <span className="gold-text">global engineering benchmarks</span> so your vertical infrastructure earns trust for decades.</>}
      backgroundImage="/images/hero-about.webp"
    />

    <TrustBadges />

    <section className="py-10 md:py-16">
      <SectionDivider />
      <div className="container mx-auto px-6 pt-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6 max-w-6xl mx-auto">
          {aboutStats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.55, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -4, transition: { duration: 0.25, ease: "easeOut" } }}
              className="group relative rounded-2xl p-5 md:p-6 h-full min-h-[220px] flex flex-col backdrop-blur-xl"
              style={{
                background: "linear-gradient(160deg, hsl(212 50% 15% / 0.58) 0%, hsl(212 48% 10% / 0.42) 100%)",
                border: "1px solid hsl(43 66% 52% / 0.12)",
                boxShadow: "inset 0 1px 0 hsl(0 0% 100% / 0.05), 0 10px 34px hsl(213 62% 3% / 0.28)",
              }}
            >
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/45 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-400" style={{ boxShadow: "0 0 0 1px hsl(43 66% 52% / 0.2), 0 0 36px hsl(43 66% 52% / 0.12)" }} />

              <span className="w-11 h-11 rounded-xl bg-primary/12 border border-primary/30 text-primary flex items-center justify-center mb-4">
                {stat.icon}
              </span>

              <h3 className="text-3xl md:text-4xl font-heading font-extrabold text-primary leading-none mb-3">{stat.value}</h3>
              <p className="text-foreground text-sm md:text-[15px] font-semibold leading-relaxed mb-2">{stat.label}</p>
              <p className="text-muted-foreground/70 text-xs md:text-sm leading-relaxed mt-auto">{stat.sub}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    <BrandStorySection />


    <CTABanner variant="inspection" />

    <CoreValuesExperience />

    <section className="py-10 md:py-16 section-glow relative overflow-hidden">
      <SectionDivider />
      {/* Ambient section glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_60%,hsl(43_66%_52%/0.04),transparent_70%)] pointer-events-none" />
      <div className="container mx-auto px-6 pt-8 relative z-10">
        <SectionHeading badge="Leadership" title="Our Team" subtitle="Led by experienced professionals committed to elevating your experience" />
        <div className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto mb-10">
          <motion.div
            initial={{ opacity: 0, y: 45 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0, ease: [0.22, 1, 0.36, 1] }}
            className="glass-card rounded-3xl overflow-hidden gold-border relative group"
          >
            <div className="relative aspect-square overflow-hidden rounded-t-3xl">
              <div 
                className="absolute inset-0 bg-cover bg-center opacity-10 transition-transform duration-700 group-hover:scale-105" 
                style={{ backgroundImage: 'url("https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/694bacc0fac3a42b4b20469a/ade196248_image.png")' }}
              />
              <img 
                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/694bacc0fac3a42b4b20469a/a779dd4a6_WhatsAppImage2025-12-30at105802AM.jpeg" 
                alt="Mohammed Anas" 
                className="relative z-10 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-20 pointer-events-none" />
            </div>
            <div className="p-8 text-center bg-black/40 backdrop-blur-sm relative z-30">
              <h3 className="text-2xl font-bold text-white mb-2 font-heading tracking-tight drop-shadow-md">Mohammed Anas</h3>
              <p className="text-[#C9A961] font-medium mb-3 tracking-wide uppercase text-sm">Founder &amp; CEO</p>
              <div className="w-10 h-px bg-gradient-to-r from-transparent via-[#C9A961]/50 to-transparent mx-auto mb-4" />
              <p className="text-gray-400 text-sm leading-relaxed max-w-sm mx-auto">Execution-focused leader driving engineering excellence and long-term growth.</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 45 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="glass-card rounded-3xl overflow-hidden gold-border relative group"
          >
            <div className="relative aspect-square overflow-hidden rounded-t-3xl">
              <div 
                className="absolute inset-0 bg-cover bg-center opacity-10 transition-transform duration-700 group-hover:scale-105" 
                style={{ backgroundImage: 'url("https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/694bacc0fac3a42b4b20469a/ade196248_image.png")' }}
              />
              <img 
                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/694bacc0fac3a42b4b20469a/21f81a457_Gemini_Generated_Image_kdfiedkdfiedkdfi.png" 
                alt="Mohammed Asif" 
                className="relative z-10 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-20 pointer-events-none" />
            </div>
            <div className="p-8 text-center bg-black/40 backdrop-blur-sm relative z-30">
              <h3 className="text-2xl font-bold text-white mb-2 font-heading tracking-tight drop-shadow-md">Mohammed Asif</h3>
              <p className="text-[#C9A961] font-medium mb-3 tracking-wide uppercase text-sm">Director of Board</p>
              <div className="w-10 h-px bg-gradient-to-r from-transparent via-[#C9A961]/50 to-transparent mx-auto mb-4" />
              <p className="text-gray-400 text-sm leading-relaxed max-w-sm mx-auto">Operational specialist ensuring quality delivery, safety compliance, and service reliability.</p>
            </div>
          </motion.div>
        </div>

        {/* Team size badge */}
        <div className="max-w-md mx-auto mt-6 md:mt-8">
          <GlassCard className="flex flex-col items-center justify-center text-center p-6 rounded-xl border border-white/10" premium>
            <p className="text-gradient-gold text-3xl font-heading font-bold text-shadow-glow">25+</p>
            <p className="text-white font-medium text-sm mt-1">Peoples</p>
          </GlassCard>
        </div>
      </div>
    </section>

    <section className="py-10 md:py-16 relative">
      <SectionDivider />
      <div className="container mx-auto px-6 max-w-5xl pt-8">
        <SectionHeading badge="Quality" title="Certifications & Compliance" />
        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          <div>
            <h3 className="text-foreground font-heading font-semibold mb-4 text-lg">Certifications & Standards</h3>
            <div className="space-y-3">
              {certifications.map((cert, i) => (
                <GlassCard key={cert} className="p-4 flex items-center gap-3" premium delay={i * 0.06}>
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                  <span className="text-foreground text-sm font-medium">{cert}</span>
                </GlassCard>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-foreground font-heading font-semibold mb-4 text-lg">Registration Details</h3>
            <div className="space-y-3">
              {registrations.map((reg, i) => (
                <GlassCard key={reg} className="p-4 flex items-center gap-3" premium delay={i * 0.06}>
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                  <span className="text-foreground text-sm font-medium">{reg}</span>
                </GlassCard>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* COMBINED CTA PANEL */}
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,hsl(43_66%_52%/0.03),transparent_70%)] pointer-events-none" />
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal>
            <div className="w-full rounded-2xl bg-gradient-to-b from-white/10 to-white/5 border border-white/10 backdrop-blur-lg overflow-hidden group hover:border-[#D4AF37]/40 transition-colors duration-500 hover:shadow-[0_0_40px_-10px_rgba(212,175,55,0.15)]">
              
              {/* Top Section - Brochure */}
              <div className="p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex flex-col text-center md:text-left">
                  <h3 className="text-xl md:text-2xl font-semibold text-foreground mb-2">Company Brochure</h3>
                  <p className="text-muted-foreground text-sm font-light max-w-md">
                    Download our comprehensive company brochure to explore our premium elevator solutions, technical specifications, and architectural integrations.
                  </p>
                </div>
                <button className="shrink-0 px-6 py-3 rounded-lg bg-white/10 text-white border border-white/20 font-medium text-sm transition-all duration-300 hover:bg-white/20 hover:border-white/40 flex items-center gap-2 group/btn">
                  <svg className="w-4 h-4 transition-transform group-hover/btn:-translate-y-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                  Download Brochure
                </button>
              </div>

              {/* Divider */}
              <div className="w-full h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />

              {/* Bottom Section - Get Quote */}
              <div className="p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 bg-black/20">
                <div className="flex flex-col text-center md:text-left">
                  <h3 className="text-xl md:text-2xl font-semibold text-foreground mb-2">Get Your Elevator Quote Now</h3>
                  <p className="text-muted-foreground text-sm font-light max-w-md">
                    Tell us about your project and receive a customized quote within 24 hours. No commitment required.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0">
                  <Link to="/contact" className="px-8 py-3.5 rounded-lg bg-gradient-to-r from-[#D4AF37] to-[#F5D061] text-zinc-900 font-semibold text-sm transition-all duration-300 hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] hover:scale-[1.02] flex items-center gap-2">
                    Request Free Quote
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                  </Link>
                  <a href="https://wa.me/971501234567" target="_blank" rel="noopener noreferrer" className="px-8 py-3.5 rounded-lg bg-[#25D366]/10 text-[#25D366] border border-[#25D366]/20 font-medium text-sm transition-all duration-300 hover:bg-[#25D366]/20 hover:border-[#25D366]/40 flex items-center gap-2">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.305-.885-.653-1.48-1.459-1.653-1.756-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.397-.272.322-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                    Chat on WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  </>
);

export default About;
