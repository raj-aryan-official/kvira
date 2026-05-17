import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { useTheme } from '../../../providers/ThemeProvider';
import { OnboardingLayout } from '../components/OnboardingLayout';
import { ONBOARDING_SUBJECTS } from '../data/subjects';
import { setStep, toggleSubject } from '../store/onboardingSlice';
import { selectOnboarding } from '../store/onboardingSelectors';
import type { OnboardingStackParamList } from '../../../navigation/types';

type Props = NativeStackScreenProps<OnboardingStackParamList, 'SubjectInterests'>;

const SubjectInterestsScreen: React.FC<Props> = ({ navigation }) => {
  const { theme } = useTheme();
  const dispatch = useAppDispatch();
  const { selectedSubjects } = useAppSelector(selectOnboarding);
  const count = selectedSubjects.length;
  const valid = count >= 2 && count <= 4;

  return (
    <OnboardingLayout
      step={5}
      title="Pick your subjects"
      continueDisabled={!valid}
      onContinue={() => {
        dispatch(setStep(6));
        navigation.navigate('StarterTestIntro');
      }}
    >
      <Text style={{ color: theme.colors.textMuted, marginBottom: 12, ...theme.typography.body }}>
        {count}/4 selected · min 2
      </Text>
      <View style={styles.grid}>
        {ONBOARDING_SUBJECTS.map((s) => {
          const selected = selectedSubjects.includes(s.id);
          return (
            <Pressable
              key={s.id}
              onPress={() => dispatch(toggleSubject(s.id))}
              style={[
                styles.card,
                {
                  width: '48%',
                  backgroundColor: theme.colors.surface,
                  borderColor: selected ? theme.colors.primary : theme.colors.border,
                  borderWidth: selected ? 2 : 1,
                  borderRadius: theme.radii.md,
                  padding: theme.spacing.md,
                },
              ]}
            >
              <Text style={{ fontSize: 28 }}>{s.icon}</Text>
              <Text style={{ color: theme.colors.text, marginTop: 8, ...theme.typography.label }}>{s.name}</Text>
              {selected ? (
                <Ionicons name="checkmark-circle" size={20} color={theme.colors.primary} style={styles.check} />
              ) : null}
            </Pressable>
          );
        })}
      </View>
    </OnboardingLayout>
  );
};

const styles = StyleSheet.create({
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', gap: 12 },
  card: { marginBottom: 4 },
  check: { position: 'absolute', top: 8, right: 8 },
});

export default SubjectInterestsScreen;
