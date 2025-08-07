import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/customSupabaseClient';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { toast } from '@/components/ui/use-toast';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const { session } = useAuth();
  const [drivers, setDrivers] = useState([]);
  const [clients, setClients] = useState([]);
  const [affiliates, setAffiliates] = useState([]);
  const [freightOrders, setFreightOrders] = useState([]);
  const [quoteRequests, setQuoteRequests] = useState([]);
  const [earningsConfig, setEarningsConfig] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // Fetch drivers
      const { data: driversData, error: driversError } = await supabase.from('transporters').select('*');
      if (driversError) throw driversError;
      setDrivers(driversData);

      // Fetch clients
      const { data: clientsData, error: clientsError } = await supabase.from('clients').select('*');
      if (clientsError) throw clientsError;
      setClients(clientsData);

      // Fetch affiliates
      const { data: affiliatesData, error: affiliatesError } = await supabase.from('affiliates').select('*');
      if (affiliatesError) throw affiliatesError;
      setAffiliates(affiliatesData);

      // Fetch freight orders
      const { data: freightOrdersData, error: freightOrdersError } = await supabase.from('freight_orders').select('*');
      if (freightOrdersError) throw freightOrdersError;
      setFreightOrders(freightOrdersData);

      // Fetch quote requests
      const { data: quoteRequestsData, error: quoteRequestsError } = await supabase.from('quote_requests').select('*');
      if (quoteRequestsError) throw quoteRequestsError;
      setQuoteRequests(quoteRequestsData);

      // Fetch earnings config (assuming a single row)
      const { data: earningsConfigData, error: earningsConfigError } = await supabase.from('earnings_config').select('*').single();
      if (earningsConfigError && earningsConfigError.code !== 'PGRST116') throw earningsConfigError; // PGRST116 means no rows found
      setEarningsConfig(earningsConfigData);

    } catch (err) {
      console.error("Error fetching data:", err);
      setError(err);
      toast({
        title: "Erro ao carregar dados",
        description: err.message || "Ocorreu um erro ao buscar os dados da plataforma.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [session?.user?.id]); // Refetch if session user changes, indicating a new login

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const saveRecord = async (tableName, recordData) => {
    try {
      const { data, error } = await supabase.from(tableName).insert([recordData]).select();
      if (error) throw error;
      toast({ title: "Sucesso!", description: "Dados salvos com sucesso." });
      fetchData(); // Refresh data after saving
      return data[0];
    } catch (err) {
      console.error(`Error saving record to ${tableName}:`, err);
      toast({
        title: "Erro ao salvar",
        description: err.message || "Não foi possível salvar o registro.",
        variant: "destructive",
      });
      throw err;
    }
  };

  const updateRecord = async (tableName, id, updates) => {
    try {
      const { data, error } = await supabase.from(tableName).update(updates).eq('id', id).select();
      if (error) throw error;
      toast({ title: "Sucesso!", description: "Dados atualizados com sucesso." });
      fetchData(); // Refresh data after update
      return data[0];
    } catch (err) {
      console.error(`Error updating record in ${tableName}:`, err);
      toast({
        title: "Erro ao atualizar",
        description: err.message || "Não foi possível atualizar o registro.",
        variant: "destructive",
      });
      throw err;
    }
  };

  const deleteRecord = async (tableName, id) => {
    try {
      const { error } = await supabase.from(tableName).delete().eq('id', id);
      if (error) throw error;
      toast({ title: "Sucesso!", description: "Registro excluído com sucesso." });
      fetchData(); // Refresh data after delete
    } catch (err) {
      console.error(`Error deleting record from ${tableName}:`, err);
      toast({
        title: "Erro ao excluir",
        description: err.message || "Não foi possível excluir o registro.",
        variant: "destructive",
      });
      throw err;
    }
  };

  const uploadFile = async (file, bucketName) => {
    if (!file) return null;
    const filePath = `${bucketName}/${session.user.id}/${Date.now()}_${file.name}`;
    try {
      const { data, error } = await supabase.storage.from(bucketName).upload(filePath, file);
      if (error) throw error;
      
      const { data: publicUrlData } = supabase.storage.from(bucketName).getPublicUrl(filePath);
      
      return publicUrlData.publicUrl;
    } catch (error) {
      console.error("Error uploading file:", error);
      toast({
        title: "Erro ao enviar arquivo",
        description: error.message || "Não foi possível fazer o upload do arquivo.",
        variant: "destructive",
      });
      throw error;
    }
  };

  const signUp = async (email, password, role) => {
    try {
      const { data: { user }, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            role: role
          }
        }
      });

      if (signUpError) throw signUpError;
      return { user };
    } catch (error) {
      console.error("Error during sign up:", error);
      toast({
        title: "Erro no Cadastro",
        description: error.message,
        variant: "destructive",
      });
      return { user: null, error };
    }
  };

  // Specific functions for managing drivers (transporters table)
  const addDriver = async (driverData) => {
    const { name, email, phone, vehicle_plate, renavam, antt, bank_name, agency, account_number, pix_key, front_vehicle_photo, rear_vehicle_photo, address_proof, vehicle_type, cpf, rg, cnh, crlv } = driverData;

    try {
      // Upload files first
      const [frontVehiclePhotoUrl, rearVehiclePhotoUrl, addressProofUrl, cnhUrl, crlvUrl] = await Promise.all([
        uploadFile(front_vehicle_photo, 'photos'),
        uploadFile(rear_vehicle_photo, 'photos'),
        uploadFile(address_proof, 'documents'),
        uploadFile(cnh, 'documents'),
        uploadFile(crlv, 'documents'),
      ]);

      const { data, error } = await supabase.from('transporters').insert([
        {
          nome_completo: name,
          email,
          whatsapp: phone,
          placa_veiculo: vehicle_plate,
          renavam,
          antt,
          bank_name,
          agency,
          account_number,
          pix_key,
          foto_frente_veiculo_url: frontVehiclePhotoUrl,
          foto_traseira_veiculo_url: rearVehiclePhotoUrl,
          comprovante_residencia_url: addressProofUrl,
          vehicle_type,
          cpf,
          rg,
          cnh_url: cnhUrl,
          crlv_url: crlvUrl,
          status: 'pending', // Default status for new registrations
          tipo_de_carga: ['Carga Geral'] // Default for now
        }
      ]).select();

      if (error) throw error;
      fetchData();
      return data[0];
    } catch (err) {
      console.error("Error adding driver:", err);
      toast({
        title: "Erro ao adicionar motorista",
        description: err.message || "Não foi possível adicionar o motorista.",
        variant: "destructive",
      });
      throw err;
    }
  };

  const updateDriver = async (id, updates) => {
    try {
        let updatedDriverData = { ...updates };

        // Handle file uploads for specific fields
        if (updates.front_vehicle_photo) {
            updatedDriverData.foto_frente_veiculo_url = await uploadFile(updates.front_vehicle_photo, 'photos');
            delete updatedDriverData.front_vehicle_photo;
        }
        if (updates.rear_vehicle_photo) {
            updatedDriverData.foto_traseira_veiculo_url = await uploadFile(updates.rear_vehicle_photo, 'photos');
            delete updatedDriverData.rear_vehicle_photo;
        }
        if (updates.address_proof) {
            updatedDriverData.comprovante_residencia_url = await uploadFile(updates.address_proof, 'documents');
            delete updatedDriverData.address_proof;
        }
        if (updates.cnh) {
            updatedDriverData.cnh_url = await uploadFile(updates.cnh, 'documents');
            delete updatedDriverData.cnh;
        }
        if (updates.crlv) {
            updatedDriverData.crlv_url = await uploadFile(updates.crlv, 'documents');
            delete updatedDriverData.crlv;
        }

        const { data, error } = await supabase
            .from('transporters')
            .update(updatedDriverData)
            .eq('id', id)
            .select();

        if (error) throw error;
        fetchData();
        return data[0];
    } catch (err) {
        console.error(`Error updating driver ${id}:`, err);
        toast({
            title: "Erro ao atualizar motorista",
            description: err.message || "Não foi possível atualizar o motorista.",
            variant: "destructive",
        });
        throw err;
    }
  };

  const updateClient = async (id, updates) => {
    try {
      const { data, error } = await supabase.from('clients').update(updates).eq('id', id).select();
      if (error) throw error;
      fetchData();
      return data[0];
    } catch (err) {
      console.error(`Error updating client ${id}:`, err);
      toast({
        title: "Erro ao atualizar cliente",
        description: err.message || "Não foi possível atualizar o cliente.",
        variant: "destructive",
      });
      throw err;
    }
  };

  const value = {
    drivers,
    clients,
    affiliates,
    freightOrders,
    quoteRequests,
    earningsConfig,
    loading,
    error,
    setFreightOrders, // Allow MyJobs to update its own order status
    fetchData,
    saveRecord,
    updateRecord,
    deleteRecord,
    uploadFile,
    signUp,
    addDriver, // For adding new drivers via admin panel
    updateDriver, // For updating driver status/details
    updateClient, // For updating client status
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};