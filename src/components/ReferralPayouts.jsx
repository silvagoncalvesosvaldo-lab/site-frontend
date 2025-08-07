import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Gift, Calendar, CheckCircle, Clock, Loader2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { useData } from '@/contexts/DataContext';

const ReferralPayouts = () => {
  const { referralPayouts, setReferralPayouts, loading } = useData();
  const { toast } = useToast();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="h-8 w-8 animate-spin text-blue-400" />
        <p className="ml-4 text-white text-xl">Carregando pagamentos de bônus...</p>
      </div>
    );
  }

  const handleMarkAsPaid = (payoutId) => {
    setReferralPayouts(payouts => payouts.map(p => p.id === payoutId ? { ...p, status: 'paid' } : p));
    toast({
      title: 'Pagamento Marcado como Efetuado!',
      description: 'O usuário será notificado sobre o pagamento do bônus.',
    });
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'paid':
        return <Badge className="bg-green-500/20 text-green-400 border-green-500/30"><CheckCircle className="h-3 w-3 mr-1" />Pago</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30"><Clock className="h-3 w-3 mr-1" />Pendente</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const payouts = referralPayouts || [];
  const pendingPayouts = payouts.filter(p => p.status === 'pending');
  const paidPayouts = payouts.filter(p => p.status === 'paid');

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold gradient-text flex items-center gap-3">
          <Gift className="h-8 w-8 text-green-400" />
          Pagamentos de Bônus de Indicação
        </h1>
        <p className="text-gray-400">Gerencie os pagamentos de bônus para clientes, motoristas e afiliados.</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Card className="glass-effect border-purple-500/30 bg-gradient-to-r from-purple-500/20 via-black/10 to-purple-500/20">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-3"><Calendar className="h-5 w-5 text-purple-300" /> Lembrete Importante de Pagamento</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-purple-200 text-lg">
              Lembre-se: os pagamentos de bônus devem ser processados no <strong className="font-bold text-white">final de cada mês</strong>.
            </p>
            <p className="text-purple-300/80 mt-1">Isso é essencial para manter a confiança e o engajamento dos seus parceiros e afiliados.</p>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card className="glass-effect border-white/20">
          <CardHeader>
            <CardTitle className="text-white">Pagamentos Pendentes</CardTitle>
            <CardDescription className="text-gray-400">
              {pendingPayouts.length > 0 
                ? 'A lista abaixo mostra todos os bônus que precisam ser pagos.' 
                : 'Nenhum bônus de indicação pendente de pagamento no momento.'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {pendingPayouts.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow className="border-white/20 hover:bg-white/10">
                    <TableHead className="text-white">Afiliado ID</TableHead>
                    <TableHead className="text-white text-right">Valor</TableHead>
                    <TableHead className="text-white text-center">Ação</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pendingPayouts.map((payout) => (
                    <TableRow key={payout.id} className="border-white/10 hover:bg-white/5">
                      <TableCell className="font-medium text-white">{payout.affiliate_id}</TableCell>
                      <TableCell className="text-right font-semibold text-green-400">R$ {payout.amount.toFixed(2)}</TableCell>
                      <TableCell className="text-center">
                        <Button
                          size="sm"
                          className="btn-gradient-green"
                          onClick={() => handleMarkAsPaid(payout.id)}
                        >
                          Marcar como Pago
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
                <div className="text-center py-10">
                    <CheckCircle className="h-12 w-12 mx-auto text-green-500 mb-4" />
                    <p className="text-lg font-semibold text-white">Tudo em dia!</p>
                    <p className="text-gray-400">Não há pagamentos de bônus pendentes.</p>
                </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Card className="glass-effect border-white/20">
          <CardHeader>
            <CardTitle className="text-white">Histórico de Pagamentos</CardTitle>
            <CardDescription className="text-gray-400">Bônus que já foram processados e pagos.</CardDescription>
          </CardHeader>
          <CardContent>
            {paidPayouts.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow className="border-white/20 hover:bg-white/10">
                    <TableHead className="text-white">Afiliado ID</TableHead>
                    <TableHead className="text-white text-right">Valor</TableHead>
                    <TableHead className="text-white text-center">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paidPayouts.map((payout) => (
                    <TableRow key={payout.id} className="border-white/10 hover:bg-white/5">
                      <TableCell className="font-medium text-white">{payout.affiliate_id}</TableCell>
                      <TableCell className="text-right font-semibold text-green-400">R$ {payout.amount.toFixed(2)}</TableCell>
                      <TableCell className="text-center">{getStatusBadge(payout.status)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
                <div className="text-center py-10">
                    <p className="text-gray-400">Nenhum pagamento de bônus foi efetuado ainda.</p>
                </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default ReferralPayouts;