import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import SectionHeading from "../components/SectionHeading.jsx";
import QuantityControl from "../components/QuantityControl.jsx";
import { useCart } from "../context/CartContext.jsx";
import { getAllPhones, getPhoneImageHref } from "../data/phones.js";
import { formatINR } from "../utils/money.js";

function getCartLines(itemsById, phones) {
  const byId = new Map(phones.map((p) => [p.id, p]));
  return Object.entries(itemsById)
    .map(([id, qty]) => {
      const phone = byId.get(id);
      if (!phone) return null;
      const n = Number(qty) || 0;
      return { phone, qty: n, lineTotal: n * phone.price };
    })
    .filter(Boolean);
}

export default function Cart() {
  const { items, setQty, clearCart } = useCart();
  const phones = getAllPhones();
  const lines = getCartLines(items, phones);
  const total = lines.reduce((sum, x) => sum + x.lineTotal, 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="container-px py-12 sm:py-16"
    >
      <SectionHeading
        eyebrow="Cart"
        title="Your cart"
        subtitle="Adjust quantities, review totals, and checkout. Cart is saved automatically."
      />

      {lines.length === 0 ? (
        <div className="glass rounded-3xl p-10 text-center shadow-glow">
          <div className="text-xl font-extrabold">Your cart is empty</div>
          <p className="mt-2 text-sm text-zinc-700 dark:text-white/70">Go to the shop and add your favorite phones.</p>
          <div className="mt-6 flex justify-center">
            <Link to="/shop" className="btn-primary">
              Browse Shop
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="space-y-4 lg:col-span-2">
            {lines.map(({ phone, qty, lineTotal }) => (
              <motion.div
                key={phone.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="glass rounded-3xl p-4 shadow-glow sm:p-5"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-4">
                    <img
                      src={getPhoneImageHref(phone)}
                      alt={phone.name}
                      className="h-20 w-28 rounded-2xl object-cover ring-1 ring-black/10 dark:ring-white/10"
                    />
                    <div>
                      <div className="text-sm font-bold text-zinc-600 dark:text-white/70">{phone.brand}</div>
                      <Link
                        to={`/product/${phone.id}`}
                        className="text-lg font-extrabold hover:text-indigo-700 dark:hover:text-indigo-100"
                      >
                        {phone.name}
                      </Link>
                      <div className="mt-1 text-sm text-zinc-600 dark:text-white/70">{formatINR(phone.price)} each</div>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 sm:justify-end">
                    <QuantityControl qty={qty} onChange={(next) => setQty(phone.id, next)} />
                    <div className="min-w-28 text-right text-sm font-extrabold text-indigo-700 dark:text-indigo-200">
                      {formatINR(lineTotal)}
                    </div>
                    <button className="btn-ghost text-xs" onClick={() => setQty(phone.id, 0)}>
                      Remove
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="space-y-4">
            <div className="glass rounded-3xl p-6 shadow-glow">
              <div className="text-sm font-extrabold">Order Summary</div>
              <div className="mt-4 space-y-2 text-sm text-zinc-700 dark:text-white/70">
                <div className="flex items-center justify-between">
                  <span>Items</span>
                  <span className="font-bold">{lines.reduce((a, x) => a + x.qty, 0)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Shipping</span>
                  <span className="font-bold text-emerald-700 dark:text-emerald-200">Free</span>
                </div>
                <div className="flex items-center justify-between border-t border-black/10 pt-3 dark:border-white/10">
                  <span className="font-bold">Total</span>
                  <span className="text-lg font-extrabold text-indigo-700 dark:text-indigo-200">{formatINR(total)}</span>
                </div>
              </div>

              <button className="btn-primary mt-5 w-full">Checkout</button>
              <button className="btn-secondary mt-3 w-full" onClick={clearCart}>
                Clear Cart
              </button>

              <p className="mt-3 text-xs text-zinc-500 dark:text-white/55">
                Demo checkout button - connect payments/checkout flow as needed.
              </p>
            </div>

            <div className="glass rounded-3xl p-6 shadow-glow">
              <div className="text-sm font-extrabold">Need help?</div>
              <p className="mt-2 text-sm text-zinc-700 dark:text-white/70">
                Open any phone details page and use "Buy on WhatsApp" to message.
              </p>
              <Link
                to="/shop"
                className="mt-4 inline-flex text-sm font-bold text-indigo-700 hover:text-indigo-600 dark:text-indigo-200 dark:hover:text-indigo-100"
              >
                Continue shopping →
              </Link>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}
