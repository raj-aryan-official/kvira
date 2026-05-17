import React, { createContext, useContext, useMemo } from 'react';
import { useAppSelector } from '../store/hooks';
import { selectThemeMode } from '../features/profile/store/profileSelectors';
import { themes } from '../theme/themeConfig';
import type { AppTheme, ThemeMode } from '../theme/types';

type ThemeContextValue = {
  mode: ThemeMode;
  theme: AppTheme;
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const mode = useAppSelector(selectThemeMode);
  const theme = themes[mode];

  const value = useMemo(() => ({ mode, theme }), [mode, theme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = (): ThemeContextValue => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};

export default ThemeProvider;
