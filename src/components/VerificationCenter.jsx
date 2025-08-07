import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, X, Clock, User, Users, ShieldCheck, Phone, Mail, Truck, Building, FileText, Camera, AlertTriangle, FileBadge, ArrowLeft, Loader2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from '@/components/ui/dialog';
import { useData } from '@/contexts/DataContext';

const VerificationCenter = () => {
  const { drivers, clients, updateDriver, updateClient, loading } = useData();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('drivers');

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="h-8 w-8 animate-spin text-blue-400" />
        <p className="ml-4 text-white text-xl">Carregando centro de verificação...</p>
      </div>
    );
  }

  const pendingDrivers = drivers?.filter(d => d.status === 'pending') || [];
  const pendingClients = clients?.filter(c => c.status === 'pending') || [];

  const handleVerification = (type, id, newStatus) => {
    if (type === 'driver') {
      updateDriver(id, { status: newStatus });
    } else {
      updateClient(id, { status: newStatus });
    }
    toast({
      title: "Status Atualizado!",
      description: `O usuário foi marcado como ${newStatus === 'verified' ? 'Verificado' : 'Rejeitado'}.`,
    });
  };

  const PhotoPreview = ({ photoUrl }) => {
    if (!photoUrl) return null;

    return (
      <Dialog>
        <DialogTrigger asChild>
          <motion.div whileHover={{ scale: 1.05 }} className="cursor-pointer">
            <img 
              src={photoUrl}
              alt="Pré-visualização da foto do veículo"
              className="w-16 h-16 object-cover rounded-md border-2 border-white/20"
            />
          </motion.div>
        </DialogTrigger>
        <DialogContent className="max-w-3xl w-full h-[90vh] bg-black/80 backdrop-blur-lg border-white/20 text-white flex flex-col p-4 overflow-hidden">
          <DialogHeader className="flex-shrink-0">
            <DialogTitle className="text-white">Visualização da Foto</DialogTitle>
          </DialogHeader>
          <div className="flex-grow mt-4 overflow-auto relative">
            <div className="flex items-start justify-center min-h-full">
               <img 
                src={photoUrl}
                alt="Foto do veículo em tamanho real"
                className="max-w-full h-auto object-contain rounded-lg"
              />
            </div>
          </div>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20">
            <DialogClose asChild>
              <Button variant="outline" className="bg-black/50 border-white/20 hover:bg-white/20 backdrop-blur-sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Voltar
              </Button>
            </DialogClose>
          </div>
        </DialogContent>
      </Dialog>
    );
  };

  const UserCard = ({ user, type }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="glass-effect border-white/20">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg">
              <User className="h-5 w-5 text-white" />
            </div>
            <div>
              <CardTitle className="text-white text-lg">{user.name}</CardTitle>
              <Badge variant="secondary" className="mt-1">
                <Clock className="h-3 w-3 mr-1" />
                Pendente
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center gap-2 text-gray-300"><Phone className="h-4 w-4" /><span className="text-sm">{user.phone}</span></div>
          <div className="flex items-center gap-2 text-gray-300"><Mail className="h-4 w-4" /><span className="text-sm">{user.email}</span></div>
          
          {type === 'driver' ? (
            <>
              <div className="pt-2 border-t border-white/10 space-y-2">
                <div className="flex items-center gap-2 text-gray-300"><Truck className="h-4 w-4" /><span className="text-sm font-semibold">Placa: {user.vehicle_plate}</span></div>
                <div className="flex items-center gap-2 text-gray-300"><FileBadge className="h-4 w-4" /><span className="text-sm font-semibold">Renavam: {user.renavam}</span></div>
                <div className="flex items-center gap-2 text-gray-300"><FileText className="h-4 w-4" /><span className="text-sm font-semibold">ANTT: {user.antt}</span></div>
                <div className="flex items-center gap-2 text-gray-300"><FileText className="h-4 w-4" /><span className="text-sm font-semibold">CPF: {user.cpf}</span></div>
                <div className="flex items-center gap-2 text-gray-300"><FileText className="h-4 w-4" /><span className="text-sm font-semibold">RG: {user.rg}</span></div>
                
                {(user.comprovante_residencia_url || user.cnh_url || user.front_vehicle_photo_url || user.rear_vehicle_photo_url) && (
                  <div className="pt-2">
                    <div className="flex items-center gap-2 text-gray-300 mb-2"><Camera className="h-4 w-4" /><span className="text-sm">Documentos e Fotos:</span></div>
                    <div className="flex flex-wrap gap-2">
                      {user.comprovante_residencia_url && <PhotoPreview photoUrl={user.comprovante_residencia_url} />}
                      {user.cnh_url && <PhotoPreview photoUrl={user.cnh_url} />}
                      {user.front_vehicle_photo_url && <PhotoPreview photoUrl={user.front_vehicle_photo_url} />}
                      {user.rear_vehicle_photo_url && <PhotoPreview photoUrl={user.rear_vehicle_photo_url} />}
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <div className="pt-2 border-t border-white/10 space-y-2">
                {user.endereco && <div className="flex items-center gap-2 text-gray-300"><Building className="h-4 w-4" /><span className="text-sm">{user.endereco}</span></div>}
                {user.comprovante_residencia_url && <div className="flex items-center gap-2 text-gray-300"><FileText className="h-4 w-4" /><span className="text-sm">Comprovante de residência enviado</span></div>}
              </div>
            </>
          )}
          <div className="flex gap-2 pt-4 border-t border-white/10">
            <Button onClick={() => handleVerification(type, user.id, 'verified')} className="w-full bg-green-600 hover:bg-green-700 text-white"><Check className="h-4 w-4 mr-2" /> Aprovar</Button>
            <Button onClick={() => handleVerification(type, user.id, 'rejected')} className="w-full bg-red-600 hover:bg-red-700 text-white"><X className="h-4 w-4 mr-2" /> Rejeitar</Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold gradient-text mb-2 flex items-center gap-3">
          <ShieldCheck className="h-8 w-8" />
          Verificação de Segurança Para a Plataforma
        </h1>
        <p className="text-gray-400">Aprove ou rejeite novos usuários para manter a integridade da plataforma.</p>
      </motion.div>

      <Alert variant="destructive" className="bg-yellow-900/30 border-yellow-500/50 text-yellow-200">
        <AlertTriangle className="h-4 w-4 !text-yellow-400" />
        <AlertTitle className="font-bold">Aviso de Responsabilidade</AlertTitle>
        <AlertDescription>
          A verificação é uma ação interna para conceder acesso ao sistema. Ela **não** significa que os usuários foram consultados ou aprovados para negociações. Clientes e transportadores são os únicos responsáveis por se verificarem mutuamente antes de qualquer acordo. A plataforma se isenta de qualquer responsabilidade sobre essa questão.
        </AlertDescription>
      </Alert>
      
      <Alert className="bg-indigo-900/30 border-indigo-500/50 text-indigo-200">
        <AlertTriangle className="h-4 w-4 !text-indigo-400" />
        <AlertTitle className="font-bold">Direito de Recusa</AlertTitle>
        <AlertDescription>
          A plataforma reserva-se o direito de reprovar, desaprovar e não conceder o cadastro a clientes e transportadores com base em nossa verificação interna de segurança, sem necessidade de justificativa.
        </AlertDescription>
      </Alert>

      <div className="flex flex-col sm:flex-row gap-2 p-1 bg-white/10 rounded-lg">
        <Button onClick={() => setActiveTab('drivers')} variant={activeTab === 'drivers' ? 'default' : 'ghost'} className={`w-full relative ${activeTab === 'drivers' && 'btn-gradient'}`}>
          Motoristas
          {pendingDrivers.length > 0 && <Badge className="absolute -top-2 -right-2 bg-red-500 text-white">{pendingDrivers.length}</Badge>}
        </Button>
        <Button onClick={() => setActiveTab('clients')} variant={activeTab === 'clients' ? 'default' : 'ghost'} className={`w-full relative ${activeTab === 'clients' && 'btn-gradient'}`}>
          Clientes
          {pendingClients.length > 0 && <Badge className="absolute -top-2 -right-2 bg-red-500 text-white">{pendingClients.length}</Badge>}
        </Button>
      </div>

      {activeTab === 'drivers' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pendingDrivers.length > 0 ? (
            pendingDrivers.map(driver => <UserCard key={driver.id} user={driver} type="driver" />)
          ) : (
            <div className="col-span-full text-center py-12">
              <Users className="h-16 w-16 mx-auto text-gray-400 mb-4" />
              <p className="text-gray-400 text-lg">Nenhum motorista pendente de verificação.</p>
            </div>
          )}
        </div>
      )}

      {activeTab === 'clients' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pendingClients.length > 0 ? (
            pendingClients.map(client => <UserCard key={client.id} user={client} type="client" />)
          ) : (
            <div className="col-span-full text-center py-12">
              <Users className="h-16 w-16 mx-auto text-gray-400 mb-4" />
              <p className="text-gray-400 text-lg">Nenhum cliente pendente de verificação.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default VerificationCenter;