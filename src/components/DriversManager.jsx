import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Plus, User, Phone, Mail, Truck, Edit, Trash2, Search, ShieldCheck, Clock, ShieldX, FileUp, Camera, Loader2, Banknote, Building, Wallet, KeyRound } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useData } from '@/contexts/DataContext';

const DriversManager = () => {
  const { drivers, addDriver, updateDriver, loading } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingDriver, setEditingDriver] = useState(null);

  const getInitialFormData = () => ({
    name: '',
    email: '',
    phone: '',
    vehicle_plate: '',
    renavam: '',
    antt: '',
    bank_name: '',
    agency: '',
    account_number: '',
    pix_key: '',
    front_vehicle_photo: null,
    rear_vehicle_photo: null,
    address_proof: null,
    vehicle_type: '',
    cpf: '',
    rg: '',
    cnh: null,
    crlv: null,
  });

  const [formData, setFormData] = useState(getInitialFormData());
  const { toast } = useToast();

  const filteredDrivers = useMemo(() => {
    if (!drivers) return [];
    return drivers.filter(driver =>
      driver.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      driver.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (driver.vehicle_plate && driver.vehicle_plate.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [drivers, searchTerm]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!editingDriver && (!formData.front_vehicle_photo || !formData.rear_vehicle_photo)) {
      toast({
        title: "Fotos do veículo são obrigatórias!",
        description: "Por favor, envie as fotos da frente e da traseira do veículo.",
        variant: "destructive",
      });
      return;
    }
    
    if (editingDriver) {
      const { id, ...updateData } = formData;
      await updateDriver(editingDriver.id, updateData);
      toast({
        title: "Motorista atualizado!",
        description: "Os dados do motorista foram atualizados com sucesso.",
      });
    } else {
      await addDriver(formData);
      toast({
        title: "Motorista cadastrado!",
        description: "Novo motorista foi adicionado e aguarda verificação.",
      });
    }

    resetForm();
    setIsDialogOpen(false);
  };

  const handleEdit = (driver) => {
    setFormData({
      ...getInitialFormData(),
      ...driver,
      cnh: null,
      crlv: null,
      address_proof: null,
      front_vehicle_photo: null,
      rear_vehicle_photo: null,
    });
    setEditingDriver(driver);
    setIsDialogOpen(true);
  };

  const handleDelete = (driverId) => {
    // Implement delete logic if needed, for now just a toast
    toast({
      title: "Ação não implementada!",
      description: "A exclusão de motoristas será implementada em breve.",
    });
  };

  const resetForm = () => {
    setFormData(getInitialFormData());
    setEditingDriver(null);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'verified':
        return <Badge className="bg-green-500/20 text-green-400 border-green-500/30 mt-1"><ShieldCheck className="h-3 w-3 mr-1" />Verificado</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30 mt-1"><Clock className="h-3 w-3 mr-1" />Pendente</Badge>;
      case 'rejected':
        return <Badge className="bg-red-500/20 text-red-400 border-red-500/30 mt-1"><ShieldX className="h-3 w-3 mr-1" />Rejeitado</Badge>;
      default:
        return <Badge variant="secondary" className="mt-1">Ativo</Badge>;
    }
  };
  
  const renderLabel = (text, required = false) => (
    <Label htmlFor={text.toLowerCase().replace(/\s/g, '')} className="text-base">
      {text} {required && <span className="text-red-500">*</span>}
    </Label>
  );

  const FileInput = ({ id, label, onFileChange, selectedFile, isOptional = false, required = false }) => (
    <div>
      <Label htmlFor={id} className="text-base">{label} {isOptional && <span className="text-gray-400 text-sm">(Opcional)</span>} {required && <span className="text-red-500">*</span>}</Label>
      <div className="mt-2 flex items-center justify-center w-full">
        <label htmlFor={id} className="flex flex-col items-center justify-center w-full h-32 border-2 border-white/20 border-dashed rounded-lg cursor-pointer bg-white/5 hover:bg-white/10">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <FileUp className="w-8 h-8 mb-4 text-gray-400" />
            <p className="mb-2 text-sm text-gray-400">
              {selectedFile ? <span className="font-semibold text-green-400">{selectedFile.name}</span> : <><span className="font-semibold">Clique para enviar</span> ou arraste</>}
            </p>
            <p className="text-xs text-gray-500">PDF, PNG, JPG</p>
          </div>
          <Input id={id} type="file" className="hidden" onChange={onFileChange} required={required} />
        </label>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="h-8 w-8 animate-spin text-blue-400" />
        <p className="ml-4 text-white text-xl">Carregando motoristas...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold gradient-text mb-2">Motoristas</h1>
          <p className="text-gray-400">Gerencie os motoristas parceiros da plataforma</p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="btn-gradient" onClick={resetForm}>
              <Plus className="h-4 w-4 mr-2" />
              Novo Motorista
            </Button>
          </DialogTrigger>
          <DialogContent className="glass-effect border-white/20 text-white max-w-3xl">
            <DialogHeader>
              <DialogTitle className="gradient-text text-2xl">
                {editingDriver ? 'Editar Motorista' : 'Novo Motorista'}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="flex flex-col max-h-[80vh]">
              <ScrollArea className="flex-grow pr-6">
                <div className="space-y-6 p-1">
                    <h3 className="font-semibold text-xl text-blue-300 border-b border-blue-300/20 pb-2">Informações Pessoais</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>{renderLabel("Nome Completo", true)}<Input id="name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="bg-white/10 mt-2 text-base p-4" required /></div>
                      <div>{renderLabel("Email", true)}<Input id="email" type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="bg-white/10 mt-2 text-base p-4" required /></div>
                    </div>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>{renderLabel("Whatsapp", true)}<Input id="phone" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="bg-white/10 mt-2 text-base p-4" required /></div>
                    </div>

                    <h3 className="font-semibold text-xl text-blue-300 border-b border-blue-300/20 pb-2 pt-4">Dados Bancários</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="bank_name" className="text-base flex items-center gap-2"><Banknote size={16}/> Banco</Label>
                        <Input id="bank_name" value={formData.bank_name || ''} onChange={(e) => setFormData({...formData, bank_name: e.target.value})} className="bg-white/10 mt-2 text-base p-4" />
                      </div>
                       <div>
                        <Label htmlFor="agency" className="text-base flex items-center gap-2"><Building size={16}/> Agência</Label>
                        <Input id="agency" value={formData.agency || ''} onChange={(e) => setFormData({...formData, agency: e.target.value})} className="bg-white/10 mt-2 text-base p-4" />
                      </div>
                    </div>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                       <div>
                        <Label htmlFor="account_number" className="text-base flex items-center gap-2"><Wallet size={16}/> Conta</Label>
                        <Input id="account_number" value={formData.account_number || ''} onChange={(e) => setFormData({...formData, account_number: e.target.value})} className="bg-white/10 mt-2 text-base p-4" />
                      </div>
                       <div>
                        <Label htmlFor="pix_key" className="text-base flex items-center gap-2"><KeyRound size={16}/> Chave Pix</Label>
                        <Input id="pix_key" value={formData.pix_key || ''} onChange={(e) => setFormData({...formData, pix_key: e.target.value})} className="bg-white/10 mt-2 text-base p-4" />
                      </div>
                    </div>

                    <h3 className="font-semibold text-xl text-blue-300 border-b border-blue-300/20 pb-2 pt-4">Documentos Obrigatórios</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>{renderLabel("Número do Renavam", true)}<Input id="renavam" value={formData.renavam} onChange={(e) => setFormData({...formData, renavam: e.target.value})} className="bg-white/10 mt-2 text-base p-4" required /></div>
                      <div>{renderLabel("Número de Registro ANTT", true)}<Input id="antt" value={formData.antt} onChange={(e) => setFormData({...formData, antt: e.target.value})} className="bg-white/10 mt-2 text-base p-4" required /></div>
                      <div>{renderLabel("CPF")}<Input id="cpf" value={formData.cpf} onChange={(e) => setFormData({...formData, cpf: e.target.value})} className="bg-white/10 mt-2 text-base p-4" /></div>
                      <div>{renderLabel("RG")}<Input id="rg" value={formData.rg} onChange={(e) => setFormData({...formData, rg: e.target.value})} className="bg-white/10 mt-2 text-base p-4" /></div>
                    </div>
                    <FileInput id="address_proof" label="Comprovante de Residência" onFileChange={(e) => setFormData({...formData, address_proof: e.target.files[0]})} selectedFile={formData.address_proof} required={!editingDriver} />
                    <FileInput id="cnh" label="CNH" onFileChange={(e) => setFormData({...formData, cnh: e.target.files[0]})} selectedFile={formData.cnh} required={!editingDriver} />

                    <h3 className="font-semibold text-xl text-blue-300 border-b border-blue-300/20 pb-2 pt-4">Veículo</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>{renderLabel("Placa do Veículo", true)}<Input id="vehicle_plate" value={formData.vehicle_plate} onChange={(e) => setFormData({...formData, vehicle_plate: e.target.value})} className="bg-white/10 mt-2 text-base p-4" required /></div>
                      <div>{renderLabel("Tipo de Veículo", false)}<Input id="vehicle_type" value={formData.vehicle_type} onChange={(e) => setFormData({...formData, vehicle_type: e.target.value})} className="bg-white/10 mt-2 text-base p-4" placeholder="Ex: Caminhão Baú, Van, etc."/></div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FileInput id="front_vehicle_photo" label="Foto da Frente do Veículo" onFileChange={(e) => setFormData({...formData, front_vehicle_photo: e.target.files[0]})} selectedFile={formData.front_vehicle_photo} required={!editingDriver} />
                      <FileInput id="rear_vehicle_photo" label="Foto da Traseira do Veículo" onFileChange={(e) => setFormData({...formData, rear_vehicle_photo: e.target.files[0]})} selectedFile={formData.rear_vehicle_photo} required={!editingDriver} />
                    </div>

                    <h3 className="font-semibold text-xl text-blue-300 border-b border-blue-300/20 pb-2 pt-4">Documentos Opcionais</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FileInput id="crlv" label="CRLV" onFileChange={(e) => setFormData({...formData, crlv: e.target.files[0]})} selectedFile={formData.crlv} isOptional />
                    </div>
                </div>
              </ScrollArea>
              <div className="pt-6 flex-shrink-0">
                <Button type="submit" className="w-full btn-gradient text-lg py-6">
                    {editingDriver ? 'Atualizar Motorista' : 'Cadastrar Motorista'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input placeholder="Buscar motoristas..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10 bg-white/10 border-white/20 text-white" />
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDrivers.map((driver, index) => (
          <motion.div key={driver.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.1 }}>
            <Card className="glass-effect border-white/20 card-hover">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg">
                      <User className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-white text-lg">{driver.name}</CardTitle>
                      {getStatusBadge(driver.status)}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon" onClick={() => handleEdit(driver)} className="text-blue-400 hover:bg-blue-500/20"><Edit className="h-4 w-4" /></Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(driver.id)} className="text-red-400 hover:bg-red-500/20"><Trash2 className="h-4 w-4" /></Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3 pt-3">
                <div className="flex items-center gap-2 text-gray-300"><Phone className="h-4 w-4" /><span className="text-sm">{driver.phone}</span></div>
                <div className="flex items-center gap-2 text-gray-300"><Mail className="h-4 w-4" /><span className="text-sm">{driver.email}</span></div>
                <div className="flex items-center gap-2 text-gray-300"><Truck className="h-4 w-4" /><span className="text-sm">{driver.vehicle_type || 'Tipo não informado'} - {driver.vehicle_plate}</span></div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {filteredDrivers.length === 0 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
          <User className="h-16 w-16 mx-auto text-gray-400 mb-4" />
          <p className="text-gray-400 text-lg">{searchTerm ? 'Nenhum motorista encontrado' : 'Nenhum motorista cadastrado'}</p>
          <p className="text-gray-500 text-sm mt-2">{searchTerm ? 'Tente buscar com outros termos' : 'Clique em "Novo Motorista" para começar'}</p>
        </motion.div>
      )}
    </div>
  );
};

export default DriversManager;