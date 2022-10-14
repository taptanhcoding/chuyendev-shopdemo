import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchCount } from '../counter/counterAPI';

const initialState = {
    user: {},
};

export const incrementAsync = createAsyncThunk('counter/fetchCount', async (amount) => {
    const response = await fetchCount(amount);
    return response.data;
});

export const usersSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        LoginUser: (state, action) => {
            state.user = action.payload;
        },
        logOutUser: (state) => {
            state.user = null;
        },
        updateUser: (state, action) => {
            state.user = { ...state.user, ...action.payload };
        },
    },
});

export const { LoginUser, logOutUser, updateUser } = usersSlice.actions;

export default usersSlice.reducer;
