import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from '../../utils/axios'


export const getAllNotification = createAsyncThunk(
  'notifications/getAllNotifications',
  async (arr, {rejectWithValue}) => {
    try {
      const userIds = arr.map((n) => n.from);
      const query = userIds.map((id) => `id=${id}`).join("&");

      const res = await axios(`/users?${query}`)
      if (res.status !== 200) {
        throw new Error('Данные не получены');
      }

      return res.data;

    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
)


const notifications = createSlice({
  name: 'notifications',
  initialState: {
    data: [],
    status: '',
    error: ''
  },
  reducers: {},
  extraReducers: (builder) => {
    builder 
    .addCase(getAllNotification.pending, (state) => {
      state.status= 'Loading...'
      state.error = ''
    })
    .addCase(getAllNotification.rejected, (state, action) => {
      state.status = 'Error'
      state.error = action.payload
    })
    .addCase(getAllNotification.fulfilled, (state, action) => {
      state.status = 'Success'
      state.data = action.payload
    })

  }
})

export default notifications.reducer