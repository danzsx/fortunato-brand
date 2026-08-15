# Design System Conceitual — Fortunato Brands

> Este documento consolida diretrizes conceituais para a futura interface da Fortunato Brands. Baseia-se em `docs/brand-foundation.md` e `docs/information-architecture.md`. Não define frontend, componentes implementados, bibliotecas ou copy final.

## 1. Princípio visual

> Menos elementos, mais intenção.

A interface deve transmitir precisão, elegância, clareza, autoridade, silêncio visual e proximidade controlada. A estética é editorial e minimalista: o trabalho, a tipografia, a escala das imagens e o espaço devem conduzir a experiência.

Evitar uma aparência de template SaaS, agência genérica, landing page altamente promocional ou luxo ostensivo. A sofisticação deve vir de critério, proporção e consistência — não de excesso visual.

## 2. Referências conceituais

Apple e Berriel Brands são referências exclusivamente conceituais.

Absorver:

- uso disciplinado do espaço;
- hierarquia tipográfica;
- imagens em grande escala;
- layouts editoriais;
- simplicidade;
- refinamento;
- microinterações discretas.

Não copiar layouts, componentes, composições, animações, identidade visual ou elementos distintivos dessas referências. A Fortunato Brands deve construir uma linguagem própria de boutique com presença autoral, sem parecer uma grande agência.

## 3. Sistema de cor

Tokens iniciais:

| Token | Valor | Uso conceitual |
| --- | --- | --- |
| `color.background.primary` | `#F5F5F2` | Fundo principal da experiência. |
| `color.background.secondary` | `#ECECE7` | Variação sutil para agrupamentos ou seções. |
| `color.text.primary` | `#111111` | Texto, ícones funcionais e superfícies escuras pontuais. |
| `color.text.secondary` | `#62625E` | Metadados e texto de apoio com contraste suficiente. |
| `color.border.subtle` | `#D8D8D2` | Separações discretas e elementos funcionais. |
| `color.accent.primary` | `#1F3FFF` | Destaques pontuais e estados de ação. |

A aplicação deve permanecer predominantemente neutra. `color.accent.primary` é um acento, não uma superfície padrão: não usar grandes áreas preenchidas de azul por padrão. Os valores poderão ser ajustados quando a identidade definitiva da Fortunato Brands for desenvolvida; por isso, seu consumo futuro deve ocorrer apenas via tokens semânticos.

## 4. Tipografia

O sistema deve permitir a substituição posterior da família tipográfica sem alterar sua arquitetura visual. O fallback inicial permitido é:

```css
Inter, system-ui, sans-serif
```

Inter não deve se tornar uma dependência permanente da identidade. Em implementação futura, a escala deve ser fluida com CSS `clamp()`.

| Papel | Direção de tamanho desktop |
| --- | --- |
| `type.display` | 72–104px |
| `type.h1` | 64–80px |
| `type.h2` | 44–56px |
| `type.h3` | 28–36px |
| `type.body-lg` | 20–24px |
| `type.body` | 16–18px |
| `type.small` | 13–14px |

Os intervalos são direções, não valores obrigatórios. Headlines devem usar peso entre 400 e 500, tracking levemente negativo, line-height compacto, poucas linhas e largura máxima controlada. Evitar caixa alta em headlines longas.

O texto corrido deve privilegiar leitura confortável, com line-height generoso e medida próxima de `60ch`. A hierarquia deve depender mais de tamanho, espaço e contraste do que de pesos excessivamente altos.

## 5. Grid e composição

No desktop, a referência é um grid de 12 colunas, com container máximo de `1440px` e área útil aproximada de `1280px`.

| Contexto | Padding lateral de referência |
| --- | --- |
| Desktop grande | 64–80px |
| Desktop | 48px |
| Tablet | 32px |
| Mobile | 20–24px |

O sistema não deve centralizar todo o conteúdo obrigatoriamente. Deve suportar alinhamento à esquerda, imagens full-width, blocos centralizados pontuais e composições editoriais assimétricas. No desktop, espaço adicional deve ampliar o respiro e a qualidade da composição — não introduzir conteúdo apenas por haver largura disponível.

## 6. Espaçamento

Escala conceitual baseada em 4px:

```text
4
8
12
16
24
32
48
64
96
128
160
```

Componentes devem usar intervalos menores, normalmente entre `16px` e `32px` para seu espaçamento interno. Seções devem ter ritmo significativamente mais amplo, com espaçamento vertical entre `96px` e `160px` conforme o contexto.

Mesmo em mobile, preservar sensação generosa de respiro. Reduzir medidas quando necessário para legibilidade e alcance, sem comprimir a experiência em blocos densos.

## 7. Header e navegação

Direção inicial para desktop:

```text
FORTUNATO BRANDS
Projetos
Serviços
Sobre
PT / EN
Começar um projeto
```

O header deve ser extremamente simples, integrado à página, com altura aproximada entre `72px` e `88px`, sem sombra por padrão e sem bordas pesadas. Em uma implementação futura, o scroll poderá introduzir fundo sólido ou transparência leve para preservar legibilidade. Evitar glassmorphism intenso.

A navegação deve orientar sem competir com o portfólio e preservar o CTA global `Começar um projeto`. A versão móvel deverá ter uma experiência própria, com estados explícitos de abertura e fechamento e sem depender de hover.

## 8. Ações: botões e links

### Ação primária

Deve usar fundo escuro, texto claro, raio entre `6px` e `10px`, padding generoso, hover discreto e foco claramente visível. Não adotar formato pill como padrão.

### Ação secundária

Priorizar link editorial, por exemplo `Ver projetos →`, quando a ação não exige a ênfase de um botão. Não criar um botão em caixa quando um link textual comunica a ação com mais leveza.

## 9. Apresentação de projetos

Projetos não devem ser tratados visualmente como cards SaaS. Cada item é uma entrada editorial cuja imagem domina a composição.

Estrutura conceitual:

```text
imagem do projeto

nome do projeto
índice do projeto
segmento
serviços
```

A apresentação futura deve respeitar a ordem definida na arquitetura de informação: Sublime Mel, enveiro_ e Palomo Odontologia. Informações de contexto, escopo e resultados devem limitar-se a fatos confirmados.

Em hover, permitir somente scale aproximado de `1.01–1.02`, alteração discreta de seta ou título e transição suave. Não usar sombra permanente, overlay desnecessário, bordas muito arredondadas, ícone de lupa ou badges promocionais. O conteúdo essencial deve continuar disponível por teclado e em dispositivos sem hover.

## 10. Sistema de imagens

Aspect ratios prioritários:

```text
4:3
16:10
```

Permitir imagens full bleed, imagens editoriais grandes e composições especiais nos cases. Evitar o uso predominante de imagens quadradas.

A implementação futura deve prever lazy loading, imagens responsivas, `object-fit` controlado, placeholders e tratamento de erro. A imagem precisa reforçar o trabalho como principal prova de competência, sem transformar o site em uma galeria decorativa ou em um carrossel automático.

## 11. Hero

O hero deve ocupar aproximadamente `75–90vh` no desktop, sem impor `100vh`. A headline é a protagonista, apoiada por texto curto e CTA principal e secundário. O uso de espaço negativo deve ser amplo e intencional.

Evitar a fórmula convencional de headline, parágrafo, botão e imagem grande centralizada. Buscar uma composição editorial coerente com a narrativa da home: percepção de qualidade, compreensão da proposta e acesso ao trabalho.

## 12. Motion

> Motion confirma hierarquia; não cria espetáculo.

Movimentos permitidos:

- opacity;
- translate vertical curto;
- reveal de imagens;
- scale muito pequeno;
- transições de hover;
- mudança de estado do header.

| Token | Duração de referência |
| --- | --- |
| `motion.fast` | 180ms |
| `motion.normal` | 300ms |
| `motion.slow` | 500ms |

Não usar scroll hijacking, cursor customizado, parallax exagerado, blur decorativo excessivo, texto reagindo ao mouse ou animações gratuitas. A futura implementação deve respeitar obrigatoriamente `prefers-reduced-motion`, reduzindo ou removendo movimento não essencial.

## 13. Radius e sombras

Tokens iniciais de raio:

```text
radius.sm 4px
radius.md 8px
radius.lg 16px
```

Imagens editoriais devem permanecer entre `0px` e `8px`; componentes funcionais, entre `8px` e `12px`. Evitar arredondamento excessivo.

Sombras devem ser raras e reservadas a overlays, menus, modais e elementos efetivamente elevados. Não usar sombra como separador padrão de componentes. Priorizar espaço, tipografia, contraste e borders sutis.

## 14. Filosofia responsiva

Mobile não é desktop comprimido. Deve preservar hierarquia forte, imagens grandes, espaço negativo, textos curtos, CTA facilmente alcançável e experiência editorial.

O layout móvel pode reorganizar ordem, proporção e ritmo para servir melhor à leitura e ao toque. O desktop, por sua vez, deve adicionar respiro e possibilidades de composição, não conteúdo dispensável.

## 15. Acessibilidade

A futura implementação deve atender WCAG AA como mínimo e incluir:

- estados de foco claramente visíveis;
- navegação integral por teclado;
- headings semânticos e hierarquia correta;
- alvos de toque próximos ou superiores a `44px`;
- contraste suficiente;
- conteúdo essencial independente de hover;
- respeito a `prefers-reduced-motion`.

Decisões visuais não devem reduzir compreensão, controle ou acesso ao conteúdo para tecnologias assistivas, teclado, toque ou diferentes preferências de movimento.

## 16. Estados futuros de componentes

Os estados abaixo devem ser previstos desde a arquitetura, sem implementação nesta etapa.

| Elemento | Estados necessários |
| --- | --- |
| Link | `default`, `hover`, `focus`, `active` |
| Button | `default`, `hover`, `focus`, `disabled`, `loading` |
| Project entry | `default`, `hover`, `focus` |
| Navigation menu | `closed`, `opening`, `open`, `closing` |
| Image | `loading`, `loaded`, `error` |
| Form field | `idle`, `focus`, `valid`, `invalid`, `disabled` |
| Form submission | `idle`, `submitting`, `success`, `error` |

Os estados de formulário são apenas uma antecipação de sistema. O briefing em `/start`, seus campos e suas interações não devem ser implementados nesta fase.

## 17. Arquitetura de tokens

O design system deve concentrar decisões em tokens, evitando valores arbitrários espalhados pela futura implementação.

```text
color.*
space.*
type.*
radius.*
motion.*
breakpoint.*
container.*
```

Essa arquitetura deve permitir ajustes centralizados de identidade, tipografia, ritmo, responsividade e superfícies sem reescrever decisões locais. Tokens semânticos devem ser preferidos aos valores diretos, especialmente em cores e estados.

## 18. Blacklist visual

Os seguintes padrões são proibidos:

- glassmorphism pesado;
- gradientes decorativos;
- glow;
- sombras grandes;
- excesso de cards;
- blob backgrounds;
- ícones decorativos desnecessários;
- emojis como elemento visual;
- efeitos 3D sem função;
- cursores customizados;
- scroll hijacking;
- carrossel automático;
- splash screen;
- loader de entrada;
- autoplay visual;
- arredondamento excessivo;
- estética padrão de dashboard/SaaS.

## 19. Filosofia final

A experiência visual ideal da Fortunato Brands segue esta ordem:

1. silêncio visual;
2. trabalho;
3. critério;
4. confiança;
5. conversão.

O site não deve parecer estar vendendo agressivamente desde o primeiro segundo. O portfólio, a precisão da apresentação e a clareza da experiência devem realizar grande parte da persuasão.
