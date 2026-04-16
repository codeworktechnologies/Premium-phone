import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <div className="container-px py-24">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -12 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="glass rounded-3xl p-10 text-center shadow-glow"
      >
        <div className="text-5xl font-extrabold tracking-tight">404</div>
        <p className="mt-3 text-zinc-600 dark:text-white/70">This page doesn't exist.</p>
        <div className="mt-6 flex justify-center gap-3">
          <Link to="/" className="btn-secondary">
            Go Home
          </Link>
          <Link to="/shop" className="btn-primary">
            Shop Phones
          </Link>
        </div>
      </motion.div>
    </div>
  );
}