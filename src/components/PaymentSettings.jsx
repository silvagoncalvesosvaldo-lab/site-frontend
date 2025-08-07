import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { Save, Percent, CreditCard, RefreshCw, QrCode, Loader2 } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { useData } from '@/contexts/DataContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const PaymentSettings = () => {
  const { paymentSettings, savePaymentSettings, loading } = useData();
  const [localSettings, setLocalSettings] = useState(null);
  const [initialSettings, setInitialSettings] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (paymentSettings) {
      const defaultRates = [
        { installments: 1, rate: 0.00 }, { installments: 2, rate: 4.59 }, { installments: 3, rate: 5.97 },
        { installments: 4, rate: 7.33 }, { installments: 5, rate: 8.66 }, { installments: 6, rate: 9.97 },
        { installments: 7, rate: 11.26 }, { installments: 8, rate: 12.53 }, { installments: 9, rate: 13.77 },
        { installments: 10, rate: 15.00 }, { installments: 11, rate: 16.20 }, { installments: 12, rate: 17.39 },
      ];
      const settingsToUse = {
        ...paymentSettings,
        installment_rates: paymentSettings.installment_rates && paymentSettings.installment_rates.length > 0 ? paymentSettings.installment_rates : defaultRates,
      };
      setLocalSettings(settingsToUse);
      setInitialSettings(JSON.parse(JSON.stringify(settingsToUse)));
    }
  }, [paymentSettings]);

  const hasChanged = localSettings && initialSettings ? JSON.stringify(localSettings) !== JSON.stringify(initialSettings) : false;

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const savedData = await savePaymentSettings(localSettings);
      setInitialSettings(JSON.parse(JSON.stringify(savedData)));
      toast({
        title: "Configurações Salvas!",
        description: "Suas configurações de pagamento foram atualizadas.",
      });
    } catch (error) {
      toast({
        title: "Erro ao Salvar",
        description: `Não foi possível atualizar as configurações: ${error.message}`,
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };
  
  const handleRateChange = (index, value) => {
    const newRates = [...localSettings.installment_rates];
    newRates[index].rate = parseFloat(value) || 0;
    setLocalSettings(prev => ({...prev, installment_rates: newRates}));
  };

  const resetToStripeDefaults = () => {
    const defaultStripeRates = [
      { installments: 1, rate: 0.00 }, { installments: 2, rate: 4.59 }, { installments: 3, rate: 5.97 },
      { installments: 4, rate: 7.33 }, { installments: 5, rate: 8.66 }, { installments: 6, rate: 9.97 },
      { installments: 7, rate: 11.26 }, { installments: 8, rate: 12.53 }, { installments: 9, rate: 13.77 },
      { installments: 10, rate: 15.00 }, { installments: 11, rate: 16.20 }, { installments: 12, rate: 17.39 },
    ];
    setLocalSettings(prev => ({...prev, installment_rates: defaultStripeRates }));
    toast({
        title: "Taxas Restauradas!",
        description: "As taxas padrão do Stripe foram aplicadas.",
      });
  }

  if (loading || !localSettings) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="h-8 w-8 animate-spin text-blue-400" />
        <p className="ml-4 text-white text-xl">Carregando opções de pagamento...</p>
      </div>
    );
  }

  const StripeCard = () => (
    <Card className="glass-effect border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <CreditCard className="h-5 w-5" />
          Integração Stripe
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
         <div className="flex items-center justify-between p-4 bg-black/20 rounded-lg">
          <Label htmlFor="enable_stripe" className="text-white font-medium">Habilitar Cartão de Crédito</Label>
          <Switch
            id="enable_stripe"
            checked={localSettings.enable_stripe}
            onCheckedChange={(checked) => setLocalSettings(prev => ({...prev, enable_stripe: checked}))}
          />
        </div>
        <div>
          <Label htmlFor="publishable_key">Chave Publicável (Stripe)</Label>
          <Input
            id="publishable_key"
            value={localSettings.publishable_key || ''}
            onChange={(e) => setLocalSettings(prev => ({...prev, publishable_key: e.target.value}))}
            className="bg-white/10 border-white/20 text-white mt-1"
            placeholder="pk_test_..."
            disabled={!localSettings.enable_stripe}
          />
        </div>
         <div className="p-3 bg-blue-900/50 rounded-lg border border-blue-500/50">
            <p className="text-blue-200 text-sm">
              Encontre sua chave no <a href="https://dashboard.stripe.com/apikeys" target="_blank" rel="noopener noreferrer" className="underline font-bold">Dashboard do Stripe</a>.
            </p>
        </div>
      </CardContent>
    </Card>
  );

  const PixCard = () => (
    <Card className="glass-effect border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <QrCode className="h-5 w-5" />
          Integração PIX
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
         <div className="flex items-center justify-between p-4 bg-black/20 rounded-lg">
          <Label htmlFor="enable_pix" className="text-white font-medium">Habilitar PIX</Label>
          <Switch
            id="enable_pix"
            checked={localSettings.enable_pix}
            onCheckedChange={(checked) => setLocalSettings(prev => ({...prev, enable_pix: checked}))}
          />
        </div>
        <div>
          <Label htmlFor="pix_key">Chave PIX</Label>
          <Input
            id="pix_key"
            value={localSettings.pix_key || ''}
            onChange={(e) => setLocalSettings(prev => ({...prev, pix_key: e.target.value}))}
            className="bg-white/10 border-white/20 text-white mt-1"
            placeholder="CNPJ, e-mail, telefone..."
            disabled={!localSettings.enable_pix}
          />
        </div>
      </CardContent>
    </Card>
  );

  const RatesCard = () => (
    <Card className="glass-effect border-white/20 h-full">
      <CardHeader>
          <div className="flex justify-between items-center flex-wrap gap-2">
              <div>
                  <CardTitle className="text-white flex items-center gap-2">
                      <Percent className="h-5 w-5" />
                      Taxas de Parcelamento (Cartão)
                  </CardTitle>
                  <CardDescription className="text-gray-300 mt-1">Estas taxas serão adicionadas ao valor final para o cliente.</CardDescription>
              </div>
              <Button variant="outline" size="sm" onClick={resetToStripeDefaults} className="text-gray-300 border-gray-500 hover:bg-white/10" disabled={!localSettings.enable_stripe}>
                  <RefreshCw className="h-4 w-4 mr-2" /> Restaurar Padrão
              </Button>
          </div>
      </CardHeader>
      <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {localSettings.installment_rates.map((item, index) => (
          <div key={index} className="flex items-center gap-3">
             <Label className="w-20 text-white font-semibold">{item.installments}x</Label>
             <div className="relative flex-grow">
               <Input
                 type="number"
                 value={item.rate}
                 onChange={(e) => handleRateChange(index, e.target.value)}
                 className="bg-white/10 border-white/20 text-white pr-8"
                 step="0.01"
                 disabled={!localSettings.enable_stripe}
               />
               <Percent className="absolute right-2.5 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
             </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold gradient-text mb-2">Configurações de Pagamento</h1>
        <p className="text-gray-400">Gerencie as integrações com Stripe, PIX e as taxas de parcelamento.</p>
      </motion.div>

      {/* Desktop View */}
      <div className="hidden lg:grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="lg:col-span-1 space-y-6"
        >
          <StripeCard />
          <PixCard />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:col-span-2"
        >
          <RatesCard />
        </motion.div>
      </div>

      {/* Mobile View */}
      <div className="block lg:hidden">
        <Tabs defaultValue="stripe" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-black/20">
            <TabsTrigger value="stripe">Stripe</TabsTrigger>
            <TabsTrigger value="pix">PIX</TabsTrigger>
            <TabsTrigger value="rates">Taxas</TabsTrigger>
          </TabsList>
          <TabsContent value="stripe" className="mt-4">
            <StripeCard />
          </TabsContent>
          <TabsContent value="pix" className="mt-4">
            <PixCard />
          </TabsContent>
          <TabsContent value="rates" className="mt-4">
            <RatesCard />
          </TabsContent>
        </Tabs>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="flex justify-end mt-6"
      >
        <Button onClick={handleSave} className="btn-gradient" disabled={isSaving || !hasChanged}>
          {isSaving ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Salvando...
            </>
          ) : (
            <>
              <Save className="h-4 w-4 mr-2" />
              Salvar Todas as Configurações
            </>
          )}
        </Button>
      </motion.div>
    </div>
  );
};

export default PaymentSettings;