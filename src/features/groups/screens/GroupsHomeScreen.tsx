import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Group } from '../store/groupsSlice';

type Props = NativeStackScreenProps<any, 'GroupsHome'>;

export default function GroupsHomeScreen({ navigation }: Props) {
  const { myGroups } = useSelector((state: RootState) => state.groups);

  const recommendedGroups = [
    { id: 'r1', name: 'CBSE Class 8A', memberCount: 42, icon: 'people' },
    { id: 'r2', name: 'Science Enthusiasts', memberCount: 890, icon: 'flask' },
  ];

  const renderGroupCard = (group: Group | any, isRecommended = false) => (
    <TouchableOpacity 
      key={group.id} 
      style={styles.groupCard}
      onPress={() => isRecommended ? null : navigation.navigate('GroupChatScreen', { groupId: group.id })}
    >
      <View style={styles.groupIconBox}>
        <Ionicons name={group.icon as any} size={24} color="#4F46E5" />
      </View>
      <View style={styles.groupInfo}>
        <Text style={styles.groupName}>{group.name}</Text>
        <Text style={styles.groupMeta}>
          {group.memberCount} members {group.lastActivity ? `• Active ${group.lastActivity}` : ''}
        </Text>
      </View>
      {group.unreadCount > 0 && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{group.unreadCount}</Text>
        </View>
      )}
      {isRecommended && (
        <TouchableOpacity style={styles.joinBtn}>
          <Text style={styles.joinBtnText}>Join</Text>
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Communities</Text>
        <TouchableOpacity style={styles.createBtn} onPress={() => navigation.navigate('GroupCreationScreen')}>
          <Ionicons name="add" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#9CA3AF" style={styles.searchIcon} />
        <TextInput 
          style={styles.searchInput}
          placeholder="Search groups..."
          onFocus={() => navigation.navigate('GroupSearchScreen')}
        />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>My Groups</Text>
          {myGroups.map(g => renderGroupCard(g))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Discover Groups</Text>
          {recommendedGroups.map(g => renderGroupCard(g, true))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F3F4F6' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, paddingTop: 60, backgroundColor: 'white' },
  title: { fontSize: 28, fontWeight: 'bold', color: '#111827' },
  createBtn: { backgroundColor: '#4F46E5', width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center' },
  searchContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'white', paddingHorizontal: 16, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#E5E7EB' },
  searchIcon: { marginRight: 12 },
  searchInput: { flex: 1, fontSize: 16 },
  content: { padding: 16 },
  section: { marginBottom: 32 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#111827', marginBottom: 16 },
  groupCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'white', padding: 16, borderRadius: 12, marginBottom: 12, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 5, elevation: 2 },
  groupIconBox: { width: 48, height: 48, borderRadius: 24, backgroundColor: '#EEF2FF', justifyContent: 'center', alignItems: 'center', marginRight: 16 },
  groupInfo: { flex: 1 },
  groupName: { fontSize: 16, fontWeight: 'bold', color: '#111827', marginBottom: 4 },
  groupMeta: { fontSize: 12, color: '#6B7280' },
  badge: { backgroundColor: '#EF4444', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12 },
  badgeText: { color: 'white', fontSize: 12, fontWeight: 'bold' },
  joinBtn: { backgroundColor: '#EEF2FF', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 8 },
  joinBtnText: { color: '#4F46E5', fontWeight: 'bold' },
});
