import React, { useState } from "react";
import { Client, Databases, ID } from "appwrite";

const client = new Client()
  .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT);

const databases = new Databases(client);

export default function CadastroCarga() {
  const [formData, setFormData] = useState({
    unidades: 0,
    alturaUnidade: 0,
    larguraUnidade: 0,
    comprimentoUnidade: 0,
    cubagemUnidade: 0,
    pesoUnidade: 0,
    pallets: 0,
    alturaPallet: 0,
    larguraPallet: 0,
    comprimentoPallet: 0,
    cubagemPallet: 0,
    pesoPallet: 0,
    descricaoOutros: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await databases.createDocument(
        import.meta.env.VITE_APPWRITE_DATABASE,
        import.meta.env.VITE_APPWRITE_COLLECTION_CARGAS,
        ID.unique(),
        formData
      );
      alert("Cadastro de Carga enviado com sucesso!");
      setFormData({
        unidades: 0,
        alturaUnidade: 0,
        larguraUnidade: 0,
        comprimentoUnidade: 0,
        cubagemUnidade: 0,
        pesoUnidade: 0,
        pallets: 0,
        alturaPallet: 0,
        larguraPallet: 0,
        comprimentoPallet: 0,
        cubagemPallet: 0,
        pesoPallet: 0,
        descricaoOutros: "",
      });
    } catch (error) {
      console.error("Erro ao cadastrar carga:", error);
      alert("Erro ao cadastrar carga. Verifique o console.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl space-y-4"
      >
        <h2 className="text-xl font-bold text-purple-600 mb-4">Cadastro de Carga</h2>

        <h3 className="font-semibold">Unidades/Volumes</h3>
        <input type="number" name="unidades" placeholder="Quantidade" value={formData.unidades} onChange={handleChange} className="w-full p-2 border rounded" />
        <input type="number" name="alturaUnidade" placeholder="Altura" value={formData.alturaUnidade} onChange={handleChange} className="w-full p-2 border rounded" />
        <input type="number" name="larguraUnidade" placeholder="Largura" value={formData.larguraUnidade} onChange={handleChange} className="w-full p-2 border rounded" />
        <input type="number" name="comprimentoUnidade" placeholder="Comprimento" value={formData.comprimentoUnidade} onChange={handleChange} className="w-full p-2 border rounded" />
        <input type="number" name="cubagemUnidade" placeholder="Cubagem" value={formData.cubagemUnidade} onChange={handleChange} className="w-full p-2 border rounded" />
        <input type="number" name="pesoUnidade" placeholder="Peso Total" value={formData.pesoUnidade} onChange={handleChange} className="w-full p-2 border rounded" />

        <h3 className="font-semibold">Pallets</h3>
        <input type="number" name="pallets" placeholder="Quantidade de Pallets" value={formData.pallets} onChange={handleChange} className="w-full p-2 border rounded" />
        <input type="number" name="alturaPallet" placeholder="Altura" value={formData.alturaPallet} onChange={handleChange} className="w-full p-2 border rounded" />
        <input type="number" name="larguraPallet" placeholder="Largura" value={formData.larguraPallet} onChange={handleChange} className="w-full p-2 border rounded" />
        <input type="number" name="comprimentoPallet" placeholder="Comprimento" value={formData.comprimentoPallet} onChange={handleChange} className="w-full p-2 border rounded" />
        <input type="number" name="cubagemPallet" placeholder="Cubagem" value={formData.cubagemPallet} onChange={handleChange} className="w-full p-2 border rounded" />
        <input type="number" name="pesoPallet" placeholder="Peso Total" value={formData.pesoPallet} onChange={handleChange} className="w-full p-2 border rounded" />

        <h3 className="font-semibold">Outros tipos de carga</h3>
        <textarea name="descricaoOutros" placeholder="Descrição de outras cargas, volumetria, cubagem, peso total..." value={formData.descricaoOutros} onChange={handleChange} className="w-full p-2 border rounded" />

        <button type="submit" className="w-full bg-purple-500 text-white p-2 rounded hover:bg-purple-600">Cadastrar</button>
      </form>
    </div>
  );
}
