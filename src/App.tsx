import { Provider } from 'react-redux';
import { store } from './app/store';
import ProductsPage from './pages/ProductsPage';

function App() {
  return (
    <Provider store={store}>
      <div className="bg-gray-100 min-h-screen">
        <ProductsPage />
      </div>
    </Provider>
  );
}

export default App;
