"use client";

import dynamic from "next/dynamic";
import type { ReactNode } from "react";
import { useExperienceMode } from "@/lib/explorer/mode";
import ExperienceSelector from "./ExperienceSelector";

/**
 * The entire 3D experience — three.js, R3F, drei, shaders — lives behind this
 * dynamic import. Visitors who stay in Engineer View never download any of it.
 */
const ExplorerExperience = dynamic(
  () => import("@/components/explorer/ExplorerExperience"),
  { ssr: false }
);

/**
 * Swaps between the two portfolio experiences.
 *
 * Engineer View stays mounted (just hidden and inert) rather than unmounting,
 * so switching back is instant and keeps scroll position. It is also always
 * what gets server-rendered, which keeps the portfolio crawlable and readable
 * by assistive technology regardless of which mode a visitor picks.
 */
export default function ExperienceShell({ children }: { children: ReactNode }) {
  const { mode, eligible } = useExperienceMode();
  const explorerActive = eligible && mode === "explorer";

  return (
    <>
      <div hidden={explorerActive} inert={explorerActive || undefined}>
        {children}
      </div>

      {explorerActive && <ExplorerExperience />}

      <ExperienceSelector />
    </>
  );
}
