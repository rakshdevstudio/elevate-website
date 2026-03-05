import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, ArrowUp, Globe } from "lucide-react";
import { motion } from "framer-motion";
import logo from "@/assets/logo.png";

const quickLinks = [
  { label: "Home", path: "/" },
  { label: "About Us", path: "/about" },
  { label: "Services", path: "/services" },
  { label: "Products", path: "/products" },
  { label: "Careers", path: "/careers" },
  { label: "Contact", path: "/contact" },
];

const serviceLinks = [
  { label: "Passenger Elevators", path: "/services#passenger" },
  { label: "Home Elevators", path: "/services#home" },
  { label: "Commercial Elevators", path: "/services#commercial" },
  { label: "Maintenance & AMC", path: "/services#maintenance" },
  { label: "Modernization", path: "/services#modernization" },
];

const linkClass =
  "text-muted-foreground/60 text-sm hover:text-primary hover:translate-x-1 inline-block transition-all duration-300";

const Footer = () => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="relative border-t border-border/30">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-[hsl(213_62%_5%)] to-[hsl(213_62%_4%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_30%_at_50%_0%,hsl(43_66%_52%/0.03),transparent)] pointer-events-none" />

      <div className="container mx-auto px-4 lg:px-8 py-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Brand column */}
          <div>
            <Link to="/" className="flex items-center gap-2.5 mb-5 group w-fit">
              <img
                src={logo}
                alt="X Elevators"
                className="h-16 w-16 object-contain group-hover:opacity-90 transition-opacity duration-300"
              />
              <span className="text-foreground font-heading font-bold text-lg uppercase tracking-wider group-hover:text-primary transition-colors duration-300">
                X Elevators Pvt. Ltd.
              </span>
            </Link>
            <p className="text-muted-foreground/70 text-sm leading-relaxed mb-6">
              Elevating Trust. Engineering the Future. Next-generation elevator
              solutions with uncompromising commitment to quality.
            </p>
            <div className="flex gap-2 flex-wrap">
              {["ISO Certified", "Licensed", "99% Automation"].map((badge) => (
                <span
                  key={badge}
                  className="px-3 py-1.5 rounded-full bg-primary/8 text-primary text-xs font-semibold border border-primary/10"
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-foreground font-heading font-semibold mb-5 text-sm uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className={linkClass}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-foreground font-heading font-semibold mb-5 text-sm uppercase tracking-wider">
              Our Services
            </h4>
            <ul className="space-y-3">
              {serviceLinks.map((s) => (
                <li key={s.path}>
                  <Link to={s.path} className={linkClass}>
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-foreground font-heading font-semibold mb-5 text-sm uppercase tracking-wider">
              Contact Us
            </h4>
            <ul className="space-y-4">
              {/* Phone numbers */}
              <li className="flex items-start gap-3 text-sm text-muted-foreground/60">
                <Phone
                  className="w-4 h-4 text-primary shrink-0 mt-0.5"
                  aria-hidden="true"
                />
                <div className="flex flex-col gap-1">
                  <a
                    href="tel:+919844002026"
                    className="hover:text-primary transition-colors duration-300"
                    aria-label="Call +91 9844002026"
                  >
                    +91 9844002026
                  </a>
                  <a
                    href="tel:+916384961909"
                    className="hover:text-primary transition-colors duration-300"
                    aria-label="Call +91 6384961909"
                  >
                    +91 6384961909
                  </a>
                </div>
              </li>

              {/* Email */}
              <li className="flex items-center gap-3 text-sm text-muted-foreground/60">
                <Mail
                  className="w-4 h-4 text-primary shrink-0"
                  aria-hidden="true"
                />
                <a
                  href="mailto:info@xelevators.in"
                  className="hover:text-primary transition-colors duration-300"
                  aria-label="Email info@xelevators.in"
                >
                  info@xelevators.in
                </a>
              </li>

              {/* Website */}
              <li className="flex items-center gap-3 text-sm text-muted-foreground/60">
                <Globe
                  className="w-4 h-4 text-primary shrink-0"
                  aria-hidden="true"
                />
                <a
                  href="https://xelevators.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors duration-300"
                  aria-label="Visit xelevators.in website"
                >
                  xelevators.in
                </a>
              </li>

              {/* Location (display only — no action possible) */}
              <li className="flex items-center gap-3 text-sm text-muted-foreground/60">
                <MapPin
                  className="w-4 h-4 text-primary shrink-0"
                  aria-hidden="true"
                />
                <span>Bangalore &amp; Chennai, India</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="gradient-separator" />
      <div className="relative z-10">
        <div className="container mx-auto px-4 lg:px-8 py-7 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground/50 text-sm">
            © {new Date().getFullYear()} X Elevators Pvt Ltd. All rights reserved.
          </p>
          <motion.button
            onClick={scrollToTop}
            whileHover={{ y: -3, scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Scroll to top"
            className="w-10 h-10 rounded-xl bg-secondary/30 hover:bg-primary hover:text-primary-foreground flex items-center justify-center text-muted-foreground transition-all duration-400 hover:shadow-[0_0_24px_hsl(43_66%_52%/0.25)] border border-border/30 hover:border-primary/30"
          >
            <ArrowUp className="w-4 h-4" />
          </motion.button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
