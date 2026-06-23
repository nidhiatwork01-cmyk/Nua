import React from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import ProductCard from '../components/ProductCard';
import Footer from '../components/Footer';
import SkeletonCard from '../components/SkeletonCard';
import CartDrawer from '../components/CartDrawer';
import { useProducts } from '../hooks/useProducts';
import { useCart } from '../hooks/useCart';
import styles from './ProductListing.module.scss';

export const ProductListing: React.FC = () => {
  // Fetch products from Fake Store API (mapped to skincare)
  const { products, loading, error } = useProducts();
  const { toasts, removeToast } = useCart();
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';

  // Filter products returned from the Fake Store API by search query
  const filteredProducts = products.filter((p) => {
    if (!searchQuery.trim()) return true;

    const query = searchQuery.toLowerCase().trim();
    return (
      p.title.toLowerCase().includes(query) ||
      (p.description && p.description.toLowerCase().includes(query)) ||
      (p.category && p.category.toLowerCase().includes(query))
    );
  });

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
        ) : filteredProducts.length === 0 ? (
          <div className={styles.emptyState}>
            <span className={`material-symbols-outlined ${styles.emptyIcon}`}>
              search_off
            </span>
            <h3>No formulas found</h3>
            <p>We couldn't find any products matching "{searchQuery}". Please try another search term.</p>
            <button className={styles.clearSearchButton} onClick={() => setSearchParams({})}>
              Clear Search
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
      <Footer />

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
