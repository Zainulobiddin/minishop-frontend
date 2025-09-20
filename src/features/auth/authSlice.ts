import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../api/api";
import { fetchCart } from "../cart/cartSlice";
import { use, useDebugValue } from "react";
import { useDispatch } from "react-redux";

interface AuthState {
  userId: number | null;
  token: string | null;
}
const initialState: AuthState = {
  userId: null,
  token: null,
};

export const registerUser = createAsyncThunk(
  "auth/register",
  async (data: { email: string; password: string }) => {
    const response = await API.post("/auth/register", data);
    return response.data;
  }
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async (data: { email: string; password: string }, thunkAPI) => {
    const response = await API.post("/auth/login", data);
    localStorage.setItem("token", response.data.access_token);

    const localCart = JSON.parse(localStorage.getItem("cart") || "[]");
    if (localCart.length > 0) {
      await API.post(`/cart/merge/${response.data.user.id}`, {
        items: localCart,
      });
      localStorage.removeItem("cart");
      thunkAPI.dispatch(fetchCart());
    }

    return response.data;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    userId: null,
    token: localStorage.getItem("token") || null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("token");
    },

    login: (state, action) => {
      state.user = action.payload.user;
      state.userId = action.payload.user.id;
    },
  },
});

export const { logout, login } = authSlice.actions;
export default authSlice.reducer;
