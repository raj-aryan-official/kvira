import React from 'react';
import { StyleSheet, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useTheme } from '../../../providers/ThemeProvider';

export type EmptyStateProps = {
  title: string;
  description?: string;
  illustration?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
};

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  illustration,
  style,
}) => {
  const { theme } = useTheme();

  return (
    <View style={[styles.wrap, { padding: theme.spacing.xl }, style]}>
      {illustration ? <View style={{ marginBottom: theme.spacing.base }}>{illustration}</View> : null}
      <Text style={[styles.title, { color: theme.colors.text, ...theme.typography.h3 }]}>{title}</Text>
      {description ? (
        <Text
          style={[
            styles.description,
            { color: theme.colors.textMuted, marginTop: theme.spacing.sm, ...theme.typography.body },
          ]}
        >
          {description}
        </Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: { alignItems: 'center', justifyContent: 'center' },
  title: { textAlign: 'center' },
  description: { textAlign: 'center' },
});

export default EmptyState;
