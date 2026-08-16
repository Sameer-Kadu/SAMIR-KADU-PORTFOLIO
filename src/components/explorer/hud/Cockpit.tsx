"use client";

import { useEffect, useRef } from "react";
import { useExplorer } from "@/lib/explorer/store";

/**
 * The spacecraft canopy.
 *
 * Drawn as a single SVG rather than 3D geometry: zero draw calls, crisp at any
 * resolution, and precise art direction over the window openings. The frame is
 * one even-odd path — the outer rectangle minus the glass apertures — so the
 * mullions are implicit rather than individually positioned.
 *
 * Anchored to the bottom (`xMidYMax slice`) so the console stays welded to the
 * lower edge on every aspect ratio; ultrawide crops the canopy roof instead.
 */

const FRAME = "#080b11";
const EDGE = "#2b3646";
const LIT = "#5c98ff";

/* Window apertures, in the 1280×720 design space. */
const WINDSCREEN = "M 374 104 L 906 104 L 848 470 L 432 470 Z";
const LEFT_GLASS = "M -30 22 L 300 98 L 332 470 L -30 536 Z";
const RIGHT_GLASS = "M 1310 22 L 980 98 L 948 470 L 1310 536 Z";
const ROOF_LEFT = "M 352 -30 L 636 -30 L 636 74 L 386 74 Z";
const ROOF_RIGHT = "M 644 -30 L 928 -30 L 894 74 L 644 74 Z";

/** Outer plate, then the apertures punched through it with even-odd fill. */
const HULL = `M -40 -40 H 1320 V 760 H -40 Z ${WINDSCREEN} ${LEFT_GLASS} ${RIGHT_GLASS} ${ROOF_LEFT} ${ROOF_RIGHT}`;

export default function Cockpit() {
  const { phase, earthHovered, reducedMotion } = useExplorer();
  const shell = useRef<HTMLDivElement>(null);
  const wash = useRef<SVGRadialGradientElement>(null);
  const raf = useRef(0);

  // Parallax: the canopy shifts a few pixels *against* the view, which is what
  // makes the frame read as physically in front of the visitor rather than
  // painted on the lens. Written straight to the transform — no React state.
  useEffect(() => {
    if (reducedMotion) return;

    const target = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };

    const onMove = (e: PointerEvent) => {
      target.x = (e.clientX / window.innerWidth - 0.5) * 2;
      target.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    const tick = () => {
      current.x += (target.x - current.x) * 0.06;
      current.y += (target.y - current.y) * 0.06;
      if (shell.current) {
        shell.current.style.transform = `translate3d(${current.x * 9}px, ${current.y * 6}px, 0) scale(1.015)`;
      }
      raf.current = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    raf.current = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf.current);
    };
  }, [reducedMotion]);

  const inFlight = phase === "approach" || phase === "entry" || phase === "clouds";
  const armed = earthHovered || inFlight;

  return (
    <div
      ref={shell}
      className="pointer-events-none absolute inset-0 z-10"
      aria-hidden="true"
      style={{ willChange: "transform" }}
    >
      <svg
        viewBox="0 0 1280 720"
        preserveAspectRatio="xMidYMax slice"
        className="h-full w-full"
      >
        <defs>
          {/* Light spilling through the glass onto the interior */}
          <radialGradient ref={wash} id="ck-wash" cx="50%" cy="34%" r="62%">
            <stop offset="0%" stopColor={LIT} stopOpacity={armed ? 0.16 : 0.07} />
            <stop offset="100%" stopColor={LIT} stopOpacity="0" />
          </radialGradient>

          {/* Subtle top-lit bevel on the frame */}
          <linearGradient id="ck-bevel" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#39465a" stopOpacity="0.55" />
            <stop offset="45%" stopColor="#0d121a" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#05070b" stopOpacity="1" />
          </linearGradient>

          <linearGradient id="ck-console" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1a222e" />
            <stop offset="35%" stopColor="#0d131c" />
            <stop offset="100%" stopColor="#04060a" />
          </linearGradient>
        </defs>

        {/* ── Hull: outer plate with the glass punched out ── */}
        <path d={HULL} fill="url(#ck-bevel)" fillRule="evenodd" />
        <path d={HULL} fill={FRAME} fillRule="evenodd" opacity="0.55" />

        {/* Aperture edge highlights — the only place the frame catches light */}
        <g fill="none" stroke={EDGE} strokeWidth="1.6" opacity="0.75">
          <path d={WINDSCREEN} />
          <path d={LEFT_GLASS} />
          <path d={RIGHT_GLASS} />
          <path d={ROOF_LEFT} />
          <path d={ROOF_RIGHT} />
        </g>

        {/* Interior light wash */}
        <rect x="0" y="0" width="1280" height="720" fill="url(#ck-wash)" />

        {/* ── Roof indicator strip ── */}
        <g opacity="0.5">
          <rect x="586" y="82" width="108" height="12" rx="3" fill="#0a0e15" stroke={EDGE} strokeWidth="0.8" />
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <rect
              key={i}
              x={594 + i * 16}
              y={85}
              width="9"
              height="6"
              rx="1"
              fill={i < 4 ? LIT : "#2a3444"}
              opacity={i < 4 ? 0.7 : 0.5}
            />
          ))}
        </g>

        {/* ── Glass instrumentation ── */}
        <g
          className="transition-opacity duration-700"
          opacity={phase === "world" || phase === "landing" ? 0 : 1}
        >
          {/* Framing arcs around the central view */}
          <g fill="none" stroke={EDGE} strokeWidth="1.2" opacity="0.6">
            <path d="M 424 300 Q 408 385 434 462" />
            <path d="M 856 300 Q 872 385 846 462" />
          </g>

          {/* Pitch ladders flanking centre */}
          <g stroke={EDGE} strokeWidth="1.1" opacity="0.55">
            {[0, 1, 2, 3, 4].map((i) => (
              <g key={i}>
                <line x1="528" y1={344 + i * 26} x2={i === 2 ? 546 : 539} y2={344 + i * 26} />
                <line x1="752" y1={344 + i * 26} x2={i === 2 ? 734 : 741} y2={344 + i * 26} />
              </g>
            ))}
          </g>

          {/* Low-contrast technical labels on the glass */}
          <g
            fill="#7f93ad"
            opacity="0.45"
            fontFamily="var(--font-mono), monospace"
            fontSize="9"
            letterSpacing="1.6"
          >
            <rect x="336" y="278" width="5" height="5" fill={LIT} opacity="0.8" />
            <text x="348" y="287">HULL NOMINAL</text>
            <rect x="916" y="278" width="5" height="5" fill={LIT} opacity="0.8" />
            <text x="928" y="287">FORWARD ARRAY</text>
            <text x="348" y="452">NAV LOCK / STANDBY</text>
            <text x="928" y="452">SCAN 04 / 06</text>
          </g>
        </g>

        {/* ── Console ── */}
        <g>
          {/* Main desk */}
          <path
            d="M -40 720 L -40 560 L 210 500 L 470 476 L 810 476 L 1070 500 L 1320 560 L 1320 720 Z"
            fill="url(#ck-console)"
          />
          <path
            d="M -40 560 L 210 500 L 470 476 L 810 476 L 1070 500 L 1320 560"
            fill="none"
            stroke={EDGE}
            strokeWidth="1.4"
            opacity="0.8"
          />

          {/* Centre radar — the focal instrument */}
          <g transform="translate(640 604)">
            <circle r="74" fill="#070a10" stroke={EDGE} strokeWidth="1.2" />
            {[26, 44, 62].map((r) => (
              <circle key={r} r={r} fill="none" stroke={LIT} strokeWidth="0.8" opacity="0.28" />
            ))}
            <line x1="-74" y1="0" x2="74" y2="0" stroke={LIT} strokeWidth="0.6" opacity="0.16" />
            <line x1="0" y1="-74" x2="0" y2="74" stroke={LIT} strokeWidth="0.6" opacity="0.16" />
            {/* Sweep */}
            <path d="M 0 0 L 0 -70 A 70 70 0 0 1 46 -52 Z" fill={LIT} opacity="0.14">
              {!reducedMotion && (
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  from="0"
                  to="360"
                  dur="7s"
                  repeatCount="indefinite"
                />
              )}
            </path>
            {/* Own-ship marker */}
            <path d="M 0 -7 L 5 6 L 0 3 L -5 6 Z" fill={LIT} opacity="0.85" />
            {/* Contact — brightens the moment Earth is targeted */}
            <circle
              cx="30"
              cy="-34"
              r="3"
              fill={LIT}
              className="transition-opacity duration-500"
              opacity={armed ? 0.95 : 0.25}
            />
          </g>

          {/* Left MFD — bar readout */}
          <g transform="translate(300 536)">
            <rect width="150" height="104" rx="5" fill="#070a10" stroke={EDGE} strokeWidth="1" />
            {[0, 1, 2, 3, 4].map((i) => (
              <g key={i}>
                <rect x="12" y={16 + i * 17} width="58" height="4" rx="2" fill="#243044" />
                <rect
                  x="12"
                  y={16 + i * 17}
                  width={[46, 30, 52, 22, 38][i]}
                  height="4"
                  rx="2"
                  fill={LIT}
                  opacity="0.55"
                />
                <rect x="86" y={14 + i * 17} width={[30, 22, 26, 18, 34][i]} height="8" rx="1.5" fill="#1b2432" />
              </g>
            ))}
          </g>

          {/* Right MFD — level meters */}
          <g transform="translate(830 536)">
            <rect width="150" height="104" rx="5" fill="#070a10" stroke={EDGE} strokeWidth="1" />
            {[0, 1, 2, 3, 4, 5, 6].map((i) => (
              <rect
                key={i}
                x={14 + i * 19}
                y={92 - [52, 34, 68, 26, 58, 40, 72][i]}
                width="12"
                height={[52, 34, 68, 26, 58, 40, 72][i]}
                rx="1.5"
                fill={LIT}
                opacity={0.18 + (i % 3) * 0.12}
              />
            ))}
          </g>

          {/* Outboard switch banks, angled away toward the edges */}
          {[
            { t: "translate(60 616) skewY(-9)", n: 12 },
            { t: "translate(1040 616) skewY(9)", n: 12 },
          ].map((bank) => (
            <g key={bank.t} transform={bank.t} opacity="0.85">
              <rect width="180" height="86" rx="5" fill="#0a0e15" stroke={EDGE} strokeWidth="0.9" />
              {Array.from({ length: bank.n }).map((_, i) => (
                <rect
                  key={i}
                  x={14 + (i % 6) * 27}
                  y={18 + Math.floor(i / 6) * 30}
                  width="20"
                  height="18"
                  rx="2"
                  fill="#161e2a"
                  stroke={i % 5 === 0 ? LIT : "#202a38"}
                  strokeWidth="0.8"
                  opacity={i % 5 === 0 ? 0.9 : 0.7}
                />
              ))}
            </g>
          ))}

          {/* Lower fascia — gives the desk thickness instead of ending in void */}
          <path
            d="M -40 660 L 250 632 L 1030 632 L 1320 660 L 1320 720 L -40 720 Z"
            fill="#070a0f"
          />
          <path
            d="M -40 660 L 250 632 L 1030 632 L 1320 660"
            fill="none"
            stroke={EDGE}
            strokeWidth="1.1"
            opacity="0.55"
          />

          {/* Vent louvres across the fascia */}
          <g stroke="#1a2230" strokeWidth="2" opacity="0.75">
            {Array.from({ length: 22 }).map((_, i) => (
              <line key={i} x1={286 + i * 32} y1={648} x2={286 + i * 32} y2={676} />
            ))}
          </g>

          {/* Centre pedestal with throttle */}
          <path d="M 556 720 L 574 646 L 706 646 L 724 720 Z" fill="#0b1017" stroke={EDGE} strokeWidth="1" />
          <rect x="602" y="662" width="76" height="7" rx="3.5" fill="#1c2634" />
          <rect x="616" y="682" width="48" height="5" rx="2.5" fill="#161e29" />
          <circle cx="640" cy="700" r="6" fill="#101822" stroke={EDGE} strokeWidth="0.9" />

          {/* Coaming lip catching light from the glass */}
          <path
            d="M 210 500 L 470 476 L 810 476 L 1070 500"
            fill="none"
            stroke={LIT}
            strokeWidth="1.1"
            opacity="0.20"
          />
        </g>
      </svg>
    </div>
  );
}
