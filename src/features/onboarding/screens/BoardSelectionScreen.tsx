import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { useTheme } from '../../../providers/ThemeProvider';
import { OnboardingLayout } from '../components/OnboardingLayout';
import { setBoard, setStep } from '../store/onboardingSlice';
import { selectOnboarding } from '../store/onboardingSelectors';
import type { OnboardingStackParamList } from '../../../navigation/types';

const STATE_BOARDS = ['Karnataka', 'Maharashtra', 'Tamil Nadu', 'Kerala', 'Telangana'];

type Props = NativeStackScreenProps<OnboardingStackParamList, 'BoardSelection'>;

const BoardSelectionScreen: React.FC<Props> = ({ navigation }) => {
  const { theme } = useTheme();
  const dispatch = useAppDispatch();
  const { board, stateBoard } = useAppSelector(selectOnboarding);
  const [stateOpen, setStateOpen] = useState(false);

  const select = (b: 'CBSE' | 'ICSE' | 'STATE', sb?: string) => {
    dispatch(setBoard({ board: b, stateBoard: sb ?? null }));
  };

  const canContinue = board === 'STATE' ? Boolean(stateBoard) : Boolean(board);

  return (
    <OnboardingLayout
      step={1}
      title="Which board do you study?"
      continueDisabled={!canContinue}
      onContinue={() => {
        dispatch(setStep(2));
        navigation.navigate('ClassSelection');
      }}
    >
      {(
        [
          { id: 'CBSE' as const, title: 'CBSE', sub: 'Central Board — used by most private schools' },
          { id: 'ICSE' as const, title: 'ICSE / ISC', sub: 'CISCE Board — detailed syllabus' },
          { id: 'STATE' as const, title: 'State Board', sub: 'Regional curriculum' },
        ] as const
      ).map((item) => (
        <View key={item.id}>
          <Pressable
            onPress={() => {
              select(item.id);
              if (item.id === 'STATE') setStateOpen(true);
            }}
            style={[
              styles.card,
              {
                borderColor: board === item.id ? theme.colors.primary : theme.colors.border,
                borderWidth: board === item.id ? 2 : 1,
                backgroundColor: theme.colors.surface,
                borderRadius: theme.radii.card,
                padding: theme.spacing.base,
                marginBottom: theme.spacing.md,
              },
            ]}
          >
            <View style={styles.cardRow}>
              <View style={{ flex: 1 }}>
                <Text style={{ color: theme.colors.text, ...theme.typography.h3 }}>{item.title}</Text>
                <Text style={{ color: theme.colors.textMuted, ...theme.typography.caption, marginTop: 4 }}>{item.sub}</Text>
              </View>
              {board === item.id ? <Ionicons name="checkmark-circle" size={24} color={theme.colors.primary} /> : null}
            </View>
          </Pressable>
          {item.id === 'STATE' && stateOpen ? (
            <View style={{ marginBottom: theme.spacing.md, paddingLeft: theme.spacing.sm }}>
              {STATE_BOARDS.map((s) => (
                <Pressable key={s} onPress={() => select('STATE', s)} style={styles.radioRow}>
                  <Ionicons name={stateBoard === s ? 'radio-button-on' : 'radio-button-off'} size={20} color={theme.colors.primary} />
                  <Text style={{ color: theme.colors.text, marginLeft: 8, ...theme.typography.body }}>{s}</Text>
                </Pressable>
              ))}
            </View>
          ) : null}
        </View>
      ))}
    </OnboardingLayout>
  );
};

const styles = StyleSheet.create({
  card: {},
  cardRow: { flexDirection: 'row', alignItems: 'center' },
  radioRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 8 },
});

export default BoardSelectionScreen;
