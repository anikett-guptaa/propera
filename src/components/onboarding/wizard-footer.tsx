import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { LoadingButton } from "@/components/auth/loading-button";
import { Button } from "@/components/ui/button";

interface WizardFooterProps {
  backHref?: string;
  backLabel?: string;
  submitLabel: string;
  loading?: boolean;
}

export function WizardFooter({
  backHref,
  backLabel = "Back",
  submitLabel,
  loading = false,
}: WizardFooterProps) {
  return (
    <div className="flex items-center gap-3 pt-1">
      {backHref && (
        <Button
          type="button"
          variant="outline"
          className="gap-1.5 text-zinc-600 dark:text-zinc-400"
          asChild
        >
          <Link href={backHref}>
            <ArrowLeft className="w-3.5 h-3.5" />
            {backLabel}
          </Link>
        </Button>
      )}
      <LoadingButton
        type="submit"
        loading={loading}
        className="flex-1 bg-zinc-900 hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100"
      >
        {submitLabel}
      </LoadingButton>
    </div>
  );
}