import { useState, useEffect } from 'react';
import type { Product } from '../types';
import { API_BASE_URL } from '../data/constants';
import { mapFakeStoreProduct, getAllMockProducts, getMockProductById } from '../data/mockVariants';

export const useProducts = (category?: string) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000);

    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const url = `${API_BASE_URL}/products`;
        const res = await fetch(url, { signal: controller.signal });
        if (!res.ok) {
          throw new Error(`API responded with status: ${res.status}`);
        }
        const data = await res.json();
        
        if (!Array.isArray(data) || data.length === 0) {
          throw new Error('Invalid or empty product list received');
        }

        // Map raw fake store products to our custom Nua skincare products
        const mappedProducts = data.map((item: any) => mapFakeStoreProduct(item));
        
        // Optionally filter by category
        if (category) {
          setProducts(mappedProducts.filter((p: Product) => p.category.toLowerCase() === category.toLowerCase()));
        } else {
          setProducts(mappedProducts);
        }
      } catch (err: any) {
        console.warn('Fake Store API unavailable or blocked by Cloudflare, using fallback catalog:', err.message);
        // Fallback gracefully to our curated skincare catalog so the storefront is always functional
        const fallbackProducts = getAllMockProducts();
        if (category) {
          setProducts(fallbackProducts.filter((p: Product) => p.category.toLowerCase() === category.toLowerCase()));
        } else {
          setProducts(fallbackProducts);
        }
        setError(null);
      } finally {
        clearTimeout(timeoutId);
        setLoading(false);
      }
    };

    fetchProducts();

    return () => {
      clearTimeout(timeoutId);
      controller.abort();
    };
  }, [category]);

  return { products, loading, error };
};

export const useProduct = (id: number) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id || isNaN(id)) return;
    
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000);

    const fetchProduct = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`${API_BASE_URL}/products/${id}`, { signal: controller.signal });
        if (!res.ok) {
          throw new Error(`API responded with status: ${res.status}`);
        }
        const data = await res.json();
        
        if (!data) {
          throw new Error('Product not found');
        }

        const mapped = mapFakeStoreProduct(data);
        setProduct(mapped);
      } catch (err: any) {
        console.warn(`Fake Store API unavailable for product ${id}, using fallback details:`, err.message);
        const fallbackProduct = getMockProductById(id);
        setProduct(fallbackProduct);
        setError(null);
      } finally {
        clearTimeout(timeoutId);
        setLoading(false);
      }
    };

    fetchProduct();

    return () => {
      clearTimeout(timeoutId);
      controller.abort();
    };
  }, [id]);

  return { product, loading, error };
};
