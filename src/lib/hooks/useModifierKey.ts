"use client";

import { useEffect, useState } from "react";

/**
 * The label for the platform's shortcut modifier: "⌘" on Apple devices,
 * "Ctrl" everywhere else. The palette listens for both Meta and Ctrl + K, so
 * only the label changes.
 *
 * Starts as "Ctrl" (the server can't know the platform) and corrects itself
 * after mount on Apple devices.
 */
export function useModifierKey(): "⌘" | "Ctrl" {
  const [key, setKey] = useState<"⌘" | "Ctrl">("Ctrl");

  useEffect(() => {
    const nav = navigator as Navigator & { userAgentData?: { platform?: string } };
    const platform = nav.userAgentData?.platform || nav.platform || nav.userAgent;
    if (/mac|iphone|ipad|ipod/i.test(platform)) setKey("⌘");
  }, []);

  return key;
}
