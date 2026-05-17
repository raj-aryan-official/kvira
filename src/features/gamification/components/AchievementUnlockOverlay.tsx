import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../store';
import { popAchievementQueue } from '../store/gamificationSlice';
import LottieView from 'lottie-react-native';
import { Ionicons } from '@expo/vector-icons';

export const AchievementUnlockOverlay = () => {
  const dispatch = useDispatch();
  const { pendingAchievementQueue } = useSelector((state: RootState) => state.gamification);

  if (pendingAchievementQueue.length === 0) return null;

  const currentAchievement = pendingAchievementQueue[0];
  const queueLength = pendingAchievementQueue.length;

  return (
    <Modal transparent animationType="fade" visible={true}>
      <View style={styles.overlay}>
        {/* Placeholder for Lottie Confetti */}
        {/* <LottieView source={require('../../../../assets/confetti.json')} autoPlay loop={false} style={StyleSheet.absoluteFillObject} /> */}
        
        <View style={styles.card}>
          {queueLength > 1 && (
            <Text style={styles.counter}>1 of {queueLength}</Text>
          )}
          
          <View style={styles.iconContainer}>
            <Ionicons name={currentAchievement.icon as any} size={48} color="#F59E0B" />
          </View>
          
          <Text style={styles.title}>Achievement Unlocked!</Text>
          <Text style={styles.name}>{currentAchievement.name}</Text>
          <Text style={styles.description}>{currentAchievement.description}</Text>
          
          <View style={styles.rewardBox}>
            <Text style={styles.rewardText}>+{currentAchievement.xpReward} XP</Text>
          </View>

          <TouchableOpacity style={styles.primaryButton}>
            <Text style={styles.primaryButtonText}>Share Achievement</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.outlineButton}
            onPress={() => dispatch(popAchievementQueue())}
          >
            <Text style={styles.outlineButtonText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 24,
    padding: 24,
    width: '100%',
    alignItems: 'center',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
  },
  counter: {
    position: 'absolute',
    top: 16,
    right: 16,
    color: '#6B7280',
    fontWeight: 'bold',
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FEF3C7',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 14,
    color: '#F59E0B',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    textAlign: 'center',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: '#4B5563',
    textAlign: 'center',
    marginBottom: 16,
  },
  rewardBox: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
    marginBottom: 24,
  },
  rewardText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4F46E5',
  },
  primaryButton: {
    backgroundColor: '#4F46E5',
    width: '100%',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
  },
  primaryButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  outlineButton: {
    width: '100%',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D1D5DB',
  },
  outlineButtonText: {
    color: '#374151',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
