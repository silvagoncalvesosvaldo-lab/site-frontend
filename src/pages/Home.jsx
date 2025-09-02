import React from "react";

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section
        style={{
          background: "#0d1b2a",
          color: "#fff",
          padding: "80px 20px",
          textAlign: "center",
        }}
      >
        <h1 style={{ fontSize: "42px", marginBottom: "20px" }}>
          Os Melhores do Transporte
        </h1>
        <p style={{ fontSize: "18px", maxWidth: "700px", margin: "0 auto" }}>
          Conectamos empresas e motoristas em uma rede confiável, eficiente e rápida.
        </p>
      </section>

      {/* Serviços */}
      <section style={{ padding: "60px 20px", textAlign: "center" }}>
        <h2 style={{ fontSize: "28px", marginBottom: "40px" }}>
          Nossos Serviços
        </h2>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "30px",
            flexWrap: "wrap",
          }}
        >
          <div
            style={{
              width: "280px",
              padding: "20px",
              border: "1px solid #ddd",
              borderRadius: "10px",
            }}
          >
            <h3>Cadastro de Motoristas</h3>
            <p>Participe da rede e encontre cargas de forma simples.</p>
          </div>

          <div
            style={{
              width: "280px",
              padding: "20px",
              border: "1px solid #ddd",
              borderRadius: "10px",
            }}
          >
            <h3>Cadastro de Empresas</h3>
            <p>Encontre motoristas confiáveis para suas entregas.</p>
          </div>

          <div
            style={{
              width: "280px",
              padding: "20px",
              border: "1px solid #ddd",
              borderRadius: "10px",
            }}
          >
            <h3>Plataforma Segura</h3>
            <p>Gestão confiável para transporte de cargas em todo o Brasil.</p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section
        style={{
          background: "#1b263b",
          color: "#fff",
          padding: "60px 20px",
          textAlign: "center",
        }}
      >
        <h2 style={{ fontSize: "28px", marginBottom: "20px" }}>
          Pronto para começar?
        </h2>
        <p style={{ fontSize: "18px", marginBottom: "20px" }}>
          Cadastre-se agora e faça parte da maior rede de transporte do Brasil.
        </p>
        <button
          style={{
            background: "#e63946",
            color: "#fff",
            border: "none",
            padding: "12px 24px",
            fontSize: "16px",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Criar Conta
        </button>
      </section>
    </div>
  );
}

