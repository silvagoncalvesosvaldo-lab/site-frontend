import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Map, Star } from 'lucide-react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import LiveTracking from '@/components/LiveTracking';
import StatusTransporte from '@/components/StatusTransporte';

const statusConfig = {
  'pending': { label: 'Pendente', color: 'bg-yellow-500' },
  'in-progress': { label: 'Em Trânsito', color: 'bg-blue-500' },
  'em_andamento': { label: 'Em Trânsito', color: 'bg-blue-500' },
  'completed': { label: 'Concluído', color: 'bg-green-500' },
  'finalizado': { label: 'Concluído', color: 'bg-green-500' },
  'cancelled': { label: 'Cancelado', color: 'bg-red-500' },
  'aguardando': { label: 'Aguardando', color: 'bg-yellow-500' },
};

const MyOrders = ({ orders, setOrders }) => {
  const [drivers] = useLocalStorage('transport-drivers', []);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isTrackingModalOpen, setTrackingModalOpen] = useState(false);

  const getDriverById = (driverId) => {
    return drivers.find(d => d.id === driverId);
  };

  const openTrackingModal = (order) => {
    setSelectedOrder(order);
    setTrackingModalOpen(true);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold gradient-text mb-6">Meus Fretes</h1>
        {orders.length === 0 ? (
          <p className="text-gray-400">Você ainda não possui nenhum frete contratado.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {orders.map((order, index) => {
              const driver = getDriverById(order.driver_id);
              return (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="glass-effect border-white/20 h-full flex flex-col">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-white text-lg">Frete #{order.id.slice(0, 6)}</CardTitle>
                        <Badge className={`${statusConfig[order.status]?.color} text-white`}>
                          {statusConfig[order.status]?.label}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-400">{order.descricao}</p>
                    </CardHeader>
                    <CardContent className="flex-grow space-y-2">
                      <StatusTransporte status={order.status} />
                      <p className="text-gray-300"><strong>Motorista:</strong> {driver?.name || 'Aguardando atribuição'}</p>
                      <p className="text-gray-300"><strong>De:</strong> {order.origem}</p>
                      <p className="text-gray-300"><strong>Para:</strong> {order.destino}</p>
                    </CardContent>
                    <CardFooter className="flex gap-2">
                      {order.status === 'em_andamento' && (
                        <Button onClick={() => openTrackingModal(order)} className="w-full btn-gradient">
                          <Map className="mr-2 h-4 w-4" /> Rastrear Carga
                        </Button>
                      )}
                      {order.status === 'finalizado' && (
                        <Button variant="outline" className="w-full border-yellow-400 text-yellow-400 hover:bg-yellow-400/10 hover:text-yellow-300">
                          <Star className="mr-2 h-4 w-4" /> Avaliar Motorista
                        </Button>
                      )}
                    </CardFooter>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        )}
      </motion.div>
      {selectedOrder && (
        <LiveTracking
          order={selectedOrder}
          driver={getDriverById(selectedOrder.driver_id)}
          isOpen={isTrackingModalOpen}
          onOpenChange={setTrackingModalOpen}
        />
      )}
    </>
  );
};

export default MyOrders;