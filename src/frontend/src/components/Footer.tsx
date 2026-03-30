import { Facebook, Instagram } from "lucide-react";
import { SiX } from "react-icons/si";

const portfolioLinks = [
  { label: "Weddings", href: "#portfolio" },
  { label: "Portraits", href: "#portfolio" },
  { label: "Landscapes", href: "#portfolio" },
  { label: "Events", href: "#portfolio" },
  { label: "Commercial", href: "#portfolio" },
];

const quickLinks = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
  { label: "Book a Session", href: "#contact" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  const handleClick = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer style={{ background: "oklch(0.11 0.002 260)" }}>
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-3 gap-12 pb-12 border-b border-[oklch(0.22_0.003_260)]">
          {/* Col 1: Brand & Contact */}
          <div>
            <h3 className="font-serif text-white text-xl font-semibold tracking-widest uppercase mb-1">
              Alex Morgan
            </h3>
            <p className="text-[10px] font-sans uppercase tracking-[0.3em] text-[oklch(0.68_0.10_75)] mb-6">
              Photography
            </p>
            <div className="space-y-3 mb-8">
              <p className="text-[oklch(0.60_0_0)] font-sans text-sm">
                hello@alexmorganphoto.com
              </p>
              <p className="text-[oklch(0.60_0_0)] font-sans text-sm">
                +1 (212) 555-0147
              </p>
              <p className="text-[oklch(0.60_0_0)] font-sans text-sm">
                New York City, NY
              </p>
            </div>
            <div className="flex gap-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-[oklch(0.45_0_0)] hover:text-[oklch(0.68_0.10_75)] transition-colors duration-200"
                data-ocid="footer.link"
              >
                <Instagram size={18} />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="text-[oklch(0.45_0_0)] hover:text-[oklch(0.68_0.10_75)] transition-colors duration-200"
                data-ocid="footer.link"
              >
                <Facebook size={18} />
              </a>
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X (Twitter)"
                className="text-[oklch(0.45_0_0)] hover:text-[oklch(0.68_0.10_75)] transition-colors duration-200"
                data-ocid="footer.link"
              >
                <SiX size={16} />
              </a>
            </div>
          </div>

          {/* Col 2: Portfolio */}
          <div>
            <h4 className="text-[10px] font-sans uppercase tracking-widest text-[oklch(0.50_0_0)] mb-6">
              Portfolio
            </h4>
            <ul className="space-y-3">
              {portfolioLinks.map((link) => (
                <li key={link.label}>
                  <button
                    type="button"
                    onClick={() => handleClick(link.href)}
                    className="text-[oklch(0.60_0_0)] font-sans text-sm hover:text-[oklch(0.68_0.10_75)] transition-colors duration-200"
                    data-ocid="footer.link"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Quick Links */}
          <div>
            <h4 className="text-[10px] font-sans uppercase tracking-widest text-[oklch(0.50_0_0)] mb-6">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <button
                    type="button"
                    onClick={() => handleClick(link.href)}
                    className="text-[oklch(0.60_0_0)] font-sans text-sm hover:text-[oklch(0.68_0.10_75)] transition-colors duration-200"
                    data-ocid="footer.link"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Copyright bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[oklch(0.38_0_0)] font-sans text-xs">
            © {year} Alex Morgan Photography. All rights reserved.
          </p>
          <p className="text-[oklch(0.38_0_0)] font-sans text-xs">
            Built with ❤️ using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[oklch(0.68_0.10_75)] hover:underline"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
