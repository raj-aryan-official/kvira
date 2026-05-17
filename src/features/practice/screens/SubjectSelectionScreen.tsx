import React, { useMemo } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { useTheme } from '../../../providers/ThemeProvider';
import { Input } from '../../../shared/components/ui/Input';
import { LoadingSpinner } from '../../../shared/components/ui/LoadingSpinner';
import { AccuracyBadge } from '../components/AccuracyBadge';
import { useCurriculum } from '../hooks/useCurriculum';
import { setSearchQuery, toggleFavourite } from '../store/practiceSlice';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { PracticeStackParamList } from '../../../navigation/types';

type Props = NativeStackScreenProps<PracticeStackParamList, 'SubjectSelection'>;

const SubjectSelectionScreen: React.FC<Props> = ({ navigation }) => {
  const { theme } = useTheme();
  const dispatch = useAppDispatch();
  const curriculum = useCurriculum();
  const searchQuery = useAppSelector((s) => s.practice.searchQuery);
  const favourites = useAppSelector((s) => s.practice.favourites);

  const subjects = useMemo(() => {
    if (!curriculum) return [];
    let list = [...curriculum.subjects];
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      list = list.filter((s) => s.name.toLowerCase().includes(q));
    }
    list.sort((a, b) => {
      const af = favourites.includes(a.id) ? 1 : 0;
      const bf = favourites.includes(b.id) ? 1 : 0;
      return bf - af;
    });
    return list;
  }, [curriculum, favourites, searchQuery]);

  if (!curriculum) return <LoadingSpinner style={{ flex: 1 }} />;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <View style={{ padding: theme.spacing.base }}>
        <Input
          placeholder="Search subjects"
          value={searchQuery}
          onChangeText={(t) => dispatch(setSearchQuery(t))}
        />
      </View>
      <ScrollView contentContainerStyle={{ padding: theme.spacing.base, paddingTop: 0 }}>
        {subjects.map((s) => (
          <Pressable
            key={s.id}
            onPress={() => navigation.navigate('ChapterSelection', { subjectId: s.id, subjectName: s.name })}
            onLongPress={() =>
              Alert.alert(s.name, undefined, [
                { text: '10 Quick Questions', onPress: () => {} },
                { text: 'Daily Target', onPress: () => {} },
                { text: 'Cancel', style: 'cancel' },
              ])
            }
            style={[
              styles.card,
              {
                borderLeftColor: s.color,
                backgroundColor: theme.colors.surface,
                borderRadius: theme.radii.md,
                marginBottom: theme.spacing.md,
                padding: theme.spacing.base,
              },
            ]}
          >
            <View style={styles.row}>
              <Text style={{ fontSize: 32 }}>{s.icon}</Text>
              <View style={{ flex: 1, marginLeft: 12 }}>
                <Text style={{ color: theme.colors.text, fontSize: 17, fontWeight: '700' }}>{s.name}</Text>
                <Text style={{ color: theme.colors.textMuted, fontSize: 13, marginTop: 4 }}>
                  {s.questionsPracticed} practiced
                  {s.lastPracticedDaysAgo !== null ? ` · ${s.lastPracticedDaysAgo}d ago` : ''}
                </Text>
                <View style={{ marginTop: 8 }}>
                  <AccuracyBadge accuracy={s.accuracy} />
                </View>
              </View>
              <Pressable onPress={() => dispatch(toggleFavourite(s.id))}>
                <Ionicons
                  name={favourites.includes(s.id) ? 'star' : 'star-outline'}
                  size={24}
                  color={theme.colors.accentYellow}
                />
              </Pressable>
            </View>
          </Pressable>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  card: { borderLeftWidth: 4 },
  row: { flexDirection: 'row', alignItems: 'center' },
});

export default SubjectSelectionScreen;
