import React, { useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface StreakFlameProps {
  size?: number;
  color?: string;
  active?: boolean;
}

export const StreakFlame = ({ size = 24, color = '#F59E0B', active = true }: StreakFlameProps) => {
  const scale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (active) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(scale, {
            toValue: 1.1,
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.timing(scale, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
          }),
        ])
      ).start();
    } else {
      scale.setValue(1);
    }
  }, [active]);

  return (
    <Animated.View style={{ transform: [{ scale }] }}>
      <Ionicons name="flame" size={size} color={active ? color : '#D1D5DB'} />
    </Animated.View>
  );
};
