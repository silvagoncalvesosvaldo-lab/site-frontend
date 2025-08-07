import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { HelpCircle, Search, MessageSquare, Send, Gavel, ShieldQuestion, Gift, Calendar } from 'lucide-react';
import { Helmet } from 'react-helmet';
import { toast } from '@/components/ui/use-toast';

const faqData = [
  {
    question: 'Como funciona o pagamento seguro?',
    answer: 'O cliente paga o valor total do frete na plataforma. O dinheiro fica retido em segurança. Assim que o pagamento é confirmado, liberamos um adiantamento para o motorista. O restante é pago após a conclusão do serviço.',
    category: 'cliente'
  },
  {
    question: 'Como funciona o rastreamento da minha carga?',
    answer: 'A plataforma oferece um sistema de rastreamento simulado. Assim que o motorista inicia a viagem, você pode acompanhar um ícone do veículo se movendo no mapa, que representa o progresso estimado da viagem.',
    category: 'cliente'
  },
  {
    question: 'Como faço para enviar uma proposta de frete?',
    answer: 'Navegue até o "Mural de Orçamentos", encontre uma solicitação que lhe interesse e clique em "Enviar Proposta". Insira o valor do seu orçamento e envie. O cliente será notificado e poderá aceitar sua proposta.',
    category: 'motorista'
  },
  {
    question: 'O que acontece se minha carga for danificada?',
    answer: 'Nossa plataforma atua como intermediária, conectando clientes a transportadores. A responsabilidade pela segurança da carga é do transportador. Recomendamos que sempre verifique o seguro e as credenciais do motorista antes de fechar negócio.',
    category: 'cliente'
  },
  {
    question: 'Quando recebo o pagamento pelo meu serviço?',
    answer: 'Você recebe um adiantamento (configurável pelo administrador) logo após o cliente efetuar o pagamento na plataforma. O valor restante é liberado para você assim que o frete é marcado como "Concluído" pelo cliente.',
    category: 'motorista'
  },
  {
    question: 'Qual a comissão da plataforma?',
    answer: 'Para manter a plataforma funcionando e oferecer suporte, cobramos uma pequena taxa de comissão sobre o valor de cada frete. Essa taxa é definida pelo administrador e é transparente para você no momento da proposta. Acreditamos em uma parceria justa!',
    category: 'motorista'
  }
];

const policiesData = [
  {
    question: 'Qual a validade de um orçamento?',
    answer: 'Todo orçamento enviado por um transportador através da plataforma é válido por 15 dias corridos. Após esse período, pode ser necessário solicitar um novo orçamento.',
  },
  {
    question: 'Como funciona o cancelamento de um frete?',
    answer: 'Em caso de cancelamento por qualquer uma das partes, a negociação de valores e eventuais ressarcimentos são de responsabilidade exclusiva do cliente e do transportador. A plataforma não interfere nessas negociações.',
  },
  {
    question: 'Existe taxa se eu (cliente) cancelar um serviço?',
    answer: 'Sim. Caso o cliente cancele um serviço após o pagamento, será aplicada uma taxa de cancelamento de 10% sobre o valor já pago para cobrir custos operacionais. O valor referente à reserva do transportador é negociado diretamente com ele.',
  },
  {
    question: 'Qual a responsabilidade da plataforma?',
    answer: 'Nós não nos responsabilizamos pelas negociações diretas entre cliente e transportador, nem assumimos responsabilidade caso alguma das partes não cumpra com o acordo. Nossa função é conectar as partes e garantir a segurança do pagamento.',
  },
  {
    question: 'Como confirmo que a entrega foi concluída?',
    answer: 'O cliente tem a obrigação de informar na plataforma que a entrega foi concluída. Para reforçar, o motorista também deve enviar um comprovante de entrega (com data e assinatura do cliente) e fotos do veículo descarregado (placa visível). Se houver múltiplas entregas, isso deve ser especificado no comprovante e confirmado pelo cliente na plataforma.',
  },
];

const referralPoliciesData = [
  {
    question: 'Como eu ganho bônus por indicar amigos?',
    answer: 'É simples! Na seção "Indique e Ganhe", você encontrará um link exclusivo. Quando um amigo se cadastrar com seu link e concluir o primeiro frete, você ganha um bônus em dinheiro, cujo valor é definido pelo administrador da plataforma.',
  },
  {
    question: 'Como e quando recebo meu bônus?',
    answer: 'Os bônus acumulados são pagos no final de cada mês, depositados diretamente na conta bancária que você informou em seu perfil. Por isso, é essencial manter seus dados bancários atualizados!',
  },
  {
    question: 'O amigo que eu indiquei ganha alguma coisa?',
    answer: 'Sim! Ao se cadastrar com o seu link, seu amigo receberá um desconto especial na taxa de serviço do primeiro frete. A porcentagem do desconto varia conforme o tipo de transporte.',
  },
  {
    question: 'Onde posso ver minhas indicações e bônus?',
    answer: 'Tudo fica registrado na seção "Indique e Ganhe". Lá você pode acompanhar o status dos seus amigos indicados e o total de bônus que você já acumulou.',
  },
];

const HelpCenter = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('geral');
  const [contactForm, setContactForm] = useState({ email: '', message: '' });

  const handleContactFormChange = (e) => {
    const { name, value } = e.target;
    setContactForm(prev => ({ ...prev, [name]: value }));
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    toast({
      title: "Mensagem Enviada!",
      description: "Obrigado por entrar em contato. Responderemos em breve!",
    });
    setContactForm({ email: '', message: '' });
  };

  const filteredFaqs = faqData.filter(faq =>
    (activeTab === 'geral' || faq.category === activeTab || faq.category === 'geral') &&
    (faq.question.toLowerCase().includes(searchTerm.toLowerCase()) || faq.answer.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const filteredPolicies = policiesData.filter(policy =>
    policy.question.toLowerCase().includes(searchTerm.toLowerCase()) || policy.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredReferralPolicies = referralPoliciesData.filter(policy =>
    policy.question.toLowerCase().includes(searchTerm.toLowerCase()) || policy.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Helmet>
        <title>Central de Ajuda - Os Melhores do Transporte</title>
        <meta name="description" content="Encontre respostas para suas dúvidas, conheça nossas políticas e entre em contato com o suporte." />
      </Helmet>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white p-4 sm:p-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <div className="inline-block p-4 bg-white/10 rounded-full mb-4">
              <ShieldQuestion className="h-12 w-12 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-2">
              Central de Ajuda & Suporte
            </h1>
            <p className="text-lg text-gray-300">Encontre respostas para suas dúvidas ou entre em contato conosco.</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <Input
                    placeholder="Pesquise por uma dúvida..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-12 pr-4 py-3 text-lg bg-white/10 border-white/20 text-white rounded-full h-14"
                  />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="flex gap-2 p-1 bg-white/10 rounded-full">
                  <Button onClick={() => setActiveTab('geral')} variant={activeTab === 'geral' ? 'default' : 'ghost'} className={`w-full rounded-full h-10 ${activeTab === 'geral' && 'btn-gradient'}`}>Geral</Button>
                  <Button onClick={() => setActiveTab('cliente')} variant={activeTab === 'cliente' ? 'default' : 'ghost'} className={`w-full rounded-full h-10 ${activeTab === 'cliente' && 'btn-gradient'}`}>Para Clientes</Button>
                  <Button onClick={() => setActiveTab('motorista')} variant={activeTab === 'motorista' ? 'default' : 'ghost'} className={`w-full rounded-full h-10 ${activeTab === 'motorista' && 'btn-gradient'}`}>Para Motoristas</Button>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2"><HelpCircle className="h-6 w-6" /> Perguntas Frequentes</h2>
                <Accordion type="single" collapsible className="w-full space-y-2">
                  {filteredFaqs.map((faq, index) => (
                    <AccordionItem key={index} value={`faq-item-${index}`} className="glass-effect rounded-lg border-white/20 px-4">
                      <AccordionTrigger className="text-white text-left hover:no-underline">{faq.question}</AccordionTrigger>
                      <AccordionContent className="text-gray-300">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
                {filteredFaqs.length === 0 && searchTerm && <p className="text-center text-gray-400 py-8">Nenhum resultado encontrado nas Perguntas Frequentes.</p>}
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <h2 className="text-2xl font-bold text-white mb-4 mt-8 flex items-center gap-2"><Gift className="h-6 w-6 text-green-400" /> Programa Indique e Ganhe</h2>
                <Accordion type="single" collapsible className="w-full space-y-2">
                  {filteredReferralPolicies.map((policy, index) => (
                    <AccordionItem key={index} value={`referral-policy-item-${index}`} className="glass-effect rounded-lg border-white/20 px-4">
                      <AccordionTrigger className="text-white text-left hover:no-underline">{policy.question}</AccordionTrigger>
                      <AccordionContent className="text-gray-300">
                        {policy.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
                {filteredReferralPolicies.length === 0 && searchTerm && <p className="text-center text-gray-400 py-8">Nenhum resultado encontrado nas Políticas de Indicação.</p>}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <h2 className="text-2xl font-bold text-white mb-4 mt-8 flex items-center gap-2"><Gavel className="h-6 w-6" /> Políticas e Regras Gerais</h2>
                <Accordion type="single" collapsible className="w-full space-y-2">
                  {filteredPolicies.map((policy, index) => (
                    <AccordionItem key={index} value={`policy-item-${index}`} className="glass-effect rounded-lg border-white/20 px-4">
                      <AccordionTrigger className="text-white text-left hover:no-underline">{policy.question}</AccordionTrigger>
                      <AccordionContent className="text-gray-300">
                        {policy.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
                {filteredPolicies.length === 0 && searchTerm && <p className="text-center text-gray-400 py-8">Nenhum resultado encontrado nas Políticas e Regras.</p>}
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="space-y-6"
            >
              <Card className="glass-effect border-white/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <MessageSquare className="h-5 w-5" />
                    Não encontrou o que procurava?
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleContactSubmit} className="space-y-4">
                    <Input 
                      type="email" 
                      name="email"
                      placeholder="Seu e-mail" 
                      className="bg-white/10 border-white/20 text-white" 
                      value={contactForm.email}
                      onChange={handleContactFormChange}
                      required
                    />
                    <textarea
                      name="message"
                      placeholder="Descreva sua dúvida aqui..."
                      rows="5"
                      className="w-full p-2 bg-white/10 border border-white/20 rounded-md text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                      value={contactForm.message}
                      onChange={handleContactFormChange}
                      required
                    />
                    <Button type="submit" className="w-full btn-gradient">
                      <Send className="h-4 w-4 mr-2" />
                      Enviar Mensagem
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HelpCenter;