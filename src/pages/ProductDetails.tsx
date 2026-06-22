import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import CartDrawer from '../components/CartDrawer';
import ImageGallery from '../components/ImageGallery';
import SizeSelector from '../components/SizeSelector';
import { useProduct } from '../hooks/useProducts';
import { useVariantUrl } from '../hooks/useVariantUrl';
import { useCart } from '../hooks/useCart';
import { getProductVariants, COLOR_MAP } from '../data/mockVariants';
import { formatPrice } from '../utils/formatPrice';
import styles from './ProductDetails.module.scss';
import listingStyles from './ProductListing.module.scss'; // Reuse footer styles

export const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const productId = parseInt(id || '1', 10);
  
  // Fetch product data
  const { product, loading, error } = useProduct(productId);
  const { addItem, isAdding, toasts, removeToast } = useCart();
  
  // Local quantity stepper state
  const [quantity, setQuantity] = useState<number>(1);

  // Generate variants for this product
  const variants = getProductVariants(productId);
  
  // Sync selected color and size with URL query parameters
  const {
    selectedColour,
    selectedSize,
    selectedVariant,
    setSelectedColour,
    setSelectedSize
  } = useVariantUrl(variants);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className={styles.loadingState}>
          <div className={styles.loadingSpinner} />
          <p>Loading product details...</p>
        </div>
      </>
    );
  }

  if (error || !product) {
    return (
      <>
        <Navbar />
        <div className={styles.loadingState}>
          <span className="material-symbols-outlined" style={{ fontSize: '48px' }}>error</span>
          <p>{error || 'Product not found'}</p>
          <Link to="/" style={{ color: '#ae2d46', textDecoration: 'underline' }}>Back to Shop</Link>
        </div>
      </>
    );
  }

  // Define unique colors for the swatches list
  const colors = COLOR_MAP;

  // Key used to track async cart operations for the selected variant
  const currentItemKey = `${product.id}-${selectedSize}-${selectedColour}`;
  const isCartLoading = isAdding[currentItemKey] || false;

  const handleAddToCart = async () => {
    if (!selectedVariant || isCartLoading) return;
    
    try {
      await addItem(product, selectedVariant, quantity);
    } catch (err) {
      console.error('Failed to add to cart:', err);
    }
  };

  return (
    <>
      <Navbar />

      <main className={styles.main}>
        {/* Breadcrumb Navigation */}
        <nav className={styles.breadcrumb} aria-label="Breadcrumb">
          <Link to="/" className={styles.breadcrumbLink}>Home</Link>
          <span className={`material-symbols-outlined ${styles.chevron}`}>chevron_right</span>
          <Link to="/" className={styles.breadcrumbLink}>Skincare</Link>
          <span className={`material-symbols-outlined ${styles.chevron}`}>chevron_right</span>
          <span className={styles.activeCrumb}>{product.title}</span>
        </nav>

        {/* Product Details Grid */}
        <div className={styles.detailsGrid}>
          {/* Left: Product Images Gallery */}
          <div className={styles.imageColumn}>
            <ImageGallery images={product.images} badge={product.badge} />
          </div>

          {/* Right: Product Purchase Options */}
          <div className={styles.infoColumn}>
            {/* Category tag */}
            <div className={styles.categoryTag}>
              Restorative Skincare
            </div>

            {/* Title */}
            <h1 className={styles.title}>{product.title}</h1>

            {/* Price section */}
            <div className={styles.priceCluster}>
              <span className={styles.price}>{formatPrice(product.price)}</span>
              {product.originalPrice && (
                <span className={styles.originalPrice}>{formatPrice(product.originalPrice)}</span>
              )}
            </div>

            {/* Description */}
            <p className={styles.description}>{product.description}</p>

            {/* Color Swatch Picker */}
            <div className={styles.swatchesSection}>
              <div className={styles.swatchLabel}>
                Hue: <span className={styles.activeSwatchName}>{selectedColour}</span>
              </div>
              <div className={styles.swatchesList}>
                {colors.map((color) => {
                  const isActive = selectedColour.toLowerCase() === color.name.toLowerCase();
                  return (
                    <button
                      key={color.name}
                      className={`${styles.swatchButton} ${isActive ? styles.activeSwatch : ''}`}
                      style={{ backgroundColor: color.hex }}
                      onClick={() => setSelectedColour(color.name)}
                      aria-label={`Select color ${color.name}`}
                    />
                  );
                })}
              </div>
            </div>

            {/* Size Selector component */}
            <SizeSelector
              variants={variants}
              selectedColour={selectedColour}
              selectedSize={selectedSize}
              onChange={setSelectedSize}
            />

            {/* Quantity Selector & Checkout CTA */}
            <div className={styles.actionsContainer}>
              <div className={styles.qtyStepper}>
                <button
                  className={styles.qtyStepperBtn}
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  aria-label="Decrease quantity"
                >
                  <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>remove</span>
                </button>
                <span className={styles.qtyValue}>{quantity}</span>
                <button
                  className={styles.qtyStepperBtn}
                  onClick={() => setQuantity((q) => q + 1)}
                  aria-label="Increase quantity"
                >
                  <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>add</span>
                </button>
              </div>

              <button
                className={styles.addToCartBtn}
                onClick={handleAddToCart}
                disabled={isCartLoading || !selectedVariant || selectedVariant.stockStatus === 'sold_out'}
              >
                {isCartLoading ? (
                  <span className={styles.spinner} />
                ) : (
                  'Add to Cart'
                )}
              </button>
            </div>

            {/* Editorial Accordions */}
            <div className={styles.accordions}>
              <details className={styles.accordion}>
                <summary className={styles.accordionSummary}>
                  Benefits & Usage
                  <span className={`material-symbols-outlined ${styles.accordionChevron}`}>expand_more</span>
                </summary>
                <div className={styles.accordionContent}>
                  Apply 3-4 drops to cleansed and toned face, neck, and décolletage morning and evening. Massage gently in upward circular motions until fully absorbed. Suitable for all skin types, especially those prone to dryness.
                </div>
              </details>

              <details className={styles.accordion}>
                <summary className={styles.accordionSummary}>
                  Key Ingredients
                  <span className={`material-symbols-outlined ${styles.accordionChevron}`}>expand_more</span>
                </summary>
                <div className={styles.accordionContent}>
                  <ul>
                    <li><strong>Olive-derived Squalane:</strong> Mimics skin's natural oils to deeply hydrate.</li>
                    <li><strong>Blue Tansy Extract:</strong> Soothes redness and balances stressed skin.</li>
                    <li><strong>Rosehip Seed Oil:</strong> Rich in Vitamin A to promote cell turnover.</li>
                  </ul>
                </div>
              </details>

              <details className={styles.accordion}>
                <summary className={styles.accordionSummary}>
                  Shipping & Returns
                  <span className={`material-symbols-outlined ${styles.accordionChevron}`}>expand_more</span>
                </summary>
                <div className={styles.accordionContent}>
                  Complimentary standard shipping on all orders over $50. Unopened products can be returned within 30 days for a full refund.
                </div>
              </details>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className={listingStyles.footer}>
        <div className={listingStyles.footerContainer}>
          <div className={listingStyles.footerLogo}>AURA</div>
          <div className={listingStyles.footerLinks}>
            <a href="#privacy" className={listingStyles.footerLink} onClick={(e) => e.preventDefault()}>Privacy Policy</a>
            <a href="#terms" className={listingStyles.footerLink} onClick={(e) => e.preventDefault()}>Terms of Service</a>
            <a href="#shipping" className={listingStyles.footerLink} onClick={(e) => e.preventDefault()}>Shipping & Returns</a>
            <a href="#contact" className={listingStyles.footerLink} onClick={(e) => e.preventDefault()}>Contact Us</a>
          </div>
          <div className={listingStyles.footerCopy}>
            © 2024 AURA. All rights reserved.
          </div>
        </div>
      </footer>

      {/* Drawer */}
      <CartDrawer />

      {/* Global Toast Messages */}
      <div className="toast-container">
        {toasts.map((toast) => (
          <div key={toast.id} className={`toast ${toast.type === 'error' ? 'error' : 'success'}`}>
            <span className="material-symbols-outlined toast-icon">
              {toast.type === 'error' ? 'error' : 'check_circle'}
            </span>
            <span>{toast.message}</span>
            <button 
              style={{ background: 'none', border: 'none', cursor: 'pointer', marginLeft: 'auto', display: 'flex', color: 'inherit' }}
              onClick={() => removeToast(toast.id)}
            >
              <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>close</span>
            </button>
          </div>
        ))}
      </div>
    </>
  );
};
export default ProductDetails;
