import React from 'react';
import { Sparkles } from 'lucide-react';

export const RibbonBanner: React.FC = () => {
  return (
    <div className="w-full flex items-center justify-center my-4 sm:my-6 px-4">
      <div className="relative max-w-xl w-full">
        {/* Glow behind ribbon */}
        <div className="absolute inset-0 bg-emerald-500/25 blur-lg rounded-full" />
        
        {/* Brush style curved ribbon */}
        <div className="relative mx-auto py-2.5 px-6 sm:px-10 rounded-full bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-700 text-white shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2 border border-emerald-400/40 transform hover:scale-[1.02] transition-transform">
          <Sparkles className="w-5 h-5 text-lime-300 animate-spin" style={{ animationDuration: '6s' }} />
          <span className="font-script text-2xl sm:text-3xl font-bold tracking-wide text-lime-200 drop-shadow-sm select-none">
            Internet Bersih, Aman &amp; Nyaman
          </span>
          <Sparkles className="w-5 h-5 text-lime-300 animate-spin" style={{ animationDuration: '6s' }} />
        </div>
      </div>
    </div>
  );
};
