import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { FaTruck } from "react-icons/fa";

const Navbar = () => {
  return (
    <nav className="navbar">
      {/* Ícone caminhão à esquerda */}
      <div className="navbar-left">
        <FaTruck className="truck-icon" />
      </div>

      {/* Menus centralizados */}
      <div className="navbar-center">
        <a href="#beneficios-clientes" className="nav-link">Para Cliente/Embarcador</a>
        <a href="#beneficios-transportadores" className="nav-link">Para Transportadores</a>
        <a href="#beneficios-afiliados" className="nav-link">Para Afiliados</a>
      </div>

      {/* Botão login à direita */}
      <div className="navbar-right">
        <Link to="/login" className="login-button">Acessar / Login</Link>
      </div>
    </nav>
  );
};

export default Navbar;
