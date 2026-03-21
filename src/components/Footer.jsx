import { Link } from "react-router-dom";
import Logo from "./Logo.jsx";

export default function Footer() {
  return (
    <footer className="border-t border-black/10 bg-white/60 dark:border-white/10 dark:bg-zinc-950/70">
      <div className="container-px py-12">
        <div className="grid gap-10 md:grid-cols-3">
          <div className="space-y-3">
            <Logo />
            <p className="max-w-sm text-sm text-zinc-700 dark:text-white/70">
              A modern, premium phone shop UI built with React, Tailwind, Router, and Framer Motion.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 md:col-span-2 md:grid-cols-3">
            <div className="space-y-3">
              <div className="text-sm font-bold">Pages</div>
              <div className="flex flex-col gap-2 text-sm text-zinc-700 dark:text-white/70">
                <Link className="hover:text-zinc-950 dark:hover:text-white" to="/">
                  Home
                </Link>
                <Link className="hover:text-zinc-950 dark:hover:text-white" to="/shop">
                  Shop
                </Link>
                <Link className="hover:text-zinc-950 dark:hover:text-white" to="/cart">
                  Cart
                </Link>
              </div>
            </div>

            <div className="space-y-3">
              <div className="text-sm font-bold">Support</div>
              <div className="flex flex-col gap-2 text-sm text-zinc-700 dark:text-white/70">
                <a className="hover:text-zinc-950 dark:hover:text-white" href="#faq">
                  FAQ
                </a>
                <a className="hover:text-zinc-950 dark:hover:text-white" href="#newsletter">
                  Newsletter
                </a>
                <a className="hover:text-zinc-950 dark:hover:text-white" href="#brands">
                  Brands
                </a>
              </div>
            </div>

            <div className="space-y-3">
              <div className="text-sm font-bold">Social</div>
              <div className="flex flex-col gap-2 text-sm text-zinc-700 dark:text-white/70">
                <a
                  className="hover:text-zinc-950 dark:hover:text-white"
                  href="https://wa.me/?text=Hello%20SellPhone"
                  target="_blank"
                  rel="noreferrer"
                >
                  WhatsApp
                </a>
                <a className="hover:text-zinc-950 dark:hover:text-white" href="https://instagram.com" target="_blank" rel="noreferrer">
                  Instagram
                </a>
                <a className="hover:text-zinc-950 dark:hover:text-white" href="https://x.com" target="_blank" rel="noreferrer">
                  X (Twitter)
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-black/10 pt-6 text-xs text-zinc-500 dark:border-white/10 dark:text-white/55 sm:flex-row sm:items-center sm:justify-between">
          <div>© {new Date().getFullYear()} SellPhone. All rights reserved.</div>
          <div className="text-zinc-400 dark:text-white/45">Built for demo / portfolio use.</div>
        </div>
      </div>
    </footer>
  );
}
