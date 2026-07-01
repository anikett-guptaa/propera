"use client";

import { Menu, Bell, Search } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

interface NavbarProps {
  onMenuClick: () => void;
  user: { name: string; email: string };
}

function Avatar({ name }: { name: string }) {
  const initials = name.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase();
  return (
    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-violet-400 to-violet-700 flex items-center justify-center shrink-0">
      <span className="text-[11px] font-semibold text-white">{initials}</span>
    </div>
  );
}

export function Navbar({ onMenuClick, user }: NavbarProps) {
  return (
    <header className="h-14 shrink-0 flex items-center gap-3 px-4 border-b border-zinc-200 dark:border-white/[0.06] bg-white dark:bg-ink-950 sticky top-0 z-20">
      <button
        onClick={onMenuClick}
        className="md:hidden rounded-lg p-1.5 text-zinc-500 hover:bg-zinc-100 dark:hover:bg-white/5 transition-colors"
        aria-label="Open menu"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Search */}
      <div className="flex-1 max-w-xs hidden sm:block">
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-400" />
          <input
            type="text"
            placeholder="Search tenants, rooms…"
            className="w-full pl-8 pr-3 h-8 text-sm rounded-lg border border-zinc-200 dark:border-white/[0.08] bg-zinc-50 dark:bg-white/[0.03] text-ink-950 dark:text-white placeholder:text-zinc-400 dark:placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-violet-300 dark:focus:ring-violet-700 focus:border-transparent transition-all"
          />
        </div>
      </div>

      <div className="flex-1" />

      <div className="flex items-center gap-1.5">
        {/* Theme toggle */}
        <ThemeToggle />

        {/* Notifications */}
        <button className="relative flex h-8 w-8 items-center justify-center rounded-lg text-zinc-500 hover:bg-zinc-100 dark:hover:bg-white/5 transition-colors">
          <Bell className="w-[18px] h-[18px]" />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-violet-500 rounded-full ring-2 ring-white dark:ring-ink-950" />
        </button>

        {/* Profile */}
        <button className="flex items-center gap-2 rounded-lg px-2 py-1.5 hover:bg-zinc-100 dark:hover:bg-white/5 transition-colors">
          <Avatar name={user.name} />
          <span className="hidden sm:block text-sm font-medium text-zinc-700 dark:text-zinc-300 max-w-[120px] truncate">
            {user.name}
          </span>
        </button>
      </div>
    </header>
  );
}