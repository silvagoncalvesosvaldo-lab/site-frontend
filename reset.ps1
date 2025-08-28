Write-Host 'Limpando node_modules e package-lock.json...'
rd -r -fo node_modules
del package-lock.json

Write-Host 'Instalando dependências...'
npm install

Write-Host 'Instalando pacotes principais (Vite + React)...'
npm install @vitejs/plugin-react react react-dom --save-dev

Write-Host 'Ajustando tipo de módulo...'
npm pkg set type=module

Write-Host 'Iniciando servidor de desenvolvimento...'
npm run dev
