import React from "react";
import "./Home.css";
import { FaTruck } from "react-icons/fa";

function Home() {
  return (
    <div className="home">
      <header className="topo">
        <div className="topo-esquerda">
          <FaTruck className="icone-caminhao" />
          <span className="titulo">Os Melhores do Transporte</span>
        </div>
        <nav className="topo-centro">
          <span>Para Cliente/Embarcador</span>
          <span>-</span>
          <span>Para Transportadores</span>
          <span>-</span>
          <span>Para Afiliados</span>
        </nav>
        <div className="topo-direita">
          <a href="#login" className="botao-acesso">
            Já é cadastrado clique → Acessar
          </a>
        </div>
      </header>
    </div>
  );
}

export default Home;
