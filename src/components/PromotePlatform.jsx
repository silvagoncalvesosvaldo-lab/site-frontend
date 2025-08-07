import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Gift, Copy, Check, Share2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Helmet } from 'react-helmet';

const PromotePlatform = () => {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  const referralLink = `${window.location.origin}/?ref=platform_owner`;

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    toast({
      title: "Link Copiado!",
      description: "Seu link de administrador está pronto para ser compartilhado.",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <Helmet>
        <title>Promova a Plataforma - Admin</title>
        <meta name="description" content="Use seu link de administrador para indicar novos usuários e afiliados." />
      </Helmet>
      <div className="space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold gradient-text mb-2">Promova a Plataforma</h1>
          <p className="text-gray-400">Use seu link de administrador para convidar novos usuários e afiliados para a plataforma.</p>
        </motion.div>

        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
        >
            <Card className="glass-effect border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2"><Share2 className="h-6 w-6 text-blue-400" /> Seu Link de Administrador</CardTitle>
                <CardDescription>Este link identifica as indicações como vindas diretamente de você, o dono da plataforma.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="mb-4 p-4 bg-blue-50 border border-blue-300 rounded-lg shadow-sm">
                  <p className="text-blue-800 font-semibold mb-2">
                    Cadastro gratuito e uso da plataforma é isento de mensalidade.
                  </p>
                  <p className="text-blue-800 text-sm">
                    COM ESSE CONVITE VOCÊ PODE SE CADASTRAR E SE TORNAR:
                    <br />- Cliente; que tem algo para ser transportado.
                    <br />- Transportador, tem um veículo e atende as exigências da plataforma.
                    <br />- Afiliado, que quer uma renda adicional ou principal mensal.
                  </p>
                </div>
                <p className="text-gray-300">
                    Compartilhe este link para atrair clientes, motoristas e afiliados. Você poderá acompanhar o crescimento da sua rede diretamente pelo painel.
                </p>
                <div className="flex gap-2">
                  <Input readOnly value={referralLink} className="bg-white/10 border-white/20 text-white" />
                  <Button onClick={handleCopy} size="icon" className="btn-gradient-blue flex-shrink-0">
                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
                <Button className="w-full btn-gradient" onClick={handleCopy}>Compartilhar Link Mestre</Button>
              </CardContent>
            </Card>
        </motion.div>
      </div>
    </>
  );
};

export default PromotePlatform;