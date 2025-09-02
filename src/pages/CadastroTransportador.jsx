import React, { useState } from "react";
import { Client, Databases, ID } from "appwrite";

const client = new Client()
  .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT);

const databases = new Databases(client);

export default function CadastroTransportador() {
  const [formData, setFormData] = useState({
    nome: "",
    cnpj: "",
    email: "",
    telefone: "",
    placa: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await databases.createDocument(
        import.meta.env.VITE_APPWRITE_DATABASE,
        import.meta.env.VITE_APPWRITE_COLLECTION_TRANSPORTADORES,
        ID.unique(),
        formData
      );
      console.log("Transportador cadastrado:", response);
      alert("Cadastro de Transportador enviado com sucesso!");
    } catch (error) {
      console.error("Erro ao cadastrar transportador:", error);
      alert("Erro ao cadastrar transportador. Verifique o console.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-lg w-96 space-y-4"
      >
        <h2 className="text-xl font-bold text-purple-600 mb-4">
          Cadastro Transportador
        </h2>
        <input
          name="nome"
          placeholder="Nome Completo"
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <input
          name="cnpj"
          placeholder="CNPJ"
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <input
          name="email"
          type="email"
          placeholder="E-mail"
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <input
          name="telefone"
          placeholder="Telefone"
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <input
          name="placa"
          placeholder="Placa do Veículo"
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          className="w-full bg-purple-500 text-white p-2 rounded hover:bg-purple-600"
        >
          Cadastrar
        </button>
      </form>
    </div>
  );
}
