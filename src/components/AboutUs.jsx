import React from 'react';
import { motion } from 'framer-motion';
import { Building, Mail, ShieldCheck, MessageSquare } from 'lucide-react';
import { Helmet } from 'react-helmet';

const AboutUs = ({ companyInfo }) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.5,
      },
    }),
  };

  return (
    <>
      <Helmet>
        <title>Sobre Nós - Os Melhores do Transporte</title>
        <meta name="description" content="Conheça a nossa missão e os dados que garantem a nossa credibilidade e a sua segurança." />
      </Helmet>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white flex flex-col items-center justify-center p-4 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-4xl mx-auto"
        >
          <div className="inline-block p-4 bg-white/10 rounded-full mb-6">
            <ShieldCheck className="h-12 w-12 text-white" />
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold gradient-text mb-4">
            Nossa Missão é a Sua Confiança
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Acreditamos que a transparência é a base de qualquer parceria de sucesso. Por isso, compartilhamos abertamente nossos dados e nosso compromisso com a segurança em cada etapa do processo.
          </p>

          <div className="my-12 p-8 bg-black/20 rounded-2xl border border-white/10 backdrop-blur-sm">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">Informações da Empresa</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
              <motion.div custom={0} variants={cardVariants} initial="hidden" animate="visible" className="flex items-start gap-4">
                <div className="p-3 bg-white/10 rounded-lg"><Building className="h-6 w-6 text-blue-400" /></div>
                <div>
                  <h3 className="font-bold text-white">Razão Social</h3>
                  <p className="text-gray-300">{companyInfo.name}</p>
                </div>
              </motion.div>
              <motion.div custom={1} variants={cardVariants} initial="hidden" animate="visible" className="flex items-start gap-4">
                <div className="p-3 bg-white/10 rounded-lg"><ShieldCheck className="h-6 w-6 text-green-400" /></div>
                <div>
                  <h3 className="font-bold text-white">CNPJ</h3>
                  <p className="text-gray-300">{companyInfo.cnpj}</p>
                </div>
              </motion.div>
              <motion.div custom={2} variants={cardVariants} initial="hidden" animate="visible" className="flex items-start gap-4">
                <div className="p-3 bg-white/10 rounded-lg"><Mail className="h-6 w-6 text-purple-400" /></div>
                <div>
                  <h3 className="font-bold text-white">E-mail de Contato</h3>
                  <p className="text-gray-300">{companyInfo.email}</p>
                </div>
              </motion.div>
               <motion.div custom={3} variants={cardVariants} initial="hidden" animate="visible" className="flex items-start gap-4">
                <div className="p-3 bg-white/10 rounded-lg"><MessageSquare className="h-6 w-6 text-teal-400" /></div>
                <div>
                  <h3 className="font-bold text-white">WhatsApp</h3>
                  <p className="text-gray-300">{companyInfo.whatsapp}</p>
                  <p className="text-xs text-gray-400">(Contato somente por digitação, não atendemos ligações)</p>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default AboutUs;