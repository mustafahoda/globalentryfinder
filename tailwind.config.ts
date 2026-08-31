import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0B1220",
        "ink-raised": "#121B2E",
        paper: "#F6F3EA",
        "paper-dim": "#EDE8D9",
        amber: "#FFB020",
        teal: "#1FA8A0",
        slate: "#4B5566",
        coral: "#FF5A5F",
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "Georgia", "serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      backgroundImage: {
        "radar-grid":
          "radial-gradient(circle at center, rgba(255,176,32,0.08) 0%, rgba(255,176,32,0) 70%)",
      },
      keyframes: {
        sweep: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        blip: {
          "0%, 100%": { opacity: "0.35", transform: "scale(0.9)" },
          "50%": { opacity: "1", transform: "scale(1.15)" },
        },
      },
      animation: {
        sweep: "sweep 6s linear infinite",
        blip: "blip 2.4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
