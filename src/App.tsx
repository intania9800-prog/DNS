/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { 
  PackagePlan, 
  Transaction, 
  AdminSettings 
} from './types';
import { 
  getTransactions, 
  addTransaction, 
  updateTransaction, 
  getAdminSettings, 
  saveAdminSettings, 
  playSuccessChime, 
  generateWhatsAppConfirmationUrl,
  TX_EVENT_NAME 
} from './utils/storage';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { RibbonBanner } from './components/RibbonBanner';
import { OrderSection } from './components/OrderSection';
import { BottomCardsSection } from './components/BottomCardsSection';
import { FooterBanner } from './components/FooterBanner';
import { QRISModal } from './components/QRISModal';
import { SuccessReceiptModal } from './components/SuccessReceiptModal';
import { AdminDashboard } from './components/AdminDashboard';
import { AboutModal, FaqModal, SupportSetupModal } from './components/InfoModals';

export default function App() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [settings, setSettings] = useState<AdminSettings>(getAdminSettings());
  
  // Modals state
  const [activeQRISTransaction, setActiveQRISTransaction] = useState<Transaction | null>(null);
  const [activeReceiptTransaction, setActiveReceiptTransaction] = useState<Transaction | null>(null);
  const [isAdminDashboardOpen, setIsAdminDashboardOpen] = useState<boolean>(false);
  const [isAboutOpen, setIsAboutOpen] = useState<boolean>(false);
  const [isFaqOpen, setIsFaqOpen] = useState<boolean>(false);
  const [isSupportOpen, setIsSupportOpen] = useState<boolean>(false);

  // Floating notification toast for real-time events
  const [liveToast, setLiveToast] = useState<{ message: string; sub?: string } | null>(null);

  // Sync transactions from storage
  const syncTransactions = useCallback(() => {
    const list = getTransactions();
    setTransactions(list);
  }, []);

  useEffect(() => {
    syncTransactions();

    const handleTxUpdate = () => {
      syncTransactions();
    };

    window.addEventListener(TX_EVENT_NAME, handleTxUpdate);
    window.addEventListener('storage', handleTxUpdate);

    // Check if URL has ?receipt=ADG-xxx
    const searchParams = new URLSearchParams(window.location.search);
    const receiptId = searchParams.get('receipt') || searchParams.get('order');
    if (receiptId) {
      const all = getTransactions();
      const match = all.find((t) => t.id.toLowerCase() === receiptId.toLowerCase());
      if (match) {
        setActiveReceiptTransaction(match);
      }
    }

    // Discreet admin access via URL parameter ?admin=true or ?admin=44896
    const adminParam = searchParams.get('admin');
    if (adminParam === 'true' || adminParam === '1' || adminParam === '44896') {
      setIsAdminDashboardOpen(true);
    }

    return () => {
      window.removeEventListener(TX_EVENT_NAME, handleTxUpdate);
      window.removeEventListener('storage', handleTxUpdate);
    };
  }, [syncTransactions]);

  // Handle Form Pemesanan submission
  const handleOrderSubmit = (data: { customerName: string; whatsappNumber: string; selectedPlan: PackagePlan }) => {
    // Generate unique order ID and 3-digit verification code
    const orderId = `ADG-${Math.floor(100000 + Math.random() * 900000)}`;
    const uniqueCode = Math.floor(100 + Math.random() * 899);
    const totalPrice = data.selectedPlan.price + uniqueCode;

    const newTx: Transaction = {
      id: orderId,
      customerName: data.customerName,
      whatsappNumber: data.whatsappNumber,
      packageId: data.selectedPlan.id,
      packageName: data.selectedPlan.name,
      durationLabel: data.selectedPlan.durationLabel,
      basePrice: data.selectedPlan.price,
      uniqueCode,
      totalPrice,
      paymentMethod: 'QRIS',
      status: 'MENUNGGU_PEMBAYARAN',
      createdAt: new Date().toISOString()
    };

    addTransaction(newTx);
    setActiveQRISTransaction(newTx);
  };

  // User confirmed "Saya Sudah Bayar via QRIS" & attached proof
  const handleConfirmPaid = (proofUrl?: string, notes?: string) => {
    if (!activeQRISTransaction) return;

    const updated = updateTransaction(activeQRISTransaction.id, {
      status: 'MENUNGGU_VERIFIKASI_ADMIN',
      paidAt: new Date().toISOString(),
      proofImageUrl: proofUrl,
      notes: notes || undefined
    });

    if (updated) {
      // Confetti celebratory effect
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#10b981', '#059669', '#34d399', '#84cc16']
        });
      } catch (err) {
        console.debug('Confetti effect failed', err);
      }

      playSuccessChime();

      setActiveQRISTransaction(null);
      setActiveReceiptTransaction(updated);

      // DIRECT INSTANT REDIRECT TO ADMIN WHATSAPP (+62 895-3655-44896)
      const waUrl = generateWhatsAppConfirmationUrl(updated, settings.adminWhatsapp || '62895365544896');
      try {
        window.open(waUrl, '_blank');
      } catch (e) {
        console.debug('Window open was blocked, user can click the button on screen', e);
      }

      setLiveToast({
        message: 'Bukti Bayar Tersimpan!',
        sub: 'Mengarahkan langsung ke chat WhatsApp Admin (+62 895-3655-44896)...'
      });
      setTimeout(() => setLiveToast(null), 6000);
    }
  };

  // Discreet PIN trigger for admin access from footer
  const handleSecretAdminAccess = () => {
    const pin = prompt('Akses Khusus Admin RHANK OLSHOP\nMasukkan PIN Keamanan: (PIN: 44896)');
    if (pin === '44896' || pin === 'admin' || pin === 'admin123') {
      setIsAdminDashboardOpen(true);
    } else if (pin !== null) {
      alert('PIN salah. Akses panel admin ditolak.');
    }
  };

  // Admin simulates incoming order
  const handleSimulateNewOrder = () => {
    const names = ['Ahmad Fauzi', 'Sarah Amalia', 'Reza Gunawan', 'Nadia Putri', 'Doni Pratama'];
    const randomName = names[Math.floor(Math.random() * names.length)];
    const randomPlan = Math.random() > 0.5 ? '1 Bulan' : '3 Bulan';
    const basePrice = randomPlan === '1 Bulan' ? 200000 : 550000;
    const uniqueCode = Math.floor(100 + Math.random() * 899);

    const simTx: Transaction = {
      id: `ADG-${Math.floor(100000 + Math.random() * 900000)}`,
      customerName: randomName,
      whatsappNumber: `081${Math.floor(100000000 + Math.random() * 900000000)}`,
      packageId: randomPlan === '1 Bulan' ? 'plan-1-bulan' : 'plan-3-bulan',
      packageName: randomPlan,
      durationLabel: randomPlan,
      basePrice,
      uniqueCode,
      totalPrice: basePrice + uniqueCode,
      paymentMethod: 'QRIS',
      status: 'MENUNGGU_VERIFIKASI_ADMIN',
      createdAt: new Date().toISOString(),
      paidAt: new Date().toISOString(),
      notes: 'Simulasi order masuk otomatis via QRIS'
    };

    addTransaction(simTx);
    if (settings.soundAlerts) {
      playSuccessChime();
    }
    setLiveToast({
      message: `Orderan Baru Masuk: ${simTx.id}`,
      sub: `${simTx.customerName} - ${simTx.packageName}`
    });
    setTimeout(() => setLiveToast(null), 4000);
  };

  const handleUpdateAdminSettings = (newSettings: AdminSettings) => {
    setSettings(newSettings);
    saveAdminSettings(newSettings);
  };

  return (
    <div className="min-h-screen bg-[#f3f8f4] flex flex-col text-gray-900 selection:bg-emerald-500 selection:text-white">
      
      {/* Live Toast Notification */}
      {liveToast && (
        <div className="fixed top-20 right-4 z-50 max-w-sm p-4 bg-gray-900 text-white rounded-2xl shadow-2xl border border-emerald-500/40 flex items-start gap-3 animate-in slide-in-from-right duration-200">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 mt-1.5 shrink-0 animate-ping" />
          <div className="flex-1">
            <h4 className="text-xs font-black text-emerald-400">{liveToast.message}</h4>
            {liveToast.sub && <p className="text-[11px] text-gray-300 mt-0.5">{liveToast.sub}</p>}
          </div>
          <button
            onClick={() => setLiveToast(null)}
            className="text-gray-400 hover:text-white text-xs"
          >
            ✕
          </button>
        </div>
      )}

      {/* Main Navigation (Admin Panel Hidden from Public View) */}
      <Navbar
        onOpenAbout={() => setIsAboutOpen(true)}
        onOpenFaq={() => setIsFaqOpen(true)}
        onOpenSupport={() => setIsSupportOpen(true)}
      />

      {/* Main Landing Page Content */}
      <main className="flex-1">
        {/* 1. Hero Section */}
        <HeroSection />

        {/* 2. Ribbon Banner "Internet Bersih, Aman & Nyaman" */}
        <RibbonBanner />

        {/* 3. Main Order & Package Section */}
        <OrderSection onOrderSubmit={handleOrderSubmit} />

        {/* 4. Bottom Cards: Metode Pembayaran (100% QRIS RHANK OLSHOP), Setelah Pembayaran, Butuh Bantuan */}
        <BottomCardsSection
          onOpenSupport={() => setIsSupportOpen(true)}
          adminWhatsapp={settings.adminWhatsapp}
        />
      </main>

      {/* 5. Footer with 4 trust badges & discreet secret admin lock */}
      <FooterBanner onSecretAdminClick={handleSecretAdminAccess} />

      {/* Step 2 Modal: QRIS Payment with RHANK OLSHOP Poster and Proof Upload */}
      {activeQRISTransaction && (
        <QRISModal
          transaction={activeQRISTransaction}
          onClose={() => setActiveQRISTransaction(null)}
          onConfirmPaid={handleConfirmPaid}
        />
      )}

      {/* Step 3 Modal: Instant WhatsApp Redirect & Digital Slip Receipt */}
      {activeReceiptTransaction && (
        <SuccessReceiptModal
          transaction={activeReceiptTransaction}
          adminWhatsapp={settings.adminWhatsapp}
          onClose={() => setActiveReceiptTransaction(null)}
          onViewHowToSetup={() => {
            setActiveReceiptTransaction(null);
            setIsSupportOpen(true);
          }}
        />
      )}

      {/* Hidden Admin Dashboard (Accessible via ?admin=true or secret footer lock) */}
      {isAdminDashboardOpen && (
        <AdminDashboard
          transactions={transactions}
          settings={settings}
          onUpdateSettings={handleUpdateAdminSettings}
          onClose={() => setIsAdminDashboardOpen(false)}
          onSimulateNewOrder={handleSimulateNewOrder}
          onViewReceipt={(tx) => {
            setIsAdminDashboardOpen(false);
            setActiveReceiptTransaction(tx);
          }}
        />
      )}

      {/* Information & Help Modals */}
      <AboutModal isOpen={isAboutOpen} onClose={() => setIsAboutOpen(false)} />
      <FaqModal isOpen={isFaqOpen} onClose={() => setIsFaqOpen(false)} />
      <SupportSetupModal isOpen={isSupportOpen} onClose={() => setIsSupportOpen(false)} />

    </div>
  );
}
