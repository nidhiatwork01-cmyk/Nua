import React, { useEffect, useRef, useState, useCallback } from 'react';
import Navbar from '../components/Navbar';
import CartDrawer from '../components/CartDrawer';
import styles from './OurStory.module.scss';

// Custom hook for scroll-triggered reveal animations via IntersectionObserver
const useReveal = (threshold = 0.15) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold, rootMargin: '0px 0px -60px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isVisible };
};

// Simple parallax hook for hero image
const useParallax = () => {
  const ref = useRef<HTMLDivElement>(null);

  const handleScroll = useCallback(() => {
    if (!ref.current) return;
    const scrollY = window.scrollY;
    const rate = scrollY * 0.3;
    ref.current.style.transform = `translateY(${rate}px) scale(1.1)`;
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return ref;
};

export const OurStory: React.FC = () => {
  const heroParallaxRef = useParallax();
  const heroContent = useReveal(0.3);
  const originText = useReveal(0.2);
  const originImage = useReveal(0.2);
  const craftHeader = useReveal(0.3);
  const craftRow1 = useReveal(0.15);
  const craftRow2 = useReveal(0.15);
  const promiseImage = useReveal(0.2);
  const promiseText = useReveal(0.2);
  const reserveContent = useReveal(0.3);

  return (
    <>
      <Navbar />

      <main className={styles.main}>
        {/* Heritage Hero Section */}
        <section className={styles.heroSection}>
          <div className={styles.heroImageWrapper} ref={heroParallaxRef}>
            <img 
              src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=1600&auto=format&fit=crop" 
              alt="Lush forest canopy with sunbeams" 
              className={styles.heroImage}
            />
          </div>
          <div className={styles.heroOverlay} />
          <div 
            className={`${styles.heroContent} ${heroContent.isVisible ? styles.revealed : ''}`}
            ref={heroContent.ref}
          >
            <span className={styles.sectionLabel}>01 — The Heritage</span>
            <h1 className={styles.heroTitle}>Rooted in Earth. Elevated by Science.</h1>
            <p className={styles.heroSubtitle}>
              We believe that natural beauty is naturally vibrant. Our skincare rituals are born from a desire to combine the raw, wild-harvested power of nature with the refined, clinical precision of modern biotechnology.
            </p>
          </div>
        </section>

        {/* Origin Section */}
        <section className={styles.originSection}>
          <div 
            className={`${styles.originTextColumn} ${originText.isVisible ? styles.revealLeft : ''}`}
            ref={originText.ref}
          >
            <span className={styles.sectionSublabel}>01 — The Origin</span>
            <h2 className={styles.sectionTitle}>A Singular Intention</h2>
            <p className={styles.originParagraph}>
              Our journey began not in a laboratory, but in the heart of the wild, untouched wilderness. We sought botanical ingredients that had withstood the test of time, drawing their vitality from rich, unpolluted soils and glacier waters.
            </p>
            <p className={styles.originParagraph}>
              Every element we harvest is chosen for its profound life force, harvested with a deep respect for the cycles of the earth. We don't just extract; we partner with nature to distill its most potent essences.
            </p>
          </div>
          <div 
            className={`${styles.originImageColumn} ${originImage.isVisible ? styles.revealRight : ''}`}
            ref={originImage.ref}
          >
            <div className={styles.originImageWrapper}>
              <img 
                src="https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=800&auto=format&fit=crop" 
                alt="Water droplet on green leaf" 
                className={styles.originImage}
              />
            </div>
          </div>
        </section>

        {/* Craftsmanship Section */}
        <section className={styles.craftsmanshipSection}>
          <div 
            className={`${styles.craftsmanshipHeader} ${craftHeader.isVisible ? styles.revealUp : ''}`}
            ref={craftHeader.ref}
          >
            <span className={styles.sectionSublabel}>02 — Our Philosophy</span>
            <h2 className={styles.craftsmanshipTitle}>Intentional Craftsmanship</h2>
          </div>

          <div className={styles.craftsmanshipGrid}>
            {/* Top Row */}
            <div 
              className={`${styles.gridRow} ${craftRow1.isVisible ? styles.revealUp : ''}`}
              ref={craftRow1.ref}
            >
              <div className={styles.imageCard}>
                <div className={styles.gridImageWrapper}>
                  <img 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCogsJ4UFtvuoExY3DwIqwe-dvjkS1V_yjsXO_a6R_1iqenKKtyQBBijqgIBCvW5vkRDXEvppraDvcjaq8aRyz7SRfRPQxOCqGjyXMS2VGgZlhbLgLKb0D4VIsS75Zbs4RFsXDumyfVCJeThXAswgvC6_qrI06XWhwxNM5Zr6lg0d5weMaWrU20PqnCQBI47YOe1hmOTyYqhObDCNxDN-2ufsYmCtdxFR6splF5QkM4d9k6V0YYt-i59hQcNwvuYA5I2NXEgxydHw" 
                    alt="Skincare bottles and seeds on travertine stone" 
                    className={styles.gridImage}
                  />
                </div>
              </div>
              <div className={styles.textCardLight}>
                <h3 className={styles.cardTitle}>Purity of Elements</h3>
                <p className={styles.cardText}>
                  We formulate without compromise. Each jar contains only what is absolutely necessary for transformative results, eliminating synthetic fillers to allow active botanicals to perform at their peak.
                </p>
              </div>
            </div>

            {/* Bottom Row */}
            <div 
              className={`${styles.gridRowReversed} ${craftRow2.isVisible ? styles.revealUp : ''}`}
              ref={craftRow2.ref}
            >
              <div className={styles.textCardDark}>
                <h3 className={styles.cardTitle}>Tactile Rituals</h3>
                <p className={styles.cardText}>
                  Skincare is more than maintenance; it is an intimate ritual of self-care. Our textures are designed to melt, glide, and envelope, turning daily routines into moments of profound grounding.
                </p>
              </div>
              <div className={styles.imageCard}>
                <div className={styles.gridImageWrapper}>
                  <img 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAKEylmi7UkAQG2fRj1VCNBMXA1MQOmZfgS2GdxdaThjkeLz8ylNtVWlHfz9AhPuuE4OWtF-P2cNewdsT_D-jcT7ElmbxlbjdyWDguUR30TOzm2eGgPEoi1zWnDUmDEW8Yv_qNZvOoAWbwzKx31y9ZCu5Hj6FNtmOw0MszeT2Bngj9cxFJJIPh4cJ_J5SdBMtLdtjQkYS5tS5QCqEQWArTfzwV94kIDX30WCiVnmihnmwqyYdAwksgw9qPU5LwDLk9NqmchwdF1_A" 
                    alt="Cream moisturizer swipe texture" 
                    className={styles.gridImage}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Promise Section */}
        <section className={styles.promiseSection}>
          <div 
            className={`${styles.promiseImageColumn} ${promiseImage.isVisible ? styles.revealLeft : ''}`}
            ref={promiseImage.ref}
          >
            <div className={styles.promiseImageFrame}>
              <img 
                src="https://images.unsplash.com/photo-1576086213369-97a306d36557?q=80&w=800&auto=format&fit=crop" 
                alt="Formulator working in clean space" 
                className={styles.promiseImage}
              />
            </div>
          </div>
          <div 
            className={`${styles.promiseTextColumn} ${promiseText.isVisible ? styles.revealRight : ''}`}
            ref={promiseText.ref}
          >
            <span className={styles.sectionSublabel}>03 — Our Promise</span>
            <blockquote className={styles.quote}>
              "We do not create beauty; we simply uncover it by giving the skin the raw, vital nourishment it inherently recognizes."
            </blockquote>
            <p className={styles.promiseParagraph}>
              Our extraction methods are painfully slow by industry standards. We utilize cold-press and ultra-maceration techniques that preserve the delicate phytonutrients within each plant cell. It takes time, patience, and a deep reverence for the source material to capture the full spectrum of nature's healing properties.
            </p>
            <div className={styles.founderBlock}>
              <span className={styles.founderName}>Evelyn Hart</span>
              <span className={styles.founderTitle}>Founder & Master Formulator</span>
            </div>
          </div>
        </section>

        {/* Reserve Collection Section */}
        <section className={styles.reserveSection}>
          <div className={styles.reserveImageWrapper}>
            <img 
              src="https://images.unsplash.com/photo-1502082553048-f009c37129b9?q=80&w=1600&auto=format&fit=crop" 
              alt="Tree trunk and sprouts" 
              className={styles.reserveImage}
            />
          </div>
          <div className={styles.reserveOverlay} />
          <div 
            className={`${styles.reserveContent} ${reserveContent.isVisible ? styles.revealUp : ''}`}
            ref={reserveContent.ref}
          >
            <h2 className={styles.reserveTitle}>The Reserve Collection</h2>
            <p className={styles.reserveDescription}>
              A limited-edition of ultra-small batch solutions, born from rare botanical crops in exceptional seasons. The Reserve represents the absolute pinnacle of our dedication to uncompromising quality and botanical supremacy.
            </p>
            <button className={styles.reserveBtn} onClick={(e) => e.preventDefault()}>
              Explore The Reserve
            </button>
          </div>
        </section>
      </main>

      {/* Global Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerContainer}>
          <div className={styles.footerLogo}>AURA</div>
          <div className={styles.footerLinks}>
            <a href="#privacy" className={styles.footerLink} onClick={(e) => e.preventDefault()}>Privacy Policy</a>
            <a href="#terms" className={styles.footerLink} onClick={(e) => e.preventDefault()}>Terms of Service</a>
            <a href="#shipping" className={styles.footerLink} onClick={(e) => e.preventDefault()}>Shipping & Returns</a>
            <a href="#contact" className={styles.footerLink} onClick={(e) => e.preventDefault()}>Contact Us</a>
          </div>
          <div className={styles.footerCopy}>
            © 2026 AURA Skincare. All rights reserved.
          </div>
        </div>
      </footer>

      <CartDrawer />
    </>
  );
};

export default OurStory;
