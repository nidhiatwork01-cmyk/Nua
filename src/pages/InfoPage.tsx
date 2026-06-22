import React from 'react';
import Navbar from '../components/Navbar';
import CartDrawer from '../components/CartDrawer';
import styles from './ProductListing.module.scss'; // Reuse layout styles

interface InfoPageProps {
  title: string;
  description: string;
}

export const InfoPage: React.FC<InfoPageProps> = ({ title, description }) => {
  return (
    <>
      <Navbar />
      <main className="container" style={{ padding: '80px 0', minHeight: '60vh', textAlign: 'center' }}>
        <h1 style={{ fontFamily: 'Playfair Display', fontSize: '48px', color: '#ae2d46', marginBottom: '16px' }}>
          {title}
        </h1>
        <p style={{ fontFamily: 'Inter', fontSize: '18px', color: '#584143', maxWidth: '600px', margin: '0 auto', lineHeight: '1.6' }}>
          {description}
        </p>
      </main>
      
      <footer className={styles.footer}>
        <div className={styles.footerContainer}>
          <div className={styles.footerLogo}>AURA</div>
          <div className={styles.footerLinks}>
            <a href="#" className={styles.footerLink}>Privacy Policy</a>
            <a href="#" className={styles.footerLink}>Terms of Service</a>
            <a href="#" className={styles.footerLink}>Shipping & Returns</a>
            <a href="#" className={styles.footerLink}>Contact Us</a>
          </div>
          <div className={styles.footerCopy}>
            © 2024 AURA. All rights reserved.
          </div>
        </div>
      </footer>
      
      <CartDrawer />
    </>
  );
};
export default InfoPage;
