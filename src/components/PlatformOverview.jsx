import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, User, FileText, Package, DollarSign, UserCog, ArrowRight, Users, Settings, Loader2 } from 'lucide-react';
import { useData } from '@/contexts/DataContext';

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 },
};

const PortalCard = ({ title, description, features, onNavigate, isAdminCard }) => (
  <motion.div
    variants={cardVariants}
    className="glass-effect p-8 rounded-2xl border border-white/20 shadow-2xl w-full max-w-lg"
  >
    <div className="flex items-center gap-4 mb-4">
      <div className={`p-3 rounded-full bg-white/10`}>
        {title.includes('Cliente') ? <Briefcase className="h-8 w-8 text-green-300" /> : <User className="h-8 w-8 text-purple-300" />}
      </div>
      <h2 className="text-3xl font-bold text-white">{title}</h2>
    </div>
    <p className="text-gray-300 mb-8">{description}</p>
    <div className="space-y-6">
      {features.map((feature, index) => (
        <motion.button
          key={feature.id}
          variants={itemVariants}
          onClick={() => onNavigate(feature.id)}
          className="w-full text-left flex items-center justify-between p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors duration-300 group"
        >
          <div className="flex items-center gap-4">
            <div className="p-2 bg-white/10 rounded-md">
              <feature.icon className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="font-semibold text-white">{feature.name}</p>
              <p className="text-sm text-gray-400">{feature.description}</p>
            </div>
          </div>
          <ArrowRight className="h-5 w-5 text-gray-500 group-hover:text-white group-hover:translate-x-1 transition-transform" />
        </motion.button>
      ))}
    </div>
  </motion.div>
);

const PlatformOverview = ({ userType, onNavigate }) => {
  const { loading } = useData();

  const clientFeatures = [
    { id: 'quote-request', name: 'Solicitar Orçamento', description: 'Detalhe sua necessidade e receba propostas.', icon: FileText },
    { id: 'my-quotes', name: 'Meus Orçamentos', description: 'Acompanhe e compare as propostas recebidas.', icon: Package },
    { id: 'my-orders', name: 'Meus Fretes', description: 'Visualize o andamento dos seus fretes.', icon: Package },
    { id: 'profile', name: 'Meu Perfil', description: 'Mantenha suas informações sempre atualizadas.', icon: UserCog },
  ];

  const driverFeatures = [
    { id: 'quote-opportunities', name: 'Mural de Orçamentos', description: 'Encontre fretes e envie suas propostas.', icon: FileText },
    { id: 'my-jobs', name: 'Meus Fretes', description: 'Gerencie todos os seus trabalhos aceitos.', icon: Package },
    { id: 'payouts', name: 'Meus Pagamentos', description: 'Acompanhe seus ganhos e extratos.', icon: DollarSign },
    { id: 'profile', name: 'Meu Perfil', description: 'Atualize seus dados, veículo e documentos.', icon: UserCog },
  ];
  
  const adminClientFeatures = [
    { id: 'clients', name: 'Gerenciar Clientes', description: 'Adicione, edite e visualize clientes.', icon: Users },
    { id: 'quote-request', name: 'Gerenciar Orçamentos', description: 'Monitore todas as solicitações.', icon: FileText },
  ];

  const adminDriverFeatures = [
    { id: 'drivers', name: 'Gerenciar Motoristas', description: 'Aprove, edite e monitore motoristas.', icon: Users },
    { id: 'freight-board', name: 'Gerenciar Fretes', description: 'Acompanhe todos os fretes ativos.', icon: Package },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="h-8 w-8 animate-spin text-blue-400" />
        <p className="ml-4 text-white text-xl">Carregando visão geral...</p>
      </div>
    );
  }

  if (userType === 'admin') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 gap-8 lg:flex-row">
        <PortalCard
          title="Portal do Cliente"
          description="Gerencie clientes e suas solicitações de orçamento."
          features={adminClientFeatures}
          onNavigate={onNavigate}
          isAdminCard
        />
        <PortalCard
          title="Portal do Transportador"
          description="Gerencie motoristas, seus fretes e pagamentos."
          features={adminDriverFeatures}
          onNavigate={onNavigate}
          isAdminCard
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <motion.div initial="hidden" animate="visible" exit="hidden" variants={{ visible: { transition: { staggerChildren: 0.1 } } }} className="w-full flex justify-center">
        {userType === 'client' && (
          <PortalCard
            title="Portal do Cliente"
            description="Acesso a uma experiência focada em encontrar a melhor solução de transporte com segurança e praticidade."
            features={clientFeatures}
            onNavigate={onNavigate}
          />
        )}
        {userType === 'driver' && (
          <PortalCard
            title="Portal do Transportador"
            description="Um portal completo para gerenciar sua carreira, encontrar novas oportunidades e controlar suas finanças."
            features={driverFeatures}
            onNavigate={onNavigate}
          />
        )}
      </motion.div>
    </div>
  );
};

export default PlatformOverview;