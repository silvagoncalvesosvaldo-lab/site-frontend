import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Wifi, WifiOff, HelpCircle } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from '@/components/ui/dialog';

const TrackingConsent = ({ value, onValueChange, disabled }) => {
  return (
    <Card className="glass-effect border-white/20">
      <CardHeader>
        <div className="flex justify-between items-start">
            <div>
                <CardTitle className="text-white flex items-center gap-2">
                    Preferência de Rastreamento
                </CardTitle>
                <CardDescription className="text-gray-400 mt-2">
                    Escolha como sua localização será compartilhada durante os fretes.
                </CardDescription>
            </div>
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                        <HelpCircle className="h-5 w-5" />
                    </Button>
                </DialogTrigger>
                <DialogContent className="glass-effect text-white">
                    <DialogHeader>
                        <DialogTitle>Entenda as Opções de Rastreamento</DialogTitle>
                        <DialogDescription className="text-gray-400">
                            Sua escolha impacta a confiança e a experiência do cliente.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4 text-sm">
                        <div className="p-4 rounded-lg bg-green-900/50 border border-green-500/30">
                            <p className="font-bold text-green-300 flex items-center gap-2"><Wifi/> Rastreamento em Tempo Real (Recomendado)</p>
                            <p className="text-gray-300 mt-2">
                                Utiliza o GPS do seu dispositivo para mostrar sua localização exata ao cliente.
                            </p>
                            <ul className="list-disc list-inside mt-2 text-gray-400 pl-2">
                                <li>Aumenta drasticamente a confiança do cliente.</li>
                                <li>Demonstra profissionalismo e transparência.</li>
                                <li>Pode ser um diferencial para você ser escolhido.</li>
                            </ul>
                        </div>
                        <div className="p-4 rounded-lg bg-yellow-900/50 border border-yellow-500/30">
                            <p className="font-bold text-yellow-300 flex items-center gap-2"><WifiOff/> Rastreamento Simulado</p>
                            <p className="text-gray-300 mt-2">
                                Não usa seu GPS. A plataforma simula o progresso da viagem com base na rota e no tempo estimado.
                            </p>
                             <ul className="list-disc list-inside mt-2 text-gray-400 pl-2">
                                <li>Oferece uma estimativa de localização ao cliente.</li>
                                <li>Sua localização real permanece privada.</li>
                            </ul>
                        </div>
                        <p className="text-center text-xs text-gray-500 pt-2">A plataforma nunca compartilha sua localização fora do contexto de um frete ativo.</p>
                    </div>
                </DialogContent>
            </Dialog>
        </div>

      </CardHeader>
      <CardContent>
        <RadioGroup value={value} onValueChange={onValueChange} disabled={disabled} className="flex flex-col sm:flex-row gap-4">
          <Label htmlFor="real-time" className="flex-1 p-4 rounded-lg border-2 border-transparent has-[:checked]:border-green-500 has-[:checked]:bg-green-500/10 transition-all cursor-pointer">
            <div className="flex items-center space-x-3">
              <RadioGroupItem value="real" id="real-time" />
              <div className="flex items-center gap-2">
                <Wifi className="h-5 w-5 text-green-400" />
                <div>
                  <p className="font-semibold text-white">Tempo Real</p>
                  <p className="text-xs text-gray-400">Recomendado</p>
                </div>
              </div>
            </div>
          </Label>
          <Label htmlFor="simulated" className="flex-1 p-4 rounded-lg border-2 border-transparent has-[:checked]:border-yellow-500 has-[:checked]:bg-yellow-500/10 transition-all cursor-pointer">
            <div className="flex items-center space-x-3">
              <RadioGroupItem value="simulated" id="simulated" />
              <div className="flex items-center gap-2">
                <WifiOff className="h-5 w-5 text-yellow-400" />
                <div>
                  <p className="font-semibold text-white">Simulado</p>
                  <p className="text-xs text-gray-400">Privacidade Máxima</p>
                </div>
              </div>
            </div>
          </Label>
        </RadioGroup>
      </CardContent>
    </Card>
  );
};

export default TrackingConsent;