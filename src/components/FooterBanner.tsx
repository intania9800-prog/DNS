import React from 'react';
import { ShieldCheck, Zap, Headphones, Heart } from 'lucide-react';

interface FooterBannerProps {
  onSecretAdminClick?: () => void;
}

export const FooterBanner: React.FC<FooterBannerProps> = ({ onSecretAdminClick }) => {
  return (
    <footer className="mt-8 bg-gradient-to-r from-emerald-900 via-emerald-800 to-green-950 text-white border-t border-emerald-700/40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          
          {/* 4 Trust Badges matching image */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 w-full lg:w-auto">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-emerald-700/60 flex items-center justify-center text-lime-300 shrink-0 border border-emerald-500/40">
                <ShieldCheck className="w-4 h-4 stroke-[2.5]" />
              </div>
              <span className="text-xs sm:text-sm font-bold tracking-tight">Aman &amp; Terpercaya</span>
            </div>

            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-emerald-700/60 flex items-center justify-center text-lime-300 shrink-0 border border-emerald-500/40">
                <Zap className="w-4 h-4 stroke-[2.5]" />
              </div>
              <span className="text-xs sm:text-sm font-bold tracking-tight">Aktivasi Cepat</span>
            </div>

            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-emerald-700/60 flex items-center justify-center text-lime-300 shrink-0 border border-emerald-500/40">
                <Headphones className="w-4 h-4 stroke-[2.5]" />
              </div>
              <span className="text-xs sm:text-sm font-bold tracking-tight">Layanan Responsif</span>
            </div>

            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-emerald-700/60 flex items-center justify-center text-lime-300 shrink-0 border border-emerald-500/40">
                <Heart className="w-4 h-4 stroke-[2.5]" />
              </div>
              <span className="text-xs sm:text-sm font-bold tracking-tight">Kepuasan Pelanggan</span>
            </div>
          </div>

          {/* Slogan with script font on right */}
          <div className="text-center lg:text-right">
            <p className="font-script text-2xl sm:text-3xl text-lime-300 drop-shadow-md">
              AdGuard DNS
            </p>
            <p className="text-xs text-emerald-200/90 font-medium tracking-wide">
              Pilihan Terbaik untuk Internet Anda!
            </p>
          </div>

        </div>

        {/* Small copyright disclaimer with discreet admin trigger */}
        <div className="mt-6 pt-4 border-t border-emerald-800/80 flex flex-col sm:flex-row items-center justify-between text-[11px] text-emerald-300/70 gap-2">
          <span>&copy; {new Date().getFullYear()} AdGuard DNS Indonesia. All rights reserved.</span>
          <div className="flex items-center gap-2">
            <span>Sistem Pembayaran 100% QRIS Resmi &amp; Terintegrasi WhatsApp API</span>
            {onSecretAdminClick && (
              <button
                type="button"
                onClick={onSecretAdminClick}
                className="opacity-20 hover:opacity-100 transition-opacity p-1 text-emerald-400"
                title="Akses Internal"
              >
                🔒
              </button>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};
