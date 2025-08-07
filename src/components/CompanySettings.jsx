import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { Save, Building, Mail, MessageSquare, ShieldCheck, Loader2 } from 'lucide-react';
import { useData } from '@/contexts/DataContext';

const CompanySettings = () => {
  const { companyInfo, updateCompanyInfo, saveCompanyInfo, loading } = useData();
  const [isSaving, setIsSaving] = useState(false);
  const [initialData, setInitialData] = useState(null);
  const { toast } = useToast();

  useEffect(() => {
    if (companyInfo && !initialData) {
      setInitialData(JSON.parse(JSON.stringify(companyInfo)));
    }
  }, [companyInfo, initialData]);

  const hasChanged = companyInfo && initialData ? JSON.stringify(companyInfo) !== JSON.stringify(initialData) : false;

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const savedData = await saveCompanyInfo(companyInfo);
      setInitialData(JSON.parse(JSON.stringify(savedData)));
      toast({
        title: "Informações Salvas!",
        description: "Os dados da sua empresa foram atualizados com sucesso.",
      });
    } catch (error) {
      toast({
        title: "Erro ao Salvar",
        description: "Não foi possível atualizar os dados. Por favor, tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    updateCompanyInfo(id, value);
  };
  
  if (loading || !companyInfo) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="h-8 w-8 animate-spin text-blue-400" />
        <p className="ml-4 text-white text-xl">Carregando dados da empresa...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold gradient-text mb-2">Dados da Empresa</h1>
        <p className="text-gray-400">Gerencie as informações públicas da sua plataforma.</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Card className="glass-effect border-white/20">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Building className="h-5 w-5" />
              Informações de Contato e Fiscais
            </CardTitle>
            <CardDescription className="text-gray-300">
              Estes dados serão exibidos na página "Sobre Nós".
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Razão Social</Label>
                <div className="relative mt-1">
                  <Input
                    id="name"
                    value={companyInfo.name || ''}
                    onChange={handleChange}
                    className="bg-white/10 border-white/20 text-white pl-8"
                  />
                  <Building className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                </div>
              </div>
              <div>
                <Label htmlFor="cnpj">CNPJ</Label>
                <div className="relative mt-1">
                  <Input
                    id="cnpj"
                    value={companyInfo.cnpj || ''}
                    onChange={handleChange}
                    className="bg-white/10 border-white/20 text-white pl-8"
                  />
                  <ShieldCheck className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="email">E-mail de Contato</Label>
                <div className="relative mt-1">
                  <Input
                    id="email"
                    type="email"
                    value={companyInfo.email || ''}
                    onChange={handleChange}
                    className="bg-white/10 border-white/20 text-white pl-8"
                  />
                  <Mail className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                </div>
              </div>
              <div>
                <Label htmlFor="whatsapp">WhatsApp</Label>
                <div className="relative mt-1">
                  <Input
                    id="whatsapp"
                    value={companyInfo.whatsapp || ''}
                    onChange={handleChange}
                    className="bg-white/10 border-white/20 text-white pl-8"
                  />
                  <MessageSquare className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                </div>
              </div>
            </div>
            <div className="flex justify-end pt-4">
              <Button onClick={handleSave} className="btn-gradient" disabled={isSaving || !hasChanged}>
                {isSaving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Salvando...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Salvar Alterações
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default CompanySettings;