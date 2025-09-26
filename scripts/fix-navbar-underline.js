const fs = require('fs');
const path = 'src/components/Navbar.jsx';
if (!fs.existsSync(path)) { console.error('Navbar.jsx não encontrado'); process.exit(1); }
fs.copyFileSync(path, path + '.bak');
let s = fs.readFileSync(path, 'utf8');

// 1) Garantir que o <nav> está fixo, sem margem inferior e sem vazamento
s = s.replace(/<nav([^>]+)className="([^"]*)"/, (m, a1, classes) => {
  const add = (c) => (classes.includes(c) ? classes : classes + ' ' + c);
  classes = add('fixed top-0 left-0 w-full z-50');
  classes = add('overflow-hidden');      // esconde qualquer elemento que “escapa” pra baixo
  classes = add('mb-0');                 // nenhuma margem inferior
  return `<nav${a1}className="${classes.trim()}"`;
});

// 2) Remover qualquer “faixa decorativa” pequena (pill) logo abaixo do nav
// Heurística: linhas com bg-blue* + rounded-full + h-[1..3] (ou h-1/h-2/h-3)
s = s.split('\n').filter(line => {
  const L = line.toLowerCase();
  const isBlue = /bg-blue|bg-indigo|bg-sky/.test(L);
  const isPill = /rounded-full/.test(L);
  const isTinyH = /\bh-0\.5\b|\bh-1\b|\bh-1\.5\b|\bh-2\b|\bh-2\.5\b|\bh-3\b/.test(L) || /h-\[[0-9.]+px\]/.test(L);
  // Se for um decorativo pequeno azul em formato pílula, remove
  return !(isBlue && isPill && isTinyH);
}).join('\n');

fs.writeFileSync(path, s, 'utf8');
console.log('OK: Navbar sem sublinhado/pílula e sem espaço branco.');
