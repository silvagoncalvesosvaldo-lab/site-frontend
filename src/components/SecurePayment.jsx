import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ShieldCheck, User, Truck, DollarSign, CheckCircle, Coins as HandCoins, Bell } from 'lucide-react';

const SecurePayment = () => {
  const steps = [
    {
      icon: <DollarSign className="h-8 w-8 text-white" />,
      title: '1. Pagamento do Cliente',
      description: 'O cliente paga 100% do valor do frete na plataforma. O pagamento fica seguro em garantia.',
      bgColor: 'bg-blue-500',
    },
    {
      icon: <HandCoins className="h-8 w-8 text-white" />,
      title: '2. Adiantamento para o Motorista',
      description: 'Assim que o pagamento é confirmado, a plataforma libera um adiantamento (ex: 70%) para o motorista cobrir os custos iniciais.',
      bgColor: 'bg-teal-500',
    },
    {
      icon: <Truck className="h-8 w-8 text-white" />,
      title: '3. Realização do Transporte',
      description: 'Com o adiantamento recebido, o motorista realiza o transporte com segurança e tranquilidade.',
      bgColor: 'bg-indigo-500',
    },
    {
      icon: <CheckCircle className="h-8 w-8 text-white" />,
      title: '4. Liberação do Restante',
      description: 'Após a entrega, o valor restante é liberado para o motorista, e a comissão da plataforma é processada.',
      bgColor: 'bg-purple-500',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <div>
        <h1 className="text-3xl font-bold gradient-text mb-2 flex items-center gap-3">
          <ShieldCheck className="h-8 w-8" />
          Pagamento Seguro com Adiantamento
        </h1>
        <p className="text-gray-400">O fluxo de pagamento que protege clientes e viabiliza o trabalho dos transportadores.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="glass-effect border-white/20 h-full text-center">
              <CardHeader className="items-center">
                <div className={`p-4 rounded-full ${step.bgColor}`}>
                  {step.icon}
                </div>
                <CardTitle className="text-white pt-4">{step.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">{step.description}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="glass-effect border-white/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <User className="h-6 w-6 text-blue-400" />
              Vantagens para o Cliente
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-gray-300">
            <p className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-green-400"/> Segurança total, seu dinheiro fica protegido.</p>
            <p className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-green-400"/> Pagamento final só é liberado após o serviço concluído.</p>
            <p className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-green-400"/> Transportadores motivados e com recursos para o serviço.</p>
            <p className="flex items-center gap-2"><Bell className="h-4 w-4 text-yellow-400"/> Notificações por e-mail e WhatsApp em cada etapa do pagamento.</p>
          </CardContent>
        </Card>
        <Card className="glass-effect border-white/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <Truck className="h-6 w-6 text-purple-400" />
              Vantagens para o Transportador
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-gray-300">
            <p className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-green-400"/> Receba um adiantamento para cobrir custos de viagem.</p>
            <p className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-green-400"/> Risco zero de calote, pagamento 100% garantido.</p>
            <p className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-green-400"/> Contatos do cliente liberados após fechar negócio.</p>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
};

export default SecurePayment;