import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { useTheme } from '../../../providers/ThemeProvider';
import { setClassLevel } from '../../profile/store/profileSlice';
import { getThemeModeFromClass } from '../../../theme/getThemeModeFromClass';
import { OnboardingLayout } from '../components/OnboardingLayout';
import { setClassNumber, setStep } from '../store/onboardingSlice';
import { selectOnboarding } from '../store/onboardingSelectors';
import type { OnboardingStackParamList } from '../../../navigation/types';

const GROUPS = [
  { label: 'Early Learning', classes: [0, 1, 2] },
  { label: 'Primary', classes: [3, 4, 5, 6, 7] },
  { label: 'Secondary', classes: [8, 9, 10, 11, 12] },
];

const CLASS_LABELS: Record<number, string> = {
  0: 'Nursery',
  1: 'LKG',
  2: 'UKG',
};

type Props = NativeStackScreenProps<OnboardingStackParamList, 'ClassSelection'>;

const ClassSelectionScreen: React.FC<Props> = ({ navigation }) => {
  const { theme } = useTheme();
  const dispatch = useAppDispatch();
  const { classNumber } = useAppSelector(selectOnboarding);

  const labelFor = (n: number) => CLASS_LABELS[n] ?? String(n <= 2 ? n : n - 2);

  const modeLabel =
    classNumber === null
      ? 'Select your class to apply a learning mode'
      : `${getThemeModeFromClass(classNumber).toUpperCase()} mode will be applied`;

  return (
    <OnboardingLayout
      step={2}
      title="Which class are you in?"
      continueDisabled={classNumber === null}
      onContinue={() => {
        dispatch(setStep(3));
        navigation.navigate('SchoolLink');
      }}
    >
      {GROUPS.map((g) => (
        <View key={g.label} style={{ marginBottom: theme.spacing.lg }}>
          <Text style={{ color: theme.colors.textMuted, ...theme.typography.label, marginBottom: theme.spacing.sm }}>{g.label}</Text>
          <View style={styles.pillRow}>
            {g.classes.map((c) => {
              const shimmer = c >= 8;
              const selected = classNumber === c;
              return (
                <Pressable
                  key={c}
                  onPress={() => {
                    dispatch(setClassNumber(c));
                    dispatch(setClassLevel(c));
                  }}
                  style={[
                    styles.pill,
                    {
                      borderColor: selected ? theme.colors.primary : theme.colors.border,
                      backgroundColor: shimmer ? `${theme.colors.accentYellow}22` : theme.colors.surface,
                      borderWidth: selected ? 2 : 1,
                    },
                  ]}
                >
                  <Text style={{ color: theme.colors.text, ...theme.typography.label }}>{labelFor(c)}</Text>
                </Pressable>
              );
            })}
          </View>
        </View>
      ))}
      <View style={[styles.info, { backgroundColor: theme.colors.cardFlatBackground, borderRadius: theme.radii.md, padding: theme.spacing.md }]}>
        <Text style={{ color: theme.colors.text, ...theme.typography.bodyMedium }}>{modeLabel}</Text>
      </View>
    </OnboardingLayout>
  );
};

const styles = StyleSheet.create({
  pillRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  pill: { paddingHorizontal: 14, paddingVertical: 10, borderRadius: 20 },
  info: { marginTop: 8 },
});

export default ClassSelectionScreen;
