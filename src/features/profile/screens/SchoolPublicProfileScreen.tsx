import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import * as Clipboard from 'expo-clipboard';

type Props = NativeStackScreenProps<any, 'SchoolPublicProfileScreen'>;

export default function SchoolPublicProfileScreen({ navigation }: Props) {
  const schoolCode = "DPS2023";

  const copyCode = async () => {
    await Clipboard.setStringAsync(schoolCode);
    Alert.alert("Copied!", "School code copied to clipboard.");
  };

  const topStudents = [
    { id: '1', name: 'Rahul Kumar', xp: 4500, avatar: 'https://i.pravatar.cc/150?img=11' },
    { id: '2', name: 'Neha Sharma', xp: 4200, avatar: 'https://i.pravatar.cc/150?img=12' },
    { id: '3', name: 'Aarav Patel', xp: 3900, avatar: 'https://i.pravatar.cc/150?img=13' },
    { id: '4', name: 'Simran Kaur', xp: 3500, avatar: 'https://i.pravatar.cc/150?img=14' },
    { id: '5', name: 'Vikram Singh', xp: 3100, avatar: 'https://i.pravatar.cc/150?img=15' },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#111827" />
        </TouchableOpacity>
        
        <View style={styles.iconBox}>
          <Ionicons name="school" size={48} color="#4F46E5" />
        </View>
        <Text style={styles.schoolName}>Delhi Public School</Text>
        <Text style={styles.schoolMeta}>New Delhi • CBSE</Text>
        
        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={styles.statVal}>1,245</Text>
            <Text style={styles.statLabel}>Students</Text>
          </View>
          <View style={styles.divider} />
          <TouchableOpacity style={styles.statBox} onPress={copyCode}>
            <Text style={[styles.statVal, { color: '#4F46E5' }]}>{schoolCode}</Text>
            <Text style={styles.statLabel}>Tap to copy code</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.badgesSection}>
        <View style={[styles.badgeCard, { backgroundColor: '#FEF3C7' }]}>
          <Ionicons name="medal" size={32} color="#D97706" />
          <View style={styles.badgeInfo}>
            <Text style={styles.badgeRank}>#4</Text>
            <Text style={styles.badgeLabel}>State Rank</Text>
          </View>
        </View>
        <View style={[styles.badgeCard, { backgroundColor: '#F3F4F6' }]}>
          <Ionicons name="medal" size={32} color="#6B7280" />
          <View style={styles.badgeInfo}>
            <Text style={styles.badgeRank}>#152</Text>
            <Text style={styles.badgeLabel}>National Rank</Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Top Students This Week</Text>
        {topStudents.map((s, index) => (
          <View key={s.id} style={styles.studentRow}>
            <Text style={styles.rankNum}>#{index + 1}</Text>
            <Image source={{ uri: s.avatar }} style={styles.avatar} />
            <Text style={styles.studentName}>{s.name}</Text>
            <Text style={styles.xpText}>{s.xp} XP</Text>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About</Text>
        <Text style={styles.aboutText}>
          Delhi Public School is committed to academic excellence. Our students actively participate in EduQuest challenges to improve their learning outcomes.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB' },
  header: { alignItems: 'center', backgroundColor: 'white', padding: 24, paddingTop: 60, borderBottomWidth: 1, borderBottomColor: '#E5E7EB' },
  backBtn: { position: 'absolute', top: 60, left: 16 },
  iconBox: { width: 96, height: 96, borderRadius: 48, backgroundColor: '#EEF2FF', justifyContent: 'center', alignItems: 'center', marginBottom: 16 },
  schoolName: { fontSize: 24, fontWeight: 'bold', color: '#111827', marginBottom: 4, textAlign: 'center' },
  schoolMeta: { fontSize: 14, color: '#6B7280', marginBottom: 24 },
  statsRow: { flexDirection: 'row', alignItems: 'center', width: '100%', paddingHorizontal: 24 },
  statBox: { flex: 1, alignItems: 'center' },
  divider: { width: 1, height: 40, backgroundColor: '#E5E7EB' },
  statVal: { fontSize: 20, fontWeight: 'bold', color: '#111827' },
  statLabel: { fontSize: 12, color: '#6B7280', marginTop: 4 },
  badgesSection: { flexDirection: 'row', padding: 16, gap: 16 },
  badgeCard: { flex: 1, flexDirection: 'row', alignItems: 'center', padding: 16, borderRadius: 16 },
  badgeInfo: { marginLeft: 12 },
  badgeRank: { fontSize: 20, fontWeight: 'bold', color: '#111827' },
  badgeLabel: { fontSize: 12, color: '#4B5563' },
  section: { padding: 24, backgroundColor: 'white', marginBottom: 16, borderTopWidth: 1, borderBottomWidth: 1, borderColor: '#E5E7EB' },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#111827', marginBottom: 16 },
  studentRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  rankNum: { width: 30, fontSize: 14, fontWeight: 'bold', color: '#6B7280' },
  avatar: { width: 40, height: 40, borderRadius: 20, marginRight: 12 },
  studentName: { flex: 1, fontSize: 16, fontWeight: 'bold', color: '#111827' },
  xpText: { fontSize: 14, fontWeight: 'bold', color: '#F59E0B' },
  aboutText: { fontSize: 14, color: '#4B5563', lineHeight: 22 },
});
