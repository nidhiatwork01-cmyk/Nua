import React, { useState } from 'react';
import { useCart } from '../hooks/useCart';
import { formatPrice } from '../utils/formatPrice';
import { RAZORPAY_PUBLIC_KEY, RAZORPAY_SCRIPT_SRC } from '../data/constants';
import styles from './CartDrawer.module.scss';

// Dynamically load Razorpay SDK
const loadRazorpayScript = (): Promise<boolean> => {
  return new Promise((resolve) => {
    if ((window as any).Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement('script');
    script.src = RAZORPAY_SCRIPT_SRC;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

export const CartDrawer: React.FC = () => {
  const { 
    items, 
    cartOpen, 
    setCartOpen, 
    updateQty,
    clearCart
  } = useCart();

  const [checkoutLoading, setCheckoutLoading] = useState(false);

  // Calculate subtotal
  const subtotal = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setCartOpen(false);
    }
  };

  const handleCheckout = async () => {
    if (checkoutLoading || items.length === 0) return;
    setCheckoutLoading(true);

    try {
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        alert("Failed to load Razorpay Checkout SDK. Please check your internet connection.");
        setCheckoutLoading(false);
        return;
      }

      // Convert subtotal to INR paise (price * 80 INR per USD * 100 paise per INR)
      const amountInPaise = Math.round(subtotal * 80 * 100);

      const options = {
        key: RAZORPAY_PUBLIC_KEY,
        amount: amountInPaise,
        currency: "INR",
        name: "AURA Skincare",
        description: "Your Organic Botanicals Order",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCQjOXRvzw6fTOOQnZ27134H92SjoI5lZ3MGcXR9ncbtaa_tBgCrAwUmDRyJTtsXlbpKOOG1pXpB6KGTkthRwYTSCaCl4kvrbwUFcL_8bgeA78MsHAfsGiLyW2dE8YRWeuxg_4Q_Z1GgjUNxv2eMEdzhlCPo6dixx2yeEHmgyxXKCa9fjK8ya7jCRta7gSTujxyuHxf5-4btdgsvVRMZ_wsrtpnkatGjWNRYMe_dLAixXAE7Jsi80OquYg1EbOYCsYuXSK0_-P8zA",
        handler: function (response: any) {
          alert(`Payment Successful!\nPayment ID: ${response.razorpay_payment_id}`);
          clearCart();
          setCartOpen(false);
        },
        prefill: {
          name: "Aura Customer",
          email: "customer@auraskincare.in",
          contact: "9999999999"
        },
        theme: {
          color: "#6b7c65" // AURA Brand Green
        },
        modal: {
          ondismiss: function() {
            setCheckoutLoading(false);
          }
        }
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("Checkout initialization failed:", err);
      alert("Something went wrong during checkout. Please try again.");
    } finally {
      setCheckoutLoading(false);
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
            
            <button 
              className={styles.checkoutButton}
              onClick={handleCheckout}
              disabled={checkoutLoading}
            >
              {checkoutLoading ? 'Opening Secure Checkout...' : 'Checkout Now'}
              <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>
                arrow_right_alt
              </span>
            </button>
            <p className={styles.taxesNote}>
              Secure payment processed via Razorpay
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default CartDrawer;
