import { useState, useEffect } from 'react';
import { ArrowLeft, ShoppingBag, Package, Truck, Shield, ChevronLeft, ChevronRight } from 'lucide-react';
import { fetchProductById, formatPrice, conditionLabel } from '../lib/api';
import type { Product } from '../types';
import { useCart } from '../context/CartContext';

interface ProductPageProps {
  productId: string;
  onNavigate: (page: string, id?: string) => void;
}

export default function ProductPage({ productId, onNavigate }: ProductPageProps) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [imageIndex, setImageIndex] = useState(0);
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();

  useEffect(() => {
    setLoading(true);
    setImageIndex(0);
    fetchProductById(productId).then((data) => {
      setProduct(data);
      setLoading(false);
    });
  }, [productId]);

  const handleAddToCart = () => {
    if (!product) return;
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const telegramMessage = product
    ? `https://t.me/mickey_shop?text=${encodeURIComponent(`Hi! I'm interested in: ${product.name} (${product.size}) — ${formatPrice(product.price)}`)}`
    : 'https://t.me/mickey_shop';

  if (loading) {
    return (
      <div className="min-h-screen pt-24 px-6">
        <div className="max-w-screen-xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 animate-pulse">
          <div className="aspect-[3/4] bg-void-800" />
          <div className="space-y-4 pt-8">
            <div className="h-4 bg-void-800 w-24" />
            <div className="h-10 bg-void-800 w-3/4" />
            <div className="h-8 bg-void-800 w-1/4" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="text-center">
          <p className="text-white/30 font-editorial text-2xl mb-6">Piece not found</p>
          <button onClick={() => onNavigate('shop')} className="btn-ghost">
            Back to Shop
          </button>
        </div>
      </div>
    );
  }

  const conditionColors: Record<Product['condition'], string> = {
    new: 'text-cyber-green border-cyber-green/30 bg-cyber-green/5',
    like_new: 'text-cyber-pink border-cyber-pink/30 bg-cyber-pink/5',
    good: 'text-white/60 border-white/20 bg-white/[0.03]',
    fair: 'text-amber-400/70 border-amber-400/25 bg-amber-400/[0.05]',
  };

  return (
    <div className="min-h-screen pt-20 pb-24">
      {/* Breadcrumb */}
      <div className="max-w-screen-xl mx-auto px-6 py-6">
        <button
          onClick={() => onNavigate('shop')}
          className="flex items-center gap-2 text-white/30 hover:text-white text-xs font-mono tracking-wider uppercase transition-colors"
        >
          <ArrowLeft size={13} />
          Back to Shop
        </button>
      </div>

      <div className="max-w-screen-xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20">
          {/* Gallery */}
          <div className="relative">
            <div className="aspect-[3/4] overflow-hidden bg-void-800 relative group">
              <img
                src={product.images[imageIndex]}
                alt={product.name}
                className="w-full h-full object-cover transition-all duration-700"
              />

              {/* Navigation arrows */}
              {product.images.length > 1 && (
                <>
                  <button
                    onClick={() => setImageIndex((i) => (i - 1 + product.images.length) % product.images.length)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 p-2 glass opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <button
                    onClick={() => setImageIndex((i) => (i + 1) % product.images.length)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2 glass opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <ChevronRight size={16} />
                  </button>
                </>
              )}

              {/* Featured badge */}
              {product.is_featured && (
                <div className="absolute top-4 left-4">
                  <span className="label-tag">Featured Drop</span>
                </div>
              )}
            </div>

            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex gap-2 mt-3">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setImageIndex(i)}
                    className={`w-16 h-20 overflow-hidden border-2 transition-all ${
                      i === imageIndex ? 'border-cyber-pink' : 'border-transparent opacity-50 hover:opacity-80'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product info */}
          <div className="lg:pt-4">
            {/* Brand + category */}
            <div className="flex items-center gap-3 mb-4">
              {product.brand && (
                <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-white/30">
                  {product.brand}
                </span>
              )}
              <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-white/15">
                /
              </span>
              <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-white/30 capitalize">
                {product.category}
              </span>
            </div>

            <h1 className="font-editorial text-3xl md:text-4xl text-white leading-tight mb-6">
              {product.name}
            </h1>

            {/* Price */}
            <div className="flex items-baseline gap-4 mb-6">
              <span className="text-2xl font-semibold text-white tracking-wide">
                {formatPrice(product.price)}
              </span>
              {product.original_price && (
                <span className="text-base text-white/25 line-through">
                  {formatPrice(product.original_price)}
                </span>
              )}
              {product.original_price && (
                <span className="text-xs font-mono text-cyber-pink/70 border border-cyber-pink/20 px-2 py-0.5">
                  -{Math.round((1 - product.price / product.original_price) * 100)}%
                </span>
              )}
            </div>

            {/* Tags row */}
            <div className="flex items-center gap-3 mb-8">
              <span className={`text-[10px] font-mono tracking-[0.15em] uppercase border px-3 py-1.5 ${conditionColors[product.condition]}`}>
                {conditionLabel(product.condition)}
              </span>
              {product.size && (
                <span className="text-[10px] font-mono tracking-[0.15em] uppercase border border-white/15 text-white/50 px-3 py-1.5">
                  Size: {product.size}
                </span>
              )}
            </div>

            {/* Description */}
            {product.description && (
              <p className="text-white/45 text-sm leading-relaxed mb-10 border-l border-white/10 pl-4">
                {product.description}
              </p>
            )}

            {/* Seller info */}
            {product.seller_name && (
              <div className="mb-8 glass p-4">
                <p className="text-[10px] font-mono tracking-[0.2em] uppercase text-white/25 mb-1">
                  Sold by
                </p>
                <p className="text-sm text-white/60 tracking-wide">
                  {product.seller_name}
                  {product.seller_telegram && (
                    <span className="ml-2 text-[#2AABEE]/60">{product.seller_telegram}</span>
                  )}
                </p>
              </div>
            )}

            {/* CTA buttons */}
            <div className="flex flex-col gap-3 mb-10">
              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className={`btn-primary flex items-center justify-center gap-3 ${
                  added ? '!bg-white' : ''
                }`}
              >
                <ShoppingBag size={15} />
                {product.stock === 0 ? 'Sold Out' : added ? 'Added!' : 'Add to Cart'}
              </button>

              <a
                href={telegramMessage}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-telegram justify-center"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                </svg>
                Order via Telegram
              </a>
            </div>

            {/* Shipping info */}
            <div className="space-y-3 border-t border-white/[0.06] pt-8">
              <h3 className="text-[10px] font-mono tracking-[0.25em] uppercase text-white/25 mb-4">
                Shipping Info
              </h3>
              {[
                { icon: <Truck size={14} />, text: 'Nova Poshta delivery across Ukraine' },
                { icon: <Package size={14} />, text: 'Ships within 1–2 business days' },
                { icon: <Shield size={14} />, text: 'Authenticity guaranteed by seller' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 text-sm text-white/35">
                  <span className="text-white/25 shrink-0">{item.icon}</span>
                  {item.text}
                </div>
              ))}
              <div className="mt-4 glass p-4">
                <div className="flex justify-between text-sm">
                  <span className="text-white/35">Shipping cost</span>
                  <span className="text-white/70 font-mono">80 UAH</span>
                </div>
                <div className="flex justify-between text-sm mt-2">
                  <span className="text-white/35">Estimated delivery</span>
                  <span className="text-white/70 font-mono">2–4 days</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
