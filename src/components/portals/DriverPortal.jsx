import React, { useState, useMemo, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useData } from '@/contexts/DataContext';
import { Toaster } from '@/components/ui/toaster';
import DriverLayout from '@/components/portals/DriverLayout';
import QuoteOpportunities from '@/components/QuoteOpportunities';
import DriverPayouts from '@/components/DriverPayouts';
import MyJobs from '@/components/portals/MyJobs';
import ReputationManager from '@/components/ReputationManager';
import MyReviews from '@/components/portals/MyReviews';
import { useParams, useNavigate } from 'react-router-dom';
import TripExpenseManager from '@/components/portals/TripExpenseManager';
import MyDocuments from '@/components/portals/MyDocuments';
import ReferralManager from '@/components/ReferralManager';
import RankingSystem from '@/components/RankingSystem';
import { Loader2 } from 'lucide-react';
import EditarPerfilTransportador from '@/components/EditarPerfilTransportador';
import AvisosPainelTransportador from '@/components/AvisosPainelTransportador';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import IndicadorInfo from '@/components/IndicadorInfo';

const DriverPortal = () => {
  const { driverId } = useParams();
  const navigate = useNavigate();
  const { session } = useAuth();
  const [activeTab, setActiveTab] = useState('avisos');
  
  const { transporters, freightOrders, quoteRequests, earningsConfig, loading, updateTransporter, setFreightOrders } = useData();

  const currentDriver = useMemo(() => transporters?.find(d => d.id === driverId), [transporters, driverId]);
  
  const driverOrders = useMemo(() => {
    if (!freightOrders || !driverId) return [];
    return freightOrders.filter(order => order.driver_id === driverId);
  }, [freightOrders, driverId]);

  useEffect(() => {
    if (!loading && (!session || session.user.id !== driverId)) {
      navigate('/acessar/transportador');
    }
  }, [loading, session, driverId, navigate]);
  
  const renderContent = () => {
    if (loading || !currentDriver) {
        return (
          <div className="w-full h-full flex flex-col items-center justify-center bg-slate-900/50">
            <Loader2 className="h-12 w-12 animate-spin text-blue-500" />
            <p className="mt-4 text-lg text-white">Carregando dados do transportador...</p>
          </div>
        );
    }

    const userId = session?.user?.id;

    switch (activeTab) {
      case 'avisos':
        return userId ? <AvisosPainelTransportador userId={userId} /> : null;
      case 'quote-opportunities':
        return <QuoteOpportunities currentDriverId={userId} />;
      case 'my-jobs':
        return <MyJobs orders={driverOrders} setOrders={setFreightOrders} />;
      case 'payouts':
        return <DriverPayouts isAdminView={false} driver={currentDriver} />;
      case 'trip-management':
        return <TripExpenseManager orders={driverOrders} setOrders={setFreightOrders} />;
      case 'my-documents':
        return <MyDocuments user={currentDriver} userType="driver" />;
      case 'ranking-system':
        return <RankingSystem currentDriverId={userId} />;
      case 'referrals':
        return <ReferralManager user={currentDriver} userType="driver" />;
      case 'reputation':
        return (
          <div className="space-y-8">
            <ReputationManager orders={driverOrders} setOrders={setFreightOrders} userType="driver" userId={userId} />
            <MyReviews orders={driverOrders} userType="driver" userId={userId} />
          </div>
        );
      case 'profile':
        return <EditarPerfilTransportador userId={userId} />;
      default:
        return userId ? <AvisosPainelTransportador userId={userId} /> : null;
    }
  };

  return (
    <>
      <Helmet>
        <title>{`Portal do Transportador - ${currentDriver ? currentDriver.nome_completo : 'Carregando...'}`}</title>
        <meta name="description" content="Seu portal para gerenciar fretes e pagamentos." />
      </Helmet>
      
      <DriverLayout 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        driverName={currentDriver ? currentDriver.nome_completo : ''}
        navItems={[
          { id: 'avisos', label: 'Avisos', icon: 'Bell' },
          { id: 'quote-opportunities', label: 'Oportunidades', icon: 'FileText' },
          { id: 'my-jobs', label: 'Meus Fretes', icon: 'Package' },
          { id: 'payouts', label: 'Meus Pagamentos', icon: 'DollarSign' },
          { id: 'trip-management', label: 'Gestão de Viagem', icon: 'Calculator' },
          { id: 'my-documents', label: 'Meus Documentos', icon: 'FileBadge' },
          { id: 'ranking-system', label: 'Meu Ranking', icon: 'TrendingUp' },
          { id: 'referrals', label: 'Indique e Ganhe', icon: 'Gift' },
          { id: 'reputation', label: 'Minhas Avaliações', icon: 'Star' },
          { id: 'profile', label: 'Meu Perfil', icon: 'User' },
        ]}
      >
        <div className="p-4 sm:p-6 lg:p-8">
            {currentDriver && <IndicadorInfo tipo="transporters" userId={currentDriver.id} />}
            <div className="mt-6">
                {renderContent()}
            </div>
        </div>
      </DriverLayout>
      
      <Toaster />
    </>
  );
};

export default DriverPortal;