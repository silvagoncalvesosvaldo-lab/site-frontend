# Mapa de Funcionalidades – Os Melhores do Transporte

## Clientes
- Cadastro com Nome, WhatsApp, E-mail, Endereço, Comprovante de Residência, Banco, Agência, Conta, Chave Pix.
- Escolha obrigatória do tipo de carga: Mudanças, Carretos, Cargas Secas, Cargas Refrigeradas, Cargas a Granel, Cargas Perigosas, Cargas Indivisíveis/Grande Porte, Cargas de Veículos, Cargas Conteinerizadas.
- Solicitação de transporte.
- Pagamento seguro/intermediado (a implementar com gateway de pagamento).
- Rastreamento em tempo real da carga (a implementar com integração GPS).
- Programa de fidelidade e descontos progressivos (planejar).
- Indique e ganhe (ligado ao sistema de afiliados).

## Transportadores
- Cadastro com Nome, WhatsApp, E-mail, Endereço, Comprovante de Residência, ANTT, Renavam, Placa do Veículo, Banco, Agência, Conta, Chave Pix, Fotos do veículo.
- Campos opcionais: CNH, RG, CPF.
- Recebimento de solicitações de frete.
- Pagamento garantido (com adiantamento e liberação final).
- Chat interno com clientes (sem troca de contatos externos).
- Sugestões de pontos de apoio na rota (integração com mapas/serviços externos).
- Gestão de documentos (alertas de vencimento de CNH, ANTT, etc.).
- Ranking (Bronze, Prata, Ouro, Diamante).

## Afiliados
- Cadastro com Nome, WhatsApp, E-mail, Banco, Agência, Conta, Chave Pix.
- Link único de afiliação.
- Convites enviam página inicial com mensagens especiais.
- Comissão automática ao gerar negócios.
- Relatórios de ganhos e desempenho.

## Admin
- Login exclusivo pela Área Restrita.
- Dashboard para visualizar e gerenciar todos os cadastros.
- Controle de anúncios de transporte.
- Confirmação de liberações de pagamento.
- Relatórios completos.
- Visão geral de Clientes, Transportadores e Afiliados.

---

## Situação Atual
- Frontend React criado com rotas de login separadas.
- Admin Login e Dashboard básico criados.
- Home com Área Restrita.
- Ainda sem cadastros completos.
- Ainda sem integração de banco de dados.
- Ainda sem chat, pagamento, rastreamento, programa de afiliados.

---

## Etapas
1. Criar páginas de cadastro (Cliente, Transportador, Afiliado).
2. Ligar cadastros ao Admin Dashboard (simulação em memória).
3. Implementar banco de dados (MongoDB/Postgres).
4. Adicionar gateway de pagamento.
5. Criar chat interno.
6. Criar rastreamento.
7. Implementar ranking e fidelidade.
8. Implementar afiliação com links únicos.
