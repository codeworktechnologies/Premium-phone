import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import SectionHeading from "../components/SectionHeading.jsx";
import PhoneCard from "../components/PhoneCard.jsx";
import { getAllPhones, BRANDS } from "../data/phones.js";

function AnimatedHeroBackdrop() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute -left-24 -top-24 size-[420px] rounded-full bg-indigo-500/25 blur-3xl"
        animate={{ x: [0, 40, -10, 0], y: [0, 20, 45, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute right-[-120px] top-10 size-[520px] rounded-full bg-emerald-400/15 blur-3xl"
        animate={{ x: [0, -30, 10, 0], y: [0, 30, -20, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[-180px] left-1/3 size-[560px] rounded-full bg-pink-500/15 blur-3xl"
        animate={{ x: [0, 30, -20, 0], y: [0, -20, 25, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-white/30 to-zinc-50 dark:from-zinc-950/25 dark:via-zinc-950/50 dark:to-zinc-950" />
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div className="glass rounded-2xl px-5 py-4 shadow-glow">
      <div className="text-2xl font-extrabold">{value}</div>
      <div className="mt-1 text-xs font-semibold text-zinc-700 dark:text-white/70">{label}</div>
    </div>
  );
}

export default function Home() {
  const phones = getAllPhones();
  const featured = phones.slice(0, 4);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
    >
      <section className="relative">
        <AnimatedHeroBackdrop />
        <div className="container-px relative py-16 sm:py-20 lg:py-24">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="space-y-6"
            >
              <div className="inline-flex items-center gap-2 rounded-full bg-black/5 dark:bg-white/5 px-4 py-2 text-xs font-semibold text-zinc-700 dark:text-white/70 ring-1 ring-black/10 dark:ring-white/10">
                <span className="inline-block size-2 rounded-full bg-emerald-400 shadow-[0_0_30px_rgba(52,211,153,0.55)]" />
                Premium deals · Fast delivery · Secure checkout
              </div>

              <h1 className="text-balance text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">
                Buy Latest Smartphones
                <span className="block bg-gradient-to-r from-indigo-300 via-white to-emerald-200 bg-clip-text text-transparent">
                  with a premium shopping experience.
                </span>
              </h1>

              <p className="max-w-xl text-base text-zinc-700 dark:text-white/70 sm:text-lg">
                Explore hand-picked flagship phones with clean specs, transparent pricing, and modern UI.
              </p>

              <div className="flex flex-wrap items-center gap-3">
                <Link to="/shop" className="btn-primary">
                  Shop Now
                </Link>
                <a href="#featured" className="btn-secondary">
                  View Featured
                </a>
                <a href="#brands" className="btn-ghost">
                  Browse Brands
                </a>
              </div>

              <div className="grid grid-cols-3 gap-3 pt-4">
                <Stat value={`${phones.length}+`} label="Curated models" />
                <Stat value="2yr" label="Warranty options" />
                <Stat value="24h" label="Express dispatch" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
              className="glass relative overflow-hidden rounded-3xl p-4 shadow-glow"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-transparent to-emerald-400/10" />
              <div className="relative grid gap-3 sm:grid-cols-2">
                {featured.map((p) => (
                  <div key={p.id} className="rounded-2xl bg-black/5 dark:bg-white/5 p-3 ring-1 ring-black/10 dark:ring-white/10">
                    <div className="text-xs font-bold text-zinc-700 dark:text-white/70">{p.brand}</div>
                    <div className="mt-1 text-sm font-extrabold">{p.name}</div>
                    <div className="mt-2 text-xs text-zinc-700 dark:text-white/70">
                      {p.specs.ram} · {p.specs.storage} · {p.specs.camera}
                    </div>
                    <Link className="mt-3 inline-flex text-xs font-bold text-indigo-700 dark:text-indigo-200 hover:text-indigo-600 dark:hover:text-indigo-100" to={`/product/${p.id}`}>
                      See details →
                    </Link>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      <section id="featured" className="container-px py-16 sm:py-20">
      <SectionHeading
          eyebrow="Featured"
          title="Flagships worth your attention"
          subtitle="A quick selection of premium phones with standout performance and cameras."
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {featured.map((phone) => (
            <PhoneCard key={phone.id} phone={phone} />
          ))}
        </div>
      </section>
      <section id="brands" className="container-px py-16 sm:py-20">
      <SectionHeading
          eyebrow="Brands"
          title="Choose from top brands"
          subtitle="Filter by your favorite brand and find your next upgrade in seconds."
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {BRANDS.map((b) => (
            <motion.div
              key={b}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="glass rounded-2xl p-6 shadow-glow"
            >
              <div className="text-lg font-extrabold">{b}</div>
              <p className="mt-2 text-sm text-zinc-700 dark:text-white/70">Discover curated {b} phones with detailed specs and smooth animations.</p>
              <Link to="/shop" className="mt-4 inline-flex text-sm font-bold text-indigo-700 dark:text-indigo-200 hover:text-indigo-600 dark:hover:text-indigo-100">
                Explore in Shop →
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
      <section className="container-px py-16 sm:py-20">
      <SectionHeading
          eyebrow="Why SellPhone"
          title="Premium design, fast experience"
          subtitle="Modern UI patterns, responsive layouts, and delightful motion."
        />
        <div className="grid gap-4 lg:grid-cols-3">
          {[
            { t: "Smooth animations", d: "Framer Motion reveals, hover transitions, and subtle parallax effects." },
            { t: "Clean cart UX", d: "Cart quantities, totals, and a simple checkout CTA to keep it frictionless." },
            { t: "Brand filtering", d: "Quick brand pills in the shop for easy browsing." }
          ].map((x) => (
            <motion.div
              key={x.t}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="glass rounded-2xl p-6 shadow-glow"
            >
              <div className="text-lg font-extrabold">{x.t}</div>
              <p className="mt-2 text-sm text-zinc-700 dark:text-white/70">{x.d}</p>
            </motion.div>
          ))}
        </div>
      </section>
      <section id="newsletter" className="container-px py-16 sm:py-20">
      <SectionHeading eyebrow="Newsletter" title="Get fresh drops and deals" subtitle="Demo section to complete a long scrolling home page." />
        <div className="glass rounded-3xl p-6 shadow-glow sm:p-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <input
              className="w-full rounded-2xl bg-black/5 dark:bg-white/5 px-4 py-3 text-sm text-zinc-950 placeholder:text-zinc-500 dark:text-white dark:placeholder:text-white/40 ring-1 ring-black/10 dark:ring-white/10 outline-none focus:ring-indigo-400/30"
              placeholder="Enter your email"
              aria-label="Email"
            />
            <button className="btn-primary shrink-0 px-6 py-3">Notify Me</button>
          </div>
          <p className="mt-3 text-xs text-zinc-500 dark:text-white/55">No spam. Unsubscribe anytime.</p>
        </div>
      </section>
      <section id="faq" className="container-px py-16 sm:py-20">
      <SectionHeading eyebrow="FAQ" title="Quick answers" subtitle="A few common questions." />
        <div className="grid gap-4 md:grid-cols-2">
          {[
            { q: "How does Buy Now work?", a: "It redirects to WhatsApp with a pre-filled message for the selected phone." },
            { q: "Is the cart persisted?", a: "Yes, cart items are stored in localStorage so refresh will not clear it." },
            { q: "Can I add more products?", a: "Yes, add items in src/data/phones.json and the UI updates automatically." },
            { q: "Is this production ready?", a: "It is a high-quality UI starter. Add backend/payments and real images as needed." }
          ].map((x) => (
            <motion.details
              key={x.q}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="glass rounded-2xl p-6 shadow-glow"
            >
              <summary className="cursor-pointer text-sm font-extrabold">{x.q}</summary>
              <p className="mt-2 text-sm text-zinc-700 dark:text-white/70">{x.a}</p>
            </motion.details>
          ))}
        </div>
      </section>
      <a
        href="https://wa.me/919999999999?text=Hello%20I%20want%20to%20buy%20a%20phone"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-green-500 shadow-[0_0_20px_rgba(34,197,94,0.7)] hover:scale-110 transition-transform"
      >
        <img
          src="https://cdn-icons-png.flaticon.com/512/733/733585.png"
          alt="WhatsApp"
          className="w-8 h-8"
        />
      </a>
    </motion.div>
  );
}








