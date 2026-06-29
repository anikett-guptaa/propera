"use client";

import { Menu, Bell, Search } from "lucide-react";
import { ProfileMenu } from "./profile-menu";
import { Input } from "@/components/ui/input";

interface NavbarProps {
  onMenuClick: () => void;
  user: { name: string; email: string };
}

export function Navbar({ onMenuClick, user }: NavbarProps) {
  return (
    <header className="h-14 shrink-0 flex items-center gap-3 px-4 border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 sticky top-0 z-20">
      {/* Mobile menu toggle */}
      <button
        onClick={onMenuClick}
        className="md:hidden rounded-lg p-1.5 text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
        aria-label="Open menu"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Search */}
      <div className="flex-1 max-w-xs hidden sm:block">
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-400" />
          <Input
            type="text"
            placeholder="Search…"
            className="pl-8 h-8 text-sm bg-zinc-50 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 focus-visible:ring-zinc-300 dark:focus-visible:ring-zinc-600"
          />
        </div>
      </div>

      <div className="flex-1" />

      {/* Notifications */}
      <button className="relative rounded-lg p-1.5 text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
        <Bell className="w-4.5 h-4.5 w-[18px] h-[18px]" />
        <span className="absolute top-1 right-1 w-2 h-2 bg-blue-500 rounded-full ring-2 ring-white dark:ring-zinc-900" />
      </button>

      {/* Profile */}
      <ProfileMenu name={user.name} email={user.email} />
    </header>
  );
}