import React, { useState } from "react";
import { Client, Databases, ID } from "appwrite";

const client = new Client()
  .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT);

const databases = new Databases(client);

export default function CadastroMudanca() {
  const [formData, setFormData] = useState({
    dataTransporte: "",
    dataFlexivel: "Não",
    origem: "",
    destino: "",
    escada: "Não",
    passaFacil: "Sim",
    subsolo: "Não",
    ajudante: "Não",
    embalar: "Não",
    copos: 0,
    loucas: 0,
    talheres: 0,
    panelas: 0,
    quadros: 0,
    espelhos: 0,
    retratos: 0,
    roupas: 0,
    calcados: 0,
    outros: 0,
    precisaMateriais: "Não",
    caixas: 0,
    papel: 0,
    fitas: 0,
    plasticoBolha: 0,
    observacao: "",
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
        import.meta.env.VITE_APPWRITE_COLLECTION_MUDANCAS,
        ID.unique(),
        formData
      );
      alert("Cadastro de Mudança enviado com sucesso!");
      setFormData({
        dataTransporte: "",
        dataFlexivel: "Não",
        origem: "",
        destino: "",
        escada: "Não",
        passaFacil: "Sim",
        subsolo: "Não",
        ajudante: "Não",
        embalar: "Não",
        copos: 0,
        loucas: 0,
        talheres: 0,
        panelas: 0,
        quadros: 0,
        espelhos: 0,
        retratos: 0,
        roupas: 0,
        calcados: 0,
        outros: 0,
        precisaMateriais: "Não",
        caixas: 0,
        papel: 0,
        fitas: 0,
        plasticoBolha: 0,
        observacao: "",
      });
    } catch (error) {
      console.error("Erro ao cadastrar mudança:", error);
      alert("Erro ao cadastrar mudança. Verifique o console.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl space-y-4 overflow-y-auto max-h-screen"
      >
        <h2 className="text-xl font-bold text-purple-600 mb-4">Cadastro de Mudança</h2>

        <label>Data do Transporte</label>
        <input type="date" name="dataTransporte" value={formData.dataTransporte} onChange={handleChange} className="w-full p-2 border rounded" required />

        <label>Data Flexível?</label>
        <select name="dataFlexivel" value={formData.dataFlexivel} onChange={handleChange} className="w-full p-2 border rounded">
          <option>Sim</option>
          <option>Não</option>
        </select>

        <input name="origem" placeholder="Cidade e Estado de Carregamento" value={formData.origem} onChange={handleChange} className="w-full p-2 border rounded" required />
        <input name="destino" placeholder="Cidade e Estado de Descarregamento" value={formData.destino} onChange={handleChange} className="w-full p-2 border rounded" required />

        <label>Escada no local?</label>
        <select name="escada" value={formData.escada} onChange={handleChange} className="w-full p-2 border rounded">
          <option>Sim</option>
          <option>Não</option>
        </select>

        <label>Passa fácil por portas/corredores?</label>
        <select name="passaFacil" value={formData.passaFacil} onChange={handleChange} className="w-full p-2 border rounded">
          <option>Sim</option>
          <option>Não</option>
        </select>

        <label>Subsolo/porões?</label>
        <select name="subsolo" value={formData.subsolo} onChange={handleChange} className="w-full p-2 border rounded">
          <option>Sim</option>
          <option>Não</option>
        </select>

        <label>Precisa de ajudante?</label>
        <select name="ajudante" value={formData.ajudante} onChange={handleChange} className="w-full p-2 border rounded">
          <option>Sim</option>
          <option>Não</option>
        </select>

        <label>Precisa embalar itens?</label>
        <select name="embalar" value={formData.embalar} onChange={handleChange} className="w-full p-2 border rounded">
          <option>Sim</option>
          <option>Não</option>
        </select>

        {formData.embalar === "Sim" && (
          <div>
            <label>Itens para embalar (quantidades)</label>
            {["copos","loucas","talheres","panelas","quadros","espelhos","retratos","roupas","calcados","outros"].map((item) => (
              <input key={item} type="number" name={item} placeholder={item} value={formData[item]} onChange={handleChange} className="w-full p-2 border rounded my-1" />
            ))}
          </div>
        )}

        <label>Precisa materiais de embalagem?</label>
        <select name="precisaMateriais" value={formData.precisaMateriais} onChange={handleChange} className="w-full p-2 border rounded">
          <option>Sim</option>
          <option>Não</option>
        </select>

        {formData.precisaMateriais === "Sim" && (
          <div>
            <label>Materiais (quantidades)</label>
            {["caixas","papel","fitas","plasticoBolha"].map((item) => (
              <input key={item} type="number" name={item} placeholder={item} value={formData[item]} onChange={handleChange} className="w-full p-2 border rounded my-1" />
            ))}
          </div>
        )}

        <textarea name="observacao" placeholder="Observação / lista de itens, medidas, link de vídeo" value={formData.observacao} onChange={handleChange} className="w-full p-2 border rounded" />

        <button type="submit" className="w-full bg-purple-500 text-white p-2 rounded hover:bg-purple-600">Cadastrar</button>
      </form>
    </div>
  );
}
