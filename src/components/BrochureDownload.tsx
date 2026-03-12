import { motion, AnimatePresence } from "framer-motion";
import { Download, FileText } from "lucide-react";

const BrochureDownload = () => {
  return (
    <section className="py-16 relative">
      <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ y: -6, transition: { duration: 0.3, ease: "easeOut" } }}
          className="group relative rounded-3xl overflow-hidden p-8 lg:p-10 flex flex-col sm:flex-row items-center gap-8"
          style={{
            background:
              "linear-gradient(160deg, hsl(212 50% 15% / 0.65) 0%, hsl(212 48% 10% / 0.45) 55%, hsl(212 55% 8% / 0.5) 100%)",
            backdropFilter: "blur(32px) saturate(1.3)",
            WebkitBackdropFilter: "blur(32px) saturate(1.3)",
            border: "1px solid hsl(43 66% 52% / 0.15)",
            boxShadow:
              "inset 0 1px 0 hsl(0 0% 100% / 0.06), 0 20px 60px hsl(213 62% 3% / 0.4)",
          }}
        >
          {/* Top shimmer line */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          {/* Hover border glow */}
          <div
            className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
            style={{
              boxShadow:
                "0 0 0 1px hsl(43 66% 52% / 0.2), 0 0 60px hsl(43 66% 52% / 0.08)",
            }}
          />
          {/* Ambient glow orb */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/6 rounded-full blur-[60px] pointer-events-none" />

          {/* Icon */}
          <div className="relative shrink-0">
            <motion.div
              className="absolute inset-0 rounded-2xl bg-primary/20 blur-2xl"
              animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.5, 0.3] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
            />
            <div
              className="relative w-20 h-20 rounded-2xl flex items-center justify-center text-primary"
              style={{
                background:
                  "linear-gradient(135deg, hsl(43 66% 52% / 0.2) 0%, hsl(43 66% 52% / 0.07) 100%)",
                boxShadow:
                  "0 0 28px hsl(43 66% 52% / 0.18), inset 0 1px 0 hsl(0 0% 100% / 0.1), 0 0 0 1px hsl(43 66% 52% / 0.15)",
              }}
            >
              <FileText className="w-9 h-9" />
            </div>
          </div>

          {/* Text */}
          <div className="flex-1 text-center sm:text-left relative z-10">
            <h3 className="text-2xl lg:text-3xl font-heading font-bold text-foreground mb-2 tracking-tight">
              Company Brochure
            </h3>
            <p className="text-muted-foreground/75 text-sm lg:text-base leading-relaxed mb-1">
              Download our company brochure to explore our elevator solutions and technologies.
            </p>
            <p className="text-muted-foreground/50 text-xs">PDF · Available instantly</p>
          </div>

          {/* CTA */}
          <div className="relative z-10 shrink-0">
            <a
              href="/brochure.pdf"
              download
              className="group/btn inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-primary to-gold-light text-primary-foreground px-8 py-4 rounded-full font-semibold text-sm transition-all duration-400 hover:shadow-[0_0_40px_hsl(43_66%_52%/0.4)] hover:scale-105 active:scale-100 btn-glow whitespace-nowrap"
            >
              <Download className="w-4 h-4 group-hover/btn:-translate-y-0.5 transition-transform duration-300" />
              Download Brochure
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default BrochureDownload;
