import { createSlice } from '@reduxjs/toolkit';

const initialAuth = {
  username: '',
  password: '',
  isAuthenticated: false,
};

const initialAuthSlice = createSlice({
  name: 'auth',
  initialState: initialAuth,
  reducers: {
    setUsername(state, action) {
      state.username = action.payload;
    },

    setPassword(state, action) {
      state.password = action.payload;
    },

    setIsAuthenticated(state, action) {
      state.isAuthenticated = action.payload;
    },
  },
});

export const authActions = initialAuthSlice.actions;

export default initialAuthSlice.reducer;
