import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<any, 'GroupInfoScreen'>;

export default function GroupInfoScreen({ navigation }: Props) {
  const isAdmin = true;

  const members = [
    { id: '1', name: 'Rahul Kumar', avatar: 'https://i.pravatar.cc/150?img=11', level: 25, role: 'Admin' },
    { id: '2', name: 'Neha Sharma', avatar: 'https://i.pravatar.cc/150?img=12', level: 22, role: 'Moderator' },
    { id: '3', name: 'Aarav Patel', avatar: 'https://i.pravatar.cc/150?img=13', level: 15, role: 'Member' },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#111827" />
        </TouchableOpacity>
        <View style={styles.iconBox}>
          <Ionicons name="calculator" size={40} color="#4F46E5" />
        </View>
        <Text style={styles.groupName}>CBSE Class 10 Math</Text>
        <Text style={styles.groupCode}>Code: X8F9A2</Text>
        <Text style={styles.groupDesc}>
          Official study group for Class 10 Mathematics. Share notes, discuss problems, and participate in challenges.
        </Text>
      </View>

      {isAdmin && (
        <View style={styles.adminPanel}>
          <Text style={styles.sectionTitle}>Admin Controls</Text>
          <TouchableOpacity style={styles.adminRow}>
            <Ionicons name="chatbubbles-outline" size={20} color="#4B5563" />
            <Text style={styles.adminRowText}>Message Permissions</Text>
            <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.adminRow}>
            <Ionicons name="person-add-outline" size={20} color="#4B5563" />
            <Text style={styles.adminRowText}>Join Permissions</Text>
            <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.adminRowDanger}>
            <Ionicons name="trash-outline" size={20} color="#EF4444" />
            <Text style={styles.adminRowDangerText}>Delete Group</Text>
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.membersSection}>
        <Text style={styles.sectionTitle}>Members ({members.length})</Text>
        {members.map(m => (
          <View key={m.id} style={styles.memberRow}>
            <Image source={{ uri: m.avatar }} style={styles.avatar} />
            <View style={styles.memberInfo}>
              <Text style={styles.memberName}>{m.name}</Text>
              <Text style={styles.memberLevel}>Lvl {m.level}</Text>
            </View>
            {m.role !== 'Member' && (
              <View style={[styles.roleBadge, m.role === 'Admin' ? styles.roleAdmin : styles.roleMod]}>
                <Text style={styles.roleText}>{m.role}</Text>
              </View>
            )}
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F3F4F6' },
  header: { alignItems: 'center', backgroundColor: 'white', padding: 24, paddingTop: 60, borderBottomWidth: 1, borderBottomColor: '#E5E7EB' },
  backBtn: { position: 'absolute', top: 60, left: 16 },
  iconBox: { width: 80, height: 80, borderRadius: 40, backgroundColor: '#EEF2FF', justifyContent: 'center', alignItems: 'center', marginBottom: 16 },
  groupName: { fontSize: 24, fontWeight: 'bold', color: '#111827', marginBottom: 4 },
  groupCode: { fontSize: 14, color: '#4F46E5', fontWeight: 'bold', marginBottom: 12, backgroundColor: '#EEF2FF', paddingHorizontal: 12, paddingVertical: 4, borderRadius: 8 },
  groupDesc: { textAlign: 'center', color: '#4B5563', lineHeight: 22 },
  adminPanel: { backgroundColor: 'white', marginTop: 16, padding: 16, borderTopWidth: 1, borderBottomWidth: 1, borderColor: '#E5E7EB' },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', color: '#111827', marginBottom: 16 },
  adminRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#F3F4F6' },
  adminRowText: { flex: 1, marginLeft: 12, fontSize: 16, color: '#374151' },
  adminRowDanger: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12 },
  adminRowDangerText: { flex: 1, marginLeft: 12, fontSize: 16, color: '#EF4444', fontWeight: 'bold' },
  membersSection: { backgroundColor: 'white', marginTop: 16, padding: 16, borderTopWidth: 1, borderColor: '#E5E7EB', paddingBottom: 40 },
  memberRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  avatar: { width: 40, height: 40, borderRadius: 20, marginRight: 12 },
  memberInfo: { flex: 1 },
  memberName: { fontSize: 16, fontWeight: 'bold', color: '#111827' },
  memberLevel: { fontSize: 12, color: '#6B7280' },
  roleBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12 },
  roleAdmin: { backgroundColor: '#FEF2F2' },
  roleMod: { backgroundColor: '#ECFDF5' },
  roleText: { fontSize: 10, fontWeight: 'bold', color: '#374151' },
});
