import React from 'react';
import { 
  X, 
  HelpCircle, 
  Info, 
  Headphones, 
  Smartphone, 
  Laptop, 
  Wifi, 
  ShieldCheck, 
  CheckCircle,
  Copy
} from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AboutModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-7 shadow-2xl border border-emerald-100 space-y-5 my-auto animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between pb-3 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <Info className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-black text-gray-900">Tentang AdGuard DNS</h3>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4 text-xs sm:text-sm text-gray-600 leading-relaxed max-h-[65vh] overflow-y-auto pr-1">
          <p>
            <strong>AdGuard DNS</strong> adalah solusi Domain Name System (DNS) revolusioner yang dirancang khusus untuk memblokir iklan, pelacak (trackers), serta domain berbahaya (phishing/malware) langsung dari tingkat jaringan, tanpa memerlukan aplikasi tambahan yang menguras baterai.
          </p>

          <div className="p-3.5 bg-emerald-50 rounded-2xl border border-emerald-200 space-y-2">
            <h4 className="font-bold text-emerald-900 text-xs uppercase tracking-wide">
              Mengapa Memilih AdGuard DNS?
            </h4>
            <ul className="space-y-1.5 text-xs text-emerald-800">
              <li className="flex items-center gap-2">✔ <strong>Bebas Iklan Menjengkelkan:</strong> Blokir banner, pop-up, dan video ads di web maupun aplikasi.</li>
              <li className="flex items-center gap-2">✔ <strong>Privasi 100% Terjaga:</strong> Tidak ada pencatatan log riwayat penelusuran (Strict No-Log Policy).</li>
              <li className="flex items-center gap-2">✔ <strong>Internet Lebih Hemat &amp; Kencang:</strong> Menghemat kuota data hingga 30% karena konten iklan diblokir sebelum diunduh.</li>
              <li className="flex items-center gap-2">✔ <strong>Kompatibel Semua Gadget:</strong> Bisa digunakan di HP Android, iPhone/iPad, PC Windows, Mac, hingga Router WiFi.</li>
            </ul>
          </div>

          <p>
            Dengan jaringan Anycast global berkecepatan tinggi, AdGuard DNS secara otomatis mengarahkan query internet Anda ke server terdekat di kawasan Asia Tenggara untuk latency minimal dan respon secepat kilat.
          </p>
        </div>

        <div className="pt-2 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-colors"
          >
            Mengerti &amp; Tutup
          </button>
        </div>
      </div>
    </div>
  );
};

export const FaqModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const faqs = [
    {
      q: 'Apa itu pembayaran QRIS di sini dan bagaimana verifikasinya?',
      a: 'Pembayaran hanya melalui QRIS resmi. Sistem secara otomatis menambahkan 3 digit kode unik pada nominal transaksi Anda (misal: Rp 200.147). Begitu transfer QRIS berhasil dan Anda menekan tombol konfirmasi WhatsApp, sistem kami langsung memvalidasi pembayaran dan memproses aktivasi.'
    },
    {
      q: 'Apakah saya wajib install aplikasi AdGuard?',
      a: 'Tidak wajib! Anda bisa langsung memasukkan alamat DNS (IPv4 atau Private DNS Hostname) di menu Pengaturan Jaringan perangkat Anda (Android, iOS, Windows, macOS, atau Router). Tanpa aplikasi, internet Anda langsung bersih dari iklan.'
    },
    {
      q: 'Berapa lama proses aktivasi setelah pembayaran?',
      a: 'Aktivasi sangat cepat (rata-rata 1 hingga 5 menit). Setelah pembayaran QRIS dilakukan dan Anda klik kirim bukti ke WhatsApp Admin, admin akan langsung memverifikasi dan mengirimkan credential DNS Anda.'
    },
    {
      q: 'Bisa digunakan untuk berapa banyak perangkat?',
      a: 'Paket langganan dapat digunakan pada smartphone, laptop, tablet, bahkan jika dipasang di router WiFi rumah/kantor, seluruh perangkat yang terhubung ke WiFi akan otomatis terproteksi.'
    },
    {
      q: 'Bagaimana jika saya mengalami kendala teknis saat setup?',
      a: 'Admin kami menyediakan bantuan teknis ramah via WhatsApp. Anda cukup chat admin dan tim kami akan memandu langkah demi langkah hingga DNS berhasil terpasang.'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-7 shadow-2xl border border-emerald-100 space-y-5 my-auto animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between pb-3 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <HelpCircle className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-black text-gray-900">Pertanyaan Umum (FAQ)</h3>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-3.5 max-h-[65vh] overflow-y-auto pr-1">
          {faqs.map((faq, idx) => (
            <div key={idx} className="p-3.5 rounded-2xl bg-gray-50 border border-gray-200/80">
              <h4 className="text-xs sm:text-sm font-bold text-gray-900 mb-1 flex items-start gap-2">
                <span className="text-emerald-600 font-black">Q:</span>
                <span>{faq.q}</span>
              </h4>
              <p className="text-xs text-gray-600 leading-relaxed pl-5">
                {faq.a}
              </p>
            </div>
          ))}
        </div>

        <div className="pt-2 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-colors"
          >
            Tutup FAQ
          </button>
        </div>
      </div>
    </div>
  );
};

export const SupportSetupModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-7 shadow-2xl border border-emerald-100 space-y-5 my-auto animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between pb-3 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <Headphones className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-black text-gray-900">Panduan Setup Lewat Aplikasi AdGuard</h3>
              <span className="text-[11px] text-emerald-700 font-bold block">Khusus 1 Perangkat Saja (Single Device)</span>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4 max-h-[65vh] overflow-y-auto pr-1">
          
          {/* 1 Device Constraint Notice */}
          <div className="p-3.5 bg-amber-50 rounded-2xl border-2 border-amber-300 text-amber-900 flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div className="text-xs">
              <span className="font-black block uppercase tracking-wide">Ketentuan Lisensi: 1 Perangkat Saja</span>
              <p className="mt-0.5 text-amber-800 font-medium">
                Setiap akses AdGuard DNS yang Anda pesan hanya dapat diaktifkan pada <strong>1 (satu) perangkat saja</strong> (Smartphone, Tablet, atau Laptop). Jika dipasang di lebih dari 1 perangkat, akses akan otomatis terblokir oleh sistem server.
              </p>
            </div>
          </div>

          {/* Langkah 1: Unduh Aplikasi AdGuard */}
          <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200 space-y-2">
            <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs sm:text-sm">
              <span className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-black">1</span>
              <span>Unduh Aplikasi AdGuard Resmi</span>
            </div>
            <p className="text-xs text-gray-600 pl-8">
              Download dan pasang aplikasi <strong>AdGuard</strong> di perangkat yang ingin Anda gunakan:
            </p>
            <ul className="list-disc list-inside text-xs text-gray-700 font-medium pl-8 space-y-1">
              <li><strong>Android:</strong> Unduh aplikasi AdGuard for Android (file APK resmi dari situs adguard.com).</li>
              <li><strong>iOS (iPhone/iPad):</strong> Unduh <em>AdGuard - Adblock &amp; Privacy</em> di Apple App Store.</li>
              <li><strong>Windows / Mac:</strong> Unduh <em>AdGuard for Windows / Mac</em>.</li>
            </ul>
          </div>

          {/* Langkah 2: Buka Menu Perlindungan DNS di Aplikasi */}
          <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200 space-y-2">
            <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs sm:text-sm">
              <span className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-black">2</span>
              <span>Buka Menu Perlindungan DNS di Aplikasi AdGuard</span>
            </div>
            <ol className="list-decimal list-inside text-xs text-gray-600 space-y-1.5 pl-8">
              <li>Buka aplikasi <strong>AdGuard</strong> yang sudah terpasang di perangkat Anda.</li>
              <li>Masuk ke menu <strong>Pengaturan (Settings)</strong> &gt; pilih <strong>Perlindungan DNS (DNS Protection)</strong>.</li>
              <li>Aktifkan sakelar tombol <strong>Perlindungan DNS</strong> hingga menyala hijau.</li>
            </ol>
          </div>

          {/* Langkah 3: Tambah Server DNS Kustom */}
          <div className="p-4 rounded-2xl bg-emerald-50/70 border-2 border-emerald-400 space-y-2">
            <div className="flex items-center gap-2 text-emerald-900 font-bold text-xs sm:text-sm">
              <span className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-black">3</span>
              <span>Masukkan Alamat DNS Pribadi Anda</span>
            </div>
            <ol className="list-decimal list-inside text-xs text-emerald-900 space-y-1.5 pl-8">
              <li>Di dalam menu DNS, pilih opsi <strong>Server DNS (DNS Server)</strong>.</li>
              <li>Gulir ke bagian bawah lalu ketuk <strong>Tambah Server DNS Kustom (Add custom server)</strong>.</li>
              <li>Isi <strong>Nama Server:</strong> <code className="bg-white px-2 py-0.5 rounded font-mono font-bold text-gray-800">AdGuard DNS (1 Perangkat)</code></li>
              <li>Isi <strong>Alamat Server DNS:</strong> Salin alamat URL DoH atau IP yang Anda dapatkan setelah bayar (misal: <code className="bg-white px-2 py-0.5 rounded font-mono font-bold text-emerald-700">94.140.14.14</code> atau link DoH khusus Anda).</li>
              <li>Ketuk <strong>Simpan &amp; Pilih Server Ini</strong>.</li>
            </ol>
          </div>

          {/* Langkah 4: Selesai */}
          <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200">
            <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs sm:text-sm mb-1">
              <span className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-black">✔</span>
              <span>Selesai &amp; Perlindungan Aktif</span>
            </div>
            <p className="text-xs text-gray-600 pl-8">
              Perangkat Anda sekarang terlindungi 100% dari iklan, pelacak, dan konten berbahaya melalui aplikasi AdGuard resmi.
            </p>
          </div>

        </div>

        <div className="pt-2 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-colors"
          >
            Mengerti &amp; Tutup Panduan
          </button>
        </div>
      </div>
    </div>
  );
};
