import React, { useEffect, useRef, useState } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../../../providers/ThemeProvider';

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

type Props = { counts: number[] };

export const WeeklyProgressChart: React.FC<Props> = ({ counts }) => {
  const { theme } = useTheme();
  const max = Math.max(...counts, 1);
  const today = (new Date().getDay() + 6) % 7;
  const [visible, setVisible] = useState(false);
  const anims = useRef(counts.map(() => new Animated.Value(0))).current;
  const runAnimation = () => {
    if (visible) return;
    setVisible(true);
    Animated.stagger(
      80,
      anims.map((a, i) =>
        Animated.timing(a, {
          toValue: counts[i] / max,
          duration: 500,
          useNativeDriver: false,
        }),
      ),
    ).start();
  };

  useEffect(() => {
    const t = setTimeout(runAnimation, 400);
    return () => clearTimeout(t);
  }, []);

  return (
    <View style={{ marginBottom: theme.spacing.lg }}>
      <Text style={{ color: theme.colors.text, ...theme.typography.h3, marginBottom: theme.spacing.md }}>This Week</Text>
      <View style={styles.chart}>
        {counts.map((c, i) => {
          const h = anims[i].interpolate({ inputRange: [0, 1], outputRange: [4, 100] });
          const isToday = i === today;
          const isFuture = i > today;
          return (
            <View key={DAYS[i]} style={styles.col}>
              <Text style={{ color: theme.colors.textMuted, fontSize: 11, marginBottom: 4 }}>{c || ''}</Text>
              <Animated.View
                style={{
                  width: 28,
                  height: h,
                  borderRadius: 6,
                  backgroundColor: isFuture
                    ? theme.colors.border
                    : isToday
                      ? theme.colors.primary
                      : theme.colors.accentTeal,
                }}
              />
              <Text style={{ color: theme.colors.textMuted, fontSize: 11, marginTop: 6 }}>{DAYS[i]}</Text>
            </View>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  chart: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', height: 130 },
  col: { alignItems: 'center', flex: 1 },
});

export default WeeklyProgressChart;
