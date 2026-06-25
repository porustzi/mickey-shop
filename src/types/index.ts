export interface Product {
  id: string;
  name: string;
  description: string | null;
  price: number;
  original_price: number | null;
  category: 'streetwear' | 'sneakers' | 'jackets' | 'accessories' | 'vintage';
  condition: 'new' | 'like_new' | 'good' | 'fair';
  size: string | null;
  brand: string | null;
  images: string[];
  stock: number;
  is_featured: boolean;
  is_active: boolean;
  seller_name: string | null;
  seller_telegram: string | null;
  created_at: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CheckoutFormData {
  full_name: string;
  phone: string;
  city: string;
  nova_poshta_branch: string;
  comment: string;
}

export interface PreorderProduct {
  id: string;
  name: string;
  description: string | null;
  price: number;
  category: string;
  images: string[];
  delivery_time: string;
  deposit: number;
}

export type Category = 'all' | 'streetwear' | 'sneakers' | 'jackets' | 'accessories' | 'vintage';
export type SortOption = 'newest' | 'price_asc' | 'price_desc';
