import { motion } from "motion/react";

export default function Hero() {
  const handleExplore = () => {
    const el = document.querySelector("#portfolio");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const handleBook = () => {
    const el = document.querySelector("#contact");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/assets/generated/hero-wedding.dim_1920x1080.jpg')`,
        }}
      />
      {/* Dark overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to right, rgba(10,10,10,0.85) 40%, rgba(10,10,10,0.4) 100%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-24">
        <div className="max-w-2xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="section-label mb-6"
          >
            Award-Winning Photography
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="font-serif text-5xl md:text-6xl lg:text-7xl font-semibold text-white leading-[1.05] tracking-tight mb-6"
          >
            Capturing Moments
            <span className="block italic font-normal text-[oklch(0.68_0.10_75)]">
              That Last Forever
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-[oklch(0.76_0_0)] font-sans text-base md:text-lg leading-relaxed mb-10 font-light"
          >
            From intimate portraits to grand celebrations — every frame tells a
            story worth preserving. Based in New York, available worldwide.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <button
              type="button"
              onClick={handleExplore}
              className="btn-gold-filled text-[11px] px-10 py-4"
              data-ocid="hero.explore.button"
            >
              Explore My Work
            </button>
            <button
              type="button"
              onClick={handleBook}
              className="btn-gold text-[11px] px-10 py-4"
              data-ocid="hero.book.button"
            >
              Book a Session
            </button>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] font-sans uppercase tracking-widest text-[oklch(0.56_0_0)]">
          Scroll
        </span>
        <div className="w-px h-12 bg-gradient-to-b from-[oklch(0.68_0.10_75)] to-transparent" />
      </motion.div>
    </section>
  );
}
