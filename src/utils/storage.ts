import { Transaction, AdminSettings } from '../types';
import { INITIAL_TRANSACTIONS, DEFAULT_ADMIN_SETTINGS } from '../data/packages';

const STORAGE_KEY_TX = 'adguard_transactions_v2';
const STORAGE_KEY_SETTINGS = 'adguard_settings_v2';
export const TX_EVENT_NAME = 'adguard_tx_event';

export function getTransactions(): Transaction[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_TX);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY_TX, JSON.stringify(INITIAL_TRANSACTIONS));
      return INITIAL_TRANSACTIONS;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_TRANSACTIONS;
  }
}

export function saveTransactions(transactions: Transaction[]) {
  try {
    localStorage.setItem(STORAGE_KEY_TX, JSON.stringify(transactions));
    window.dispatchEvent(new CustomEvent(TX_EVENT_NAME, { detail: transactions }));
  } catch (e) {
    console.error('Failed to save transactions:', e);
  }
}

// Sync to backend server so it works across different devices / browsers
export async function syncTransactionToServer(tx: Transaction): Promise<void> {
  try {
    await fetch('/api/transactions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(tx),
    });
  } catch (err) {
    console.warn('Backend sync failed, stored in localStorage only', err);
  }
}

export function addTransaction(tx: Transaction): Transaction {
  const all = getTransactions();
  const updated = [tx, ...all.filter(t => t.id !== tx.id)];
  saveTransactions(updated);
  // Persist to server
  syncTransactionToServer(tx);
  return tx;
}

export function updateTransaction(id: string, patch: Partial<Transaction>): Transaction | null {
  const all = getTransactions();
  const idx = all.findIndex((t) => t.id.toLowerCase() === id.toLowerCase());
  if (idx === -1) return null;

  const current = all[idx];
  const updatedTx: Transaction = {
    ...current,
    ...patch,
  };

  // If status is transitioning to TERVERIFIKASI_AKTIF and no dnsCredentials, generate them
  if (patch.status === 'TERVERIFIKASI_AKTIF' && !updatedTx.dnsCredentials) {
    const cleanName = updatedTx.customerName.toLowerCase().replace(/[^a-z0-9]/g, '').slice(0, 8) || 'user';
    const tag = `adg-${cleanName}-${Math.floor(1000 + Math.random() * 9000)}`;
    updatedTx.dnsCredentials = {
      primaryIpv4: '94.140.14.14',
      secondaryIpv4: '94.140.15.15',
      primaryIpv6: '2a10:50c0::ad1:ff',
      secondaryIpv6: '2a10:50c0::ad2:ff',
      dohUrl: `https://dns.adguard-dns.com/dns-query/${tag}`,
      dotServer: `${tag}.adguard-dns.com`,
      userTag: tag
    };
    updatedTx.verifiedAt = new Date().toISOString();
  }

  all[idx] = updatedTx;
  saveTransactions(all);
  // Persist to server
  syncTransactionToServer(updatedTx);
  return updatedTx;
}

// Fetch single transaction (checks localStorage first, then queries backend API)
export async function fetchTransactionAsync(id: string): Promise<Transaction | null> {
  // First check localStorage
  const all = getTransactions();
  const localMatch = all.find((t) => t.id.toLowerCase() === id.toLowerCase());
  
  try {
    const res = await fetch(`/api/transactions/${encodeURIComponent(id)}`);
    if (res.ok) {
      const serverTx: Transaction = await res.json();
      // Cache to local storage
      const merged = [serverTx, ...all.filter(t => t.id.toLowerCase() !== id.toLowerCase())];
      saveTransactions(merged);
      return serverTx;
    }
  } catch (err) {
    console.debug('Failed to fetch from server API, using local match', err);
  }

  return localMatch || null;
}

// Initial fetch of all transactions from server
export async function fetchAllTransactionsFromServer(): Promise<Transaction[]> {
  try {
    const res = await fetch('/api/transactions');
    if (res.ok) {
      const serverList: Transaction[] = await res.json();
      if (serverList && serverList.length > 0) {
        saveTransactions(serverList);
        return serverList;
      }
    }
  } catch (err) {
    console.debug('Could not fetch list from server', err);
  }
  return getTransactions();
}

export function getAdminSettings(): AdminSettings {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_SETTINGS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY_SETTINGS, JSON.stringify(DEFAULT_ADMIN_SETTINGS));
      return DEFAULT_ADMIN_SETTINGS;
    }
    const parsed = JSON.parse(raw);
    if (!parsed.adminWhatsapp || parsed.adminWhatsapp.includes('81234567890')) {
      parsed.adminWhatsapp = DEFAULT_ADMIN_SETTINGS.adminWhatsapp;
      parsed.merchantName = DEFAULT_ADMIN_SETTINGS.merchantName;
      parsed.nmid = DEFAULT_ADMIN_SETTINGS.nmid;
      localStorage.setItem(STORAGE_KEY_SETTINGS, JSON.stringify(parsed));
    }
    return parsed;
  } catch {
    return DEFAULT_ADMIN_SETTINGS;
  }
}

export function saveAdminSettings(settings: AdminSettings) {
  try {
    localStorage.setItem(STORAGE_KEY_SETTINGS, JSON.stringify(settings));
    window.dispatchEvent(new CustomEvent('adguard_settings_event', { detail: settings }));
  } catch (e) {
    console.error('Failed to save admin settings:', e);
  }
}

export function formatRupiah(amount: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount).replace('Rp', 'Rp ');
}

export function formatDateTime(isoString: string): string {
  try {
    const date = new Date(isoString);
    const day = date.getDate().toString().padStart(2, '0');
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${day} ${month} ${year}, ${hours}.${minutes} WIB`;
  } catch {
    return isoString;
  }
}

// Generate the WhatsApp confirmation link exactly matching user's requested format with bot control link
export function generateWhatsAppConfirmationUrl(tx: Transaction, adminWaNumber: string = '62895365544896'): string {
  const cleanPhone = (adminWaNumber || '62895365544896').replace(/[^0-9]/g, '');
  const receiptUrl = `${window.location.origin}${window.location.pathname}?receipt=${encodeURIComponent(tx.id)}`;
  const botAccUrl = `${window.location.origin}${window.location.pathname}?bot_acc=${encodeURIComponent(tx.id)}`;

  const message = `📌 *ORDERAN BARU MASUK - ADGUARD DNS*

Halo Admin, saya telah menyelesaikan pembayaran via *QRIS* dan melampirkan bukti bayar.

📋 *RINCIAN PESANAN:*
• *Order ID:* ${tx.id}
• *Nama Pembeli:* ${tx.customerName}
• *Nomor WhatsApp:* ${tx.whatsappNumber}
• *Paket Langganan:* ${tx.packageName} (${tx.durationLabel})
• *Total Transfer QRIS:* ${formatRupiah(tx.totalPrice)} (termasuk kode unik #${tx.uniqueCode})
• *Merchant QRIS:* RHANK OLSHOP (NMID: ID1026559812460)
• *Waktu:* ${formatDateTime(tx.paidAt || tx.createdAt)}
• *Bukti Transfer:* Sudah dilampirkan di sistem ✅

🔗 *LINK BUKTI BAYAR & SLIP DIGITAL SISTEM:*
${receiptUrl}

⚡ *KENDALI BOT ADMIN (KLIK DARI CHAT WA):*
👉 *ACC & Kirim Link DNS Otomatis ke Pembeli:*
${botAccUrl}

Mohon segera diverifikasi dan dikirimkan konfigurasi akun DNS AdGuard saya ke chat ini. Terima kasih!`;

  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
}

// Generate notification message from admin to customer with DNS link
export function generateAdminToCustomerWhatsAppUrl(tx: Transaction, customDnsLink?: string): string {
  let cleanPhone = tx.whatsappNumber.replace(/[^0-9]/g, '');
  if (cleanPhone.startsWith('0')) {
    cleanPhone = '62' + cleanPhone.slice(1);
  } else if (!cleanPhone.startsWith('62')) {
    cleanPhone = '62' + cleanPhone;
  }

  const receiptUrl = `${window.location.origin}${window.location.pathname}?receipt=${encodeURIComponent(tx.id)}`;
  const creds = tx.dnsCredentials;
  const linkToSend = customDnsLink || (creds ? creds.dohUrl : `https://dns.adguard-dns.com/dns-query/${tx.id.toLowerCase()}`);
  const dotHost = creds ? creds.dotServer : `${tx.id.toLowerCase()}.adguard-dns.com`;

  const message = `Halo kak *${tx.customerName}*,

Pembayaran Anda via *QRIS (RHANK OLSHOP)* untuk *Order ID ${tx.id}* telah di-ACC & *TERVERIFIKASI RESMI*! ✅

🚀 *BERIKUT LINK & AKSES ADGUARD DNS ANDA (KHUSUS 1 PERANGKAT):*
🔗 *Link Konfigurasi DNS:*
${linkToSend}

📌 *Rincian Server DNS Pribadi:*
• *Private DNS (DoT):* \`${dotHost}\`
• *DNS-over-HTTPS (DoH):* \`${linkToSend}\`
• *IPv4 Utama:* \`94.140.14.14\`
• *IPv4 Cadangan:* \`94.140.15.15\`

📱 *PANDUAN AKTIVASI DI APLIKASI ADGUARD:*
1. Buka Aplikasi *AdGuard* di perangkat Anda (Khusus 1 Perangkat).
2. Buka menu *Pengaturan* > aktifkan *Perlindungan DNS*.
3. Pilih *Server DNS* > *Tambah Server DNS Kustom*.
4. Masukkan nama: *AdGuard DNS (1 Perangkat)*.
5. Tempelkan Link DNS di atas pada kolom Alamat Server DNS.
6. Simpan & Aktifkan. Selesai!

📄 *Slip Bukti Transaksi Resmi:*
${receiptUrl}

Jika ada kendala setting, silakan balas chat ini ya kak. Terima kasih telah berlangganan di RHANK OLSHOP!`;

  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
}

// Play notification sound safely using Web Audio API
export function playSuccessChime() {
  try {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();

    const now = ctx.currentTime;
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gainNode = ctx.createGain();

    osc1.type = 'triangle';
    osc1.frequency.setValueAtTime(523.25, now);
    osc1.frequency.exponentialRampToValueAtTime(659.25, now + 0.12);

    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(659.25, now + 0.12);
    osc2.frequency.exponentialRampToValueAtTime(1046.50, now + 0.28);

    gainNode.gain.setValueAtTime(0.2, now);
    gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.5);

    osc1.connect(gainNode);
    osc2.connect(gainNode);
    gainNode.connect(ctx.destination);

    osc1.start(now);
    osc1.stop(now + 0.2);
    osc2.start(now + 0.1);
    osc2.stop(now + 0.5);
  } catch (err) {
    console.debug('Web audio not allowed or unsupported yet', err);
  }
}
