import apiClient from '../../../services/api/apiClient';

export const fetchNotifications = async () => {
  const response = await apiClient.get('/notifications');
  return response.data;
};

export const registerPushToken = async (token: string) => {
  const response = await apiClient.post('/notifications/register', { token });
  return response.data;
};

export default { fetchNotifications, registerPushToken };
