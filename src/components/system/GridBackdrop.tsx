/**
 * Ambient technical backdrop: a hairline measurement grid, two very soft
 * light sources, and an edge vignette. Entirely CSS — no canvas, no listeners,
 * no per-frame work. It should register as texture, never as content.
 */
export default function GridBackdrop() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
      {/* Fine grid */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgb(var(--grid)) 1px, transparent 1px), linear-gradient(90deg, rgb(var(--grid)) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />
      {/* Coarser register marks every 8 cells */}
      <div
        className="absolute inset-0 opacity-70"
        style={{
          backgroundImage:
            "linear-gradient(rgb(var(--grid)) 1px, transparent 1px), linear-gradient(90deg, rgb(var(--grid)) 1px, transparent 1px)",
          backgroundSize: "512px 512px",
        }}
      />

      {/* Soft light sources — kept below 8% so text contrast is untouched */}
      <div className="absolute -left-[10%] -top-[15%] h-[46rem] w-[46rem] rounded-full bg-accent/[0.07] blur-[140px]" />
      <div className="absolute -right-[15%] top-[35%] h-[38rem] w-[38rem] rounded-full bg-accent/[0.05] blur-[130px]" />

      {/* Vignette to settle the edges */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 90% at 50% 0%, transparent 45%, rgb(var(--bg) / 0.55) 100%)",
        }}
      />
    </div>
  );
}
