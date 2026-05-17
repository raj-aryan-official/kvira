import React, { useState } from 'react';
import { View, Text, StyleSheet, SectionList, TouchableOpacity, Switch, Modal, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<any, 'SettingsScreen'>;

export default function SettingsScreen({ navigation }: Props) {
  const [streakReminder, setStreakReminder] = useState(true);
  const [soundEffects, setSoundEffects] = useState(true);
  const [haptics, setHaptics] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteInput, setDeleteInput] = useState('');

  const sections = [
    {
      title: 'Account',
      data: [
        { id: 'profile', title: 'Edit Profile', icon: 'person-outline', type: 'link' },
      ],
    },
    {
      title: 'Notifications',
      data: [
        { id: 'streak_notif', title: 'Streak Reminders', icon: 'flame-outline', type: 'toggle', value: streakReminder, onValueChange: setStreakReminder },
        { id: 'daily_notif', title: 'Daily Challenge Reminder', icon: 'calendar-outline', type: 'toggle', value: true, onValueChange: () => {} },
      ],
    },
    {
      title: 'Sound & Haptics',
      data: [
        { id: 'sound', title: 'Sound Effects', icon: 'volume-high-outline', type: 'toggle', value: soundEffects, onValueChange: setSoundEffects },
        { id: 'haptic', title: 'Haptic Feedback', icon: 'phone-portrait-outline', type: 'toggle', value: haptics, onValueChange: setHaptics },
      ],
    },
    {
      title: 'Appearance',
      data: [
        { id: 'theme', title: 'Toggle Theme (Senior)', icon: 'color-palette-outline', type: 'link' },
      ],
    },
    {
      title: 'Privacy',
      data: [
        { id: 'privacy', title: 'Data and Privacy', icon: 'shield-checkmark-outline', type: 'link' },
        { id: 'download', title: 'Download My Data', icon: 'download-outline', type: 'link' },
      ],
    },
    {
      title: 'Support',
      data: [
        { id: 'help', title: 'Help Centre', icon: 'help-circle-outline', type: 'link' },
        { id: 'report', title: 'Report a Bug', icon: 'bug-outline', type: 'link' },
      ],
    },
    {
      title: 'Account Actions',
      data: [
        { id: 'signout', title: 'Sign Out', icon: 'log-out-outline', type: 'button' },
        { id: 'delete', title: 'Delete Account', icon: 'trash-outline', type: 'dangerButton' },
      ],
    }
  ];

  const handleSignOut = () => {
    // Clear tokens etc
    navigation.reset({ index: 0, routes: [{ name: 'WelcomeScreen' }] });
  };

  const renderItem = ({ item }: { item: any }) => {
    if (item.type === 'toggle') {
      return (
        <View style={styles.row}>
          <View style={styles.rowLeft}>
            <Ionicons name={item.icon} size={24} color="#4B5563" style={styles.rowIcon} />
            <Text style={styles.rowTitle}>{item.title}</Text>
          </View>
          <Switch value={item.value} onValueChange={item.onValueChange} trackColor={{ true: '#4F46E5', false: '#D1D5DB' }} />
        </View>
      );
    }
    
    if (item.type === 'button') {
      return (
        <TouchableOpacity style={styles.actionBtn} onPress={handleSignOut}>
          <Text style={styles.actionBtnText}>{item.title}</Text>
        </TouchableOpacity>
      );
    }

    if (item.type === 'dangerButton') {
      return (
        <TouchableOpacity style={styles.dangerBtn} onPress={() => setShowDeleteModal(true)}>
          <Text style={styles.dangerBtnText}>{item.title}</Text>
        </TouchableOpacity>
      );
    }

    return (
      <TouchableOpacity style={styles.row}>
        <View style={styles.rowLeft}>
          <Ionicons name={item.icon} size={24} color="#4B5563" style={styles.rowIcon} />
          <Text style={styles.rowTitle}>{item.title}</Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ paddingRight: 16 }}>
          <Ionicons name="arrow-back" size={24} color="#111827" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
        <View style={{ width: 24 }} />
      </View>

      <SectionList
        sections={sections}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.sectionHeader}>{title}</Text>
        )}
        ListFooterComponent={() => (
          <Text style={styles.versionText}>EduQuest v1.0.0 (Build 42)</Text>
        )}
      />

      <Modal visible={showDeleteModal} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <View style={styles.modalIconBox}>
              <Ionicons name="warning" size={32} color="#EF4444" />
            </View>
            <Text style={styles.modalTitle}>Delete Account?</Text>
            <Text style={styles.modalDesc}>This action cannot be undone. All your progress, XP, friends, and school data will be permanently deleted.</Text>
            
            <Text style={styles.inputLabel}>Type DELETE to confirm:</Text>
            <TextInput 
              style={styles.deleteInput}
              value={deleteInput}
              onChangeText={setDeleteInput}
              autoCapitalize="characters"
            />

            <TouchableOpacity 
              style={[styles.finalDeleteBtn, deleteInput !== 'DELETE' && { opacity: 0.5 }]} 
              disabled={deleteInput !== 'DELETE'}
              onPress={handleSignOut} // mock delete
            >
              <Text style={styles.finalDeleteBtnText}>Permanently Delete Account</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.cancelBtn} onPress={() => setShowDeleteModal(false)}>
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
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: 'white', padding: 16, paddingTop: 60, borderBottomWidth: 1, borderBottomColor: '#E5E7EB' },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: '#111827' },
  sectionHeader: { fontSize: 14, fontWeight: 'bold', color: '#6B7280', textTransform: 'uppercase', marginTop: 24, marginBottom: 8, paddingHorizontal: 16 },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: 'white', padding: 16, borderBottomWidth: 1, borderBottomColor: '#F3F4F6' },
  rowLeft: { flexDirection: 'row', alignItems: 'center' },
  rowIcon: { marginRight: 16 },
  rowTitle: { fontSize: 16, color: '#111827' },
  actionBtn: { backgroundColor: 'white', padding: 16, borderBottomWidth: 1, borderBottomColor: '#F3F4F6', alignItems: 'center' },
  actionBtnText: { fontSize: 16, fontWeight: 'bold', color: '#111827' },
  dangerBtn: { backgroundColor: 'white', padding: 16, alignItems: 'center', marginTop: 16 },
  dangerBtnText: { fontSize: 16, fontWeight: 'bold', color: '#EF4444' },
  versionText: { textAlign: 'center', color: '#9CA3AF', fontSize: 12, marginVertical: 40 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center', padding: 24 },
  modalCard: { backgroundColor: 'white', borderRadius: 16, padding: 24, width: '100%', alignItems: 'center' },
  modalIconBox: { width: 64, height: 64, borderRadius: 32, backgroundColor: '#FEE2E2', justifyContent: 'center', alignItems: 'center', marginBottom: 16 },
  modalTitle: { fontSize: 24, fontWeight: 'bold', color: '#111827', marginBottom: 12 },
  modalDesc: { textAlign: 'center', color: '#4B5563', lineHeight: 22, marginBottom: 24 },
  inputLabel: { alignSelf: 'flex-start', fontSize: 14, fontWeight: 'bold', color: '#374151', marginBottom: 8 },
  deleteInput: { width: '100%', borderWidth: 1, borderColor: '#EF4444', borderRadius: 8, padding: 12, fontSize: 16, textAlign: 'center', marginBottom: 24, color: '#EF4444', fontWeight: 'bold' },
  finalDeleteBtn: { backgroundColor: '#EF4444', width: '100%', padding: 16, borderRadius: 12, alignItems: 'center', marginBottom: 12 },
  finalDeleteBtnText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
  cancelBtn: { width: '100%', padding: 16, borderRadius: 12, alignItems: 'center' },
  cancelBtnText: { color: '#374151', fontWeight: 'bold', fontSize: 16 },
});
