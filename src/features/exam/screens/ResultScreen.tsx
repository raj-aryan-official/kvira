import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import Svg, { Circle } from 'react-native-svg';
import { Ionicons } from '@expo/vector-icons';
import ViewShot from 'react-native-view-shot';
import * as Sharing from 'expo-sharing';
import { ShareScoreCard } from '../components/ShareScoreCard';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<any, 'ResultScreen'>;

export default function ResultScreen({ navigation }: Props) {
  const { answers, questions, xpEarned } = useSelector((state: RootState) => state.exam);
  const { streakCurrent } = useSelector((state: RootState) => state.gamification);
  const shareCardRef = useRef<any>(null);

  const correctCount = answers.filter((a) => a.isCorrect).length;
  const total = questions.length || 1;
  const scorePercent = (correctCount / total) * 100;

  const getRingColor = () => {
    if (scorePercent > 70) return '#10B981';
    if (scorePercent >= 40) return '#3B82F6';
    return '#F59E0B';
  };

  const getGradeLabel = () => {
    if (scorePercent > 70) return 'Great Work';
    if (scorePercent >= 40) return 'Good Effort';
    return 'Keep Practicing';
  };

  const handleShare = async () => {
    try {
      if (shareCardRef.current && shareCardRef.current.capture) {
        const uri = await shareCardRef.current.capture();
        if (await Sharing.isAvailableAsync()) {
          await Sharing.shareAsync(uri);
        }
      }
    } catch (err) {
      console.log('Error sharing:', err);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Top Dark Zone */}
        <View style={styles.topZone}>
          {/* Lottie Confetti would go here conditionally */}

          <View style={styles.ringContainer}>
            <Svg width={140} height={140}>
              <Circle cx={70} cy={70} r={60} stroke="rgba(255,255,255,0.2)" strokeWidth={8} fill="none" />
              <Circle 
                cx={70} cy={70} r={60} 
                stroke={getRingColor()} 
                strokeWidth={8} 
                fill="none" 
                strokeDasharray={`${(scorePercent / 100) * 377} 377`}
                strokeLinecap="round"
                rotation="-90"
                origin="70, 70"
              />
            </Svg>
            <View style={styles.scoreTextContainer}>
              <Text style={styles.scoreText}>{correctCount}/{total}</Text>
            </View>
          </View>
          
          <Text style={styles.gradeLabel}>{getGradeLabel()}</Text>
          <Text style={styles.topicInfo}>Mathematics • Algebra</Text>
        </View>

        <View style={styles.contentZone}>
          {/* XP Breakdown Card */}
          <View style={styles.xpCard}>
            <Text style={styles.sectionTitle}>XP Earned</Text>
            <View style={styles.xpRow}>
              <Text style={styles.xpItemText}>Correct Answers ({correctCount})</Text>
              <Text style={styles.xpItemValue}>+{correctCount * 10}</Text>
            </View>
            <View style={styles.xpRow}>
              <Text style={styles.xpItemText}>Completion Bonus</Text>
              <Text style={styles.xpItemValue}>+{total * 5}</Text>
            </View>
            <View style={[styles.xpRow, styles.xpTotalRow]}>
              <Text style={styles.xpTotalText}>Total XP</Text>
              <Text style={styles.xpTotalValue}>{xpEarned}</Text>
            </View>
          </View>

          {/* Topic Performance */}
          <View style={styles.performanceSection}>
            <Text style={styles.sectionTitle}>Topic Performance</Text>
            <View style={styles.perfRow}>
              <View style={styles.perfBarContainer}>
                <View style={[styles.perfBar, { width: `${scorePercent}%`, backgroundColor: getRingColor() }]} />
              </View>
              <Text style={styles.perfText}>{Math.round(scorePercent)}%</Text>
            </View>
            {scorePercent < 50 && (
              <TouchableOpacity style={styles.drillButton}>
                <Text style={styles.drillButtonText}>Drill This Topic</Text>
              </TouchableOpacity>
            )}
          </View>

          {/* Questions Review (Simplified for now) */}
          <View style={styles.reviewSection}>
            <Text style={styles.sectionTitle}>Question Review</Text>
            <Text style={styles.reviewSubtitle}>{answers.filter(a => !a.isCorrect).length} Incorrect Answers</Text>
            {/* List goes here */}
          </View>
        </View>
      </ScrollView>

      {/* Bottom Actions */}
      <View style={styles.bottomActions}>
        {scorePercent < 100 && (
          <TouchableOpacity style={styles.retryButton}>
            <Text style={styles.retryButtonText}>Retry Wrong Answers</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity style={styles.secondaryButton} onPress={() => navigation.goBack()}>
          <Text style={styles.secondaryButtonText}>Practice Again</Text>
        </TouchableOpacity>
        
        <View style={styles.rowActions}>
          <TouchableOpacity style={styles.ghostButton} onPress={handleShare}>
            <Ionicons name="share-social-outline" size={20} color="#4F46E5" />
            <Text style={styles.ghostButtonText}>Share Score</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.ghostButton} onPress={() => navigation.navigate('Home')}>
            <Text style={styles.ghostButtonText}>Home</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Hidden view for capturing share image */}
      <View style={{ position: 'absolute', top: -2000 }}>
        <ViewShot ref={shareCardRef} options={{ format: 'jpg', quality: 0.9 }}>
          <ShareScoreCard 
            studentName="Student" 
            score={correctCount} 
            total={total} 
            topic="Algebra" 
            school="Delhi Public School" 
            streak={streakCurrent} 
          />
        </ViewShot>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F3F4F6' },
  scrollContent: { paddingBottom: 200 },
  topZone: { backgroundColor: '#1E1B4B', padding: 40, alignItems: 'center', borderBottomLeftRadius: 32, borderBottomRightRadius: 32 },
  ringContainer: { width: 140, height: 140, justifyContent: 'center', alignItems: 'center', marginBottom: 24 },
  scoreTextContainer: { position: 'absolute', justifyContent: 'center', alignItems: 'center' },
  scoreText: { color: 'white', fontSize: 36, fontWeight: 'bold' },
  gradeLabel: { color: 'white', fontSize: 24, fontWeight: 'bold', marginBottom: 8 },
  topicInfo: { color: '#A5B4FC', fontSize: 14 },
  contentZone: { padding: 16, marginTop: -20 },
  xpCard: { backgroundColor: 'white', padding: 24, borderRadius: 16, marginBottom: 16, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 10, elevation: 3 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#111827', marginBottom: 16 },
  xpRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  xpItemText: { color: '#4B5563', fontSize: 16 },
  xpItemValue: { color: '#10B981', fontWeight: 'bold', fontSize: 16 },
  xpTotalRow: { marginTop: 8, paddingTop: 16, borderTopWidth: 1, borderTopColor: '#E5E7EB' },
  xpTotalText: { fontWeight: 'bold', fontSize: 18, color: '#111827' },
  xpTotalValue: { fontWeight: 'bold', fontSize: 18, color: '#F59E0B' },
  performanceSection: { backgroundColor: 'white', padding: 24, borderRadius: 16, marginBottom: 16 },
  perfRow: { flexDirection: 'row', alignItems: 'center' },
  perfBarContainer: { flex: 1, height: 8, backgroundColor: '#F3F4F6', borderRadius: 4, marginRight: 16 },
  perfBar: { height: '100%', borderRadius: 4 },
  perfText: { fontWeight: 'bold', color: '#374151', width: 40, textAlign: 'right' },
  drillButton: { marginTop: 16, backgroundColor: '#EEF2FF', padding: 12, borderRadius: 8, alignItems: 'center' },
  drillButtonText: { color: '#4F46E5', fontWeight: 'bold' },
  reviewSection: { backgroundColor: 'white', padding: 24, borderRadius: 16 },
  reviewSubtitle: { color: '#EF4444', fontWeight: 'bold', marginBottom: 16 },
  bottomActions: { position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: 'white', padding: 16, paddingBottom: 32, borderTopWidth: 1, borderTopColor: '#E5E7EB' },
  retryButton: { backgroundColor: '#4F46E5', padding: 16, borderRadius: 12, alignItems: 'center', marginBottom: 12 },
  retryButtonText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
  secondaryButton: { padding: 16, borderRadius: 12, alignItems: 'center', borderWidth: 1, borderColor: '#D1D5DB', marginBottom: 12 },
  secondaryButtonText: { color: '#374151', fontWeight: 'bold', fontSize: 16 },
  rowActions: { flexDirection: 'row', justifyContent: 'space-between' },
  ghostButton: { flexDirection: 'row', padding: 12, alignItems: 'center', justifyContent: 'center', flex: 1 },
  ghostButtonText: { color: '#4F46E5', fontWeight: 'bold', marginLeft: 8 },
});
