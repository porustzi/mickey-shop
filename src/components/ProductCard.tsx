import { ShoppingBag, ArrowUpRight } from 'lucide-react';
import type { Product } from '../types';
import { formatPrice, conditionLabel } from '../lib/api';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
  onNavigate: (page: string, productId?: string) => void;
  aspect?: 'portrait' | 'square';
}

export default function ProductCard({ product, onNavigate, aspect = 'portrait' }: ProductCardProps) {
  const { addItem } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem(product);
  };

  const conditionColors: Record<Product['condition'], string> = {
    new: 'text-cyber-green border-cyber-green/30',
    like_new: 'text-cyber-blue border-cyber-blue/30',
    good: 'text-white/50 border-white/20',
    fair: 'text-amber-400/60 border-amber-400/20',
  };

  return (
    <div
      className="product-card group"
      onClick={() => onNavigate('product', product.id)}
    >
      {/* Image */}
      <div className={`overflow-hidden bg-void-800 relative ${aspect === 'portrait' ? 'aspect-[3/4]' : 'aspect-square'}`}>
        <img
          src={product.images[0]}
          alt={product.name}
          className="product-image h-full"
          loading="lazy"
        />
        <div className="card-overlay" />

        {/* Hover overlay actions */}
        <div className="absolute inset-0 flex items-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={handleAddToCart}
            className="w-full py-2.5 bg-cyber-blue text-void-950 text-xs font-semibold tracking-widest uppercase
                       flex items-center justify-center gap-2 hover:bg-white transition-colors duration-200"
          >
            <ShoppingBag size={13} />
            Add to Cart
          </button>
        </div>

        {/* Featured badge */}
        {product.is_featured && (
          <div className="absolute top-3 left-3">
            <span className="label-tag">Drop</span>
          </div>
        )}

        {/* Condition */}
        <div className="absolute top-3 right-3">
          <span className={`text-[9px] font-mono tracking-[0.15em] uppercase border px-2 py-0.5 bg-void-950/60 backdrop-blur-sm ${conditionColors[product.condition]}`}>
            {conditionLabel(product.condition)}
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="pt-3 pb-1">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            {product.brand && (
              <p className="text-[10px] font-mono tracking-[0.2em] uppercase text-white/30 mb-0.5 truncate">
                {product.brand}
              </p>
            )}
            <h3 className="text-sm text-white/80 font-medium leading-tight truncate group-hover:text-white transition-colors duration-200">
              {product.name}
            </h3>
          </div>
          <ArrowUpRight
            size={14}
            className="shrink-0 text-white/20 group-hover:text-cyber-blue mt-0.5 transition-colors duration-200"
          />
        </div>

        <div className="flex items-center justify-between mt-2">
          <div className="flex items-baseline gap-2">
            <span className="text-sm font-semibold text-white tracking-wide">
              {formatPrice(product.price)}
            </span>
            {product.original_price && (
              <span className="text-xs text-white/25 line-through">
                {formatPrice(product.original_price)}
              </span>
            )}
          </div>
          {product.size && (
            <span className="text-[10px] font-mono text-white/30 tracking-wider">
              {product.size}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
