import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { User, Phone, Mail, Truck, Edit, Save, Star, FileUp, Building, Banknote, Wallet, KeyRound } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useData } from '@/contexts/DataContext';

const DriverProfile = ({ driver, setDrivers }) => {
  const { updateDriver } = useData();
  const [formData, setFormData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    setFormData({ ...driver });
  }, [driver]);

  const handleFileChange = (e, field) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, [field]: file }));
    }
  };

  const handleSave = async () => {
    setIsEditing(false);
    try {
        const { id, ...updateData } = formData;
        await updateDriver(driver.id, updateData);
        toast({
          title: "Perfil Atualizado!",
          description: "Suas informações foram salvas com sucesso.",
        });
    } catch(error) {
        toast({
            title: "Erro ao Atualizar",
            description: "Não foi possível salvar suas informações. Tente novamente.",
            variant: "destructive"
        });
    }
  };

  const averageRating = useMemo(() => {
    if (!driver?.ratings || driver.ratings.length === 0) return 0;
    return driver.ratings.reduce((sum, r) => sum + r.rating, 0) / driver.ratings.length;
  }, [driver]);

  if (!driver) return <div>Carregando perfil...</div>;

  const renderLabel = (text, isOptional = false, isRequired = false) => (
    <Label htmlFor={text.toLowerCase().replace(/\s/g, '')} className="text-gray-300 text-base">
      {text}
      {isOptional && <span className="text-gray-400 text-sm ml-2">(Opcional)</span>}
      {isRequired && <span className="text-red-500 text-sm ml-2">*</span>}
    </Label>
  );

  const FileDisplayInput = ({ file, label, field, isOptional, isRequired }) => (
    <div>
        {renderLabel(label, isOptional, isRequired)}
        <div className={`mt-2 flex items-center justify-center w-full ${!isEditing && 'opacity-70'}`}>
            <label htmlFor={field} className={`flex flex-col items-center justify-center w-full h-32 border-2 border-white/20 border-dashed rounded-lg bg-white/5 ${isEditing ? 'cursor-pointer hover:bg-white/10' : 'cursor-not-allowed'}`}>
                <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center">
                    <FileUp className="w-8 h-8 mb-4 text-gray-400" />
                    <p className="mb-2 text-sm text-gray-400 px-2">
                        {file?.name ? <span className="font-semibold text-green-400">{file.name}</span> : <><span className="font-semibold">Clique para enviar</span> ou arraste</>}
                    </p>
                </div>
                <Input id={field} type="file" className="hidden" onChange={(e) => handleFileChange(e, field)} disabled={!isEditing} />
            </label>
        </div>
    </div>
  );

  return (
    <ScrollArea className="h-full">
    <div className="space-y-8 p-1">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold gradient-text mb-2">Meu Perfil</h1>
          <p className="text-gray-400">Gerencie suas informações pessoais e do veículo.</p>
        </div>
        {!isEditing ? <Button onClick={() => setIsEditing(true)} className="btn-gradient text-base px-6 py-5"><Edit className="h-4 w-4 mr-2" />Editar Perfil</Button> : <Button onClick={handleSave} className="btn-gradient-green text-base px-6 py-5"><Save className="h-4 w-4 mr-2" />Salvar Alterações</Button>}
      </motion.div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="lg:col-span-2 space-y-8">
          <Card className="glass-effect border-white/20">
            <CardHeader><CardTitle className="text-white text-xl">Informações Pessoais</CardTitle></CardHeader>
            <CardContent className="space-y-6">
              <div>{renderLabel("Nome Completo", false, true)}<Input id="name" value={formData.name || ''} onChange={(e) => setFormData({...formData, name: e.target.value})} disabled={!isEditing} className="bg-white/10 border-white/20 disabled:opacity-70 mt-2 text-base p-4 h-12" /></div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>{renderLabel("Whatsapp", false, true)}<Input id="phone" value={formData.phone || ''} onChange={(e) => setFormData({...formData, phone: e.target.value})} disabled={!isEditing} className="bg-white/10 border-white/20 disabled:opacity-70 mt-2 text-base p-4 h-12" /></div>
                <div>{renderLabel("Email", false, true)}<Input id="email" type="email" value={formData.email || ''} onChange={(e) => setFormData({...formData, email: e.target.value})} disabled={!isEditing} className="bg-white/10 border-white/20 disabled:opacity-70 mt-2 text-base p-4 h-12" /></div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="glass-effect border-white/20">
            <CardHeader><CardTitle className="text-white text-xl">Dados Bancários</CardTitle></CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="bank_name" className="text-gray-300 text-base flex items-center gap-2"><Banknote size={16}/> Banco</Label>
                  <Input id="bank_name" value={formData.bank_name || ''} onChange={(e) => setFormData({...formData, bank_name: e.target.value})} disabled={!isEditing} className="bg-white/10 border-white/20 disabled:opacity-70 mt-2 text-base p-4 h-12" />
                </div>
                <div>
                  <Label htmlFor="agency" className="text-gray-300 text-base flex items-center gap-2"><Building size={16}/> Agência</Label>
                  <Input id="agency" value={formData.agency || ''} onChange={(e) => setFormData({...formData, agency: e.target.value})} disabled={!isEditing} className="bg-white/10 border-white/20 disabled:opacity-70 mt-2 text-base p-4 h-12" />
                </div>
              </div>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="account_number" className="text-gray-300 text-base flex items-center gap-2"><Wallet size={16}/> Conta</Label>
                  <Input id="account_number" value={formData.account_number || ''} onChange={(e) => setFormData({...formData, account_number: e.target.value})} disabled={!isEditing} className="bg-white/10 border-white/20 disabled:opacity-70 mt-2 text-base p-4 h-12" />
                </div>
                <div>
                  <Label htmlFor="pix_key" className="text-gray-300 text-base flex items-center gap-2"><KeyRound size={16}/> Chave Pix</Label>
                  <Input id="pix_key" value={formData.pix_key || ''} onChange={(e) => setFormData({...formData, pix_key: e.target.value})} disabled={!isEditing} className="bg-white/10 border-white/20 disabled:opacity-70 mt-2 text-base p-4 h-12" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-effect border-white/20">
            <CardHeader><CardTitle className="text-white text-xl">Documentos Obrigatórios</CardTitle></CardHeader>
            <CardContent className="space-y-6">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>{renderLabel("Número do Renavam", false, true)}<Input id="renavam" value={formData.renavam || ''} onChange={(e) => setFormData({...formData, renavam: e.target.value})} disabled={!isEditing} className="bg-white/10 border-white/20 disabled:opacity-70 mt-2 text-base p-4 h-12" /></div>
                    <div>{renderLabel("Número de Registro ANTT", false, true)}<Input id="antt" value={formData.antt || ''} onChange={(e) => setFormData({...formData, antt: e.target.value})} disabled={!isEditing} className="bg-white/10 border-white/20 disabled:opacity-70 mt-2 text-base p-4 h-12" /></div>
                </div>
                <FileDisplayInput file={formData.address_proof} label="Comprovante de Residência" field="address_proof" isRequired={true} />
            </CardContent>
          </Card>
          
          <Card className="glass-effect border-white/20">
            <CardHeader><CardTitle className="text-white text-xl">Documentos Opcionais</CardTitle></CardHeader>
            <CardContent className="space-y-6">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>{renderLabel("CPF", true)}<Input id="cpf" value={formData.cpf || ''} onChange={(e) => setFormData({...formData, cpf: e.target.value})} disabled={!isEditing} className="bg-white/10 border-white/20 disabled:opacity-70 mt-2 text-base p-4 h-12" /></div>
                    <div>{renderLabel("RG", true)}<Input id="rg" value={formData.rg || ''} onChange={(e) => setFormData({...formData, rg: e.target.value})} disabled={!isEditing} className="bg-white/10 border-white/20 disabled:opacity-70 mt-2 text-base p-4 h-12" /></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FileDisplayInput file={formData.cnh} label="CNH" field="cnh" isOptional={true} />
                    <FileDisplayInput file={formData.crlv} label="CRLV" isOptional={true} />
                </div>
            </CardContent>
          </Card>

          <Card className="glass-effect border-white/20">
            <CardHeader><CardTitle className="text-white text-xl">Veículo</CardTitle></CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>{renderLabel("Placa do Veículo", false, true)}<Input id="vehicle_plate" value={formData.vehicle_plate || ''} onChange={(e) => setFormData({...formData, vehicle_plate: e.target.value})} disabled={!isEditing} className="bg-white/10 border-white/20 disabled:opacity-70 mt-2 text-base p-4 h-12" /></div>
                  <div>{renderLabel("Tipo de Veículo", false, true)}<Input id="vehicle_type" value={formData.vehicle_type || ''} onChange={(e) => setFormData({...formData, vehicle_type: e.target.value})} disabled={!isEditing} className="bg-white/10 border-white/20 disabled:opacity-70 mt-2 text-base p-4 h-12" /></div>
              </div>
              <div>{renderLabel("Carroceria", false, true)}<Input id="body_type" value={formData.body_type || ''} onChange={(e) => setFormData({...formData, body_type: e.target.value})} disabled={!isEditing} className="bg-white/10 border-white/20 disabled:opacity-70 mt-2 text-base p-4 h-12" /></div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FileDisplayInput file={formData.front_vehicle_photo} label="Foto da Frente (placa visível)" field="front_vehicle_photo" isRequired={true} />
                <FileDisplayInput file={formData.rear_vehicle_photo} label="Foto da Traseira (placa visível)" field="rear_vehicle_photo" isRequired={true} />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="space-y-8">
          <Card className="glass-effect border-white/20">
            <CardHeader><CardTitle className="text-white text-xl">Minha Reputação</CardTitle></CardHeader>
            <CardContent className="space-y-4 text-center">
              <p className="text-5xl font-bold text-yellow-400">{averageRating.toFixed(1)}</p>
              <div className="flex justify-center items-center gap-1 mt-1">{[...Array(5)].map((_, i) => <Star key={i} className={`h-6 w-6 ${i < Math.round(averageRating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'}`} />)}</div>
              <p className="text-sm text-gray-400 mt-2">Baseado em {driver.ratings?.length || 0} avaliações</p>
              <div className="space-y-3 max-h-48 overflow-y-auto pt-2">{driver.ratings?.slice(-3).reverse().map(r => (<div key={r.orderId} className="p-3 bg-white/5 rounded-lg text-left"><div className="flex items-center gap-1">{[...Array(5)].map((_, i) => <Star key={i} className={`h-4 w-4 ${i < r.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'}`} />)}</div>{r.comment && <p className="text-sm text-gray-300 mt-1 italic">"{r.comment}"</p>}</div>))}</div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
    </ScrollArea>
  );
};

export default DriverProfile;