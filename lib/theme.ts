import { createContext, useContext } from 'react';

export const colors = {
  light: {
    background: '#F5F5F0',
    surface: '#FFFFFF',
    surfaceElevated: '#FAFAF5',
    primary: '#2D5A27',
    primaryLight: '#4A7C3F',
    accent: '#8FBC8F',
    text: '#1A1A1A',
    textSecondary: '#4A4A4A',
    textMuted: '#8A8A8A',
    border: '#E0E0D8',
    shadow: '#000000',
    ecoGreen: '#2D5A27',
    ecoLeaf: '#4A7C3F',
    chartBg: '#E8EDE6',
    danger: '#B85450',
    success: '#4A7C3F',
    warning: '#D4A853',
    darkMode: '#1A1A2E',
  },
  dark: {
    background: '#0D0D0F',
    surface: '#161618',
    surfaceElevated: '#1E1E22',
    primary: '#7BB661',
    primaryLight: '#98C97F',
    accent: '#5A9E4E',
    text: '#F0F0EB',
    textSecondary: '#B0B0A8',
    textMuted: '#6A6A65',
    border: '#2A2A2E',
    shadow: '#000000',
    ecoGreen: '#7BB661',
    ecoLeaf: '#5A9E4E',
    chartBg: '#1E1E22',
    danger: '#E67C73',
    success: '#7BB661',
    warning: '#E8C547',
    darkMode: '#0D0D0F',
  },
};

export type Theme = 'light' | 'dark';

export interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  isDark: boolean;
}

export const ThemeContext = createContext<ThemeContextType>({
  theme: 'dark',
  toggleTheme: () => {},
  isDark: true,
});

export const useTheme = () => useContext(ThemeContext);
