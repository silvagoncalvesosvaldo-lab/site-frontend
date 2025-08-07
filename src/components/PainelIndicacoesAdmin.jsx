import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/customSupabaseClient';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Loader2, Users } from 'lucide-react';

export default function PainelIndicacoesAdmin() {
  const [indicacoes, setIndicacoes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchIndicacoes = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('v_todas_indicacoes')
        .select('*')
        .order('data_indicacao', { ascending: false });

      if (!error) {
        setIndicacoes(data);
      } else {
        console.error("Erro ao buscar indicações:", error);
      }
      setLoading(false);
    };

    fetchIndicacoes();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-4 sm:p-6 lg:p-8"
    >
      <Card className="bg-white/5 border-white/10 text-white shadow-lg backdrop-blur-lg">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-2xl font-bold text-blue-300">Relatório Geral de Indicações</CardTitle>
          <Users className="h-6 w-6 text-blue-400" />
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="h-8 w-8 animate-spin text-blue-400" />
            </div>
          ) : indicacoes.length === 0 ? (
            <p className="text-center text-gray-400 py-10">Nenhuma indicação registrada até o momento.</p>
          ) : (
            <div className="overflow-x-auto rounded-lg border border-white/10">
              <Table>
                <TableHeader>
                  <TableRow className="bg-white/10 hover:bg-white/15">
                    <TableHead className="text-blue-300 font-semibold">Quem Convidou</TableHead>
                    <TableHead className="text-blue-300 font-semibold">Indicado</TableHead>
                    <TableHead className="text-blue-300 font-semibold">Tipo</TableHead>
                    <TableHead className="text-blue-300 font-semibold text-right">Data</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {indicacoes.map((item) => (
                    <TableRow key={item.indicado_id} className="border-white/10 hover:bg-white/5">
                      <TableCell>{item.nome_convidador}</TableCell>
                      <TableCell>{item.nome_indicado}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          item.tipo_indicado === 'cliente' ? 'bg-green-500/20 text-green-300' :
                          item.tipo_indicado === 'transportador' ? 'bg-yellow-500/20 text-yellow-300' :
                          'bg-purple-500/20 text-purple-300'
                        }`}>
                          {item.tipo_indicado}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">{new Date(item.data_indicacao).toLocaleDateString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}