/* Design Tokens — Premium Dark · Georgian Red-Brown */

export const colors = {
  ink: "#EDE6E2",
  "ink-mid": "#141010",
  "ink-soft": "#9A8884",

  cream: "#F4EBE7",
  "cream-80": "rgba(244, 235, 231, 0.8)",
  "cream-50": "rgba(244, 235, 231, 0.5)",
  "cream-30": "rgba(244, 235, 231, 0.3)",

  gold: "#C49A72",
  "gold-light": "#D4AE88",
  "gold-bright": "#E8CCA8",

  wine: "#A45632",
  "wine-dark": "#5C3018",
  "wine-bright": "#C86E42",

  surface: "#080608",
  "surface-raised": "#120A0E",

  border: "rgba(244, 235, 231, 0.08)",
  "border-wine": "rgba(164, 86, 50, 0.25)",
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
  sm: "0 2px 8px rgba(0, 0, 0, 0.25)",
  md: "0 4px 20px rgba(0, 0, 0, 0.35)",
  lg: "0 12px 48px rgba(0, 0, 0, 0.45)",
  xl: "0 20px 80px rgba(0, 0, 0, 0.55)",
} as const;
