import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Plus, User, Phone, Mail, MapPin, Edit, Trash2, Search, Building, ShieldCheck, Clock, ShieldX, FileUp, PackageCheck, Loader2, Banknote, KeyRound, Wallet } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useData } from '@/contexts/DataContext';

const ClientsManager = () => {
  const { clients, freightOrders, addClient, updateClient, loading } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingClient, setEditingClient] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    address_proof: null,
    bank_name: '',
    agency: '',
    account_number: '',
    pix_key: '',
  });
  const { toast } = useToast();

  const clientOrderCounts = useMemo(() => {
    const counts = {};
    if (freightOrders) {
      freightOrders.forEach(order => {
        if (order.status === 'completed') {
          counts[order.client_id] = (counts[order.client_id] || 0) + 1;
        }
      });
    }
    return counts;
  }, [freightOrders]);

  const filteredClients = useMemo(() => {
    if (!clients) return [];
    return clients.filter(client =>
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [clients, searchTerm]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (editingClient) {
      const { id, ...updateData } = formData;
      await updateClient(editingClient.id, updateData);
      toast({
        title: "Cliente atualizado!",
        description: "Os dados do cliente foram atualizados com sucesso.",
      });
    } else {
      await addClient(formData);
      toast({
        title: "Cliente cadastrado!",
        description: "Novo cliente foi adicionado e aguarda verificação.",
      });
    }

    resetForm();
    setIsDialogOpen(false);
  };

  const handleEdit = (client) => {
    setFormData({ ...getInitialFormData(), ...client, address_proof: null });
    setEditingClient(client);
    setIsDialogOpen(true);
  };

  const handleDelete = (clientId) => {
    toast({
      title: "Ação não implementada!",
      description: "A exclusão de clientes será implementada em breve.",
    });
  };

  const getInitialFormData = () => ({
    name: '', phone: '', email: '', address: '', address_proof: null,
    bank_name: '', agency: '', account_number: '', pix_key: '',
  });

  const resetForm = () => {
    setFormData(getInitialFormData());
    setEditingClient(null);
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

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="h-8 w-8 animate-spin text-blue-400" />
        <p className="ml-4 text-white text-xl">Carregando clientes...</p>
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
          <h1 className="text-3xl font-bold gradient-text mb-2">Clientes</h1>
          <p className="text-gray-400">Gerencie os clientes que precisam de transporte</p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="btn-gradient" onClick={resetForm}>
              <Plus className="h-4 w-4 mr-2" />
              Novo Cliente
            </Button>
          </DialogTrigger>
          <DialogContent className="glass-effect border-white/20 text-white max-w-2xl">
            <DialogHeader>
              <DialogTitle className="gradient-text text-2xl">
                {editingClient ? 'Editar Cliente' : 'Novo Cliente'}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <ScrollArea className="max-h-[70vh] pr-6">
                <div className="space-y-6 p-1">
                  <h3 className="font-semibold text-xl text-blue-300 border-b border-blue-300/20 pb-2">Informações Pessoais</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="name" className="text-base">Nome Completo / Contato</Label>
                      <Input id="name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="bg-white/10 border-white/20 text-white mt-2 text-base p-4" required />
                    </div>
                    <div>
                      <Label htmlFor="phone" className="text-base">Telefone</Label>
                      <Input id="phone" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="bg-white/10 border-white/20 text-white mt-2 text-base p-4" required />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="email" className="text-base">Email</Label>
                      <Input id="email" type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="bg-white/10 border-white/20 text-white mt-2 text-base p-4" required />
                    </div>
                    <div>
                      <Label htmlFor="address" className="text-base">Endereço Principal</Label>
                      <Input id="address" value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value})} className="bg-white/10 border-white/20 text-white mt-2 text-base p-4" required />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="address_proof" className="text-base">Comprovante de Residência (Opcional)</Label>
                    <div className="mt-2 flex items-center justify-center w-full">
                      <label htmlFor="address_proof" className="flex flex-col items-center justify-center w-full h-32 border-2 border-white/20 border-dashed rounded-lg cursor-pointer bg-white/5 hover:bg-white/10">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <FileUp className="w-8 h-8 mb-4 text-gray-400" />
                          <p className="mb-2 text-sm text-gray-400">
                            {formData.address_proof ? <span className="font-semibold text-green-400">{formData.address_proof.name}</span> : <><span className="font-semibold">Clique para enviar</span> ou arraste</>}
                          </p>
                          <p className="text-xs text-gray-500">PDF, PNG, JPG</p>
                        </div>
                        <Input id="address_proof" type="file" className="hidden" onChange={(e) => setFormData({...formData, address_proof: e.target.files[0]})} />
                      </label>
                    </div>
                  </div>

                  <h3 className="font-semibold text-xl text-blue-300 border-b border-blue-300/20 pb-2 pt-4">Dados Bancários (Para Bônus de Indicação)</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="bank_name" className="text-base flex items-center gap-2"><Banknote size={16}/> Banco</Label>
                      <Input id="bank_name" value={formData.bank_name || ''} onChange={(e) => setFormData({...formData, bank_name: e.target.value})} className="bg-white/10 border-white/20 text-white mt-2 text-base p-4" />
                    </div>
                     <div>
                      <Label htmlFor="agency" className="text-base flex items-center gap-2"><Building size={16}/> Agência</Label>
                      <Input id="agency" value={formData.agency || ''} onChange={(e) => setFormData({...formData, agency: e.target.value})} className="bg-white/10 border-white/20 text-white mt-2 text-base p-4" />
                    </div>
                  </div>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <div>
                      <Label htmlFor="account_number" className="text-base flex items-center gap-2"><Wallet size={16}/> Conta</Label>
                      <Input id="account_number" value={formData.account_number || ''} onChange={(e) => setFormData({...formData, account_number: e.target.value})} className="bg-white/10 border-white/20 text-white mt-2 text-base p-4" />
                    </div>
                     <div>
                      <Label htmlFor="pix_key" className="text-base flex items-center gap-2"><KeyRound size={16}/> Chave Pix</Label>
                      <Input id="pix_key" value={formData.pix_key || ''} onChange={(e) => setFormData({...formData, pix_key: e.target.value})} className="bg-white/10 border-white/20 text-white mt-2 text-base p-4" />
                    </div>
                  </div>
                </div>
              </ScrollArea>
              <Button type="submit" className="w-full btn-gradient mt-6 text-lg py-6">
                {editingClient ? 'Atualizar Cliente' : 'Cadastrar Cliente'}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input placeholder="Buscar clientes..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10 bg-white/10 border-white/20 text-white" />
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredClients.map((client, index) => (
          <motion.div key={client.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.1 }}>
            <Card className="glass-effect border-white/20 card-hover flex flex-col justify-between h-full">
              <div>
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg">
                        <User className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-white text-lg">{client.name}</CardTitle>
                        {getStatusBadge(client.status)}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon" onClick={() => handleEdit(client)} className="text-blue-400 hover:bg-blue-500/20"><Edit className="h-4 w-4" /></Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(client.id)} className="text-red-400 hover:bg-red-500/20"><Trash2 className="h-4 w-4" /></Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3 pt-3">
                  <div className="flex items-center gap-2 text-gray-300"><Phone className="h-4 w-4" /><span className="text-sm">{client.phone}</span></div>
                  <div className="flex items-center gap-2 text-gray-300"><Mail className="h-4 w-4" /><span className="text-sm">{client.email}</span></div>
                  <div className="flex items-center gap-2 text-gray-300"><MapPin className="h-4 w-4" /><span className="text-sm">{client.address}</span></div>
                </CardContent>
              </div>
              <div className="p-4 pt-2">
                <div className="flex items-center gap-2 text-teal-300 p-2 bg-teal-500/10 rounded-md border border-teal-500/20">
                  <PackageCheck className="h-5 w-5" />
                  <span className="text-sm font-medium">{clientOrderCounts[client.id] || 0} fretes concluídos</span>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {filteredClients.length === 0 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
          <User className="h-16 w-16 mx-auto text-gray-400 mb-4" />
          <p className="text-gray-400 text-lg">{searchTerm ? 'Nenhum cliente encontrado' : 'Nenhum cliente cadastrado'}</p>
          <p className="text-gray-500 text-sm mt-2">{searchTerm ? 'Tente buscar com outros termos' : 'Clique em "Novo Cliente" para começar'}</p>
        </motion.div>
      )}
    </div>
  );
};

export default ClientsManager;