import Link from "next/link";

interface AuthFooterProps {
  text: string;
  linkText: string;
  href: string;
}

export function AuthFooter({ text, linkText, href }: AuthFooterProps) {
  return (
    <p className="text-sm text-center text-zinc-500 dark:text-zinc-400 mt-6">
      {text}{" "}
      <Link
        href={href}
        className="font-medium text-ink-950 dark:text-white underline underline-offset-4 hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors"
      >
        {linkText}
      </Link>
    </p>
  );
}