import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        heading: ["Space Grotesk", "sans-serif"],
        body: ["DM Sans", "sans-serif"],
        sans: ["DM Sans", "sans-serif"],
      },
      colors: {
        brand: {
          50: "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          400: "#60a5fa",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
          900: "#1e3a8a",
        },
        accent: {
          400: "#818cf8",
          500: "#6366f1",
          600: "#4f46e5",
        },
        surface: {
          DEFAULT: "#0A0E1A",
          card: "#0F1625",
          border: "#1E2D45",
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "mesh-gradient":
          "radial-gradient(at 40% 20%, hsla(220,100%,56%,0.12) 0px, transparent 50%), radial-gradient(at 80% 0%, hsla(263,100%,65%,0.08) 0px, transparent 50%), radial-gradient(at 0% 50%, hsla(220,100%,56%,0.06) 0px, transparent 50%)",
        "mesh-gradient-light":
          "radial-gradient(at 40% 20%, hsla(220,100%,56%,0.06) 0px, transparent 50%), radial-gradient(at 80% 0%, hsla(263,100%,65%,0.04) 0px, transparent 50%)",
      },
      animation: {
        "gradient-x": "gradient-x 15s ease infinite",
        "fade-in-up": "fadeInUp 0.6s ease forwards",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float": "float 6s ease-in-out infinite",
        "shimmer": "shimmer 2s linear infinite",
      },
      keyframes: {
        "gradient-x": {
          "0%, 100%": { "background-position": "0% 50%" },
          "50%": { "background-position": "100% 50%" },
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        shimmer: {
          "0%": { "background-position": "-200% 0" },
          "100%": { "background-position": "200% 0" },
        },
      },
      boxShadow: {
        "glow-sm": "0 0 20px -5px rgba(37, 99, 235, 0.3)",
        "glow-md": "0 0 40px -10px rgba(37, 99, 235, 0.4)",
        "glow-lg": "0 0 60px -15px rgba(37, 99, 235, 0.5)",
        "card-dark":
          "0 1px 0 rgba(255,255,255,0.05) inset, 0 4px 32px rgba(0,0,0,0.4)",
        "card-light":
          "0 1px 3px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.06)",
      },
    },
  },
  plugins: [],
};

export default config;
