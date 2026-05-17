import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, Image, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { GroupMessage } from '../store/groupsSlice';

type Props = NativeStackScreenProps<any, 'GroupChatScreen'>;

export default function GroupChatScreen({ navigation }: Props) {
  const { messages } = useSelector((state: RootState) => state.groups);
  const [inputText, setInputText] = useState('');
  
  // Mock permissions and tabs
  const canMessage = true; 
  const activeTab = 'Chat';
  const tabs = ['Chat', 'Leaderboard', 'Challenges', 'Info'];

  const handleSend = () => {
    if (!inputText.trim()) return;
    // Add message logic...
    setInputText('');
  };

  const onLongPressMessage = (msg: GroupMessage) => {
    Alert.alert(
      "Message Options",
      "Select an action",
      [
        { text: "Report Message", style: "destructive" },
        { text: "Delete Message", style: "destructive" },
        { text: "Mute User", style: "destructive" },
        { text: "Cancel", style: "cancel" }
      ]
    );
  };

  const renderMessage = ({ item }: { item: GroupMessage }) => (
    <TouchableOpacity 
      style={[styles.messageRow, item.isAnnouncement && styles.announcementRow]}
      onLongPress={() => onLongPressMessage(item)}
      delayLongPress={500}
    >
      <Image source={{ uri: item.senderAvatar }} style={styles.avatar} />
      <View style={styles.messageContent}>
        <View style={styles.messageHeader}>
          <Text style={styles.senderName}>{item.senderName}</Text>
          <View style={styles.levelBadge}><Text style={styles.levelText}>Lvl {item.senderLevel}</Text></View>
          <Text style={styles.timestamp}>{item.timestamp}</Text>
        </View>
        {item.isAnnouncement && <Text style={styles.announcementLabel}>ANNOUNCEMENT</Text>}
        <Text style={styles.messageText}>{item.text}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#111827" />
        </TouchableOpacity>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>CBSE Class 10 Math</Text>
          <Text style={styles.headerSubtitle}>156 members</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('GroupInfoScreen')}>
          <Ionicons name="information-circle-outline" size={24} color="#111827" />
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <View style={styles.tabsRow}>
        {tabs.map(t => (
          <TouchableOpacity key={t} style={[styles.tab, activeTab === t && styles.tabActive]}>
            <Text style={[styles.tabText, activeTab === t && styles.tabTextActive]}>{t}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Chat Area */}
      <FlatList
        data={messages}
        keyExtractor={item => item.id}
        renderItem={renderMessage}
        inverted // Reverse chronological
        contentContainerStyle={{ padding: 16 }}
      />

      {/* Input Area */}
      {canMessage ? (
        <View style={styles.inputZone}>
          <TouchableOpacity style={styles.attachBtn}>
            <Ionicons name="add" size={24} color="#6B7280" />
          </TouchableOpacity>
          <TextInput 
            style={styles.input}
            placeholder="Type a message..."
            value={inputText}
            onChangeText={setInputText}
            multiline
          />
          <TouchableOpacity style={styles.sendBtn} onPress={handleSend}>
            <Ionicons name="send" size={20} color="white" />
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.readonlyZone}>
          <Text style={styles.readonlyText}>This group is announcement only</Text>
        </View>
      )}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: 'white', padding: 16, paddingTop: 60 },
  headerTitleContainer: { flex: 1, alignItems: 'center' },
  headerTitle: { fontSize: 16, fontWeight: 'bold', color: '#111827' },
  headerSubtitle: { fontSize: 12, color: '#6B7280' },
  tabsRow: { flexDirection: 'row', backgroundColor: 'white', borderBottomWidth: 1, borderBottomColor: '#E5E7EB' },
  tab: { flex: 1, paddingVertical: 12, alignItems: 'center', borderBottomWidth: 2, borderBottomColor: 'transparent' },
  tabActive: { borderBottomColor: '#4F46E5' },
  tabText: { color: '#6B7280', fontSize: 13, fontWeight: '500' },
  tabTextActive: { color: '#4F46E5', fontWeight: 'bold' },
  messageRow: { flexDirection: 'row', marginBottom: 20 },
  announcementRow: { borderLeftWidth: 4, borderLeftColor: '#F59E0B', paddingLeft: 12 },
  avatar: { width: 36, height: 36, borderRadius: 18, marginRight: 12 },
  messageContent: { flex: 1 },
  messageHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 4 },
  senderName: { fontSize: 13, fontWeight: 'bold', color: '#111827', marginRight: 8 },
  levelBadge: { backgroundColor: '#EEF2FF', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 8, marginRight: 8 },
  levelText: { color: '#4F46E5', fontSize: 10, fontWeight: 'bold' },
  timestamp: { fontSize: 11, color: '#9CA3AF' },
  announcementLabel: { fontSize: 10, fontWeight: 'bold', color: '#D97706', marginBottom: 4, letterSpacing: 1 },
  messageText: { fontSize: 15, color: '#374151', lineHeight: 22 },
  inputZone: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'white', padding: 12, borderTopWidth: 1, borderTopColor: '#E5E7EB' },
  attachBtn: { padding: 8 },
  input: { flex: 1, backgroundColor: '#F3F4F6', borderRadius: 20, paddingHorizontal: 16, paddingVertical: 10, maxHeight: 100, marginRight: 12 },
  sendBtn: { backgroundColor: '#4F46E5', width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center', paddingLeft: 4 },
  readonlyZone: { backgroundColor: '#F3F4F6', padding: 16, alignItems: 'center', borderTopWidth: 1, borderTopColor: '#E5E7EB' },
  readonlyText: { color: '#6B7280', fontStyle: 'italic' },
});
