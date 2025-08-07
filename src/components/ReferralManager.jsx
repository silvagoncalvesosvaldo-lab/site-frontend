import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Gift, Copy, Check, Users, DollarSign, Info, ShieldCheck } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Helmet } from 'react-helmet';

const ReferralManager = ({ user, userType, earningsConfig }) => {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  const referralLink = `${window.location.origin}/indicacao?ref=${user.id}`;
  const referralBonus = earningsConfig?.referralBonus || 20;

  // Mock data for demonstration
  const referrals = userType === 'client' ? [
    { id: 1, name: 'Ana Silva', status: 'Concluído', reward: referralBonus },
    { id: 2, name: 'Bruno Costa', status: 'Cadastrado', reward: 0 },
    { id: 3, name: 'Carla Dias', status: 'Concluído', reward: referralBonus },
  ] : userType === 'driver' ? [
    { id: 4, name: 'Roberto Mendes (Motorista)', status: 'Verificado', reward: referralBonus },
  ] : [ // affiliate
    { id: 5, name: 'Joana Lima (Cliente)', status: 'Concluído', reward: referralBonus },
    { id: 6, name: 'Marcos Andrade (Motorista)', status: 'Verificado', reward: referralBonus },
    { id: 7, name: 'Loja de Roupas XYZ', status: 'Cadastrado', reward: 0 },
  ];
  const totalRewards = referrals.reduce((sum, ref) => sum + ref.reward, 0);

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    toast({
      title: "Link Copiado!",
      description: "Agora é só compartilhar e começar a ganhar!",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const getHowItWorks = () => {
    switch (userType) {
      case 'client':
        return (
          <>
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 h-8 w-8 rounded-full bg-green-500/20 text-green-300 flex items-center justify-center font-bold">2</div>
              <p>Seu amigo se cadastra usando seu link e ganha um <strong className="text-white">desconto especial</strong> na taxa de serviço do primeiro frete dele.</p>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 h-8 w-8 rounded-full bg-green-500/20 text-green-300 flex items-center justify-center font-bold">3</div>
              <p>Para cada indicação que você fizer e somente quando a pessoa indicada concluir o pagamento de uma negociação, você Ganha <strong className="text-white">R${referralBonus.toFixed(2)}</strong>.</p>
            </div>
          </>
        );
      case 'driver':
      case 'affiliate':
        return (
          <>
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 h-8 w-8 rounded-full bg-green-500/20 text-green-300 flex items-center justify-center font-bold">2</div>
              <p>Você pode indicar tanto <strong className="text-white">novos clientes</strong> quanto <strong className="text-white">outros motoristas</strong> parceiros.</p>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 h-8 w-8 rounded-full bg-green-500/20 text-green-300 flex items-center justify-center font-bold">3</div>
              <p>Para cada indicação que você fizer e somente quando a pessoa indicada concluir o pagamento de uma negociação, você Ganha <strong className="text-white">R${referralBonus.toFixed(2)}</strong>.</p>
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <Helmet>
        <title>Indique e Ganhe - Os Melhores do Transporte</title>
        <meta name="description" content="Compartilhe seu link de indicação, ajude seus amigos e ganhe bônus em dinheiro!" />
      </Helmet>
      <div className="space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold gradient-text-green mb-2">Programa Indique e Ganhe</h1>
          <p className="text-gray-400">Compartilhe e ganhe bônus em dinheiro todo mês!</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-2"
          >
            <Card className="glass-effect border-white/20 h-full">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2"><Gift className="h-6 w-6 text-green-400" /> Como Funciona?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-gray-300">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 h-8 w-8 rounded-full bg-green-500/20 text-green-300 flex items-center justify-center font-bold">1</div>
                  <p>Compartilhe seu link de indicação exclusivo com amigos, familiares e contatos.</p>
                </div>
                {getHowItWorks()}
                 <div className="p-3 bg-blue-500/10 rounded-lg text-blue-200 flex items-start gap-3 text-sm">
                  <Info size={24} className="h-5 w-5 flex-shrink-0 mt-0.5" />
                  <span>Para receber seus bônus, seus dados bancários devem estar preenchidos na seção "Meu Perfil".</span>
                </div>
                <div className="p-4 bg-yellow-500/10 rounded-lg text-yellow-200 flex items-start gap-3 text-sm border-l-4 border-yellow-400">
                    <ShieldCheck size={28} className="h-6 w-6 flex-shrink-0 mt-0.5 text-yellow-300" />
                    <div>
                        <h4 className="font-bold text-white">Lembrete Importante sobre o Pagamento</h4>
                        <p className="mt-1">
                            Os pagamentos dos bônus são sempre processados no <strong className="text-white">final de cada mês</strong>. Para cada indicação que você fizer e somente quando a pessoa indicada concluir o pagamento de uma negociação, você Ganha R$20,00.
                        </p>
                    </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="glass-effect border-white/20 h-full flex flex-col justify-center">
              <CardHeader>
                <CardTitle className="text-white">Seu Link de Indicação</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Input readOnly value={referralLink} className="bg-white/10 border-white/20 text-white" />
                  <Button onClick={handleCopy} size="icon" className="btn-gradient-green flex-shrink-0">
                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
                <Button className="w-full btn-gradient" onClick={handleCopy}>Compartilhar Agora</Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card className="glass-effect border-white/20">
            <CardHeader>
              <CardTitle className="text-white">Suas Indicações</CardTitle>
              <CardDescription className="text-gray-400">Acompanhe o status dos seus amigos indicados e seus ganhos.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 text-center">
                  <div className="p-4 bg-white/5 rounded-lg">
                      <h3 className="text-sm font-semibold text-gray-400 flex items-center justify-center gap-2"><Users className="h-4 w-4" /> Indicados Ativos</h3>
                      <p className="text-2xl font-bold text-white">{referrals.length}</p>
                  </div>
                  <div className="p-4 bg-white/5 rounded-lg">
                      <h3 className="text-sm font-semibold text-gray-400 flex items-center justify-center gap-2"><DollarSign className="h-4 w-4" /> Bônus Acumulados</h3>
                      <p className="text-2xl font-bold text-green-400">R$ {totalRewards.toFixed(2)}</p>
                  </div>
              </div>

              <div className="space-y-3">
                {referrals.map(ref => (
                  <div key={ref.id} className="p-3 bg-white/5 rounded-lg flex justify-between items-center">
                    <span className="text-white font-medium">{ref.name}</span>
                    <span className={`text-sm px-2 py-1 rounded-full ${ref.status === 'Concluído' || ref.status === 'Verificado' ? 'bg-green-500/20 text-green-300' : 'bg-yellow-500/20 text-yellow-300'}`}>
                      {ref.status}
                    </span>
                  </div>
                ))}
                {referrals.length === 0 && (
                  <p className="text-center text-gray-400 py-6">Você ainda não fez nenhuma indicação.</p>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </>
  );
};

export default ReferralManager;