import React, { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/customSupabaseClient';
import { Loader2, XCircle } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";

const AvisosPainelTransportador = ({ userId }) => {
  const [avisos, setAvisos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);
  const [error, setError] = useState(null);
  const { toast } = useToast();

  const fetchAvisos = useCallback(async () => {
    if (!userId) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase
        .from('notifications')
        .select('id, mensagem, created_at, visualizado')
        .eq('transporter_id', userId)
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      setAvisos(data);
    } catch (err) {
      console.error("Erro ao buscar avisos:", err);
      setError('Não foi possível carregar os avisos. Tente novamente mais tarde.');
      toast({
        title: "Erro de Carregamento",
        description: "Não foi possível buscar seus avisos.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [userId, toast]);

  useEffect(() => {
    if (!userId) return;

    fetchAvisos();

    const channel = supabase
      .channel(`realtime-avisos-transportador-${userId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'notifications',
          filter: `transporter_id=eq.${userId}`,
        },
        (payload) => {
          toast({
            title: "Novo Aviso de Carga!",
            description: payload.new.mensagem,
          });
          setAvisos((prevAvisos) => [payload.new, ...prevAvisos]);
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'notifications',
          filter: `transporter_id=eq.${userId}`,
        },
        (payload) => {
          setAvisos((prevAvisos) => 
            prevAvisos.map(aviso => 
              aviso.id === payload.new.id ? payload.new : aviso
            )
          );
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [userId, toast, fetchAvisos]);

  const marcarComoVisualizado = async (avisoId) => {
    setUpdatingId(avisoId);
    try {
      const { error } = await supabase
        .from('notifications')
        .update({ visualizado: true })
        .eq('id', avisoId);

      if (error) {
        throw error;
      }
      
      setAvisos(avisos.map(aviso => 
        aviso.id === avisoId ? { ...aviso, visualizado: true } : aviso
      ));

      toast({
        title: "Sucesso!",
        description: "Aviso marcado como lido.",
        variant: "default",
      });

    } catch (err) {
      console.error("Erro ao marcar como lido:", err);
      toast({
        title: "Erro!",
        description: "Não foi possível marcar o aviso como lido. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setUpdatingId(null);
    }
  };

  const formatarData = (timestamp) => {
    if (!timestamp) return 'Data indisponível';
    return new Date(timestamp).toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="p-4 bg-white rounded shadow flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
        <span className="ml-3 text-gray-600">Carregando avisos...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-white rounded shadow flex flex-col items-center justify-center h-64 text-red-500">
        <XCircle className="h-8 w-8 mb-2" />
        <p className="font-medium">{error}</p>
      </div>
    );
  }

  return (
    <div className="p-4 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">📢 Avisos Importantes</h2>
      {avisos.length === 0 ? (
        <p className="text-center text-gray-500 py-4">Sem avisos no momento.</p>
      ) : (
        <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
          {avisos.map((aviso) => (
            <div
              key={aviso.id}
              className={`border p-3 mb-3 rounded transition-colors duration-200 ${
                aviso.visualizado ? 'bg-gray-100' : 'bg-yellow-50'
              }`}
            >
              <p className="mb-2">{aviso.mensagem}</p>
              <p className="text-sm text-gray-500">
                Recebido em: {formatarData(aviso.created_at)}
              </p>
              {!aviso.visualizado && (
                <button
                  className="mt-2 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-blue-400 flex items-center justify-center"
                  onClick={() => marcarComoVisualizado(aviso.id)}
                  disabled={updatingId === aviso.id}
                >
                  {updatingId === aviso.id ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    'Marcar como visualizado'
                  )}
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AvisosPainelTransportador;