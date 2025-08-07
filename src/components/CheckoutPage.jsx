import React, { useState, useEffect, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import QRCode from 'qrcode.react';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, CreditCard, Lock, Loader2, QrCode, Copy, Rocket } from 'lucide-react';
import { useLocalStorage } from '@/hooks/useLocalStorage';

const stripePromise = loadStripe('pk_test_YOUR_PUBLISHABLE_KEY');

const PixPayment = ({ order, paymentSettings }) => {
  const { toast } = useToast();

  const handleCopy = () => {
    navigator.clipboard.writeText(paymentSettings.pixKey);
    toast({
      title: "Chave PIX Copiada!",
      description: "Você pode colar no seu aplicativo de banco.",
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-6 flex flex-col items-center text-center"
    >
      <h3 className="text-lg font-semibold text-white">Pague com PIX para confirmar</h3>
      <div className="p-4 bg-white rounded-lg">
        <QRCode value={paymentSettings.pixKey || 'Chave PIX não configurada'} size={180} />
      </div>
      <p className="text-gray-300 text-sm">Abra o app do seu banco e escaneie o QR Code</p>
      <div className="w-full">
        <Label>Ou use a chave PIX</Label>
        <div className="flex items-center gap-2 mt-1">
          <Input 
            value={paymentSettings.pixKey} 
            readOnly 
            className="bg-white/10 border-white/20 text-white truncate"
          />
          <Button variant="outline" size="icon" onClick={handleCopy}>
            <Copy className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <Button className="w-full btn-gradient text-lg font-bold py-6 mt-4" onClick={() => toast({ title: "Aguardando pagamento...", description: "O status será atualizado automaticamente." })}>
        Já fiz o pagamento
      </Button>
    </motion.div>
  );
};


const CardPayment = ({ order, paymentSettings, onBack }) => {
    const stripe = useStripe();
    const elements = useElements();
    const { toast } = useToast();
    const [installments, setInstallments] = useState('1');
    const [total, setTotal] = useState(order.price);
    const [isLoading, setIsLoading] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
  
    const installmentOptions = useMemo(() => {
      return paymentSettings?.installmentRates || [];
    }, [paymentSettings]);
  
    useEffect(() => {
      const numInstallments = parseInt(installments, 10);
      const selectedOption = installmentOptions.find(opt => opt.installments === numInstallments);
      const interestRate = selectedOption ? selectedOption.rate : 0;
      const newTotal = order.price * (1 + interestRate / 100);
      setTotal(newTotal);
    }, [installments, order.price, installmentOptions]);
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      setIsLoading(true);
  
      if (!stripe || !elements) {
        toast({ title: 'Erro', description: 'Stripe não foi inicializado.', variant: 'destructive' });
        setIsLoading(false);
        return;
      }
  
      toast({
        title: '🚧 Funcionalidade em Demonstração',
        description: 'A integração com pagamentos reais será ativada com suas chaves do Stripe. Nenhum valor será cobrado.',
      });
      
      setTimeout(() => {
          toast({
              title: "Pagamento Simulado com Sucesso!",
              description: "Obrigado por testar o nosso checkout."
          });
          setIsLoading(false);
          onBack();
      }, 2000);
    };

  const cardElementOptions = {
    style: {
      base: {
        color: '#ffffff',
        fontFamily: '"Inter", sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        '::placeholder': {
          color: '#a0aec0',
        },
      },
      invalid: {
        color: '#fc8181',
        iconColor: '#fc8181',
      },
    },
  };

  return (
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
    >
    <form onSubmit={handleSubmit} className="space-y-6">
       <div>
        <Label htmlFor="name">Nome no Cartão</Label>
        <Input id="name" type="text" placeholder="Nome completo" value={name} onChange={(e) => setName(e.target.value)} className="bg-white/10 border-white/20 text-white" required />
      </div>
      <div>
        <Label htmlFor="email">E-mail para Recibo</Label>
        <Input id="email" type="email" placeholder="seu@email.com" value={email} onChange={(e) => setEmail(e.target.value)} className="bg-white/10 border-white/20 text-white" required />
      </div>
      <div>
        <Label htmlFor="card-element">Dados do Cartão de Crédito</Label>
        <div id="card-element" className="p-4 bg-white/10 rounded-md border border-white/20">
            <CardElement options={cardElementOptions} />
        </div>
      </div>
      
      <div>
        <Label>Parcelamento</Label>
        <Select value={installments} onValueChange={setInstallments}>
          <SelectTrigger className="bg-white/10 border-white/20 text-white">
            <SelectValue placeholder="Selecione o número de parcelas" />
          </SelectTrigger>
          <SelectContent className="glass-effect-dark">
            {installmentOptions.map(({ installments: num, rate }) => {
              const totalValue = order.price * (1 + rate / 100);
              const installmentValue = totalValue / num;
              return (
                <SelectItem key={num} value={String(num)}>
                   {num}x de R$ {installmentValue.toFixed(2)} {rate > 0 ? `(juros de ${rate}%)` : '(sem juros)'}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      </div>

      <div className="text-center pt-4 border-t border-white/10">
        <p className="text-sm text-gray-400">Total a Pagar</p>
        <p className="text-3xl font-bold">R$ {total.toFixed(2)}</p>
      </div>

      <Button type="submit" disabled={!stripe || isLoading} className="w-full btn-gradient text-lg font-bold py-6">
        {isLoading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <CreditCard className="mr-2 h-5 w-5" />}
        Pagar Agora
      </Button>
    </form>
    </motion.div>
  );
};


const CheckoutForm = ({ order, onBack, paymentSettings }) => {
  const [paymentMethod, setPaymentMethod] = useState('card');
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white flex flex-col items-center justify-center p-4">
      <Helmet>
        <title>Pagamento Seguro - {order.cargo}</title>
      </Helmet>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-lg"
      >
        <Button onClick={onBack} variant="ghost" className="mb-4 text-gray-300 hover:text-white">
          <ArrowLeft className="mr-2 h-4 w-4" /> Voltar para os Pedidos
        </Button>
        <Card className="glass-effect border-white/20">
          <CardHeader>
            <CardTitle className="gradient-text text-2xl flex items-center gap-3">
              <Lock className="h-6 w-6" />
              Pagamento Seguro
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-6 pb-6 border-b border-white/10">
              <h3 className="font-bold text-lg">{order.cargo}</h3>
              <p className="text-sm text-gray-400">Origem: {order.origin}</p>
              <p className="text-sm text-gray-400">Destino: {order.destination}</p>
              {order.isPriority && (
                <div className="mt-2 flex items-center gap-2 text-red-400">
                    <Rocket size={16} />
                    <span className="font-semibold">Frete Prioritário</span>
                </div>
              )}
              <p className="font-bold text-xl mt-2">Valor: R$ {order.price.toFixed(2)}</p>
            </div>
            
            <div className="flex w-full mb-6 bg-black/20 p-1 rounded-lg">
                {paymentSettings.enableStripe && (
                    <button onClick={() => setPaymentMethod('card')} className={`flex-1 p-2 rounded-md text-sm font-medium transition-colors flex items-center justify-center gap-2 ${paymentMethod === 'card' ? 'bg-blue-600 text-white shadow' : 'text-gray-300 hover:bg-white/10'}`}>
                        <CreditCard size={16} /> Cartão de Crédito
                    </button>
                )}
                {paymentSettings.enablePix && (
                    <button onClick={() => setPaymentMethod('pix')} className={`flex-1 p-2 rounded-md text-sm font-medium transition-colors flex items-center justify-center gap-2 ${paymentMethod === 'pix' ? 'bg-green-600 text-white shadow' : 'text-gray-300 hover:bg-white/10'}`}>
                        <QrCode size={16} /> PIX
                    </button>
                )}
            </div>

            <AnimatePresence mode="wait">
                {paymentMethod === 'card' && paymentSettings.enableStripe ? (
                    <CardPayment key="card" order={order} paymentSettings={paymentSettings} onBack={onBack} />
                ) : paymentMethod === 'pix' && paymentSettings.enablePix ? (
                    <PixPayment key="pix" order={order} paymentSettings={paymentSettings} />
                ) : (
                    <div className="text-center text-gray-400 py-8">Selecione um método de pagamento.</div>
                )}
            </AnimatePresence>
            
            <p className="text-xs text-center text-gray-500 mt-6">Pagamentos processados com segurança.</p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

const CheckoutPage = ({ order, onBack }) => {
  const [paymentSettings] = useLocalStorage('transport-payment-settings', {
    enableStripe: false,
    publishableKey: '',
    enablePix: false,
    pixKey: '',
    installmentRates: [
      { installments: 1, rate: 0.00 },
      { installments: 2, rate: 4.59 },
      { installments: 3, rate: 5.97 },
      { installments: 4, rate: 7.33 },
      { installments: 5, rate: 8.66 },
      { installments: 6, rate: 9.97 },
      { installments: 7, rate: 11.26 },
      { installments: 8, rate: 12.53 },
      { installments: 9, rate: 13.77 },
      { installments: 10, rate: 15.00 },
      { installments: 11, rate: 16.20 },
      { installments: 12, rate: 17.39 },
    ]
  });
  
  const effectiveStripePromise = paymentSettings.enableStripe && paymentSettings.publishableKey ? loadStripe(paymentSettings.publishableKey) : stripePromise;

  if (!order) {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 to-indigo-900 flex items-center justify-center">
            <h1 className="text-white text-2xl">Carregando informações do pedido...</h1>
        </div>
    );
  }

  return (
    <Elements stripe={effectiveStripePromise}>
      <CheckoutForm order={order} onBack={onBack} paymentSettings={paymentSettings} />
    </Elements>
  );
};

export default CheckoutPage;