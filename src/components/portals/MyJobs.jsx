import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Truck, CheckCircle, PlayCircle, Map, Upload } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import LiveTracking from '@/components/LiveTracking';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { useParams } from 'react-router-dom';
import StatusTransporte from '@/components/StatusTransporte';

const statusConfig = {
  'pending': { label: 'Pendente', color: 'bg-yellow-500' },
  'in-progress': { label: 'Em Trânsito', color: 'bg-blue-500' },
  'em_andamento': { label: 'Em Trânsito', color: 'bg-blue-500' },
  'completed': { label: 'Concluído', color: 'bg-green-500' },
  'finalizado': { label: 'Concluído', color: 'bg-green-500' },
  'cancelled': { label: 'Cancelado', color: 'bg-red-500' },
  'aguardando': { label: 'Aguardando', color: 'bg-yellow-500' },
};

const MyJobs = ({ orders, setOrders }) => {
  const { driverId } = useParams();
  const [drivers] = useLocalStorage('transport-drivers', []);
  const currentDriver = drivers.find(d => d.id === driverId);

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isTrackingModalOpen, setTrackingModalOpen] = useState(false);
  const [isUploadModalOpen, setUploadModalOpen] = useState(false);
  const [fileToUpload, setFileToUpload] = useState(null);

  const handleUpdateStatus = (orderId, newStatus, tripStartTime = null) => {
    setOrders(prevOrders =>
      prevOrders.map(order =>
        order.id === orderId ? { ...order, status: newStatus, tripStartTime: tripStartTime || order.tripStartTime } : order
      )
    );
    toast({
      title: "Status Atualizado!",
      description: `O frete foi marcado como "${statusConfig[newStatus].label}".`,
    });
  };

  const handleStartTrip = (orderId) => {
    handleUpdateStatus(orderId, 'em_andamento', new Date().toISOString());
  };

  const handleCompleteTrip = (orderId) => {
    handleUpdateStatus(orderId, 'finalizado');
  };

  const openTrackingModal = (order) => {
    setSelectedOrder(order);
    setTrackingModalOpen(true);
  };

  const openUploadModal = (order) => {
    setSelectedOrder(order);
    setUploadModalOpen(true);
  };

  const handleFileUpload = () => {
    if (!fileToUpload) {
      toast({ variant: "destructive", title: "Nenhum arquivo selecionado." });
      return;
    }
    const newDocument = {
      id: `doc_${Date.now()}`,
      name: fileToUpload.name,
      type: 'Comprovante de Entrega',
      uploadedAt: new Date().toISOString(),
      url: URL.createObjectURL(fileToUpload),
    };
    setOrders(prevOrders =>
      prevOrders.map(order =>
        order.id === selectedOrder.id
          ? { ...order, documents: [...(order.documents || []), newDocument] }
          : order
      )
    );
    toast({ title: "Sucesso!", description: "Comprovante de entrega enviado." });
    setUploadModalOpen(false);
    setFileToUpload(null);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold gradient-text mb-6">Meus Fretes</h1>
        {orders.length === 0 ? (
          <p className="text-gray-400">Você ainda não possui nenhum frete ativo.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {orders.map((order, index) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="glass-effect border-white/20 h-full flex flex-col">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-white text-lg">Frete #{order.id.slice(0, 6)}</CardTitle>
                      <Badge className={`${statusConfig[order.status]?.color} text-white`}>
                        {statusConfig[order.status]?.label}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-400">{order.descricao}</p>
                  </CardHeader>
                  <CardContent className="flex-grow space-y-4">
                    <StatusTransporte status={order.status} />
                    <div>
                      <p className="text-gray-300"><strong>De:</strong> {order.origem}</p>
                      <p className="text-gray-300"><strong>Para:</strong> {order.destino}</p>
                      <p className="text-gray-300"><strong>Valor:</strong> R$ {order.valor_estimado}</p>
                    </div>
                  </CardContent>
                  <CardFooter className="flex flex-col gap-2">
                    {order.status === 'aguardando' && (
                      <div className="w-full flex flex-col sm:flex-row gap-2">
                        <Button onClick={() => handleStartTrip(order.id)} className="w-full btn-gradient">
                          <PlayCircle className="mr-2 h-4 w-4" /> Iniciar Viagem
                        </Button>
                        <Button onClick={() => openTrackingModal(order)} variant="outline" className="w-full border-blue-400 text-blue-400 hover:bg-blue-400/10 hover:text-blue-300">
                          <Map className="mr-2 h-4 w-4" /> Central de Viagem
                        </Button>
                      </div>
                    )}
                    {order.status === 'em_andamento' && (
                      <div className="w-full flex flex-col sm:flex-row gap-2">
                        <Button onClick={() => handleCompleteTrip(order.id)} className="w-full bg-green-600 hover:bg-green-700 text-white">
                          <CheckCircle className="mr-2 h-4 w-4" /> Concluir Entrega
                        </Button>
                        <Button onClick={() => openTrackingModal(order)} variant="outline" className="w-full border-blue-400 text-blue-400 hover:bg-blue-400/10 hover:text-blue-300">
                          <Map className="mr-2 h-4 w-4" /> Central de Viagem
                        </Button>
                      </div>
                    )}
                    {order.status === 'finalizado' && (
                      <Button onClick={() => openUploadModal(order)} variant="outline" className="w-full border-purple-400 text-purple-400 hover:bg-purple-400/10 hover:text-purple-300">
                        <Upload className="mr-2 h-4 w-4" /> Enviar Comprovante
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
      {selectedOrder && (
        <LiveTracking
          order={selectedOrder}
          driver={currentDriver}
          isOpen={isTrackingModalOpen}
          onOpenChange={setTrackingModalOpen}
        />
      )}
      {selectedOrder && (
        <Dialog open={isUploadModalOpen} onOpenChange={setUploadModalOpen}>
          <DialogContent className="bg-slate-900 border-slate-700 text-white">
            <DialogHeader>
              <DialogTitle>Enviar Comprovante de Entrega</DialogTitle>
              <DialogDescription>
                Anexe o comprovante (canhoto) para o frete #{selectedOrder.id.slice(0,6)}.
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <Input type="file" onChange={(e) => setFileToUpload(e.target.files[0])} className="bg-slate-800 border-slate-700 file:text-white" />
            </div>
            <DialogFooter>
              <Button variant="ghost" onClick={() => setUploadModalOpen(false)}>Cancelar</Button>
              <Button onClick={handleFileUpload} className="btn-gradient">
                <Upload className="mr-2 h-4 w-4" /> Enviar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default MyJobs;