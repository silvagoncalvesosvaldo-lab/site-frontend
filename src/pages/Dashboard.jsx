import React from "react";

export default function Dashboard() {
  return (
    <div>
      {/* Hero Section */}
      <section className="text-center py-20 px-6 flex-grow">
        <h2 className="text-4xl md:text-6xl font-extrabold leading-tight">
          A Conexão Certa para quem tem algo a ser{" "}
          <span className="text-purple-400">Transportado</span>, e também para os{" "}
          <span className="text-purple-400">Transportadores.</span>
        </h2>

        <p className="mt-6 text-lg text-white max-w-3xl mx-auto">
          Sua solução definitiva para{" "}
          <span className="font-semibold">
            TRANSPORTE de Cargas Em Geral, Mudanças, Fretes e Carretos.
          </span>
        </p>

        <p className="mt-4 text-lg text-white max-w-3xl mx-auto">
          <span className="font-semibold">Facilidade para PAGAMENTO E RECEBIMENTO</span> seja qual for o tipo de carga a ser transportada.
        </p>

        <p className="mt-4 text-lg text-white max-w-3xl mx-auto">
          Unimos todo tipo de embarcador a uma elite de profissionais que fazem a diferença.
        </p>

        <p className="mt-4 text-green-400 font-medium">
          ✦✦✦ Atendemos em todo o Brasil!
        </p>
      </section>
    </div>
  );
}
