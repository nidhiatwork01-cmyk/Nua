import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import ProductCard from '../components/ProductCard';
import Footer from '../components/Footer';
import CartDrawer from '../components/CartDrawer';
import { useWishlist } from '../hooks/useWishlist';
import { useCart } from '../hooks/useCart';
import styles from './Wishlist.module.scss';

export const Wishlist: React.FC = () => {
  const { wishlist } = useWishlist();
  const { toasts, removeToast } = useCart();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const searchQuery = searchParams.get('search') || '';

  // Filter wishlist items by search query
  const filteredWishlist = wishlist.filter((p) => {
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
          <h1 className={styles.title}>My Wishlist</h1>
          <p className={styles.description}>
            Your curated collection of intentional botanical formulas. Keep track of your favorite skincare rituals here.
          </p>
        </header>

        {/* Wishlist Grid or Empty State */}
        {wishlist.length === 0 ? (
          <div className={styles.emptyState}>
            <span className={`material-symbols-outlined ${styles.emptyIcon}`}>
              favorite_border
            </span>
            <h3>Your Wishlist is Empty</h3>
            <p>
              Explore our range of botanical skincare formulas and save your favorites to your personal collection.
            </p>
            <button className={styles.exploreButton} onClick={() => navigate('/')}>
              Explore Shop
            </button>
          </div>
        ) : filteredWishlist.length === 0 ? (
          <div className={styles.emptyState}>
            <span className={`material-symbols-outlined ${styles.emptyIcon}`}>
              search_off
            </span>
            <h3>No saved formulas found</h3>
            <p>We couldn't find any products in your wishlist matching "{searchQuery}".</p>
            <button className={styles.exploreButton} onClick={() => setSearchParams({})}>
              Clear Search
            </button>
          </div>
        ) : (
          <div className={styles.grid}>
            {filteredWishlist.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </main>

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

export default Wishlist;
