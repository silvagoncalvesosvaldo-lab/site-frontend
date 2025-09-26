# Projeto Os Melhores do Transporte — Atualizado em 24/09/2025

> **Regra de ouro:** manter fiel ao que foi planejado pelo usuário. Não mudar textos, títulos, pontos, vírgulas, ordem ou conteúdo já aprovado. Apenas implementar e evoluir sem refazer o que está pronto.

---

## 1) Página Inicial (idêntica à aprovada)

- **Título:** *Os Melhores do Transporte*
- **Subtítulo:** *Conectando Cargas e Transportadores com eficiência e segurança.*
- **Headline:** *A Conexão Certa para quem tem algo a ser transportado e claro, para todos os Motoristas.*
- **Descrição:** *Sua solução definitiva para o TRANSPORTE de Carga em Geral, Mudanças, Fretes e Carretos.*
- **Benefício central:** *Facilidade para PAGAMENTO e RECEBIMENTO, de todo o tipo de carga a ser transportada.*
- **Quem participa:** *Unimos Clientes/Embarcadores a uma elite de profissionais que fazem a diferença.*
- **Chamada:** *Cadastro Gratuito e Plataforma sem Mensalidade*
- **Botões principais:**
  - Cliente/Embarcador → Página 2A
  - Motorista → Página 2B
  - Afiliado → Página 2C
- **Botão secundário (topo direito):** Para quem já é cadastrado
- **Rodapé (links):** Por que somos a escolha certa? | Legalidade e Responsabilidade | Segurança e Privacidade | Sugestões | Fale Conosco | Termos de Uso | Política de Cookies

---

## 2) Páginas de Benefícios e Vantagens por Perfil

- **2A Cliente/Embarcador** → blocos 1 a 8 conforme especificado
- **2B Motorista** → blocos 1 a 9 conforme especificado
- **2C Afiliado** → blocos 1 a 6 conforme especificado

---

## 3) Cadastros Simplificados (obrigatórios)

- **Cliente/Embarcador:** Nome Completo, E-mail, WhatsApp, Finalizar Cadastro
- **Motorista:** Nome Completo, WhatsApp, E-mail, Finalizar Cadastro
- **Afiliado:** Nome Completo, WhatsApp, E-mail, Finalizar Cadastro

---

## 4) Painéis Individuais (um por pessoa)

- **Painel Cliente/Embarcador (4A):** itens 1º a 12 (Plano de Fidelidade, cadastrar cargas, Pix, chat, relatórios, etc.)
- **Painel Motorista (4B):** itens 1º a 15 (cadastro de veículo, upload docs, ranking, fidelidade, pagamentos, chat, etc.)
- **Painel Afiliado (4C):** itens 1º a 5 (dados bancários, relatórios, pagamentos, bônus, etc.)
- **Painel 6 (público):** Cargas Anunciadas + Motorista Verificado
- **Painel Admin (5):** controle de comissões, percentuais, relatórios, lucros

---

## 5) Formulários (Cliente/Embarcador)

- **Seleção de tipo de carga:** carretos, mudanças, cargas gerais, perigosas, vivas, industriais etc.
- **Formulário de Mudanças:** 12 perguntas (endereço, elevador, embalagens, lista de itens com quantidades, etc.)
- **Formulário de Carga:** peso, volume, dimensões, unitização, perecível, carga batida, etc.
- **Observações em vermelho** → manter igual aos prints enviados.

---

## 6) Textos das Páginas de Navegação

- **Legalidade e Responsabilidade** → Auxílio no Contrato, Isenção no Transporte, Isenção de Vínculo
- **Por que somos a escolha certa?** → Embarcadores Idôneos, Motoristas Verificados
- **Segurança e Privacidade** → Proteção e Segurança

---

## 7) Tecnologias e Infraestrutura (MVP)

- Frontend: Vite + React + Tailwind v4
- Backends: Node.js/Express
- Auth/DB: Appwrite
- Deploy: Render
- CI/CD: GitHub → Render
- Mensageria: Z-API (WhatsApp) e SMTP (Gmail)

---

## 8) Checkpoint atual

- Commit/push OK → GitHub → Render
- Deploy automático configurado
- Localhost: erro postcss/tailwind ainda pendente

---

## 9) Próximos passos

1. Corrigir dependência do PostCSS (`@tailwindcss/postcss`)
2. Validar Home localmente em `http://localhost:5173`
3. Abrir ticket com Codex: **Cadastro Cliente (form simples)** → aplicar patch com diff antes de commit

