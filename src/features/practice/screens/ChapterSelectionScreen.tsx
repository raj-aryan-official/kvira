import React, { useMemo } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useAppSelector } from '../../../store/hooks';
import { useTheme } from '../../../providers/ThemeProvider';
import { Button } from '../../../shared/components/ui/Button';
import { ProgressBar } from '../../../shared/components/ui/ProgressBar';
import { useCurriculum } from '../hooks/useCurriculum';
import type { PracticeStackParamList } from '../../../navigation/types';

type Props = NativeStackScreenProps<PracticeStackParamList, 'ChapterSelection'>;

const ChapterSelectionScreen: React.FC<Props> = ({ navigation, route }) => {
  const { theme } = useTheme();
  const { subjectId, subjectName } = route.params;
  const curriculum = useCurriculum();
  const subject = curriculum?.subjects.find((s) => s.id === subjectId);

  const weakChapter = useMemo(
    () => subject?.chapters.find((c) => c.avgAccuracy !== null && c.avgAccuracy < 40),
    [subject],
  );

  if (!subject) return null;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <View style={[styles.header, { padding: theme.spacing.base }]}>
        <Pressable onPress={() => navigation.goBack()} style={styles.backRow}>
          <Ionicons name="arrow-back" size={22} color={theme.colors.text} />
          <Text style={{ color: theme.colors.text, ...theme.typography.h2, marginLeft: 8 }}>{subjectName}</Text>
        </Pressable>
        <Button title="Practice Full Subject" variant="secondary" onPress={() => {}} />
      </View>
      {weakChapter ? (
        <View style={[styles.callout, { backgroundColor: `${theme.colors.accentYellow}33`, margin: theme.spacing.base, padding: theme.spacing.md, borderRadius: theme.radii.md }]}>
          <Text style={{ color: theme.colors.text, fontWeight: '600' }}>Focus needed</Text>
          <Text style={{ color: theme.colors.textMuted, marginTop: 4 }}>
            {weakChapter.name} · {weakChapter.avgAccuracy}% accuracy
          </Text>
          <Pressable onPress={() => navigation.navigate('TopicSelection', { subjectId, chapterId: weakChapter.id, chapterName: weakChapter.name })}>
            <Text style={{ color: theme.colors.primary, fontWeight: '600', marginTop: 8 }}>Practice now</Text>
          </Pressable>
        </View>
      ) : null}
      <ScrollView contentContainerStyle={{ padding: theme.spacing.base }}>
        {subject.chapters.map((ch) => (
          <Pressable
            key={ch.id}
            onPress={() => navigation.navigate('TopicSelection', { subjectId, chapterId: ch.id, chapterName: ch.name })}
            style={[styles.chapter, { borderBottomColor: theme.colors.border }]}
          >
            <View style={[styles.order, { backgroundColor: theme.colors.primary }]}>
              <Text style={{ color: theme.colors.white, fontWeight: '700' }}>{ch.order}</Text>
            </View>
            <View style={{ flex: 1, marginLeft: 12 }}>
              <Text style={{ color: theme.colors.text, fontSize: 16, fontWeight: '700' }}>{ch.name}</Text>
              <Text style={{ color: theme.colors.textMuted, fontSize: 12, marginTop: 4 }}>
                {ch.topicCount} topics · {ch.avgAccuracy ?? '—'}% avg
              </Text>
            </View>
            <View style={{ width: 32, height: 32, alignItems: 'center', justifyContent: 'center' }}>
              <ProgressBar progress={ch.completion} height={32} style={{ width: 32, transform: [{ rotate: '-90deg' }] }} />
            </View>
          </Pressable>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  backRow: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  callout: {},
  chapter: { flexDirection: 'row', alignItems: 'center', paddingVertical: 14, borderBottomWidth: StyleSheet.hairlineWidth },
  order: { width: 32, height: 32, borderRadius: 16, alignItems: 'center', justifyContent: 'center' },
});

export default ChapterSelectionScreen;
