"use client";

import { useMemo, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { DOMAINS } from "@/content/domains";
import type { Domain, DomainId } from "@/content/types";
import { PROFILE } from "@/content/profile";

/** Node positions as percentages of the square canvas, plus a parallax depth. */
const POS: Record<DomainId, { x: number; y: number; depth: number }> = {
  frontend: { x: 50, y: 9, depth: 1 },
  backend: { x: 89, y: 37, depth: 0.6 },
  cloud: { x: 74, y: 86, depth: 0.85 },
  quality: { x: 26, y: 86, depth: 0.7 },
  data: { x: 11, y: 37, depth: 0.95 },
};

const CENTER = { x: 50, y: 50 };

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

/** One domain node. Owns its own parallax transforms so hooks stay top-level. */
function DomainNode({
  domain,
  active,
  onActivate,
  pointerX,
  pointerY,
  parallax,
}: {
  domain: Domain;
  active: DomainId | null;
  onActivate: (id: DomainId | null) => void;
  pointerX: MotionValue<number>;
  pointerY: MotionValue<number>;
  parallax: boolean;
}) {
  const pos = POS[domain.id];
  const x = useTransform(pointerX, (v) => v * 10 * pos.depth);
  const y = useTransform(pointerY, (v) => v * 10 * pos.depth);

  const isActive = active === domain.id;
  const dimmed = active !== null && !isActive;

  return (
    <motion.div
      className="absolute -translate-x-1/2 -translate-y-1/2"
      style={{
        left: `${pos.x}%`,
        top: `${pos.y}%`,
        ...(parallax ? { x, y } : null),
      }}
    >
      <button
        type="button"
        onPointerEnter={() => onActivate(domain.id)}
        onFocus={() => onActivate(domain.id)}
        onBlur={() => onActivate(null)}
        onClick={() => onActivate(isActive ? null : domain.id)}
        aria-pressed={isActive}
        aria-describedby="domain-readout"
        data-cursor="explore"
        className={`flex flex-col items-center gap-1.5 rounded-lg px-2 py-1.5 transition-opacity duration-med ${
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
          className={`whitespace-nowrap text-[0.75rem] font-medium transition-colors duration-med ${
            isActive ? "text-ink" : "text-ink-3"
          }`}
        >
          {domain.label}
        </span>
      </button>
    </motion.div>
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
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const spring = { stiffness: 120, damping: 22, mass: 0.6 };
  const sx = useSpring(px, spring);
  const sy = useSpring(py, spring);
  const coreX = useTransform(sx, (v) => v * -6);
  const coreY = useTransform(sy, (v) => v * -6);

  const parallax = !reduceMotion;

  const onPointerMove = (e: React.PointerEvent) => {
    if (!parallax || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    px.set(((e.clientX - rect.left) / rect.width - 0.5) * 2);
    py.set(((e.clientY - rect.top) / rect.height - 0.5) * 2);
  };

  const activeDomain = DOMAINS.find((d) => d.id === active) ?? null;

  return (
    <div className="w-full">
      <div
        ref={ref}
        onPointerMove={onPointerMove}
        onPointerLeave={() => {
          px.set(0);
          py.set(0);
          setActive(null);
        }}
        className="relative mx-auto aspect-square w-full max-w-[27rem]"
      >
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="absolute inset-0 h-full w-full"
          aria-hidden="true"
        >
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
                strokeWidth={lit ? 1.2 : 1}
                strokeDasharray={edge.core ? undefined : "3 4"}
                className={`transition-colors duration-med ${
                  lit ? "stroke-accent" : dimmed ? "stroke-line" : "stroke-line-strong"
                }`}
                style={{ opacity: dimmed ? 0.35 : 1 }}
              />
            );
          })}

          <circle
            cx={50}
            cy={50}
            r={33}
            fill="none"
            strokeWidth={1}
            vectorEffect="non-scaling-stroke"
            strokeDasharray="2 6"
            className="stroke-line"
          />
        </svg>

        {/* Core identity node */}
        <motion.div
          style={parallax ? { x: coreX, y: coreY } : undefined}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        >
          <div className="grid h-[7.5rem] w-[7.5rem] place-items-center rounded-full border border-line-strong bg-panel/90 text-center shadow-panel">
            <div>
              <p className="font-mono-tech text-[0.625rem] uppercase tracking-[0.16em] text-accent">
                core
              </p>
              <p className="mt-1 px-3 text-[0.9375rem] font-semibold leading-tight text-ink">
                {PROFILE.name}
              </p>
              <p className="tech-label mt-1.5">{DOMAINS.length} domains</p>
            </div>
          </div>
        </motion.div>

        {DOMAINS.map((domain) => (
          <DomainNode
            key={domain.id}
            domain={domain}
            active={active}
            onActivate={setActive}
            pointerX={sx}
            pointerY={sy}
            parallax={parallax}
          />
        ))}
      </div>

      {/* Readout — reserved height so hovering never reflows the page */}
      <div
        id="domain-readout"
        aria-live="polite"
        className="mt-6 min-h-[7rem] border-t border-line pt-5"
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
