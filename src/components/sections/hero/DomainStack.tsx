"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { DOMAINS } from "@/content/domains";
import type { DomainId } from "@/content/types";
import { EASE } from "@/lib/motion";

/**
 * The mobile form of the engineering network.
 *
 * Rather than shrinking a radial diagram into something unreadable, the same
 * data becomes a tap-to-expand list: domain, one-line summary, technologies.
 * The connections are expressed as adjacency labels instead of drawn lines.
 */
export default function DomainStack() {
  const [open, setOpen] = useState<DomainId | null>(DOMAINS[0].id);

  return (
    <ul className="divide-y divide-line overflow-hidden rounded-xl border border-line bg-panel">
      {DOMAINS.map((domain) => {
        const isOpen = open === domain.id;
        const connected = domain.links
          .map((id) => DOMAINS.find((d) => d.id === id)?.label)
          .filter(Boolean);

        return (
          <li key={domain.id}>
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : domain.id)}
              aria-expanded={isOpen}
              aria-controls={`domain-panel-${domain.id}`}
              className="flex w-full items-center gap-3 px-4 py-3.5 text-left"
            >
              <span
                className={`grid h-8 w-8 shrink-0 place-items-center rounded-full border font-mono-tech text-[0.625rem] font-semibold transition-colors duration-fast ${
                  isOpen ? "border-accent bg-accent text-white" : "border-line-strong text-ink-2"
                }`}
              >
                {domain.code}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[0.9375rem] font-medium text-ink">{domain.label}</span>
                <span className="tech-label block pt-1">{domain.tech.length} technologies</span>
              </span>
              <Plus
                className={`h-4 w-4 shrink-0 text-ink-3 transition-transform duration-med ${
                  isOpen ? "rotate-45" : ""
                }`}
              />
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`domain-panel-${domain.id}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.28, ease: EASE }}
                  className="overflow-hidden"
                >
                  <div className="px-4 pb-4 pl-[3.75rem]">
                    <p className="mb-3 text-[0.8125rem] leading-relaxed text-ink-2">
                      {domain.summary}
                    </p>
                    <ul className="mb-3 flex flex-wrap gap-1.5">
                      {domain.tech.map((t) => (
                        <li
                          key={t.name}
                          className="rounded border border-line px-2 py-0.5 font-mono-tech text-[0.6875rem] text-ink-2"
                        >
                          {t.name}
                        </li>
                      ))}
                    </ul>
                    {connected.length > 0 && (
                      <p className="tech-label">connects to · {connected.join(" · ")}</p>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        );
      })}
    </ul>
  );
}
