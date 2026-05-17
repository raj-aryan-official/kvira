import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNotifications } from '../hooks/useNotifications';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { NotificationItem } from '../store/notificationsSlice';

type Props = NativeStackScreenProps<any, 'NotificationCentreScreen'>;

export default function NotificationCentreScreen({ navigation }: Props) {
  const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotifications();
  const [activeTab, setActiveTab] = useState('All');

  const tabs = ['All', 'Achievements', 'Battle', 'Groups'];

  const filteredNotifications = notifications.filter(n => {
    if (activeTab === 'All') return true;
    if (activeTab === 'Achievements') return n.type === 'achievement';
    if (activeTab === 'Battle') return n.type === 'battle';
    if (activeTab === 'Groups') return n.type === 'group';
    return true;
  });

  const handlePress = (item: NotificationItem) => {
    markAsRead(item.id);
    switch (item.type) {
      case 'achievement':
        navigation.navigate('MyProfileScreen');
        break;
      case 'battle':
        navigation.navigate('BattleHomeScreen');
        break;
      case 'group':
        navigation.navigate('GroupChatScreen', { groupId: item.actionId });
        break;
      case 'streak':
        navigation.navigate('PracticeHome');
        break;
      case 'dailyChallenge':
        navigation.navigate('DailyChallengeDetailScreen');
        break;
      case 'leaderboard':
        navigation.navigate('LeaderboardScreen');
        break;
      default:
        break;
    }
  };

  const getIconForType = (type: string) => {
    switch (type) {
      case 'achievement': return { name: 'trophy', color: '#F59E0B', bg: '#FEF3C7' };
      case 'battle': return { name: 'flash', color: '#EF4444', bg: '#FEE2E2' };
      case 'group': return { name: 'people', color: '#4F46E5', bg: '#EEF2FF' };
      case 'streak': return { name: 'flame', color: '#F97316', bg: '#FFEDD5' };
      default: return { name: 'notifications', color: '#6B7280', bg: '#F3F4F6' };
    }
  };

  const renderItem = ({ item }: { item: NotificationItem }) => {
    const iconConfig = getIconForType(item.type);
    
    return (
      <TouchableOpacity 
        style={[styles.notificationCard, !item.isRead && styles.unreadCard]}
        onPress={() => handlePress(item)}
      >
        <View style={[styles.iconBox, { backgroundColor: iconConfig.bg }]}>
          <Ionicons name={iconConfig.name as any} size={24} color={iconConfig.color} />
        </View>
        <View style={styles.content}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.body} numberOfLines={2}>{item.body}</Text>
          <Text style={styles.timestamp}>{item.timestamp}</Text>
        </View>
        {!item.isRead && <View style={styles.unreadDot} />}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#111827" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notifications</Text>
        <TouchableOpacity onPress={markAllAsRead}>
          <Ionicons name="checkmark-done" size={24} color="#4F46E5" />
        </TouchableOpacity>
      </View>

      <View style={styles.tabsContainer}>
        {tabs.map(t => (
          <TouchableOpacity 
            key={t} 
            style={[styles.tab, activeTab === t && styles.tabActive]}
            onPress={() => setActiveTab(t)}
          >
            <Text style={[styles.tabText, activeTab === t && styles.tabTextActive]}>{t}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={filteredNotifications}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 16 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'white', padding: 16, paddingTop: 60 },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: '#111827' },
  tabsContainer: { flexDirection: 'row', backgroundColor: 'white', borderBottomWidth: 1, borderBottomColor: '#E5E7EB', paddingHorizontal: 16 },
  tab: { paddingVertical: 12, marginRight: 20, borderBottomWidth: 2, borderBottomColor: 'transparent' },
  tabActive: { borderBottomColor: '#4F46E5' },
  tabText: { color: '#6B7280', fontWeight: 'bold' },
  tabTextActive: { color: '#4F46E5' },
  notificationCard: { flexDirection: 'row', backgroundColor: 'white', padding: 16, borderRadius: 12, marginBottom: 12 },
  unreadCard: { backgroundColor: '#EEF2FF', borderLeftWidth: 4, borderLeftColor: '#4F46E5' },
  iconBox: { width: 48, height: 48, borderRadius: 24, justifyContent: 'center', alignItems: 'center', marginRight: 16 },
  content: { flex: 1 },
  title: { fontSize: 14, fontWeight: 'bold', color: '#111827', marginBottom: 4 },
  body: { fontSize: 12, color: '#6B7280', marginBottom: 8, lineHeight: 18 },
  timestamp: { fontSize: 11, color: '#9CA3AF' },
  unreadDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#4F46E5', alignSelf: 'center', marginLeft: 12 },
});
