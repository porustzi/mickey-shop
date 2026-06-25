import { useState, useEffect } from 'react';
import { CartProvider } from './context/CartContext';
import Nav from './components/Nav';
import Footer from './components/Footer';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductPage from './pages/ProductPage';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import About from './pages/About';

type Page = 'home' | 'shop' | 'product' | 'cart' | 'checkout' | 'about';

export default function App() {
  const [page, setPage] = useState<Page>('home');
  const [productId, setProductId] = useState<string | null>(null);
  const [shopCategory, setShopCategory] = useState<string | undefined>(undefined);

  const navigate = (targetPage: string, id?: string) => {
    if (targetPage === 'product' && id) {
      setProductId(id);
      setPage('product');
    } else if (targetPage === 'shop') {
      if (id && id !== productId) {
        setShopCategory(id);
      } else if (!id) {
        setShopCategory(undefined);
      }
      setPage('shop');
    } else {
      setPage(targetPage as Page);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const showFooter = page !== 'checkout';

  return (
    <CartProvider>
      <div className="min-h-screen bg-void-950 text-white">
        <Nav currentPage={page} onNavigate={navigate} />

        <main>
          {page === 'home' && <Home onNavigate={navigate} />}
          {page === 'shop' && (
            <Shop
              key={shopCategory}
              onNavigate={navigate}
              initialCategory={shopCategory}
            />
          )}
          {page === 'product' && productId && (
            <ProductPage productId={productId} onNavigate={navigate} />
          )}
          {page === 'cart' && <Cart onNavigate={navigate} />}
          {page === 'checkout' && <Checkout onNavigate={navigate} />}
          {page === 'about' && <About onNavigate={navigate} />}
        </main>

        {showFooter && <Footer onNavigate={navigate} />}
      </div>
    </CartProvider>
  );
}
