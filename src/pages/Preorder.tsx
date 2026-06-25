import { useState } from 'react';
import { Clock, Package, ChevronRight, Send } from 'lucide-react';
import type { PreorderProduct } from '../types';


const PREORDER_ITEMS: PreorderProduct[] = [
  {
    id: 'po-1',
    name: 'Custom Gothic Hoodie',
    description: 'Hand-printed oversized hoodie with gothic motifs. Choose your size and design variant.',
    price: 3200,
    category: 'streetwear',
    images: ['https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=600'],
    delivery_time: '7–10 days',
    deposit: 50,
  },
  {
    id: 'po-2',
    name: 'Bespoke Leather Jacket',
    description: 'Custom-made genuine leather jacket. Made to measure with your specifications.',
    price: 12500,
    category: 'jackets',
    images: ['https://images.pexels.com/photos/1124468/pexels-photo-1124468.jpeg?auto=compress&cs=tinysrgb&w=600'],
    delivery_time: '14–21 days',
    deposit: 40,
  },
  {
    id: 'po-3',
    name: 'Artisan Sneakers',
    description: 'Handcrafted leather sneakers. Custom colorways available upon request.',
    price: 5800,
    category: 'sneakers',
    images: ['https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=600'],
    delivery_time: '10–14 days',
    deposit: 30,
  },
  {
    id: 'po-4',
    name: 'Gothic Silver Ring',
    description: 'Handcrafted sterling silver ring with black onyx. Made to order in your size.',
    price: 2400,
    category: 'accessories',
    images: ['https://images.pexels.com/photos/934070/pexels-photo-934070.jpeg?auto=compress&cs=tinysrgb&w=600'],
    delivery_time: '5–7 days',
    deposit: 50,
  },
  {
    id: 'po-5',
    name: 'Custom Vintage Tee',
    description: 'Premium heavyweight cotton tee with custom gothic print. Hand-pulled screen print.',
    price: 1800,
    category: 'streetwear',
    images: ['https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=600'],
    delivery_time: '5–8 days',
    deposit: 30,
  },
  {
    id: 'po-6',
    name: 'Tailored Trousers',
    description: 'Made-to-measure wool blend trousers. Choose your fit, fabric, and hardware.',
    price: 4500,
    category: 'vintage',
    images: ['https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=600'],
    delivery_time: '10–14 days',
    deposit: 40,
  },
];

export default function Preorder() {
  const [selected, setSelected] = useState<string | null>(null);

  const toggleItem = (id: string) => {
    setSelected(selected === id ? null : id);
  };

  return (
    <div className="min-h-screen pt-24 pb-24">
      {/* Header */}
      <div className="max-w-screen-xl mx-auto px-6 mb-12">
        <div className="border-b border-white/[0.04] pb-8">
          <span className="label-tag mb-4 inline-block">Made to Order</span>
          <h1 className="font-editorial text-4xl md:text-5xl text-white">
            Под заказ
          </h1>
          <p className="text-white/30 text-sm mt-3 tracking-wide max-w-lg">
            Exclusive pieces crafted on demand. Each item is made specifically for you —
            choose, order, and we'll bring it to life.
          </p>
        </div>
      </div>

      {/* Items grid */}
      <div className="max-w-screen-xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PREORDER_ITEMS.map((item) => (
            <div
              key={item.id}
              className="glass border border-white/[0.06] overflow-hidden group transition-all duration-300 hover:border-cyber-pink/30"
            >
              {/* Image */}
              <div className="aspect-[4/3] overflow-hidden bg-void-800 relative">
                <img
                  src={item.images[0]}
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 grayscale hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-void-950/80 to-transparent" />
                <div className="absolute top-3 left-3">
                  <span className="label-tag text-[8px]">{item.category}</span>
                </div>
              </div>

              {/* Info */}
              <div className="p-5">
                <h3 className="font-editorial text-lg text-white mb-2">{item.name}</h3>
                <p className="text-white/35 text-xs leading-relaxed mb-4 line-clamp-2">
                  {item.description}
                </p>

                {/* Price & Delivery */}
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="text-xs text-white/25 font-mono tracking-wider">Price</span>
                    <p className="text-lg font-semibold text-white">
                      {new Intl.NumberFormat('uk-UA', { style: 'currency', currency: 'UAH', minimumFractionDigits: 0 }).format(item.price)}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-white/25 font-mono tracking-wider">Delivery</span>
                    <div className="flex items-center gap-1.5 text-sm text-cyber-pink/80">
                      <Clock size={12} />
                      {item.delivery_time}
                    </div>
                  </div>
                </div>

                {/* Deposit info */}
                <div className="flex items-center gap-2 mb-4 text-[10px] font-mono text-white/25 tracking-wider">
                  <Package size={10} />
                  Deposit: {item.deposit}% upfront
                </div>

                {/* CTA */}
                <button
                  onClick={() => toggleItem(item.id)}
                  className="w-full py-2.5 border border-cyber-pink/30 text-cyber-pink text-xs font-semibold tracking-widest uppercase
                             flex items-center justify-center gap-2 hover:bg-cyber-pink hover:text-white transition-all duration-300"
                >
                  {selected === item.id ? 'Hide Details' : 'Order via Telegram'}
                  <ChevronRight size={12} className={`transition-transform duration-300 ${selected === item.id ? 'rotate-90' : ''}`} />
                </button>

                {/* Expanded details */}
                {selected === item.id && (
                  <div className="mt-4 pt-4 border-t border-white/[0.06] animate-fade-in">
                    <p className="text-white/45 text-xs leading-relaxed mb-3">
                      {item.description}
                    </p>
                    <a
                      href={`https://t.me/mickey_shop?text=${encodeURIComponent(`Hi! I want to order: ${item.name} (${item.price} UAH, delivery ${item.delivery_time})`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-telegram justify-center text-xs w-full"
                    >
                      <Send size={12} />
                      Send to Telegram
                    </a>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}