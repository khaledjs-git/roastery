/**
 * Roastery Design System
 *
 * Single source of truth for colors, typography, and spacing.
 * Every component in the app references these tokens.
 * Change a value here and it propagates everywhere.
 */

export const Colors = {
  // Backgrounds
  background: "#FFFFFF",
  surface: "#FAFAFA",

  // Text
  textPrimary: "#0A0A0A",
  textSecondary: "#6B6B6B",
  textTertiary: "#A8A8A8",

  // Borders & dividers
  border: "#F0F0F0",

  // Brand accent (espresso)
  accent: "#3E2723",
  accentLight: "#5D4037",

  // Utility
  white: "#FFFFFF",
  black: "#000000",
  error: "#D32F2F",
  success: "#2E7D32",
} as const;

export const Fonts = {
  // Display — serif, used for headlines, titles, prices
  displayRegular: "PlayfairDisplay_400Regular",
  displayMedium: "PlayfairDisplay_500Medium",
  displayBold: "PlayfairDisplay_700Bold",

  // Body — sans-serif, used for body text, buttons, UI
  bodyLight: "Inter_300Light",
  bodyRegular: "Inter_400Regular",
  bodyMedium: "Inter_500Medium",
  bodySemiBold: "Inter_600SemiBold",
  bodyBold: "Inter_700Bold",
} as const;

export const FontSizes = {
  xs: 12,
  sm: 14,
  base: 16,
  lg: 18,
  xl: 20,
  "2xl": 24,
  "3xl": 30,
  "4xl": 36,
  "5xl": 48,
  "6xl": 60,
} as const;

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  "2xl": 48,
  "3xl": 64,
} as const;

export const Radius = {
  none: 0,
  sm: 4,
  md: 8,
  lg: 16,
  xl: 24,
  full: 9999,
} as const;
