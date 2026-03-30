import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

const navLinks = [
  { label: "Portfolio", href: "#portfolio" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[oklch(0.13_0.003_260/0.97)] backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
        {/* Brand */}
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="font-serif text-lg font-semibold tracking-widest uppercase text-white text-left"
          data-ocid="header.link"
        >
          Alex Morgan
          <span className="block text-[10px] font-sans font-medium tracking-[0.3em] text-[oklch(0.68_0.10_75)] mt-0.5">
            Photography
          </span>
        </button>

        {/* Desktop Nav */}
        <nav
          className="hidden md:flex items-center gap-10"
          aria-label="Main navigation"
        >
          {navLinks.map((link) => (
            <button
              type="button"
              key={link.label}
              onClick={() => handleNavClick(link.href)}
              className="nav-link"
              data-ocid={`header.${link.label.toLowerCase()}.link`}
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden md:block">
          <button
            type="button"
            onClick={() => handleNavClick("#contact")}
            className="btn-gold text-[11px] px-6 py-2.5"
            data-ocid="header.book_now.button"
          >
            Book Now
          </button>
        </div>

        {/* Mobile Hamburger */}
        <button
          type="button"
          className="md:hidden text-white p-1"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
          data-ocid="header.menu.toggle"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-[oklch(0.13_0.003_260)] border-t border-[oklch(0.31_0.005_210)] overflow-hidden"
          >
            <nav className="flex flex-col px-6 py-4 gap-4">
              {navLinks.map((link) => (
                <button
                  type="button"
                  key={link.label}
                  onClick={() => handleNavClick(link.href)}
                  className="nav-link text-left py-2"
                >
                  {link.label}
                </button>
              ))}
              <button
                type="button"
                onClick={() => handleNavClick("#contact")}
                className="btn-gold text-[11px] mt-2"
              >
                Book Now
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
