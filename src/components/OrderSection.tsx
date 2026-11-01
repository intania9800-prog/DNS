import React, { useState } from 'react';
import { Check, Calendar, ShoppingCart, User, Phone, Send, ShieldCheck, Tag } from 'lucide-react';
import { PackagePlan } from '../types';
import { PACKAGE_PLANS } from '../data/packages';
import { formatRupiah } from '../utils/storage';

interface OrderSectionProps {
  onOrderSubmit: (data: { customerName: string; whatsappNumber: string; selectedPlan: PackagePlan }) => void;
}

export const OrderSection: React.FC<OrderSectionProps> = ({ onOrderSubmit }) => {
  const [selectedPlanId, setSelectedPlanId] = useState<string>('plan-1-bulan');
  const [customerName, setCustomerName] = useState<string>('');
  const [whatsappNumber, setWhatsappNumber] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const currentPlan = PACKAGE_PLANS.find((p) => p.id === selectedPlanId) || PACKAGE_PLANS[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!customerName.trim()) {
      setErrorMessage('Silakan masukkan nama lengkap Anda.');
      return;
    }

    const cleanPhone = whatsappNumber.replace(/[^0-9]/g, '');
    if (cleanPhone.length < 9) {
      setErrorMessage('Nomor WhatsApp tidak valid. Masukkan nomor aktif (contoh: 081234567890).');
      return;
    }

    onOrderSubmit({
      customerName: customerName.trim(),
      whatsappNumber: whatsappNumber.trim(),
      selectedPlan: currentPlan
    });
  };

  return (
    <section id="order-section" className="py-4 sm:py-6">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-stretch">
          
          {/* Left Card: Paket Langganan */}
          <div className="bg-white rounded-3xl border-2 border-emerald-500/80 p-6 sm:p-8 shadow-xl shadow-emerald-500/10 flex flex-col justify-between relative overflow-hidden transition-all hover:border-emerald-600">
            {/* Top Badge: Paket Langganan */}
            <div className="flex items-center justify-between gap-2 mb-4">
              <div className="inline-flex items-center gap-1.5 px-5 py-2 rounded-full bg-gradient-to-r from-emerald-600 to-green-600 text-white font-extrabold text-sm sm:text-base shadow-md shadow-emerald-500/30">
                <span>Paket Langganan</span>
              </div>
              
              {currentPlan.discountBadge && (
                <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold border border-amber-300">
                  <Tag className="w-3.5 h-3.5" />
                  <span>{currentPlan.discountBadge}</span>
                </div>
              )}
            </div>

            {/* Plan Selector Pills */}
            <div className="grid grid-cols-4 gap-1.5 mb-5 p-1 bg-gray-100/90 rounded-2xl">
              {PACKAGE_PLANS.map((plan) => {
                const isSelected = plan.id === selectedPlanId;
                return (
                  <button
                    key={plan.id}
                    type="button"
                    onClick={() => setSelectedPlanId(plan.id)}
                    className={`py-2 px-1 text-center rounded-xl text-xs font-bold transition-all ${
                      isSelected
                        ? 'bg-white text-emerald-700 shadow-sm border border-emerald-200'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200/60'
                    }`}
                  >
                    <span>{plan.durationLabel}</span>
                  </button>
                );
              })}
            </div>

            {/* Big Price Display matching image */}
            <div className="text-center py-2 border-b border-gray-100 mb-6">
              <span className="text-sm font-bold text-gray-500 block mb-1">
                {currentPlan.durationLabel}
              </span>
              <div className="flex items-baseline justify-center gap-2">
                <span className="text-4xl sm:text-5xl font-black text-emerald-600 tracking-tight">
                  {formatRupiah(currentPlan.price)}
                </span>
              </div>
              {currentPlan.originalPrice && (
                <span className="text-xs text-gray-400 line-through font-medium">
                  {formatRupiah(currentPlan.originalPrice)}
                </span>
              )}
            </div>

            {/* Features checkmark list */}
            <ul className="space-y-3 mb-6 flex-1">
              {currentPlan.features.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm text-gray-700 font-medium">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            {/* Bottom Duration Badge */}
            <div className="pt-2">
              <div className="w-full py-2.5 px-4 rounded-xl bg-emerald-50/80 border border-emerald-200/70 text-emerald-800 text-xs sm:text-sm font-bold flex items-center justify-center gap-2">
                <Calendar className="w-4 h-4 text-emerald-600" />
                <span>Durasi : {currentPlan.durationLabel}</span>
              </div>
            </div>
          </div>

          {/* Right Card: Form Pemesanan */}
          <div className="bg-white rounded-3xl border border-gray-200/90 p-6 sm:p-8 shadow-xl shadow-gray-200/60 flex flex-col justify-between relative transition-all">
            
            {/* Header: Form Pemesanan */}
            <div>
              <div className="inline-flex items-center gap-2 px-5 py-2 mb-6 rounded-full bg-gradient-to-r from-emerald-600 to-green-600 text-white font-extrabold text-sm sm:text-base shadow-md shadow-emerald-500/30">
                <ShoppingCart className="w-4 h-4" />
                <span>Form Pemesanan</span>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Input: Nama Lengkap */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">
                    Nama Lengkap
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                      <User className="w-5 h-5" />
                    </div>
                    <input
                      type="text"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="Masukkan nama lengkap Anda"
                      required
                      className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 text-sm font-medium text-gray-900 placeholder:text-gray-400 outline-none transition-all"
                    />
                  </div>
                </div>

                {/* Input: Nomor WhatsApp (Aktif) */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">
                    Nomor WhatsApp (Aktif)
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-emerald-600">
                      <Phone className="w-5 h-5" />
                    </div>
                    <input
                      type="tel"
                      value={whatsappNumber}
                      onChange={(e) => setWhatsappNumber(e.target.value)}
                      placeholder="Contoh: 081234567890"
                      required
                      className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 text-sm font-medium text-gray-900 placeholder:text-gray-400 outline-none transition-all"
                    />
                  </div>
                  <span className="text-[11px] text-gray-500 mt-1 block">
                    *Link bukti bayar &amp; akses lisensi akan dikirimkan otomatis ke nomor ini.
                  </span>
                </div>

                {/* Select: Paket */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">
                    Pilihan Paket
                  </label>
                  <div className="relative">
                    <select
                      value={selectedPlanId}
                      onChange={(e) => setSelectedPlanId(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 text-sm font-bold text-gray-800 bg-white outline-none cursor-pointer appearance-none transition-all"
                    >
                      {PACKAGE_PLANS.map((plan) => (
                        <option key={plan.id} value={plan.id}>
                          {plan.durationLabel} - {formatRupiah(plan.price)} {plan.discountBadge ? `(${plan.discountBadge})` : ''}
                        </option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-gray-500">
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                        <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                      </svg>
                    </div>
                  </div>
                </div>

                {errorMessage && (
                  <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs font-semibold">
                    {errorMessage}
                  </div>
                )}

                {/* Big Green Button: Order Sekarang */}
                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-emerald-500 via-green-600 to-emerald-600 hover:from-emerald-600 hover:to-green-700 text-white font-black text-base sm:text-lg flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/30 hover:shadow-xl hover:shadow-emerald-500/40 hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer"
                  >
                    <Send className="w-5 h-5 stroke-[2.5]" />
                    <span>Order Sekarang</span>
                  </button>
                </div>
              </form>
            </div>

            {/* Bottom Security Note */}
            <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-center gap-1.5 text-xs text-gray-500 font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Data Anda aman, terenkripsi, dan tidak akan dibagikan.</span>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
