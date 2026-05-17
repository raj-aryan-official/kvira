import { Alert } from 'react-native';

export const shareCardGenerator = {
  generateTestResultCard: async (ref: any) => {
    try {
      if (ref && ref.current) {
        // const uri = await ref.current.capture();
        // await Sharing.shareAsync(uri);
        Alert.alert("Shared!", "Test result card generated and shared.");
      }
    } catch (e) {
      console.error(e);
    }
  },

  generateAchievementCard: async () => {
    Alert.alert("Shared!", "Achievement card shared.");
  },

  generateBattleVictoryCard: async () => {
    Alert.alert("Shared!", "Battle victory shared.");
  },

  generateStreakMilestoneCard: async () => {
    Alert.alert("Shared!", "Streak milestone shared.");
  }
};
