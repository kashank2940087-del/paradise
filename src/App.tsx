/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { WhatsAppModal } from './components/WhatsAppModal';
import { AdminKeyModal } from './components/AdminKeyModal';
import { AuthModal } from './components/AuthModal';
import { LoadingScreen } from './components/LoadingScreen';
import { TopBanner } from './components/TopBanner';
import { HomePage } from './pages/HomePage';
import { CoursesPage } from './pages/CoursesPage';
import { AdmissionPage } from './pages/AdmissionPage';
import { CareersPage } from './pages/CareersPage';
import { TrackerPage } from './pages/TrackerPage';
import { InquiryPage } from './pages/InquiryPage';
import { AdminPage } from './pages/AdminPage';

const AppContent: React.FC = () => {
  const { currentRoute } = useApp();
  const [showLoading, setShowLoading] = useState(true);

  return (
    <div className="min-h-screen bg-[#09090b] text-[#f5f5f7] flex flex-col font-sans-body selection:bg-[#d31027] selection:text-white">
      {showLoading && (
        <LoadingScreen onComplete={() => setShowLoading(false)} />
      )}

      {/* Real-time editable top announcement banner */}
      <TopBanner />

      <Navbar />

      <main className="flex-1 pt-20">
        {currentRoute === 'home' && <HomePage />}
        {currentRoute === 'courses' && <CoursesPage />}
        {currentRoute === 'admission' && <AdmissionPage />}
        {currentRoute === 'jobs' && <CareersPage />}
        {currentRoute === 'tracker' && <TrackerPage />}
        {currentRoute === 'inquiries' && <InquiryPage />}
        {currentRoute === 'admin' && <AdminPage />}
      </main>

      <Footer />
      <WhatsAppModal />
      <AdminKeyModal />
      <AuthModal />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
