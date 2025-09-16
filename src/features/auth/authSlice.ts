import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../api/api';

export const registerUser = createAsyncThunk(
  'auth/register',
  async (data: { email: string; password: string }) => {
    const response = await API.post('/auth/register', data);
    return response.data;
  }
);

export const loginUser = createAsyncThunk(
  'auth/login',
  async (data: { email: string; password: string }) => {
    const response = await API.post('/auth/login', data);
    localStorage.setItem('token', response.data.access_token);
    return response.data;
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: { user: null, token: localStorage.getItem('token') || null },
  reducers: { logout: state => { state.user = null; state.token = null; localStorage.removeItem('token'); } },
  extraReducers: builder => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => { state.token = action.payload.access_token; })
      .addCase(registerUser.fulfilled, (state, action) => {});
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
