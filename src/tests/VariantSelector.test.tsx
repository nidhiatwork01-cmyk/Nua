import { describe, it, expect, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useVariant } from '../hooks/useVariant';
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
    id: '1-rose-30ml',
    colour: 'Rose Tint',
    colourHex: '#fae8e9',
    size: '30 ml',
    stockStatus: 'available',
    stockCount: 10
  }
];

describe('useVariant Hook', () => {
  it('should initialize with default variant values', () => {
    const { result } = renderHook(() => useVariant(mockVariants, mockVariants[0]));

    expect(result.current.selectedColour).toBe('Translucent Dew');
    expect(result.current.selectedSize).toBe('30 ml');
    expect(result.current.selectedVariant).toEqual(mockVariants[0]);
  });

  it('should update selected colour correctly', () => {
    const { result } = renderHook(() => useVariant(mockVariants, mockVariants[0]));

    act(() => {
      result.current.setSelectedColour('Rose Tint');
    });

    expect(result.current.selectedColour).toBe('Rose Tint');
    expect(result.current.selectedSize).toBe('30 ml'); // Size stays 30ml
    expect(result.current.selectedVariant).toEqual(mockVariants[2]); // matches Rose Tint + 30ml
  });

  it('should update selected size correctly', () => {
    const { result } = renderHook(() => useVariant(mockVariants, mockVariants[0]));

    act(() => {
      result.current.setSelectedSize('50 ml');
    });

    expect(result.current.selectedColour).toBe('Translucent Dew'); // Color stays Dew
    expect(result.current.selectedSize).toBe('50 ml');
    expect(result.current.selectedVariant).toEqual(mockVariants[1]); // matches Dew + 50ml
  });

  it('should return undefined if no variant matches current selection combination', () => {
    const { result } = renderHook(() => useVariant(mockVariants, mockVariants[0]));

    // Select Rose Tint and 50 ml (which does not exist in our mock list)
    act(() => {
      result.current.setSelectedColour('Rose Tint');
    });
    act(() => {
      result.current.setSelectedSize('50 ml');
    });

    expect(result.current.selectedVariant).toBeUndefined();
  });
});
