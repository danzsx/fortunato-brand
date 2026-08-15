Considere os seguintes documentos como fontes de verdade:

- `/docs/brand-foundation.md`
- `/docs/information-architecture.md`
- `/docs/design-system.md`
- `/docs/home-wireframe.md`
- `/docs/case-study-architecture.md`
- `/docs/briefing-funnel.md`

Nesta etapa, NÃO implemente ainda a aplicação final.

NÃO construa páginas visuais completas.
NÃO implemente a Home.
NÃO implemente os cases.
NÃO implemente o briefing.
NÃO crie integração real com banco, e-mail ou analytics.
NÃO faça deploy.

Sua tarefa é criar:

`/docs/technical-architecture.md`

O objetivo é definir a arquitetura técnica definitiva da aplicação antes da implementação, reduzindo decisões arbitrárias nas próximas fases.

---

# 1. Objetivos técnicos

A futura aplicação deve ser:

- moderna;
- segura;
- altamente performática;
- responsiva;
- acessível;
- SEO-friendly;
- fácil de manter;
- preparada para PT-BR e inglês;
- compatível com deploy na Vercel;
- compatível, quando viável, com Netlify;
- simples o suficiente para não introduzir complexidade sem necessidade.

Priorizar:

`claridade > abstração`

e:

`necessidade real > tecnologia por moda`

---

# 2. Stack recomendada

Adotar como arquitetura principal:

```text
Next.js
App Router
TypeScript
React
CSS Modules ou CSS global baseado em design tokens
```

Usar uma versão estável e atualmente suportada do Next.js no momento da implementação.

Não fixar uma versão antiga apenas porque aparece em documentação anterior do projeto.

Registrar que, antes da implementação, a versão exata deve ser verificada no ambiente/package registry.

---

# 3. React Server Components

Utilizar Server Components por padrão quando não houver necessidade de interatividade no cliente.

Usar Client Components somente quando necessário, por exemplo:

- menu mobile interativo;
- seletor de idioma quando exigir estado client-side;
- briefing multi-step;
- campos de formulário;
- componentes que dependam de browser APIs;
- interações específicas.

Evitar adicionar `"use client"` em páginas ou árvores inteiras sem necessidade.

Objetivo:

reduzir JavaScript enviado ao navegador.

---

# 4. Styling

Não utilizar biblioteca de componentes visuais genéricos por padrão.

Evitar inicialmente:

- Material UI;
- Chakra UI;
- Ant Design;
- Bootstrap;
- kits de UI SaaS.

A interface possui direção visual própria e deve ser construída sobre o design system documentado.

Arquitetura recomendada:

```text
CSS custom properties
+
CSS Modules
```

ou abordagem equivalente que mantenha:

- escopo previsível;
- tokens centralizados;
- baixo custo de runtime;
- fácil manutenção.

Não adotar CSS-in-JS com runtime sem justificativa técnica forte.

---

# 5. Design tokens

Criar futuramente uma fonte central para tokens.

Estrutura conceitual:

```text
styles/
  tokens.css
  reset.css
  globals.css
```

`tokens.css` deverá conter custom properties para:

- cores;
- tipografia;
- spacing;
- radius;
- motion;
- containers;
- breakpoints quando aplicável conceitualmente.

Não duplicar valores do design system em dezenas de arquivos.

---

# 6. Estrutura de diretórios

Planejar uma estrutura semelhante a:

```text
src/
  app/
    [locale]/
      page.tsx
      projects/
        page.tsx
        [slug]/
          page.tsx
      services/
        page.tsx
      about/
        page.tsx
      start/
        page.tsx

    api/
      briefing/
        route.ts

  components/
    layout/
    navigation/
    home/
    projects/
    services/
    briefing/
    ui/

  content/
    pt-BR/
    en/

  data/
    projects/
    testimonials/

  lib/
    validation/
    analytics/
    i18n/
    forms/
    security/

  styles/

  types/
```

A estrutura final poderá ser levemente ajustada conforme a versão atual do Next.js e a estratégia de i18n escolhida.

Não criar pastas vazias apenas para obedecer ao diagrama.

---

# 7. Internacionalização

Requisito:

- português brasileiro como idioma principal;
- inglês como idioma secundário.

Estratégia de URL recomendada:

```text
/pt
/en
```

ou equivalente consistente.

Preferir locale explícito na URL para:

- SEO;
- compartilhamento;
- previsibilidade;
- geração de metadata;
- canonical/hreflang.

Registrar necessidade de:

```text
hreflang pt-BR
hreflang en
```

e canonical correto por versão.

---

# 8. Biblioteca de i18n

Não escolher biblioteca automaticamente sem avaliar compatibilidade com a versão atual do Next.js.

Na implementação, comparar solução nativa/simples com bibliotecas maduras compatíveis com App Router.

Critérios:

- Server Components;
- static generation;
- TypeScript;
- roteamento por locale;
- carregamento eficiente;
- ausência de bundle client-side desnecessário.

Evitar arquitetura de tradução totalmente client-side.

---

# 9. Conteúdo

Nesta primeira versão, evitar CMS se os únicos conteúdos forem:

- Home;
- três cases;
- serviços;
- About;
- depoimentos.

Preferir conteúdo versionado no repositório.

Possíveis formatos:

```text
TypeScript data modules
```

ou

```text
MDX
```

A decisão deve considerar especialmente os cases.

---

# 10. Estratégia recomendada para os cases

Avaliar MDX como opção preferencial caso facilite composição editorial específica para cada projeto.

Cada case possui estrutura visual potencialmente diferente.

MDX pode permitir:

- narrativa;
- módulos editoriais;
- mídia;
- componentes específicos;
- versionamento no Git.

Entretanto, não adotar MDX se isso aumentar significativamente a complexidade sem ganho real.

Registrar no documento uma comparação objetiva:

```text
MDX
vs
typed content objects
```

e recomendar uma das abordagens.

Critérios:

- type safety;
- flexibilidade editorial;
- simplicidade;
- facilidade de internacionalização;
- manutenção futura.

---

# 11. Assets

Mídias dos projetos devem ficar em estratégia previsível.

Para assets locais:

```text
/public/projects/[slug]/
```

Exemplo conceitual:

```text
/public/projects/sublime-mel/hero.webp
/public/projects/sublime-mel/identity-01.webp
```

Não exigir esses arquivos nesta fase.

---

# 12. Imagens

Utilizar o componente de imagem otimizada do framework quando apropriado.

Requisitos:

- dimensões definidas;
- prevenção de layout shift;
- formatos modernos;
- responsive sizing;
- `sizes` coerente;
- prioridade apenas acima da dobra;
- lazy loading abaixo da dobra.

Não marcar todas as imagens como priority.

---

# 13. Formatos de mídia

Preferência geral para imagens web:

```text
AVIF
WebP
```

quando a cadeia de otimização permitir.

Manter arquivos fonte de produção fora do bundle público quando desnecessários.

Não servir PSD, AI ou TIFF diretamente.

---

# 14. SVG

SVG permitido para:

- logotipos;
- ícones próprios;
- elementos gráficos vetoriais.

Requisitos:

- otimização;
- acessibilidade adequada;
- não inserir SVG arbitrário recebido do usuário diretamente no DOM;
- sanitização se no futuro houver conteúdo externo.

---

# 15. Fontes

Evitar dependência desnecessária de requests externos durante renderização.

Preferir:

- fonte local licenciada corretamente;

ou:

- mecanismo otimizado do Next.js para fontes suportadas.

Fallback inicial:

```text
Inter
system-ui
sans-serif
```

A arquitetura deve permitir substituir a tipografia posteriormente.

---

# 16. Formulário `/start`

O briefing deverá ser um Client Component apenas na parte que realmente exige estado interativo.

A página poderá continuar usando Server Component para estrutura e metadata.

Separar:

```text
route/page shell
```

de:

```text
BriefingFlow client component
```

---

# 17. Gerenciamento de estado do briefing

Não introduzir Redux.

O estado do formulário é local e previsível.

Preferir:

- React state;
- reducer;
- biblioteca leve de formulário somente se houver benefício claro.

Avaliar na implementação:

```text
React Hook Form
```

com schema validation.

Não adicionar uma biblioteca apenas porque é popular.

---

# 18. Validação

Definir validação compartilhada entre cliente e servidor.

Recomendação:

```text
Zod
```

ou biblioteca equivalente madura e pequena.

O mesmo schema conceitual deve orientar:

- validação client-side;
- validação server-side;
- tipos derivados quando possível.

Nunca confiar somente no browser.

---

# 19. API do briefing

Criar futuramente uma rota server-side:

```text
POST /api/briefing
```

ou mecanismo equivalente do framework.

A requisição deve:

1. verificar método;
2. limitar tamanho;
3. validar schema;
4. verificar anti-spam;
5. normalizar campos necessários;
6. persistir ou encaminhar o lead;
7. retornar resposta sanitizada.

Não implementar ainda.

---

# 20. Contrato conceitual da API

Entrada:

```ts
BriefingDraft
```

Resposta de sucesso:

```ts
type BriefingSuccessResponse = {
  success: true
  submissionId: string
}
```

Erro de validação:

```ts
type BriefingValidationResponse = {
  success: false
  code: "VALIDATION_ERROR"
  fieldErrors?: Record<string, string>
}
```

Erro genérico:

```ts
type BriefingErrorResponse = {
  success: false
  code: "SUBMISSION_ERROR"
}
```

Não retornar stack traces ao cliente.

---

# 21. Persistência do briefing

Nesta arquitetura, NÃO presumir banco de dados próprio como obrigatório.

O volume inicial esperado é baixo.

Documentar três possibilidades:

```text
A. envio por e-mail
B. armazenamento estruturado
C. ambos
```

Recomendar uma estratégia inicial simples e segura.

A recomendação deve considerar:

- custo;
- confiabilidade;
- backup;
- privacidade;
- facilidade de consulta;
- risco de perda de leads.

---

# 22. E-mail

Se e-mail for usado, preferir provedor transacional dedicado.

Não depender de SMTP pessoal ou Gmail comum em produção.

Arquitetura deve permitir integração futura via variável de ambiente.

Nunca expor API keys no frontend.

---

# 23. Possível banco de dados

Se for necessário persistir leads, preferir serviço gerenciado compatível com ambiente serverless.

Não escolher banco apenas para demonstrar sofisticação.

Caso a aplicação utilize banco futuramente, armazenar somente dados necessários ao fluxo comercial.

Não armazenar dados sensíveis desnecessários.

---

# 24. Anti-spam

Definir defesa em múltiplas camadas:

```text
honeypot
+
rate limiting
+
server-side validation
+
payload limits
```

Considerar CAPTCHA somente se abuso real justificar.

Evitar CAPTCHA visual inicialmente.

---

# 25. Rate limiting

A arquitetura deve prever rate limiting do endpoint de briefing.

Critério de identificação pode envolver:

- IP de maneira temporária;
- mecanismo oferecido pelo host;
- storage efêmero/distribuído adequado ao ambiente serverless.

Não criar rate limiting em memória local do processo como única defesa em produção serverless.

---

# 26. Segurança HTTP

Planejar headers de segurança apropriados.

Considerar:

- Content-Security-Policy;
- Referrer-Policy;
- X-Content-Type-Options;
- Permissions-Policy;
- frame protection via CSP;
- HSTS quando HTTPS em produção estiver consolidado.

A política definitiva deve ser compatível com analytics e serviços externos realmente utilizados.

Não criar CSP permissiva com `*` sem necessidade.

---

# 27. Content Security Policy

Planejar CSP com princípio de menor privilégio.

Evitar:

```text
unsafe-eval
```

Não adicionar:

```text
unsafe-inline
```

sem avaliar necessidade real do framework e implementação.

Documentar que a CSP deverá ser testada em produção/pre-production.

---

# 28. Environment variables

Separar claramente:

```text
server-only secrets
```

de:

```text
public environment variables
```

Nunca prefixar segredo com variável destinada ao browser.

Exemplos futuros:

```text
BRIEFING_PROVIDER_API_KEY
ANALYTICS_ID
SITE_URL
```

Somente variáveis explicitamente públicas podem chegar ao client bundle.

---

# 29. Analytics

Não instalar analytics invasivo por padrão.

Avaliar soluções privacy-friendly.

Objetivos mínimos:

- page views;
- CTA clicks;
- início do briefing;
- conclusão por etapa;
- submissão;
- erros técnicos.

Não enviar PII.

Não enviar:

- nome;
- telefone;
- e-mail;
- respostas abertas;
- nome da empresa;

como propriedades analíticas.

---

# 30. Consentimento de analytics

Distinguir:

- analytics estritamente necessário;
- analytics opcional/cookies.

Arquitetura deve estar preparada para consentimento caso a solução selecionada exija cookies não essenciais.

Não exibir banner de cookies sem necessidade técnica/legal real.

---

# 31. LGPD

Registrar requisitos gerais:

- finalidade clara;
- minimização;
- consentimento quando aplicável;
- política de privacidade;
- proteção dos dados;
- retenção limitada;
- capacidade futura de exclusão quando necessária.

Não tratar o documento técnico como parecer jurídico.

---

# 32. SEO

Cada página indexável deve permitir metadata própria.

Requisitos:

```text
title
description
canonical
Open Graph
Twitter/X metadata quando aplicável
robots
alternates/hreflang
```

Cases devem possuir metadata individual.

---

# 33. Structured data

Avaliar JSON-LD para:

```text
Organization
ProfessionalService
WebSite
BreadcrumbList
```

e possivelmente conteúdo de projetos quando houver schema apropriado.

Não usar structured data incorreta apenas para tentar melhorar ranking.

---

# 34. Sitemap

Gerar sitemap automaticamente.

Incluir apenas páginas indexáveis.

Considerar versões PT e EN.

---

# 35. robots.txt

Gerar via framework ou arquivo apropriado.

Ambientes de preview/staging devem evitar indexação quando possível.

Produção deve permitir indexação das páginas públicas.

---

# 36. Slugs

Slugs devem ser:

- estáveis;
- minúsculos;
- legíveis;
- sem caracteres especiais desnecessários.

Projetos iniciais:

```text
sublime-mel
enveiro
palomo-odontologia
```

Não traduzir slugs obrigatoriamente entre idiomas se isso gerar complexidade desnecessária.

Documentar a estratégia escolhida.

---

# 37. Performance budget

Definir metas técnicas.

Objetivos para páginas principais em dispositivos reais razoáveis:

```text
LCP < 2.5s
INP < 200ms
CLS < 0.1
```

Tratar como objetivos de Core Web Vitals, não garantias universais.

---

# 38. JavaScript budget

Minimizar JavaScript client-side.

Regras:

- Server Components por padrão;
- evitar bibliotecas enormes de animação;
- evitar dependências utilitárias gigantes;
- importar apenas o necessário;
- lazy-load de código realmente pesado quando houver.

---

# 39. Motion library

Não instalar Framer Motion ou equivalente automaticamente.

Para microinterações simples, preferir CSS.

Adicionar biblioteca de motion somente se existir interação documentada que realmente se beneficie dela.

O site não depende de animações complexas.

---

# 40. Third-party scripts

Todo script externo deve justificar:

- função;
- custo de performance;
- privacidade;
- segurança.

Evitar:

- múltiplos trackers;
- chat widgets pesados;
- scripts de marketing sem necessidade;
- fontes carregadas de múltiplos provedores.

---

# 41. Accessibility architecture

Manter HTML semântico desde a implementação.

Elementos esperados:

```text
header
nav
main
section
article
footer
```

Cases podem ser tratados semanticamente como conteúdo editorial.

Não criar interface baseada inteiramente em `div`.

---

# 42. Focus management

No briefing multi-step:

ao avançar de etapa, foco deve ir para:

- heading da nova etapa;

ou:

- primeiro campo apropriado;

de maneira previsível.

Menu mobile deve possuir gerenciamento de foco adequado.

---

# 43. Skip link

Incluir futuramente:

`Pular para o conteúdo`

como skip link acessível.

Pode permanecer invisível até receber foco.

---

# 44. Error boundary

Planejar tratamento de erros para partes relevantes da aplicação.

Não mostrar erros técnicos ao visitante.

Páginas críticas devem ter fallback claro.

---

# 45. Not Found

Criar posteriormente página 404 consistente com a identidade.

Deve oferecer:

- retorno à Home;
- projetos;
- eventualmente CTA.

Não precisa ser uma experiência extravagante.

---

# 46. Loading states

Evitar loaders globais.

Utilizar loading states somente quando houver ação assíncrona real.

Submissão do briefing deve ter estado específico.

Navegação comum não deve introduzir loaders artificiais.

---

# 47. Deployment

Plataforma preferencial:

`Vercel`

Motivos a documentar:

- integração natural com Next.js;
- previews;
- serverless;
- edge/network quando aplicável;
- gerenciamento simples de environment variables.

A arquitetura deve evitar dependência desnecessária de recursos proprietários quando uma solução portátil for simples.

---

# 48. Netlify

Manter compatibilidade razoável com Netlify quando possível.

Entretanto:

não sacrificar arquitetura correta do Next.js apenas para equivalência total entre hosts.

Se algum recurso futuro for específico da Vercel, documentar explicitamente.

---

# 49. Preview environments

Cada pull request poderá futuramente gerar preview.

Requisitos:

- não usar dados de produção desnecessariamente;
- previews não devem ser indexados;
- secrets apropriados por ambiente;
- integrações de formulário podem usar sandbox/test mode quando disponível.

---

# 50. CI

Planejar pipeline mínimo.

Em pull requests:

```text
install
typecheck
lint
test
build
```

A execução exata dependerá do package manager.

Nenhum merge deve depender apenas de "funciona na minha máquina".

---

# 51. Package manager

Selecionar um único package manager.

Preferência conceitual:

```text
pnpm
```

caso compatível com o ambiente existente.

Se o projeto já utilizar outro package manager de forma estabelecida, não migrar sem motivo.

Nunca manter múltiplos lockfiles.

---

# 52. Lint

Usar configuração compatível com Next.js e TypeScript.

Evitar centenas de regras stylistic que conflitem com formatter.

Lint deve focar:

- bugs;
- acessibilidade quando disponível;
- práticas problemáticas;
- qualidade.

---

# 53. Formatter

Utilizar formatter consistente.

Preferência:

```text
Prettier
```

ou solução já estabelecida no repositório.

Não discutir estilo manualmente em cada arquivo.

---

# 54. Testing strategy

Não buscar cobertura artificial de 100%.

Planejar três níveis.

## Unit

Para:

- schemas;
- helpers;
- lógica condicional do briefing;
- normalização.

## Component

Para componentes interativos críticos.

## End-to-end

Fluxos essenciais:

```text
abrir home
→ começar projeto
→ preencher briefing
→ revisar
→ enviar
```

e:

```text
troca de idioma
```

---

# 55. Ferramentas de teste

Avaliar:

```text
Vitest
React Testing Library
Playwright
```

ou equivalentes atuais compatíveis.

Não instalar nesta fase.

---

# 56. Briefing tests

A lógica condicional deverá possuir testes específicos.

Exemplos:

```text
new-brand → namingStatus aparece
website → websiteType aparece
specific-date → specificDate aparece
```

Campos ocultos não podem causar erro de validação.

---

# 57. Type safety

Evitar:

```ts
any
```

sem justificativa.

Modelos de conteúdo, projetos, formulários e API devem ter contratos explícitos.

Quando possível, derivar tipos de schemas para reduzir duplicação.

---

# 58. Error logging

Se monitoramento for adicionado futuramente, não registrar PII desnecessária.

Erros do briefing não devem incluir automaticamente o payload completo.

---

# 59. Observability

Para lançamento inicial, observabilidade pode ser simples.

Monitorar:

- erros de runtime;
- falhas de submissão;
- disponibilidade;
- performance básica.

Evitar stack complexa de observabilidade para um portfólio pequeno.

---

# 60. Cache

Conteúdo institucional e cases mudam pouco.

Preferir geração estática/cache agressivo quando apropriado.

Não buscar dados em runtime para conteúdo que poderia ser estático.

O briefing, por outro lado, é dinâmico.

Separar claramente os dois modelos.

---

# 61. Rendering strategy

Recomendação geral:

## Home

Static/SSG.

## Projects index

Static/SSG.

## Project pages

Static/SSG.

## Services

Static/SSG.

## About

Static/SSG.

## Start

estrutura estática + interatividade client-side.

## Briefing endpoint

dinâmico server-side.

Não tornar toda a aplicação dinâmica por causa de um único formulário.

---

# 62. Project generation

Os cases devem permitir geração estática por slug.

Prever validação de slug.

Slug inexistente:

`notFound()`

ou mecanismo equivalente atual do framework.

---

# 63. Metadata generation

Projetos devem gerar metadata a partir de seus dados.

Evitar hardcode de metadata dentro de cada componente visual.

---

# 64. Open Graph images

Planejar imagens OG específicas.

Prioridade:

- Home;
- cada projeto.

Podem inicialmente usar imagens estáticas produzidas para isso.

Não exigir geração dinâmica de OG image se não houver benefício real.

---

# 65. Content source of truth

Definir claramente onde cada tipo de conteúdo vive.

Exemplo:

```text
content/
  shared
  pt-BR
  en

data/projects/
```

Não permitir que a mesma copy exista simultaneamente em vários componentes diferentes.

---

# 66. Dados incompletos

Conteúdo marcado nos documentos anteriores como:

`CONTENT_REQUIRED`

não deve ser transformado em texto fictício durante implementação.

Arquitetura precisa permitir:

- ausência;
- campos opcionais;
- omissão de seção.

---

# 67. Sanitização

Se todo conteúdo editorial estiver versionado no Git e controlado pelo desenvolvedor, não adicionar sanitização de HTML desnecessária.

Se MDX for utilizado, limitar componentes e conteúdo a arquivos confiáveis do repositório.

Conteúdo vindo do briefing é sempre não confiável e deve ser tratado como texto/dados.

---

# 68. Uploads

Uploads NÃO fazem parte do MVP do briefing.

Não implementar upload de:

- logo;
- PDF;
- imagens;
- referências.

Nesta primeira versão, referências podem ser fornecidas por texto/URL.

Isso reduz:

- superfície de ataque;
- storage;
- complexidade;
- problemas de privacidade.

---

# 69. E-commerce

E-commerce não faz parte do escopo técnico inicial.

Se alguém solicitar e-commerce no briefing, o lead pode ser analisado manualmente.

Não instalar arquitetura de comércio eletrônico.

---

# 70. Autenticação

A aplicação pública não precisa de autenticação.

Não implementar:

- login;
- conta de cliente;
- dashboard;
- painel administrativo;

no MVP.

---

# 71. CMS

Não implementar CMS no MVP, salvo se análise do conteúdo demonstrar necessidade real.

Com apenas três cases iniciais, Git-based content é preferível.

Registrar que migração futura para CMS deve ser possível sem redesenhar toda a camada de apresentação.

---

# 72. Dependency policy

Para toda nova dependência futura, avaliar:

- manutenção;
- tamanho;
- necessidade;
- segurança;
- compatibilidade;
- frequência de updates.

Preferir plataforma nativa, APIs do browser e recursos do framework quando suficientes.

---

# 73. Progressive enhancement

A Home e os cases devem continuar legíveis sem JavaScript client-side significativo.

Interações essenciais do briefing dependem de JavaScript, mas conteúdo institucional não deve depender dele.

---

# 74. Browser support

Suportar navegadores modernos amplamente utilizados.

Não adicionar polyfills para navegadores obsoletos sem necessidade comercial comprovada.

---

# 75. Reduced motion

Todas as animações não essenciais devem respeitar:

```css
prefers-reduced-motion: reduce
```

A ausência de animação não pode quebrar layout ou narrativa.

---

# 76. Print

Não é necessário criar stylesheet específico de impressão para o MVP.

---

# 77. Favicon e metadata assets

Planejar:

- favicon;
- SVG icon quando possível;
- apple touch icon;
- manifest somente se houver utilidade real.

Não transformar o site em PWA sem requisito.

---

# 78. PWA

Não implementar:

- service worker customizado;
- offline mode;
- instalação PWA;
- push notifications.

Não há necessidade para este produto.

---

# 79. Privacy page

Prever rota futura:

```text
/[locale]/privacy
```

A página será necessária antes do lançamento do briefing em produção.

Conteúdo jurídico definitivo não deve ser inventado pelo Codex.

---

# 80. Production checklist conceitual

Registrar itens futuros:

```text
environment variables
privacy policy
analytics validation
form endpoint
anti-spam
rate limiting
security headers
SEO metadata
sitemap
robots
404
accessibility
responsive QA
Core Web Vitals
production domain
SSL
```

Essa checklist será detalhada na Fase 10.

---

# 81. Decisões que devem ser congeladas nesta fase

O documento deve concluir explicitamente com uma seção:

`Architecture Decisions`

contendo decisões recomendadas para:

- framework;
- rendering model;
- styling;
- i18n;
- content strategy;
- briefing state;
- validation;
- API architecture;
- lead persistence;
- analytics;
- hosting;
- testing;
- dependency philosophy.

Para cada uma, registrar:

```text
Decision
Reason
Tradeoff
```

---

# 82. Decisões ainda abertas

Criar uma seção:

`Open Decisions Before Implementation`

Listar apenas itens que realmente dependem de informação ainda indisponível.

Evitar deixar decisões abertas que já possam ser resolvidas tecnicamente agora.

---

# Resultado esperado

Criar somente:

`/docs/technical-architecture.md`

O documento deve consolidar:

- stack;
- estrutura de diretórios;
- Server/Client Components;
- styling;
- i18n;
- conteúdo;
- cases;
- mídia;
- formulário;
- API;
- validação;
- segurança;
- LGPD;
- analytics;
- SEO;
- performance;
- accessibility;
- rendering;
- caching;
- deploy;
- CI;
- testes;
- decisões arquiteturais;
- decisões ainda abertas.

Não implementar frontend.
Não implementar backend.
Não instalar dependências.
Não configurar serviços externos.
Não fazer deploy.
Não alterar a aplicação existente.