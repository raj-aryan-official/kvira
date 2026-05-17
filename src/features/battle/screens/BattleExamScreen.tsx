import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Animated, SafeAreaView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useBattle } from '../hooks/useBattle';
import { useExamSession } from '../../exam/hooks/useExamSession';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<any, 'BattleExamScreen'>;

export default function BattleExamScreen({ navigation }: Props) {
  const { activeBattle, applyPowerUp, simulateLiveOpponent } = useBattle();
  const { initExam, handleAnswer, goNextQuestion, endExam, quit, currentQuestion, currentIndex, totalQuestions } = useExamSession();

  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  
  // Opponent indicator animation
  const oppIndicatorAnim = new Animated.Value(1);

  useEffect(() => {
    // Mock init
    initExam([
      {
        id: 'q1',
        text: 'What is the largest organ in the human body?',
        options: [
          { id: 'a', letter: 'A', text: 'Heart' },
          { id: 'b', letter: 'B', text: 'Skin' },
          { id: 'c', letter: 'C', text: 'Liver' },
          { id: 'd', letter: 'D', text: 'Brain' },
        ],
        correctOptionId: 'b',
        explanation: 'The skin is the largest organ of the human body.',
      },
      // ... more mock questions
    ], 'battle');

    // Polling simulation for opponent
    const interval = setInterval(() => {
      simulateLiveOpponent();
      
      // Pulse animation
      Animated.sequence([
        Animated.timing(oppIndicatorAnim, { toValue: 1.5, duration: 300, useNativeDriver: true }),
        Animated.timing(oppIndicatorAnim, { toValue: 1, duration: 300, useNativeDriver: true })
      ]).start();
      
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  if (!currentQuestion || !activeBattle) return null;

  const onSelectOption = (optionId: string) => {
    if (selectedOption) return;
    setSelectedOption(optionId);
    handleAnswer(optionId);
    
    // In battle mode, we go to next question immediately after a short delay
    setTimeout(() => {
      setSelectedOption(null);
      if (currentIndex === totalQuestions - 1) {
        endExam();
        navigation.replace('BattleResultScreen');
      } else {
        goNextQuestion();
      }
    }, 800);
  };

  const handlePowerUp = (powerUpId: string) => {
    Alert.alert(
      "Use Power-up",
      "You will use this power-up. This cannot be undone. Are you sure?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Activate", onPress: () => applyPowerUp(powerUpId, 20) }
      ]
    );
  };

  const myProgress = ((currentIndex) / totalQuestions) * 100;
  // Mock opponent progress based on their score assuming 10 pts per question
  const oppProgress = ((activeBattle.opponentScore / 10) / totalQuestions) * 100;

  return (
    <SafeAreaView style={styles.container}>
      {/* VS Header */}
      <View style={styles.header}>
        <View style={styles.playerInfo}>
          <Image source={{ uri: 'https://i.pravatar.cc/150?img=11' }} style={styles.avatar} />
          <View style={styles.scoreBox}>
            <Text style={styles.scoreText}>{activeBattle.myScore}</Text>
          </View>
        </View>

        <View style={styles.vsContainer}>
          <Text style={styles.vsText}>VS</Text>
          <View style={styles.timerCircle}>
            <Text style={styles.timerText}>1:45</Text>
          </View>
        </View>

        <View style={styles.playerInfo}>
          <View style={[styles.scoreBox, styles.oppScoreBox]}>
            <Text style={styles.scoreText}>{activeBattle.opponentScore}</Text>
          </View>
          <Animated.Image 
            source={{ uri: activeBattle.opponent.avatar }} 
            style={[styles.avatar, { transform: [{ scale: oppIndicatorAnim }] }]} 
          />
        </View>
      </View>

      {/* Mini Progress Bars */}
      <View style={styles.progressRow}>
        <View style={styles.progressContainer}>
          <View style={[styles.progressBar, { width: `${myProgress}%`, backgroundColor: '#4F46E5' }]} />
        </View>
        <View style={styles.progressSpacer} />
        <View style={styles.progressContainer}>
          <View style={[styles.progressBar, { width: `${oppProgress}%`, backgroundColor: '#EF4444' }]} />
        </View>
      </View>

      {/* Question Zone */}
      <View style={styles.questionZone}>
        <Text style={styles.questionNumberLabel}>QUESTION {currentIndex + 1}</Text>
        <Text style={styles.questionText}>{currentQuestion.text}</Text>
      </View>

      {/* Power-up Bar */}
      <View style={styles.powerUpBar}>
        {activeBattle.powerUpsAvailable.map(p => (
          <TouchableOpacity key={p} style={styles.powerUpBtn} onPress={() => handlePowerUp(p)}>
            <Ionicons name={p === 'extra_time' ? 'time' : p === 'double_xp' ? 'star' : 'play-skip-forward'} size={20} color="white" />
          </TouchableOpacity>
        ))}
      </View>

      {/* Options Zone */}
      <View style={styles.optionsZone}>
        {currentQuestion.options.map((opt) => {
          const isSelected = selectedOption === opt.id;
          const isCorrect = opt.id === currentQuestion.correctOptionId;
          
          let cardStyle: any = styles.optionCard;
          
          if (selectedOption) {
            if (isCorrect) cardStyle = [styles.optionCard, styles.optionCorrect];
            else if (isSelected) cardStyle = [styles.optionCard, styles.optionWrong];
          }

          return (
            <TouchableOpacity 
              key={opt.id} 
              style={cardStyle}
              onPress={() => onSelectOption(opt.id)}
              disabled={!!selectedOption}
            >
              <View style={styles.optionLetter}>
                <Text style={styles.letterText}>{opt.letter}</Text>
              </View>
              <Text style={styles.optionText}>{opt.text}</Text>
              
              {selectedOption && isCorrect && (
                <Ionicons name="checkmark-circle" size={24} color="#10B981" />
              )}
              {isSelected && !isCorrect && (
                <Ionicons name="close-circle" size={24} color="#EF4444" />
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, backgroundColor: '#1E1B4B' },
  playerInfo: { flexDirection: 'row', alignItems: 'center' },
  avatar: { width: 48, height: 48, borderRadius: 24, borderWidth: 2, borderColor: 'white' },
  scoreBox: { backgroundColor: '#4F46E5', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 12, marginLeft: -12, zIndex: -1, paddingLeft: 16 },
  oppScoreBox: { backgroundColor: '#EF4444', marginLeft: 0, marginRight: -12, paddingLeft: 12, paddingRight: 16 },
  scoreText: { color: 'white', fontWeight: 'bold' },
  vsContainer: { alignItems: 'center' },
  vsText: { color: '#A5B4FC', fontWeight: 'bold', fontSize: 16, marginBottom: 4 },
  timerCircle: { width: 48, height: 48, borderRadius: 24, borderWidth: 3, borderColor: '#F59E0B', justifyContent: 'center', alignItems: 'center' },
  timerText: { color: '#F59E0B', fontWeight: 'bold', fontSize: 12 },
  progressRow: { flexDirection: 'row', paddingHorizontal: 16, paddingTop: 16 },
  progressContainer: { flex: 1, height: 6, backgroundColor: '#E5E7EB', borderRadius: 3 },
  progressBar: { height: '100%', borderRadius: 3 },
  progressSpacer: { width: 16 },
  questionZone: { padding: 24, paddingBottom: 16 },
  questionNumberLabel: { fontSize: 12, color: '#6B7280', letterSpacing: 1, marginBottom: 12 },
  questionText: { fontSize: 17, color: '#111827', lineHeight: 26, fontWeight: '500' },
  powerUpBar: { flexDirection: 'row', justifyContent: 'center', paddingHorizontal: 24, marginBottom: 16 },
  powerUpBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#F59E0B', justifyContent: 'center', alignItems: 'center', marginHorizontal: 8, elevation: 4 },
  optionsZone: { padding: 16 },
  optionCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'white', minHeight: 56, borderRadius: 12, padding: 12, marginBottom: 12, borderWidth: 1, borderColor: '#E5E7EB' },
  optionCorrect: { backgroundColor: '#ECFDF5', borderColor: '#10B981' },
  optionWrong: { backgroundColor: '#FEF2F2', borderColor: '#EF4444' },
  optionLetter: { width: 32, height: 32, borderRadius: 16, backgroundColor: '#F3F4F6', justifyContent: 'center', alignItems: 'center', marginRight: 16 },
  letterText: { fontWeight: 'bold', color: '#4B5563' },
  optionText: { flex: 1, fontSize: 16, color: '#374151' },
});
