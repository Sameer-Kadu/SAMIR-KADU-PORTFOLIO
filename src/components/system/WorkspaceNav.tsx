"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { Command, Menu, X } from "lucide-react";
import { MODULES, SITE } from "@/content/site";
import { useSectionSpy } from "@/lib/hooks/useSectionSpy";
import { scrollToModule } from "@/lib/scroll";
import { useCommandPalette } from "./CommandPaletteProvider";
import ThemeToggle from "./ThemeToggle";
import { EASE } from "@/lib/motion";

/**
 * Workspace navigation.
 *
 * Modules are numbered rather than merely named — the numbering is shared with
 * the left rail and the command palette so the whole site reads as one indexed
 * system. Always a plain, obvious nav first; the palette is an accelerator.
 */
export default function WorkspaceNav() {
  const ids = useMemo(() => MODULES.map((m) => m.id), []);
  const active = useSectionSpy(ids);
  const [menuOpen, setMenuOpen] = useState(false);
  const palette = useCommandPalette();
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 260,
    damping: 40,
    restDelta: 0.001,
  });

  const go = (id: string) => {
    setMenuOpen(false);
    scrollToModule(id);
  };

  return (
    <>
      <a
        href="#profile"
        className="sr-only left-4 top-4 z-[95] rounded-lg border border-line-strong bg-raised px-4 py-2 text-sm font-medium focus:not-sr-only focus:fixed"
      >
        Skip to content
      </a>

      <header className="fixed inset-x-0 top-0 z-50 border-b border-line glass">
        {/* Scroll progress — orientation, one hairline, no chrome */}
        <motion.div
          className="absolute inset-x-0 bottom-0 h-px origin-left bg-accent"
          style={{ scaleX: progress }}
          aria-hidden="true"
        />

        <nav aria-label="Primary" className="shell flex h-[var(--nav-h)] items-center gap-4">
          {/* Identity */}
          <button
            type="button"
            onClick={() => go("index")}
            className="tap group flex shrink-0 items-center gap-2.5 rounded-md py-1 pr-1 text-left"
            aria-label={`${SITE.name} — back to top`}
          >
            <span className="grid h-7 w-7 place-items-center rounded-md border border-line-strong font-mono text-[0.6875rem] font-semibold text-ink transition-colors duration-fast group-hover:border-accent group-hover:text-accent">
              SK
            </span>
            <span className="hidden leading-tight sm:block">
              <span className="block text-[0.8125rem] font-semibold text-ink">{SITE.name}</span>
              <span className="tech-label block pt-0.5">{SITE.role}</span>
            </span>
          </button>

          {/* Module links */}
          <ul className="ml-auto hidden items-center gap-0.5 lg:flex">
            {MODULES.map((m) => {
              const isActive = active === m.id;
              return (
                <li key={m.id}>
                  <button
                    type="button"
                    onClick={() => go(m.id)}
                    aria-current={isActive ? "true" : undefined}
                    className={`relative flex items-baseline gap-1.5 rounded-md px-2.5 py-2 text-[0.8125rem] transition-colors duration-fast ${
                      isActive ? "text-ink" : "text-ink-3 hover:text-ink-2"
                    }`}
                  >
                    <span className="font-mono-tech text-[0.625rem] opacity-70">{m.index}</span>
                    {m.label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-active"
                        transition={
                          reduceMotion ? { duration: 0 } : { duration: 0.32, ease: EASE }
                        }
                        className="absolute inset-x-2 -bottom-px h-px bg-accent"
                      />
                    )}
                  </button>
                </li>
              );
            })}
          </ul>

          <div className="ml-auto flex items-center gap-2 lg:ml-2">
            {/* Command palette trigger — discoverable without the shortcut */}
            <button
              type="button"
              onClick={palette.toggle}
              className="hidden h-9 items-center gap-2 rounded-lg border border-line px-2.5 text-ink-3 transition-colors duration-fast hover:border-line-strong hover:text-ink-2 md:flex"
              aria-label="Open command palette"
            >
              <Command className="h-3.5 w-3.5" />
              <span className="font-mono-tech text-[0.6875rem]">K</span>
            </button>

            <ThemeToggle />

            <a
              href={SITE.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost hidden h-9 px-3 text-[0.8125rem] sm:inline-flex"
              data-cursor="external"
            >
              Résumé
            </a>

            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              className="tap grid h-9 w-9 place-items-center rounded-lg border border-line text-ink-2 lg:hidden"
              aria-label="Open navigation menu"
              aria-expanded={menuOpen}
            >
              <Menu className="h-4 w-4" />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile navigation sheet — its own experience, not a squeezed desktop nav */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-[60] lg:hidden"
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <motion.button
              type="button"
              aria-label="Close navigation menu"
              onClick={() => setMenuOpen(false)}
              variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 h-full w-full cursor-default bg-bg/80 backdrop-blur-[2px]"
            />

            <motion.div
              variants={{
                hidden: { opacity: 0, y: reduceMotion ? 0 : -12 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.28, ease: EASE }}
              className="absolute inset-x-3 top-3 overflow-hidden rounded-xl border border-line-strong bg-raised shadow-float"
            >
              <div className="flex h-[var(--nav-h)] items-center justify-between border-b border-line px-4">
                <span className="tech-label">Modules</span>
                <button
                  type="button"
                  onClick={() => setMenuOpen(false)}
                  className="tap grid h-9 w-9 place-items-center rounded-lg border border-line text-ink-2"
                  aria-label="Close navigation menu"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <ul className="p-2">
                {MODULES.map((m) => {
                  const isActive = active === m.id;
                  return (
                    <li key={m.id}>
                      <button
                        type="button"
                        onClick={() => go(m.id)}
                        aria-current={isActive ? "true" : undefined}
                        className={`flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left transition-colors duration-fast ${
                          isActive ? "bg-accent/10 text-ink" : "text-ink-2"
                        }`}
                      >
                        <span
                          className={`font-mono-tech text-[0.6875rem] ${
                            isActive ? "text-accent" : "text-ink-3"
                          }`}
                        >
                          {m.index}
                        </span>
                        <span className="text-[0.9375rem] font-medium">{m.label}</span>
                        {isActive && <span className="ml-auto h-1 w-1 rounded-full bg-accent" />}
                      </button>
                    </li>
                  );
                })}
              </ul>

              <div className="grid grid-cols-2 gap-2 border-t border-line p-3">
                <a
                  href={SITE.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-ghost"
                >
                  Résumé
                </a>
                <button type="button" onClick={() => go("contact")} className="btn btn-primary">
                  Get in touch
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
