import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<any, 'SchoolSearchScreen'>;

export default function SchoolSearchScreen({ navigation }: Props) {
  const [query, setQuery] = useState('');
  const [showModal, setShowModal] = useState(false);

  const mockSchools = [
    { id: '1', name: 'Delhi Public School', city: 'New Delhi', board: 'CBSE', students: 1245 },
    { id: '2', name: 'National Public School', city: 'Bangalore', board: 'ICSE', students: 850 },
  ];

  const handleJoin = (schoolId: string) => {
    setShowModal(true);
  };

  const confirmJoin = () => {
    setShowModal(false);
    navigation.goBack();
  };

  const renderSchool = ({ item }: { item: typeof mockSchools[0] }) => (
    <View style={styles.schoolCard}>
      <View style={styles.iconBox}>
        <Ionicons name="school" size={24} color="#4F46E5" />
      </View>
      <View style={styles.schoolInfo}>
        <Text style={styles.schoolName}>{item.name}</Text>
        <Text style={styles.schoolMeta}>{item.city} • {item.board}</Text>
        <Text style={styles.studentsText}>{item.students} students on EduQuest</Text>
      </View>
      <TouchableOpacity style={styles.joinBtn} onPress={() => handleJoin(item.id)}>
        <Text style={styles.joinBtnText}>Join</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ paddingRight: 16 }}>
          <Ionicons name="arrow-back" size={24} color="#111827" />
        </TouchableOpacity>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color="#9CA3AF" />
          <TextInput 
            style={styles.input}
            placeholder="Search school name or code"
            value={query}
            onChangeText={setQuery}
            autoFocus
          />
        </View>
      </View>

      <FlatList
        data={query.length > 2 ? mockSchools : []}
        keyExtractor={item => item.id}
        renderItem={renderSchool}
        contentContainerStyle={{ padding: 16 }}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Ionicons name="school-outline" size={48} color="#D1D5DB" />
            <Text style={styles.emptyTitle}>Find Your School</Text>
            <Text style={styles.emptyDesc}>Join your school to compete on the school leaderboard and access special challenges.</Text>
          </View>
        }
      />

      <Modal visible={showModal} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <View style={styles.modalIconBox}>
              <Ionicons name="business" size={32} color="#4F46E5" />
            </View>
            <Text style={styles.modalTitle}>Join Delhi Public School?</Text>
            <Text style={styles.modalMeta}>New Delhi • CBSE</Text>
            
            <View style={styles.modalAlert}>
              <Ionicons name="information-circle" size={20} color="#047857" />
              <Text style={styles.modalAlertText}>You will appear on this school's public leaderboard. You can only change schools once every 30 days.</Text>
            </View>

            <TouchableOpacity style={styles.confirmBtn} onPress={confirmJoin}>
              <Text style={styles.confirmBtnText}>Confirm Join</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelBtn} onPress={() => setShowModal(false)}>
              <Text style={styles.cancelBtnText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F3F4F6' },
  header: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'white', padding: 16, paddingTop: 60, borderBottomWidth: 1, borderBottomColor: '#E5E7EB' },
  searchBar: { flex: 1, flexDirection: 'row', alignItems: 'center', backgroundColor: '#F3F4F6', borderRadius: 12, paddingHorizontal: 12 },
  input: { flex: 1, paddingVertical: 12, marginLeft: 8, fontSize: 16 },
  schoolCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'white', padding: 16, borderRadius: 12, marginBottom: 12, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 5, elevation: 2 },
  iconBox: { width: 48, height: 48, borderRadius: 24, backgroundColor: '#EEF2FF', justifyContent: 'center', alignItems: 'center', marginRight: 16 },
  schoolInfo: { flex: 1 },
  schoolName: { fontSize: 16, fontWeight: 'bold', color: '#111827', marginBottom: 4 },
  schoolMeta: { fontSize: 12, color: '#6B7280', marginBottom: 4 },
  studentsText: { fontSize: 11, color: '#10B981', fontWeight: 'bold' },
  joinBtn: { backgroundColor: '#4F46E5', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 8 },
  joinBtnText: { color: 'white', fontWeight: 'bold' },
  emptyState: { alignItems: 'center', marginTop: 80, padding: 24 },
  emptyTitle: { fontSize: 20, fontWeight: 'bold', color: '#111827', marginTop: 16, marginBottom: 8 },
  emptyDesc: { textAlign: 'center', color: '#6B7280', lineHeight: 22 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center', padding: 24 },
  modalCard: { backgroundColor: 'white', borderRadius: 16, padding: 24, width: '100%', alignItems: 'center' },
  modalIconBox: { width: 64, height: 64, borderRadius: 32, backgroundColor: '#EEF2FF', justifyContent: 'center', alignItems: 'center', marginBottom: 16 },
  modalTitle: { fontSize: 20, fontWeight: 'bold', color: '#111827', textAlign: 'center', marginBottom: 4 },
  modalMeta: { fontSize: 14, color: '#6B7280', marginBottom: 24 },
  modalAlert: { flexDirection: 'row', backgroundColor: '#ECFDF5', padding: 16, borderRadius: 12, marginBottom: 24 },
  modalAlertText: { flex: 1, color: '#047857', fontSize: 13, marginLeft: 12, lineHeight: 20 },
  confirmBtn: { backgroundColor: '#4F46E5', width: '100%', padding: 16, borderRadius: 12, alignItems: 'center', marginBottom: 12 },
  confirmBtnText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
  cancelBtn: { width: '100%', padding: 16, borderRadius: 12, alignItems: 'center' },
  cancelBtnText: { color: '#374151', fontWeight: 'bold', fontSize: 16 },
});
