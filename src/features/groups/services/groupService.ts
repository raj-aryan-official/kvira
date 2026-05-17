// Mock service
export const groupService = {
  fetchMyGroups: async () => ({ success: true, data: [] }),
  createGroup: async (data: any) => ({ success: true, code: 'X8F9A2' }),
  joinGroup: async (code: string) => ({ success: true }),
  leaveGroup: async (id: string) => ({ success: true }),
  searchGroups: async (query: string) => ({ success: true, data: [] }),
  fetchGroupDetails: async (id: string) => ({ success: true, data: null }),
  updateGroupSettings: async (id: string, settings: any) => ({ success: true }),
  reportMessage: async (msgId: string) => ({ success: true }),
};
