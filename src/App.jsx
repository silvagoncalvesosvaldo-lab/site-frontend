import React from "react";
import { Routes, Route } from "react-router-dom";

import Landing from "./pages/Landing";
import CadastroCliente from "./pages/CadastroCliente";
import CadastroTransportador from "./pages/CadastroTransportador";
import CadastroAfiliado from "./pages/CadastroAfiliado";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Admin from "./pages/Admin";

function App() {
  return (
    <Routes>
      {/* Página inicial */}
      <Route path="/" element={<Landing />} />

      {/* Outras páginas */}
      <Route path="/cadastro" element={<CadastroCliente />} />
      <Route path="/cadastroTransportador" element={<CadastroTransportador />} />
      <Route path="/cadastroAfiliado" element={<CadastroAfiliado />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/admin" element={<Admin />} />
    </Routes>
  );
}

export default App;
