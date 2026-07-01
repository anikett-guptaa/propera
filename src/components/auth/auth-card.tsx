import { cn } from "@/lib/utils";

interface AuthCardProps {
  children: React.ReactNode;
  className?: string;
}

export function AuthCard({ children, className }: AuthCardProps) {
  return (
    <div
      className={cn(
        "w-full",
        "bg-white dark:bg-ink-900",
        "border border-zinc-200 dark:border-white/[0.08]",
        "rounded-2xl shadow-sm dark:shadow-none",
        "p-6 sm:p-8",
        className
      )}
    >
      {children}
    </div>
  );
}