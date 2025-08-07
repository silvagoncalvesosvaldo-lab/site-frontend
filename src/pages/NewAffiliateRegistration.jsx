import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useData } from '@/contexts/DataContext';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Loader2, Users } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

const NewAffiliateRegistration = () => {
    const { saveRecord } = useData();
    const { toast } = useToast();
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        bank_name: '',
        agency: '',
        account_number: '',
        pix_key: '',
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const ref = localStorage.getItem('referral_id');
            const affiliateData = {
                ...formData,
                id: uuidv4(),
                status: 'active',
                referred_by: ref || null,
            };
            await saveRecord('affiliates', affiliateData);
            toast({
                title: 'Cadastro realizado com sucesso!',
                description: 'O novo afiliado foi adicionado à plataforma.',
            });
            if (ref) localStorage.removeItem('referral_id');
            setFormData({
                name: '', email: '', phone: '', bank_name: '', agency: '', account_number: '', pix_key: '',
            });
            setTimeout(() => navigate('/'), 2000);
        } catch (error) {
            toast({
                title: 'Erro ao cadastrar',
                description: `Não foi possível salvar os dados do afiliado: ${error.message}`,
                variant: 'destructive',
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <Helmet>
                <title>Cadastro de Afiliado Novo</title>
                <meta name="description" content="Página para cadastrar novos afiliados na plataforma." />
            </Helmet>
            <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4 bg-gradient-to-br from-slate-900 via-gray-900 to-slate-900">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                    className="w-full max-w-2xl"
                >
                    <Card className="glass-effect text-white border-white/20">
                        <CardHeader className="text-center">
                            <div className="flex justify-center items-center mb-4">
                               <Users className="h-10 w-10 text-teal-400" />
                            </div>
                            <CardTitle className="text-3xl font-bold gradient-text-green">Cadastro de Afiliado Novo</CardTitle>
                            <CardDescription className="text-gray-300 pt-2 text-base">
                                Preencha os dados abaixo para adicionar um novo afiliado.
                            </CardDescription>
                        </CardHeader>
                        <form onSubmit={handleSubmit}>
                            <CardContent className="space-y-6">
                                <div>
                                    <h3 className="font-semibold text-lg text-teal-300 border-b border-teal-300/20 pb-2">Informações Pessoais</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                                        <div>
                                            <Label htmlFor="name">Nome (obrigatório)</Label>
                                            <Input id="name" value={formData.name} onChange={handleChange} required className="bg-white/10 p-4 h-12 text-base" />
                                        </div>
                                        <div>
                                            <Label htmlFor="email">E-mail (obrigatório)</Label>
                                            <Input id="email" type="email" value={formData.email} onChange={handleChange} required className="bg-white/10 p-4 h-12 text-base" />
                                        </div>
                                    </div>
                                    <div className="pt-4">
                                        <Label htmlFor="phone">Telefone (obrigatório)</Label>
                                        <Input id="phone" type="tel" value={formData.phone} onChange={handleChange} required className="bg-white/10 p-4 h-12 text-base" />
                                    </div>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg text-teal-300 border-b border-teal-300/20 pb-2">Informações Bancárias</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                                        <div>
                                            <Label htmlFor="bank_name">Banco (obrigatório)</Label>
                                            <Input id="bank_name" value={formData.bank_name} onChange={handleChange} required className="bg-white/10 p-4 h-12 text-base" />
                                        </div>
                                        <div>
                                            <Label htmlFor="agency">Agência (obrigatório)</Label>
                                            <Input id="agency" value={formData.agency} onChange={handleChange} required className="bg-white/10 p-4 h-12 text-base" />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                                        <div>
                                            <Label htmlFor="account_number">Conta (obrigatório)</Label>
                                            <Input id="account_number" value={formData.account_number} onChange={handleChange} required className="bg-white/10 p-4 h-12 text-base" />
                                        </div>
                                        <div>
                                            <Label htmlFor="pix_key">Chave Pix (obrigatório)</Label>
                                            <Input id="pix_key" value={formData.pix_key} onChange={handleChange} required className="bg-white/10 p-4 h-12 text-base" />
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button type="submit" className="w-full btn-gradient-green text-lg py-6" disabled={isSubmitting}>
                                    {isSubmitting ? <Loader2 className="mr-2 h-6 w-6 animate-spin" /> : 'Finalizar Cadastro'}
                                </Button>
                            </CardFooter>
                        </form>
                    </Card>
                </motion.div>
            </div>
        </>
    );
};

export default NewAffiliateRegistration;