import React from 'react';
import { CreditCard, CheckCircle2, Headphones, ArrowRight, MessageCircle } from 'lucide-react';

interface BottomCardsSectionProps {
  onOpenSupport: () => void;
  adminWhatsapp: string;
}

export const BottomCardsSection: React.FC<BottomCardsSectionProps> = ({
  onOpenSupport,
  adminWhatsapp
}) => {
  const cleanAdminPhone = adminWhatsapp.replace(/[^0-9]/g, '');
  const helpWhatsAppUrl = `https://wa.me/${cleanAdminPhone}?text=${encodeURIComponent(
    'Halo Admin AdGuard DNS Indonesia, saya ingin menanyakan informasi seputar pemesanan dan pembayaran QRIS.'
  )}`;

  return (
    <section className="py-6 sm:py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          
          {/* Card 1: Metode Pembayaran (Pembayaran Hanya QRIS) */}
          <div className="bg-white rounded-3xl border border-emerald-100 p-6 shadow-lg shadow-emerald-500/5 flex flex-col justify-between hover:border-emerald-300 transition-all">
            <div>
              {/* Header */}
              <div className="flex items-center gap-2 mb-4 text-emerald-800 font-extrabold text-base">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-600">
                  <CreditCard className="w-4 h-4 stroke-[2.5]" />
                </div>
                <span>Metode Pembayaran</span>
              </div>

              <p className="text-xs text-gray-500 font-semibold mb-4">
                Silakan lakukan pembayaran melalui:
              </p>

              {/* QRIS Official Card - STRICTLY QRIS ONLY */}
              <div className="p-4 rounded-2xl bg-emerald-50/70 border-2 border-emerald-500/80 mb-3 text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <span className="font-black text-xl text-gray-900 tracking-tighter bg-gray-900 text-white px-2.5 py-0.5 rounded">
                    QRIS
                  </span>
                  <span className="text-[10px] font-black px-2.5 py-0.5 bg-emerald-600 text-white rounded-full">
                    Satu QRIS Untuk Semua
                  </span>
                </div>
                <div className="text-xs font-black text-gray-900 tracking-wide mb-1">
                  RHANK OLSHOP
                </div>
                <div className="text-[11px] font-mono text-gray-500 font-bold mb-2">
                  NMID: ID1026559812460
                </div>
                <p className="text-[11px] text-emerald-800 font-semibold bg-white p-2 rounded-xl border border-emerald-200">
                  ⚡ Pembayaran hanya via QRIS resmi — otomatis, instan, dan aman.
                </p>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-gray-100">
              <span className="text-[11px] text-emerald-700 font-bold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                Khusus QRIS — verifikasi transaksi instan &amp; akurat
              </span>
            </div>
          </div>

          {/* Card 2: Setelah Pembayaran */}
          <div className="bg-white rounded-3xl border border-emerald-100 p-6 shadow-lg shadow-emerald-500/5 flex flex-col justify-between hover:border-emerald-300 transition-all">
            <div>
              {/* Header */}
              <div className="flex items-center gap-2 mb-4 text-emerald-800 font-extrabold text-base">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-600">
                  <CheckCircle2 className="w-4 h-4 stroke-[2.5]" />
                </div>
                <span>Setelah Pembayaran</span>
              </div>

              {/* Numbered Steps matching the image */}
              <div className="space-y-3.5">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                    1
                  </div>
                  <p className="text-xs text-gray-700 font-semibold leading-relaxed">
                    Lakukan pembayaran sesuai nominal via QRIS (termasuk 3 digit kode unik)
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                    2
                  </div>
                  <p className="text-xs text-gray-700 font-semibold leading-relaxed">
                    Konfirmasi pembayaran melalui tombol WhatsApp otomatis di sistem
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                    3
                  </div>
                  <p className="text-xs text-gray-700 font-semibold leading-relaxed">
                    Kami akan memverifikasi dan mengirimkan akses DNS AdGuard Anda
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-gray-100">
              <span className="text-[11px] text-gray-500 font-medium">
                ⏱️ Waktu proses rata-rata: <strong>1 - 3 Menit</strong>
              </span>
            </div>
          </div>

          {/* Card 3: Butuh Bantuan? */}
          <div className="bg-white rounded-3xl border border-emerald-100 p-6 shadow-lg shadow-emerald-500/5 flex flex-col justify-between hover:border-emerald-300 transition-all text-center">
            <div>
              {/* Header */}
              <div className="flex items-center justify-center gap-2 mb-3 text-emerald-800 font-extrabold text-base">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-600">
                  <Headphones className="w-4 h-4 stroke-[2.5]" />
                </div>
                <span>Butuh Bantuan?</span>
              </div>

              <p className="text-xs text-gray-600 font-semibold mb-6">
                Tim customer support kami siap membantu Anda setiap hari (08:00 - 23:00 WIB)
              </p>

              {/* Big WhatsApp Pill Button matching image */}
              <a
                href={helpWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-5 rounded-full bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-700 hover:from-emerald-700 hover:to-green-800 text-white font-extrabold text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/25 hover:shadow-xl hover:scale-[1.02] active:scale-100 transition-all"
              >
                <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                  <MessageCircle className="w-4 h-4 fill-white" />
                </div>
                <span>Hubungi Kami</span>
              </a>

              <p className="text-[11px] text-gray-500 font-bold mt-3">
                Respon cepat via WhatsApp
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-gray-100">
              <button
                type="button"
                onClick={onOpenSupport}
                className="text-xs text-emerald-700 font-bold hover:underline inline-flex items-center gap-1"
              >
                <span>Panduan Setup via Aplikasi AdGuard (1 Perangkat)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
