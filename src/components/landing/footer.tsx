import { Building2 } from "lucide-react";

const footerLinks = {
  Product: [
    { label: "Features", href: "#features" },
    { label: "Workflow", href: "#workflow" },
    { label: "Analytics", href: "#" },
    { label: "Pricing", href: "#pricing" },
    { label: "Changelog", href: "#" },
  ],
  Company: [
    { label: "About", href: "#" },
    { label: "Blog", href: "#" },
    { label: "Careers", href: "#" },
    { label: "Contact", href: "#" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
    { label: "Cookie Policy", href: "#" },
    { label: "Refund Policy", href: "#" },
  ],
  Support: [
    { label: "Help Centre", href: "#" },
    { label: "Documentation", href: "#" },
    { label: "Status", href: "#" },
    { label: "Community", href: "#" },
  ],
};

function PropraMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="footer-mark-grad" x1="4" y1="2" x2="28" y2="30" gradientUnits="userSpaceOnUse">
          <stop stopColor="#C4B2FD" />
          <stop offset="0.5" stopColor="#7C5CFC" />
          <stop offset="1" stopColor="#3D2A8F" />
        </linearGradient>
      </defs>
      <path
        d="M9 5C9 3.34 10.34 2 12 2H17C22.52 2 27 6.48 27 12C27 16.5 24 19.5 21 21L13 28V13L21 19.5C23 18 24.5 15.5 24.5 12C24.5 8.13 21.37 5 17.5 5H12V28H9V5Z"
        fill="url(#footer-mark-grad)"
      />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-black/[0.06] bg-white px-4 pb-8 pt-16 dark:border-white/[0.08] dark:bg-ink-950">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:grid-cols-5">
          <div className="col-span-2 sm:col-span-3 lg:col-span-1">
            <a href="#" className="flex items-center gap-2">
              <PropraMark className="h-7 w-7" />
              <span className="text-[15px] font-semibold tracking-tight text-ink-950 dark:text-white">
                Propera
              </span>
            </a>
            <p className="mt-3 max-w-[220px] text-xs leading-relaxed text-zinc-400 dark:text-zinc-500">
              Property management that finally feels effortless. Built for Indian hostel and PG owners.
            </p>
            <div className="mt-4 flex items-center gap-1.5 text-xs text-zinc-400 dark:text-zinc-500">
              <Building2 className="h-3.5 w-3.5 text-violet-500" />
              2,400+ rooms managed
            </div>
          </div>

          {Object.entries(footerLinks).map(([group, links]) => (
            <div key={group}>
              <p className="mb-3 text-xs font-semibold text-ink-950 dark:text-white">{group}</p>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-xs text-zinc-400 transition-colors hover:text-zinc-700 dark:text-zinc-500 dark:hover:text-zinc-300"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-3 border-t border-black/[0.05] pt-6 dark:border-white/[0.06] sm:flex-row">
          <p className="text-xs text-zinc-400 dark:text-zinc-600">
            2025 Propera Technologies Pvt. Ltd. All rights reserved.
          </p>
          <p className="text-xs text-zinc-400 dark:text-zinc-600">
            Made with care in India
          </p>
        </div>
      </div>
    </footer>
  );
}