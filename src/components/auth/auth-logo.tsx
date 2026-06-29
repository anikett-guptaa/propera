import Link from "next/link";
import { Home } from "lucide-react";
import { cn } from "@/lib/utils";

interface AuthLogoProps {
  className?: string;
}

export function AuthLogo({ className }: AuthLogoProps) {
  return (
    <Link
      href="/"
      className={cn(
        "inline-flex items-center gap-2.5 group focus:outline-none",
        className
      )}
    >
      <div className="w-8 h-8 bg-zinc-900 dark:bg-white rounded-lg flex items-center justify-center shrink-0 transition-transform group-hover:scale-95">
        <Home className="w-4 h-4 text-white dark:text-zinc-900" />
      </div>
      <span className="text-[15px] font-semibold tracking-tight text-zinc-900 dark:text-white">
        Propera
      </span>
    </Link>
  );
}