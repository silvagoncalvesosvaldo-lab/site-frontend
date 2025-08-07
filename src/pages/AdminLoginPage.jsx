import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { LogIn, Loader2, Mail, ShieldCheck } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [codigo, setCodigo] = useState('');
  const [etapa, setEtapa] = useState(1);
  const [carregando, setCarregando] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleLogin = async () => {
    setCarregando(true);

    try {
      const response = await fetch('https://sua-url-da-edge-function.vercel.app/admin-login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, senha })
      });

      const data = await response.json();

      if (response.status === 200 && data.autorizado) {
        setEtapa(2);
        toast({
          title: 'Código enviado!',
          description: 'Verifique seu WhatsApp para o código de acesso.',
        });
      } else {
        toast({
          title: 'Erro ao entrar',
          description: data.mensagem || 'Credenciais inválidas.',
          variant: 'destructive',
        });
      }
    } catch (erro) {
      toast({
        title: 'Erro inesperado',
        description: 'Não foi possível conectar ao servidor.',
        variant: 'destructive',
      });
    }

    setCarregando(false);
  };

  const verificarCodigo = async () => {
    setCarregando(true);

    try {
      const response = await fetch('https://sua-url-da-edge-function.vercel.app/verificar-codigo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, codigo })
      });

      const data = await response.json();

      if (response.status === 200 && data.valido) {
        navigate('/painel/admin');
      } else {
        toast({
          title: 'Código inválido',
          description: 'O código inserido está incorreto ou expirado.',
          variant: 'destructive',
        });
      }
    } catch (erro) {
      toast({
        title: 'Erro ao verificar',
        description: 'Tente novamente em instantes.',
        variant: 'destructive',
      });
    }

    setCarregando(false);
  };

  return (
    <>
      <Helmet>
        <title>Login do Administrador</title>
      </Helmet>

      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md p-6"
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-center text-2xl">
                {etapa === 1 ? 'Acesso Restrito - Admin' : 'Verificação 2FA'}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {etapa === 1 ? (
                <>
                  <div>
                    <Label htmlFor="email">E-mail</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="admin@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="senha">Senha</Label>
                    <Input
                      id="senha"
                      type="password"
                      placeholder="••••••••"
                      value={senha}
                      onChange={(e) => setSenha(e.target.value)}
                      required
                    />
                  </div>

                  <Button
                    onClick={handleLogin}
                    disabled={carregando}
                    className="w-full"
                  >
                    {carregando ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <LogIn className="mr-2 h-4 w-4" />
                    )}
                    Entrar
                  </Button>
                </>
              ) : (
                <>
                  <div>
                    <Label htmlFor="codigo">Código de Verificação</Label>
                    <Input
                      id="codigo"
                      type="text"
                      placeholder="Digite o código recebido"
                      value={codigo}
                      onChange={(e) => setCodigo(e.target.value)}
                      required
                    />
                  </div>

                  <Button
                    onClick={verificarCodigo}
                    disabled={carregando}
                    className="w-full"
                  >
                    {carregando ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <ShieldCheck className="mr-2 h-4 w-4" />
                    )}
                    Verificar
                  </Button>
                </>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </>
  );
}