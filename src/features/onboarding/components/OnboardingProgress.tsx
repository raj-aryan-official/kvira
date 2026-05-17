import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useTheme } from '../../../providers/ThemeProvider';
import { ProgressBar } from '../../../shared/components/ui/ProgressBar';

type Props = { step: number; total?: number };

export const OnboardingProgress: React.FC<Props> = ({ step, total = 7 }) => {
  const { theme } = useTheme();
  return (
    <View style={{ marginBottom: theme.spacing.lg }}>
      <ProgressBar progress={step / total} height={6} />
    </View>
  );
};

const _styles = StyleSheet.create({});
export default OnboardingProgress;
