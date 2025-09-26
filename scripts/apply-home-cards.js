const fs = require('fs');
const path = 'src/pages/HomePage.jsx';

// 1) Backup
fs.copyFileSync(path, path + '.bak');

// 2) Ler arquivo
let s = fs.readFileSync(path, 'utf8');

// 3) Remover qualquer linha que contenha a palavra "Jesus" (case-insensitive)
s = s.split('\n').filter(l => !/Jesus/i.test(l)).join('\n');

// 4) Inserir grade de cartões logo após a linha "Escolha uma das 3 categorias abaixo"
if (!/grid grid-cols-1 md:grid-cols-3/.test(s)) {
  const marker = /Escolha uma das 3 categorias abaixo.*$/im;
  s = s.replace(marker, (m) => m + `
      
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
  `);
}

// 5) Compactar margens para caber acima da dobra (sem alterar textos)
s = s
  .replace(/\bmy-16\b/g, 'my-8')
  .replace(/\bmt-16\b/g, 'mt-8')
  .replace(/\bmb-16\b/g, 'mb-8')
  .replace(/\bmy-12\b/g, 'my-6')
  .replace(/\bmt-12\b/g, 'mt-6')
  .replace(/\bmb-12\b/g, 'mb-6');

// 6) Gravar arquivo
fs.writeFileSync(path, s, 'utf8');
console.log('OK: Home atualizada com cartões + espaçamentos compactados.');
