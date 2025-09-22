import React from "react";

const Header = () => {
  return (
    <header className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        {/* Logo */}
        <div className="text-lg font-bold">
          Aqui será a logo
        </div>

        {/* Menu de navegação */}
        <nav className="space-x-6 text-gray-800">
          <a href="#clientes" className="hover:text-blue-600">Para Cliente/Embarcador</a>
          <a href="#transportadores" className="hover:text-blue-600">Para Transportadores</a>
          <a href="#afiliados" className="hover:text-blue-600">Para Afiliados</a>
        </nav>

        {/* Login */}
        <div>
          <a
            href="#login"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Para quem já é cadastrado → Acessar/Login
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
