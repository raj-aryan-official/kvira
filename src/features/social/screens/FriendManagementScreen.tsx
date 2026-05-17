import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<any, 'FriendManagementScreen'>;

export default function FriendManagementScreen({ navigation }: Props) {
  const [activeTab, setActiveTab] = useState('Friends');
  const tabs = ['Friends', 'Requests'];

  const friends = [
    { id: '1', name: 'Rahul Kumar', avatar: 'https://i.pravatar.cc/150?img=11', level: 25, school: 'DPS' },
    { id: '2', name: 'Neha Sharma', avatar: 'https://i.pravatar.cc/150?img=12', level: 22, school: 'KV' },
  ];

  const requests = [
    { id: '3', name: 'Aarav Patel', avatar: 'https://i.pravatar.cc/150?img=13', level: 15, school: 'NPS', type: 'incoming' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={{ padding: 8 }} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#111827" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Friends</Text>
        <TouchableOpacity style={{ padding: 8 }}>
          <Ionicons name="camera-outline" size={24} color="#4F46E5" />
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#9CA3AF" />
        <TextInput 
          style={styles.searchInput}
          placeholder="Search by username..."
        />
      </View>

      <View style={styles.tabsContainer}>
        {tabs.map(t => (
          <TouchableOpacity 
            key={t} 
            style={[styles.tab, activeTab === t && styles.tabActive]}
            onPress={() => setActiveTab(t)}
          >
            <Text style={[styles.tabText, activeTab === t && styles.tabTextActive]}>
              {t} {t === 'Requests' && requests.length > 0 ? `(${requests.length})` : ''}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView style={styles.content}>
        {activeTab === 'Friends' ? (
          friends.map(f => (
            <View key={f.id} style={styles.userCard}>
              <Image source={{ uri: f.avatar }} style={styles.avatar} />
              <View style={styles.userInfo}>
                <Text style={styles.userName}>{f.name}</Text>
                <Text style={styles.userMeta}>Lvl {f.level} • {f.school}</Text>
              </View>
              <TouchableOpacity style={styles.challengeBtn} onPress={() => navigation.navigate('BattleChallengeSetup')}>
                <Ionicons name="flash" size={16} color="white" />
                <Text style={styles.challengeBtnText}>Battle</Text>
              </TouchableOpacity>
            </View>
          ))
        ) : (
          requests.map(r => (
            <View key={r.id} style={styles.userCard}>
              <Image source={{ uri: r.avatar }} style={styles.avatar} />
              <View style={styles.userInfo}>
                <Text style={styles.userName}>{r.name}</Text>
                <Text style={styles.userMeta}>Lvl {r.level} • {r.school}</Text>
              </View>
              <View style={styles.requestActions}>
                <TouchableOpacity style={styles.acceptBtn}>
                  <Ionicons name="checkmark" size={20} color="white" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.declineBtn}>
                  <Ionicons name="close" size={20} color="#4B5563" />
                </TouchableOpacity>
              </View>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'white', padding: 16, paddingTop: 60 },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: '#111827' },
  searchContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'white', paddingHorizontal: 16, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#E5E7EB' },
  searchInput: { flex: 1, marginLeft: 12, fontSize: 16 },
  tabsContainer: { flexDirection: 'row', backgroundColor: 'white', borderBottomWidth: 1, borderBottomColor: '#E5E7EB' },
  tab: { flex: 1, paddingVertical: 14, alignItems: 'center', borderBottomWidth: 2, borderBottomColor: 'transparent' },
  tabActive: { borderBottomColor: '#4F46E5' },
  tabText: { color: '#6B7280', fontWeight: 'bold', fontSize: 14 },
  tabTextActive: { color: '#4F46E5' },
  content: { padding: 16 },
  userCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'white', padding: 16, borderRadius: 12, marginBottom: 12, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 5, elevation: 2 },
  avatar: { width: 48, height: 48, borderRadius: 24, marginRight: 16 },
  userInfo: { flex: 1 },
  userName: { fontSize: 16, fontWeight: 'bold', color: '#111827', marginBottom: 4 },
  userMeta: { fontSize: 12, color: '#6B7280' },
  challengeBtn: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F59E0B', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 8 },
  challengeBtnText: { color: 'white', fontWeight: 'bold', marginLeft: 4, fontSize: 12 },
  requestActions: { flexDirection: 'row', gap: 8 },
  acceptBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#10B981', justifyContent: 'center', alignItems: 'center' },
  declineBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#F3F4F6', justifyContent: 'center', alignItems: 'center' },
});
