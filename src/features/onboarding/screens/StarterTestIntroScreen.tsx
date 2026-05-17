import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useTheme } from '../../../providers/ThemeProvider';
import { Button } from '../../../shared/components/ui/Button';
import { OnboardingLayout } from '../components/OnboardingLayout';
import { useAppDispatch } from '../../../store/hooks';
import { setStep } from '../store/onboardingSlice';
import type { OnboardingStackParamList } from '../../../navigation/types';

type Props = NativeStackScreenProps<OnboardingStackParamList, 'StarterTestIntro'>;

const StarterTestIntroScreen: React.FC<Props> = ({ navigation }) => {
  const { theme } = useTheme();
  const dispatch = useAppDispatch();

  return (
    <OnboardingLayout step={6} title="Let's see what you can do">
      <View style={[styles.rocket, { backgroundColor: theme.colors.cardFlatBackground, borderRadius: theme.radii.card }]}>
        <Text style={{ fontSize: 80 }}>🚀</Text>
      </View>
      <Text style={{ color: theme.colors.textMuted, marginTop: 16, ...theme.typography.body, lineHeight: 24 }}>
        5 quick questions — no pressure. This helps Kvira personalize your practice path.
      </Text>
      <View style={{ marginTop: 24 }}>
        <Button
          title="Start Quick Test"
          onPress={() => {
            dispatch(setStep(7));
            navigation.navigate('OnboardingComplete');
          }}
        />
      </View>
    </OnboardingLayout>
  );
};

const styles = StyleSheet.create({
  rocket: { height: 200, alignItems: 'center', justifyContent: 'center', marginTop: 16 },
});

export default StarterTestIntroScreen;
