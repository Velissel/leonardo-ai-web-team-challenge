import { configureStore, combineReducers } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import Cookies from 'js-cookie';
import { CookieStorage } from 'redux-persist-cookie-storage';

import userReducer from './slices/userSlice';
// RootState will be defined in this file

const rootReducer = combineReducers({
  user: userReducer,
  // Add other reducers here
});

// Define RootState directly from the rootReducer
export type RootState = ReturnType<typeof rootReducer>;

const persistConfig = {
  key: 'root', // The key for the persist store in storage
  storage: new CookieStorage(Cookies, {
    // Optional: set cookie options here
    // expires: 7, // e.g., expire in 7 days
    // path: '/',
    // sameSite: 'lax', // or 'strict' or 'none'
    // secure: process.env.NODE_ENV === 'production', // only send cookie over https in production
  }),
  whitelist: ['user'], // Specify which slices to persist (e.g., only 'user')
  // blacklist: [], // Alternatively, specify slices NOT to persist
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  // devTools: process.env.NODE_ENV !== 'production', // Enable DevTools only in development
});

export const persistor = persistStore(store);

// Export AppDispatch for use in the application
// RootState is already exported above
export type AppDispatch = typeof store.dispatch;

// Re-export actions from userSlice for convenience
export { setUser, clearUser } from './slices/userSlice';
