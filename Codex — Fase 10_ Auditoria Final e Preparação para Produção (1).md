Considere como fontes de verdade:

- `/docs/brand-foundation.md`
- `/docs/information-architecture.md`
- `/docs/design-system.md`
- `/docs/home-wireframe.md`
- `/docs/case-study-architecture.md`
- `/docs/briefing-funnel.md`
- `/docs/technical-architecture.md`
- `/docs/implementation-spec.md`

A aplicação já foi implementada na Fase 9.

Nesta fase, NÃO redesenhe o produto.
NÃO reestruture a arquitetura sem necessidade.
NÃO introduza novos recursos.
NÃO faça refactors amplos apenas por preferência pessoal.

O objetivo é auditar, corrigir e preparar o MVP para produção.

Princípio:

> corrigir problemas reais, não criar trabalho novo.

---

# 1. Auditoria visual

Revise a aplicação em desktop e mobile.

Verifique:

- hierarquia tipográfica;
- espaços;
- alinhamentos;
- consistência de grid;
- contraste;
- tamanho dos CTAs;
- proporção das imagens;
- ritmo entre seções;
- consistência entre Home, cases e páginas secundárias.

Corrija apenas inconsistências reais.

Não redesenhe se a implementação já estiver coerente com `/docs/design-system.md`.

---

# 2. Comparação com a estratégia

Confirme que o site ainda transmite:

- boutique de branding;
- presença autoral;
- elegância;
- clareza;
- proximidade;
- autoridade sem ostentação.

Verifique especialmente se:

- Identidade Visual continua sendo o serviço principal;
- cases continuam sendo a principal prova;
- Sublime Mel continua com maior destaque;
- Websites não transforma a Fortunato em software house;
- copy não virou linguagem genérica de agência.

---

# 3. Conteúdo

Procure por:

- texto fictício;
- lorem ipsum;
- placeholders;
- números não validados;
- depoimentos inventados;
- resultados inventados;
- `CONTENT_REQUIRED` publicado como conteúdo final.

Remova ou omita qualquer conteúdo não confirmado.

Não invente substitutos.

---

# 4. Responsividade

Teste visualmente pelo menos:

```text id="36pw5d"
375px
430px
768px
1024px
1440px
```

Não criar breakpoints novos sem necessidade.

Corrigir:

- overflow horizontal;
- imagens cortadas inadequadamente;
- títulos quebrando mal;
- espaçamento exagerado ou insuficiente;
- menu mobile;
- CTAs apertados;
- grids que deixam de funcionar.

---

# 5. Navegação

Verifique:

- logo → Home;
- Projetos;
- Serviços;
- Sobre;
- idiomas;
- todos os CTAs `Começar um projeto`;
- links dos cases;
- próximo projeto;
- footer;
- política de privacidade.

Não deixar links com:

```text id="yro1r7"
#
```

ou destinos inexistentes.

---

# 6. Internacionalização

Teste:

```text id="4dxdj6"
/pt
/en
```

Confirme:

- rotas funcionam;
- seletor de idioma funciona;
- links mantêm locale;
- cases funcionam nos dois idiomas;
- nenhuma copy portuguesa está hardcoded acidentalmente na interface inglesa;
- valores internos não dependem do idioma.

Se alguma tradução ainda estiver pendente, listar como blocker em vez de inventar copy.

---

# 7. Cases

Revise os três:

- Sublime Mel;
- enveiro_;
- Palomo Odontologia.

Confirme:

- ordem correta;
- mídia consistente;
- nenhuma seção vazia;
- conteúdo ausente é simplesmente omitido;
- Palomo não recebeu redesign indevido;
- narrativa não atribui estratégias inexistentes.

---

# 8. Briefing

Execute o fluxo completo para cada necessidade principal:

```text id="cgxgc0"
nova marca
identidade visual
rebranding
website
ainda não sei
```

Confirme as regras condicionais.

Teste:

- voltar;
- avançar;
- editar;
- revisão;
- campos obrigatórios;
- campos opcionais;
- erro;
- retry;
- sucesso;
- persistência temporária;
- limpeza após sucesso.

---

# 9. Validação

Teste entradas inválidas:

- e-mail incorreto;
- campos obrigatórios vazios;
- texto acima do limite;
- payload inesperado;
- data inválida;
- consentimento não marcado.

Confirme validação no servidor.

Não confiar apenas no frontend.

---

# 10. API

Revise `POST /api/briefing`.

Confirme:

- somente método esperado;
- validação server-side;
- honeypot;
- proteção contra abuso;
- limite de payload;
- erros seguros;
- nenhum stack trace exposto;
- nenhum segredo no client.

Não criar infraestrutura adicional se a atual já resolver isso adequadamente.

---

# 11. Leads

Confirme que o mecanismo configurado realmente recebe submissões.

Faça uma submissão de teste.

Verifique:

- os dados esperados chegaram;
- campos condicionais irrelevantes não foram enviados de forma contraditória;
- caracteres especiais funcionam;
- acentos funcionam;
- respostas longas não quebram o envio.

Se nenhum provedor real estiver configurado, marcar isso como blocker.

---

# 12. Privacidade

Confirme:

- consentimento não vem pré-marcado;
- política de privacidade está acessível;
- texto jurídico final existe antes de produção.

Se ainda houver texto provisório:

marcar lançamento como bloqueado.

Não gerar política jurídica definitiva nesta etapa.

---

# 13. Acessibilidade

Faça revisão prática.

Confirme:

- navegação por teclado;
- focus visível;
- skip link;
- menu mobile por teclado;
- Escape fecha menu;
- labels corretos;
- erros associados aos campos;
- headings coerentes;
- um `h1` principal por página;
- alt text útil;
- contraste AA;
- touch targets adequados;
- `prefers-reduced-motion`.

Corrija problemas concretos.

---

# 14. SEO

Confirme:

- title por página;
- description;
- canonical;
- hreflang;
- Open Graph;
- sitemap;
- robots.txt;
- metadata individual dos cases;
- domínio correto quando disponível.

Verifique se páginas de preview/staging não estão indexáveis.

Não adicionar estratégias avançadas de SEO nesta fase.

---

# 15. Performance

Verifique principalmente:

- imagens excessivamente grandes;
- JavaScript client-side desnecessário;
- fontes;
- scripts externos;
- layout shift;
- componentes marcados `"use client"` sem necessidade.

Remova desperdícios claros.

Não reescreva a aplicação para perseguir scores perfeitos.

Objetivos:

```text id="w19qkt"
LCP < 2.5s
INP < 200ms
CLS < 0.1
```

Tratar como metas, não como garantia em qualquer dispositivo/rede.

---

# 16. Dependências

Revise `package.json`.

Remova dependências:

- não utilizadas;
- duplicadas;
- adicionadas para recurso abandonado.

Não substituir bibliotecas funcionais apenas por preferência.

---

# 17. Código morto

Procure:

- componentes não usados;
- imports não usados;
- arquivos temporários;
- `console.log`;
- TODOs críticos;
- mocks de desenvolvimento;
- debug UI.

Remova o que claramente não pertence à produção.

---

# 18. Segurança básica

Revise:

- variáveis de ambiente;
- secrets;
- headers;
- CSP, se implementada;
- inputs;
- links externos;
- endpoint;
- logs.

Confirme que nenhum segredo foi commitado.

Não introduzir stack complexa de segurança além do necessário para este MVP.

---

# 19. Build

Execute:

```text id="hg92sw"
lint
typecheck
test
build
```

Use os comandos reais definidos no projeto.

Corrija todos os erros que impeçam produção.

Warnings relevantes também devem ser revisados.

---

# 20. Smoke test final

Faça manualmente o fluxo:

```text id="qzvru9"
Home
→ projeto
→ próximo projeto
→ Home
→ Serviços
→ Sobre
→ Começar um projeto
→ briefing
→ envio
→ sucesso
```

Repita ao menos em:

- desktop;
- mobile.

---

# 21. Produção

Antes de considerar pronto para deploy, confirme:

- domínio definido;
- environment variables;
- provedor de leads;
- política de privacidade;
- assets finais;
- traduções necessárias;
- analytics, se houver;
- sitemap;
- robots;
- SSL via host;
- formulário funcionando.

---

# 22. Não faça nesta fase

Não adicionar:

- CMS;
- blog;
- login;
- painel;
- upload;
- e-commerce;
- chat;
- agenda;
- pagamentos;
- PWA;
- nova linguagem visual;
- animações complexas;
- novos serviços;
- novos cases fictícios;
- novo framework;
- monorepo.

Se algo não for necessário para lançar o MVP, não faça.

---

# 23. Entrega final

Ao concluir, forneça apenas um relatório curto com:

## Corrigido

Principais problemas realmente encontrados e resolvidos.

## Validações

Resultados de:

```text id="gvtyqj"
lint
typecheck
tests
build
```

## Blockers de produção

Liste somente blockers reais ainda existentes.

## Variáveis necessárias

Liste somente environment variables realmente usadas.

## Status

Classifique como uma destas opções:

```text id="w5hpn8"
READY FOR PRODUCTION
READY WITH MINOR CONTENT BLOCKERS
NOT READY FOR PRODUCTION
```

Explique o motivo em poucas linhas.

Não criar nova documentação extensa sem necessidade.
Não redesenhar a aplicação.
Não adicionar funcionalidades fora do MVP.