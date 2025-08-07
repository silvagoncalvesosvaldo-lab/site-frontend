import React from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { User, Truck, ArrowLeft, HeartHandshake as HandshakeIcon } from 'lucide-react';

const LoginRoleSelection = () => {
    const navigate = useNavigate();

    const roles = [
        {
            name: 'cliente',
            title: 'Sou Cliente',
            icon: <User className="h-8 w-8 text-blue-400" />,
            description: 'Acessar meu painel para solicitar e gerenciar fretes.',
        },
        {
            name: 'transportador',
            title: 'Sou Transportador',
            icon: <Truck className="h-8 w-8 text-purple-400" />,
            description: 'Encontrar novas oportunidades e gerenciar meus fretes.',
        },
        {
            name: 'afiliado',
            title: 'Sou Afiliado',
            icon: <HandshakeIcon className="h-8 w-8 text-teal-400" />,
            description: 'Ver minhas indicações, comissões e pagamentos.',
        },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: 'spring',
                stiffness: 100,
            },
        },
    };

    return (
        <>
            <Helmet>
                <title>Selecionar Perfil - Os Melhores do Transporte</title>
                <meta name="description" content="Escolha seu perfil para acessar a plataforma." />
            </Helmet>
            <div className="min-h-screen bg-slate-900 bg-grid-pattern text-white flex flex-col items-center justify-center p-4">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-4xl md:text-5xl font-bold gradient-text-purple">Como você quer acessar?</h1>
                    <p className="text-gray-400 mt-4 text-lg">Selecione seu perfil para continuar.</p>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl"
                >
                    {roles.map((role) => (
                        <motion.div key={role.name} variants={itemVariants}>
                            <Card
                                className="glass-effect-hover h-full flex flex-col justify-between cursor-pointer border-white/10"
                                onClick={() => navigate(`/acessar/${role.name}`)}
                            >
                                <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-2">
                                    <div className="p-3 bg-white/10 rounded-lg">{role.icon}</div>
                                    <CardTitle className="text-white text-2xl">{role.title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-gray-300">{role.description}</p>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </motion.div>

                <Button variant="ghost" asChild className="mt-12 text-gray-400 hover:text-white">
                    <Link to="/">
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Voltar para a Página Inicial
                    </Link>
                </Button>
            </div>
        </>
    );
};

export default LoginRoleSelection;