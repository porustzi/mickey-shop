import { supabase } from './supabase';
import type { Product, CheckoutFormData, CartItem } from '../types';

export async function fetchProducts(options?: {
  category?: string;
  sort?: string;
  featured?: boolean;
  limit?: number;
}): Promise<Product[]> {
  let query = supabase.from('products').select('*').eq('is_active', true);

  if (options?.category && options.category !== 'all') {
    query = query.eq('category', options.category);
  }

  if (options?.featured) {
    query = query.eq('is_featured', true);
  }

  if (options?.limit) {
    query = query.limit(options.limit);
  }

  if (options?.sort === 'price_asc') {
    query = query.order('price', { ascending: true });
  } else if (options?.sort === 'price_desc') {
    query = query.order('price', { ascending: false });
  } else {
    query = query.order('created_at', { ascending: false });
  }

  const { data, error } = await query;
  if (error) throw error;
  return data as Product[];
}

export async function fetchProductById(id: string): Promise<Product | null> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .eq('is_active', true)
    .single();

  if (error) return null;
  return data as Product;
}

export async function placeOrder(
  formData: CheckoutFormData,
  cartItems: CartItem[],
  totalPrice: number,
  shippingCost: number
): Promise<{ id: string } | null> {
  const items = cartItems.map((item) => ({
    product_id: item.product.id,
    name: item.product.name,
    price: item.product.price,
    size: item.product.size,
    quantity: item.quantity,
  }));

  const { data, error } = await supabase
    .from('orders')
    .insert({
      ...formData,
      items,
      total_price: totalPrice,
      shipping_cost: shippingCost,
    })
    .select('id')
    .single();

  if (error) throw error;
  return data as { id: string };
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('uk-UA', {
    style: 'currency',
    currency: 'UAH',
    minimumFractionDigits: 0,
  }).format(price);
}

export function conditionLabel(condition: Product['condition']): string {
  const map = {
    new: 'New',
    like_new: 'Like New',
    good: 'Good',
    fair: 'Fair',
  };
  return map[condition];
}

export function buildTelegramOrderMessage(
  formData: CheckoutFormData,
  cartItems: CartItem[],
  total: number
): string {
  const lines = [
    '%F0%9F%9B%8D NEW ORDER',
    '',
    `Name: ${formData.full_name}`,
    `Phone: ${formData.phone}`,
    `City: ${formData.city}`,
    `Nova Poshta: ${formData.nova_poshta_branch}`,
    formData.comment ? `Comment: ${formData.comment}` : '',
    '',
    'Items:',
    ...cartItems.map((i) => `- ${i.product.name} (${i.product.size}) x${i.quantity} — ${formatPrice(i.product.price * i.quantity)}`),
    '',
    `Total: ${formatPrice(total)}`,
  ]
    .filter((l) => l !== null)
    .join('%0A');

  return lines;
}
