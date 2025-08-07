import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Gavel, Package, MapPin, Calendar, DollarSign, Send, MessageSquare } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import ChatWindow from '@/components/ChatWindow';

const QuoteOpportunities = ({ quoteRequests, setQuoteRequests, currentDriverId }) => {
  const { toast } = useToast();
  const [proposalValue, setProposalValue] = useState('');
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [clients] = useLocalStorage('transport-clients', []);
  const [activeChat, setActiveChat] = useState(null);

  const availableRequests = quoteRequests.filter(req => req.status === 'pending');

  const handleOpenProposalModal = (request) => {
    setSelectedRequest(request);
    setProposalValue('');
  };

  const handleSubmitProposal = () => {
    if (!selectedRequest || !proposalValue || isNaN(parseFloat(proposalValue)) || parseFloat(proposalValue) <= 0) {
      toast({
        title: "Valor inválido!",
        description: "Por favor, insira um valor de proposta válido.",
        variant: "destructive",
      });
      return;
    }

    const updatedRequests = quoteRequests.map(req =>
      req.id === selectedRequest.id
        ? {
          ...req,
          proposals: [...(req.proposals || []), { driverId: currentDriverId, price: parseFloat(proposalValue), date: new Date().toISOString() }],
        }
        : req
    );
    setQuoteRequests(updatedRequests);

    toast({
      title: "Proposta Enviada!",
      description: `Sua proposta de R$ ${parseFloat(proposalValue).toFixed(2)} foi enviada.`,
      className: "bg-green-500 text-white",
    });
    
    setSelectedRequest(null);
  };

  const openChat = (quoteId, clientName) => {
    setActiveChat({ quoteId, recipientName: clientName });
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold gradient-text mb-2 flex items-center gap-3">
          <Gavel className="h-8 w-8" />
          Mural de Orçamentos
        </h1>
        <p className="text-gray-400">Aqui estão as solicitações de orçamento dos clientes. Envie sua proposta!</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {availableRequests.map((req, index) => {
          const client = clients.find(c => c.id === req.clientId);
          const hasSentProposal = req.proposals?.some(p => p.driverId === currentDriverId);

          return (
            <motion.div
              key={req.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="glass-effect border-white/20 card-hover flex flex-col h-full">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-white text-lg">Solicitação #{req.id.slice(-6)}</CardTitle>
                    <Badge className="status-pending">Aguardando Propostas</Badge>
                  </div>
                  <p className="text-sm text-gray-400">Cliente: {client?.name || 'Desconhecido'}</p>
                </CardHeader>
                <CardContent className="space-y-3 flex-grow">
                  <div className="flex items-start gap-2 text-gray-300"><MapPin className="h-4 w-4 mt-1 text-green-400" /><span><b>De:</b> {req.origin}</span></div>
                  <div className="flex items-start gap-2 text-gray-300"><MapPin className="h-4 w-4 mt-1 text-red-400" /><span><b>Para:</b> {req.destination}</span></div>
                  <div className="flex items-center gap-2 text-gray-300"><Calendar className="h-4 w-4" /><span>{new Date(req.date).toLocaleDateString()} {req.isDateFlexible && '(Flexível)'}</span></div>
                  <div className="pt-2 border-t border-white/10">
                    <p className="text-sm text-gray-400 line-clamp-2">{req.itemsList || 'Lista de itens não fornecida.'}</p>
                  </div>
                </CardContent>
                <CardFooter className="flex-col items-stretch gap-2">
                  <div className="flex gap-2 w-full">
                    <Button variant="outline" className="w-full" onClick={() => openChat(req.id, client?.name || 'Cliente')}>
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Chat
                    </Button>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className="w-full btn-gradient font-bold" onClick={() => handleOpenProposalModal(req)} disabled={hasSentProposal}>
                          <DollarSign className="h-4 w-4 mr-2" />
                          {hasSentProposal ? 'Proposta Enviada' : 'Enviar Proposta'}
                        </Button>
                      </DialogTrigger>
                    </Dialog>
                  </div>
                </CardFooter>
              </Card>
            </motion.div>
          )
        })}
      </div>
      
      {availableRequests.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <Package className="h-16 w-16 mx-auto text-gray-400 mb-4" />
          <p className="text-gray-400 text-lg">Nenhuma solicitação de orçamento no momento.</p>
          <p className="text-gray-500 text-sm mt-2">
            Volte em breve para novas oportunidades.
          </p>
        </motion.div>
      )}

      <AnimatePresence>
        {activeChat && (
          <ChatWindow
            quoteId={activeChat.quoteId}
            currentUserId={currentDriverId}
            onClose={() => setActiveChat(null)}
            recipientName={activeChat.recipientName}
          />
        )}
      </AnimatePresence>

      <Dialog open={!!selectedRequest} onOpenChange={() => setSelectedRequest(null)}>
        <DialogContent className="glass-effect border-white/20 text-white">
          <DialogHeader>
            <DialogTitle>Enviar Proposta</DialogTitle>
            <CardDescription className="text-gray-400">
              Você está enviando uma proposta para a solicitação #{selectedRequest?.id.slice(-6)}.
            </CardDescription>
          </DialogHeader>
          <div className="py-4 space-y-2">
            <Label htmlFor="proposal">Valor do Orçamento (R$)</Label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                id="proposal"
                type="number"
                value={proposalValue}
                onChange={(e) => setProposalValue(e.target.value)}
                className="bg-white/10 border-white/20 pl-8"
                placeholder="Ex: 550.00"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setSelectedRequest(null)}>Cancelar</Button>
            <Button className="btn-gradient" onClick={handleSubmitProposal}>
              <Send className="h-4 w-4 mr-2" />
              Enviar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default QuoteOpportunities;