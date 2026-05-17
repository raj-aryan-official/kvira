import React, { useRef, useState } from 'react';
import { NativeScrollEvent, NativeSyntheticEvent, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../../providers/ThemeProvider';
import { LoadingSpinner } from '../../../shared/components/ui/LoadingSpinner';
import { useHomeData } from '../hooks/useHomeData';
import { HomeTopBar } from '../components/HomeTopBar';
import { DailyChallengeCard } from '../components/DailyChallengeCard';
import { XPLevelRow } from '../components/XPLevelRow';
import { ContinuePracticeSection } from '../components/ContinuePracticeSection';
import { WeeklyProgressChart } from '../components/WeeklyProgressChart';
import { SchoolTrendingWidget } from '../components/SchoolTrendingWidget';
import { StreakStatusModal } from '../components/StreakStatusModal';

const HomeScreen = (): React.ReactElement => {
  const { theme } = useTheme();
  const data = useHomeData();
  const [streakOpen, setStreakOpen] = useState(false);
  const chartY = useRef(0);
  const [chartAnimated, setChartAnimated] = useState(false);

  if (data.isLoading) {
    return <LoadingSpinner style={{ flex: 1 }} />;
  }

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: theme.colors.background }]} edges={['top']}>
      <HomeTopBar
        greeting=""
        name={data.greetingName}
        unreadCount={data.unreadNotifications}
        streak={data.streak}
        onStreakPress={() => setStreakOpen(true)}
      />
      <ScrollView
        contentContainerStyle={{ padding: theme.spacing.base, paddingBottom: theme.spacing.xxxl }}
        onScroll={(e: NativeSyntheticEvent<NativeScrollEvent>) => {
          if (!chartAnimated && e.nativeEvent.contentOffset.y + 500 > chartY.current) {
            setChartAnimated(true);
          }
        }}
        scrollEventThrottle={16}
      >
        <DailyChallengeCard {...data.dailyChallenge} />
        <XPLevelRow level={data.level} xp={data.xp} xpToNext={data.xpToNext} />
        <ContinuePracticeSection subjects={data.continueSubjects} />
        <View onLayout={(ev) => { chartY.current = ev.nativeEvent.layout.y; }}>
          <WeeklyProgressChart counts={data.weeklyActivity} />
        </View>
        <SchoolTrendingWidget
          trending={data.schoolTrending}
          myRank={data.myRank}
          visible={data.schoolLinked}
        />
      </ScrollView>
      <StreakStatusModal visible={streakOpen} streak={data.streak} onClose={() => setStreakOpen(false)} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1 },
});

export default HomeScreen;
