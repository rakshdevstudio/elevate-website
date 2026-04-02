import { useState } from "react";
import { motion } from "framer-motion";
import { PaintBucket } from "lucide-react";
import ComingSoonModal from "./ComingSoonModal";

const whatsappMessage = encodeURIComponent("Hi, I am interested in your elevator services.");
const whatsappLink = `https://wa.me/919844002026?text=${whatsappMessage}`;

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
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat on WhatsApp"
            title="Chat with us on WhatsApp"
            style={{ animation: "whatsapp-pulse 4s ease-in-out infinite" }}
            className="flex items-center gap-2 bg-gradient-to-r from-primary to-gold-light text-primary-foreground px-5 py-3 rounded-full font-semibold text-sm shadow-[0_4px_20px_hsl(43_66%_52%/0.3)] hover:shadow-[0_8px_30px_hsl(43_66%_52%/0.5)] hover:scale-105 active:scale-95 transition-all duration-300"
          >
            <style>
              {`
                @keyframes whatsapp-pulse {
                  0%, 84%, 100% { box-shadow: 0 4px 20px hsl(43 66% 52% / 0.3); }
                  90% { box-shadow: 0 4px 32px hsl(43 66% 52% / 0.55), 0 0 0 6px hsl(43 66% 52% / 0.12); }
                }
              `}
            </style>
            <svg viewBox="0 0 32 32" className="w-5 h-5" aria-hidden="true" focusable="false">
              <path fill="currentColor" d="M19.11 17.17c-.28-.14-1.65-.82-1.9-.91-.25-.09-.43-.14-.61.14-.18.28-.7.91-.86 1.1-.16.18-.31.21-.59.07-.28-.14-1.17-.43-2.23-1.38-.82-.73-1.37-1.62-1.53-1.9-.16-.28-.02-.43.12-.57.12-.12.28-.31.41-.46.14-.16.18-.28.28-.46.09-.18.04-.35-.02-.5-.07-.14-.61-1.47-.84-2.02-.22-.53-.45-.46-.61-.47l-.52-.01c-.18 0-.46.07-.7.35-.24.28-.92.9-.92 2.2 0 1.3.95 2.56 1.08 2.74.14.18 1.87 2.86 4.53 4 .63.27 1.12.43 1.5.55.63.2 1.2.17 1.66.1.51-.08 1.65-.67 1.88-1.32.23-.64.23-1.19.16-1.31-.07-.12-.25-.18-.53-.32Z" />
              <path fill="currentColor" d="M16 3C8.83 3 3 8.73 3 15.81c0 2.5.73 4.93 2.12 7L3 29l6.39-2.05a13.1 13.1 0 0 0 6.61 1.79C23.17 28.74 29 23 29 15.92 29 8.84 23.17 3 16 3Zm0 23.62c-2.1 0-4.16-.56-5.96-1.63l-.43-.25-3.79 1.22 1.24-3.7-.28-.45a10.6 10.6 0 0 1-1.64-5.65C5.14 10.03 10 5.26 16 5.26c5.99 0 10.86 4.76 10.86 10.66S21.99 26.62 16 26.62Z" />
            </svg>
            Chat on WhatsApp
          </a>
        </motion.div>
      </div>

      <ComingSoonModal isOpen={isComingSoonOpen} onClose={() => setIsComingSoonOpen(false)} />
    </>
  );
};

export default FloatingButtons;
