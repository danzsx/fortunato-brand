Considere como fontes de verdade:

- `/docs/brand-foundation.md`
- `/docs/information-architecture.md`
- `/docs/design-system.md`
- `/docs/home-wireframe.md`
- `/docs/case-study-architecture.md`
- `/docs/briefing-funnel.md`
- `/docs/technical-architecture.md`

Nesta etapa, NÃO implemente a aplicação.

Crie somente:

`/docs/implementation-spec.md`

Objetivo: consolidar o mínimo necessário para que a Fase 9 possa implementar o site sem reinterpretar decisões importantes.

Evite repetir integralmente documentos anteriores.

Evite criar abstrações, tipos ou componentes que ainda não sejam necessários.

---

# 1. Mapa de páginas

Registrar:

```text
/[locale]
/[locale]/projects
/[locale]/projects/[slug]
/[locale]/services
/[locale]/about
/[locale]/start
/[locale]/privacy
```

API futura:

```text
/api/briefing
```

Locales:

```text
pt
en
```

---

# 2. Estrutura da Home

A Home deve seguir:

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

Não adicionar novas seções na implementação sem necessidade real.

Ordem dos projetos:

1. Sublime Mel
2. enveiro_
3. Palomo Odontologia

Sublime Mel deve permanecer como projeto principal.

---

# 3. Estrutura dos Cases

Cada página de projeto pode utilizar:

```text
Header do projeto
Hero visual
Contexto
Desafio
Estratégia / direção, quando existir
Identidade
Aplicações
Resultado / presença real, quando houver
Depoimento, quando houver
Próximo projeto
CTA final
```

Se uma seção não tiver conteúdo real, omiti-la.

Nunca preencher lacunas com conteúdo inventado.

---

# 4. Páginas secundárias

## `/projects`

Exibir os projetos disponíveis com forte protagonismo visual.

## `/services`

Manter a hierarquia:

1. Identidade Visual
2. Rebranding
3. Websites

## `/about`

Reforçar:

- modelo boutique;
- presença autoral;
- proximidade;
- condução criteriosa.

Não inventar equipe, prêmios ou métricas.

## `/privacy`

Reservar estrutura para política de privacidade real.

Não inventar texto jurídico definitivo.

---

# 5. Briefing `/start`

A página deve ter:

```text
Introdução
Sobre você
Sobre o negócio
Necessidade
Contexto
Prazo e investimento
Contato
Revisão
Sucesso
```

Regras condicionais principais:

```text
nova marca → perguntar sobre naming
identidade visual → perguntar se já possui logo
rebranding → perguntar motivo
website → perguntar tipo de site
data específica → perguntar a data
```

O usuário deve poder:

- avançar;
- voltar;
- corrigir respostas;
- revisar antes do envio;
- tentar novamente sem perder dados em caso de erro.

---

# 6. Componentes essenciais

Não criar uma arquitetura excessivamente fragmentada.

Planejar apenas grupos principais:

```text
layout/
  Header
  Footer
  Container

home/
  Hero
  Projects
  Services
  Process
  Testimonials
  About
  FinalCTA

projects/
  ProjectCard
  CaseHeader
  CaseSections
  NextProject

briefing/
  BriefingFlow
  BriefingField
  BriefingReview
```

Criar componentes adicionais somente quando houver repetição real ou responsabilidade clara.

Evitar um arquivo/componente para cada pequeno bloco visual.

---

# 7. Server e Client Components

Usar Server Components por padrão.

Client Components somente quando houver interação real.

Devem ser client-side principalmente:

- menu mobile, se necessário;
- briefing multi-step;
- controles interativos específicos.

Não colocar `"use client"` em páginas inteiras sem necessidade.

---

# 8. Conteúdo

Separar conteúdo da apresentação.

Os textos públicos devem vir da camada de conteúdo/i18n.

Não espalhar copy diretamente por vários componentes.

Os cases podem usar a estratégia definida em `/docs/technical-architecture.md`.

Manter suporte a campos opcionais.

---

# 9. Responsividade

## Mobile

- uma coluna;
- projetos empilhados;
- hero simplificado;
- processo vertical;
- briefing confortável para toque.

## Desktop

- hero editorial assimétrico;
- Sublime Mel em destaque;
- enveiro_ e Palomo em composição secundária;
- processo em quatro colunas quando houver espaço.

Não criar dezenas de breakpoints.

---

# 10. Estados obrigatórios

Prever apenas os estados necessários.

## Menu

```text
open
closed
```

## Briefing

```text
editing
submitting
success
error
```

## Campos

```text
default
focus
invalid
disabled
```

Não criar máquinas de estado complexas sem necessidade.

---

# 11. Acessibilidade

Na implementação, garantir:

- HTML semântico;
- um `h1` principal por página;
- foco visível;
- navegação por teclado;
- labels corretos nos campos;
- contraste adequado;
- menu mobile acessível;
- `prefers-reduced-motion`;
- alt text nas imagens relevantes.

---

# 12. Conteúdo incompleto

Todo conteúdo marcado anteriormente como:

`CONTENT_REQUIRED`

continua pendente.

Na implementação:

- omitir se opcional;
- usar placeholder técnico apenas em desenvolvimento;
- nunca inventar copy, métricas, depoimentos ou resultados.

---

# 13. Dados dos projetos

A implementação precisa suportar pelo menos:

```text
slug
nome
segmento
serviços
imagem principal
ordem
resumo
seções editoriais
próximo projeto
```

Não criar um modelo de conteúdo maior do que o necessário para os três cases atuais.

---

# 14. API do briefing

A implementação futura deve expor:

```text
POST /api/briefing
```

Responsabilidades mínimas:

```text
validar
proteger contra spam
normalizar
encaminhar ou persistir
retornar sucesso/erro seguro
```

Nunca confiar apenas na validação do cliente.

---

# 15. SEO essencial

Cada página pública deve permitir:

- title;
- description;
- canonical;
- hreflang;
- Open Graph.

Também prever:

- sitemap;
- robots.txt;
- metadata individual dos cases.

Não sofisticar SEO além disso no MVP.

---

# 16. Performance

Priorizar:

- pouco JavaScript;
- imagens otimizadas;
- conteúdo estático quando possível;
- evitar bibliotecas pesadas;
- CSS para microinterações simples.

Home e cases devem ser estáticos sempre que possível.

---

# 17. Ordem de implementação da Fase 9

Registrar esta ordem:

```text
1. setup e estrutura
2. tokens e estilos globais
3. i18n e conteúdo
4. header/footer
5. home
6. projects + cases
7. services + about
8. briefing
9. API do briefing
10. SEO, acessibilidade e QA técnico
```

Não implementar tudo de uma vez.

---

# 18. Restrições

Na Fase 9, NÃO adicionar sem necessidade:

- CMS;
- autenticação;
- dashboard;
- Redux;
- e-commerce;
- upload de arquivos;
- PWA;
- chat;
- animações complexas;
- biblioteca grande de UI;
- abstrações genéricas antecipadas.

---

# 19. Critérios de aceite

A implementação será considerada coerente quando:

- respeitar os documentos das fases anteriores;
- não inventar conteúdo;
- manter Identidade Visual como oferta principal;
- preservar protagonismo dos cases;
- funcionar bem em mobile e desktop;
- briefing funcionar de ponta a ponta;
- build, typecheck e lint passarem;
- não houver dependências ou abstrações sem justificativa.

---

# Resultado esperado

Criar somente:

`/docs/implementation-spec.md`

O documento deve ser curto e operacional.

Não repetir explicações extensas já registradas nos outros arquivos.

Não implementar código.
Não instalar dependências.
Não alterar a aplicação.