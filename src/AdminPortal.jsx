import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Layout from '@/components/Layout';
import Dashboard from '@/components/Dashboard';
import DriversManager from '@/components/DriversManager';
import ClientsManager from '@/components/ClientsManager';
import OrdersManager from '@/components/OrdersManager';
import { Toaster } from '@/components/ui/toaster';
import FreightBoard from '@/components/FreightBoard';
import EarningsSettings from '@/components/EarningsSettings';
import Payments from '@/components/Payments';
import QuoteRequestManager from '@/components/QuoteRequestManager';
import Disclaimer from '@/components/Disclaimer';
import SecurePayment from '@/components/SecurePayment';
import QuoteOpportunities from '@/components/QuoteOpportunities';
import Notifications from '@/components/Notifications';
import DriverPayouts from '@/components/DriverPayouts';
import HelpCenter from '@/components/HelpCenter';
import VerificationCenter from '@/components/VerificationCenter';
import AboutUs from '@/components/AboutUs';
import PaymentSettings from '@/components/PaymentSettings';
import CompanySettings from '@/components/CompanySettings';
import PrivacyPolicy from '@/components/PrivacyPolicy';
import PlatformOverview from '@/components/PlatformOverview';
import DocumentCenter from '@/components/DocumentCenter';
import ReputationManager from '@/components/ReputationManager';
import FinancialAnalytics from '@/components/FinancialAnalytics';
import ReferralPayouts from '@/components/ReferralPayouts';
import PromotePlatform from '@/components/PromotePlatform';
import PainelIndicacoesAdmin from '@/components/PainelIndicacoesAdmin';
import { useData } from '@/contexts/DataContext';
import { Loader2 } from 'lucide-react';

function AdminPortal() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const { loading } = useData();

  const renderContent = () => {
    if (loading && activeTab !== 'dashboard') {
        return (
          <div className="w-full h-full flex flex-col items-center justify-center bg-slate-900/50">
              <Loader2 className="h-12 w-12 animate-spin text-blue-500" />
              <p className="mt-4 text-lg text-white">Carregando dados da plataforma...</p>
          </div>
        );
    }

    switch (activeTab) {
      case 'dashboard':
        return <Dashboard setActiveTab={setActiveTab} />;
      case 'platform-overview':
        return <PlatformOverview userType="admin" onNavigate={setActiveTab} />;
      case 'financial-analytics':
        return <FinancialAnalytics />;
      case 'verification-center':
        return <VerificationCenter />;
      case 'document-center':
        return <DocumentCenter />;
      case 'reputation-manager':
        return <ReputationManager />;
      case 'quote-request':
        return <QuoteRequestManager />;
      case 'freight-board':
        return <FreightBoard />;
      case 'drivers':
        return <DriversManager />;
      case 'payouts':
        return <DriverPayouts />;
      case 'clients':
        return <ClientsManager />;
      case 'orders':
        return <OrdersManager />;
      case 'promote':
        return <PromotePlatform />;
      case 'referral-report':
        return <PainelIndicacoesAdmin />;
      case 'earnings':
        return <EarningsSettings />;
      case 'referral-payouts':
        return <ReferralPayouts />;
      case 'payment-settings':
        return <PaymentSettings />;
      case 'company-settings':
        return <CompanySettings />;
      case 'disclaimer':
        return <Disclaimer />;
      case 'privacy-policy':
        return <PrivacyPolicy />;
      case 'secure-payment':
        return <SecurePayment />;
      case 'notifications':
        return <Notifications setActiveTab={setActiveTab} />;
      case 'help-center':
        return <HelpCenter />;
      case 'about-us':
        return <AboutUs />;
      default:
        return <Dashboard setActiveTab={setActiveTab} />;
    }
  };

  return (
    <>
      <Helmet>
        <title>Admin - Os Melhores do Transporte</title>
        <meta name="description" content="Painel de administração da plataforma Os Melhores do Transporte." />
      </Helmet>
      
      <Layout activeTab={activeTab} setActiveTab={setActiveTab} isAdmin>
        {renderContent()}
      </Layout>
      
      <Toaster />
    </>
  );
}

export default AdminPortal;