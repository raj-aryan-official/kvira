import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';
import { useTheme } from '../../../providers/ThemeProvider';

export type ProgressBarProps = {
  progress: number;
  height?: number;
  style?: StyleProp<ViewStyle>;
};

export const ProgressBar: React.FC<ProgressBarProps> = ({ progress, height = 8, style }) => {
  const { theme } = useTheme();
  const clamped = Math.min(1, Math.max(0, progress));
  const widthAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(widthAnim, {
      toValue: clamped,
      useNativeDriver: false,
      friction: 8,
      tension: 80,
    }).start();
  }, [clamped, widthAnim]);

  const fillWidth = widthAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <View
      style={[
        styles.track,
        {
          height,
          backgroundColor: theme.colors.border,
          borderRadius: height / 2,
        },
        style,
      ]}
    >
      <Animated.View
        style={[
          styles.fill,
          {
            width: fillWidth,
            height,
            backgroundColor: theme.colors.primary,
            borderRadius: height / 2,
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  track: { width: '100%', overflow: 'hidden' },
  fill: { position: 'absolute', left: 0, top: 0 },
});

export default ProgressBar;
