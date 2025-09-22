import { FaArrowDown } from "react-icons/fa";

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-container">
        {/* Subtítulo */}
        <h3 className="hero-subtitle">Os Melhores do Transporte</h3>

        {/* Título principal */}
        <h1 className="hero-title">
          A Conexão Certa para quem tem algo a ser{" "}
          <span>Transportado</span> e para os <span>Transportadores.</span>
        </h1>

        {/* Descrição */}
        <p className="hero-description">
          Sua solução definitiva para <strong>TRANSPORTE</strong> de Cargas em
          Geral, Mudanças, Fretes e Carretos.
          <br />
          Facilidade para <strong>PAGAMENTO</strong> e{" "}
          <strong>RECEBIMENTO</strong> de todo o tipo de carga a ser transportada.
          <br />
          Unimos clientes/Embarcadores a uma elite de profissionais que fazem a
          diferença.
        </p>

        {/* Localização */}
        <p className="hero-location">✅✅ Atendemos em todo o Brasil!</p>

        {/* Botão seta */}
        <button className="hero-button">
          <FaArrowDown style={{ marginRight: "8px" }} />
          Role para baixo para conhecer nossos benefícios!
          <br /> Os botões de cadastro estão no final da página.
        </button>
      </div>
    </section>
  );
}

