import React, { createContext, useContext, useState } from 'react';
import type { Product, Variant, CartItem } from '../types';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { ADD_TO_CART_LATENCY, ADD_TO_CART_FAILURE_RATE, LOCAL_STORAGE_CART_KEY } from '../data/constants';

export interface ToastMessage {
  id: string;
  message: string;
  type: 'success' | 'error';
}

interface CartContextType {
  items: CartItem[];
  addItem: (product: Product, variant: Variant, quantity: number) => Promise<void>;
  removeItem: (itemKey: string) => void;
  updateQty: (itemKey: string, quantity: number) => void;
  clearCart: () => void;
  isAdding: Record<string, boolean>; // track loading state for variant keys
  toasts: ToastMessage[];
  removeToast: (id: string) => void;
  cartOpen: boolean;
  setCartOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

// Simulated network request to add item to cart
export const mockAddToCart = (_productId: number, _variantId: string, _quantity: number): Promise<void> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // 20% random failure
      if (Math.random() < ADD_TO_CART_FAILURE_RATE) {
        reject(new Error("Network timeout: Failed to add item to cart. Please try again."));
      } else {
        resolve();
      }
    }, ADD_TO_CART_LATENCY);
  });
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useLocalStorage<CartItem[]>(LOCAL_STORAGE_CART_KEY, []);
  const [isAdding, setIsAdding] = useState<Record<string, boolean>>({});
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [cartOpen, setCartOpen] = useState<boolean>(false);

  // Helper to add toast messages
  const addToast = (message: string, type: 'success' | 'error') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
    
    // Auto-remove after 4 seconds
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Add Item (async)
  const addItem = async (product: Product, variant: Variant, quantity: number): Promise<void> => {
    const itemKey = `${product.id}-${variant.size}-${variant.colour}`;
    
    // Set loading state for this item
    setIsAdding((prev) => ({ ...prev, [itemKey]: true }));

    try {
      // Run the mock API call
      await mockAddToCart(product.id, variant.id, quantity);
      
      // If success, update local state
      setItems((prevItems) => {
        const existingItemIndex = prevItems.findIndex((item) => item.key === itemKey);
        
        if (existingItemIndex > -1) {
          // Item exists, update quantity
          const updatedItems = [...prevItems];
          updatedItems[existingItemIndex] = {
            ...updatedItems[existingItemIndex],
            quantity: updatedItems[existingItemIndex].quantity + quantity
          };
          return updatedItems;
        } else {
          // New item
          return [...prevItems, { key: itemKey, product, variant, quantity }];
        }
      });
      
      addToast(`Added ${product.title} (${variant.size}) to cart.`, 'success');
      setCartOpen(true); // Automatically slide open cart drawer on success
    } catch (error: any) {
      addToast(error.message || 'Failed to add item to cart.', 'error');
      throw error; // Re-throw so component can handle it if needed
    } finally {
      // Reset loading state
      setIsAdding((prev) => ({ ...prev, [itemKey]: false }));
    }
  };

  // Remove Item
  const removeItem = (itemKey: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.key !== itemKey));
  };

  // Update Quantity
  const updateQty = (itemKey: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(itemKey);
      return;
    }
    setItems((prevItems) =>
      prevItems.map((item) => (item.key === itemKey ? { ...item, quantity } : item))
    );
  };

  // Clear Cart
  const clearCart = () => {
    setItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQty,
        clearCart,
        isAdding,
        toasts,
        removeToast,
        cartOpen,
        setCartOpen
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
