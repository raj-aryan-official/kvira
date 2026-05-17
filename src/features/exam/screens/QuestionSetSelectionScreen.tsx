import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

// Note: Replace any with actual navigation param list type when integrating
type Props = NativeStackScreenProps<any, 'QuestionSetSelection'>;

export default function QuestionSetSelectionScreen({ navigation, route }: Props) {
  const [selectedCount, setSelectedCount] = useState<number>(20);
  const [showExplanations, setShowExplanations] = useState(true);

  const topicName = route.params?.topicName || 'Algebraic Expressions';
  const breadcrumb = `Mathematics > Algebra > ${topicName}`;
  const topicAccuracy = 68; // Mock data

  const counts = [
    { count: 10, time: '15 min' },
    { count: 20, time: '30 min', recommended: true },
    { count: 30, time: '45 min' },
    { count: 40, time: '60 min' },
    { count: 50, time: '75 min' },
  ];

  const handleStart = () => {
    navigation.navigate('ExamScreen', { count: selectedCount, showExplanations });
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.breadcrumb}>{breadcrumb}</Text>
      
      <View style={styles.accuracyCard}>
        <Text style={styles.accuracyTitle}>Current Accuracy</Text>
        <View style={styles.accuracyRow}>
          <Text style={styles.accuracyValue}>{topicAccuracy}%</Text>
          <Ionicons name="trending-up" size={24} color="#10B981" />
        </View>
      </View>

      <Text style={styles.sectionTitle}>Select Question Count</Text>
      
      <View style={styles.grid}>
        {counts.map((item) => (
          <TouchableOpacity
            key={item.count}
            style={[
              styles.countCard,
              selectedCount === item.count && styles.countCardSelected,
            ]}
            onPress={() => setSelectedCount(item.count)}
          >
            {item.recommended && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>Recommended</Text>
              </View>
            )}
            <Text style={[
              styles.countNumber,
              selectedCount === item.count && styles.textSelected
            ]}>
              {item.count}
            </Text>
            <Text style={[
              styles.countLabel,
              selectedCount === item.count && styles.textSelected
            ]}>
              Questions
            </Text>
            <Text style={[
              styles.timeLabel,
              selectedCount === item.count && styles.textSelected
            ]}>
              ~{item.time}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity 
        style={styles.infiniteCard}
        onPress={() => setSelectedCount(999)}
      >
        <Ionicons name="infinite" size={32} color={selectedCount === 999 ? 'white' : '#4F46E5'} />
        <View style={styles.infiniteTextContainer}>
          <Text style={[styles.infiniteTitle, selectedCount === 999 && {color: 'white'}]}>
            Infinite Practice Mode
          </Text>
          <Text style={[styles.infiniteSubtitle, selectedCount === 999 && {color: 'white'}]}>
            Keep going until you master the topic
          </Text>
        </View>
      </TouchableOpacity>

      <View style={styles.settingsRow}>
        <Text style={styles.settingsLabel}>Show explanations after each question</Text>
        <Switch
          value={showExplanations}
          onValueChange={setShowExplanations}
          trackColor={{ false: '#D1D5DB', true: '#4F46E5' }}
          thumbColor={'white'}
        />
      </View>

      <TouchableOpacity style={styles.startButton} onPress={handleStart}>
        <Text style={styles.startButtonText}>
          Start Test ({selectedCount === 999 ? 'Infinite' : selectedCount})
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  content: {
    padding: 16,
  },
  breadcrumb: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 16,
  },
  accuracyCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  accuracyTitle: {
    fontSize: 14,
    color: '#6B7280',
  },
  accuracyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  accuracyValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#111827',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#111827',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  countCard: {
    width: '48%',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  countCardSelected: {
    borderColor: '#4F46E5',
    backgroundColor: '#EEF2FF',
  },
  badge: {
    position: 'absolute',
    top: -10,
    backgroundColor: '#F59E0B',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: 'white',
  },
  countNumber: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#111827',
  },
  countLabel: {
    fontSize: 12,
    color: '#4B5563',
    marginBottom: 4,
  },
  timeLabel: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  textSelected: {
    color: '#4F46E5',
  },
  infiniteCard: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 24,
  },
  infiniteTextContainer: {
    marginLeft: 16,
  },
  infiniteTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
  },
  infiniteSubtitle: {
    fontSize: 12,
    color: '#6B7280',
  },
  settingsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
  },
  settingsLabel: {
    fontSize: 14,
    color: '#374151',
    flex: 1,
    marginRight: 16,
  },
  startButton: {
    backgroundColor: '#4F46E5',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  startButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
