/* Design Tokens — Rocket Bank 2026 Style */

export const colors = {
  // Dark palette (primary)
  ink: "#0C0604",
  "ink-mid": "#1A0905",
  "ink-soft": "#2C1206",

  // Light palette
  cream: "#F5EDD6",
  "cream-80": "rgba(245,237,214,0.8)",
  "cream-50": "rgba(245,237,214,0.5)",
  "cream-30": "rgba(245,237,214,0.3)",

  // Accent
  gold: "#C4880A",
  "gold-light": "#D4A93A",
  "gold-bright": "#F0C040",

  // Red/Georgian
  red: "#8B1818",
  "red-dark": "#5C0E0E",
  "red-bright": "#C41E1E",

  // Utility
  border: "rgba(245,237,214,0.08)",
  "border-dark": "rgba(139,24,24,0.15)",
} as const;

export const typography = {
  display: {
    sizes: {
      hero: "clamp(5rem, 15vw, 16rem)",
      xl: "clamp(3rem, 8vw, 8rem)",
      lg: "clamp(2.2rem, 6vw, 5rem)",
      md: "clamp(1.8rem, 4vw, 3rem)",
    },
    family: "var(--font-display)",
    weight: 700,
    lineHeight: 0.95,
  },
  body: {
    lg: "clamp(1.1rem, 1.6vw, 1.3rem)",
    base: "1rem",
    sm: "0.875rem",
    xs: "0.75rem",
  },
  label: "0.7rem",
} as const;

export const spacing = {
  xs: "0.5rem",
  sm: "1rem",
  md: "1.5rem",
  lg: "2rem",
  xl: "3rem",
  "2xl": "4rem",
  "3xl": "6rem",
  "4xl": "8rem",
  "5xl": "10rem",
} as const;

export const animation = {
  fast: "0.2s cubic-bezier(0.22, 1, 0.36, 1)",
  normal: "0.4s cubic-bezier(0.22, 1, 0.36, 1)",
  slow: "0.7s cubic-bezier(0.22, 1, 0.36, 1)",
  slowest: "1s cubic-bezier(0.22, 1, 0.36, 1)",
  spring: { type: "spring", stiffness: 300, damping: 30 },
  springTight: { type: "spring", stiffness: 400, damping: 25 },
} as const;

export const shadows = {
  sm: "0 2px 8px rgba(0, 0, 0, 0.12)",
  md: "0 4px 20px rgba(0, 0, 0, 0.2)",
  lg: "0 12px 48px rgba(0, 0, 0, 0.35)",
  xl: "0 20px 80px rgba(0, 0, 0, 0.5)",
} as const;
