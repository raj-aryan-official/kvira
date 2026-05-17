import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useBattle } from '../hooks/useBattle';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { BattleHistoryItem } from '../store/battleSlice';

type Props = NativeStackScreenProps<any, 'BattleHistoryScreen'>;

export default function BattleHistoryScreen({ navigation }: Props) {
  const { battleHistory } = useBattle();

  const renderItem = ({ item }: { item: BattleHistoryItem }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <View style={[styles.resultBadge, { backgroundColor: item.won ? '#ECFDF5' : '#FEF2F2' }]}>
          <Text style={[styles.resultText, { color: item.won ? '#10B981' : '#EF4444' }]}>
            {item.won ? 'VICTORY' : 'DEFEAT'}
          </Text>
        </View>
        <Text style={styles.dateText}>{item.date}</Text>
      </View>
      
      <View style={styles.mainInfo}>
        <Text style={styles.vsText}>vs {item.opponentName}</Text>
        <Text style={styles.scoreText}>{item.score}</Text>
      </View>
      
      <Text style={styles.subjectText}>{item.subject}</Text>
      
      {item.tagsEarned && item.tagsEarned.length > 0 && (
        <View style={styles.tagsContainer}>
          {item.tagsEarned.map((tag, idx) => (
            <View key={idx} style={styles.tagPill}>
              <Ionicons name="trophy" size={12} color="#F59E0B" />
              <Text style={styles.tagText}>{tag}</Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ padding: 8 }}>
          <Ionicons name="arrow-back" size={24} color="#111827" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Battle History</Text>
        <View style={{ width: 40 }} />
      </View>
      
      <FlatList
        data={battleHistory}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, paddingTop: 60, backgroundColor: 'white', borderBottomWidth: 1, borderBottomColor: '#E5E7EB' },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: '#111827' },
  listContent: { padding: 16 },
  card: { backgroundColor: 'white', padding: 16, borderRadius: 12, marginBottom: 12, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 10, elevation: 2 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  resultBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 },
  resultText: { fontWeight: 'bold', fontSize: 12 },
  dateText: { color: '#9CA3AF', fontSize: 12 },
  mainInfo: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 },
  vsText: { fontSize: 18, fontWeight: 'bold', color: '#111827' },
  scoreText: { fontSize: 18, fontWeight: 'bold', color: '#4F46E5' },
  subjectText: { color: '#6B7280', fontSize: 14, marginBottom: 12 },
  tagsContainer: { flexDirection: 'row', flexWrap: 'wrap', borderTopWidth: 1, borderTopColor: '#F3F4F6', paddingTop: 12 },
  tagPill: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FEF3C7', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8, marginRight: 8 },
  tagText: { color: '#D97706', fontSize: 10, fontWeight: 'bold', marginLeft: 4 },
});
