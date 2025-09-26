const fs = require('fs');
const path = require('path');

const SRC = 'src';
const SMALL_H = /\b(h-0\.5|h-1(\.5)?|h-2(\.5)?|h-3)\b|h-\[[0-9.]+px\]/i;
const BLUE_BG = /\b(bg-(blue|indigo|sky)(-\d{2,3})?)\b/i;
const ROUNDED = /\brounded-full\b/i;

function walk(dir) {
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name);
    const st = fs.statSync(p);
    if (st.isDirectory()) walk(p);
    else if (/\.(jsx|tsx|js|ts)$/.test(name)) processFile(p);
  }
}

function processFile(file) {
  const orig = fs.readFileSync(file, 'utf8');
  const lines = orig.split('\n');
  let changed = false;

  // estratégia 1: remover linhas únicas com “pílula” (self/inline)
  let out = lines.filter(line => {
    const L = line.toLowerCase();
    const match = ROUNDED.test(L) && BLUE_BG.test(L) && SMALL_H.test(L);
    if (match) changed = true;
    return !match;
  }).join('\n');

  // estratégia 2: remover blocos <div ...>...</div> pequenos com a mesma assinatura
  // heurística simples: se a linha de abertura tem a assinatura, removemos até a linha que fecha o mesmo nível
  if (!changed) {
    const openTag = /<([a-z]+)([^>]*className="[^"]*")([^>]*)>/i;
    const lines2 = orig.split('\n');
    const res = [];
    let skip = 0;
    let depth = 0;

    for (let i = 0; i < lines2.length; i++) {
      const line = lines2[i];
      if (!skip) {
        const m = line.match(openTag);
        const cl = m?.[2]?.toLowerCase() || '';
        if (m && ROUNDED.test(cl) && BLUE_BG.test(cl) && SMALL_H.test(cl)) {
          // começar a pular até fechar a tag correspondente
          skip = 1; depth = 0;
          changed = true;
          // se a linha já fecha imediatamente, não precisa pular mais
          if (/>.*<\/\1>/.test(line)) { skip = 0; continue; }
          continue;
        }
        res.push(line);
      } else {
        // estamos pulando até achar fechamento compensado
        if (/<[a-z][^>]*>/.test(line)) depth++;
        if (/<\/[a-z]+>/.test(line)) {
          if (depth === 0) { skip = 0; continue; }
          depth--;
        }
      }
    }
    if (changed) out = res.join('\n');
  }

  if (changed) {
    fs.copyFileSync(file, file + '.bak');
    fs.writeFileSync(file, out, 'utf8');
    console.log('LIMPADO:', file);
  }
}

walk(SRC);
console.log('OK: varredura concluída.');
