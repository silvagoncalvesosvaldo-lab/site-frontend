import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Award, Shield, CheckCircle } from 'lucide-react';
import { Helmet } from 'react-helmet';

const LoyaltyProgram = ({ completedFreightsCount, loyaltyTiers }) => {
  const safeTiers = {
    silver: { freights: 6, discount: 5, ...loyaltyTiers?.silver },
    gold: { freights: 16, discount: 10, ...loyaltyTiers?.gold },
  };

  const tiers = {
    bronze: { name: 'Bronze', freights: 0, next: safeTiers.silver.freights, benefits: ['Acesso à plataforma', 'Suporte padrão'], iconColor: 'text-orange-400' },
    silver: { name: 'Prata', freights: safeTiers.silver.freights, next: safeTiers.gold.freights, benefits: [`${safeTiers.silver.discount}% de desconto na taxa`, 'Selo Prata no perfil'], iconColor: 'text-gray-300' },
    gold: { name: 'Ouro', freights: safeTiers.gold.freights, next: Infinity, benefits: [`${safeTiers.gold.discount}% de desconto na taxa`, 'Selo Ouro no perfil', 'Suporte prioritário'], iconColor: 'text-yellow-400' }
  };

  let currentTierKey = 'bronze';
  if (completedFreightsCount >= tiers.gold.freights) {
    currentTierKey = 'gold';
  } else if (completedFreightsCount >= tiers.silver.freights) {
    currentTierKey = 'silver';
  }

  const currentTier = tiers[currentTierKey];
  const nextTierKey = currentTierKey === 'bronze' ? 'silver' : (currentTierKey === 'silver' ? 'gold' : null);
  const nextTier = nextTierKey ? tiers[nextTierKey] : null;

  const progress = nextTier && (nextTier.freights - currentTier.freights > 0)
    ? ((completedFreightsCount - currentTier.freights) / (nextTier.freights - currentTier.freights)) * 100
    : 100;

  const freightsToNextTier = nextTier ? Math.max(0, nextTier.freights - completedFreightsCount) : 0;

  return (
    <>
      <Helmet>
        <title>Plano de Fidelidade - Os Melhores do Transporte</title>
        <meta name="description" content="Acompanhe seu progresso e desbloqueie benefícios exclusivos no nosso Plano de Fidelidade." />
      </Helmet>
      <div className="space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold gradient-text-yellow mb-2">Plano de Fidelidade</h1>
          <p className="text-gray-400">Sua lealdade é recompensada. Veja seus benefícios e como progredir!</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className="glass-effect border-yellow-500/30">
            <CardHeader className="text-center">
              <div className="flex justify-center items-center gap-4">
                <Award className={`h-12 w-12 ${currentTier.iconColor}`} />
                <div>
                  <CardDescription className="text-gray-300">Seu nível atual</CardDescription>
                  <CardTitle className={`text-4xl font-bold ${currentTier.iconColor}`}>{currentTier.name}</CardTitle>
                </div>
              </div>
            </CardHeader>
            <CardContent className="text-center">
                <p className="text-gray-400 mb-2">Você completou</p>
                <p className="text-5xl font-bold text-white mb-6">{completedFreightsCount} <span className="text-2xl font-normal text-gray-300">fretes</span></p>

                {nextTier && (
                    <div className="max-w-md mx-auto space-y-3">
                        <div className="flex justify-between text-sm text-gray-400">
                            <span>Nível {currentTier.name} ({currentTier.freights} fretes)</span>
                            <span>Nível {nextTier.name} ({nextTier.freights} fretes)</span>
                        </div>
                        <Progress value={progress} className="h-3" indicatorClassName="bg-gradient-to-r from-yellow-400 to-orange-500" />
                        <p className="text-white mt-2">
                            Faltam <span className="font-bold text-yellow-300">{freightsToNextTier}</span> fretes para o próximo nível!
                        </p>
                    </div>
                )}
                 {currentTierKey === 'gold' && (
                    <p className="text-yellow-300 font-semibold">Parabéns! Você alcançou o nível máximo!</p>
                )}
            </CardContent>
          </Card>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Object.entries(tiers).map(([key, tier], index) => (
                <motion.div
                    key={key}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                >
                    <Card className={`glass-effect h-full ${currentTierKey === key ? `border-2 ${key === 'gold' ? 'border-yellow-400' : key === 'silver' ? 'border-gray-300' : 'border-orange-400'}` : 'border-white/20'}`}>
                        <CardHeader>
                            <CardTitle className={`flex items-center gap-2 ${tier.iconColor}`}>
                                <Award className="h-6 w-6" /> Nível {tier.name}
                            </CardTitle>
                            <CardDescription className="text-gray-400">A partir de {tier.freights} fretes</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="font-semibold text-white mb-3">Benefícios:</p>
                            <ul className="space-y-2 text-gray-300">
                                {tier.benefits.map((benefit, i) => (
                                    <li key={i} className="flex items-center gap-2">
                                        <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0" />
                                        <span>{benefit}</span>
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>
                </motion.div>
            ))}
        </div>
      </div>
    </>
  );
};

export default LoyaltyProgram;