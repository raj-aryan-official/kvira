import React, { useMemo, useRef } from 'react';
import {
  ActivityIndicator,
  Animated,
  Pressable,
  StyleSheet,
  Text,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { useTheme } from '../../../providers/ThemeProvider';
import type { AppTheme } from '../../../theme/types';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';

export type ButtonProps = {
  title: string;
  onPress?: () => void;
  variant?: ButtonVariant;
  loading?: boolean;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
};

const getVariantStyles = (
  theme: AppTheme,
  variant: ButtonVariant,
  isInactive: boolean,
) => {
  const { colors, typography } = theme;
  const opacity = isInactive ? 0.5 : 1;

  switch (variant) {
    case 'secondary':
      return {
        container: {
          backgroundColor: colors.transparent,
          borderWidth: 1.5,
          borderColor: colors.primary,
          opacity,
        },
        text: { color: colors.primary, ...typography.button },
        spinnerColor: colors.primary,
      };
    case 'ghost':
      return {
        container: {
          backgroundColor: colors.transparent,
          borderWidth: 0,
          opacity,
        },
        text: { color: colors.primary, ...typography.button },
        spinnerColor: colors.primary,
      };
    case 'danger':
      return {
        container: {
          backgroundColor: colors.dangerBackground,
          borderWidth: 0,
          opacity,
        },
        text: { color: colors.white, ...typography.button },
        spinnerColor: colors.white,
      };
    default:
      return {
        container: {
          backgroundColor: colors.primary,
          borderWidth: 0,
          opacity,
        },
        text: { color: colors.white, ...typography.button },
        spinnerColor: colors.white,
      };
  }
};

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  loading = false,
  disabled = false,
  style,
}) => {
  const { theme } = useTheme();
  const scale = useRef(new Animated.Value(1)).current;
  const isInactive = disabled || loading;

  const variantStyles = useMemo(
    () => getVariantStyles(theme, variant, isInactive),
    [theme, variant, isInactive],
  );

  const handlePressIn = (): void => {
    if (isInactive) return;
    Animated.spring(scale, { toValue: 0.96, useNativeDriver: true, friction: 8, tension: 200 }).start();
  };

  const handlePressOut = (): void => {
    Animated.spring(scale, { toValue: 1, useNativeDriver: true, friction: 8, tension: 200 }).start();
  };

  return (
    <Animated.View style={[{ transform: [{ scale }] }, style]}>
      <Pressable
        accessibilityRole="button"
        disabled={isInactive}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={[
          styles.base,
          {
            height: theme.sizes.buttonHeight,
            borderRadius: theme.radii.button,
          },
          variantStyles.container,
        ]}
      >
        {loading ? (
          <ActivityIndicator color={variantStyles.spinnerColor} />
        ) : (
          <Text style={variantStyles.text}>{title}</Text>
        )}
      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
});

export default Button;
