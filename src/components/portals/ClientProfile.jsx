import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { Edit, Save, User, Phone, Mail, MapPin, FileUp, Banknote, Info, Building, Wallet, KeyRound } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useData } from '@/contexts/DataContext';

const ClientProfile = ({ client, setClients }) => {
    const { updateClient } = useData();
    const [formData, setFormData] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const { toast } = useToast();

    useEffect(() => {
        setFormData({ ...client });
    }, [client]);

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
            await updateClient(client.id, updateData);
            toast({
                title: "Perfil Atualizado!",
                description: "Suas informações foram salvas com sucesso.",
            });
        } catch (error) {
             toast({
                title: "Erro ao atualizar",
                description: "Não foi possível salvar suas alterações. Tente novamente.",
                variant: 'destructive'
            });
        }
    };

    if (!client) {
        return <div>Carregando perfil...</div>;
    }
    
    return (
        <ScrollArea className="h-full">
            <div className="space-y-8 p-1">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex justify-between items-center"
                >
                    <div>
                        <h1 className="text-3xl font-bold gradient-text-green mb-2">Meu Perfil</h1>
                        <p className="text-gray-400">Gerencie suas informações pessoais e de pagamento.</p>
                    </div>
                    {!isEditing ? (
                        <Button onClick={() => setIsEditing(true)} className="btn-secondary-green text-base px-6 py-5">
                            <Edit className="h-4 w-4 mr-2" /> Editar Perfil
                        </Button>
                    ) : (
                        <Button onClick={handleSave} className="btn-gradient-green text-base px-6 py-5">
                            <Save className="h-4 w-4 mr-2" /> Salvar Alterações
                        </Button>
                    )}
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="lg:col-span-2 space-y-8"
                    >
                        <Card className="glass-effect border-white/20">
                            <CardHeader><CardTitle className="text-white text-xl">Informações de Contato</CardTitle></CardHeader>
                            <CardContent className="space-y-6">
                                <div>
                                    <Label htmlFor="name" className="text-gray-300 text-base flex items-center gap-2"><User size={16} /> Nome Completo</Label>
                                    <Input id="name" value={formData.name || ''} onChange={(e) => setFormData({ ...formData, name: e.target.value })} disabled={!isEditing} className="bg-white/10 border-white/20 disabled:opacity-70 mt-2 text-base p-4 h-12" />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <Label htmlFor="phone" className="text-gray-300 text-base flex items-center gap-2"><Phone size={16} /> Whatsapp</Label>
                                        <Input id="phone" value={formData.phone || ''} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} disabled={!isEditing} className="bg-white/10 border-white/20 disabled:opacity-70 mt-2 text-base p-4 h-12" />
                                    </div>
                                    <div>
                                        <Label htmlFor="email" className="text-gray-300 text-base flex items-center gap-2"><Mail size={16} /> Email</Label>
                                        <Input id="email" type="email" value={formData.email || ''} onChange={(e) => setFormData({ ...formData, email: e.target.value })} disabled={!isEditing} className="bg-white/10 border-white/20 disabled:opacity-70 mt-2 text-base p-4 h-12" />
                                    </div>
                                </div>
                                <div>
                                    <Label htmlFor="address" className="text-gray-300 text-base flex items-center gap-2"><MapPin size={16} /> Endereço Principal</Label>
                                    <Input id="address" value={formData.address || ''} onChange={(e) => setFormData({ ...formData, address: e.target.value })} disabled={!isEditing} className="bg-white/10 border-white/20 disabled:opacity-70 mt-2 text-base p-4 h-12" />
                                </div>
                            </CardContent>
                        </Card>
                        <Card className="glass-effect border-white/20">
                            <CardHeader><CardTitle className="text-white text-xl">Documentos</CardTitle></CardHeader>
                            <CardContent className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                                    <div>
                                        <Label htmlFor="cpfCnpj" className="text-gray-300 text-base flex items-center gap-2"><Building size={16} /> CPF / CNPJ <span className="text-gray-400 text-sm">(Opcional)</span></Label>
                                        <Input id="cpfCnpj" value={formData.cpfCnpj || ''} onChange={(e) => setFormData({ ...formData, cpfCnpj: e.target.value })} disabled={!isEditing} className="bg-white/10 border-white/20 disabled:opacity-70 mt-2 text-base p-4 h-12" />
                                    </div>
                                    <div>
                                        <Label htmlFor="address_proof" className="text-gray-300 text-base flex items-center gap-2"><FileUp size={16} /> Comprovante de Residência</Label>
                                        <div className={`mt-2 flex items-center justify-center w-full ${!isEditing && 'opacity-70'}`}>
                                            <label htmlFor="address_proof" className={`flex flex-col items-center justify-center w-full h-32 border-2 border-white/20 border-dashed rounded-lg bg-white/5 ${isEditing ? 'cursor-pointer hover:bg-white/10' : 'cursor-not-allowed'}`}>
                                                <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center">
                                                    <FileUp className="w-8 h-8 mb-4 text-gray-400" />
                                                    <p className="mb-2 text-sm text-gray-400 px-2">
                                                        {formData.address_proof?.name ? <span className="font-semibold text-green-400">{formData.address_proof.name}</span> : <><span className="font-semibold">Clique para enviar</span> ou arraste</>}
                                                    </p>
                                                </div>
                                                <Input id="address_proof" type="file" className="hidden" onChange={(e) => handleFileChange(e, 'address_proof')} disabled={!isEditing} />
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="lg:col-span-1"
                    >
                        <Card className="glass-effect border-white/20">
                            <CardHeader>
                                <CardTitle className="text-white text-xl">Indique e Ganhe</CardTitle>
                                <CardDescription className="text-gray-400">Dados para crédito dos seus ganhos.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <Label htmlFor="bank_name" className="text-gray-300 text-base flex items-center gap-2"><Banknote size={16} /> Banco</Label>
                                    <Input id="bank_name" value={formData.bank_name || ''} onChange={(e) => setFormData({ ...formData, bank_name: e.target.value })} disabled={!isEditing} className="bg-white/10 border-white/20 disabled:opacity-70 mt-2 text-base p-4 h-12" />
                                </div>
                                <div>
                                    <Label htmlFor="agency" className="text-gray-300 text-base flex items-center gap-2"><Building size={16} /> Agência</Label>
                                    <Input id="agency" value={formData.agency || ''} onChange={(e) => setFormData({ ...formData, agency: e.target.value })} disabled={!isEditing} className="bg-white/10 border-white/20 disabled:opacity-70 mt-2 text-base p-4 h-12" />
                                </div>
                                <div>
                                    <Label htmlFor="account_number" className="text-gray-300 text-base flex items-center gap-2"><Wallet size={16} /> Conta</Label>
                                    <Input id="account_number" value={formData.account_number || ''} onChange={(e) => setFormData({ ...formData, account_number: e.target.value })} disabled={!isEditing} className="bg-white/10 border-white/20 disabled:opacity-70 mt-2 text-base p-4 h-12" />
                                </div>
                                <div>
                                    <Label htmlFor="pix_key" className="text-gray-300 text-base flex items-center gap-2"><KeyRound size={16} /> Chave Pix</Label>
                                    <Input id="pix_key" value={formData.pix_key || ''} onChange={(e) => setFormData({ ...formData, pix_key: e.target.value })} disabled={!isEditing} className="bg-white/10 border-white/20 disabled:opacity-70 mt-2 text-base p-4 h-12" />
                                </div>
                                <p className="text-sm text-gray-400 pt-2 flex items-start gap-2">
                                    <Info size={20} className="flex-shrink-0 mt-0.5" />
                                    <span>Informe seus dados para receber os bônus do programa de indicação.</span>
                                </p>
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>
            </div>
        </ScrollArea>
    );
};

export default ClientProfile;