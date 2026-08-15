# Especificação de implementação

Documento operacional para a Fase 9. Detalhes editoriais, visuais e técnicos permanecem nas fontes de verdade desta pasta.

## Escopo e rotas

- Locales públicos: `pt` e `en` (`pt-BR` é o locale interno de `/pt`).
- Rotas: `/[locale]`, `/[locale]/projects`, `/[locale]/projects/[slug]`, `/[locale]/services`, `/[locale]/about`, `/[locale]/start` e `/[locale]/privacy`.
- API futura: `POST /api/briefing`.
- Home, páginas institucionais e cases devem ser estáticos sempre que possível; `/start` é uma casca estática com fluxo interativo isolado. A API é server-side e sem cache.

## Home e navegação

Ordem fixa da Home:

1. Header
2. Hero
3. Projetos selecionados
4. Manifesto
5. Identidade Visual
6. Rebranding
7. Websites
8. Processo
9. Depoimentos, somente se aprovados
10. Sobre
11. CTA final
12. Footer

Projetos: **Sublime Mel** é o principal; depois, `enveiro_` e Palomo Odontologia. No desktop, manter hero editorial assimétrico, Sublime Mel em destaque e os dois demais como composição secundária; no mobile, uma coluna e projetos empilhados. O processo vira quatro colunas quando houver espaço e vertical no mobile.

Em `/projects`, dar protagonismo visual aos cases. Em `/services`, preservar a prioridade: Identidade Visual, Rebranding e Websites. Em `/about`, comunicar modelo boutique, presença autoral, proximidade e condução criteriosa. `/privacy` deve receber apenas estrutura até existir política aprovada.

## Cases e dados

Cada case pode conter, conforme conteúdo real: Header do projeto, hero visual, contexto, desafio, estratégia/direção, identidade, aplicações, resultado/presença real, depoimento, próximo projeto e CTA final. Omitir qualquer seção sem evidência.

Dados mínimos por projeto: `slug`, nome, segmento, serviços, imagem principal, ordem, resumo, seções editoriais e próximo projeto. Manter os slugs em ambos os idiomas: `sublime-mel`, `enveiro` e `palomo-odontologia`. Encadeamento: Sublime Mel → enveiro → Palomo Odontologia → Sublime Mel.

Campos opcionais permanecem ausentes. Todo `CONTENT_REQUIRED` é pendência: omitir em produção e usar placeholder técnico apenas em desenvolvimento. Não inventar copy, métricas, aplicações, resultados, estratégia ou depoimentos.

## Conteúdo e componentes

- Separar conteúdo/apresentação: copy pública e mensagens vêm da camada de conteúdo/i18n; componentes não duplicam textos nem metadata.
- Usar Server Components por padrão. Client Components apenas para menu mobile, `BriefingFlow` e controles realmente interativos.
- Grupos de componentes previstos: `layout` (Header, Footer, Container), `home` (Hero, Projects, Services, Process, Testimonials, About, FinalCTA), `projects` (ProjectCard, CaseHeader, CaseSections, NextProject) e `briefing` (BriefingFlow, BriefingField, BriefingReview).
- Só criar componentes adicionais diante de repetição real ou responsabilidade clara.

## Briefing

Sequência: Introdução → Sobre você → Sobre o negócio → Necessidade → Contexto → Prazo e investimento → Contato → Revisão → Sucesso.

Regras condicionais: nova marca pergunta sobre naming; identidade visual pergunta se já há logo; rebranding pergunta o motivo; website pergunta o tipo; data específica pergunta a data. O usuário avança, volta, corrige, revisa e, em erro, tenta novamente sem perder dados.

Estados necessários: menu `open|closed`; briefing `editing|submitting|success|error`; campo `default|focus|invalid|disabled`. A validação canônica deve existir no servidor e pode ser reutilizada no cliente; não confiar somente no cliente. A rota deve validar, proteger contra spam, normalizar, encaminhar/persistir e retornar sucesso ou erro seguro.

## Qualidade de implementação

- HTML semântico, um `h1` por página, skip link, foco visível, teclado, labels, contraste AA, alvos de toque confortáveis, alt em imagens relevantes e `prefers-reduced-motion`.
- Menu móvel deve ser acessível e tratar foco de forma previsível.
- Toda página indexável permite title, description, canonical, Open Graph e alternates `hreflang`; incluir sitemap, `robots.txt` e metadata individual dos cases.
- Priorizar pouco JavaScript, imagens otimizadas, conteúdo estático e CSS para microinterações. Evitar bibliotecas pesadas e breakpoints em excesso.

## Ordem da Fase 9

1. Setup e estrutura
2. Tokens e estilos globais
3. i18n e conteúdo
4. Header/footer
5. Home
6. Projects e cases
7. Services e about
8. Briefing
9. API do briefing
10. SEO, acessibilidade e QA técnico

Fora do MVP: CMS, autenticação, dashboard, Redux, e-commerce, uploads, PWA, chat, animações complexas, biblioteca grande de UI e abstrações antecipadas.

## Aceite

A implementação deve respeitar as fontes de verdade, manter Identidade Visual como oferta principal e os cases como prova central, funcionar em mobile e desktop, completar o briefing ponta a ponta e passar build, typecheck e lint sem dependências ou abstrações injustificadas.
