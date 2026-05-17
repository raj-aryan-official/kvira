import React, { useMemo } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useTheme } from '../../../providers/ThemeProvider';
import { Button } from '../../../shared/components/ui/Button';
import { AccuracyBadge } from '../components/AccuracyBadge';
import { useCurriculum } from '../hooks/useCurriculum';
import type { PracticeStackParamList } from '../../../navigation/types';

type Props = NativeStackScreenProps<PracticeStackParamList, 'TopicSelection'>;

const TopicSelectionScreen: React.FC<Props> = ({ navigation, route }) => {
  const { theme } = useTheme();
  const { subjectId, chapterId, chapterName } = route.params;
  const curriculum = useCurriculum();
  const chapter = curriculum?.subjects
    .find((s) => s.id === subjectId)
    ?.chapters.find((c) => c.id === chapterId);

  const { weak, mastered, normal } = useMemo(() => {
    const topics = chapter?.topics ?? [];
    return {
      weak: topics.filter((t) => t.accuracy !== null && t.accuracy < 50),
      mastered: topics.filter((t) => t.accuracy !== null && t.accuracy >= 85),
      normal: topics.filter(
        (t) => t.accuracy === null || (t.accuracy >= 50 && t.accuracy < 85),
      ),
    };
  }, [chapter]);

  const renderTopic = (id: string, name: string, accuracy: number | null, questions: number, warn?: boolean) => (
    <View key={id} style={[styles.topic, { borderBottomColor: theme.colors.border }]}>
      <View style={{ flex: 1 }}>
        <Text style={{ color: theme.colors.text, ...theme.typography.bodyMedium }}>{name}</Text>
        <Text style={{ color: theme.colors.textMuted, fontSize: 12 }}>{questions} questions</Text>
      </View>
      {warn ? <Ionicons name="warning" size={18} color={theme.colors.accentYellow} style={{ marginRight: 8 }} /> : null}
      <AccuracyBadge accuracy={accuracy} />
    </View>
  );

  if (!chapter) return null;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <View style={[styles.header, { padding: theme.spacing.base }]}>
        <Pressable onPress={() => navigation.goBack()} style={styles.backRow}>
          <Ionicons name="arrow-back" size={22} color={theme.colors.text} />
          <Text style={{ color: theme.colors.text, ...theme.typography.h2, marginLeft: 8 }}>{chapterName}</Text>
        </Pressable>
        <Button title="Practice All Topics" variant="secondary" onPress={() => {}} />
      </View>
      <ScrollView contentContainerStyle={{ padding: theme.spacing.base }}>
        {weak.length > 0 ? (
          <View style={{ marginBottom: theme.spacing.lg }}>
            <Text style={{ color: theme.colors.error, fontWeight: '700', marginBottom: 8 }}>Weak Topics</Text>
            {weak.map((t) => renderTopic(t.id, t.name, t.accuracy, t.questionsPracticed, true))}
          </View>
        ) : null}
        {normal.map((t) => renderTopic(t.id, t.name, t.accuracy, t.questionsPracticed))}
        {mastered.length > 0 ? (
          <View style={{ marginTop: theme.spacing.lg }}>
            <Text style={{ color: theme.colors.textMuted, fontWeight: '700', marginBottom: 8 }}>Mastered Topics</Text>
            {mastered.map((t) => (
              <Text key={t.id} style={{ color: theme.colors.textMuted, paddingVertical: 10, ...theme.typography.body }}>
                {t.name} · {t.accuracy}%
              </Text>
            ))}
          </View>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  backRow: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  topic: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, borderBottomWidth: StyleSheet.hairlineWidth },
});

export default TopicSelectionScreen;
