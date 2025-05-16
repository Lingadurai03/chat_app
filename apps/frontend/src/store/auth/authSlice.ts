import { AuthState, User } from '@chat/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AUTH } from '@/constants';

const initialState: AuthState = {
    user: null,
};

const authSlice = createSlice({
    name: AUTH,
    initialState,
    reducers: {
        setCredentials: (
            state,
            action: PayloadAction<{
                user: User;
                accessToken: string;
                refreshToken: string;
            }>,
        ) => {
            state.user = action.payload.user;
        },
        logout: (state) => {
            state.user = null;
        },
    },
});

export const authActions = authSlice.actions;
export const authReducer = authSlice.reducer;
export default authSlice;
