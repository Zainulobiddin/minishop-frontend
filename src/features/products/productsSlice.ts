import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../api/api';
import type { Product } from './types';

interface ProductsState {
  items: Product[];
}

const initialState: ProductsState = {
  items: [],
};

export const fetchProducts = createAsyncThunk('products/fetch', async () => {
  const res = await API.get('/products');
  return res.data as Product[];
});

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.items = action.payload;
    });
  },
});

export default productsSlice.reducer;
