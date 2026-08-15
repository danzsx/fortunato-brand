# Briefing dinâmico e funil de conversão — Fortunato Brands

> Arquitetura conceitual para a futura rota `/start`. Este documento não implementa interface, formulário, persistência, banco de dados ou integrações.

## 1. Papel da experiência

O briefing progressivo conduz um potencial cliente, com clareza e baixo atrito, até uma solicitação de projeto qualificada. Ele deve cumprir simultaneamente três funções:

- reduzir a fricção de iniciar uma conversa comercial;
- reunir o contexto suficiente para uma avaliação inicial;
- demonstrar organização, critério e proximidade já no primeiro contato.

Não é um formulário administrativo, uma página de CRM nem um questionário longo. Deve ser entendido como uma continuação natural da experiência editorial e premium da Fortunato Brands.

Princípio central:

> Perguntar apenas aquilo que ajuda a entender, qualificar ou iniciar o projeto.

Todos os CTAs globais **Começar um projeto** devem levar futuramente a `/start`.

## 2. Jornada e estrutura

O fluxo é progressivo: uma etapa agrupa poucas perguntas relacionadas, sem transformar cada campo em uma tela obrigatória. A indicação de avanço deve reduzir ansiedade, com tratamento discreto — por exemplo, `02 / 06` e/ou uma barra sutil —, sem gamificação, pontos, porcentagens chamativas ou grandes animações.

| Estado / etapa | Objetivo | Saída principal |
| --- | --- | --- |
| 00 — Introdução | Acolher e contextualizar | Início consciente do briefing |
| 01 — Sobre você | Identificar quem está em contato | Nome e papel |
| 02 — Sobre o negócio | Entender empresa e momento | Segmento, estágio e presença |
| 03 — O que você precisa | Identificar a demanda e seus desdobramentos | Necessidade principal e dados condicionais |
| 04 — Contexto do projeto | Entender motivação e resultado esperado | Contexto útil para a conversa |
| 05 — Prazo e investimento | Qualificar contexto comercial sem rejeição automática | Expectativa de prazo e faixa de investimento |
| 06 — Contato e revisão | Viabilizar retorno e confirmar as informações | Dados de contato, consentimento e envio |
| 07 — Sucesso | Confirmar o recebimento com sobriedade | Próximo passo claro, sem promessas |

### 2.1 Introdução

Antes da primeira pergunta, apresentar uma abertura breve, em direção a:

```text
Vamos conhecer o seu projeto.

Algumas perguntas rápidas ajudam a entender
o momento da sua marca e o que você precisa.
```

A copy é conceitual e poderá ser refinada. Ações disponíveis: **Começar** e, de forma discreta, **Voltar ao site**.

## 3. Perguntas por etapa

### 3.1 Etapa 01 — Sobre você

| Campo | Pergunta / opções | Regra |
| --- | --- | --- |
| `personal.name` | Como podemos te chamar? | Texto; obrigatório. |
| `personal.role` | Qual é o seu papel no negócio? | Opcional ou recomendado: Fundador(a) / proprietário(a), Sócio(a), Marketing / comunicação, Outro. |
| `personal.roleOther` | Qual? | Texto curto opcional, exibido apenas para `role = other`. Não exigir cargo detalhado. |

### 3.2 Etapa 02 — Sobre o negócio

| Campo | Pergunta / opções | Regra |
| --- | --- | --- |
| `business.name` | Qual é o nome do seu negócio? | Obrigatório quando o negócio já tem nome. Oferecer **Ainda não temos um nome**. |
| `business.hasName` | Derivado da resposta acima | Quando falso, o nome deixa de ser obrigatório. |
| `business.segment` | Em que segmento seu negócio atua? | Texto ou sugestões com entrada livre; obrigatório. Não usar uma lista rígida e extensa de setores. |
| `business.stage` | Em que momento o negócio está? | Obrigatório: Estou começando agora; Já estamos em operação; Estamos crescendo; A empresa já está consolidada. |
| `business.presence` | Onde sua marca já está presente? | Opcional, múltipla escolha: Instagram / redes sociais; Loja física; E-commerce; Website; Marketplace; Ainda não está no mercado; Outro. |
| `business.presenceOther` | Onde mais? | Texto curto, somente se `presence` incluir `other`. |

### 3.3 Etapa 03 — O que você precisa

Pergunta principal: **Como podemos ajudar?**

Escolha única obrigatória:

- Criar uma marca do zero (`new-brand`)
- Criar ou melhorar minha identidade visual (`visual-identity`)
- Fazer um rebranding (`rebranding`)
- Criar um website (`website`)
- Ainda não tenho certeza (`unsure`)

Não usar linguagem técnica. As perguntas adicionais dependem da necessidade selecionada:

| Condição | Pergunta | Opções / comportamento |
| --- | --- | --- |
| `new-brand` | Seu negócio já tem nome? | Sim; Não; Ainda estou decidindo. `Não` registra potencial interesse em naming, sem confirmar contratação. |
| `visual-identity` | Você já possui um logotipo? | Sim; Não; Tenho algo provisório. Se houver material anterior, futuro upload ou link pode ser oferecido como opcional; nunca exigido nesta etapa. |
| `rebranding` | O que motivou a mudança? | Múltipla escolha: a marca parece desatualizada; o negócio mudou; o público mudou; estamos profissionalizando a empresa; a identidade não representa mais a qualidade do negócio; queremos reposicionar a marca; outro. |
| `website` | Qual tipo de site você imagina? | Site institucional; Landing page; Portfólio; Ainda não sei; Outro. E-commerce não é apresentado como serviço confirmado; `Outro` registra pedidos para avaliação manual. |

Para `rebrandingReasons` contendo `other` e `websiteType = other`, exibir campo textual curto correspondente. A ausência de condição não pode bloquear o avanço.

### 3.4 Etapa 04 — Contexto do projeto

| Campo | Pergunta | Regra |
| --- | --- | --- |
| `project.motivation` | O que fez você procurar ajuda agora? | Textarea obrigatória, acolhedora e simples. Limite conceitual: aproximadamente 1.000–1.500 caracteres; não exigir texto longo. |
| `project.desiredChange` | O que você gostaria que mudasse depois desse projeto? | Textarea opcional ou recomendado. Aceitar linguagem comum. |
| `project.references` | Existe alguma marca, estilo ou referência que você gosta? | Opcional; aceitar texto e URLs. Upload poderá existir no futuro, mas não é necessário. Não ter referências não prejudica o envio. |

Não pedir arquétipo, essência de marca, brand equity, proposta de valor ou tom de voz como conhecimento obrigatório: esses pontos serão descobertos no projeto.

### 3.5 Etapa 05 — Prazo e investimento

**Prazo.** Pergunta: **Existe alguma data importante para este projeto?**

- Não tenho uma data específica (`no-specific-date`)
- Até 1 mês (`within-one-month`)
- 1–2 meses (`one-two-months`)
- 2–3 meses (`two-three-months`)
- Mais de 3 meses (`more-than-three-months`)
- Tenho uma data específica (`specific-date`)

Ao escolher data específica, exibir seletor de data. A resposta representa uma expectativa do cliente, não uma promessa de entrega.

**Investimento.** Pergunta recomendada: **Você já definiu um investimento para este projeto?** Microcopy opcional: *Isso nos ajuda a entender o escopo adequado para o seu momento.*

- Ainda não defini (`undefined`)
- Até R$ 2.000 (`under-2000`)
- R$ 2.000–R$ 4.000 (`2000-4000`)
- R$ 4.000–R$ 7.000 (`4000-7000`)
- Acima de R$ 7.000 (`above-7000`)
- Prefiro conversar sobre isso (`prefer-discuss`)

Não exibir preços públicos nem usar “budget”. A faixa interna atual de referência é R$ 2.000–R$ 4.000, mas nenhuma faixa — inclusive até R$ 2.000 — interrompe, rejeita ou impede o envio. A informação serve exclusivamente para qualificação e preparação da conversa.

### 3.6 Etapa 06 — Contato e revisão

| Campo | Pergunta / opções | Regra |
| --- | --- | --- |
| `contact.email` | E-mail | Tipo `email`; obrigatório. |
| `contact.phone` | WhatsApp / telefone | Tipo `tel`; recomendado e compatível com número brasileiro. Não obrigatório quando a pessoa prefere e-mail. |
| `contact.preferredChannel` | Como prefere que entremos em contato? | Obrigatório: WhatsApp; E-mail; Tanto faz. |
| `contact.businessProfile` | Instagram ou website da empresa | Opcional; aceitar URL, `@username` ou texto simples. |
| `contact.source` | Como você conheceu a Fortunato Brands? | Opcional: Instagram; Behance; Google; Indicação; Vi um projeto da Fortunato; Outro. Uso futuro para analytics comercial. |
| `contact.sourceOther` | Como? | Texto curto, exibido apenas para `source = other`. |
| `consent.privacyAccepted` | Consentimento de privacidade | Obrigatório, desmarcado por padrão, com link futuro para Política de Privacidade. |

Texto de consentimento:

```text
Li e concordo com o uso das informações enviadas
para análise e contato sobre este projeto.
```

Antes do envio, oferecer revisão resumida nos grupos **Seu negócio**, **Projeto**, **Prazo**, **Investimento** e **Contato**, com ação **Editar** para cada grupo. A revisão não deve despejar todos os textos em uma página longa. CTA preferencial: **Enviar projeto**.

## 4. Lógica condicional e integridade do rascunho

```text
primaryNeed = new-brand        → perguntar namingStatus
primaryNeed = visual-identity  → perguntar existingLogo
primaryNeed = rebranding       → perguntar rebrandingReasons
primaryNeed = website          → perguntar websiteType
timeline = specific-date       → perguntar specificDate
role = other                   → perguntar roleOther
presence inclui other          → perguntar presenceOther
websiteType = other            → perguntar websiteTypeOther
source = other                 → perguntar sourceOther
```

Campos condicionais ocultos não participam da validação. Se uma resposta anterior mudar e tornar uma resposta condicional irrelevante, a implementação futura deve tratar essa persistência de forma previsível: preferencialmente limpar o valor derivado antes da submissão ou mantê-lo apenas no rascunho, nunca apresentando-o como resposta ativa na revisão.

## 5. Navegação, validação e acessibilidade

As ações entre etapas são **Continuar** e **Voltar**. Voltar não apaga dados e permite correções. O envio final só é possível com os campos obrigatórios válidos:

- nome da pessoa;
- segmento;
- estágio do negócio;
- necessidade principal;
- contexto / motivo do projeto;
- e-mail;
- consentimento de privacidade.

O nome do negócio deixa de ser obrigatório quando **Ainda não temos um nome** estiver selecionado.

Validação é contextual: não exibir erros antes de interação. Estados conceituais de campo: `idle`, `focused`, `completed`, `invalid`, `disabled`. As mensagens devem ser humanas e específicas, como **Digite um e-mail válido.**, nunca mensagens genéricas ou técnicas.

A futura experiência deve funcionar integralmente por teclado: tabulação lógica, foco visível, foco movido de forma previsível ao trocar de etapa, erros anunciáveis por tecnologias assistivas e nenhum envio acidental via Enter antes da etapa final.

## 6. Estados da experiência e submissão

Fluxo principal:

```text
intro → editing → review → submitting → success
```

Caminho de falha:

```text
submitting → error → editing / retry
```

| Estado | Comportamento |
| --- | --- |
| `idle` | Briefing disponível para preenchimento. |
| `submitting` | Impedir envio duplicado, manter feedback visual e preservar respostas. Mensagem conceitual: **Enviando…** |
| `success` | Exibir confirmação simples: “Projeto enviado. Obrigado por compartilhar essas informações. Vamos analisar o contexto antes do primeiro contato.” Disponibilizar **Voltar ao site** e **Ver projetos**. Não prometer prazo de resposta ou abrir WhatsApp automaticamente. |
| `error` | Preservar todas as respostas. Informar: “Não foi possível enviar seu projeto agora. Suas respostas continuam aqui. Tente novamente.” Oferecer nova tentativa sem detalhes técnicos. |

Como requisito desejável, preservar temporariamente o progresso entre etapas (por exemplo, por `sessionStorage` ou mecanismo equivalente). A decisão técnica não pertence a esta fase; dados não devem ser mantidos indefinidamente. Não usar modal agressivo de saída: a persistência temporária deve reduzir essa necessidade.

## 7. Comportamento responsivo e tratamento visual

O briefing é mobile-first: uma coluna, campos largos, alvos de toque confortáveis, CTA alcançável, teclado apropriado para cada tipo de campo, sem modais desnecessários, grids apertados ou scroll horizontal. Ações persistentes não podem conflitar com o teclado virtual.

No desktop, preservar a concentração com conteúdo principal entre 600–760px e espaço negativo generoso; não espalhar os campos para ocupar toda a largura disponível.

Seguir integralmente o [design system](./design-system.md): fundo neutro, tipografia dominante, campos simples, bordas sutis e cor de acento apenas para foco e feedback. Evitar cards por pergunta, ícones em todas as opções, ilustrações decorativas, barra de progresso colorida grande e qualquer gamificação.

## 8. Privacidade, segurança e anti-spam

O consentimento explícito e desmarcado é obrigatório antes da submissão. A futura implementação deve observar LGPD e coletar apenas dados necessários ao contato e à análise do projeto.

Requisitos conceituais de segurança:

- não confiar exclusivamente na validação client-side; validar novamente no servidor;
- não aceitar HTML arbitrário;
- limitar tamanho de campos e payload;
- normalizar URLs quando necessário;
- não registrar dados sensíveis desnecessários em logs;
- não pedir dados financeiros sensíveis.

Requisitos futuros de proteção contra abuso: honeypot, rate limiting, validação server-side, sanitização e proteção contra automação. Evitar CAPTCHA visual quando alternativas menos intrusivas forem suficientes. A decisão técnica é posterior (Fase 7).

## 9. Analytics e medição do funil

Eventos conceituais:

```text
briefing_started
briefing_step_completed
briefing_back
briefing_validation_error
briefing_submitted
briefing_submission_error
```

Analytics mede comportamento, não conteúdo pessoal. Não enviar como propriedades de eventos nome, e-mail, telefone ou qualquer resposta de texto livre. A futura solução deve permitir medir início, abandono por etapa e conclusão, sem manipular a saída do usuário nem usar dark patterns.

## 10. Modelo conceitual de dados

```ts
type BriefingDraft = {
  personal: {
    name: string
    role?: "owner" | "partner" | "marketing" | "other"
    roleOther?: string
  }
  business: {
    name?: string
    hasName: boolean
    segment: string
    stage: "starting" | "operating" | "growing" | "established"
    presence?: ("social" | "physical-store" | "ecommerce" | "website" | "marketplace" | "not-launched" | "other")[]
    presenceOther?: string
  }
  project: {
    primaryNeed: "new-brand" | "visual-identity" | "rebranding" | "website" | "unsure"
    namingStatus?: "has-name" | "needs-name" | "deciding"
    existingLogo?: "yes" | "no" | "temporary"
    rebrandingReasons?: string[]
    websiteType?: "institutional" | "landing-page" | "portfolio" | "unsure" | "other"
    websiteTypeOther?: string
    motivation: string
    desiredChange?: string
    references?: string
  }
  planning: {
    timeline: "no-specific-date" | "within-one-month" | "one-two-months" | "two-three-months" | "more-than-three-months" | "specific-date"
    specificDate?: string
    investment: "undefined" | "under-2000" | "2000-4000" | "4000-7000" | "above-7000" | "prefer-discuss"
  }
  contact: {
    email: string
    phone?: string
    preferredChannel: "whatsapp" | "email" | "either"
    businessProfile?: string
    source?: "instagram" | "behance" | "google" | "referral" | "project" | "other"
    sourceOther?: string
  }
  consent: { privacyAccepted: boolean }
}

type BriefingSubmission = {
  id: string
  submittedAt: string
  locale: "pt-BR" | "en"
  status: "new"
  data: BriefingDraft
}
```

São tipos conceituais: não definem schema real, formato de ID, banco ou contrato de API.

## 11. Internacionalização e qualificação futura

O briefing deverá existir em `pt-BR` e `en`. Labels, opções, microcopy, validações e estados de sucesso/erro devem vir de uma camada de conteúdo internacionalizável; os valores internos dos enums permanecem independentes do idioma. Não traduzir as mensagens nesta fase.

No futuro, o sistema poderá atribuir um `fit` interno (`high`, `medium`, `low`) para apoiar a análise comercial. Essa classificação nunca é mostrada ao usuário, não deve ser implementada agora e não pode rejeitar automaticamente um lead apenas pelo investimento.

Possíveis sinais para análise humana futura: tipo de projeto, estágio do negócio, investimento, prazo, clareza da necessidade e alinhamento com os serviços oferecidos. Não incluir características pessoais irrelevantes. Solicitações fora do escopo — como e-commerce completo — ainda podem ser enviadas e devem seguir para avaliação manual, sem promessa automática de atendimento.

## 12. Critérios de sucesso

A experiência estará bem resolvida quando a pessoa:

- entender cada pergunta sem dominar termos de branding;
- concluir o briefing com facilidade no celular;
- souber quanto falta e puder voltar para corrigir respostas;
- receber feedback claro sem perder conteúdo em caso de erro;
- perceber uma experiência coerente com uma boutique de branding.

Para a Fortunato Brands, o resultado deve oferecer contexto suficiente para avaliar aderência e preparar um primeiro contato com critério, clareza e respeito.
