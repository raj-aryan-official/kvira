import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface NetworkState {
  isConnected: boolean;
  isInternetReachable: boolean;
  isSyncing: boolean;
}

const initialState: NetworkState = {
  isConnected: true,
  isInternetReachable: true,
  isSyncing: false,
};

const networkSlice = createSlice({
  name: 'network',
  initialState,
  reducers: {
    setNetworkStatus: (state, action: PayloadAction<{ isConnected: boolean; isInternetReachable: boolean }>) => {
      state.isConnected = action.payload.isConnected;
      state.isInternetReachable = action.payload.isInternetReachable;
    },
    setSyncing: (state, action: PayloadAction<boolean>) => {
      state.isSyncing = action.payload;
    },
  },
});

export const { setNetworkStatus, setSyncing } = networkSlice.actions;
export default networkSlice.reducer;
