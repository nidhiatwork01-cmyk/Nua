import React from 'react';
import { useCart } from '../hooks/useCart';
import { formatPrice } from '../utils/formatPrice';
import styles from './CartDrawer.module.scss';

export const CartDrawer: React.FC = () => {
  const { 
    items, 
    cartOpen, 
    setCartOpen, 
    updateQty 
  } = useCart();

  // Calculate subtotal
  const subtotal = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setCartOpen(false);
    }
  };

  return (
    <>
      {/* Backdrop overlay */}
      <div 
        className={`${styles.drawerOverlay} ${cartOpen ? styles.open : ''}`}
        onClick={handleBackdropClick}
      />

      {/* Slide-in drawer container */}
      <div className={`${styles.drawer} ${cartOpen ? styles.open : ''}`}>
        <div className={styles.header}>
          <h2 className={styles.title}>Your Cart</h2>
          <button 
            className={styles.closeButton} 
            onClick={() => setCartOpen(false)}
            aria-label="Close cart drawer"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Content Section */}
        <div className={styles.content}>
          {items.length === 0 ? (
            <div className={styles.emptyState}>
              <span className={`material-symbols-outlined ${styles.emptyIcon}`}>
                shopping_bag
              </span>
              <p>Your cart is empty</p>
              <button 
                className={styles.shopButton}
                onClick={() => setCartOpen(false)}
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.key} className={styles.cartItem}>
                <div className={styles.itemImageWrapper}>
                  <img 
                    src={item.product.image} 
                    alt={item.product.title} 
                    className={styles.itemImage}
                    loading="lazy"
                  />
                </div>
                <div className={styles.itemDetails}>
                  <div>
                    <h3 className={styles.itemName}>{item.product.title}</h3>
                    <p className={styles.itemVariant}>
                      {item.variant.size} / {item.variant.colour}
                    </p>
                  </div>
                  <div className={styles.itemFooter}>
                    <div className={styles.qtyControls}>
                      <button 
                        className={styles.qtyButton}
                        onClick={() => updateQty(item.key, item.quantity - 1)}
                        aria-label="Decrease quantity"
                      >
                        <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>remove</span>
                      </button>
                      <span className={styles.qtyValue}>{item.quantity}</span>
                      <button 
                        className={styles.qtyButton}
                        onClick={() => updateQty(item.key, item.quantity + 1)}
                        aria-label="Increase quantity"
                      >
                        <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>add</span>
                      </button>
                    </div>
                    <span className={styles.price}>
                      {formatPrice(item.product.price * item.quantity)}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Summary Footer */}
        {items.length > 0 && (
          <div className={styles.footer}>
            <div className={styles.summaryRow}>
              <span>Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <div className={styles.summaryRow}>
              <span>Shipping</span>
              <span className={styles.freeText}>Free</span>
            </div>
            <div className={`${styles.summaryRow} ${styles.total}`}>
              <span>Estimated Total</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            
            <button className={styles.checkoutButton}>
              Checkout Now
              <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>
                arrow_right_alt
              </span>
            </button>
            <p className={styles.taxesNote}>
              Taxes calculated at checkout
            </p>
          </div>
        )}
      </div>
    </>
  );
};
export default CartDrawer;
