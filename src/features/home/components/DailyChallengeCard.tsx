import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../../../providers/ThemeProvider';
import { Button } from '../../../shared/components/ui/Button';
import { authTheme } from '../../../shared/constants/authTheme';
import type { DailyChallengeStatus } from '../store/homeSlice';

type Props = {
  status: DailyChallengeStatus;
  subjectName: string;
  questionCount: number;
  rewardXp: number;
  score?: number;
  endsAt: string;
};

const msUntilMidnight = (endsAt: string): string => {
  const diff = Math.max(0, new Date(endsAt).getTime() - Date.now());
  const h = Math.floor(diff / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);
  return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
};

export const DailyChallengeCard: React.FC<Props> = ({
  status,
  subjectName,
  questionCount,
  rewardXp,
  score,
  endsAt,
}) => {
  const { theme } = useTheme();
  const [countdown, setCountdown] = useState(msUntilMidnight(endsAt));

  useEffect(() => {
    const id = setInterval(() => setCountdown(msUntilMidnight(endsAt)), 1000);
    return () => clearInterval(id);
  }, [endsAt]);

  const bg =
    status === 'completed'
      ? theme.colors.success
      : status === 'missed'
        ? theme.colors.textMuted
        : authTheme.background;

  return (
    <View style={[styles.card, { borderRadius: theme.radii.card, height: 160, padding: theme.spacing.base, backgroundColor: bg }]}>
      <View style={styles.row}>
        <View style={{ flex: 1 }}>
          <Text style={styles.label}>TODAY&apos;S CHALLENGE</Text>
          <Text style={styles.subject}>{subjectName}</Text>
          <Text style={styles.meta}>
            {status === 'completed' ? `Score ${score ?? 0}%` : `${questionCount} questions · ${countdown}`}
          </Text>
        </View>
        <View style={[styles.xpBadge, { backgroundColor: theme.colors.accentYellow }]}>
          <Text style={styles.xpText}>+{rewardXp} XP</Text>
        </View>
      </View>
      {status === 'active' ? (
        <View style={styles.cta}>
          <Button title="Start Now" onPress={() => {}} variant="ghost" />
        </View>
      ) : status === 'completed' ? (
        <Text style={styles.done}>✓ Completed</Text>
      ) : (
        <Text style={styles.missed}>Missed</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: { marginBottom: 16, justifyContent: 'space-between' },
  row: { flexDirection: 'row' },
  label: { fontSize: 10, letterSpacing: 1, color: '#C7D2FE', fontWeight: '600' },
  subject: { fontSize: 18, fontWeight: '700', color: '#fff', marginTop: 4 },
  meta: { fontSize: 13, color: '#C7D2FE', marginTop: 4 },
  xpBadge: { paddingHorizontal: 10, paddingVertical: 6, borderRadius: 12, alignSelf: 'flex-start' },
  xpText: { fontWeight: '700', fontSize: 12, color: '#1E1B4B' },
  cta: { alignSelf: 'flex-end' },
  done: { color: '#fff', fontWeight: '600' },
  missed: { color: '#F1F5F9', fontWeight: '600' },
});

export default DailyChallengeCard;
