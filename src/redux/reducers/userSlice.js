import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";

const initialState = {
  accessToken: null,
  user: null,
};

  const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
      fillUser: (state, action) => {
        state.user = action.payload;
      },
      logOutUser: (state) => {
        state.user = { email: '' };
      }
    },
  });

export const {fillUser, logOutUser} = userSlice.actions
export default userSlice.reducer