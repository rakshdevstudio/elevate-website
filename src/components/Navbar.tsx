import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "@/assets/logo.png";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Services", path: "/services" },
  { label: "Products", path: "/products" },
  { label: "Careers", path: "/careers" },
  { label: "Contact", path: "/contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMobileOpen(false), [location]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        scrolled
          ? "bg-[hsl(213_62%_6%/0.85)] backdrop-blur-2xl shadow-[0_4px_40px_hsl(213_62%_3%/0.6)] border-b border-primary/5"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Link to="/" className="flex items-center gap-2.5 group">
            <img src={logo} alt="X Elevators" className="h-10 w-10 object-contain transition-transform duration-300 group-hover:scale-110" />
            <div className="font-heading">
              <span className="text-foreground font-bold text-base lg:text-lg uppercase tracking-wider">X Elevators</span>
              <span className="hidden sm:inline text-muted-foreground/60 text-xs ml-1.5 uppercase tracking-wider">Pvt. Ltd.</span>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-0.5">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 relative group ${
                  location.pathname === link.path
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {link.label}
                <span className={`absolute bottom-0.5 left-1/2 -translate-x-1/2 h-0.5 bg-gradient-to-r from-primary to-gold-light rounded-full transition-all duration-400 ${
                  location.pathname === link.path ? "w-6 opacity-100" : "w-0 opacity-0 group-hover:w-5 group-hover:opacity-100"
                }`} />
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-4">
            <a href="tel:+919844002026" className="flex items-center gap-2 text-sm text-muted-foreground/70 hover:text-primary transition-all duration-300 group">
              <Phone className="w-4 h-4 group-hover:animate-pulse" />
              <span>+91 9844002026</span>
            </a>
            <Link
              to="/contact"
              className="relative bg-gradient-to-r from-primary to-gold-light text-primary-foreground px-7 py-2.5 rounded-xl text-sm font-semibold transition-all duration-400 hover:shadow-[0_0_30px_hsl(43_66%_52%/0.35)] hover:scale-105 active:scale-100 btn-glow"
            >
              Get Quote
            </Link>
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 text-foreground hover:text-primary transition-colors duration-300"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="lg:hidden bg-[hsl(213_62%_6%/0.95)] backdrop-blur-2xl border-t border-border/30"
          >
            <div className="container mx-auto px-4 py-5 space-y-1">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    to={link.path}
                    className={`block px-4 py-3.5 rounded-xl text-sm font-medium transition-all ${
                      location.pathname === link.path
                        ? "text-primary bg-primary/8"
                        : "text-muted-foreground hover:text-foreground hover:bg-foreground/5"
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <Link
                to="/contact"
                className="block text-center bg-gradient-to-r from-primary to-gold-light text-primary-foreground px-5 py-3.5 rounded-xl text-sm font-semibold mt-4"
              >
                Get Quote
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
