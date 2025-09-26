const fs = require('fs');
const path = 'src/components/Navbar.jsx';
if (!fs.existsSync(path)) { console.error('Navbar.jsx não encontrado'); process.exit(1); }

// backup
fs.copyFileSync(path, path + '.bak');

const src = fs.readFileSync(path, 'utf8').split('\n');
const out = [];
let skipping = false;
let depth = 0;

// heurísticas do "indicador":
// - tem bg-blue/indigo/sky
// - e tem altura pequena (h-0.5/h-1/h-2/h-3 ou h-[...px])
// remover o bloco inteiro <div ...> ... </div> (ou self-closing)
const OPEN = /<([a-z]+)\s+[^>]*className="[^"]*(bg-(blue|indigo|sky)(-\d{2,3})?).*?(h-0\.5|h-1(\.5)?|h-2(\.5)?|h-3|h-\[[0-9.]+px\])[^"]*"[^>]*>/i;

for (let i = 0; i < src.length; i++) {
  const line = src[i];

  if (!skipping) {
    const m = line.match(OPEN);
    if (m) {
      // se é tag que abre e fecha na mesma linha, apenas pula esta linha
      if (new RegExp(`</${m[1]}>`).test(line) || /\/>/.test(line)) {
        continue;
      }
      // começar a pular até o fechamento correspondente
      skipping = true;
      depth = 0;
      continue;
    }
    out.push(line);
  } else {
    // estamos pulando bloco decorativo
    if (/<[a-z][^>]*>/.test(line)) depth++;
    if (/<\/[a-z]+>/.test(line)) {
      if (depth === 0) { skipping = false; continue; }
      depth--;
    }
  }
}

fs.writeFileSync(path, out.join('\n'), 'utf8');
console.log('OK: bloco(s) decorativo(s) pequeno(s) removido(s) da Navbar.');
