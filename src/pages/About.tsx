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
            Gothic<br />
            <em className="text-white/20">archive.</em>
          </h1>
          <p className="text-white/40 text-base md:text-lg leading-relaxed max-w-xl">
            mickey.shop is a Ukrainian gothic curated archive — streetwear, sneakers, vintage, and made-to-order pieces.
            Dark aesthetics, zero compromise.
          </p>
        </div>

        {/* Content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
          {/* Left: Images collage */}
          <div className="grid grid-cols-2 gap-3">
            <div className="col-span-2 aspect-video overflow-hidden">
              <img
                src="https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="mickey.shop Archive"
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
                Dark curation.
              </h2>
              <p className="text-white/40 text-sm leading-relaxed">
                Every item on mickey.shop goes through a manual review. We don't accept listings that don't
                meet our dark aesthetic standards. Condition, authenticity, presentation — all matter here.
              </p>
            </div>

            <div>
              <h2 className="font-editorial text-2xl text-white mb-4">
                No account needed.
              </h2>
              <p className="text-white/40 text-sm leading-relaxed">
                Browse freely. Find something you want, fill out a simple form, and it ships directly
                from the seller via Nova Poshta.
              </p>
            </div>

            <div>
              <h2 className="font-editorial text-2xl text-white mb-4">
                Telegram-first. Под заказ.
              </h2>
              <p className="text-white/40 text-sm leading-relaxed">
                Want something custom? Order под заказ via Telegram. Our crafters bring your vision to life —
                bespoke pieces made just for you.
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
                body: 'No replicas. Every item is verified before listing. Dark aesthetics, real pieces.'
              },
              {
                number: '02',
                title: 'Gothic Curation',
                body: 'We don\'t list everything. We list what fits the dark aesthetic. Quality over quantity.'
              },
              {
                number: '03',
                title: 'Под заказ',
                body: 'Custom made-to-order pieces. Choose, order via Telegram, and we craft it for you.'
              },
            ].map((item) => (
              <div key={item.number} className="glass p-7 border-glow glass-hover">
                <p className="font-mono text-[10px] text-cyber-pink/50 tracking-[0.3em] mb-5">
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
              Embrace the dark.
            </h2>
            <p className="text-white/30 text-sm">Browse the archive or order под заказ.</p>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={() => onNavigate('shop')} className="btn-primary">
              Shop Now
            </button>
            <button onClick={() => onNavigate('preorder')} className="btn-ghost">
              Под заказ
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
