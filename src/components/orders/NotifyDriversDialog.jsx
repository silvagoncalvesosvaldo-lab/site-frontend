import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Bell, MessageSquare, Mail, Users } from 'lucide-react';

const NotifyDriversDialog = ({ isOpen, onClose, order, drivers, clients }) => {
  const { toast } = useToast();

  if (!order) return null;

  const verifiedDrivers = drivers.filter(d => d.status === 'verified');
  const client = clients.find(c => c.id === order.clientId);

  const generateMessage = () => {
    return `📢 Nova Carga Disponível!

- Carga: ${order.cargo}
- Rota: ${order.origin} → ${order.destination}
- Cliente: ${client?.name || 'N/A'}
- Valor: R$ ${order.price.toFixed(2)}
- Data: ${new Date(order.scheduledDate).toLocaleString('pt-BR')}

Acesse a plataforma para mais detalhes e aceitar o frete!`;
  };

  const handleNotify = (method) => {
    if (verifiedDrivers.length === 0) {
      toast({
        title: 'Nenhum motorista qualificado',
        description: 'Não há motoristas verificados para notificar.',
        variant: 'destructive',
      });
      return;
    }

    toast({
      title: `Notificações Disparadas via ${method}!`,
      description: `A notificação sobre a nova carga foi enviada para ${verifiedDrivers.length} motorista(s).`,
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="glass-effect border-white/20 text-white">
        <DialogHeader>
          <DialogTitle className="flex items-center text-2xl gradient-text">
            <Bell className="mr-2" /> Notificar Motoristas
          </DialogTitle>
          <DialogDescription className="text-gray-300 pt-2">
            A nova carga foi criada. Dispare uma notificação para todos os motoristas verificados.
          </DialogDescription>
        </DialogHeader>
        
        <div className="my-4 p-4 bg-black/20 rounded-lg border border-white/10">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-bold text-white">Resumo da Carga</h4>
            <div className="flex items-center gap-2 text-teal-300">
              <Users className="h-5 w-5" />
              <span>{verifiedDrivers.length} Motorista(s) Verificado(s)</span>
            </div>
          </div>
          <p className="text-sm text-gray-300 whitespace-pre-wrap">{generateMessage()}</p>
        </div>

        <DialogFooter className="flex flex-col sm:flex-row gap-2">
          <Button onClick={() => handleNotify('WhatsApp')} className="btn-gradient-green w-full sm:w-auto">
            <MessageSquare className="h-4 w-4 mr-2" /> Disparar via WhatsApp
          </Button>
          <Button onClick={() => handleNotify('E-mail')} className="btn-gradient-blue w-full sm:w-auto">
            <Mail className="h-4 w-4 mr-2" /> Disparar via E-mail
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default NotifyDriversDialog;