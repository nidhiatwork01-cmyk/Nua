import { useSearchParams } from 'react-router-dom';
import type { Variant } from '../types';

export const useVariantUrl = (variants: Variant[]) => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Read URL query params
  const colourParam = searchParams.get('colour');
  const sizeParam = searchParams.get('size');

  // Fallback to first available color/size if params are missing
  const defaultColour = variants[0]?.colour || '';
  const defaultSize = variants[0]?.size || '';

  const activeColour = colourParam || defaultColour;
  const activeSize = sizeParam || defaultSize;

  const setColour = (colour: string) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.set('colour', colour);
      return next;
    });
  };

  const setSize = (size: string) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.set('size', size);
      return next;
    });
  };

  // Find variant that matches both parameters
  const matchedVariant = variants.find(
    (v) =>
      v.colour.toLowerCase() === activeColour.toLowerCase() &&
      v.size.toLowerCase() === activeSize.toLowerCase()
  );

  // Fallback variant if no exact match is found
  const activeVariant = matchedVariant || variants.find(v => v.colour.toLowerCase() === activeColour.toLowerCase()) || variants[0];

  return {
    selectedColour: activeVariant?.colour || activeColour,
    selectedSize: activeVariant?.size || activeSize,
    selectedVariant: activeVariant,
    setSelectedColour: setColour,
    setSelectedSize: setSize
  };
};
