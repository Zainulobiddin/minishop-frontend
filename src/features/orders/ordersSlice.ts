import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../api/api';

export const fetchOrders = createAsyncThunk('orders/fetch', async () => {
  const res = await API.get('/orders');
  return res.data;
});

export const createOrder = createAsyncThunk('orders/create', async () => {
  const res = await API.post('/orders');
  return res.data;
});

interface Order {
  id: string;
  [key: string]: any; // Adjust fields as per your API response
}

interface OrdersState {
  items: Order[];
}

const ordersSlice = createSlice({
  name: 'orders',
  initialState: { items: [] } as OrdersState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchOrders.fulfilled, (state, action) => { state.items = action.payload; })
      .addCase(createOrder.fulfilled, (state, action) => { state.items.unshift(action.payload); });
  },
});

export default ordersSlice.reducer;
