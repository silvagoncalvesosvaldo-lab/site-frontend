import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useToast } from "@/components/ui/use-toast";
import { supabase } from '@/lib/customSupabaseClient';

const getFunctionUrl = (functionName) => {
  const projectUrl = new URL(supabase.supabaseUrl);
  return `${projectUrl.protocol}//${projectUrl.hostname}/functions/v1/${functionName}`;
};

const roleConfig = {
  cliente: {
    title: "Acessar como Cliente",
    functionUrl: getFunctionUrl('login-cliente'),
    redirectPath: "/app/client/",
  },
  afiliado: {
    title: "Acessar como Afiliado",
    functionUrl: getFunctionUrl('login-afiliado'),
    redirectPath: "/app/afiliado/",
  },
  transportador: {
    title: "Acessar como Transportador",
    functionUrl: getFunctionUrl('login-transportador'),
    redirectPath: "/app/driver/",
  },
};

export default function LoginPage() {
  const { role } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentRoleConfig, setCurrentRoleConfig] = useState(null);

  useEffect(() => {
    const config = roleConfig[role];
    if (config) {
      setCurrentRoleConfig(config);
    } else {
      navigate("/acessar");
    }
  }, [role, navigate]);

  const handleLogin = async () => {
    if (!email || !senha) {
      setError("Por favor, preencha o e-mail e a senha.");
      return;
    }
    setError("");
    setLoading(true);

    try {
      const { data: { session } } = await supabase.auth.getSession();
      const accessToken = session?.access_token;
      
      const response = await fetch(currentRoleConfig.functionUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${accessToken}`
        },
        body: JSON.stringify({ email, senha }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Erro ao fazer login. Verifique suas credenciais.");
        setLoading(false);
        return;
      }
      
      if (data.success && data.id) {
        toast({
          title: "Login bem-sucedido!",
          description: "Redirecionando para o seu painel...",
          className: "bg-green-500 text-white",
        });
        navigate(`${currentRoleConfig.redirectPath}${data.id}`);
      } else {
         setError(data.error || "Ocorreu um erro inesperado.");
      }

    } catch (err) {
      console.error("Erro na requisição de login:", err);
      setError("Não foi possível conectar ao servidor. Tente novamente mais tarde.");
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = () => {
    toast({
      title: "Funcionalidade em desenvolvimento",
      description: "🚧 Este recurso ainda não foi implementado, mas você pode solicitá-lo no próximo prompt! 🚀",
    });
  };

  if (!currentRoleConfig) {
    return null; 
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4">
      <div className="bg-[#0f0f1a] p-8 rounded-lg shadow-2xl w-full max-w-md text-white border border-gray-700">
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-400">{currentRoleConfig.title}</h1>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1 text-gray-300">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            placeholder="seu@email.com"
            disabled={loading}
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium mb-1 text-gray-300">Senha</label>
          <input
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            className="w-full px-4 py-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            placeholder="sua senha"
            disabled={loading}
            onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
          />
        </div>

        {error && (
          <div className="bg-red-900 border border-red-700 text-white px-4 py-2 rounded mb-4 text-sm text-center">
            {error}
          </div>
        )}
        
        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 disabled:cursor-not-allowed text-white font-semibold py-2 px-4 rounded transition duration-200"
        >
          {loading ? 'Entrando...' : 'Entrar'}
        </button>

        <div className="mt-6 text-center text-sm text-gray-400">
          Esqueceu sua senha?{" "}
          <button onClick={handleForgotPassword} className="text-blue-400 hover:underline focus:outline-none">
            Recuperar
          </button>
        </div>
      </div>
    </div>
  );
}