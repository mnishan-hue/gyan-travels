import { useState, useEffect } from "react";
import { Menu, X, Bus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { id: "features", label: "Features" },
  { id: "routes", label: "Routes" },
  { id: "how-it-works", label: "How It Works" },
  { id: "faq", label: "FAQ" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      const sections = NAV_LINKS.map(l => document.getElementById(l.id));
      let current = "";
      sections.forEach(el => {
        if (el && window.scrollY >= el.offsetTop - 120) current = el.id;
      });
      setActiveSection(current);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setIsMobileMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? "py-2" : "py-3"}`}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className={`flex items-center justify-between px-5 py-3 md:px-7 rounded-2xl transition-all duration-500 ${
            isScrolled
              ? "bg-[#0a1128]/95 border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)] backdrop-blur-xl"
              : "bg-white/[0.04] border border-white/[0.07] backdrop-blur-md"
          }`}
        >
          <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 shrink-0">
              <img src="/gt-logo.png" alt="Gyan Travels" className="w-full h-full object-contain rounded-full" />
              <div className="absolute inset-0 rounded-full ring-2 ring-primary/0 group-hover:ring-primary/40 transition-all duration-300" />
            </div>
            <div className="flex flex-col leading-none">
              <span
                className="text-white text-[17px] tracking-wider font-bold"
                style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700 }}
              >
                GYAN <span className="text-primary">TRAVELS</span>
              </span>
              <span className="text-[9px] text-primary/70 italic tracking-wide">Don't worry when you travel with GT</span>
            </div>
          </button>

          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className={`relative px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                  activeSection === link.id
                    ? "text-primary"
                    : "text-white/70 hover:text-white hover:bg-white/5"
                }`}
              >
                {link.label}
                {activeSection === link.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 rounded-xl bg-primary/10 border border-primary/20"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                  />
                )}
              </button>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-400" />
              </span>
              <span className="text-green-400 text-[10px] font-semibold uppercase tracking-wide">Launching Soon</span>
            </div>

            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => scrollTo("waitlist")}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm text-primary-foreground transition-all"
              style={{ background: "linear-gradient(135deg, hsl(43,96%,52%), hsl(43,96%,65%))", boxShadow: "0 0 20px rgba(234,179,8,0.3)" }}
            >
              <Bus size={15} />
              Join Waitlist
            </motion.button>
          </div>

          <button
            className="md:hidden w-9 h-9 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </motion.div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            className="md:hidden absolute top-full left-4 right-4 mt-2 rounded-2xl border border-white/10 overflow-hidden"
            style={{ background: "#0d1b35", backdropFilter: "blur(20px)" }}
          >
            <div className="p-2">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  className="w-full text-left px-4 py-3 rounded-xl text-sm font-medium text-white/80 hover:text-white hover:bg-white/5 transition-all"
                >
                  {link.label}
                </button>
              ))}
            </div>
            <div className="border-t border-white/5 p-3">
              <button
                onClick={() => scrollTo("waitlist")}
                className="w-full py-3 rounded-xl font-bold text-sm text-primary-foreground flex items-center justify-center gap-2"
                style={{ background: "linear-gradient(135deg, hsl(43,96%,52%), hsl(43,96%,65%))" }}
              >
                <Bus size={15} />
                Join Waitlist
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
