import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import CatalogPage from './pages/CatalogPage';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import NotFound from './components/NotFound';
import { useCart } from './hooks/useCart';

function App() {
  const cart = useCart();

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout itemCount={cart.itemCount} />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/produtos" element={<CatalogPage />} />
          <Route path="/produto/:slug" element={<ProductPage cart={cart} />} />
          <Route path="/carrinho" element={<CartPage cart={cart} />} />
          <Route
            path="*"
            element={<NotFound />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
