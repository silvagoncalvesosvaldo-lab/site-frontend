import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Edit, Trash2, MoreVertical, Truck, User, MapPin, Package, Calendar, DollarSign, MessageSquare, Mail, Share2 } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useToast } from '@/components/ui/use-toast';

const OrderList = ({ orders, drivers, clients, onEdit, onDelete }) => {
  const { toast } = useToast();
  const [isNotifyDialogOpen, setIsNotifyDialogOpen] = useState(false);
  const [selectedOrderForNotification, setSelectedOrderForNotification] = useState(null);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'pending':
        return <Badge variant="secondary">Pendente</Badge>;
      case 'in-progress':
        return <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">Em Andamento</Badge>;
      case 'completed':
        return <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Concluído</Badge>;
      case 'cancelled':
        return <Badge variant="destructive">Cancelado</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getPaymentStatusBadge = (status) => {
    switch (status) {
      case 'pending-advance':
        return <Badge variant="destructive">Adiant. Pendente</Badge>;
      case 'advance-paid':
        return <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">Adiant. Pago</Badge>;
      case 'pending-final':
        return <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">Pgto. Final Pendente</Badge>;
      case 'final-paid':
        return <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Total Pago</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const handleNotifyClick = (order) => {
    const driver = drivers.find(d => d.id === order.driverId);
    if (!driver || (!driver.phone && !driver.email)) {
      toast({
        title: "Dados incompletos",
        description: "O motorista precisa ter um telefone ou e-mail cadastrado para ser notificado.",
        variant: "destructive",
      });
      return;
    }
    setSelectedOrderForNotification({ ...order, driver });
    setIsNotifyDialogOpen(true);
  };

  const generateMessage = (order) => {
    const client = clients.find(c => c.id === order.clientId);
    return `Olá ${order.driver.name},
Novo frete disponível para você!

Detalhes do Frete:
- ID do Pedido: ${order.id}
- Cliente: ${client ? client.name : 'N/A'}
- Carga: ${order.cargo}
- Origem: ${order.origin}
- Destino: ${order.destination}
- Data Agendada: ${new Date(order.scheduledDate).toLocaleDateString('pt-BR')}
- Valor: R$ ${order.price.toFixed(2)}

Por favor, confirme o recebimento.
Obrigado!`;
  };

  const handleSendWhatsApp = () => {
    if (!selectedOrderForNotification) return;
    const message = generateMessage(selectedOrderForNotification);
    const whatsappUrl = `https://wa.me/${selectedOrderForNotification.driver.phone.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    setIsNotifyDialogOpen(false);
  };

  const handleSendEmail = () => {
    if (!selectedOrderForNotification) return;
    const message = generateMessage(selectedOrderForNotification);
    const subject = `Novo Frete Disponível - Pedido ${selectedOrderForNotification.id}`;
    const mailtoUrl = `mailto:${selectedOrderForNotification.driver.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
    window.open(mailtoUrl, '_blank');
    setIsNotifyDialogOpen(false);
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {orders.map((order, index) => {
          const driver = drivers.find(d => d.id === order.driverId);
          const client = clients.find(c => c.id === order.clientId);
          return (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
            >
              <Card className="glass-effect border-white/20 card-hover h-full flex flex-col">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-white text-lg mb-1">
                        {order.origin} → {order.destination}
                      </CardTitle>
                      <div className="flex items-center gap-2">
                        {getStatusBadge(order.status)}
                        {getPaymentStatusBadge(order.paymentStatus)}
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="text-gray-400">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="bg-slate-800 border-white/20 text-white">
                        <DropdownMenuItem onClick={() => onEdit(order)} className="cursor-pointer">
                          <Edit className="mr-2 h-4 w-4" /> Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleNotifyClick(order)} className="cursor-pointer">
                          <Share2 className="mr-2 h-4 w-4" /> Notificar Motorista
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onDelete(order.id)} className="text-red-400 focus:text-red-400 focus:bg-red-500/20 cursor-pointer">
                          <Trash2 className="mr-2 h-4 w-4" /> Excluir
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3 flex-grow">
                  <div className="flex items-center gap-2 text-gray-300">
                    <Package className="h-4 w-4 text-blue-400" />
                    <span className="text-sm font-medium">{order.cargo}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-300">
                    <User className="h-4 w-4 text-purple-400" />
                    <span className="text-sm">{client ? client.name : 'Cliente não encontrado'}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-300">
                    <Truck className="h-4 w-4 text-green-400" />
                    <span className="text-sm">{driver ? driver.name : 'Motorista não atribuído'}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-300">
                    <Calendar className="h-4 w-4 text-yellow-400" />
                    <span className="text-sm">{new Date(order.scheduledDate).toLocaleDateString('pt-BR')}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-100 font-bold">
                    <DollarSign className="h-4 w-4 text-green-500" />
                    <span className="text-sm">R$ {order.price.toFixed(2)}</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      <Dialog open={isNotifyDialogOpen} onOpenChange={setIsNotifyDialogOpen}>
        <DialogContent className="glass-effect border-white/20 text-white">
          <DialogHeader>
            <DialogTitle className="gradient-text flex items-center gap-2">
              <Share2 /> Notificar Motorista
            </DialogTitle>
            <DialogDescription className="text-gray-300">
              Envie os detalhes do frete para {selectedOrderForNotification?.driver.name} via WhatsApp ou E-mail.
            </DialogDescription>
          </DialogHeader>
          <div className="my-4 p-4 bg-black/20 rounded-lg border border-white/10">
            <h4 className="font-bold mb-2 text-white">Mensagem a ser enviada:</h4>
            <p className="text-sm text-gray-300 whitespace-pre-wrap">
              {selectedOrderForNotification && generateMessage(selectedOrderForNotification)}
            </p>
          </div>
          <DialogFooter className="flex flex-col sm:flex-row gap-2">
            <Button onClick={handleSendWhatsApp} className="btn-gradient-green w-full sm:w-auto" disabled={!selectedOrderForNotification?.driver.phone}>
              <MessageSquare className="h-4 w-4 mr-2" /> Enviar por WhatsApp
            </Button>
            <Button onClick={handleSendEmail} className="btn-gradient-blue w-full sm:w-auto" disabled={!selectedOrderForNotification?.driver.email}>
              <Mail className="h-4 w-4 mr-2" /> Enviar por E-mail
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default OrderList;