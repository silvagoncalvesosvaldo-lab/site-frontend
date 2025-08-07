import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, ShieldCheck } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

export default function VerificarCodigo() {
  const [codigo, setCodigo] = useState('');
  const [carregando, setCarregando] = useState(false);
  const navigate = useNavigate();

  const verificarCodigo = async () => {
    setCarregando(true);
    const resposta = await fetch('/api/verificar-codigo', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ codigo }),
    });

    const dados = await resposta.json();
    setCarregando(false);

    if (resposta.ok) {
      toast({ title: 'Código verificado!', description: 'Acesso liberado.', variant: 'success' });
      navigate('/AdminDashboard');
    } else {
      toast({ title: 'Código inválido', description: dados.mensagem, variant: 'destructive' });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader>
          <CardTitle className="text-center flex items-center gap-2 justify-center">
            <ShieldCheck className="w-6 h-6" /> Verificação 2FA
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            type="text"
            placeholder="Digite o código recebido"
            value={codigo}
            onChange={(e) => setCodigo(e.target.value)}
          />
          <Button
            className="w-full"
            onClick={verificarCodigo}
            disabled={carregando || codigo.trim().length < 4}
          >
            {carregando ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Verificar Código'}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}