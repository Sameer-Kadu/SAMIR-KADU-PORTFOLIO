"use client";

import { Command, Github, Linkedin, Mail } from "lucide-react";
import { MODULES, SITE, SOCIAL } from "@/content/site";
import { scrollToModule } from "@/lib/scroll";
import { useCommandPalette } from "./CommandPaletteProvider";

export default function Footer() {
  const palette = useCommandPalette();
  const year = new Date().getFullYear();

  return (
    <footer className="rule-t bg-sunken/60">
      <div className="shell py-12 md:py-16">
        <div className="grid gap-10 md:grid-cols-[minmax(0,1fr)_auto] md:gap-16">
          {/* Identity */}
          <div>
            <div className="flex items-center gap-2.5">
              <span className="grid h-7 w-7 place-items-center rounded-md border border-line-strong font-mono text-[0.6875rem] font-semibold text-ink">
                SK
              </span>
              <span className="text-[0.875rem] font-semibold text-ink">{SITE.name}</span>
            </div>
            <p className="mt-4 max-w-sm text-[0.8125rem] leading-relaxed text-ink-3">
              {SITE.role} · {SITE.location}
            </p>

            <div className="mt-6 flex items-center gap-2">
              <a
                href={`mailto:${SOCIAL.email}`}
                aria-label="Email Samir Kadu"
                className="tap grid h-9 w-9 place-items-center rounded-lg border border-line text-ink-3 transition-colors duration-fast hover:border-line-strong hover:text-ink"
              >
                <Mail className="h-4 w-4" />
              </a>
              <a
                href={SOCIAL.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="external"
                aria-label="Samir Kadu on LinkedIn"
                className="tap grid h-9 w-9 place-items-center rounded-lg border border-line text-ink-3 transition-colors duration-fast hover:border-line-strong hover:text-ink"
              >
                <Linkedin className="h-4 w-4" />
              </a>
              <a
                href={SOCIAL.github}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="external"
                aria-label="Samir Kadu on GitHub"
                className="tap grid h-9 w-9 place-items-center rounded-lg border border-line text-ink-3 transition-colors duration-fast hover:border-line-strong hover:text-ink"
              >
                <Github className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Module index */}
          <nav aria-label="Footer">
            <p className="tech-label mb-4">index</p>
            <ul className="grid grid-cols-2 gap-x-10 gap-y-2 sm:grid-cols-3 md:grid-cols-2">
              {MODULES.map((m) => (
                <li key={m.id}>
                  <button
                    type="button"
                    onClick={() => scrollToModule(m.id)}
                    className="tap flex items-center gap-2 text-[0.8125rem] text-ink-2 transition-colors duration-fast hover:text-ink"
                  >
                    <span className="font-mono-tech text-[0.625rem] text-ink-3">{m.index}</span>
                    {m.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[0.75rem] text-ink-3">
            © {year} {SITE.name}. Built with Next.js, TypeScript and Tailwind CSS.
          </p>

          {/* Keyboard hint — omitted on touch layouts where it means nothing */}
          <button
            type="button"
            onClick={palette.toggle}
            className="hidden items-center gap-2 self-start text-[0.75rem] text-ink-3 transition-colors duration-fast hover:text-ink-2 md:inline-flex"
          >
            <Command className="h-3.5 w-3.5" />
            Press
            <kbd className="kbd">⌘</kbd>
            <kbd className="kbd">K</kbd>
            to navigate
          </button>
        </div>
      </div>
    </footer>
  );
}
