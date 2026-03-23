import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0a0a0f",
        foreground: "#e4e4e7",
        accent: "#00ff41",
        "accent-cyan": "#00fff0",
        "accent-magenta": "#ff00ff",
        "accent-amber": "#ffb700",
        muted: "#71717a",
        surface: "#0f0f18",
        "surface-light": "#1a1a2e",
      },
      fontFamily: {
        mono: ["var(--font-geist-mono)", "monospace"],
      },
      keyframes: {
        "counter-up": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "scroll-log": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        pulse: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
        glitch: {
          "0%": { transform: "translate(0)" },
          "20%": { transform: "translate(-3px, 3px)" },
          "40%": { transform: "translate(-3px, -3px)" },
          "60%": { transform: "translate(3px, 3px)" },
          "80%": { transform: "translate(3px, -3px)" },
          "100%": { transform: "translate(0)" },
        },
        flicker: {
          "0%, 100%": { opacity: "1" },
          "3%": { opacity: "0.4" },
          "6%": { opacity: "1" },
          "7%": { opacity: "0.4" },
          "8%": { opacity: "1" },
          "9%": { opacity: "0.4" },
          "10%": { opacity: "1" },
          "89%": { opacity: "1" },
          "90%": { opacity: "0.4" },
          "100%": { opacity: "1" },
        },
        typewriter: {
          "0%": { width: "0" },
          "100%": { width: "100%" },
        },
      },
      animation: {
        "counter-up": "counter-up 0.6s ease-out forwards",
        blink: "blink 1s step-end infinite",
        "fade-in": "fade-in 0.5s ease-out forwards",
        "scroll-log": "scroll-log 0.3s ease-out forwards",
        pulse: "pulse 2s ease-in-out infinite",
        glitch: "glitch 0.3s ease-in-out infinite",
        flicker: "flicker 4s linear infinite",
      },
    },
  },
  plugins: [],
};
export default config;
