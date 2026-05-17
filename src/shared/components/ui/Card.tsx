import React, { useMemo } from 'react';
import { StyleSheet, View, type StyleProp, type ViewProps, type ViewStyle } from 'react-native';
import { useTheme } from '../../../providers/ThemeProvider';

export type CardVariant = 'standard' | 'featured' | 'flat';

export type CardProps = ViewProps & {
  variant?: CardVariant;
  style?: StyleProp<ViewStyle>;
};

export const Card: React.FC<CardProps> = ({ variant = 'standard', style, children, ...rest }) => {
  const { theme } = useTheme();

  const variantStyle = useMemo(() => {
    switch (variant) {
      case 'featured':
        return {
          backgroundColor: theme.colors.surface,
          borderWidth: 1.5,
          borderColor: theme.colors.primary,
          shadowOpacity: 0,
          elevation: 0,
        };
      case 'flat':
        return {
          backgroundColor: theme.colors.cardFlatBackground,
          borderWidth: 0,
          shadowOpacity: 0,
          elevation: 0,
        };
      default:
        return {
          backgroundColor: theme.colors.surface,
          borderWidth: 0,
          shadowColor: theme.colors.shadow,
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.12,
          shadowRadius: 12,
          elevation: 4,
        };
    }
  }, [theme, variant]);

  return (
    <View
      {...rest}
      style={[
        styles.base,
        { borderRadius: theme.radii.card, padding: theme.spacing.base },
        variantStyle,
        style,
      ]}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  base: { overflow: 'hidden' },
});

export default Card;
