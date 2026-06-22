import { useState, useEffect } from 'react';
import type { Product } from '../types';
import { API_BASE_URL } from '../data/constants';
import { mapFakeStoreProduct } from '../data/mockVariants';

export const useProducts = (category?: string) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const url = `${API_BASE_URL}/products`;
        const res = await fetch(url);
        if (!res.ok) {
          throw new Error(`Failed to fetch products: ${res.statusText}`);
        }
        const data = await res.json();
        
        // Map raw fake store products to our custom Nua skincare products
        const mappedProducts = data.map((item: any) => mapFakeStoreProduct(item));
        
        // Optionally filter by category
        if (category) {
          setProducts(mappedProducts.filter((p: Product) => p.category.toLowerCase() === category.toLowerCase()));
        } else {
          setProducts(mappedProducts);
        }
      } catch (err: any) {
        console.error(err);
        setError(err.message || 'Something went wrong while fetching products.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category]);

  return { products, loading, error };
};

export const useProduct = (id: number) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id || isNaN(id)) return;
    
    const fetchProduct = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`${API_BASE_URL}/products/${id}`);
        if (!res.ok) {
          throw new Error(`Failed to fetch product: ${res.statusText}`);
        }
        const data = await res.json();
        
        if (!data) {
          throw new Error('Product not found');
        }

        const mapped = mapFakeStoreProduct(data);
        setProduct(mapped);
      } catch (err: any) {
        console.error(err);
        setError(err.message || 'Something went wrong while fetching the product.');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  return { product, loading, error };
};
