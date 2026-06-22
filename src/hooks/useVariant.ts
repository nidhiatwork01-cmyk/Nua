import { useState } from 'react';
import type { Variant } from '../types';

export const useVariant = (variants: Variant[], defaultVariant?: Variant) => {
  const [selectedColour, setSelectedColour] = useState<string>(
    defaultVariant?.colour || variants[0]?.colour || ''
  );
  const [selectedSize, setSelectedSize] = useState<string>(
    defaultVariant?.size || variants[0]?.size || ''
  );

  const getSelectedVariant = (): Variant | undefined => {
    return variants.find(
      (v) => v.colour === selectedColour && v.size === selectedSize
    );
  };

  return {
    selectedColour,
    setSelectedColour,
    selectedSize,
    setSelectedSize,
    selectedVariant: getSelectedVariant()
  };
};
