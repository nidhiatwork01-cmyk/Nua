import React, { useEffect } from 'react';
import styles from './SizeGuideModal.module.scss';

interface SizeGuideModalProps {
  onClose: () => void;
}

export const SizeGuideModal: React.FC<SizeGuideModalProps> = ({ onClose }) => {
  // Prevent background scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={styles.modalOverlay} onClick={handleBackdropClick}>
      <div className={styles.modalContainer}>
        <div className={styles.header}>
          <h2 className={styles.title}>Size & Usage Guide</h2>
          <button className={styles.closeBtn} onClick={onClose} aria-label="Close size guide">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <div className={styles.body}>
          <p className={styles.subtitle}>
            Find the perfect bottle size for your daily skincare ritual.
          </p>

          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Bottle Size</th>
                  <th>Height & Width</th>
                  <th>Est. Supply</th>
                  <th>Ideal For</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>30 ml</strong></td>
                  <td>8.5 x 3.2 cm</td>
                  <td>~ 4 weeks</td>
                  <td>Travel, trial & sampling active formulas.</td>
                </tr>
                <tr>
                  <td><strong>50 ml</strong></td>
                  <td>10.2 x 3.8 cm</td>
                  <td>~ 8 weeks</td>
                  <td>Daily ritual, standard home size.</td>
                </tr>
                <tr>
                  <td><strong>100 ml</strong></td>
                  <td>13.5 x 4.5 cm</td>
                  <td>~ 16 weeks</td>
                  <td>Extended value, long-term favorites.</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className={styles.tipsSection}>
            <h3 className={styles.tipsTitle}>Tips for Best Results</h3>
            <ul className={styles.tipsList}>
              <li>
                <span className="material-symbols-outlined">eco</span>
                <span>A pea-sized amount (approx. 0.5 ml) is sufficient for face and neck application.</span>
              </li>
              <li>
                <span className="material-symbols-outlined">history</span>
                <span>Store in a cool, dark place. Use within 12 months after opening.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SizeGuideModal;
