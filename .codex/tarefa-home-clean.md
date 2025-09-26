# Tarefa CodexGPT5 — Criar Home nova e limpa (idêntica aos prints/textos aprovados)

## Objetivo
Criar uma **nova página inicial** (HomeClean) **idêntica** à Home aprovada pelo usuário, porém **sem o indicador/pílula azul sob a navbar**, **sem faixa branca**, **com os 3 cartões** logo abaixo dos textos e **compactada** para aparecer **sem rolagem** em desktops comuns (1080p), mantendo **100% dos textos exatamente como enviados** (não alterar vírgulas, pontos, ordem, títulos, etc.).

## Regras inegociáveis
- **NÃO alterar nenhum texto**; copiar exatamente o conteúdo abaixo.
- **NÃO remover nem reescrever** frases aprovadas (apenas estruturar/estilizar).
- **Remover qualquer indicador/underline/pseudo-elemento** abaixo da navbar.
- **Nada de elementos decorativos** sob o topo.
- **Acima da dobra**: cabeçalho, subtítulos, headline, descrições e os 3 cartões.
- Degradê do site será aplicado depois; aqui foque apenas na Home limpa e fiel.

## Componentes/arquivos a criar/ajustar
1) Criar `src/pages/HomeClean.jsx` (novo componente React).
2) Ajustar as rotas para poder abrir `HomeClean` temporariamente em `/` **sem apagar** a Home atual:
   - Se houver `src/App.jsx` com `react-router`, adicionar rota `path="/" element={<HomeClean/>}` **acima** da rota antiga, mas **NÃO** apagar a existente (deixe comentada ou abaixo).
   - Se o projeto não usa router, exportar `HomeClean` e **substituir apenas a importação/uso** no ponto de montagem (ex.: `App.jsx`), deixando a import antiga comentada. Mostrar DIFF antes de aplicar.
3) Navbar: garantir `id="topbar"`, `className="fixed top-0 left-0 w-full z-50 overflow-hidden mb-0"` e **não renderizar nenhum indicador**. Se existir componente de Navbar, apenas **usar**; não edite textos.
4) Container da página: compensar a navbar com `pt-24` (ou valor equivalente) e manter espaçamentos compactos (`mt-6`, `mb-6`, `my-6` no máximo).

## Layout e classes (Tailwind v4)
- Wrapper: `div` com `max-w-5xl mx-auto px-4 pt-24`
- Títulos e blocos **compactados**: substituir margens 12–16 por 6–8 (sem afetar textos).
- **3 cartões** em grade: `div` com `grid grid-cols-1 md:grid-cols-3 gap-6 mt-6`
  - Cada cartão: `a` com `rounded-2xl shadow-lg border p-6 text-center hover:shadow-xl transition`
  - Títulos dos cartões: `text-xl font-semibold`
  - Subtítulo do cartão: `text-sm opacity-70 mt-2`

## Textos (usar exatamente estes, na ordem)
**Título principal (h1):**  
Os Melhores do Transporte

**Subtítulo curto (linha abaixo do h1):**  
Conectando Cargas e Transportadores com eficiência e segurança.

**Headline em destaque (h2):**  
A Conexão Certa para quem tem algo a ser transportado e claro, para todos os Motoristas.

**Descrição 1:**  
Sua solução definitiva para o TRANSPORTE de Carga em Geral, Mudanças, Fretes e Carretos.

**Descrição 2:**  
Facilidade para PAGAMENTO e RECEBIMENTO, de todo o tipo de carga a ser transportada.

**Descrição 3:**  
Unimos Clientes/Embarcadores a uma elite de profissionais que fazem a diferença.

**Chamada (h3):**  
Cadastro Gratuito e Plataforma sem Mensalidade

**Nota (itálico):**  
* Aqui você anuncia sua carga gratuitamente e também;

**Parágrafo:**  
Seja qual for a sua categoria → Cliente/Embarcador, Motorista ou Afiliado, o cadastro é gratuito e o uso da plataforma é totalmente isento de mensalidade.

**Linha antes dos cartões:**  
Escolha uma das 3 categorias abaixo, clique no botão e veja os Benefícios e Vantagens.

**3 Cartões (links placeholders por enquanto)**
- **Cliente/Embarcador** — subtítulo: Ver Benefícios e Vantagens — href: `#cliente`
- **Motorista** — subtítulo: Ver Benefícios e Vantagens — href: `#motorista`
- **Afiliado** — subtítulo: Ver Benefícios e Vantagens — href: `#afiliado`

**Rodapé de navegação (apenas links de texto, em linha, compactos, no final da HomeClean sem rolagem):**  
Por que somos a escolha certa? • Legalidade e Responsabilidade • Segurança e Privacidade • Sugestões • Fale Conosco • Termos de Uso • Política de Cookies  
(links podem ser `#` placeholders; não alterar textos)

## Estrutura JSX sugerida (referência)
```jsx
export default function HomeClean() {
  return (
    <main className="max-w-5xl mx-auto px-4 pt-24">
      <h1 className="text-4xl md:text-5xl font-extrabold text-center">Os Melhores do Transporte</h1>
      <p className="text-center mt-4">Conectando Cargas e Transportadores com eficiência e segurança.</p>

      <h2 className="text-2xl md:text-3xl font-semibold text-center mt-8">
        A Conexão Certa para quem tem algo a ser transportado e claro, para todos os Motoristas.
      </h2>

      <p className="text-center mt-6">Sua solução definitiva para o TRANSPORTE de Carga em Geral, Mudanças, Fretes e Carretos.</p>
      <p className="text-center mt-4">Facilidade para PAGAMENTO e RECEBIMENTO, de todo o tipo de carga a ser transportada.</p>
      <p className="text-center mt-4">Unimos Clientes/Embarcadores a uma elite de profissionais que fazem a diferença.</p>

      <h3 className="text-xl md:text-2xl font-semibold text-center mt-8">Cadastro Gratuito e Plataforma sem Mensalidade</h3>
      <p className="text-center italic mt-2">* Aqui você anuncia sua carga gratuitamente e também;</p>
      <p className="text-center mt-4">Seja qual for a sua categoria → Cliente/Embarcador, Motorista ou Afiliado, o cadastro é gratuito e o uso da plataforma é totalmente isento de mensalidade.</p>

      <p className="text-center mt-6">Escolha uma das 3 categorias abaixo, clique no botão e veja os Benefícios e Vantagens.</p>

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

      <nav className="text-center mt-6 text-sm opacity-80 space-x-3">
        <a href="#">Por que somos a escolha certa?</a>
        <span>•</span>
        <a href="#">Legalidade e Responsabilidade</a>
        <span>•</span>
        <a href="#">Segurança e Privacidade</a>
        <span>•</span>
        <a href="#">Sugestões</a>
        <span>•</span>
        <a href="#">Fale Conosco</a>
        <span>•</span>
        <a href="#">Termos de Uso</a>
        <span>•</span>
        <a href="#">Política de Cookies</a>
      </nav>
    </main>
  );
}


