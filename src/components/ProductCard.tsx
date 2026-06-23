import React from 'react';
import { useNavigate } from 'react-router-dom';
import type { Product } from '../types';
import { getProductVariants } from '../data/mockVariants';
import { useCart } from '../hooks/useCart';
import { useWishlist } from '../hooks/useWishlist';
import { formatPrice } from '../utils/formatPrice';
import styles from './ProductCard.module.scss';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const navigate = useNavigate();
  const { addItem, isAdding } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  
  const inWishlist = isInWishlist(product.id);
  
  // Get variants for this product
  const variants = getProductVariants(product.id);
  // Default variant is 30ml / Translucent Dew
  const defaultVariant = variants[0];
  
  const itemKey = `${product.id}-${defaultVariant.size}-${defaultVariant.colour}`;
  const loading = isAdding[itemKey] || false;

  const handleCardClick = () => {
    navigate(`/product/${product.id}`);
  };

  const handleQuickAdd = async (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card navigation click
    if (loading) return;
    
    try {
      await addItem(product, defaultVariant, 1);
    } catch (err) {
      // Errors are handled globally in context via toasts
      console.error('Quick add failed:', err);
    }
  };

  return (
    <article className={styles.card} onClick={handleCardClick}>
      <div className={styles.imageContainer}>
        <img 
          src={product.image} 
          alt={product.title} 
          className={styles.productImage}
          loading="lazy"
          width="400"
          height="400"
        />
        
        {product.badge && (
          <span className={styles.badge}>{product.badge}</span>
        )}

        <button 
          className={`${styles.wishlistButton} ${inWishlist ? styles.inWishlist : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product);
          }}
          aria-label={inWishlist ? `Remove ${product.title} from wishlist` : `Add ${product.title} to wishlist`}
        >
          <span className="material-symbols-outlined">
            {inWishlist ? 'favorite' : 'favorite_border'}
          </span>
        </button>
        
        <button 
          className={styles.quickAddButton} 
          onClick={handleQuickAdd}
          disabled={loading}
          aria-label={`Add ${product.title} to cart`}
        >
          {loading ? (
            <span className={styles.spinner} />
          ) : (
            <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>
              add_shopping_cart
            </span>
          )}
          {loading ? 'Adding...' : 'Add to Cart'}
        </button>
      </div>
      
      <div className={styles.info}>
        <h2 className={styles.title}>{product.title}</h2>
        <p className={styles.price}>{formatPrice(product.price)}</p>
      </div>
    </article>
  );
};
export default ProductCard;
