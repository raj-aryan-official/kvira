import * as Notifications from 'expo-notifications';

export const registerForPushNotificationsAsync = async () => {
  const { status } = await Notifications.getPermissionsAsync();
  if (status !== 'granted') {
    const result = await Notifications.requestPermissionsAsync();
    if (result.status !== 'granted') return null;
  }
  return (await Notifications.getExpoPushTokenAsync()).data;
};

export default { registerForPushNotificationsAsync };
