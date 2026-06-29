export default function DashboardLoading() {
  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-pulse">

      {/* Header skeleton */}
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <div className="h-6 w-52 bg-zinc-200 dark:bg-zinc-800 rounded-lg" />
          <div className="h-4 w-72 bg-zinc-100 dark:bg-zinc-800/60 rounded-lg" />
        </div>
        <div className="h-8 w-32 bg-zinc-200 dark:bg-zinc-800 rounded-lg" />
      </div>

      {/* Stat cards skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 space-y-4"
          >
            <div className="flex items-start justify-between">
              <div className="w-9 h-9 bg-zinc-100 dark:bg-zinc-800 rounded-lg" />
              <div className="h-5 w-20 bg-zinc-100 dark:bg-zinc-800 rounded-full" />
            </div>
            <div className="space-y-1.5">
              <div className="h-7 w-28 bg-zinc-200 dark:bg-zinc-800 rounded-md" />
              <div className="h-4 w-36 bg-zinc-100 dark:bg-zinc-800/60 rounded-md" />
            </div>
          </div>
        ))}
      </div>

      {/* Bottom row skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 space-y-3 h-48" />
        <div className="lg:col-span-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl h-48" />
      </div>

    </div>
  );
}