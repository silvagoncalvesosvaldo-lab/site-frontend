import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { ShieldAlert, ListChecks, Check } from 'lucide-react';

const Disclaimer = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <h1 className="text-3xl font-bold gradient-text mb-2">Termos de Serviço e Isenção de Responsabilidade</h1>
      <p className="text-gray-400">Por favor, leia atentamente os nossos termos antes de utilizar a plataforma.</p>

      <Card className="glass-effect border-white/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-white">
            <ShieldAlert className="h-8 w-8 text-yellow-400" />
            Aviso Importante para Clientes e Transportadores
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-gray-300">
          <Alert variant="destructive" className="bg-red-900/30 border-red-500/50 text-red-200">
            <ShieldAlert className="h-4 w-4 !text-red-400" />
            <AlertTitle className="font-bold">Nosso Papel é Apenas a Conexão</AlertTitle>
            <AlertDescription>
              Informamos com exatidão e clareza aos envolvidos que nossa função é somente fazer a conexão entre quem tem a carga a ser transportada (Cliente) e quem tem veículos de transporte e quer cargas para transportar (Transportador).
            </AlertDescription>
          </Alert>

          <div className="p-4 bg-white/5 rounded-lg border border-white/10">
            <h3 className="font-bold text-lg text-white mb-2">Isenção de Responsabilidade Sobre Cargas, Veículos e Pessoas</h3>
            <p>
              Nós, proprietários da plataforma, e a própria plataforma, ficamos isentos de qualquer responsabilidade por danos, avarias, acidentes, desastres e outros acontecimentos extraordinários que possam surgir antes, durante ou depois do carregamento, descarregamento ou no transporte de quaisquer que sejam as cargas.
            </p>
            <p className="mt-2">
              Não teremos nenhuma responsabilidade sobre as cargas a serem transportadas ou em transporte, sejam quais forem os itens, e também sobre os veículos que estejam ou estarão prestando esses serviços.
            </p>
            <p className="mt-2">
              Adicionalmente, não teremos responsabilidade, seja ela qual for, por danos pessoais e morais a transportadores, clientes ou quaisquer outras pessoas que estejam envolvidas na prestação dos serviços negociados entre as partes.
            </p>
          </div>

          <div className="p-4 bg-white/5 rounded-lg border border-white/10">
            <h3 className="font-bold text-lg text-white mb-2">Isenção Sobre Cobranças e Acordos Financeiros</h3>
            <p>
              A plataforma é isenta na questão de cobrança, fiança e coisas parecidas, sejam com os Clientes ou com os Transportadores. Todas as negociações, pagamentos e acordos financeiros são de responsabilidade exclusiva das partes envolvidas (Cliente e Transportador).
            </p>
          </div>

          <div className="p-4 bg-green-900/20 rounded-lg border border-green-500/30">
            <h3 className="font-bold text-lg text-green-300 mb-3 flex items-center gap-2">
              <ListChecks />
              Critérios de Aprovação para Transportadores
            </h3>
            <ul className="list-disc list-inside space-y-2 text-green-200">
              <li>
                  <div className="flex items-center gap-3">
                      <Check className="h-5 w-5 flex-shrink-0" />
                      <span><strong className="text-white">ANTT:</strong> Registro Nacional de Transportadores Rodoviários de Cargas ativo.</span>
                  </div>
              </li>
              <li>
                  <div className="flex items-center gap-3">
                      <Check className="h-5 w-5 flex-shrink-0" />
                      <span><strong className="text-white">Renavam:</strong> Verificado para garantir a regularidade do veículo.</span>
                  </div>
              </li>
              <li>
                  <div className="flex items-center gap-3">
                      <Check className="h-5 w-5 flex-shrink-0" />
                      <span><strong className="text-white">Comprovante de residência:</strong> Exigido para confirmação da origem do transportador.</span>
                  </div>
              </li>
              <li>
                  <div className="flex items-center gap-3">
                      <Check className="h-5 w-5 flex-shrink-0" />
                      <span><strong className="text-white">CNH:</strong> Documento de habilitação do motorista válido.</span>
                  </div>
              </li>
            </ul>
          </div>

          <p className="text-sm text-center text-gray-400 pt-4">
            Ao utilizar nossos serviços, você concorda e aceita todos os termos descritos acima.
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default Disclaimer;