import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Briefcase, Truck, Users, ArrowRight, HeartHandshake as Handshake } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const RegistrationSection = ({ onRegisterClick }) => {
  const navigate = useNavigate();

  const cardVariants = {
    offscreen: { y: 50, opacity: 0 },
    onscreen: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        bounce: 0.4,
        duration: 0.8
      }
    }
  };

  const registrationOptions = [
    {
      type: 'client',
      icon: <Briefcase className="h-10 w-10 text-blue-400" />,
      title: 'Sou Cliente',
      description: 'Preciso de um transporte seguro e eficiente para minha carga.',
      buttonText: 'Cadastrar como Cliente',
      gradient: 'from-blue-500 to-cyan-500',
      action: () => onRegisterClick('client'),
    },
    {
      type: 'driver',
      icon: <Truck className="h-10 w-10 text-purple-400" />,
      title: 'Sou Transportador',
      description: 'Quero encontrar fretes, aumentar meus ganhos e otimizar minhas rotas.',
      buttonText: 'Cadastrar como Transportador',
      gradient: 'from-purple-500 to-indigo-500',
      action: () => onRegisterClick('driver'),
    },
    {
      type: 'affiliate-new',
      icon: <Handshake className="h-10 w-10 text-teal-400" />,
      title: 'Para ser Afiliado',
      description: 'Junte-se à nossa rede de parceiros e ganhe indicando clientes e transportadores.',
      buttonText: 'Cadastrar como Afiliado',
      gradient: 'from-teal-500 to-green-500',
      action: () => navigate('/cadastro/afiliado-novo'),
    },
  ];

  return (
    <section id="register" className="py-20 md:py-32 bg-slate-900">
      <div className="container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Faça Parte da Nossa Rede
          </h2>
          <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto mb-12">
            Escolha seu perfil e comece a transformar a logística de transportes. Junte-se a nós e aproveite todos os benefícios.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {registrationOptions.map((option, index) => (
            <motion.div
              key={option.type}
              className="w-full"
              variants={cardVariants}
              initial="offscreen"
              whileInView="onscreen"
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: index * 0.2 }}
            >
              <div className="h-full glass-effect p-8 rounded-2xl flex flex-col items-center border border-white/10 hover:border-white/20 transition-all duration-300 transform hover:-translate-y-2">
                <div className="mb-6 p-4 bg-gray-800 rounded-full">
                  {option.icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">{option.title}</h3>
                <p className="text-gray-400 mb-8 flex-grow">{option.description}</p>
                <Button
                  onClick={option.action}
                  className={`w-full btn-gradient bg-gradient-to-r ${option.gradient} text-white font-semibold py-6 text-lg group`}
                >
                  {option.buttonText}
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RegistrationSection;