import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../utils/axios";

export const findAllUsers = createAsyncThunk(
  "findUsers/findAllUsers",
  async (filter, { rejectWithValue }) => {
    try {
      const res = await axios.get(`/users?email_ne=${filter.email}`);
      if (res.status !== 200) {
        throw new Error('Error');
      }
      return res.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const findUsersSlice = createSlice({
  name: "findUsers", 
  initialState: {
    data: [],
    status: "",
    error: "",
    filter: {
      search: ''
    },
  },
  reducers: {
    changeSearch: (state, action) => {
      state.filter = {
        ...state.filter,
        search: action.payload
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(findAllUsers.pending, (state) => {
        state.status = 'Loading';
        state.error = '';
      })
      .addCase(findAllUsers.rejected, (state, action) => {
        state.status = 'Error';
        state.error = action.payload;
      })
      .addCase(findAllUsers.fulfilled, (state, action) => {
        state.status = 'Done';
        state.data = action.payload;
      });
  },
});

export default findUsersSlice.reducer;