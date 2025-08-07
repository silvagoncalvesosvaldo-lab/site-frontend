import React, { useState, useMemo, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useData } from '@/contexts/DataContext';
import { Toaster } from '@/components/ui/toaster';
import ClientLayout from '@/components/portals/ClientLayout';
import QuoteRequestManager from '@/components/QuoteRequestManager';
import MyQuotes from '@/components/portals/MyQuotes';
import MyOrders from '@/components/portals/MyOrders';
import ClientProfile from '@/components/portals/ClientProfile';
import PlatformOverview from '@/components/PlatformOverview';
import ReputationManager from '@/components/ReputationManager';
import MyReviews from '@/components/portals/MyReviews';
import ReferralManager from '@/components/ReferralManager';
import LoyaltyProgram from '@/components/LoyaltyProgram';
import { useParams, useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import IndicadorInfo from '@/components/IndicadorInfo';

const ClientPortal = () => {
  const { clientId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('platform-overview');

  const { clients, freightOrders, quoteRequests, earningsConfig, loading, updateClient, setQuoteRequests: setGlobalQuotes, setFreightOrders: setGlobalOrders } = useData();
  
  const currentClient = useMemo(() => clients?.find(c => c.id === clientId), [clients, clientId]);
  const clientOrders = useMemo(() => freightOrders?.filter(o => o.client_id === clientId) || [], [freightOrders, clientId]);
  const clientQuotes = useMemo(() => quoteRequests?.filter(q => q.client_id === clientId) || [], [quoteRequests, clientId]);
  const completedFreights = useMemo(() => clientOrders.filter(o => o.status === 'completed'), [clientOrders]);

  useEffect(() => {
    if (!loading && !currentClient) {
      navigate('/acessar');
    }
  }, [loading, currentClient, navigate]);

  const renderContent = () => {
    if (loading || !currentClient) {
      return (
        <div className="w-full h-full flex flex-col items-center justify-center bg-slate-900/50">
            <Loader2 className="h-12 w-12 animate-spin text-blue-500" />
            <p className="mt-4 text-lg text-white">Carregando dados do cliente...</p>
        </div>
      );
    }
    
    switch (activeTab) {
      case 'platform-overview':
        return <PlatformOverview userType="client" onNavigate={setActiveTab} />;
      case 'quote-request':
        return <QuoteRequestManager isClientPortal clientData={currentClient} />;
      case 'my-quotes':
        return <MyQuotes quotes={clientQuotes} />;
      case 'my-orders':
        return <MyOrders orders={clientOrders} setOrders={setGlobalOrders} />;
      case 'loyalty':
        return <LoyaltyProgram completedFreightsCount={completedFreights.length} loyaltyTiers={earningsConfig?.loyalty_tiers} />;
      case 'referrals':
        return <ReferralManager user={currentClient} userType="client" />;
      case 'reputation':
        return (
          <div className="space-y-8">
            <ReputationManager orders={clientOrders} setOrders={setGlobalOrders} userType="client" userId={clientId} />
            <MyReviews orders={clientOrders} userType="client" userId={clientId} />
          </div>
        );
      case 'profile':
        return <ClientProfile client={currentClient} onUpdate={updateClient} />;
      default:
        return <PlatformOverview userType="client" onNavigate={setActiveTab} />;
    }
  };

  return (
    <>
      <Helmet>
        <title>{`Portal do Cliente - ${currentClient ? currentClient.name : 'Carregando...'}`}</title>
        <meta name="description" content="Seu portal para solicitar e gerenciar fretes." />
      </Helmet>
      
      <ClientLayout
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        clientName={currentClient ? currentClient.name : ''}
        navItems={[
          { id: 'platform-overview', label: 'Visão Geral', icon: 'Info' },
          { id: 'quote-request', label: 'Solicitar Orçamento', icon: 'FileText' },
          { id: 'my-quotes', label: 'Meus Orçamentos', icon: 'MessageSquare' },
          { id: 'my-orders', label: 'Meus Fretes', icon: 'Package' },
          { id: 'loyalty', label: 'Plano de Fidelidade', icon: 'Award' },
          { id: 'referrals', label: 'Indique e Ganhe', icon: 'Gift' },
          { id: 'reputation', label: 'Avaliações', icon: 'Star' },
          { id: 'profile', label: 'Meu Perfil', icon: 'User' },
        ]}
      >
        <div className="p-4 sm:p-6 lg:p-8">
            {currentClient && <IndicadorInfo tipo="clients" userId={currentClient.id} />}
            <div className="mt-6">
                {renderContent()}
            </div>
        </div>
      </ClientLayout>

      <Toaster />
    </>
  );
};

export default ClientPortal;