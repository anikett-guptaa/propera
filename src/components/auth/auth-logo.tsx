import Link from "next/link";
import Image from "next/image";
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
      <Image
        src="/icon.png"
        alt="Propera"
        width={32}
        height={32}
        className="h-8 w-8 object-contain transition-transform group-hover:scale-95"
      />
      <span className="text-[15px] font-semibold tracking-tight text-ink-950 dark:text-white">
        Propera
      </span>
    </Link>
  );
}