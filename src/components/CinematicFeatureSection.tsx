import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Award, Clock, UserCog, FileText, ShieldCheck, ArrowRight } from "lucide-react";

export const WHY_CHOOSE_FEATURES = [
  { id: 1, title: "ISO Certified", desc: "Quality assured with international standards", icon: Award },
  { id: 2, title: "<60 Min Response", desc: "Emergency response within 60 minutes", icon: Clock },
  { id: 3, title: "Certified Technicians", desc: "Factory-trained and certified professionals", icon: UserCog },
  { id: 4, title: "Digital Reports", desc: "Real-time service tracking via WhatsApp", icon: FileText },
  { id: 5, title: "Preventive Care", desc: "Automated reminders and scheduled maintenance", icon: ShieldCheck }
];

export const CinematicFeatureSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % WHY_CHOOSE_FEATURES.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isHovered]);

  const activeFeature = WHY_CHOOSE_FEATURES[activeIndex];
  const Icon = activeFeature.icon;

  return (
    <section className="py-32 relative bg-transparent overflow-hidden flex flex-col items-center min-h-[90vh] justify-center">
      {/* Background Gradient Shift based on active feature */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.02)_0%,transparent_70%)] pointer-events-none" />
      <motion.div 
        className="absolute top-1/2 left-1/2 w-[800px] h-[800px] rounded-full blur-[120px] pointer-events-none opacity-20 -translate-x-1/2 -translate-y-1/2 mix-blend-screen"
        animate={{
          background: "radial-gradient(circle, rgba(212,175,55,0.15) 0%, transparent 60%)",
          scale: [1, 1.05, 1],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="absolute inset-0 z-0 mix-blend-overlay opacity-[0.03] pointer-events-none" style={{ backgroundImage: "url('/noise.svg')" }} />

      <div className="container mx-auto px-6 relative z-10 flex flex-col items-center">
        
        {/* Title */}
        <div className="text-center mb-20 md:mb-28">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-heading font-bold text-white tracking-tight leading-[1.1] text-4xl md:text-5xl lg:text-7xl mb-6"
          >
            Why Choose X Elevators?
          </motion.h2>
          <motion.div 
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="w-24 h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent rounded-full mx-auto opacity-70"
          />
        </div>

        {/* Focus System - Main Display */}
        <div 
          className="relative w-full max-w-3xl h-[280px] md:h-[320px] flex items-center justify-center mb-20"
          onMouseEnter={() => { setIsHovered(true); setHasInteracted(true); }}
          onMouseLeave={() => setIsHovered(false)}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 30, scale: 0.95, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -30, scale: 1.05, filter: "blur(10px)" }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 flex flex-col items-center justify-center text-center"
            >
              {/* Glowing Icon */}
              <div className="relative mb-8 md:mb-12">
                {/* Aura */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1.5 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="absolute inset-0 bg-[#D4AF37] blur-[40px] opacity-20 rounded-full"
                />
                <motion.div 
                  initial={{ rotate: -10, scale: 0.8 }}
                  animate={{ rotate: 0, scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 20 }}
                  className="relative w-20 h-20 md:w-28 md:h-28 rounded-3xl bg-black/40 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] shadow-[0_0_50px_rgba(212,175,55,0.15)] backdrop-blur-2xl"
                >
                  <Icon className="w-10 h-10 md:w-14 md:h-14" />
                </motion.div>
              </div>

              {/* Text */}
              <h3 className="text-3xl md:text-5xl font-heading font-semibold text-white mb-4 tracking-tight drop-shadow-md">
                {activeFeature.title}
              </h3>
              <p className="text-lg md:text-xl text-white/50 font-light max-w-2xl leading-relaxed">
                {activeFeature.desc}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Feature Strip (Inactive ones) */}
        <div className="flex flex-wrap justify-center items-end gap-6 md:gap-12 max-w-5xl w-full px-4 h-28">
          {WHY_CHOOSE_FEATURES.map((feature, idx) => {
            const isActive = idx === activeIndex;
            const FeatIcon = feature.icon;
            
            return (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 + 0.3, duration: 0.5 }}
                onClick={() => { setActiveIndex(idx); setHasInteracted(true); }}
                onMouseEnter={() => { setActiveIndex(idx); setIsHovered(true); setHasInteracted(true); }}
                onMouseLeave={() => setIsHovered(false)}
                className={`relative group cursor-pointer flex flex-col items-center transition-all duration-700 ease-out origin-bottom ${
                  isActive ? "scale-110 opacity-100" : "scale-90 opacity-30 hover:opacity-60 saturate-0 blur-[2px] hover:blur-none hover:saturate-50"
                }`}
              >
                <div className={`w-12 h-12 md:w-16 md:h-16 rounded-2xl flex items-center justify-center transition-all duration-700 ${
                  isActive ? "bg-gradient-to-b from-[#D4AF37]/20 to-transparent text-[#D4AF37] border border-[#D4AF37]/40 shadow-[0_10px_30px_rgba(212,175,55,0.2)]" : "bg-white/5 text-white/50 border border-white/5"
                }`}>
                  <FeatIcon className={`w-5 h-5 md:w-7 md:h-7 transition-all duration-700 ${isActive ? "scale-110 drop-shadow-[0_0_10px_rgba(212,175,55,0.5)]" : ""}`} />
                </div>
                <span className={`mt-4 text-[10px] md:text-xs font-semibold tracking-[0.2em] uppercase transition-colors duration-700 ${
                  isActive ? "text-[#D4AF37]" : "text-white/30"
                }`}>
                  {feature.title.includes(" ") ? feature.title.split(' ')[0] : feature.title}
                </span>
                
                {/* Connecting Line (visual only) */}
                {isActive && (
                  <motion.div 
                    layoutId="activeFeatureIndicator"
                    className="absolute -bottom-6 w-8 h-[2px] bg-[#D4AF37] shadow-[0_0_10px_rgba(212,175,55,0.8)] rounded-full"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </motion.div>
            );
          })}
        </div>
        
        {/* Floating CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: hasInteracted ? 1 : 0, y: hasInteracted ? 0 : 40 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className={`mt-24 ${hasInteracted ? 'pointer-events-auto' : 'pointer-events-none'}`}
        >
          <Link to="/contact" className="group relative px-10 py-5 bg-transparent rounded-full font-medium text-white flex items-center gap-3 overflow-hidden backdrop-blur-xl transition-all duration-500 hover:scale-105 border border-white/10 hover:border-[#D4AF37]/50 shadow-[0_0_40px_rgba(212,175,55,0)] hover:shadow-[0_0_40px_rgba(212,175,55,0.2)]">
            {/* Hover Glow Background */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#D4AF37]/0 via-[#D4AF37]/10 to-[#D4AF37]/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out" />
            
            <span className="relative z-10 font-heading tracking-wide uppercase text-sm md:text-base flex items-center gap-3">
              Book a Free Site Inspection
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-[#D4AF37] group-hover:text-black transition-colors duration-500">
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </span>
          </Link>
        </motion.div>

      </div>
    </section>
  );
};
