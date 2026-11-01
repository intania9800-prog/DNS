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

          {/* DNS Configuration Preview Box */}
          <div className="p-4 rounded-2xl bg-gray-900 text-white space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Wifi className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-bold text-emerald-300">
                  Konfigurasi AdGuard DNS Anda
                </span>
              </div>
              <span className="text-[10px] text-gray-400 font-mono">
                {transaction.status === 'TERVERIFIKASI_AKTIF' ? 'Status: AKTIF' : 'Status: AKTIVASI DIPROSES'}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 rounded-xl bg-gray-800/90 border border-gray-700">
                <span className="text-[10px] text-gray-400 block font-semibold">IPv4 Utama</span>
                <div className="flex items-center justify-between mt-0.5">
                  <span className="font-mono text-emerald-400 font-bold">
                    {transaction.dnsCredentials?.primaryIpv4 || '94.140.14.14'}
                  </span>
                  <button
                    onClick={() => handleCopy(transaction.dnsCredentials?.primaryIpv4 || '94.140.14.14', 'ipv4-1')}
                    className="text-[10px] text-gray-400 hover:text-white"
                  >
                    {copiedText === 'ipv4-1' ? 'Disalin' : 'Salin'}
                  </button>
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-gray-800/90 border border-gray-700">
                <span className="text-[10px] text-gray-400 block font-semibold">IPv4 Sekunder</span>
                <div className="flex items-center justify-between mt-0.5">
                  <span className="font-mono text-emerald-400 font-bold">
                    {transaction.dnsCredentials?.secondaryIpv4 || '94.140.15.15'}
                  </span>
                  <button
                    onClick={() => handleCopy(transaction.dnsCredentials?.secondaryIpv4 || '94.140.15.15', 'ipv4-2')}
                    className="text-[10px] text-gray-400 hover:text-white"
                  >
                    {copiedText === 'ipv4-2' ? 'Disalin' : 'Salin'}
                  </button>
                </div>
              </div>

              <div className="sm:col-span-2 p-2.5 rounded-xl bg-gray-800/90 border border-gray-700">
                <span className="text-[10px] text-gray-400 block font-semibold">Private DNS Hostname (Android DoT)</span>
                <div className="flex items-center justify-between mt-0.5">
                  <span className="font-mono text-emerald-400 font-bold truncate mr-2">
                    {transaction.dnsCredentials?.dotServer || 'dns.adguard-dns.com'}
                  </span>
                  <button
                    onClick={() => handleCopy(transaction.dnsCredentials?.dotServer || 'dns.adguard-dns.com', 'dot')}
                    className="text-[10px] text-gray-400 hover:text-white shrink-0"
                  >
                    {copiedText === 'dot' ? 'Disalin' : 'Salin'}
                  </button>
                </div>
              </div>
            </div>

            <div className="text-[11px] text-amber-300 font-bold bg-amber-950/40 border border-amber-500/30 p-2 rounded-xl text-center">
              🔒 Akses terikat khusus untuk 1 perangkat saja (Single Device).
            </div>

            {onViewHowToSetup && (
              <button
                type="button"
                onClick={onViewHowToSetup}
                className="w-full py-2.5 rounded-xl bg-gray-800 hover:bg-gray-700 text-emerald-400 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors border border-gray-700"
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>Panduan Cara Setting Lewat Aplikasi AdGuard</span>
              </button>
            )}
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
