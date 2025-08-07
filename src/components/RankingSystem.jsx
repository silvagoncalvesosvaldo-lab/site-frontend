import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Star, Truck, TrendingUp, Gem, Shield, Award, HelpCircle } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from './ui/button';


const calculateScore = (driver, orders) => {
  const driverOrders = orders.filter(o => o.driverId === driver.id && o.status === 'completed');
  const completedJobs = driverOrders.length;
  
  const totalRating = driverOrders.reduce((sum, order) => sum + (order.driverRating?.rating || 0), 0);
  const averageRating = completedJobs > 0 ? totalRating / completedJobs : 0;

  const ratingScore = averageRating * 20; // Max 100 points
  const jobsScore = Math.min(completedJobs * 5, 100); // Max 100 points
  
  return Math.round(ratingScore + jobsScore);
};

const getRank = (score) => {
  if (score >= 200) return { name: 'Diamante', icon: <Gem className="h-5 w-5 text-cyan-400" />, color: 'bg-cyan-500/10 text-cyan-300 border-cyan-400' };
  if (score >= 150) return { name: 'Ouro', icon: <Award className="h-5 w-5 text-yellow-400" />, color: 'bg-yellow-500/10 text-yellow-300 border-yellow-400' };
  if (score >= 75) return { name: 'Prata', icon: <Shield className="h-5 w-5 text-slate-400" />, color: 'bg-slate-500/10 text-slate-300 border-slate-400' };
  return { name: 'Bronze', icon: <Star className="h-5 w-5 text-orange-400" />, color: 'bg-orange-500/10 text-orange-300 border-orange-400' };
};

const RankingSystem = ({ drivers, orders, currentDriverId }) => {
  
  const rankedDrivers = useMemo(() => {
    return drivers
      .map(driver => {
        const score = calculateScore(driver, orders);
        const rank = getRank(score);
        const driverOrders = orders.filter(o => o.driverId === driver.id && o.status === 'completed');
        const completedJobs = driverOrders.length;
        const totalRating = driverOrders.reduce((sum, order) => sum + (order.driverRating?.rating || 0), 0);
        const averageRating = completedJobs > 0 ? totalRating / completedJobs : 0;

        return {
          ...driver,
          score,
          rank,
          completedJobs,
          averageRating,
        };
      })
      .sort((a, b) => b.score - a.score);
  }, [drivers, orders]);

  const currentUserRank = currentDriverId ? rankedDrivers.find(d => d.id === currentDriverId) : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold gradient-text mb-2">Ranking de Motoristas</h1>
          <p className="text-gray-400">Motoristas de elite que se destacam na plataforma.</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className="text-gray-300 border-gray-600 hover:bg-gray-700 hover:text-white">
              <HelpCircle className="h-4 w-4 mr-2" />
              Como funciona?
            </Button>
          </DialogTrigger>
          <DialogContent className="glass-effect text-white border-white/20">
            <DialogHeader>
              <DialogTitle className="gradient-text">Entendendo o Sistema de Ranking</DialogTitle>
              <DialogDescription className="text-gray-400">
                Nosso ranking é projetado para recompensar profissionalismo e dedicação.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <p>A pontuação de cada motorista é calculada com base em dois fatores principais:</p>
              <ul className="list-disc list-inside space-y-2 text-gray-300 pl-4">
                <li><strong>Avaliação Média:</strong> A nota que você recebe dos clientes. Cada estrela conta! (Peso: 66%)</li>
                <li><strong>Fretes Concluídos:</strong> O número de trabalhos finalizados com sucesso. (Peso: 34%)</li>
              </ul>
              <p>Com base na sua pontuação, você alcança novos níveis:</p>
               <div className="grid grid-cols-2 gap-2">
                 <Badge className={getRank(10).color + " p-2 justify-center"}>Bronze</Badge>
                 <Badge className={getRank(80).color + " p-2 justify-center"}>Prata</Badge>
                 <Badge className={getRank(160).color + " p-2 justify-center"}>Ouro</Badge>
                 <Badge className={getRank(210).color + " p-2 justify-center"}>Diamante</Badge>
               </div>
              <p className="font-bold text-white pt-2">Por que isso é importante?</p>
              <p>Motoristas com ranking mais alto ganham mais visibilidade na plataforma, o que aumenta as chances de conseguir novos fretes. É a nossa forma de valorizar seu excelente trabalho!</p>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {currentUserRank && (
        <Card className="glass-effect-glare border-yellow-400/50">
          <CardHeader>
            <CardTitle className="gradient-text text-2xl">Sua Posição Atual</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className={`p-4 rounded-full ${currentUserRank.rank.color} border border-current`}>
                {React.cloneElement(currentUserRank.rank.icon, { className: "h-10 w-10 text-current" })}
              </div>
              <div>
                <p className="text-3xl font-bold text-white">{currentUserRank.rank.name}</p>
                <p className="text-gray-400">{currentUserRank.name}</p>
              </div>
            </div>
            <div className="text-center sm:text-right">
              <p className="text-4xl font-bold text-white">{currentUserRank.score}</p>
              <p className="text-gray-400">Pontos</p>
            </div>
          </CardContent>
        </Card>
      )}

      <Card className="glass-effect border-white/20">
        <CardHeader>
          <CardTitle className="text-white">Classificação Geral</CardTitle>
          <CardDescription className="text-gray-400">Veja os motoristas mais bem classificados da plataforma.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-white/10">
                <TableHead className="text-white">Posição</TableHead>
                <TableHead className="text-white">Motorista</TableHead>
                <TableHead className="text-white text-center">Ranking</TableHead>
                <TableHead className="text-white text-center">Fretes</TableHead>
                <TableHead className="text-white text-center">Avaliação</TableHead>
                <TableHead className="text-white text-right">Pontuação</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rankedDrivers.map((driver, index) => (
                <TableRow key={driver.id} className={`border-white/10 ${currentDriverId === driver.id ? 'bg-blue-500/10' : ''}`}>
                  <TableCell className="font-medium text-lg text-white">#{index + 1}</TableCell>
                  <TableCell className="text-gray-300">{driver.name}</TableCell>
                  <TableCell className="text-center">
                    <Badge className={driver.rank.color + " gap-2"}>
                      {driver.rank.icon}
                      {driver.rank.name}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center text-gray-300">{driver.completedJobs}</TableCell>
                  <TableCell className="text-center text-gray-300 flex items-center justify-center gap-1">
                    <Star className="h-4 w-4 text-yellow-400" />
                    {driver.averageRating.toFixed(1)}
                  </TableCell>
                  <TableCell className="text-right font-bold text-lg text-white">{driver.score}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default RankingSystem;