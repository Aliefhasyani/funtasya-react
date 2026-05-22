import { createContext, useContext, useState } from 'react';
import type { FreeGame } from '../types/game';

interface CartContextType {
  items: FreeGame[];
  addToCart: (game: FreeGame) => void;
  removeFromCart: (id: number) => void;
  isInCart: (id: number) => boolean;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<FreeGame[]>([]);

  const addToCart = (game: FreeGame) =>
    setItems(prev => (prev.find(g => g.id === game.id) ? prev : [...prev, game]));

  const removeFromCart = (id: number) =>
    setItems(prev => prev.filter(g => g.id !== id));

  const isInCart = (id: number) => items.some(g => g.id === id);
  const clearCart = () => setItems([]);

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, isInCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be inside CartProvider');
  return ctx;
}
