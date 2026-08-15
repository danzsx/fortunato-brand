# Arquitetura de Cases — Fortunato Brands

> Documento estratégico e conceitual. Complementa `brand-foundation.md`, `information-architecture.md`, `design-system.md` e `home-wireframe.md`. Define a arquitetura editorial, narrativa, visual e de dados das páginas individuais de projeto. Não define copy final, interface, componentes, estilos, rotas implementadas ou assets.

## 1. Função estratégica dos cases

Os cases são o principal mecanismo de prova do site. Eles devem demonstrar que a Fortunato Brands transforma o entendimento de um negócio em uma marca clara, profissional e aplicada — com a precisão, a proximidade e o critério esperados de uma boutique autoral.

Um case não é uma galeria de mockups. Cada projeto deve evidenciar, somente a partir de informações reais:

- o contexto;
- o problema ou a oportunidade;
- o raciocínio que orientou decisões existentes;
- a identidade construída;
- o sistema visual;
- a aplicação no mundo real, quando houver evidência.

A leitura deve responder implicitamente: **por que essa solução existe dessa forma?** Textos não devem apenas descrever o que a imagem já mostra.

O portfólio deve permanecer a evidência principal de competência. Não usar números, resultados, estratégia, objetivos, clientes ou depoimentos não confirmados como substitutos de prova real.

## 2. Princípio editorial

A progressão preferencial de leitura é:

```text
contexto
↓
desafio
↓
direção
↓
identidade
↓
sistema
↓
aplicações
↓
resultado ou presença real
↓
próximo projeto
```

Essa é uma estrutura de raciocínio, não uma obrigação mecânica. Uma seção só existe quando há conteúdo real que a sustente. Quando não houver, ela deve ser omitida da futura página e registrada como pendência editorial.

## 3. Arquitetura global

Arquitetura conceitual padrão:

```text
Case Header
Hero Visual
Project Overview
Context / Challenge
Strategy or Direction
Identity System
Applications / Gallery
Outcome / Real-world Presence
Client Testimonial, when available
Next Project
Final CTA
Footer
```

Pequenas variações de ordem são permitidas quando melhorarem a narrativa de um projeto. Por exemplo, uma seção de naming pode anteceder a direção visual quando o nome for parte relevante e documentada da construção da marca. A variação não deve quebrar a ordem lógica de compreensão do projeto.

### 3.1 Case Header

O header abre a página com informação imediata e objetiva:

- nome do projeto;
- segmento;
- ano, quando confirmado;
- escopo;
- descrição breve.

Modelo conceitual:

```ts
type ProjectHeader = {
  name: string
  segment: string
  year?: string
  services: string[]
  intro: string
}
```

Exemplo de estrutura, sem copy definitiva:

```text
Sublime Mel

Alimentos

Naming
Estratégia
Identidade Visual

Uma marca criada desde o início para...
```

### 3.2 Hero Visual

Logo após a abertura, o hero apresenta uma mídia de alto impacto e alta prioridade visual. Deve ter grande escala, respeitar a identidade do projeto e não ser sobrecarregado por texto.

São permitidos, conforme material real disponível:

- imagem em largura de container;
- imagem full bleed;
- vídeo curto futuro.

Vídeo não é requisito nem pressuposto. A escolha da mídia deve servir ao projeto, e não preencher uma convenção de layout.

### 3.3 Project Overview

Seção compacta para leitura rápida de metadados, sem repetir desnecessariamente o header ou o conteúdo aprofundado.

```ts
type ProjectMeta = {
  client?: string
  projectName: string
  segment: string
  year?: string
  services: string[]
  scope?: string[]
  market?: string
}
```

### 3.4 Context / Challenge

Explica a situação inicial de forma clara, simples e compreensível para empresários. Deve responder, quando houver dados:

- que tipo de negócio era;
- se a empresa já existia ou estava começando;
- qual necessidade havia;
- o que precisava ser criado ou resolvido.

Evitar jargões como “ecossistema disruptivo”, “transformação holística”, “sinergia estratégica” e “soluções 360º”.

### 3.5 Strategy / Direction

Existe somente quando houver raciocínio real documentado. Pode registrar posicionamento, naming, conceito central, personalidade, diferenciação, direção criativa ou restrições reais do projeto.

Quando não houve estratégia formal, uma decisão puramente visual deve ser apresentada como decisão de direção criativa, nunca reembalada retrospectivamente como estratégia.

### 3.6 Identity System

Mostra como o conceito ou a direção existente se transforma em sistema. Pode incluir apenas os elementos realmente presentes no projeto:

- logotipo e variações;
- símbolo e construção;
- tipografia;
- cores;
- grafismos e padrões;
- fotografia;
- iconografia;
- composição;
- tom visual.

Não é necessário mostrar todos esses itens, nem isolar elementos apenas para aumentar o volume da apresentação.

### 3.7 Applications / Gallery

As aplicações demonstram utilidade e consistência. Cada agrupamento de mídia deve contribuir para responder: **como essa identidade vive fora da apresentação?**

Contextos possíveis, somente se produzidos ou legitimamente representados no projeto:

- embalagem;
- social media;
- cartão e papelaria;
- fachada, uniforme e sinalização;
- website;
- materiais comerciais;
- ponto de venda.

### 3.8 Outcome / Real-world Presence

Usar somente com evidência concreta. Pode registrar implementação real, presença física, continuidade da marca, presença em varejo, depoimento ou métricas verificadas.

É indispensável diferenciar o resultado atribuível ao projeto do estado atual da empresa. Não inferir causalidade: a existência de crescimento ou presença comercial não permite afirmar que o branding o causou sem evidência clara.

### 3.9 Client Testimonial

Depoimentos reais podem entrar na narrativa quando estiverem disponíveis e aprovados. Nunca criar depoimentos fictícios.

```ts
type ProjectTestimonial = {
  quote: string
  person: string
  role?: string
  company: string
}
```

### 3.10 Next Project e Final CTA

Todo case termina com uma navegação clara para outro trabalho e uma oportunidade de conversão.

```text
Próximo projeto

enveiro_
Loja de variedades

Ver projeto →
```

Depois dessa navegação, ou integrada ao encerramento, a CTA conceitual é:

```text
Tem um projeto em mente?

Começar um projeto →
```

No futuro, a CTA aponta para `/start`. A rota não é implementada nesta etapa.

## 4. Sistema editorial e visual

### 4.1 Gallery System

O sistema de galeria é flexível. A linguagem comum vem do design system, grid, tipografia, espaçamento e comportamento; a composição não deve forçar todos os cases a parecerem iguais.

Blocos permitidos:

```text
Full-width Image
Two-column Images
Asymmetric Image Pair
Image + Text
Text + Image
Full-bleed Visual
Three-image Editorial Grid
```

Cada bloco deve ser escolhido pela sua função narrativa. Não criar uma grade fixa ou uma sucessão de layouts decorativos.

### 4.2 Text Blocks

Há três níveis conceituais de texto:

| Nível | Função | Exemplo conceitual |
| --- | --- | --- |
| Section Label | Orientar discretamente a leitura. | `O desafio` |
| Statement | Sintetizar um argumento de maior impacto. | `A marca precisava nascer pronta para ocupar espaço.` |
| Body | Explicar o argumento em parágrafo curto. | Texto factual e contextual. |

Evitar blocos extensos. A largura futura recomendada para parágrafos é aproximadamente `50–65ch`.

### 4.3 Ritmo visual

O ritmo deve alternar argumento e evidência:

```text
imagem dominante
↓
texto curto
↓
imagem
↓
composição editorial
↓
respiro
↓
novo argumento
```

Evitar tanto uma sequência de imagens sem narrativa quanto blocos consecutivos de texto longo. O case deve ser visualmente rico e intelectualmente legível.

### 4.4 Variação entre projetos e cor

Os três cases compartilham design system, grid, tipografia, comportamento, navegação e padrões de conteúdo. Ainda assim, cada identidade pode orientar seu próprio ritmo, proporção de imagens, sequência editorial e fundos pontuais.

A UI global continua predominantemente neutra. Cores das marcas apresentadas podem ocupar áreas visuais maiores por imagens, aplicações e módulos editoriais específicos. Os tokens globais e o chrome da Fortunato não devem mudar integralmente a cada cliente.

## 5. Arquitetura específica por projeto

### 5.1 Sublime Mel

**Status:** `case principal`  
**Segmento:** alimentos / mel

Contexto confirmado:

- nova empresa;
- marca criada desde o início;
- naming criado pelo responsável pelo projeto;
- identidade criada do zero;
- empresa atualmente em operação;
- presença em supermercados;
- presença real em redes sociais.

Escopo confirmado:

```text
Naming
Estratégia inicial
Logotipo
Identidade Visual
Aplicações
```

Estrutura recomendada:

```text
01. Case Header
02. Hero
03. Contexto
04. O desafio de construir uma marca do zero
05. Naming — Sublime Mel
06. Direção estratégica / conceito
07. Logotipo
08. Sistema visual
09. Aplicações
10. Marca no mundo real
11. Depoimento, se existir
12. Próximo projeto
13. CTA
```

O naming recebe seção própria porque é uma prova relevante de capacidade estratégica. A origem linguística, metáfora, estratégia ou justificativa do nome só podem ser publicadas após informação real ser fornecida. Não publicar métricas de Instagram ou de presença comercial sem validação.

### 5.2 enveiro_

**Segmento:** loja de variedades

Contexto e escopo confirmados:

- naming criado pelo responsável pelo projeto;
- logotipo;
- identidade visual;
- aplicações.

```text
Naming
Logotipo
Identidade Visual
Aplicações
```

Estrutura recomendada:

```text
01. Case Header
02. Hero
03. Contexto
04. Desafio
05. Naming — enveiro_
06. Direção visual
07. Logotipo
08. Sistema de identidade
09. Aplicações
10. Depoimento, se existir
11. Próximo projeto
12. CTA
```

As informações abaixo permanecem `CONTENT_REQUIRED` e não devem ser inferidas: origem do nome, problema inicial, personalidade desejada, critérios de diferenciação, resultados e contexto de uso. Até sua documentação, o case limita-se aos fatos confirmados e às peças reais disponíveis.

### 5.3 Palomo Odontologia

**Segmento:** odontologia / saúde

Contexto e diretrizes confirmados:

- identidade visual já existente;
- o logotipo original será preservado;
- a página reposiciona editorialmente o projeto;
- não haverá redesign ou alteração retrospectiva da solução visual original.

Escopo confirmado:

```text
Identidade Visual
Logotipo
```

Estrutura recomendada:

```text
01. Case Header
02. Hero
03. Contexto
04. Desafio
05. Conceito
06. Logotipo
07. Identidade visual
08. Aplicações
09. Próximo projeto
10. CTA
```

Quando não houver informação histórica verificável, usar `CONTENT_REQUIRED`. Não reinterpretar decisões antigas como estratégia formal sem documentação real.

## 6. Navegação entre projetos

A sequência inicial é circular:

```text
Sublime Mel → enveiro_
enveiro_ → Palomo Odontologia
Palomo Odontologia → Sublime Mel
```

O link deve conter nome, segmento e ação clara para que a navegação seja compreensível sem depender de imagem ou hover.

## 7. Contrato conceitual de dados

Os contratos abaixo orientam futuro conteúdo e apresentação. Não criar arquivos TypeScript nesta fase.

```ts
type Project = {
  slug: string
  name: string
  segment: string
  year?: string
  intro: string
  services: string[]
  featured: boolean
  order: number

  hero: MediaAsset

  context?: RichTextBlock
  challenge?: RichTextBlock
  strategy?: RichTextBlock
  naming?: RichTextBlock
  concept?: RichTextBlock

  identitySections: ProjectSection[]
  applications: ProjectSection[]

  outcome?: ProjectOutcome
  testimonial?: ProjectTestimonial

  nextProjectSlug: string
}
```

```ts
type MediaAsset = {
  type: "image" | "video"
  src: string
  alt?: string
  width?: number
  height?: number
}
```

```ts
type RichTextBlock = {
  eyebrow?: string
  title?: string
  body?: string
}
```

```ts
type ProjectSection = {
  id: string
  type:
    | "full-media"
    | "two-column-media"
    | "asymmetric-media"
    | "text-media"
    | "media-text"
    | "editorial-grid"
    | "statement"
  title?: string
  body?: string
  media?: MediaAsset[]
}
```

```ts
type ProjectOutcome = {
  title?: string
  description?: string
  metrics?: {
    label: string
    value: string
    source?: string
  }[]
}
```

Campos opcionais devem permanecer ausentes enquanto não houver dados confiáveis. O contrato não é uma exigência para preencher todas as propriedades.

## 8. Tratamento futuro de mídia

Na futura implementação:

- imagens devem ter dimensões conhecidas quando possível, para reduzir layout shift;
- usar imagens responsivas;
- aplicar lazy loading ao conteúdo abaixo da dobra;
- a mídia hero pode receber prioridade de carregamento;
- textos alternativos devem descrever conteúdo relevante;
- imagens puramente decorativas devem receber tratamento semântico adequado;
- vídeos não devem tocar automaticamente com áudio;
- movimento deve respeitar a preferência por redução de movimento.

Mídia deve reforçar a apresentação do trabalho sem substituir a narrativa. Aspect ratios, recortes e escalas devem preservar o conteúdo relevante de cada projeto, especialmente em telas menores.

## 9. Responsividade

| Contexto | Diretriz |
| --- | --- |
| Desktop | Imagens grandes, composições assimétricas, duas colunas quando editorialmente apropriado e respiro amplo. |
| Tablet | Reduzir assimetria e preservar escala e relação entre mídia e argumento. |
| Mobile | Priorizar ordem narrativa, empilhar layouts complexos, manter imagens grandes, evitar recortes excessivos e evitar texto sobre imagem. |

A ordem do DOM deve continuar lógica independentemente da composição visual. Mobile não é desktop comprimido: conteúdo, leitura, toque e legibilidade têm prioridade sobre assimetria decorativa.

## 10. Acessibilidade futura

A futura implementação deve atender WCAG AA como mínimo e garantir:

- headings em ordem semântica;
- alt text útil para mídia relevante;
- foco visível;
- links claros para próximo projeto;
- nenhum conteúdo indispensável apenas em animação;
- contraste suficiente em fundos específicos dos cases;
- vídeo acessível, quando houver;
- navegação e conteúdo essenciais disponíveis por teclado e sem hover;
- respeito a `prefers-reduced-motion`.

## 11. Content Required Before Production

Nenhuma lacuna abaixo pode ser preenchida por inferência. O status `CONTENT_REQUIRED` indica que a seção correspondente deve ser omitida da futura página até haver fonte real.

### Sublime Mel

- `CONTENT_REQUIRED` origem e raciocínio do naming;
- `CONTENT_REQUIRED` problema inicial detalhado;
- `CONTENT_REQUIRED` conceito central;
- `CONTENT_REQUIRED` decisões visuais;
- `CONTENT_REQUIRED` aplicações disponíveis;
- `CONTENT_REQUIRED` depoimento;
- `CONTENT_REQUIRED` validação da presença em supermercados;
- `CONTENT_REQUIRED` métricas que eventualmente serão publicadas.

### enveiro_

- `CONTENT_REQUIRED` origem e significado do naming;
- `CONTENT_REQUIRED` briefing original;
- `CONTENT_REQUIRED` problema inicial;
- `CONTENT_REQUIRED` personalidade;
- `CONTENT_REQUIRED` direção criativa;
- `CONTENT_REQUIRED` decisões visuais;
- `CONTENT_REQUIRED` aplicações;
- `CONTENT_REQUIRED` estado atual da marca;
- `CONTENT_REQUIRED` depoimento.

### Palomo Odontologia

- `CONTENT_REQUIRED` briefing original ou contexto recuperável;
- `CONTENT_REQUIRED` problema;
- `CONTENT_REQUIRED` conceito;
- `CONTENT_REQUIRED` principais decisões do logotipo;
- `CONTENT_REQUIRED` aplicações disponíveis;
- `CONTENT_REQUIRED` depoimento, se existir.

## 12. Regra anti-fabricação

Quando não houver informação suficiente para determinada seção:

1. omitir a seção da página futura;
2. marcar o conteúdo como pendente (`CONTENT_REQUIRED`);
3. solicitar a informação posteriormente.

Nunca:

- fabricar estratégia;
- inventar frases de cliente;
- inventar métricas;
- inventar resultados;
- inventar objetivos;
- criar uma história fictícia para tornar o case mais convincente.

Credibilidade tem prioridade sobre completude. Uma apresentação mais curta, sustentada por fatos e aplicações reais, é preferível a uma narrativa aparentemente completa sem base documental.

