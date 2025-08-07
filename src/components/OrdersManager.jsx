import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Package, Search, Map, Rocket, Loader2 } from 'lucide-react';
import LiveTracking from '@/components/LiveTracking';
import { useData } from '@/contexts/DataContext';

const statusConfig = {
  'pending': { label: 'Pendente', className: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30' },
  'in-progress': { label: 'Em Trânsito', className: 'bg-blue-500/20 text-blue-300 border-blue-500/30' },
  'completed': { label: 'Concluído', className: 'bg-green-500/20 text-green-300 border-green-500/30' },
  'cancelled': { label: 'Cancelado', className: 'bg-red-500/20 text-red-300 border-red-500/30' },
  'available': { label: 'Disponível', className: 'bg-purple-500/20 text-purple-300 border-purple-500/30' },
};

const OrdersManager = () => {
  const { freightOrders, drivers, clients, loading } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isTrackingModalOpen, setTrackingModalOpen] = useState(false);

  const filteredOrders = useMemo(() => {
    if (!freightOrders) return [];
    return freightOrders.filter(order => {
      const client = (clients || []).find(c => c.id === order.client_id);
      const driver = (drivers || []).find(d => d.id === order.driver_id);
      const searchMatch =
        order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (order.origin && order.origin.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (order.destination && order.destination.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (client?.name && client.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (driver?.name && driver.name.toLowerCase().includes(searchTerm.toLowerCase()));
      const statusMatch = statusFilter === 'all' || order.status === statusFilter;
      return searchMatch && statusMatch;
    });
  }, [freightOrders, searchTerm, statusFilter, clients, drivers]);

  const openTrackingModal = (order) => {
    setSelectedOrder(order);
    setTrackingModalOpen(true);
  };

  const getDriverById = (driverId) => (drivers || []).find(d => d.id === driverId);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="h-8 w-8 animate-spin text-blue-400" />
        <p className="ml-4 text-white text-xl">Carregando fretes...</p>
      </div>
    );
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="glass-effect border-white/20">
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-2xl font-bold gradient-text flex items-center gap-3">
                  <Package className="h-6 w-6" />
                  Gerenciador de Fretes
                </CardTitle>
                <p className="text-gray-400">Monitore todos os fretes da plataforma.</p>
              </div>
            </div>
            <div className="mt-4 flex items-center gap-4">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Pesquisar por ID, rota, cliente ou motorista..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-white/10 border-white/20 text-white"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px] bg-white/10 border-white/20 text-white">
                  <SelectValue placeholder="Filtrar por status" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-white/20 text-white">
                  <SelectItem value="all">Todos os Status</SelectItem>
                  {Object.entries(statusConfig).map(([key, { label }]) => (
                    <SelectItem key={key} value={key}>{label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="border-white/20">
                  <TableHead className="text-white">ID</TableHead>
                  <TableHead className="text-white">Cliente</TableHead>
                  <TableHead className="text-white">Motorista</TableHead>
                  <TableHead className="text-white">Rota</TableHead>
                  <TableHead className="text-white">Status</TableHead>
                  <TableHead className="text-white">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.map(order => {
                  const client = (clients || []).find(c => c.id === order.client_id);
                  const driver = (drivers || []).find(d => d.id === order.driver_id);
                  return (
                    <TableRow key={order.id} className="border-white/10">
                      <TableCell className="font-medium text-gray-300">#{order.id.slice(0, 6)}</TableCell>
                      <TableCell className="text-gray-300">{client?.name || 'N/A'}</TableCell>
                      <TableCell className="text-gray-300">{driver?.name || 'N/A'}</TableCell>
                      <TableCell className="text-gray-300">{order.origin} → {order.destination}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                            <Badge variant="outline" className={statusConfig[order.status]?.className}>
                              {statusConfig[order.status]?.label}
                            </Badge>
                            {order.isPriority && <Badge variant="destructive" className="bg-red-500/80 border-red-400/50"><Rocket size={12} /></Badge>}
                        </div>
                      </TableCell>
                      <TableCell>
                        {order.status === 'in-progress' && (
                          <Button onClick={() => openTrackingModal(order)} variant="outline" size="sm" className="border-blue-400 text-blue-400 hover:bg-blue-400/10 hover:text-blue-300">
                            <Map className="mr-2 h-4 w-4" /> Rastrear
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
            {filteredOrders.length === 0 && (
              <p className="text-center text-gray-400 py-8">Nenhum frete encontrado.</p>
            )}
          </CardContent>
        </Card>
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

export default OrdersManager;