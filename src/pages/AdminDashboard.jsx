// src/pages/AdminDashboard.jsx
import React from "react";

export default function AdminDashboard() {
  return (
    <div className="p-6 text-center">
      <h1 className="text-3xl font-bold text-blue-500 mb-4">
        Painel do Administrador
      </h1>
      <p className="text-gray-600">
        Bem-vindo ao painel administrativo.  
        Aqui futuramente será integrado com o Appwrite para gerenciar usuários, transportadoras e dados do sistema.
      </p>

      {/* Exemplo de dados mockados */}
      <div className="mt-6 border rounded-lg p-4 shadow">
        <h2 className="text-xl font-semibold mb-2">Transportadoras registradas</h2>
        <ul className="text-left">
          <li>🚚 TransLog - Ativo</li>
          <li>🚚 CargoX - Pendente</li>
          <li>🚚 Rapidão - Ativo</li>
        </ul>
      </div>
    </div>
  );
}
