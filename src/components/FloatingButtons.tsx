import { useState } from "react";
import { motion } from "framer-motion";
import { MessageCircle, PaintBucket } from "lucide-react";
import ComingSoonModal from "./ComingSoonModal";

const FloatingButtons = () => {
  const [isComingSoonOpen, setIsComingSoonOpen] = useState(false);

  return (
    <>
      <div className="fixed bottom-6 right-6 z-[99] flex flex-col gap-3">
        {/* Mobile Design Cabin Button (Option A) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.8, duration: 0.4 }}
          className="md:hidden"
        >
          <button
            onClick={() => setIsComingSoonOpen(true)}
            style={{ animation: 'pulse-glow 3s infinite' }}
            className="flex items-center gap-2 bg-gradient-to-r from-[#E5B84B] to-[#C9992D] text-zinc-900 px-5 py-3 rounded-full font-semibold text-sm shadow-[0_4px_20px_hsl(43_66%_52%/0.4)] hover:shadow-[0_8px_30px_hsl(43_66%_52%/0.6)] hover:scale-105 active:scale-95 transition-all duration-300 relative group overflow-hidden"
          >
            <style>
              {`
                @keyframes pulse-glow {
                  0%, 100% { box-shadow: 0 4px 20px hsl(43 66% 52% / 0.4); }
                  50% { box-shadow: 0 4px 35px hsl(43 66% 52% / 0.8), 0 0 15px hsl(43 66% 52% / 0.5) inset; }
                }
              `}
            </style>
            {/* Glow pulse animation */}
            <div className="absolute inset-0 bg-white/30 rounded-full animate-ping opacity-0 group-hover:opacity-100" />
            <PaintBucket className="w-5 h-5" /> Design Cabin
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2, duration: 0.4 }}
        >
          <a
            href="https://wa.me/919844002026"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-gradient-to-r from-primary to-gold-light text-primary-foreground px-5 py-3 rounded-full font-semibold text-sm shadow-[0_4px_20px_hsl(43_66%_52%/0.3)] hover:shadow-[0_8px_30px_hsl(43_66%_52%/0.5)] hover:scale-105 active:scale-95 transition-all duration-300"
          >
            <MessageCircle className="w-5 h-5" /> Chat with us
          </a>
        </motion.div>
      </div>

      <ComingSoonModal isOpen={isComingSoonOpen} onClose={() => setIsComingSoonOpen(false)} />
    </>
  );
};

export default FloatingButtons;
