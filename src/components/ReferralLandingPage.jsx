import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import WelcomeHeader from '@/components/welcome/WelcomeHeader';
import WelcomeFooter from '@/components/welcome/WelcomeFooter';

const ReferralLandingPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [refCode, setRefCode] = useState(null);

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const referralCode = params.get('ref');
        if (referralCode) {
            localStorage.setItem('referral_id', referralCode);
            setRefCode(referralCode);
        }
    }, [location]);

    const scrollTo = (id) => {
        navigate(`/#${id}`);
    };

    const handleRegisterClick = (e) => {
        e.preventDefault();
        if (refCode) {
            localStorage.setItem('referral_id', refCode);
        }
        navigate('/');
    };

    return (
        <>
            <Helmet>
                <title>Convite Especial - Os Melhores do Transporte</title>
                <meta name="description" content="Você foi convidado para se juntar à plataforma Os Melhores do Transporte. Cadastre-se como cliente, transportador ou afiliado e aproveite os benefícios." />
            </Helmet>
            <div className="min-h-screen w-full bg-[#0a102a] text-slate-300 font-sans flex flex-col">
                <WelcomeHeader scrollTo={scrollTo} />
                <main className="flex-grow flex items-center justify-center pt-28 pb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="container mx-auto px-4 text-center"
                    >
                        <div className="bg-white py-6 px-4 md:px-6 rounded-xl shadow-md max-w-2xl mx-auto my-6 border border-gray-200">
                            <div className="space-y-4 text-center">
                                <p className="text-gray-700 font-semibold">
                                📢 Cadastro gratuito e uso da plataforma é isento de mensalidade.
                                </p>
                                <p className="text-gray-700 font-semibold">
                                📌 COM ESSE CONVITE VOCÊ PODE SE CADASTRAR E SE TORNAR:
                                </p>
                                <ul className="text-gray-600 text-left list-disc list-inside mx-auto max-w-md">
                                    <li><strong>Cliente</strong>: que tem algo para ser transportado.</li>
                                    <li><strong>Transportador</strong>: tem um veículo e atende às exigências da plataforma.</li>
                                    <li><strong>Afiliado</strong>: que quer uma renda adicional ou principal mensal.</li>
                                </ul>

                                <div className="mt-4">
                                <a
                                    href={refCode ? `/?ref=${refCode}` : '/'}
                                    onClick={handleRegisterClick}
                                    className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition"
                                >
                                    👉 Clique aqui para se cadastrar agora
                                </a>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </main>
                <WelcomeFooter />
            </div>
        </>
    );
};

export default ReferralLandingPage;