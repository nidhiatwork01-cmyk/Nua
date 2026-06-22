import type { Variant } from '../types';

export const getStockLabel = (status: Variant['stockStatus'], count: number): string => {
  switch (status) {
    case 'sold_out':
      return 'Sold Out';
    case 'low':
      return `Low Stock (${count} left)`;
    case 'available':
    default:
      return 'In Stock';
  }
};

export const isOutOfStock = (variant?: Variant): boolean => {
  if (!variant) return true;
  return variant.stockStatus === 'sold_out' || variant.stockCount <= 0;
};

export const isLowStock = (variant?: Variant): boolean => {
  if (!variant) return false;
  return variant.stockStatus === 'low' || (variant.stockCount > 0 && variant.stockCount <= 5);
};
