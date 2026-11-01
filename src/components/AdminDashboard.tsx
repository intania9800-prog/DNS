import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Search, 
  Filter, 
  CheckCircle, 
  Clock, 
  AlertTriangle, 
  ExternalLink, 
  MessageCircle, 
  DollarSign, 
  Plus, 
  Settings, 
  Download, 
  X, 
  Eye, 
  RefreshCw,
  Volume2,
  VolumeX,
  ShieldCheck,
  Check
} from 'lucide-react';
import { Transaction, AdminSettings, TransactionStatus } from '../types';
import { 
  formatRupiah, 
  formatDateTime, 
  updateTransaction, 
  generateAdminToCustomerWhatsAppUrl,
  playSuccessChime
} from '../utils/storage';

interface AdminDashboardProps {
  transactions: Transaction[];
  settings: AdminSettings;
  onUpdateSettings: (newSettings: AdminSettings) => void;
  onClose: () => void;
  onSimulateNewOrder: () => void;
  onViewReceipt: (tx: Transaction) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  transactions,
  settings,
  onUpdateSettings,
  onClose,
  onSimulateNewOrder,
  onViewReceipt
}) => {
  const [filterStatus, setFilterStatus] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedProofImage, setSelectedProofImage] = useState<{ url: string; title: string } | null>(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  const [adminPhoneInput, setAdminPhoneInput] = useState<string>(settings.adminWhatsapp);
  const [merchantNameInput, setMerchantNameInput] = useState<string>(settings.merchantName);
  const [settingsSavedToast, setSettingsSavedToast] = useState<boolean>(false);

  // Filtered transactions
  const filtered = transactions.filter((tx) => {
    const matchesFilter = filterStatus === 'ALL' || tx.status === filterStatus;
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      tx.id.toLowerCase().includes(q) ||
      tx.customerName.toLowerCase().includes(q) ||
      tx.whatsappNumber.includes(q) ||
      tx.packageName.toLowerCase().includes(q);
    return matchesFilter && matchesSearch;
  });

  // Calculate statistics
  const totalRevenue = transactions
    .filter((tx) => tx.status === 'TERVERIFIKASI_AKTIF')
    .reduce((acc, curr) => acc + curr.totalPrice, 0);

  const pendingConfirmationCount = transactions.filter(
    (tx) => tx.status === 'MENUNGGU_VERIFIKASI_ADMIN'
  ).length;

  const verifiedCount = transactions.filter(
    (tx) => tx.status === 'TERVERIFIKASI_AKTIF'
  ).length;

  const handleVerify = (tx: Transaction) => {
    const defaultLink = tx.dnsCredentials?.dohUrl || `https://dns.adguard-dns.com/dns-query/${tx.id.toLowerCase()}`;
    const inputLink = prompt(
      `Masukkan Link DNS yang akan dikirim ke WhatsApp ${tx.customerName} (${tx.whatsappNumber}):`,
      defaultLink
    );
    if (inputLink === null) return; // Admin cancelled

    updateTransaction(tx.id, {
      status: 'TERVERIFIKASI_AKTIF',
      verifiedAt: new Date().toISOString()
    });
    if (settings.soundAlerts) {
      playSuccessChime();
    }
    // Open WhatsApp to send DNS credentials to customer with the chosen link
    const waUrl = generateAdminToCustomerWhatsAppUrl(tx, inputLink.trim() || undefined);
    window.open(waUrl, '_blank');
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateSettings({
      ...settings,
      adminWhatsapp: adminPhoneInput.trim(),
      merchantName: merchantNameInput.trim()
    });
    setSettingsSavedToast(true);
    setTimeout(() => {
      setSettingsSavedToast(false);
      setIsSettingsOpen(false);
    }, 1500);
  };

  const handleExportCSV = () => {
    const headers = ['Order ID', 'Nama Pembeli', 'WhatsApp', 'Paket', 'Harga Dasar', 'Kode Unik', 'Total QRIS', 'Status', 'Waktu Dibuat'];
    const rows = transactions.map((t) => [
      t.id,
      `"${t.customerName}"`,
      `"${t.whatsappNumber}"`,
      `"${t.packageName}"`,
      t.basePrice,
      t.uniqueCode,
      t.totalPrice,
      t.status,
      t.createdAt
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `adguard-transaksi-${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-6xl w-full shadow-2xl border border-gray-200 overflow-hidden my-auto max-h-[92vh] flex flex-col animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header Bar */}
        <div className="bg-gray-900 text-white p-4 sm:p-5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center">
              <LayoutDashboard className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-black text-white">
                  Dashboard Admin Real-Time
                </h2>
                <span className="px-2 py-0.5 rounded-full bg-emerald-900 text-emerald-300 border border-emerald-700 text-[10px] font-bold">
                  LIVE TRACKER
                </span>
              </div>
              <p className="text-xs text-gray-400">
                Pantau pembayaran QRIS, konfirmasi WhatsApp, dan aktivasi lisensi AdGuard DNS
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsSettingsOpen(true)}
              className="p-2 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white transition-colors"
              title="Pengaturan Admin"
            >
              <Settings className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Stats Summary Row */}
        <div className="p-4 sm:p-6 bg-gray-50/70 border-b border-gray-200 shrink-0">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            
            <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-2xs">
              <span className="text-[11px] font-bold text-gray-500 uppercase block mb-1">
                Total Omset Terverifikasi
              </span>
              <span className="text-xl sm:text-2xl font-black text-emerald-600">
                {formatRupiah(totalRevenue)}
              </span>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-amber-200 shadow-2xs">
              <span className="text-[11px] font-bold text-amber-700 uppercase block mb-1">
                Menunggu Konfirmasi WA
              </span>
              <div className="flex items-baseline justify-between">
                <span className="text-xl sm:text-2xl font-black text-amber-600">
                  {pendingConfirmationCount}
                </span>
                <span className="text-[10px] text-amber-700 font-semibold">Perlu Tindakan</span>
              </div>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-2xs">
              <span className="text-[11px] font-bold text-gray-500 uppercase block mb-1">
                Pesanan Terverifikasi
              </span>
              <span className="text-xl sm:text-2xl font-black text-gray-900">
                {verifiedCount}
              </span>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-2xs">
              <span className="text-[11px] font-bold text-gray-500 uppercase block mb-1">
                Total Transaksi Masuk
              </span>
              <span className="text-xl sm:text-2xl font-black text-gray-900">
                {transactions.length}
              </span>
            </div>

          </div>
        </div>

        {/* Action Controls & Filters */}
        <div className="p-4 bg-white border-b border-gray-200 flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between shrink-0">
          
          {/* Status Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
            {[
              { id: 'ALL', label: 'Semua' },
              { id: 'MENUNGGU_VERIFIKASI_ADMIN', label: 'Menunggu Konfirmasi WA' },
              { id: 'MENUNGGU_PEMBAYARAN', label: 'Menunggu QRIS' },
              { id: 'TERVERIFIKASI_AKTIF', label: 'Terverifikasi' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilterStatus(tab.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  filterStatus === tab.id
                    ? 'bg-emerald-600 text-white shadow-2xs'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search & Simulation buttons */}
          <div className="flex items-center gap-2">
            <div className="relative flex-1 sm:w-64">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Cari ID / Nama / No WA..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 text-xs bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-emerald-500 font-medium"
              />
            </div>

            <button
              onClick={onSimulateNewOrder}
              className="px-3 py-1.5 bg-emerald-100 hover:bg-emerald-200 text-emerald-800 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors shrink-0"
              title="Simulasikan pesanan masuk baru untuk menguji alert real-time"
            >
              <Plus className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Simulasi Order Baru</span>
            </button>

            <button
              onClick={handleExportCSV}
              className="p-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-xs font-bold transition-colors shrink-0"
              title="Download Rekap CSV"
            >
              <Download className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Transactions Table Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          {filtered.length === 0 ? (
            <div className="py-16 text-center text-gray-400 space-y-2">
              <Filter className="w-10 h-10 mx-auto text-gray-300 stroke-[1.5]" />
              <p className="text-sm font-semibold text-gray-500">Tidak ada transaksi yang cocok.</p>
              <p className="text-xs">Coba sesuaikan filter status atau kata kunci pencarian.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {filtered.map((tx) => {
                const waCustomerUrl = generateAdminToCustomerWhatsAppUrl(tx);
                return (
                  <div
                    key={tx.id}
                    className="p-4 rounded-2xl bg-white border border-gray-200/90 hover:border-emerald-300 shadow-2xs hover:shadow-md transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-4"
                  >
                    {/* Left: Info */}
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-xs text-gray-900 bg-gray-100 px-2 py-0.5 rounded-md">
                          {tx.id}
                        </span>
                        
                        {/* Status Badge */}
                        {tx.status === 'TERVERIFIKASI_AKTIF' && (
                          <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-black uppercase">
                            ✔ Terverifikasi &amp; Aktif
                          </span>
                        )}
                        {tx.status === 'MENUNGGU_VERIFIKASI_ADMIN' && (
                          <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-black uppercase animate-pulse">
                            ⏳ Menunggu Konfirmasi WA
                          </span>
                        )}
                        {tx.status === 'MENUNGGU_PEMBAYARAN' && (
                          <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 text-[10px] font-black uppercase">
                            ⌛ Menunggu Bayar QRIS
                          </span>
                        )}

                        <span className="text-[11px] text-gray-400">
                          {formatDateTime(tx.createdAt)}
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs">
                        <span className="font-bold text-gray-900">
                          {tx.customerName}
                        </span>
                        <span className="text-gray-500">
                          WA: <strong className="text-gray-700">{tx.whatsappNumber}</strong>
                        </span>
                        <span className="text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded">
                          Paket {tx.packageName} ({tx.durationLabel})
                        </span>
                      </div>

                      {tx.notes && (
                        <p className="text-[11px] text-gray-500 italic">
                          Catatan pembeli: "{tx.notes}"
                        </p>
                      )}
                    </div>

                    {/* Middle: Nominal & Proof thumbnail */}
                    <div className="flex items-center gap-4">
                      {tx.proofImageUrl && (
                        <button
                          type="button"
                          onClick={() => setSelectedProofImage({ url: tx.proofImageUrl!, title: `Bukti Bayar - ${tx.id} (${tx.customerName})` })}
                          className="relative group w-12 h-12 rounded-xl overflow-hidden border border-gray-300 shrink-0"
                          title="Klik untuk melihat bukti transfer"
                        >
                          <img src={tx.proofImageUrl} alt="Bukti" className="w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white transition-opacity">
                            <Eye className="w-4 h-4" />
                          </div>
                        </button>
                      )}

                      <div className="text-right">
                        <span className="text-[10px] font-bold text-gray-400 uppercase block">Total QRIS</span>
                        <span className="text-base font-black text-emerald-600 block">
                          {formatRupiah(tx.totalPrice)}
                        </span>
                        <span className="text-[10px] text-gray-400 font-mono">
                          Kode Unik: #{tx.uniqueCode}
                        </span>
                      </div>
                    </div>

                    {/* Right: Actions */}
                    <div className="flex items-center gap-2 pt-2 lg:pt-0 border-t lg:border-t-0 border-gray-100">
                      
                      {/* Verify Button */}
                      {tx.status !== 'TERVERIFIKASI_AKTIF' ? (
                        <button
                          type="button"
                          onClick={() => handleVerify(tx)}
                          className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-2xs transition-colors"
                        >
                          <CheckCircle className="w-4 h-4" />
                          <span>Verifikasi &amp; Kirim Akses</span>
                        </button>
                      ) : (
                        <a
                          href={waCustomerUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-2 rounded-xl bg-emerald-100 hover:bg-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-1.5 transition-colors"
                        >
                          <MessageCircle className="w-4 h-4" />
                          <span>Chat Ulang WA</span>
                        </a>
                      )}

                      {/* View digital slip */}
                      <button
                        type="button"
                        onClick={() => onViewReceipt(tx)}
                        className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold transition-colors"
                        title="Lihat Slip Bukti Bayar Sistem"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </button>

                    </div>

                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Modal: View Proof Image in full */}
        {selectedProofImage && (
          <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/80">
            <div className="bg-white rounded-3xl max-w-lg w-full p-5 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-gray-900">{selectedProofImage.title}</h4>
                <button
                  onClick={() => setSelectedProofImage(null)}
                  className="text-gray-400 hover:text-gray-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="max-h-[65vh] overflow-auto flex items-center justify-center bg-gray-100 rounded-2xl p-2">
                <img src={selectedProofImage.url} alt="Bukti Bayar" className="max-h-[60vh] object-contain rounded-xl" />
              </div>
            </div>
          </div>
        )}

        {/* Modal: Admin Settings */}
        {isSettingsOpen && (
          <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/80">
            <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-5">
              <div className="flex items-center justify-between">
                <h4 className="text-base font-black text-gray-900 flex items-center gap-2">
                  <Settings className="w-4 h-4 text-emerald-600" />
                  <span>Pengaturan Admin &amp; WhatsApp</span>
                </h4>
                <button onClick={() => setIsSettingsOpen(false)}>
                  <X className="w-5 h-5 text-gray-400 hover:text-gray-700" />
                </button>
              </div>

              <form onSubmit={handleSaveSettings} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Nomor WhatsApp Admin (Penerima Konfirmasi)
                  </label>
                  <input
                    type="text"
                    value={adminPhoneInput}
                    onChange={(e) => setAdminPhoneInput(e.target.value)}
                    placeholder="Contoh: 6281234567890"
                    required
                    className="w-full px-3 py-2.5 text-xs border border-gray-300 rounded-xl outline-none focus:border-emerald-500 font-mono"
                  />
                  <span className="text-[10px] text-gray-400 mt-1 block">
                    Gunakan awalan 62 (contoh: 6281234567890).
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Nama Merchant QRIS
                  </label>
                  <input
                    type="text"
                    value={merchantNameInput}
                    onChange={(e) => setMerchantNameInput(e.target.value)}
                    placeholder="ADGUARD DNS INDONESIA"
                    required
                    className="w-full px-3 py-2.5 text-xs border border-gray-300 rounded-xl outline-none focus:border-emerald-500 font-bold"
                  />
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                  <span className="text-xs font-bold text-gray-700 flex items-center gap-1.5">
                    {settings.soundAlerts ? <Volume2 className="w-4 h-4 text-emerald-600" /> : <VolumeX className="w-4 h-4 text-gray-400" />}
                    <span>Suara Notifikasi Transaksi Baru</span>
                  </span>
                  <input
                    type="checkbox"
                    checked={settings.soundAlerts}
                    onChange={(e) => onUpdateSettings({ ...settings, soundAlerts: e.target.checked })}
                    className="w-4 h-4 text-emerald-600 rounded"
                  />
                </div>

                {settingsSavedToast && (
                  <div className="p-2.5 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-xl flex items-center gap-1.5">
                    <Check className="w-4 h-4" />
                    <span>Pengaturan berhasil disimpan!</span>
                  </div>
                )}

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsSettingsOpen(false)}
                    className="px-4 py-2 text-xs font-bold text-gray-500 hover:text-gray-800"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition-colors"
                  >
                    Simpan Perubahan
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
