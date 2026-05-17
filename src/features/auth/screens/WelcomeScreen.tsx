import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { authTheme } from '../../../shared/constants/authTheme';
import { Button } from '../../../shared/components/ui/Button';
import type { AuthStackParamList } from '../../../navigation/types';

type Props = NativeStackScreenProps<AuthStackParamList, 'Welcome'>;

const WelcomeScreen: React.FC<Props> = ({ navigation }) => (
  <SafeAreaView style={styles.container}>
    <View style={styles.illustration} />
    <Text style={styles.headline}>Master Every Subject{'\n'}Beat Every Score</Text>
    <Text style={styles.sub}>AI-powered tests · Real syllabus · Daily streaks</Text>
    <View style={styles.actions}>
      <Button title="Start Learning" onPress={() => navigation.navigate('Signup')} />
      <Pressable onPress={() => navigation.navigate('Login')} style={styles.ghost}>
        <Text style={styles.ghostText}>Already have an account? Log in</Text>
      </Pressable>
    </View>
  </SafeAreaView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: authTheme.background,
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  illustration: {
    width: 240,
    height: 240,
    borderRadius: 24,
    backgroundColor: 'rgba(255,255,255,0.08)',
    alignSelf: 'center',
    marginTop: 24,
    marginBottom: 32,
  },
  headline: {
    fontSize: 28,
    fontWeight: '700',
    color: authTheme.text,
    textAlign: 'center',
    lineHeight: 36,
  },
  sub: {
    fontSize: 16,
    color: authTheme.textMuted,
    textAlign: 'center',
    marginTop: 12,
    lineHeight: 24,
  },
  actions: { marginTop: 'auto', marginBottom: 32, gap: 16 },
  ghost: { alignItems: 'center', paddingVertical: 12 },
  ghostText: { color: authTheme.textLight, fontSize: 15 },
});

export default WelcomeScreen;
