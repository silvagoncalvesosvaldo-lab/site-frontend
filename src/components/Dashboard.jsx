import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Truck, Users, FileText, AlertCircle, ArrowRight, Loader2 } from 'lucide-react';
import { useData } from '@/contexts/DataContext';

const Dashboard = ({ setActiveTab }) => {
    const dataApi = useData();
    const { drivers, clients, freightOrders, earningsConfig, referralPayouts, loading } = dataApi;

    if (loading) {
        return (
          <div className="w-full h-full flex flex-col items-center justify-center">
              <Loader2 className="h-12 w-12 animate-spin text-blue-500" />
              <p className="mt-4 text-lg text-white">Carregando dashboard...</p>
          </div>
        );
    }

    const orders = freightOrders || [];
    const pendingVerifications = (drivers?.filter(d => d.status === 'pending').length || 0) + (clients?.filter(c => c.status === 'pending').length || 0);
    const totalOrders = orders.length;
    
    const totalRevenue = orders.reduce((acc, order) => {
        if (order.status === 'completed' && order.value && earningsConfig && earningsConfig.rates && typeof earningsConfig.rates[order.type] !== 'undefined') {
            return acc + (order.value * (earningsConfig.rates[order.type] / 100));
        }
        return acc;
    }, 0);

    const totalDrivers = drivers?.length || 0;
    const totalClients = clients?.length || 0;
    const pendingPayouts = referralPayouts?.filter(p => p.status === 'pending').length || 0;

    const orderStatusData = [
        { name: 'Pendente', value: orders.filter(o => o.status === 'pending').length },
        { name: 'Ativo', value: orders.filter(o => o.status === 'active').length },
        { name: 'Concluído', value: orders.filter(o => o.status === 'completed').length }
    ];

    const COLORS = ['#FFBB28', '#00C49F', '#0088FE'];

    const recentActivity = [
        ...(drivers?.slice(-2).map(d => ({ type: 'new_driver', name: d.name })) || []),
        ...(clients?.slice(-2).map(c => ({ type: 'new_client', name: c.name })) || []),
        ...(orders?.slice(-2).map(o => ({ type: 'new_order', name: `Frete #${o.id.substring(0, 4)}` })) || [])
    ].slice(0, 5);

    const StatCard = ({ title, value, icon, action, tab, color }) => (
        <Card className={`glass-effect border-${color}-500/50`}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-300">{title}</CardTitle>
                {icon}
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold text-white">{value}</div>
                {action && 
                    <Button variant="link" onClick={() => setActiveTab(tab)} className="p-0 text-sm text-blue-400 hover:text-blue-300">
                        {action} <ArrowRight className="h-4 w-4 ml-1"/>
                    </Button>
                }
            </CardContent>
        </Card>
    );

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="p-4 md:p-8 space-y-8"
        >
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <StatCard 
                    title="Verificações Pendentes" 
                    value={pendingVerifications} 
                    icon={<AlertCircle className="h-4 w-4 text-yellow-400" />} 
                    action="Verificar agora"
                    tab="verification-center"
                    color="yellow"
                />
                <StatCard 
                    title="Total de Fretes" 
                    value={totalOrders} 
                    icon={<FileText className="h-4 w-4 text-green-400" />}
                    action="Ver fretes"
                    tab="orders"
                    color="green"
                />
                <StatCard 
                    title="Pagamentos de Afiliados" 
                    value={pendingPayouts} 
                    icon={<AlertCircle className="h-4 w-4 text-orange-400" />}
                    action="Ver pagamentos"
                    tab="referral-payouts"
                    color="orange"
                />
            </div>
            
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-5">
                <Card className="lg:col-span-3 glass-effect">
                    <CardHeader>
                        <CardTitle className="text-white">Usuários</CardTitle>
                    </CardHeader>
                    <CardContent className="pl-2 h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={[{ name: 'Usuários', motoristas: totalDrivers, clientes: totalClients }]}>
                                <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                                <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151', color: '#e5e7eb' }}/>
                                <Bar dataKey="motoristas" fill="#8884d8" name="Motoristas" radius={[4, 4, 0, 0]} />
                                <Bar dataKey="clientes" fill="#82ca9d" name="Clientes" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
                <Card className="lg:col-span-2 glass-effect">
                    <CardHeader>
                        <CardTitle className="text-white">Status dos Fretes</CardTitle>
                    </CardHeader>
                    <CardContent className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie data={orderStatusData} cx="50%" cy="50%" labelLine={false} outerRadius={80} fill="#8884d8" dataKey="value" nameKey="name">
                                    {orderStatusData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151', color: '#e5e7eb' }}/>
                            </PieChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
                <Card className="glass-effect">
                    <CardHeader>
                        <CardTitle className="text-white">Faturamento (Taxas)</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-3xl font-bold text-green-400">
                            R$ {totalRevenue.toFixed(2).replace('.', ',')}
                        </p>
                        <p className="text-xs text-gray-400">
                           Faturamento bruto de taxas de serviço concluídas.
                        </p>
                    </CardContent>
                </Card>
                <Card className="glass-effect">
                    <CardHeader>
                        <CardTitle className="text-white">Atividade Recente</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {recentActivity.map((item, index) => (
                                <div key={index} className="flex items-center">
                                    {item.type === 'new_driver' && <Truck className="h-5 w-5 mr-3 text-purple-400" />}
                                    {item.type === 'new_client' && <Users className="h-5 w-5 mr-3 text-blue-400" />}
                                    {item.type === 'new_order' && <FileText className="h-5 w-5 mr-3 text-green-400" />}
                                    <div>
                                        <p className="text-sm text-white font-medium">{item.name}</p>
                                        <p className="text-xs text-gray-400">
                                            {item.type === 'new_driver' && 'Novo motorista cadastrado'}
                                            {item.type === 'new_client' && 'Novo cliente cadastrado'}
                                            {item.type === 'new_order' && 'Novo frete solicitado'}
                                        </p>
                                    </div>
                                </div>
                            ))}
                             {recentActivity.length === 0 && <p className="text-sm text-gray-500">Nenhuma atividade recente.</p>}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </motion.div>
    );
};
