import AsyncStorage from '@react-native-async-storage/async-storage';

export const setItem = async (key: string, value: string): Promise<void> => {
  await AsyncStorage.setItem(key, value);
};

export const getItem = async (key: string): Promise<string | null> => AsyncStorage.getItem(key);

export const removeItem = async (key: string): Promise<void> => {
  await AsyncStorage.removeItem(key);
};

export default { setItem, getItem, removeItem };
