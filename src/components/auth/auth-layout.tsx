import { AuthLogo } from "./auth-logo";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex flex-col">
      {/* Top bar */}
      <header className="h-14 flex items-center px-6 border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
        <AuthLogo />
      </header>

      {/* Content */}
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-[400px]">{children}</div>
      </main>

      {/* Bottom */}
      <footer className="py-5 text-center">
        <p className="text-xs text-zinc-400 dark:text-zinc-600">
          © {new Date().getFullYear()} Propera. All rights reserved.
        </p>
      </footer>
    </div>
  );
}