import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { useWishlist } from '../hooks/useWishlist';
import styles from './Navbar.module.scss';

export const Navbar: React.FC = () => {
  const { items, setCartOpen } = useCart();
  const { wishlist } = useWishlist();
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  // Search states
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchVal, setSearchVal] = useState('');

  // Mobile menu states
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Sync searchVal state with URL params
  const urlSearchQuery = searchParams.get('search') || '';
  useEffect(() => {
    setSearchVal(urlSearchQuery);
    if (urlSearchQuery) {
      setSearchOpen(true);
    }
  }, [urlSearchQuery]);

  // Handle ESC key to close search overlay
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeSearch();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Click outside to close search overlay
  const navbarRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!searchOpen) return;

    const handleDocumentClick = (e: MouseEvent) => {
      if (navbarRef.current && !navbarRef.current.contains(e.target as Node)) {
        closeSearch();
      }
    };

    const timer = setTimeout(() => {
      document.addEventListener('click', handleDocumentClick);
    }, 0);

    return () => {
      clearTimeout(timer);
      document.removeEventListener('click', handleDocumentClick);
    };
  }, [searchOpen]);

  const isShopActive = location.pathname === '/' || location.pathname === '/shop' || location.pathname.startsWith('/product');

  // Compute total quantity in cart
  const cartItemCount = items.reduce((acc, item) => acc + item.quantity, 0);

  const handleSearchChange = (val: string) => {
    setSearchVal(val);
    
    const isOnShopPage = location.pathname === '/' || location.pathname === '/shop';
    const isOnWishlistPage = location.pathname === '/wishlist';
    
    if (val.trim()) {
      if (isOnShopPage || isOnWishlistPage) {
        // If on shop or wishlist page, just update url search params
        setSearchParams({ search: val });
      } else {
        // Redirect to shop page with search query
        navigate(`/shop?search=${encodeURIComponent(val)}`);
      }
    } else {
      // If input is empty, clear param
      if (isOnShopPage || isOnWishlistPage) {
        setSearchParams({});
      } else {
        navigate('/shop');
      }
    }
  };

  const closeSearch = () => {
    setSearchOpen(false);
    setSearchVal('');
    
    // Clear search param if on shop or wishlist page
    const isOnShopPage = location.pathname === '/' || location.pathname === '/shop';
    const isOnWishlistPage = location.pathname === '/wishlist';
    if (isOnShopPage || isOnWishlistPage) {
      setSearchParams({});
    }
  };

  return (
    <>
      <nav className={styles.navbar} ref={navbarRef}>
        <div className={styles.container}>
          {/* Mobile menu toggle */}
          <button 
            className={styles.menuButton} 
            aria-label="Toggle menu"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="material-symbols-outlined">menu</span>
          </button>

          {/* Brand Logo */}
          <Link to="/" className={styles.logo} onClick={closeSearch}>
            AURA
          </Link>

          {/* Desktop Navigation Links */}
          <div className={styles.navLinks}>
            <Link 
              to="/" 
              className={`${styles.navLink} ${isShopActive && !urlSearchQuery ? styles.active : ''}`}
            >
              Shop
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
            <button 
              className={`${styles.iconButton} ${searchOpen ? styles.searchActiveBtn : ''}`} 
              aria-label="Search site"
              onClick={() => setSearchOpen(true)}
            >
              <span className="material-symbols-outlined">search</span>
            </button>
            <button 
              className={`${styles.iconButton} ${location.pathname === '/wishlist' ? styles.wishlistActiveBtn : ''}`} 
              aria-label="View wishlist"
              onClick={() => navigate('/wishlist')}
            >
              <span className="material-symbols-outlined">
                {wishlist.length > 0 ? 'favorite' : 'favorite_border'}
              </span>
              {wishlist.length > 0 && (
                <span className={styles.wishlistBadge}>{wishlist.length}</span>
              )}
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

        {/* Dynamic Search Overlay (Slides over/fills the Navbar area) */}
        <div className={`${styles.searchOverlay} ${searchOpen ? styles.searchOverlayOpen : ''}`}>
          <div className={styles.searchContainer}>
            <span className={`material-symbols-outlined ${styles.searchIconInside}`}>search</span>
            <input
              type="text"
              placeholder="Search our botanical skincare formulas..."
              value={searchVal}
              onChange={(e) => handleSearchChange(e.target.value)}
              className={styles.searchInput}
              autoFocus={searchOpen}
            />
            <button className={styles.closeSearchButton} onClick={closeSearch} aria-label="Close search">
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Backdrop */}
      <div 
        className={`${styles.mobileMenuBackdrop} ${mobileMenuOpen ? styles.backdropActive : ''}`} 
        onClick={() => setMobileMenuOpen(false)} 
      />

      {/* Mobile Menu Drawer */}
      <div className={`${styles.mobileMenuDrawer} ${mobileMenuOpen ? styles.drawerOpen : ''}`}>
        <div className={styles.drawerHeader}>
          <div className={styles.drawerLogo}>AURA</div>
          <button className={styles.closeDrawerButton} onClick={() => setMobileMenuOpen(false)} aria-label="Close menu">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
        <div className={styles.drawerLinks}>
          <Link 
            to="/" 
            className={`${styles.drawerLink} ${isShopActive ? styles.active : ''}`}
            onClick={() => setMobileMenuOpen(false)}
          >
            Shop
          </Link>
          <Link 
            to="/our-story" 
            className={`${styles.drawerLink} ${location.pathname === '/our-story' ? styles.active : ''}`}
            onClick={() => setMobileMenuOpen(false)}
          >
            Our Story
          </Link>
          <Link 
            to="/wishlist" 
            className={`${styles.drawerLink} ${location.pathname === '/wishlist' ? styles.active : ''}`}
            onClick={() => setMobileMenuOpen(false)}
          >
            Wishlist
          </Link>
        </div>
      </div>

      {/* Spacer below fixed navbar to prevent overlapping */}
      <div className={styles.spacer} />
    </>
  );
};

export default Navbar;
