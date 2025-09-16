import { useEffect, type JSXElementConstructor, type Key, type ReactElement, type ReactNode, type ReactPortal } from 'react';
import { fetchOrders } from '../features/orders/ordersSlice';
import { useAppDispatch, useAppSelector } from '../app/hooks';

const OrdersPage = () => {
  const dispatch = useAppDispatch();
  const orders = useAppSelector(state => state.orders.items);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  return (
    <div className="p-6">
      <h1 className="text-xl mb-4">Your Orders</h1>
      {orders.length === 0 ? <p>No orders yet</p> : (
        <div className="space-y-4">
          {orders.map(order => (
            <div key={order.id} className="border p-3">
              <p>Order ID: {order.id}</p>
              <p>Total: ${order.totalPrice}</p>
              <ul className="ml-4">
                {order.items.map((item: { id: Key | null | undefined; product: { name: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; }; quantity: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; price: number; }) => (
                  <li key={item.id}>{item.product.name} x {item.quantity} = ${item.price * (typeof item.quantity === 'number' ? item.quantity : 0)}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
