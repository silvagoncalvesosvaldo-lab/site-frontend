import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Cog, Mail, MessageSquare } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const NotificationSettings = () => {
  const { toast } = useToast();

  const handleIntegration = (platform) => {
    toast({
      title: `🚧 Integração com ${platform} em breve!`,
      description: "Esta funcionalidade permitirá o envio automático de notificações.",
    });
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold gradient-text mb-2 flex items-center gap-3">
          <Cog className="h-8 w-8" />
          Configurar Notificações Externas
        </h1>
        <p className="text-gray-400">Integre serviços de E-mail e WhatsApp para manter seus clientes e motoristas informados.</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className="glass-effect border-white/20 h-full">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Mail className="h-5 w-5 text-blue-400" />
                Notificações por E-mail
              </CardTitle>
              <CardDescription className="text-gray-300">
                Use serviços como SendGrid ou Mailgun para enviar e-mails automáticos.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full btn-gradient" onClick={() => handleIntegration('E-mail')}>
                Integrar Serviço de E-mail
              </Button>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="glass-effect border-white/20 h-full">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-green-400" />
                Notificações por WhatsApp
              </CardTitle>
              <CardDescription className="text-gray-300">
                Integre com a API do WhatsApp Business via parceiros como a Twilio.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full btn-gradient" onClick={() => handleIntegration('WhatsApp')}>
                Integrar com WhatsApp
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default NotificationSettings;