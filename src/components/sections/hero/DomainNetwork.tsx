"use client";

import { useMemo, useState } from "react";
import { DOMAINS } from "@/content/domains";
import type { Domain, DomainId } from "@/content/types";
import { PROFILE } from "@/content/profile";

/**
 * Geometry, in percentages of the square canvas.
 *
 * Domains sit on a regular pentagon: the same radius from the core, 72° apart,
 * starting straight up. The orbit ring is drawn at that same radius so it runs
 * through every node, and each edge ends at a node's centre — the circle is
 * anchored on its point and the label hangs below it without moving it.
 */
const CENTER = { x: 50, y: 50 };
const RADIUS = 38;
const ORDER: DomainId[] = ["frontend", "backend", "cloud", "quality", "data"];

const POS = Object.fromEntries(
  ORDER.map((id, i) => {
    const angle = ((-90 + i * 72) * Math.PI) / 180;
    return [
      id,
      {
        x: +(CENTER.x + RADIUS * Math.cos(angle)).toFixed(2),
        y: +(CENTER.y + RADIUS * Math.sin(angle)).toFixed(2),
      },
    ];
  })
) as Record<DomainId, { x: number; y: number }>;

type Edge = { from: DomainId | "core"; to: DomainId; core?: boolean };

/** Edges derived from the domain graph, deduplicated by pair. */
function buildEdges(): Edge[] {
  const edges: Edge[] = DOMAINS.map((d) => ({ from: "core", to: d.id, core: true }));
  const seen = new Set<string>();

  for (const d of DOMAINS) {
    for (const other of d.links) {
      const key = [d.id, other].sort().join("|");
      if (seen.has(key)) continue;
      seen.add(key);
      edges.push({ from: d.id, to: other });
    }
  }
  return edges;
}

const point = (id: DomainId | "core") => (id === "core" ? CENTER : POS[id]);

/** One domain node: a circle centred exactly on its point, label below. */
function DomainNode({
  domain,
  active,
  onActivate,
}: {
  domain: Domain;
  active: DomainId | null;
  onActivate: (id: DomainId | null) => void;
}) {
  const pos = POS[domain.id];
  const isActive = active === domain.id;
  const dimmed = active !== null && !isActive;

  return (
    <button
      type="button"
      onPointerEnter={() => onActivate(domain.id)}
      onFocus={() => onActivate(domain.id)}
      onBlur={() => onActivate(null)}
      onClick={() => onActivate(isActive ? null : domain.id)}
      aria-pressed={isActive}
      aria-describedby="domain-readout"
      aria-label={`${domain.label}: ${domain.tech.length} technologies`}
      data-cursor="explore"
      style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
      className={`absolute h-11 w-11 -translate-x-1/2 -translate-y-1/2 rounded-full transition-opacity duration-med ${
        dimmed ? "opacity-40" : "opacity-100"
      }`}
    >
      <span
        className={`grid h-11 w-11 place-items-center rounded-full border font-mono-tech text-[0.6875rem] font-semibold transition-colors duration-med ${
          isActive
            ? "border-accent bg-accent text-white"
            : "border-line-strong bg-panel text-ink-2"
        }`}
      >
        {domain.code}
      </span>
      <span
        aria-hidden="true"
        className={`absolute left-1/2 top-full mt-1.5 -translate-x-1/2 whitespace-nowrap text-[0.75rem] font-medium transition-colors duration-med ${
          isActive ? "text-ink" : "text-ink-3"
        }`}
      >
        {domain.label}
      </span>
    </button>
  );
}

/**
 * Interactive map of the engineering domains (desktop / tablet).
 *
 * Domains are real focusable buttons layered over an SVG that draws only the
 * connections, so the diagram is keyboard operable and legible to assistive
 * technology without any ARIA gymnastics.
 */
export default function DomainNetwork() {
  const edges = useMemo(buildEdges, []);
  const [active, setActive] = useState<DomainId | null>(null);

  const activeDomain = DOMAINS.find((d) => d.id === active) ?? null;

  return (
    <div className="w-full">
      <div
        onPointerLeave={() => setActive(null)}
        className="relative mx-auto aspect-square w-full max-w-[27rem]"
      >
        <svg
          viewBox="0 0 100 100"
          className="absolute inset-0 h-full w-full overflow-visible"
          aria-hidden="true"
        >
          {/* Orbit: same radius as the nodes, so it passes through each one */}
          <circle
            cx={CENTER.x}
            cy={CENTER.y}
            r={RADIUS}
            fill="none"
            strokeWidth={1}
            vectorEffect="non-scaling-stroke"
            strokeDasharray="2 6"
            className="stroke-line"
          />

          {edges.map((edge) => {
            const a = point(edge.from);
            const b = point(edge.to);
            const lit = active !== null && (edge.from === active || edge.to === active);
            const dimmed = active !== null && !lit;

            return (
              <line
                key={`${edge.from}-${edge.to}`}
                x1={a.x}
                y1={a.y}
                x2={b.x}
                y2={b.y}
                vectorEffect="non-scaling-stroke"
                strokeWidth={lit ? 1.5 : 1}
                strokeDasharray={edge.core ? undefined : "3 4"}
                className={`transition-[stroke,opacity] duration-med ${
                  lit ? "stroke-accent" : "stroke-line-strong"
                }`}
                style={{ opacity: dimmed ? 0.3 : 1 }}
              />
            );
          })}
        </svg>

        {/* Core identity node — centred on the same point the core edges start
            from. Kept smaller than the pentagon's diagonal clearance
            (RADIUS × cos 72° ≈ 31% of the radius) so domain-to-domain links
            pass beside it rather than disappearing behind it. */}
        <div className="absolute left-1/2 top-1/2 grid h-[5.5rem] w-[5.5rem] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-line-strong bg-panel text-center shadow-panel">
          <div>
            <p className="font-mono-tech text-[0.5625rem] uppercase tracking-[0.16em] text-accent">
              core
            </p>
            <p className="mt-0.5 px-2 text-[0.8125rem] font-semibold leading-tight text-ink">
              {PROFILE.name}
            </p>
          </div>
        </div>

        {DOMAINS.map((domain) => (
          <DomainNode key={domain.id} domain={domain} active={active} onActivate={setActive} />
        ))}
      </div>

      {/* Readout — reserved height (fits the largest domain) so hovering never reflows the page */}
      <div
        id="domain-readout"
        aria-live="polite"
        className="mt-8 min-h-[11rem] border-t border-line pt-5"
      >
        {activeDomain ? (
          <div>
            <div className="mb-2 flex items-center gap-2">
              <span className="font-mono-tech text-[0.6875rem] text-accent">{activeDomain.code}</span>
              <span className="text-[0.9375rem] font-semibold text-ink">{activeDomain.label}</span>
            </div>
            <p className="mb-3 text-[0.8125rem] leading-relaxed text-ink-2">
              {activeDomain.summary}
            </p>
            <ul className="flex flex-wrap gap-1.5">
              {activeDomain.tech.map((t) => (
                <li
                  key={t.name}
                  className="rounded border border-line px-2 py-0.5 font-mono-tech text-[0.6875rem] text-ink-2"
                >
                  {t.name}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p className="text-[0.8125rem] leading-relaxed text-ink-3">
            Five domains, connected the way they are in practice. Hover or focus a node to see the
            technologies behind it.
          </p>
        )}
      </div>
    </div>
  );
}
