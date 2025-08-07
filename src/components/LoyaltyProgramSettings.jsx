import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { Save, Award, Truck, Percent } from 'lucide-react';

const LoyaltyProgramSettings = ({ settings, setSettings }) => {
  const [localSettings, setLocalSettings] = useState(JSON.parse(JSON.stringify(settings)));
  const { toast } = useToast();

  const handleLevelChange = (levelIndex, field, value) => {
    const newLevels = [...localSettings.levels];
    newLevels[levelIndex][field] = parseFloat(value) || 0;
    setLocalSettings({ ...localSettings, levels: newLevels });
  };

  const handleSave = () => {
    if (localSettings.levels[1].minFreights <= localSettings.levels[0].minFreights) {
      toast({
        title: "Erro de Configuração",
        description: "O nível Prata deve exigir mais fretes que o Bronze.",
        variant: "destructive",
      });
      return;
    }
    if (localSettings.levels[2].minFreights <= localSettings.levels[1].minFreights) {
      toast({
        title: "Erro de Configuração",
        description: "O nível Ouro deve exigir mais fretes que o Prata.",
        variant: "destructive",
      });
      return;
    }

    setSettings(localSettings);
    toast({
      title: "Configurações Salvas!",
      description: "As regras do Plano de Fidelidade foram atualizadas.",
    });
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold gradient-text-yellow mb-2">Configurações do Plano de Fidelidade</h1>
        <p className="text-gray-400">Defina os níveis e benefícios para recompensar seus clientes mais leais.</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Card className="glass-effect border-yellow-500/30">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Award className="h-5 w-5" />
              Níveis de Fidelidade
            </CardTitle>
            <CardDescription className="text-gray-300">Ajuste os requisitos e descontos para cada nível.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {localSettings.levels.map((level, index) => {
              if (level.name === 'Bronze') return null;
              const levelColor = level.name === 'Prata' ? 'text-gray-300' : 'text-yellow-400';
              return (
                <div key={level.name} className="p-4 bg-black/20 rounded-lg space-y-4">
                  <h4 className={`font-semibold text-lg ${levelColor}`}>Nível {level.name}</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor={`${level.name}-freights`}>Fretes para atingir</Label>
                      <div className="relative mt-1">
                        <Input
                          id={`${level.name}-freights`}
                          type="number"
                          value={level.minFreights}
                          onChange={(e) => handleLevelChange(index, 'minFreights', e.target.value)}
                          className="bg-white/10 border-white/20 text-white pl-8"
                          min={index > 0 ? localSettings.levels[index - 1].minFreights + 1 : 1}
                        />
                        <Truck className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor={`${level.name}-discount`}>Desconto na taxa (%)</Label>
                      <div className="relative mt-1">
                        <Input
                          id={`${level.name}-discount`}
                          type="number"
                          value={level.discount}
                          onChange={(e) => handleLevelChange(index, 'discount', e.target.value)}
                          className="bg-white/10 border-white/20 text-white pl-8"
                          min="0"
                        />
                        <Percent className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      </div>
                    </div>
                  </div>
                   {level.name === 'Ouro' && (
                     <p className="text-xs text-yellow-200/80 pt-2">Clientes Ouro também recebem suporte prioritário por padrão.</p>
                  )}
                </div>
              );
            })}
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex justify-end mt-6"
      >
        <Button onClick={handleSave} className="w-full md:w-auto btn-gradient-yellow">
          <Save className="h-4 w-4 mr-2" />
          Salvar Alterações
        </Button>
      </motion.div>
    </div>
  );
};

export default LoyaltyProgramSettings;