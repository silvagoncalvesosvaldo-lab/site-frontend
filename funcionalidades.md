# Mapa de Funcionalidades � Os Melhores do Transporte

## Clientes
- Cadastro com Nome, WhatsApp, E-mail, Endere�o, Comprovante de Resid�ncia, Banco, Ag�ncia, Conta, Chave Pix.
- Escolha obrigat�ria do tipo de carga: Mudan�as, Carretos, Cargas Secas, Cargas Refrigeradas, Cargas a Granel, Cargas Perigosas, Cargas Indivis�veis/Grande Porte, Cargas de Ve�culos, Cargas Conteinerizadas.
- Solicita��o de transporte.
- Pagamento seguro/intermediado (a implementar com gateway de pagamento).
- Rastreamento em tempo real da carga (a implementar com integra��o GPS).
- Programa de fidelidade e descontos progressivos (planejar).
- Indique e ganhe (ligado ao sistema de afiliados).

## Transportadores
- Cadastro com Nome, WhatsApp, E-mail, Endere�o, Comprovante de Resid�ncia, ANTT, Renavam, Placa do Ve�culo, Banco, Ag�ncia, Conta, Chave Pix, Fotos do ve�culo.
- Campos opcionais: CNH, RG, CPF.
- Recebimento de solicita��es de frete.
- Pagamento garantido (com adiantamento e libera��o final).
- Chat interno com clientes (sem troca de contatos externos).
- Sugest�es de pontos de apoio na rota (integra��o com mapas/servi�os externos).
- Gest�o de documentos (alertas de vencimento de CNH, ANTT, etc.).
- Ranking (Bronze, Prata, Ouro, Diamante).

## Afiliados
- Cadastro com Nome, WhatsApp, E-mail, Banco, Ag�ncia, Conta, Chave Pix.
- Link �nico de afilia��o.
- Convites enviam p�gina inicial com mensagens especiais.
- Comiss�o autom�tica ao gerar neg�cios.
- Relat�rios de ganhos e desempenho.

## Admin
- Login exclusivo pela �rea Restrita.
- Dashboard para visualizar e gerenciar todos os cadastros.
- Controle de an�ncios de transporte.
- Confirma��o de libera��es de pagamento.
- Relat�rios completos.
- Vis�o geral de Clientes, Transportadores e Afiliados.

---

## Situa��o Atual
- Frontend React criado com rotas de login separadas.
- Admin Login e Dashboard b�sico criados.
- Home com �rea Restrita.
- Ainda sem cadastros completos.
- Ainda sem integra��o de banco de dados.
- Ainda sem chat, pagamento, rastreamento, programa de afiliados.

---

## Etapas
1. Criar p�ginas de cadastro (Cliente, Transportador, Afiliado).
2. Ligar cadastros ao Admin Dashboard (simula��o em mem�ria).
3. Implementar banco de dados (MongoDB/Postgres).
4. Adicionar gateway de pagamento.
5. Criar chat interno.
6. Criar rastreamento.
7. Implementar ranking e fidelidade.
8. Implementar afilia��o com links �nicos.
