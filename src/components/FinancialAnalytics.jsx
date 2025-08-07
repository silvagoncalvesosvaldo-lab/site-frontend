import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { DollarSign, TrendingUp, Users, Truck, Download, Loader2 } from 'lucide-react';
import { useData } from '@/contexts/DataContext';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const FinancialAnalytics = () => {
  const { freightOrders, earningsConfig, drivers, clients, loading } = useData();

  const completedOrders = useMemo(() => (freightOrders || []).filter(o => o.status === 'completed'), [freightOrders]);

  const calculateCommission = (price, type) => {
    if (!earningsConfig?.rates) return 0;
    const rate = earningsConfig.rates[type] || earningsConfig.rates.interstate || 0;
    return (price * rate) / 100;
  };

  const stats = useMemo(() => {
    const totalRevenue = completedOrders.reduce((sum, order) => sum + (order.value || 0), 0);
    const totalCommission = completedOrders.reduce((sum, order) => sum + calculateCommission(order.value || 0, order.type), 0);
    const totalFreights = completedOrders.length;
    const averageFreightValue = totalFreights > 0 ? totalRevenue / totalFreights : 0;

    return { totalRevenue, totalCommission, totalFreights, averageFreightValue };
  }, [completedOrders, earningsConfig]);

  const revenueByMonth = useMemo(() => {
    const data = {};
    completedOrders.forEach(order => {
      const month = new Date(order.created_at).toLocaleString('default', { month: 'short', year: '2-digit' });
      if (!data[month]) {
        data[month] = { name: month, Faturamento: 0, Comissão: 0, Fretes: 0 };
      }
      data[month].Faturamento += order.value || 0;
      data[month].Comissão += calculateCommission(order.value || 0, order.type);
      data[month].Fretes += 1;
    });
    return Object.values(data).sort((a, b) => new Date(a.name) - new Date(b.name));
  }, [completedOrders]);

  const topDrivers = useMemo(() => {
    if (!drivers || drivers.length === 0) return [];
    const driverData = {};
    completedOrders.forEach(order => {
      if (!driverData[order.driver_id]) {
        driverData[order.driver_id] = { revenue: 0, freights: 0 };
      }
      driverData[order.driver_id].revenue += order.value || 0;
      driverData[order.driver_id].freights += 1;
    });
    return Object.entries(driverData)
      .map(([driverId, data]) => ({
        driverId,
        name: drivers.find(d => d.id === driverId)?.name || 'Desconhecido',
        ...data
      }))
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 5);
  }, [completedOrders, drivers]);

  const topClients = useMemo(() => {
    if (!clients || clients.length === 0) return [];
    const clientData = {};
    completedOrders.forEach(order => {
      if (!clientData[order.client_id]) {
        clientData[order.client_id] = { revenue: 0, freights: 0 };
      }
      clientData[order.client_id].revenue += order.value || 0;
      clientData[order.client_id].freights += 1;
    });
    return Object.entries(clientData)
      .map(([clientId, data]) => ({
        clientId,
        name: clients.find(c => c.id === clientId)?.name || 'Desconhecido',
        ...data
      }))
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 5);
  }, [completedOrders, clients]);

  const handleExport = (data, filename) => {
    if (!data || data.length === 0) return;
    const headers = Object.keys(data[0]).join(',');
    const rows = data.map(row => Object.values(row).join(',')).join('\n');
    const csvContent = `data:text/csv;charset=utf-8,${headers}\n${rows}`;
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `${filename}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const StatCard = ({ icon, title, value, description }) => (
    <Card className="glass-effect border-white/20">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-gray-300">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-white">{value}</div>
        <p className="text-xs text-gray-400">{description}</p>
      </CardContent>
    </Card>
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="h-8 w-8 animate-spin text-blue-400" />
        <p className="ml-4 text-white text-xl">Carregando análises financeiras...</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold gradient-text">Análise Financeira e de Desempenho</h1>
        <Button onClick={() => handleExport(revenueByMonth, 'relatorio_financeiro_mensal')} className="btn-gradient">
          <Download className="mr-2 h-4 w-4" /> Exportar Relatório
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Faturamento Total"
          value={`R$ ${stats.totalRevenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
          description="Receita de fretes concluídos"
          icon={<DollarSign className="h-4 w-4 text-gray-400" />}
        />
        <StatCard
          title="Comissão da Plataforma"
          value={`R$ ${stats.totalCommission.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
          description="Ganhos da plataforma"
          icon={<TrendingUp className="h-4 w-4 text-gray-400" />}
        />
        <StatCard
          title="Fretes Concluídos"
          value={stats.totalFreights}
          description="Total de entregas finalizadas"
          icon={<Truck className="h-4 w-4 text-gray-400" />}
        />
        <StatCard
          title="Valor Médio por Frete"
          value={`R$ ${stats.averageFreightValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
          description="Média de valor por entrega"
          icon={<DollarSign className="h-4 w-4 text-gray-400" />}
        />
      </div>

      <Card className="glass-effect border-white/20">
        <CardHeader>
          <CardTitle className="text-white">Desempenho Mensal</CardTitle>
        </CardHeader>
        <CardContent className="h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={revenueByMonth}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
              <XAxis dataKey="name" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" tickFormatter={(value) => `R$${value/1000}k`} />
              <Tooltip
                contentStyle={{ backgroundColor: 'rgba(31, 41, 55, 0.8)', border: '1px solid rgba(255, 255, 255, 0.2)', borderRadius: '0.5rem' }}
                labelStyle={{ color: '#fff' }}
              />
              <Legend wrapperStyle={{ color: '#fff' }} />
              <Bar dataKey="Faturamento" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Comissão" fill="#10b981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="glass-effect border-white/20">
          <CardHeader>
            <CardTitle className="text-white">Top 5 Motoristas por Faturamento</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={topDrivers}
                  dataKey="revenue"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  label={(entry) => `${entry.name} (R$${entry.revenue.toLocaleString('pt-BR')})`}
                >
                  {topDrivers.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `R$ ${value.toLocaleString('pt-BR')}`} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card className="glass-effect border-white/20">
          <CardHeader>
            <CardTitle className="text-white">Top 5 Clientes por Faturamento</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="border-white/20">
                  <TableHead className="text-white">Cliente</TableHead>
                  <TableHead className="text-white">Faturamento</TableHead>
                  <TableHead className="text-white">Fretes</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {topClients.map(client => (
                  <TableRow key={client.clientId} className="border-white/10">
                    <TableCell className="font-medium text-gray-300">{client.name}</TableCell>
                    <TableCell className="text-gray-300">R$ {client.revenue.toLocaleString('pt-BR')}</TableCell>
                    <TableCell className="text-gray-300">{client.freights}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
};

export default FinancialAnalytics;