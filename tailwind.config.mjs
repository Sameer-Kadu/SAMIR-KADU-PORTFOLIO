/** Token-backed colour: reads the CSS variable so light/dark swap is free. */
const token = (name) => `rgb(var(--${name}) / <alpha-value>)`;

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        heading: ["var(--font-heading)", "ui-sans-serif", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      colors: {
        bg: token("bg"),
        sunken: token("bg-sunken"),
        panel: token("panel"),
        raised: token("panel-raised"),
        ink: token("text"),
        "ink-2": token("text-2"),
        "ink-3": token("text-3"),
        accent: token("accent"),
        live: token("live"),
        warn: token("warn"),
        // These vars already carry their own alpha channel.
        line: "rgb(var(--line))",
        "line-strong": "rgb(var(--line-strong))",
      },
      borderColor: {
        DEFAULT: "rgb(var(--line))",
      },
      transitionTimingFunction: {
        DEFAULT: "cubic-bezier(0.22, 1, 0.36, 1)",
        expo: "cubic-bezier(0.22, 1, 0.36, 1)",
        smooth: "cubic-bezier(0.65, 0, 0.35, 1)",
      },
      transitionDuration: {
        fast: "150ms",
        med: "320ms",
        slow: "640ms",
      },
      boxShadow: {
        panel: "var(--shadow-panel)",
        float: "var(--shadow-float)",
      },
      maxWidth: {
        shell: "78rem",
      },
      screens: {
        xs: "430px",
      },
      keyframes: {
        rise: {
          from: { opacity: "0", transform: "translate3d(0, 14px, 0)" },
          to: { opacity: "1", transform: "none" },
        },
      },
      animation: {
        rise: "rise 640ms cubic-bezier(0.22, 1, 0.36, 1) both",
      },
    },
  },
  plugins: [],
};

export default config;
