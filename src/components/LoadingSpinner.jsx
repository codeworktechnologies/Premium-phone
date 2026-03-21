import { motion } from "framer-motion";

export default function LoadingSpinner({ label = "Loading..." }) {
  return (
    <div className="flex items-center justify-center gap-3 text-sm text-zinc-600 dark:text-white/70">
      <motion.div
        className="size-4 rounded-full border-2 border-black/15 border-t-indigo-500 dark:border-white/20 dark:border-t-indigo-400"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 0.9, ease: "linear" }}
      />
      <span>{label}</span>
    </div>
  );
}
