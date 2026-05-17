import React, { useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { authTheme } from '../../../shared/constants/authTheme';
import { Button } from '../../../shared/components/ui/Button';
import { Input } from '../../../shared/components/ui/Input';
import { GoogleAuthButton } from '../components/GoogleAuthButton';
import { useSignup } from '../hooks/useSignup';
import {
  getPasswordStrength,
  strengthColor,
  strengthProgress,
} from '../utils/passwordStrength';
import type { AuthStackParamList } from '../../../navigation/types';

type Props = NativeStackScreenProps<AuthStackParamList, 'Signup'>;

const SignupScreen: React.FC<Props> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [terms, setTerms] = useState(false);
  const { signup, error } = useSignup();
  const [submitting, setSubmitting] = useState(false);

  const strength = getPasswordStrength(password);
  const passwordsMatch = password.length > 0 && password === confirm;
  const isValid = useMemo(
    () =>
      email.includes('@') &&
      fullName.trim().length >= 2 &&
      strength !== 'weak' &&
      passwordsMatch &&
      terms,
    [email, fullName, passwordsMatch, strength, terms],
  );

  const handleSignup = async () => {
    setSubmitting(true);
    await signup(email, fullName, password);
    setSubmitting(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Pressable onPress={() => navigation.goBack()} style={styles.back}>
        <Ionicons name="arrow-back" size={24} color={authTheme.text} />
      </Pressable>
      <Text style={styles.title}>Create Account</Text>
      <GoogleAuthButton label="Sign up with Google" onPress={() => {}} />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <Input label="Email" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" containerStyle={styles.field} />
      <Input label="Full name" value={fullName} onChangeText={setFullName} containerStyle={styles.field} />
      <Input label="Password" isPassword value={password} onChangeText={setPassword} containerStyle={styles.field} />
      <View style={styles.strengthTrack}>
        <View style={[styles.strengthFill, { width: `${strengthProgress(strength) * 100}%`, backgroundColor: strengthColor(strength) }]} />
      </View>
      <Input label="Confirm password" isPassword value={confirm} onChangeText={setConfirm} containerStyle={styles.field} />
      {passwordsMatch ? (
        <View style={styles.matchRow}>
          <Ionicons name="checkmark-circle" size={18} color={authTheme.success} />
          <Text style={styles.matchText}>Passwords match</Text>
        </View>
      ) : null}
      <Pressable onPress={() => setTerms((t) => !t)} style={styles.termsRow}>
        <Ionicons name={terms ? 'checkbox' : 'square-outline'} size={22} color={authTheme.textLight} />
        <Text style={styles.termsText}>
          I agree to the{' '}
          <Text style={styles.link} onPress={() => {}}>
            Privacy Policy
          </Text>
        </Text>
      </Pressable>
      <Button title="Create Account" onPress={handleSignup} disabled={!isValid} loading={submitting} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: authTheme.background, padding: 24 },
  back: { marginBottom: 8 },
  title: { fontSize: 28, fontWeight: '700', color: authTheme.text, marginBottom: 16 },
  field: { marginBottom: 10 },
  strengthTrack: {
    height: 4,
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 2,
    marginBottom: 12,
    overflow: 'hidden',
  },
  strengthFill: { height: 4, borderRadius: 2 },
  matchRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 12 },
  matchText: { color: authTheme.success, fontSize: 13 },
  termsRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 20 },
  termsText: { flex: 1, color: authTheme.textMuted, fontSize: 13 },
  link: { color: authTheme.textLight, textDecorationLine: 'underline' },
  error: { color: authTheme.error, marginBottom: 8 },
});

export default SignupScreen;
