import type { Product, Variant } from '../types';

// Palette mapping
export const COLOR_MAP = [
  { name: 'Translucent Dew', hex: '#fdfaf6' },
  { name: 'Rose Tint', hex: '#fae8e9' },
  { name: 'Mint Cool', hex: '#e8f2ef' }
];

// ── Gallery image pool ──────────────────────────────────────────────
// Named constants so every product can reference multiple angles/views.
const IMG_SERUM_BOTTLE =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCQjOXRvzw6fTOOQnZ27134H92SjoI5lZ3MGcXR9ncbtaa_tBgCrAwUmDRyJTtsXlbpKOOG1pXpB6KGTkthRwYTSCaCl4kvrbwUFcL_8bgeA78MsHAfsGiLyW2dE8YRWeuxg_4Q_Z1GgjUNxv2eMEdzhlCPo6dixx2yeEHmgyxXKCa9fjK8ya7jCRta7gSTujxyuHxf5-4btdgsvVRMZ_wsrtpnkatGjWNRYMe_dLAixXAE7Jsi80OquYg1EbOYCsYuXSK0_-P8zA';

const IMG_DROPPER_CLOSE =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCrkZQ_fs37Z5z8jh75-QkyB0xAN_l4N0KnGuzEXENY1CoTWsP0CJk8pBABMiW4zKj8N3XDG3Y7SphASJYljzRCDP4AM9_ghKudcS5AVSZEDc6G3Z-F56x7uE9X7oHzmo5iVckSxEVgusq_BfwUruiLjpdXXr_cNUTU-VDHf5WgMgblfkz31ympgXoJUkb_10XGxMgUATSbhl1BKKoQi_CEnTv8lTpLnE4F0OBLteXJSCPajm5T9XqxwhAyj6IxDTbk5OaB_5Lxcw';

const IMG_CREAM_JAR =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBe0CaqwLijMzmWxXMMHuR8srtTKTiNkT6iy9nOJJLQ_Ilb6k3R5Ckjk3FEzNXConFysDmL1W7ZXmd3OrnNd5QhatqIbmMswrzJjQn1PVDouI-67ZNPK5o22MpBtYFn1aBv0L3Q0mbdSpd56kohgkNklT3JVOV5m4Pih8sgx9-9P2xU7mY__gBO1957oQHojKYmwOMzE43ItbVCEX_Y_B-S6_2nZA-8DsOeUtmZlYLrgTUE84eU2qfdY9KBzqJhMTrrq5-7PtgBVQ';

const IMG_ESSENCE_BOTTLE =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDsfVKUyN1enmjUwFnV2HiS-7Sbsb4ShcZkH9A1krb3L-aYt7XGI9ZhBFJPNd2IEpCB6FtGko9rMmEp3npKRpc_HgAtV4xxeZ4JjnT6ko5SojAAdVXAWAQktMrRZOyAcqoxJ2ByS_uHJHgZfVqozKAXFEnde6Apy5aMHcEok4_s64WVtuY3FXMR_mVywSIQSZqRkCQgZ-ZWfE2tINW7u7hZmGe1dZbwS4KdrYkrtoKo0VFobJUcq9tPnydQTlpJKsxCBWYKQC4IEg';

const IMG_SCRUB_JAR =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuAKPPDDGRytqAmednZjI88oh3bPCGNWI8rB36N7drGl1VmRX8tf_hPXFOqi0vgTjX831RLJ7Vba4watg22DMZ6-rgToJmt9rTpRRM0KEtD1f7U2aYzc2TBFZ7lV-F5gekOJcYkFYR-rxw1sJi3kUEatB2HyCkyjmXuSfFMZG34Mhv1-QGUYTOiR_XGirK3DXtZif7b7Ie_uwe6ApFM60CC3M3An7KzWrdxlb2yzAhTxGcCGjAafC0MbDAQBJirNoRcgV5w5IJ_PRQ';

const IMG_OIL_BOTTLE =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuAcfsmpodQQt82gI2VxAFv9o1SaXM0tPdRNn9zUkya-mCxKfOEOusi_BKnEwtcgVT6cqCyV1Cv7f2LibGDPOkRidUj4osc5yoVCsdBVEfBFBXg4INSy51E6hBYdiTDLnrJKg5B1VjFQwduuc99l_RZgc_Hx6zlfcwcVSV8uCpUiIqHtfbhTZffiuC5QYmiFeWc3tVTUORD-V2c5ricAO07eHbfjyMBd1z908-CD4JQ0_S704cinveW61vwh_13-lzQgiS8ICcWyCQ';

const IMG_SUNSCREEN =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuB38QB0bNU0SUCeiorB8uTkshOtUSRqRTTECYU2fbdaN_RHhOlxGFO1zY2Y-KwiakyDHRFNgYLNFEHhUtWbgT_28tr5y3BDZWYAKZkJTMnYo0nE_zo11LWVZlgjGPPbJ33955FsvwVsN-oeC749IB34rJPFiADKv8NzhLnOG6Ct5lAdVncBHk-iL8A9pfGzULc0Zrk_bv3qXAjDUDkCa-N30ZAmS6b_BeXn_doBL1IGwQbVCz2je1YSXKqOtR2hYcpoix1ocJ2Uew';

const IMG_BOTANICAL_SERUM =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuD4CXOKaEz61LIsEOdUNiB2zPwpUzhKx3ROEsDB7spEi2B5MdLOFf2ect5ewaPEaGMEnwii3Q9AKSMwiBq-nEhLK4H22_OdJeeMVco54yuEZuYyaToJ7tXcw3xDRf2rajEBPHoLCFb_d-v_EEfSZmcy4PN_ai4f63kO7L9YHuPXmCegqFb8uLMm_R9p1fFJ6agA7h1w6lLACztkxgT95uXyP4SNjDzTEbda78aPn-skXzSEQuzK0uEkR0nXs8tvxoq7aot658oTAA';

const IMG_LIFESTYLE_FLAT =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBD2sIbRcyflSUFEhdXWkC3rGCRiR9FdLhfGt4xwPdi0uEsMtcTS1KbuVpPdy7TWGwDlQeXNzRhi6erd2nXvVrR69mIUoUA0ch40cV1-Tp3EfkGXl2LU0svV5hq2bYMQHQsWpoh_ZPj8LHgqrrxU-ah1SuWf_V1SwwFOyAJXbXesQNhSRQ6ML8aRgLMs8FE_q7hRDvzJ35fuyE7nv72NXKBY7c9pd04_4H6A6gQ0W1ydHtIKo9nye2Cli8NfqBR9Txxkjten7ZY1Q';

const IMG_MODEL_APPLICATION =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuAHsTSP0PGMP_fkz7SVbOxMsUka4y06BU7JiMu_2zztQvopZaKqU_HVwVAnCbCCXzGUFE9WpgOj23rclkBlRqYmvx9zxpacZro1XriRrfN3Dx3zKUTyzSXz60d6JLBinSmOtFKOhaVkKcOKSmxVfP-MY7CnA0mfOylNiKbYUA4dacApwjpaNiE02soWY938OcQEwQ2Gt7Yqgo6KXZ9ndxfByvHtPYxk8sQZJbcyuCPhB1rtomDSoCLcbV7BaQEppc-HkPkNsaRaTg';

// ── Product overrides ───────────────────────────────────────────────
// Product details mapped by index/ID
export const PRODUCT_OVERRIDES: Record<number, Partial<Product>> = {
  1: {
    title: 'Luminous Nectar Serum',
    price: 68.00,
    category: 'Skincare',
    badge: 'Best Seller',
    image: IMG_SERUM_BOTTLE,
    images: [IMG_SERUM_BOTTLE, IMG_DROPPER_CLOSE, IMG_CREAM_JAR, IMG_LIFESTYLE_FLAT],
    description: 'A botanical face serum enriched with organic oils and botanical extracts to nurture, clarify, and balance all skin types.'
  },
  2: {
    title: 'Restorative Cloud Cream',
    price: 54.00,
    category: 'Skincare',
    image: IMG_CREAM_JAR,
    images: [IMG_CREAM_JAR, IMG_SERUM_BOTTLE, IMG_SCRUB_JAR, IMG_MODEL_APPLICATION],
    description: 'An ultra-lightweight cream that hydrates, calms redness, and strengthens the skin barrier.'
  },
  3: {
    title: 'Clarifying Essence',
    price: 42.00,
    category: 'Skincare',
    badge: 'New',
    image: IMG_ESSENCE_BOTTLE,
    images: [IMG_ESSENCE_BOTTLE, IMG_OIL_BOTTLE, IMG_DROPPER_CLOSE, IMG_LIFESTYLE_FLAT],
    description: 'A purifying facial toner to balance sebum, tighten pores, and refine skin texture.'
  },
  4: {
    title: 'Gentle Polish',
    price: 38.00,
    category: 'Skincare',
    image: IMG_SCRUB_JAR,
    images: [IMG_SCRUB_JAR, IMG_CREAM_JAR, IMG_SUNSCREEN, IMG_MODEL_APPLICATION],
    description: 'A finely milled exfoliating scrub to buff away dead skin and reveal radiant, smooth skin.'
  },
  5: {
    title: 'Midnight Recovery Oil',
    price: 85.00,
    category: 'Skincare',
    image: IMG_OIL_BOTTLE,
    images: [IMG_OIL_BOTTLE, IMG_BOTANICAL_SERUM, IMG_ESSENCE_BOTTLE, IMG_LIFESTYLE_FLAT],
    description: 'An overnight elixir that deeply nourishes and repairs the skin barrier while you sleep.'
  },
  6: {
    title: 'Daily Shield SPF 50',
    price: 48.00,
    category: 'Skincare',
    image: IMG_SUNSCREEN,
    images: [IMG_SUNSCREEN, IMG_SERUM_BOTTLE, IMG_OIL_BOTTLE, IMG_DROPPER_CLOSE],
    description: 'A broad-spectrum daily mineral sunscreen that leaves zero white cast and provides active hydration.'
  },
  7: {
    title: 'Botanical Hydration Serum',
    price: 48.00,
    originalPrice: 65.00,
    category: 'Skincare',
    badge: 'Best Seller',
    image: IMG_BOTANICAL_SERUM,
    images: [IMG_BOTANICAL_SERUM, IMG_DROPPER_CLOSE, IMG_LIFESTYLE_FLAT, IMG_MODEL_APPLICATION],
    description: 'A lightweight, deeply penetrating serum formulated with squalane and wildcrafted botanical extracts. Restores natural lipid barriers for a luminous, all-day glow.'
  },
  8: {
    title: 'Radiance Serum',
    price: 68.00,
    category: 'Skincare',
    image: IMG_SERUM_BOTTLE,
    images: [IMG_SERUM_BOTTLE, IMG_SCRUB_JAR, IMG_MODEL_APPLICATION, IMG_LIFESTYLE_FLAT],
    description: 'Deeply restores luminance with Unscented hydration formulated specifically for sensitive skin types.'
  },
  9: {
    title: 'Nourishing Body Cream',
    price: 45.00,
    category: 'Body Care',
    image: IMG_CREAM_JAR,
    images: [IMG_CREAM_JAR, IMG_BOTANICAL_SERUM, IMG_ESSENCE_BOTTLE, IMG_SUNSCREEN],
    description: 'A decadent body cream scented with sandalwood to lock in deep hydration all day long.'
  }
};

/**
 * Generates Nua-style variants for a given product ID.
 * To make this feel like Nua's product world:
 * - Hues: "Translucent Dew", "Rose Tint", "Mint Cool"
 * - Sizes: "30 ml" (Available), "50 ml" (Low Stock), "100 ml" (Sold Out)
 */
export const getProductVariants = (productId: number): Variant[] => {
  const variants: Variant[] = [];

  COLOR_MAP.forEach((color) => {
    // 30 ml (Available)
    variants.push({
      id: `${productId}-${color.name.toLowerCase().replace(' ', '-')}-30ml`,
      colour: color.name,
      colourHex: color.hex,
      size: '30 ml',
      stockStatus: 'available',
      stockCount: 45
    });

    // 50 ml (Low stock status)
    variants.push({
      id: `${productId}-${color.name.toLowerCase().replace(' ', '-')}-50ml`,
      colour: color.name,
      colourHex: color.hex,
      size: '50 ml',
      stockStatus: 'low',
      stockCount: 4
    });

    // 100 ml (Sold out status)
    variants.push({
      id: `${productId}-${color.name.toLowerCase().replace(' ', '-')}-100ml`,
      colour: color.name,
      colourHex: color.hex,
      size: '100 ml',
      stockStatus: 'sold_out',
      stockCount: 0
    });
  });

  return variants;
};

/**
 * Dynamically maps a raw Fake Store product to our custom luxurious Nua skincare brand
 */
export const mapFakeStoreProduct = (raw: any): Product => {
  const id = raw.id;
  const overrides = PRODUCT_OVERRIDES[id] || {};
  
  // Fallback for remaining IDs (10 to 20)
  const defaultTitle = `Botanical ${raw.category.replace("'", '')} Care`;
  const defaultCategory = 'Wellness';
  const defaultImage = raw.image;

  return {
    id: raw.id,
    title: overrides.title || defaultTitle,
    price: overrides.price || raw.price,
    originalPrice: overrides.originalPrice,
    description: overrides.description || raw.description,
    category: overrides.category || defaultCategory,
    image: overrides.image || defaultImage,
    images: overrides.images || [overrides.image || defaultImage],
    rating: raw.rating || { rate: 4.5, count: 120 },
    badge: overrides.badge
  };
};
