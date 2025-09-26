# Tarefa CodexGPT5 — Remover “pílula” azul sob a navbar

Objetivo: Remover o pequeno indicador/pílula azul que aparece sob a barra superior (Navbar), sem alterar nenhum texto aprovado.

Contexto:
- Projeto: Vite + React + Tailwind v4.
- A navbar está fixa no topo (#topbar).
- A pílula aparece centralizada logo abaixo da barra.

O que fazer (mostre DIFF antes de aplicar):
1) Inspecionar `src/components/Navbar.jsx` e arquivos relacionados (ex.: componentes de menu / header) e localizar o elemento decorativo (geralmente classes como `rounded-full` + `bg-blue*` + `h-?` pequeno, ou pseudo-elementos/indicator).
2) Remover o elemento decorativo de forma limpa (sem alterar textos).
3) Garantir que o `<nav>` não injete nada abaixo (sem sublinhado, pseudo-elementos, indicadores).
4) Manter `id="topbar"`, `fixed top-0 left-0 w-full z-50` e `overflow-hidden` na `<nav>`.

Pra conferir:
- Após aplicar, a página deve exibir o topo sem nenhuma barrinha/pílula sob a barra azul.
- Nenhuma mudança de texto.

IMPORTANTE:
- Mostrar o DIFF antes de aplicar.
- Não mudar textos.
- Se houver dependência de lib (ex.: shadcn/radix `NavigationMenu.Indicator`), desabilite apenas o indicador.

