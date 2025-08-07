import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Shield, CreditCard, MapPin, Gift, Users, DollarSign, Zap, ShieldCheck, BarChart2, FileText, Star, TrendingUp } from 'lucide-react';

import WelcomeHeader from '@/components/welcome/WelcomeHeader';
import HeroSection from '@/components/welcome/HeroSection';
import BenefitsSection from '@/components/welcome/BenefitsSection';
import WhyUsSection from '@/components/welcome/WhyUsSection';
import RegistrationSection from '@/components/welcome/RegistrationSection';
import WelcomeFooter from '@/components/welcome/WelcomeFooter';
import RegistrationModal from '@/components/welcome/RegistrationModal';

const WelcomePage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isRegisterOpen, setIsRegisterOpen] = useState(false);
    const [registrationType, setRegistrationType] = useState('client');

    const scrollTo = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };
    
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const ref = urlParams.get('ref');

        if (ref) {
            localStorage.setItem('referral_id', ref);
        }

        if (urlParams.get('register') === 'true') {
            const type = urlParams.get('type') || 'client';
            setRegistrationType(type);
            setIsRegisterOpen(true);
        } else {
            setIsRegisterOpen(false);
        }
    }, [location]);

    const handleOpenRegister = (type) => {
        setRegistrationType(type);
        setIsRegisterOpen(true);
    };

    const handleCloseRegister = () => {
        setIsRegisterOpen(false);
        // Clear URL params without reloading
        navigate('/', { replace: true });
    };
    
    const clientBenefits = [
        { icon: <Shield className="h-8 w-8 text-green-400" />, title: "Pagamento Seguro", description: "Seu dinheiro fica 100% protegido em garantia e só é liberado para o transportador após a conclusão do serviço." },
        { icon: <CreditCard className="h-8 w-8 text-green-400" />, title: "Pagamento Flexível", description: "Pague com Pix à vista ou parcele no cartão de crédito em até 12x com juros." },
        { icon: <MapPin className="h-8 w-8 text-green-400" />, title: "Rastreamento em Tempo Real", description: "Acompanhe sua carga do início ao fim. Tenha total visibilidade e tranquilidade com nosso sistema de rastreamento ao vivo." },
        { icon: <Gift className="h-8 w-8 text-green-400" />, title: "Plano de Fidelidade", description: "Quanto mais você usa, mais você ganha! Acumule fretes e desbloqueie descontos progressivos nas taxas da plataforma." },
        { icon: <Users className="h-8 w-8 text-green-400" />, title: "Indique e Ganhe", description: "Convide seus amigos para a plataforma. Quando eles realizarem o primeiro frete, você ganha um bônus em dinheiro!" }
    ];

    const driverBenefits = [
        { icon: <DollarSign className="h-8 w-8 text-purple-400" />, title: "Pagamento Garantido", description: "Diga adeus ao calote! Receba um adiantamento para cobrir custos e o restante garantido após a entrega." },
        { icon: <Zap className="h-8 w-8 text-purple-400" />, title: "Oportunidades Reais", description: "Tenha acesso a um fluxo constante de solicitações de fretes e nunca ficar parado." },
        { icon: <ShieldCheck className="h-8 w-8 text-purple-400" />, title: "Segurança e Profissionalismo", description: "Quando fecharem uma negociação nossa plataforma fará o rastreamento da rota, aumentando a confiança do cliente. Uma camada extra de segurança que valoriza o seu serviço e protege a carga." },
        { icon: <MapPin className="h-8 w-8 text-purple-400" />, title: "Apoio em Rota & Suporte", description: "Receba sugestões de pontos de parada para alimentação, descanso e socorro. Um apoio para sua viagem, sem responsabilidade direta da plataforma." },
        { icon: <Users className="h-8 w-8 text-purple-400" />, title: "Programa de Afiliados", description: "Indique clientes e outros motoristas com seu link pessoal e crie uma nova fonte de renda recorrente." },
        { icon: <BarChart2 className="h-8 w-8 text-purple-400" />, title: "Controle de Custos da Viagem", description: "Ao final de cada frete, tenha um relatório claro dos seus custos. Uma ferramenta poderosa para sua gestão financeira." },
        { icon: <FileText className="h-8 w-8 text-purple-400" />, title: "Gestão de Documentos Simplificada", description: "Fique tranquilo! Nossa plataforma envia alertas automáticos sobre o vencimento de seus documentos (CNH, ANTT e outros documentos caso queira cadastrar), ajudando você a se manter sempre em dia." },
        { icon: <Star className="h-8 w-8 text-purple-400" />, title: "Sistema de Ranking", description: "Destaque-se! Motoristas com bom desempenho sobem de nível (Bronze, Prata, Ouro, Diamante), ganham mais visibilidade e benefícios." }
    ];

    const affiliateBenefits = [
        { icon: <DollarSign className="h-8 w-8 text-yellow-400" />, title: "Renda Extra Garantida", description: "Ganhe comissões por cada novo usuário que se cadastrar e realizar serviços através do seu link de indicação." },
        { icon: <TrendingUp className="h-8 w-8 text-yellow-400" />, title: "Potencial de Ganhos Ilimitado", description: "Quanto mais pessoas você indicar e mais serviços elas realizarem, maior será sua renda. O céu é o limite!" },
        { icon: <Users className="h-8 w-8 text-yellow-400" />, title: "Construa Sua Rede", description: "Crie uma rede de clientes e transportadores e receba uma porcentagem sobre os fretes realizados por eles." },
        { icon: <Gift className="h-8 w-8 text-yellow-400" />, title: "Bônus por Desempenho", description: "Alcance metas de indicação e receba bônus extras, aumentando ainda mais seus lucros." },
        { icon: <ShieldCheck className="h-8 w-8 text-yellow-400" />, title: "Transparência Total", description: "Acompanhe seus ganhos e o desempenho das suas indicações em tempo real através do seu painel de afiliado." }
    ];

    return (
        <>
            <Helmet>
                <title>Os Melhores do Transporte - A Conexão Certa</title>
                <meta name="description" content="A conexão certa para quem tem o que transportar e para os transportadores. Soluções em fretes com segurança, agilidade e os melhores profissionais." />
            </Helmet>
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="min-h-screen w-full bg-[#0a102a] text-slate-300 font-sans overflow-x-hidden"
            >
                <WelcomeHeader scrollTo={scrollTo} />

                <main className="pt-28">
                    <HeroSection />
                    
                    <section className="py-24 bg-[#0a102a]">
                        <div className="container mx-auto px-4 sm:px-6 max-w-4xl text-center">
                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                                Cadastro Gratuito e Plataforma sem Mensalidade
                            </h2>
                            <p className="text-lg text-slate-400">
                                Seja qual for a sua categoria – Transportador, Cliente ou Afiliado – o cadastro é gratuito e o uso da plataforma é totalmente isento de mensalidade.
                            </p>
                        </div>
                    </section>

                    <BenefitsSection 
                        id="clientes"
                        title="Vantagens para Clientes"
                        description="Contrate com segurança, ganhe recompensas e tenha a melhor experiência de transporte."
                        benefits={clientBenefits}
                        gradientClass="gradient-text-green"
                    />
                    <BenefitsSection 
                        id="transportadores"
                        title="Benefícios para Transportadores"
                        description="Trabalhe com segurança financeira, encontre mais oportunidades e aumente sua renda."
                        benefits={driverBenefits}
                        gradientClass="gradient-text-purple"
                    />
                    <BenefitsSection 
                        id="afiliados"
                        title="Benefícios para Afiliados"
                        description="Transforme suas indicações em renda e construa um futuro financeiro sólido."
                        benefits={affiliateBenefits}
                        gradientClass="gradient-text-yellow"
                    />
                    <WhyUsSection />
                    <RegistrationSection onRegisterClick={handleOpenRegister} />
                </main>

                <WelcomeFooter />
            </motion.div>

            <RegistrationModal
                isOpen={isRegisterOpen} 
                onClose={handleCloseRegister} 
                userType={registrationType}
            />
        </>
    );
};

export default WelcomePage;