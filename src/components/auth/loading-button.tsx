import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface LoadingButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  children: React.ReactNode;
  className?: string;
}

export function LoadingButton({
  loading = false,
  children,
  className,
  disabled,
  ...props
}: LoadingButtonProps) {
  return (
    <Button
      {...props}
      disabled={disabled || loading}
      className={cn("w-full relative", className)}
    >
      {loading && (
        <Loader2 className="w-4 h-4 animate-spin absolute left-1/2 -translate-x-1/2" />
      )}
      <span className={cn(loading && "invisible")}>{children}</span>
    </Button>
  );
}