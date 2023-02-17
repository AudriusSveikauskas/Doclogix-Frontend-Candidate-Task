import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/auth';
import userReducer from './user/user';

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
