import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Megaphone, Loader2, Send, FileText, Calendar, MapPin, Box, Users, Package, Weight, ArrowRight, Sparkles, Home } from 'lucide-react';
import { useData } from '@/contexts/DataContext';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";

const QuoteRequestManager = ({ isClientPortal = false, clientData }) => {
    const { loading, addQuoteRequest, earningsConfig } = useData();
    const { toast } = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const getInitialState = () => ({
        client_name: isClientPortal && clientData ? clientData.name : '',
        client_email: isClientPortal && clientData ? clientData.email : '',
        client_phone: isClientPortal && clientData ? clientData.phone : '',
        client_id: isClientPortal && clientData ? clientData.id : null,
        address_full: isClientPortal && clientData ? clientData.address : '',
        address_proof_file: null,
        transport_date: '',
        is_date_flexible: null,
        origin_city_state: '',
        destination_city_state: '',
        has_stairs: null,
        has_easy_access: null,
        has_basement: null,
        needs_helper: null,
        needs_packing_service: null,
        packing_details: '',
        needs_packing_materials: null,
        materials_details: '',
        cargo_weight: '',
        cargo_volume: '',
        cargo_quantity: '',
        is_priority: false,
        details: '',
        file: null,
    });
    
    const [formData, setFormData] = useState(getInitialState());

    useEffect(() => {
        if (clientData) {
            setFormData(prev => ({ ...prev, ...getInitialState() }));
        }
    }, [clientData, isClientPortal]);

    const handleFileChange = (e, field) => {
        setFormData({ ...formData, [field]: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await addQuoteRequest(formData);
            toast({ title: "Solicitação Enviada!", description: "Seu pedido de orçamento foi enviado para análise." });
            setFormData(getInitialState());
        } catch (error) {
            console.error("Failed to submit quote request:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (loading && !isClientPortal) {
        return (
            <div className="flex items-center justify-center h-full">
                <Loader2 className="h-8 w-8 animate-spin text-blue-400" />
                <p className="ml-4 text-white text-xl">Carregando...</p>
            </div>
        );
    }
    
    const QuestionCard = ({ icon, title, children }) => (
        <Card className="glass-effect border-white/20">
            <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-4">
                {icon}
                <CardTitle className="text-lg text-white">{title}</CardTitle>
            </CardHeader>
            <CardContent>{children}</CardContent>
        </Card>
    );

    const RadioQuestion = ({ field, label, onValueChange }) => (
        <div className="space-y-2">
            <Label className="text-base text-gray-300">{label}</Label>
            <RadioGroup value={formData[field]?.toString()} onValueChange={(value) => onValueChange(field, value === 'true')} className="flex gap-6 pt-2">
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="true" id={`${field}-yes`} className="text-green-400 border-gray-500" />
                    <Label htmlFor={`${field}-yes`} className="text-base">Sim</Label>
                </div>
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="false" id={`${field}-no`} className="text-red-400 border-gray-500" />
                    <Label htmlFor={`${field}-no`} className="text-base">Não</Label>
                </div>
            </RadioGroup>
        </div>
    );
    
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
        <div className="space-y-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <h1 className="text-3xl font-bold gradient-text mb-2">Solicitar Orçamento de Transporte</h1>
                <p className="text-gray-400">Preencha o questionário abaixo para receber orçamentos precisos.</p>
            </motion.div>

            <form onSubmit={handleSubmit} className="space-y-8">
                <QuestionCard icon={<Users className="h-8 w-8 text-blue-400" />} title="Informações de Contato e Endereço">
                    <div className="space-y-6">
                        {!isClientPortal && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <Input id="client_name" value={formData.client_name} onChange={(e) => setFormData({ ...formData, client_name: e.target.value })} className="bg-white/10 text-base p-4 h-12" placeholder="Nome Completo" required />
                                <Input id="client_email" type="email" value={formData.client_email} onChange={(e) => setFormData({ ...formData, client_email: e.target.value })} className="bg-white/10 text-base p-4 h-12" placeholder="Email" required />
                            </div>
                        )}
                        <Input id="client_phone" value={formData.client_phone} onChange={(e) => setFormData({ ...formData, client_phone: e.target.value })} className="bg-white/10 text-base p-4 h-12" placeholder="Telefone / WhatsApp" required />
                        
                        <div>
                            <Label htmlFor="address_full" className="text-base text-gray-300">Endereço atual completo *</Label>
                            <Input id="address_full" value={formData.address_full} onChange={(e) => setFormData({ ...formData, address_full: e.target.value })} className="bg-white/10 mt-2 text-base p-4 h-12" placeholder="Rua, Número, Bairro, Cidade, Estado, CEP" required />
                        </div>
                        <FileInput id="address_proof_file" label="Comprovante de Residência" onChange={(e) => handleFileChange(e, 'address_proof_file')} value={formData.address_proof_file} isRequired={true} />
                    </div>
                </QuestionCard>


                <QuestionCard icon={<Calendar className="h-8 w-8 text-purple-400" />} title="1. Data do Transporte">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <Label htmlFor="transport_date" className="text-base text-gray-300">Qual a data que gostaria de fazer o transporte?</Label>
                            <Input id="transport_date" value={formData.transport_date} onChange={(e) => setFormData({ ...formData, transport_date: e.target.value })} className="bg-white/10 mt-2 text-base p-4 h-12" placeholder="DD/MM/AAAA" required />
                        </div>
                        <RadioQuestion field="is_date_flexible" label="Essa data é flexível?" onValueChange={(field, value) => setFormData({...formData, [field]: value})} />
                    </div>
                </QuestionCard>

                <QuestionCard icon={<MapPin className="h-8 w-8 text-green-400" />} title="2. Origem e Destino">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <Label htmlFor="origin_city_state" className="text-base text-gray-300">Qual a Cidade e Estado de carregamento?</Label>
                            <Input id="origin_city_state" value={formData.origin_city_state} onChange={(e) => setFormData({ ...formData, origin_city_state: e.target.value })} className="bg-white/10 mt-2 text-base p-4 h-12" placeholder="Cidade, Estado" required />
                        </div>
                        <div>
                            <Label htmlFor="destination_city_state" className="text-base text-gray-300">Qual a Cidade e Estado de descarregamento?</Label>
                            <Input id="destination_city_state" value={formData.destination_city_state} onChange={(e) => setFormData({ ...formData, destination_city_state: e.target.value })} className="bg-white/10 mt-2 text-base p-4 h-12" placeholder="Cidade, Estado" required />
                        </div>
                    </div>
                </QuestionCard>

                <QuestionCard icon={<ArrowRight className="h-8 w-8 text-yellow-400" />} title="3. Detalhes de Acesso">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <RadioQuestion field="has_stairs" label="Existe escada nos locais?" onValueChange={(field, value) => setFormData({...formData, [field]: value})} />
                        <RadioQuestion field="has_easy_access" label="Itens passam com facilidade?" onValueChange={(field, value) => setFormData({...formData, [field]: value})} />
                        <RadioQuestion field="has_basement" label="Tem porões ou subsolos?" onValueChange={(field, value) => setFormData({...formData, [field]: value})} />
                    </div>
                </QuestionCard>

                <QuestionCard icon={<Box className="h-8 w-8 text-orange-400" />} title="4. Serviços Adicionais">
                    <Alert className="glass-effect border-yellow-400/50 text-yellow-300 mb-6">
                        <Megaphone className="h-5 w-5 text-yellow-400" />
                        <AlertTitle className="text-yellow-200 font-bold">Avisos Importantes</AlertTitle>
                        <AlertDescription className="text-yellow-300/90">
                            <ul className="list-disc pl-5 mt-2 space-y-1">
                                <li>O motorista não ajuda a carregar ou descarregar, somente recebe e solta os itens nas portas do Baú.</li>
                                <li>Não desmontamos e montamos qualquer tipo de móveis.</li>
                                <li>Não transportamos animais de qualquer espécie.</li>
                            </ul>
                        </AlertDescription>
                    </Alert>
                    <div className="space-y-6">
                        <RadioQuestion field="needs_helper" label="Precisa de ajudante(s) para carregar e/ou descarregar?" onValueChange={(field, value) => setFormData({...formData, [field]: value})} />
                        <div>
                            <RadioQuestion field="needs_packing_service" label="Precisa do serviço de embalar e encaixotar itens?" onValueChange={(field, value) => setFormData({...formData, [field]: value})} />
                            {formData.needs_packing_service && <Textarea value={formData.packing_details} onChange={(e) => setFormData({...formData, packing_details: e.target.value})} className="bg-white/10 mt-2 text-base p-4" placeholder="Descreva o que precisa ser embalado e encaixotado." />}
                        </div>
                        <div>
                            <RadioQuestion field="needs_packing_materials" label="Precisa de caixas e outros materiais para embalagem?" onValueChange={(field, value) => setFormData({...formData, [field]: value})} />
                            {formData.needs_packing_materials && <Textarea value={formData.materials_details} onChange={(e) => setFormData({...formData, materials_details: e.target.value})} className="bg-white/10 mt-2 text-base p-4" placeholder="Quais materiais e a quantidade de cada um?" />}
                        </div>
                    </div>
                </QuestionCard>

                <QuestionCard icon={<Package className="h-8 w-8 text-cyan-400" />} title="5. Detalhes da Carga">
                    <div className="space-y-4">
                        <div>
                            <Label className="text-base text-gray-300">Se for uma carga (não mudança), insira os detalhes abaixo:</Label>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
                                <Input value={formData.cargo_weight} onChange={(e) => setFormData({...formData, cargo_weight: e.target.value})} className="bg-white/10 p-4 h-12 text-base" placeholder="Peso (Kg)" />
                                <Input value={formData.cargo_volume} onChange={(e) => setFormData({...formData, cargo_volume: e.target.value})} className="bg-white/10 p-4 h-12 text-base" placeholder="Cubagem (m³)" />
                                <Input value={formData.cargo_quantity} onChange={(e) => setFormData({...formData, cargo_quantity: e.target.value})} className="bg-white/10 p-4 h-12 text-base" placeholder="Qtde. de Volumes" />
                            </div>
                        </div>
                        <div>
                            <Label htmlFor="details" className="text-base text-gray-300">Observações e lista de itens</Label>
                            <Textarea id="details" value={formData.details} onChange={(e) => setFormData({ ...formData, details: e.target.value })} className="bg-white/10 mt-2 text-base p-4" rows={5} placeholder="Envie uma lista com todos os itens a serem transportados, incluindo medidas dos maiores itens (altura, largura, comprimento)." required />
                        </div>
                        <FileInput id="file" label="Anexar lista ou vídeo (Opcional)" onChange={(e) => handleFileChange(e, 'file')} value={formData.file} />
                    </div>
                </QuestionCard>

                <Alert className="glass-effect border-red-400/50 text-red-300">
                    <Megaphone className="h-5 w-5 text-red-400" />
                    <AlertTitle className="text-red-200 font-bold">ATENÇÃO</AlertTitle>
                    <AlertDescription className="text-red-300/90">
                        Qualquer item ou objeto que for acrescentado depois que passarmos o nosso orçamento, não será transportado por nós, mas caso ainda tenha espaço no caminhão será cobrado um valor de adicional por unidade que exceda com o nosso combinado.
                    </AlertDescription>
                </Alert>

                <Card className="glass-effect border-purple-400/50">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-3 text-purple-300"><Sparkles /> Transporte Prioritário</CardTitle>
                        <CardDescription className="text-purple-400/80">Precisa que seu transporte seja tratado com urgência máxima?</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center space-x-4 rounded-md border border-white/10 p-4">
                            <div className="flex-1 space-y-1">
                                <p className="text-sm font-medium leading-none text-white">
                                    Marcar como Prioritário
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    Será aplicada uma taxa de R$ {earningsConfig?.priority_fee?.toFixed(2) || '0.00'} para agilizar seu pedido.
                                </p>
                            </div>
                            <Switch
                                checked={formData.is_priority}
                                onCheckedChange={(checked) => setFormData({...formData, is_priority: checked})}
                                className="data-[state=checked]:bg-purple-500"
                            />
                        </div>
                    </CardContent>
                </Card>

                <Button type="submit" className="w-full btn-gradient text-lg py-6" disabled={isSubmitting}>
                    {isSubmitting ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <><Send className="mr-2 h-5 w-5" /> Enviar Solicitação</>}
                </Button>
            </form>
        </div>
    );
};

export default QuoteRequestManager;