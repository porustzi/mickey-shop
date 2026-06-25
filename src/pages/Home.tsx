import { useEffect, useState, useRef } from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { fetchProducts } from '../lib/api';
import type { Product } from '../types';
import ProductCard from '../components/ProductCard';

interface HomeProps {
  onNavigate: (page: string, productId?: string) => void;
}

const RIBBON_IMAGES = [
  'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=400',
  'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=400',
  'https://images.pexels.com/photos/1124468/pexels-photo-1124468.jpeg?auto=compress&cs=tinysrgb&w=400',
  'https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=400',
  'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=400',
  'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=400',
  'https://images.pexels.com/photos/934070/pexels-photo-934070.jpeg?auto=compress&cs=tinysrgb&w=400',
  'https://images.pexels.com/photos/292999/pexels-photo-292999.jpeg?auto=compress&cs=tinysrgb&w=400',
];

const RIBBON_2 = [
  'https://images.pexels.com/photos/1598508/pexels-photo-1598508.jpeg?auto=compress&cs=tinysrgb&w=400',
  'https://images.pexels.com/photos/1032110/pexels-photo-1032110.jpeg?auto=compress&cs=tinysrgb&w=400',
  'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400',
  'https://images.pexels.com/photos/428338/pexels-photo-428338.jpeg?auto=compress&cs=tinysrgb&w=400',
  'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=400',
  'https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=400',
  'https://images.pexels.com/photos/1124468/pexels-photo-1124468.jpeg?auto=compress&cs=tinysrgb&w=400',
  'https://images.pexels.com/photos/292999/pexels-photo-292999.jpeg?auto=compress&cs=tinysrgb&w=400',
];

function ImageRibbon({ images, direction = 'ltr', speed = 'normal' }: {
  images: string[];
  direction?: 'ltr' | 'rtl';
  speed?: 'normal' | 'slow';
}) {
  const doubled = [...images, ...images];
  return (
    <div className="overflow-hidden w-full">
      <div
        className={`flex gap-3 ${direction === 'ltr' ? 'animate-ribbon-ltr' : 'animate-ribbon-rtl'} ${speed === 'slow' ? '[animation-duration:55s]' : ''}`}
        style={{ width: 'max-content' }}
      >
        {doubled.map((src, i) => (
          <div
            key={i}
            className="w-40 h-52 md:w-56 md:h-72 overflow-hidden shrink-0 relative"
          >
            <img
              src={src}
              alt=""
              className="w-full h-full object-cover opacity-60 hover:opacity-90 transition-opacity duration-500 grayscale hover:grayscale-0"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Home({ onNavigate }: HomeProps) {
  const [featured, setFeatured] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchProducts({ featured: true, limit: 4 }).then((data) => {
      setFeatured(data);
      setLoading(false);
    });
  }, []);

  return (
    <div className="min-h-screen">
      {/* HERO */}
      <section ref={heroRef} className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
        {/* Background glow orbs - gothic red/pink */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-cyber-pink/5 rounded-full blur-[120px] animate-glow-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyber-red/5 rounded-full blur-[100px] animate-glow-pulse animate-delay-300" />
        </div>

        {/* Horizontal decorative line */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyber-pink/20 to-transparent" />

        {/* Center content */}
        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto mt-16">
          {/* Tag */}
          <div className="flex items-center justify-center mb-10">
            <span className="label-tag animate-fade-in">
              Gothic Archive — Ukraine
            </span>
          </div>

          {/* Main headline */}
          <h1 className="font-editorial text-[clamp(4rem,12vw,9rem)] leading-[0.9] tracking-[-0.02em] text-white mb-8 animate-slide-up">
            <span className="block text-white glow-neon">mickey.shop</span>
            <span className="block text-white/15 text-[0.55em] font-light tracking-[0.08em] mt-2">
              GOTHIC ARCHIVE
            </span>
          </h1>

          {/* Subline */}
          <p className="text-white/35 text-sm md:text-base font-light tracking-[0.25em] uppercase mb-12 animate-slide-up animate-delay-200">
            Streetwear. Sneakers. Vintage. Под заказ.
          </p>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up animate-delay-300">
            <button onClick={() => onNavigate('shop')} className="btn-primary">
              Browse Catalog
            </button>
            <button onClick={() => onNavigate('preorder')} className="btn-ghost">
              Под заказ
            </button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce opacity-30">
          <ChevronDown size={20} className="text-white" />
        </div>
      </section>

      {/* IMAGE RIBBONS */}
      <section className="py-4 space-y-3 overflow-hidden bg-gradient-to-b from-void-950 to-void-900">
        <ImageRibbon images={RIBBON_IMAGES} direction="ltr" />
        <ImageRibbon images={RIBBON_2} direction="rtl" speed="slow" />
      </section>

      {/* EDITORIAL STATEMENT */}
      <section className="relative py-28 px-6 bg-void-900">
        <div className="max-w-screen-xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="label-tag mb-8 inline-block">Concept</span>
              <h2 className="font-editorial text-4xl md:text-5xl lg:text-6xl text-white leading-tight mb-8">
                Dark aesthetics,
                <br />
                <em className="text-white/40">crafted for you.</em>
              </h2>
              <p className="text-white/40 text-base leading-relaxed mb-10 max-w-md">
                mickey.shop is a gothic curated archive — streetwear, sneakers, vintage, and made-to-order pieces.
                Every item is handpicked. No noise. Only the black.
              </p>
              <button
                onClick={() => onNavigate('shop')}
                className="group flex items-center gap-3 text-sm tracking-widest uppercase text-cyber-pink hover:text-white transition-colors duration-300"
              >
                Explore Archive
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-200" />
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-6">
              {[
                { value: '200+', label: 'Pieces Archived' },
                { value: '3 Days', label: 'Avg. Delivery' },
                { value: '100%', label: 'Authenticated' },
                { value: 'Под заказ', label: 'Custom Orders' },
              ].map((stat) => (
                <div key={stat.label} className="glass p-6 border-glow">
                  <div className="font-editorial text-3xl text-white mb-2">{stat.value}</div>
                  <div className="text-[10px] font-mono tracking-[0.2em] uppercase text-white/30">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED DROPS */}
      <section className="py-24 px-6 bg-void-950">
        <div className="max-w-screen-xl mx-auto">
          <div className="flex items-end justify-between mb-12">
            <div>
              <span className="label-tag mb-4 inline-block">Latest Drops</span>
              <h2 className="font-editorial text-3xl md:text-4xl text-white">
                Featured Archive
              </h2>
            </div>
            <button
              onClick={() => onNavigate('shop')}
              className="hidden sm:flex items-center gap-2 text-xs tracking-widest uppercase text-white/30 hover:text-cyber-pink transition-colors duration-200"
            >
              View All <ArrowRight size={12} />
            </button>
          </div>

          {loading ? (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="aspect-[3/4] bg-void-800 animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {featured.map((product) => (
                <ProductCard key={product.id} product={product} onNavigate={onNavigate} />
              ))}
            </div>
          )}

          <div className="mt-12 text-center sm:hidden">
            <button onClick={() => onNavigate('shop')} className="btn-ghost">
              View All
            </button>
          </div>
        </div>
      </section>

      {/* CATEGORIES STRIP */}
      <section className="py-20 px-6 bg-void-900 section-divider">
        <div className="max-w-screen-xl mx-auto">
          <span className="label-tag mb-8 inline-block">Browse by Category</span>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {[
              { id: 'streetwear', label: 'Streetwear', img: 'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=600' },
              { id: 'sneakers', label: 'Sneakers', img: 'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=600' },
              { id: 'jackets', label: 'Jackets', img: 'https://images.pexels.com/photos/1124468/pexels-photo-1124468.jpeg?auto=compress&cs=tinysrgb&w=600' },
              { id: 'accessories', label: 'Accessories', img: 'https://images.pexels.com/photos/934070/pexels-photo-934070.jpeg?auto=compress&cs=tinysrgb&w=600' },
              { id: 'vintage', label: 'Vintage', img: 'https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=600' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => onNavigate('shop', cat.id)}
                className="group relative aspect-[3/4] overflow-hidden"
              >
                <img
                  src={cat.img}
                  alt={cat.label}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-void-950/60 group-hover:bg-void-950/30 transition-colors duration-500" />
                <div className="absolute inset-0 flex items-end p-4">
                  <span className="text-white text-xs font-mono tracking-[0.2em] uppercase">
                    {cat.label}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* TELEGRAM CTA */}
      <section className="py-20 px-6 bg-void-950">
        <div className="max-w-2xl mx-auto text-center">
          <span className="label-tag mb-6 inline-block">Direct Channel</span>
          <h2 className="font-editorial text-3xl md:text-4xl text-white mb-6">
            Want something unique?<br />
            <em className="text-white/30">Order под заказ.</em>
          </h2>
          <p className="text-white/35 text-sm mb-10 leading-relaxed">
            Custom pieces, bespoke tailoring, exclusive drops — order via Telegram and we'll make it happen.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://t.me/mickey_shop"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-telegram inline-flex mx-auto"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
              </svg>
              Message on Telegram
            </a>
            <button onClick={() => onNavigate('preorder')} className="btn-ghost">
              Под заказ
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
