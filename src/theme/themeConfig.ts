import type { AppTheme } from './types';
import { kidsColors, juniorColors, seniorColors } from './colors';
import { kidsTypography, juniorTypography, seniorTypography } from './typography';
import spacing from './spacing';

const sharedLayout = {
  spacing,
  radii: {
    sm: 8,
    md: 12,
    lg: 16,
    button: 14,
    card: 16,
  },
  sizes: {
    buttonHeight: 52,
    avatar: { sm: 32, md: 44, lg: 64, xl: 96 },
  },
} as const;

export const kidsTheme: AppTheme = {
  mode: 'kids',
  colors: kidsColors,
  typography: kidsTypography,
  ...sharedLayout,
};

export const juniorTheme: AppTheme = {
  mode: 'junior',
  colors: juniorColors,
  typography: juniorTypography,
  ...sharedLayout,
};

export const seniorTheme: AppTheme = {
  mode: 'senior',
  colors: seniorColors,
  typography: seniorTypography,
  ...sharedLayout,
};

export const themes = {
  kids: kidsTheme,
  junior: juniorTheme,
  senior: seniorTheme,
} as const;
