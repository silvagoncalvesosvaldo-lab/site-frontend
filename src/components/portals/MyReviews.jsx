import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Star, User, Truck } from 'lucide-react';

const MyReviews = ({ orders, userType, userId }) => {

  const renderStars = (rating) => (
    <div className="flex items-center gap-1">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`h-5 w-5 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'}`}
        />
      ))}
    </div>
  );

  const receivedReviews = orders.filter(order => {
    if (order.status !== 'completed') return false;
    if (userType === 'client' && order.clientId === userId && order.clientRating) return true;
    if (userType === 'driver' && order.driverId === userId && order.driverRating) return true;
    return false;
  }).map(order => userType === 'client' ? order.clientRating : order.driverRating);

  const sentReviews = orders.filter(order => {
    if (order.status !== 'completed') return false;
    if (userType === 'client' && order.clientId === userId && order.driverRating) return true;
    if (userType === 'driver' && order.driverId === userId && order.clientRating) return true;
    return false;
  }).map(order => userType === 'client' ? order.driverRating : order.clientRating);

  const averageRating = receivedReviews.length > 0
    ? (receivedReviews.reduce((sum, review) => sum + review.rating, 0) / receivedReviews.length).toFixed(1)
    : 'N/A';

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold gradient-text mb-2">Minha Reputação</h1>
        <p className="text-gray-400">Veja o que outros usuários dizem sobre você.</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Card className="glass-effect border-white/20">
          <CardHeader className="items-center text-center">
            <CardTitle className="text-white text-2xl">Sua Média de Avaliações</CardTitle>
            <p className="text-6xl font-bold text-yellow-400 pt-4">{averageRating}</p>
            <div className="pt-2">{renderStars(Math.round(averageRating))}</div>
            <CardDescription className="text-gray-400 pt-2">Baseado em {receivedReviews.length} avaliações</CardDescription>
          </CardHeader>
        </Card>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-2xl font-semibold text-white mb-4">Avaliações Recebidas</h2>
          <Card className="glass-effect border-white/20 max-h-96 overflow-y-auto">
            <CardContent className="p-6 space-y-4">
              {receivedReviews.length > 0 ? receivedReviews.map((review, index) => (
                <div key={index} className="p-4 bg-white/5 rounded-lg">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      {userType === 'client' ? <Truck className="h-5 w-5 text-blue-400" /> : <User className="h-5 w-5 text-green-400" />}
                      <span className="font-semibold text-white">Avaliação de {userType === 'client' ? 'Motorista' : 'Cliente'}</span>
                    </div>
                    {renderStars(review.rating)}
                  </div>
                  {review.comment && <p className="text-sm text-gray-300 mt-2 italic">"{review.comment}"</p>}
                </div>
              )) : <p className="text-center text-gray-400 py-8">Nenhuma avaliação recebida ainda.</p>}
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h2 className="text-2xl font-semibold text-white mb-4">Avaliações Enviadas</h2>
          <Card className="glass-effect border-white/20 max-h-96 overflow-y-auto">
            <CardContent className="p-6 space-y-4">
              {sentReviews.length > 0 ? sentReviews.map((review, index) => (
                <div key={index} className="p-4 bg-white/5 rounded-lg">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      {userType === 'client' ? <User className="h-5 w-5 text-green-400" /> : <Truck className="h-5 w-5 text-blue-400" />}
                      <span className="font-semibold text-white">Sua avaliação para {userType === 'client' ? 'Motorista' : 'Cliente'}</span>
                    </div>
                    {renderStars(review.rating)}
                  </div>
                  {review.comment && <p className="text-sm text-gray-300 mt-2 italic">"{review.comment}"</p>}
                </div>
              )) : <p className="text-center text-gray-400 py-8">Nenhuma avaliação enviada ainda.</p>}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default MyReviews;