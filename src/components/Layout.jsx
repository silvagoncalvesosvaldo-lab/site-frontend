import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { LayoutDashboard, Users, Truck, DollarSign, Settings, Shield, Bell, FileText, Coins, LogOut, MessageSquare, Star, Info, Rocket, FileBadge, BarChart, UserCheck, Menu, X, ArrowLeft, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { ScrollArea } from '@/components/ui/scroll-area';

const Layout = ({ children, activeTab, setActiveTab, isAdmin = false }) => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'platform-overview', label: 'Visão Geral', icon: Info },
    { id: 'financial-analytics', label: 'Análise Financeira', icon: BarChart },
    { id: 'verification-center', label: 'Centro de Verificação', icon: UserCheck, badge: 2 },
    { id: 'document-center', label: 'Documentos', icon: FileBadge },
    { id: 'reputation-manager', label: 'Reputação', icon: Star },
    { id: 'quote-request', label: 'Solicitações', icon: MessageSquare },
    { id: 'freight-board', label: 'Mural de Fretes', icon: FileText },
    { id: 'drivers', label: 'Motoristas', icon: Truck },
    { id: 'clients', label: 'Clientes', icon: Users },
    { id: 'orders', label: 'Fretes Ativos', icon: Rocket },
    { id: 'payouts', label: 'Pagamentos Motoristas', icon: Coins },
    { id: 'referral-payouts', label: 'Pagamentos de Bônus', icon: DollarSign },
    { id: 'promote', label: 'Promover Plataforma', icon: Shield },
    { id: 'notifications', label: 'Notificações', icon: Bell, badge: 3 },
    { id: 'earnings', label: 'Ganhos e Fidelidade', icon: Settings },
    { id: 'payment-settings', label: 'Opções de Pagamento', icon: Settings },
    { id: 'company-settings', label: 'Dados da Empresa', icon: Settings },
  ];

  const handleLogout = () => {
    navigate('/');
  };

  const handleNavItemClick = (id) => {
    setActiveTab(id);
    setIsSidebarOpen(false);
  };

  const SidebarContent = () => (
    <>
      <div>
        <h1 className="text-2xl font-bold gradient-text mb-8 hidden md:block">OS MELHORES</h1>
        <div className="flex md:hidden justify-between items-center mb-4">
           <h1 className="text-xl font-bold gradient-text">OS MELHORES</h1>
           <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white" onClick={() => setIsSidebarOpen(false)}>
            <X className="h-6 w-6" />
           </Button>
        </div>
        <ScrollArea className="h-[calc(100vh-150px)]">
          <nav className="space-y-1 pr-2">
            {navItems.map(item => (
              <Button
                key={item.id}
                variant={activeTab === item.id ? 'secondary' : 'ghost'}
                className={`w-full justify-start text-sm ${activeTab === item.id ? 'bg-blue-500/20 text-blue-300' : 'hover:bg-blue-500/10'}`}
                onClick={() => handleNavItemClick(item.id)}
              >
                <item.icon className="h-4 w-4 mr-3" />
                {item.label}
                {item.badge && <Badge className="ml-auto bg-blue-500">{item.badge}</Badge>}
              </Button>
            ))}
          </nav>
        </ScrollArea>
      </div>
      <Button variant="ghost" className="w-full justify-start hover:bg-red-500/20 hover:text-red-400 mt-4" onClick={handleLogout}>
        <LogOut className="h-4 w-4 mr-3" />
        Sair do Portal
      </Button>
    </>
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white flex">
      <aside className="w-64 bg-black/30 p-6 flex-shrink-0 flex-col justify-between border-r border-white/10 hidden md:flex">
        <SidebarContent />
      </aside>

      <motion.aside
        initial={{ x: '-100%' }}
        animate={{ x: isSidebarOpen ? 0 : '-100%' }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="fixed top-0 left-0 h-full w-64 bg-gray-900 z-50 p-6 flex flex-col justify-between border-r border-white/10 md:hidden"
      >
        <SidebarContent />
      </motion.aside>
      {isSidebarOpen && <div className="fixed inset-0 bg-black/60 z-40 md:hidden" onClick={() => setIsSidebarOpen(false)}></div>}

      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="md:hidden p-4 bg-black/30 border-b border-white/10 flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => setIsSidebarOpen(true)}>
            <Menu className="h-6 w-6" />
          </Button>
          <h2 className="text-lg font-semibold text-white">{navItems.find(item => item.id === activeTab)?.label}</h2>
        </header>
        <div className="flex-1 p-4 md:p-8 overflow-y-auto">
          <div className="flex flex-wrap gap-2 mb-6">
            <Button variant="outline" size="sm" onClick={() => navigate(-1)} className="bg-white/10 border-white/20 hover:bg-white/20">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar
            </Button>
            <Button variant="outline" size="sm" onClick={() => setActiveTab('dashboard')} className="bg-white/10 border-white/20 hover:bg-white/20">
              <Home className="h-4 w-4 mr-2" />
              Início do Portal
            </Button>
            <Button variant="outline" size="sm" onClick={handleLogout} className="bg-red-500/20 border-red-500/30 hover:bg-red-500/30 text-red-300">
              <LogOut className="h-4 w-4 mr-2" />
              Sair
            </Button>
          </div>
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Layout;