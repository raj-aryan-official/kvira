import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export const notificationService = {
  registerForPushNotificationsAsync: async () => {
    let token;
    
    // Check permissions
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    
    if (finalStatus !== 'granted') {
      console.log('Failed to get push token for push notification!');
      return;
    }

    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }

    // Usually gets FCM token here via expo push token
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log("Expo Push Token:", token);
    
    // Send token to backend...
    return token;
  },

  scheduleStreakReminder: async () => {
    // Schedule 7 PM reminder
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Keep your streak alive! 🔥",
        body: "Practice for just 5 minutes to keep your streak going.",
      },
      trigger: {
        hour: 19,
        minute: 0,
        repeats: true,
      } as any,
    });
  }
};
