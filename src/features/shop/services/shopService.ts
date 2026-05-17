import apiClient from '../../../services/api/apiClient';

export const fetchShopItems = async () => {
  const response = await apiClient.get('/shop/items');
  return response.data;
};

export const purchaseItem = async (itemId: string) => {
  const response = await apiClient.post(`/shop/purchase/${itemId}`);
  return response.data;
};

export default { fetchShopItems, purchaseItem };
