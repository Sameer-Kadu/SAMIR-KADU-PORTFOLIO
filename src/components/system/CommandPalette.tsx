"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useTheme } from "next-themes";
import {
  ArrowUpRight,
  Check,
  Copy,
  CornerDownLeft,
  FileText,
  Github,
  Linkedin,
  Mail,
  MoonStar,
  Search,
  SunMedium,
} from "lucide-react";
import { MODULES, SITE, SOCIAL } from "@/content/site";
import { scrollToModule } from "@/lib/scroll";
import { EASE } from "@/lib/motion";

type Command = {
  id: string;
  label: string;
  group: "Navigate" | "Open" | "Workspace";
  hint?: string;
  aliases?: string[];
  icon: React.ComponentType<{ className?: string }>;
  run: () => void;
  /** Keeps the palette open (e.g. theme switching, copy feedback). */
  keepOpen?: boolean;
};

const GROUP_ORDER: Command["group"][] = ["Navigate", "Open", "Workspace"];

export default function CommandPalette({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const reduceMotion = useReducedMotion();
  const { resolvedTheme, setTheme } = useTheme();
  const [query, setQuery] = useState("");
  const [cursor, setCursor] = useState(0);
  const [copied, setCopied] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const restoreFocus = useRef<Element | null>(null);

  const openExternal = useCallback((href: string) => {
    window.open(href, "_blank", "noopener,noreferrer");
  }, []);

  const commands = useMemo<Command[]>(() => {
    const nav: Command[] = MODULES.map((m) => ({
      id: `nav-${m.id}`,
      label: m.label,
      group: "Navigate",
      hint: m.index,
      aliases: [m.id, m.code],
      icon: Search,
      run: () => scrollToModule(m.id),
    }));

    return [
      ...nav,
      {
        id: "resume",
        label: "Download résumé",
        group: "Open",
        aliases: ["cv", "resume", "pdf"],
        icon: FileText,
        run: () => openExternal(SITE.resume),
      },
      {
        id: "github",
        label: "GitHub profile",
        group: "Open",
        hint: SOCIAL.githubHandle,
        aliases: ["code", "repo", "source"],
        icon: Github,
        run: () => openExternal(SOCIAL.github),
      },
      {
        id: "linkedin",
        label: "LinkedIn profile",
        group: "Open",
        hint: SOCIAL.linkedinHandle,
        aliases: ["work", "network"],
        icon: Linkedin,
        run: () => openExternal(SOCIAL.linkedin),
      },
      {
        id: "email",
        label: "Send an email",
        group: "Open",
        hint: SOCIAL.email,
        aliases: ["mail", "hire", "contact"],
        icon: Mail,
        run: () => {
          window.location.href = `mailto:${SOCIAL.email}`;
        },
      },
      {
        id: "copy-email",
        label: copied ? "Email address copied" : "Copy email address",
        group: "Workspace",
        aliases: ["clipboard"],
        icon: copied ? Check : Copy,
        keepOpen: true,
        run: () => {
          navigator.clipboard?.writeText(SOCIAL.email).then(
            () => {
              setCopied(true);
              setTimeout(() => setCopied(false), 1800);
            },
            () => undefined
          );
        },
      },
      {
        id: "theme",
        label: resolvedTheme === "dark" ? "Switch to light theme" : "Switch to dark theme",
        group: "Workspace",
        aliases: ["dark", "light", "appearance"],
        icon: resolvedTheme === "dark" ? SunMedium : MoonStar,
        keepOpen: true,
        run: () => setTheme(resolvedTheme === "dark" ? "light" : "dark"),
      },
    ];
  }, [copied, openExternal, resolvedTheme, setTheme]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    return commands.filter((c) =>
      [c.label, c.hint ?? "", ...(c.aliases ?? [])]
        .join(" ")
        .toLowerCase()
        .includes(q)
    );
  }, [commands, query]);

  // Grouped for display, but the cursor indexes the flat `results` array.
  const grouped = useMemo(() => {
    const map = new Map<Command["group"], { command: Command; index: number }[]>();
    results.forEach((command, index) => {
      const bucket = map.get(command.group) ?? [];
      bucket.push({ command, index });
      map.set(command.group, bucket);
    });
    return GROUP_ORDER.filter((g) => map.has(g)).map((g) => ({
      group: g,
      items: map.get(g)!,
    }));
  }, [results]);

  useEffect(() => setCursor(0), [query]);

  useEffect(() => {
    if (!open) {
      setQuery("");
      (restoreFocus.current as HTMLElement | null)?.focus?.();
      return;
    }
    restoreFocus.current = document.activeElement;
    const id = requestAnimationFrame(() => inputRef.current?.focus());

    const { style } = document.body;
    const previousOverflow = style.overflow;
    style.overflow = "hidden";

    return () => {
      cancelAnimationFrame(id);
      style.overflow = previousOverflow;
    };
  }, [open]);

  const select = useCallback(
    (command: Command | undefined) => {
      if (!command) return;
      command.run();
      if (!command.keepOpen) onClose();
    },
    [onClose]
  );

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      e.preventDefault();
      onClose();
      return;
    }
    if (e.key === "ArrowDown" || (e.key === "n" && e.ctrlKey)) {
      e.preventDefault();
      setCursor((c) => (results.length ? (c + 1) % results.length : 0));
      return;
    }
    if (e.key === "ArrowUp" || (e.key === "p" && e.ctrlKey)) {
      e.preventDefault();
      setCursor((c) => (results.length ? (c - 1 + results.length) % results.length : 0));
      return;
    }
    if (e.key === "Home") {
      e.preventDefault();
      setCursor(0);
      return;
    }
    if (e.key === "End") {
      e.preventDefault();
      setCursor(Math.max(0, results.length - 1));
      return;
    }
    if (e.key === "Enter") {
      e.preventDefault();
      select(results[cursor]);
    }
  };

  // Keep the highlighted row inside the scroll viewport.
  useEffect(() => {
    listRef.current
      ?.querySelector<HTMLElement>(`[data-index="${cursor}"]`)
      ?.scrollIntoView({ block: "nearest" });
  }, [cursor]);

  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <div
          className="fixed inset-0 z-[90] flex items-start justify-center px-4 pt-[12vh] sm:pt-[16vh]"
          onKeyDown={onKeyDown}
        >
          <motion.div
            className="absolute inset-0 bg-bg/70 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: EASE }}
            onClick={onClose}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -8, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -6, scale: 0.99 }}
            transition={{ duration: 0.22, ease: EASE }}
            className="relative w-full max-w-lg overflow-hidden rounded-xl border border-line-strong bg-raised shadow-float"
          >
            {/* Query row */}
            <div className="flex items-center gap-3 border-b border-line px-4">
              <Search className="h-4 w-4 shrink-0 text-ink-3" aria-hidden="true" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search sections and actions…"
                aria-label="Search commands"
                aria-controls="command-results"
                autoComplete="off"
                spellCheck={false}
                className="h-12 w-full bg-transparent text-sm text-ink outline-none placeholder:text-ink-3"
              />
              <kbd className="kbd hidden sm:inline-flex">esc</kbd>
            </div>

            {/* Results */}
            <div
              ref={listRef}
              id="command-results"
              role="listbox"
              aria-label="Commands"
              className="scroll-slim max-h-[min(22rem,50vh)] overflow-y-auto overscroll-contain p-1.5"
            >
              {results.length === 0 ? (
                <p className="px-3 py-8 text-center text-sm text-ink-3">
                  No matches for “{query}”.
                </p>
              ) : (
                grouped.map(({ group, items }) => (
                  <div key={group} className="mb-1 last:mb-0">
                    <p className="tech-label px-3 pb-1.5 pt-2.5">{group}</p>
                    {items.map(({ command, index }) => {
                      const Icon = command.icon;
                      const active = index === cursor;
                      return (
                        <button
                          key={command.id}
                          type="button"
                          role="option"
                          aria-selected={active}
                          data-index={index}
                          onMouseMove={() => setCursor(index)}
                          onClick={() => select(command)}
                          className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm transition-colors duration-fast ${
                            active ? "bg-accent/10 text-ink" : "text-ink-2 hover:bg-ink/[0.04]"
                          }`}
                        >
                          <Icon
                            className={`h-4 w-4 shrink-0 ${active ? "text-accent" : "text-ink-3"}`}
                          />
                          <span className="flex-1 truncate">{command.label}</span>
                          {command.hint && (
                            <span className="font-mono-tech hidden text-[0.6875rem] text-ink-3 xs:inline">
                              {command.hint}
                            </span>
                          )}
                          {command.group === "Open" && (
                            <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-ink-3" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                ))
              )}
            </div>

            {/* Footer legend */}
            <div className="flex items-center gap-4 border-t border-line px-4 py-2.5">
              <span className="tech-label flex items-center gap-1.5">
                <kbd className="kbd">↑</kbd>
                <kbd className="kbd">↓</kbd>
                move
              </span>
              <span className="tech-label flex items-center gap-1.5">
                <kbd className="kbd">
                  <CornerDownLeft className="h-3 w-3" />
                </kbd>
                select
              </span>
              <span className="tech-label ml-auto hidden sm:inline">
                {results.length} result{results.length === 1 ? "" : "s"}
              </span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}
