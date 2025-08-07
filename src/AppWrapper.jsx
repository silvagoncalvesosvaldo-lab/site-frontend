import React, { useState, useMemo, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useSyncedLocalStorage } from '@/hooks/useSyncedLocalStorage';
import { useData } from '@/contexts/DataContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, X, Info, HelpCircle, LogIn, FileUp, Loader2 } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';

const AppWrapper = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const dataApi = useData();
  
  const [selectedDriverId, setSelectedDriverId] = useSyncedLocalStorage('selected-driver-view', null);
  const [selectedClientId, setSelectedClientId] = useSyncedLocalStorage('selected-client-view', null);
  const [selectedAffiliateId, setSelectedAffiliateId] = useSyncedLocalStorage('selected-affiliate-view', null);
  const [showWelcomeToast, setShowWelcomeToast] = useSyncedLocalStorage('show-welcome-toast', true);
  const [isRegistering, setIsRegistering] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [registrationType, setRegistrationType] = useState(null);
  const [newUserData, setNewUserData] = useState({ 
      name: '', email: '', phone: '', bankAccount: '', referredBy: null, 
      vehiclePlate: '', renavam: '', antt: '', vehicleType: '', bodyType: '',
      frontVehiclePhoto: null, rearVehiclePhoto: null,
      cpf: '', rg: '', cnh: null, crlv: null, addressProof: null, address: ''
  });

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const registerParam = params.get('register');
    const typeParam = params.get('type');
    const refParam = params.get('ref');

    if (registerParam) {
      setIsRegistering(true);
      setRegistrationType(typeParam || 'client');
      if (refParam) {
        setNewUserData(prev => ({ ...prev, referredBy: refParam }));
      }
      navigate(location.pathname, { replace: true });
    }
  }, [location.search, navigate]);

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    let newUser;
    const commonData = {
        name: newUserData.name,
        email: newUserData.email,
        phone: newUserData.phone,
        referredBy: newUserData.referredBy,
    };

    if (registrationType === 'driver') {
      if(!newUserData.frontVehiclePhoto || !newUserData.rearVehiclePhoto || !newUserData.addressProof) {
        toast({ title: "Fotos e comprovantes obrigatórios!", description: "Por favor, envie as fotos do veículo e o comprovante de residência.", variant: "destructive" });
        setIsSubmitting(false);
        return;
      }
      newUser = await dataApi.addDriver({ 
        ...commonData, 
        bankAccount: newUserData.bankAccount,
        vehiclePlate: newUserData.vehiclePlate,
        renavam: newUserData.renavam,
        antt: newUserData.antt,
        vehicleType: newUserData.vehicleType,
        bodyType: newUserData.bodyType,
        frontVehiclePhoto: newUserData.frontVehiclePhoto,
        rearVehiclePhoto: newUserData.rearVehiclePhoto,
        addressProof: newUserData.addressProof,
        cpf: newUserData.cpf,
        rg: newUserData.rg,
        cnh: newUserData.cnh,
        crlv: newUserData.crlv,
      });
      if (newUser) {
        setSelectedDriverId(newUser.id);
        navigate(`/app/driver/${newUser.id}`);
      }
    } else if (registrationType === 'client') {
      if(!newUserData.addressProof) {
        toast({ title: "Comprovante de residência obrigatório!", variant: "destructive" });
        setIsSubmitting(false);
        return;
      }
      newUser = await dataApi.addClient({ 
        ...commonData, 
        addressProof: newUserData.addressProof,
        address: newUserData.address
      });
      if (newUser) {
        setSelectedClientId(newUser.id);
        navigate(`/app/client/${newUser.id}`);
      }
    } else if (registrationType === 'affiliate') {
        newUser = await dataApi.addAffiliate({ ...commonData, bankAccount: newUserData.bankAccount });
        if (newUser) {
            setSelectedAffiliateId(newUser.id);
            navigate(`/app/afiliado/${newUser.id}`);
        }
    }

    setIsSubmitting(false);

    if (newUser) {
        toast({
          title: "Cadastro realizado com sucesso!",
          description: `Seu perfil foi criado. Bem-vindo(a)!`,
        });
        setIsRegistering(false);
        setNewUserData({ 
          name: '', email: '', phone: '', bankAccount: '', referredBy: null, 
          vehiclePlate: '', renavam: '', antt: '', vehicleType: '', bodyType: '',
          frontVehiclePhoto: null, rearVehiclePhoto: null,
          cpf: '', rg: '', cnh: null, crlv: null, addressProof: null, address: ''
        });
    }
  };
  
  useEffect(() => {
    if (dataApi.loading) return;

    const drivers = dataApi.drivers;
    const clients = dataApi.clients;
    const affiliates = dataApi.affiliates;

    if (!selectedDriverId && drivers.length > 0) {
        setSelectedDriverId(drivers[0].id);
    }
    if (!selectedClientId && clients.length > 0) {
        setSelectedClientId(clients[0].id);
    }
    if (!selectedAffiliateId && affiliates.length > 0) {
        setSelectedAffiliateId(affiliates[0].id);
    }
}, [dataApi.loading, dataApi.drivers, dataApi.clients, dataApi.affiliates, setSelectedDriverId, setSelectedClientId, setSelectedAffiliateId]);


  const handleViewModeChange = (mode) => {
    if (mode === 'admin') navigate('/app/admin');
    else if (mode === 'help') navigate('/help');
    else if (mode === 'login') navigate('/acessar');
  };

  const viewMode = useMemo(() => {
    if (location.pathname.startsWith('/app/admin')) return 'admin';
    if (location.pathname.startsWith('/app/driver')) return 'driver';
    if (location.pathname.startsWith('/app/client')) return 'client';
    if (location.pathname.startsWith('/app/afiliado')) return 'affiliate';
    if (location.pathname.startsWith('/help')) return 'help';
    return null;
  }, [location.pathname]);

  const WelcomeToast = () => (
    <AnimatePresence>
      {showWelcomeToast && viewMode === 'admin' && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50, transition: { duration: 0.3 } }}
          className="fixed bottom-4 right-4 z-[200] w-full max-w-sm"
        >
          <div className="glass-effect p-4 rounded-lg shadow-2xl border border-white/20">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-blue-500/30 rounded-full">
                <Info className="h-6 w-6 text-blue-300" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-white">Dica de Navegação!</h3>
                <p className="text-sm text-gray-300 mt-1">
                  Use os botões no canto superior direito para alternar entre o portal de <strong>Admin</strong>, <strong>Ajuda</strong> ou acessar a página de <strong>Login</strong>.
                </p>
              </div>
              <button onClick={() => setShowWelcomeToast(false)} className="text-gray-400 hover:text-white transition-colors">
                <X size={20} />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  const ViewSwitcher = () => (
    <div className="fixed top-4 right-4 z-[100] flex items-center gap-2 flex-wrap">
      <div className="bg-white/10 backdrop-blur-sm p-1 rounded-full flex gap-1 shadow-lg border border-white/20">
        <button onClick={() => handleViewModeChange('admin')} className={`px-3 py-1.5 text-sm rounded-full transition-colors flex items-center gap-2 ${viewMode === 'admin' ? 'bg-blue-500 text-white' : 'text-gray-200 hover:bg-white/10'}`}><Shield size={16} /> Admin</button>
        <button onClick={() => handleViewModeChange('help')} className={`px-3 py-1.5 text-sm rounded-full transition-colors flex items-center gap-2 ${viewMode === 'help' ? 'bg-orange-500 text-white' : 'text-gray-200 hover:bg-white/10'}`}><HelpCircle size={16} /> Ajuda</button>
        <button onClick={() => handleViewModeChange('login')} className={`px-3 py-1.5 text-sm rounded-full transition-colors flex items-center gap-2 ${location.pathname === '/acessar' ? 'bg-green-500 text-white' : 'text-gray-200 hover:bg-white/10'}`}><LogIn size={16} /> Acessar</button>
      </div>
    </div>
  );

  const FileInput = ({ id, label, required, onChange, value, multiple = false }) => (
    <div>
      <Label htmlFor={id} className="text-lg">{label}</Label>
      <div className="mt-2 flex items-center justify-center w-full">
        <label htmlFor={id} className="flex flex-col items-center justify-center w-full h-40 border-2 border-white/20 border-dashed rounded-lg cursor-pointer bg-white/5 hover:bg-white/10">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <FileUp className="w-10 h-10 mb-4 text-gray-400" />
            <p className="mb-2 text-base text-gray-400">
              {value ? 
                <span className="font-semibold text-green-400">{multiple ? `${value.length} arquivos selecionados` : value.name}</span> : 
                <><span className="font-semibold">Clique para enviar</span> ou arraste</>
              }
            </p>
            <p className="text-sm text-gray-500">PDF, PNG, JPG</p>
          </div>
          <Input id={id} type="file" className="hidden" onChange={onChange} required={required} multiple={multiple} accept="image/png, image/jpeg, application/pdf" />
        </label>
      </div>
    </div>
  );

  if (dataApi.loading) {
    return (
        <div className="w-full h-screen flex flex-col items-center justify-center bg-slate-900 text-white">
            <Loader2 className="h-12 w-12 animate-spin text-blue-500" />
            <p className="mt-4 text-lg">Carregando plataforma...</p>
        </div>
    );
  }

  return (
    <>
      <ViewSwitcher />
      <WelcomeToast />
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <Outlet />
        </motion.div>
      </AnimatePresence>
      <Dialog open={isRegistering} onOpenChange={setIsRegistering}>
        <DialogContent className="glass-effect text-white border-white/20 max-w-3xl">
          <DialogHeader>
            <DialogTitle className="text-3xl gradient-text-purple">Bem-vindo(a)! Complete seu cadastro.</DialogTitle>
            <DialogDescription className="text-gray-300">
              {registrationType === 'client' && "Preencha seus dados para começar a solicitar fretes."}
              {registrationType === 'driver' && "Preencha seus dados para começar a receber ofertas de frete."}
              {registrationType === 'affiliate' && "Preencha seus dados para se tornar um promotor da plataforma."}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleRegister}>
            <ScrollArea className="max-h-[70vh] pr-6">
              <div className="space-y-6 p-1">
                <h3 className="font-semibold text-xl text-blue-300 border-b border-blue-300/20 pb-2">Informações Pessoais</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div><Label htmlFor="reg-name" className="text-lg">Nome Completo</Label><Input id="reg-name" value={newUserData.name} onChange={(e) => setNewUserData({...newUserData, name: e.target.value})} className="bg-white/10 text-lg h-12 mt-2" required /></div>
                  <div><Label htmlFor="reg-email" className="text-lg">Email</Label><Input id="reg-email" type="email" value={newUserData.email} onChange={(e) => setNewUserData({...newUserData, email: e.target.value})} className="bg-white/10 text-lg h-12 mt-2" required /></div>
                  <div><Label htmlFor="reg-phone" className="text-lg">Whatsapp</Label><Input id="reg-phone" value={newUserData.phone} onChange={(e) => setNewUserData({...newUserData, phone: e.target.value})} className="bg-white/10 text-lg h-12 mt-2" required /></div>
                  { (registrationType === 'driver' || registrationType === 'affiliate') && 
                    <div><Label htmlFor="reg-bankAccount" className="text-lg">Dados Bancários / Chave Pix</Label><Input id="reg-bankAccount" value={newUserData.bankAccount} onChange={(e) => setNewUserData({...newUserData, bankAccount: e.target.value})} className="bg-white/10 text-lg h-12 mt-2" placeholder="Para receber pagamentos" required /></div>
                  }
                </div>
                
                {registrationType === 'client' && (
                  <>
                    <h3 className="font-semibold text-xl text-blue-300 border-b border-blue-300/20 pb-2 pt-4">Endereço</h3>
                    <div>
                      <Label htmlFor="reg-address" className="text-lg">Endereço Principal</Label>
                      <Input id="reg-address" value={newUserData.address || ''} onChange={(e) => setNewUserData({...newUserData, address: e.target.value})} className="bg-white/10 text-lg h-12 mt-2" required />
                    </div>
                    <FileInput 
                      id="reg-addressProof"
                      label="Comprovante de Residência"
                      required
                      onChange={(e) => setNewUserData({...newUserData, addressProof: e.target.files[0]})}
                      value={newUserData.addressProof}
                    />
                  </>
                )}
                
                {registrationType === 'driver' && (
                  <>
                    <h3 className="font-semibold text-xl text-blue-300 border-b border-blue-300/20 pb-2 pt-4">Documentos Obrigatórios</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div><Label htmlFor="reg-renavam" className="text-lg">Renavam</Label><Input id="reg-renavam" value={newUserData.renavam} onChange={(e) => setNewUserData({...newUserData, renavam: e.target.value})} className="bg-white/10 text-lg h-12 mt-2" required /></div>
                      <div><Label htmlFor="reg-antt" className="text-lg">ANTT</Label><Input id="reg-antt" value={newUserData.antt} onChange={(e) => setNewUserData({...newUserData, antt: e.target.value})} className="bg-white/10 text-lg h-12 mt-2" required /></div>
                    </div>
                    <FileInput 
                      id="reg-addressProof-driver"
                      label="Comprovante de Residência"
                      required
                      onChange={(e) => setNewUserData({...newUserData, addressProof: e.target.files[0]})}
                      value={newUserData.addressProof}
                    />

                    <h3 className="font-semibold text-xl text-blue-300 border-b border-blue-300/20 pb-2 pt-4">Informações do Veículo</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div><Label htmlFor="reg-plate" className="text-lg">Placa</Label><Input id="reg-plate" value={newUserData.vehiclePlate} onChange={(e) => setNewUserData({...newUserData, vehiclePlate: e.target.value})} className="bg-white/10 text-lg h-12 mt-2" required /></div>
                      <div><Label htmlFor="reg-vehicle-type" className="text-lg">Tipo</Label><Input id="reg-vehicle-type" value={newUserData.vehicleType} onChange={(e) => setNewUserData({...newUserData, vehicleType: e.target.value})} className="bg-white/10 text-lg h-12 mt-2" placeholder="Ex: Caminhão, VUC" required /></div>
                      <div><Label htmlFor="reg-body-type" className="text-lg">Carroceria</Label><Input id="reg-body-type" value={newUserData.bodyType} onChange={(e) => setNewUserData({...newUserData, bodyType: e.target.value})} className="bg-white/10 text-lg h-12 mt-2" placeholder="Ex: Baú, Sider" required /></div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FileInput id="reg-front-photo" label="1 Foto da Frente (com placa)" required onChange={(e) => setNewUserData({...newUserData, frontVehiclePhoto: e.target.files[0]})} value={newUserData.frontVehiclePhoto} />
                      <FileInput id="reg-rear-photo" label="1 Foto da Traseira (com placa)" required onChange={(e) => setNewUserData({...newUserData, rearVehiclePhoto: e.target.files[0]})} value={newUserData.rearVehiclePhoto} />
                    </div>
                    
                    <h3 className="font-semibold text-xl text-blue-300 border-b border-blue-300/20 pb-2 pt-4">Documentos Opcionais</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div><Label htmlFor="reg-cpf" className="text-lg">CPF</Label><Input id="reg-cpf" value={newUserData.cpf} onChange={(e) => setNewUserData({...newUserData, cpf: e.target.value})} className="bg-white/10 text-lg h-12 mt-2" /></div>
                      <div><Label htmlFor="reg-rg" className="text-lg">RG</Label><Input id="reg-rg" value={newUserData.rg} onChange={(e) => setNewUserData({...newUserData, rg: e.target.value})} className="bg-white/10 text-lg h-12 mt-2" /></div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FileInput id="reg-cnh" label="CNH" onChange={(e) => setNewUserData({...newUserData, cnh: e.target.files[0]})} value={newUserData.cnh} />
                      <FileInput id="reg-crlv" label="CRLV" onChange={(e) => setNewUserData({...newUserData, crlv: e.target.files[0]})} value={newUserData.crlv} />
                    </div>
                  </>
                )}

              </div>
            </ScrollArea>
            <Button type="submit" size="lg" className="w-full btn-gradient mt-6 text-lg h-14" disabled={isSubmitting}>
              {isSubmitting ? <Loader2 className="mr-2 h-6 w-6 animate-spin" /> : 'Finalizar Cadastro'}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AppWrapper;