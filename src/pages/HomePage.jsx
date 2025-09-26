import TopBar from "../components/TopBar";
import React from "react";

function HomePage() {
  return (<><TopBar />
    <div className="page-content p-8">
      <main className="text-center max-w-5xl mx-auto space-y-6">
        <h1 className="text-4xl font-bold">Os Melhores do Transporte</h1>
        <p>Conectando Cargas e Transportadores com eficiência e segurança.</p>

        <h2 className="text-2xl font-semibold">
          A Conexão Certa para quem tem algo a ser transportado e claro, para todos os Motoristas.
        </h2>

        <p>Sua solução definitiva para o TRANSPORTE de Carga em Geral, Mudanças, Fretes e Carretos.</p>
        <p>Facilidade para PAGAMENTO e RECEBIMENTO, de todo o tipo de carga a ser transportada.</p>
        <p>Unimos Clientes/Embarcadores a uma elite de profissionais que fazem a diferença.</p>

        <h3 className="text-xl font-semibold">Cadastro Gratuito e Plataforma sem Mensalidade</h3>
        <p className="italic">* Aqui você anuncia sua carga gratuitamente e também;</p>
        <p>
          Seja qual for a sua categoria → Cliente/Embarcador, Motorista ou Afiliado,
          o cadastro é gratuito e o uso da plataforma é totalmente isento de mensalidade.
        </p>

        <p>Escolha uma das 3 categorias abaixo, clique no botão e veja os Benefícios e Vantagens.</p>
      
      {/* Cartões principais (Cliente/Embarcador, Motorista, Afiliado) */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        <a href="#cliente" className="rounded-2xl shadow-lg border p-6 text-center hover:shadow-xl transition">
          <div className="text-xl font-semibold">Cliente/Embarcador</div>
          <div className="text-sm opacity-70 mt-2">Ver Benefícios e Vantagens</div>
        </a>
        <a href="#motorista" className="rounded-2xl shadow-lg border p-6 text-center hover:shadow-xl transition">
          <div className="text-xl font-semibold">Motorista</div>
          <div className="text-sm opacity-70 mt-2">Ver Benefícios e Vantagens</div>
        </a>
        <a href="#afiliado" className="rounded-2xl shadow-lg border p-6 text-center hover:shadow-xl transition">
          <div className="text-xl font-semibold">Afiliado</div>
          <div className="text-sm opacity-70 mt-2">Ver Benefícios e Vantagens</div>
        </a>
      </div>
  

        {/* Cartões */}
        <div className="grid grid-cols-3 gap-6 mt-6">
          <button className="btn-outline w-full py-3">Cliente/Embarcador</button>
          <button className="btn-outline w-full py-3">Motorista</button>
          <button className="btn-outline w-full py-3">Afiliado</button>
        </div>

        {/* Navegação inferior */}
        <nav className="mt-10 text-sm flex-wrap items-center justify-center gap-x-6 gap-y-2 nav-links">
          <a href="#porque">Por que somos a escolha certa?</a>
          <a href="#legalidade">Legalidade e Responsabilidade</a>
          <a href="#seguranca">Segurança e Privacidade</a>
          <a href="#sugestoes">Sugestões</a>
          <a href="#faleconosco">Fale Conosco</a>
          <a href="#termos">Termos de Uso</a>
          <a href="#cookies">Política de Cookies</a>
        </nav>
      </main>
    </div>
  </>);
}

export default HomePage;
