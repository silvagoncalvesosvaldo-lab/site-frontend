import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Package, MapPin, Truck, DollarSign, Coins as HandCoins, CheckCircle, Info, Rocket, Loader2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { useData } from '@/contexts/DataContext';

const FreightBoard = () => {
  const { freightOrders, setFreightOrders, clients, earningsConfig, loading } = useData();
  const { toast } = useToast();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="h-8 w-8 animate-spin text-blue-400" />
        <p className="ml-4 text-white text-xl">Carregando mural de fretes...</p>
      </div>
    );
  }

  const availableOrders = (freightOrders || []).filter(order => order.status === 'available');

  const getClientName = (clientId) => {
    const client = (clients || []).find(c => c.id === clientId);
    return client ? client.name : 'Cliente Anônimo';
  };

  const handleAcceptJob = (orderId) => {
    setFreightOrders(currentOrders => currentOrders.map(order => 
      order.id === orderId ? { ...order, status: 'pending' } : order
    ));
    toast({
      title: 'Proposta Enviada! 🚀',
      description: 'O pedido agora aguarda o pagamento do cliente para ser confirmado.',
    });
  };
  
  const getCommissionRate = (order) => {
    if (!earningsConfig?.rates) return 0;
    const { origin, destination } = order;
    if (!origin || !destination) return (earningsConfig.rates.interstate || 0) / 100;
    
    const originState = origin.split(',')[1]?.trim();
    const destState = destination.split(',')[1]?.trim();

    if (originState === destState) {
        return (earningsConfig.rates.state || 0) / 100;
    }
    return (earningsConfig.rates.interstate || 0) / 100;
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold gradient-text mb-2">Painel de Cargas</h1>
        <p className="text-gray-400">Encontre as melhores oportunidades de transporte disponíveis agora.</p>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="p-4 bg-blue-900/50 border border-blue-400/30 rounded-lg flex items-center gap-3"
      >
        <Info className="h-5 w-5 text-blue-400 flex-shrink-0" />
        <p className="text-sm text-gray-300">
          Os detalhes de contato do cliente serão liberados após a confirmação do pagamento.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {availableOrders.map((order, index) => {
          const clientValue = order.value || 0;
          const commissionRate = getCommissionRate(order);
          const commission = clientValue * commissionRate;
          const driverTotalReceives = clientValue - commission;
          const advanceAmount = driverTotalReceives * ((earningsConfig?.advance_percentage || 0) / 100);

          return (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="glass-effect border-white/20 card-hover flex flex-col h-full">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
                        <Package className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-white text-lg capitalize">{order.cargo}</CardTitle>
                        <p className="text-sm text-gray-400">Postado por {getClientName(order.client_id)}</p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                        <Badge className="status-available">Disponível</Badge>
                        {order.isPriority && <Badge variant="destructive" className="bg-red-500/80 border-red-400/50"><Rocket size={12} className="mr-1"/> Prioritário</Badge>}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4 flex-grow">
                  <div className="flex flex-col gap-3">
                    <div className="flex items-start gap-2 text-gray-300">
                      <MapPin className="h-4 w-4 mt-1 text-green-400" />
                      <span className="text-sm"><b>Origem:</b> {order.origin}</span>
                    </div>
                    <div className="flex items-start gap-2 text-gray-300">
                      <MapPin className="h-4 w-4 mt-1 text-red-400" />
                      <span className="text-sm"><b>Destino:</b> {order.destination}</span>
                    </div>
                  </div>
                  
                  <div className="pt-3 border-t border-white/10">
                      <p className="text-sm text-gray-400">{order.description || "Nenhuma descrição detalhada da carga."}</p>
                  </div>

                  <div className="pt-3 border-t border-white/10 space-y-3">
                    <div className="flex items-center justify-between text-gray-200">
                       <div className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-green-400" />
                        <span className="text-base font-bold">Você Recebe (Total):</span>
                      </div>
                      <span className="text-xl font-bold text-green-400">R$ {driverTotalReceives.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                    </div>
                    <div className="p-3 bg-white/5 rounded-md border border-white/10">
                      <div className="flex items-center justify-between text-gray-300">
                         <div className="flex items-center gap-2">
                          <HandCoins className="h-4 w-4 text-teal-400" />
                          <span className="text-sm">Adiantamento de {earningsConfig?.advance_percentage || 0}%:</span>
                        </div>
                        <span className="font-bold text-teal-400">R$ {advanceAmount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <div className="p-6 pt-0">
                   <Button className="w-full btn-gradient font-bold" onClick={() => handleAcceptJob(order.id)}>
                    <Truck className="h-4 w-4 mr-2" />
                    Tenho Interesse
                  </Button>
                </div>
              </Card>
            </motion.div>
          )
        })}
      </div>

      {availableOrders.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <Package className="h-16 w-16 mx-auto text-gray-400 mb-4" />
          <p className="text-gray-400 text-lg">Nenhuma carga disponível no momento.</p>
          <p className="text-gray-500 text-sm mt-2">
            Aguarde novas oportunidades ou verifique as cotações.
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default FreightBoard;