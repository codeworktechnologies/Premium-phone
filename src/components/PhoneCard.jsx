import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { formatINR } from "../utils/money.js";
import { getPhoneImageHref } from "../data/phones.js";
import { useCart } from "../context/CartContext.jsx";

export default function PhoneCard({ phone }) {
  const { addToCart } = useCart();
  const imageHref = getPhoneImageHref(phone);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="group glass overflow-hidden rounded-2xl shadow-glow"
    >
      <div className="relative">
        <img
          src={imageHref}
          alt={phone.name}
          loading="lazy"
          className="h-48 w-full object-cover transition duration-500 group-hover:scale-[1.02]"
        />
        <div className="absolute left-3 top-3 rounded-full bg-black/5 px-3 py-1 text-xs font-bold text-zinc-700 ring-1 ring-black/10 backdrop-blur dark:bg-white/10 dark:text-white/85 dark:ring-white/10">
          {phone.brand}
        </div>
      </div>
      <div className="space-y-3 p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="text-base font-extrabold">{phone.name}</div>
            <div className="mt-1 text-sm font-semibold text-indigo-700 dark:text-indigo-200">{formatINR(phone.price)}</div>
          </div>
          <button onClick={() => addToCart(phone.id)} className="btn-ghost text-xs">
            + Cart
          </button>
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs text-zinc-700 dark:text-white/70">
          <div className="rounded-xl bg-black/5 px-3 py-2 ring-1 ring-black/10 dark:bg-white/5 dark:ring-white/10">
            RAM: {phone.specs.ram}
          </div>
          <div className="rounded-xl bg-black/5 px-3 py-2 ring-1 ring-black/10 dark:bg-white/5 dark:ring-white/10">
            Storage: {phone.specs.storage}
          </div>
          <div className="rounded-xl bg-black/5 px-3 py-2 ring-1 ring-black/10 dark:bg-white/5 dark:ring-white/10">
            Camera: {phone.specs.camera}
          </div>
          <div className="rounded-xl bg-black/5 px-3 py-2 ring-1 ring-black/10 dark:bg-white/5 dark:ring-white/10">
            Battery: {phone.specs.battery}
          </div>
        </div>

        <Link to={`/product/${phone.id}`} className="btn-primary w-full">
          View Details
        </Link>
      </div>
    </motion.div>
  );
}
