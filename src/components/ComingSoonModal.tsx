import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence, useMotionValue } from "framer-motion";
import { X, Sparkles, Send } from "lucide-react";

interface ComingSoonModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ComingSoonModal: React.FC<ComingSoonModalProps> = ({ isOpen, onClose }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      mouseX.set((e.clientX / innerWidth - 0.5) * -20);
      mouseY.set((e.clientY / innerHeight - 0.5) * -20);
    };

    if (isOpen) {
      window.addEventListener("mousemove", handleMouseMove);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const text = "COMING SOON";
  const letters = text.split("");

  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          key="coming-soon-modal"
          ref={containerRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.5, ease: "easeInOut" } }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-xl overflow-hidden"
          onClick={onClose}
        >
          {/* Moving background light */}
          <motion.div
            className="absolute inset-0 opacity-40 pointer-events-none"
            animate={{
              background: [
                "radial-gradient(ellipse at 20% 50%, hsl(43 66% 52% / 0.15) 0%, transparent 50%)",
                "radial-gradient(ellipse at 80% 50%, hsl(43 66% 52% / 0.15) 0%, transparent 50%)",
                "radial-gradient(ellipse at 50% 20%, hsl(43 66% 52% / 0.15) 0%, transparent 50%)",
                "radial-gradient(ellipse at 20% 50%, hsl(43 66% 52% / 0.15) 0%, transparent 50%)",
              ],
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          />

          {/* Golden dust particles */}
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-primary rounded-full pointer-events-none"
              initial={{
                x: Math.random() * (typeof window !== "undefined" ? window.innerWidth : 1000),
                y: Math.random() * (typeof window !== "undefined" ? window.innerHeight : 1000),
                opacity: Math.random() * 0.5 + 0.1,
                scale: Math.random() * 2,
              }}
              animate={{
                y: [null, Math.random() * -100 - 50],
                opacity: [null, 0],
              }}
              transition={{
                duration: Math.random() * 4 + 4,
                repeat: Infinity,
                ease: "linear",
                delay: Math.random() * 4,
              }}
            />
          ))}

          {/* Close Button */}
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
            onClick={onClose}
            className="absolute top-6 right-6 md:top-10 md:right-10 text-white/50 hover:text-white transition-colors p-2 rounded-full hover:bg-white/10 z-50 cursor-pointer"
          >
            <X className="w-8 h-8 md:w-10 md:h-10" strokeWidth={1} />
          </motion.button>

          {/* Content Wrapper */}
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 text-center px-4 flex flex-col items-center justify-center w-full max-w-4xl"
            onClick={(e) => e.stopPropagation()}
            style={{
              x: mouseX,
              y: mouseY,
            }}
          >
            {/* Energy Orb behind text */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
              transition={{ delay: 0.5, duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-primary/20 rounded-full blur-[100px] pointer-events-none"
            />

            {/* Title */}
            <h2 className="text-5xl md:text-7xl lg:text-9xl font-heading font-extrabold tracking-widest text-transparent flex justify-center mb-6 relative overflow-visible">
              {letters.map((letter, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ delay: i * 0.1 + 0.5, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className="bg-clip-text bg-gradient-to-b from-white to-white/50 px-1 md:px-2 relative inline-block"
                >
                  {letter === " " ? "\u00A0" : letter}
                  
                  {/* Subtle individual letter glow */}
                  <motion.span
                    className="absolute inset-0 md:inset-[-10px] bg-primary blur-[20px] -z-10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 0.5, 0] }}
                    transition={{ delay: i * 0.1 + 1, duration: 2, repeat: Infinity, repeatDelay: 3 }}
                  />
                </motion.span>
              ))}

              {/* Light Sweep */}
              <motion.div
                className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-primary/50 to-transparent skew-x-[-20deg]"
                initial={{ left: "-100%" }}
                animate={{ left: "200%" }}
                transition={{ delay: 1.5, duration: 2, ease: "easeInOut", repeat: Infinity, repeatDelay: 5 }}
                style={{ mixBlendMode: "overlay" }}
              />
            </h2>

            {/* Subtext */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.8, duration: 0.8, ease: "easeOut" }}
              className="text-lg md:text-2xl text-white/70 font-light max-w-2xl mx-auto mb-12 tracking-wide flex items-center justify-center gap-3"
            >
              <Sparkles className="w-5 h-5 text-primary" />
              The future of elevator customization is being crafted.
              <Sparkles className="w-5 h-5 text-primary" />
            </motion.p>

            {/* Button */}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.2, duration: 0.8, ease: "easeOut" }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative px-8 py-4 bg-transparent border border-primary/30 rounded-full overflow-hidden text-lg font-medium text-white transition-all hover:border-primary/80 hover:shadow-[0_0_40px_hsl(43_66%_52%/0.3)] flex items-center gap-3"
              onClick={onClose}
            >
              {/* Liquid gold hover effect */}
              <div className="absolute inset-0 w-full h-full transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out bg-gradient-to-r from-primary to-gold-light -z-10" />
              <span className="relative z-10 group-hover:text-black transition-colors duration-300 flex items-center gap-2">
                Stay Tuned <Send className="w-5 h-5 opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
              </span>
            </motion.button>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};

export default ComingSoonModal;
