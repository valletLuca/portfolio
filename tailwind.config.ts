import type { Config } from "tailwindcss";

/**
 * Toutes les couleurs pointent vers les CSS custom properties
 * définies dans src/styles/palette.css — aucune couleur en dur ici.
 */
const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        surface: "var(--color-surface)",
        "surface-alt": "var(--color-surface-alt)",
        accent: "var(--color-accent)",
        "accent-soft": "var(--color-accent-soft)",
        primary: "var(--color-primary)",
        "primary-soft": "var(--color-primary-soft)",
        deep: "var(--color-deep)",
        "deep-warm": "var(--color-deep-warm)",
        blood: "var(--color-blood)",
        ink: "var(--color-text)",
        "ink-muted": "var(--color-text-muted)",
        edge: "var(--color-border)",
        glow: "var(--color-glow)",
        "on-deep": "var(--color-on-deep)",
        "on-deep-muted": "var(--color-on-deep-muted)",
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      boxShadow: {
        card: "0 2px 10px var(--shadow-soft)",
        "card-hover": "0 14px 32px var(--shadow-strong)",
        ember: "0 0 24px var(--color-glow), 0 0 64px var(--color-glow)",
      },
      keyframes: {
        "caret-blink": {
          "0%, 49%": { opacity: "1" },
          "50%, 100%": { opacity: "0" },
        },
        "ember-pulse": {
          "0%, 100%": { textShadow: "0 0 18px var(--color-glow), 0 0 48px var(--color-glow)" },
          "50%": { textShadow: "0 0 30px var(--color-glow), 0 0 90px var(--color-glow)" },
        },
        "float-slow": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
      animation: {
        "caret-blink": "caret-blink 1.1s step-end infinite",
        "ember-pulse": "ember-pulse 4.5s ease-in-out infinite",
        "float-slow": "float-slow 5s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
