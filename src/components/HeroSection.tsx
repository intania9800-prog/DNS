import React from 'react';
import { ShieldCheck, EyeOff, Zap, Users, Laptop, Smartphone, Tablet, Globe2 } from 'lucide-react';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative overflow-hidden pt-8 pb-4 sm:pt-12 sm:pb-8">
      {/* Background Decorative Radial Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-emerald-100/60 via-green-50/40 to-transparent pointer-events-none -z-10" />
      <div className="absolute top-10 right-10 w-72 h-72 bg-emerald-300/20 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-20 left-10 w-80 h-80 bg-green-200/30 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center">
          
          {/* Left Hero Content */}
          <div className="lg:col-span-7 text-left space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100/80 border border-emerald-200/70 text-emerald-800 text-xs font-semibold">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
              <span>Aktivasi Instan • Khusus 1 Perangkat Saja • Setup via Aplikasi AdGuard</span>
            </div>

            <div className="space-y-2.5">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 tracking-tight leading-tight">
                Order Akses <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600">
                  AdGuard DNS
                </span>
              </h1>
              <p className="text-base sm:text-lg text-gray-600 font-medium max-w-xl leading-relaxed">
                Blokir iklan, pelacak, dan konten berbahaya untuk pengalaman internet yang lebih aman, cepat, dan bersih lewat aplikasi AdGuard resmi (Khusus 1 Perangkat).
              </p>
            </div>

            {/* 4 Feature Badges matching the image */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              <div className="flex flex-col items-center text-center p-3 rounded-2xl bg-white/90 border border-emerald-100 shadow-xs hover:border-emerald-300 transition-all hover:scale-105">
                <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-2 shadow-xs">
                  <ShieldCheck className="w-6 h-6 stroke-[2.2]" />
                </div>
                <span className="text-xs font-bold text-gray-800">Blokir Iklan</span>
                <span className="text-[10px] text-gray-500 mt-0.5">Semua Aplikasi &amp; Web</span>
              </div>

              <div className="flex flex-col items-center text-center p-3 rounded-2xl bg-white/90 border border-emerald-100 shadow-xs hover:border-emerald-300 transition-all hover:scale-105">
                <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-2 shadow-xs">
                  <EyeOff className="w-6 h-6 stroke-[2.2]" />
                </div>
                <span className="text-xs font-bold text-gray-800">Privasi Lebih Terjaga</span>
                <span className="text-[10px] text-gray-500 mt-0.5">Bebas Pelacakan</span>
              </div>

              <div className="flex flex-col items-center text-center p-3 rounded-2xl bg-white/90 border border-emerald-100 shadow-xs hover:border-emerald-300 transition-all hover:scale-105">
                <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-2 shadow-xs">
                  <Zap className="w-6 h-6 stroke-[2.2]" />
                </div>
                <span className="text-xs font-bold text-gray-800">Internet Lebih Cepat</span>
                <span className="text-[10px] text-gray-500 mt-0.5">Hemat Kuota Data</span>
              </div>

              <div className="flex flex-col items-center text-center p-3 rounded-2xl bg-white/90 border border-emerald-100 shadow-xs hover:border-emerald-300 transition-all hover:scale-105">
                <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-2 shadow-xs">
                  <Users className="w-6 h-6 stroke-[2.2]" />
                </div>
                <span className="text-xs font-bold text-gray-800">Aman untuk Keluarga</span>
                <span className="text-[10px] text-gray-500 mt-0.5">Parental Protection</span>
              </div>
            </div>
          </div>

          {/* Right Hero Graphic Illustration - Devices with Shield & Glow */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            <div className="relative w-full max-w-md aspect-4/3 flex items-center justify-center">
              
              {/* Animated Orbital Energy Rings */}
              <div className="absolute inset-4 rounded-full border-2 border-dashed border-emerald-400/40 animate-[spin_30s_linear_infinite]" />
              <div className="absolute inset-10 rounded-full border border-emerald-500/20 animate-[spin_20s_linear_infinite_reverse]" />
              
              {/* Globe background backdrop */}
              <div className="absolute -top-4 -right-4 w-44 h-44 rounded-full bg-gradient-to-tr from-emerald-500/10 to-teal-400/20 blur-xl pointer-events-none" />
              <div className="absolute -bottom-4 -left-4 w-40 h-40 rounded-full bg-green-400/15 blur-xl pointer-events-none" />

              {/* Main Glowing 3D Shield Badge */}
              <div className="relative z-10 flex flex-col items-center">
                <div className="relative mb-3 flex items-center justify-center">
                  <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-gradient-to-b from-emerald-500 via-green-600 to-emerald-700 shadow-2xl shadow-emerald-500/40 flex items-center justify-center border-4 border-white transform rotate-3 hover:rotate-0 transition-transform duration-300">
                    <ShieldCheck className="w-14 h-14 sm:w-16 sm:h-16 text-white stroke-[2.5]" />
                  </div>
                  {/* Floating pulse light */}
                  <div className="absolute -inset-1 rounded-3xl bg-emerald-400 opacity-30 blur-md animate-pulse -z-10" />
                </div>

                <div className="text-center">
                  <h3 className="text-xl sm:text-2xl font-black text-gray-900 tracking-wider">
                    ADGUARD <span className="text-emerald-600">DNS</span>
                  </h3>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 mt-1 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold">
                    <Globe2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Global Anycast Network</span>
                  </div>
                </div>

                {/* Device Protection Cluster Mockup */}
                <div className="mt-5 flex items-end justify-center gap-2 sm:gap-3 w-full px-4">
                  {/* Laptop */}
                  <div className="flex-1 bg-white p-2.5 rounded-xl border border-emerald-200/80 shadow-md hover:-translate-y-1 transition-transform flex flex-col items-center">
                    <Laptop className="w-5 h-5 text-emerald-600 mb-1" />
                    <span className="text-[10px] font-bold text-gray-700">Laptop / PC</span>
                    <span className="text-[9px] text-emerald-600 font-semibold">100% Protected</span>
                  </div>

                  {/* Tablet */}
                  <div className="flex-1 bg-emerald-600 text-white p-2.5 rounded-xl border border-emerald-500 shadow-lg -translate-y-2 flex flex-col items-center">
                    <Tablet className="w-5 h-5 text-lime-300 mb-1" />
                    <span className="text-[10px] font-bold">Tablet / iPad</span>
                    <span className="text-[9px] text-emerald-100 font-semibold">Active Guard</span>
                  </div>

                  {/* Smartphone */}
                  <div className="flex-1 bg-white p-2.5 rounded-xl border border-emerald-200/80 shadow-md hover:-translate-y-1 transition-transform flex flex-col items-center">
                    <Smartphone className="w-5 h-5 text-emerald-600 mb-1" />
                    <span className="text-[10px] font-bold text-gray-700">Android / iOS</span>
                    <span className="text-[9px] text-emerald-600 font-semibold">DoT / DoH Active</span>
                  </div>
                </div>

              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
