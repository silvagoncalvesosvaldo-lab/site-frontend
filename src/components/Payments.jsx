import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CreditCard, DollarSign, AlertTriangle, CheckCircle } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const Payments = ({ orders, earningsConfig }) => {
  const { toast } = useToast();
  
  const transactions = orders.map(order => {
    const commission = (order.price || 0) * ((earningsConfig?.commissionRate || 0) / 100);
    return {
      id: `tr-${order.id}`,
      orderId: `ORD-${order.id.slice(-4)}`,
      amount: order.price || 0,
      commission: commission,
      status: order.paymentStatus === 'final-paid' ? 'Pago' : 'Pendente',
      date: order.createdAt || new Date().toISOString()
    };
  });

  const getStatusBadge = (status) => {
    const statusMap = {
      Pago: { icon: <CheckCircle className="h-4 w-4 text-green-400" />, text: 'text-green-400' },
      Pendente: { icon: <AlertTriangle className="h-4 w-4 text-yellow-400" />, text: 'text-yellow-400' },
    };
    const { icon, text } = statusMap[status] || statusMap['Pendente'];
    return (
      <div className={`flex items-center gap-2 text-sm font-medium ${text}`}>
        {icon}
        {status}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold gradient-text mb-2">Pagamentos</h1>
        <p className="text-gray-400">Acompanhe todas as transações da sua plataforma.</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Card className="glass-effect border-white/20">
          <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <CardTitle className="text-white">Histórico de Transações</CardTitle>
              <CardDescription className="text-gray-400">
                Para habilitar pagamentos reais, integre sua conta Stripe.
              </CardDescription>
            </div>
            <Button className="w-full sm:w-auto bg-white text-blue-600 hover:bg-gray-200 font-bold" onClick={() => toast({ title: "🚧 Funcionalidade em desenvolvimento!", description: "A integração com Stripe estará disponível em breve." })}>
              <CreditCard className="h-4 w-4 mr-2" />
              Integrar Stripe
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {transactions.map((tx) => (
                <div key={tx.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10 gap-4">
                  <div className="flex items-center gap-4 flex-grow">
                    <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg">
                      <DollarSign className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="font-bold text-white">Pedido {tx.orderId}</p>
                      <p className="text-sm text-gray-400">Data: {new Date(tx.date).toLocaleDateString('pt-BR')}</p>
                    </div>
                  </div>
                  <div className="text-left sm:text-right">
                    <p className="font-bold text-lg text-white">R$ {tx.amount.toFixed(2)}</p>
                    <p className="text-xs text-green-400">Sua comissão: R$ {tx.commission.toFixed(2)}</p>
                  </div>
                   <div className="w-full sm:w-28 text-left sm:text-right pt-2 sm:pt-0">
                    {getStatusBadge(tx.status)}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Payments;