import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '@/contexts/DataContext';
import { useToast } from '@/components/ui/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Truck, Users, Briefcase, FileText, Loader2 } from 'lucide-react';

const RegistrationModal = ({ isOpen, onClose, userType }) => {
    const navigate = useNavigate();
    const { toast } = useToast();
    const { saveRecord, updateRecord, uploadFile, signUp } = useData();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const getInitialState = () => ({
        name: '', email: '', password: '', phone: '',
        address: '', comprovante_residencia: null,
        bank_name: '', agency: '', account_number: '', pix_key: '',
        renavam: '', antt: '', vehicle_plate: '', vehicle_type: '', body_type: '',
        foto_frente_veiculo: null, foto_traseira_veiculo: null,
        cpf: '', rg: '', cnh: null, crlv: null,
        // Client specific fields
        endereco: '', tipo_carga: '',
    });

    const [formData, setFormData] = useState(getInitialState());

    useEffect(() => {
        if (isOpen) setFormData(getInitialState());
    }, [isOpen, userType]);
    
    const handleFileChange = (e, field) => {
      const file = e.target.files[0];
      setFormData(prev => ({ ...prev, [field]: file || null }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        const ref = localStorage.getItem('referral_id');

        try {
            // Step 1: Create user and initial profile draft
            const { user, error: signUpError } = await signUp(formData.email, formData.password, userType);
            if (signUpError) throw new Error(signUpError.message || "Erro durante a criação da conta.");
            if (!user) throw new Error("Não foi possível criar o usuário. Tente novamente.");

            let table;
            let initialProfileData = {
                id: user.id,
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                referred_by: ref || null,
                status: 'pending', // default status
            };

            if (userType === 'client') {
                table = 'clients';
                initialProfileData = {
                    ...initialProfileData,
                    endereco: formData.endereco,
                    bank_name: formData.bank_name,
                    agency: formData.agency,
                    account_number: formData.account_number,
                    pix_key: formData.pix_key,
                    tipo_carga: formData.tipo_carga,
                };
            } else if (userType === 'driver') {
                table = 'transporters'; // Use 'transporters' table
                initialProfileData = {
                    ...initialProfileData,
                    nome_completo: formData.name, // Map 'name' to 'nome_completo'
                    whatsapp: formData.phone, // Map 'phone' to 'whatsapp'
                    endereco: formData.endereco, // Add 'endereco' for transporters
                    antt: formData.antt,
                    renavam: formData.renavam,
                    placa_veiculo: formData.vehicle_plate,
                    bank_name: formData.bank_name,
                    agency: formData.agency,
                    account_number: formData.account_number,
                    pix_key: formData.pix_key,
                    cpf: formData.cpf,
                    rg: formData.rg,
                    status: 'pending',
                    // Assuming tipo_de_carga is handled elsewhere or is a default
                    tipo_de_carga: ['Carga Geral'], // Default for now, can be expanded
                };
            } else if (userType === 'affiliate') {
                table = 'affiliates';
                initialProfileData = {
                    ...initialProfileData,
                    bank_name: formData.bank_name,
                    agency: formData.agency,
                    account_number: formData.account_number,
                    pix_key: formData.pix_key,
                };
            }
            
            await saveRecord(table, initialProfileData); // Save initial record

            // Step 2: Upload files and update profile with URLs
            let fileUploads = {};
            if (userType === 'client') {
                fileUploads.comprovante_residencia_url = await uploadFile(formData.comprovante_residencia, 'documents');
            } else if (userType === 'driver') {
                const [
                    comprovante_residencia_url, foto_frente_veiculo_url, foto_traseira_veiculo_url, cnh_url, crlv_url
                ] = await Promise.all([
                    uploadFile(formData.comprovante_residencia, 'documents'),
                    uploadFile(formData.foto_frente_veiculo, 'photos'),
                    uploadFile(formData.foto_traseira_veiculo, 'photos'),
                    uploadFile(formData.cnh, 'documents'),
                    uploadFile(formData.crlv, 'documents'),
                ]);
                fileUploads = { comprovante_residencia_url, foto_frente_veiculo_url, foto_traseira_veiculo_url, cnh_url, crlv_url };
            }

            // Update the record with file URLs and change status to pending_approval
            const updatePayload = {
                ...fileUploads,
                status: 'pending', // Status will be updated by admin verification
            };
            
            const updatedProfile = await updateRecord(table, user.id, updatePayload);

            if (updatedProfile) {
                toast({ title: 'Cadastro realizado com sucesso!', description: 'Seu perfil está em análise. Você será notificado.' });
                if (ref) localStorage.removeItem('referral_id');
                onClose();
                navigate('/acessar');
            }

        } catch (error) {
            console.error("Registration failed:", error);
            toast({ title: 'Erro no Cadastro', description: `Ocorreu um erro ao enviar seus dados: ${error.message}`, variant: 'destructive' });
        } finally {
            setIsSubmitting(false);
        }
    };

    const getTitleAndIcon = () => {
        switch (userType) {
            case 'driver': return { title: 'Cadastro de Transportador', icon: <Truck className="mr-3 h-7 w-7 text-purple-400" /> };
            case 'affiliate': return { title: 'Cadastro de Afiliado', icon: <Users className="mr-3 h-7 w-7 text-teal-400" /> };
            case 'client': default: return { title: 'Cadastro de Cliente', icon: <Briefcase className="mr-3 h-7 w-7 text-blue-400" /> };
        }
    };
    const { title, icon } = getTitleAndIcon();
    
    const FileInput = ({ id, label, onChange, value, isRequired = false }) => (
      <div>
        <Label htmlFor={id} className="text-gray-300 text-base">{label} {isRequired && <span className="text-red-500 text-sm ml-1">*</span>}</Label>
        <div className="mt-2 flex items-center justify-center w-full">
          <label htmlFor={id} className="flex flex-col items-center justify-center w-full h-32 border-2 border-white/20 border-dashed rounded-lg cursor-pointer bg-white/5 hover:bg-white/10">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <FileText className="w-8 h-8 mb-2 text-gray-400" />
              <p className="mb-2 text-sm text-gray-400 text-center px-2">{value ? <span className="font-semibold text-green-400">{value.name}</span> : <><span className="font-semibold">Clique para enviar</span> ou arraste</>}</p>
            </div>
            <Input id={id} type="file" className="hidden" onChange={onChange} accept="image/png, image/jpeg, application/pdf" required={isRequired} />
          </label>
        </div>
      </div>
    );
    
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="glass-effect text-white border-white/20 sm:max-w-3xl">
                <DialogHeader>
                    <DialogTitle className="flex items-center text-3xl font-bold">{icon} {title}</DialogTitle>
                    <DialogDescription className="text-gray-300 pt-2 text-base">Preencha seus dados para começar.</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <ScrollArea className="h-[70vh] md:h-[65vh] pr-6">
                        <div className="space-y-6 pt-4">
                            <h3 className="font-semibold text-xl text-blue-300 border-b border-blue-300/20 pb-2">Informações de Acesso *</h3>
                             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <Input type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="bg-white/10 p-4 h-12 text-base" placeholder="Seu melhor email" required />
                                <Input type="password" value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} className="bg-white/10 p-4 h-12 text-base" placeholder="Crie uma senha forte" required />
                            </div>

                            <h3 className="font-semibold text-xl text-blue-300 border-b border-blue-300/20 pb-2 pt-4">Informações Pessoais *</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <Input value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="bg-white/10 p-4 h-12 text-base" placeholder="Nome Completo" required />
                                <Input type="tel" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="bg-white/10 p-4 h-12 text-base" placeholder="Telefone / WhatsApp" required />
                            </div>
                            <Input value={formData.endereco} onChange={(e) => setFormData({...formData, endereco: e.target.value})} className="bg-white/10 p-4 h-12 text-base" placeholder="Endereço Completo" required />


                            {userType === 'client' && (
                                <>
                                    <h3 className="font-semibold text-xl text-blue-300 border-b border-blue-300/20 pb-2 pt-4">Dados do Cliente *</h3>
                                    <Input value={formData.tipo_carga} onChange={(e) => setFormData({...formData, tipo_carga: e.target.value})} className="bg-white/10 p-4 h-12 text-base" placeholder="Tipo de Carga (Ex: Móveis, Eletrônicos)" required />
                                    <FileInput id="comprovante_residencia" label="Comprovante de Residência" onChange={(e) => handleFileChange(e, 'comprovante_residencia')} value={formData.comprovante_residencia} isRequired={true} />
                                    
                                    <h3 className="font-semibold text-xl text-blue-300 border-b border-blue-300/20 pb-2 pt-4">Dados Bancários (Para Bônus de Indicação)</h3>
                                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <Input value={formData.bank_name} onChange={(e) => setFormData({...formData, bank_name: e.target.value})} className="bg-white/10 p-4 h-12 text-base" placeholder="Nome do Banco" />
                                        <Input value={formData.agency} onChange={(e) => setFormData({...formData, agency: e.target.value})} className="bg-white/10 p-4 h-12 text-base" placeholder="Agência" />
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <Input value={formData.account_number} onChange={(e) => setFormData({...formData, account_number: e.target.value})} className="bg-white/10 p-4 h-12 text-base" placeholder="Número da Conta" />
                                        <Input value={formData.pix_key} onChange={(e) => setFormData({...formData, pix_key: e.target.value})} className="bg-white/10 p-4 h-12 text-base" placeholder="Chave Pix" />
                                    </div>
                                </>
                            )}
                            {userType === 'driver' && (
                                <>
                                    <h3 className="font-semibold text-xl text-blue-300 border-b border-blue-300/20 pb-2 pt-4">Documentos e Dados Obrigatórios *</h3>
                                    <FileInput id="comprovante_residencia" label="Comprovante de Residência" onChange={(e) => handleFileChange(e, 'comprovante_residencia')} value={formData.comprovante_residencia} isRequired={true} />
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <Input value={formData.renavam} onChange={(e) => setFormData({...formData, renavam: e.target.value})} className="bg-white/10 p-4 h-12 text-base" placeholder="Número do Renavam" required />
                                        <Input value={formData.antt} onChange={(e) => setFormData({...formData, antt: e.target.value})} className="bg-white/10 p-4 h-12 text-base" placeholder="Número de Registro ANTT" required />
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <Input value={formData.cpf} onChange={(e) => setFormData({...formData, cpf: e.target.value})} className="bg-white/10 p-4 h-12 text-base" placeholder="CPF" required />
                                        <Input value={formData.rg} onChange={(e) => setFormData({...formData, rg: e.target.value})} className="bg-white/10 p-4 h-12 text-base" placeholder="RG" required />
                                    </div>
                                    <FileInput id="cnh" label="CNH (Carteira Nacional de Habilitação)" onChange={(e) => handleFileChange(e, 'cnh')} value={formData.cnh} isRequired={true} />

                                    <h3 className="font-semibold text-xl text-blue-300 border-b border-blue-300/20 pb-2 pt-4">Dados do Veículo *</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <Input value={formData.vehicle_plate} onChange={(e) => setFormData({...formData, vehicle_plate: e.target.value})} className="bg-white/10 p-4 h-12 text-base" placeholder="Placa do Veículo" required />
                                        <Input value={formData.vehicle_type} onChange={(e) => setFormData({...formData, vehicle_type: e.target.value})} className="bg-white/10 p-4 h-12 text-base" placeholder="Tipo (Ex: Van, Caminhão)" required />
                                    </div>
                                    <Input value={formData.body_type} onChange={(e) => setFormData({...formData, body_type: e.target.value})} className="bg-white/10 p-4 h-12 text-base" placeholder="Carroceria (Ex: Baú, Aberta)" />
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                                        <FileInput id="foto_frente_veiculo" label="Foto da Frente do Veículo (placa visível)" onChange={(e) => handleFileChange(e, 'foto_frente_veiculo')} value={formData.foto_frente_veiculo} isRequired={true} />
                                        <FileInput id="foto_traseira_veiculo" label="Foto da Traseira do Veículo (placa visível)" onChange={(e) => handleFileChange(e, 'foto_traseira_veiculo')} value={formData.foto_traseira_veiculo} isRequired={true} />
                                    </div>
                                    <FileInput id="crlv" label="CRLV (Opcional)" onChange={(e) => handleFileChange(e, 'crlv')} value={formData.crlv} />

                                    <h3 className="font-semibold text-xl text-blue-300 border-b border-blue-300/20 pb-2 pt-4">Dados Bancários *</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <Input value={formData.bank_name} onChange={(e) => setFormData({...formData, bank_name: e.target.value})} className="bg-white/10 p-4 h-12 text-base" placeholder="Nome do Banco" required />
                                        <Input value={formData.agency} onChange={(e) => setFormData({...formData, agency: e.target.value})} className="bg-white/10 p-4 h-12 text-base" placeholder="Agência" required />
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <Input value={formData.account_number} onChange={(e) => setFormData({...formData, account_number: e.target.value})} className="bg-white/10 p-4 h-12 text-base" placeholder="Número da Conta" required />
                                        <Input value={formData.pix_key} onChange={(e) => setFormData({...formData, pix_key: e.target.value})} className="bg-white/10 p-4 h-12 text-base" placeholder="Chave Pix" required />
                                    </div>
                                </>
                            )}
                             {userType === 'affiliate' && (
                                <>
                                    <h3 className="font-semibold text-xl text-blue-300 border-b border-blue-300/20 pb-2 pt-4">Informações de Pagamento *</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <Input value={formData.bank_name} onChange={(e) => setFormData({...formData, bank_name: e.target.value})} className="bg-white/10 p-4 h-12 text-base" placeholder="Nome do Banco" required />
                                        <Input value={formData.agency} onChange={(e) => setFormData({...formData, agency: e.target.value})} className="bg-white/10 p-4 h-12 text-base" placeholder="Agência" required />
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <Input value={formData.account_number} onChange={(e) => setFormData({...formData, account_number: e.target.value})} className="bg-white/10 p-4 h-12 text-base" placeholder="Número da Conta" required />
                                        <Input value={formData.pix_key} onChange={(e) => setFormData({...formData, pix_key: e.target.value})} className="bg-white/10 p-4 h-12 text-base" placeholder="Chave Pix" required />
                                    </div>
                                </>
                            )}
                        </div>
                    </ScrollArea>
                    <DialogFooter className="pt-6">
                        <Button type="button" variant="ghost" onClick={onClose} className="text-gray-400 hover:text-white px-6 py-5 text-base">Cancelar</Button>
                        <Button type="submit" className="btn-gradient px-8 py-5 text-base" disabled={isSubmitting}>
                            {isSubmitting ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : 'Salvar'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default RegistrationModal;