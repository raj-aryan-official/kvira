import { useMemo } from 'react';
import { StyleSheet, type ImageStyle, type TextStyle, type ViewStyle } from 'react-native';
import { useTheme } from '../../providers/ThemeProvider';

type NamedStyles<T> = { [P in keyof T]: ViewStyle | TextStyle | ImageStyle };

export const useThemedStyles = <T extends NamedStyles<T>>(
  factory: (theme: ReturnType<typeof useTheme>['theme']) => T,
): T => {
  const { theme } = useTheme();
  return useMemo(() => StyleSheet.create(factory(theme)), [theme, factory]);
};

export default useThemedStyles;
