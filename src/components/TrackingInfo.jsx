import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { ShieldQuestion, Wifi, WifiOff } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const TrackingInfo = ({ isOpen, onOpenChange, trackingType }) => {
  const isRealTime = trackingType === 'real';

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="glass-effect text-white">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2"><ShieldQuestion/> Sobre este Rastreamento</DialogTitle>
          <DialogDescription>Entenda como a localização deste frete está sendo compartilhada.</DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="text-center">
            <p className="text-sm text-gray-400 mb-2">Modo de Rastreamento Ativo:</p>
            {isRealTime ? (
              <Badge className="bg-green-500/20 text-green-300 border-green-500/30 text-base py-1 px-3">
                <Wifi className="h-4 w-4 mr-2"/>
                Tempo Real (Via GPS)
              </Badge>
            ) : (
              <Badge className="bg-yellow-500/20 text-yellow-300 border-yellow-500/30 text-base py-1 px-3">
                <WifiOff className="h-4 w-4 mr-2"/>
                Simulado
              </Badge>
            )}
          </div>
          {isRealTime ? (
            <div>
              <p className="font-semibold text-white">O que isso significa?</p>
              <p className="text-gray-300 text-sm mt-1">
                O motorista consentiu em compartilhar a localização real do seu dispositivo via GPS para este frete. O ponto no mapa representa a posição atual e precisa do veículo, proporcionando máxima segurança e previsibilidade.
              </p>
            </div>
          ) : (
             <div>
              <p className="font-semibold text-white">O que isso significa?</p>
              <p className="text-gray-300 text-sm mt-1">
                O motorista optou por não compartilhar sua localização em tempo real. O ponto que você vê no mapa é uma <strong>simulação inteligente</strong> do progresso da viagem, baseada na rota e no tempo estimado de chegada. É uma ótima referência, mas não a posição exata do veículo.
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TrackingInfo;