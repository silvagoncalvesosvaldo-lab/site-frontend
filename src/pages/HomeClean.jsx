import React from "react";

export default function HomeClean() {
  return (
    <main className="max-w-5xl mx-auto px-4 pt-24 pb-10">
      <h1 className="text-4xl md:text-5xl font-extrabold text-center">Os Melhores do Transporte</h1>
      <p className="text-center mt-4">Conectando Cargas e Transportadores com eficiência e segurança.</p>

      <h2 className="text-2xl md:text-3xl font-semibold text-center mt-8">
        A Conexão Certa para quem tem algo a ser transportado e claro, para todos os Motoristas.
      </h2>

      <p className="text-center mt-6">Sua solução definitiva para o TRANSPORTE de Carga em Geral, Mudanças, Fretes e Carretos.</p>
      <p className="text-center mt-4">Facilidade para PAGAMENTO e RECEBIMENTO, de todo o tipo de carga a ser transportada.</p>
      <p className="text-center mt-4">Unimos Clientes/Embarcadores a uma elite de profissionais que fazem a diferença.</p>

      <h3 className="text-xl md:text-2xl font-semibold text-center mt-8">Cadastro Gratuito e Plataforma sem Mensalidade</h3>
      <p className="text-center italic mt-2">* Aqui você anuncia sua carga gratuitamente e também;</p>
      <p className="text-center mt-4">Seja qual for a sua categoria — Cliente/Embarcador, Motorista ou Afiliado, o cadastro é gratuito e o uso da plataforma é totalmente isento de mensalidade.</p>

      <p className="text-center mt-6">Escolha uma das 3 categorias abaixo, clique no botão e veja os Benefícios e Vantagens.</p>

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

      <nav className="mt-6 text-sm opacity-80 flex flex-wrap justify-center gap-x-3 gap-y-2 text-center">
        <a href="#">Por que somos a escolha certa?</a>
        <span>•</span>
        <a href="#">Legalidade e Responsabilidade</a>
        <span>•</span>
        <a href="#">Segurança e Privacidade</a>
        <span>•</span>
        <a href="#">Sugestões</a>
        <span>•</span>
        <a href="#">Fale Conosco</a>
        <span>•</span>
        <a href="#">Termos de Uso</a>
        <span>•</span>
        <a href="#">Política de Cookies</a>
      </nav>
    </main>
  );
}
