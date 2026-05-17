import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, Animated } from 'react-native';

interface LevelUpOverlayProps {
  visible: boolean;
  newLevel: number;
  newLevelName: string;
  onClose: () => void;
}

export const LevelUpOverlay = ({ visible, newLevel, newLevelName, onClose }: LevelUpOverlayProps) => {
  const scale = new Animated.Value(0);

  useEffect(() => {
    if (visible) {
      Animated.spring(scale, {
        toValue: 1,
        tension: 20,
        friction: 5,
        useNativeDriver: true,
      }).start();
    } else {
      scale.setValue(0);
    }
  }, [visible]);

  if (!visible) return null;

  return (
    <Modal transparent animationType="fade" visible={visible}>
      <View style={styles.overlay}>
        {/* Placeholder for Lottie Star Burst */}
        
        <Animated.View style={[styles.badgeContainer, { transform: [{ scale }] }]}>
          <View style={styles.hexBadge}>
            <Text style={styles.levelNumber}>{newLevel}</Text>
          </View>
        </Animated.View>
        
        <Text style={styles.title}>LEVEL UP!</Text>
        <Text style={styles.levelName}>{newLevelName}</Text>
        
        <View style={styles.progressContainer}>
          <View style={[styles.progressBar, { width: '10%' }]} />
        </View>
        <Text style={styles.progressText}>0 / 1000 XP to next level</Text>
        
        <TouchableOpacity style={styles.button} onPress={onClose}>
          <Text style={styles.buttonText}>Awesome</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: '#1E1B4B',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  badgeContainer: {
    marginBottom: 32,
  },
  hexBadge: {
    width: 120,
    height: 120,
    backgroundColor: '#F59E0B',
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{ rotate: '45deg' }],
    borderRadius: 20,
  },
  levelNumber: {
    fontSize: 48,
    fontWeight: 'bold',
    color: 'white',
    transform: [{ rotate: '-45deg' }],
  },
  title: {
    fontSize: 24,
    color: '#FCD34D',
    fontWeight: 'bold',
    letterSpacing: 2,
    marginBottom: 8,
  },
  levelName: {
    fontSize: 36,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 32,
  },
  progressContainer: {
    width: '100%',
    height: 8,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 4,
    marginBottom: 8,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#F59E0B',
    borderRadius: 4,
  },
  progressText: {
    color: 'rgba(255,255,255,0.7)',
    marginBottom: 48,
  },
  button: {
    backgroundColor: '#F59E0B',
    paddingVertical: 16,
    paddingHorizontal: 48,
    borderRadius: 24,
  },
  buttonText: {
    color: '#1E1B4B',
    fontWeight: 'bold',
    fontSize: 18,
  },
});
