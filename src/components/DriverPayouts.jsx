import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { DollarSign, Truck, Coins, CheckCircle, Hourglass, BarChart3, Users, Percent } from 'lucide-react';

const DriverPayouts = ({ orders, drivers, earningsConfig, isAdminView = true, driver: singleDriver }) => {
  const getInitialDriverId = () => {
    if (isAdminView) {
      return drivers && drivers.length > 0 ? drivers[0].id : '';
    }
    return singleDriver ? singleDriver.id : '';
  };
  
  const [selectedDriverId, setSelectedDriverId] = useState(getInitialDriverId());
  
  React.useEffect(() => {
    if (!isAdminView && singleDriver) {
      setSelectedDriverId(singleDriver.id);
    }
  }, [singleDriver, isAdminView]);

  const driverData = useMemo(() => {
    const driverId = isAdminView ? selectedDriverId : (singleDriver ? singleDriver.id : null);

    if (!driverId || !orders || !earningsConfig?.rates) return { payouts: [], stats: { total: 0, advance: 0, pending: 0, completedJobs: 0 } };

    const driverOrders = orders.filter(o => o.driverId === driverId);
    
    const payouts = driverOrders.map(order => {
      const totalValue = order.price || 0;
      const commissionRate = (earningsConfig.rates[order.type || 'interstate'] || earningsConfig.rates.interstate) / 100;
      const commission = totalValue * commissionRate;
      const driverReceives = totalValue - commission;
      const advancePercentage = (earningsConfig?.advancePercentage || 70) / 100;
      const advanceAmount = driverReceives * advancePercentage;
      const finalPayment = driverReceives - advanceAmount;

      let status = 'pending-advance';
      if(order.paymentStatus === 'advance-paid') status = 'pending-final';
      if(order.paymentStatus === 'final-paid') status = 'paid';

      return {
        orderId: `ORD-${order.id.slice(-4)}`,
        date: order.scheduledDate,
        totalValue,
        driverReceives,
        advanceAmount,
        finalPayment,
        status,
      };
    });

    const total = payouts.reduce((sum, p) => sum + p.driverReceives, 0);
    const advance = payouts.filter(p => p.status === 'paid' || p.status === 'pending-final').reduce((sum, p) => sum + p.advanceAmount, 0);
    const completedJobs = payouts.filter(p => p.status === 'paid').length;
    
    const paidAmount = payouts.reduce((sum, p) => {
        if(p.status === 'paid') return sum + p.driverReceives;
        if(p.status === 'pending-final') return sum + p.advanceAmount;
        return sum;
    }, 0);
    const pending = total - paidAmount;


    return {
      payouts,
      stats: {
        total,
        advance,
        pending,
        completedJobs,
      }
    };
  }, [selectedDriverId, orders, singleDriver, earningsConfig, isAdminView]);

  const getStatusBadge = (status) => {
    const statusMap = {
      paid: { label: 'Pago', icon: <CheckCircle className="h-4 w-4 text-green-400" />, text: 'text-green-400', bg: 'bg-green-500/10' },
      'pending-final': { label: 'Pendente Final', icon: <Hourglass className="h-4 w-4 text-yellow-400" />, text: 'text-yellow-400', bg: 'bg-yellow-500/10' },
      'pending-advance': { label: 'Aguardando Adiant.', icon: <Hourglass className="h-4 w-4 text-orange-400" />, text: 'text-orange-400', bg: 'bg-orange-500/10' },
    };
    const { label, icon, text, bg } = statusMap[status] || statusMap['pending-advance'];
    return (
      <Badge variant="outline" className={`flex items-center gap-2 ${text} ${bg} border-current`}>
        {icon}
        {label}
      </Badge>
    );
  };

  const PayoutsHeader = () => (
     <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
            <h1 className="text-3xl font-bold gradient-text mb-2 flex items-center gap-3">
                <Coins className="h-8 w-8" />
                {isAdminView ? 'Pagamentos do Motorista' : 'Meus Ganhos'}
            </h1>
            <p className="text-gray-400">
                {isAdminView ? 'Acompanhe os ganhos e pagamentos de cada motorista.' : 'Acompanhe seus ganhos e pagamentos.'}
            </p>
        </div>
        {isAdminView && drivers && drivers.length > 0 && (
            <Select value={selectedDriverId} onValueChange={setSelectedDriverId}>
            <SelectTrigger className="w-full sm:w-[280px] bg-white/10 border-white/20 text-white">
                <SelectValue placeholder="Selecione um motorista" />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-white/20 text-white">
                {drivers.map(driver => (
                <SelectItem key={driver.id} value={driver.id}>{driver.name}</SelectItem>
                ))}
            </SelectContent>
            </Select>
        )}
    </div>
  );

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <PayoutsHeader />
      </motion.div>

      {(isAdminView && selectedDriverId && drivers.length > 0) || (!isAdminView && singleDriver) ? (
        <>
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
            <Card className="glass-effect border-white/20"><CardHeader className="flex flex-row items-center justify-between pb-2"><CardTitle className="text-sm font-medium text-gray-300">Ganhos Totais (Líquido)</CardTitle><DollarSign className="h-4 w-4 text-green-400"/></CardHeader><CardContent><div className="text-2xl font-bold text-white">R$ {driverData.stats.total.toFixed(2)}</div></CardContent></Card>
            <Card className="glass-effect border-white/20"><CardHeader className="flex flex-row items-center justify-between pb-2"><CardTitle className="text-sm font-medium text-gray-300">Total Adiantado</CardTitle><Coins className="h-4 w-4 text-blue-400"/></CardHeader><CardContent><div className="text-2xl font-bold text-white">R$ {driverData.stats.advance.toFixed(2)}</div></CardContent></Card>
            <Card className="glass-effect border-white/20"><CardHeader className="flex flex-row items-center justify-between pb-2"><CardTitle className="text-sm font-medium text-gray-300">Pendente de Pagamento</CardTitle><Hourglass className="h-4 w-4 text-yellow-400"/></CardHeader><CardContent><div className="text-2xl font-bold text-white">R$ {driverData.stats.pending.toFixed(2)}</div></CardContent></Card>
            <Card className="glass-effect border-white/20"><CardHeader className="flex flex-row items-center justify-between pb-2"><CardTitle className="text-sm font-medium text-gray-300">Fretes Concluídos</CardTitle><Truck className="h-4 w-4 text-purple-400"/></CardHeader><CardContent><div className="text-2xl font-bold text-white">{driverData.stats.completedJobs}</div></CardContent></Card>
        </motion.div>

        {!isAdminView && earningsConfig?.rates && (
             <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.15 }}
            >
                <Card className="glass-effect border-teal-500/30">
                    <CardHeader>
                        <CardTitle className="text-lg text-teal-300 flex items-center gap-2">
                           <Percent className="h-5 w-5"/>
                           Comissões da Plataforma
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                        <div className="p-3 bg-black/20 rounded-lg">
                           <p className="text-sm text-gray-400">Mesma Cidade</p>
                           <p className="text-xl font-bold text-white">{earningsConfig.rates.local}%</p>
                        </div>
                        <div className="p-3 bg-black/20 rounded-lg">
                           <p className="text-sm text-gray-400">Mesmo Estado</p>
                           <p className="text-xl font-bold text-white">{earningsConfig.rates.state}%</p>
                        </div>
                         <div className="p-3 bg-black/20 rounded-lg">
                           <p className="text-sm text-gray-400">Outro Estado</p>
                           <p className="text-xl font-bold text-white">{earningsConfig.rates.interstate}%</p>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>
        )}

        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
        >
            <Card className="glass-effect border-white/20">
                <CardHeader><CardTitle className="text-white">Histórico de Pagamentos</CardTitle><CardDescription className="text-gray-400">Detalhes de cada serviço realizado.</CardDescription></CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Pedido</TableHead>
                                <TableHead>Data</TableHead>
                                <TableHead className="text-right">Adiantamento</TableHead>
                                <TableHead className="text-right">Pagamento Final</TableHead>
                                <TableHead className="text-right">Total Recebido</TableHead>
                                <TableHead className="text-center">Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {driverData.payouts.map((payout, index) => (
                                <TableRow key={`${payout.orderId}-${index}`}>
                                    <TableCell className="font-medium">{payout.orderId}</TableCell>
                                    <TableCell>{new Date(payout.date).toLocaleDateString('pt-BR')}</TableCell>
                                    <TableCell className="text-right">R$ {payout.advanceAmount.toFixed(2)}</TableCell>
                                    <TableCell className="text-right">R$ {payout.finalPayment.toFixed(2)}</TableCell>
                                    <TableCell className="text-right font-bold text-green-400">R$ {payout.driverReceives.toFixed(2)}</TableCell>
                                    <TableCell className="text-center">{getStatusBadge(payout.status)}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    {driverData.payouts.length === 0 && (
                        <div className="text-center py-12 text-gray-400">
                            <BarChart3 className="h-12 w-12 mx-auto mb-4" />
                            <p className="font-semibold">Nenhum pagamento encontrado.</p>
                            <p className="text-sm">Os pagamentos aparecerão aqui quando os fretes forem concluídos.</p>
                        </div>
                    )}
                </CardContent>
            </Card>
        </motion.div>
        </>
      ) : (
         <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <Users className="h-16 w-16 mx-auto text-gray-400 mb-4" />
            <p className="text-gray-400 text-lg">{isAdminView ? "Selecione um motorista para ver os detalhes." : "Dados do motorista não encontrados."}</p>
            {isAdminView && <p className="text-gray-500 text-sm mt-2">Adicione motoristas na aba 'Motoristas' para ver seus pagamentos.</p>}
          </motion.div>
      )}
    </div>
  );
};

export default DriverPayouts;