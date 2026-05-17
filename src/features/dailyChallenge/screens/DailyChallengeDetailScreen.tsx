import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useDailyChallenge } from '../hooks/useDailyChallenge';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<any, 'DailyChallengeDetail'>;

export default function DailyChallengeDetailScreen({ navigation }: Props) {
  const { subject, topic, questionCount, rewardXP, leaders, bestScore, hasCompletedToday, formattedTimeLeft, isUrgent } = useDailyChallenge();

  const handleStart = () => {
    // Navigate to exam screen in dailyChallenge mode
    navigation.navigate('ExamScreen', { mode: 'dailyChallenge', count: questionCount });
  };

  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

  if (hasCompletedToday) {
    return (
      <View style={[styles.container, { backgroundColor: '#10B981' }]}>
        <View style={styles.completedHeader}>
          <Ionicons name="checkmark-circle" size={80} color="white" />
          <Text style={styles.completedTitle}>Challenge Completed!</Text>
          <Text style={styles.completedDate}>{today}</Text>
        </View>
        <View style={styles.completedCard}>
          <Text style={styles.completedScore}>Score: 85%</Text>
          <Text style={styles.completedRank}>School Rank Today: #4</Text>
          <Text style={styles.completedXP}>+{rewardXP * 3} XP Earned</Text>
          <TouchableOpacity style={styles.shareButton}>
            <Text style={styles.shareButtonText}>Share Result</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.homeButton} onPress={() => navigation.navigate('Home')}>
            <Text style={styles.homeButtonText}>Back to Home</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} bounces={false}>
      <View style={styles.headerZone}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.challengeLabel}>DAILY CHALLENGE</Text>
        <Text style={styles.subjectName}>{subject}</Text>
        <Text style={styles.dateText}>{today}</Text>
        
        <Text style={[styles.countdownText, isUrgent && styles.countdownUrgent]}>
          {formattedTimeLeft}
        </Text>
      </View>

      <View style={styles.contentZone}>
        <View style={styles.detailsCard}>
          <View style={styles.detailRow}>
            <Ionicons name="book-outline" size={20} color="#6B7280" />
            <Text style={styles.detailText}>{topic}</Text>
          </View>
          <View style={styles.detailRow}>
            <Ionicons name="help-circle-outline" size={20} color="#6B7280" />
            <Text style={styles.detailText}>{questionCount} Questions</Text>
          </View>
          <View style={styles.detailRow}>
            <Ionicons name="star-outline" size={20} color="#F59E0B" />
            <Text style={[styles.detailText, { color: '#F59E0B', fontWeight: 'bold' }]}>{rewardXP} XP Base (x3 Multiplier)</Text>
          </View>
        </View>

        <View style={styles.leadersSection}>
          <Text style={styles.sectionTitle}>Who's Done It Today</Text>
          {leaders.map((leader, index) => (
            <View key={leader.id} style={styles.leaderRow}>
              <Text style={styles.leaderRank}>#{index + 1}</Text>
              <Image source={{ uri: leader.avatar }} style={styles.leaderAvatar} />
              <Text style={styles.leaderName}>{leader.name}</Text>
              <Text style={styles.leaderScore}>{leader.score}%</Text>
            </View>
          ))}
        </View>

        {bestScore !== null && (
          <View style={styles.bestScoreSection}>
            <Text style={styles.sectionTitle}>Your Best</Text>
            <View style={styles.bestScoreCard}>
              <Ionicons name="trophy" size={24} color="#F59E0B" />
              <Text style={styles.bestScoreText}>{bestScore}% Accuracy</Text>
            </View>
          </View>
        )}
      </View>

      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.startButton} onPress={handleStart}>
          <Text style={styles.startButtonText}>Start Challenge</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F3F4F6' },
  headerZone: { backgroundColor: '#1E1B4B', height: 260, alignItems: 'center', paddingTop: 60, paddingHorizontal: 20 },
  backBtn: { position: 'absolute', top: 50, left: 16 },
  challengeLabel: { color: '#A5B4FC', fontSize: 10, letterSpacing: 1, marginBottom: 8 },
  subjectName: { color: 'white', fontSize: 32, fontWeight: 'bold', marginBottom: 4 },
  dateText: { color: '#D1D5DB', fontSize: 14, marginBottom: 24 },
  countdownText: { color: 'white', fontSize: 48, fontWeight: 'bold', fontVariant: ['tabular-nums'] },
  countdownUrgent: { color: '#EF4444' },
  contentZone: { padding: 16, marginTop: -20 },
  detailsCard: { backgroundColor: 'white', padding: 20, borderRadius: 16, marginBottom: 24, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 10, elevation: 4 },
  detailRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  detailText: { fontSize: 16, color: '#374151', marginLeft: 12 },
  leadersSection: { marginBottom: 24 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#111827', marginBottom: 12 },
  leaderRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'white', padding: 12, borderRadius: 12, marginBottom: 8 },
  leaderRank: { width: 30, fontSize: 14, fontWeight: 'bold', color: '#6B7280' },
  leaderAvatar: { width: 36, height: 36, borderRadius: 18, marginRight: 12 },
  leaderName: { flex: 1, fontSize: 16, fontWeight: 'bold', color: '#111827' },
  leaderScore: { fontSize: 16, fontWeight: 'bold', color: '#10B981' },
  bestScoreSection: { marginBottom: 100 },
  bestScoreCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FEF3C7', padding: 16, borderRadius: 12 },
  bestScoreText: { fontSize: 16, fontWeight: 'bold', color: '#D97706', marginLeft: 12 },
  bottomBar: { position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: 'white', padding: 16, borderTopWidth: 1, borderTopColor: '#E5E7EB' },
  startButton: { backgroundColor: '#F59E0B', padding: 16, borderRadius: 12, alignItems: 'center' },
  startButtonText: { color: 'white', fontWeight: 'bold', fontSize: 18 },
  completedHeader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  completedTitle: { color: 'white', fontSize: 28, fontWeight: 'bold', marginTop: 16 },
  completedDate: { color: '#ECFDF5', fontSize: 16, marginTop: 8 },
  completedCard: { backgroundColor: 'white', padding: 32, borderTopLeftRadius: 32, borderTopRightRadius: 32, alignItems: 'center' },
  completedScore: { fontSize: 24, fontWeight: 'bold', color: '#111827', marginBottom: 8 },
  completedRank: { fontSize: 16, color: '#4B5563', marginBottom: 16 },
  completedXP: { fontSize: 20, fontWeight: 'bold', color: '#F59E0B', marginBottom: 32 },
  shareButton: { backgroundColor: '#4F46E5', width: '100%', padding: 16, borderRadius: 12, alignItems: 'center', marginBottom: 12 },
  shareButtonText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
  homeButton: { width: '100%', padding: 16, borderRadius: 12, alignItems: 'center', borderWidth: 1, borderColor: '#D1D5DB' },
  homeButtonText: { color: '#374151', fontWeight: 'bold', fontSize: 16 },
});
