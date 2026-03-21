import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { getPhoneById, getPhoneImageHref } from "../data/phones.js";
import { formatINR } from "../utils/money.js";
import { useCart } from "../context/CartContext.jsx";
import { getWhatsAppBuyLink } from "../utils/whatsapp.js";

export default function ProductDetails() {
  const { id } = useParams();
  const phone = getPhoneById(id);
  const { addToCart } = useCart();

  if (!phone) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="container-px py-20"
      >
        <div className="glass rounded-3xl p-10 text-center shadow-glow">
          <div className="text-2xl font-extrabold">Phone not found</div>
          <p className="mt-2 text-sm text-zinc-700 dark:text-white/70">Try browsing the shop instead.</p>
          <div className="mt-6 flex justify-center gap-3">
            <Link to="/shop" className="btn-primary">
              Back to Shop
            </Link>
            <Link to="/" className="btn-secondary">
              Home
            </Link>
          </div>
        </div>
      </motion.div>
    );
  }

  const imageHref = getPhoneImageHref(phone);
  const gallery = [imageHref, imageHref, imageHref];
  const whatsappHref = getWhatsAppBuyLink({ phoneName: phone.name });

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="container-px py-10 sm:py-14"
    >
      <div className="mb-6 flex items-center justify-between">
        <Link to="/shop" className="btn-ghost">
          ← Back to Shop
        </Link>
        <Link to="/cart" className="btn-secondary">
          View Cart
        </Link>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="glass overflow-hidden rounded-3xl shadow-glow"
          >
            <img src={imageHref} alt={phone.name} className="h-[360px] w-full object-cover sm:h-[460px]" />
          </motion.div>

          <div className="grid grid-cols-3 gap-3">
            {gallery.map((src, i) => (
              <div key={i} className="glass overflow-hidden rounded-2xl shadow-glow">
                <img src={src} alt="" className="h-24 w-full object-cover" />
              </div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="space-y-6"
        >
          <div className="space-y-2">
            <div className="inline-flex rounded-full bg-black/5 px-3 py-1 text-xs font-bold text-zinc-700 ring-1 ring-black/10 dark:bg-white/5 dark:text-white/70 dark:ring-white/10">
              {phone.brand}
            </div>
            <h1 className="text-balance text-4xl font-black tracking-tight">{phone.name}</h1>
            <div className="text-2xl font-extrabold text-indigo-700 dark:text-indigo-200">{formatINR(phone.price)}</div>
          </div>

          <div className="glass rounded-3xl p-6 shadow-glow">
            <div className="text-sm font-extrabold">Specifications</div>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {[
                ["RAM", phone.specs.ram],
                ["Storage", phone.specs.storage],
                ["Camera", phone.specs.camera],
                ["Battery", phone.specs.battery],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="rounded-2xl bg-black/5 px-4 py-3 ring-1 ring-black/10 dark:bg-white/5 dark:ring-white/10"
                >
                  <div className="text-xs font-bold text-zinc-600 dark:text-white/65">{label}</div>
                  <div className="mt-1 text-sm font-extrabold">{value}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass rounded-3xl p-6 shadow-glow">
            <div className="text-sm font-extrabold">Description</div>
            <p className="mt-3 text-sm leading-relaxed text-zinc-700 dark:text-white/70">{phone.description}</p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <button className="btn-primary flex-1" onClick={() => addToCart(phone.id)}>
              Add to Cart
            </button>
            <a className="btn-secondary flex-1" href={whatsappHref} target="_blank" rel="noreferrer">
              Buy on WhatsApp
            </a>
          </div>

          <div className="text-xs text-zinc-500 dark:text-white/55">
            Tip: This opens WhatsApp with: <span className="text-zinc-700 dark:text-white/70">Hello, I want to buy {phone.name}</span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
