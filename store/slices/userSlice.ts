import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  username: string | null;
  jobTitle: string | null;
}

const initialState: UserState = {
  username: null,
  jobTitle: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{ username: string; jobTitle: string }>) => {
      state.username = action.payload.username;
      state.jobTitle = action.payload.jobTitle;
    },
    clearUser: (state) => {
      state.username = null;
      state.jobTitle = null;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
