import { NavLink, Link } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import { useTheme } from "../context/ThemeContext.jsx";
import Logo from "./Logo.jsx";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function NavItem({ to, children, onClick }) {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        [
          "block rounded-xl px-3 py-2 text-sm font-semibold transition",
          isActive
            ? "bg-black/5 text-zinc-950 dark:bg-white/10 dark:text-white"
            : "text-zinc-700 hover:bg-black/5 hover:text-zinc-950 dark:text-white/80 dark:hover:bg-white/10 dark:hover:text-white",
        ].join(" ")
      }
    >
      {children}
    </NavLink>
  );
}

function ThemeToggleButton() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button onClick={toggleTheme} className="btn-ghost px-3">
      {theme === "dark" ? "🌙" : "☀️"}
    </button>
  );
}

export default function Navbar() {
  const { count } = useCart();
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-black/10 bg-white/70 backdrop-blur-xl dark:border-white/10 dark:bg-zinc-950/70">
      <div className="container-px flex h-16 items-center justify-between">
        
        {/* Logo */}
        <Link to="/" className="shrink-0">
          <Logo />
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-1">
          <NavItem to="/">Home</NavItem>
          <NavItem to="/shop">Shop</NavItem>
          <NavItem to="/cart">
            Cart ({count})
          </NavItem>
        </nav>

        {/* Right Side */}
        <div className="flex items-center gap-2">
          <Link to="/shop" className="btn-secondary hidden sm:inline-flex">
            Browse
          </Link>

          <ThemeToggleButton />

          {/* Mobile Menu Button */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden btn-ghost px-3"
          >
            ☰
          </button>
        </div>
      </div>

      {/* 🔥 Mobile Animated Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="md:hidden px-4 pb-4"
          >
            <div className="glass rounded-2xl p-4 shadow-glow space-y-2">
              <NavItem to="/" onClick={() => setOpen(false)}>Home</NavItem>
              <NavItem to="/shop" onClick={() => setOpen(false)}>Shop</NavItem>
              <NavItem to="/cart" onClick={() => setOpen(false)}>
                Cart ({count})
              </NavItem>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}