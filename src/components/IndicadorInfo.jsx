import React, { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { supabase } from '@/lib/customSupabaseClient';

export default function IndicadorInfo({ tipo, userId }) {
  const [nomeIndicador, setNomeIndicador] = useState(null);

  useEffect(() => {
    const fetchIndicador = async () => {
      if (!userId) return;

      try {
        const { data: perfil, error: perfilError } = await supabase
          .from(tipo)
          .select('referred_by')
          .eq('id', userId)
          .single();

        if (perfilError || !perfil?.referred_by) {
          if (perfilError && perfilError.code !== 'PGRST116') { // Ignore 'exact one row' error
            console.error(`Erro ao buscar perfil (${tipo}):`, perfilError);
          }
          return;
        }

        const { data: indicador, error: indicadorError } = await supabase
          .from('affiliates')
          .select('name')
          .eq('id', perfil.referred_by)
          .single();

        if (indicadorError) {
          if (indicadorError.code !== 'PGRST116') {
             console.error('Erro ao buscar indicador:', indicadorError);
          }
          return;
        }

        if (indicador) {
          setNomeIndicador(indicador.name);
        }
      } catch (error) {
        console.error("Erro no fetchIndicador:", error);
      }
    };

    fetchIndicador();
  }, [tipo, userId]);

  if (!nomeIndicador) return null;

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg px-4 py-3 mt-4 text-sm text-blue-800">
      🔗 Você foi convidado por: <strong>{nomeIndicador}</strong>
    </div>
  );
}