import { useState } from 'react';
import { CartProvider } from './context/CartContext';
import Navbar from './components/navbar';
import Home from './pages/Home';
import Store from './pages/Store';
import CartDrawer from './components/cart/CartDrawer';
import SearchModal from './components/search/SearchModal';

export type Page = 'home' | 'store';

export default function App() {
  const [page, setPage] = useState<Page>('home');
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <CartProvider>
      <div style={{ background: '#111111', minHeight: '100vh' }}>
        <Navbar
          currentPage={page}
          onNavigate={setPage}
          onCartOpen={() => setCartOpen(true)}
          onSearchOpen={() => setSearchOpen(true)}
        />

        {page === 'home' && <Home />}
        {page === 'store' && <Store />}

        {cartOpen && <CartDrawer onClose={() => setCartOpen(false)} />}
        {searchOpen && <SearchModal onClose={() => setSearchOpen(false)} />}
      </div>
    </CartProvider>
  );
}