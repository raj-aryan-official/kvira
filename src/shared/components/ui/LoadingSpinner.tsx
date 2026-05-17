import React from 'react';
import { ActivityIndicator, StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';
import { useTheme } from '../../../providers/ThemeProvider';

export type LoadingSpinnerProps = {
  size?: 'small' | 'large';
  style?: StyleProp<ViewStyle>;
};

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ size = 'large', style }) => {
  const { theme } = useTheme();

  return (
    <View style={[styles.wrap, style]}>
      <ActivityIndicator size={size} color={theme.colors.primary} />
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: { alignItems: 'center', justifyContent: 'center', padding: 16 },
});

export default LoadingSpinner;
