import React from 'react';
import Navbar from '../components/Navbar';
import ProductCard from '../components/ProductCard';
import SkeletonCard from '../components/SkeletonCard';
import CartDrawer from '../components/CartDrawer';
import { useProducts } from '../hooks/useProducts';
import { useCart } from '../hooks/useCart';
import styles from './ProductListing.module.scss';

export const ProductListing: React.FC = () => {
  // Fetch products from Fake Store API (mapped to skincare)
  const { products, loading, error } = useProducts();
  const { toasts, removeToast } = useCart();

  // Restrict to the 6 core AURA/Nua skincare items matching the design mockup exactly
  const filteredProducts = products.filter((p) => p.id >= 1 && p.id <= 6);

  return (
    <>
      <Navbar />
      
      <main className={styles.main}>
        {/* Header */}
        <header className={styles.header}>
          <h1 className={styles.title}>Botanical Skincare</h1>
          <p className={styles.description}>
            Curated formulas inspired by nature. Designed to nourish, restore, and elevate your daily ritual with intentional ingredients.
          </p>
        </header>

        {/* Product Grid / Skeletons */}
        {loading ? (
          <div className={styles.grid}>
            {Array.from({ length: 6 }).map((_, idx) => (
              <SkeletonCard key={idx} />
            ))}
          </div>
        ) : error ? (
          <div className={styles.errorState}>
            <span className={`material-symbols-outlined ${styles.errorIcon}`}>
              error_outline
            </span>
            <p>{error}</p>
            <button className={styles.retryButton} onClick={() => window.location.reload()}>
              Try Again
            </button>
          </div>
        ) : (
          <div className={styles.grid}>
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </main>

      {/* Global Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerContainer}>
          <div className={styles.footerLogo}>AURA</div>
          <div className={styles.footerLinks}>
            <a href="#privacy" className={styles.footerLink} onClick={(e) => e.preventDefault()}>Privacy Policy</a>
            <a href="#terms" className={styles.footerLink} onClick={(e) => e.preventDefault()}>Terms of Service</a>
            <a href="#shipping" className={styles.footerLink} onClick={(e) => e.preventDefault()}>Shipping & Returns</a>
            <a href="#contact" className={styles.footerLink} onClick={(e) => e.preventDefault()}>Contact Us</a>
          </div>
          <div className={styles.footerCopy}>
            © 2024 AURA. All rights reserved.
          </div>
        </div>
      </footer>

      {/* Cart Drawer */}
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
export default ProductListing;
