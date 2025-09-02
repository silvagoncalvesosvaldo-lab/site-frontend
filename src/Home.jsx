import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div style={{ fontFamily: "Arial, sans-serif", backgroundColor: "#0a0a23", color: "#fff", minHeight: "100vh" }}>
      
      {/* Navbar */}
      <nav style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 40px", backgroundColor: "#0f0f33" }}>
        <h2 style={{ color: "#00e6a8" }}>Os Melhores do Transporte</h2>
        <div style={{ display: "flex", gap: "20px" }}>
          <a href="#clientes" style={{ color: "#fff", textDecoration: "none" }}>Para Clientes</a>
          <a href="#transportadores" style={{ color: "#fff", textDecoration: "none" }}>Para Transportadores</a>
          <a href="#afiliados" style={{ color: "#fff", textDecoration: "none" }}>Para Afiliados</a>
          <a href="#sobre" style={{ color: "#fff", textDecoration: "none" }}>Sobre Nós</a>
          <Link to="/login"><button style={{ backgroundColor: "#111", color: "#fff", padding: "8px 16px", border: "1px solid #fff", borderRadius: "8px", cursor: "pointer" }}>Acessar / Login</button></Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section style={{ textAlign: "center", padding: "80px 20px" }}>
        <h1 style={{ fontSize: "2.5rem", fontWeight: "bold" }}>
          A Conexão Certa para quem tem o que <span style={{ color: "#9d8cff" }}>Transportar</span> e para os <span style={{ color: "#9d8cff" }}>Transportadores</span>.
        </h1>
        <p style={{ marginTop: "20px", fontSize: "1.1rem", color: "#ddd", maxWidth: "700px", marginLeft: "auto", marginRight: "auto" }}>
          Sua solução definitiva para <strong>PAGAMENTOS E TRANSPORTES</strong> de mudanças, fretes e cargas em geral.
          Unimos você a uma elite de profissionais que fazem a diferença.
        </p>
        <p style={{ marginTop: "15px", color: "#00e6a8", fontWeight: "bold" }}>Atendemos em todo o Brasil!</p>
        <div style={{ marginTop: "30px" }}>
          <span style={{ backgroundColor: "#222", padding: "10px 20px", borderRadius: "10px" }}>
            ? Role para conhecer nossos benefícios! Os botões de cadastro estão no final da página.
          </span>
        </div>
      </section>

      {/* Footer com botões */}
      <footer style={{ textAlign: "center", marginTop: "80px", padding: "40px", backgroundColor: "#0f0f33" }}>
        <h3>Cadastre-se agora:</h3>
        <div style={{ display: "flex", justifyContent: "center", gap: "15px", marginTop: "20px", flexWrap: "wrap" }}>
          <Link to="/login"><button style={{ padding: "12px 20px", borderRadius: "8px", border: "none", cursor: "pointer", backgroundColor: "#00e6a8", color: "#000", fontWeight: "bold" }}>Cadastro Cliente</button></Link>
          <Link to="/login"><button style={{ padding: "12px 20px", borderRadius: "8px", border: "none", cursor: "pointer", backgroundColor: "#9d8cff", color: "#000", fontWeight: "bold" }}>Cadastro Transportador</button></Link>
          <Link to="/login"><button style={{ padding: "12px 20px", borderRadius: "8px", border: "none", cursor: "pointer", backgroundColor: "#ffc107", color: "#000", fontWeight: "bold" }}>Cadastro Afiliado</button></Link>
        </div>
      </footer>
    </div>
  );
}
