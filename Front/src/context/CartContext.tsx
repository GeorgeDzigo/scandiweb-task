import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { CartItem } from '../types/CartItem';


// Define your context type
interface CartContextType {
  cartCount: number;
  setCartCount: React.Dispatch<React.SetStateAction<number>>;
  cartItems: CartItem[];
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
}

// Create your context
const CartContext = createContext<CartContextType | undefined>(undefined);

// Custom hook to use the cart context
export const useCartContext = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCartContext must be used within a CartProvider');
  }
  return context;
};

// CartProvider component
const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cartCount, setCartCount] = useState(0);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Initialize state from localStorage on mount
  useEffect(() => {
    const storedCartItems = localStorage.getItem('cartItems');
    if (storedCartItems) {
      const parsedCartItems = JSON.parse(storedCartItems);
      setCartItems(parsedCartItems);
      setCartCount(parsedCartItems.length);
    }
  }, []);

  // Update localStorage whenever cartItems change
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    setCartCount(cartItems.length);
  }, [cartItems]);

  return (
    <CartContext.Provider value={{ cartCount, setCartCount, cartItems, setCartItems }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
