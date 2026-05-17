import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../../../providers/ThemeProvider';
import { ProgressBar } from '../../../shared/components/ui/ProgressBar';

type Props = { level: number; xp: number; xpToNext: number };

export const XPLevelRow: React.FC<Props> = ({ level, xp, xpToNext }) => {
  const { theme } = useTheme();
  const progress = xpToNext > 0 ? xp / xpToNext : 0;

  return (
    <View style={[styles.row, { marginBottom: theme.spacing.lg }]}>
      <View style={[styles.hex, { backgroundColor: theme.colors.primary, borderRadius: 12, width: 48, height: 48 }]}>
        <Text style={{ color: theme.colors.white, fontWeight: '700', fontSize: 18 }}>{level}</Text>
      </View>
      <View style={{ flex: 1, marginLeft: theme.spacing.md }}>
        <ProgressBar progress={progress} height={10} style={{ maxWidth: 280 }} />
        <Text style={{ color: theme.colors.textMuted, marginTop: 6, fontSize: 12 }}>
          {xpToNext - xp} XP to Level {level + 1}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center' },
  hex: { alignItems: 'center', justifyContent: 'center' },
});

export default XPLevelRow;
