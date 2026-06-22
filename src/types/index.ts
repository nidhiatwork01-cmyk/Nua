export interface Product {
  id: number;
  title: string;
  price: number;
  originalPrice?: number;
  description: string;
  category: string;
  image: string; // main image
  images: string[]; // gallery images
  rating: {
    rate: number;
    count: number;
  };
  badge?: string;
}

export interface Variant {
  id: string; // e.g. "rose-30"
  colour: string; // e.g. "Translucent Dew", "Rose Tint", "Mint Cool"
  colourHex: string; // hex representation
  size: string; // e.g. "30 ml", "50 ml", "100 ml"
  flow?: string; // Nua-style: e.g. "Regular", "Heavy" (optional)
  stockStatus: 'available' | 'low' | 'sold_out';
  stockCount: number;
}

export interface CartItem {
  key: string; // unique combination: productId + colour + size
  product: Product;
  variant: Variant;
  quantity: number;
}

export interface ApiError {
  message: string;
  status?: number;
}
