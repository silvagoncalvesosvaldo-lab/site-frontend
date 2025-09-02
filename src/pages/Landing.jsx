import React from "react";
import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="bg-gray-900 text-white font-sans">
      {/* Navbar */}
      <header className="bg-gray-900 shadow-md">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="text-blue-400 text-2xl">���</span>
            <h1 className="text-lg font-bold">Os Melhores do Transporte</h1>
          </div>
          <nav className="flex gap-6 text-sm">
            <a href="#clientes" className="hover:text-blue-400">Para Clientes</a>
            <a href="#transportadores" className="hover:text-blue-400">Para Transportadores</a>
            <a href="#afiliados" className="hover:text-blue-400">Para Afiliados</a>
            <a href="#sobre" className="hover:text-blue-400">Sobre Nós</a>
          </nav>
          <Link
            to="/login"
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-sm font-semibold"
          >
            Acessar / Login
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="text-center py-20 bg-gradient-to-r from-blue-700 to-blue-500">
        <h2 className="text-4xl font-bold mb-4">Conectando Cargas e Motoristas</h2>
        <p className="text-lg max-w-2xl mx-auto">
          Encontre transportes confiáveis, aumente seus ganhos e otimize suas rotas com
          eficiência e segurança.
        </p>
      </section>

      {/* Serviços */}
      <section className="max-w-6xl mx-auto py-16 px-6 grid md:grid-cols-3 gap-8 text-center">
        <div
          id="clientes"
          className="bg-gray-800 rounded-2xl p-8 shadow-lg flex flex-col items-center"
        >
          <h3 className="text-xl font-bold mb-4">Sou Cliente</h3>
          <p className="mb-6">Preciso de um transporte seguro e eficiente para minha carga.</p>
          <Link
            to="/cadastro"
            className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg font-semibold"
          >
            Cadastrar como Cliente →
          </Link>
        </div>

        <div
          id="transportadores"
          className="bg-gray-800 rounded-2xl p-8 shadow-lg flex flex-col items-center"
        >
          <h3 className="text-xl font-bold mb-4">Sou Transportador</h3>
          <p className="mb-6">Quero encontrar fretes, aumentar meus ganhos e otimizar minhas rotas.</p>
          <Link
            to="/cadastroTransportador"
            className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg font-semibold"
          >
            Cadastrar como Transportador →
          </Link>
        </div>

        <div
          id="afiliados"
          className="bg-gray-800 rounded-2xl p-8 shadow-lg flex flex-col items-center"
        >
          <h3 className="text-xl font-bold mb-4">Para ser Afiliado</h3>
          <p className="mb-6">Junte-se à nossa rede e ganhe indicando clientes e transportadores.</p>
          <Link
            to="/cadastroAfiliado"
            className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg font-semibold"
          >
            Cadastrar como Afiliado →
          </Link>
        </div>
      </section>

      {/* Rodapé */}
      <footer className="bg-gray-950 py-6 text-sm mt-16">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
          <p>© 2025 Os Melhores do Transporte. Todos os direitos reservados.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#sobre" className="hover:text-blue-400">Sobre Nós</a>
            <a href="#ajuda" className="hover:text-blue-400">Ajuda</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
