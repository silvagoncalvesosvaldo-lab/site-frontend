const fs = require('fs');
const path = 'src/components/Navbar.jsx';

if (!fs.existsSync(path)) {
  console.error('Arquivo Navbar.jsx não encontrado.');
  process.exit(1);
}

// Backup
fs.copyFileSync(path, path + '.bak');

let s = fs.readFileSync(path, 'utf8');

// Garantir que a navbar tenha classes Tailwind para colar no topo sem margem extra
s = s.replace(/<nav[^>]*className="[^"]*"/, (m) => {
  if (!/fixed/.test(m)) {
    return m.replace('className="', 'className="fixed top-0 left-0 w-full z-50 ');
  }
  return m;
});

// Ajustar container interno: tirar paddings verticais grandes e alinhar botão
s = s.replace(/<div[^>]*className="[^"]*"/, (m) => {
  if (/flex/.test(m) && !/items-center/.test(m)) {
    return m.replace('className="', 'className="flex items-center justify-between ');
  }
  return m;
});

// Salvar alterações
fs.writeFileSync(path, s, 'utf8');
console.log('OK: Navbar ajustada para colar no topo sem espaço extra.');
