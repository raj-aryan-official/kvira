import React, { useMemo } from 'react';
import { StyleSheet, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useTheme } from '../../../providers/ThemeProvider';

export type BadgeVariant = 'primary' | 'success' | 'warning' | 'error' | 'neutral';

export type BadgeProps = {
  label: string;
  variant?: BadgeVariant;
  style?: StyleProp<ViewStyle>;
};

export const Badge: React.FC<BadgeProps> = ({ label, variant = 'primary', style }) => {
  const { theme } = useTheme();

  const colors = useMemo(() => {
    switch (variant) {
      case 'success':
        return { bg: theme.colors.accentTeal, text: theme.colors.white };
      case 'warning':
        return { bg: theme.colors.accentYellow, text: theme.colors.text };
      case 'error':
        return { bg: theme.colors.error, text: theme.colors.white };
      case 'neutral':
        return { bg: theme.colors.cardFlatBackground, text: theme.colors.textMuted };
      default:
        return { bg: theme.colors.primary, text: theme.colors.white };
    }
  }, [theme, variant]);

  return (
    <View
      style={[
        styles.base,
        {
          backgroundColor: colors.bg,
          paddingHorizontal: theme.spacing.sm,
          paddingVertical: theme.spacing.xs,
          borderRadius: theme.radii.sm,
        },
        style,
      ]}
    >
      <Text style={[styles.label, { color: colors.text, ...theme.typography.caption }]}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  base: { alignSelf: 'flex-start' },
  label: { fontWeight: '600' },
});

export default Badge;
