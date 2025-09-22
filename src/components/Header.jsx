import React from "react";
import { FaTruck } from "react-icons/fa";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 w-full bg-[#0b0c10] text-blue-300 flex justify-between items-center px-6 py-4 shadow-md z-50">
      <div className="flex items-center space-x-3">
        <FaTruck className="text-red-600 text-3xl" />
        <span className="font-bold text-xl">Os Melhores do Transporte</span>
      </div>

      <nav className="flex-1 flex justify-center space-x-6 font-semibold">
        <a href="#" className="hover:text-white">Para Cliente/Embarcador</a>
        <span>-</span>
        <a href="#" className="hover:text-white">Para Transportadores</a>
        <span>-</span>
        <a href="#" className="hover:text-white">Para Afiliados</a>
      </nav>

      <div>
        <a
          href="#"
          className="border border-blue-300 px-4 py-2 rounded hover:bg-blue-300 hover:text-[#0b0c10] transition"
        >
          Já é cadastrado clique → Acessar
        </a>
      </div>
    </header>
  );
}
