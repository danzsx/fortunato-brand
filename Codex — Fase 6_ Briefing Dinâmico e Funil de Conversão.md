Considere os seguintes documentos como fontes de verdade:

- `/docs/brand-foundation.md`
- `/docs/information-architecture.md`
- `/docs/design-system.md`
- `/docs/home-wireframe.md`
- `/docs/case-study-architecture.md`

Nesta etapa, NÃO implemente frontend.

NÃO crie componentes React.
NÃO crie CSS.
NÃO implemente formulários funcionais.
NÃO configure banco de dados.
NÃO instale dependências.
NÃO implemente integrações externas.

Sua tarefa é criar:

`/docs/briefing-funnel.md`

O objetivo deste documento é definir integralmente a arquitetura de UX, qualificação, conteúdo, lógica condicional, validação, estados e modelo conceitual de dados da futura rota:

`/start`

Essa experiência deve funcionar como um briefing progressivo de alta qualidade, conduzindo o potencial cliente de forma simples até uma solicitação de projeto qualificada.

---

# 1. Objetivo do briefing

O briefing possui três funções simultâneas:

1. reduzir fricção para quem quer contratar;
2. coletar informações suficientes para avaliar o projeto;
3. transmitir profissionalismo durante o primeiro contato.

O formulário NÃO deve parecer:

- formulário administrativo;
- questionário interminável;
- formulário genérico de contato;
- processo burocrático;
- página de CRM.

Deve parecer uma continuação natural da experiência premium e editorial da Fortunato Brands.

---

# 2. Princípio central de UX

Registrar:

> Perguntar apenas aquilo que ajuda a entender, qualificar ou iniciar o projeto.

Evitar perguntas apenas porque são comuns em briefings de agências.

Cada pergunta deve possuir uma finalidade clara.

---

# 3. Entrada na experiência

Todos os CTAs globais:

`Começar um projeto`

devem futuramente levar à rota:

`/start`

Ao entrar, apresentar uma introdução curta antes da primeira pergunta.

Direção conceitual:

```text
Vamos conhecer o seu projeto.

Algumas perguntas rápidas ajudam a entender
o momento da sua marca e o que você precisa.
```

A copy ainda não é definitiva.

CTA:

`Começar`

Permitir também:

`Voltar ao site`

de maneira discreta.

---

# 4. Arquitetura geral do fluxo

Definir um fluxo progressivo em aproximadamente 6 etapas.

Estrutura conceitual:

```text
00 Introdução
01 Sobre você
02 Sobre o negócio
03 O que você precisa
04 Contexto do projeto
05 Prazo e investimento
06 Contato e revisão
07 Sucesso
```

Não transformar cada pergunta individual em uma página obrigatoriamente.

Uma etapa pode conter poucas perguntas relacionadas.

---

# 5. Progress indicator

Exibir progresso de maneira discreta.

Exemplos aceitáveis:

```text
02 / 06
```

ou uma barra muito sutil.

Evitar:

- gamificação;
- porcentagem excessivamente chamativa;
- animações grandes;
- confete;
- sistema de pontos.

O progresso deve reduzir ansiedade, não chamar atenção para si.

---

# 6. Etapa 1 — Sobre você

Objetivo:

identificar a pessoa responsável pelo contato.

Campos:

## Nome

Obrigatório.

Tipo:

`text`

Pergunta conceitual:

`Como podemos te chamar?`

---

## Papel no negócio

Opcional ou recomendável.

Opções conceituais:

- Fundador(a) / proprietário(a)
- Sócio(a)
- Marketing / comunicação
- Outro

Se:

`Outro`

permitir campo textual curto opcional.

Não solicitar cargo excessivamente específico.

---

# 7. Etapa 2 — Sobre o negócio

Objetivo:

entender a empresa e seu estágio.

## Nome da empresa

Obrigatório quando já existir.

Pergunta:

`Qual é o nome do seu negócio?`

Permitir opção:

`Ainda não temos um nome.`

Essa opção é especialmente importante porque a Fortunato também pode atuar em naming.

---

## Segmento

Obrigatório.

Tipo conceitual:

`text`

ou combinação de sugestões + entrada livre.

Não criar uma lista enorme e rígida de setores.

---

## Estágio do negócio

Obrigatório.

Opções:

```text
Estou começando agora
Já estamos em operação
Estamos crescendo
A empresa já está consolidada
```

A linguagem final pode ser refinada posteriormente.

---

## Presença atual

Pergunta opcional:

`Onde sua marca já está presente?`

Multi-select:

- Instagram / redes sociais
- Loja física
- E-commerce
- Website
- Marketplace
- Ainda não está no mercado
- Outro

Essa informação pode ajudar a prever aplicações futuras.

---

# 8. Etapa 3 — O que você precisa

Esta é uma das etapas mais importantes.

Pergunta:

`Como podemos ajudar?`

Permitir seleção principal entre:

```text
Criar uma marca do zero
Criar ou melhorar minha identidade visual
Fazer um rebranding
Criar um website
Ainda não tenho certeza
```

Não exibir linguagem excessivamente técnica.

---

# 9. Lógica condicional — criação de marca

Quando o usuário escolher:

`Criar uma marca do zero`

perguntar:

`Seu negócio já tem nome?`

Opções:

```text
Sim
Não
Ainda estou decidindo
```

Se:

`Não`

registrar potencial interesse em:

`Naming`

Não transformar essa seleção automaticamente em contratação confirmada.

---

# 10. Lógica condicional — identidade visual

Quando escolher:

`Criar ou melhorar minha identidade visual`

perguntar:

`Você já possui um logotipo?`

Opções:

```text
Sim
Não
Tenho algo provisório
```

Se houver identidade anterior, permitir futuramente upload ou link como recurso opcional.

Não exigir arquivo nesta etapa.

---

# 11. Lógica condicional — rebranding

Quando selecionar:

`Fazer um rebranding`

perguntar:

`O que motivou a mudança?`

Permitir seleção múltipla:

- a marca parece desatualizada;
- o negócio mudou;
- o público mudou;
- estamos profissionalizando a empresa;
- a identidade não representa mais a qualidade do negócio;
- queremos reposicionar a marca;
- outro.

Se:

`Outro`

mostrar campo textual.

---

# 12. Lógica condicional — website

Quando selecionar:

`Criar um website`

perguntar:

`Qual tipo de site você imagina?`

Opções:

```text
Site institucional
Landing page
Portfólio
Ainda não sei
Outro
```

Não incluir e-commerce como serviço confirmado sem autorização posterior.

Se necessário, permitir que `Outro` capture solicitações fora do escopo.

---

# 13. Etapa 4 — Contexto do projeto

Objetivo:

entender necessidades sem exigir que o cliente conheça branding.

## Pergunta principal

`O que fez você procurar ajuda agora?`

Tipo:

`textarea`

Obrigatória.

Essa pergunta deve ser apresentada de maneira acolhedora e simples.

Limite conceitual:

aproximadamente 1.000–1.500 caracteres.

Não exigir texto longo.

---

## Objetivo percebido

Pergunta:

`O que você gostaria que mudasse depois desse projeto?`

Tipo:

`textarea`

Pode ser opcional ou recomendado.

O cliente pode responder em linguagem comum.

Não solicitar:

- arquétipo;
- essência de marca;
- brand equity;
- proposta de valor;
- tom de voz;

como conhecimentos obrigatórios.

Esses conceitos devem ser descobertos posteriormente durante o projeto.

---

# 14. Referências

Pergunta opcional:

`Existe alguma marca, estilo ou referência que você gosta?`

Permitir:

- texto;
- URLs;
- eventualmente upload futuro.

Não obrigar referência visual.

Registrar que ausência de referência não prejudica submissão.

---

# 15. Etapa 5 — Prazo

Pergunta:

`Existe alguma data importante para este projeto?`

Opções:

```text
Não tenho uma data específica
Até 1 mês
1–2 meses
2–3 meses
Mais de 3 meses
Tenho uma data específica
```

Se:

`Tenho uma data específica`

mostrar seletor de data.

A data deve ser interpretada como expectativa do cliente, não promessa de entrega.

---

# 16. Investimento

A Fortunato Brands NÃO exibirá preços publicamente nesta fase.

Entretanto, o briefing deve permitir qualificação financeira.

Pergunta recomendada:

`Você já definiu um investimento para este projeto?`

Opções conceituais:

```text
Ainda não defini
Até R$ 2.000
R$ 2.000–R$ 4.000
R$ 4.000–R$ 7.000
Acima de R$ 7.000
Prefiro conversar sobre isso
```

Importante:

o ticket comercial interno atual da Fortunato Brands é aproximadamente:

`R$ 2.000–R$ 4.000`

Mas o formulário não deve rejeitar automaticamente usuários abaixo ou acima dessa faixa.

A resposta serve para qualificação e preparação da conversa.

Não utilizar linguagem como:

`Qual seu budget?`

Preferir português natural.

---

# 17. Tratamento de leads abaixo da faixa

Se o usuário escolher:

`Até R$ 2.000`

NÃO interromper o formulário.

NÃO mostrar mensagem de rejeição.

NÃO impedir envio.

Registrar internamente a faixa.

A análise comercial será feita posteriormente.

A experiência deve continuar respeitosa.

---

# 18. Etapa 6 — Contato

Campos obrigatórios:

## E-mail

Tipo:

`email`

Obrigatório.

---

## WhatsApp / telefone

Tipo:

`tel`

Recomendado.

Permitir telefone brasileiro.

Não exigir WhatsApp se o usuário preferir contato por e-mail.

---

## Preferência de contato

Opções:

```text
WhatsApp
E-mail
Tanto faz
```

---

## Instagram ou website da empresa

Opcional.

Aceitar:

- URL;
- @username;
- texto simples.

Não exigir que o cliente possua redes sociais.

---

# 19. Como conheceu a Fortunato

Pergunta opcional:

`Como você conheceu a Fortunato Brands?`

Opções:

- Instagram
- Behance
- Google
- Indicação
- Vi um projeto da Fortunato
- Outro

Essa informação serve para analytics comercial.

---

# 20. Revisão antes do envio

Antes da submissão final, permitir uma etapa de revisão resumida.

Mostrar grupos como:

```text
Seu negócio
Projeto
Prazo
Investimento
Contato
```

Permitir:

`Editar`

cada grupo.

Não exibir todos os textos em uma página excessivamente longa.

Objetivo:

reduzir erros antes do envio.

---

# 21. CTA final de envio

Evitar:

`Submit`

ou:

`Enviar formulário`

Preferir direção como:

`Enviar projeto`

ou:

`Enviar briefing`

Escolha preferencial conceitual:

`Enviar projeto`

A copy definitiva poderá ser refinada posteriormente.

---

# 22. Estado de submissão

Documentar:

```text
idle
submitting
success
error
```

## Submitting

- desabilitar duplicação de envio;
- manter feedback visual;
- não limpar dados antecipadamente.

Mensagem conceitual:

`Enviando...`

---

## Success

A tela de sucesso deve ser elegante e simples.

Direção:

```text
Projeto enviado.

Obrigado por compartilhar essas informações.
Vamos analisar o contexto antes do primeiro contato.
```

Não prometer prazo específico de resposta nesta fase.

Possíveis ações:

```text
Voltar ao site
Ver projetos
```

Não abrir WhatsApp automaticamente.

---

## Error

Não apagar respostas preenchidas.

Mensagem:

```text
Não foi possível enviar seu projeto agora.

Suas respostas continuam aqui.
Tente novamente.
```

Permitir retry.

Evitar mensagens técnicas.

---

# 23. Salvamento de progresso

Documentar como requisito desejável:

o usuário não deve perder facilmente o progresso ao navegar entre as etapas.

Para futura implementação, considerar persistência temporária em:

`sessionStorage`

ou mecanismo equivalente.

Não decidir implementação técnica final nesta fase.

Não armazenar dados indefinidamente sem necessidade.

---

# 24. Navegação entre etapas

Permitir:

`Continuar`

e:

`Voltar`

O botão Voltar não deve apagar respostas.

Usuário deve poder corrigir respostas anteriores.

Não permitir envio final com campos obrigatórios inválidos.

---

# 25. Keyboard UX

Futura experiência deve funcionar integralmente por teclado.

Regras:

- ordem lógica de tabulação;
- Enter não deve causar envio acidental antes da etapa final;
- focus deve ser visível;
- mudanças de etapa devem mover foco de forma previsível;
- mensagens de erro devem ser anunciáveis por tecnologia assistiva.

---

# 26. Validação

Preferir validação contextual.

Não mostrar erros antes do usuário interagir.

Estados conceituais:

```text
idle
focused
completed
invalid
disabled
```

Mensagens devem explicar o problema.

Exemplo:

Preferir:

`Digite um e-mail válido.`

Evitar:

`Invalid input.`

---

# 27. Campos obrigatórios mínimos

Registrar como obrigatórios:

- nome da pessoa;
- segmento;
- estágio do negócio;
- necessidade principal;
- contexto/motivo do projeto;
- e-mail;
- consentimento de privacidade.

Nome da empresa pode deixar de ser obrigatório quando:

`Ainda não temos um nome`

for selecionado.

---

# 28. Privacidade

Antes da submissão final, incluir consentimento claro.

Direção:

```text
Li e concordo com o uso das informações enviadas
para análise e contato sobre este projeto.
```

Link para futura:

`Política de Privacidade`

Não usar checkbox previamente marcado.

Registrar que a futura implementação deverá considerar LGPD.

---

# 29. Anti-spam

Documentar requisitos conceituais futuros:

- honeypot;
- rate limiting;
- validação server-side;
- proteção contra submissões automatizadas;
- sanitização;
- limite de payload.

CAPTCHA visual deve ser evitado quando alternativas menos intrusivas forem suficientes.

A decisão técnica será feita na Fase 7.

---

# 30. Segurança dos dados

Registrar:

- nunca confiar apenas em validação client-side;
- validar novamente no servidor;
- não aceitar HTML arbitrário;
- limitar tamanho de campos;
- normalizar URLs quando necessário;
- não registrar dados sensíveis desnecessários em logs;
- não solicitar informações financeiras sensíveis.

---

# 31. Analytics do funil

Planejar eventos conceituais:

```text
briefing_started
briefing_step_completed
briefing_back
briefing_validation_error
briefing_submitted
briefing_submission_error
```

Não registrar conteúdo textual das respostas em analytics.

Não enviar:

- nome;
- e-mail;
- telefone;
- texto livre;

para sistemas analíticos como propriedades de evento.

Analytics deve medir comportamento, não conteúdo pessoal.

---

# 32. Drop-off

A futura solução deve permitir medir:

- quantos iniciam;
- em qual etapa abandonam;
- quantos concluem.

Não manipular usuários para impedir saída.

Não usar mensagens como:

`Você está quase perdendo sua oportunidade.`

---

# 33. Arquitetura conceitual de dados

Documentar:

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
    stage:
      | "starting"
      | "operating"
      | "growing"
      | "established"

    presence?: (
      | "social"
      | "physical-store"
      | "ecommerce"
      | "website"
      | "marketplace"
      | "not-launched"
      | "other"
    )[]

    presenceOther?: string
  }

  project: {
    primaryNeed:
      | "new-brand"
      | "visual-identity"
      | "rebranding"
      | "website"
      | "unsure"

    namingStatus?: "has-name" | "needs-name" | "deciding"

    existingLogo?: "yes" | "no" | "temporary"

    rebrandingReasons?: string[]

    websiteType?:
      | "institutional"
      | "landing-page"
      | "portfolio"
      | "unsure"
      | "other"

    websiteTypeOther?: string

    motivation: string
    desiredChange?: string
    references?: string
  }

  planning: {
    timeline:
      | "no-specific-date"
      | "within-one-month"
      | "one-two-months"
      | "two-three-months"
      | "more-than-three-months"
      | "specific-date"

    specificDate?: string

    investment:
      | "undefined"
      | "under-2000"
      | "2000-4000"
      | "4000-7000"
      | "above-7000"
      | "prefer-discuss"
  }

  contact: {
    email: string
    phone?: string
    preferredChannel:
      | "whatsapp"
      | "email"
      | "either"

    businessProfile?: string

    source?:
      | "instagram"
      | "behance"
      | "google"
      | "referral"
      | "project"
      | "other"

    sourceOther?: string
  }

  consent: {
    privacyAccepted: boolean
  }
}
```

Esses tipos são conceituais.

NÃO criar arquivos TypeScript nesta fase.

---

# 34. Modelo futuro de submissão

Documentar conceitualmente:

```ts
type BriefingSubmission = {
  id: string
  submittedAt: string
  locale: "pt-BR" | "en"
  status: "new"
  data: BriefingDraft
}
```

Não definir formato definitivo de ID ou banco de dados nesta fase.

---

# 35. Conditional field rules

Documentar explicitamente:

```text
primaryNeed = new-brand
→ perguntar namingStatus

primaryNeed = visual-identity
→ perguntar existingLogo

primaryNeed = rebranding
→ perguntar rebrandingReasons

primaryNeed = website
→ perguntar websiteType

timeline = specific-date
→ perguntar specificDate

role = other
→ perguntar roleOther

presence inclui other
→ perguntar presenceOther

websiteType = other
→ perguntar websiteTypeOther

source = other
→ perguntar sourceOther
```

Campos condicionais ocultos não devem bloquear validação.

Se uma resposta anterior mudar e tornar um campo condicional irrelevante, sua persistência deverá ser tratada de forma previsível na implementação futura.

---

# 36. Regras de conteúdo

Perguntas devem:

- ser curtas;
- usar linguagem humana;
- evitar jargão;
- fazer uma coisa por vez;
- explicar apenas quando necessário.

Microcopy pode ajudar em perguntas sensíveis.

Exemplo:

```text
Você já definiu um investimento?

Isso nos ajuda a entender o escopo adequado para o seu momento.
```

Não justificar todas as perguntas, pois isso adicionaria ruído.

---

# 37. Mobile

O briefing deve ser concebido prioritariamente para funcionar muito bem em smartphone.

Mobile:

- uma coluna;
- campos largos;
- alvos de toque confortáveis;
- CTA principal facilmente acessível;
- teclado correto por tipo de campo;
- sem modais desnecessários;
- sem scroll horizontal;
- sem grids apertados.

Não manter botões permanentemente sobre o teclado virtual de forma problemática.

---

# 38. Desktop

Desktop deve preservar foco.

Não utilizar todo o espaço disponível para espalhar campos.

Limitar largura do formulário.

Direção conceitual:

`600–760px`

para conteúdo principal.

Manter bastante espaço negativo.

---

# 39. Visual treatment

O briefing deve seguir integralmente:

`/docs/design-system.md`

Não criar linguagem visual paralela.

Manter:

- fundo neutro;
- tipografia dominante;
- campos simples;
- borders sutis;
- poucos elementos;
- accent color apenas para feedback e foco quando apropriado.

Evitar:

- cards para cada pergunta;
- ícones em todas as opções;
- ilustrações decorativas;
- barra colorida grande de progresso;
- gamificação.

---

# 40. Exit behavior

Se o usuário tentar sair após começar, não utilizar modal agressivo por padrão.

Persistência temporária deve reduzir a necessidade desse padrão.

Não utilizar dark patterns.

---

# 41. Internationalization

O briefing futuro deverá existir em:

- `pt-BR`
- `en`

Não traduzir textos nesta fase.

Registrar que:

- labels;
- opções;
- mensagens;
- validações;
- success/error states;

devem vir de camada de conteúdo internacionalizável.

Valores internos dos enums devem permanecer independentes do idioma.

---

# 42. Qualificação interna

O sistema poderá futuramente gerar uma classificação interna do lead.

Exemplo conceitual:

```text
fit:
high
medium
low
```

Porém:

NÃO mostrar essa classificação ao usuário.

NÃO rejeitar automaticamente um lead com base apenas no orçamento.

NÃO implementar scoring nesta fase.

Apenas registrar possibilidade arquitetural futura.

---

# 43. Critérios possíveis de qualificação futura

Podem incluir:

- tipo de projeto;
- estágio do negócio;
- investimento;
- prazo;
- clareza da necessidade;
- alinhamento com os serviços oferecidos.

Não incluir características pessoais irrelevantes.

---

# 44. Fora de escopo

Se o lead solicitar serviço fora do escopo, o formulário ainda pode ser enviado.

Exemplo:

pedido de e-commerce completo.

Registrar o pedido normalmente para avaliação manual.

Não prometer atendimento automático.

---

# 45. Arquitetura de estados da experiência

Documentar:

```text
intro
↓
editing
↓
review
↓
submitting
↓
success
```

Caminho de erro:

```text
submitting
↓
error
↓
editing/retry
```

Não perder dados durante erro.

---

# 46. Critérios de sucesso do briefing

A experiência futura será considerada bem resolvida quando:

- o usuário entende claramente cada pergunta;
- consegue concluir no celular sem esforço;
- sabe quanto falta;
- consegue voltar e corrigir respostas;
- não precisa conhecer termos de branding;
- recebe feedback claro de erro;
- não perde conteúdo facilmente;
- Fortunato recebe informações suficientes para avaliar o projeto;
- a experiência permanece coerente com uma boutique de branding.

---

# Resultado esperado

Criar somente:

`/docs/briefing-funnel.md`

O documento deve consolidar:

- jornada completa;
- etapas;
- perguntas;
- opções;
- lógica condicional;
- validação;
- estados;
- comportamento mobile e desktop;
- privacidade;
- segurança conceitual;
- anti-spam;
- analytics;
- modelo de dados;
- internacionalização;
- critérios futuros de qualificação.

Não implementar frontend.
Não implementar backend.
Não criar componentes.
Não criar schemas reais.
Não instalar dependências.
Não configurar banco.
Não integrar e-mail.
Não alterar a aplicação existente.