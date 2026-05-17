export type PasswordStrength = 'weak' | 'medium' | 'strong';

export const getPasswordStrength = (password: string): PasswordStrength => {
  if (password.length < 6) return 'weak';
  const hasUpper = /[A-Z]/.test(password);
  const hasLower = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSymbol = /[^A-Za-z0-9]/.test(password);
  const score = [hasUpper, hasLower, hasNumber, hasSymbol, password.length >= 10].filter(Boolean).length;
  if (score >= 4) return 'strong';
  if (score >= 2) return 'medium';
  return 'weak';
};

export const strengthColor = (strength: PasswordStrength): string => {
  switch (strength) {
    case 'strong':
      return '#22C55E';
    case 'medium':
      return '#F59E0B';
    default:
      return '#EF4444';
  }
};

export const strengthProgress = (strength: PasswordStrength): number => {
  switch (strength) {
    case 'strong':
      return 1;
    case 'medium':
      return 0.66;
    default:
      return 0.33;
  }
};
