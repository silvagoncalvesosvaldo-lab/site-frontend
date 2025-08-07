import React from 'react';
import { motion } from 'framer-motion';
import { Globe, ArrowDownCircle } from 'lucide-react';

const HeroSection = () => {
    const fadeIn = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    };

    return (
        <section id="hero" className="py-20 text-center relative">
            <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#0a102a] via-[#111845] to-[#0a102a]"></div>
            <div className="container mx-auto px-4 sm:px-6">
                <motion.div variants={fadeIn} initial="hidden" animate="visible">
                    <h2 className="text-2xl font-semibold mb-4 text-teal-400">
                        Os Melhores do Transporte
                    </h2>
                    <h1 className="text-4xl md:text-6xl font-bold leading-tight text-white">
                        A Conexão Certa para quem tem o que <span className="gradient-text-purple">Transportar</span> e para os <span className="gradient-text-purple">Transportadores.</span>
                    </h1>
                    <p className="text-lg mt-6 max-w-3xl mx-auto text-slate-400">
                        Sua solução definitiva para <strong className="text-white">PAGAMENTOS E TRANSPORTES</strong> de: Mudanças, fretes e cargas em geral. Unimos você a uma elite de profissionais que fazem a diferença.
                    </p>
                    <div className="flex justify-center items-center gap-2 mt-6 text-teal-300">
                        <Globe className="h-5 w-5" />
                        <span>Atendemos em todo o Brasil!</span>
                    </div>
                    <div className="mt-10 max-w-3xl mx-auto">
                        <div className="glass-card p-4 rounded-lg flex items-center justify-center gap-3 bg-yellow-500/20 border-yellow-500/50">
                            <ArrowDownCircle className="h-8 w-8 sm:h-6 sm:w-6 text-yellow-400 flex-shrink-0" />
                            <p className="text-yellow-300 text-base sm:text-xl font-semibold">Role para conhecer nossos benefícios! Os botões de cadastro estão no final da página.</p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default HeroSection;