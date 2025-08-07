import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bell, Gift, Truck } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const Notifications = ({ referralPayouts, setActiveTab }) => {
  
  const pendingReferralPayouts = referralPayouts ? referralPayouts.filter(p => p.status === 'pending') : [];

  const handleGoToReferralPayouts = () => {
     setActiveTab('referral-payouts');
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold gradient-text mb-2 flex items-center gap-3">
          <Bell className="h-8 w-8" />
          Central de Notificações
        </h1>
        <p className="text-gray-400">Acompanhe as ações e alertas importantes da plataforma.</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Referral Payouts Notification */}
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className={`glass-effect border-white/20 h-full ${pendingReferralPayouts.length > 0 ? 'border-yellow-500/50 bg-yellow-500/10' : 'border-green-500/50 bg-green-500/10'}`}>
            <CardHeader>
              <CardTitle className="text-white flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Gift className="h-5 w-5" />
                  Pagamentos de Bônus
                </span>
                <Badge variant={pendingReferralPayouts.length > 0 ? "destructive" : "default"}>{pendingReferralPayouts.length}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
                <p className={`mb-4 ${pendingReferralPayouts.length > 0 ? 'text-yellow-200' : 'text-green-300'}`}>
                    {pendingReferralPayouts.length > 0 ? `Você tem ${pendingReferralPayouts.length} pagamentos de bônus de indicação pendentes.` : 'Todos os pagamentos de bônus de indicação estão em dia!'}
                </p>
                <Button className="w-full btn-secondary" onClick={handleGoToReferralPayouts} disabled={pendingReferralPayouts.length === 0}>
                    Ver Pagamentos de Bônus
                </Button>
            </CardContent>
          </Card>
        </motion.div>
        
        {/* Driver Payouts Notification */}
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="glass-effect border-white/20 h-full border-blue-500/50 bg-blue-500/10">
            <CardHeader>
                <CardTitle className="text-white flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <Truck className="h-5 w-5" />
                      Pagamentos de Motoristas
                    </span>
                    <Badge variant="default">0</Badge>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <p className="mb-4 text-blue-200">
                    Ainda não há pagamentos de adiantamento ou finais pendentes para motoristas.
                </p>
                <Button className="w-full btn-secondary" onClick={() => setActiveTab('payouts')} disabled>
                    Ver Pagamentos de Motoristas
                </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Notifications;