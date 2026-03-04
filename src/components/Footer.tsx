import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, ArrowUp, Globe } from "lucide-react";
import logo from "@/assets/logo.png";

const Footer = () => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="bg-navy-deep border-t border-border">
      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img src={logo} alt="X Elevators" className="h-10 w-10 object-contain" />
              <span className="text-foreground font-heading font-bold text-lg uppercase">X Elevators Pvt. Ltd.</span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed mb-4">
              Elevating Trust. Engineering the Future. Next-generation elevator solutions with uncompromising commitment to quality.
            </p>
            <div className="flex gap-2 flex-wrap">
              {["ISO Certified", "Licensed", "99% Automation"].map((badge) => (
                <span key={badge} className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">
                  {badge}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-foreground font-heading font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2.5">
              {[
                { label: "Home", path: "/" },
                { label: "About Us", path: "/about" },
                { label: "Services", path: "/services" },
                { label: "Products", path: "/products" },
                { label: "Careers", path: "/careers" },
                { label: "Contact", path: "/contact" },
              ].map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-muted-foreground text-sm hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-foreground font-heading font-semibold mb-4">Our Services</h4>
            <ul className="space-y-2.5">
              {["Passenger Elevators", "Home Elevators", "Commercial Elevators", "Maintenance & AMC", "Modernization"].map((s) => (
                <li key={s}>
                  <span className="text-muted-foreground text-sm hover:text-primary transition-colors cursor-pointer">{s}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-foreground font-heading font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-sm text-muted-foreground">
                <Phone className="w-4 h-4 text-primary shrink-0" />
                <div>
                  <span className="block">+91 9844002026</span>
                  <span className="block">+91 6384961909</span>
                </div>
              </li>
              <li className="flex items-center gap-3 text-sm text-muted-foreground">
                <Mail className="w-4 h-4 text-primary shrink-0" />
                <span>info@xelevators.in</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-muted-foreground">
                <Globe className="w-4 h-4 text-primary shrink-0" />
                <span>xelevators.in</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="container mx-auto px-4 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} X Elevators Pvt Ltd. All rights reserved.
          </p>
          <button
            onClick={scrollToTop}
            className="w-10 h-10 rounded-lg bg-secondary hover:bg-primary hover:text-primary-foreground flex items-center justify-center text-muted-foreground transition-all"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
