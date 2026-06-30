"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

interface NavLink {
  label: string;
  href: string;
}

const navLinks: NavLink[] = [
  { label: "Product", href: "#features" },
  { label: "Workflow", href: "#workflow" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

function PropraMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="mark-grad" x1="4" y1="2" x2="28" y2="30" gradientUnits="userSpaceOnUse">
          <stop stopColor="#C4B2FD" />
          <stop offset="0.5" stopColor="#7C5CFC" />
          <stop offset="1" stopColor="#3D2A8F" />
        </linearGradient>
      </defs>
      <path
        d="M9 5C9 3.34 10.34 2 12 2H17C22.52 2 27 6.48 27 12C27 16.5 24 19.5 21 21L13 28V13L21 19.5C23 18 24.5 15.5 24.5 12C24.5 8.13 21.37 5 17.5 5H12V28H9V5Z"
        fill="url(#mark-grad)"
      />
    </svg>
  );
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4">
      <motion.div
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`flex w-full max-w-5xl items-center justify-between rounded-2xl px-4 py-2.5 transition-all duration-300 ${
          scrolled
            ? "border border-black/[0.06] bg-white/75 shadow-[0_8px_32px_-12px_rgba(124,92,252,0.18)] backdrop-blur-xl dark:border-white/10 dark:bg-ink-950/75"
            : "border border-transparent bg-transparent"
        }`}
      >
        <a href="#" className="flex items-center gap-2">
          <PropraMark className="h-7 w-7" />
          <span className="text-[15px] font-semibold tracking-tight text-ink-950 dark:text-white">
            Propera
          </span>
        </a>

        <nav className="hidden items-center gap-7 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-zinc-500 transition-colors hover:text-ink-950 dark:text-zinc-400 dark:hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <ThemeToggle />
          <a
            href="#"
            className="rounded-lg px-3.5 py-1.5 text-sm font-medium text-zinc-600 transition-colors hover:text-ink-950 dark:text-zinc-400 dark:hover:text-white"
          >
            Sign in
          </a>
          <a
            href="#"
            className="group flex items-center gap-1.5 rounded-lg bg-ink-950 px-3.5 py-1.5 text-sm font-medium text-white transition-all hover:bg-violet-700 dark:bg-white dark:text-ink-950 dark:hover:bg-violet-100"
          >
            Get started
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </a>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setMobileOpen((open) => !open)}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-zinc-600 dark:text-zinc-300"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </motion.div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute left-4 right-4 top-[68px] rounded-2xl border border-black/[0.06] bg-white/95 p-4 shadow-xl backdrop-blur-xl dark:border-white/10 dark:bg-ink-950/95 md:hidden"
          >
            <nav className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-lg px-3 py-2.5 text-sm text-zinc-600 hover:bg-zinc-50 hover:text-ink-950 dark:text-zinc-400 dark:hover:bg-white/5 dark:hover:text-white"
                >
                  {link.label}
                </a>
              ))}
            </nav>
            <div className="mt-3 flex flex-col gap-2 border-t border-black/[0.06] pt-3 dark:border-white/10">
              <a
                href="#"
                className="rounded-lg px-3 py-2.5 text-center text-sm font-medium text-zinc-600 hover:bg-zinc-50 dark:text-zinc-400 dark:hover:bg-white/5"
              >
                Sign in
              </a>
              <a
                href="#"
                className="rounded-lg bg-ink-950 px-3 py-2.5 text-center text-sm font-medium text-white dark:bg-white dark:text-ink-950"
              >
                Get started
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
