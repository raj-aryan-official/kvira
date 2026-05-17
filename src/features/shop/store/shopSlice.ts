import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ShopItem {
  id: string;
  name: string;
  category: 'Avatars' | 'Themes' | 'Borders' | 'Shields';
  price: number;
  previewUrl: string;
  description: string;
}

interface ShopState {
  items: ShopItem[];
  ownedItemIds: string[];
  shieldCount: number;
  loading: boolean;
}

const initialState: ShopState = {
  items: [
    { id: 's1', name: 'Streak Shield', category: 'Shields', price: 100, previewUrl: 'https://cdn-icons-png.flaticon.com/512/1164/1164384.png', description: 'Protects your streak if you miss a day.' },
    { id: 'a1', name: 'Ninja Avatar', category: 'Avatars', price: 500, previewUrl: 'https://cdn-icons-png.flaticon.com/512/1946/1946429.png', description: 'A cool ninja avatar for your profile.' },
    { id: 't1', name: 'Dark Theme', category: 'Themes', price: 1000, previewUrl: 'https://cdn-icons-png.flaticon.com/512/763/763354.png', description: 'Unlock the sleek dark theme for EduQuest.' },
  ],
  ownedItemIds: [],
  shieldCount: 0,
  loading: false,
};

const shopSlice = createSlice({
  name: 'shop',
  initialState,
  reducers: {
    addOwnedItem: (state, action: PayloadAction<string>) => {
      state.ownedItemIds.push(action.payload);
    },
    incrementShields: (state) => {
      if (state.shieldCount < 3) {
        state.shieldCount += 1;
      }
    },
    useShield: (state) => {
      if (state.shieldCount > 0) {
        state.shieldCount -= 1;
      }
    }
  },
});

export const { addOwnedItem, incrementShields, useShield } = shopSlice.actions;
export default shopSlice.reducer;
