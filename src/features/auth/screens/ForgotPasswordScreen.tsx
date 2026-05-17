import React, { useEffect, useState } from 'react';
import { Animated, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { authTheme } from '../../../shared/constants/authTheme';
import { Button } from '../../../shared/components/ui/Button';
import { Input } from '../../../shared/components/ui/Input';
import apiClient from '../../../services/api/apiClient';
import type { AuthStackParamList } from '../../../navigation/types';

type Props = NativeStackScreenProps<AuthStackParamList, 'ForgotPassword'>;

const ForgotPasswordScreen: React.FC<Props> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [resendVisible, setResendVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const scale = useState(() => new Animated.Value(0))[0];

  useEffect(() => {
    if (!sent) return undefined;
    Animated.spring(scale, { toValue: 1, friction: 6, useNativeDriver: true }).start();
    const timer = setTimeout(() => setResendVisible(true), 30000);
    return () => clearTimeout(timer);
  }, [scale, sent]);

  const sendReset = async () => {
    setLoading(true);
    try {
      await apiClient.post('/auth/forgot-password', { email: email.trim() });
    } catch {
      /* show success UX even if API offline in dev */
    }
    setSent(true);
    setLoading(false);
  };

  if (sent) {
    return (
      <SafeAreaView style={styles.container}>
        <Animated.View style={[styles.successIcon, { transform: [{ scale }] }]}>
          <Ionicons name="checkmark-circle" size={72} color={authTheme.success} />
        </Animated.View>
        <Text style={styles.successTitle}>Check your email</Text>
        <Text style={styles.successBody}>
          We sent reset instructions to <Text style={styles.bold}>{email}</Text>
        </Text>
        {resendVisible ? (
          <Button title="Resend" onPress={sendReset} variant="secondary" />
        ) : (
          <Text style={styles.resendHint}>Resend available in 30 seconds</Text>
        )}
        <Pressable onPress={() => navigation.goBack()} style={styles.backLink}>
          <Text style={styles.backText}>Back to login</Text>
        </Pressable>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Pressable onPress={() => navigation.goBack()} style={styles.back}>
        <Ionicons name="arrow-back" size={24} color={authTheme.text} />
      </Pressable>
      <Text style={styles.title}>Forgot password?</Text>
      <Text style={styles.sub}>Enter your email and we&apos;ll send a reset link.</Text>
      <Input label="Email" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" containerStyle={styles.field} />
      <Button title="Send Reset Link" onPress={sendReset} disabled={!email.includes('@')} loading={loading} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: authTheme.background, padding: 24 },
  back: { marginBottom: 16 },
  title: { fontSize: 28, fontWeight: '700', color: authTheme.text },
  sub: { fontSize: 15, color: authTheme.textMuted, marginTop: 8, marginBottom: 24 },
  field: { marginBottom: 20 },
  successIcon: { alignSelf: 'center', marginTop: 80, marginBottom: 24 },
  successTitle: { fontSize: 24, fontWeight: '700', color: authTheme.text, textAlign: 'center' },
  successBody: { fontSize: 15, color: authTheme.textMuted, textAlign: 'center', marginTop: 12, lineHeight: 22 },
  bold: { color: authTheme.text, fontWeight: '700' },
  resendHint: { color: authTheme.textMuted, textAlign: 'center', marginTop: 24, fontSize: 13 },
  backLink: { marginTop: 24, alignItems: 'center' },
  backText: { color: authTheme.textLight, fontSize: 15 },
});

export default ForgotPasswordScreen;
