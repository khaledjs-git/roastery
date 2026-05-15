/**
 * Roastery Design System
 *
 * Single font system: Inter only.
 * Weights and sizes do the work that two fonts would normally do.
 * Apple-feel typography + Arabica restraint + our espresso DNA.
 */

export const Colors = {
  // Backgrounds
  background: '#FFFFFF',
  surface: '#FAFAFA',
  surfaceElevated: '#F5F5F5',

  // Text
  textPrimary: '#0A0A0A',
  textSecondary: '#6B6B6B',
  textTertiary: '#A8A8A8',

  // Borders & dividers
  border: '#EFEFEF',
  borderStrong: '#E5E5E5',

  // Brand accent (espresso) — used sparingly
  accent: '#3E2723',
  accentLight: '#5D4037',

  // Utility
  white: '#FFFFFF',
  black: '#0A0A0A',
  error: '#D32F2F',
  success: '#2E7D32',
} as const;

export const Fonts = {
  // Single font system — Inter only.
  light: 'Inter_300Light',
  regular: 'Inter_400Regular',
  medium: 'Inter_500Medium',
  semiBold: 'Inter_600SemiBold',
  bold: 'Inter_700Bold',
} as const;

export const FontSizes = {
  xs: 11,
  sm: 13,
  base: 15,
  lg: 17,
  xl: 20,
  '2xl': 24,
  '3xl': 30,
  '4xl': 36,
  '5xl': 44,
  '6xl': 56,
} as const;

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  '2xl': 48,
  '3xl': 64,
  '4xl': 96,
} as const;

export const Radius = {
  none: 0,
  sm: 4,
  md: 8,
  lg: 16,
  xl: 24,
  '2xl': 32,
  full: 9999,
} as const;
