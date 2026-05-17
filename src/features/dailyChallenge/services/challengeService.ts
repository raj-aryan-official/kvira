import apiClient from '../../../services/api/apiClient';

export const fetchDailyChallenge = async () => {
  const response = await apiClient.get('/challenges/daily');
  return response.data;
};

export default { fetchDailyChallenge };
