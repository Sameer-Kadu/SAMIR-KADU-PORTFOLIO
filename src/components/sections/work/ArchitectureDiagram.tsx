"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import type { ArchitectureLayer } from "@/content/types";
import { EASE } from "@/lib/motion";

/**
 * Vertical architecture diagram.
 *
 * Each tier is a button that reveals what that tier is responsible for. Only
 * tiers that actually exist in the project data are drawn — nothing is added to
 * make the diagram look more impressive than the system was.
 */
export default function ArchitectureDiagram({ layers }: { layers: ArchitectureLayer[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <ol className="relative">
      {layers.map((layer, i) => {
        const isOpen = open === i;
        const isLast = i === layers.length - 1;

        return (
          <li key={layer.tier} className="relative">
            {/* Connector between tiers */}
            {!isLast && (
              <span
                aria-hidden="true"
                className="absolute bottom-0 left-[1.0625rem] top-9 w-px bg-line-strong"
              />
            )}

            <div className={isLast ? "" : "pb-3"}>
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                data-cursor="explore"
                className="flex w-full items-center gap-3.5 rounded-lg py-1.5 text-left transition-colors duration-fast"
              >
                <span
                  className={`relative z-10 grid h-[2.125rem] w-[2.125rem] shrink-0 place-items-center rounded-full border font-mono-tech text-[0.625rem] transition-colors duration-fast ${
                    isOpen
                      ? "border-accent bg-accent text-white"
                      : "border-line-strong bg-panel text-ink-3"
                  }`}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                <span className="min-w-0 flex-1">
                  <span className="block text-[0.9375rem] font-medium text-ink">{layer.tier}</span>
                  <span className="mt-1 flex flex-wrap gap-1.5">
                    {layer.tech.map((t) => (
                      <span
                        key={t}
                        className="rounded border border-line px-1.5 py-0.5 font-mono-tech text-[0.625rem] text-ink-3"
                      >
                        {t}
                      </span>
                    ))}
                  </span>
                </span>

                <ChevronDown
                  className={`h-4 w-4 shrink-0 text-ink-3 transition-transform duration-med ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.26, ease: EASE }}
                    className="overflow-hidden"
                  >
                    <p className="py-2 pl-[3.25rem] pr-2 text-[0.8125rem] leading-relaxed text-ink-2">
                      {layer.role}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
