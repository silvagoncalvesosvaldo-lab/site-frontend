import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/customSupabaseClient';

export default function IndicadorAfiliado({ userId }) {
  const [nomeIndicador, setNomeIndicador] = useState(null);

  useEffect(() => {
    const fetchIndicador = async () => {
      if (!userId) return;

      try {
        // Buscar o referred_by do afiliado logado
        const { data: afiliado, error: afiliadoError } = await supabase
          .from('affiliates')
          .select('referred_by')
          .eq('id', userId)
          .single();

        if (afiliadoError || !afiliado?.referred_by) {
          if (afiliadoError && afiliadoError.code !== 'PGRST116') { // Ignore 'exact one row' error
            console.error('Erro ao buscar afiliado:', afiliadoError);
          }
          return;
        }

        // Buscar o nome do afiliado que indicou
        const { data: indicador, error: indicadorError } = await supabase
          .from('affiliates')
          .select('name')
          .eq('id', afiliado.referred_by)
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
  }, [userId]);

  if (!nomeIndicador) return null;

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg px-4 py-3 mt-4 text-sm text-blue-800">
      🔗 Você foi convidado por: <strong>{nomeIndicador}</strong>
    </div>
  );
}