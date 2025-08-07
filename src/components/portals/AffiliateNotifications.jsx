import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Bell, DollarSign, UserPlus, CheckCircle, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const AffiliateNotifications = ({ affiliate }) => {

  const notifications = [
    {
      id: 1,
      type: 'payment',
      title: 'Pagamento de bônus recebido!',
      description: 'Seu pagamento de R$ 80,00 foi processado. Verifique sua conta!',
      date: '2 dias atrás',
      icon: <DollarSign className="h-5 w-5 text-green-400" />,
      read: false,
    },
    {
      id: 2,
      type: 'referral',
      title: 'Nova indicação concluída!',
      description: 'Seu indicado "Loja de Roupas XYZ" concluiu o primeiro frete. Bônus de R$ 20,00 adicionado!',
      date: '5 dias atrás',
      icon: <UserPlus className="h-5 w-5 text-blue-400" />,
      read: false,
    },
    {
      id: 3,
      type: 'payment_pending',
      title: 'Próximo pagamento agendado',
      description: 'Seu próximo pagamento de bônus será processado no final do mês.',
      date: '1 semana atrás',
      icon: <Clock className="h-5 w-5 text-yellow-400" />,
      read: true,
    },
    {
      id: 4,
      type: 'referral_verified',
      title: 'Motorista indicado verificado',
      description: 'O motorista "Marcos Andrade" foi verificado. Bônus de R$ 20,00 adicionado!',
      date: '2 semanas atrás',
      icon: <CheckCircle className="h-5 w-5 text-teal-400" />,
      read: true,
    },
  ];

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold gradient-text-teal mb-2 flex items-center gap-3">
            <Bell className="h-8 w-8" />
            Minhas Notificações
        </h1>
        <p className="text-gray-400">Fique por dentro de todas as novidades sobre suas indicações e ganhos.</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Card className="glass-effect border-white/20">
          <CardHeader>
            <CardTitle className="text-white">Caixa de Entrada</CardTitle>
            <CardDescription className="text-gray-300">
                Você tem {notifications.filter(n => !n.read).length} notificações não lidas.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {notifications.map((notification, index) => (
              <motion.div
                key={notification.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className={`p-4 rounded-lg flex items-start gap-4 border ${
                  notification.read 
                  ? 'bg-white/5 border-white/10' 
                  : 'bg-teal-500/10 border-teal-500/30'
                }`}
              >
                <div className="flex-shrink-0 mt-1">{notification.icon}</div>
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <p className="font-bold text-white">{notification.title}</p>
                    {!notification.read && <Badge className="bg-teal-500">Nova</Badge>}
                  </div>
                  <p className="text-sm text-gray-300 mt-1">{notification.description}</p>
                  <p className="text-xs text-gray-500 mt-2">{notification.date}</p>
                </div>
              </motion.div>
            ))}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default AffiliateNotifications;