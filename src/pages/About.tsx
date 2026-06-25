interface AboutProps {
  onNavigate: (page: string) => void;
}

export default function About({ onNavigate }: AboutProps) {
  return (
    <div className="min-h-screen pt-24 pb-24">
      {/* Hero */}
      <div className="max-w-screen-xl mx-auto px-6 py-16">
        <div className="border-b border-white/[0.06] pb-16 mb-16">
          <span className="label-tag mb-6 inline-block">001 / Story</span>
          <h1 className="font-editorial text-[clamp(3rem,8vw,7rem)] leading-[0.9] text-white tracking-[-0.02em] mb-8">
            We archive<br />
            <em className="text-white/20">the culture.</em>
          </h1>
          <p className="text-white/40 text-base md:text-lg leading-relaxed max-w-xl">
            VOID is a Ukrainian curated resale platform for people who understand that the best pieces
            aren't always found in retail stores.
          </p>
        </div>

        {/* Content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
          {/* Left: Images collage */}
          <div className="grid grid-cols-2 gap-3">
            <div className="col-span-2 aspect-video overflow-hidden">
              <img
                src="https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="VOID Archive"
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
              />
            </div>
            <div className="aspect-square overflow-hidden">
              <img
                src="https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=400"
                alt=""
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
              />
            </div>
            <div className="aspect-square overflow-hidden">
              <img
                src="https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=400"
                alt=""
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
              />
            </div>
          </div>

          {/* Right: text */}
          <div className="flex flex-col justify-center space-y-8">
            <div>
              <h2 className="font-editorial text-2xl text-white mb-4">
                Curated by people who care.
              </h2>
              <p className="text-white/40 text-sm leading-relaxed">
                Every item on VOID goes through a manual review. We don't accept listings that don't
                meet our standards. Condition, authenticity, and presentation — all matter here.
              </p>
            </div>

            <div>
              <h2 className="font-editorial text-2xl text-white mb-4">
                No account needed.
              </h2>
              <p className="text-white/40 text-sm leading-relaxed">
                We believe the browsing experience should be frictionless. Find something you want,
                fill out a simple form, and it ships directly from the seller via Nova Poshta.
              </p>
            </div>

            <div>
              <h2 className="font-editorial text-2xl text-white mb-4">
                Telegram-first support.
              </h2>
              <p className="text-white/40 text-sm leading-relaxed">
                Got questions? Want to verify something before you buy? Our managers are reachable on
                Telegram and respond fast. Human, not bots.
              </p>
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="section-divider pt-16 mb-16">
          <span className="label-tag mb-10 inline-block">002 / Principles</span>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                number: '01',
                title: 'Authentic Only',
                body: 'No replicas. Every item is verified before listing. Sellers are responsible for the condition described.'
              },
              {
                number: '02',
                title: 'Editorial Curation',
                body: 'We don\'t list everything. We list what\'s worth wearing. Quality over quantity, always.'
              },
              {
                number: '03',
                title: 'Fast & Direct',
                body: 'Seller ships directly via Nova Poshta. No middleman warehousing. Your order is on its way within 2 days.'
              },
            ].map((item) => (
              <div key={item.number} className="glass p-7 border-glow glass-hover">
                <p className="font-mono text-[10px] text-cyber-blue/50 tracking-[0.3em] mb-5">
                  {item.number}
                </p>
                <h3 className="font-editorial text-xl text-white mb-3">{item.title}</h3>
                <p className="text-white/35 text-sm leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="section-divider pt-16 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <h2 className="font-editorial text-3xl text-white mb-2">
              Ready to browse?
            </h2>
            <p className="text-white/30 text-sm">The archive is always being updated.</p>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={() => onNavigate('shop')} className="btn-primary">
              Shop Now
            </button>
            <a
              href="https://t.me/void_store"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-telegram"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
              </svg>
              Telegram
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
