import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Gavel, Package, FileText, CheckCircle, Clock, XCircle, ArrowRight, Truck, Star, Phone, Mail, Wifi, MessageSquare } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import ChatWindow from '@/components/ChatWindow';

const MyQuotes = ({ quotes, setQuoteRequests, clientId }) => {
  const { toast } = useToast();
  const [orders, setOrders] = useLocalStorage('transport-orders', []);
  const [drivers] = useLocalStorage('transport-drivers', []);
  const [selectedQuote, setSelectedQuote] = useState(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [activeChat, setActiveChat] = useState(null);

  const handleAcceptQuote = (quoteRequest, proposal) => {
    setSelectedQuote({ quoteRequest, proposal });
    setIsConfirmOpen(true);
  };

  const confirmAcceptance = () => {
    if (!selectedQuote) return;

    const { quoteRequest, proposal } = selectedQuote;

    const newOrder = {
      id: `order-${Date.now()}`,
      clientId: quoteRequest.clientId,
      driverId: proposal.driverId,
      origin: quoteRequest.origin,
      destination: quoteRequest.destination,
      cargo: quoteRequest.itemsList.substring(0, 50) + '...', // Usando a lista de itens
      price: proposal.price,
      scheduledDate: quoteRequest.date,
      status: 'pending',
      paymentStatus: 'pending',
      isPriority: quoteRequest.isPriority,
      type: quoteRequest.type
    };

    setOrders(prevOrders => [...prevOrders, newOrder]);

    setQuoteRequests(prevRequests =>
      prevRequests.map(req =>
        req.id === quoteRequest.id ? { ...req, status: 'accepted', acceptedProposal: proposal } : req
      )
    );

    toast({
      title: "Proposta Aceita!",
      description: "O frete foi criado. Agora você pode prosseguir com o pagamento em 'Meus Fretes'.",
      className: "bg-green-500 text-white",
    });

    setIsConfirmOpen(false);
    setSelectedQuote(null);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'pending':
        return <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30"><Clock className="h-3 w-3 mr-1" />Aguardando Propostas</Badge>;
      case 'review':
        return <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30"><Gavel className="h-3 w-3 mr-1" />Em Análise</Badge>;
      case 'accepted':
        return <Badge className="bg-green-500/20 text-green-400 border-green-500/30"><CheckCircle className="h-3 w-3 mr-1" />Aceito</Badge>;
      case 'declined':
        return <Badge className="bg-red-500/20 text-red-400 border-red-500/30"><XCircle className="h-3 w-3 mr-1" />Recusado</Badge>;
      default:
        return <Badge variant="secondary">Indefinido</Badge>;
    }
  };

  const openChat = (quoteId, driverId, driverName) => {
    const uniqueChatId = `${quoteId}-${driverId}`;
    setActiveChat({ chatId: uniqueChatId, recipientName: driverName });
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold gradient-text-green mb-2">Meus Orçamentos</h1>
        <p className="text-gray-400">Acompanhe as propostas para suas solicitações de frete.</p>
      </div>

      {quotes.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-16 bg-white/5 rounded-2xl"
        >
          <FileText className="mx-auto h-16 w-16 text-gray-500 mb-4" />
          <h3 className="text-xl font-semibold text-white">Nenhum Orçamento Encontrado</h3>
          <p className="text-gray-400 mt-2">Você ainda não possui solicitações de orçamento ou propostas.</p>
        </motion.div>
      ) : (
        <AnimatePresence>
          {quotes.map((quote, index) => (
            <motion.div
              key={quote.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card className="glass-effect border-white/20 overflow-hidden">
                <CardHeader className="bg-white/5 p-6">
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                    <div>
                      <CardTitle className="text-white text-xl flex items-center gap-2">
                        <Package className="h-6 w-6" /> {quote.itemsList.substring(0,50)}...
                      </CardTitle>
                      <div className="text-sm text-gray-400 flex items-center gap-2 mt-2">
                        <span>{quote.origin}</span> <ArrowRight className="h-4 w-4" /> <span>{quote.destination}</span>
                      </div>
                    </div>
                    {getStatusBadge(quote.status)}
                  </div>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  <h3 className="text-lg font-semibold text-gray-200">Propostas Recebidas:</h3>
                  {quote.proposals && quote.proposals.length > 0 ? (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                      {quote.proposals.map(proposal => {
                        const driver = drivers.find(d => d.id === proposal.driverId);
                        if(!driver) return null;
                        const averageRating = driver.ratings?.length > 0 ? (driver.ratings.reduce((sum, r) => sum + r.rating, 0) / driver.ratings.length) : 0;
                        return (
                          <div key={proposal.driverId} className="p-4 bg-white/5 rounded-lg border border-white/10 flex flex-col justify-between">
                            <div>
                              <div className="flex justify-between items-start">
                                <div>
                                  <p className="font-bold text-white">{driver.name}</p>
                                  <div className="flex items-center gap-2 text-sm text-gray-400">
                                    <Truck className="h-4 w-4" />
                                    <span>{driver.vehicleType} - {driver.vehiclePlate}</span>
                                  </div>
                                </div>
                                <div className="flex items-center gap-1 text-yellow-400">
                                  <Star className="h-4 w-4 fill-current" />
                                  <span>{averageRating.toFixed(1)}</span>
                                </div>
                              </div>
                              <div className="flex flex-wrap gap-2 mt-2">
                                <Badge variant="outline" className="text-green-300 border-green-300/50 bg-green-900/30">
                                  <Wifi className="h-3 w-3 mr-1" />
                                  Rastreamento Incluído via Plataforma
                                </Badge>
                              </div>
                              <p className="text-2xl font-bold my-4 text-green-300">R$ {proposal.price.toFixed(2)}</p>
                            </div>
                            <div className="flex gap-2">
                              <Button
                                onClick={() => openChat(quote.id, driver.id, driver.name)}
                                variant="outline"
                                className="w-full"
                              >
                                <MessageSquare className="h-4 w-4 mr-2" /> Chat
                              </Button>
                              <Button
                                onClick={() => handleAcceptQuote(quote, proposal)}
                                disabled={quote.status === 'accepted'}
                                className="w-full btn-gradient-green"
                              >
                                {quote.status === 'accepted' ? 'Aceito' : 'Aceitar'}
                              </Button>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  ) : (
                    <p className="text-gray-400 text-center py-8">Nenhuma proposta recebida ainda.</p>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      )}

      <AnimatePresence>
        {activeChat && (
          <ChatWindow
            chatId={activeChat.chatId}
            currentUserId={clientId}
            onClose={() => setActiveChat(null)}
            recipientName={activeChat.recipientName}
          />
        )}
      </AnimatePresence>

      <Dialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
        <DialogContent className="glass-effect text-white">
          <DialogHeader>
            <DialogTitle>Confirmar Aceitação</DialogTitle>
            <DialogDescription className="text-gray-400">
              Você está prestes a aceitar a proposta de <strong className="text-white">{drivers.find(d => d.id === selectedQuote?.proposal.driverId)?.name}</strong> no valor de <strong className="text-green-300">R$ {selectedQuote?.proposal.price.toFixed(2)}</strong>.
              <br /><br />
              Um novo frete será criado e você poderá encontrá-lo na seção "Meus Fretes". Deseja continuar?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="ghost">Cancelar</Button>
            </DialogClose>
            <Button onClick={confirmAcceptance} className="btn-gradient-green">Confirmar e Criar Frete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MyQuotes;