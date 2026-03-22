import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "@/assets/logo.png";
import "./NavbarGooey.css";
import ComingSoonModal from "@/components/ComingSoonModal";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Products", path: "/products" },
  { label: "Services", path: "/services" },
  { label: "Careers", path: "/careers" },
  { label: "Contact", path: "/contact" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [showBanner, setShowBanner] = useState(false);
  const [isComingSoonOpen, setIsComingSoonOpen] = useState(false);
  const lastScrollYRef = useRef(0);
  const location = useLocation();

  // --- Gooey Effect Logic ---
  const containerRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const filterRef = useRef<HTMLSpanElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const animationTime = 600;
  const particleCount = 15;
  const particleDistances = [90, 10];
  const particleR = 100;
  const timeVariance = 300;
  const colors = ["#D4AF37", "#E5B84B", "#C9992D", "#FFF"]; 

  const noise = (n = 1) => n / 2 - Math.random() * n;

  const getXY = (distance: number, pointIndex: number, totalPoints: number) => {
    const angle = ((360 + noise(8)) / totalPoints) * pointIndex * (Math.PI / 180);
    return [distance * Math.cos(angle), distance * Math.sin(angle)];
  };

  const createParticle = (i: number, t: number, d: number[], r: number) => {
    let rotate = noise(r / 10);
    return {
      start: getXY(d[0], particleCount - i, particleCount),
      end: getXY(d[1] + noise(7), particleCount - i, particleCount),
      time: t,
      scale: 1 + noise(0.2),
      color: colors[Math.floor(Math.random() * colors.length)],
      rotate: rotate > 0 ? (rotate + r / 20) * 10 : (rotate - r / 20) * 10
    };
  };

  const makeParticles = (element: HTMLElement) => {
    const bubbleTime = animationTime * 2 + timeVariance;
    element.style.setProperty('--time', `${bubbleTime}ms`);

    for (let i = 0; i < particleCount; i++) {
      const t = animationTime * 2 + noise(timeVariance * 2);
      const p = createParticle(i, t, particleDistances, particleR);
      element.classList.remove('active');

      setTimeout(() => {
        const particle = document.createElement('span');
        const point = document.createElement('span');
        particle.classList.add('particle');
        particle.style.setProperty('--start-x', `${p.start[0]}px`);
        particle.style.setProperty('--start-y', `${p.start[1]}px`);
        particle.style.setProperty('--end-x', `${p.end[0]}px`);
        particle.style.setProperty('--end-y', `${p.end[1]}px`);
        particle.style.setProperty('--time', `${p.time}ms`);
        particle.style.setProperty('--scale', `${p.scale}`);
        particle.style.setProperty('--color', p.color);
        particle.style.setProperty('--rotate', `${p.rotate}deg`);

        point.classList.add('point');
        particle.appendChild(point);
        element.appendChild(particle);
        requestAnimationFrame(() => {
          element.classList.add('active');
        });
        setTimeout(() => {
          try {
            element.removeChild(particle);
          } catch {
            // Do nothing
          }
        }, t);
      }, 30);
    }
  };

  const updateEffectPosition = (element: HTMLElement) => {
    if (!containerRef.current || !filterRef.current) return;
    const containerRect = containerRef.current.getBoundingClientRect();
    const pos = element.getBoundingClientRect();

    const styles = {
      left: `${pos.x - containerRect.x}px`,
      top: `${pos.y - containerRect.y}px`,
      width: `${pos.width}px`,
      height: `${pos.height}px`
    };
    Object.assign(filterRef.current.style, styles);
  };

  const handleNavHover = (e: React.MouseEvent<HTMLAnchorElement> | React.FocusEvent<HTMLAnchorElement>) => {
    const aEl = e.currentTarget;
    updateEffectPosition(aEl);

    if (filterRef.current) {
      const particles = filterRef.current.querySelectorAll('.particle');
      particles.forEach(p => filterRef.current.removeChild(p));
      
      filterRef.current.classList.remove('active');
      void filterRef.current.offsetWidth;
      filterRef.current.classList.add('active');
      makeParticles(filterRef.current);
    }
  };

  const handleNavLeave = () => {
    const currIndex = navLinks.findIndex(l => l.path === location.pathname);
    const validIndex = currIndex !== -1 ? currIndex : 0;
    const activeA = navRef.current?.querySelectorAll('a.nav-item')[validIndex] as HTMLElement;
    
    if (activeA) {
      updateEffectPosition(activeA);
      if (filterRef.current) {
        filterRef.current.classList.remove('active');
        void filterRef.current.offsetWidth;
        filterRef.current.classList.add('active');
      }
    }
  };

  useEffect(() => {
    if (!navRef.current || !containerRef.current) return;
    const currIndex = navLinks.findIndex(l => l.path === location.pathname);
    const validIndex = currIndex !== -1 ? currIndex : 0;
    setActiveIndex(validIndex);
    
    const timer = setTimeout(() => {
      const activeA = navRef.current?.querySelectorAll('a.nav-item')[validIndex] as HTMLElement;
      if (activeA) {
        updateEffectPosition(activeA);
        filterRef.current?.classList.add('active');
      }
    }, 100);

    const resizeObserver = new ResizeObserver(() => {
      const aItems = navRef.current?.querySelectorAll('a.nav-item');
      if (aItems && aItems[validIndex]) {
        updateEffectPosition(aItems[validIndex] as HTMLElement);
      }
    });

    resizeObserver.observe(containerRef.current);
    return () => {
       clearTimeout(timer);
       resizeObserver.disconnect();
    }
  }, [location.pathname]);
  // --- End Gooey Effect Logic ---

  useEffect(() => {
    lastScrollYRef.current = window.scrollY;

    const onScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY <= 50) {
        setShowNavbar(true);
        setShowBanner(false);
        lastScrollYRef.current = currentScrollY;
        return;
      }

      const scrollingDown = currentScrollY > lastScrollYRef.current + 2;
      const scrollingUp = currentScrollY < lastScrollYRef.current - 2;

      if (currentScrollY > 80 && scrollingDown) {
        setShowNavbar(false);
        setShowBanner(true);
        setMobileOpen(false);
      } else if (scrollingUp) {
        setShowNavbar(true);
        setShowBanner(false);
      }

      lastScrollYRef.current = currentScrollY;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMobileOpen(false), [location]);

  useEffect(() => {
    if (!showNavbar) {
      setMobileOpen(false);
    }
  }, [showNavbar]);

  return (
    <>
    <AnimatePresence mode="wait" initial={false}>
      {showNavbar ? (
        <motion.header
          key="white-navbar"
          initial={{ y: -24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -24, opacity: 0 }}
          transition={{ duration: 0.35, ease: "easeInOut" }}
          className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-sm border-b border-zinc-200"
        >
          <div className="container mx-auto px-4 lg:px-8">
            <div className="flex items-center justify-between h-16 lg:h-20 relative">
              <Link to="/" className="flex items-center gap-2.5 group">
                <div className="w-20 lg:w-28 relative h-full flex items-center">
                  <img
                    src={logo}
                    alt="X Elevators"
                    className="absolute top-1/2 -translate-y-1/2 -left-2 w-[120px] h-auto max-w-none object-contain transition-transform duration-300 group-hover:scale-110 drop-shadow-md z-[60]"
                  />
                </div>
                <div className="font-heading ml-4 sm:ml-6">
                  <span className="text-zinc-900 font-bold text-base lg:text-lg uppercase tracking-wider">X Elevators</span>
                  <span className="hidden sm:inline text-zinc-900 font-bold text-xs ml-1.5 uppercase tracking-wider">Pvt. Ltd.</span>
                </div>
              </Link>

              <div className="hidden lg:flex items-center gooey-nav-container" ref={containerRef} onMouseLeave={handleNavLeave}>
                <svg width="0" height="0" className="absolute pointer-events-none">
                  <filter id="gooNavFilter">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
                    <feColorMatrix in="blur" type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -9" result="gooNavFilter" />
                    <feComposite in="SourceGraphic" in2="gooNavFilter" operator="atop" />
                  </filter>
                </svg>

                <span className="effect filter" ref={filterRef} />

                <nav ref={navRef} className="flex items-center gap-0.5 relative z-10">
                  {navLinks.map((link) => (
                    <Link
                      key={link.path}
                      to={link.path}
                      onMouseEnter={handleNavHover}
                      onFocus={handleNavHover}
                      className={`nav-item px-4 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 relative group ${location.pathname === link.path
                        ? "text-primary active"
                        : "text-zinc-900 hover:text-primary"
                        }`}
                    >
                      {link.label}
                      <span className={`absolute bottom-0.5 left-1/2 -translate-x-1/2 h-0.5 bg-gradient-to-r from-primary to-gold-light rounded-full transition-all duration-400 ${location.pathname === link.path ? "w-6 opacity-100" : "w-0 opacity-0 group-hover:w-5 group-hover:opacity-100"
                        }`} />
                    </Link>
                  ))}
                </nav>
              </div>

              <div className="flex items-center gap-3 lg:gap-4">
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    setIsComingSoonOpen(true);
                  }}
                  className="hidden lg:flex items-center justify-center bg-gradient-to-r from-[#E5B84B] to-[#C9992D] text-zinc-900 px-[18px] py-[10px] rounded-full font-semibold text-sm transition-all duration-300 hover:scale-105 hover:from-[#d1a641] hover:to-[#b58726] shadow-sm"
                >
                  Design your Cabin
                </button>

                <Link
                  to="/contact"
                  className="flex items-center justify-center bg-gradient-to-r from-[#E5B84B] to-[#C9992D] text-zinc-900 px-[14px] lg:px-[18px] py-[8px] lg:py-[10px] rounded-full font-semibold text-xs lg:text-sm transition-all duration-300 hover:scale-105 hover:from-[#d1a641] hover:to-[#b58726] shadow-sm"
                >
                  Get Quote
                </Link>

                <a
                  href="tel:+919844002026"
                  className="flex items-center justify-center bg-gradient-to-r from-[#E5B84B] to-[#C9992D] text-zinc-900 w-[36px] h-[36px] lg:w-[40px] lg:h-[40px] rounded-full transition-all duration-300 hover:scale-105 hover:from-[#d1a641] hover:to-[#b58726] shadow-sm shrink-0"
                  aria-label="Call Us"
                >
                  <Phone className="w-4 h-4 lg:w-5 lg:h-5" fill="currentColor" />
                </a>

                <button
                  onClick={() => setMobileOpen(!mobileOpen)}
                  className="lg:hidden p-1.5 ml-1 text-zinc-900 hover:text-primary transition-colors duration-300"
                >
                  {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
              </div>
            </div>
          </div>

          <AnimatePresence>
            {mobileOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="lg:hidden bg-white/95 backdrop-blur-2xl border-t border-zinc-200 shadow-lg"
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
                        className={`block px-4 py-3.5 rounded-xl text-sm font-semibold transition-all ${location.pathname === link.path
                          ? "text-primary bg-primary/8"
                          : "text-zinc-900 hover:text-primary hover:bg-zinc-100"
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
                    Book Free Inspection
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.header>
      ) : (
        showBanner && (
          <motion.div
            key="yellow-cta-banner"
            initial={{ y: -24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -24, opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-[#E5B84B] to-[#C9992D] shadow-[0_8px_24px_hsl(43_66%_52%/0.28)] backdrop-blur-md"
          >
            <div className="mx-auto px-4 lg:px-8 py-3 text-center rounded-b-2xl">
              <Link
                to="/contact"
                className="block text-zinc-900 text-sm sm:text-base font-semibold tracking-tight"
              >
                🏗️ Get a Free Site Inspection — Talk to our elevator engineers today!
              </Link>
            </div>
          </motion.div>
        )
      )}
    </AnimatePresence>
    <ComingSoonModal isOpen={isComingSoonOpen} onClose={() => setIsComingSoonOpen(false)} />
    </>
  );
};

export default Navbar;
