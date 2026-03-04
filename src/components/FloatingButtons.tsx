import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, FileText, Phone, X } from "lucide-react";
import { Link } from "react-router-dom";

const FloatingButtons = () => {
  const [showTopBar, setShowTopBar] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowTopBar(window.scrollY > 600);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Sticky top CTA bar - appears on scroll */}
      <AnimatePresence>
        {showTopBar && !dismissed && (
          <motion.div
            initial={{ y: -60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -60, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 left-0 right-0 z-[60] bg-gradient-to-r from-primary/95 to-gold-light/95 backdrop-blur-md shadow-[0_4px_20px_hsl(43_66%_52%/0.3)]"
          >
            <div className="container mx-auto px-4 flex items-center justify-between h-11">
              <p className="text-primary-foreground text-xs sm:text-sm font-medium hidden sm:block">
                🏗️ Get a Free Site Inspection — Talk to our elevator engineers today!
              </p>
              <p className="text-primary-foreground text-xs font-medium sm:hidden">
                🏗️ Free Site Inspection Available!
              </p>
              <div className="flex items-center gap-2">
                <a href="tel:+919844002026" className="flex items-center gap-1.5 bg-primary-foreground/15 hover:bg-primary-foreground/25 text-primary-foreground px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200">
                  <Phone className="w-3 h-3" /> Call Now
                </a>
                <Link to="/contact" className="flex items-center gap-1.5 bg-primary-foreground text-primary px-3 py-1.5 rounded-full text-xs font-semibold hover:bg-primary-foreground/90 transition-all duration-200">
                  Get Quote
                </Link>
                <button onClick={() => setDismissed(true)} className="text-primary-foreground/70 hover:text-primary-foreground p-1 transition-colors">
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating bottom-right buttons */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2, duration: 0.4 }}
        >
          <Link
            to="/contact"
            className="flex items-center gap-2 bg-gradient-to-r from-primary to-gold-light text-primary-foreground px-5 py-3 rounded-full font-semibold text-sm shadow-[0_4px_20px_hsl(43_66%_52%/0.3)] hover:shadow-[0_8px_30px_hsl(43_66%_52%/0.5)] hover:scale-105 transition-all duration-300"
          >
            <FileText className="w-4 h-4" /> Get Quote
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2.2, duration: 0.4 }}
        >
          <a
            href="https://wa.me/919844002026"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-[0_4px_20px_rgba(37,211,102,0.4)] hover:shadow-[0_8px_30px_rgba(37,211,102,0.6)] hover:scale-110 transition-all duration-300"
          >
            <MessageCircle className="w-6 h-6" />
          </a>
        </motion.div>
      </div>
    </>
  );
};

export default FloatingButtons;
