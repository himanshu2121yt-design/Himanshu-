/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { FloatingHireButton } from './components/FloatingHireButton';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { Footer } from './components/Footer';
import { Navbar } from './components/Navbar';
import { PaymentModal } from './components/PaymentModal';
import { PaymentReceiptModal } from './components/PaymentReceiptModal';
import { AppProvider, useApp } from './context/AppContext';
import { AdminDashboard } from './pages/AdminDashboard';
import { AuthPages } from './pages/AuthPages';
import { BrandCollabPage } from './pages/BrandCollabPage';
import { ContactPage } from './pages/ContactPage';
import { CreatorPlansPage } from './pages/CreatorPlansPage';
import { CustomerDashboard } from './pages/CustomerDashboard';
import { EditorDashboard } from './pages/EditorDashboard';
import { FAQPage } from './pages/FAQPage';
import { HireMePage } from './pages/HireMePage';
import { HomePage } from './pages/HomePage';
import { LegalPages } from './pages/LegalPages';
import { PackagesPage } from './pages/PackagesPage';
import { PortfolioPage } from './pages/PortfolioPage';
import { ReviewsPage } from './pages/ReviewsPage';
import { ServicesPage } from './pages/ServicesPage';
import { PortfolioItem } from './types';

const MainLayout: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [selectedPortfolioItem, setSelectedPortfolioItem] = useState<PortfolioItem | null>(null);

  const handleSelectPortfolioItem = (item: PortfolioItem) => {
    setSelectedPortfolioItem(item);
    setActiveTab('portfolio');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <HomePage
            setActiveTab={setActiveTab}
            onSelectPortfolioItem={handleSelectPortfolioItem}
          />
        );
      case 'services':
        return <ServicesPage setActiveTab={setActiveTab} />;
      case 'creator-plans':
        return <CreatorPlansPage setActiveTab={setActiveTab} />;
      case 'packages':
        return <PackagesPage setActiveTab={setActiveTab} />;
      case 'portfolio':
        return (
          <PortfolioPage
            setActiveTab={setActiveTab}
            selectedItem={selectedPortfolioItem}
            setSelectedItem={setSelectedPortfolioItem}
          />
        );
      case 'hire-me':
        return <HireMePage setActiveTab={setActiveTab} />;
      case 'brand-collaboration':
        return <BrandCollabPage setActiveTab={setActiveTab} />;
      case 'orders':
      case 'profile':
        return <CustomerDashboard setActiveTab={setActiveTab} />;
      case 'editor-dashboard':
        return <EditorDashboard />;
      case 'admin-dashboard':
        return <AdminDashboard />;
      case 'reviews':
        return <ReviewsPage />;
      case 'faq':
        return <FAQPage />;
      case 'contact':
        return <ContactPage />;
      case 'login':
        return <AuthPages setActiveTab={setActiveTab} defaultMode="login" />;
      case 'owner-login':
        return <AuthPages setActiveTab={setActiveTab} defaultMode="owner" />;
      case 'terms':
        return <LegalPages type="terms" />;
      case 'privacy':
        return <LegalPages type="privacy" />;
      default:
        return (
          <HomePage
            setActiveTab={setActiveTab}
            onSelectPortfolioItem={handleSelectPortfolioItem}
          />
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#080a0f] text-slate-100 antialiased selection:bg-amber-500/30 selection:text-amber-200">
      {/* Top sticky navigation */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main View Area */}
      <main className="flex-1 w-full">{renderContent()}</main>

      {/* Footer */}
      <Footer setActiveTab={setActiveTab} />

      {/* Global Interactive Widgets */}
      <FloatingWhatsApp />
      <FloatingHireButton onClick={() => setActiveTab('hire-me')} />
      <PaymentModal />
      <PaymentReceiptModal />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}
