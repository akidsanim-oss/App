export const colors = {
  background: '#0A0A0F',
  surface: '#12121A',
  surfaceElevated: '#1A1A24',
  surfaceGlass: 'rgba(26, 26, 36, 0.72)',
  border: '#2A2A3A',
  borderSubtle: '#1E1E2E',
  text: '#F1F1F4',
  textSecondary: '#A1A1AA',
  textMuted: '#6B6B7B',
  accent: '#8B5CF6',
  accentSoft: 'rgba(139, 92, 246, 0.15)',
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  info: '#3B82F6',
  eco: '#10B981',
  ecoSoft: 'rgba(16, 185, 129, 0.15)',
  gradientStart: '#8B5CF6',
  gradientEnd: '#3B82F6',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const radius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
  full: 9999,
};

export const typography = {
  h1: { fontSize: 32, fontWeight: '700' as const, lineHeight: 40, letterSpacing: -0.5 },
  h2: { fontSize: 24, fontWeight: '700' as const, lineHeight: 32, letterSpacing: -0.3 },
  h3: { fontSize: 20, fontWeight: '600' as const, lineHeight: 28, letterSpacing: -0.2 },
  h4: { fontSize: 18, fontWeight: '600' as const, lineHeight: 26, letterSpacing: -0.1 },
  body: { fontSize: 16, fontWeight: '400' as const, lineHeight: 24, letterSpacing: 0 },
  bodySmall: { fontSize: 14, fontWeight: '400' as const, lineHeight: 20, letterSpacing: 0 },
  caption: { fontSize: 12, fontWeight: '500' as const, lineHeight: 16, letterSpacing: 0.2 },
  label: { fontSize: 11, fontWeight: '600' as const, lineHeight: 14, letterSpacing: 0.5, textTransform: 'uppercase' as const },
};

export const shadows = {
  sm: { shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 4, elevation: 3 },
  md: { shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 6 },
  lg: { shadowColor: '#000', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.4, shadowRadius: 16, elevation: 10 },
  glow: { shadowColor: '#8B5CF6', shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.5, shadowRadius: 12, elevation: 0 },
};
