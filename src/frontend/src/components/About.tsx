import { motion } from "motion/react";
import { useAboutSection } from "../hooks/useQueries";

export default function About() {
  const { data: about } = useAboutSection();

  const bio =
    about?.bio ??
    "I'm Alex Morgan, a professional photographer with over a decade of experience capturing life's most meaningful moments. My work spans intimate portraits to grand weddings across four continents.\n\nMy approach is deeply personal — I believe the most powerful images emerge when subjects feel at ease and truly seen. I work quietly, patiently, and with an eye for the fleeting details that tell a complete story.\n\nBased in New York City and available for travel worldwide, I bring the same level of dedication and artistry to every project, no matter the scale.";

  const tagline = about?.tagline ?? "Every frame tells a story";
  const paragraphs = bio.split("\n\n");

  return (
    <section id="about" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left: Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="aspect-[4/5] overflow-hidden">
              <img
                src="/assets/generated/about-portrait.dim_600x800.jpg"
                alt="Alex Morgan, Photographer"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Accent line */}
            <div className="absolute -bottom-6 -left-6 w-32 h-32 border border-[oklch(0.68_0.10_75)] opacity-40" />
          </motion.div>

          {/* Right: Text */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <p className="section-label mb-4">The Artist</p>
            <h2 className="section-title text-[oklch(0.14_0_0)] mb-3">
              Alex Morgan
            </h2>
            <p className="font-serif text-lg italic text-[oklch(0.68_0.10_75)] mb-8">
              {tagline}
            </p>
            <div className="space-y-4">
              {paragraphs.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 40)}
                  className="text-[oklch(0.38_0_0)] font-sans text-base leading-relaxed font-light"
                >
                  {paragraph}
                </p>
              ))}
            </div>
            <div className="mt-10 pt-8 border-t border-[oklch(0.90_0_0)] grid grid-cols-3 gap-6">
              {[
                { value: "10+", label: "Years Experience" },
                { value: "850+", label: "Sessions" },
                { value: "40+", label: "Countries" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="font-serif text-3xl font-semibold text-[oklch(0.14_0_0)]">
                    {stat.value}
                  </p>
                  <p className="text-[oklch(0.56_0_0)] font-sans text-xs uppercase tracking-widest mt-1">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
