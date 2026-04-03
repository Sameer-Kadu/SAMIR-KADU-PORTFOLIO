"use client";
import { useEffect, useState, useCallback } from "react";
import { Briefcase, Code2, User, Mail } from "lucide-react";

const tabs = [
  { label: "About",    href: "#about",    icon: User },
  { label: "Skills",   href: "#skills",   icon: Code2 },
  { label: "Projects", href: "#projects", icon: Briefcase },
  { label: "Contact",  href: "#contact",  icon: Mail },
];

const MobileBottomNav = () => {
  const [activeTab, setActiveTab] = useState("about");

  useEffect(() => {
    const ids = tabs.map(t => t.href.substring(1));
    const onScroll = () => {
      let current = ids[0];
      ids.forEach(id => {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 200) current = id;
      });
      setActiveTab(current);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navigate = useCallback((href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <nav
      className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border-t border-gray-200 dark:border-gray-800 shadow-[0_-4px_24px_rgba(0,0,0,0.08)] dark:shadow-[0_-4px_24px_rgba(0,0,0,0.3)]"
      aria-label="Mobile navigation"
    >
      <div className="flex items-stretch pb-safe">
        {tabs.map(({ label, href, icon: Icon }) => {
          const id = href.substring(1);
          const isActive = activeTab === id;
          return (
            <button
              key={href}
              onClick={() => navigate(href)}
              aria-label={`Navigate to ${label}`}
              aria-current={isActive ? "page" : undefined}
              className="flex-1 flex flex-col items-center justify-center gap-1 py-3 relative group transition-colors duration-200"
            >
              {isActive && (
                <span className="absolute top-0 left-1/2 -translate-x-1/2 w-10 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" aria-hidden="true" />
              )}
              <Icon
                className={`w-5 h-5 transition-all duration-200 ${
                  isActive ? "text-blue-600 dark:text-blue-400 scale-110" : "text-gray-400 dark:text-gray-500 group-hover:text-gray-600 dark:group-hover:text-gray-300"
                }`}
                strokeWidth={isActive ? 2.5 : 1.8}
              />
              <span className={`text-[10px] font-semibold leading-none transition-colors duration-200 ${
                isActive ? "text-blue-600 dark:text-blue-400" : "text-gray-400 dark:text-gray-500 group-hover:text-gray-600 dark:group-hover:text-gray-300"
              }`}>
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default MobileBottomNav;
