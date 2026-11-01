import React, { useState } from 'react';
import { 
  CheckCircle2, 
  MessageCircle, 
  Copy, 
  Check, 
  Printer, 
  ExternalLink, 
  ShieldCheck, 
  X, 
  Wifi, 
  Smartphone, 
  Layers,
  ArrowRight
} from 'lucide-react';
import { Transaction } from '../types';
import { 
  formatRupiah, 
  formatDateTime, 
  generateWhatsAppConfirmationUrl 
} from '../utils/storage';

interface SuccessReceiptModalProps {
  transaction: Transaction;
  adminWhatsapp: string;
  onClose: () => void;
  onViewHowToSetup?: () => void;
}

export const SuccessReceiptModal: React.FC<SuccessReceiptModalProps> = ({
  transaction,
  adminWhatsapp,
  onClose,
  onViewHowToSetup
}) => {
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const waUrl = generateWhatsAppConfirmationUrl(transaction, adminWhatsapp);
  const receiptShareUrl = `${window.location.origin}${window.location.pathname}?receipt=${encodeURIComponent(transaction.id)}`;

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(null), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-emerald-100 overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-200">
        
        {/* Top Automated Notification Header */}
        <div className="bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-700 text-white p-5 sm:p-6 relative">
          <div className="flex items-center justify-between mb-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-lime-200 text-xs font-bold">
              <span className="w-2 h-2 rounded-full bg-lime-400 animate-ping" />
              <span>Notifikasi Otomatis Sistem Berhasil</span>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-xs flex items-center justify-center shrink-0 border border-white/30 shadow-md">
              <CheckCircle2 className="w-8 h-8 text-lime-300 stroke-[2.5]" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black">
                Pembayaran Berhasil Dicatat!
              </h2>
              <p className="text-xs sm:text-sm text-emerald-100 font-medium mt-0.5">
                Silakan langsung klik tombol WhatsApp di bawah untuk konfirmasi ke admin agar akses DNS Anda segera diaktifkan.
              </p>
            </div>
          </div>
        </div>

        {/* Step Progress Tracker for Intuitive Navigation */}
        <div className="px-6 py-3 bg-emerald-50/80 border-b border-emerald-100 flex items-center justify-between text-[11px] font-bold text-gray-600 overflow-x-auto">
          <div className="flex items-center gap-1.5 text-emerald-700">
            <span className="w-4 h-4 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[9px]">✔</span>
            <span>1. Isi Form</span>
          </div>
          <span className="text-emerald-300">───</span>
          <div className="flex items-center gap-1.5 text-emerald-700">
            <span className="w-4 h-4 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[9px]">✔</span>
            <span>2. Bayar QRIS</span>
          </div>
          <span className="text-emerald-300">───</span>
          <div className="flex items-center gap-1.5 text-emerald-800 bg-white px-2 py-0.5 rounded-full border border-emerald-300 shadow-2xs">
            <span className="w-4 h-4 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[9px] animate-pulse">3</span>
            <span>3. Konfirmasi WhatsApp</span>
          </div>
          <span className="text-gray-300">───</span>
          <div className="flex items-center gap-1.5 text-gray-400">
            <span className="w-4 h-4 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center text-[9px]">4</span>
            <span>4. DNS Aktif</span>
          </div>
        </div>

        <div className="p-5 sm:p-6 space-y-5 max-h-[75vh] overflow-y-auto">
          
          {/* PRIMARY CALL TO ACTION: Open WhatsApp with prefilled message & proof link */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 border-2 border-emerald-500 shadow-md text-center">
            <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider block mb-1">
              Langkah Terakhir: Hubungi Admin Langsung
            </span>
            <h3 className="text-lg font-black text-gray-900 mb-2">
              Kirim Bukti Bayar ke WhatsApp Admin
            </h3>
            <p className="text-xs text-gray-600 font-medium max-w-md mx-auto mb-4">
              Sistem telah menyiapkan pesan otomatis untuk chat pribadi admin <strong>+62 895-3655-44896</strong> lengkap dengan bukti bayar &amp; tautan verifikasi.
            </p>

            <div className="flex flex-col sm:flex-row gap-2.5 justify-center">
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3.5 px-6 rounded-2xl bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-700 hover:from-emerald-700 hover:to-green-800 text-white font-extrabold text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30 hover:scale-[1.02] active:scale-100 transition-all cursor-pointer"
              >
                <MessageCircle className="w-5 h-5 fill-white" />
                <span>Kirim ke WhatsApp (+62 895-3655-44896)</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <button
                type="button"
                onClick={() => handleCopy(receiptShareUrl, 'link')}
                className="py-3 px-4 rounded-2xl bg-white hover:bg-gray-50 border border-emerald-300 text-emerald-800 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
              >
                {copiedText === 'link' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-emerald-600" />}
                <span>{copiedText === 'link' ? 'Link Tersalin!' : 'Salin Link Bukti'}</span>
              </button>
            </div>
          </div>

          {/* Digital Receipt Card (Slip Bukti Transaksi Resmi) */}
          <div id="printable-receipt" className="p-5 rounded-2xl bg-white border border-gray-200/90 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-black text-xs">
                  ADG
                </div>
                <div>
                  <h4 className="text-sm font-black text-gray-900">
                    SLIP BUKTI TRANSAKSI QRIS
                  </h4>
                  <span className="text-[10px] text-gray-500 font-semibold">
                    Merchant: RHANK OLSHOP • NMID: ID1026559812460
                  </span>
                </div>
              </div>

              <div className="text-right">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase ${
                  transaction.status === 'TERVERIFIKASI_AKTIF'
                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                    : 'bg-amber-100 text-amber-800 border border-amber-300'
                }`}>
                  {transaction.status === 'TERVERIFIKASI_AKTIF' ? 'Terverifikasi Aktif' : 'Menunggu Konfirmasi Admin'}
                </span>
                <span className="text-[10px] font-mono text-gray-400 block mt-0.5">
                  {transaction.id}
                </span>
              </div>
            </div>

            {/* Receipt Details Grid */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-gray-400 block text-[10px] uppercase font-bold">Nama Pembeli</span>
                <span className="font-bold text-gray-800">{transaction.customerName}</span>
              </div>

              <div>
                <span className="text-gray-400 block text-[10px] uppercase font-bold">Nomor WhatsApp</span>
                <span className="font-bold text-gray-800">{transaction.whatsappNumber}</span>
              </div>

              <div>
                <span className="text-gray-400 block text-[10px] uppercase font-bold">Paket Langganan</span>
                <span className="font-bold text-gray-800">{transaction.packageName} ({transaction.durationLabel})</span>
              </div>

              <div>
                <span className="text-gray-400 block text-[10px] uppercase font-bold">Waktu Transaksi</span>
                <span className="font-bold text-gray-800">{formatDateTime(transaction.createdAt)}</span>
              </div>

              <div>
                <span className="text-gray-400 block text-[10px] uppercase font-bold">Metode Pembayaran</span>
                <span className="font-bold text-emerald-700">QRIS Instant (Kode Unik #{transaction.uniqueCode})</span>
              </div>

              <div>
                <span className="text-gray-400 block text-[10px] uppercase font-bold">Total Pembayaran</span>
                <span className="font-black text-sm text-emerald-600">{formatRupiah(transaction.totalPrice)}</span>
              </div>
            </div>

            {/* Proof Attachment preview - PROMINENT FOR ADMIN INSPECTION */}
            {transaction.proofImageUrl ? (
              <div className="pt-3 border-t border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1.5 text-xs font-black text-emerald-800">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span>BUKTI PEMBAYARAN TRANSFER QRIS (TERLAMPIR)</span>
                  </div>
                  <a
                    href={transaction.proofImageUrl}
                    download={`Bukti-Bayar-${transaction.id}.png`}
                    className="text-[11px] text-emerald-700 font-bold hover:underline"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Buka Ukuran Penuh ↗
                  </a>
                </div>

                <div className="p-2 bg-gray-50 rounded-2xl border-2 border-emerald-300 text-center">
                  <img
                    src={transaction.proofImageUrl}
                    alt={`Bukti Transfer ${transaction.id}`}
                    className="max-h-80 w-auto object-contain rounded-xl mx-auto shadow-sm cursor-pointer hover:opacity-95 transition-opacity"
                    onClick={() => window.open(transaction.proofImageUrl, '_blank')}
                  />
                  <span className="text-[10px] text-gray-500 font-medium block mt-1.5">
                    Ketuk gambar untuk melihat resolusi penuh / perbesar
                  </span>
                </div>
              </div>
            ) : (
              <div className="pt-2 border-t border-gray-100 text-center py-2 text-xs text-gray-400">
                <span>Belum ada foto bukti bayar yang dilampirkan.</span>
              </div>
            )}
          </div>

          {/* Web is STRICTLY FOR PAYMENT ONLY: Notice about DNS delivery via Admin WhatsApp */}
          <div className="p-4 sm:p-5 rounded-2xl bg-emerald-50 border-2 border-emerald-400 text-emerald-950 space-y-2.5">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-black text-gray-900 uppercase tracking-wide">
                  PENGIRIMAN AKSES DNS LEWAT ADMIN WHATSAPP
                </h4>
                <span className="text-[11px] text-emerald-700 font-bold block">
                  Web Ini Khusus Pemesanan &amp; Pembayaran QRIS Saja
                </span>
              </div>
            </div>

            <p className="text-xs text-gray-700 leading-relaxed font-medium">
              Akses link &amp; konfigurasi <strong>AdGuard DNS Resmi (Khusus 1 Perangkat)</strong> akan dikirimkan langsung oleh Admin ke chat WhatsApp Anda ({transaction.whatsappNumber}) segera setelah bukti pembayaran QRIS ini diverifikasi.
            </p>

            <div className="p-2.5 bg-white rounded-xl border border-emerald-200 flex items-center gap-2 text-xs text-emerald-800 font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span>Silakan pastikan Anda telah menekan tombol "Kirim ke WhatsApp (+62 895-3655-44896)" di atas!</span>
            </div>
          </div>

          {/* Bottom Actions */}
          <div className="flex items-center justify-between pt-2">
            <button
              type="button"
              onClick={handlePrint}
              className="text-xs text-gray-600 hover:text-gray-900 font-bold inline-flex items-center gap-1.5 py-2 px-3 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Cetak / Download Slip</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="py-2 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors"
            >
              Kembali ke Beranda
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
