import React from 'react';
import styles from './Footer.module.scss';

export const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        <div className={styles.footerLogo}>AURA</div>
        <div className={styles.footerContact}>
          <a href="tel:8101414224" className={styles.footerLink}>
            <span className="material-symbols-outlined" style={{ fontSize: '18px', marginRight: '6px' }}>call</span>
            8101414224
          </a>
          <span className={styles.footerDivider}>•</span>
          <a href="mailto:nidhiatwork.01@gmail.com" className={styles.footerLink}>
            <span className="material-symbols-outlined" style={{ fontSize: '18px', marginRight: '6px' }}>mail</span>
            nidhiatwork.01@gmail.com
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
