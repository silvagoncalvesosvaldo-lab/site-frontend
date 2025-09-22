import React from "react";
import "./Hero.css";

export default function Home() {
  return (
    <section className="hero">
      <div className="hero-content">
        <h2 className="hero-subtitle">Os Melhores do Transporte</h2>
        <h1 className="hero-title">
          A Conexão Certa para quem tem o que <span className="highlight">Transportar</span> e para os <span className="highlight">Transportadores</span>.
        </h1>
        <p className="hero-description">
          Sua solução definitiva para <strong>PAGAMENTOS E TRANSPORTES</strong> de mudanças, fretes e cargas em geral. Unimos você a uma elite de profissionais que fazem a diferença.
        </p>
        <p className="hero-location">✅✅✅ Atendemos em todo o Brasil!</p>
        <button className="hero-button">
          <span className="arrow">↓</span> Role para conhecer nossos benefícios! <br /> Os botões de cadastro estão no final da página.
        </button>
      </div>
    </section>
  );
}
