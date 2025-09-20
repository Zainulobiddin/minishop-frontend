import {Routes, Route } from 'react-router-dom';
import ProductsPage from './pages/ProductsPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CartPage from './pages/CartPage';
import Navbar from './components/Navbar';
import { Provider } from 'react-redux';
import { store } from './app/store';


export function App() {
  return (
    <Provider store={store}>
        <Navbar />
        <Routes>
          <Route path="/" element={<ProductsPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
    </Provider>
  );
}
