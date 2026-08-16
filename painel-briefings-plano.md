# Plano de implementação — painel de briefings

## Objetivo

Disponibilizar uma área interna simples para consultar os briefings enviados, sem precisar abrir diretamente as tabelas do Supabase.

## 1. Definir acesso privado

- Criar uma área interna em `/admin`.
- Proteger o acesso com autenticação simples no servidor, usando credenciais definidas por variáveis de ambiente.
- Manter a sessão em cookie `httpOnly` e seguro.
- Não expor a chave de serviço do Supabase ao navegador.

## 2. Criar login e logout

- Implementar `/admin/login` com formulário de acesso.
- Criar ação de logout.
- Redirecionar páginas internas para o login quando não houver sessão válida.
- Exibir mensagens genéricas para tentativas de acesso inválidas.

## 3. Criar a lista de briefings

Em `/admin/briefings`, apresentar os registros da tabela `briefings` em ordem decrescente de envio, com:

- data e hora do envio;
- nome e empresa;
- e-mail e telefone;
- necessidade principal, etapa e prazo;
- link para a página de detalhe;
- paginação para manter a página rápida conforme a quantidade de registros aumentar.

## 4. Adicionar busca e filtros

Permitir:

- busca por nome, empresa ou e-mail;
- filtros por necessidade principal, etapa e prazo.

As consultas e filtros serão executados no servidor via Supabase, para que dados pessoais não sejam enviados desnecessariamente ao cliente.

## 5. Criar a tela de detalhe

Em `/admin/briefings/[id]`, mostrar as respostas completas em blocos de leitura:

1. Contato
2. Negócio
3. Projeto
4. Planejamento

As colunas estruturadas da tabela serão usadas como fonte principal. O campo `raw_data` complementará respostas condicionais ou futuras, sem perda de informação. URLs fornecidas por clientes serão tratadas apenas como texto ou links seguros, nunca como HTML.

## 6. Privacidade e segurança

- Acessar o Supabase exclusivamente no servidor com `SUPABASE_SERVICE_ROLE_KEY`.
- Impedir indexação da área administrativa (`noindex`).
- Não registrar dados pessoais em logs, analytics ou mensagens de erro.
- Aplicar cabeçalhos que evitem o cache compartilhado das páginas internas.

## 7. Interface e estados

- Reutilizar a identidade visual do site, priorizando leitura e operação.
- Tornar tabela e detalhes responsivos para celular.
- Criar estados vazios, de carregamento e de erro.
- Oferecer navegação clara entre lista e detalhe.

## 8. Escopo da primeira versão

O painel será somente de consulta: sem editar ou excluir briefings. Isso mantém a primeira entrega enxuta e reduz o risco de alterações acidentais em dados de leads.

Uma segunda etapa poderá introduzir status próprios, como `novo`, `em contato` e `arquivado`, com uma coluna específica no Supabase.

## 9. Validação antes da entrega

- Testar login, logout e bloqueio de acesso sem sessão.
- Testar listagem, busca, filtros, paginação e detalhes.
- Conferir a experiência em celular.
- Executar lint, typecheck e build do projeto.
