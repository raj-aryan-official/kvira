import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../../providers/ThemeProvider';
import { Button } from '../../../shared/components/ui/Button';
import { OnboardingProgress } from './OnboardingProgress';

type Props = {
  step: number;
  title: string;
  children: React.ReactNode;
  continueLabel?: string;
  onContinue?: () => void;
  continueDisabled?: boolean;
  footer?: React.ReactNode;
};

export const OnboardingLayout: React.FC<Props> = ({
  step,
  title,
  children,
  continueLabel = 'Continue',
  onContinue,
  continueDisabled,
  footer,
}) => {
  const { theme } = useTheme();
  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: theme.colors.background }]}>
      <ScrollView contentContainerStyle={[styles.scroll, { padding: theme.spacing.base }]}>
        <OnboardingProgress step={step} />
        <Text style={[styles.title, { color: theme.colors.text, ...theme.typography.h1 }]}>{title}</Text>
        {children}
      </ScrollView>
      <View style={[styles.footer, { padding: theme.spacing.base }]}>
        {footer}
        {onContinue ? (
          <Button title={continueLabel} onPress={onContinue} disabled={continueDisabled} />
        ) : null}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1 },
  scroll: { flexGrow: 1 },
  title: { marginBottom: 20 },
  footer: { borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: '#E2E8F0' },
});

export default OnboardingLayout;
