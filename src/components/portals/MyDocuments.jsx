import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { FileText, Camera, AlertTriangle, ShieldCheck, Clock, ShieldX } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';

const MyDocuments = ({ user, userType }) => {
  // Assuming these URLs are available in the user object
  const documents = [
    { name: 'Comprovante de Residência', url: user.comprovante_residencia_url, status: user.comprovante_residencia_url ? 'verified' : 'pending' },
    { name: 'CNH', url: user.cnh_url, status: user.cnh_url ? 'verified' : 'pending' },
    { name: 'CPF', url: user.cpf_url, status: user.cpf_url ? 'verified' : 'pending' },
    { name: 'RG', url: user.rg_url, status: user.rg_url ? 'verified' : 'pending' },
    // Add other relevant documents here if they exist in the user object
  ].filter(doc => doc.url || userType === 'driver'); // Show all for driver, only existing for client for now

  const vehiclePhotos = [
    { name: 'Foto da Frente do Veículo', url: user.foto_frente_veiculo_url, status: user.foto_frente_veiculo_url ? 'verified' : 'pending' },
    { name: 'Foto da Traseira do Veículo', url: user.foto_traseira_veiculo_url, status: user.foto_traseira_veiculo_url ? 'verified' : 'pending' },
    // Add other vehicle photos if needed
  ].filter(photo => photo.url || userType === 'driver'); // Show all for driver

  const isDriverAndPhotosMissing = userType === 'driver' && (vehiclePhotos.every(photo => !photo.url) || !user.comprovante_residencia_url || !user.cnh_url);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'verified':
        return <Badge className="bg-green-500/20 text-green-400 border-green-500/30"><ShieldCheck className="h-3 w-3 mr-1" />Verificado</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30"><Clock className="h-3 w-3 mr-1" />Pendente</Badge>;
      case 'rejected':
        return <Badge className="bg-red-500/20 text-red-400 border-red-500/30"><ShieldX className="h-3 w-3 mr-1" />Rejeitado</Badge>;
      default:
        return <Badge variant="secondary">Não enviado</Badge>;
    }
  };

  const renderDocumentItem = (doc) => (
    <div key={doc.name} className="flex items-center justify-between p-3 bg-white/5 rounded-md">
      <div className="flex flex-col">
        <span className="text-sm text-gray-200 truncate font-semibold">{doc.name}</span>
        {doc.url && <a href={doc.url} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-400 hover:underline">Ver documento</a>}
      </div>
      {getStatusBadge(doc.status)}
    </div>
  );

  const renderPhotoItem = (photo) => (
     <div key={photo.name} className="flex items-center justify-between p-3 bg-white/5 rounded-md">
        <span className="text-sm text-gray-200 truncate">{photo.name}</span>
        {photo.url && <a href={photo.url} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-400 hover:underline">Ver foto</a>}
        {getStatusBadge(photo.status)}
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <div>
        <h1 className="text-3xl font-bold gradient-text mb-2">Meus Documentos</h1>
        <p className="text-gray-400">Visualize o status dos seus documentos e fotos enviados.</p>
      </div>

      {isDriverAndPhotosMissing && user.status !== 'verified' && (
        <Alert variant="destructive" className="bg-red-900/50 border-red-500/60 text-red-300">
          <AlertTriangle className="h-5 w-5 text-red-400" />
          <AlertTitle className="font-bold text-red-300">Ação Necessária: Envio Obrigatório</AlertTitle>
          <AlertDescription>
            Para que seu perfil seja verificado, é **obrigatório** o envio das fotos do seu veículo (frente e traseira com a placa visível), comprovante de residência e CNH. Por favor, entre em contato com o suporte para enviá-los.
          </AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="glass-effect border-white/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <FileText /> Documentos Pessoais
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {documents.length > 0 ? (
              documents.map(renderDocumentItem)
            ) : (
              <p className="text-gray-400 text-center py-4">Nenhum documento enviado.</p>
            )}
          </CardContent>
        </Card>

        {userType === 'driver' && (
          <Card className={`glass-effect border-white/20 ${isDriverAndPhotosMissing ? 'border-red-500/60' : ''}`}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Camera /> Fotos do Veículo
              </CardTitle>
              <CardDescription className="text-gray-400">
                Necessário: frente e traseira (placa visível).
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {vehiclePhotos.length > 0 ? (
                vehiclePhotos.map(renderPhotoItem)
              ) : (
                <p className="text-gray-400 text-center py-4">Nenhuma foto do veículo enviada.</p>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </motion.div>
  );
};

export default MyDocuments;