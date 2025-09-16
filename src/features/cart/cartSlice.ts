import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import API from "../../api/api";

interface CartItem {
  productId: number;
  quantity: number;
  name?: string; // агар мехоҳӣ номи маҳсулотро низ нигоҳ дорӣ
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
export const fetchCart = createAsyncThunk("cart/fetch", async () => {
  const res = await API.get("/cart");
  return res.data as CartItem[];
});

export const addToCart = createAsyncThunk(
  "cart/add",
  async (data: { productId: number; quantity?: number }) => {
    const res = await API.post("/cart/add", data);
    return res.data as CartItem;
  }
);

export const removeFromCart = createAsyncThunk(
  "cart/remove",
  async (productId: number) => {
    await API.delete(`/cart/remove/${productId}`);
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
          state.items.push(action.payload);
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
