export interface PackagePlan {
  id: string;
  name: string;
  durationLabel: string;
  durationMonths: number;
  price: number;
  originalPrice?: number;
  popular?: boolean;
  discountBadge?: string;
  features: string[];
}

export type TransactionStatus =
  | 'MENUNGGU_PEMBAYARAN'
  | 'MENUNGGU_VERIFIKASI_ADMIN'
  | 'TERVERIFIKASI_AKTIF'
  | 'DIBATALKAN';

export interface Transaction {
  id: string; // e.g., ADG-94821
  customerName: string;
  whatsappNumber: string;
  packageId: string;
  packageName: string;
  durationLabel: string;
  basePrice: number;
  uniqueCode: number;
  totalPrice: number;
  paymentMethod: 'QRIS';
  status: TransactionStatus;
  createdAt: string;
  paidAt?: string;
  verifiedAt?: string;
  proofImageUrl?: string;
  proofFileName?: string;
  notes?: string;
  dnsCredentials?: {
    primaryIpv4: string;
    secondaryIpv4: string;
    primaryIpv6: string;
    secondaryIpv6: string;
    dohUrl: string;
    dotServer: string;
    userTag: string;
  };
}

export interface AdminSettings {
  adminWhatsapp: string;
  merchantName: string;
  nmid: string;
  autoApproveMinutes: number;
  soundAlerts: boolean;
}
