import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/auth';
import userReducer from './user/user';
import menuReducer from './menu/menu';
import fileReducer from './file/file';

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    menu: menuReducer,
    file: fileReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
