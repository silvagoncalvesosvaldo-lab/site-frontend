import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Package, MapPin, Truck, Edit, Trash2, Calendar, DollarSign, CreditCard, Bell, CheckCircle, Hourglass, Check } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const OrderCard = ({ order, index, handleEdit, handleDelete, handleStatusChange, clients, drivers }) => {
  const { toast } = useToast();

  const getStatusBadge = (status) => {
    const statusMap = {
      available: { label: 'Disponível', className: 'status-available' },
      pending: { label: 'Aguardando Pagamento', className: 'status-pending' },
      'in-progress': { label: 'Em Andamento', className: 'status-in-progress' },
      completed: { label: 'Concluído', className: 'status-completed' },
      cancelled: { label: 'Cancelado', className: 'status-cancelled' }
    };
    
    const statusInfo = statusMap[status] || { label: status, className: 'status-pending' };
    return <Badge className={`${statusInfo.className}`}>{statusInfo.label}</Badge>;
  };

  const getPaymentStatusInfo = (status) => {
    const statusMap = {
      'pending-advance': { label: 'Aguardando Adiantamento', icon: <Hourglass className="h-4 w-4 text-yellow-400" /> },
      'advance-paid': { label: 'Adiantamento Pago', icon: <CheckCircle className="h-4 w-4 text-teal-400" /> },
      'pending-final': { label: 'Aguardando Pagamento Final', icon: <Hourglass className="h-4 w-4 text-yellow-400" /> },
      'final-paid': { label: 'Pagamento Final Realizado', icon: <CheckCircle className="h-4 w-4 text-green-400" /> },
    };
    return statusMap[status] || { label: 'Não iniciado', icon: <CreditCard className="h-4 w-4" /> };
  };

  const getClientName = (clientId) => {
    const client = clients.find(c => c.id === clientId);
    return client ? client.name : 'Cliente não encontrado';
  };

  const getDriverName = (driverId) => {
    if (!driverId) return 'Não atribuído';
    const driver = drivers.find(d => d.id === driverId);
    return driver ? driver.name : 'Motorista não encontrado';
  };
  
  const paymentStatusInfo = getPaymentStatusInfo(order.paymentStatus);

  const handleNotify = (message) => {
    toast({
      title: 'Notificação Enviada! (Simulação)',
      description: `O cliente foi notificado: "${message}"`,
    });
  };

  const handleCompleteOrder = () => {
    handleStatusChange(order.id, 'status', 'completed');
    toast({
      title: 'Entrega Concluída!',
      description: `O pedido #${order.id.slice(-4)} foi marcado como concluído.`,
    });
  };

  return (
    <motion.div
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
                <CardTitle className="text-white text-lg capitalize">{order.cargo} #{order.id.slice(-4)}</CardTitle>
                <p className="text-sm text-gray-400">Cliente: {getClientName(order.clientId)}</p>
              </div>
            </div>
            {getStatusBadge(order.status)}
          </div>
        </CardHeader>
        <CardContent className="space-y-4 flex-grow">
          <div className="grid grid-cols-1 gap-3">
            <div className="flex items-center gap-2 text-gray-300"><MapPin className="h-4 w-4 text-green-400" /> <span className="text-sm">{order.origin}</span></div>
            <div className="flex items-center gap-2 text-gray-300"><MapPin className="h-4 w-4 text-red-400" /> <span className="text-sm">{order.destination}</span></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="flex items-center gap-2 text-gray-300"><Truck className="h-4 w-4" /> <span className="text-sm">{getDriverName(order.driverId)}</span></div>
            <div className="flex items-center gap-2 text-gray-300"><DollarSign className="h-4 w-4 text-green-400" /> <span className="text-sm font-medium">R$ {order.price?.toLocaleString('pt-BR', {minimumFractionDigits: 2}) || '0.00'}</span></div>
          </div>
          <div className="pt-3 border-t border-white/10 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-gray-300">
                {paymentStatusInfo.icon}
                <span className="text-sm font-medium">{paymentStatusInfo.label}</span>
              </div>
              <div className="flex gap-2">
                {order.paymentStatus === 'pending-advance' && (
                  <Button size="sm" variant="secondary" onClick={() => handleStatusChange(order.id, 'paymentStatus', 'advance-paid')}>Confirmar Adiant.</Button>
                )}
                 {order.paymentStatus === 'advance-paid' && (
                  <Button size="sm" variant="secondary" onClick={() => handleStatusChange(order.id, 'paymentStatus', 'final-paid')}>Confirmar Pag. Final</Button>
                )}
              </div>
            </div>
          </div>
        </CardContent>
        <div className="p-6 pt-0 flex flex-col gap-2">
           <div className="flex gap-2">
            <Button variant="outline" onClick={() => handleEdit(order)} className="text-blue-400 border-blue-400 hover:bg-blue-500/20 hover:text-blue-300 w-full"><Edit className="h-4 w-4 mr-2" /> Editar</Button>
            <Button variant="outline" onClick={() => handleDelete(order.id)} className="text-red-400 border-red-400 hover:bg-red-500/20 hover:text-red-300 w-full"><Trash2 className="h-4 w-4 mr-2" /> Excluir</Button>
           </div>
           {order.status === 'in-progress' && (
             <Button className="w-full btn-gradient-green" onClick={handleCompleteOrder}><Check className="h-4 w-4 mr-2" /> Marcar como Concluído</Button>
           )}
           {order.status === 'completed' && (
             <Button className="w-full btn-gradient-green" disabled><CheckCircle className="h-4 w-4 mr-2" /> Entrega Concluída</Button>
           )}
        </div>
      </Card>
    </motion.div>
  );
};

export default OrderCard;