import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text } from 'react-native';
import { authTheme } from '../../../shared/constants/authTheme';

type Props = { message: string; visible: boolean };

export const ShakeErrorBanner: React.FC<Props> = ({ message, visible }) => {
  const shake = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!visible) return;
    Animated.sequence([
      Animated.timing(shake, { toValue: 10, duration: 50, useNativeDriver: true }),
      Animated.timing(shake, { toValue: -10, duration: 50, useNativeDriver: true }),
      Animated.timing(shake, { toValue: 8, duration: 50, useNativeDriver: true }),
      Animated.timing(shake, { toValue: 0, duration: 50, useNativeDriver: true }),
    ]).start();
  }, [message, shake, visible]);

  if (!visible) return null;

  return (
    <Animated.View style={[styles.banner, { transform: [{ translateX: shake }] }]}>
      <Text style={styles.text}>{message}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  banner: {
    backgroundColor: authTheme.error,
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
  },
  text: { color: authTheme.text, fontSize: 14, textAlign: 'center' },
});

export default ShakeErrorBanner;
