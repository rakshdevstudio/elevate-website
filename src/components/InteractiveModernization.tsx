import { useState, useEffect } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { Cpu, DoorOpen, Box, ShieldCheck, BatteryCharging, Wifi } from "lucide-react";
import { SectionHeading } from "@/components/ui/shared";

const MODERNIZATION_FEATURES = [
  { id: "controller", label: "Controller Upgrade", icon: Cpu, angle: -90, desc: "Modern microprocessors for faster, smoother rides." },
  { id: "door", label: "Door Modernization", icon: DoorOpen, angle: -30, desc: "Advanced sensors and operators for safe closing." },
  { id: "cabin", label: "Cabin Renovation", icon: Box, angle: 30, desc: "Premium interior finishes and custom lighting." },
  { id: "safety", label: "Safety Enhancement", icon: ShieldCheck, angle: 90, desc: "Latest compliance and emergency protocols." },
  { id: "energy", label: "Energy Optimization", icon: BatteryCharging, angle: 150, desc: "Regenerative drives saving up to 40% power." },
  { id: "iot", label: "IoT Integration", icon: Wifi, angle: 210, desc: "Smart predictive maintenance and monitoring." },
];

export const InteractiveModernization = () => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Auto-cycle through features every 2 seconds, pause on hover
  useEffect(() => {
    if (hoveredId !== null) return; // Pause auto-cycle on hover
    
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % MODERNIZATION_FEATURES.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [hoveredId]);

  const containerVariants: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15, delayChildren: 0.8 } }
  };

  const featureVariants: Variants = {
    hidden: { opacity: 0, scale: 0, x: 0, y: 0 },
    visible: (custom: { angle: number, radius: number }) => {
      const rad = custom.angle * (Math.PI / 180);
      return {
        opacity: 1,
        scale: 1,
        x: Math.cos(rad) * custom.radius,
        y: Math.sin(rad) * custom.radius,
        transition: { type: "spring", stiffness: 60, damping: 10 }
      };
    }
  };

  return (
    <section className="py-24 md:py-32 relative overflow-hidden flex flex-col items-center justify-center min-h-[80vh] bg-transparent">
      {/* Background Energy Effects */}
      <motion.div 
        className="absolute w-[800px] h-[800px] rounded-full blur-[150px] pointer-events-none opacity-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 mix-blend-screen"
        animate={{
          background: ["radial-gradient(circle, #D4AF37 0%, transparent 60%)", "radial-gradient(circle, #E1C16E 0%, transparent 70%)", "radial-gradient(circle, #D4AF37 0%, transparent 60%)"],
          rotate: [0, 45, 0],
          scale: [1, 1.1, 1]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      
      <div className="container mx-auto px-6 relative z-10">
        
        {/* Section Heading */}
        <div className="mb-16">
          <SectionHeading badge="More Services" title="Additional Services" />
        </div>
        
        {/* Layout: Text on Left, Orbit on Right (Desktop) / Stacked (Mobile) */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-20 lg:gap-10">
          
          {/* Left: Text Content */}
          <div className="lg:w-1/3 text-center lg:text-left z-20">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="inline-block px-4 py-1.5 rounded-full bg-[#D4AF37]/10 text-[#D4AF37] text-xs font-bold tracking-widest uppercase mb-6 border border-[#D4AF37]/20 shadow-[0_0_15px_rgba(212,175,55,0.2)]">
                System Activation
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-extrabold text-white mb-6 leading-tight tracking-tight">
                Modernization <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#F5D061]">Unleashed</span>
              </h2>
              <motion.p 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-white/60 text-lg font-light leading-relaxed max-w-lg mx-auto lg:mx-0"
              >
                Upgrade your outdated elevators with modern microprocessors, energy-efficient drives, and contemporary designs. Not an update. An evolution.
              </motion.p>
            </motion.div>
          </div>

          {/* Right: Interactive Orbit System (Desktop) + Vertical Stepper (Mobile) */}
          <div className="lg:w-2/3 flex items-center justify-center relative w-full aspect-square max-w-[500px] lg:max-w-none lg:h-[600px] mt-10 lg:mt-0">

            {/* Orbiting Features (Hidden on mobile, visible on md+) */}
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="hidden md:block absolute top-1/2 left-1/2"
            >
              {MODERNIZATION_FEATURES.map((feature, index) => {
                // If hovering, use hoveredId; otherwise use activeIndex for auto-cycling
                const isActive = hoveredId ? hoveredId === feature.id : index === activeIndex;
                const hasHover = hoveredId !== null;
                const isOtherItemHovered = hasHover && hoveredId !== feature.id;

                return (
                  <motion.div
                    key={feature.id}
                    custom={{ angle: feature.angle, radius: 220 }}
                    variants={featureVariants}
                    onMouseEnter={() => setHoveredId(feature.id)}
                    onMouseLeave={() => setHoveredId(null)}
                    animate={
                      isActive
                        ? { scale: 1.1, zIndex: 30, opacity: 1, filter: "blur(0px) brightness(1.2)" }
                        : isOtherItemHovered
                          ? { scale: 0.95, opacity: 0.4, filter: "blur(2px) brightness(0.8)" }
                          : { scale: 0.95, opacity: 0.4, filter: "blur(2px) brightness(0.9)" }
                    }
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="absolute -ml-16 -mt-16 w-32 h-32 flex flex-col items-center justify-center gap-3 cursor-pointer group"
                    style={{ perspective: 1000 }}
                  >
                    <div className={`relative w-16 h-16 rounded-2xl backdrop-blur-md flex items-center justify-center transition-all duration-500 ease-in-out shadow-xl ${
                      isActive
                        ? "bg-[#D4AF37]/15 border border-[#D4AF37]/60 text-[#D4AF37] shadow-[0_0_30px_rgba(212,175,55,0.4)]"
                        : "bg-white/5 border border-white/10 text-white/70 group-hover:text-[#D4AF37] group-hover:bg-[#D4AF37]/10 group-hover:border-[#D4AF37]/50"
                    }`}>
                      <feature.icon className="w-7 h-7" strokeWidth={1.5} />
                      {/* Glow effect for active item */}
                      <div className={`absolute inset-0 bg-[#D4AF37] blur-[20px] rounded-2xl transition-opacity duration-500 ${
                        isActive ? "opacity-40" : "opacity-0 group-hover:opacity-30"
                      }`} />
                    </div>
                    
                    <div className="flex flex-col items-center w-max">
                      <span className={`text-sm font-semibold tracking-wide transition-all duration-500 text-center whitespace-nowrap ${
                        isActive ? "text-[#D4AF37]" : "text-white group-hover:text-[#D4AF37]"
                      }`}>
                        {feature.label}
                      </span>
                      
                      {/* Tooltip description (Absolute positioned to avoid layout shifts) */}
                      <div className={`absolute top-full mt-2 w-48 text-center text-xs text-white/60 font-light leading-relaxed transition-all duration-500 pointer-events-none ${(isActive || hoveredId === feature.id) ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'}`}>
                        {feature.desc}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* Mobile Vertical Stepper (Visible only on < md) */}
            <div className="md:hidden mt-32 w-full flex flex-col gap-4 relative z-30">
              {MODERNIZATION_FEATURES.map((feature, idx) => {
                const isActive = idx === activeIndex;
                
                return (
                  <motion.div
                    key={feature.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.15 + 0.5, duration: 0.5 }}
                    animate={
                      isActive
                        ? { scale: 1.02, opacity: 1 }
                        : { scale: 0.95, opacity: 0.4 }
                    }
                    className={`flex items-center gap-4 rounded-2xl p-4 backdrop-blur-md transition-all duration-500 ease-in-out cursor-pointer ${
                      isActive
                        ? "bg-[#D4AF37]/15 border border-[#D4AF37]/60 shadow-[0_0_20px_rgba(212,175,55,0.3)]"
                        : "bg-white/5 border border-white/10"
                    }`}
                    onMouseEnter={() => setHoveredId(feature.id)}
                    onMouseLeave={() => setHoveredId(null)}
                  >
                    <div className={`w-12 h-12 rounded-xl border flex items-center justify-center shrink-0 transition-all duration-500 ${
                      isActive
                        ? "bg-[#D4AF37]/20 border-[#D4AF37]/60 text-[#D4AF37]"
                        : "bg-[#D4AF37]/10 border-[#D4AF37]/30 text-[#D4AF37]"
                    }`}>
                      <feature.icon className="w-6 h-6" strokeWidth={1.5} />
                    </div>
                    <div>
                      <h4 className={`font-semibold text-sm transition-colors duration-500 ${
                        isActive ? "text-[#D4AF37]" : "text-white"
                      }`}>{feature.label}</h4>
                      <p className="text-white/50 text-xs mt-0.5 font-light">{feature.desc}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
