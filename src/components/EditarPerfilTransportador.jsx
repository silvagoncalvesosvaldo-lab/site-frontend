import React, { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/customSupabaseClient';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { Loader2, Save, User, Mail, Phone, Truck, Home, CreditCard, Key } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { motion } from 'framer-motion';

const cargaOptions = [
    'Eletrônicos',
    'Móveis',
    'Carga Geral',
    'Carga Seca',
    'Produtos Perecíveis',
    'Veículos',
    'Materiais de Construção',
    'Produtos Químicos'
];

const EditarPerfilTransportador = ({ userId }) => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const { toast } = useToast();

    const fetchProfile = useCallback(async () => {
        if (!userId) return;
        setLoading(true);
        try {
            const { data, error } = await supabase
                .from('transporters')
                .select('*')
                .eq('id', userId)
                .single();
            if (error) throw error;
            setProfile({
                nome_completo: data.nome_completo || '',
                email: data.email || '',
                whatsapp: data.whatsapp || '',
                endereco: data.endereco || '',
                antt: data.antt || '',
                renavam: data.renavam || '',
                placa_veiculo: data.placa_veiculo || '',
                cpf: data.cpf || '',
                documento_rg: data.documento_rg || '',
                cnh: data.cnh || '',
                bank_name: data.bank_name || '',
                agency: data.agency || '',
                account_number: data.account_number || '',
                pix_key: data.pix_key || '',
                tipo_de_carga: data.tipo_de_carga || [],
            });
        } catch (error) {
            toast({
                title: 'Erro ao carregar perfil',
                description: 'Não foi possível buscar seus dados. ' + error.message,
                variant: 'destructive',
            });
        } finally {
            setLoading(false);
        }
    }, [userId, toast]);

    useEffect(() => {
        fetchProfile();
    }, [fetchProfile]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfile(prev => ({ ...prev, [name]: value }));
    };

    const handleCargaChange = (carga) => {
        setProfile(prev => {
            const currentCargas = prev.tipo_de_carga || [];
            const newCargas = currentCargas.includes(carga)
                ? currentCargas.filter(c => c !== carga)
                : [...currentCargas, carga];
            return { ...prev, tipo_de_carga: newCargas };
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            const { error } = await supabase
                .from('transporters')
                .update(profile)
                .eq('id', userId);

            if (error) throw error;

            toast({
                title: 'Sucesso!',
                description: 'Seu perfil foi atualizado com sucesso.',
            });
        } catch (error) {
            toast({
                title: 'Erro ao salvar',
                description: 'Não foi possível atualizar seu perfil. ' + error.message,
                variant: 'destructive',
            });
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <Loader2 className="h-8 w-8 animate-spin text-blue-400" />
                <p className="ml-4 text-lg">Carregando seu perfil...</p>
            </div>
        );
    }

    if (!profile) {
        return <p className="text-center text-red-400">Não foi possível carregar o perfil.</p>;
    }

    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Card className="bg-white/5 border border-white/10 backdrop-blur-lg">
                <CardHeader>
                    <CardTitle className="flex items-center text-2xl gap-3">
                        <User className="text-purple-400" /> Editar Perfil
                    </CardTitle>
                </CardHeader>
                <form onSubmit={handleSubmit}>
                    <CardContent className="space-y-8">
                        {/* Dados Pessoais */}
                        <div className="space-y-4">
                             <h3 className="text-lg font-semibold text-purple-300 border-b border-purple-300/20 pb-2 flex items-center gap-2"><User />Dados Pessoais</h3>
                             <div className="grid md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="nome_completo" className="text-gray-300">Nome Completo</Label>
                                    <Input id="nome_completo" name="nome_completo" value={profile.nome_completo} onChange={handleChange} className="bg-slate-800/50 border-slate-700 text-white" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email" className="text-gray-300">Email</Label>
                                    <Input id="email" name="email" type="email" value={profile.email} onChange={handleChange} className="bg-slate-800/50 border-slate-700 text-white" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="whatsapp" className="text-gray-300">WhatsApp</Label>
                                    <Input id="whatsapp" name="whatsapp" value={profile.whatsapp} onChange={handleChange} className="bg-slate-800/50 border-slate-700 text-white" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="cpf" className="text-gray-300">CPF</Label>
                                    <Input id="cpf" name="cpf" value={profile.cpf} onChange={handleChange} className="bg-slate-800/50 border-slate-700 text-white" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="documento_rg" className="text-gray-300">RG</Label>
                                    <Input id="documento_rg" name="documento_rg" value={profile.documento_rg} onChange={handleChange} className="bg-slate-800/50 border-slate-700 text-white" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="cnh" className="text-gray-300">CNH</Label>
                                    <Input id="cnh" name="cnh" value={profile.cnh} onChange={handleChange} className="bg-slate-800/50 border-slate-700 text-white" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="endereco" className="text-gray-300">Endereço Completo</Label>
                                    <Input id="endereco" name="endereco" value={profile.endereco} onChange={handleChange} className="bg-slate-800/50 border-slate-700 text-white" />
                                </div>
                             </div>
                        </div>

                         {/* Dados do Veículo */}
                         <div className="space-y-4">
                             <h3 className="text-lg font-semibold text-purple-300 border-b border-purple-300/20 pb-2 flex items-center gap-2"><Truck />Dados do Veículo e Carga</h3>
                             <div className="grid md:grid-cols-3 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="antt" className="text-gray-300">ANTT</Label>
                                    <Input id="antt" name="antt" value={profile.antt} onChange={handleChange} className="bg-slate-800/50 border-slate-700 text-white" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="renavam" className="text-gray-300">RENAVAM</Label>
                                    <Input id="renavam" name="renavam" value={profile.renavam} onChange={handleChange} className="bg-slate-800/50 border-slate-700 text-white" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="placa_veiculo" className="text-gray-300">Placa do Veículo</Label>
                                    <Input id="placa_veiculo" name="placa_veiculo" value={profile.placa_veiculo} onChange={handleChange} className="bg-slate-800/50 border-slate-700 text-white" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label className="text-gray-300">Tipos de Carga que Transporta</Label>
                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 bg-slate-800/50 border border-slate-700 rounded-md">
                                    {cargaOptions.map(carga => (
                                        <div key={carga} className="flex items-center space-x-2">
                                            <Checkbox
                                                id={`carga-${carga}`}
                                                checked={profile.tipo_de_carga.includes(carga)}
                                                onCheckedChange={() => handleCargaChange(carga)}
                                                className="border-slate-500 data-[state=checked]:bg-purple-500 data-[state=checked]:border-purple-500"
                                            />
                                            <Label htmlFor={`carga-${carga}`} className="text-gray-200 cursor-pointer">{carga}</Label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                         </div>
                        
                        {/* Dados Bancários */}
                         <div className="space-y-4">
                             <h3 className="text-lg font-semibold text-purple-300 border-b border-purple-300/20 pb-2 flex items-center gap-2"><CreditCard />Dados Bancários</h3>
                             <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="bank_name" className="text-gray-300">Nome do Banco</Label>
                                    <Input id="bank_name" name="bank_name" value={profile.bank_name} onChange={handleChange} className="bg-slate-800/50 border-slate-700 text-white" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="agency" className="text-gray-300">Agência</Label>
                                    <Input id="agency" name="agency" value={profile.agency} onChange={handleChange} className="bg-slate-800/50 border-slate-700 text-white" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="account_number" className="text-gray-300">Número da Conta</Label>
                                    <Input id="account_number" name="account_number" value={profile.account_number} onChange={handleChange} className="bg-slate-800/50 border-slate-700 text-white" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="pix_key" className="text-gray-300">Chave PIX</Label>
                                    <Input id="pix_key" name="pix_key" value={profile.pix_key} onChange={handleChange} className="bg-slate-800/50 border-slate-700 text-white" />
                                </div>
                             </div>
                        </div>

                    </CardContent>
                    <CardFooter>
                        <Button type="submit" disabled={saving} className="w-full bg-purple-600 hover:bg-purple-700 text-white text-lg py-6">
                            {saving ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <Save className="mr-2 h-5 w-5" />}
                            {saving ? 'Salvar Alterações' : 'Salvar Alterações'}
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </motion.div>
    );
};

export default EditarPerfilTransportador;