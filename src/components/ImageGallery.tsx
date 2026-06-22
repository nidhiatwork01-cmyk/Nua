import React, { useState } from 'react';
import styles from './ImageGallery.module.scss';

interface ImageGalleryProps {
  images: string[];
  badge?: string;
}

export const ImageGallery: React.FC<ImageGalleryProps> = ({ images, badge }) => {
  // The thumbnails show all images, including the first one so the user can easily return to it.
  const galleryImages = images;
  
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [hasClickedThumbnail, setHasClickedThumbnail] = useState<boolean>(false);
  const [isVideoActive, setIsVideoActive] = useState<boolean>(false);

  const handleThumbnailClick = (index: number) => {
    setActiveIndex(index);
    setHasClickedThumbnail(true);
    setIsVideoActive(false);
  };

  const handleVideoClick = () => {
    setIsVideoActive(true);
    setHasClickedThumbnail(true);
  };

  // If the user has not clicked any thumbnail yet, we display the first image (images[0]) as the main image.
  // Once they click a thumbnail, we display the clicked thumbnail's image.
  const mainImageSrc = isVideoActive 
    ? '' 
    : (hasClickedThumbnail ? (galleryImages[activeIndex] || images[0]) : images[0]);

  return (
    <div className={styles.gallery}>
      {/* Main Image or Video Area */}
      <div className={styles.mainImageWrapper}>
        {isVideoActive ? (
          <div className={styles.videoPlayerWrapper}>
            <span className="material-symbols-outlined" style={{ fontSize: '48px', color: 'white', marginBottom: '12px' }}>
              play_circle
            </span>
            <h3 className={styles.playerTitle}>Ritual Walkthrough</h3>
            <p className={styles.playerSub}>Demonstrating application and texture.</p>
          </div>
        ) : (
          <img 
            src={mainImageSrc} 
            alt="Product view" 
            className={styles.mainImage}
            loading="lazy"
            width="600"
            height="750"
          />
        )}
        
        {badge && (
          <div className={styles.badge}>
            <span className={styles.badgeText}>{badge}</span>
          </div>
        )}
      </div>

      {/* Thumbnails Grid */}
      <div className={styles.thumbnailsGrid}>
        {/* Render Image Thumbnails */}
        {galleryImages.map((img, idx) => (
          <button
            key={idx}
            className={`${styles.thumbnailBtn} ${(!isVideoActive && activeIndex === idx) ? styles.active : ''}`}
            onClick={() => handleThumbnailClick(idx)}
            aria-label={`View thumbnail ${idx + 1}`}
          >
            <img src={img} alt={`Thumbnail ${idx + 1}`} className={styles.thumbnailImg} loading="lazy" />
          </button>
        ))}

        {/* Render Video Thumbnail */}
        {images.length > 0 && (
          <button
            className={`${styles.thumbnailBtn} ${isVideoActive ? styles.active : ''}`}
            onClick={handleVideoClick}
            aria-label="Play product video"
          >
            <div className={styles.videoPlaceholder}>
              <span className={`material-symbols-outlined ${styles.videoIcon}`}>
                play_circle
              </span>
            </div>
          </button>
        )}
      </div>
    </div>
  );
};

export default ImageGallery;
