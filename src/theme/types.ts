import type { spacing } from './spacing';

export type ThemeMode = 'kids' | 'junior' | 'senior';

export type ColorPalette = {
  primary: string;
  accentYellow: string;
  accentCoral: string;
  accentTeal: string;
  background: string;
  surface: string;
  text: string;
  textMuted: string;
  border: string;
  borderInput: string;
  error: string;
  success: string;
  danger: string;
  dangerBackground: string;
  overlay: string;
  cardFlatBackground: string;
  shadow: string;
  avatarKids: string;
  avatarJunior: string;
  avatarSenior: string;
  white: string;
  transparent: string;
};

export type TypographyStyle = {
  fontSize: number;
  lineHeight: number;
  fontWeight: '400' | '500' | '600' | '700';
};

export type TypographyScale = {
  fontFamily: { regular: string; medium: string; bold: string };
  h1: TypographyStyle;
  h2: TypographyStyle;
  h3: TypographyStyle;
  body: TypographyStyle;
  bodyMedium: TypographyStyle;
  caption: TypographyStyle;
  label: TypographyStyle;
  button: TypographyStyle;
};

export type SpacingScale = typeof spacing;

export type AppTheme = {
  mode: ThemeMode;
  colors: ColorPalette;
  typography: TypographyScale;
  spacing: SpacingScale;
  radii: {
    sm: number;
    md: number;
    lg: number;
    button: number;
    card: number;
  };
  sizes: {
    buttonHeight: number;
    avatar: Record<'sm' | 'md' | 'lg' | 'xl', number>;
  };
};
