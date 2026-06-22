import React from 'react';
import styles from './SkeletonCard.module.scss';

export const SkeletonCard: React.FC = () => {
  return (
    <div className={styles.skeletonCard}>
      <div className={styles.imagePlaceholder} />
      <div className={styles.infoPlaceholder}>
        <div className={styles.titleLine} />
        <div className={styles.priceLine} />
      </div>
    </div>
  );
};
export default SkeletonCard;
