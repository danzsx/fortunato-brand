# Wireframe da Home — Fortunato Brands

> Especificação conceitual para a futura Home. Baseada em `brand-foundation.md`, `information-architecture.md` e `design-system.md`. Este documento não implementa interface, componentes, estilos, rotas ou dependências.

## 1. Escopo e princípios

A Home deve apresentar a Fortunato Brands como uma boutique independente de branding e design digital: clara, precisa, próxima e autoral, sem parecer uma grande agência, uma software house ou uma landing page promocional genérica.

O portfólio é a evidência central de competência. A narrativa deve estabelecer posicionamento, mostrar trabalho real, explicar o método e conduzir para o início de um projeto. Não adicionar seções além das definidas abaixo sem justificativa editorial e estratégica futura.

## 2. Ordem obrigatória

1. Header
2. Hero
3. Projetos selecionados
4. Manifesto
5. Identidade Visual
6. Rebranding
7. Websites
8. Processo
9. Prova social
10. Sobre
11. CTA final
12. Footer

## 3. Wireframe de leitura

```text
HEADER
  marca | navegação primária | idioma + CTA

HERO
  posicionamento dominante + apoio + duas ações

PROJETOS SELECIONADOS
  intro 01—03
  Sublime Mel (imagem dominante)
  enveiro_ + Palomo Odontologia (composição dupla)

MANIFESTO
  afirmação editorial curta + explicação breve

SERVIÇOS
  Identidade Visual (maior presença)
  Rebranding
  Websites

PROCESSO
  Entender | Direcionar | Criar | Aplicar

PROVA SOCIAL
  2–4 depoimentos reais, simultaneamente visíveis

SOBRE
  boutique independente + relação direta

CTA FINAL (área escura)
  convite conclusivo + ação

FOOTER
  marca + serviços + canais + idioma + informações legais
```

## 4. Header

### Desktop

Estrutura conceitual em três zonas:

```text
[brand] [primary navigation] [language + primary CTA]
```

Conteúdo, nesta ordem lógica:

- `FORTUNATO BRANDS`;
- `Projetos`, `Serviços`, `Sobre`;
- `PT / EN`;
- `Começar um projeto`.

Diretrizes:

- altura aproximada entre `76px` e `84px`;
- visual simples, integrado à página, sem sombra padrão ou borda pesada;
- o CTA global permanece perceptível sem competir com o hero ou os projetos;
- pode tornar-se sticky; ao scroll pode receber fundo sólido ou levemente translúcido para manter a legibilidade, sem glassmorphism intenso;
- a navegação deve ser funcional por teclado e manter foco visível.

### Mobile

Estado fechado:

```text
FORTUNATO BRANDS                         Menu
```

O menu expandido contém somente:

1. Projetos
2. Serviços
3. Sobre
4. Começar um projeto
5. PT / EN

Não criar navegação móvel densa. A abertura e o fechamento devem possuir estados explícitos e funcionar sem hover.

## 5. Hero

**Objetivo:** estabelecer o posicionamento antes da exposição dos cases.

No desktop, ocupar `min-height` aproximada de `78vh` (sem impor `100vh`) e usar grid de 12 colunas. A headline ocupa aproximadamente 8–10 colunas. Supporting copy e CTAs podem deslocar-se horizontalmente para produzir assimetria editorial e espaço negativo intencional.

```text
Marcas mais fortes começam
com uma identidade
bem construída.
```

```text
Estratégia, naming e identidade visual
para negócios que querem ser percebidos
com mais valor.
```

- CTA primário: `Começar um projeto`;
- CTA secundário: `Ver projetos`.

Não usar imagem hero central por padrão, nem a fórmula `headline + paragraph + buttons + centered image`. A headline é a protagonista; o apoio deve ser curto e manter medida de leitura controlada.

No mobile, remover a assimetria agressiva e reorganizar em fluxo vertical: headline dominante, supporting copy abaixo e CTAs imediatamente acessíveis.

## 6. Projetos selecionados

Esta seção abre imediatamente após o Hero. Não inserir bloco explicativo entre ambos.

Intro obrigatório:

```text
Projetos selecionados
01—03
```

### Projeto principal — Sublime Mel

Usar imagem muito grande, aproximadamente full container, como entrada editorial dominante. Não manter texto sobreposto permanentemente à imagem.

Após a imagem:

```text
Sublime Mel
01
Alimentos
Naming · Estratégia · Identidade Visual
```

O case demonstra construção de marca desde a origem. Não alegar resultados ou métricas não validadas.

### Projetos secundários

Apresentar, em ordem obrigatória:

1. `enveiro_` — loja de variedades; naming, logotipo, identidade visual e aplicações confirmados.
2. `Palomo Odontologia` — odontologia/saúde; identidade visual, preservando o logotipo original.

No desktop, permitir composição em duas colunas, com imagens editoriais e metadados abaixo. No mobile, empilhar os três projetos verticalmente, preservando a ordem. Cada projeto é uma entrada editorial, não um card SaaS; imagens devem dominar e informações essenciais devem permanecer disponíveis sem hover.

## 7. Manifesto

Seção de baixa densidade visual, com muito espaço negativo e texto breve.

```text
Um logotipo não precisa apenas ser bonito.
Precisa fazer sentido para a marca que representa.
```

Adicionar supporting copy curta: o processo busca compreensão e clareza antes da forma, para que a identidade represente o negócio com coerência. Não transformar este bloco em um manifesto longo.

## 8. Serviços

Os três blocos abaixo constituem uma sequência comercial, e não um grid de icon cards. Benefício e raciocínio têm mais peso que listas de entregáveis.

### 8.1 Identidade Visual — serviço principal

Recebe mais presença visual, espaço e escala que os serviços seguintes. Comunica a construção de marcas do zero ou a evolução de sistemas de identidade existentes, para negócios que precisam ser percebidos com mais profissionalismo e valor.

Capabilities conceituais:

- Estratégia
- Naming
- Logotipo
- Sistema visual
- Aplicações

Não exibir lista extensa de arquivos entregues. Estratégia e naming são competências que fortalecem a construção da identidade, não serviços isolados de igual prioridade.

### 8.2 Rebranding — serviço secundário

Apresentação simples e editorial, sem icon card.

```text
Sua empresa mudou.
A marca também pode precisar mudar.
```

Explicar de forma breve que a identidade pode deixar de acompanhar o momento, o posicionamento ou a maturidade da empresa.

### 8.3 Websites — serviço complementar

```text
A identidade continua no digital.
```

Relacionar websites à continuidade da marca no ambiente digital: arquitetura, experiência e presença institucional coerentes com a identidade. Não posicionar a Fortunato Brands como software house ou desenvolvimento genérico.

## 9. Processo

Título: `Como trabalhamos`.

Quatro etapas obrigatórias:

```text
01 Entender
02 Direcionar
03 Criar
04 Aplicar
```

Cada etapa recebe uma descrição curta, direta e sem jargão:

- **Entender:** conhecer o negócio, seu momento e o que a marca precisa comunicar.
- **Direcionar:** transformar entendimento em foco, critérios e direção.
- **Criar:** construir uma identidade clara, própria e coerente.
- **Aplicar:** preparar a marca para aparecer com consistência nos pontos necessários.

No desktop, permitir quatro colunas. No mobile, usar pilha vertical. Não criar fluxogramas complexos.

## 10. Prova social

Prever de 2 a 4 depoimentos visíveis simultaneamente, em composição editorial possivelmente assimétrica. Não usar slider ou carousel automático.

Cada depoimento deve usar o contrato `Testimonial` documentado neste arquivo. Depoimentos, pessoas, empresas e vínculo com projetos dependem de validação real; nunca inventar conteúdo para preencher esta área. Caso não existam depoimentos aprovados no lançamento, a seção deve ser tratada como conteúdo pendente, não substituída por provas fictícias.

## 11. Sobre

**Objetivo:** humanizar a boutique e reforçar a proximidade sem criar uma narrativa de grande equipe.

Mensagem principal:

```text
Uma boutique independente de branding e design digital.
```

Supporting copy deve reforçar proximidade, condução direta, critério, estratégia e relacionamento com pequenos negócios. A seção deve funcionar com ou sem retrato: uma fotografia pode complementar a narrativa, mas não é requisito estrutural.

## 12. CTA final

Encerramento visual forte, após trabalho, método e prova.

```text
Sua marca está pronta
para o próximo passo?
```

CTA: `Começar um projeto`.

Permitir inversão cromática com `background: dark` e `text: light`. Esta é uma das poucas grandes áreas escuras da Home; o restante da experiência permanece predominantemente neutro.

## 13. Footer

Conteúdo conceitual:

- `FORTUNATO BRANDS`;
- `Brand Identity`, `Rebranding`, `Websites`;
- `Instagram`, `Behance`;
- `PT / EN`;
- copyright;
- `Política de privacidade`.

Evitar sitemap excessivamente grande. O footer encerra com orientação e informações essenciais, não com uma segunda navegação extensa.

## 14. Comportamento responsivo e proporções

Breakpoints conceituais:

```text
mobile:  < 640px
tablet:  640px–1023px
desktop: 1024px–1439px
wide:    >= 1440px
```

Eles representam mudanças estruturais, não correções locais. Preferir valores fluidos para tipografia, espaços e dimensões quando possível.

| Área | Desktop e wide | Mobile |
| --- | --- | --- |
| Grid | Referência de 12 colunas; composição editorial e assimétrica permitida. | Fluxo de uma coluna; sem assimetria que prejudique leitura. |
| Hero | Cerca de 78vh mínimos; headline em 8–10 colunas. | Headline, apoio e ações em ordem vertical. |
| Projetos | Sublime Mel full container; secundários em duas colunas. | Três itens empilhados na ordem definida. |
| Serviços | Identidade Visual claramente maior; Rebranding e Websites em sequência editorial. | Pilha vertical, preservando prioridade visual. |
| Processo | Quatro colunas. | Quatro etapas empilhadas. |
| Espaçamento | Respiro amplo, com seções aproximadamente entre 96px e 160px. | Respiro generoso ajustado ao alcance e à leitura; não comprimir em blocos densos. |

Containers, paddings, tipografia, cores, raios e imagens devem seguir os tokens e diretrizes estabelecidos no design system. Como referência, o desktop usa container máximo de `1440px`, área útil aproximada de `1280px` e imagens prioritariamente em `4:3` ou `16:10`.

## 15. Motion e sticky behavior

Não usar splash screen, loader introdutório, autoplay visual, scroll hijacking ou parallax que prejudique leitura.

Scroll reveal é permitido apenas com:

- opacity;
- `translateY` curto;
- duração moderada.

Conteúdo não pode permanecer invisível por tempo relevante aguardando animação. Hover de projetos pode aplicar scale aproximado de `1.01–1.02`, além de mudanças discretas de título ou seta. Respeitar `prefers-reduced-motion` e garantir que todo conteúdo e navegação funcionem integralmente sem scripts de animação.

O header pode ser sticky. Não estruturar a narrativa da Home em torno de sticky sections.

## 16. Filosofia de composição

A Home deve alternar ritmo visual:

```text
abertura ampla
↓
projeto dominante
↓
composição dupla
↓
respiro
↓
texto editorial
↓
serviços
↓
prova
↓
conversão
```

Evitar repetição de blocos idênticos e a impressão de uma sequência mecânica de cards reutilizados. Hierarquia, escala de imagem, espaço negativo, contraste tipográfico e variação de composição devem sustentar o ritmo.

## 17. Contratos conceituais

Os tipos abaixo são contratos de conteúdo e de futuras unidades de apresentação. Não criar arquivos TypeScript nesta fase.

```ts
type LinkAction = {
  label: string
  href: string
}

type HeroContent = {
  eyebrow?: string
  title: string
  description: string
  primaryCta: LinkAction
  secondaryCta?: LinkAction
}

type SectionIntroContent = {
  eyebrow?: string
  title?: string
  description?: string
  index?: string
}

type Project = {
  slug: string
  name: string
  segment: string
  summary?: string
  year?: string
  services: string[]
  heroAsset?: string
  featured: boolean
  order: number
}

type ServiceBlockContent = {
  index: string
  title: string
  headline?: string
  description: string
  capabilities?: string[]
}

type ProcessStepContent = {
  index: string
  title: string
  description: string
}

type Testimonial = {
  quote: string
  person: string
  company: string
  projectSlug?: string
}

type FinalCTAContent = {
  title: string
  action: LinkAction
}
```

## 18. Contrato de conteúdo e apresentação

A futura UI não deve conter conteúdo editorial espalhado diretamente dentro dos componentes. Separar `content` de `presentation` para permitir revisão editorial, internacionalização e futura adoção de CMS sem alterar a estrutura visual.

Direção arquitetural possível, sem decisão técnica definitiva nesta etapa:

```text
/content
  /home
  /projects
  /services
```

Os dados dos três projetos devem preservar a ordem `Sublime Mel`, `enveiro_`, `Palomo Odontologia` e só devem afirmar serviços, contexto ou resultados confirmados. `heroAsset` é referência conceitual: não definir URLs reais de assets nesta fase. Conteúdo em inglês deverá ser adaptado editorialmente, não traduzido literalmente.

## 19. Regras estruturais finais

- A Home deve funcionar sem scripts de animação.
- Conteúdo essencial não pode depender de hover, imagem, retrato ou depoimento não validado.
- Não usar preços, métricas, prêmios, logos de clientes ou resultados fictícios.
- Priorizar clareza, legibilidade, navegação por teclado, foco visível e contraste suficiente.
- Acessibilidade futura deve atender WCAG AA como mínimo.
- Não implementar nenhuma parte deste wireframe nesta fase.
