import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useProfile } from '../hooks/useProfile';
import { LEVEL_THRESHOLDS } from '../../gamification/hooks/useXP';
import Svg, { Polygon, Line, Circle as SvgCircle, Text as SvgText } from 'react-native-svg';

export default function MyProfileScreen() {
  const { name, avatar, board, className, school, featuredTags, stats, subjectStats, gamification } = useProfile();
  const { xpTotal, level, levelName, streakCurrent, coinsBalance, earnedTags, completedMilestones } = gamification;

  const currentLevelXP = level > 1 ? LEVEL_THRESHOLDS[level - 2] : 0;
  const nextLevelXP = LEVEL_THRESHOLDS[level - 1] || currentLevelXP + 1000;
  const progressPercent = Math.min(100, Math.max(0, ((xpTotal - currentLevelXP) / (nextLevelXP - currentLevelXP)) * 100));

  const [selectedTag, setSelectedTag] = useState<any>(null);

  const renderRadarChart = () => {
    // Simplified Radar Chart Mock
    return (
      <View style={styles.radarContainer}>
        <Svg width={200} height={200}>
          <Polygon points="100,10 180,50 180,150 100,190 20,150 20,50" fill="rgba(79, 70, 229, 0.2)" stroke="#4F46E5" strokeWidth={2} />
          <SvgCircle cx="100" cy="100" r="3" fill="#4F46E5" />
          <SvgText x="100" y="8" fontSize="10" fill="#6B7280" textAnchor="middle">Math</SvgText>
          <SvgText x="185" y="50" fontSize="10" fill="#6B7280" textAnchor="start">Sci</SvgText>
          <SvgText x="185" y="150" fontSize="10" fill="#6B7280" textAnchor="start">Eng</SvgText>
          <SvgText x="100" y="200" fontSize="10" fill="#6B7280" textAnchor="middle">SST</SvgText>
          <SvgText x="15" y="150" fontSize="10" fill="#6B7280" textAnchor="end">Hin</SvgText>
          <SvgText x="15" y="50" fontSize="10" fill="#6B7280" textAnchor="end">Comp</SvgText>
        </Svg>
      </View>
    );
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Dark Header */}
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <Image source={{ uri: avatar }} style={styles.avatar} />
          <TouchableOpacity style={styles.editBadge}>
            <Ionicons name="pencil" size={12} color="white" />
          </TouchableOpacity>
        </View>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.schoolInfo}>{board} • {className} • {school}</Text>
        
        <View style={styles.featuredTags}>
          {featuredTags.map((tag, index) => (
            <TouchableOpacity key={index} style={styles.featuredTagPill}>
              <Ionicons name={tag.icon as any} size={14} color="white" />
              <Text style={styles.featuredTagText}>{tag.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.content}>
        {/* Lifetime Stats */}
        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Total XP</Text>
            <Text style={styles.statValue}>{xpTotal}</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Level</Text>
            <Text style={[styles.statValue, { color: '#F59E0B' }]}>{level}</Text>
            <Text style={styles.statSub}>{levelName}</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Streak</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
              <Ionicons name="flame" size={24} color="#F59E0B" style={{ marginRight: 4 }} />
              <Text style={styles.statValue}>{streakCurrent}</Text>
            </View>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Questions</Text>
            <Text style={styles.statValue}>{stats.totalQuestions}</Text>
          </View>
        </View>

        {/* Level Progress */}
        <View style={styles.levelProgressSection}>
          <View style={styles.levelRow}>
            <Text style={styles.levelNameText}>{levelName}</Text>
            <Text style={styles.xpNeededText}>{xpTotal} / {nextLevelXP} XP</Text>
          </View>
          <View style={styles.progressBarContainer}>
            <View style={[styles.progressBarFill, { width: `${progressPercent}%` }]} />
          </View>
        </View>

        {/* Coins */}
        <TouchableOpacity style={styles.coinRow}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Ionicons name="logo-bitcoin" size={24} color="#F59E0B" />
            <Text style={styles.coinText}>{coinsBalance} Coins</Text>
          </View>
          <Text style={styles.visitShopText}>Visit Shop</Text>
        </TouchableOpacity>

        {/* Tags Wall */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>My Tags ({earnedTags.length})</Text>
          <View style={styles.tagsGrid}>
            {earnedTags.map((tag) => (
              <TouchableOpacity key={tag.id} style={styles.tagCard} onPress={() => setSelectedTag(tag)}>
                <View style={styles.tagIconContainer}>
                  <Ionicons name={tag.icon as any} size={24} color="#4F46E5" />
                </View>
                <Text style={styles.tagCardText} numberOfLines={2}>{tag.name}</Text>
              </TouchableOpacity>
            ))}
            {/* Mock Locked Tag */}
            <TouchableOpacity style={styles.tagCardLocked}>
              <View style={[styles.tagIconContainer, { backgroundColor: '#F3F4F6' }]}>
                <Ionicons name="lock-closed" size={24} color="#9CA3AF" />
              </View>
              <Text style={styles.tagCardTextLocked}>Locked</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Milestone Timeline */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Milestones</Text>
          {completedMilestones.length === 0 ? (
            <Text style={styles.emptyText}>No milestones yet.</Text>
          ) : (
            completedMilestones.map((ms, index) => (
              <View key={ms.id} style={styles.timelineRow}>
                <Text style={styles.timelineDate}>{new Date(ms.completedAt).toLocaleDateString()}</Text>
                <View style={styles.timelineNode} />
                <View style={styles.timelineContent}>
                  <Text style={styles.timelineTitle}>{ms.name}</Text>
                  <Text style={styles.timelineReward}>+{ms.reward} XP</Text>
                </View>
              </View>
            ))
          )}
        </View>

        {/* Subject Performance */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Subject Performance</Text>
          {renderRadarChart()}
          
          <View style={styles.subjectList}>
            {subjectStats.map(sub => (
              <View key={sub.id} style={styles.subjectRow}>
                <Text style={styles.subjectName}>{sub.name}</Text>
                <View style={styles.subjectStatsRight}>
                  <Text style={styles.subjectAccuracy}>{sub.accuracy}%</Text>
                  <Text style={styles.subjectCount}>{sub.questionCount} Qs</Text>
                  <Ionicons 
                    name={sub.trend === 'up' ? 'arrow-up' : sub.trend === 'down' ? 'arrow-down' : 'remove'} 
                    size={16} 
                    color={sub.trend === 'up' ? '#10B981' : sub.trend === 'down' ? '#EF4444' : '#9CA3AF'} 
                  />
                </View>
              </View>
            ))}
          </View>
        </View>
      </View>

      {/* Tag Detail Modal */}
      <Modal visible={!!selectedTag} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.bottomSheet}>
            {selectedTag && (
              <>
                <View style={styles.tagDetailIcon}>
                  <Ionicons name={selectedTag.icon} size={64} color="#4F46E5" />
                </View>
                <Text style={styles.tagDetailName}>{selectedTag.name}</Text>
                <Text style={styles.tagDetailDesc}>{selectedTag.description}</Text>
                <Text style={styles.tagDetailDate}>Earned on {new Date(selectedTag.earnedAt).toLocaleDateString()}</Text>
                <TouchableOpacity style={styles.closeBtn} onPress={() => setSelectedTag(null)}>
                  <Text style={styles.closeBtnText}>Close</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F3F4F6' },
  header: { backgroundColor: '#1E1B4B', height: 260, alignItems: 'center', paddingTop: 60, paddingHorizontal: 20 },
  avatarContainer: { marginBottom: 16 },
  avatar: { width: 96, height: 96, borderRadius: 48, borderWidth: 3, borderColor: '#4F46E5' },
  editBadge: { position: 'absolute', bottom: 0, right: 0, backgroundColor: '#4F46E5', width: 28, height: 28, borderRadius: 14, justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: '#1E1B4B' },
  name: { color: 'white', fontSize: 24, fontWeight: 'bold', marginBottom: 4 },
  schoolInfo: { color: '#A5B4FC', fontSize: 13, marginBottom: 16 },
  featuredTags: { flexDirection: 'row', justifyContent: 'center' },
  featuredTagPill: { flexDirection: 'row', backgroundColor: 'rgba(255,255,255,0.1)', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 16, marginHorizontal: 4, alignItems: 'center' },
  featuredTagText: { color: 'white', fontSize: 12, marginLeft: 4 },
  content: { padding: 16, marginTop: -20 },
  statsGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginBottom: 24 },
  statCard: { width: '48%', backgroundColor: 'white', borderRadius: 16, padding: 16, alignItems: 'center', marginBottom: 16, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 10, elevation: 2 },
  statLabel: { color: '#6B7280', fontSize: 12, marginBottom: 8 },
  statValue: { color: '#111827', fontSize: 24, fontWeight: 'bold' },
  statSub: { color: '#9CA3AF', fontSize: 10, marginTop: 4 },
  levelProgressSection: { backgroundColor: 'white', borderRadius: 16, padding: 20, marginBottom: 16 },
  levelRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  levelNameText: { fontWeight: 'bold', color: '#111827', fontSize: 16 },
  xpNeededText: { color: '#6B7280', fontSize: 12 },
  progressBarContainer: { height: 8, backgroundColor: '#F3F4F6', borderRadius: 4 },
  progressBarFill: { height: '100%', backgroundColor: '#4F46E5', borderRadius: 4 },
  coinRow: { flexDirection: 'row', backgroundColor: 'white', padding: 20, borderRadius: 16, justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 },
  coinText: { fontWeight: 'bold', fontSize: 16, marginLeft: 12 },
  visitShopText: { color: '#4F46E5', fontWeight: 'bold' },
  section: { backgroundColor: 'white', borderRadius: 16, padding: 20, marginBottom: 24 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#111827', marginBottom: 16 },
  tagsGrid: { flexDirection: 'row', flexWrap: 'wrap' },
  tagCard: { width: '30%', alignItems: 'center', marginBottom: 16, marginRight: '3%' },
  tagCardLocked: { width: '30%', alignItems: 'center', marginBottom: 16, opacity: 0.5 },
  tagIconContainer: { width: 56, height: 56, borderRadius: 28, backgroundColor: '#EEF2FF', justifyContent: 'center', alignItems: 'center', marginBottom: 8 },
  tagCardText: { fontSize: 12, textAlign: 'center', color: '#374151', fontWeight: '500' },
  tagCardTextLocked: { fontSize: 12, textAlign: 'center', color: '#9CA3AF' },
  timelineRow: { flexDirection: 'row', marginBottom: 16 },
  timelineDate: { width: 50, fontSize: 10, color: '#9CA3AF', textAlign: 'right', marginRight: 16, marginTop: 4 },
  timelineNode: { width: 12, height: 12, borderRadius: 6, backgroundColor: '#4F46E5', marginTop: 4, marginRight: 16 },
  timelineContent: { flex: 1, backgroundColor: '#F9FAFB', padding: 12, borderRadius: 8 },
  timelineTitle: { fontWeight: 'bold', color: '#111827', marginBottom: 4 },
  timelineReward: { color: '#F59E0B', fontSize: 12, fontWeight: 'bold' },
  emptyText: { color: '#9CA3AF', fontStyle: 'italic' },
  radarContainer: { alignItems: 'center', marginBottom: 24 },
  subjectList: { borderTopWidth: 1, borderTopColor: '#F3F4F6', paddingTop: 16 },
  subjectRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#F9FAFB' },
  subjectName: { fontWeight: 'bold', color: '#374151' },
  subjectStatsRight: { flexDirection: 'row', alignItems: 'center' },
  subjectAccuracy: { fontWeight: 'bold', color: '#111827', width: 40, textAlign: 'right', marginRight: 8 },
  subjectCount: { color: '#6B7280', fontSize: 12, width: 50, marginRight: 8 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  bottomSheet: { backgroundColor: 'white', borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 32, alignItems: 'center' },
  tagDetailIcon: { width: 96, height: 96, borderRadius: 48, backgroundColor: '#EEF2FF', justifyContent: 'center', alignItems: 'center', marginBottom: 16 },
  tagDetailName: { fontSize: 24, fontWeight: 'bold', color: '#111827', marginBottom: 8 },
  tagDetailDesc: { fontSize: 16, color: '#4B5563', textAlign: 'center', marginBottom: 16 },
  tagDetailDate: { fontSize: 14, color: '#9CA3AF', marginBottom: 32 },
  closeBtn: { backgroundColor: '#4F46E5', width: '100%', padding: 16, borderRadius: 12, alignItems: 'center' },
  closeBtnText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
});
