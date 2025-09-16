import  { useEffect } from 'react';
import { createOrder } from '../features/orders/ordersSlice';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { fetchCart, removeFromCart } from '../features/cart/cartSlice';
import type { RootState } from '../app/store';

const CartPage = () => {
  const dispatch = useAppDispatch();
  const cart = useAppSelector((state: RootState) => state.cart.items);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const handleCheckout = async () => {
    await dispatch(createOrder());
    alert('Order placed!');
    dispatch(fetchCart());
  };

  return (
    <div className="p-6">
      <h1 className="text-xl mb-4">Your Cart</h1>
      {cart.length === 0 ? <p>Cart is empty</p> : (
        <div className="space-y-4">
          {cart.map((item: any) => (
            <div key={item.productId} className="flex justify-between border p-3">
              <div>
                <h2>{item.product.name}</h2>
                <p>Quantity: {item.quantity}</p>
              </div>
              <div>
                <p>${item.product.price * item.quantity}</p>
                <button className="bg-red-500 text-white p-1 mt-2" onClick={() => dispatch(removeFromCart(item.productId))}>Remove</button>
              </div>
            </div>
          ))}
          <button className="mt-4 bg-green-500 text-white p-2" onClick={handleCheckout}>Checkout</button>
        </div>
      )}
    </div>
  );
};

export default CartPage;
