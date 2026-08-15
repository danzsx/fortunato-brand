"use client";

import Link from "next/link";
import { useEffect, useState, useId } from "react";
import {
  briefingSchema,
  emptyDraft,
  needs,
  normalizedDraft,
  type BriefingDraft,
} from "@/lib/validation/briefing";

type Props = { locale: "pt" | "en" };
const STORAGE_KEY = "fortunato-briefing-v2";

const SEGMENT_SUGGESTIONS_PT = [
  "Gastronomia & Alimentos",
  "Moda & Vestuário",
  "Tecnologia & Software",
  "Saúde & Bem-estar",
  "Arquitetura & Interiores",
  "Consultoria & Serviços",
  "E-commerce",
  "Educação & Cultura",
];

const SEGMENT_SUGGESTIONS_EN = [
  "Food & Beverage",
  "Fashion & Apparel",
  "Technology & Software",
  "Healthcare & Wellness",
  "Architecture & Interiors",
  "Consulting & Services",
  "E-commerce",
  "Education & Culture",
];

const updateDraft = (data: BriefingDraft, path: string, value: unknown): BriefingDraft => {
  const [group, key] = path.split(".") as [
    "personal" | "business" | "project" | "planning" | "contact",
    string
  ];
  return {
    ...data,
    [group]: {
      ...data[group],
      [key]: value,
    },
  } as BriefingDraft;
};

export function BriefingFlow({ locale }: Props) {
  const isPt = locale === "pt";
  const [step, setStep] = useState<number>(0);
  const [status, setStatus] = useState<"editing" | "submitting" | "success" | "error">("editing");
  const [data, setData] = useState<BriefingDraft>(() => emptyDraft(isPt ? "pt-BR" : "en"));
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [generalError, setGeneralError] = useState<string>("");

  useEffect(() => {
    const saved = sessionStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setData((prev) => ({ ...prev, ...parsed }));
      } catch {
        // ignore parse error
      }
    }
  }, []);

  useEffect(() => {
    if (status !== "success") {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    }
  }, [data, status]);

  const set = (path: string, value: unknown) => {
    setData((d) => updateDraft(d, path, value));
    // Clear error for this field
    if (errors[path]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[path];
        return next;
      });
    }
  };

  const conditional = needs(data);

  const validateCurrentStep = (currentStep: number): boolean => {
    const stepErrors: Record<string, string> = {};

    if (currentStep === 0) {
      // Step 1: Demand & Service
      if (!data.project.primaryNeed) {
        stepErrors["project.primaryNeed"] = isPt
          ? "Selecione a opção que melhor define sua necessidade."
          : "Please select what you need.";
      }
      if (data.project.primaryNeed === "new-brand" && !data.project.namingStatus) {
        stepErrors["project.namingStatus"] = isPt
          ? "Informe a situação do nome da marca."
          : "Please select the naming status.";
      }
      if (data.project.primaryNeed === "visual-identity" && !data.project.existingLogo) {
        stepErrors["project.existingLogo"] = isPt
          ? "Informe se já possui logotipo."
          : "Please specify if you already have a logo.";
      }
      if (
        data.project.primaryNeed === "rebranding" &&
        (!data.project.rebrandingReasons || data.project.rebrandingReasons.length === 0)
      ) {
        stepErrors["project.rebrandingReasons"] = isPt
          ? "Escolha ao menos um motivo."
          : "Select at least one reason.";
      }
      if (data.project.primaryNeed === "website" && !data.project.websiteType) {
        stepErrors["project.websiteType"] = isPt
          ? "Escolha o tipo de website."
          : "Select the website format.";
      }
    } else if (currentStep === 1) {
      // Step 2: Brand & Business
      if (data.business.hasName && !data.business.name?.trim()) {
        stepErrors["business.name"] = isPt
          ? "Informe o nome do seu negócio ou marque que ainda não tem nome."
          : "Enter your business name or check that you don't have one yet.";
      }
      if (!data.business.segment?.trim()) {
        stepErrors["business.segment"] = isPt
          ? "Informe o segmento ou área de atuação."
          : "Please provide your business industry.";
      }
    } else if (currentStep === 2) {
      // Step 3: Project Context & Timeline
      if (!data.project.motivation?.trim()) {
        stepErrors["project.motivation"] = isPt
          ? "Conte brevemente o que motivou a busca pelo projeto."
          : "Please briefly describe what motivated the project.";
      }
      if (data.planning.timeline === "specific-date" && !data.planning.specificDate) {
        stepErrors["planning.specificDate"] = isPt
          ? "Selecione a data limite desejada."
          : "Please select the target date.";
      }
    } else if (currentStep === 3) {
      // Step 4: Contact & Consent
      if (!data.personal.name?.trim()) {
        stepErrors["personal.name"] = isPt ? "Informe seu nome." : "Please enter your name.";
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!data.contact.email?.trim() || !emailRegex.test(data.contact.email)) {
        stepErrors["contact.email"] = isPt
          ? "Informe um e-mail válido para retorno."
          : "Please provide a valid email.";
      }
      if (!data.consent.privacyAccepted) {
        stepErrors["consent.privacyAccepted"] = isPt
          ? "É necessário aceitar os termos para prosseguir."
          : "You must accept the terms to proceed.";
      }
    }

    setErrors(stepErrors);
    if (Object.keys(stepErrors).length > 0) {
      const firstErrorKey = Object.keys(stepErrors)[0];
      setGeneralError(stepErrors[firstErrorKey]);
      return false;
    }
    setGeneralError("");
    return true;
  };

  const next = () => {
    if (!validateCurrentStep(step)) return;
    setStep((s) => Math.min(s + 1, 3));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const back = () => {
    setGeneralError("");
    setErrors({});
    setStep((s) => Math.max(s - 1, 0));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const submit = async () => {
    if (!validateCurrentStep(step)) return;

    const normalized = normalizedDraft(data);
    const parsed = briefingSchema.safeParse(normalized);

    if (!parsed.success) {
      const issues: Record<string, string> = {};
      parsed.error.issues.forEach((issue) => {
        issues[issue.path.join(".")] = issue.message;
      });
      setErrors(issues);
      setGeneralError(
        parsed.error.issues[0]?.message ||
          (isPt ? "Revise os campos obrigatórios." : "Please review the required fields.")
      );
      return;
    }

    setStatus("submitting");
    try {
      const res = await fetch("/api/briefing", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(parsed.data),
      });

      if (!res.ok) throw new Error("Submission failed");

      sessionStorage.removeItem(STORAGE_KEY);
      setStatus("success");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      setStatus("error");
      setGeneralError(
        isPt
          ? "Não foi possível enviar o briefing agora. Suas respostas continuam salvas. Tente novamente."
          : "Could not send the briefing right now. Your answers are still saved. Please try again."
      );
    }
  };

  const stepTitles = [
    {
      label: isPt ? "Demanda" : "Demand",
      title: isPt ? "Como podemos ajudar a sua marca?" : "How can we help your brand?",
      desc: isPt
        ? "Selecione o serviço principal que você busca neste momento."
        : "Select the main service you are looking for at this moment.",
    },
    {
      label: isPt ? "Marca" : "Brand",
      title: isPt ? "Conte-nos sobre o seu negócio" : "Tell us about your business",
      desc: isPt
        ? "Informações essenciais para entendermos seu setor e maturidade."
        : "Key details to help us understand your industry and stage.",
    },
    {
      label: isPt ? "Expectativas" : "Expectations",
      title: isPt ? "Objetivos e expectativas de prazo" : "Goals and timeline expectations",
      desc: isPt
        ? "Compartilhe o contexto que motivou a busca por esse projeto."
        : "Share the context that motivated this project.",
    },
    {
      label: isPt ? "Contato" : "Contact",
      title: isPt ? "Onde podemos te responder?" : "Where can we reach you?",
      desc: isPt
        ? "Seus dados para enviarmos uma análise e proposta personalizada."
        : "Your details so we can send an analysis and personalized proposal.",
    },
  ];

  if (status === "success") {
    return (
      <div className="briefing-container">
        <div className="briefing-success-card">
          <div className="success-icon-badge">✓</div>
          <span className="eyebrow">{isPt ? "Briefing Recebido" : "Briefing Received"}</span>
          <h1>{isPt ? "Projeto enviado com sucesso." : "Project successfully sent."}</h1>
          <p className="success-desc">
            {isPt
              ? `Obrigado, ${data.personal.name || ""}. Recebemos suas respostas e analisaremos o contexto do seu negócio com atenção.`
              : `Thank you, ${data.personal.name || ""}. We received your answers and will carefully review your business context.`}
          </p>

          <div className="next-steps-box">
            <h4>{isPt ? "O que acontece agora:" : "What happens next:"}</h4>
            <ol className="next-steps-list">
              <li>
                <strong>{isPt ? "1. Análise interna" : "1. Internal review"}</strong>
                <span>
                  {isPt
                    ? "Avaliamos o escopo, cronograma e viabilidade do projeto."
                    : "We assess the project scope, timeline, and suitability."}
                </span>
              </li>
              <li>
                <strong>{isPt ? "2. Primeiro contato" : "2. First contact"}</strong>
                <span>
                  {isPt
                    ? "Retornamos em até 24 a 48h úteis pelo canal escolhido para alinhar os próximos passos."
                    : "We will get back to you within 24–48 business hours via your preferred channel."}
                </span>
              </li>
            </ol>
          </div>

          <div className="success-actions">
            <Link className="button" href={`/${locale}/projects`}>
              {isPt ? "Conhecer projetos selecionados" : "Explore selected projects"}
            </Link>
            <Link className="link" href={`/${locale}`}>
              {isPt ? "Voltar à página inicial" : "Back to home"} →
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const primaryServices = [
    {
      id: "visual-identity",
      title: isPt ? "Identidade Visual" : "Visual Identity",
      desc: isPt
        ? "Criação de logotipo, tipografia, paleta e sistema visual completo para novos negócios ou marcas."
        : "Logo design, typography, color palette and comprehensive visual system for businesses.",
    },
    {
      id: "rebranding",
      title: isPt ? "Rebranding" : "Rebranding",
      desc: isPt
        ? "Evolução e reposicionamento de uma marca que já existe para acompanhar um novo patamar."
        : "Evolution and repositioning of an existing brand to match a new level of maturity.",
    },
    {
      id: "new-brand",
      title: isPt ? "Marca do Zero (Naming + Identidade)" : "Brand from Scratch (Naming + Identity)",
      desc: isPt
        ? "Para quem está começando e precisa definir nome, estratégia e identidade visual completa."
        : "For new ventures needing brand naming, strategy, and full visual identity.",
    },
    {
      id: "website",
      title: isPt ? "Website Institucional" : "Institutional Website",
      desc: isPt
        ? "Design e presença digital institucional alinhados à identidade e objetivos da marca."
        : "Design and digital presence tailored to your brand identity and goals.",
    },
    {
      id: "unsure",
      title: isPt ? "Preciso de ajuda para definir" : "I need help deciding",
      desc: isPt
        ? "Quero entender a melhor abordagem para o momento atual da minha empresa."
        : "I want guidance on the best approach for my company's current stage.",
    },
  ];

  const businessStages = [
    {
      id: "starting",
      title: isPt ? "Começando agora" : "Starting now",
      desc: isPt ? "Ideia em planejamento ou pré-lançamento" : "Planning phase or pre-launch",
    },
    {
      id: "operating",
      title: isPt ? "Já em operação" : "Already operating",
      desc: isPt ? "Atendendo clientes e no mercado" : "Active with existing clients",
    },
    {
      id: "growing",
      title: isPt ? "Em crescimento" : "Growing",
      desc: isPt ? "Expandindo equipe, público ou faturamento" : "Scaling team, audience or revenue",
    },
    {
      id: "established",
      title: isPt ? "Consolidada" : "Established",
      desc: isPt ? "Marca madura e referência no setor" : "Mature brand recognized in industry",
    },
  ];

  const timelines = [
    { id: "no-specific-date", label: isPt ? "Flexível / Sem pressa" : "Flexible / No rush" },
    { id: "within-one-month", label: isPt ? "Até 1 mês" : "Within 1 month" },
    { id: "one-two-months", label: isPt ? "1 a 2 meses" : "1–2 months" },
    { id: "two-three-months", label: isPt ? "2 a 3 meses" : "2–3 months" },
    { id: "more-than-three-months", label: isPt ? "Mais de 3 meses" : "3+ months" },
    { id: "specific-date", label: isPt ? "Tenho uma data específica" : "I have a specific date" },
  ];

  const roles = [
    { id: "owner", label: isPt ? "Fundador(a) / Proprietário(a)" : "Founder / Owner" },
    { id: "partner", label: isPt ? "Sócio(a) / Diretor(a)" : "Partner / Director" },
    { id: "marketing", label: isPt ? "Marketing & Comunicação" : "Marketing & Comms" },
    { id: "other", label: isPt ? "Outro" : "Other" },
  ];

  const progressPercent = Math.round(((step + 1) / 4) * 100);

  return (
    <div className="briefing-shell">
      {/* Progress Header */}
      <div className="briefing-stepper-header">
        <div className="briefing-steps-bar">
          <div className="briefing-steps-progress" style={{ width: `${progressPercent}%` }} />
        </div>

        <div className="briefing-step-indicators">
          {stepTitles.map((st, idx) => (
            <button
              key={st.label}
              type="button"
              className={`step-pill-btn ${idx === step ? "active" : ""} ${
                idx < step ? "completed" : ""
              }`}
              onClick={() => {
                if (idx < step) {
                  setGeneralError("");
                  setErrors({});
                  setStep(idx);
                }
              }}
              disabled={idx > step}
              aria-label={`${st.label} - Step ${idx + 1}`}
            >
              <span className="step-num">{idx < step ? "✓" : `0${idx + 1}`}</span>
              <span className="step-label">{st.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Step Container */}
      <div className="briefing-content-card">
        <div className="step-header">
          <span className="step-badge">
            {isPt ? `Etapa 0${step + 1} de 04` : `Step 0${step + 1} of 04`}
          </span>
          <h1>{stepTitles[step].title}</h1>
          <p className="step-subtitle">{stepTitles[step].desc}</p>
        </div>

        {generalError && (
          <div className="briefing-alert-banner" role="alert">
            <span className="alert-icon">!</span>
            <span>{generalError}</span>
          </div>
        )}

        {/* STEP 1: DEMANDA / PROJETO */}
        {step === 0 && (
          <div className="step-section">
            <div className="cards-grid">
              {primaryServices.map((srv) => {
                const isSelected = data.project.primaryNeed === srv.id;
                return (
                  <button
                    key={srv.id}
                    type="button"
                    className={`select-card ${isSelected ? "selected" : ""}`}
                    onClick={() => set("project.primaryNeed", srv.id)}
                  >
                    <div className="card-top">
                      <div className="card-radio-circle">{isSelected ? "●" : ""}</div>
                      <h3 className="card-title">{srv.title}</h3>
                    </div>
                    <p className="card-desc">{srv.desc}</p>
                  </button>
                );
              })}
            </div>
            {errors["project.primaryNeed"] && (
              <p className="field-error-msg">{errors["project.primaryNeed"]}</p>
            )}

            {/* CONDITIONAL SUB-QUESTIONS WITH CLEAN UI */}
            {conditional.namingStatus && (
              <div className="conditional-box">
                <label className="field-title">
                  {isPt ? "Seu negócio já possui um nome definido?" : "Does your business already have a defined name?"}
                </label>
                <div className="chips-grid">
                  {[
                    ["has-name", isPt ? "Sim, já temos o nome" : "Yes, we have a name"],
                    ["needs-name", isPt ? "Não, precisamos de Naming" : "No, we need Naming"],
                    ["deciding", isPt ? "Ainda estamos decidindo" : "Still deciding"],
                  ].map(([v, label]) => (
                    <button
                      key={v}
                      type="button"
                      className={`chip-button ${data.project.namingStatus === v ? "active" : ""}`}
                      onClick={() => set("project.namingStatus", v)}
                    >
                      {label}
                    </button>
                  ))}
                </div>
                {errors["project.namingStatus"] && (
                  <p className="field-error-msg">{errors["project.namingStatus"]}</p>
                )}
              </div>
            )}

            {conditional.existingLogo && (
              <div className="conditional-box">
                <label className="field-title">
                  {isPt ? "Você já possui algum logotipo ou identidade anterior?" : "Do you have an existing logo or identity?"}
                </label>
                <div className="chips-grid">
                  {[
                    ["yes", isPt ? "Sim, já tenho um logotipo" : "Yes, I have a logo"],
                    ["no", isPt ? "Não tenho nada ainda" : "No, nothing yet"],
                    ["temporary", isPt ? "Tenho algo provisório" : "I have something temporary"],
                  ].map(([v, label]) => (
                    <button
                      key={v}
                      type="button"
                      className={`chip-button ${data.project.existingLogo === v ? "active" : ""}`}
                      onClick={() => set("project.existingLogo", v)}
                    >
                      {label}
                    </button>
                  ))}
                </div>
                {errors["project.existingLogo"] && (
                  <p className="field-error-msg">{errors["project.existingLogo"]}</p>
                )}
              </div>
            )}

            {conditional.rebrandingReasons && (
              <div className="conditional-box">
                <label className="field-title">
                  {isPt
                    ? "O que motivou a mudança da marca neste momento? (Selecione uma ou mais)"
                    : "What motivated the rebrand at this moment? (Select one or more)"}
                </label>
                <div className="chips-grid">
                  {[
                    ["outdated", isPt ? "A marca parece desatualizada" : "Brand feels outdated"],
                    ["business-changed", isPt ? "O negócio / foco mudou" : "Business/focus has shifted"],
                    ["professionalizing", isPt ? "Profissionalizando a empresa" : "Professionalizing company"],
                    ["repositioning", isPt ? "Reposicionar para ticket mais alto" : "Repositioning for higher value"],
                    ["other", isPt ? "Outro motivo" : "Other reason"],
                  ].map(([v, label]) => {
                    const currentReasons = data.project.rebrandingReasons || [];
                    const isChecked = currentReasons.includes(v);
                    return (
                      <button
                        key={v}
                        type="button"
                        className={`chip-button ${isChecked ? "active" : ""}`}
                        onClick={() => {
                          const updated = isChecked
                            ? currentReasons.filter((x) => x !== v)
                            : [...currentReasons, v];
                          set("project.rebrandingReasons", updated);
                        }}
                      >
                        {isChecked ? "✓ " : "+ "}
                        {label}
                      </button>
                    );
                  })}
                </div>
                {errors["project.rebrandingReasons"] && (
                  <p className="field-error-msg">{errors["project.rebrandingReasons"]}</p>
                )}
              </div>
            )}

            {conditional.websiteType && (
              <div className="conditional-box">
                <label className="field-title">
                  {isPt ? "Qual formato de website você tem em mente?" : "What website format do you envision?"}
                </label>
                <div className="chips-grid">
                  {[
                    ["institutional", isPt ? "Site Institucional" : "Institutional site"],
                    ["landing-page", isPt ? "Landing Page / Conversão" : "Landing page"],
                    ["portfolio", isPt ? "Portfólio / Catálogo" : "Portfolio / Showcase"],
                    ["unsure", isPt ? "Ainda não sei ao certo" : "Not sure yet"],
                    ["other", isPt ? "Outro formato" : "Other format"],
                  ].map(([v, label]) => (
                    <button
                      key={v}
                      type="button"
                      className={`chip-button ${data.project.websiteType === v ? "active" : ""}`}
                      onClick={() => set("project.websiteType", v)}
                    >
                      {label}
                    </button>
                  ))}
                </div>
                {errors["project.websiteType"] && (
                  <p className="field-error-msg">{errors["project.websiteType"]}</p>
                )}
              </div>
            )}
          </div>
        )}

        {/* STEP 2: MARCA & NEGÓCIO */}
        {step === 1 && (
          <div className="step-section">
            {/* Nome do Negócio */}
            <div className="input-group">
              <div className="label-row">
                <label className="field-title" htmlFor="business-name-input">
                  {isPt ? "Nome do seu negócio / marca" : "Your business / brand name"}
                </label>
                <label className="toggle-label">
                  <input
                    type="checkbox"
                    checked={!data.business.hasName}
                    onChange={(e) => {
                      const noName = e.target.checked;
                      set("business.hasName", !noName);
                      if (noName) set("business.name", "");
                    }}
                  />
                  <span>{isPt ? "Ainda não temos um nome" : "We don't have a name yet"}</span>
                </label>
              </div>

              {data.business.hasName ? (
                <input
                  id="business-name-input"
                  className={`text-input ${errors["business.name"] ? "input-error" : ""}`}
                  placeholder={isPt ? "Ex: Sublime Mel, Studio Aurora..." : "e.g. Acme Studio, Lumen..."}
                  value={data.business.name || ""}
                  onChange={(e) => set("business.name", e.target.value)}
                />
              ) : (
                <div className="input-placeholder-box">
                  {isPt
                    ? "✓ O projeto incluirá o processo de criação ou definição de Naming."
                    : "✓ The project will include brand naming & definition process."}
                </div>
              )}
              {errors["business.name"] && (
                <p className="field-error-msg">{errors["business.name"]}</p>
              )}
            </div>

            {/* Segmento com Sugestões */}
            <div className="input-group">
              <label className="field-title" htmlFor="business-segment-input">
                {isPt ? "Em que segmento seu negócio atua?" : "What industry or sector are you in?"}
              </label>
              <input
                id="business-segment-input"
                className={`text-input ${errors["business.segment"] ? "input-error" : ""}`}
                placeholder={isPt ? "Digite seu segmento ou clique em uma das sugestões abaixo" : "Type your sector or choose a suggestion below"}
                value={data.business.segment}
                onChange={(e) => set("business.segment", e.target.value)}
              />
              {errors["business.segment"] && (
                <p className="field-error-msg">{errors["business.segment"]}</p>
              )}

              <div className="suggestion-tags-row">
                <span className="tags-hint">{isPt ? "Sugestões rápidas:" : "Quick suggestions:"}</span>
                <div className="tags-wrapper">
                  {(isPt ? SEGMENT_SUGGESTIONS_PT : SEGMENT_SUGGESTIONS_EN).map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      className={`tag-btn ${data.business.segment === tag ? "tag-active" : ""}`}
                      onClick={() => set("business.segment", tag)}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Momento do Negócio */}
            <div className="input-group">
              <label className="field-title">
                {isPt ? "Qual é o momento atual da empresa?" : "What is the current business stage?"}
              </label>
              <div className="cards-grid-compact">
                {businessStages.map((stg) => {
                  const isSelected = data.business.stage === stg.id;
                  return (
                    <button
                      key={stg.id}
                      type="button"
                      className={`select-card-compact ${isSelected ? "selected" : ""}`}
                      onClick={() => set("business.stage", stg.id)}
                    >
                      <div className="card-top">
                        <div className="card-radio-circle">{isSelected ? "●" : ""}</div>
                        <h4 className="compact-title">{stg.title}</h4>
                      </div>
                      <p className="compact-desc">{stg.desc}</p>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: EXPECTATIVAS E PRAZO (SEM PREÇO) */}
        {step === 2 && (
          <div className="step-section">
            {/* Motivação */}
            <div className="input-group">
              <label className="field-title" htmlFor="motivation-input">
                {isPt
                  ? "O que fez você procurar ajuda para este projeto agora?"
                  : "What made you seek help for this project now?"}
              </label>
              <textarea
                id="motivation-input"
                className={`textarea-input ${errors["project.motivation"] ? "input-error" : ""}`}
                rows={4}
                placeholder={
                  isPt
                    ? "Ex: Estamos lançando um novo produto no mercado e precisamos de uma presença profissional que transmita confiança e autoridade..."
                    : "e.g. We are launching a new product and need a professional presence that builds trust and authority..."
                }
                value={data.project.motivation}
                onChange={(e) => set("project.motivation", e.target.value)}
              />
              {errors["project.motivation"] && (
                <p className="field-error-msg">{errors["project.motivation"]}</p>
              )}
            </div>

            {/* Expectativa de Prazo */}
            <div className="input-group">
              <label className="field-title">
                {isPt ? "Qual é a sua expectativa de prazo ou cronograma?" : "What is your target timeline?"}
              </label>
              <div className="chips-grid">
                {timelines.map((tm) => (
                  <button
                    key={tm.id}
                    type="button"
                    className={`chip-button ${data.planning.timeline === tm.id ? "active" : ""}`}
                    onClick={() => set("planning.timeline", tm.id)}
                  >
                    {tm.label}
                  </button>
                ))}
              </div>

              {conditional.specificDate && (
                <div className="specific-date-box">
                  <label className="field-subtitle" htmlFor="specific-date-input">
                    {isPt ? "Selecione a data limite estimada:" : "Select the target deadline:"}
                  </label>
                  <input
                    id="specific-date-input"
                    type="date"
                    className={`text-input ${errors["planning.specificDate"] ? "input-error" : ""}`}
                    value={data.planning.specificDate || ""}
                    onChange={(e) => set("planning.specificDate", e.target.value)}
                  />
                  {errors["planning.specificDate"] && (
                    <p className="field-error-msg">{errors["planning.specificDate"]}</p>
                  )}
                </div>
              )}
            </div>

            {/* Referências / Inspirações (Opcional) */}
            <div className="input-group">
              <label className="field-title" htmlFor="references-input">
                {isPt
                  ? "Existe alguma referência, marca ou estilo que você gosta? (Opcional)"
                  : "Are there any references, brands or styles you admire? (Optional)"}
              </label>
              <textarea
                id="references-input"
                className="textarea-input"
                rows={3}
                placeholder={
                  isPt
                    ? "Links de marcas de referência, perfis do Instagram ou estilos que combinam com o que você imagina..."
                    : "Links to benchmark brands, Instagram profiles, or visual styles that match your vision..."
                }
                value={data.project.references || ""}
                onChange={(e) => set("project.references", e.target.value)}
              />
            </div>
          </div>
        )}

        {/* STEP 4: CONTATO & CONFIRMAÇÃO */}
        {step === 3 && (
          <div className="step-section">
            <div className="form-grid-2">
              <div className="input-group">
                <label className="field-title" htmlFor="name-input">
                  {isPt ? "Como podemos te chamar?" : "What should we call you?"}
                </label>
                <input
                  id="name-input"
                  className={`text-input ${errors["personal.name"] ? "input-error" : ""}`}
                  placeholder={isPt ? "Seu nome completo ou como prefere ser chamado" : "Your name"}
                  value={data.personal.name}
                  onChange={(e) => set("personal.name", e.target.value)}
                />
                {errors["personal.name"] && (
                  <p className="field-error-msg">{errors["personal.name"]}</p>
                )}
              </div>

              <div className="input-group">
                <label className="field-title">
                  {isPt ? "Qual é o seu papel no negócio?" : "What is your role?"}
                </label>
                <div className="chips-grid-compact">
                  {roles.map((r) => (
                    <button
                      key={r.id}
                      type="button"
                      className={`chip-button-sm ${data.personal.role === r.id ? "active" : ""}`}
                      onClick={() => set("personal.role", r.id)}
                    >
                      {r.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="form-grid-2">
              <div className="input-group">
                <label className="field-title" htmlFor="email-input">
                  {isPt ? "E-mail de contato" : "Contact email"}
                </label>
                <input
                  id="email-input"
                  type="email"
                  className={`text-input ${errors["contact.email"] ? "input-error" : ""}`}
                  placeholder="exemplo@empresa.com"
                  value={data.contact.email}
                  onChange={(e) => set("contact.email", e.target.value)}
                />
                {errors["contact.email"] && (
                  <p className="field-error-msg">{errors["contact.email"]}</p>
                )}
              </div>

              <div className="input-group">
                <label className="field-title" htmlFor="phone-input">
                  {isPt ? "WhatsApp / Telefone" : "WhatsApp / Phone"}
                </label>
                <input
                  id="phone-input"
                  type="tel"
                  className="text-input"
                  placeholder="(00) 00000-0000"
                  value={data.contact.phone || ""}
                  onChange={(e) => set("contact.phone", e.target.value)}
                />
              </div>
            </div>

            <div className="form-grid-2">
              <div className="input-group">
                <label className="field-title">
                  {isPt ? "Canal de preferência para retorno" : "Preferred contact channel"}
                </label>
                <div className="chips-grid-compact">
                  {[
                    ["whatsapp", "WhatsApp"],
                    ["email", "E-mail"],
                    ["either", isPt ? "Tanto faz" : "Either"],
                  ].map(([v, label]) => (
                    <button
                      key={v}
                      type="button"
                      className={`chip-button-sm ${
                        data.contact.preferredChannel === v ? "active" : ""
                      }`}
                      onClick={() => set("contact.preferredChannel", v)}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="input-group">
                <label className="field-title" htmlFor="profile-input">
                  {isPt ? "Instagram ou Website atual (Opcional)" : "Company Instagram or Website (Optional)"}
                </label>
                <input
                  id="profile-input"
                  className="text-input"
                  placeholder="@suamarca ou www.suamarca.com.br"
                  value={data.contact.businessProfile || ""}
                  onChange={(e) => set("contact.businessProfile", e.target.value)}
                />
              </div>
            </div>

            {/* BRIEFING SUMMARY RECAP */}
            <div className="briefing-recap-box">
              <div className="recap-header">
                <span className="recap-badge">✓</span>
                <h4>{isPt ? "Resumo do seu briefing" : "Your briefing summary"}</h4>
              </div>
              <div className="recap-grid">
                <div className="recap-item">
                  <span className="recap-label">{isPt ? "Serviço:" : "Service:"}</span>
                  <span className="recap-value">
                    {primaryServices.find((s) => s.id === data.project.primaryNeed)?.title || "—"}
                  </span>
                </div>
                <div className="recap-item">
                  <span className="recap-label">{isPt ? "Negócio:" : "Business:"}</span>
                  <span className="recap-value">
                    {data.business.hasName
                      ? data.business.name || (isPt ? "Nome não informado" : "Name not provided")
                      : isPt
                      ? "A definir no projeto"
                      : "To be defined"}
                    {data.business.segment ? ` (${data.business.segment})` : ""}
                  </span>
                </div>
                <div className="recap-item">
                  <span className="recap-label">{isPt ? "Prazo:" : "Timeline:"}</span>
                  <span className="recap-value">
                    {timelines.find((t) => t.id === data.planning.timeline)?.label || "—"}
                  </span>
                </div>
              </div>
            </div>

            {/* Consent & Honeypot */}
            <div className="consent-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={data.consent.privacyAccepted}
                  onChange={(e) =>
                    setData((d) => ({
                      ...d,
                      consent: { privacyAccepted: e.target.checked },
                    }))
                  }
                />
                <span>
                  {isPt
                    ? "Li e concordo com o envio das informações para análise e contato sobre este projeto pela Fortunato Brands."
                    : "I agree to the submission of this information for project review and contact by Fortunato Brands."}
                </span>
              </label>
              {errors["consent.privacyAccepted"] && (
                <p className="field-error-msg">{errors["consent.privacyAccepted"]}</p>
              )}

              {/* Honeypot hidden input */}
              <input
                aria-hidden="true"
                tabIndex={-1}
                autoComplete="off"
                style={{ display: "none" }}
                value={data.honeypot || ""}
                onChange={(e) => setData((d) => ({ ...d, honeypot: e.target.value }))}
              />
            </div>
          </div>
        )}

        {/* Form Actions */}
        <div className="briefing-form-actions">
          {step > 0 && (
            <button className="back-btn" type="button" onClick={back}>
              ← {isPt ? "Voltar" : "Back"}
            </button>
          )}

          <div className="actions-right">
            {step < 3 ? (
              <button className="button primary-btn" type="button" onClick={next}>
                {isPt ? "Continuar" : "Continue"} →
              </button>
            ) : (
              <button
                className="button primary-btn submit-btn"
                disabled={status === "submitting"}
                type="button"
                onClick={submit}
              >
                {status === "submitting"
                  ? isPt
                    ? "Enviando briefing…"
                    : "Submitting briefing…"
                  : isPt
                  ? "Enviar briefing do projeto"
                  : "Send project briefing"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
