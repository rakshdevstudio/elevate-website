import { motion } from "framer-motion";
import { MessageCircle, FileText } from "lucide-react";
import { Link } from "react-router-dom";

const FloatingButtons = () => (
  <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
    {/* Get Quote */}
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

    {/* WhatsApp */}
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
);

export default FloatingButtons;
