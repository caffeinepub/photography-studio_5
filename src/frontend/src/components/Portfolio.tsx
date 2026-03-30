import { motion } from "motion/react";
import type { PortfolioCategory } from "../backend.d";
import { usePortfolioItems } from "../hooks/useQueries";

function getCategoryLabel(cat: PortfolioCategory): string {
  if (cat.__kind__ === "weddings") return "Weddings";
  if (cat.__kind__ === "portraits") return "Portraits";
  if (cat.__kind__ === "landscapes") return "Landscapes";
  if (cat.__kind__ === "events") return "Events";
  if (cat.__kind__ === "commercial") return "Commercial";
  if (cat.__kind__ === "other") return cat.other;
  return "Other";
}

const fallbackItems = [
  {
    id: "wedding-1",
    title: "Eternal Vows",
    category: "Weddings",
    image: "/assets/generated/portfolio-wedding.dim_600x800.jpg",
  },
  {
    id: "portrait-1",
    title: "Grace in Light",
    category: "Portraits",
    image: "/assets/generated/portfolio-portrait.dim_600x800.jpg",
  },
  {
    id: "landscape-1",
    title: "Mountain Reverie",
    category: "Landscapes",
    image: "/assets/generated/portfolio-landscape.dim_600x800.jpg",
  },
  {
    id: "event-1",
    title: "The Grand Soirée",
    category: "Events",
    image: "/assets/generated/portfolio-event.dim_600x800.jpg",
  },
  {
    id: "wedding-2",
    title: "First Dance",
    category: "Weddings",
    image: "/assets/generated/portfolio-wedding.dim_600x800.jpg",
  },
  {
    id: "portrait-2",
    title: "Quiet Strength",
    category: "Portraits",
    image: "/assets/generated/portfolio-portrait.dim_600x800.jpg",
  },
  {
    id: "landscape-2",
    title: "Mist & Stone",
    category: "Landscapes",
    image: "/assets/generated/portfolio-landscape.dim_600x800.jpg",
  },
  {
    id: "commercial-1",
    title: "Luxury Product",
    category: "Commercial",
    image: "/assets/generated/portfolio-commercial.dim_600x800.jpg",
  },
];

export default function Portfolio() {
  const { data: items, isLoading } = usePortfolioItems();

  const displayItems =
    items && items.length > 0
      ? items.map((item, i) => ({
          id: `backend-${i}`,
          title: item.title,
          category: getCategoryLabel(item.category),
          image: fallbackItems[i % fallbackItems.length].image,
        }))
      : fallbackItems;

  return (
    <section id="portfolio" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="section-label mb-3">Selected Work</p>
          <h2 className="section-title text-[oklch(0.14_0_0)]">
            Portfolio Gallery
          </h2>
          <div className="w-16 h-px bg-[oklch(0.68_0.10_75)] mx-auto mt-6" />
        </motion.div>

        {/* Grid */}
        {isLoading ? (
          <div
            className="grid grid-cols-2 md:grid-cols-4 gap-1"
            data-ocid="portfolio.loading_state"
          >
            {Array.from({ length: 8 }, (_, i) => `sk-${i}`).map((sk) => (
              <div
                key={sk}
                className="aspect-[3/4] bg-[oklch(0.93_0_0)] animate-pulse"
              />
            ))}
          </div>
        ) : (
          <div
            className="grid grid-cols-2 md:grid-cols-4 gap-1"
            data-ocid="portfolio.list"
          >
            {displayItems.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: (i % 4) * 0.1 }}
                className="group relative overflow-hidden aspect-[3/4] cursor-pointer"
                data-ocid={`portfolio.item.${i + 1}`}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Caption overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
                  <p className="section-label text-[10px] mb-1">
                    {item.category}
                  </p>
                  <p className="font-serif text-white text-lg font-medium">
                    {item.title}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
