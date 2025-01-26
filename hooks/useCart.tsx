import { useCartStore } from '@/store/cart';
import { useEffect } from 'react';

export const useCart = () => {
  const {
    fetchCartItems,
    items,
    totalAmount,
    updateItemQuantity,
    removeCartItem,
    addCartItem,
    loading,
  } = useCartStore((state) => state);

  const clickCountButtonHandler = (
    id: number,
    quantity: number,
    type: 'plus' | 'minus'
  ) => {
    updateItemQuantity(id, type === 'plus' ? ++quantity : --quantity);
  };

  useEffect(() => {
    fetchCartItems();
  }, [fetchCartItems]);

  return {
    items,
    totalAmount,
    updateItemQuantity,
    removeCartItem,
    addCartItem,
    loading,
    clickCountButtonHandler,
  };
};
