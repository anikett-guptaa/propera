export function BackgroundGrid() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
    >
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #18181f 1px, transparent 1px), linear-gradient(to bottom, #18181f 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,transparent_20%,#fdfcff_90%)]" />
    </div>
  );
}