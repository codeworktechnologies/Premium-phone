import { motion } from "framer-motion";

export default function QuantityControl({ qty, onChange }) {
  const dec = () => onChange(Math.max(0, (Number(qty) || 0) - 1));
  const inc = () => onChange((Number(qty) || 0) + 1);

  return (
    <div className="inline-flex items-center gap-2 rounded-xl bg-black/5 p-1 ring-1 ring-black/10 dark:bg-white/5 dark:ring-white/10">
      <motion.button whileTap={{ scale: 0.98 }} className="btn-ghost px-3 py-2 text-xs" onClick={dec}>
        -
      </motion.button>
      <div className="min-w-8 text-center text-sm font-bold">{qty}</div>
      <motion.button whileTap={{ scale: 0.98 }} className="btn-ghost px-3 py-2 text-xs" onClick={inc}>
        +
      </motion.button>
    </div>
  );
}
