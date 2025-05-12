import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../utils/axios";

export const friendsAPI = {
  sendRequest: async (fromUserId, toUserId) => {
    const { data } = await axios.get(`/users/${toUserId}`);
    const updated = await axios.patch(`/users/${toUserId}`, {
      friendRequests: [...data.friendRequests, fromUserId]
    });
    return updated.data;
  },

  acceptRequest: async (userId, requestUserId) => {
    const [{ data: user }, { data: requester }] = await Promise.all([
      axios.get(`/users/${userId}`),
      axios.get(`/users/${requestUserId}`)
    ]);

    await Promise.all([
      axios.patch(`/users/${userId}`, {
        friends: [...user.friends, requestUserId],
        friendRequests: user.friendRequests.filter(id => id !== requestUserId)
      }),
      axios.patch(`/users/${requestUserId}`, {
        friends: [...requester.friends, userId]
      })
    ]);

    return { userId, friendId: requestUserId };
  }
};

export const sendFriendRequest = createAsyncThunk(
  "friends/sendRequest",
  async ({ fromUserId, toUserId }, { rejectWithValue }) => {
    try {
      return await friendsAPI.sendRequest(fromUserId, toUserId);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const acceptFriendRequest = createAsyncThunk(
  "friends/accept",
  async ({ userId, requestUserId }, { rejectWithValue }) => {
    try {
      return await friendsAPI.acceptRequest(userId, requestUserId);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const friendsSlice = createSlice({
  name: "friends",
  initialState: {
    list: [],
    requests: [],
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(sendFriendRequest.pending, (state) => {
        state.loading = true;
      })
      .addCase(sendFriendRequest.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(acceptFriendRequest.fulfilled, (state, action) => {
        const { userId, friendId } = action.payload;
        state.list.push(friendId);
        state.requests = state.requests.filter(id => id !== friendId);
      });
  }
});

export default friendsSlice.reducer;