import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { DollarSign, Percent, Save, Coins as HandCoins, Map, Globe, Building, Gift, Truck, Award, Rocket, Loader2 } from 'lucide-react';
import { useData } from '@/contexts/DataContext';

const EarningsSettings = () => {
  const { earningsConfig, updateEarningsConfig, saveEarningsConfig, loading } = useData();
  const [isSaving, setIsSaving] = useState(false);
  const [initialData, setInitialData] = useState(null);
  const { toast } = useToast();

  useEffect(() => {
    if (earningsConfig && !initialData) {
      const defaultConfig = {
        rates: { local: 15, state: 18, interstate: 20 },
        referral_discount: { local: 2, state: 2.5, interstate: 3 },
        referral_bonus: 20,
        advance_percentage: 70,
        priority_fee: 50,
        loyalty_tiers: {
          silver: { freights: 6, discount: 5 },
          gold: { freights: 16, discount: 10 },
        },
      };

      const mergedConfig = {
        ...defaultConfig,
        ...earningsConfig,
        rates: { ...defaultConfig.rates, ...(earningsConfig.rates || {}) },
        referral_discount: { ...defaultConfig.referral_discount, ...(earningsConfig.referral_discount || {}) },
        loyalty_tiers: {
          ...defaultConfig.loyalty_tiers,
          ...(earningsConfig.loyalty_tiers || {}),
          silver: { ...defaultConfig.loyalty_tiers.silver, ...(earningsConfig.loyalty_tiers?.silver || {}) },
          gold: { ...defaultConfig.loyalty_tiers.gold, ...(earningsConfig.loyalty_tiers?.gold || {}) },
        },
      };
      
      setInitialData(JSON.parse(JSON.stringify(mergedConfig)));
    }
  }, [earningsConfig, initialData]);
  
  const hasChanged = earningsConfig && initialData ? JSON.stringify(earningsConfig) !== JSON.stringify(initialData) : false;

  const handleSave = async () => {
    if (!earningsConfig.loyalty_tiers?.silver || !earningsConfig.loyalty_tiers?.gold) {
      toast({ title: "Erro de dados!", description: "Não foi possível salvar, dados de fidelidade ausentes.", variant: "destructive" });
      return;
    }
  
    const allValues = [
      ...Object.values(earningsConfig.rates),
      ...Object.values(earningsConfig.referral_discount),
      earningsConfig.referral_bonus,
      earningsConfig.advance_percentage,
      earningsConfig.priority_fee,
      earningsConfig.loyalty_tiers.silver.freights,
      earningsConfig.loyalty_tiers.silver.discount,
      earningsConfig.loyalty_tiers.gold.freights,
      earningsConfig.loyalty_tiers.gold.discount,
    ];

    if (allValues.some(v => isNaN(v) || v < 0)) {
      toast({ title: "Valores inválidos detectados!", description: "Por favor, verifique se todos os campos são números positivos.", variant: "destructive" });
      return;
    }

    if (earningsConfig.advance_percentage > 100) {
      toast({ title: "Adiantamento inválido!", description: "O adiantamento não pode ser maior que 100%.", variant: "destructive" });
      return;
    }
    
    if (earningsConfig.loyalty_tiers.silver.freights >= earningsConfig.loyalty_tiers.gold.freights && earningsConfig.loyalty_tiers.gold.freights > 0) {
        toast({ title: "Regra de fidelidade inválida!", description: "O número de fretes para o nível Ouro deve ser maior que para o nível Prata.", variant: "destructive" });
        return;
    }

    setIsSaving(true);
    try {
      const savedData = await saveEarningsConfig(earningsConfig);
      setInitialData(JSON.parse(JSON.stringify(savedData)));
      toast({
        title: "Configurações salvas!",
        description: "Suas configurações de ganhos e fidelidade foram atualizadas com sucesso.",
      });
    } catch (error) {
       toast({
        title: "Erro ao Salvar",
        description: "Não foi possível atualizar as configurações. Por favor, tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };
  
  const handleChange = (path, value) => {
    updateEarningsConfig(path, value);
  };

  if (loading || !earningsConfig) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="h-8 w-8 animate-spin text-blue-400" />
        <p className="ml-4 text-white text-xl">Carregando configurações...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold gradient-text mb-2">Ganhos, Bônus e Fidelidade</h1>
        <p className="text-gray-400">Defina seu modelo de negócio, comissões, indicações e o programa de fidelidade.</p>
      </motion.div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card className="glass-effect border-white/20 h-full">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  Modelo de Ganhos
                </CardTitle>
                <CardDescription className="text-gray-300">Comissão e taxas da plataforma.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Comissão por Tipo de Frete</Label>
                  <div className="space-y-3 mt-2 p-4 bg-black/20 rounded-lg">
                    <div className="flex items-center gap-3"><Building className="h-5 w-5 text-teal-400" /><Label htmlFor="localRate" className="flex-1">Mesma Cidade</Label><div className="relative w-28"><Input id="localRate" type="number" value={earningsConfig.rates.local} onChange={(e) => handleChange('rates.local', e.target.value)} className="bg-white/10 border-white/20 text-white pr-7" /><Percent className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" /></div></div>
                    <div className="flex items-center gap-3"><Map className="h-5 w-5 text-blue-400" /><Label htmlFor="stateRate" className="flex-1">Mesmo Estado</Label><div className="relative w-28"><Input id="stateRate" type="number" value={earningsConfig.rates.state} onChange={(e) => handleChange('rates.state', e.target.value)} className="bg-white/10 border-white/20 text-white pr-7" /><Percent className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" /></div></div>
                    <div className="flex items-center gap-3"><Globe className="h-5 w-5 text-purple-400" /><Label htmlFor="interstateRate" className="flex-1">Outro Estado</Label><div className="relative w-28"><Input id="interstateRate" type="number" value={earningsConfig.rates.interstate} onChange={(e) => handleChange('rates.interstate', e.target.value)} className="bg-white/10 border-white/20 text-white pr-7" /><Percent className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" /></div></div>
                  </div>
                </div>
                <div>
                  <Label htmlFor="advance_percentage">Adiantamento para Motorista (%)</Label>
                  <div className="relative mt-1"><Input id="advance_percentage" type="number" value={earningsConfig.advance_percentage} onChange={(e) => handleChange('advance_percentage', e.target.value)} className="bg-white/10 border-white/20 text-white pl-8" min="0" max="100" step="1" /><HandCoins className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" /></div>
                </div>
                <div>
                  <Label htmlFor="priority_fee">Taxa de Frete Prioritário (R$)</Label>
                  <div className="relative mt-1"><Input id="priority_fee" type="number" value={earningsConfig.priority_fee} onChange={(e) => handleChange('priority_fee', e.target.value)} className="bg-white/10 border-white/20 text-white pl-8" step="0.01" /><Rocket className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" /></div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
        
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="glass-effect border-white/20 h-full bg-gradient-to-br from-green-600/30 to-cyan-600/30">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2"><Gift className="h-5 w-5" />Benefícios de Indicação</CardTitle>
                <CardDescription className="text-gray-300">Incentivos do programa de indicações.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Desconto para o Indicado (%)</Label>
                  <div className="space-y-3 mt-2 p-4 bg-black/20 rounded-lg">
                    <div className="flex items-center gap-3"><Building className="h-5 w-5 text-teal-400" /><Label htmlFor="refLocalRate" className="flex-1">Mesma Cidade</Label><div className="relative w-28"><Input id="refLocalRate" type="number" value={earningsConfig.referral_discount.local} onChange={(e) => handleChange('referral_discount.local', e.target.value)} className="bg-white/10 border-white/20 text-white pr-7" /><Percent className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" /></div></div>
                    <div className="flex items-center gap-3"><Map className="h-5 w-5 text-blue-400" /><Label htmlFor="refStateRate" className="flex-1">Mesmo Estado</Label><div className="relative w-28"><Input id="refStateRate" type="number" value={earningsConfig.referral_discount.state} onChange={(e) => handleChange('referral_discount.state', e.target.value)} className="bg-white/10 border-white/20 text-white pr-7" /><Percent className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" /></div></div>
                    <div className="flex items-center gap-3"><Globe className="h-5 w-5 text-purple-400" /><Label htmlFor="refInterstateRate" className="flex-1">Outro Estado</Label><div className="relative w-28"><Input id="refInterstateRate" type="number" value={earningsConfig.referral_discount.interstate} onChange={(e) => handleChange('referral_discount.interstate', e.target.value)} className="bg-white/10 border-white/20 text-white pr-7" /><Percent className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" /></div></div>
                  </div>
                </div>
                <div>
                  <Label htmlFor="referral_bonus">Bônus para Quem Indica (R$)</Label>
                  <div className="relative mt-1"><Input id="referral_bonus" type="number" value={earningsConfig.referral_bonus} onChange={(e) => handleChange('referral_bonus', e.target.value)} className="bg-white/10 border-white/20 text-white pl-8" step="0.01" /><DollarSign className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" /></div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <div className="space-y-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
            >
                <Card className="glass-effect border-white/20 h-full bg-gradient-to-br from-yellow-600/30 to-orange-600/30">
                    <CardHeader>
                        <CardTitle className="text-white flex items-center gap-2"><Award className="h-5 w-5" />Plano de Fidelidade</CardTitle>
                        <CardDescription className="text-gray-300">Recompense clientes recorrentes.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="p-4 bg-black/20 rounded-lg space-y-3">
                            <h4 className="font-semibold text-gray-300">Nível Prata</h4>
                            <div className="flex items-center gap-3">
                                <Truck className="h-5 w-5 text-gray-400" />
                                <Label htmlFor="silverFreights" className="flex-1">Fretes para atingir</Label>
                                <Input id="silverFreights" type="number" value={earningsConfig.loyalty_tiers.silver.freights} onChange={(e) => handleChange('loyalty_tiers.silver.freights', e.target.value)} className="bg-white/10 border-white/20 text-white w-24" />
                            </div>
                            <div className="flex items-center gap-3">
                                <Percent className="h-5 w-5 text-gray-400" />
                                <Label htmlFor="silverDiscount" className="flex-1">Desconto na taxa</Label>
                                <Input id="silverDiscount" type="number" value={earningsConfig.loyalty_tiers.silver.discount} onChange={(e) => handleChange('loyalty_tiers.silver.discount', e.target.value)} className="bg-white/10 border-white/20 text-white w-24" />
                            </div>
                        </div>
                        <div className="p-4 bg-black/20 rounded-lg space-y-3">
                            <h4 className="font-semibold text-yellow-300">Nível Ouro</h4>
                            <div className="flex items-center gap-3">
                                <Truck className="h-5 w-5 text-gray-400" />
                                <Label htmlFor="goldFreights" className="flex-1">Fretes para atingir</Label>
                                <Input id="goldFreights" type="number" value={earningsConfig.loyalty_tiers.gold.freights} onChange={(e) => handleChange('loyalty_tiers.gold.freights', e.target.value)} className="bg-white/10 border-white/20 text-white w-24" />
                            </div>
                            <div className="flex items-center gap-3">
                                <Percent className="h-5 w-5 text-gray-400" />
                                <Label htmlFor="goldDiscount" className="flex-1">Desconto na taxa</Label>
                                <Input id="goldDiscount" type="number" value={earningsConfig.loyalty_tiers.gold.discount} onChange={(e) => handleChange('loyalty_tiers.gold.discount', e.target.value)} className="bg-white/10 border-white/20 text-white w-24" />
                            </div>
                             <p className="text-xs text-yellow-200/80 pt-2">Clientes Ouro também recebem suporte prioritário.</p>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="flex justify-end mt-6"
      >
        <Button onClick={handleSave} className="w-full md:w-auto btn-gradient" disabled={isSaving || !hasChanged}>
          {isSaving ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Salvando...
            </>
          ) : (
            <>
              <Save className="h-4 w-4 mr-2" />
              Salvar Todas as Alterações
            </>
          )}
        </Button>
      </motion.div>
    </div>
  );
};

export default EarningsSettings;