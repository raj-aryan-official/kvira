import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useBattle } from '../hooks/useBattle';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<any, 'BattleHome'>;

export default function BattleHomeScreen({ navigation }: Props) {
  const { battleStats, pendingChallenges, acceptChallenge, declineChallenge } = useBattle();

  return (
    <ScrollView style={styles.container}>
      {/* Stats Header */}
      <View style={styles.statsHeader}>
        <Text style={styles.statsTitle}>Battle Record</Text>
        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>{battleStats.wins}</Text>
            <Text style={styles.statLabel}>Wins</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>{battleStats.losses}</Text>
            <Text style={styles.statLabel}>Losses</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>{Math.round(battleStats.winRate)}%</Text>
            <Text style={styles.statLabel}>Win Rate</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={[styles.statValue, { color: '#F59E0B' }]}>{battleStats.currentBattleStreak}</Text>
            <Text style={styles.statLabel}>Streak</Text>
          </View>
        </View>
      </View>

      <View style={styles.content}>
        {/* Pending Challenges */}
        {pendingChallenges.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Pending Challenges</Text>
            {pendingChallenges.map(challenge => (
              <View key={challenge.id} style={styles.challengeCard}>
                <View style={styles.challengeInfo}>
                  <Text style={styles.challengerName}>{challenge.challengerName} challenged you!</Text>
                  <Text style={styles.challengeDetails}>{challenge.subject} • {challenge.topic} • {challenge.questionCount} Qs</Text>
                </View>
                <View style={styles.challengeActions}>
                  <TouchableOpacity style={styles.acceptBtn} onPress={() => {
                    acceptChallenge(challenge.id);
                    navigation.navigate('BattleExamScreen');
                  }}>
                    <Text style={styles.acceptBtnText}>Accept</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.declineBtn} onPress={() => declineChallenge(challenge.id)}>
                    <Text style={styles.declineBtnText}>Decline</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        )}

        {/* Start Battle Options */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Start a Battle</Text>
          
          <TouchableOpacity style={styles.modeCard} onPress={() => navigation.navigate('BattleChallengeSetup')}>
            <View style={[styles.modeIcon, { backgroundColor: '#EEF2FF' }]}>
              <Ionicons name="people" size={24} color="#4F46E5" />
            </View>
            <View style={styles.modeTextContainer}>
              <Text style={styles.modeTitle}>Challenge Friend</Text>
              <Text style={styles.modeSubtitle}>Play against your friends</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.modeCard}>
            <View style={[styles.modeIcon, { backgroundColor: '#FEF3C7' }]}>
              <Ionicons name="shuffle" size={24} color="#F59E0B" />
            </View>
            <View style={styles.modeTextContainer}>
              <Text style={styles.modeTitle}>Random Match</Text>
              <Text style={styles.modeSubtitle}>Find an opponent of your level</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.modeCard}>
            <View style={[styles.modeIcon, { backgroundColor: '#ECFDF5' }]}>
              <Ionicons name="school" size={24} color="#10B981" />
            </View>
            <View style={styles.modeTextContainer}>
              <Text style={styles.modeTitle}>School Battle</Text>
              <Text style={styles.modeSubtitle}>Defend your school's honor</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.modeCard}>
            <View style={[styles.modeIcon, { backgroundColor: '#FEE2E2' }]}>
              <Ionicons name="flash" size={24} color="#EF4444" />
            </View>
            <View style={styles.modeTextContainer}>
              <Text style={styles.modeTitle}>Quick Battle</Text>
              <Text style={styles.modeSubtitle}>Instant 10 question match</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.historyBtn} onPress={() => navigation.navigate('BattleHistoryScreen')}>
          <Text style={styles.historyBtnText}>View Battle History</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F3F4F6' },
  statsHeader: { backgroundColor: '#1E1B4B', padding: 24, paddingTop: 60, paddingBottom: 40 },
  statsTitle: { color: 'white', fontSize: 20, fontWeight: 'bold', marginBottom: 20 },
  statsRow: { flexDirection: 'row', justifyContent: 'space-between' },
  statBox: { alignItems: 'center' },
  statValue: { color: 'white', fontSize: 24, fontWeight: 'bold' },
  statLabel: { color: '#A5B4FC', fontSize: 12, marginTop: 4 },
  content: { padding: 16, marginTop: -20 },
  section: { marginBottom: 24 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#111827', marginBottom: 12 },
  challengeCard: { backgroundColor: 'white', padding: 16, borderRadius: 12, marginBottom: 12, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 10, elevation: 2 },
  challengeInfo: { marginBottom: 12 },
  challengerName: { fontWeight: 'bold', color: '#111827', fontSize: 16, marginBottom: 4 },
  challengeDetails: { color: '#6B7280', fontSize: 13 },
  challengeActions: { flexDirection: 'row', justifyContent: 'space-between' },
  acceptBtn: { flex: 1, backgroundColor: '#4F46E5', padding: 10, borderRadius: 8, alignItems: 'center', marginRight: 8 },
  acceptBtnText: { color: 'white', fontWeight: 'bold' },
  declineBtn: { flex: 1, backgroundColor: '#F3F4F6', padding: 10, borderRadius: 8, alignItems: 'center', marginLeft: 8 },
  declineBtnText: { color: '#4B5563', fontWeight: 'bold' },
  modeCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'white', padding: 16, borderRadius: 12, marginBottom: 12 },
  modeIcon: { width: 48, height: 48, borderRadius: 24, justifyContent: 'center', alignItems: 'center', marginRight: 16 },
  modeTextContainer: { flex: 1 },
  modeTitle: { fontSize: 16, fontWeight: 'bold', color: '#111827' },
  modeSubtitle: { fontSize: 13, color: '#6B7280' },
  historyBtn: { backgroundColor: 'white', padding: 16, borderRadius: 12, alignItems: 'center', borderWidth: 1, borderColor: '#D1D5DB' },
  historyBtnText: { color: '#374151', fontWeight: 'bold' },
});
