interface FooterProps {
  onNavigate: (page: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="border-t border-white/[0.06] bg-void-950">
      <div className="max-w-screen-xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-cyber-pink/60 border border-cyber-pink/20 px-2 py-0.5">
                UA
              </span>
              <span className="font-editorial text-lg tracking-[0.05em] text-white font-bold">
                mickey.shop
              </span>
            </div>
            <p className="text-white/35 text-sm leading-relaxed max-w-xs">
              Gothic curated archive. Streetwear, sneakers, vintage, под заказ. Dark aesthetics only.
            </p>
          </div>

          {/* Nav */}
          <div>
            <h4 className="text-[10px] font-mono tracking-[0.25em] uppercase text-white/30 mb-5">
              Navigation
            </h4>
            <ul className="space-y-3">
              {[
                { id: 'home', label: 'Home' },
                { id: 'shop', label: 'Shop' },
                { id: 'preorder', label: 'Под заказ' },
                { id: 'about', label: 'About' },
                { id: 'cart', label: 'Cart' },
              ].map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => onNavigate(link.id)}
                    className="text-sm text-white/40 hover:text-white/80 transition-colors duration-200 tracking-wide"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[10px] font-mono tracking-[0.25em] uppercase text-white/30 mb-5">
              Contact
            </h4>
            <ul className="space-y-3">
              <li>
                  <a
                    href="https://t.me/mickey_shop"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-white/40 hover:text-[#2AABEE] transition-colors duration-200 tracking-wide flex items-center gap-2"
                  >
                    <span>Telegram</span>
                    <span className="text-[10px] text-white/20">@mickey_shop</span>
                  </a>
              </li>
              <li>
                <span className="text-sm text-white/40 tracking-wide">
                  Delivery via Nova Poshta
                </span>
              </li>
              <li>
                <span className="text-sm text-white/25 tracking-wide">
                  Ukraine
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/[0.04] flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white/20 text-xs font-mono tracking-wider">
              &copy; {new Date().getFullYear()} mickey.shop — Gothic Archive
            </p>
            <p className="text-white/15 text-xs font-mono tracking-wider">
              UA / EST. 2024
            </p>
        </div>
      </div>
    </footer>
  );
}
