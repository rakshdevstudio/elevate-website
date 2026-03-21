import React, { useRef, useState, useEffect } from 'react';
import { motion, useAnimationFrame, useMotionValue, animate } from 'framer-motion';
import { TrendingUp, Users, BookOpen, Heart, Shield, Zap } from 'lucide-react';
import { SectionHeading, ScrollReveal } from '@/components/ui/shared';

const cultureCards = [
  { id: 'growth', icon: TrendingUp, title: "Growth", desc: "We invest in your career growth with training programs, certifications, and clear advancement paths." },
  { id: 'culture', icon: Users, title: "Team Culture", desc: "Collaborative and supportive work environment where every team member's contribution is valued." },
  { id: 'innovation', icon: Zap, title: "Innovation", desc: "Work with cutting-edge technology including IoT systems, smart controls, and AI-powered diagnostics." },
  { id: 'learning', icon: BookOpen, title: "Learning", desc: "Continuous learning opportunities with access to the latest elevator technology and industry best practices." },
  { id: 'safety', icon: Shield, title: "Safety First", desc: "Comprehensive safety training and top-of-the-line protective equipment for all field operations." },
  { id: 'balance', icon: Heart, title: "Work-Life Balance", desc: "Flexible schedules and supportive policies that help you maintain a healthy work-life balance." },
];

const desktopPositions = [
  { xOffset: -400, y: 18 }, // Growth (Top Left)
  { xOffset: 400, y: 18 }, // Team Culture (Top Right)
  { xOffset: -400, y: 50 }, // Innovation (Middle Left)
  { xOffset: 400, y: 50 }, // Learning (Middle Right)
  { xOffset: -400, y: 82 }, // Safety First (Bottom Left)
  { xOffset: 400, y: 82 }, // Work-Life Balance (Bottom Right)
];

export const InteractiveCareers = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(-1000);
  const mouseY = useMotionValue(-1000);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const handleMouseLeave = () => {
    mouseX.set(-1000);
    mouseY.set(-1000);
  };

  return (
    <section className="py-24 sm:py-32 relative overflow-hidden min-h-[100vh] flex flex-col justify-center">
      {/* Background Ambient Effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 flex items-center justify-center">
         <motion.div 
          animate={{ scale: [1, 1.1, 1], opacity: [0.03, 0.08, 0.03] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="w-[800px] h-[800px] bg-[#D4AF37]/20 rounded-full blur-[150px] mix-blend-screen" 
        />
        <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-[0.03] mix-blend-overlay"></div>
      </div>

      <div className="relative z-30 mb-8 md:mb-16 text-center max-w-3xl mx-auto">
         <SectionHeading badge="System Core" title="Why To Build With Us" subtitle="A world-class environment engineered for growth, precision, and impact." />
      </div>

      <div className="container mx-auto px-4 relative z-10 w-full max-w-[1400px]">
        {/* Desktop Canvas */}
        <div 
          ref={containerRef}
          className="hidden xl:block relative w-full h-[850px]"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <Connections hoveredCard={hoveredCard} />
          <CoreElement />

          {cultureCards.map((card, index) => (
            <Node 
              key={card.id}
              card={card}
              index={index}
              mouseX={mouseX}
              mouseY={mouseY}
              isHovered={hoveredCard === card.id}
              setHoveredCard={setHoveredCard}
            />
          ))}
        </div>

        {/* Mobile & Tablet Fallback List */}
        <div className="xl:hidden flex flex-col gap-6 items-center w-full max-w-2xl mx-auto relative z-10">
           {cultureCards.map((card, i) => (
             <ScrollReveal key={i} delay={i * 0.1} className="w-full">
               <div className="w-full bg-card/80 backdrop-blur-xl border border-white/5 rounded-2xl p-6 shadow-xl flex flex-col text-left">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-background border border-white/10 flex items-center justify-center shrink-0">
                      <card.icon className="w-5 h-5 text-[#D4AF37]" />
                    </div>
                    <h3 className="text-lg font-bold text-white">{card.title}</h3>
                  </div>
                  <p className="text-sm text-gray-400 leading-relaxed">{card.desc}</p>
                </div>
             </ScrollReveal>
           ))}
        </div>
      </div>
    </section>
  );
};

// --- CORE COMPONENT --- //
const CoreElement = () => (
  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex items-center justify-center pointer-events-none">
     {/* Outer Breathing Rings */}
     <motion.div 
       animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.3, 0.1] }}
       transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
       className="absolute w-[300px] h-[300px] border border-[#D4AF37]/20 rounded-full"
     />
     <motion.div 
       animate={{ scale: [0.8, 1.1, 0.8], opacity: [0.2, 0.4, 0.2] }}
       transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
       className="absolute w-48 h-48 border border-[#D4AF37]/30 rounded-full bg-[#D4AF37]/5 blur-[8px]"
     />
     {/* Solid Glass Center Hub */}
     <div className="w-24 h-24 bg-background rounded-full border border-white/10 flex items-center justify-center shadow-[0_0_50px_rgba(212,175,55,0.15)] backdrop-blur-md">
        <motion.div 
           animate={{ scale: [1, 1.25, 1], opacity: [0.8, 1, 0.8] }}
           transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
           className="w-6 h-6 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#F5D061] shadow-[0_0_25px_#D4AF37]"
        />
     </div>
  </div>
);

// --- CONNECTIONS SVG --- //
const Connections = ({ hoveredCard }: { hoveredCard: string | null }) => {
   return (
     <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
        {cultureCards.map((card, i) => {
           const pos = desktopPositions[i];
           const active = hoveredCard === card.id;

           return (
             <motion.line
               key={`line-${i}`}
               x1="50%" y1="50%"
               x2={`calc(50% + ${pos.xOffset}px)`} y2={`${pos.y}%`}
               stroke={active ? '#D4AF37' : '#D4AF37'}
               strokeWidth={active ? 1.5 : 1}
               // Base opacity 8%, brightens on hover
               opacity={active ? 0.3 : 0.08}
               className="transition-all duration-700"
             />
           );
        })}
     </svg>
   );
};

// --- ORBITING NODE CARD --- //
const Node = ({ card, index, mouseX, mouseY, isHovered, setHoveredCard }: any) => {
  const nodeRef = useRef<HTMLDivElement>(null);
  const [center, setCenter] = useState({ x: 0, y: 0 });
  const offsetX = useMotionValue(0);
  const offsetY = useMotionValue(0);
  const floatY = useMotionValue(0);
  
  useEffect(() => {
    // Gentle idling float specific to each card
    const controls = animate(floatY, [-6, 6, -6], {
      duration: 5 + (index % 3) * 1.5,
      repeat: Infinity,
      ease: "easeInOut",
    });
    return () => controls.stop();
  }, [index, floatY]);

  // Read actual DOM center for accurate cursor physics
  useEffect(() => {
    const updateCenter = () => {
      if (!nodeRef.current || !nodeRef.current.parentElement) return;
      const rect = nodeRef.current.parentElement.getBoundingClientRect();
      const nodeRect = nodeRef.current.getBoundingClientRect();
      setCenter({
        x: (nodeRect.left - rect.left) + nodeRect.width / 2,
        y: (nodeRect.top - rect.top) + nodeRect.height / 2,
      });
    };
    updateCenter();
    const t = setTimeout(updateCenter, 200);
    window.addEventListener('resize', updateCenter);
    return () => {
      clearTimeout(t);
      window.removeEventListener('resize', updateCenter);
    }
  }, []);

  useAnimationFrame(() => {
    const mx = mouseX.get();
    const my = mouseY.get();
    
    // Quick release if mouse leaves
    if (mx < 0 || my < 0) {
      offsetX.set(offsetX.get() * 0.92);
      offsetY.set(offsetY.get() * 0.92);
      return;
    }

    const dx = mx - center.x;
    const dy = my - center.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    
    // Magnetic Pull Logic
    if (dist < 400 && !isHovered) {
      const pull = 0.05;
      offsetX.set(offsetX.get() + (dx * pull - offsetX.get()) * 0.1);
      offsetY.set(offsetY.get() + (dy * pull - offsetY.get()) * 0.1);
    } else {
      offsetX.set(offsetX.get() * 0.92);
      offsetY.set(offsetY.get() * 0.92);
    }
  });

  return (
    <motion.div
      ref={nodeRef}
      className="absolute w-[340px] cursor-default will-change-transform"
      style={{
        left: `calc(50% + ${desktopPositions[index].xOffset}px)`,
        top: `${desktopPositions[index].y}%`,
        x: offsetX,
        y: offsetY,
        marginLeft: "-170px",
        marginTop: "-110px",
        zIndex: isHovered ? 40 : 10,
      }}
      animate={{ scale: isHovered ? 1.04 : 1 }}
      onMouseEnter={() => setHoveredCard(card.id)}
      onMouseLeave={() => setHoveredCard(null)}
    >
      <motion.div style={{ y: floatY }} className={`p-6 rounded-[24px] backdrop-blur-xl transition-all duration-700 overflow-hidden border flex flex-col text-left
        ${isHovered 
          ? 'bg-card/95 border-[#D4AF37]/50 shadow-[0_15px_40px_rgba(212,175,55,0.15)]' 
          : 'bg-card/40 border-white/5 shadow-2xl hover:border-white/10'
        }`}
      >
        {/* Hover Highlight Ring */}
        <div className={`absolute -top-12 -right-12 w-32 h-32 bg-[#D4AF37]/20 blur-[40px] rounded-full transition-opacity duration-700 pointer-events-none ${isHovered ? 'opacity-100' : 'opacity-0'}`} />

        <div className="flex items-center gap-4 mb-4 relative z-10 w-full">
           <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 transition-all duration-500
             ${isHovered ? 'bg-[#D4AF37] shadow-[0_0_20px_rgba(212,175,55,0.4)]' : 'bg-background border border-white/10'}`}
           >
             <card.icon className={`w-5 h-5 transition-colors duration-500 ${isHovered ? 'text-black' : 'text-[#D4AF37]'}`} strokeWidth={2} />
           </div>
           <h3 className={`text-[17px] font-bold transition-colors duration-500 ${isHovered ? 'text-[#D4AF37]' : 'text-white'} truncate`}>
             {card.title}
           </h3>
        </div>
        
        <p className={`text-[14.5px] leading-relaxed transition-colors duration-500 relative z-10 ${isHovered ? 'text-gray-200' : 'text-gray-400'}`}>
          {card.desc}
        </p>
      </motion.div>
    </motion.div>
  );
};
