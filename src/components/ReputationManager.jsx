import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star, MessageSquare, Loader2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { useData } from '@/contexts/DataContext';

const ReputationManager = ({ userType, userId }) => {
  const { freightOrders, setFreightOrders, loading } = useData();
  const { toast } = useToast();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [currentOrder, setCurrentOrder] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="h-8 w-8 animate-spin text-blue-400" />
        <p className="ml-4 text-white text-xl">Carregando reputação...</p>
      </div>
    );
  }

  const ordersToReview = (freightOrders || []).filter(order => {
    if (order.status !== 'completed') return false;
    if (userType === 'client' && order.client_id === userId && !order.clientReviewed) return true;
    if (userType === 'driver' && order.driver_id === userId && !order.driverReviewed) return true;
    return false;
  });

  const handleOpenDialog = (order) => {
    setCurrentOrder(order);
    setRating(0);
    setComment('');
    setIsDialogOpen(true);
  };

  const handleSubmitReview = () => {
    if (rating === 0) {
      toast({
        title: "Avaliação incompleta",
        description: "Por favor, selecione pelo menos uma estrela.",
        variant: "destructive",
      });
      return;
    }

    setFreightOrders(prevOrders => prevOrders.map(o => {
      if (o.id === currentOrder.id) {
        const newReview = { rating, comment, date: new Date().toISOString() };
        if (userType === 'client') {
          return { ...o, driverRating: newReview, clientReviewed: true };
        } else {
          return { ...o, clientRating: newReview, driverReviewed: true };
        }
      }
      return o;
    }));

    toast({
      title: "Avaliação enviada!",
      description: "Obrigado pelo seu feedback.",
    });
    setIsDialogOpen(false);
  };

  const renderStars = (currentRating, setRatingFn) => (
    <div className="flex items-center gap-2">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`h-8 w-8 cursor-pointer transition-colors ${i < currentRating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-500'}`}
          onClick={() => setRatingFn(i + 1)}
        />
      ))}
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="glass-effect border-white/20">
        <CardHeader>
          <CardTitle className="gradient-text">Avaliações Pendentes</CardTitle>
          <CardDescription className="text-gray-400">Deixe seu feedback sobre os fretes concluídos.</CardDescription>
        </CardHeader>
        <CardContent>
          {ordersToReview.length > 0 ? (
            <ul className="space-y-4">
              {ordersToReview.map(order => (
                <li key={order.id} className="p-4 bg-white/5 rounded-lg flex justify-between items-center">
                  <div>
                    <p className="font-semibold text-white">Frete: {order.origin} para {order.destination}</p>
                    <p className="text-sm text-gray-400">Carga: {order.cargo}</p>
                  </div>
                  <Button onClick={() => handleOpenDialog(order)}>Avaliar</Button>
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-center py-8">
              <MessageSquare className="mx-auto h-12 w-12 text-gray-500" />
              <p className="mt-4 text-gray-400">Você não tem nenhuma avaliação pendente.</p>
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="glass-effect border-white/20 text-white">
          <DialogHeader>
            <DialogTitle className="gradient-text">Como foi a sua experiência?</DialogTitle>
          </DialogHeader>
          <div className="space-y-6 py-4">
            <div>
              <Label className="text-gray-300">Sua avaliação</Label>
              <div className="mt-2">
                {renderStars(rating, setRating)}
              </div>
            </div>
            <div>
              <Label htmlFor="comment" className="text-gray-300">Deixe um comentário (opcional)</Label>
              <Textarea
                id="comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="mt-2 bg-white/10 border-white/20"
                placeholder="Descreva sua experiência..."
              />
            </div>
            <Button onClick={handleSubmitReview} className="w-full btn-gradient">Enviar Avaliação</Button>
          </div>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
};

export default ReputationManager;