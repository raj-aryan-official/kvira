import React from 'react';
import { Text, View } from 'react-native';
import { useTheme } from '../../../providers/ThemeProvider';

type Props = { accuracy: number | null };

export const AccuracyBadge: React.FC<Props> = ({ accuracy }) => {
  const { theme } = useTheme();
  if (accuracy === null) {
    return (
      <View style={{ backgroundColor: theme.colors.border, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 }}>
        <Text style={{ color: theme.colors.textMuted, fontSize: 12 }}>Not started</Text>
      </View>
    );
  }
  const bg =
    accuracy >= 70 ? theme.colors.success : accuracy >= 40 ? theme.colors.accentYellow : theme.colors.error;
  const textColor = accuracy >= 40 && accuracy < 70 ? theme.colors.text : theme.colors.white;
  return (
    <View style={{ backgroundColor: bg, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 }}>
      <Text style={{ color: textColor, fontSize: 12, fontWeight: '600' }}>{accuracy}%</Text>
    </View>
  );
};

export default AccuracyBadge;
