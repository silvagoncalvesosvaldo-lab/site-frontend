import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { ChatProvider } from '@/contexts/ChatContext';
import { DataProvider } from '@/contexts/DataContext';
import { AuthProvider, useAuth } from '@/contexts/SupabaseAuthContext';
import { AdminAuthProvider } from '@/contexts/AdminAuthContext';
import LoginPage from '@/components/LoginPage';
import LoginRoleSelection from '@/pages/LoginRoleSelection';
import AdminLoginPage from '@/pages/AdminLoginPage';
import AdminDashboard from '@/pages/AdminDashboard';
import AdminPortal from '@/AdminPortal';
import DriverPortal from '@/components/portals/DriverPortal';
import ClientPortal from '@/components/portals/ClientPortal';
import AffiliatePortal from '@/components/portals/AffiliatePortal';
import HelpCenter from '@/components/HelpCenter';
import AboutUs from '@/components/AboutUs';
import WelcomePage from '@/components/WelcomePage';
import ReferralLandingPage from '@/components/ReferralLandingPage';
import NotFound from '@/components/NotFound';
import { AnimatePresence } from 'framer-motion';
import NewAffiliateRegistration from '@/pages/NewAffiliateRegistration';
import AdminProtectedRoute from '@/components/AdminProtectedRoute';
import Disclaimer from '@/components/Disclaimer';
import PrivacyPolicy from '@/components/PrivacyPolicy';
import { supabase } from '@/lib/customSupabaseClient';

const ProtectedAdminDashboard = () => {
  const { session } = useAuth();
  const location = useLocation();

  if (!session) {
    return <Navigate to="/admin-login" state={{ from: location }} replace />;
  }

  if (session.user.id !== '438d8dc5-622c-4a0d-b6ce-9be05d5e0eaf') {
      supabase.auth.signOut();
      return <Navigate to="/admin-login" state={{ from: location }} replace />;
  }
  
  return <AdminDashboard />;
};


function App() {
  const location = useLocation();

  return (
    <AuthProvider>
      <AdminAuthProvider>
        <DataProvider>
          <ChatProvider>
              <AnimatePresence mode="wait">
                <Routes location={location} key={location.pathname}>
                    <Route path="/" element={<WelcomePage />} />
                    <Route path="/admin-login" element={<AdminLoginPage />} />
                    <Route path="/painel/admin" element={<ProtectedAdminDashboard />} />
                    <Route 
                      path="/app/admin" 
                      element={
                        <AdminProtectedRoute>
                          <AdminPortal />
                        </AdminProtectedRoute>
                      } 
                    />
                    <Route path="/app/driver/:driverId" element={<DriverPortal />} />
                    <Route path="/app/client/:clientId" element={<ClientPortal />} />
                    <Route path="/app/afiliado/:affiliateId" element={<AffiliatePortal />} />
                    <Route path="/about" element={<AboutUs />} />
                    <Route path="/help" element={<HelpCenter />} />
                    <Route path="/termos-de-servico" element={<Disclaimer />} />
                    <Route path="/politica-de-privacidade" element={<PrivacyPolicy />} />
                    <Route path="/acessar" element={<LoginRoleSelection />} />
                    <Route path="/acessar/:role" element={<LoginPage />} />
                    <Route path="/indicacao" element={<ReferralLandingPage />} />
                    <Route path="/cadastro/afiliado-novo" element={<NewAffiliateRegistration />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
              </AnimatePresence>
          </ChatProvider>
        </DataProvider>
      </AdminAuthProvider>
    </AuthProvider>
  );
}

export default App;