import { useState } from 'react';
import { Check, ArrowLeft, Loader } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatPrice, placeOrder, buildTelegramOrderMessage } from '../lib/api';
import type { CheckoutFormData } from '../types';

interface CheckoutProps {
  onNavigate: (page: string) => void;
}

const SHIPPING = 80;

const EMPTY_FORM: CheckoutFormData = {
  full_name: '',
  phone: '',
  city: '',
  nova_poshta_branch: '',
  comment: '',
};

export default function Checkout({ onNavigate }: CheckoutProps) {
  const { items, total, clearCart } = useCart();
  const [form, setForm] = useState<CheckoutFormData>(EMPTY_FORM);
  const [errors, setErrors] = useState<Partial<CheckoutFormData>>({});
  const [submitting, setSubmitting] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);

  const validate = (): boolean => {
    const newErrors: Partial<CheckoutFormData> = {};
    if (!form.full_name.trim()) newErrors.full_name = 'Required';
    if (!form.phone.trim()) newErrors.phone = 'Required';
    else if (!/^\+?[\d\s\-()]{10,}$/.test(form.phone)) newErrors.phone = 'Invalid phone number';
    if (!form.city.trim()) newErrors.city = 'Required';
    if (!form.nova_poshta_branch.trim()) newErrors.nova_poshta_branch = 'Required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    try {
      const result = await placeOrder(form, items, total, SHIPPING);
      if (result) {
        setOrderId(result.id);
        clearCart();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const telegramMsg = buildTelegramOrderMessage(form, items, total + SHIPPING);

  if (orderId) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center px-6">
        <div className="text-center max-w-md animate-fade-in">
          <div className="w-16 h-16 border border-cyber-blue/40 flex items-center justify-center mx-auto mb-8">
            <Check size={28} className="text-cyber-blue" />
          </div>
          <h1 className="font-editorial text-4xl text-white mb-4">Order Confirmed</h1>
          <p className="text-white/40 text-sm leading-relaxed mb-3">
            Your order has been placed. Our manager will contact you shortly via phone or Telegram.
          </p>
          <p className="text-[10px] font-mono text-white/20 tracking-widest mb-10">
            ORDER #{orderId.slice(0, 8).toUpperCase()}
          </p>

          <div className="flex flex-col gap-3">
            <a
              href={`https://t.me/void_store?text=${telegramMsg}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-telegram justify-center"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
              </svg>
              Send to Telegram
            </a>
            <button onClick={() => onNavigate('shop')} className="btn-ghost">
              Back to Shop
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    onNavigate('cart');
    return null;
  }

  return (
    <div className="min-h-screen pt-24 pb-24">
      <div className="max-w-screen-lg mx-auto px-6">
        {/* Header */}
        <div className="mb-10">
          <button
            onClick={() => onNavigate('cart')}
            className="flex items-center gap-2 text-white/30 hover:text-white text-xs font-mono tracking-wider uppercase transition-colors mb-8"
          >
            <ArrowLeft size={13} />
            Back to Cart
          </button>
          <span className="label-tag mb-3 inline-block">Checkout</span>
          <h1 className="font-editorial text-4xl text-white">Complete Order</h1>
          <p className="text-white/30 text-sm mt-2">No account required.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Form */}
          <form onSubmit={handleSubmit} className="lg:col-span-3 space-y-6">
            <h2 className="text-[10px] font-mono tracking-[0.25em] uppercase text-white/30 border-b border-white/[0.06] pb-4">
              Delivery Information
            </h2>

            {/* Full name */}
            <div>
              <label className="block text-xs font-mono tracking-[0.15em] uppercase text-white/30 mb-2">
                Full Name *
              </label>
              <input
                type="text"
                value={form.full_name}
                onChange={(e) => setForm((f) => ({ ...f, full_name: e.target.value }))}
                placeholder="Іванов Іван Іванович"
                className={`input-field ${errors.full_name ? 'border-red-500/50' : ''}`}
              />
              {errors.full_name && (
                <p className="text-red-400/60 text-xs mt-1 font-mono">{errors.full_name}</p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-xs font-mono tracking-[0.15em] uppercase text-white/30 mb-2">
                Phone Number *
              </label>
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                placeholder="+380 XX XXX XX XX"
                className={`input-field ${errors.phone ? 'border-red-500/50' : ''}`}
              />
              {errors.phone && (
                <p className="text-red-400/60 text-xs mt-1 font-mono">{errors.phone}</p>
              )}
            </div>

            {/* City */}
            <div>
              <label className="block text-xs font-mono tracking-[0.15em] uppercase text-white/30 mb-2">
                City *
              </label>
              <input
                type="text"
                value={form.city}
                onChange={(e) => setForm((f) => ({ ...f, city: e.target.value }))}
                placeholder="Київ"
                className={`input-field ${errors.city ? 'border-red-500/50' : ''}`}
              />
              {errors.city && (
                <p className="text-red-400/60 text-xs mt-1 font-mono">{errors.city}</p>
              )}
            </div>

            {/* Nova Poshta branch */}
            <div>
              <label className="block text-xs font-mono tracking-[0.15em] uppercase text-white/30 mb-2">
                Nova Poshta Branch *
              </label>
              <input
                type="text"
                value={form.nova_poshta_branch}
                onChange={(e) => setForm((f) => ({ ...f, nova_poshta_branch: e.target.value }))}
                placeholder="Відділення №12 або Поштомат №..."
                className={`input-field ${errors.nova_poshta_branch ? 'border-red-500/50' : ''}`}
              />
              {errors.nova_poshta_branch && (
                <p className="text-red-400/60 text-xs mt-1 font-mono">{errors.nova_poshta_branch}</p>
              )}
            </div>

            {/* Comment */}
            <div>
              <label className="block text-xs font-mono tracking-[0.15em] uppercase text-white/30 mb-2">
                Comment <span className="text-white/15">(optional)</span>
              </label>
              <textarea
                value={form.comment}
                onChange={(e) => setForm((f) => ({ ...f, comment: e.target.value }))}
                placeholder="Any additional information about your order..."
                rows={3}
                className="input-field resize-none"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={submitting}
              className="btn-primary w-full flex items-center justify-center gap-3 mt-4"
            >
              {submitting ? (
                <>
                  <Loader size={15} className="animate-spin" />
                  Placing Order...
                </>
              ) : (
                'Confirm Order'
              )}
            </button>

            <p className="text-white/20 text-xs text-center tracking-wide leading-relaxed">
              By placing an order you agree that the manager will contact you via phone or Telegram to confirm delivery details.
            </p>
          </form>

          {/* Order summary */}
          <div className="lg:col-span-2">
            <div className="glass p-6 sticky top-24">
              <h3 className="text-[10px] font-mono tracking-[0.25em] uppercase text-white/30 mb-6">
                Order Summary
              </h3>

              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <div key={item.product.id} className="flex gap-3">
                    <div className="w-12 h-16 overflow-hidden bg-void-800 shrink-0">
                      <img src={item.product.images[0]} alt="" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-white/70 leading-snug truncate">{item.product.name}</p>
                      {item.product.size && (
                        <p className="text-[10px] text-white/30 font-mono mt-0.5">Size: {item.product.size}</p>
                      )}
                      <p className="text-xs font-semibold text-white mt-1">
                        {formatPrice(item.product.price * item.quantity)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-white/[0.06] pt-4 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-white/40">Subtotal</span>
                  <span className="text-white/70">{formatPrice(total)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/40">Nova Poshta</span>
                  <span className="text-white/70">{formatPrice(SHIPPING)}</span>
                </div>
                <div className="flex justify-between border-t border-white/[0.06] pt-3">
                  <span className="text-sm font-medium text-white/70">Total</span>
                  <span className="text-sm font-bold text-white">{formatPrice(total + SHIPPING)}</span>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/[0.06]">
                <p className="text-[10px] font-mono text-white/20 tracking-[0.15em] uppercase mb-2">Estimated Delivery</p>
                <p className="text-xs text-white/40">2–4 business days via Nova Poshta</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
