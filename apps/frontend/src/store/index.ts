import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { AUTH } from '@/constants';

import { authApi } from '@/store/auth/authApi';
import { authReducer } from '@/store/auth/authSlice';

const reducers = combineReducers({
    [authApi.reducerPath]: authApi.reducer,
    [AUTH]: authReducer,
});

export const store = configureStore({
    reducer: reducers,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(authApi.middleware),
});
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
