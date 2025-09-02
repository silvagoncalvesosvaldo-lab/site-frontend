import React from "react";
import { Link } from "react-router-dom";

const roles = [
  { role: "cliente", emoji: "??" },
  { role: "transportador", emoji: "??" },
  { role: "afiliado", emoji: "??" },
  { role: "admin", emoji: "???" },
];

const LoginRoleSelection = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-6">Selecione seu perfil</h1>
      <div className="grid grid-cols-1 gap-4 w-64">
        {roles.map((opt) => (
          <Link
            key={opt.role}
            to={/login/}
            className="group p-6 rounded-lg border bg-white shadow hover:shadow-lg transition flex flex-col items-center"
          >
            <div className="text-4xl mb-2">{opt.emoji}</div>
            <div className="text-lg font-semibold">{opt.role}</div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default LoginRoleSelection;
