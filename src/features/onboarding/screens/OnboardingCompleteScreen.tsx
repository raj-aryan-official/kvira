import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LottieView from 'lottie-react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { useTheme } from '../../../providers/ThemeProvider';
import { Pressable } from 'react-native';
import { Badge } from '../../../shared/components/ui/Badge';
import { completeOnboarding } from '../store/onboardingSlice';
import { selectOnboarding } from '../store/onboardingSelectors';
import type { OnboardingStackParamList } from '../../../navigation/types';

type Props = NativeStackScreenProps<OnboardingStackParamList, 'OnboardingComplete'>;

const OnboardingCompleteScreen: React.FC<Props> = () => {
  const { theme } = useTheme();
  const dispatch = useAppDispatch();
  const { displayName } = useAppSelector(selectOnboarding);

  useEffect(() => {
    dispatch(completeOnboarding());
  }, [dispatch]);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <LottieView
        autoPlay
        loop
        style={styles.lottie}
        source={{ uri: 'https://assets10.lottiefiles.com/packages/lf20_u4yrau.json' }}
      />
      <Text style={[styles.welcome, { color: theme.colors.text }]}>Welcome,</Text>
      <Text style={[styles.name, { color: theme.colors.primary }]}>{displayName || 'Learner'}</Text>
      <View style={{ marginTop: 24 }}>
        <Badge label="Level 1 · Newcomer" variant="warning" />
      </View>
      <Pressable
        style={[styles.cta, { backgroundColor: theme.colors.accentYellow, borderRadius: theme.radii.button }]}
        onPress={() => dispatch(completeOnboarding())}
      >
        <Text style={{ color: theme.colors.text, fontWeight: '700', fontSize: 18, textAlign: 'center', paddingVertical: 16 }}>
          Let&apos;s Go
        </Text>
      </Pressable>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
  lottie: { width: 280, height: 200, position: 'absolute', top: 40 },
  welcome: { fontSize: 24, fontWeight: '600', marginTop: 120 },
  name: { fontSize: 32, fontWeight: '700', marginTop: 8 },
  cta: { position: 'absolute', bottom: 48, left: 24, right: 24 },
});

export default OnboardingCompleteScreen;
