import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SectionHeading from "../components/SectionHeading.jsx";
import PhoneCard from "../components/PhoneCard.jsx";
import BrandPills from "../components/BrandPills.jsx";
import LoadingSpinner from "../components/LoadingSpinner.jsx";
import { getAllPhones } from "../data/phones.js";

export default function Shop() {
  const [brand, setBrand] = useState("All");
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);

  const phones = useMemo(() => getAllPhones(), []);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 650);
    return () => clearTimeout(t);
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return phones.filter((p) => {
      const brandOk = brand === "All" || p.brand === brand;
      const queryOk = !q || p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q);
      return brandOk && queryOk;
    });
  }, [phones, brand, query]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="container-px py-12 sm:py-16"
    >
      <SectionHeading
        eyebrow="Shop"
        title="Find your next phone"
        subtitle="Filter by brand, search quickly, and open details with smooth animations."
      />

      <div className="glass rounded-3xl p-4 shadow-glow sm:p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <BrandPills value={brand} onChange={setBrand} />
          <div className="flex items-center gap-3">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search phones..."
              className="w-full rounded-2xl bg-black/5 px-4 py-3 text-sm text-zinc-950 placeholder:text-zinc-500 ring-1 ring-black/10 outline-none focus:ring-indigo-400/30 dark:bg-white/5 dark:text-white dark:placeholder:text-white/40 dark:ring-white/10 md:w-72"
              aria-label="Search phones"
            />
          </div>
        </div>

        <div className="mt-6">
          {loading ? (
            <div className="grid place-items-center py-16">
              <LoadingSpinner label="Loading phones..." />
            </div>
          ) : (
            <AnimatePresence mode="popLayout">
              <motion.div layout className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filtered.map((phone) => (
                  <PhoneCard key={phone.id} phone={phone} />
                ))}
              </motion.div>
            </AnimatePresence>
          )}

          {!loading && filtered.length === 0 ? (
            <div className="mt-8 rounded-2xl bg-black/5 p-6 text-sm text-zinc-700 ring-1 ring-black/10 dark:bg-white/5 dark:text-white/70 dark:ring-white/10">
              No phones match your filters. Try another brand or search term.
            </div>
          ) : null}
        </div>
      </div>
    </motion.div>
  );
}
