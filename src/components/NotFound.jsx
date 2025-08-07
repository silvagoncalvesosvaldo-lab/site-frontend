import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { AlertTriangle, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';

const NotFound = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const refCode = params.get('ref');
    if (refCode) {
      navigate(`/indicacao?ref=${refCode}`, { replace: true });
    }
  }, [location, navigate]);

  return (
    <>
      <Helmet>
        <title>Página Não Encontrada</title>
        <meta name="description" content="A página que você está procurando não existe." />
      </Helmet>
      <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center p-4 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <AlertTriangle className="h-24 w-24 text-yellow-400 mx-auto mb-6" />
          <h1 className="text-6xl font-bold mb-4">404</h1>
          <h2 className="text-3xl font-semibold mb-4">Página Não Encontrada</h2>
          <p className="text-lg text-slate-300 max-w-md mx-auto mb-8">
            Ops! Parece que o caminho que você tentou acessar não existe.
          </p>
          <Button onClick={() => navigate('/')} size="lg" className="btn-gradient-green text-white">
            <Home className="mr-2 h-5 w-5" />
            Voltar para a Página Inicial
          </Button>
        </motion.div>
      </div>
    </>
  );
};

export default NotFound;