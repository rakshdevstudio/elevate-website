import { Link } from "react-router-dom";
import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { PageHero, SectionHeading, GlassCard, StatCard, SectionDivider, ScrollReveal } from "@/components/ui/shared";
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

const About = () => (
  <>
    <PageHero title="About X Elevators Pvt Ltd" subtitle="We are a next-generation elevator company focused on delivering safe, smart, and stylish vertical transportation solutions across India. Founded with a vision to redefine the elevator industry through quality engineering, digital transparency, and customer-first approach." backgroundImage="/images/hero-about.webp" />

    <TrustBadges />

    <section className="py-10 md:py-16">
      <SectionDivider />
      <div className="container mx-auto px-6 pt-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          <StatCard value="75+" label="Projects Installed" icon={<Building2 className="w-7 h-7" />} />
          <StatCard value="120+" label="Happy Customers" icon={<Users className="w-7 h-7" />} />
          <StatCard value="99%" label="Uptime Rate" icon={<Target className="w-7 h-7" />} />
          <StatCard value="25+" label="Team Members" icon={<Award className="w-7 h-7" />} />
        </div>
      </div>
    </section>

    <BrandStorySection />


    <CTABanner variant="inspection" />

    <section className="py-10 md:py-16 relative">
      <SectionDivider />
      <div className="container mx-auto px-6 pt-8">
        <SectionHeading badge="Core Values" title="What Defines Us" />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {values.map((v, i) => (
            <GlassCard key={i} className="p-6 text-center" premium delay={i * 0.08}>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center text-primary mx-auto mb-4 icon-glow">{v.icon}</div>
              <h3 className="text-lg font-heading font-semibold text-foreground mb-2">{v.title}</h3>
              <p className="text-muted-foreground text-sm">{v.desc}</p>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>

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
              <p className="text-[#C9A961] font-medium mb-3 tracking-wide uppercase text-sm">COO (Chief Operation Officer)</p>
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

    <BrochureDownload />
    <CTABanner variant="quote" />
  </>
);

export default About;
