"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Home } from "lucide-react";
import { DESTINATIONS } from "@/lib/explorer/journey";
import { useExplorer } from "@/lib/explorer/store";
import { EASE } from "@/lib/motion";

/**
 * World map.
 *
 * Free exploration is the point, but a visitor should never have to hunt. Every
 * destination is reachable in one click here, and it doubles as the journey
 * progress indicator — visited places stay marked.
 */
export default function WorldHUD({ visited }: { visited: Set<string> }) {
  const { phase, destination, setDestination, hovered, setHovered } = useExplorer();

  return (
    <AnimatePresence>
      {phase === "world" && (
        <motion.nav
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ duration: 0.5, ease: EASE }}
          aria-label="World map"
          // Yield the right side of the screen when a content panel is open,
          // so the map stays fully reachable instead of sliding underneath it.
          className={`pointer-events-auto absolute inset-x-0 bottom-6 z-30 flex px-6 transition-all duration-500 ${
            destination ? "justify-start" : "justify-center"
          }`}
        >
          <div className="flex items-center gap-1 rounded-xl border border-white/12 bg-black/60 p-1.5 backdrop-blur-xl">
            <button
              type="button"
              onClick={() => setDestination(null)}
              aria-label="Return to the landing zone"
              className={`flex h-11 items-center gap-2 rounded-lg px-3 text-[12px] transition-colors ${
                destination === null
                  ? "bg-[#5c98ff]/15 text-[#5c98ff]"
                  : "text-white/50 hover:text-white/80"
              }`}
            >
              <Home className="h-3.5 w-3.5" />
              <span className="hidden xl:inline">Landing zone</span>
            </button>

            <span className="mx-1 h-6 w-px bg-white/10" />

            {DESTINATIONS.map((d) => {
              const active = destination === d.id;
              const seen = visited.has(d.id);
              return (
                <button
                  key={d.id}
                  type="button"
                  onClick={() => setDestination(d.id)}
                  onPointerEnter={() => setHovered(d.id)}
                  onPointerLeave={() => setHovered(null)}
                  aria-current={active ? "true" : undefined}
                  title={d.tagline}
                  className={`relative flex h-11 flex-col justify-center rounded-lg px-3 text-left transition-colors ${
                    active
                      ? "bg-[#5c98ff]/15"
                      : hovered === d.id
                        ? "bg-white/[0.06]"
                        : "hover:bg-white/[0.04]"
                  }`}
                >
                  <span
                    className={`font-mono text-[9px] tracking-[0.14em] ${
                      active ? "text-[#5c98ff]" : "text-white/35"
                    }`}
                  >
                    {d.index}
                  </span>
                  <span
                    className={`text-[12px] font-medium ${
                      active ? "text-white" : "text-white/65"
                    }`}
                  >
                    {d.name.split(" ")[0]}
                  </span>

                  {/* Visited marker */}
                  {seen && !active && (
                    <span className="absolute right-1.5 top-1.5 h-1 w-1 rounded-full bg-[#5c98ff]/60" />
                  )}
                </button>
              );
            })}
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
