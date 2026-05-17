import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface StreakDangerBannerProps {
  visible: boolean;
  streakCount: number;
  isLate: boolean; // True for 9:30 PM (red variant)
}

export const StreakDangerBanner = ({ visible, streakCount, isLate }: StreakDangerBannerProps) => {
  const translateY = useRef(new Animated.Value(-100)).current;

  useEffect(() => {
    if (visible) {
      Animated.sequence([
        Animated.timing(translateY, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.delay(8000), // Auto-dismiss after 8s
        Animated.timing(translateY, {
          toValue: -100,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible]);

  if (!visible) return null;

  return (
    <Animated.View style={[styles.container, isLate && styles.containerLate, { transform: [{ translateY }] }]}>
      <Ionicons name="flame" size={24} color="white" style={styles.icon} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>Keep your streak alive!</Text>
        <Text style={styles.subtitle}>You haven't practiced today. {streakCount} day streak at risk!</Text>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 50, // Below status bar
    left: 16,
    right: 16,
    backgroundColor: '#F59E0B', // Amber
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
    zIndex: 1000,
  },
  containerLate: {
    backgroundColor: '#EF4444', // Red variant for 9:30 PM
  },
  icon: {
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  subtitle: {
    color: 'white',
    fontSize: 14,
    opacity: 0.9,
  },
});
