import React from 'react';
import type { Variant } from '../types';
import styles from './SizeSelector.module.scss';

interface SizeSelectorProps {
  variants: Variant[];
  selectedColour: string;
  selectedSize: string;
  onChange: (size: string) => void;
}

export const SizeSelector: React.FC<SizeSelectorProps> = ({
  variants,
  selectedColour,
  selectedSize,
  onChange
}) => {
  // Filter variants by the currently selected color to show correct stock states for each size
  const variantsForColour = variants.filter(
    (v) => v.colour.toLowerCase() === selectedColour.toLowerCase()
  );

  // Group unique sizes
  const sizes = Array.from(new Set(variants.map((v) => v.size)));

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span className={styles.title}>Size</span>
        <a href="#size-guide" className={styles.guideLink} onClick={(e) => e.preventDefault()}>
          Size Guide
        </a>
      </div>

      <div className={styles.list}>
        {sizes.map((size) => {
          // Find the specific variant for this size and color to inspect stock level
          const variant = variantsForColour.find((v) => v.size === size);
          const isSelected = selectedSize === size;
          
          if (!variant) return null;

          const { stockStatus } = variant;
          const isSoldOut = stockStatus === 'sold_out';
          const isLow = stockStatus === 'low';

          let buttonClass = styles.available;
          if (isSelected) {
            buttonClass = styles.selected;
          } else if (isSoldOut) {
            buttonClass = styles.soldOut;
          } else if (isLow) {
            buttonClass = styles.low;
          }

          return (
            <button
              key={size}
              className={`${styles.sizeBtn} ${buttonClass}`}
              onClick={() => !isSoldOut && onChange(size)}
              disabled={isSoldOut}
              aria-label={`Select size ${size}${isLow ? ' (Low Stock)' : ''}${isSoldOut ? ' (Sold Out)' : ''}`}
            >
              <span className={isSoldOut ? styles.sizeText : ''}>{size}</span>
              {isLow && <span className={styles.tooltip}>Low Stock</span>}
            </button>
          );
        })}
      </div>
    </div>
  );
};
export default SizeSelector;
