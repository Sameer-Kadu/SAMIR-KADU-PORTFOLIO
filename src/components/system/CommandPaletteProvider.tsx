"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import dynamic from "next/dynamic";

/** The palette itself is only fetched once the visitor actually opens it. */
const CommandPalette = dynamic(() => import("./CommandPalette"), { ssr: false });

type PaletteContext = {
  open: boolean;
  setOpen: (open: boolean) => void;
  toggle: () => void;
};

const Ctx = createContext<PaletteContext | null>(null);

export function useCommandPalette(): PaletteContext {
  const ctx = useContext(Ctx);
  if (!ctx) {
    throw new Error("useCommandPalette must be used inside CommandPaletteProvider");
  }
  return ctx;
}

export default function CommandPaletteProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const toggle = useCallback(() => {
    setMounted(true);
    setOpen((v) => !v);
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        toggle();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [toggle]);

  const openPalette = useCallback((next: boolean) => {
    if (next) setMounted(true);
    setOpen(next);
  }, []);

  const value = useMemo(
    () => ({ open, setOpen: openPalette, toggle }),
    [open, openPalette, toggle]
  );

  return (
    <Ctx.Provider value={value}>
      {children}
      {mounted && <CommandPalette open={open} onClose={() => setOpen(false)} />}
    </Ctx.Provider>
  );
}
