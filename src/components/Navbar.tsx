import React from 'react';
import { ShieldCheck, Home, Info, HelpCircle, Headphones } from 'lucide-react';

interface NavbarProps {
  onOpenAbout: () => void;
  onOpenFaq: () => void;
  onOpenSupport: () => void;
  onOpenAdmin?: () => void;
  pendingCount?: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenAbout,
  onOpenFaq,
  onOpenSupport,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-emerald-100 shadow-xs transition-all">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between">
        {/* Brand Logo & Tagline */}
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center w-11 h-11 rounded-2xl bg-gradient-to-br from-emerald-500 to-green-600 text-white shadow-md shadow-emerald-500/20">
            <ShieldCheck className="w-7 h-7 stroke-[2.2]" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-lime-400 rounded-full border-2 border-white animate-pulse" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="text-xl sm:text-2xl font-black tracking-tight text-gray-900">
                AdGuard <span className="text-emerald-600">DNS</span>
              </span>
              <span className="hidden sm:inline-block text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 tracking-wide">
                RESMI
              </span>
            </div>
            <p className="text-[11px] sm:text-xs text-gray-500 font-medium">
              Browsing Lebih Aman, Cepat dan Bebas Iklan
            </p>
          </div>
        </div>

        {/* Navigation items */}
        <nav className="flex items-center gap-1 sm:gap-2">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="hidden md:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 rounded-lg hover:bg-emerald-100 transition-colors"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Beranda</span>
          </button>

          <button
            onClick={onOpenAbout}
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 text-xs font-semibold text-gray-600 hover:text-emerald-600 hover:bg-gray-50 rounded-lg transition-colors"
          >
            <Info className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Tentang</span>
          </button>

          <button
            onClick={onOpenFaq}
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 text-xs font-semibold text-gray-600 hover:text-emerald-600 hover:bg-gray-50 rounded-lg transition-colors"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">FAQ</span>
          </button>

          <button
            onClick={onOpenSupport}
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 text-xs font-semibold text-gray-600 hover:text-emerald-600 hover:bg-gray-50 rounded-lg transition-colors"
          >
            <Headphones className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Bantuan</span>
          </button>
        </nav>
      </div>
    </header>
  );
};
