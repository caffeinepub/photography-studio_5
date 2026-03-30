import { Check } from "lucide-react";
import { motion } from "motion/react";
import { useServicePackages } from "../hooks/useQueries";

const fallbackPackages = [
  {
    id: "essential",
    name: "Essential",
    price: "$1,200",
    description:
      "Perfect for intimate ceremonies and portrait sessions. A timeless collection of your most precious moments.",
    features: [
      "4 Hours Coverage",
      "200+ Edited Images",
      "Online Gallery",
      "Print Release",
    ],
    image: "/assets/generated/service-bg.dim_600x400.jpg",
    featured: false,
  },
  {
    id: "premium",
    name: "Premium",
    price: "$2,500",
    description:
      "Our most popular package for weddings and events. Comprehensive coverage with artistic direction throughout.",
    features: [
      "8 Hours Coverage",
      "500+ Edited Images",
      "Engagement Session",
      "Online Gallery",
      "USB Drive",
      "Print Release",
    ],
    image: "/assets/generated/service-bg.dim_600x400.jpg",
    featured: true,
  },
  {
    id: "fullday",
    name: "Full Day",
    price: "$4,000",
    description:
      "The ultimate experience for those who want every moment documented. From preparation to last dance.",
    features: [
      "12 Hours Coverage",
      "800+ Edited Images",
      "2nd Photographer",
      "Engagement Session",
      "Photo Album",
      "USB Drive",
      "Print Release",
    ],
    image: "/assets/generated/service-bg.dim_600x400.jpg",
    featured: false,
  },
];

export default function Services() {
  const { data: packages, isLoading } = useServicePackages();

  const displayPackages =
    packages && packages.length > 0
      ? packages.map((pkg, i) => ({
          id: `pkg-${i}`,
          name: pkg.name,
          price: pkg.price,
          description: pkg.description,
          features: pkg.features,
          image: fallbackPackages[i % fallbackPackages.length].image,
          featured: i === 1,
        }))
      : fallbackPackages;

  return (
    <section
      id="services"
      className="py-24"
      style={{ background: "oklch(0.13 0.003 260)" }}
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="section-label mb-3">Investment</p>
          <h2 className="section-title text-white">Collections & Packages</h2>
          <div className="w-16 h-px bg-[oklch(0.68_0.10_75)] mx-auto mt-6" />
        </motion.div>

        {/* Cards */}
        {isLoading ? (
          <div
            className="grid md:grid-cols-3 gap-6"
            data-ocid="services.loading_state"
          >
            {["a", "b", "c"].map((k) => (
              <div
                key={k}
                className="h-96 bg-[oklch(0.18_0.003_260)] animate-pulse"
              />
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-6" data-ocid="services.list">
            {displayPackages.map((pkg, i) => (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className={`flex flex-col overflow-hidden ${
                  pkg.featured
                    ? "ring-1 ring-[oklch(0.68_0.10_75)]"
                    : "ring-1 ring-[oklch(0.25_0.003_260)]"
                }`}
                data-ocid={`services.item.${i + 1}`}
              >
                {/* Image */}
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={pkg.image}
                    alt={pkg.name}
                    className="w-full h-full object-cover"
                  />
                  {pkg.featured && (
                    <div
                      className="absolute top-4 right-4 text-[9px] font-sans font-medium uppercase tracking-widest px-3 py-1.5"
                      style={{
                        background: "oklch(0.68 0.10 75)",
                        color: "oklch(0.13 0.003 260)",
                      }}
                    >
                      Most Popular
                    </div>
                  )}
                </div>

                {/* Content */}
                <div
                  className="flex flex-col flex-1 p-7"
                  style={{ background: "oklch(0.16 0.003 260)" }}
                >
                  <p className="section-label mb-2">{pkg.name}</p>
                  <p className="font-serif text-3xl font-semibold text-white mb-3">
                    {pkg.price}
                  </p>
                  <p className="text-[oklch(0.68_0_0)] font-sans text-sm leading-relaxed mb-6 font-light flex-1">
                    {pkg.description}
                  </p>
                  <ul className="space-y-2.5 mb-8">
                    {pkg.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-3">
                        <Check
                          size={12}
                          className="shrink-0"
                          style={{ color: "oklch(0.68 0.10 75)" }}
                        />
                        <span className="text-[oklch(0.76_0_0)] font-sans text-xs">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <button
                    type="button"
                    className="btn-gold text-[10px] w-full"
                    onClick={() => {
                      const el = document.querySelector("#contact");
                      if (el) el.scrollIntoView({ behavior: "smooth" });
                    }}
                    data-ocid={`services.item.${i + 1}.button`}
                  >
                    Book This Package
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
