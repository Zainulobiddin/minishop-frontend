import { useEffect } from 'react';
import { fetchProducts } from '../features/products/productsSlice';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { addToCart } from '../features/cart/cartSlice';
import type { RootState } from '../app/store';
import type { Product } from '../features/products/types';

const ProductsPage = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector((state: RootState) => state.products.items);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div className="p-6 grid grid-cols-3 gap-6">
      {products.map((p: Product) => (
        <div key={p.id} className="border p-4 flex flex-col rounded shadow hover:shadow-lg">
          <img src={p.image} alt={p.name} className="h-40 object-cover mb-2 rounded" />
          <h2 className="font-bold text-lg">{p.name}</h2>
          <p className="text-sm">{p.description}</p>
          <p className="font-semibold mt-2">${p.price}</p>
          <button
            className="mt-auto bg-blue-500 hover:bg-blue-600 text-white p-2 rounded"
            onClick={() => dispatch(addToCart({ productId: p.id, quantity: 1 }))}
          >
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
};

export default ProductsPage;
