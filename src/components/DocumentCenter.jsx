import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { FileText, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { useData } from '@/contexts/DataContext';

const getDocumentStatus = (expiryDate) => {
  if (!expiryDate) return { text: 'Pendente', variant: 'secondary' };
  const today = new Date();
  const expiry = new Date(expiryDate);
  const diffTime = expiry - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays < 0) return { text: `Vencido há ${Math.abs(diffDays)} dias`, variant: 'destructive' };
  if (diffDays <= 30) return { text: `Vence em ${diffDays} dias`, variant: 'warning' };
  return { text: 'Em dia', variant: 'success' };
};

const DocumentCenter = () => {
  const { drivers, updateDriver, loading } = useData();
  const { toast } = useToast();
  const [editingDriver, setEditingDriver] = useState(null);
  const [dates, setDates] = useState({ cnh_expiry: '', antt_expiry: '', insurance_expiry: '' });

  const handleEditClick = (driver) => {
    setEditingDriver(driver);
    setDates({
      cnh_expiry: driver.cnh_expiry || '',
      antt_expiry: driver.antt_expiry || '',
      insurance_expiry: driver.insurance_expiry || ''
    });
  };

  const handleSave = () => {
    if (!editingDriver) return;

    updateDriver(editingDriver.id, dates);
    setEditingDriver(null);
    toast({
      title: 'Sucesso!',
      description: `Documentos de ${editingDriver.name} atualizados.`,
      className: 'bg-green-500 text-white'
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="h-8 w-8 animate-spin text-blue-400" />
        <p className="ml-4 text-white text-xl">Carregando documentos...</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <Card className="glass-effect border-white/20">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl font-bold gradient-text flex items-center gap-3">
                <FileText className="h-8 w-8" />
                Central de Documentos
              </CardTitle>
              <CardDescription className="text-gray-400">
                Monitore a validade dos documentos de todos os transportadores.
              </CardDescription>
            </div>
            <div className="flex gap-4 items-center text-sm text-gray-400">
                <span className="flex items-center gap-2"><Badge className="bg-green-500 w-3 h-3 p-0" /> Em dia</span>
                <span className="flex items-center gap-2"><Badge className="bg-yellow-500 w-3 h-3 p-0" /> Vencendo</span>
                <span className="flex items-center gap-2"><Badge className="bg-red-500 w-3 h-3 p-0" /> Vencido</span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-white/10 hover:bg-white/5">
                  <TableHead className="text-white">Transportador</TableHead>
                  <TableHead className="text-white">Validade CNH</TableHead>
                  <TableHead className="text-white">Validade ANTT</TableHead>
                  <TableHead className="text-white">Validade Seguro</TableHead>
                  <TableHead className="text-right text-white">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {(drivers || []).map((driver) => {
                  const cnhStatus = getDocumentStatus(driver.cnh_expiry);
                  const anttStatus = getDocumentStatus(driver.antt_expiry);
                  const insuranceStatus = getDocumentStatus(driver.insurance_expiry);
                  return (
                    <TableRow key={driver.id} className="border-white/10">
                      <TableCell className="font-medium text-white">{driver.name}</TableCell>
                      <TableCell>
                        <Badge variant={cnhStatus.variant}>{cnhStatus.text}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={anttStatus.variant}>{anttStatus.text}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={insuranceStatus.variant}>{insuranceStatus.text}</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="outline" size="sm" onClick={() => handleEditClick(driver)}>
                          Gerenciar
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
      
      <Dialog open={!!editingDriver} onOpenChange={() => setEditingDriver(null)}>
        <DialogContent className="glass-effect border-white/20 text-white">
          <DialogHeader>
            <DialogTitle>Gerenciar Documentos de {editingDriver?.name}</DialogTitle>
          </DialogHeader>
          <div className="py-4 space-y-4">
            <div>
              <Label htmlFor="cnh_expiry">Data de Validade da CNH</Label>
              <Input id="cnh_expiry" type="date" value={dates.cnh_expiry} onChange={e => setDates({...dates, cnh_expiry: e.target.value})} className="bg-white/10 border-white/20" />
            </div>
            <div>
              <Label htmlFor="antt_expiry">Data de Validade da ANTT</Label>
              <Input id="antt_expiry" type="date" value={dates.antt_expiry} onChange={e => setDates({...dates, antt_expiry: e.target.value})} className="bg-white/10 border-white/20" />
            </div>
            <div>
              <Label htmlFor="insurance_expiry">Data de Validade do Seguro</Label>
              <Input id="insurance_expiry" type="date" value={dates.insurance_expiry} onChange={e => setDates({...dates, insurance_expiry: e.target.value})} className="bg-white/10 border-white/20" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setEditingDriver(null)}>Cancelar</Button>
            <Button className="btn-gradient" onClick={handleSave}>Salvar Alterações</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
};

export default DocumentCenter;