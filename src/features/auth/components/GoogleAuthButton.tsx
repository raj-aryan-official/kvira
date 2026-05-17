import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { authTheme } from '../../../shared/constants/authTheme';

type Props = {
  label?: string;
  onPress?: () => void;
};

export const GoogleAuthButton: React.FC<Props> = ({
  label = 'Continue with Google',
  onPress,
}) => (
  <Pressable
    accessibilityRole="button"
    onPress={onPress}
    style={({ pressed }) => [styles.btn, pressed && styles.pressed]}
  >
    <View style={styles.logo}>
      <Text style={styles.logoText}>G</Text>
    </View>
    <Text style={styles.label}>{label}</Text>
  </Pressable>
);

const styles = StyleSheet.create({
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: authTheme.googleBg,
    borderRadius: 14,
    height: 52,
    paddingHorizontal: 16,
    gap: 12,
  },
  pressed: { opacity: 0.92 },
  logo: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#4285F4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: { color: '#fff', fontWeight: '700', fontSize: 14 },
  label: { color: authTheme.googleText, fontSize: 16, fontWeight: '600' },
});

export default GoogleAuthButton;
