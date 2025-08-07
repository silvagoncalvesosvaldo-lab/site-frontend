import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Lock, ShieldCheck, Database, UserCheck, AlertTriangle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const PrivacyPolicy = () => {
  const policies = [
    {
      icon: <UserCheck className="h-6 w-6 text-blue-400" />,
      title: "Coleta de Dados",
      description: "Coletamos apenas os dados estritamente necessários para o funcionamento da plataforma, como informações de contato, documentos de identificação e dados do veículo. Esses dados são fornecidos por você durante o cadastro."
    },
    {
      icon: <ShieldCheck className="h-6 w-6 text-green-400" />,
      title: "Uso das Informações",
      description: "Seus documentos e informações pessoais são utilizados EXCLUSIVAMENTE para o processo de verificação interna de segurança. Em nenhuma hipótese seus dados serão vendidos, compartilhados com terceiros para fins de marketing ou utilizados para qualquer outra finalidade que não seja a operação segura da plataforma."
    },
    {
      icon: <Database className="h-6 w-6 text-purple-400" />,
      title: "Armazenamento e Segurança",
      description: "Empregamos as melhores práticas de segurança do mercado para proteger seus dados. As informações são armazenadas em servidores seguros com acesso restrito, garantindo que apenas pessoal autorizado possa acessá-las para fins de verificação."
    },
    {
      icon: <Lock className="h-6 w-6 text-yellow-400" />,
      title: "Seu Controle",
      description: "Você tem o direito de solicitar a visualização, correção ou exclusão dos seus dados a qualquer momento, entrando em contato com nosso suporte. A exclusão de dados essenciais pode, no entanto, implicar na desativação da sua conta."
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <h1 className="text-3xl font-bold gradient-text mb-2 flex items-center gap-3">
        <Lock className="h-8 w-8" />
        Política de Privacidade e Proteção de Dados
      </h1>
      <p className="text-gray-400">Seu controle e sua segurança são nossa prioridade.</p>

      <Card className="glass-effect border-white/20">
        <CardHeader>
          <CardTitle className="text-white">Nosso Compromisso com a Sua Privacidade</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-gray-300">
            Entendemos a importância dos seus dados pessoais e nos comprometemos a tratá-los com o máximo de respeito, segurança e transparência. Esta política descreve como suas informações são manuseadas dentro da nossa plataforma.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {policies.map((policy, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
                className="p-6 bg-white/5 rounded-lg border border-white/10 flex items-start gap-4"
              >
                <div className="flex-shrink-0">{policy.icon}</div>
                <div>
                  <h3 className="font-bold text-lg text-white mb-2">{policy.title}</h3>
                  <p className="text-gray-400 text-sm">{policy.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <Alert variant="destructive" className="mt-6 bg-yellow-900/30 border-yellow-500/50 text-yellow-200">
            <AlertTriangle className="h-4 w-4 !text-yellow-400" />
            <AlertTitle className="font-bold">Aviso de Responsabilidade</AlertTitle>
            <AlertDescription>
              Esta plataforma aceita apenas transportadores profissionais que atendem aos seguintes critérios rigorosos: ANTT (Registro Nacional de Transportadores Rodoviários de Cargas ativo), Renavam (Verificado para garantir a regularidade do veículo), Comprovante de residência (Exigido para confirmação da origem do transportador), CNH. <br/><br/>
              Apesar de solicitarmos esses documentos, esta plataforma não se responsabiliza por qualquer ocorrência relacionada aos veículos ou transportadores. As informações são analisadas apenas para auxiliar os clientes que desejam contratar fretes com maior segurança. Os dados fornecidos não são repassados a terceiros sob nenhuma circunstância.
            </AlertDescription>
          </Alert>
          <p className="text-sm text-center text-gray-400 pt-4 border-t border-white/10">
            Ao utilizar nossos serviços, você concorda com os termos desta Política de Privacidade.
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default PrivacyPolicy;