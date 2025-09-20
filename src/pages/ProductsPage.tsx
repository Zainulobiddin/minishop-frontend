import { useEffect, useState } from "react";
import { fetchProducts } from "../features/products/productsSlice";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { addToCart } from "../features/cart/cartSlice";
import type { RootState } from "../app/store";
import type { Product } from "../features/products/types";

const ProductsPage = () => {
  const dispatch = useAppDispatch();
  const { items: products } = useAppSelector(
    (state: RootState) => state.products
  );

  const [search, setSearch] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const filteredProducts = products
    .filter((p: Product) => {
      const matchesName = p.name.toLowerCase().includes(search.toLowerCase());
      const matchesMin = minPrice ? p.price >= Number(minPrice) : true;
      const matchesMax = maxPrice ? p.price <= Number(maxPrice) : true;
      return matchesName && matchesMin && matchesMax;
    })
    .sort((a, b) => {
      if (sortBy === "price-low") return a.price - b.price;
      if (sortBy === "price-high") return b.price - a.price;
      if (sortBy === "name") return a.name.localeCompare(b.name);
      return 0;
    });

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 py-8">
      {/* Заголовок */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-slate-800 mb-3">Our Products</h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto text-red-500">
            Discover our carefully curated collection of premium products
          </p>
        </div>
      </div>

      {/* Поиск и фильтры */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="bg-white rounded-2xl shadow-sm p-6 border border-slate-200">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="block w-full pl-10 pr-4 py-3 text-slate-700 placeholder-slate-400 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              />
            </div>

            <div className="flex gap-3 w-full md:w-auto">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-5 py-3 bg-blue-500 text-white rounded-xl transition-all hover:bg-blue-600 hover:shadow-md"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
                Filters
              </button>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              >
                <option value="name">Sort by Name</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Расширенные фильтры */}
          {showFilters && (
            <div className="mt-6 pt-6 border-t border-slate-200 grid grid-cols-2 md:grid-cols-2 gap-8">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Minimum Price</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-slate-500">$</span>
                  </div>
                  <input
                    type="number"
                    placeholder="0"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    className="pl-8 pr-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full outline-none transition"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Maximum Price</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-slate-500">$</span>
                  </div>
                  <input
                    type="number"
                    placeholder="1000"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    className="pl-8 pr-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full outline-none transition"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Количество результатов */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <p className="text-slate-600 text-red-500">
          Showing <span className="font-semibold text-blue-600">{filteredProducts.length}</span> products
        </p>
      </div>

      {/* Сетка товаров */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-3 lg:grid-cols-3 gap-6">
            {filteredProducts.map((p: Product) => (
              <div
                key={p.id}
                className="bg-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col group border border-slate-200"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="h-60 w-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-5 flex flex-col flex-grow">
                  <h2 className="font-bold text-lg text-slate-800 mb-2 line-clamp-1">
                    {p.name}
                  </h2>
                  <p className="text-sm text-slate-500 mb-4 line-clamp-2 flex-grow">
                    {p.description}
                  </p>
                  <div className="flex items-center justify-between mt-auto">
                    <p className="text-xl font-bold text-blue-600">${p.price}</p>
                    <button
                      className="flex items-center justify-center cursor-pointer bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-xl shadow-sm hover:shadow-md transition-all duration-200"
                      onClick={() =>
                        dispatch(
                          addToCart({
                            productId: p.id,
                            quantity: 1,
                            name: p.name,
                            price: p.price,
                          })
                        )
                      }
                      aria-label={`Add ${p.name} to cart`}
                    >
                      <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          // Товары не найдены
          <div className="text-center py-16 bg-white rounded-2xl shadow-sm border border-slate-200">
            <div className="inline-flex items-center justify-center rounded-full bg-blue-50 p-4 mb-6">
              <svg className="h-12 w-12 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-slate-800 mb-2">No products found</h3>
            <p className="text-slate-600 max-w-prose mx-auto mb-6">
              We couldn't find any products matching your filters. Try adjusting your search or filter criteria.
            </p>
            <button
              onClick={() => {
                setSearch("");
                setMinPrice("");
                setMaxPrice("");
              }}
              className="px-6 py-3 bg-blue-500 text-white rounded-xl shadow-sm hover:bg-blue-600 hover:shadow-md transition-all"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;