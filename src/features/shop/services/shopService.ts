export const shopService = {
  fetchShopItems: async () => ({ success: true, data: [] }),
  purchaseItem: async (itemId: string, cost: number) => ({ success: true }),
  fetchOwnedItems: async () => ({ success: true, data: [] }),
};
