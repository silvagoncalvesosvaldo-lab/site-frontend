import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { LayoutDashboard, Users, Truck, BarChart2, LogOut } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/customSupabaseClient';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
    const { toast } = useToast();
    const navigate = useNavigate();

    const handleLogout = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) {
            toast({
                title: "Erro ao sair",
                description: "Não foi possível fazer logout. Tente novamente.",
                variant: "destructive",
            });
        } else {
            toast({
                title: "Logout realizado com sucesso!",
            });
            navigate('/login/admin');
        }
    };
    
    const handleNotImplemented = () => {
        toast({
            title: "Funcionalidade em desenvolvimento",
            description: "🚧 Este recurso ainda não foi implementado—mas não se preocupe! Você pode solicitá-lo no seu próximo prompt! 🚀",
        });
    };

    const navItems = [
        { icon: <LayoutDashboard className="h-6 w-6" />, label: 'Dashboard' },
        { icon: <Users className="h-6 w-6" />, label: 'Gerenciar Usuários' },
        { icon: <Truck className="h-6 w-6" />, label: 'Gerenciar Fretes' },
        { icon: <BarChart2 className="h-6 w-6" />, label: 'Análises' },
    ];

    return (
        <>
            <Helmet>
                <title>Dashboard do Administrador</title>
                <meta name="description" content="Painel de controle para administradores." />
            </Helmet>
            <div className="min-h-screen bg-slate-900 text-white p-8">
                <header className="flex justify-between items-center mb-10">
                    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                        <h1 className="text-4xl font-bold gradient-text-red">Painel do Administrador</h1>
                    </motion.div>
                    <Button onClick={handleLogout} variant="destructive">
                        <LogOut className="mr-2 h-4 w-4" />
                        Sair
                    </Button>
                </header>

                <main>
                    <motion.div 
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ staggerChildren: 0.1 }}
                    >
                        {navItems.map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <Card 
                                    className="glass-effect-light border-white/20 text-center hover:border-red-500 transition-colors duration-300 cursor-pointer"
                                    onClick={handleNotImplemented}
                                >
                                    <CardHeader>
                                        <div className="flex justify-center text-red-400 mb-2">
                                            {item.icon}
                                        </div>
                                        <CardTitle className="text-xl text-white">{item.label}</CardTitle>
                                    </CardHeader>
                                </Card>
                            </motion.div>
                        ))}
                    </motion.div>
                </main>
            </div>
        </>
    );
};

export default AdminDashboard;