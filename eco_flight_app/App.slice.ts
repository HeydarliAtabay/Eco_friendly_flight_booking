import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from './src/services/interfaces.ts/interfaces';

export interface AppState {
  user: User | undefined;
  loading: boolean;
}
const initialState: AppState = {
  user: undefined,
  loading: true,
};

const slice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    initializeApp: () => initialState,
    loadUser: (state, { payload: user }: PayloadAction<User>) => {
      state.user = user;
      state.loading = false;
    },
    logout: (state) => {
      state.user = undefined;
      localStorage.removeItem('access_token');
    },
    endLoad: (state) => {
      state.loading = false;
    },
  },
});

export const { loadUser, logout, endLoad} = slice.actions;

export default slice.reducer;
