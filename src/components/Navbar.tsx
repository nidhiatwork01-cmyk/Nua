import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import styles from './Navbar.module.scss';

export const Navbar: React.FC = () => {
  const { items, setCartOpen } = useCart();
  const location = useLocation();

  // Compute total quantity in cart
  const cartItemCount = items.reduce((acc, item) => acc + item.quantity, 0);

  const isShopActive = location.pathname === '/' || location.pathname === '/shop' || location.pathname.startsWith('/product');

  return (
    <>
      <nav className={styles.navbar}>
        <div className={styles.container}>
          {/* Mobile menu toggle */}
          <button className={styles.menuButton} aria-label="Toggle menu">
            <span className="material-symbols-outlined">menu</span>
          </button>

          {/* Brand Logo */}
          <Link to="/" className={styles.logo}>
            AURA
          </Link>

          {/* Desktop Navigation Links */}
          <div className={styles.navLinks}>
            <Link 
              to="/" 
              className={`${styles.navLink} ${isShopActive ? styles.active : ''}`}
            >
              Shop
            </Link>
            <Link 
              to="/journal" 
              className={`${styles.navLink} ${location.pathname === '/journal' ? styles.active : ''}`}
            >
              Journal
            </Link>
            <Link 
              to="/our-story" 
              className={`${styles.navLink} ${location.pathname === '/our-story' ? styles.active : ''}`}
            >
              Our Story
            </Link>
          </div>

          {/* Action icons */}
          <div className={styles.actions}>
            <button className={styles.iconButton} aria-label="Search site">
              <span className="material-symbols-outlined">search</span>
            </button>
            <button 
              className={styles.iconButton} 
              aria-label="Open cart"
              onClick={() => setCartOpen(true)}
            >
              <span className="material-symbols-outlined">shopping_bag</span>
              {cartItemCount > 0 && (
                <span className={styles.badge}>{cartItemCount}</span>
              )}
            </button>
          </div>
        </div>
      </nav>
      {/* Spacer below fixed navbar to prevent overlapping */}
      <div className={styles.spacer} />
    </>
  );
};
export default Navbar;
