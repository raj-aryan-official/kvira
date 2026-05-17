import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image, Animated, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useLeaderboard } from '../hooks/useLeaderboard';
import { LeaderboardUser } from '../store/leaderboardSlice';

const TABS = ['School', 'State', 'National', 'Friends'] as const;
type TabType = typeof TABS[number];

export default function LeaderboardScreen() {
  const { period, changePeriod, fetchTab, schoolList, stateList, nationalList, friendsList, loading } = useLeaderboard();
  const [activeTab, setActiveTab] = useState<TabType>('School');
  
  // Podium Animations
  const rank1Y = useRef(new Animated.Value(-200)).current;
  const rank2X = useRef(new Animated.Value(-200)).current;
  const rank3X = useRef(new Animated.Value(200)).current;

  useEffect(() => {
    fetchTab(activeTab);
  }, [activeTab, period]);

  useEffect(() => {
    if (activeTab === 'School' && schoolList.length >= 3) {
      // Reset
      rank1Y.setValue(-200);
      rank2X.setValue(-200);
      rank3X.setValue(200);

      Animated.stagger(150, [
        Animated.spring(rank1Y, { toValue: 0, useNativeDriver: true, tension: 50, friction: 5 }),
        Animated.spring(rank2X, { toValue: 0, useNativeDriver: true, tension: 50, friction: 5 }),
        Animated.spring(rank3X, { toValue: 0, useNativeDriver: true, tension: 50, friction: 5 }),
      ]).start();
    }
  }, [activeTab, schoolList]);

  const getActiveList = () => {
    switch (activeTab) {
      case 'School': return schoolList;
      case 'State': return stateList;
      case 'National': return nationalList;
      case 'Friends': return friendsList;
    }
  };

  const listData = getActiveList();
  
  // For school, first 3 are podium, rest are list
  const displayList = activeTab === 'School' ? listData.slice(3) : listData;
  const podiumData = activeTab === 'School' ? listData.slice(0, 3) : [];
  const selfUser = listData.find(u => u.isSelf) || listData[5]; // Fallback mock

  const renderRow = ({ item }: { item: LeaderboardUser }) => (
    <TouchableOpacity style={[styles.row, item.isSelf && styles.selfRow]}>
      <Text style={styles.rankNum}>{item.rank}</Text>
      <Image source={{ uri: item.avatar }} style={styles.avatarSmall} />
      <View style={styles.userInfo}>
        <Text style={styles.userName}>{item.name}</Text>
        <Text style={styles.userClass}>{item.class}</Text>
      </View>
      <View style={styles.statsInfo}>
        <Text style={styles.xpText}>{item.xp} XP</Text>
        {item.hasActiveStreak && <Ionicons name="flame" size={16} color="#F59E0B" />}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Leaderboard</Text>
        <TouchableOpacity style={styles.periodSelector}>
          <Text style={styles.periodText}>{period}</Text>
          <Ionicons name="chevron-down" size={16} color="#4F46E5" />
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        {TABS.map(tab => (
          <TouchableOpacity 
            key={tab} 
            style={[styles.tab, activeTab === tab && styles.activeTab]}
            onPress={() => setActiveTab(tab)}
          >
            <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>{tab}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Content */}
      <View style={styles.content}>
        {loading ? (
          <ActivityIndicator size="large" color="#4F46E5" style={{ marginTop: 40 }} />
        ) : (
          <>
            {activeTab === 'School' && podiumData.length === 3 && (
              <View style={styles.podiumContainer}>
                {/* Rank 2 */}
                <Animated.View style={[styles.podiumItem, { transform: [{ translateX: rank2X }], marginTop: 40 }]}>
                  <View style={[styles.avatarRing, { borderColor: '#9CA3AF' }]}>
                    <Image source={{ uri: podiumData[1].avatar }} style={styles.avatarMedium} />
                    <View style={[styles.rankBadge, { backgroundColor: '#9CA3AF' }]}>
                      <Text style={styles.rankBadgeText}>2</Text>
                    </View>
                  </View>
                  <Text style={styles.podiumName}>{podiumData[1].name}</Text>
                  <Text style={styles.podiumXP}>{podiumData[1].xp} XP</Text>
                </Animated.View>

                {/* Rank 1 */}
                <Animated.View style={[styles.podiumItem, { transform: [{ translateY: rank1Y }] }]}>
                  <View style={[styles.avatarRing, { borderColor: '#F59E0B', borderWidth: 4 }]}>
                    <Image source={{ uri: podiumData[0].avatar }} style={styles.avatarLarge} />
                    <View style={[styles.rankBadge, { backgroundColor: '#F59E0B' }]}>
                      <Text style={styles.rankBadgeText}>1</Text>
                    </View>
                  </View>
                  <Text style={styles.podiumName}>{podiumData[0].name}</Text>
                  <Text style={styles.podiumXP}>{podiumData[0].xp} XP</Text>
                </Animated.View>

                {/* Rank 3 */}
                <Animated.View style={[styles.podiumItem, { transform: [{ translateX: rank3X }], marginTop: 60 }]}>
                  <View style={[styles.avatarRing, { borderColor: '#B45309' }]}>
                    <Image source={{ uri: podiumData[2].avatar }} style={styles.avatarMedium} />
                    <View style={[styles.rankBadge, { backgroundColor: '#B45309' }]}>
                      <Text style={styles.rankBadgeText}>3</Text>
                    </View>
                  </View>
                  <Text style={styles.podiumName}>{podiumData[2].name}</Text>
                  <Text style={styles.podiumXP}>{podiumData[2].xp} XP</Text>
                </Animated.View>
              </View>
            )}

            {activeTab === 'Friends' && listData.length === 0 ? (
              <View style={styles.emptyState}>
                <Ionicons name="people-outline" size={64} color="#9CA3AF" />
                <Text style={styles.emptyTitle}>No friends yet</Text>
                <Text style={styles.emptyText}>Invite friends to compete!</Text>
                <TouchableOpacity style={styles.inviteBtn}>
                  <Text style={styles.inviteBtnText}>Share Link</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <FlatList
                data={displayList}
                keyExtractor={item => item.id}
                renderItem={renderRow}
                contentContainerStyle={{ paddingBottom: 100 }}
                showsVerticalScrollIndicator={false}
              />
            )}
          </>
        )}
      </View>

      {/* Pinned Self Row */}
      {selfUser && activeTab !== 'Friends' && (
        <View style={styles.pinnedSelf}>
          <View style={styles.row}>
            <Text style={styles.rankNum}>{selfUser.rank}</Text>
            <Image source={{ uri: selfUser.avatar }} style={styles.avatarSmall} />
            <View style={styles.userInfo}>
              <Text style={styles.userName}>You</Text>
              <Text style={styles.userClass}>{selfUser.class}</Text>
            </View>
            <View style={styles.statsInfo}>
              <Text style={styles.xpText}>{selfUser.xp} XP</Text>
              {selfUser.hasActiveStreak && <Ionicons name="flame" size={16} color="#F59E0B" />}
            </View>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, paddingTop: 48 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#111827' },
  periodSelector: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#EEF2FF', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 16 },
  periodText: { color: '#4F46E5', fontWeight: 'bold', marginRight: 4 },
  tabsContainer: { flexDirection: 'row', paddingHorizontal: 16, marginBottom: 16 },
  tab: { paddingVertical: 8, paddingHorizontal: 16, borderRadius: 20, marginRight: 8 },
  activeTab: { backgroundColor: '#4F46E5' },
  tabText: { color: '#6B7280', fontWeight: 'bold' },
  activeTabText: { color: 'white' },
  content: { flex: 1, backgroundColor: '#F9FAFB' },
  podiumContainer: { flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-start', paddingVertical: 24, paddingHorizontal: 16, borderBottomWidth: 1, borderBottomColor: '#E5E7EB', backgroundColor: 'white' },
  podiumItem: { alignItems: 'center', flex: 1 },
  avatarRing: { borderRadius: 40, borderWidth: 3, padding: 2, marginBottom: 8 },
  avatarLarge: { width: 64, height: 64, borderRadius: 32 },
  avatarMedium: { width: 48, height: 48, borderRadius: 24 },
  rankBadge: { position: 'absolute', bottom: -8, alignSelf: 'center', width: 24, height: 24, borderRadius: 12, justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: 'white' },
  rankBadgeText: { color: 'white', fontSize: 12, fontWeight: 'bold' },
  podiumName: { fontSize: 14, fontWeight: 'bold', color: '#111827' },
  podiumXP: { fontSize: 12, color: '#6B7280' },
  row: { flexDirection: 'row', alignItems: 'center', height: 60, paddingHorizontal: 16, borderBottomWidth: 1, borderBottomColor: '#F3F4F6', backgroundColor: 'white' },
  selfRow: { backgroundColor: '#EEF2FF' },
  rankNum: { width: 40, fontSize: 16, fontWeight: 'bold', color: '#4B5563' },
  avatarSmall: { width: 36, height: 36, borderRadius: 18, marginRight: 12 },
  userInfo: { flex: 1 },
  userName: { fontSize: 14, fontWeight: 'bold', color: '#111827' },
  userClass: { fontSize: 10, color: '#6B7280', backgroundColor: '#F3F4F6', alignSelf: 'flex-start', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4, marginTop: 2 },
  statsInfo: { flexDirection: 'row', alignItems: 'center' },
  xpText: { fontSize: 12, color: '#6B7280', marginRight: 4 },
  pinnedSelf: { position: 'absolute', bottom: 0, left: 0, right: 0, borderTopWidth: 1, borderTopColor: '#E5E7EB', backgroundColor: '#EEF2FF', elevation: 10, shadowColor: '#000', shadowOffset: { width: 0, height: -2 }, shadowOpacity: 0.1, shadowRadius: 4 },
  emptyState: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 },
  emptyTitle: { fontSize: 20, fontWeight: 'bold', color: '#111827', marginTop: 16 },
  emptyText: { color: '#6B7280', marginTop: 8, marginBottom: 24 },
  inviteBtn: { backgroundColor: '#4F46E5', paddingHorizontal: 24, paddingVertical: 12, borderRadius: 8 },
  inviteBtnText: { color: 'white', fontWeight: 'bold' },
});
