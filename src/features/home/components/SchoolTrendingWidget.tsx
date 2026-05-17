import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../../../providers/ThemeProvider';
import { Avatar } from '../../../shared/components/ui/Avatar';
import { Card } from '../../../shared/components/ui/Card';

type Row = { rank: number; name: string; xp: number; avatarInitials: string };

type Props = {
  trending: Row[];
  myRank: { rank: number; xp: number } | null;
  visible: boolean;
};

export const SchoolTrendingWidget: React.FC<Props> = ({ trending, myRank, visible }) => {
  const { theme } = useTheme();
  if (!visible) return null;

  return (
    <View style={{ marginBottom: theme.spacing.xl }}>
      <Text style={{ color: theme.colors.text, ...theme.typography.h3, marginBottom: theme.spacing.md }}>
        Trending at Your School
      </Text>
      {trending.map((r) => (
        <View key={r.rank} style={[styles.row, { borderBottomColor: theme.colors.border }]}>
          <Text style={{ width: 24, color: theme.colors.textMuted, fontWeight: '700' }}>{r.rank}</Text>
          <Avatar size="sm" mode="initials" initials={r.avatarInitials} />
          <Text style={{ flex: 1, marginLeft: 10, color: theme.colors.text, ...theme.typography.body }}>{r.name}</Text>
          <Text style={{ color: theme.colors.primary, fontWeight: '600' }}>+{r.xp} XP</Text>
        </View>
      ))}
      {myRank ? (
        <Card variant="featured" style={{ marginTop: theme.spacing.md }}>
          <View style={styles.row}>
            <Text style={{ width: 24, color: theme.colors.primary, fontWeight: '700' }}>{myRank.rank}</Text>
            <Text style={{ flex: 1, color: theme.colors.text, fontWeight: '600' }}>My Rank</Text>
            <Text style={{ color: theme.colors.primary, fontWeight: '700' }}>+{myRank.xp} XP</Text>
          </View>
        </Card>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});

export default SchoolTrendingWidget;
