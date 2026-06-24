import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import React from 'react';
import { render, screen, fireEvent, renderHook, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import SizeSelector from '../components/SizeSelector';
import { ProductDetails } from '../pages/ProductDetails';
import { CartProvider, useCart } from '../stores/CartContext';
import { WishlistProvider } from '../stores/WishlistContext';
import { Variant } from '../types';

// Mock variants list for testing
const mockVariants: Variant[] = [
  {
    id: '1-dew-30ml',
    colour: 'Translucent Dew',
    colourHex: '#fdfaf6',
    size: '30 ml',
    stockStatus: 'available',
    stockCount: 15
  },
  {
    id: '1-dew-50ml',
    colour: 'Translucent Dew',
    colourHex: '#fdfaf6',
    size: '50 ml',
    stockStatus: 'low',
    stockCount: 3
  },
  {
    id: '1-dew-100ml',
    colour: 'Translucent Dew',
    colourHex: '#fdfaf6',
    size: '100 ml',
    stockStatus: 'sold_out',
    stockCount: 0
  }
];

// Dynamic mock for mockAddToCart promise resolution
let mockAddToCartPromise: Promise<void> = Promise.resolve();

vi.mock('../stores/CartContext', async () => {
  const actual = await vi.importActual('../stores/CartContext') as any;
  return {
    ...actual,
    mockAddToCart: vi.fn().mockImplementation(() => mockAddToCartPromise)
  };
});

vi.mock('../hooks/useProducts', () => ({
  useProduct: () => ({
    product: {
      id: 1,
      title: 'Luminous Nectar Serum',
      price: 68.00,
      description: 'Intentional botanical formula.',
      category: 'Skincare',
      image: '',
      images: [],
      badge: 'Best Seller'
    },
    loading: false,
    error: null
  })
}));

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom') as any;
  return {
    ...actual,
    useParams: () => ({ id: '1' }),
    Link: ({ children, to }: any) => <a href={to}>{children}</a>
  };
});

describe('SizeSelector Component (Sold-out state)', () => {
  it('should render all size options', () => {
    const handleChange = vi.fn();
    render(
      <SizeSelector
        variants={mockVariants}
        selectedColour="Translucent Dew"
        selectedSize="30 ml"
        onChange={handleChange}
      />
    );

    expect(screen.getByText('30 ml')).toBeDefined();
    expect(screen.getByText('50 ml')).toBeDefined();
    expect(screen.getByText('100 ml')).toBeDefined();
  });

  it('should disable sold-out size buttons and prevent selection change', () => {
    const handleChange = vi.fn();
    render(
      <SizeSelector
        variants={mockVariants}
        selectedColour="Translucent Dew"
        selectedSize="30 ml"
        onChange={handleChange}
      />
    );

    const soldOutButton = screen.getByRole('button', { name: /Select size 100 ml/i });
    expect(soldOutButton).toBeDefined();
    expect((soldOutButton as HTMLButtonElement).disabled).toBe(true);

    fireEvent.click(soldOutButton);
    expect(handleChange).not.toHaveBeenCalled();
  });
});

describe('ProductDetails CTA Disabled States', () => {
  beforeEach(() => {
    mockAddToCartPromise = Promise.resolve();
    localStorage.clear();
  });

  it('should enable the CTA button when the selected variant is in stock and not loading', () => {
    render(
      <MemoryRouter initialEntries={['/product/1?size=30+ml']}>
        <CartProvider>
          <WishlistProvider>
            <ProductDetails />
          </WishlistProvider>
        </CartProvider>
      </MemoryRouter>
    );

    const ctaButton = screen.getByRole('button', { name: /Add to bag|Add to Cart/i });
    expect((ctaButton as HTMLButtonElement).disabled).toBe(false);
  });

  it('should disable the CTA button when the selected variant is sold out', () => {
    render(
      <MemoryRouter initialEntries={['/product/1?size=100+ml']}>
        <CartProvider>
          <WishlistProvider>
            <ProductDetails />
          </WishlistProvider>
        </CartProvider>
      </MemoryRouter>
    );

    const ctaButton = screen.getByRole('button', { name: /Add to bag|Add to Cart/i });
    expect((ctaButton as HTMLButtonElement).disabled).toBe(true);
  });

  it('should disable the CTA button when the cart is loading/adding', async () => {
    // Keep promise pending to simulate active loading/adding state
    mockAddToCartPromise = new Promise(() => {});

    render(
      <MemoryRouter initialEntries={['/product/1?size=30+ml']}>
        <CartProvider>
          <WishlistProvider>
            <ProductDetails />
          </WishlistProvider>
        </CartProvider>
      </MemoryRouter>
    );

    const ctaButton = screen.getByRole('button', { name: /Add to bag|Add to Cart/i });
    
    // Trigger addition to bag (starts async adding state)
    act(() => {
      fireEvent.click(ctaButton);
    });

    expect((ctaButton as HTMLButtonElement).disabled).toBe(true);
  });
});

describe('Cart Context & Quantity Capping', () => {
  beforeEach(() => {
    vi.spyOn(Math, 'random').mockReturnValue(0.9); // Bypass the 20% random failure
    vi.useFakeTimers();
    localStorage.clear();
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it('should cap the quantity to min(10, stockCount) when adding items', async () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <CartProvider>{children}</CartProvider>
    );

    const { result } = renderHook(() => useCart(), { wrapper });

    const product = {
      id: 1,
      title: 'Luminous Nectar Serum',
      price: 68.00,
      description: 'Botanical oil elixir.',
      category: 'Skincare',
      image: '',
      images: [],
      rating: { rate: 4.8, count: 120 }
    };

    // Case 1: High stock variant (stockCount = 15). Capped at global max (10).
    const variantHighStock = mockVariants[0];
    let promise1;
    act(() => {
      promise1 = result.current.addItem(product, variantHighStock, 12);
    });
    
    await act(async () => {
      vi.runAllTimers();
      await promise1;
    });
    
    expect(result.current.items[0].quantity).toBe(10);

    // Case 2: Low stock variant (stockCount = 3). Capped at stockCount (3).
    const variantLowStock = mockVariants[1];
    let promise2;
    act(() => {
      promise2 = result.current.addItem(product, variantLowStock, 5);
    });

    await act(async () => {
      vi.runAllTimers();
      await promise2;
    });

    const lowStockItem = result.current.items.find(item => item.variant.id === variantLowStock.id);
    expect(lowStockItem?.quantity).toBe(3);
  });

  it('should cap the quantity to min(10, stockCount) when updating quantity', () => {
    const product = {
      id: 1,
      title: 'Luminous Nectar Serum',
      price: 68.00,
      description: 'Botanical oil elixir.',
      category: 'Skincare',
      image: '',
      images: [],
      rating: { rate: 4.8, count: 120 }
    };

    const variantHighStock = mockVariants[0]; // Stock = 15
    const variantLowStock = mockVariants[1];  // Stock = 3

    const highStockKey = `${product.id}-${variantHighStock.size}-${variantHighStock.colour}`;
    const lowStockKey = `${product.id}-${variantLowStock.size}-${variantLowStock.colour}`;

    // Pre-populate localStorage so the CartProvider mounts with correct items
    const initialItems = [
      {
        key: highStockKey,
        product,
        variant: variantHighStock,
        quantity: 2
      },
      {
        key: lowStockKey,
        product,
        variant: variantLowStock,
        quantity: 1
      }
    ];
    localStorage.setItem('aura_cart_items', JSON.stringify(initialItems));

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <CartProvider>{children}</CartProvider>
    );

    const { result } = renderHook(() => useCart(), { wrapper });

    // Attempt to exceed limits via updateQty
    act(() => {
      result.current.updateQty(highStockKey, 20); // Should cap at 10
    });
    act(() => {
      result.current.updateQty(lowStockKey, 8);   // Should cap at 3
    });

    const highStockItem = result.current.items.find(item => item.key === highStockKey);
    const lowStockItem = result.current.items.find(item => item.key === lowStockKey);

    expect(highStockItem?.quantity).toBe(10);
    expect(lowStockItem?.quantity).toBe(3);
  });
});
