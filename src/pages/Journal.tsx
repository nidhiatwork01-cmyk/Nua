import React from 'react';
import Navbar from '../components/Navbar';
import CartDrawer from '../components/CartDrawer';
import styles from './Journal.module.scss';

interface Article {
  id: number;
  category: string;
  title: string;
  excerpt: string;
  image: string;
  gridSpan: 'large' | 'small';
}

const ARTICLES: Article[] = [
  {
    id: 1,
    category: 'Ingredients',
    title: 'Wild-Harvested Botanicals',
    excerpt: 'Journey with us to the untamed landscapes where our most potent ingredients are respectfully gathered by hand.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCogsJ4UFtvuoExY3DwIqwe-dvjkS1V_yjsXO_a6R_1iqenKKtyQBBijqgIBCvW5vkRDXEvppraDvcjaq8aRyz7SRfRPQxOCqGjyXMS2VGgZlhbLgLKb0D4VIsS75Zbs4RFsXDumyfVCJeThXAswgvC6_qrI06XWhwxNM5Zr6lg0d5weMaWrU20PqnCQBI47YOe1hmOTyYqhObDCNxDN-2ufsYmCtdxFR6splF5QkM4d9k6V0YYt-i59hQcNwvuYA5I2NXEgxydHw',
    gridSpan: 'large'
  },
  {
    id: 2,
    category: 'Guides',
    title: 'Summer Skin Essentials',
    excerpt: 'Transition your routine for warmer days with our lightweight, deeply hydrating favorites.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBK07rVSrr6JJfXktxyJ8a3RONPRTm8MmVSSY0j0e1W38EicVPEB7dwiGJqIi04sw2eupwGuaaYA4pbt9TuQUDp6TOstO6eec4KGS7Yhi66wZAuCtWcQRpw8gX-UYFpRNcbwQUC2REZ5tSn5Z6FGiFtQQ2egVBuxv9gwjUiDYcbAEKdxC30g0AtcHlXcZiyl60TOl1GTwz-G_u1MXuA45Cg3h1UTzvgkUutRZRcYNtoYl0VA_3uf_cmRqTVf6iSWdEXE82s6BVftQ',
    gridSpan: 'small'
  },
  {
    id: 3,
    category: 'Science',
    title: 'The Science of Hydration',
    excerpt: 'Understanding the skin barrier and why deeply penetrating moisture is the foundation of a healthy glow.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAKEylmi7UkAQG2fRj1VCNBMXA1MQOmZfgS2GdxdaThjkeLz8ylNtVWlHfz9AhPuuE4OWtF-P2cNewdsT_D-jcT7ElmbxlbjdyWDguUR30TOzm2eGgPEoi1zWnDUmDEW8Yv_qNZvOoAWbwzKx31y9ZCu5Hj6FNtmOw0MszeT2Bngj9cxFJJIPh4cJ_J5SdBMtLdtjQkYS5tS5QCqEQWArTfzwV94kIDX30WCiVnmihnmwqyYdAwksgw9qPU5LwDLk9NqmchwdF1_A',
    gridSpan: 'small'
  },
  {
    id: 4,
    category: 'Philosophy',
    title: 'Mindful Beauty',
    excerpt: 'Cultivating a deeper connection between how we care for our skin and how we care for our minds.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB8t8lUOFBqiLbCW2rmnoXxqsdAPsFVZw3XPIxB8x3UccsNVKF6YGtEOKu61BdJHcHSeE7OoZ_nw3SRD8zn6Vm4n5cPEfzl2fSarV5G5Xl84JtP4Iy7TAV8gyDS6D3jvVvq0IGn1AIhT3qxjRDo60C0f9SUD-EbxsgqxnvQKKRLV9QCFgio0-2lZor6Kgqf2h4q86cMhNe_hC1yQkoKP4DDSfSaKeAwOKip6pW0avEo1lPkfe7J2CNeCCtj2_5N_DwEEuOTiXRYtA',
    gridSpan: 'large'
  }
];

export const Journal: React.FC = () => {
  return (
    <>
      <Navbar />

      <main className={styles.main}>
        {/* Journal Header */}
        <section className={styles.header}>
          <h1 className={styles.title}>Journal</h1>
          <p className={styles.subtitle}>
            Exploring the intentionality behind self-care. Discover our philosophy, the origins of our wild-harvested botanicals, and rituals for mindful living.
          </p>
        </section>

        {/* Featured Article */}
        <section className={styles.featuredSection}>
          <a href="#story" className={styles.featuredLink} onClick={(e) => e.preventDefault()}>
            <div className={styles.featuredImageWrapper}>
              <img 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCyoMpmggASNsQaqlGDlZFxDE4KX2OXvhwyZ5cppP-EPmFcpt8PsOLjr3nabGaZCx1Gn4j3ENmpGcj6ofT_dbchon59pzgQMykCym4DFws6-AVKF44agP-vvSAshPh260nAvUhZNsqr9Ycxal3poskeDar-lUDgNnElyeUMnbVNgumlJU74OftCpy0hlZJBK_ef741arxaxPbc9Kn-gL5tQw3c3cs8rHirsF4-YQRJRAs6O1uAcjI0WB3xfmxJaSlrbwc8H5CHKmQ" 
                alt="The Ritual of Self-Care" 
                className={styles.featuredImage}
              />
            </div>
            <div className={styles.featuredGradient} />
            <div className={styles.featuredContent}>
              <span className={styles.featuredLabel}>Editorial</span>
              <h2 className={styles.featuredTitle}>The Ritual of Self-Care: Finding Stillness in the Everyday</h2>
              <span className={styles.readStoryLink}>
                Read Story <span className="material-symbols-outlined">arrow_forward</span>
              </span>
            </div>
          </a>
        </section>

        {/* Article Grid */}
        <section className={styles.gridSection}>
          <div className={styles.grid}>
            {ARTICLES.map((article) => (
              <article 
                key={article.id} 
                className={`${styles.articleCard} ${article.gridSpan === 'large' ? styles.largeCard : styles.smallCard}`}
              >
                <a href="#article" className={styles.cardImageLink} onClick={(e) => e.preventDefault()}>
                  <div className={styles.cardImageWrapper}>
                    <img 
                      src={article.image} 
                      alt={article.title} 
                      className={styles.cardImage} 
                      loading="lazy"
                    />
                  </div>
                </a>
                <div className={styles.cardContent}>
                  <span className={styles.cardLabel}>{article.category}</span>
                  <h3 className={styles.cardTitle}>
                    <a href="#article" className={styles.cardTitleLink} onClick={(e) => e.preventDefault()}>
                      {article.title}
                    </a>
                  </h3>
                  <p className={styles.cardExcerpt}>{article.excerpt}</p>
                  <a href="#article" className={styles.readMoreBtn} onClick={(e) => e.preventDefault()}>
                    Read More <span className="material-symbols-outlined">arrow_right_alt</span>
                  </a>
                </div>
              </article>
            ))}
          </div>

          <div className={styles.loadMoreWrapper}>
            <button className={styles.loadMoreBtn}>
              Load More Articles
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

export default Journal;
