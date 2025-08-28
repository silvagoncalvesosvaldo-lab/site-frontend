// src/pages/LoginRoleSelection.jsx
import React from "react";

export default function LoginRoleSelection() {
  const handleSelectRole = (role) => {
    alert(`Você selecionou: ${role}`);
    // 👉 futuramente redireciona para Appwrite/Auth dependendo do papel
  };

  return (
    <div className="p-6 text-center">
      <h1 className="text-2xl font-bold text-green-600 mb-4">
        Selecione seu tipo de login
      </h1>
      <p className="text-gray-600 mb-6">
        Escolha o perfil que você deseja acessar.
      </p>

      <div className="flex gap-4 justify-center">
        <button
          onClick={() => handleSelectRole("Transportador")}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          🚛 Transportador
        </button>
        <button
          onClick={() => handleSelectRole("Administrador")}
          className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600"
        >
          🛠️ Administrador
        </button>
      </div>
    </div>
  );
}
