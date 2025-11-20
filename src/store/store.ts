import { LLMTestHelperApi } from '@/api/LLMTestHelperApi';
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import authReducer from '@/features/auth/state/authSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [LLMTestHelperApi.reducerPath]: LLMTestHelperApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(LLMTestHelperApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
