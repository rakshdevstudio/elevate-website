import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, useMotionValue, useMotionTemplate } from "framer-motion";
import { ArrowRight, MessageCircle, Phone, Shield, Award, CheckCircle2, Zap } from "lucide-react";
import { GlassCard, ScrollReveal } from "@/components/ui/shared";
import StarBorder from "@/components/StarBorder";
import { submitLead, SUCCESS_MESSAGE } from "@/lib/submitLead";
import { toast } from "@/hooks/use-toast";

interface CTABannerProps {
  variant?: "quote" | "inspection" | "whatsapp" | "engineer";
}

export const CTABanner = ({ variant = "quote" }: CTABannerProps) => {
  const configs = {
    quote: {
      title: "Get Your Elevator Quote Now",
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

  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [isHovered, setIsHovered] = useState(false);

  // For random floating particles
  const [particles, setParticles] = useState<Array<{id: number; x: number; y: number; size: number; delay: number; duration: number}>>([]);

  useEffect(() => {
    setParticles(
      Array.from({ length: 20 }).map((_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        delay: Math.random() * 5,
        duration: Math.random() * 10 + 10,
      }))
    );
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const { left, top } = containerRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - left);
    mouseY.set(e.clientY - top);
  };

  const bgBorder = useMotionTemplate`radial-gradient(500px circle at ${mouseX}px ${mouseY}px, rgba(212, 175, 55, 0.4), transparent 60%)`;
  const bgInner = useMotionTemplate`radial-gradient(600px circle at ${mouseX}px ${mouseY}px, rgba(212, 175, 55, 0.08), transparent 70%)`;

  return (
    <section className="py-24 lg:py-32 relative overflow-hidden flex justify-center items-center">
      {/* Slow Moving Background Light Effect */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
         <motion.div 
           animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.2, 1] }} 
           transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
           className="w-[800px] h-[800px] bg-primary/10 rounded-full blur-[140px] mix-blend-screen"
         />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10 perspective-1000">
        <ScrollReveal>
          <motion.div 
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            whileHover={{ scale: 1.015 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="relative overflow-hidden rounded-[32px] p-[1px] max-w-5xl mx-auto group cursor-default shadow-2xl"
          >
            {/* Animated Gradient Border Layer */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-white/5 to-primary/20 opacity-50 group-hover:opacity-100 transition-opacity duration-700" />
            
            {/* Spotlight Border (Mouse Tracking) */}
            <motion.div
               className="pointer-events-none absolute -inset-px rounded-[32px] opacity-0 transition-opacity duration-300 group-hover:opacity-100 mix-blend-screen"
               style={{ background: bgBorder }}
            />

            <div className="relative bg-card/60 backdrop-blur-[24px] rounded-[31px] px-6 py-16 lg:p-24 overflow-hidden flex flex-col items-center text-center shadow-[inset_0_2px_20px_rgba(255,255,255,0.02)] z-10">
              
              {/* Inner Glow Spotlight (Mouse Tracking) */}
              <motion.div
                 className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                 style={{ background: bgInner }}
              />

              {/* Edge Lighting Highlight (Top edge) */}
              <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent blur-sm" />
              <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

              {/* Floating Particles inside CTA */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                 {particles.map((p) => (
                   <motion.div
                     key={p.id}
                     animate={{ 
                       y: ["0%", "-100%"], 
                       x: [0, Math.random() * 20 - 10],
                       opacity: [0, 0.6, 0] 
                     }}
                     transition={{
                       duration: p.duration,
                       delay: p.delay,
                       repeat: Infinity,
                       ease: "linear"
                     }}
                     className="absolute rounded-full bg-primary/40 blur-[1px]"
                     style={{
                       left: `${p.x}%`,
                       top: `${p.y}%`,
                       width: p.size,
                       height: p.size
                     }}
                   />
                 ))}
              </div>

              <div className="relative z-20 w-full max-w-3xl">
                {/* Text Animations */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                >
                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-extrabold text-white mb-6 tracking-tight group-hover:tracking-normal transition-all duration-700 [text-shadow:0_0_40px_rgba(255,255,255,0.1)]">
                    {config.title}
                  </h2>
                </motion.div>
                
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
                  className="text-gray-400 text-lg lg:text-xl mx-auto mb-10 leading-relaxed font-light"
                >
                  {config.subtitle}
                </motion.p>
                
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
                  className="flex flex-col sm:flex-row gap-5 justify-center mt-8 items-center"
                >
                  {/* Primary Button */}
                  {isExternal ? (
                     <a href={config.primaryLink} target="_blank" rel="noopener noreferrer" className="relative group/btn inline-flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-gold-light text-primary-foreground px-8 py-4 rounded-full font-bold text-base transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(212,175,55,0.4)] overflow-hidden min-w-[200px]">
                        <span className="absolute inset-0 bg-white/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300 ease-out" />
                        <span className="relative z-10 flex items-center gap-2">
                          {config.primaryLabel} <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1.5 transition-transform duration-300" />
                        </span>
                     </a>
                  ) : (
                     <Link to={config.primaryLink} className="relative group/btn inline-flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-gold-light text-primary-foreground px-8 py-4 rounded-full font-bold text-base transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(212,175,55,0.4)] overflow-hidden min-w-[200px]">
                        <span className="absolute inset-0 bg-white/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300 ease-out" />
                        <span className="relative z-10 flex items-center gap-2">
                          {config.primaryLabel} <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1.5 transition-transform duration-300" />
                        </span>
                     </Link>
                  )}

                  {/* Secondary Button */}
                  {isSecondaryExternal ? (
                     <a href={config.secondaryLink} target="_blank" rel="noopener noreferrer" className="relative group/btn2 inline-flex items-center justify-center gap-2 border border-white/20 bg-background/50 backdrop-blur-md text-white px-8 py-4 rounded-full font-semibold text-base transition-all duration-300 hover:bg-white/10 hover:border-primary/50 hover:shadow-[0_0_20px_rgba(212,175,55,0.15)] min-w-[200px]">
                        <span className="relative z-10">{config.secondaryLabel}</span>
                     </a>
                  ) : (
                     <Link to={config.secondaryLink} className="relative group/btn2 inline-flex items-center justify-center gap-2 border border-white/20 bg-background/50 backdrop-blur-md text-white px-8 py-4 rounded-full font-semibold text-base transition-all duration-300 hover:bg-white/10 hover:border-primary/50 hover:shadow-[0_0_20px_rgba(212,175,55,0.15)] min-w-[200px]">
                        <span className="relative z-10">{config.secondaryLabel}</span>
                     </Link>
                  )}
                </motion.div>
              </div>
            </div>
          </motion.div>
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
          >
            <StarBorder
              thickness={1}
              speed={7 + i * 0.6}
              className="rounded-full"
              innerClassName="rounded-full"
            >
              <div className="flex items-center gap-2.5 px-5 py-2.5 rounded-full border border-white/20 bg-white/10 backdrop-blur-md">
                <span className="text-primary">{badge.icon}</span>
                <span className="text-white text-sm font-medium whitespace-nowrap">{badge.label}</span>
              </div>
            </StarBorder>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export const InlineQuoteForm = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [elevatorType, setElevatorType] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      toast({ title: "Please fill required fields", description: "Name and phone are required.", variant: "destructive" });
      return;
    }
    setSubmitting(true);
    try {
      const { success, error } = await submitLead({
        name,
        phone,
        elevator_type: elevatorType || null,
        lead_source: "website_form",
      });
      if (!success) {
        toast({ title: "Submission failed", description: error, variant: "destructive" });
      } else {
        toast({ title: "✅ Thank You!", description: SUCCESS_MESSAGE });
        setName(""); setPhone(""); setElevatorType("");
      }
    } catch {
      toast({ title: "Unexpected error", description: "Please try again later.", variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="py-20 lg:py-28 relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_50%_50%,hsl(43_66%_52%/0.04),transparent)]" />
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          <ScrollReveal>
            <GlassCard className="p-8 lg:p-10 relative overflow-hidden" hover={false} premium>
              <div className="absolute inset-0 bg-gradient-to-br from-primary/4 via-transparent to-primary/2 pointer-events-none" />
              <h3 className="text-xl lg:text-2xl font-heading font-bold text-foreground mb-2 relative z-10">Quick Quote Request</h3>
              <p className="text-muted-foreground text-sm mb-6 opacity-70 relative z-10">Get a callback within 2 hours</p>
              <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your Name *" className="input-premium" required />
                  <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone Number *" className="input-premium" required />
                </div>
                <select value={elevatorType} onChange={(e) => setElevatorType(e.target.value)} className="w-full input-premium text-muted-foreground/60">
                  <option value="">Select Elevator Type</option>
                  <option value="Residential">Residential</option>
                  <option value="Commercial">Commercial</option>
                  <option value="Hospital">Hospital</option>
                  <option value="Capsule">Capsule</option>
                </select>
                <button type="submit" disabled={submitting} className="w-full bg-gradient-to-r from-primary to-gold-light text-primary-foreground py-3.5 rounded-xl font-semibold text-sm transition-all duration-300 hover:shadow-[0_0_30px_hsl(43_66%_52%/0.35)] hover:scale-[1.02] active:scale-100 btn-glow disabled:opacity-50 disabled:cursor-not-allowed">
                  {submitting ? "Submitting..." : "Get Free Quote →"}
                </button>
              </form>
            </GlassCard>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};
