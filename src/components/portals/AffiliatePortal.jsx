import React from 'react';
import { Helmet } from 'react-helmet';
import { useData } from '@/contexts/DataContext';
import { Toaster } from '@/components/ui/toaster';
import AffiliateLayout from '@/components/portals/AffiliateLayout';
import ReferralManager from '@/components/ReferralManager';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { motion } from 'framer-motion';
import AffiliateNotifications from '@/components/portals/AffiliateNotifications';
import { Loader2 } from 'lucide-react';
import IndicadorAfiliado from '@/components/IndicadorAfiliado';

const AffiliateProfile = ({ affiliate, onUpdate }) => {
    const [name, setName] = React.useState(affiliate.name);
    const [email, setEmail] = React.useState(affiliate.email);
    const [bankName, setBankName] = React.useState(affiliate.bank_name || '');
    const [agency, setAgency] = React.useState(affiliate.agency || '');
    const [accountNumber, setAccountNumber] = React.useState(affiliate.account_number || '');
    const [pixKey, setPixKey] = React.useState(affiliate.pix_key || '');
    const { toast } = useToast();

    const handleSave = () => {
        onUpdate('affiliates', { id: affiliate.id, name, email, bank_name: bankName, agency, account_number: accountNumber, pix_key: pixKey });
        toast({ title: 'Sucesso!', description: 'Seu perfil foi atualizado.' });
    };

    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Card className="glass-effect border-white/20">
                <CardHeader>
                    <CardTitle className="text-white">Meu Perfil de Afiliado</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div>
                        <Label htmlFor="name" className="text-gray-300">Nome Completo</Label>
                        <Input id="name" value={name} onChange={e => setName(e.target.value)} className="bg-white/10 text-white" />
                    </div>
                    <div>
                        <Label htmlFor="email" className="text-gray-300">Email</Label>
                        <Input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} className="bg-white/10 text-white" />
                    </div>
                     <h3 className="font-semibold text-xl text-blue-300 border-b border-blue-300/20 pb-2 pt-4">Dados Bancários</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="bankName" className="text-gray-300">Nome do Banco</Label>
                            <Input id="bankName" value={bankName} onChange={e => setBankName(e.target.value)} className="bg-white/10 text-white" />
                        </div>
                        <div>
                            <Label htmlFor="agency" className="text-gray-300">Agência</Label>
                            <Input id="agency" value={agency} onChange={e => setAgency(e.target.value)} className="bg-white/10 text-white" />
                        </div>
                    </div>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="accountNumber" className="text-gray-300">Número da Conta</Label>
                            <Input id="accountNumber" value={accountNumber} onChange={e => setAccountNumber(e.target.value)} className="bg-white/10 text-white" />
                        </div>
                        <div>
                            <Label htmlFor="pixKey" className="text-gray-300">Chave PIX</Label>
                            <Input id="pixKey" value={pixKey} onChange={e => setPixKey(e.target.value)} className="bg-white/10 text-white" />
                        </div>
                    </div>
                    <Button onClick={handleSave} className="btn-gradient">Salvar Alterações</Button>
                </CardContent>
            </Card>
        </motion.div>
    );
};


const AffiliatePortal = () => {
  const { affiliateId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = React.useState('referrals');

  const { affiliates, loading, saveRecord } = useData();

  const currentAffiliate = React.useMemo(() => affiliates.find(a => a.id === affiliateId), [affiliates, affiliateId]);

  React.useEffect(() => {
    if (!loading && !currentAffiliate) {
      navigate('/acessar');
    }
  }, [loading, currentAffiliate, navigate]);

  const renderContent = () => {
    if (loading || !currentAffiliate) {
      return (
        <div className="w-full h-full flex flex-col items-center justify-center bg-slate-900/50">
            <Loader2 className="h-12 w-12 animate-spin text-blue-500" />
            <p className="mt-4 text-lg text-white">Carregando dados do afiliado...</p>
        </div>
      );
    }
    
    switch (activeTab) {
      case 'referrals':
        return <ReferralManager user={currentAffiliate} userType="affiliate" />;
      case 'notifications':
        return <AffiliateNotifications affiliate={currentAffiliate} />;
      case 'profile':
        return <AffiliateProfile affiliate={currentAffiliate} onUpdate={saveRecord} />;
      default:
        return <ReferralManager user={currentAffiliate} userType="affiliate" />;
    }
  };

  return (
    <>
      <Helmet>
        <title>{`Portal do Afiliado - ${currentAffiliate ? currentAffiliate.name : 'Carregando...'}`}</title>
        <meta name="description" content="Seu portal para gerenciar indicações e ganhos." />
      </Helmet>
      
      <AffiliateLayout
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        affiliateName={currentAffiliate ? currentAffiliate.name : ''}
      >
        <div className="p-4 sm:p-6 lg:p-8">
            {currentAffiliate && <IndicadorAfiliado userId={currentAffiliate.id} />}
            <div className="mt-6">
                {renderContent()}
            </div>
        </div>
      </AffiliateLayout>

      <Toaster />
    </>
  );
};

export default AffiliatePortal;