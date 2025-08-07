import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Share2, User, Bell, LogOut, ArrowLeft, Home, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { ScrollArea } from '@/components/ui/scroll-area';

const AffiliateLayout = ({ children, activeTab, setActiveTab, affiliateName }) => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const navItems = [
    { id: 'referrals', label: 'Indique e Ganhe', icon: Share2 },
    { id: 'notifications', label: 'Notificações', icon: Bell, badge: 2 },
    { id: 'profile', label: 'Meu Perfil', icon: User },
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
        <div className="mb-8 hidden md:block">
          <h1 className="text-xl font-bold gradient-text-teal">Portal do Afiliado</h1>
          <p className="text-sm text-gray-400 truncate">{affiliateName}</p>
        </div>
        <div className="flex md:hidden justify-between items-center mb-4">
           <h1 className="text-xl font-bold gradient-text-teal">Afiliado</h1>
           <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white" onClick={() => setIsSidebarOpen(false)}>
            <X className="h-6 w-6" />
           </Button>
        </div>
        <ScrollArea className="h-[calc(100vh-150px)]">
          <nav className="space-y-2 pr-2">
            {navItems.map(item => (
              <Button
                key={item.id}
                variant={activeTab === item.id ? 'secondary' : 'ghost'}
                className={`w-full justify-start ${activeTab === item.id ? 'bg-teal-500/20 text-teal-300' : 'hover:bg-teal-500/10'}`}
                onClick={() => handleNavItemClick(item.id)}
              >
                <item.icon className="h-4 w-4 mr-3" />
                {item.label}
                {item.badge && <Badge className="ml-auto bg-teal-500">{item.badge}</Badge>}
              </Button>
            ))}
          </nav>
        </ScrollArea>
      </div>
      <Button variant="ghost" className="w-full justify-start hover:bg-red-500/20 hover:text-red-400 mt-4" onClick={handleLogout}>
        <LogOut className="h-4 w-4 mr-3" />
        Sair
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

      <main className="flex-1 flex flex-col overflow-hidden bg-gradient-to-br from-slate-900 via-gray-900 to-slate-900">
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
            <Button variant="outline" size="sm" onClick={() => setActiveTab('referrals')} className="bg-white/10 border-white/20 hover:bg-white/20">
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

export default AffiliateLayout;