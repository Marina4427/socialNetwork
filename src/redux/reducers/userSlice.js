import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    user: {
        email: ''
    }
}

const userSlice = createSlice ({
    name: 'user',
    initialState,
    reducers: {
        fillUser: (state, action) => {
            state.user = action.payload
        }
    },
})


export const {fillUser} = userSlice.actions
export default userSlice.reducer