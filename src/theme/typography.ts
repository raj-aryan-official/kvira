const baseFont = {
  regular: 'System' as const,
  medium: 'System' as const,
  bold: 'System' as const,
};

/** Kids: min body 18pt, H1 28pt */
export const kidsTypography = {
  fontFamily: baseFont,
  h1: { fontSize: 28, lineHeight: 34, fontWeight: '700' as const },
  h2: { fontSize: 24, lineHeight: 30, fontWeight: '700' as const },
  h3: { fontSize: 20, lineHeight: 26, fontWeight: '600' as const },
  body: { fontSize: 18, lineHeight: 26, fontWeight: '400' as const },
  bodyMedium: { fontSize: 18, lineHeight: 26, fontWeight: '500' as const },
  caption: { fontSize: 16, lineHeight: 22, fontWeight: '400' as const },
  label: { fontSize: 16, lineHeight: 20, fontWeight: '600' as const },
  button: { fontSize: 18, lineHeight: 22, fontWeight: '600' as const },
} as const;

/** Junior: middle ground */
export const juniorTypography = {
  fontFamily: baseFont,
  h1: { fontSize: 26, lineHeight: 32, fontWeight: '700' as const },
  h2: { fontSize: 22, lineHeight: 28, fontWeight: '700' as const },
  h3: { fontSize: 18, lineHeight: 24, fontWeight: '600' as const },
  body: { fontSize: 16, lineHeight: 24, fontWeight: '400' as const },
  bodyMedium: { fontSize: 16, lineHeight: 24, fontWeight: '500' as const },
  caption: { fontSize: 14, lineHeight: 20, fontWeight: '400' as const },
  label: { fontSize: 14, lineHeight: 18, fontWeight: '600' as const },
  button: { fontSize: 16, lineHeight: 20, fontWeight: '600' as const },
} as const;

/** Senior: body 14pt, H1 24pt */
export const seniorTypography = {
  fontFamily: baseFont,
  h1: { fontSize: 24, lineHeight: 30, fontWeight: '700' as const },
  h2: { fontSize: 20, lineHeight: 26, fontWeight: '700' as const },
  h3: { fontSize: 17, lineHeight: 22, fontWeight: '600' as const },
  body: { fontSize: 14, lineHeight: 20, fontWeight: '400' as const },
  bodyMedium: { fontSize: 14, lineHeight: 20, fontWeight: '500' as const },
  caption: { fontSize: 12, lineHeight: 16, fontWeight: '400' as const },
  label: { fontSize: 12, lineHeight: 16, fontWeight: '600' as const },
  button: { fontSize: 14, lineHeight: 18, fontWeight: '600' as const },
} as const;
