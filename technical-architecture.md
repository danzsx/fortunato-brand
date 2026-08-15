# Arquitetura Técnica — Fortunato Brands

## 1. Propósito e princípios

Este documento define a arquitetura da futura aplicação pública da Fortunato Brands. Ele consolida as decisões técnicas necessárias antes da implementação, sem criar interface, backend, integrações ou deploy.

Os princípios que orientam todas as escolhas são:

- clareza antes de abstração;
- necessidade real antes de tecnologia por moda;
- HTML e conteúdo úteis antes de JavaScript;
- conteúdo editorial versionado antes de um CMS;
- privacidade, acessibilidade e performance como requisitos de base;
- compatibilidade com Vercel sem acoplamento proprietário desnecessário.

A aplicação será um site institucional bilíngue, com páginas de portfólio e um briefing progressivo. Não haverá autenticação, e-commerce, uploads, painel administrativo, PWA ou CMS no MVP.

## 2. Stack e versão

### Stack principal

```text
Next.js (versão estável e suportada no momento da implementação)
App Router
React
TypeScript com modo strict
CSS custom properties + CSS Modules
```

Antes de criar o projeto, a versão exata do Next.js e suas dependências pares deve ser conferida no ambiente e no package registry. Não se deve fixar uma versão antiga baseada em documentação histórica.

O package manager preferencial é `pnpm`. Se já existir um projeto estabelecido com outro gerenciador e um único lockfile, ele deve ser preservado; não haverá migração só por preferência. O repositório deverá manter somente um lockfile.

Não serão adotadas bibliotecas genéricas de interface (Material UI, Chakra, Ant Design, Bootstrap ou kits SaaS) nem CSS-in-JS com runtime. A identidade deve ser construída a partir do design system próprio, com custo baixo de runtime e tokens centralizados.

## 3. Modelo de rendering e componentes

Server Components são o padrão. Páginas, layout, metadata, conteúdo institucional, listas e cases devem renderizar no servidor/na geração estática sempre que não houver interação local.

Client Components serão isolados nos menores limites possíveis:

- `MobileMenu`, para abertura, fechamento e foco do menu;
- seletor de idioma, apenas se a interação escolhida exigir estado no cliente;
- `BriefingFlow`, seus campos, revisão, persistência temporária e submissão;
- componentes que realmente usem APIs do browser.

Não se deve colocar `"use client"` em páginas, layouts ou árvores inteiras por conveniência. Essa separação reduz o JavaScript enviado e mantém Home e cases legíveis sem JavaScript significativo.

### Estratégia por rota

| Rota | Rendering | Cache |
| --- | --- | --- |
| `/[locale]` | estático/SSG | estático, revalidação apenas quando houver conteúdo novo |
| `/[locale]/projects` | estático/SSG | estático |
| `/[locale]/projects/[slug]` | estático/SSG por slug | estático |
| `/[locale]/services` | estático/SSG | estático |
| `/[locale]/about` | estático/SSG | estático |
| `/[locale]/start` | shell estático + ilha interativa | shell estático; fluxo no cliente |
| `/api/briefing` | dinâmico server-side | sem cache |

Os cases devem expor seus slugs estáveis para geração estática e a rota deve validar cada slug. Um slug inexistente deve usar `notFound()` (ou o mecanismo equivalente da versão adotada). Não tornar toda a aplicação dinâmica por causa do formulário.

## 4. Estrutura de diretórios proposta

Pastas só devem ser criadas quando receberem arquivos. A estrutura inicial esperada é:

```text
src/
  app/
    [locale]/
      layout.tsx
      page.tsx
      projects/
        page.tsx
        [slug]/
          page.tsx
      services/page.tsx
      about/page.tsx
      start/page.tsx
      privacy/page.tsx
    api/briefing/route.ts
    sitemap.ts
    robots.ts
    not-found.tsx
    error.tsx

  components/
    layout/
    navigation/
    projects/
    services/
    briefing/
    ui/

  content/
    shared/
    pt-BR/
    en/
  data/
    projects/
    testimonials/
  lib/
    i18n/
    validation/
    forms/
    security/
    analytics/
  styles/
    tokens.css
    reset.css
    globals.css
  types/
```

`components/home/` poderá existir quando a Home for implementada; ela não é antecipada sem necessidade. A mesma regra vale para diretórios que possam surgir por particularidades da versão atual do Next.js.

## 5. Styling, tokens e fontes

`styles/tokens.css` será a única fonte de custom properties para `color.*`, `space.*`, `type.*`, `radius.*`, `motion.*`, `container.*` e, quando útil, `breakpoint.*`. `reset.css` normaliza a base e `globals.css` aplica regras globais mínimas. Componentes usam CSS Modules e consomem tokens sem repetir valores em arquivos locais.

Os tokens iniciais devem refletir o design system: fundos `#F5F5F2` e `#ECECE7`, texto `#111111` e `#62625E`, borda `#D8D8D2`, acento `#1F3FFF`, escala de espaço baseada em 4 px, raios de 4/8/16 px, container máximo de 1440 px e motion de 180/300/500 ms. São tokens semânticos e poderão ser ajustados sem refatorar componentes.

Tipografia inicial: `Inter, system-ui, sans-serif`. A implementação deve preferir fonte local com licença adequada ou o mecanismo otimizado do Next.js para fontes suportadas; requests externos de fonte durante renderização devem ser evitados. A família deve permanecer substituível, e a escala deve usar `clamp()` conforme o design system.

Microinterações simples usam CSS. Não instalar biblioteca de motion sem uma interação documentada que justifique seu tamanho e complexidade. Toda animação não essencial deve respeitar `prefers-reduced-motion: reduce`.

## 6. Internacionalização

Português brasileiro é o idioma principal; inglês é o secundário. As URLs terão locale explícito:

```text
/pt
/en
```

Internamente, o locale de conteúdo será `pt-BR` para `/pt` e `en` para `/en`. A camada `lib/i18n` centralizará esse mapeamento, validação de locale, caminhos localizados e geração de alternates. A navegação e a metadata nunca devem depender de detectar idioma só no browser.

Antes de implementar, será comparada a capacidade nativa do App Router com uma biblioteca madura compatível com a versão atual do Next.js. A escolha só será aceita se suportar Server Components, geração estática, TypeScript, roteamento por locale e carregamento sem bundle client-side desnecessário. A recomendação inicial é começar com módulos de mensagens TypeScript/JSON carregados no servidor e introduzir uma biblioteca apenas se a complexidade de formatação, rotas ou mensagens justificar.

Cada página indexável terá canonical próprio e alternates `hreflang="pt-BR"` e `hreflang="en"` — com `x-default` apontando para a versão PT, se essa convenção for mantida no lançamento. Copy em inglês é adaptação editorial, não tradução literal. Valores internos de enums do briefing permanecem independentes de idioma.

Slugs de projeto não serão traduzidos: `sublime-mel`, `enveiro` e `palomo-odontologia` permanecem iguais em ambos os idiomas. Isso preserva links, simplifica geração estática e não reduz a compreensão.

## 7. Conteúdo e cases

O conteúdo do MVP ficará versionado no Git. A fonte de verdade de copy institucional e traduções será `content/shared`, `content/pt-BR` e `content/en`; dados estruturados de projetos e depoimentos ficarão em `data/`. Componentes não devem duplicar copy nem metadata.

### Decisão: objetos de conteúdo tipados

Os cases usarão **objetos de conteúdo TypeScript tipados**, e não MDX, no MVP.

| Critério | MDX | Objetos tipados | Decisão |
| --- | --- | --- | --- |
| Type safety | requer validação adicional de frontmatter e componentes | contratos e tipos verificáveis no build | objetos tipados |
| Flexibilidade editorial | alta para texto livre | alta via blocos editoriais discriminados | suficiente para três cases |
| Simplicidade | adiciona pipeline, parsing e regras de componentes | usa ferramentas já presentes | objetos tipados |
| i18n | duplica arquivos/estrutura MDX por idioma | mesma estrutura por locale | objetos tipados |
| Manutenção futura | boa para autores técnicos | boa enquanto conteúdo é mantido no repositório | objetos tipados |

Os blocos devem seguir o contrato editorial já definido: introdução, hero, contexto, desafio, estratégia, naming/conceito, seções de identidade e aplicações, resultado, depoimento e próximo projeto. Tipos explícitos devem representar mídia, blocos ricos, seções editoriais, métricas e depoimentos. Campos opcionais ficam ausentes; uma seção `CONTENT_REQUIRED` é omitida, nunca preenchida com texto inventado.

MDX pode ser reavaliado se os cases passarem a exigir longform substancialmente livre ou autoria editorial por pessoas que precisem editar marcação diretamente. Essa migração deve permanecer localizada na camada de conteúdo, sem redesenhar componentes de apresentação.

Os projetos iniciais mantêm a ordem e encadeamento definidos: Sublime Mel → enveiro → Palomo Odontologia → Sublime Mel.

## 8. Assets e mídia

Assets locais devem usar caminhos previsíveis, por exemplo:

```text
public/projects/sublime-mel/hero.webp
public/projects/sublime-mel/identity-01.webp
```

Arquivos de produção (PSD, AI, TIFF) ficam fora de `public` e do bundle. A preferência é AVIF ou WebP quando a cadeia de otimização permitir. SVG é apropriado para logotipos, ícones próprios e gráficos vetoriais; SVG externo ou recebido de usuários nunca será inserido diretamente no DOM sem sanitização.

Usar o componente otimizado de imagem do framework quando apropriado. Cada imagem terá dimensões ou proporção definida, `sizes` coerente, alt útil quando transmitir informação e tratamento decorativo quando não transmitir. Somente mídia realmente acima da dobra recebe prioridade; o restante usa lazy loading. Vídeos futuros não devem iniciar com áudio e respeitam reduced motion.

## 9. Briefing, estado e validação

`/[locale]/start/page.tsx` permanece Server Component para estrutura, metadata e conteúdo estático. `BriefingFlow` é uma ilha Client Component responsável por estado, navegação entre etapas, revisão, foco e submissão.

O fluxo usa estado React local com `useReducer`, porque o rascunho é previsível e limitado ao formulário. Redux não será adotado. React Hook Form poderá ser avaliado para registrar campos e reduzir trabalho repetitivo, mas só entra se simplificar de fato a implementação; não é pré-requisito desta arquitetura.

O schema canônico será implementado em `lib/validation/briefing.ts` com Zod (ou equivalente maduro e pequeno). Ele deve validar servidor e cliente, derivar tipos quando possível e conter as regras condicionais do documento de briefing:

- campos ocultos não são obrigatórios;
- ao alterar uma resposta condicional, valores derivados irrelevantes são removidos antes de enviar (podem existir apenas no rascunho temporário);
- nome do negócio é opcional quando `hasName` for falso;
- tamanho de textos, URLs e payload é limitado;
- dados vindos do browser são sempre não confiáveis.

O rascunho pode ser preservado temporariamente por sessão, se validado como necessário na implementação. Deve ter duração limitada, nunca ser enviado a analytics e ser apagado após sucesso; persistência durável não é requisito.

Ao trocar de etapa, o foco vai para o heading da etapa ou primeiro campo pertinente. Erros devem ser associáveis aos campos e anunciáveis. Em envio, prevenir duplicidade, preservar respostas em falha e não expor detalhes técnicos.

## 10. API e entrega do lead

A rota futura será `POST /api/briefing`. O handler deve, nesta ordem:

1. aceitar somente POST;
2. rejeitar body acima do limite definido;
3. verificar honeypot e rate limit;
4. fazer parse e validação server-side do schema;
5. normalizar apenas os campos necessários (por exemplo, trim, e-mail e URLs);
6. enviar/persistir o lead;
7. retornar resposta sanitizada, sem stack trace.

Contrato público conceitual:

```ts
type BriefingSuccessResponse = {
  success: true
  submissionId: string
}

type BriefingValidationResponse = {
  success: false
  code: "VALIDATION_ERROR"
  fieldErrors?: Record<string, string>
}

type BriefingErrorResponse = {
  success: false
  code: "SUBMISSION_ERROR"
}
```

O `submissionId` não deve codificar e-mail, telefone ou informação de negócio. Logs de erro não podem registrar automaticamente o payload completo.

### Persistência inicial recomendada

| Opção | Vantagem | Risco/limite |
| --- | --- | --- |
| A. E-mail transacional | baixo custo e leitura imediata | risco de perda/ruído se for a única cópia |
| B. Armazenamento estruturado gerenciado | consulta, retenção e backup mais claros | introduz fornecedor e operação |
| C. Ambos | alerta imediato + registro consultável | maior custo e duas integrações |

A recomendação para lançamento é **C, ambos**, com provedor de e-mail transacional e armazenamento gerenciado serverless. O registro estruturado é a cópia de referência para evitar perda de leads; o e-mail é notificação operacional. Se o prazo impedir as duas integrações, B é preferível a A isolado. O banco não deve guardar dados além do necessário para qualificação, contato, retenção e exclusão futura.

Integrações usam adaptadores server-side configurados por variáveis de ambiente. Nunca usar SMTP pessoal/Gmail comum em produção nem expor chaves no bundle público. Uploads não existem no MVP; referências são texto ou URL.

## 11. Segurança, privacidade e LGPD

O endpoint terá defesas em camadas: honeypot não anunciado, limite de payload, schema server-side, normalização, rate limiting distribuído/fornecido pelo host e, apenas se houver abuso comprovado, CAPTCHA. Rate limit em memória local não é defesa suficiente em ambiente serverless.

Headers de segurança serão definidos no nível suportado pelo framework/host e revisados antes do lançamento:

- Content-Security-Policy de menor privilégio;
- `Referrer-Policy`;
- `X-Content-Type-Options: nosniff`;
- `Permissions-Policy` restritiva;
- proteção de frame via `frame-ancestors` na CSP;
- HSTS somente em produção HTTPS consolidada.

A CSP não usará `unsafe-eval`, curingas permissivos ou `unsafe-inline` sem uma necessidade comprovada e testada. Ela deve ser validada em preview/preprodução com os scripts realmente aprovados, como analytics. O conteúdo editorial do Git é confiável; respostas do briefing são texto/dados não confiáveis, nunca HTML renderizado.

Variáveis server-side, como `BRIEFING_PROVIDER_API_KEY`, não podem usar prefixo público. Apenas valores deliberadamente públicos, como um `ANALYTICS_ID` quando aplicável, podem chegar ao cliente. `SITE_URL` deve ser definido por ambiente.

O briefing exige consentimento de privacidade desmarcado por padrão. Antes da produção, a rota `/[locale]/privacy` deve conter política aprovada pelo responsável jurídico/negócio; este documento não é parecer jurídico. A implementação observará finalidade clara, minimização, proteção, retenção limitada e capacidade de localizar/excluir dados quando necessário.

## 12. Analytics e observabilidade

Analytics não será instalado por padrão. A solução futura deve ser privacy-friendly e só será adicionada após avaliar cookies, consentimento, custo e impacto de performance. A medição mínima é page views, cliques de CTA, início/avanço/retorno/validação/submissão/falha do briefing e erros técnicos.

Os eventos do funil são: `briefing_started`, `briefing_step_completed`, `briefing_back`, `briefing_validation_error`, `briefing_submitted` e `briefing_submission_error`. Nunca incluir nome, e-mail, telefone, empresa, URLs fornecidas pelo usuário ou respostas abertas como propriedades. Banner de cookies só é necessário se a solução selecionada usar cookies não essenciais ou a avaliação legal exigir.

No lançamento, observabilidade deve ser simples: erros de runtime, falhas de submissão, disponibilidade e métricas básicas de performance. Qualquer monitoramento futuro deve filtrar PII e não transformar um portfólio pequeno em uma pilha operacional complexa.

## 13. SEO e metadata

Cada página indexável terá metadata própria: `title`, descrição, canonical, Open Graph, Twitter/X quando aplicável, robots e alternates/hreflang. Metadata de projetos é gerada a partir dos dados, nunca hardcoded no componente visual. Imagens OG estáticas específicas são suficientes inicialmente para Home e cada case; geração dinâmica só deve ser criada se trouxer benefício concreto.

`sitemap.ts` inclui somente rotas públicas indexáveis nas versões PT e EN. `robots.ts` permite a indexação de produção e bloqueia previews/staging quando a plataforma permitir, sem depender apenas de boa vontade de crawlers.

JSON-LD será avaliado na implementação para `Organization`, `ProfessionalService`, `WebSite` e `BreadcrumbList`. Apenas schema que represente fatos verificáveis será publicado; dados estruturados não devem simular avaliações, resultados ou informação de projeto inexistente.

## 14. Performance e acessibilidade

Metas de Core Web Vitals para páginas principais em dispositivos reais razoáveis:

```text
LCP < 2,5 s
INP < 200 ms
CLS < 0,1
```

São objetivos, não garantias universais. Para atendê-los: SSG para conteúdo estável, imagens com dimensões/sizes, prioridade apenas no hero, fontes otimizadas, Server Components por padrão, imports seletivos e lazy-load apenas para código realmente pesado. Scripts de terceiros precisam justificar função, custo, segurança e privacidade.

A base semântica usa `header`, `nav`, `main`, `section`, `article` e `footer`, com hierarchy de headings correta. A meta mínima é WCAG AA: contraste adequado, foco visível, teclado completo, alvos de toque de cerca de 44 px, skip link “Pular para o conteúdo”, conteúdo essencial sem hover e suporte a reduced motion. Menu móvel deve reter/restaurar foco de forma previsível. Error boundaries e 404 devem oferecer fallback humano e navegação de retorno sem revelar detalhes técnicos. Loaders só existem para trabalho assíncrono real, especialmente o envio do briefing.

## 15. Deploy, previews e CI

A plataforma preferencial é Vercel pela integração com Next.js, previews por pull request, suporte serverless e gestão simples de variáveis. A arquitetura permanece razoavelmente compatível com Netlify por usar App Router, rendering estático e handlers HTTP convencionais; não se deve sacrificar uma solução correta apenas para paridade perfeita. Qualquer recurso futuro específico da Vercel deve ser documentado junto dele.

Previews por PR usam variáveis próprias, não devem ser indexados nem apontar para dados de produção sem necessidade. Integrações de briefing devem usar sandbox/test mode quando disponível.

O pipeline mínimo de PR é:

```text
install → typecheck → lint → test → build
```

Lint deve focar bugs, acessibilidade disponível e práticas problemáticas, sem centenas de regras estilísticas. Um formatter consistente (preferencialmente Prettier, se não houver padrão estabelecido) cuida de estilo. Nenhum merge depende só de validação manual local.

## 16. Estratégia de testes

Não haverá meta artificial de 100% de cobertura. As camadas são:

- **unitários:** schema, normalização, regras condicionais e helpers;
- **componentes:** componentes interativos críticos, com React Testing Library ou equivalente;
- **end-to-end:** Home → começar projeto → preencher → revisar → enviar, além de troca de idioma.

Vitest, React Testing Library e Playwright são candidatos a avaliar no momento de implementação; não devem ser instalados nesta fase. A lógica do briefing precisa de testes específicos para `new-brand → namingStatus`, `website → websiteType`, `specific-date → specificDate` e para garantir que campos ocultos não gerem erros.

## 17. Architecture Decisions

| Área | Decision | Reason | Tradeoff |
| --- | --- | --- | --- |
| Framework | Next.js com App Router, React e TypeScript strict | SSG, metadata, rotas e componentes de servidor no mesmo framework | Requer acompanhar convenções e versões do Next |
| Rendering | Server Components e SSG por padrão; ilhas client para interação | Menos JavaScript e conteúdo rápido/indexável | Exige fronteiras explícitas entre servidor e cliente |
| Styling | CSS properties + CSS Modules | Tokens centralizados, escopo previsível e zero runtime extra | Menos componentes prontos de bibliotecas visuais |
| i18n | `/pt` e `/en`; módulos de conteúdo no servidor inicialmente | SEO, URLs claras e baixo bundle | Biblioteca pode ser necessária se formatação crescer |
| Conteúdo | Git-based, TypeScript tipado | Três cases e conteúdo institucional não justificam CMS | Edição requer fluxo de Git/desenvolvimento |
| Cases | Objetos tipados e blocos editoriais, não MDX | Segurança de tipos e simplicidade com flexibilidade suficiente | Menos liberdade de markup que MDX |
| Estado do briefing | `useReducer` local em `BriefingFlow` | Fluxo pequeno e previsível sem estado global | Pode avaliar React Hook Form se reduzir complexidade real |
| Validação | Schema compartilhado com Zod | Uma regra para cliente/servidor e tipos derivados | Nova dependência pequena a manter |
| API | `POST /api/briefing` server-side com contrato sanitizado | Centraliza validação, anti-spam e segredos | Requer provedores para entrega/persistência |
| Leads | Registro gerenciado + e-mail transacional | Menos risco de perda e alerta operacional imediato | Duas integrações e custo marginal |
| Analytics | Opt-in após avaliação privacy-friendly, sem PII | Medição útil com respeito à privacidade | Menos dados de marketing por padrão |
| Hosting | Vercel preferencial, Netlify compatível quando viável | Caminho direto para Next e previews | Recursos futuros do host podem divergir |
| Testes | Unitários + componentes críticos + E2E dos fluxos essenciais | Confiança focada em risco real | Sem cobertura total artificial |
| Dependências | Nativas/framework primeiro; cada pacote justifica necessidade | Menor bundle, superfície de segurança e manutenção | Algumas soluções exigem implementação própria simples |

## 18. Open Decisions Before Implementation

Somente estas decisões dependem de informação ainda indisponível:

1. versão exata de Next.js, React, TypeScript e ferramentas compatíveis, confirmada no ambiente/package registry;
2. licença e arquivo/família tipográfica definitivos;
3. provedor de e-mail transacional, serviço de armazenamento estruturado e política operacional de retenção/exclusão;
4. mecanismo de rate limiting compatível com o host selecionado;
5. solução de analytics, necessidade de consentimento e conteúdo jurídico aprovado para a política de privacidade;
6. domínio de produção, valores de `SITE_URL`, assets OG, favicon e mídia final;
7. conteúdo e assets reais hoje marcados como `CONTENT_REQUIRED` nos cases;
8. necessidade comprovada de React Hook Form e/ou de uma biblioteca de i18n após a verificação das versões atuais.

## 19. Checklist conceitual pré-produção

Antes de lançar o briefing em produção, validar: variáveis de ambiente, política de privacidade, endpoint e integração de leads, honeypot e rate limit, headers/CSP, analytics sem PII, metadata/canonical/hreflang, sitemap, robots, 404/error boundaries, acessibilidade e QA responsivo, Core Web Vitals, domínio e SSL. O detalhamento operacional pertence à Fase 10.
