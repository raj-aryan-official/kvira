import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { authTheme } from '../../../shared/constants/authTheme';
import { Button } from '../../../shared/components/ui/Button';
import { Input } from '../../../shared/components/ui/Input';
import { GoogleAuthButton } from '../components/GoogleAuthButton';
import { ShakeErrorBanner } from '../components/ShakeErrorBanner';
import { useLogin } from '../hooks/useLogin';
import type { AuthStackParamList } from '../../../navigation/types';

type Props = NativeStackScreenProps<AuthStackParamList, 'Login'>;

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, error, setError } = useLogin();
  const [submitting, setSubmitting] = useState(false);
  const canSubmit = email.trim().length > 0 && password.length > 0;

  const handleLogin = async () => {
    setSubmitting(true);
    const ok = await login(email, password);
    setSubmitting(false);
    if (!ok) return;
    setError(null);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Pressable onPress={() => navigation.goBack()} style={styles.back}>
        <Ionicons name="arrow-back" size={24} color={authTheme.text} />
      </Pressable>
      <Text style={styles.title}>Welcome Back</Text>
      <GoogleAuthButton onPress={() => {}} />
      <View style={styles.dividerRow}>
        <View style={styles.divider} />
        <Text style={styles.or}>or</Text>
        <View style={styles.divider} />
      </View>
      <ShakeErrorBanner message={error ?? ''} visible={Boolean(error)} />
      <Input
        label="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        containerStyle={styles.field}
      />
      <Input
        label="Password"
        isPassword
        value={password}
        onChangeText={setPassword}
        containerStyle={styles.field}
      />
      <Pressable onPress={() => navigation.navigate('ForgotPassword')} style={styles.forgot}>
        <Text style={styles.forgotText}>Forgot password?</Text>
      </Pressable>
      <Button
        title="Log In"
        onPress={handleLogin}
        disabled={!canSubmit}
        loading={submitting}
      />
      <Pressable onPress={() => navigation.navigate('Signup')} style={styles.signup}>
        <Text style={styles.signupText}>
          Don&apos;t have an account? <Text style={styles.signupBold}>Sign up</Text>
        </Text>
      </Pressable>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: authTheme.background, padding: 24 },
  back: { marginBottom: 16 },
  title: { fontSize: 28, fontWeight: '700', color: authTheme.text, marginBottom: 24 },
  dividerRow: { flexDirection: 'row', alignItems: 'center', marginVertical: 20, gap: 12 },
  divider: { flex: 1, height: 1, backgroundColor: 'rgba(255,255,255,0.2)' },
  or: { color: authTheme.textMuted, fontSize: 14 },
  field: { marginBottom: 12 },
  forgot: { alignSelf: 'flex-end', marginBottom: 20 },
  forgotText: { color: authTheme.textLight, fontSize: 14 },
  signup: { marginTop: 20, alignItems: 'center' },
  signupText: { color: authTheme.textMuted, fontSize: 14 },
  signupBold: { color: authTheme.text, fontWeight: '600' },
});

export default LoginScreen;
