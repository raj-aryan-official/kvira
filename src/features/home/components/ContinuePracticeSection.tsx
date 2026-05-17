import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../../../providers/ThemeProvider';
import { Card } from '../../../shared/components/ui/Card';
import { ProgressBar } from '../../../shared/components/ui/ProgressBar';

type Subject = {
  id: string;
  name: string;
  icon: string;
  questionsThisWeek: number;
  progress: number;
};

type Props = { subjects: Subject[] };

export const ContinuePracticeSection: React.FC<Props> = ({ subjects }) => {
  const { theme } = useTheme();

  return (
    <View style={{ marginBottom: theme.spacing.lg }}>
      <Text style={{ color: theme.colors.text, ...theme.typography.h3, marginBottom: theme.spacing.md }}>
        Continue Practicing
      </Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} snapToInterval={168} decelerationRate="fast">
        {subjects.map((s) => (
          <Card key={s.id} variant="standard" style={[styles.card, { width: 160, marginRight: theme.spacing.md }]}>
            <Text style={{ fontSize: 28 }}>{s.icon}</Text>
            <Text style={{ color: theme.colors.text, ...theme.typography.label, marginTop: 8 }}>{s.name}</Text>
            <Text style={{ color: theme.colors.textMuted, fontSize: 12, marginTop: 4 }}>{s.questionsThisWeek} this week</Text>
            <ProgressBar progress={s.progress} height={4} style={{ marginTop: 12 }} />
          </Card>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {},
});

export default ContinuePracticeSection;
