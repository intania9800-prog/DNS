import React, { useState, useEffect, useRef } from 'react';
import QRCode from 'qrcode';
import { 
  QrCode, 
  Copy, 
  Check, 
  Clock, 
  Upload, 
  AlertCircle, 
  Download, 
  ArrowRight, 
  ShieldCheck, 
  X,
  FileCheck
} from 'lucide-react';
import { Transaction } from '../types';
import { formatRupiah } from '../utils/storage';

interface QRISModalProps {
  transaction: Transaction;
  onClose: () => void;
  onConfirmPaid: (proofUrl?: string, notes?: string) => void;
}

export const QRISModal: React.FC<QRISModalProps> = ({
  transaction,
  onClose,
  onConfirmPaid
}) => {
  const [copied, setCopied] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number>(15 * 60); // 15 minutes
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [proofPreview, setProofPreview] = useState<string | null>(transaction.proofImageUrl || null);
  const [proofFileName, setProofFileName] = useState<string | null>(transaction.proofFileName || null);
  const [customerNotes, setCustomerNotes] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Generate QR code for the specific transaction
  useEffect(() => {
    // Generate valid EMVCo QRIS simulation string for merchant ADGUARD DNS
    const qrisPayload = `00020101021226670016ID.CO.QRIS.WWW01189360099900010200388291020215ADGUARDDNS010303UME51440014ID.GO.IDR.WWW0215ID10200388291020303UME52045812530336054${transaction.totalPrice.toString().padStart(6, '0')}5802ID5921ADGUARD DNS INDONESIA6007JAKARTA61051234062${(transaction.id.length + 4).toString().padStart(2, '0')}01${transaction.id.length.toString().padStart(2, '0')}${transaction.id}6304ABCD`;

    QRCode.toDataURL(qrisPayload, {
      width: 320,
      margin: 2,
      color: {
        dark: '#0f172a',
        light: '#ffffff',
      },
    })
      .then((url) => setQrDataUrl(url))
      .catch((err) => console.error('Failed to generate QR code', err));
  }, [transaction]);

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  const handleCopyNominal = () => {
    navigator.clipboard.writeText(transaction.totalPrice.toString());
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProofFileName(file.name);
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        setProofPreview(uploadEvent.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDownloadQR = () => {
    if (!qrDataUrl) return;
    const a = document.createElement('a');
    a.href = qrDataUrl;
    a.download = `QRIS-${transaction.id}-${transaction.totalPrice}.png`;
    a.click();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-xl w-full shadow-2xl border border-emerald-100 overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-200">
        
        {/* Top Header */}
        <div className="bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-700 text-white p-5 sm:p-6 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-lime-200 text-xs font-bold uppercase tracking-wider">
                Pembayaran Hanya QRIS
              </span>
              <span className="text-xs text-emerald-100 font-mono">
                #{transaction.id}
              </span>
            </div>
            <h2 className="text-lg sm:text-xl font-black mt-1">
              Scan &amp; Bayar via QRIS
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 sm:p-6 space-y-6">
          
          {/* Timer and Notice */}
          <div className="flex items-center justify-between p-3 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-600 shrink-0" />
              <span className="text-xs font-semibold">Selesaikan pembayaran dalam:</span>
            </div>
            <span className="font-mono font-black text-sm px-2.5 py-0.5 bg-amber-200 text-amber-900 rounded-lg">
              {formattedTime}
            </span>
          </div>

          {/* Amount to Pay with Unique Code */}
          <div className="bg-emerald-50/80 rounded-2xl p-4 sm:p-5 border border-emerald-200/90 text-center relative">
            <span className="text-xs font-bold text-emerald-800 uppercase tracking-wide">
              Total Pembayaran Tepat
            </span>
            <div className="flex items-baseline justify-center gap-2 my-1">
              <span className="text-3xl sm:text-4xl font-black text-emerald-700 tracking-tight">
                {formatRupiah(transaction.totalPrice)}
              </span>
            </div>

            <div className="flex items-center justify-center gap-2 mt-2">
              <span className="text-xs text-gray-600 font-medium">
                (Paket {formatRupiah(transaction.basePrice)} + Kode Unik <strong className="text-emerald-700">+{transaction.uniqueCode}</strong>)
              </span>
              <button
                type="button"
                onClick={handleCopyNominal}
                className="inline-flex items-center gap-1 px-3 py-1 bg-white hover:bg-emerald-100 text-emerald-800 rounded-lg border border-emerald-300 text-xs font-bold shadow-2xs transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-emerald-700" />}
                <span>{copied ? 'Tersalin!' : 'Salin Nominal'}</span>
              </button>
            </div>
            
            <p className="text-[11px] text-amber-700 font-bold mt-2">
              ⚠️ PENTING: Mohon transfer <strong>PERSIS sesuai 3 digit kode unik</strong> agar otomatis terverifikasi sistem.
            </p>
          </div>

          {/* Official QRIS Poster Card from User Upload */}
          <div className="flex flex-col items-center justify-center p-4 bg-gray-50/90 rounded-2xl border-2 border-emerald-500/80 text-center">
            
            {/* QRIS Header banner */}
            <div className="flex items-center justify-between w-full max-w-sm px-2 mb-2">
              <span className="font-black text-lg text-gray-900 tracking-tighter bg-gray-900 text-white px-2 py-0.5 rounded">
                QRIS
              </span>
              <span className="text-xs font-mono font-bold text-gray-700">
                NMID : ID1026559812460
              </span>
            </div>

            {/* Official QRIS Image */}
            <div className="relative p-2 bg-white rounded-2xl shadow-lg border border-gray-200 max-w-sm w-full">
              <img
                src="/assets/aistudio/image_10d9fd81.png"
                alt="QRIS RHANK OLSHOP ID1026559812460"
                className="w-full max-h-96 object-contain rounded-xl mx-auto shadow-xs"
              />
            </div>

            {/* Merchant Details */}
            <div className="mt-3 text-center">
              <div className="text-sm font-black text-gray-900 tracking-wide uppercase">
                RHANK OLSHOP
              </div>
              <div className="text-xs text-gray-500 font-medium">
                Satu QRIS Untuk Semua Pembayaran
              </div>
            </div>

            <a
              href="/assets/aistudio/image_10d9fd81.png"
              download="QRIS-RHANK-OLSHOP.png"
              className="mt-2 text-xs text-emerald-700 font-bold hover:underline inline-flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Unduh Barcode QRIS</span>
            </a>
          </div>

          {/* Mandatory Bukti Pembayaran Upload */}
          <div className="p-4 rounded-2xl bg-emerald-50/60 border-2 border-emerald-400">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-black text-gray-800 flex items-center gap-1.5">
                <Upload className="w-4 h-4 text-emerald-600" />
                <span>Lampirkan Bukti Pembayaran (Wajib)</span>
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-200 text-emerald-900">
                Wajib Dilampirkan
              </span>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
            />

            {proofPreview ? (
              <div className="flex items-center justify-between p-3 bg-white rounded-xl border border-emerald-300 shadow-2xs">
                <div className="flex items-center gap-3">
                  <img src={proofPreview} alt="Bukti Transfer" className="w-14 h-14 object-cover rounded-lg border border-emerald-400" />
                  <div>
                    <span className="text-xs font-bold text-gray-900 block truncate max-w-xs">
                      {proofFileName || 'bukti-transfer.jpg'}
                    </span>
                    <span className="text-[10px] text-emerald-700 font-black flex items-center gap-1 mt-0.5">
                      <FileCheck className="w-3.5 h-3.5 text-emerald-600" /> Bukti Berhasil Dilampirkan
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setProofPreview(null);
                    setProofFileName(null);
                  }}
                  className="text-xs text-red-600 font-bold hover:underline px-2 py-1"
                >
                  Ganti Foto
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-full py-4 px-3 rounded-xl border-2 border-dashed border-emerald-400 hover:border-emerald-600 text-xs text-emerald-900 font-bold flex flex-col items-center justify-center gap-1.5 bg-white hover:bg-emerald-100/50 transition-all cursor-pointer"
              >
                <div className="w-9 h-9 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700">
                  <Upload className="w-5 h-5" />
                </div>
                <span>Klik Di Sini Untuk Unggah Foto Bukti Transfer</span>
                <span className="text-[10px] text-gray-500 font-medium">(Screenshot m-banking / e-wallet transfer berhasil)</span>
              </button>
            )}

            <div className="mt-2.5">
              <input
                type="text"
                placeholder="Catatan tambahan (contoh: transfer atas nama Dimas)"
                value={customerNotes}
                onChange={(e) => setCustomerNotes(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg outline-none focus:border-emerald-500 text-gray-800 bg-white"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2.5 pt-2">
            <button
              type="button"
              onClick={() => {
                if (!proofPreview) {
                  // If buyer hasn't uploaded, prompt them or file input click
                  alert('Silakan lampirkan foto/screenshot bukti pembayaran terlebih dahulu sebelum diarahkan ke admin WhatsApp.');
                  fileInputRef.current?.click();
                  return;
                }
                onConfirmPaid(proofPreview || undefined, customerNotes || undefined);
              }}
              className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-emerald-500 via-green-600 to-emerald-600 hover:from-emerald-600 hover:to-green-700 text-white font-black text-base sm:text-lg flex items-center justify-center gap-2.5 shadow-xl shadow-emerald-500/30 hover:shadow-2xl hover:scale-[1.01] active:scale-100 transition-all cursor-pointer"
            >
              <span>Kirim Bukti &amp; Langsung ke Admin WA</span>
              <ArrowRight className="w-5 h-5 stroke-[2.5]" />
            </button>

            <button
              type="button"
              onClick={onClose}
              className="w-full py-2 text-xs text-gray-500 hover:text-gray-800 font-semibold"
            >
              Tutup &amp; Bayar Nanti
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
