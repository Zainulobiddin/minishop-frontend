import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import API from "../../api/api";
import type { RootState } from "../../app/store";

interface CartItem {
  productId: number;
  quantity: number;
  name?: string;
  price?: number;
  image?: string;
}
interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

// Thunks
export const fetchCart = createAsyncThunk(
  "cart/fetch",
  async (_, { getState }) => {
    const state = getState() as RootState;
    const userId = state.auth.userId;
    if (!userId) throw new Error("User not logged in");
    const res = await API.get(`/cart/${userId}`);
    return res.data as CartItem[];
  }
);

export const addToCart = createAsyncThunk(
  "cart/add",
  async (data: { productId: number; quantity?: number, name: string, price: number }, { getState }) => {
    const state = getState() as RootState;
    const userId = state.auth.userId;
    if (!userId) {
      const carts = JSON.parse(localStorage.getItem("cart") || "[]");
      const hasCartItem = carts.find(
        (item: CartItem) => item.productId === data.productId
      );
      if (!hasCartItem) {
        carts.push(data);
      } else {
        hasCartItem.quantity +=  1;
      }
      localStorage.setItem("cart", JSON.stringify(carts));
      return data as CartItem;
    }
    const res = await API.post(`/cart/${userId}`, data);
    return res.data as CartItem;
  }
);

export const removeFromCart = createAsyncThunk(
  "cart/remove",
  async (productId: number, { getState }) => {
    const state = getState() as RootState;
    const userId = state.auth.userId;
    if (!userId) throw new Error("User not logged in");
    await API.delete(`/cart/${userId}/${productId}`);
    return productId;
  }
);

// Slice
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        fetchCart.fulfilled,
        (state, action: PayloadAction<CartItem[]>) => {
          state.items = action.payload;
        }
      )
      .addCase(
        addToCart.fulfilled,
        (state, action: PayloadAction<CartItem>) => {
          const existingItem = state.items.find((i) => i.productId === action.payload.productId);
          if (existingItem) {
            existingItem.quantity +=  1;
          } else {
            state.items.push({
              ...action.payload,
              quantity:  1,
            });
          }
        }
      )
      .addCase(
        removeFromCart.fulfilled,
        (state, action: PayloadAction<number>) => {
          state.items = state.items.filter(
            (i) => i.productId !== action.payload
          );
        }
      );
  },
});

export default cartSlice.reducer;
