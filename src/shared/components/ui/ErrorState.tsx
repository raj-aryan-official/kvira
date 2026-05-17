import React from 'react';
import { StyleSheet, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useTheme } from '../../../providers/ThemeProvider';
import { Button } from './Button';

export type ErrorStateProps = {
  title: string;
  message?: string;
  onRetry?: () => void;
  retryLabel?: string;
  style?: StyleProp<ViewStyle>;
};

export const ErrorState: React.FC<ErrorStateProps> = ({
  title,
  message,
  onRetry,
  retryLabel = 'Try again',
  style,
}) => {
  const { theme } = useTheme();

  return (
    <View style={[styles.wrap, { padding: theme.spacing.xl }, style]}>
      <Text style={[styles.title, { color: theme.colors.error, ...theme.typography.h3 }]}>{title}</Text>
      {message ? (
        <Text
          style={{
            color: theme.colors.textMuted,
            marginTop: theme.spacing.sm,
            textAlign: 'center',
            ...theme.typography.body,
          }}
        >
          {message}
        </Text>
      ) : null}
      {onRetry ? (
        <View style={{ marginTop: theme.spacing.xl, alignSelf: 'stretch' }}>
          <Button title={retryLabel} onPress={onRetry} variant="primary" />
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: { alignItems: 'center', justifyContent: 'center' },
  title: { textAlign: 'center' },
});

export default ErrorState;
