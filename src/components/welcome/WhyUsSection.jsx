import React from 'react';
import { motion } from 'framer-motion';
import { UserCheck, Package, Wrench, Check, AlertTriangle } from 'lucide-react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

const WhyUsSection = () => {
    const fadeIn = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    };
    
    const whyUsItems = [
        { icon: <UserCheck className="h-8 w-8 text-sky-400" />, title: "Profissionais Verificados", description: "Parceiros rigorosamente selecionados para garantir sua tranquilidade." },
        { icon: <Package className="h-8 w-8 text-sky-400" />, title: "Especialistas em Embalagem", description: "Mestres em proteger e acomodar seus bens com o máximo cuidado." },
        { icon: <Wrench className="h-8 w-8 text-sky-400" />, title: "Equipamentos Completos", description: "De mantas a cintas, tudo para um transporte impecável." }
    ];

    return (
        <section id="why-us" className="py-24 bg-[#0c1432]">
            <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
                <h2 className="text-4xl font-bold text-center mb-4 text-white">Por que somos a <span className="gradient-text-purple">escolha certa?</span></h2>
                <p className="text-lg text-center text-slate-400 mb-12 max-w-3xl mx-auto">Nossos parceiros não são apenas transportadores. São artesãos do cuidado, dedicados a tratar seus bens como se fossem deles. Essa dedicação justifica um valor justo por um serviço de excelência.</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {whyUsItems.map((item, index) => (
                         <motion.div key={index} variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
                            <div className="glass-card p-6 rounded-xl h-full text-center flex flex-col items-center">
                                <div className="mb-4">{item.icon}</div>
                                <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                                <p className="text-slate-400 flex-grow text-sm">{item.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
                <div className="mt-12 glass-card p-8 rounded-2xl text-left">
                    <h3 className="text-2xl font-bold text-white mb-4">Compromisso com a Legalidade e Segurança</h3>
                    <p className="text-slate-400 mb-6">Para garantir sua total segurança, nesta plataforma aceitamos <strong className="text-white">somente transportadores profissionais</strong> que atendam aos seguintes critérios rigorosos:</p>
                    <div className="space-y-4">
                        <div className="flex items-center gap-3 text-green-400">
                            <Check className="h-5 w-5 flex-shrink-0" />
                            <span><strong className="text-white">ANTT:</strong> Registro Nacional de Transportadores Rodoviários de Cargas ativo.</span>
                        </div>
                        <div className="flex items-center gap-3 text-green-400">
                            <Check className="h-5 w-5 flex-shrink-0" />
                            <span><strong className="text-white">Renavam:</strong> Verificado para garantir a regularidade do veículo.</span>
                        </div>
                        <div className="flex items-center gap-3 text-green-400">
                            <Check className="h-5 w-5 flex-shrink-0" />
                            <span><strong className="text-white">Comprovante de residência:</strong> Exigido para confirmação da origem do transportador.</span>
                        </div>
                    </div>
                    <Alert variant="destructive" className="mt-6 bg-yellow-900/30 border-yellow-500/50 text-yellow-200">
                      <AlertTriangle className="h-4 w-4 !text-yellow-400" />
                      <AlertTitle className="font-bold">Aviso de Responsabilidade</AlertTitle>
                      <AlertDescription>
                        Apesar de solicitarmos esses documentos, esta plataforma não se responsabiliza por qualquer ocorrência relacionada aos veículos ou transportadores. As informações são analisadas apenas para auxiliar os clientes que desejam contratar fretes com maior segurança. Os dados fornecidos não são repassados a terceiros sob nenhuma circunstância.
                      </AlertDescription>
                    </Alert>
                </div>
            </div>
        </section>
    );
};

export default WhyUsSection;