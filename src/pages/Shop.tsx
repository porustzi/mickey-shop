import { useState, useEffect } from 'react';
import { SlidersHorizontal, X } from 'lucide-react';
import { fetchProducts } from '../lib/api';
import type { Product, Category, SortOption } from '../types';
import ProductCard from '../components/ProductCard';

interface ShopProps {
  onNavigate: (page: string, productId?: string) => void;
  initialCategory?: string;
}

const CATEGORIES: { id: Category; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'streetwear', label: 'Streetwear' },
  { id: 'sneakers', label: 'Sneakers' },
  { id: 'jackets', label: 'Jackets' },
  { id: 'accessories', label: 'Accessories' },
  { id: 'vintage', label: 'Vintage' },
];

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'newest', label: 'Newest First' },
  { value: 'price_asc', label: 'Price: Low to High' },
  { value: 'price_desc', label: 'Price: High to Low' },
];

export default function Shop({ onNavigate, initialCategory }: ShopProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState<Category>(
    (initialCategory as Category) || 'all'
  );
  const [sort, setSort] = useState<SortOption>('newest');
  const [filtersOpen, setFiltersOpen] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchProducts({ category, sort }).then((data) => {
      setProducts(data);
      setLoading(false);
    });
  }, [category, sort]);

  return (
    <div className="min-h-screen pt-24 pb-24">
      {/* Header */}
      <div className="max-w-screen-xl mx-auto px-6 mb-12">
        <div className="border-b border-white/[0.06] pb-8">
          <span className="label-tag mb-4 inline-block">Archive</span>
          <h1 className="font-editorial text-4xl md:text-5xl text-white">
            Shop
          </h1>
          <p className="text-white/30 text-sm mt-3 tracking-wide">
            {loading ? '...' : `${products.length} pieces available`}
          </p>
        </div>
      </div>

      {/* Filters bar */}
      <div className="max-w-screen-xl mx-auto px-6 mb-10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          {/* Category tabs */}
          <div className="flex items-center gap-1 flex-wrap">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setCategory(cat.id)}
                className={`px-4 py-2 text-xs font-mono tracking-[0.15em] uppercase transition-all duration-200 ${
                  category === cat.id
                    ? 'bg-cyber-blue text-void-950 font-semibold'
                    : 'text-white/40 hover:text-white border border-white/10 hover:border-white/25'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Sort + filter toggle */}
          <div className="flex items-center gap-3">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortOption)}
              className="bg-void-900 border border-white/10 text-white/50 text-xs font-mono tracking-wide px-3 py-2 focus:outline-none focus:border-cyber-blue/40 cursor-pointer"
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-screen-xl mx-auto px-6">
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="aspect-[3/4] bg-void-800 animate-pulse" />
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-32">
            <p className="text-white/20 font-editorial text-2xl mb-4">No pieces found</p>
            <p className="text-white/15 text-sm tracking-wide">Try a different category</p>
            <button
              onClick={() => setCategory('all')}
              className="mt-8 btn-ghost text-xs"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} onNavigate={onNavigate} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
