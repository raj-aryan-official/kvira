import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Image, Animated, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useExamSession } from '../hooks/useExamSession';

type Props = NativeStackScreenProps<any, 'ExamScreen'>;

export default function ExamScreen({ navigation, route }: Props) {
  const { count, showExplanations } = route.params || { count: 20, showExplanations: true };
  const { initExam, handleAnswer, goNextQuestion, endExam, quit, currentQuestion, currentIndex, totalQuestions, xpEarned, isLastQuestion } = useExamSession();

  const [exitModalVisible, setExitModalVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showExplanationSheet, setShowExplanationSheet] = useState(false);

  useEffect(() => {
    // Mock init
    initExam([
      {
        id: 'q1',
        text: 'What is the value of x in 2x + 5 = 15?',
        options: [
          { id: 'a', letter: 'A', text: '5' },
          { id: 'b', letter: 'B', text: '10' },
          { id: 'c', letter: 'C', text: '20' },
          { id: 'd', letter: 'D', text: '2' },
        ],
        correctOptionId: 'a',
        explanation: 'Subtract 5 from both sides to get 2x = 10. Then divide by 2 to get x = 5.',
      }
    ]);
  }, []);

  if (!currentQuestion) return null;

  const onSelectOption = (optionId: string) => {
    if (selectedOption) return; // Prevent double tap
    setSelectedOption(optionId);
    handleAnswer(optionId);
    
    if (showExplanations) {
      setTimeout(() => setShowExplanationSheet(true), 500);
    } else {
      setTimeout(() => goNext(), 1000);
    }
  };

  const goNext = () => {
    setShowExplanationSheet(false);
    setSelectedOption(null);
    if (isLastQuestion) {
      endExam();
      navigation.replace('ResultScreen');
    } else {
      goNextQuestion();
    }
  };

  const isCorrect = selectedOption === currentQuestion.correctOptionId;
  const progressPercent = ((currentIndex) / totalQuestions) * 100;

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.progressBar, { width: `${progressPercent}%` }]} />
      
      <View style={styles.header}>
        <TouchableOpacity onPress={() => setExitModalVisible(true)}>
          <Ionicons name="close" size={28} color="#4B5563" />
        </TouchableOpacity>
        <Text style={styles.progressText}>Question {currentIndex + 1} of {totalQuestions}</Text>
        <View style={styles.xpCounter}>
          <Text style={styles.xpText}>{xpEarned} XP</Text>
        </View>
      </View>

      <View style={styles.questionZone}>
        <Text style={styles.questionNumberLabel}>QUESTION {currentIndex + 1}</Text>
        <Text style={styles.questionText}>{currentQuestion.text}</Text>
        {currentQuestion.imageUrl && (
          <Image source={{ uri: currentQuestion.imageUrl }} style={styles.questionImage} resizeMode="contain" />
        )}
        <TouchableOpacity style={styles.flagIcon}>
          <Ionicons name="flag-outline" size={20} color="#9CA3AF" />
        </TouchableOpacity>
      </View>

      <View style={styles.optionsZone}>
        {currentQuestion.options.map((opt) => {
          const isSelected = selectedOption === opt.id;
          const isOptCorrect = opt.id === currentQuestion.correctOptionId;
          
          let cardStyle: any = styles.optionCard;
          let letterStyle: any = styles.optionLetter;
          
          if (selectedOption) {
            if (isOptCorrect) {
              cardStyle = [styles.optionCard, styles.optionCorrect];
              letterStyle = [styles.optionLetter, styles.letterCorrect];
            } else if (isSelected) {
              cardStyle = [styles.optionCard, styles.optionWrong];
              letterStyle = [styles.optionLetter, styles.letterWrong];
            }
          }

          return (
            <TouchableOpacity 
              key={opt.id} 
              style={cardStyle}
              onPress={() => onSelectOption(opt.id)}
              disabled={!!selectedOption}
            >
              <View style={letterStyle}>
                <Text style={styles.letterText}>{opt.letter}</Text>
              </View>
              <Text style={styles.optionText}>{opt.text}</Text>
              
              {selectedOption && isOptCorrect && (
                <Ionicons name="checkmark-circle" size={24} color="#10B981" style={styles.resultIcon} />
              )}
              {isSelected && !isOptCorrect && (
                <Ionicons name="close-circle" size={24} color="#EF4444" style={styles.resultIcon} />
              )}
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Explanation Bottom Sheet */}
      {showExplanationSheet && (
        <View style={styles.bottomSheet}>
          <View style={styles.sheetHeader}>
            <Text style={[styles.sheetTitle, { color: isCorrect ? '#10B981' : '#EF4444' }]}>
              {isCorrect ? 'Correct! +10 XP' : 'Incorrect'}
            </Text>
          </View>
          <Text style={styles.explanationText}>{currentQuestion.explanation}</Text>
          <TouchableOpacity style={styles.nextButton} onPress={goNext}>
            <Text style={styles.nextButtonText}>{isLastQuestion ? 'View Results' : 'Next Question'}</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Exit Confirmation Dialog */}
      <Modal visible={exitModalVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Exit Test?</Text>
            <Text style={styles.modalText}>Your progress will be lost if you exit now.</Text>
            <TouchableOpacity style={styles.primaryBtn} onPress={() => setExitModalVisible(false)}>
              <Text style={styles.primaryBtnText}>Keep Going</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.dangerBtn} onPress={() => {
              setExitModalVisible(false);
              quit();
              navigation.goBack();
            }}>
              <Text style={styles.dangerBtnText}>Exit Test</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB' },
  progressBar: { position: 'absolute', top: 0, left: 0, height: 4, backgroundColor: '#4F46E5', zIndex: 10 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16 },
  progressText: { fontSize: 16, fontWeight: 'bold', color: '#111827' },
  xpCounter: { backgroundColor: '#FEF3C7', paddingHorizontal: 12, paddingVertical: 4, borderRadius: 16 },
  xpText: { color: '#D97706', fontWeight: 'bold' },
  questionZone: { padding: 24, paddingBottom: 16 },
  questionNumberLabel: { fontSize: 12, color: '#6B7280', letterSpacing: 1, marginBottom: 12 },
  questionText: { fontSize: 17, color: '#111827', lineHeight: 26, fontWeight: '500' },
  questionImage: { width: '100%', height: 180, marginTop: 16, borderRadius: 8 },
  flagIcon: { position: 'absolute', bottom: 16, right: 24 },
  optionsZone: { padding: 16 },
  optionCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'white', minHeight: 56, borderRadius: 12, padding: 12, marginBottom: 12, borderWidth: 1, borderColor: '#E5E7EB' },
  optionCorrect: { backgroundColor: '#ECFDF5', borderColor: '#10B981' },
  optionWrong: { backgroundColor: '#FEF2F2', borderColor: '#EF4444' },
  optionLetter: { width: 32, height: 32, borderRadius: 16, backgroundColor: '#F3F4F6', justifyContent: 'center', alignItems: 'center', marginRight: 16 },
  letterCorrect: { backgroundColor: '#10B981' },
  letterWrong: { backgroundColor: '#EF4444' },
  letterText: { fontWeight: 'bold', color: '#4B5563' },
  optionText: { flex: 1, fontSize: 16, color: '#374151' },
  resultIcon: { marginLeft: 16 },
  bottomSheet: { position: 'absolute', bottom: 0, left: 0, right: 0, height: 220, backgroundColor: '#1E1B4B', padding: 24, borderTopLeftRadius: 24, borderTopRightRadius: 24 },
  sheetHeader: { marginBottom: 16 },
  sheetTitle: { fontSize: 20, fontWeight: 'bold' },
  explanationText: { color: '#A5B4FC', fontSize: 14, lineHeight: 20, marginBottom: 24 },
  nextButton: { backgroundColor: '#4F46E5', padding: 16, borderRadius: 12, alignItems: 'center' },
  nextButtonText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center', padding: 24 },
  modalCard: { backgroundColor: 'white', padding: 24, borderRadius: 16, width: '100%', alignItems: 'center' },
  modalTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 8 },
  modalText: { color: '#6B7280', textAlign: 'center', marginBottom: 24 },
  primaryBtn: { backgroundColor: '#4F46E5', width: '100%', padding: 14, borderRadius: 8, alignItems: 'center', marginBottom: 12 },
  primaryBtnText: { color: 'white', fontWeight: 'bold' },
  dangerBtn: { width: '100%', padding: 14, borderRadius: 8, alignItems: 'center', borderWidth: 1, borderColor: '#EF4444' },
  dangerBtnText: { color: '#EF4444', fontWeight: 'bold' },
});
