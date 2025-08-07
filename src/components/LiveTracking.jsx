import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import TrackingMap from '@/components/TrackingMap';
import { useTripSimulation } from '@/hooks/useTripSimulation';
import { cityCoordinates } from '@/lib/cityCoordinates';
import { Progress } from '@/components/ui/progress';
import { Truck, User, MapPin, Flag, Clock, Utensils, Fuel, Wrench, Info, Star } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { poiData } from '@/lib/poiData';

const LiveTracking = ({ order, driver, isOpen, onOpenChange }) => {
  const { currentPosition, progress } = useTripSimulation(order);
  const originCoords = cityCoordinates[order.origin];
  const destinationCoords = cityCoordinates[order.destination];

  const POICard = ({ poi }) => {
    const icons = {
      'Restaurante': <Utensils className="h-5 w-5 text-orange-400" />,
      'Posto de Combustível': <Fuel className="h-5 w-5 text-blue-400" />,
      'Oficina Mecânica': <Wrench className="h-5 w-5 text-yellow-400" />,
    };
    const ratingColor = poi.rating >= 4 ? 'text-green-400' : poi.rating >= 2.5 ? 'text-yellow-400' : 'text-red-400';

    return (
      <Card className="bg-white/5 border-white/10">
        <CardHeader>
          <CardTitle className="text-base text-white flex items-center gap-2">
            {icons[poi.type]}
            {poi.name}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-400">{poi.description}</p>
        </CardContent>
        <CardFooter className="flex justify-between items-center text-sm">
          <span className="text-gray-300">{poi.type}</span>
          <div className={`flex items-center gap-1 font-bold ${ratingColor}`}>
            <Star className="h-4 w-4" />
            {poi.rating.toFixed(1)}
          </div>
        </CardFooter>
      </Card>
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl h-[90vh] p-0 bg-transparent border-0">
        <Card className="glass-effect border-white/20 shadow-2xl flex flex-col h-full w-full">
          <DialogHeader className="p-6">
            <DialogTitle className="text-2xl font-bold gradient-text flex items-center gap-3">
              <Truck className="h-7 w-7" />
              Rastreamento e Guia de Rota
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              Acompanhe o progresso do frete e veja pontos de parada úteis. ID: {order.id}
            </DialogDescription>
          </DialogHeader>
          <CardContent className="flex-1 flex flex-col lg:flex-row gap-6 p-6 pt-0 overflow-hidden">
            <div className="lg:w-1/3 flex flex-col space-y-4">
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
                <Card className="bg-white/5 border-white/10">
                  <CardHeader>
                    <CardTitle className="text-lg text-white flex items-center gap-2"><User /> Motorista</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300">{driver?.name || 'N/A'}</p>
                    <p className="text-sm text-gray-400">{driver?.vehicle || 'N/A'}</p>
                  </CardContent>
                </Card>
              </motion.div>
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
                <Card className="bg-white/5 border-white/10">
                  <CardHeader>
                    <CardTitle className="text-lg text-white flex items-center gap-2"><MapPin /> Rota</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <p className="text-gray-300"><strong>De:</strong> {order.origin}</p>
                    <p className="text-gray-300"><strong>Para:</strong> {order.destination}</p>
                  </CardContent>
                </Card>
              </motion.div>
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
                <Card className="bg-white/5 border-white/10">
                  <CardHeader>
                    <CardTitle className="text-lg text-white flex items-center gap-2"><Clock /> Progresso da Viagem</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center mb-2 text-white">
                      <span>{progress < 100 ? 'Em trânsito' : 'Entregue'}</span>
                      <span className="font-bold">{Math.round(progress)}%</span>
                    </div>
                    <Progress value={progress} />
                  </CardContent>
                </Card>
              </motion.div>
            </div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }} 
              animate={{ opacity: 1, scale: 1 }} 
              transition={{ delay: 0.2 }}
              className="lg:w-2/3 flex flex-col h-full"
            >
              <Tabs defaultValue="map" className="flex flex-col flex-1 h-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="map">Mapa em Tempo Real</TabsTrigger>
                  <TabsTrigger value="poi">Pontos de Parada</TabsTrigger>
                </TabsList>
                <TabsContent value="map" className="flex-1 h-0">
                  <div className="h-full w-full rounded-lg overflow-hidden border border-white/20">
                    <TrackingMap
                      origin={originCoords}
                      destination={destinationCoords}
                      currentPosition={currentPosition}
                      pois={poiData}
                    />
                  </div>
                </TabsContent>
                <TabsContent value="poi" className="flex-1 h-0 overflow-y-auto">
                  <div className="p-4 bg-slate-800/50 rounded-lg flex items-start gap-3 mb-4">
                    <Info className="h-5 w-5 text-yellow-400 mt-1 flex-shrink-0" />
                    <p className="text-sm text-gray-400">
                      <strong>Aviso:</strong> As informações a seguir são sugestões. A plataforma não se responsabiliza pela qualidade ou segurança dos serviços prestados por terceiros. A decisão final é sempre do motorista.
                    </p>
                  </div>
                  <div className="space-y-4">
                    {poiData.map(poi => <POICard key={poi.id} poi={poi} />)}
                  </div>
                </TabsContent>
              </Tabs>
            </motion.div>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
};

export default LiveTracking;