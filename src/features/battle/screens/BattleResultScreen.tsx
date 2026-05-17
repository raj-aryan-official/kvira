import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useBattle } from '../hooks/useBattle';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<any, 'BattleResultScreen'>;

export default function BattleResultScreen({ navigation }: Props) {
  const { activeBattle } = useBattle();
  const [showWinner, setShowWinner] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const crownAnim = new Animated.Value(-100);

  // Mock answers for breakdown
  const mockBreakdown = [
    { q: 'Q1', myCorrect: true, oppCorrect: false },
    { q: 'Q2', myCorrect: true, oppCorrect: true },
    { q: 'Q3', myCorrect: false, oppCorrect: true },
    { q: 'Q4', myCorrect: true, oppCorrect: false },
    { q: 'Q5', myCorrect: true, oppCorrect: true },
  ];

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    } else {
      setShowWinner(true);
      Animated.spring(crownAnim, {
        toValue: 0,
        tension: 50,
        friction: 5,
        useNativeDriver: true,
      }).start();
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  if (!activeBattle) return null;

  const didIWin = activeBattle.myScore >= activeBattle.opponentScore;

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
      {/* Header Area */}
      <View style={styles.headerZone}>
        <View style={styles.avatarsRow}>
          <View style={styles.avatarCol}>
            {showWinner && didIWin && (
              <Animated.View style={[styles.crownContainer, { transform: [{ translateY: crownAnim }] }]}>
                <Ionicons name="trophy" size={32} color="#F59E0B" />
              </Animated.View>
            )}
            <Image source={{ uri: 'https://i.pravatar.cc/150?img=11' }} style={[styles.avatarLarge, showWinner && didIWin && styles.avatarWinner]} />
            <Text style={styles.playerName}>You</Text>
            <Text style={styles.scoreTextLarge}>{activeBattle.myScore}</Text>
          </View>
          
          <Text style={styles.vsLabel}>VS</Text>
          
          <View style={styles.avatarCol}>
            {showWinner && !didIWin && (
              <Animated.View style={[styles.crownContainer, { transform: [{ translateY: crownAnim }] }]}>
                <Ionicons name="trophy" size={32} color="#F59E0B" />
              </Animated.View>
            )}
            <Image source={{ uri: activeBattle.opponent.avatar }} style={[styles.avatarLarge, showWinner && !didIWin && styles.avatarWinner]} />
            <Text style={styles.playerName}>{activeBattle.opponent.name}</Text>
            <Text style={styles.scoreTextLarge}>{activeBattle.opponentScore}</Text>
          </View>
        </View>

        {!showWinner ? (
          <View style={styles.countdownBox}>
            <Text style={styles.countdownText}>Results in {countdown}</Text>
          </View>
        ) : (
          <View style={styles.resultBanner}>
            <Text style={[styles.resultTitle, didIWin ? styles.winTitle : styles.loseTitle]}>
              {didIWin ? 'VICTORY' : 'BETTER LUCK NEXT TIME'}
            </Text>
            <Text style={styles.rewardsText}>
              +{didIWin ? 150 : 50} XP   •   +{didIWin ? 20 : 5} Coins
            </Text>
          </View>
        )}
      </View>

      {showWinner && (
        <View style={styles.contentZone}>
          {/* Newly unlocked tags would go here */}
          {didIWin && (
            <View style={styles.tagUnlockCard}>
              <View style={styles.tagIconBox}>
                <Ionicons name="trophy" size={24} color="#F59E0B" />
              </View>
              <View>
                <Text style={styles.tagUnlockTitle}>Tag Unlocked!</Text>
                <Text style={styles.tagUnlockName}>First Blood</Text>
              </View>
            </View>
          )}

          {/* Breakdown */}
          <Text style={styles.sectionTitle}>Question Breakdown</Text>
          <View style={styles.breakdownCard}>
            <View style={styles.breakdownHeader}>
              <Text style={styles.bdColHeader}>You</Text>
              <Text style={styles.bdColHeaderCenter}>Q#</Text>
              <Text style={styles.bdColHeader}>{activeBattle.opponent.name}</Text>
            </View>
            {mockBreakdown.map((row, i) => (
              <View key={i} style={styles.breakdownRow}>
                <View style={styles.bdIconBox}>
                  <Ionicons name={row.myCorrect ? "checkmark-circle" : "close-circle"} size={24} color={row.myCorrect ? "#10B981" : "#EF4444"} />
                </View>
                <Text style={styles.bdQNum}>{row.q}</Text>
                <View style={styles.bdIconBox}>
                  <Ionicons name={row.oppCorrect ? "checkmark-circle" : "close-circle"} size={24} color={row.oppCorrect ? "#10B981" : "#EF4444"} />
                </View>
              </View>
            ))}
          </View>

          {/* Actions */}
          <TouchableOpacity style={styles.primaryBtn} onPress={() => navigation.navigate('BattleChallengeSetup')}>
            <Text style={styles.primaryBtnText}>Rematch</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.secondaryBtn} onPress={() => navigation.navigate('BattleHome')}>
            <Text style={styles.secondaryBtnText}>Challenge Someone Else</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.ghostBtn} onPress={() => navigation.navigate('Home')}>
            <Text style={styles.ghostBtnText}>Back to Home</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F3F4F6' },
  headerZone: { backgroundColor: '#1E1B4B', padding: 24, paddingTop: 60, borderBottomLeftRadius: 32, borderBottomRightRadius: 32, alignItems: 'center' },
  avatarsRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%', paddingHorizontal: 20 },
  avatarCol: { alignItems: 'center' },
  avatarLarge: { width: 80, height: 80, borderRadius: 40, borderWidth: 3, borderColor: '#4B5563', marginBottom: 12 },
  avatarWinner: { borderColor: '#F59E0B', borderWidth: 4 },
  crownContainer: { position: 'absolute', top: -30, zIndex: 10 },
  playerName: { color: 'white', fontWeight: 'bold', fontSize: 16, marginBottom: 4 },
  scoreTextLarge: { color: '#A5B4FC', fontSize: 24, fontWeight: 'bold' },
  vsLabel: { color: 'white', fontSize: 20, fontWeight: 'bold', fontStyle: 'italic', opacity: 0.5 },
  countdownBox: { marginTop: 40, backgroundColor: 'rgba(255,255,255,0.1)', paddingHorizontal: 24, paddingVertical: 12, borderRadius: 20 },
  countdownText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
  resultBanner: { marginTop: 40, alignItems: 'center' },
  resultTitle: { fontSize: 32, fontWeight: 'bold', letterSpacing: 2, marginBottom: 8 },
  winTitle: { color: '#FCD34D' },
  loseTitle: { color: '#9CA3AF' },
  rewardsText: { color: 'white', fontSize: 16 },
  contentZone: { padding: 24 },
  tagUnlockCard: { flexDirection: 'row', backgroundColor: '#FEF3C7', padding: 16, borderRadius: 12, alignItems: 'center', marginBottom: 24 },
  tagIconBox: { width: 48, height: 48, borderRadius: 24, backgroundColor: '#FDE68A', justifyContent: 'center', alignItems: 'center', marginRight: 16 },
  tagUnlockTitle: { color: '#D97706', fontSize: 12, fontWeight: 'bold', textTransform: 'uppercase' },
  tagUnlockName: { color: '#92400E', fontSize: 18, fontWeight: 'bold' },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#111827', marginBottom: 16 },
  breakdownCard: { backgroundColor: 'white', borderRadius: 16, padding: 16, marginBottom: 24 },
  breakdownHeader: { flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 1, borderBottomColor: '#E5E7EB', paddingBottom: 12, marginBottom: 12 },
  bdColHeader: { flex: 1, textAlign: 'center', fontWeight: 'bold', color: '#6B7280' },
  bdColHeaderCenter: { width: 40, textAlign: 'center', fontWeight: 'bold', color: '#6B7280' },
  breakdownRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  bdIconBox: { flex: 1, alignItems: 'center' },
  bdQNum: { width: 40, textAlign: 'center', color: '#374151', fontWeight: 'bold' },
  primaryBtn: { backgroundColor: '#4F46E5', padding: 16, borderRadius: 12, alignItems: 'center', marginBottom: 12 },
  primaryBtnText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
  secondaryBtn: { padding: 16, borderRadius: 12, alignItems: 'center', borderWidth: 1, borderColor: '#D1D5DB', marginBottom: 12 },
  secondaryBtnText: { color: '#374151', fontWeight: 'bold', fontSize: 16 },
  ghostBtn: { padding: 16, alignItems: 'center' },
  ghostBtnText: { color: '#4F46E5', fontWeight: 'bold', fontSize: 16 },
});
