Implemente agora a aplicação real da Fortunato Brands usando como fontes de verdade:

- `/docs/brand-foundation.md`
- `/docs/information-architecture.md`
- `/docs/design-system.md`
- `/docs/home-wireframe.md`
- `/docs/case-study-architecture.md`
- `/docs/briefing-funnel.md`
- `/docs/technical-architecture.md`
- `/docs/implementation-spec.md`

Objetivo: construir um MVP completo, elegante, responsivo e pronto para produção, evitando overengineering.

Princípio desta fase:

> Implemente somente o necessário para o produto atual funcionar bem.

Não antecipe CMS, dashboard, autenticação, e-commerce, uploads, PWA ou abstrações futuras sem necessidade concreta.

---

# 1. Antes de alterar o projeto

Inspecione o repositório existente e preserve decisões válidas já presentes.

Verifique:

- framework e versões atuais;
- package manager;
- estrutura de pastas;
- scripts;
- lint;
- TypeScript;
- estilos existentes.

Não migre ferramentas ou reestruture o projeto inteiro sem motivo.

Se a base já estiver saudável, evolua-a.

---

# 2. Stack

Utilize a arquitetura definida em `/docs/technical-architecture.md`.

Preferência esperada:

- Next.js com App Router;
- React;
- TypeScript;
- Server Components por padrão;
- CSS custom properties + CSS Modules/globals;
- conteúdo local versionado no repositório.

Não adicionar biblioteca de UI.

Não adicionar biblioteca de animação pesada.

Para microinterações simples, usar CSS.

---

# 3. Implemente por etapas

Siga esta ordem:

```text
1. foundation
2. design tokens e estilos globais
3. i18n e conteúdo
4. header/footer
5. home
6. projects e cases
7. services/about
8. briefing
9. endpoint do briefing
10. SEO/acessibilidade/revisão
```

Após cada etapa, mantenha a aplicação compilável.

Não criar toda a aplicação em um único arquivo.

Também não fragmentar cada pequeno elemento em um componente próprio.

---

# 4. Design foundation

Implemente os tokens documentados em `/docs/design-system.md`.

Centralize:

- cores;
- espaçamento;
- radius;
- tipografia;
- containers;
- motion.

Evite valores arbitrários repetidos.

Porém, não crie um framework interno de design system.

CSS custom properties são suficientes.

---

# 5. Tipografia

Use a solução mais simples e performática compatível com a base atual.

Se Inter estiver disponível através do mecanismo otimizado do Next.js, pode ser usada inicialmente.

A estrutura deve permitir troca posterior.

Não perseguir fidelidade à Apple através de fontes proprietárias ou não licenciadas.

---

# 6. Layout global

Implemente:

- container consistente;
- espaçamento generoso;
- fundo neutro;
- hierarchy tipográfica;
- header;
- footer.

Evite:

- sombras decorativas;
- gradientes;
- glassmorphism pesado;
- cards SaaS;
- radius excessivo.

---

# 7. Internacionalização

Implemente somente o necessário para:

```text
/pt
/en
```

Português é o conteúdo principal.

Inglês deve possuir estrutura funcional mesmo quando algumas traduções ainda precisarem ser refinadas.

Não instalar uma solução complexa de i18n se roteamento e conteúdo local puderem resolver o MVP de forma limpa.

Valores internos permanecem independentes do idioma.

---

# 8. Home

Implemente a Home na ordem definida:

```text
Header
Hero
Projetos selecionados
Manifesto
Identidade Visual
Rebranding
Websites
Processo
Depoimentos, se existirem
Sobre
CTA final
Footer
```

Não adicionar seções extras.

---

# 9. Hero

Preservar composição editorial.

Desktop:

- headline dominante;
- bastante espaço;
- supporting copy deslocada quando apropriado;
- CTA principal;
- CTA secundário.

Mobile:

- fluxo vertical;
- leitura simples;
- sem tentativa de preservar assimetria que prejudique uso.

Evite hero padrão de SaaS com mockup central.

---

# 10. Projetos na Home

Ordem:

1. Sublime Mel
2. enveiro_
3. Palomo Odontologia

Sublime Mel deve ser visualmente dominante.

Desktop:

- Sublime em bloco grande;
- enveiro_ e Palomo podem compartilhar composição secundária.

Mobile:

- todos empilhados.

Use os assets reais disponíveis no repositório.

Se faltarem imagens, use placeholder técnico neutro claramente identificável em desenvolvimento.

Não busque imagens stock para substituir trabalhos reais.

---

# 11. Cases

Implemente:

```text
/pt/projects
/en/projects
/pt/projects/[slug]
/en/projects/[slug]
```

Projetos:

```text
sublime-mel
enveiro
palomo-odontologia
```

Cases devem suportar somente os blocos editoriais realmente necessários.

Não criar page builder genérico.

Uma pequena union de tipos ou renderer simples é suficiente.

---

# 12. Conteúdo ausente

Respeite `CONTENT_REQUIRED`.

Nunca invente:

- estratégia;
- origem de naming;
- métricas;
- depoimentos;
- resultados;
- clientes;
- datas.

Quando a seção depender desses dados, omita-a.

---

# 13. Services

Implemente `/[locale]/services`.

Hierarquia:

1. Identidade Visual
2. Rebranding
3. Websites

Identidade Visual deve receber maior ênfase.

Não adicionar novos serviços.

---

# 14. About

Implemente `/[locale]/about`.

Comunicar:

- boutique independente;
- proximidade;
- condução autoral;
- clareza;
- estratégia.

Não inventar equipe ou números.

A página deve funcionar sem retrato.

---

# 15. Briefing

Implemente `/[locale]/start`.

Use um único fluxo multi-step simples.

Não adotar state machine library.

`useReducer`, React state ou biblioteca de formulário já existente são suficientes.

Etapas:

```text
intro
personal
business
needs
context
planning
contact
review
success
```

---

# 16. Campos condicionais

Implementar somente estas regras:

```text
new-brand → namingStatus
visual-identity → existingLogo
rebranding → rebrandingReasons
website → websiteType
specific-date → specificDate
other → campo complementar correspondente
```

Centralize a lógica em uma função simples.

Não criar engine genérica de formulários condicionais.

---

# 17. Validação

Use a solução definida na arquitetura técnica.

Se Zod já estiver aprovado/instalado, utilize-o.

Caso contrário, adicione somente se realmente reduzir duplicação entre cliente e servidor.

Validação obrigatória no servidor.

Não depender apenas da validação HTML/client-side.

---

# 18. Persistência temporária

Preserve respostas durante a sessão usando a solução simples definida anteriormente, preferencialmente `sessionStorage`.

Não criar banco para drafts.

Ao enviar com sucesso, limpar o draft.

---

# 19. Endpoint

Implemente:

```text
POST /api/briefing
```

Responsabilidades mínimas:

- aceitar somente payload esperado;
- limitar tamanho;
- validar;
- honeypot;
- proteção básica contra abuso compatível com a infraestrutura escolhida;
- normalizar;
- encaminhar/persistir usando a opção realmente configurada;
- resposta segura.

Não criar uma camada backend extensa.

---

# 20. Recebimento dos leads

Siga a decisão da arquitetura técnica.

Se nenhum provedor real estiver configurado no projeto:

- implemente uma interface/server abstraction pequena;
- mantenha a aplicação funcional em desenvolvimento;
- documente claramente a variável de ambiente necessária;
- não invente credenciais.

Não expor secrets ao client.

---

# 21. Estados do envio

Implemente:

```text
idle
submitting
success
error
```

Durante submitting:

- impedir clique duplicado;
- preservar dados.

Erro:

- não apagar respostas;
- permitir tentativa novamente.

Sucesso:

- limpar draft;
- apresentar confirmação;
- permitir voltar aos projetos ou site.

---

# 22. Privacidade

Crie a rota:

```text
/[locale]/privacy
```

Se o texto jurídico definitivo não existir:

- não invente política detalhada;
- use conteúdo de desenvolvimento claramente marcado;
- documente como blocker antes de produção.

O formulário deve exigir consentimento explícito não pré-marcado.

---

# 23. Responsividade

Implemente mobile-first quando isso simplificar o CSS.

Não tente preservar layouts desktop literalmente no celular.

Testar pelo menos:

- mobile pequeno;
- mobile comum;
- tablet;
- laptop;
- desktop amplo.

Use poucos breakpoints e CSS fluido.

---

# 24. Motion

Use apenas:

- hover;
- opacity;
- pequenos translates;
- transições do menu/header.

Não instalar biblioteca de motion salvo necessidade real detectada durante implementação.

Respeitar:

```css
prefers-reduced-motion
```

---

# 25. Header mobile

Menu deve ser acessível.

Implementar:

- botão real;
- `aria-expanded`;
- fechar com Escape;
- focus management suficiente;
- fechar após navegação.

Não criar animação complexa.

---

# 26. SEO

Implemente o essencial:

- metadata por página;
- canonical;
- alternates/hreflang;
- Open Graph;
- sitemap;
- robots.

Cases devem possuir metadata individual.

Não criar sistema avançado de SEO.

---

# 27. Imagens

Use otimização nativa do framework.

Garantir:

- `sizes`;
- dimensões/aspect ratio;
- alt;
- priority apenas quando necessário;
- lazy loading nas galerias.

Evitar layout shift.

---

# 28. Acessibilidade

Garantir:

- HTML semântico;
- `h1` único por página;
- headings coerentes;
- skip link;
- foco visível;
- navegação por teclado;
- labels;
- mensagens de erro acessíveis;
- contraste adequado;
- touch targets confortáveis.

Não perseguir abstrações extras além do necessário para cumprir isso.

---

# 29. Performance

Manter Home e cases predominantemente server/static.

Evitar transformar páginas inteiras em Client Components.

Não adicionar dependências grandes para resolver problemas pequenos.

Meta principal:

site leve e rápido.

---

# 30. Analytics

Crie somente uma pequena abstração caso analytics já esteja definido/configurado.

Não instalar múltiplos trackers.

Nunca enviar PII.

Eventos úteis:

```text
primary_cta_clicked
project_opened
briefing_started
briefing_submitted
briefing_submission_error
language_changed
```

Se não houver provedor definido, não bloquear o MVP por isso.

---

# 31. Testes

Não buscar cobertura elevada.

Adicione testes apenas para partes de risco real:

- lógica condicional do briefing;
- schema/validação;
- envio do formulário quando viável;
- fluxo essencial.

Use a infraestrutura de testes existente.

Se não houver nenhuma, adicione somente o mínimo que a arquitetura técnica já aprovou.

---

# 32. Não implementar

Explicitamente fora do escopo:

- CMS;
- login;
- dashboard;
- painel administrativo;
- banco apenas para conteúdo;
- upload;
- e-commerce;
- pagamentos;
- chat;
- agendamento;
- PWA;
- Redux;
- page builder;
- design system package;
- monorepo;
- microservices;
- GraphQL;
- animações avançadas;
- dezenas de hooks genéricos;
- dezenas de variantes de componentes.

---

# 33. Código

Preferir código óbvio e legível.

Evitar abstrações como:

```text
BaseGenericSectionFactory
DynamicComponentRegistry
UniversalContentRenderer
FormEngine
RepositoryFactory
```

a menos que exista necessidade concreta e repetição suficiente.

Três projetos não justificam infraestrutura de CMS caseira.

---

# 34. Reuso

Criar abstração quando:

- existe repetição real;
- há responsabilidade clara;
- melhora manutenção.

Não criar abstração apenas porque algo poderia ser reutilizado no futuro.

---

# 35. Finalização

Antes de concluir:

1. rode lint;
2. rode typecheck;
3. rode testes existentes/adicionados;
4. rode build;
5. corrija erros;
6. revise rotas;
7. revise responsividade;
8. procure placeholders;
9. procure conteúdo inventado;
10. procure `console.log` e código morto.

---

# 36. Entrega

Ao final da implementação, apresente um resumo curto contendo:

- o que foi implementado;
- principais arquivos/pastas;
- dependências adicionadas;
- comandos de validação executados;
- resultados de lint/typecheck/test/build;
- variáveis de ambiente ainda necessárias;
- blockers reais para produção.

Não crie documentação extensa adicional sem necessidade.

Não faça deploy ainda.

A Fase 10 será responsável pela auditoria final e preparação para produção.