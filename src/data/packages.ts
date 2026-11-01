import { PackagePlan, Transaction, AdminSettings } from '../types';

export const PACKAGE_PLANS: PackagePlan[] = [
  {
    id: 'plan-1-bulan',
    name: '1 Bulan',
    durationLabel: '1 Bulan',
    durationMonths: 1,
    price: 200000,
    popular: true,
    features: [
      'Khusus 1 Perangkat Saja (Single Device)',
      'Setup Mudah via Aplikasi AdGuard Resmi',
      'Akses DNS AdGuard Stabil & Cepat',
      'Blokir Iklan & Pelacak Otomatis',
      'Pengalaman Internet Lebih Bersih',
      'Aktivasi Cepat Setelah Pembayaran'
    ]
  },
  {
    id: 'plan-3-bulan',
    name: '3 Bulan',
    durationLabel: '3 Bulan',
    durationMonths: 3,
    price: 550000,
    originalPrice: 600000,
    discountBadge: 'Hemat Rp 50.000',
    features: [
      'Khusus 1 Perangkat Saja (Single Device)',
      'Setup Mudah via Aplikasi AdGuard Resmi',
      'Akses DNS AdGuard Stabil & Cepat',
      'Blokir Iklan & Pelacak Otomatis',
      'Pengalaman Internet Lebih Bersih',
      'Prioritas Dukungan Teknis WhatsApp'
    ]
  },
  {
    id: 'plan-6-bulan',
    name: '6 Bulan',
    durationLabel: '6 Bulan',
    durationMonths: 6,
    price: 1000000,
    originalPrice: 1200000,
    discountBadge: 'Hemat Rp 200.000',
    features: [
      'Khusus 1 Perangkat Saja (Single Device)',
      'Setup Mudah via Aplikasi AdGuard Resmi',
      'Akses DNS AdGuard Stabil & Cepat',
      'Blokir Iklan & Pelacak Otomatis',
      'Pengalaman Internet Lebih Bersih',
      'Parental Control & SafeSearch Filter'
    ]
  },
  {
    id: 'plan-1-tahun',
    name: '1 Tahun',
    durationLabel: '1 Tahun',
    durationMonths: 12,
    price: 1800000,
    originalPrice: 2400000,
    discountBadge: 'Super Hemat 25%',
    features: [
      'Khusus 1 Perangkat Saja (Single Device)',
      'Setup Mudah via Aplikasi AdGuard Resmi',
      'Akses DNS AdGuard VIP Dedicated',
      'Blokir Iklan & Pelacak Maksimal',
      'Tanpa Batas Kuota Query (1 Device)',
      'VIP Support WhatsApp 24/7'
    ]
  }
];

export const DEFAULT_ADMIN_SETTINGS: AdminSettings = {
  adminWhatsapp: '62895365544896', // +62 895-3655-44896
  merchantName: 'RHANK OLSHOP',
  nmid: 'ID1026559812460',
  autoApproveMinutes: 5,
  soundAlerts: true
};

export const INITIAL_TRANSACTIONS: Transaction[] = [
  {
    id: 'ADG-782910',
    customerName: 'Budi Santoso',
    whatsappNumber: '081288991234',
    packageId: 'plan-1-bulan',
    packageName: '1 Bulan',
    durationLabel: '1 Bulan',
    basePrice: 200000,
    uniqueCode: 147,
    totalPrice: 200147,
    paymentMethod: 'QRIS',
    status: 'TERVERIFIKASI_AKTIF',
    createdAt: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
    paidAt: new Date(Date.now() - 40 * 60 * 1000).toISOString(),
    verifiedAt: new Date(Date.now() - 35 * 60 * 1000).toISOString(),
    dnsCredentials: {
      primaryIpv4: '94.140.14.14',
      secondaryIpv4: '94.140.15.15',
      primaryIpv6: '2a10:50c0::ad1:ff',
      secondaryIpv6: '2a10:50c0::ad2:ff',
      dohUrl: 'https://dns.adguard-dns.com/dns-query/budi-8899',
      dotServer: 'budi-8899.adguard-dns.com',
      userTag: 'ADG-VIP-budi'
    }
  },
  {
    id: 'ADG-782915',
    customerName: 'Rina Wijaya',
    whatsappNumber: '085712340987',
    packageId: 'plan-3-bulan',
    packageName: '3 Bulan',
    durationLabel: '3 Bulan',
    basePrice: 550000,
    uniqueCode: 283,
    totalPrice: 550283,
    paymentMethod: 'QRIS',
    status: 'MENUNGGU_VERIFIKASI_ADMIN',
    createdAt: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
    paidAt: new Date(Date.now() - 12 * 60 * 1000).toISOString(),
    notes: 'Sudah bayar via BCA QRIS mobile'
  },
  {
    id: 'ADG-782918',
    customerName: 'Dimas Pratama',
    whatsappNumber: '081399887766',
    packageId: 'plan-1-tahun',
    packageName: '1 Tahun',
    durationLabel: '1 Tahun',
    basePrice: 1800000,
    uniqueCode: 419,
    totalPrice: 1800419,
    paymentMethod: 'QRIS',
    status: 'MENUNGGU_PEMBAYARAN',
    createdAt: new Date(Date.now() - 5 * 60 * 1000).toISOString()
  }
];
