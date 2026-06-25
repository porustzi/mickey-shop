import { useState, useEffect } from 'react';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface NavProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export default function Nav({ currentPage, onNavigate }: NavProps) {
  const { itemCount } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = [
    { id: 'home', label: 'Home' },
    { id: 'shop', label: 'Shop' },
    { id: 'preorder', label: 'Под заказ' },
    { id: 'about', label: 'About' },
  ];

  const navigate = (page: string) => {
    onNavigate(page);
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'bg-void-950/90 backdrop-blur-xl border-b border-white/[0.06]' : 'bg-transparent'
        }`}
      >
        <div className="max-w-screen-xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => navigate('home')}
            className="flex items-center gap-3 group"
          >
            <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-cyber-pink/60 border border-cyber-pink/20 px-2 py-0.5 group-hover:text-cyber-pink group-hover:border-cyber-pink/50 transition-all duration-300">
              UA
            </span>
            <span className="font-editorial text-lg tracking-[0.05em] text-white font-bold">
              mickey.shop
            </span>
          </button>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <button
                key={link.id}
                onClick={() => navigate(link.id)}
                className={`text-xs tracking-[0.2em] uppercase font-medium transition-all duration-200 ${
                  currentPage === link.id
                    ? 'text-cyber-pink'
                    : 'text-white/50 hover:text-white'
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('cart')}
              className="relative group p-2 text-white/60 hover:text-white transition-colors duration-200"
              aria-label="Cart"
            >
              <ShoppingBag size={18} />
              {itemCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-cyber-pink text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 text-white/60 hover:text-white transition-colors"
              aria-label="Menu"
            >
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-500 ${
          menuOpen ? 'pointer-events-auto' : 'pointer-events-none'
        }`}
      >
        <div
          className={`absolute inset-0 bg-void-950/95 backdrop-blur-xl transition-opacity duration-500 ${
            menuOpen ? 'opacity-100' : 'opacity-0'
          }`}
        />
        <nav
          className={`relative h-full flex flex-col items-center justify-center gap-8 transition-all duration-500 ${
            menuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
          }`}
        >
          {links.map((link) => (
            <button
              key={link.id}
              onClick={() => navigate(link.id)}
              className={`text-2xl font-editorial tracking-widest transition-all duration-200 ${
                currentPage === link.id ? 'text-cyber-pink' : 'text-white/70 hover:text-white'
              }`}
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => navigate('cart')}
            className="text-2xl font-editorial tracking-widest text-white/70 hover:text-white transition-colors"
          >
            Cart {itemCount > 0 && `(${itemCount})`}
          </button>
        </nav>
      </div>
    </>
  );
}
