import React, { useState } from 'react';
import { 
  Bot, 
  CheckCircle2, 
  Send, 
  MessageCircle, 
  X, 
  Link2, 
  ShieldCheck, 
  Smartphone, 
  ExternalLink,
  Copy,
  Check
} from 'lucide-react';
import { Transaction } from '../types';
import { 
  formatRupiah, 
  formatDateTime, 
  updateTransaction, 
  generateAdminToCustomerWhatsAppUrl,
  playSuccessChime 
} from '../utils/storage';

interface AdminBotModalProps {
  transaction: Transaction;
  onClose: () => void;
  onSuccessAcc: () => void;
}

export const AdminBotModal: React.FC<AdminBotModalProps> = ({
  transaction,
  onClose,
  onSuccessAcc
}) => {
  const defaultDnsLink = transaction.dnsCredentials?.dohUrl || `https://dns.adguard-dns.com/dns-query/${transaction.id.toLowerCase()}`;
  const [customDnsLink, setCustomDnsLink] = useState<string>(defaultDnsLink);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const handleAccAndSendToCustomer = () => {
    setIsProcessing(true);
    
    // 1. Update status to TERVERIFIKASI_AKTIF
    updateTransaction(transaction.id, {
      status: 'TERVERIFIKASI_AKTIF',
      verifiedAt: new Date().toISOString()
    });

    playSuccessChime();

    // 2. Build prefilled WhatsApp message to the buyer with the DNS link
    const buyerWaUrl = generateAdminToCustomerWhatsAppUrl(transaction, customDnsLink.trim() || undefined);

    // 3. Open WhatsApp to buyer
    window.open(buyerWaUrl, '_blank');

    setIsProcessing(false);
    onSuccessAcc();
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(customDnsLink);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-xl w-full shadow-2xl border-2 border-emerald-500 overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header Bar */}
        <div className="bg-gradient-to-r from-gray-950 via-gray-900 to-emerald-950 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center">
              <Bot className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-black uppercase tracking-wider text-emerald-400">
                  BOT KENDALI WHATSAPP ADMIN
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-900 text-emerald-300 border border-emerald-700">
                  ACC ORDER
                </span>
              </div>
              <h2 className="text-base font-bold text-white">
                Setujui &amp; Kirim Link DNS ke Pembeli
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-gray-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 sm:p-6 space-y-4 max-h-[80vh] overflow-y-auto">
          
          {/* Order Quick Summary */}
          <div className="p-4 rounded-2xl bg-emerald-50/80 border border-emerald-200 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-emerald-800 bg-white px-2.5 py-0.5 rounded-lg border border-emerald-300">
                {transaction.id}
              </span>
              <span className="text-xs font-black text-emerald-700">
                {formatRupiah(transaction.totalPrice)}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs pt-1">
              <div>
                <span className="text-gray-500 text-[10px] font-bold block">PEMBELI</span>
                <span className="font-black text-gray-800">{transaction.customerName}</span>
              </div>
              <div>
                <span className="text-gray-500 text-[10px] font-bold block">WHATSAPP</span>
                <span className="font-bold text-gray-800">{transaction.whatsappNumber}</span>
              </div>
              <div>
                <span className="text-gray-500 text-[10px] font-bold block">PAKET</span>
                <span className="font-bold text-emerald-800">{transaction.packageName} (1 Perangkat)</span>
              </div>
              <div>
                <span className="text-gray-500 text-[10px] font-bold block">WAKTU</span>
                <span className="font-medium text-gray-600">{formatDateTime(transaction.createdAt)}</span>
              </div>
            </div>
          </div>

          {/* Proof of Payment Thumbnail if attached */}
          {transaction.proofImageUrl && (
            <div className="p-3 bg-gray-50 rounded-2xl border border-gray-200">
              <span className="text-[11px] font-black text-gray-700 block mb-1.5 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Bukti Transfer yang Dilampirkan Pembeli:</span>
              </span>
              <img
                src={transaction.proofImageUrl}
                alt="Bukti Transfer"
                className="max-h-56 w-auto object-contain rounded-xl mx-auto border border-gray-200 shadow-2xs cursor-pointer"
                onClick={() => window.open(transaction.proofImageUrl, '_blank')}
              />
            </div>
          )}

          {/* DNS Link Input field */}
          <div className="p-4 rounded-2xl bg-white border-2 border-emerald-400 space-y-2 shadow-xs">
            <div className="flex items-center justify-between">
              <label className="text-xs font-black text-gray-900 flex items-center gap-1.5">
                <Link2 className="w-4 h-4 text-emerald-600" />
                <span>Link Konfigurasi DNS yang Dikirim ke Pembeli:</span>
              </label>
              <button
                type="button"
                onClick={handleCopyLink}
                className="text-[11px] text-emerald-700 font-bold hover:underline inline-flex items-center gap-1"
              >
                {copiedLink ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3 text-emerald-600" />}
                <span>{copiedLink ? 'Tersalin' : 'Salin Link'}</span>
              </button>
            </div>

            <textarea
              rows={2}
              value={customDnsLink}
              onChange={(e) => setCustomDnsLink(e.target.value)}
              placeholder="Masukkan / tempel link konfigurasi DNS di sini"
              className="w-full p-2.5 text-xs font-mono bg-gray-50 border border-gray-300 rounded-xl outline-none focus:border-emerald-500 text-gray-800"
            />

            <p className="text-[11px] text-gray-500">
              💡 Link di atas akan langsung disertakan dalam pesan otomatis WhatsApp ke nomor pembeli ({transaction.whatsappNumber}).
            </p>
          </div>

          {/* Primary Action Button: ACC & Send */}
          <div className="space-y-2 pt-1">
            <button
              type="button"
              disabled={isProcessing}
              onClick={handleAccAndSendToCustomer}
              className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-700 hover:from-emerald-700 hover:to-green-800 text-white font-black text-base flex items-center justify-center gap-2.5 shadow-xl shadow-emerald-600/30 hover:scale-[1.01] active:scale-100 transition-all cursor-pointer"
            >
              <Send className="w-5 h-5 stroke-[2.5]" />
              <span>🚀 ACC &amp; Kirim Link DNS ke WA Pembeli</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="w-full py-2.5 text-xs font-bold text-gray-500 hover:text-gray-800"
            >
              Tutup &amp; Cek Nanti
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
