import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface ShareScoreCardProps {
  studentName: string;
  score: number;
  total: number;
  topic: string;
  school: string;
  streak: number;
}

export const ShareScoreCard = React.forwardRef<View, ShareScoreCardProps>((props, ref) => {
  const percentage = Math.round((props.score / props.total) * 100);

  return (
    <View ref={ref} style={styles.card} collapsable={false}>
      <View style={styles.header}>
        <Text style={styles.appName}>EduQuest</Text>
        <Text style={styles.streakText}>🔥 {props.streak} Day Streak</Text>
      </View>
      
      <Text style={styles.studentName}>{props.studentName}</Text>
      <Text style={styles.schoolName}>{props.school}</Text>
      
      <View style={styles.scoreContainer}>
        <Text style={styles.scoreNumber}>{percentage}%</Text>
        <Text style={styles.scoreLabel}>Accuracy in</Text>
        <Text style={styles.topicName}>{props.topic}</Text>
      </View>
      
      <Text style={styles.footerText}>Can you beat my score?</Text>
    </View>
  );
});

const styles = StyleSheet.create({
  card: {
    width: 300,
    backgroundColor: '#1E1B4B',
    padding: 24,
    borderRadius: 16,
    alignItems: 'center',
    // In actual implementation, we might want to move this out of the view hierarchy or hide it off-screen
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  appName: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  streakText: {
    color: '#F59E0B',
    fontWeight: 'bold',
    fontSize: 14,
  },
  studentName: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  schoolName: {
    color: '#A5B4FC',
    fontSize: 14,
    marginBottom: 32,
  },
  scoreContainer: {
    backgroundColor: 'white',
    width: '100%',
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
    marginBottom: 24,
  },
  scoreNumber: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#4F46E5',
  },
  scoreLabel: {
    color: '#6B7280',
    fontSize: 14,
    marginTop: 8,
  },
  topicName: {
    color: '#111827',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 4,
  },
  footerText: {
    color: 'white',
    fontStyle: 'italic',
  },
});
