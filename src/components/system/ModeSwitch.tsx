"use client";

import { Orbit, SquareTerminal } from "lucide-react";
import { useExperienceMode } from "@/lib/explorer/mode";

/**
 * Persistent two-state switch. Rendered in the Engineer View nav and again in
 * the Explorer HUD, so neither experience can trap the visitor.
 */
export default function ModeSwitch({ compact = false }: { compact?: boolean }) {
  const { mode, setMode, eligible } = useExperienceMode();

  // Nothing to switch to on phones, small tablets or machines without WebGL.
  if (!eligible) return null;

  const options = [
    { value: "engineer" as const, label: "Engineer", Icon: SquareTerminal },
    { value: "explorer" as const, label: "Explorer", Icon: Orbit },
  ];

  return (
    <div
      role="group"
      aria-label="Portfolio experience"
      className={`flex items-center gap-0.5 rounded-lg border border-line p-0.5 ${
        compact ? "bg-black/40 backdrop-blur-sm" : ""
      }`}
    >
      {options.map(({ value, label, Icon }) => {
        const active = mode === value;
        return (
          <button
            key={value}
            type="button"
            onClick={() => setMode(value)}
            aria-pressed={active}
            title={
              value === "explorer"
                ? "Enter and explore the engineering universe"
                : "Explore the portfolio as a structured engineering profile"
            }
            className={`flex h-8 items-center gap-1.5 rounded-[0.3rem] px-2.5 text-[0.75rem] font-medium transition-colors duration-fast ${
              active
                ? "bg-accent/15 text-accent"
                : compact
                  ? "text-white/50 hover:text-white/80"
                  : "text-ink-3 hover:text-ink-2"
            }`}
          >
            <Icon className="h-3.5 w-3.5" />
            <span className={compact ? "" : "hidden xl:inline"}>{label}</span>
          </button>
        );
      })}
    </div>
  );
}
