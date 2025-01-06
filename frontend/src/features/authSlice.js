import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API = `${process.env.REACT_APP_API_URL}/auth/login`;

const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
    user: user ? user : null,
    token: user?.token || null,
    error: false,
    success: false,
    loading: false,
};
  
export const loginUser = createAsyncThunk(
'auth/login',
async (credentials, { rejectWithValue }) => {
    try {
    const response = await axios.post(API, credentials);
    const userData = response.data;

    localStorage.setItem("user", JSON.stringify(userData));

    return userData;
    } catch (error) {
    return rejectWithValue(error.response.data || { error: 'Login failed' });
    }
}
);
  
export const logoutUser = createAsyncThunk('auth/logout', async () => {
    localStorage.removeItem("user"); 
    return null;
});
  
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        checkToken: (state) => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user && user.token) {
            state.user = user;
            state.token = user.token;
        } else {
            state.user = null;
            state.token = null;
        }
        },
    },
    extraReducers: (builder) => {
        builder
        .addCase(loginUser.pending, (state) => {
            state.loading = true;
            state.error = false;
        })
        .addCase(loginUser.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload;
            state.token = action.payload.token;
            state.success = true;
        })
        .addCase(loginUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload.error || 'Login failed';
            state.success = false;
        })
        .addCase(logoutUser.fulfilled, (state) => {
            state.user = null;
            state.token = null;
            state.success = false;
            state.error = false;
        });
    },
});
  
export const { checkToken } = authSlice.actions;
export default authSlice.reducer;