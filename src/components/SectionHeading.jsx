import { motion } from "framer-motion";

export default function SectionHeading({ eyebrow, title, subtitle }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="mb-8"
    >
      {eyebrow ? (
        <div className="mb-2 inline-flex rounded-full bg-black/5 px-3 py-1 text-xs font-semibold text-zinc-700 ring-1 ring-black/10 dark:bg-white/5 dark:text-white/70 dark:ring-white/10">
          {eyebrow}
        </div>
      ) : null}
      <h2 className="text-balance text-3xl font-extrabold tracking-tight sm:text-4xl">{title}</h2>
      {subtitle ? (
        <p className="mt-2 max-w-2xl text-sm text-zinc-700 dark:text-white/70 sm:text-base">{subtitle}</p>
      ) : null}
    </motion.div>
  );
}
