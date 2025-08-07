import React, { useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { Wrench, PlusCircle, Trash2, Fuel, Route, DollarSign, Calculator, Info, Save, Gauge } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog';

const TripExpenseManager = ({ orders, setOrders }) => {
  const { toast } = useToast();
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [expenseData, setExpenseData] = useState({});
  const [otherExpense, setOtherExpense] = useState({ description: '', amount: '' });

  const activeOrders = useMemo(() => orders.filter(o => o.status === 'in-progress' || o.status === 'completed'), [orders]);

  useEffect(() => {
    if (selectedOrder) {
      setExpenseData({
        fuelPrice: selectedOrder.expenses?.fuelPrice || '',
        totalFuelConsumed: selectedOrder.expenses?.totalFuelConsumed || '',
        estimatedDistance: selectedOrder.expenses?.estimatedDistance || '',
        actualDistance: selectedOrder.expenses?.actualDistance || '',
        otherExpenses: selectedOrder.expenses?.otherExpenses || [],
      });
    }
  }, [selectedOrder]);

  const handleOpenModal = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setExpenseData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddOtherExpense = () => {
    if (!otherExpense.description || !otherExpense.amount) {
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Preencha a descrição e o valor da despesa.",
      });
      return;
    }
    setExpenseData(prev => ({
      ...prev,
      otherExpenses: [...prev.otherExpenses, { ...otherExpense, amount: parseFloat(otherExpense.amount) }]
    }));
    setOtherExpense({ description: '', amount: '' });
  };

  const handleRemoveOtherExpense = (index) => {
    setExpenseData(prev => ({
      ...prev,
      otherExpenses: prev.otherExpenses.filter((_, i) => i !== index)
    }));
  };

  const handleSaveChanges = () => {
    setOrders(prevOrders => prevOrders.map(o =>
      o.id === selectedOrder.id ? { ...o, expenses: expenseData } : o
    ));
    toast({
      title: "Sucesso!",
      description: "As despesas da viagem foram salvas.",
    });
    setIsModalOpen(false);
  };

  const calculations = useMemo(() => {
    const fuelPrice = parseFloat(expenseData.fuelPrice) || 0;
    const totalFuelConsumed = parseFloat(expenseData.totalFuelConsumed) || 0;
    const actualDistance = parseFloat(expenseData.actualDistance) || 0;

    const averagePerformance = totalFuelConsumed > 0 ? actualDistance / totalFuelConsumed : 0;
    const totalFuelCost = totalFuelConsumed * fuelPrice;
    const totalOtherExpenses = expenseData.otherExpenses?.reduce((sum, exp) => sum + exp.amount, 0) || 0;
    const totalTripCost = totalFuelCost + totalOtherExpenses;
    const orderPrice = selectedOrder?.price || 0;
    const netProfit = orderPrice - totalTripCost;

    return { totalFuelCost, totalOtherExpenses, totalTripCost, netProfit, averagePerformance };
  }, [expenseData, selectedOrder]);

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-3 mb-2">
          <Wrench className="h-8 w-8 text-blue-400" />
          <h1 className="text-3xl font-bold gradient-text">Gestão de Viagens e Despesas</h1>
        </div>
        <p className="text-gray-400">
          Controle os custos de cada frete para entender sua lucratividade real.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Card className="glass-effect border-white/20">
          <CardHeader>
            <CardTitle className="text-white">Fretes Ativos e Concluídos</CardTitle>
            <CardDescription className="text-gray-400">Selecione um frete para gerenciar suas despesas.</CardDescription>
          </CardHeader>
          <CardContent>
            {activeOrders.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Pedido</TableHead>
                    <TableHead>Carga</TableHead>
                    <TableHead>Rota</TableHead>
                    <TableHead className="text-right">Ação</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {activeOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">#{order.id.slice(0, 6)}</TableCell>
                      <TableCell>{order.cargo}</TableCell>
                      <TableCell>{order.origin} → {order.destination}</TableCell>
                      <TableCell className="text-right">
                        <Button onClick={() => handleOpenModal(order)}>
                          <Wrench className="h-4 w-4 mr-2" /> Gerenciar
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="text-center py-12 text-gray-400">
                <Route className="h-12 w-12 mx-auto mb-4" />
                <p className="font-semibold">Nenhum frete em andamento ou concluído.</p>
                <p className="text-sm">Complete fretes para gerenciar suas despesas aqui.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {selectedOrder && (
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="max-w-4xl bg-slate-900 border-slate-700 text-white">
            <DialogHeader>
              <DialogTitle className="text-2xl gradient-text">Gestão de Despesas - Frete #{selectedOrder.id.slice(0, 6)}</DialogTitle>
              <DialogDescription className="text-gray-400">Adicione informações para calcular os custos e o lucro da viagem.</DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-h-[70vh] overflow-y-auto p-2">
              {/* Coluna de Entradas */}
              <div className="space-y-4">
                <Card className="glass-effect border-white/20">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2"><Fuel /> Dados de Combustível</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="fuelPrice">Preço do Combustível (por litro)</Label>
                      <Input id="fuelPrice" name="fuelPrice" type="number" placeholder="Ex: 5.50" value={expenseData.fuelPrice} onChange={handleInputChange} className="bg-slate-800 border-slate-700" />
                    </div>
                    <div>
                      <Label htmlFor="totalFuelConsumed">Total de Combustível Gasto (litros)</Label>
                      <Input id="totalFuelConsumed" name="totalFuelConsumed" type="number" placeholder="Ex: 60.5" value={expenseData.totalFuelConsumed} onChange={handleInputChange} className="bg-slate-800 border-slate-700" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="glass-effect border-white/20">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2"><Route /> Dados da Rota</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="estimatedDistance">Distância Estimada (km)</Label>
                      <Input id="estimatedDistance" name="estimatedDistance" type="number" placeholder="Ex: 500" value={expenseData.estimatedDistance} onChange={handleInputChange} className="bg-slate-800 border-slate-700" />
                    </div>
                    <div>
                      <Label htmlFor="actualDistance">Distância Real Percorrida (km)</Label>
                      <Input id="actualDistance" name="actualDistance" type="number" placeholder="Ex: 520" value={expenseData.actualDistance} onChange={handleInputChange} className="bg-slate-800 border-slate-700" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="glass-effect border-white/20">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2"><DollarSign /> Outras Despesas</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {expenseData.otherExpenses?.map((exp, index) => (
                        <div key={index} className="flex items-center justify-between bg-slate-800/50 p-2 rounded">
                          <p>{exp.description} - R$ {exp.amount.toFixed(2)}</p>
                          <Button variant="destructive" size="icon" onClick={() => handleRemoveOtherExpense(index)} className="h-7 w-7">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-2 mt-4">
                      <Input placeholder="Descrição (Ex: Pedágio)" value={otherExpense.description} onChange={(e) => setOtherExpense(p => ({ ...p, description: e.target.value }))} className="bg-slate-800 border-slate-700" />
                      <Input type="number" placeholder="Valor" value={otherExpense.amount} onChange={(e) => setOtherExpense(p => ({ ...p, amount: e.target.value }))} className="bg-slate-800 border-slate-700 w-32" />
                      <Button onClick={handleAddOtherExpense} size="icon" className="flex-shrink-0">
                        <PlusCircle className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Coluna de Resultados */}
              <div className="space-y-4">
                <Card className="bg-blue-900/30 border-blue-500">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2 text-blue-300"><Calculator /> Resumo Financeiro da Viagem</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Valor Bruto do Frete:</span>
                      <span className="font-bold text-green-400">R$ {selectedOrder.price.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Custo Total de Combustível:</span>
                      <span className="font-bold text-red-400">- R$ {calculations.totalFuelCost.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Outras Despesas:</span>
                      <span className="font-bold text-red-400">- R$ {calculations.totalOtherExpenses.toFixed(2)}</span>
                    </div>
                    <hr className="border-slate-600 my-2" />
                    <div className="flex justify-between items-center text-lg">
                      <span className="text-white">LUCRO LÍQUIDO:</span>
                      <span className={`font-bold ${calculations.netProfit >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                        R$ {calculations.netProfit.toFixed(2)}
                      </span>
                    </div>
                  </CardContent>
                </Card>
                <Card className="glass-effect border-white/20">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2 text-teal-300"><Gauge /> Desempenho do Veículo</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center text-lg">
                      <span className="text-gray-300">Média de Consumo:</span>
                      <span className="font-bold text-white">
                        {calculations.averagePerformance.toFixed(2)} km/l
                      </span>
                    </div>
                    <p className="text-xs text-gray-400 mt-2">Calculado com base na distância real e combustível gasto.</p>
                  </CardContent>
                </Card>
                <div className="p-4 bg-slate-800/50 rounded-lg flex items-start gap-3">
                  <Info className="h-5 w-5 text-blue-400 mt-1 flex-shrink-0" />
                  <p className="text-sm text-gray-400">Lembre-se: este cálculo é uma estimativa. A comissão da plataforma será deduzida do valor bruto do frete, conforme as configurações de ganhos.</p>
                </div>
              </div>
            </div>
            <DialogFooter className="mt-6">
              <DialogClose asChild>
                <Button type="button" variant="secondary">Cancelar</Button>
              </DialogClose>
              <Button type="button" onClick={handleSaveChanges} className="btn-gradient">
                <Save className="h-4 w-4 mr-2" />
                Salvar Despesas
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default TripExpenseManager;