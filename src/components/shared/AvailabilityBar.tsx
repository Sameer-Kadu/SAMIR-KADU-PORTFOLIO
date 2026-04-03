"use client";
import { useState, useEffect } from "react";
import { X } from "lucide-react";

const AvailabilityBar = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const dismissed = sessionStorage.getItem("availability-bar-dismissed");
    if (!dismissed) setVisible(true);
  }, []);

  const dismiss = () => {
    sessionStorage.setItem("availability-bar-dismissed", "1");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[60] h-9 flex items-center justify-center gap-3 px-4
                 bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-600
                 dark:from-emerald-700 dark:via-teal-700 dark:to-emerald-700
                 text-white text-xs font-medium shadow-sm"
      role="banner"
    >
      <span className="relative flex h-2 w-2 flex-shrink-0" aria-hidden="true">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-60" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
      </span>
      <span className="hidden sm:inline truncate">
        Available for new opportunities &nbsp;·&nbsp; Nagpur, India &nbsp;·&nbsp; Replies within 24h
      </span>
      <span className="sm:hidden truncate">Open to opportunities · Nagpur, India</span>
      <a
        href="#contact"
        onClick={dismiss}
        className="hidden sm:inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/20 hover:bg-white/30 transition-colors duration-200 font-semibold flex-shrink-0"
      >
        Get in touch →
      </a>
      <button
        onClick={dismiss}
        className="absolute right-3 p-1 rounded-full hover:bg-white/20 transition-colors duration-200"
        aria-label="Dismiss availability bar"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};

export default AvailabilityBar;
