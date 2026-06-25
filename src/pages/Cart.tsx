import { Trash2, Plus, Minus, ArrowRight, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../lib/api';

interface CartProps {
  onNavigate: (page: string) => void;
}

const SHIPPING = 80;

export default function Cart({ onNavigate }: CartProps) {
  const { items, removeItem, updateQuantity, total, itemCount } = useCart();

  if (itemCount === 0) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center px-6">
        <div className="text-center">
          <ShoppingBag size={48} className="text-white/10 mx-auto mb-6" />
          <p className="font-editorial text-2xl text-white/30 mb-3">Cart is empty</p>
          <p className="text-white/20 text-sm mb-10 tracking-wide">No pieces added yet.</p>
          <button onClick={() => onNavigate('shop')} className="btn-primary">
            Browse Archive
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-24">
      <div className="max-w-screen-lg mx-auto px-6">
        {/* Header */}
        <div className="border-b border-white/[0.06] pb-8 mb-10">
          <span className="label-tag mb-3 inline-block">Bag</span>
          <h1 className="font-editorial text-4xl text-white">
            Your Cart
          </h1>
          <p className="text-white/30 text-sm mt-2">{itemCount} {itemCount === 1 ? 'piece' : 'pieces'}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Items list */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div
                key={item.product.id}
                className="glass p-4 flex gap-4 group"
              >
                {/* Thumbnail */}
                <button
                  onClick={() => onNavigate('product')}
                  className="shrink-0 w-20 h-28 overflow-hidden bg-void-800"
                >
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-full h-full object-cover"
                  />
                </button>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      {item.product.brand && (
                        <p className="text-[10px] font-mono tracking-[0.2em] uppercase text-white/25 mb-0.5">
                          {item.product.brand}
                        </p>
                      )}
                      <h3 className="text-sm text-white/80 font-medium leading-snug">
                        {item.product.name}
                      </h3>
                      {item.product.size && (
                        <p className="text-xs text-white/30 mt-1 font-mono">
                          Size: {item.product.size}
                        </p>
                      )}
                    </div>
                    <button
                      onClick={() => removeItem(item.product.id)}
                      className="p-1.5 text-white/20 hover:text-red-400/60 transition-colors shrink-0"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>

                  {/* Quantity + price */}
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="w-6 h-6 border border-white/15 flex items-center justify-center text-white/50 hover:border-white/35 hover:text-white transition-all"
                      >
                        <Minus size={10} />
                      </button>
                      <span className="text-sm text-white/70 font-mono w-4 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.product.id, Math.min(item.quantity + 1, item.product.stock))}
                        className="w-6 h-6 border border-white/15 flex items-center justify-center text-white/50 hover:border-white/35 hover:text-white transition-all"
                      >
                        <Plus size={10} />
                      </button>
                    </div>
                    <span className="text-sm font-semibold text-white">
                      {formatPrice(item.product.price * item.quantity)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order summary */}
          <div className="lg:col-span-1">
            <div className="glass p-6 sticky top-24">
              <h3 className="text-[10px] font-mono tracking-[0.25em] uppercase text-white/30 mb-6">
                Order Summary
              </h3>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-white/40">Subtotal</span>
                  <span className="text-white/70">{formatPrice(total)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/40">Shipping (Nova Poshta)</span>
                  <span className="text-white/70">{formatPrice(SHIPPING)}</span>
                </div>
                <div className="border-t border-white/[0.06] pt-3 flex justify-between">
                  <span className="text-sm font-medium text-white/70">Total</span>
                  <span className="text-sm font-semibold text-white">{formatPrice(total + SHIPPING)}</span>
                </div>
              </div>

              <button
                onClick={() => onNavigate('checkout')}
                className="btn-primary w-full flex items-center justify-center gap-2"
              >
                Checkout
                <ArrowRight size={14} />
              </button>

              <button
                onClick={() => onNavigate('shop')}
                className="w-full mt-3 text-xs text-white/25 hover:text-white/50 transition-colors tracking-wide py-2"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
