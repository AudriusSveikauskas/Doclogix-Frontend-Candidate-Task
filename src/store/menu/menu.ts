import { createSlice } from '@reduxjs/toolkit';

const initialMenu = {
  selectedTab: '',
  isDrawerOpen: false,
};

const initialMenuSlice = createSlice({
  name: 'menu',
  initialState: initialMenu,
  reducers: {
    setSelectedTab(state, action) {
      state.selectedTab = action.payload;
    },

    setIsDrawerOpen(state, action) {
      state.isDrawerOpen = action.payload;
    },
  },
});

export const menuActions = initialMenuSlice.actions;

export default initialMenuSlice.reducer;
