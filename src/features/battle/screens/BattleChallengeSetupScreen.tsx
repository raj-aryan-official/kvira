import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useBattle } from '../hooks/useBattle';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<any, 'BattleChallengeSetup'>;

export default function BattleChallengeSetupScreen({ navigation }: Props) {
  const { sendChallenge } = useBattle();
  const [opponent, setOpponent] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('Mathematics');
  const [selectedTopic, setSelectedTopic] = useState('Algebra');
  const [questionCount, setQuestionCount] = useState(10);

  const subjects = ['Mathematics', 'Science', 'English', 'History'];
  const counts = [10, 20, 30];

  const handleStart = () => {
    sendChallenge('mock_opp_id', selectedSubject, selectedTopic, questionCount);
    // Navigate to waiting screen (here we just use a timeout to simulate accept and go to exam)
    navigation.replace('BattleExamScreen');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#111827" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Challenge Setup</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.content}>
        <Text style={styles.sectionTitle}>Select Opponent</Text>
        <View style={styles.inputContainer}>
          <Ionicons name="search" size={20} color="#9CA3AF" style={styles.inputIcon} />
          <TextInput 
            style={styles.input} 
            placeholder="Search username or friend"
            value={opponent}
            onChangeText={setOpponent}
          />
        </View>

        <Text style={styles.sectionTitle}>Select Subject</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.pillScroll}>
          {subjects.map(sub => (
            <TouchableOpacity 
              key={sub} 
              style={[styles.pill, selectedSubject === sub && styles.pillActive]}
              onPress={() => setSelectedSubject(sub)}
            >
              <Text style={[styles.pillText, selectedSubject === sub && styles.pillTextActive]}>{sub}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <Text style={styles.sectionTitle}>Select Topic</Text>
        <TouchableOpacity style={styles.dropdownBtn}>
          <Text style={styles.dropdownText}>{selectedTopic}</Text>
          <Ionicons name="chevron-down" size={20} color="#6B7280" />
        </TouchableOpacity>

        <Text style={styles.sectionTitle}>Question Count</Text>
        <View style={styles.countGrid}>
          {counts.map(count => (
            <TouchableOpacity 
              key={count} 
              style={[styles.countBtn, questionCount === count && styles.countBtnActive]}
              onPress={() => setQuestionCount(count)}
            >
              <Text style={[styles.countBtnText, questionCount === count && styles.countBtnTextActive]}>{count}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.startBtn} onPress={handleStart}>
          <Text style={styles.startBtnText}>Send Challenge</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, paddingTop: 60, backgroundColor: 'white', borderBottomWidth: 1, borderBottomColor: '#F3F4F6' },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: '#111827' },
  content: { padding: 24 },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', color: '#374151', marginBottom: 12, marginTop: 24 },
  inputContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'white', borderRadius: 12, paddingHorizontal: 16, borderWidth: 1, borderColor: '#E5E7EB' },
  inputIcon: { marginRight: 12 },
  input: { flex: 1, paddingVertical: 16, fontSize: 16, color: '#111827' },
  pillScroll: { flexGrow: 0 },
  pill: { paddingHorizontal: 20, paddingVertical: 10, borderRadius: 20, backgroundColor: 'white', borderWidth: 1, borderColor: '#E5E7EB', marginRight: 12 },
  pillActive: { backgroundColor: '#4F46E5', borderColor: '#4F46E5' },
  pillText: { color: '#6B7280', fontWeight: 'bold' },
  pillTextActive: { color: 'white' },
  dropdownBtn: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'white', padding: 16, borderRadius: 12, borderWidth: 1, borderColor: '#E5E7EB' },
  dropdownText: { fontSize: 16, color: '#111827' },
  countGrid: { flexDirection: 'row', justifyContent: 'space-between' },
  countBtn: { flex: 1, backgroundColor: 'white', padding: 16, borderRadius: 12, alignItems: 'center', marginHorizontal: 4, borderWidth: 1, borderColor: '#E5E7EB' },
  countBtnActive: { backgroundColor: '#EEF2FF', borderColor: '#4F46E5' },
  countBtnText: { fontSize: 18, fontWeight: 'bold', color: '#6B7280' },
  countBtnTextActive: { color: '#4F46E5' },
  startBtn: { backgroundColor: '#4F46E5', padding: 16, borderRadius: 12, alignItems: 'center', marginTop: 40 },
  startBtnText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
});
