interface AuthHeaderProps {
  title: string;
  description: string;
}

export function AuthHeader({ title, description }: AuthHeaderProps) {
  return (
    <div className="space-y-1 mb-6">
      <h1 className="text-xl font-semibold tracking-tight text-ink-950 dark:text-white">
        {title}
      </h1>
      <p className="text-sm text-zinc-500 dark:text-zinc-400">{description}</p>
    </div>
  );
}