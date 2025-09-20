import { useAppSelector, useAppDispatch } from '../app/hooks';
import { removeFromCart } from '../features/cart/cartSlice';

const CartPage = () => {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart.items);
  const userId = useAppSelector((state) => state.auth.userId);
  
  const localCart = !userId ? JSON.parse(localStorage.getItem("cart") || "[]") : [];
  const cartItemsToShow = userId ? cartItems : localCart;
  console.log(cartItemsToShow);
  if (cartItemsToShow.length === 0) {
    return <p className="p-6">Your cart is empty.</p>;
  }



  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Your Cart</h1>
      {cartItemsToShow.map((item: any) => (
        <div
          key={item.productId}
          className="flex justify-between border-b p-2 gap-3"
        >
          <span>
            {item.name ?? 'Product'} - ({item.quantity}n - ${item.quantity * item.price})
          </span>

          <button
            className="text-red-500"
            onClick={() =>
              userId
                ? dispatch(removeFromCart(item.productId))
                : handleRemoveLocal(item.productId)
            }
          >
            Remove
          </button>
        </div>
      ))}
    </div>
  );
};
function handleRemoveLocal(productId: number) {
  const carts = JSON.parse(localStorage.getItem('cart') || '[]');
  const updated = carts.filter((c: any) => c.productId !== productId);
  localStorage.setItem('cart', JSON.stringify(updated));
  window.location.reload(); 
}
export default CartPage;
