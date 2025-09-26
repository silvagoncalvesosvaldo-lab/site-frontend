#!/bin/bash
set -e

echo "=== Backup do package.json atual ==="
mkdir -p backup
cp -f package.json "backup/package.json.pre-fix-$(date +%Y%m%d-%H%M%S).json"

echo "=== Criando package.json limpo ==="
cat > package.json << EOPKG
{
  "name": "site-frontend",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "18.3.1",
    "react-dom": "18.3.1"
  },
  "devDependencies": {
    "vite": "^4.5.0",
    "@vitejs/plugin-react": "^3.1.0",
    "rollup": "^3.29.0"
  }
}
EOPKG

echo "=== Limpando dependências antigas ==="
rm -rf node_modules package-lock.json

echo "=== Instalando dependências ==="
npm install

echo "=== Commitando e fazendo push ==="
git add package.json package-lock.json
git commit -m "fix: corrigido package.json e reinstalado dependências para Render"
git push origin HEAD
