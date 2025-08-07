import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useToast } from '@/components/ui/use-toast';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Send, List, Video, Weight, Zap } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useData } from '@/contexts/DataContext';

const QuoteRequestForm = ({ quoteRequests, setQuoteRequests, clients }) => {
  const { toast } = useToast();
  const { earningsConfig } = useData();

  const initialFormData = {
    clientId: '',
    transportDate: '',
    isDateFlexible: '',
    originCityState: '',
    destinationCityState: '',
    hasStairs: '',
    hasEasyAccess: '',
    hasBasement: '',
    needsAssembler: '',
    needsHelper: '',
    packingDetails: '',
    packagingMaterialDetails: '',
    itemsList: '',
    videoUrl: '',
    cargoWeightCubage: '',
    isPriority: false,
  };
  const [formData, setFormData] = useState(initialFormData);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newQuoteRequest = {
      ...formData,
      id: `QR-${Date.now()}`,
      createdAt: new Date().toISOString(),
      status: 'pending'
    };
    setQuoteRequests([...quoteRequests, newQuoteRequest]);
    toast({
      title: "Solicitação Enviada!",
      description: "Sua solicitação de orçamento foi enviada. Em breve, transportadores entrarão em contato.",
    });
    setFormData(initialFormData);
  };

  const renderQuestion = (id, label, component, icon) => (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="p-4 bg-white/5 rounded-lg border border-white/10"
    >
      <Label htmlFor={id} className="text-base font-medium text-white flex items-center gap-2">
        {icon}
        {label}
      </Label>
      <div className="mt-3">{component}</div>
    </motion.div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <Card className="glass-effect border-white/20">
        <CardHeader>
          <CardTitle className="gradient-text">Detalhes do Transporte</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <Alert className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 border-purple-400/50 text-purple-200">
                <Zap className="h-5 w-5 text-purple-300" />
                <AlertTitle className="text-purple-200 font-bold">Anúncio Prioritário (Opcional)</AlertTitle>
                <AlertDescription className="text-purple-200/90 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                  <div>
                    <p>Destaque seu anúncio para receber propostas mais rápido.</p>
                    <p className="font-bold text-sm">Taxa única: R$ {Number(earningsConfig?.priority_fee || 0).toFixed(2).replace('.', ',')}</p>
                  </div>
                  <Switch
                    checked={formData.isPriority}
                    onCheckedChange={(checked) => setFormData({ ...formData, isPriority: checked })}
                    aria-label="Anúncio prioritário"
                  />
                </AlertDescription>
            </Alert>
            
            {renderQuestion("clientId", "Quem está solicitando?", (
              <Select required value={formData.clientId} onValueChange={(value) => setFormData({...formData, clientId: value})}>
                <SelectTrigger className="bg-white/10 border-white/20 text-white">
                  <SelectValue placeholder="Selecione o cliente" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-white/20">
                  {clients.map(client => (
                    <SelectItem key={client.id} value={client.id}>{client.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ))}

            {renderQuestion("itemsList", "Lista de Itens e Medidas", (
              <Textarea id="itemsList" value={formData.itemsList} onChange={(e) => setFormData({...formData, itemsList: e.target.value})} className="bg-white/10 border-white/20 text-white" placeholder="Liste todos os itens e as medidas dos maiores (altura, largura, comprimento)." required rows={5} />
            ), <List className="h-5 w-5" />)}

            {renderQuestion("videoUrl", "Link do Vídeo (Opcional)", (
              <Input id="videoUrl" value={formData.videoUrl} onChange={(e) => setFormData({...formData, videoUrl: e.target.value})} className="bg-white/10 border-white/20 text-white" placeholder="Cole aqui o link de um vídeo mostrando os itens" />
            ), <Video className="h-5 w-5" />)}

            {renderQuestion("transportDate", "1. Qual a data que gostaria de fazer o transporte?", (
              <Input id="transportDate" type="date" value={formData.transportDate} onChange={(e) => setFormData({...formData, transportDate: e.target.value})} className="bg-white/10 border-white/20 text-white" required />
            ))}

            {renderQuestion("isDateFlexible", "2. Essa data é flexível?", (
              <RadioGroup id="isDateFlexible" required value={formData.isDateFlexible} onValueChange={(value) => setFormData({...formData, isDateFlexible: value})} className="flex gap-4">
                <div className="flex items-center space-x-2"><RadioGroupItem value="sim" id="r-flex-yes" /><Label htmlFor="r-flex-yes">Sim</Label></div>
                <div className="flex items-center space-x-2"><RadioGroupItem value="nao" id="r-flex-no" /><Label htmlFor="r-flex-no">Não</Label></div>
              </RadioGroup>
            ))}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {renderQuestion("originCityState", "3. Qual a Cidade e Estado de carregamento?", (
                <Input id="originCityState" value={formData.originCityState} onChange={(e) => setFormData({...formData, originCityState: e.target.value})} className="bg-white/10 border-white/20 text-white" placeholder="Ex: São Paulo, SP" required />
              ))}
              {renderQuestion("destinationCityState", "4. Qual a Cidade e Estado de descarregamento?", (
                <Input id="destinationCityState" value={formData.destinationCityState} onChange={(e) => setFormData({...formData, destinationCityState: e.target.value})} className="bg-white/10 border-white/20 text-white" placeholder="Ex: Rio de Janeiro, RJ" required />
              ))}
            </div>

            {renderQuestion("hasStairs", "5. Existe algum tipo de Escada nos locais?", (
              <RadioGroup id="hasStairs" required value={formData.hasStairs} onValueChange={(value) => setFormData({...formData, hasStairs: value})} className="flex gap-4">
                <div className="flex items-center space-x-2"><RadioGroupItem value="sim" id="r-stairs-yes" /><Label htmlFor="r-stairs-yes">Sim</Label></div>
                <div className="flex items-center space-x-2"><RadioGroupItem value="nao" id="r-stairs-no" /><Label htmlFor="r-stairs-no">Não</Label></div>
              </RadioGroup>
            ))}

            {renderQuestion("hasEasyAccess", "6. Os itens passam sem dificuldades por portas, corredores, etc?", (
              <RadioGroup id="hasEasyAccess" required value={formData.hasEasyAccess} onValueChange={(value) => setFormData({...formData, hasEasyAccess: value})} className="flex gap-4">
                <div className="flex items-center space-x-2"><RadioGroupItem value="sim" id="r-access-yes" /><Label htmlFor="r-access-yes">Sim</Label></div>
                <div className="flex items-center space-x-2"><RadioGroupItem value="nao" id="r-access-no" /><Label htmlFor="r-access-no">Não</Label></div>
              </RadioGroup>
            ))}

            {renderQuestion("hasBasement", "7. Teremos que circular em porões ou subsolos?", (
              <RadioGroup id="hasBasement" required value={formData.hasBasement} onValueChange={(value) => setFormData({...formData, hasBasement: value})} className="flex gap-4">
                <div className="flex items-center space-x-2"><RadioGroupItem value="sim" id="r-basement-yes" /><Label htmlFor="r-basement-yes">Sim</Label></div>
                <div className="flex items-center space-x-2"><RadioGroupItem value="nao" id="r-basement-no" /><Label htmlFor="r-basement-no">Não</Label></div>
              </RadioGroup>
            ))}

            {renderQuestion("needsAssembler", "8. Precisa de montador de móveis?", (
              <RadioGroup id="needsAssembler" required value={formData.needsAssembler} onValueChange={(value) => setFormData({...formData, needsAssembler: value})} className="flex gap-4">
                <div className="flex items-center space-x-2"><RadioGroupItem value="sim" id="r-assembler-yes" /><Label htmlFor="r-assembler-yes">Sim</Label></div>
                <div className="flex items-center space-x-2"><RadioGroupItem value="nao" id="r-assembler-no" /><Label htmlFor="r-assembler-no">Não</Label></div>
              </RadioGroup>
            ))}

            {renderQuestion("needsHelper", "9. Precisa de ajudante(s) para carregar/descarregar?", (
              <RadioGroup id="needsHelper" required value={formData.needsHelper} onValueChange={(value) => setFormData({...formData, needsHelper: value})} className="flex gap-4">
                <div className="flex items-center space-x-2"><RadioGroupItem value="sim" id="r-helper-yes" /><Label htmlFor="r-helper-yes">Sim</Label></div>
                <div className="flex items-center space-x-2"><RadioGroupItem value="nao" id="r-helper-no" /><Label htmlFor="r-helper-no">Não</Label></div>
              </RadioGroup>
            ))}

            {renderQuestion("packingDetails", "10. Precisa que seja feito o serviço de embalar e encaixotar itens?", (
              <Textarea id="packingDetails" value={formData.packingDetails} onChange={(e) => setFormData({...formData, packingDetails: e.target.value})} className="bg-white/10 border-white/20 text-white" placeholder="Responda 'Sim' ou 'Não'. Se sim, descreva o que precisa ser embalado." required />
            ))}

            {renderQuestion("packagingMaterialDetails", "11. Precisa de caixas e outros materiais para embalagem?", (
              <Textarea id="packagingMaterialDetails" value={formData.packagingMaterialDetails} onChange={(e) => setFormData({...formData, packagingMaterialDetails: e.target.value})} className="bg-white/10 border-white/20 text-white" placeholder="Responda 'Sim' ou 'Não'. Se sim, liste os materiais e quantidades." required />
            ))}

            {renderQuestion("cargoWeightCubage", "12. Se for uma carga (não mudança), qual o peso e a cubagem?", (
              <Input id="cargoWeightCubage" value={formData.cargoWeightCubage} onChange={(e) => setFormData({...formData, cargoWeightCubage: e.target.value})} className="bg-white/10 border-white/20 text-white" placeholder="Ex: 500kg, 2.5m³" />
            ), <Weight className="h-5 w-5" />)}

            <Button type="submit" className="w-full btn-gradient text-lg py-6">
              <Send className="h-5 w-5 mr-2" />
              Enviar Solicitação de Orçamento
            </Button>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default QuoteRequestForm;