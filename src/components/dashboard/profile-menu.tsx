"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { LogOut, Settings, User, ChevronDown } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { cn } from "@/lib/utils";

interface ProfileMenuProps {
  name: string;
  email: string;
}

function Avatar({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div className="w-7 h-7 rounded-full bg-zinc-900 dark:bg-white flex items-center justify-center shrink-0">
      <span className="text-[11px] font-semibold text-white dark:text-zinc-900">
        {initials}
      </span>
    </div>
  );
}

export function ProfileMenu({ name, email }: ProfileMenuProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  async function handleSignOut() {
    await authClient.signOut();
    router.push("/sign-in");
  }

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 rounded-lg px-2 py-1.5 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
        aria-label="Profile menu"
      >
        <Avatar name={name} />
        <span className="hidden sm:block text-sm font-medium text-zinc-700 dark:text-zinc-300 max-w-[120px] truncate">
          {name}
        </span>
        <ChevronDown className="w-3.5 h-3.5 text-zinc-400 hidden sm:block" />
      </button>

      {open && (
        <div
          className={cn(
            "absolute right-0 top-full mt-1.5 w-56 z-50",
            "bg-white dark:bg-zinc-900 rounded-xl",
            "border border-zinc-200 dark:border-zinc-800",
            "shadow-lg shadow-zinc-100 dark:shadow-zinc-900/50",
            "py-1 overflow-hidden"
          )}
        >
          {/* User info */}
          <div className="px-3 py-2.5 border-b border-zinc-100 dark:border-zinc-800">
            <p className="text-sm font-medium text-zinc-900 dark:text-white truncate">
              {name}
            </p>
            <p className="text-xs text-zinc-400 truncate">{email}</p>
          </div>

          {/* Menu items */}
          <div className="py-1">
            <button
              onClick={() => {
                router.push("/dashboard/settings");
                setOpen(false);
              }}
              className="flex w-full items-center gap-2.5 px-3 py-2 text-sm text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-white transition-colors"
            >
              <User className="w-4 h-4" />
              Profile
            </button>
            <button
              onClick={() => {
                router.push("/dashboard/settings");
                setOpen(false);
              }}
              className="flex w-full items-center gap-2.5 px-3 py-2 text-sm text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-white transition-colors"
            >
              <Settings className="w-4 h-4" />
              Settings
            </button>
          </div>

          <div className="border-t border-zinc-100 dark:border-zinc-800 py-1">
            <button
              onClick={handleSignOut}
              className="flex w-full items-center gap-2.5 px-3 py-2 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Sign out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}