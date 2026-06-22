export const API_BASE_URL = 'https://fakestoreapi.com';
export const ADD_TO_CART_LATENCY = 800; // ms
export const ADD_TO_CART_FAILURE_RATE = 0.20; // 20% failure rate
export const LOCAL_STORAGE_CART_KEY = 'aura_cart_items';

const getEnvKey = (): string | undefined => {
  try {
    // Check Webpack/CRA environment dynamically via globalThis to bypass TypeScript compile checks
    const processRef = (globalThis as any).process;
    return processRef?.env?.REACT_APP_RAZORPAY_KEY || processRef?.env?.REACT_APP_RAZORPAY_KEY_ID;
  } catch (e) {
    return undefined;
  }
};

const getViteEnvKey = (): string | undefined => {
  try {
    // Check Vite environment
    return (import.meta.env.VITE_RAZORPAY_KEY || import.meta.env.VITE_RAZORPAY_KEY_ID);
  } catch (e) {
    return undefined;
  }
};

export const RAZORPAY_SCRIPT_SRC = "https://checkout.razorpay.com/v1/checkout.js";
export const DEFAULT_RAZORPAY_KEY = "rzp_test_RmonAWA4BACRC9";
export const RAZORPAY_PUBLIC_KEY = getEnvKey() || getViteEnvKey() || DEFAULT_RAZORPAY_KEY;
