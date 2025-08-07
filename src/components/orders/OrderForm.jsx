import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/components/ui/use-toast';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import NotifyDriversDialog from '@/components/orders/NotifyDriversDialog';

const OrderForm = ({ isDialogOpen, setIsDialogOpen, editingOrder, setEditingOrder, orders, setOrders, drivers, clients }) => {
  const { toast } = useToast();
  const initialFormData = {
    type: '',
    clientId: '',
    driverId: '',
    origin: '',
    destination: '',
    cargo: '',
    description: '',
    price: '',
    scheduledDate: '',
    status: 'available',
    paymentStatus: 'pending-advance'
  };
  const [formData, setFormData] = useState(initialFormData);
  const [isNotifyDialogOpen, setIsNotifyDialogOpen] = useState(false);
  const [orderToNotify, setOrderToNotify] = useState(null);

  useEffect(() => {
    if (editingOrder) {
      setFormData({
        ...initialFormData,
        ...editingOrder,
        price: editingOrder.price ? editingOrder.price.toString() : '',
        scheduledDate: editingOrder.scheduledDate ? new Date(editingOrder.scheduledDate).toISOString().substring(0, 16) : ''
      });
    } else {
      setFormData(initialFormData);
    }
  }, [editingOrder, isDialogOpen]);

  const resetForm = () => {
    setFormData(initialFormData);
    setEditingOrder(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingOrder) {
      setOrders(orders.map(order => 
        order.id === editingOrder.id 
          ? { ...formData, id: editingOrder.id, price: parseFloat(formData.price) || 0 }
          : order
      ));
      toast({
        title: "Pedido atualizado!",
        description: "Os dados do pedido foram atualizados com sucesso.",
      });
      resetForm();
      setIsDialogOpen(false);
    } else {
      const newOrder = {
        ...formData,
        id: uuidv4(),
        price: parseFloat(formData.price) || 0,
        createdAt: new Date().toISOString(),
        status: formData.driverId ? 'in-progress' : 'available'
      };
      setOrders([...orders, newOrder]);
      toast({
        title: "Pedido criado!",
        description: "Nova oportunidade de carga foi adicionada ao painel.",
      });
      
      resetForm();
      setIsDialogOpen(false);

      if (newOrder.status === 'available') {
        setOrderToNotify(newOrder);
        setIsNotifyDialogOpen(true);
      }
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold gradient-text mb-2">Gerenciar Pedidos de Carga</h1>
          <p className="text-gray-400">Adicione e administre as oportunidades de frete.</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={(open) => { setIsDialogOpen(open); if (!open) resetForm(); }}>
          <DialogTrigger asChild>
            <Button className="btn-gradient" onClick={() => setIsDialogOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Novo Pedido de Carga
            </Button>
          </DialogTrigger>
          <DialogContent className="glass-effect border-white/20 text-white max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="gradient-text">
                {editingOrder ? 'Editar Pedido' : 'Novo Pedido de Carga'}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="type">Tipo de Serviço</Label>
                  <Select required value={formData.type} onValueChange={(value) => setFormData({...formData, type: value})}>
                    <SelectTrigger className="bg-white/10 border-white/20 text-white">
                      <SelectValue placeholder="Selecione o tipo" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-white/20">
                      <SelectItem value="frete">Frete</SelectItem>
                      <SelectItem value="mudanca">Mudança</SelectItem>
                      <SelectItem value="carreto">Carreto</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="status">Status</Label>
                  <Select value={formData.status} onValueChange={(value) => setFormData({...formData, status: value})}>
                    <SelectTrigger className="bg-white/10 border-white/20 text-white">
                      <SelectValue placeholder="Selecione o status" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-white/20">
                      <SelectItem value="available">Disponível</SelectItem>
                      <SelectItem value="pending">Aguardando Pagamento</SelectItem>
                      <SelectItem value="in-progress">Em Andamento</SelectItem>
                      <SelectItem value="completed">Concluído</SelectItem>
                      <SelectItem value="cancelled">Cancelado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="clientId">Cliente</Label>
                  <Select required value={formData.clientId} onValueChange={(value) => setFormData({...formData, clientId: value})}>
                    <SelectTrigger className="bg-white/10 border-white/20 text-white">
                      <SelectValue placeholder="Selecione o cliente" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-white/20">
                      {clients.map(client => (
                        <SelectItem key={client.id} value={client.id}>{client.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                 <div>
                  <Label htmlFor="driverId">Motorista (opcional)</Label>
                  <Select value={formData.driverId} onValueChange={(value) => setFormData({...formData, driverId: value})}>
                    <SelectTrigger className="bg-white/10 border-white/20 text-white">
                      <SelectValue placeholder="Atribuir a um motorista" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-white/20">
                      {drivers.map(driver => (
                        <SelectItem key={driver.id} value={driver.id}>{driver.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="origin">Origem</Label>
                  <Input id="origin" value={formData.origin} onChange={(e) => setFormData({...formData, origin: e.target.value})} className="bg-white/10 border-white/20 text-white" required />
                </div>
                <div>
                  <Label htmlFor="destination">Destino</Label>
                  <Input id="destination" value={formData.destination} onChange={(e) => setFormData({...formData, destination: e.target.value})} className="bg-white/10 border-white/20 text-white" required />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="price">Valor para o Cliente (R$)</Label>
                  <Input id="price" type="number" step="0.01" value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} className="bg-white/10 border-white/20 text-white" required />
                </div>
                <div>
                  <Label htmlFor="scheduledDate">Data Agendada</Label>
                  <Input id="scheduledDate" type="datetime-local" value={formData.scheduledDate} onChange={(e) => setFormData({...formData, scheduledDate: e.target.value})} className="bg-white/10 border-white/20 text-white" required />
                </div>
              </div>
              
              <div>
                <Label htmlFor="cargo">Carga</Label>
                <Input id="cargo" value={formData.cargo} onChange={(e) => setFormData({...formData, cargo: e.target.value})} className="bg-white/10 border-white/20 text-white" placeholder="Ex: Sofá, Geladeira, Caixas" required />
              </div>

              <div>
                <Label htmlFor="description">Descrição da Carga</Label>
                <Textarea id="description" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} className="bg-white/10 border-white/20 text-white" placeholder="Ex: 1 sofá, 5 caixas, material frágil..." rows={3} />
              </div>

              <Button type="submit" className="w-full btn-gradient">
                {editingOrder ? 'Atualizar Pedido' : 'Publicar Pedido de Carga'}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </motion.div>
      <NotifyDriversDialog
        isOpen={isNotifyDialogOpen}
        onClose={() => setIsNotifyDialogOpen(false)}
        order={orderToNotify}
        drivers={drivers}
        clients={clients}
      />
    </>
  );
};

export default OrderForm;