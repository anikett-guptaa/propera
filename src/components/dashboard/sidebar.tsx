"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { AuthLogo } from "@/components/auth/auth-logo";
import {
  LayoutDashboard,
  Building2,
  DoorOpen,
  Users,
  FileText,
  CreditCard,
  TrendingUp,
  BarChart2,
  Settings,
  ChevronDown,
  X,
} from "lucide-react";

const navItems = [
  {
    label: "Main",
    items: [
      { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
      { href: "/dashboard/properties", label: "Properties", icon: Building2 },
      { href: "/dashboard/rooms", label: "Rooms", icon: DoorOpen },
      { href: "/dashboard/tenants", label: "Tenants", icon: Users },
      { href: "/dashboard/leases", label: "Leases", icon: FileText },
      { href: "/dashboard/payments", label: "Payments", icon: CreditCard },
      { href: "/dashboard/expenses", label: "Expenses", icon: TrendingUp },
      { href: "/dashboard/reports", label: "Reports", icon: BarChart2 },
    ],
  },
  {
    label: "Account",
    items: [
      { href: "/dashboard/settings", label: "Settings", icon: Settings },
    ],
  },
];

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

export function Sidebar({ open, onClose }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 z-30 bg-black/40 backdrop-blur-sm md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex w-[220px] flex-col bg-white dark:bg-zinc-900",
          "border-r border-zinc-200 dark:border-zinc-800",
          "transition-transform duration-200 ease-in-out",
          open ? "translate-x-0" : "-translate-x-full",
          "md:static md:translate-x-0 md:z-auto"
        )}
      >
        {/* Logo row */}
        <div className="flex h-14 items-center justify-between px-4 border-b border-zinc-200 dark:border-zinc-800 shrink-0">
          <AuthLogo />
          <button
            onClick={onClose}
            className="md:hidden rounded-md p-1 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 transition-colors"
            aria-label="Close sidebar"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Workspace selector */}
        <div className="px-3 py-3 border-b border-zinc-100 dark:border-zinc-800 shrink-0">
          <button className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors group">
            <div className="w-6 h-6 rounded-md bg-zinc-900 dark:bg-white flex items-center justify-center shrink-0">
              <Building2 className="w-3.5 h-3.5 text-white dark:text-zinc-900" />
            </div>
            <div className="flex-1 min-w-0 text-left">
              <p className="text-xs font-semibold truncate text-zinc-900 dark:text-white">
                Gupta Hostels
              </p>
              <p className="text-[11px] text-zinc-400 truncate">3 properties</p>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 shrink-0" />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-3 px-3 space-y-5">
          {navItems.map((group) => (
            <div key={group.label}>
              <p className="px-2.5 mb-1.5 text-[10px] font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
                {group.label}
              </p>
              <ul className="space-y-0.5">
                {group.items.map(({ href, label, icon: Icon }) => {
                  const active =
                    href === "/dashboard"
                      ? pathname === "/dashboard"
                      : pathname.startsWith(href);
                  return (
                    <li key={href}>
                      <Link
                        href={href}
                        onClick={onClose}
                        className={cn(
                          "flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm font-medium transition-colors",
                          active
                            ? "bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white"
                            : "text-zinc-500 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800/60 hover:text-zinc-900 dark:hover:text-white"
                        )}
                      >
                        <Icon className="w-4 h-4 shrink-0" />
                        {label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>
      </aside>
    </>
  );
}