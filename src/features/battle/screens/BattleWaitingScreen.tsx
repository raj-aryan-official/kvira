import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useBattle } from '../hooks/useBattle';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<any, 'BattleWaitingScreen'>;

export default function BattleWaitingScreen({ navigation }: Props) {
  const { activeBattle } = useBattle();
  const pulseAnim = new Animated.Value(1);

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, { toValue: 1.1, duration: 1000, useNativeDriver: true }),
        Animated.timing(pulseAnim, { toValue: 1, duration: 1000, useNativeDriver: true })
      ])
    ).start();

    // Mock timeout to simulate opponent accepting after 5 seconds
    const timer = setTimeout(() => {
      navigation.replace('BattleExamScreen');
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  if (!activeBattle) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Waiting for Opponent...</Text>
      
      <View style={styles.vsContainer}>
        <Animated.View style={[styles.avatarContainer, { transform: [{ scale: pulseAnim }] }]}>
          <Image source={{ uri: 'https://i.pravatar.cc/150?img=11' }} style={styles.avatar} />
          <Text style={styles.playerName}>You</Text>
        </Animated.View>

        <Text style={styles.vsText}>VS</Text>

        <Animated.View style={[styles.avatarContainer, { transform: [{ scale: pulseAnim }] }]}>
          <View style={[styles.avatar, styles.placeholderAvatar]}>
            <Ionicons name="help" size={32} color="#9CA3AF" />
          </View>
          <Text style={styles.playerName}>?</Text>
        </Animated.View>
      </View>

      <View style={styles.detailsCard}>
        <Text style={styles.detailsTitle}>Challenge Details</Text>
        <Text style={styles.detailText}>{activeBattle.subject} • {activeBattle.topic}</Text>
        <Text style={styles.detailText}>{activeBattle.questionCount} Questions</Text>
        <Text style={styles.timeLimitText}>Expires in 24 hours</Text>
      </View>

      <TouchableOpacity style={styles.cancelBtn} onPress={() => navigation.goBack()}>
        <Text style={styles.cancelBtnText}>Cancel Challenge</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1E1B4B', padding: 24, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', color: 'white', marginBottom: 60 },
  vsContainer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%', paddingHorizontal: 20, marginBottom: 60 },
  avatarContainer: { alignItems: 'center' },
  avatar: { width: 80, height: 80, borderRadius: 40, borderWidth: 3, borderColor: '#4F46E5', marginBottom: 12 },
  placeholderAvatar: { backgroundColor: '#374151', justifyContent: 'center', alignItems: 'center', borderColor: '#4B5563' },
  playerName: { color: 'white', fontWeight: 'bold', fontSize: 16 },
  vsText: { color: '#A5B4FC', fontSize: 32, fontWeight: 'bold', fontStyle: 'italic' },
  detailsCard: { backgroundColor: 'rgba(255,255,255,0.1)', padding: 24, borderRadius: 16, width: '100%', alignItems: 'center', marginBottom: 40 },
  detailsTitle: { color: 'white', fontSize: 18, fontWeight: 'bold', marginBottom: 12 },
  detailText: { color: '#E5E7EB', fontSize: 16, marginBottom: 8 },
  timeLimitText: { color: '#F59E0B', fontSize: 14, marginTop: 12, fontStyle: 'italic' },
  cancelBtn: { padding: 16, borderRadius: 12, borderWidth: 1, borderColor: '#EF4444', width: '100%', alignItems: 'center' },
  cancelBtnText: { color: '#EF4444', fontWeight: 'bold', fontSize: 16 },
});
