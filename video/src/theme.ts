/**
 * The kata's design tokens, copied from `front/src/index.css` so the video reads as the same
 * product as the app it is about. One teal carries every primary signal, neutrals keep a faint
 * teal undertone, and the two typefaces mean two different things: Figtree for what a person
 * reads, JetBrains Mono for anything a machine produced.
 */

export const colors = {
  background: "oklch(0.984 0.004 190)",
  foreground: "oklch(0.24 0.014 200)",
  card: "oklch(1 0 0)",
  primary: "oklch(0.567 0.1 184.994)",
  primaryFg: "oklch(1 0 0)",
  /** The one deliberately dark surface the light UI hangs beneath. */
  header: "oklch(0.28 0.055 185)",
  headerFg: "oklch(1 0 0)",
  muted: "oklch(0.972 0.004 190)",
  mutedFg: "oklch(0.52 0.008 200)",
  border: "oklch(0.9 0.006 195)",
  success: "oklch(0.58 0.13 163)",
  successFg: "oklch(0.44 0.11 163)",
  destructive: "oklch(0.577 0.245 27.325)",
  /** The three legend markers, at the exact hues the app gives them. */
  gem: "oklch(0.567 0.1 184.994)",
  coin: "oklch(0.769 0.188 70.08)",
  pattern: "oklch(0.606 0.25 292.717)",
} as const;

export const fonts = {
  sans: "'Figtree', system-ui, sans-serif",
  mono: "'JetBrains Mono', ui-monospace, monospace",
} as const;

/** A hairline border is how this design system separates things. Shadows are for what floats. */
export const hairline = `1px solid ${colors.border}`;

export const shadow = {
  card: "0 1px 2px oklch(0.2 0.01 200 / 0.05), 0 6px 16px oklch(0.2 0.01 200 / 0.06)",
  float: "0 10px 24px oklch(0.2 0.01 200 / 0.1), 0 28px 56px oklch(0.2 0.01 200 / 0.13)",
} as const;

export const radius = {
  sm: 6,
  md: 10,
  lg: 16,
  xl: 24,
} as const;
