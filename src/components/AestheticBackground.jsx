import { Link } from 'react-router-dom';

const AestheticBackground = ({ children, badgeTo = '/register', badgeText = 'sign up' }) => {
  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between p-4 sm:p-8 bg-[#fbfbfa] text-[#18181b] overflow-hidden selection:bg-[#f89bb4]/30 selection:text-[#18181b]">
      
      {/* ========================================================================= */}
      {/* ABSTRACT, SOFT MATCHA GREEN & STRAWBERRY MILK PINK AURA */}
      {/* (No hard edges, no orange/yellow, pure organic color bleed) */}
      {/* ========================================================================= */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
        
        {/* Main Abstract Gradient Container on the right */}
        <div className="absolute top-1/2 -right-[10%] sm:right-[0%] md:right-[4%] -translate-y-1/2 w-[540px] h-[540px] sm:w-[700px] sm:h-[700px] lg:w-[820px] lg:h-[820px]">
          
          {/* Earthy Matcha Green - organic sweeping blob (bottom / left) */}
          <div 
            className="absolute bottom-[8%] left-[6%] w-[380px] h-[340px] sm:w-[480px] sm:h-[400px] bg-[#6e8f52] opacity-85"
            style={{
              borderRadius: '52% 48% 63% 37% / 41% 58% 42% 59%',
              filter: 'blur(75px)',
              transform: 'rotate(-18deg)',
            }}
          />

          {/* Deep Earthy Matcha Core for richness */}
          <div 
            className="absolute bottom-[22%] left-[18%] w-[280px] h-[260px] sm:w-[360px] sm:h-[320px] bg-[#5a7840] opacity-80"
            style={{
              borderRadius: '58% 42% 48% 52% / 46% 54% 46% 54%',
              filter: 'blur(65px)',
            }}
          />

          {/* Strawberry Milk Pink - sweeping organic blob (top / right) */}
          <div 
            className="absolute top-[6%] right-[8%] w-[420px] h-[360px] sm:w-[500px] sm:h-[420px] bg-[#f89bb4] opacity-90"
            style={{
              borderRadius: '63% 37% 54% 46% / 48% 62% 38% 52%',
              filter: 'blur(70px)',
              transform: 'rotate(22deg)',
            }}
          />

          {/* Strawberry Milk Pink - vivid side wash */}
          <div 
            className="absolute top-[28%] right-[0%] w-[320px] h-[360px] sm:w-[400px] sm:h-[440px] bg-[#f57b9f] opacity-85"
            style={{
              borderRadius: '45% 55% 65% 35% / 54% 42% 58% 46%',
              filter: 'blur(75px)',
              transform: 'rotate(8deg)',
            }}
          />

          {/* Soft Creamy Pink blend bridging across */}
          <div 
            className="absolute top-[44%] right-[22%] w-[260px] h-[260px] sm:w-[320px] h-[320px] bg-[#fca5b7] opacity-65"
            style={{
              borderRadius: '50% 50% 40% 60% / 60% 40% 60% 40%',
              filter: 'blur(70px)',
            }}
          />

          {/* Abstract soft negative space (clears the center naturally without hard edges) */}
          <div 
            className="absolute top-[34%] left-[28%] w-[260px] h-[260px] sm:w-[340px] sm:h-[340px] bg-[#fbfbfa] opacity-95 rounded-full"
            style={{
              filter: 'blur(58px)',
            }}
          />
        </div>

        {/* Ambient earthy matcha wash in the bottom-left corner for overall balance */}
        <div 
          className="absolute -bottom-[15%] -left-[8%] w-[420px] h-[420px] bg-[#6e8f52]/20"
          style={{
            borderRadius: '55% 45% 60% 40% / 50% 60% 40% 50%',
            filter: 'blur(95px)',
          }}
        />

        {/* ========================================================================= */}
        {/* TACTILE FILM GRAIN / NOISE TEXTURE */}
        {/* ========================================================================= */}
        <svg 
          className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.38] mix-blend-overlay"
          xmlns="http://www.w3.org/2000/svg"
        >
          <filter id="grainFilter">
            <feTurbulence 
              type="fractalNoise" 
              baseFrequency="0.8" 
              numOctaves="3" 
              stitchTiles="stitch" 
            />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#grainFilter)" />
        </svg>

        {/* Subtle fine grain texture for paper/print feel */}
        <svg 
          className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.16] mix-blend-multiply"
          xmlns="http://www.w3.org/2000/svg"
        >
          <filter id="fineGrain">
            <feTurbulence 
              type="fractalNoise" 
              baseFrequency="1.15" 
              numOctaves="2" 
              stitchTiles="stitch" 
            />
          </filter>
          <rect width="100%" height="100%" filter="url(#fineGrain)" />
        </svg>
      </div>

      {/* Top Header */}
      <header className="relative z-20 w-full max-w-6xl mx-auto flex items-center justify-between py-2">
        <div className="flex items-center gap-2.5">
          <img 
            src="/groop.png" 
            alt="Groop" 
            className="w-7 h-7 object-contain rounded"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
          <span className="font-mono text-xs sm:text-sm tracking-widest uppercase font-semibold text-neutral-800">
            groop.space
          </span>
        </div>

        {/* Delicate Starburst Badge from Reference Image */}
        <Link 
          to={badgeTo} 
          className="group relative flex items-center justify-center cursor-pointer transition hover:scale-105"
        >
          <svg className="w-30 h-30 text-neutral-800 transition duration-500 group-hover:rotate-45" viewBox="0 0 100 100" fill="white">
            <path 
              d="M50 0 C50 35 65 50 100 50 C65 50 50 65 50 100 C50 65 35 50 0 50 C35 50 50 35 50 0 Z" 
              stroke="white" 
              strokeWidth="0.8" 
              className="opacity-75"
            />
          </svg>
          <span className="absolute font-mono text-[10px] tracking-tight text-neutral-800 group-hover:font-semibold">
            {badgeText}
          </span>
        </Link>
      </header>

      {/* Main Content Slot */}
      <main className="relative z-20 w-full max-w-4xl mx-auto my-auto py-6">
        {children}
      </main>

      {/* Editorial Footer Grid */}
      <footer className="relative z-20 w-full max-w-6xl mx-auto border-t border-neutral-300/60 pt-4 hidden sm:grid grid-cols-4 gap-4 text-[11px] text-neutral-500 font-mono">
        <div>
          <span className="text-neutral-900 block font-semibold">spaces & rooms</span>
          <span>curated communities</span>
        </div>
        <div>
          <span className="text-neutral-900 block font-semibold">voice & video</span>
          <span>crystal clear audio</span>
        </div>
        <div>
          <span className="text-neutral-900 block font-semibold">safety first</span>
          <span>end-to-end verified</span>
        </div>
        <div>
          <span className="text-neutral-900 block font-semibold">matcha & pink</span>
          <span>earthy & strawberry milk</span>
        </div>
      </footer>
    </div>
  );
};

export default AestheticBackground;
