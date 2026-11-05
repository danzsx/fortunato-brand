"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  briefingSchema,
  emptyDraft,
  needs,
  normalizedDraft,
  type BriefingDraft,
} from "@/lib/validation/briefing";

type Props = { locale: "pt" | "en" };
const STORAGE_KEY = "fortunato-briefing-v3";

const SEGMENT_SUGGESTIONS_PT = [
  "Gastronomia & Alimentos",
  "Moda & Vestuário",
  "Tecnologia & Software",
  "Saúde & Odontologia",
  "Arquitetura & Interiores",
  "Consultoria & Serviços",
  "Comércio & Varejo",
  "Educação & Cultura",
];

const SEGMENT_SUGGESTIONS_EN = [
  "Food & Beverage",
  "Fashion & Apparel",
  "Technology & Software",
  "Healthcare & Dentistry",
  "Architecture & Interiors",
  "Consulting & Services",
  "Retail & Commerce",
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
  const [submissionId, setSubmissionId] = useState<string>("");
  const [copiedDoc, setCopiedDoc] = useState<boolean>(false);
  const [mobileDossierOpen, setMobileDossierOpen] = useState<boolean>(false);

  useEffect(() => {
    const saved = sessionStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setData((prev) => ({
          ...prev,
          ...parsed,
          personal: { ...prev.personal, ...(parsed.personal || {}) },
          business: { ...prev.business, ...(parsed.business || {}) },
          project: {
            ...prev.project,
            ...(parsed.project || {}),
            brandSpectrum: {
              ...prev.project.brandSpectrum,
              ...(parsed.project?.brandSpectrum || {}),
            },
          },
          planning: { ...prev.planning, ...(parsed.planning || {}) },
          contact: { ...prev.contact, ...(parsed.contact || {}) },
          consent: { ...prev.consent, ...(parsed.consent || {}) },
        }));
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
    if (errors[path]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[path];
        return next;
      });
    }
  };

  const setSpectrum = (
    axis: "classicModern" | "minimalExpressive" | "warmExclusive" | "organicTechnical",
    val: number
  ) => {
    setData((d) => ({
      ...d,
      project: {
        ...d.project,
        brandSpectrum: {
          ...(d.project.brandSpectrum || {}),
          [axis]: val,
        },
      },
    }));
  };

  const toggleArrayItem = (path: string, currentList: string[] | undefined, item: string, max = 12) => {
    const list = currentList || [];
    const exists = list.includes(item);
    if (exists) {
      set(
        path,
        list.filter((x) => x !== item)
      );
    } else if (list.length < max) {
      set(path, [...list, item]);
    }
  };

  const conditional = needs(data);

  // Catalog definitions
  const primaryServices = [
    {
      id: "visual-identity",
      code: "01",
      title: isPt ? "Identidade Visual" : "Visual Identity",
      subtitle: isPt ? "Logotipo, paleta, tipografia e sistema visual" : "Logo, palette, typography & visual system",
      desc: isPt
        ? "Para empresas que precisam construir ou profissionalizar sua apresentação visual com clareza, coerência e valor percebido."
        : "For businesses looking to build or professionalize their visual presentation with clarity, coherence, and perceived value.",
      tags: isPt
        ? ["Logotipo & Símbolo", "Sistema Tipográfico", "Direção de Cores", "Guia da Marca"]
        : ["Logo & Mark", "Typography System", "Color Direction", "Brand Guidelines"],
      diagram: "identity",
    },
    {
      id: "rebranding",
      code: "02",
      title: isPt ? "Rebranding" : "Rebranding",
      subtitle: isPt ? "Diagnóstico, reposicionamento e evolução" : "Diagnosis, repositioning & brand evolution",
      desc: isPt
        ? "Para negócios que cresceram ou amadureceram e sentem que a marca atual já não representa a qualidade real da entrega."
        : "For businesses that have grown or matured and feel their current brand no longer reflects their true quality.",
      tags: isPt
        ? ["Diagnóstico Atual", "Reposicionamento", "Redesign de Identidade", "Transição Visual"]
        : ["Brand Audit", "Repositioning", "Identity Redesign", "Visual Transition"],
      diagram: "rebrand",
    },
    {
      id: "new-brand",
      code: "03",
      title: isPt ? "Marca do Zero (Naming + Identidade)" : "Brand from Scratch (Naming + Identity)",
      subtitle: isPt ? "Concepção integral desde o nome" : "Complete conception starting from the name",
      desc: isPt
        ? "Para novos empreendimentos ou produtos que precisam nascer com estratégia, nome próprio e identidade visual completa."
        : "For new ventures or products that need to launch with strategy, naming, and a complete visual identity.",
      tags: isPt
        ? ["Estratégia Inicial", "Criação de Nome", "Identidade Completa", "Aplicações Base"]
        : ["Initial Strategy", "Naming Creation", "Full Identity", "Core Applications"],
      diagram: "newbrand",
    },
    {
      id: "website",
      code: "04",
      title: isPt ? "Website Institucional" : "Institutional Website",
      subtitle: isPt ? "Presença digital, arquitetura e direção visual" : "Digital presence, architecture & visual direction",
      desc: isPt
        ? "A continuidade da sua marca no ambiente digital: arquitetura de informação, design editorial e desenvolvimento responsivo."
        : "Your brand's continuity in the digital environment: information architecture, editorial design, and responsive development.",
      tags: isPt
        ? ["Arquitetura de Conteúdo", "UI/UX Editorial", "Design Responsivo", "Alta Performance"]
        : ["Content Architecture", "Editorial UI/UX", "Responsive Design", "High Performance"],
      diagram: "website",
    },
    {
      id: "unsure",
      code: "05",
      title: isPt ? "Preciso de ajuda para diagnosticar" : "I need help diagnosing",
      subtitle: isPt ? "Descoberta assistida do escopo ideal" : "Guided discovery of the ideal scope",
      desc: isPt
        ? "Você sabe onde quer chegar com o seu negócio, mas prefere nossa recomendação sobre qual caminho faz mais sentido agora."
        : "You know what you want to achieve with your business, and want our recommendation on the right approach.",
      tags: isPt
        ? ["Análise de Momento", "Recomendação de Escopo", "Direcionamento Estratégico"]
        : ["Stage Assessment", "Scope Recommendation", "Strategic Direction"],
      diagram: "unsure",
    },
  ];

  const deliverableOptions = [
    { id: "logo-system", label: isPt ? "Logotipo e variações" : "Logo & variations" },
    { id: "brand-manual", label: isPt ? "Manual de identidade visual" : "Brand guidelines book" },
    { id: "social-media", label: isPt ? "Templates e direção para Instagram" : "Social media direction & templates" },
    { id: "stationery", label: isPt ? "Papelaria corporativa / cartões" : "Corporate stationery / cards" },
    { id: "packaging", label: isPt ? "Embalagens, sacolas ou rótulos" : "Packaging, bags or labels" },
    { id: "presentation", label: isPt ? "Apresentação comercial / proposta" : "Sales deck / presentation" },
    { id: "signage", label: isPt ? "Fachada / sinalização de ambiente" : "Storefront / environmental signage" },
    { id: "uniforms", label: isPt ? "Uniformes / vestuário da equipe" : "Team uniforms / apparel" },
    { id: "website-ui", label: isPt ? "Website ou Landing Page" : "Website or Landing Page" },
  ];

  const businessStages = [
    {
      id: "starting",
      index: "01",
      title: isPt ? "Começando agora" : "Starting now",
      desc: isPt ? "Projeto em estruturação ou pré-lançamento no mercado." : "Project in planning or pre-launch phase.",
    },
    {
      id: "operating",
      index: "02",
      title: isPt ? "Já em operação" : "Already operating",
      desc: isPt ? "Empresa ativa, atendendo clientes e validando seu espaço." : "Active business serving clients in the market.",
    },
    {
      id: "growing",
      index: "03",
      title: isPt ? "Em crescimento" : "Growing",
      desc: isPt ? "Expandindo público, serviços ou buscando ticket mais alto." : "Expanding audience, services, or aiming for higher value.",
    },
    {
      id: "established",
      index: "04",
      title: isPt ? "Consolidada" : "Established",
      desc: isPt ? "Negócio maduro que busca renovar e elevar sua presença." : "Mature business looking to renew and elevate its presence.",
    },
  ];

  const presenceChannels = [
    { id: "instagram", label: isPt ? "Instagram / Redes Sociais" : "Instagram / Social Media" },
    { id: "physical-store", label: isPt ? "Espaço físico / Consultório / Loja" : "Physical space / Clinic / Store" },
    { id: "whatsapp-direct", label: isPt ? "Atendimento via WhatsApp / Indicação" : "WhatsApp / Word of mouth" },
    { id: "website", label: isPt ? "Website próprio" : "Own Website" },
    { id: "ecommerce", label: isPt ? "E-commerce / Marketplace" : "E-commerce / Marketplace" },
    { id: "not-launched", label: isPt ? "Ainda não lançamos no mercado" : "Not launched in the market yet" },
  ];

  const aestheticTerritories = [
    {
      id: "editorial-silent",
      title: isPt ? "Editorial & Silencioso" : "Editorial & Quiet",
      desc: isPt
        ? "Espaço generoso, tipografia precisa, tons neutros e sofisticação discreta."
        : "Generous space, precise typography, neutral tones, and understated sophistication.",
      swatches: ["#111111", "#62625E", "#D8D8D2", "#F5F5F2"],
      sampleType: "Aa",
      sampleStyle: "serif-editorial",
    },
    {
      id: "contemporary-precise",
      title: isPt ? "Contemporâneo & Técnico" : "Contemporary & Technical",
      desc: isPt
        ? "Geometria limpa, alto contraste, clareza funcional e autoridade moderna."
        : "Clean geometry, high contrast, functional clarity, and modern authority.",
      swatches: ["#0F172A", "#1F3FFF", "#94A3B8", "#F8FAFC"],
      sampleType: "01",
      sampleStyle: "sans-tech",
    },
    {
      id: "organic-warm",
      title: isPt ? "Orgânico & Sensorial" : "Organic & Warm",
      desc: isPt
        ? "Tons naturais e terrosos, acolhimento tátil, proximidade humana e autenticidade."
        : "Natural earthy tones, tactile warmth, human closeness, and authenticity.",
      swatches: ["#2C3527", "#8C6239", "#D9C3B0", "#F4EAE0"],
      sampleType: "Ag",
      sampleStyle: "organic",
    },
    {
      id: "timeless-classic",
      title: isPt ? "Clássico Contemporâneo" : "Contemporary Classic",
      desc: isPt
        ? "Proporções permanentes, tradição renovada, confiança institucional e sobriedade."
        : "Enduring proportions, renewed tradition, institutional trust, and sobriety.",
      swatches: ["#1C1917", "#78716C", "#C7B299", "#F8F6F5"],
      sampleType: "IV",
      sampleStyle: "classic",
    },
    {
      id: "vibrant-expressive",
      title: isPt ? "Expressivo & Dinâmico" : "Expressive & Dynamic",
      desc: isPt
        ? "Presença energética, cores proprietárias marcantes e personalidade memorável."
        : "Energetic presence, distinctive proprietary colors, and memorable personality.",
      swatches: ["#182B49", "#E6B800", "#EA580C", "#F3F4F6"],
      sampleType: "Ex",
      sampleStyle: "expressive",
    },
    {
      id: "architectural-minimal",
      title: isPt ? "Arquitetônico & Monolítico" : "Architectural & Monolithic",
      desc: isPt
        ? "Estrutura rigorosa, linhas puras, presença escultural e alto valor percebido."
        : "Rigorous structure, pure lines, sculptural presence, and high perceived value.",
      swatches: ["#111111", "#3F3F46", "#A1A1AA", "#E4E4E7"],
      sampleType: "M—",
      sampleStyle: "monolithic",
    },
  ];

  const motivationPrompts = isPt
    ? [
        {
          label: "+ Qualidade maior que a marca atual",
          text: "Nosso produto/serviço tem excelente qualidade e clientes satisfeitos, mas sentimos que a imagem atual da marca ainda não transmite esse mesmo nível de profissionalismo.",
        },
        {
          label: "+ Lançamento de novo negócio",
          text: "Estamos estruturando um novo negócio e queremos começar desde o primeiro dia com uma identidade clara, profissional e bem posicionada no mercado.",
        },
        {
          label: "+ Atrair clientes de maior valor",
          text: "Queremos reposicionar nossa comunicação para dialogar com um público mais qualificado e justificar melhor o valor do que entregamos.",
        },
        {
          label: "+ Padronizar presença digital",
          text: "Hoje nossa comunicação visual é fragmentada entre redes sociais, atendimento e materiais; precisamos de um sistema visual consistente.",
        },
      ]
    : [
        {
          label: "+ Quality exceeds current brand image",
          text: "Our product/service has great quality and satisfied clients, but our current visual identity does not yet convey that same level of professionalism.",
        },
        {
          label: "+ Launching a new venture",
          text: "We are building a new business and want to launch from day one with a clear, professional, and well-positioned brand identity.",
        },
        {
          label: "+ Attract higher-value clients",
          text: "We want to reposition our brand to connect with a more qualified audience and better reflect the value we deliver.",
        },
        {
          label: "+ Unify digital presence",
          text: "Currently our visual communication feels fragmented across touchpoints; we need a coherent and consistent visual system.",
        },
      ];

  const timelines = [
    { id: "no-specific-date", label: isPt ? "Flexível / Prioridade na direção certa" : "Flexible / Priority on right direction" },
    { id: "within-one-month", label: isPt ? "Urgente (até 1 mês)" : "Urgent (within 1 month)" },
    { id: "one-two-months", label: isPt ? "1 a 2 meses" : "1–2 months" },
    { id: "two-three-months", label: isPt ? "2 a 3 meses" : "2–3 months" },
    { id: "more-than-three-months", label: isPt ? "Mais de 3 meses" : "3+ months" },
    { id: "specific-date", label: isPt ? "Tenho uma data importante / lançamento" : "I have a specific launch date" },
  ];

  const roles = [
    { id: "owner", label: isPt ? "Fundador(a) / Proprietário(a)" : "Founder / Owner" },
    { id: "partner", label: isPt ? "Sócio(a) / Diretor(a)" : "Partner / Director" },
    { id: "marketing", label: isPt ? "Marketing & Comunicação" : "Marketing & Comms" },
    { id: "other", label: isPt ? "Outro" : "Other" },
  ];

  const sources = [
    { id: "instagram", label: "Instagram" },
    { id: "behance", label: "Behance" },
    { id: "google", label: "Google" },
    { id: "referral", label: isPt ? "Indicação" : "Referral" },
    { id: "project", label: isPt ? "Vi um projeto da Fortunato" : "Saw a Fortunato project" },
    { id: "other", label: isPt ? "Outro" : "Other" },
  ];

  const stepTitles = [
    {
      num: "01",
      label: isPt ? "Escopo & Demanda" : "Scope & Demand",
      title: isPt ? "Qual é o ponto de partida do seu projeto?" : "What is the starting point for your project?",
      desc: isPt
        ? "Não se preocupe com termos técnicos. Escolha a opção que mais se aproxima do momento da sua marca — nosso assistente adapta as próximas perguntas."
        : "Don't worry about technical terms. Choose the option closest to your brand's current need — our assistant adapts the next questions.",
    },
    {
      num: "02",
      label: isPt ? "Negócio & Momento" : "Business & Stage",
      title: isPt ? "O contexto e a maturidade da sua empresa" : "Your company's context and maturity",
      desc: isPt
        ? "Uma identidade eficiente nasce da compreensão real de onde o negócio está hoje e com quem ele conversa."
        : "An effective identity is born from a real understanding of where the business stands today and who it speaks to.",
    },
    {
      num: "03",
      label: isPt ? "Direção Visual" : "Visual Direction",
      title: isPt ? "Atmosfera, personalidade e referências" : "Atmosphere, personality and references",
      desc: isPt
        ? "Use os recursos visuais abaixo para indicar a sensação e o território estético que fazem sentido para a sua marca."
        : "Use the visual tools below to indicate the feel and aesthetic territory that make sense for your brand.",
    },
    {
      num: "04",
      label: isPt ? "Objetivos & Ideias" : "Goals & Ideas",
      title: isPt ? "O que deve mudar depois deste projeto?" : "What should change after this project?",
      desc: isPt
        ? "Compartilhe suas motivações, expectativas de prazo e expresse livremente qualquer ideia ou necessidade."
        : "Share your motivations, timeline expectations, and freely express any ideas or requirements.",
    },
    {
      num: "05",
      label: isPt ? "Dossiê & Contato" : "Dossier & Contact",
      title: isPt ? "Seu briefing consolidado e dados de retorno" : "Your consolidated briefing and contact details",
      desc: isPt
        ? "Revise o documento organizado automaticamente com suas respostas, salve uma cópia em PDF se desejar e envie para nossa análise."
        : "Review the automatically organized briefing document, save a PDF copy if you wish, and submit it for our analysis.",
    },
  ];

  const validateCurrentStep = (currentStep: number): boolean => {
    const stepErrors: Record<string, string> = {};

    if (currentStep === 0) {
      if (!data.project.primaryNeed) {
        stepErrors["project.primaryNeed"] = isPt
          ? "Selecione a opção que melhor define sua necessidade."
          : "Please select what you need.";
      }
      if (data.project.primaryNeed === "new-brand" && !data.project.namingStatus) {
        stepErrors["project.namingStatus"] = isPt
          ? "Informe a situação atual do nome da marca."
          : "Please select the naming status.";
      }
      if (data.project.primaryNeed === "visual-identity" && !data.project.existingLogo) {
        stepErrors["project.existingLogo"] = isPt
          ? "Informe se já possui logotipo atualmente."
          : "Please specify if you already have a logo.";
      }
      if (
        data.project.primaryNeed === "rebranding" &&
        (!data.project.rebrandingReasons || data.project.rebrandingReasons.length === 0)
      ) {
        stepErrors["project.rebrandingReasons"] = isPt
          ? "Escolha ao menos um motivo para o rebranding."
          : "Select at least one reason for rebranding.";
      }
      if (data.project.primaryNeed === "website" && !data.project.websiteType) {
        stepErrors["project.websiteType"] = isPt
          ? "Escolha o formato de website que você imagina."
          : "Select the website format.";
      }
    } else if (currentStep === 1) {
      if (data.business.hasName && !data.business.name?.trim()) {
        stepErrors["business.name"] = isPt
          ? "Informe o nome do seu negócio ou marque que ainda não tem nome."
          : "Enter your business name or check that you don't have one yet.";
      }
      if (!data.business.segment?.trim()) {
        stepErrors["business.segment"] = isPt
          ? "Informe o segmento ou área de atuação do negócio."
          : "Please provide your business industry.";
      }
    } else if (currentStep === 3) {
      if (!data.project.motivation?.trim()) {
        stepErrors["project.motivation"] = isPt
          ? "Conte brevemente o que motivou a busca pelo projeto."
          : "Please briefly describe what motivated the project.";
      }
      if (data.planning.timeline === "specific-date" && !data.planning.specificDate) {
        stepErrors["planning.specificDate"] = isPt
          ? "Selecione a data limite estimada."
          : "Please select the target date.";
      }
    } else if (currentStep === 4) {
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
          ? "É necessário concordar com o envio para prosseguir."
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
    setStep((s) => Math.min(s + 1, 4));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const back = () => {
    setGeneralError("");
    setErrors({});
    setStep((s) => Math.max(s - 1, 0));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const jumpToStep = (targetStep: number) => {
    if (targetStep < step || validateCurrentStep(step)) {
      setGeneralError("");
      setErrors({});
      setStep(targetStep);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const submit = async () => {
    for (let i = 0; i <= 4; i++) {
      if (!validateCurrentStep(i)) {
        setStep(i);
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }
    }

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
      const json = await res.json().catch(() => ({}));
      if (json?.submissionId) {
        setSubmissionId(String(json.submissionId).slice(0, 8).toUpperCase());
      } else {
        setSubmissionId("FB-" + Math.random().toString(36).substring(2, 7).toUpperCase());
      }

      sessionStorage.removeItem(STORAGE_KEY);
      setStatus("success");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      setStatus("error");
      setGeneralError(
        isPt
          ? "Não foi possível enviar o briefing agora. Suas respostas continuam salvas no navegador. Tente novamente."
          : "Could not send the briefing right now. Your answers are still saved. Please try again."
      );
    }
  };

  // Helper labels for Dossier & Document Generation
  const selectedService = primaryServices.find((s) => s.id === data.project.primaryNeed);
  const selectedStage = businessStages.find((s) => s.id === data.business.stage);
  const selectedTimeline = timelines.find((t) => t.id === data.planning.timeline);
  const selectedTerritories = aestheticTerritories.filter((t) =>
    (data.project.aestheticTerritories || []).includes(t.id)
  );
  const selectedDeliverables = deliverableOptions.filter((d) =>
    (data.project.deliverables || []).includes(d.id)
  );
  const selectedPresence = presenceChannels.filter((p) =>
    (data.business.presence || []).includes(p.id)
  );

  const namingLabel: Record<string, string> = {
    "has-name": isPt ? "Já possui nome definido" : "Name already defined",
    "needs-name": isPt ? "Precisa criar o nome (Naming)" : "Needs brand naming",
    deciding: isPt ? "Em fase de validação de nome" : "Still deciding on name",
  };

  const logoLabel: Record<string, string> = {
    yes: isPt ? "Já possui logotipo anterior" : "Has an existing logo",
    no: isPt ? "Não possui logotipo anterior" : "No existing logo",
    temporary: isPt ? "Possui versão provisória" : "Has a temporary logo",
  };

  const websiteTypeLabel: Record<string, string> = {
    institutional: isPt ? "Site Institucional" : "Institutional Website",
    "landing-page": isPt ? "Landing Page / Conversão" : "Landing Page",
    portfolio: isPt ? "Portfólio / Acervo" : "Portfolio / Showcase",
    unsure: isPt ? "Formato a definir no diagnóstico" : "Format to be defined",
    other: isPt ? "Formato personalizado" : "Custom format",
  };

  const rebrandReasonLabel: Record<string, string> = {
    outdated: isPt ? "Identidade atual parece desatualizada" : "Current identity feels outdated",
    "business-changed": isPt ? "Mudança de foco ou modelo de negócio" : "Business focus or model shifted",
    professionalizing: isPt ? "Profissionalização e maturidade da empresa" : "Company professionalization",
    repositioning: isPt ? "Reposicionamento para maior valor percebido" : "Repositioning for higher value",
    other: isPt ? "Outro motivo estratégico" : "Other strategic reason",
  };

  const generatePlainTextSummary = () => {
    const lines = [
      `FORTUNATO BRANDS — DOSSIÊ DE BRIEFING & DESCOBERTA DE PROJETO`,
      `=============================================================`,
      `Data: ${new Intl.DateTimeFormat(isPt ? "pt-BR" : "en-US", { dateStyle: "long" }).format(new Date())}`,
      submissionId ? `Protocolo: #${submissionId}` : "",
      ``,
      `01. ESCOPO & DEMANDA PRINCIPAL`,
      `• Serviço principal: ${selectedService?.title || "—"}`,
      data.project.namingStatus ? `• Situação de Naming: ${namingLabel[data.project.namingStatus] || data.project.namingStatus}` : "",
      data.project.existingLogo ? `• Logotipo existente: ${logoLabel[data.project.existingLogo] || data.project.existingLogo}` : "",
      data.project.rebrandingReasons?.length
        ? `• Motivos do Rebranding: ${data.project.rebrandingReasons.map((r) => rebrandReasonLabel[r] || r).join(", ")}`
        : "",
      data.project.websiteType ? `• Formato do Website: ${websiteTypeLabel[data.project.websiteType] || data.project.websiteType}` : "",
      selectedDeliverables.length
        ? `• Aplicações & Entregáveis de interesse: ${selectedDeliverables.map((d) => d.label).join(", ")}`
        : "",
      ``,
      `02. SOBRE O NEGÓCIO`,
      `• Marca / Empresa: ${
        data.business.hasName
          ? data.business.name || (isPt ? "Não informado" : "Not provided")
          : isPt
          ? "Ainda sem nome (incluir Naming)"
          : "No name yet (include Naming)"
      }`,
      `• Segmento de atuação: ${data.business.segment || "—"}`,
      `• Momento atual: ${selectedStage?.title || "—"}`,
      selectedPresence.length ? `• Presença atual: ${selectedPresence.map((p) => p.label).join(", ")}` : "",
      data.project.targetAudience ? `• Público & Percepção: ${data.project.targetAudience}` : "",
      ``,
      `03. DIREÇÃO VISUAL & ATMOSFERA`,
      selectedTerritories.length
        ? `• Territórios estéticos: ${selectedTerritories.map((t) => t.title).join(" + ")}`
        : `• Territórios estéticos: A explorar na direção criativa`,
      `• Espectro de Personalidade:`,
      `  - Clássico ↔ Contemporâneo: ${data.project.brandSpectrum?.classicModern ?? 50}%`,
      `  - Silencioso ↔ Expressivo: ${data.project.brandSpectrum?.minimalExpressive ?? 35}%`,
      `  - Acolhedor ↔ Exclusivo: ${data.project.brandSpectrum?.warmExclusive ?? 60}%`,
      `  - Orgânico ↔ Técnico: ${data.project.brandSpectrum?.organicTechnical ?? 50}%`,
      data.project.references ? `• Referências e inspirações: ${data.project.references}` : "",
      data.project.avoidElements ? `• O que evitar: ${data.project.avoidElements}` : "",
      ``,
      `04. OBJETIVOS, CONTEXTO & PRAZO`,
      `• Motivação do projeto: ${data.project.motivation || "—"}`,
      data.project.desiredChange ? `• Transformação esperada: ${data.project.desiredChange}` : "",
      data.project.freeNotes ? `• Notas livres / Ideias: ${data.project.freeNotes}` : "",
      `• Expectativa de prazo: ${selectedTimeline?.label || "—"}${
        data.planning.specificDate ? ` (${data.planning.specificDate})` : ""
      }`,
      ``,
      `05. IDENTIFICAÇÃO & CONTATO`,
      `• Responsável: ${data.personal.name || "—"} (${
        roles.find((r) => r.id === data.personal.role)?.label || "—"
      })`,
      `• E-mail: ${data.contact.email || "—"}`,
      data.contact.phone ? `• WhatsApp / Telefone: ${data.contact.phone}` : "",
      `• Canal de retorno preferido: ${data.contact.preferredChannel}`,
      data.contact.businessProfile ? `• Instagram / Website atual: ${data.contact.businessProfile}` : "",
    ].filter(Boolean);
    return lines.join("\n");
  };

  const handleCopyDocument = async () => {
    try {
      await navigator.clipboard.writeText(generatePlainTextSummary());
      setCopiedDoc(true);
      setTimeout(() => setCopiedDoc(false), 2500);
    } catch {
      // ignore clipboard error
    }
  };

  const handlePrintDocument = () => {
    window.print();
  };

  // Completion calculation for the Live Briefing Canvas
  const completionItems = [
    Boolean(data.project.primaryNeed),
    Boolean(data.business.segment?.trim() && (!data.business.hasName || data.business.name?.trim())),
    Boolean((data.project.aestheticTerritories?.length || 0) > 0 || data.project.references?.trim()),
    Boolean(data.project.motivation?.trim()),
    Boolean(data.personal.name?.trim() && data.contact.email?.trim()),
  ];
  const completedCount = completionItems.filter(Boolean).length;
  const progressPercent = Math.round(((step + 1) / 5) * 100);

  // Reusable Consolidated Professional Briefing Document Component
  const renderConsolidatedDocument = (isSuccessScreen = false) => {
    const spectrum = data.project.brandSpectrum || {
      classicModern: 50,
      minimalExpressive: 35,
      warmExclusive: 60,
      organicTechnical: 50,
    };

    return (
      <div className="consolidated-briefing-doc" id="printable-briefing-document">
        <div className="doc-top-bar">
          <div>
            <span className="doc-brand-mark">FORTUNATO BRANDS</span>
            <span className="doc-type-label">
              {isPt ? "DOSSIÊ ESTRATÉGICO DE BRIEFING" : "STRATEGIC PROJECT BRIEFING DOSSIER"}
            </span>
          </div>
          <div className="doc-meta-right">
            <span>
              {new Intl.DateTimeFormat(isPt ? "pt-BR" : "en-US", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              }).format(new Date())}
            </span>
            {submissionId && <span className="doc-protocol">REF #{submissionId}</span>}
          </div>
        </div>

        <div className="doc-hero-summary">
          <div className="doc-hero-main">
            <span className="eyebrow">
              {data.business.segment || (isPt ? "Segmento em definição" : "Sector to be defined")}
            </span>
            <h2 className="doc-project-title">
              {data.business.hasName
                ? data.business.name || (isPt ? "Projeto sem nome informado" : "Unnamed Business")
                : isPt
                ? "Nova Marca (Naming + Identidade)"
                : "New Brand (Naming + Identity)"}
            </h2>
          </div>
          <div className="doc-hero-badges">
            <span className="doc-pill-primary">{selectedService?.title || "—"}</span>
            <span className="doc-pill-secondary">{selectedStage?.title || "—"}</span>
            <span className="doc-pill-secondary">{selectedTimeline?.label || "—"}</span>
          </div>
        </div>

        <div className="doc-sections-grid">
          {/* Section 01 */}
          <div className="doc-block">
            <div className="doc-block-head">
              <span className="doc-block-num">01</span>
              <h3>{isPt ? "Diagnóstico & Escopo" : "Diagnosis & Scope"}</h3>
              {!isSuccessScreen && (
                <button type="button" className="doc-edit-btn no-print" onClick={() => jumpToStep(0)}>
                  {isPt ? "Editar" : "Edit"}
                </button>
              )}
            </div>
            <dl className="doc-dl">
              <div>
                <dt>{isPt ? "Frente Principal" : "Primary Service"}</dt>
                <dd>{selectedService?.title || "—"}</dd>
              </div>
              {data.project.namingStatus && (
                <div>
                  <dt>{isPt ? "Situação do Nome" : "Naming Status"}</dt>
                  <dd>{namingLabel[data.project.namingStatus] || data.project.namingStatus}</dd>
                </div>
              )}
              {data.project.existingLogo && (
                <div>
                  <dt>{isPt ? "Identidade Atual" : "Current Identity"}</dt>
                  <dd>{logoLabel[data.project.existingLogo] || data.project.existingLogo}</dd>
                </div>
              )}
              {data.project.rebrandingReasons && data.project.rebrandingReasons.length > 0 && (
                <div>
                  <dt>{isPt ? "Gatilhos do Rebranding" : "Rebranding Drivers"}</dt>
                  <dd>
                    {data.project.rebrandingReasons
                      .map((r) => rebrandReasonLabel[r] || r)
                      .join(" · ")}
                  </dd>
                </div>
              )}
              {data.project.websiteType && (
                <div>
                  <dt>{isPt ? "Formato Digital" : "Website Format"}</dt>
                  <dd>{websiteTypeLabel[data.project.websiteType] || data.project.websiteType}</dd>
                </div>
              )}
              <div>
                <dt>{isPt ? "Pontos de Contato & Entregáveis" : "Touchpoints & Deliverables"}</dt>
                <dd>
                  {selectedDeliverables.length > 0
                    ? selectedDeliverables.map((d) => d.label).join(" · ")
                    : isPt
                    ? "A definir junto à Fortunato Brands"
                    : "To be defined with Fortunato Brands"}
                </dd>
              </div>
            </dl>
          </div>

          {/* Section 02 */}
          <div className="doc-block">
            <div className="doc-block-head">
              <span className="doc-block-num">02</span>
              <h3>{isPt ? "Contexto do Negócio" : "Business Context"}</h3>
              {!isSuccessScreen && (
                <button type="button" className="doc-edit-btn no-print" onClick={() => jumpToStep(1)}>
                  {isPt ? "Editar" : "Edit"}
                </button>
              )}
            </div>
            <dl className="doc-dl">
              <div>
                <dt>{isPt ? "Nome da Marca" : "Brand Name"}</dt>
                <dd>
                  {data.business.hasName
                    ? data.business.name || "—"
                    : isPt
                    ? "A ser desenvolvido (Naming)"
                    : "To be created (Naming)"}
                </dd>
              </div>
              <div>
                <dt>{isPt ? "Setor / Segmento" : "Industry / Sector"}</dt>
                <dd>{data.business.segment || "—"}</dd>
              </div>
              <div>
                <dt>{isPt ? "Estágio de Maturidade" : "Maturity Stage"}</dt>
                <dd>{selectedStage?.title || "—"}</dd>
              </div>
              <div>
                <dt>{isPt ? "Canais Atuais" : "Current Channels"}</dt>
                <dd>
                  {selectedPresence.length > 0
                    ? selectedPresence.map((p) => p.label).join(" · ")
                    : "—"}
                </dd>
              </div>
              {data.project.targetAudience && (
                <div>
                  <dt>{isPt ? "Público & Perfil de Cliente" : "Target Audience"}</dt>
                  <dd>{data.project.targetAudience}</dd>
                </div>
              )}
            </dl>
          </div>

          {/* Section 03 */}
          <div className="doc-block">
            <div className="doc-block-head">
              <span className="doc-block-num">03</span>
              <h3>{isPt ? "Direção Visual & Atmosfera" : "Visual Direction & Atmosphere"}</h3>
              {!isSuccessScreen && (
                <button type="button" className="doc-edit-btn no-print" onClick={() => jumpToStep(2)}>
                  {isPt ? "Editar" : "Edit"}
                </button>
              )}
            </div>
            <dl className="doc-dl">
              <div>
                <dt>{isPt ? "Territórios Estéticos" : "Aesthetic Territories"}</dt>
                <dd>
                  {selectedTerritories.length > 0
                    ? selectedTerritories.map((t) => t.title).join(" + ")
                    : isPt
                    ? "Aberto à recomendação criativa do estúdio"
                    : "Open to studio creative direction"}
                </dd>
              </div>
              <div>
                <dt>{isPt ? "Calibragem de Personalidade" : "Brand Personality Calibration"}</dt>
                <dd className="doc-spectrum-bars">
                  <div className="doc-mini-axis">
                    <span>{isPt ? "Clássico" : "Classic"}</span>
                    <div className="doc-mini-track">
                      <div
                        className="doc-mini-dot"
                        style={{ left: `${spectrum.classicModern ?? 50}%` }}
                      />
                    </div>
                    <span>{isPt ? "Contemporâneo" : "Modern"}</span>
                  </div>
                  <div className="doc-mini-axis">
                    <span>{isPt ? "Silencioso" : "Quiet"}</span>
                    <div className="doc-mini-track">
                      <div
                        className="doc-mini-dot"
                        style={{ left: `${spectrum.minimalExpressive ?? 35}%` }}
                      />
                    </div>
                    <span>{isPt ? "Expressivo" : "Expressive"}</span>
                  </div>
                  <div className="doc-mini-axis">
                    <span>{isPt ? "Acolhedor" : "Warm"}</span>
                    <div className="doc-mini-track">
                      <div
                        className="doc-mini-dot"
                        style={{ left: `${spectrum.warmExclusive ?? 60}%` }}
                      />
                    </div>
                    <span>{isPt ? "Exclusivo" : "Exclusive"}</span>
                  </div>
                  <div className="doc-mini-axis">
                    <span>{isPt ? "Orgânico" : "Organic"}</span>
                    <div className="doc-mini-track">
                      <div
                        className="doc-mini-dot"
                        style={{ left: `${spectrum.organicTechnical ?? 50}%` }}
                      />
                    </div>
                    <span>{isPt ? "Técnico" : "Technical"}</span>
                  </div>
                </dd>
              </div>
              {data.project.references && (
                <div>
                  <dt>{isPt ? "Referências & Marcas Admiradas" : "References & Benchmarks"}</dt>
                  <dd>{data.project.references}</dd>
                </div>
              )}
              {data.project.avoidElements && (
                <div>
                  <dt>{isPt ? "Restrições / O que Evitar" : "Elements to Avoid"}</dt>
                  <dd>{data.project.avoidElements}</dd>
                </div>
              )}
            </dl>
          </div>

          {/* Section 04 */}
          <div className="doc-block">
            <div className="doc-block-head">
              <span className="doc-block-num">04</span>
              <h3>{isPt ? "Objetivos, Ideias & Prazo" : "Goals, Ideas & Timeline"}</h3>
              {!isSuccessScreen && (
                <button type="button" className="doc-edit-btn no-print" onClick={() => jumpToStep(3)}>
                  {isPt ? "Editar" : "Edit"}
                </button>
              )}
            </div>
            <dl className="doc-dl">
              <div>
                <dt>{isPt ? "Motivação Central" : "Core Motivation"}</dt>
                <dd>{data.project.motivation || "—"}</dd>
              </div>
              {data.project.desiredChange && (
                <div>
                  <dt>{isPt ? "Transformação Esperada" : "Desired Transformation"}</dt>
                  <dd>{data.project.desiredChange}</dd>
                </div>
              )}
              {data.project.freeNotes && (
                <div>
                  <dt>{isPt ? "Notas Livres & Ideias" : "Free Notes & Ideas"}</dt>
                  <dd>{data.project.freeNotes}</dd>
                </div>
              )}
              <div>
                <dt>{isPt ? "Horizonte de Prazo" : "Target Timeline"}</dt>
                <dd>
                  {selectedTimeline?.label || "—"}
                  {data.planning.specificDate ? ` (${data.planning.specificDate})` : ""}
                </dd>
              </div>
            </dl>
          </div>
        </div>

        {/* Footer Contact Bar in Document */}
        <div className="doc-footer-bar">
          <div>
            <span className="doc-footer-label">{isPt ? "Solicitante:" : "Requested by:"}</span>{" "}
            <strong>{data.personal.name || "—"}</strong>{" "}
            {data.personal.role && (
              <span className="doc-muted">
                ({roles.find((r) => r.id === data.personal.role)?.label})
              </span>
            )}
          </div>
          <div>
            <span className="doc-footer-label">{isPt ? "Contato:" : "Contact:"}</span>{" "}
            <span>{data.contact.email || "—"}</span>
            {data.contact.phone ? ` · ${data.contact.phone}` : ""}
          </div>
          <div className="doc-actions-inline no-print">
            <button type="button" className="doc-action-btn" onClick={handleCopyDocument}>
              {copiedDoc
                ? isPt
                  ? "✓ Copiado"
                  : "✓ Copied"
                : isPt
                ? "Copiar documento"
                : "Copy document"}
            </button>
            <button type="button" className="doc-action-btn primary" onClick={handlePrintDocument}>
              {isPt ? "Imprimir / Salvar PDF" : "Print / Save PDF"}
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Visual schematic SVG diagrams for service cards
  const renderServiceDiagram = (type: string) => {
    switch (type) {
      case "identity":
        return (
          <svg className="service-schematic" viewBox="0 0 56 40" fill="none" aria-hidden="true">
            <rect x="2" y="4" width="22" height="32" rx="2" stroke="currentColor" strokeWidth="1.25" />
            <circle cx="13" cy="15" r="5" stroke="currentColor" strokeWidth="1.25" />
            <line x1="7" y1="27" x2="19" y2="27" stroke="currentColor" strokeWidth="1.25" />
            <rect x="29" y="4" width="25" height="14" rx="2" stroke="currentColor" strokeWidth="1.25" />
            <rect x="29" y="22" width="11" height="14" rx="2" stroke="currentColor" strokeWidth="1.25" />
            <rect x="43" y="22" width="11" height="14" rx="2" stroke="currentColor" strokeWidth="1.25" />
          </svg>
        );
      case "rebrand":
        return (
          <svg className="service-schematic" viewBox="0 0 56 40" fill="none" aria-hidden="true">
            <circle
              cx="18"
              cy="20"
              r="12"
              stroke="currentColor"
              strokeWidth="1.25"
              strokeDasharray="3 3"
            />
            <circle cx="36" cy="20" r="12" stroke="currentColor" strokeWidth="1.5" />
            <path d="M22 20H32M32 20L28.5 16.5M32 20L28.5 23.5" stroke="currentColor" strokeWidth="1.25" />
          </svg>
        );
      case "newbrand":
        return (
          <svg className="service-schematic" viewBox="0 0 56 40" fill="none" aria-hidden="true">
            <rect x="4" y="6" width="48" height="28" rx="3" stroke="currentColor" strokeWidth="1.25" />
            <path d="M14 25L20 13L26 25M16 21.5H24" stroke="currentColor" strokeWidth="1.3" />
            <line x1="31" y1="14" x2="43" y2="14" stroke="currentColor" strokeWidth="1.25" />
            <line x1="31" y1="20" x2="40" y2="20" stroke="currentColor" strokeWidth="1.25" />
            <line x1="31" y1="25" x2="36" y2="25" stroke="currentColor" strokeWidth="1.25" />
          </svg>
        );
      case "website":
        return (
          <svg className="service-schematic" viewBox="0 0 56 40" fill="none" aria-hidden="true">
            <rect x="3" y="5" width="50" height="30" rx="3" stroke="currentColor" strokeWidth="1.25" />
            <line x1="3" y1="12" x2="53" y2="12" stroke="currentColor" strokeWidth="1.25" />
            <circle cx="8" cy="8.5" r="1" fill="currentColor" />
            <circle cx="12" cy="8.5" r="1" fill="currentColor" />
            <rect x="8" y="16" width="22" height="14" rx="1.5" stroke="currentColor" strokeWidth="1.15" />
            <line x1="34" y1="18" x2="47" y2="18" stroke="currentColor" strokeWidth="1.25" />
            <line x1="34" y1="23" x2="44" y2="23" stroke="currentColor" strokeWidth="1.25" />
            <line x1="34" y1="28" x2="41" y2="28" stroke="currentColor" strokeWidth="1.25" />
          </svg>
        );
      default:
        return (
          <svg className="service-schematic" viewBox="0 0 56 40" fill="none" aria-hidden="true">
            <circle cx="28" cy="20" r="14" stroke="currentColor" strokeWidth="1.25" />
            <polygon points="24,24 26,16 34,14 31,22" stroke="currentColor" strokeWidth="1.25" />
            <circle cx="28" cy="20" r="1.5" fill="currentColor" />
          </svg>
        );
    }
  };

  if (status === "success") {
    return (
      <div className="container briefing-success-wrapper">
        <div className="briefing-success-card no-print">
          <div className="success-icon-badge">✓</div>
          <span className="eyebrow">
            {isPt ? "Briefing Consolidado & Enviado" : "Briefing Consolidated & Sent"}
          </span>
          <h1>
            {isPt
              ? "Recebemos o dossiê do seu projeto."
              : "We have received your project dossier."}
          </h1>
          <p className="success-desc">
            {isPt
              ? `Obrigado, ${data.personal.name || ""}. Suas ideias, referências e objetivos foram organizados em um documento estruturado que nossa direção já está analisando.`
              : `Thank you, ${data.personal.name || ""}. Your ideas, references, and goals have been organized into a structured document for our review.`}
          </p>

          <div className="next-steps-box">
            <h4>{isPt ? "Próximos passos do nosso processo:" : "Next steps in our process:"}</h4>
            <ol className="next-steps-list">
              <li>
                <strong>{isPt ? "01. Leitura estratégica do dossiê" : "01. Strategic dossier review"}</strong>
                <span>
                  {isPt
                    ? "Avaliamos o momento do negócio, o território visual desejado e o escopo mais adequado."
                    : "We assess your business stage, desired visual territory, and optimal scope."}
                </span>
              </li>
              <li>
                <strong>{isPt ? "02. Retorno direto em 24h a 48h úteis" : "02. Direct response in 24–48 business hours"}</strong>
                <span>
                  {isPt
                    ? "Entraremos em contato pelo canal de sua preferência com nosso diagnóstico inicial e proposta de trabalho."
                    : "We will reach out via your preferred channel with our initial diagnosis and proposal."}
                </span>
              </li>
            </ol>
          </div>

          <div className="success-actions">
            <button type="button" className="button" onClick={handlePrintDocument}>
              {isPt ? "Baixar / Imprimir Dossiê em PDF" : "Download / Print PDF Dossier"}
            </button>
            <Link className="link" href={`/${locale}/projects`}>
              {isPt ? "Explorar projetos selecionados" : "Explore selected projects"} →
            </Link>
            <Link className="link" href={`/${locale}`}>
              {isPt ? "Voltar ao início" : "Back to home"} →
            </Link>
          </div>
        </div>

        <div className="success-document-preview">
          <div className="doc-preview-caption no-print">
            <span className="eyebrow">
              {isPt ? "Documento Gerado Automaticamente" : "Automatically Generated Document"}
            </span>
            <p>
              {isPt
                ? "Guarde este documento para sua referência ou compartilhe com seus sócios."
                : "Keep this document for your reference or share it with your partners."}
            </p>
          </div>
          {renderConsolidatedDocument(true)}
        </div>
      </div>
    );
  }

  return (
    <div className="container discovery-workspace">
      {/* Intro Header */}
      <header className="discovery-top-intro no-print">
        <div className="discovery-intro-left">
          <span className="eyebrow">
            {isPt
              ? "Assistente de Descoberta de Projetos · Fortunato Brands"
              : "Project Discovery Assistant · Fortunato Brands"}
          </span>
          <p className="discovery-reassurance">
            {isPt
              ? "Você não precisa dominar termos técnicos nem ter tudo definido. Suas respostas são organizadas automaticamente em um dossiê estratégico ao lado."
              : "You don't need technical terms or a fully defined project. Your answers are automatically organized into a strategic dossier alongside."}
          </p>
        </div>

        {/* Mobile Dossier Toggle */}
        <button
          type="button"
          className="mobile-dossier-toggle"
          onClick={() => setMobileDossierOpen((o) => !o)}
        >
          <span>{isPt ? "Ver Dossiê do Projeto" : "View Project Dossier"}</span>
          <span className="dossier-count-badge">{completedCount}/5</span>
        </button>
      </header>

      {/* Progress Stepper Bar */}
      <nav
        className="briefing-stepper-header no-print"
        aria-label={isPt ? "Etapas do briefing" : "Briefing steps"}
      >
        <div className="briefing-steps-bar">
          <div className="briefing-steps-progress" style={{ width: `${progressPercent}%` }} />
        </div>

        <div className="briefing-step-indicators">
          {stepTitles.map((st, idx) => (
            <button
              key={st.num}
              type="button"
              className={`step-pill-btn ${idx === step ? "active" : ""} ${
                idx < step ? "completed" : ""
              }`}
              onClick={() => {
                if (idx <= step) {
                  setGeneralError("");
                  setErrors({});
                  setStep(idx);
                } else {
                  jumpToStep(idx);
                }
              }}
              aria-current={idx === step ? "step" : undefined}
            >
              <span className="step-num">{idx < step ? "✓" : st.num}</span>
              <span className="step-label">{st.label}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* Main Split Layout: Interactive Assistant + Live Dossier Canvas */}
      <div className="discovery-grid">
        {/* LEFT COLUMN: Interactive Questionnaire */}
        <div className="briefing-content-card no-print">
          <div className="step-header">
            <span className="step-badge">
              {isPt ? `Etapa 0${step + 1} de 05 · ${stepTitles[step].label}` : `Step 0${step + 1} of 05 · ${stepTitles[step].label}`}
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

          {/* =========================================================
              STEP 01: ESCOPO & DEMANDA
              ========================================================= */}
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
                      <div className="service-card-layout">
                        <div className="service-card-main">
                          <div className="card-top">
                            <div className="card-radio-circle">{isSelected ? "●" : ""}</div>
                            <div>
                              <span className="service-code-label">{srv.code}</span>
                              <h3 className="card-title">{srv.title}</h3>
                            </div>
                          </div>
                          <p className="card-desc">{srv.desc}</p>
                          <div className="service-tags-row">
                            {srv.tags.map((tg) => (
                              <span key={tg} className="service-mini-tag">
                                {tg}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="service-card-visual">
                          {renderServiceDiagram(srv.diagram)}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
              {errors["project.primaryNeed"] && (
                <p className="field-error-msg">{errors["project.primaryNeed"]}</p>
              )}

              {/* Contextual Sub-questions */}
              {conditional.namingStatus && (
                <div className="conditional-box">
                  <div className="conditional-header">
                    <span className="eyebrow">
                      {isPt ? "Pergunta Contextual · Naming" : "Contextual Question · Naming"}
                    </span>
                    <label className="field-title">
                      {isPt
                        ? "Seu novo negócio já possui um nome definido?"
                        : "Does your new business already have a defined name?"}
                    </label>
                  </div>
                  <div className="chips-grid">
                    {[
                      ["has-name", isPt ? "Sim, já definimos o nome" : "Yes, we have a name"],
                      ["needs-name", isPt ? "Não, precisamos criar o nome (Naming)" : "No, we need Naming"],
                      ["deciding", isPt ? "Temos ideias, mas queremos ajuda para validar" : "We have ideas, need validation"],
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
                  <div className="conditional-header">
                    <span className="eyebrow">
                      {isPt ? "Pergunta Contextual · Situação Visual" : "Contextual Question · Current Identity"}
                    </span>
                    <label className="field-title">
                      {isPt
                        ? "Como está a identidade visual da empresa hoje?"
                        : "What is the current state of your visual identity?"}
                    </label>
                  </div>
                  <div className="chips-grid">
                    {[
                      ["no", isPt ? "Não temos logotipo nem identidade ainda" : "Nothing created yet"],
                      ["temporary", isPt ? "Temos algo provisório / feito internamente" : "We have a temporary logo"],
                      ["yes", isPt ? "Já temos um logotipo e queremos evoluir o sistema" : "We have a logo and want a full system"],
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
                  <div className="conditional-header">
                    <span className="eyebrow">
                      {isPt ? "Diagnóstico de Rebranding" : "Rebranding Diagnosis"}
                    </span>
                    <label className="field-title">
                      {isPt
                        ? "O que faz você sentir que a marca atual precisa mudar? (Pode marcar mais de uma)"
                        : "Why do you feel your current brand needs to evolve? (Select one or more)"}
                    </label>
                  </div>
                  <div className="chips-grid">
                    {[
                      ["outdated", isPt ? "A marca parece antiga ou desatualizada" : "Brand feels outdated"],
                      ["professionalizing", isPt ? "O negócio cresceu e a marca não acompanhou" : "Business outgrew the brand"],
                      ["repositioning", isPt ? "Queremos atrair clientes de maior valor" : "Attract higher-tier clients"],
                      ["business-changed", isPt ? "Mudamos nosso foco, produtos ou público" : "Focus or audience shifted"],
                      ["other", isPt ? "Outro motivo específico" : "Other reason"],
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
                  <div className="conditional-header">
                    <span className="eyebrow">
                      {isPt ? "Arquitetura Digital" : "Digital Architecture"}
                    </span>
                    <label className="field-title">
                      {isPt
                        ? "Qual estrutura de website atende melhor o seu objetivo?"
                        : "What website format best fits your goal?"}
                    </label>
                  </div>
                  <div className="chips-grid">
                    {[
                      ["institutional", isPt ? "Site Institucional Completo" : "Full Institutional Website"],
                      ["landing-page", isPt ? "Landing Page de Apresentação / Conversão" : "Landing Page"],
                      ["portfolio", isPt ? "Portfólio / Acervo de Projetos" : "Portfolio / Showcase"],
                      ["unsure", isPt ? "Preciso de recomendação" : "I need a recommendation"],
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

              {/* Touchpoints & Deliverables selector */}
              <div className="input-group deliverables-box">
                <span className="eyebrow">
                  {isPt ? "Aplicações Práticas (Opcional)" : "Practical Applications (Optional)"}
                </span>
                <label className="field-title">
                  {isPt
                    ? "Onde você imagina sua marca sendo aplicada no dia a dia?"
                    : "Where do you envision your brand being applied day-to-day?"}
                </label>
                <p className="field-subtitle">
                  {isPt
                    ? "Selecione os materiais que podem ser importantes para o seu negócio."
                    : "Select the touchpoints that may be important for your business."}
                </p>
                <div className="chips-grid">
                  {deliverableOptions.map((item) => {
                    const active = (data.project.deliverables || []).includes(item.id);
                    return (
                      <button
                        key={item.id}
                        type="button"
                        className={`chip-button ${active ? "active" : ""}`}
                        onClick={() =>
                          toggleArrayItem("project.deliverables", data.project.deliverables, item.id)
                        }
                      >
                        {active ? "✓ " : "+ "}
                        {item.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* =========================================================
              STEP 02: NEGÓCIO & MOMENTO
              ========================================================= */}
          {step === 1 && (
            <div className="step-section">
              <div className="input-group">
                <div className="label-row">
                  <label className="field-title" htmlFor="business-name-input">
                    {isPt ? "Qual é o nome do seu negócio ou marca?" : "What is your business or brand name?"}
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
                    placeholder={
                      isPt ? "Ex: Sublime Mel, Palomo Odontologia..." : "e.g. Sublime Mel, Studio..."
                    }
                    value={data.business.name || ""}
                    onChange={(e) => set("business.name", e.target.value)}
                  />
                ) : (
                  <div className="input-placeholder-box">
                    {isPt
                      ? "✓ Registrado no dossiê: o projeto avaliará a criação de Naming (nome da marca)."
                      : "✓ Recorded in dossier: the project will evaluate Naming creation."}
                  </div>
                )}
                {errors["business.name"] && (
                  <p className="field-error-msg">{errors["business.name"]}</p>
                )}
              </div>

              <div className="input-group">
                <label className="field-title" htmlFor="business-segment-input">
                  {isPt ? "Em que segmento ou mercado sua empresa atua?" : "What industry or sector are you in?"}
                </label>
                <input
                  id="business-segment-input"
                  className={`text-input ${errors["business.segment"] ? "input-error" : ""}`}
                  placeholder={
                    isPt
                      ? "Descreva com suas palavras ou escolha uma sugestão abaixo"
                      : "Describe in your own words or pick a suggestion below"
                  }
                  value={data.business.segment}
                  onChange={(e) => set("business.segment", e.target.value)}
                />
                {errors["business.segment"] && (
                  <p className="field-error-msg">{errors["business.segment"]}</p>
                )}

                <div className="suggestion-tags-row">
                  <span className="tags-hint">
                    {isPt ? "Setores frequentes:" : "Common sectors:"}
                  </span>
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

              <div className="input-group">
                <label className="field-title">
                  {isPt ? "Em que momento o negócio está hoje?" : "What stage is your business currently in?"}
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
                          <div>
                            <span className="stage-index-tag">{stg.index}</span>
                            <h4 className="compact-title">{stg.title}</h4>
                          </div>
                        </div>
                        <p className="compact-desc">{stg.desc}</p>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="input-group">
                <label className="field-title">
                  {isPt
                    ? "Onde sua marca já está presente hoje? (Opcional)"
                    : "Where is your brand currently present? (Optional)"}
                </label>
                <div className="chips-grid">
                  {presenceChannels.map((ch) => {
                    const active = (data.business.presence || []).includes(ch.id);
                    return (
                      <button
                        key={ch.id}
                        type="button"
                        className={`chip-button ${active ? "active" : ""}`}
                        onClick={() =>
                          toggleArrayItem("business.presence", data.business.presence, ch.id, 7)
                        }
                      >
                        {active ? "✓ " : "+ "}
                        {ch.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="input-group">
                <label className="field-title" htmlFor="target-audience-input">
                  {isPt
                    ? "Quem é o cliente que você atende ou deseja atrair? (Opcional)"
                    : "Who is the client you serve or want to attract? (Optional)"}
                </label>
                <p className="field-subtitle">
                  {isPt
                    ? "Conte de forma simples quem compra de você e o que essas pessoas mais valorizam."
                    : "Describe simply who buys from you and what they value most."}
                </p>
                <textarea
                  id="target-audience-input"
                  className="textarea-input"
                  rows={3}
                  placeholder={
                    isPt
                      ? "Ex: Atendemos famílias e profissionais que buscam atendimento especializado e valorizam confiança, clareza e qualidade..."
                      : "e.g. We serve families and professionals who value trust, clarity, and high quality..."
                  }
                  value={data.project.targetAudience || ""}
                  onChange={(e) => set("project.targetAudience", e.target.value)}
                />
              </div>
            </div>
          )}

          {/* =========================================================
              STEP 03: DIREÇÃO VISUAL & ATMOSFERA
              ========================================================= */}
          {step === 2 && (
            <div className="step-section">
              <div className="input-group">
                <span className="eyebrow">
                  {isPt ? "Exploração Visual Assistida" : "Guided Visual Exploration"}
                </span>
                <label className="field-title">
                  {isPt
                    ? "Quais territórios visuais mais combinam com o futuro da sua marca? (Escolha até 2)"
                    : "Which visual territories best match your brand's future? (Choose up to 2)"}
                </label>
                <p className="field-subtitle">
                  {isPt
                    ? "Estes cartões ajudam a traduzir sensações visuais sem que você precise usar termos de design."
                    : "These cards help translate visual feelings without needing design terminology."}
                </p>

                <div className="territory-cards-grid">
                  {aestheticTerritories.map((ter) => {
                    const isSelected = (data.project.aestheticTerritories || []).includes(ter.id);
                    return (
                      <button
                        key={ter.id}
                        type="button"
                        className={`territory-card ${isSelected ? "selected" : ""}`}
                        onClick={() =>
                          toggleArrayItem(
                            "project.aestheticTerritories",
                            data.project.aestheticTerritories,
                            ter.id,
                            2
                          )
                        }
                      >
                        <div className="territory-visual-preview" data-style={ter.sampleStyle}>
                          <span className="territory-glyph">{ter.sampleType}</span>
                          <div className="territory-swatches">
                            {ter.swatches.map((color) => (
                              <span
                                key={color}
                                className="swatch-dot"
                                style={{ backgroundColor: color }}
                              />
                            ))}
                          </div>
                        </div>
                        <div className="territory-meta">
                          <div className="territory-title-row">
                            <h4>{ter.title}</h4>
                            <span className="territory-check">{isSelected ? "✓" : "+"}</span>
                          </div>
                          <p>{ter.desc}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Brand Personality Spectrum Sliders */}
              <div className="input-group spectrum-panel">
                <span className="eyebrow">
                  {isPt ? "Termômetro de Personalidade" : "Brand Personality Calibration"}
                </span>
                <label className="field-title">
                  {isPt
                    ? "Onde sua marca deve se posicionar nestes 4 eixos?"
                    : "Where should your brand sit along these 4 axes?"}
                </label>
                <p className="field-subtitle">
                  {isPt
                    ? "Deslize os controles para calibrar o tom da identidade."
                    : "Slide the controls to calibrate the tone of the identity."}
                </p>

                <div className="spectrum-sliders-list">
                  {[
                    {
                      key: "classicModern" as const,
                      left: isPt ? "Clássica & Tradicional" : "Classic & Traditional",
                      right: isPt ? "Contemporânea & Ousada" : "Contemporary & Bold",
                      val: data.project.brandSpectrum?.classicModern ?? 50,
                    },
                    {
                      key: "minimalExpressive" as const,
                      left: isPt ? "Silenciosa & Minimalista" : "Quiet & Minimal",
                      right: isPt ? "Expressiva & Vibrante" : "Expressive & Vibrant",
                      val: data.project.brandSpectrum?.minimalExpressive ?? 35,
                    },
                    {
                      key: "warmExclusive" as const,
                      left: isPt ? "Próxima & Acolhedora" : "Warm & Approachable",
                      right: isPt ? "Exclusiva & Sofisticada" : "Exclusive & Elevated",
                      val: data.project.brandSpectrum?.warmExclusive ?? 60,
                    },
                    {
                      key: "organicTechnical" as const,
                      left: isPt ? "Orgânica & Humana" : "Organic & Human",
                      right: isPt ? "Técnica & Precisa" : "Technical & Precise",
                      val: data.project.brandSpectrum?.organicTechnical ?? 50,
                    },
                  ].map((axis) => (
                    <div key={axis.key} className="spectrum-row">
                      <div className="spectrum-labels">
                        <span>{axis.left}</span>
                        <span>{axis.right}</span>
                      </div>
                      <input
                        type="range"
                        min={0}
                        max={100}
                        step={5}
                        value={axis.val}
                        onChange={(e) => setSpectrum(axis.key, Number(e.target.value))}
                        className="spectrum-range-input"
                        aria-label={`${axis.left} - ${axis.right}`}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Visual References & What to Avoid */}
              <div className="form-grid-2">
                <div className="input-group">
                  <label className="field-title" htmlFor="references-input">
                    {isPt
                      ? "Marcas, links ou referências que você admira (Opcional)"
                      : "Brands, links, or references you admire (Optional)"}
                  </label>
                  <textarea
                    id="references-input"
                    className="textarea-input"
                    rows={4}
                    placeholder={
                      isPt
                        ? "Podem ser marcas do seu setor ou de outros mercados, perfis do Instagram, sites ou estilos visuais..."
                        : "Can be brands from your sector or others, Instagram profiles, websites, or styles..."
                    }
                    value={data.project.references || ""}
                    onChange={(e) => set("project.references", e.target.value)}
                  />
                </div>

                <div className="input-group">
                  <label className="field-title" htmlFor="avoid-input">
                    {isPt
                      ? "O que você NÃO quer na sua marca? (Opcional)"
                      : "What do you want to AVOID in your brand? (Optional)"}
                  </label>
                  <textarea
                    id="avoid-input"
                    className="textarea-input"
                    rows={4}
                    placeholder={
                      isPt
                        ? "Ex: Cores muito infantis, clichês do meu setor, visual excessivamente corporativo ou genérico..."
                        : "e.g. Specific colors, industry clichés, overly corporate or generic aesthetics..."
                    }
                    value={data.project.avoidElements || ""}
                    onChange={(e) => set("project.avoidElements", e.target.value)}
                  />
                </div>
              </div>
            </div>
          )}

          {/* =========================================================
              STEP 04: OBJETIVOS, IDEIAS LIVRES & PRAZO
              ========================================================= */}
          {step === 3 && (
            <div className="step-section">
              <div className="input-group">
                <label className="field-title" htmlFor="motivation-input">
                  {isPt
                    ? "O que motivou a busca por este projeto agora?"
                    : "What motivated you to start this project now?"}
                </label>
                <p className="field-subtitle">
                  {isPt
                    ? "Escreva com suas palavras ou clique em um dos pontos de partida abaixo para ajudar a organizar sua ideia:"
                    : "Write in your own words or click a starting prompt below to help structure your thoughts:"}
                </p>

                <div className="prompt-helpers-row">
                  {motivationPrompts.map((p) => (
                    <button
                      key={p.label}
                      type="button"
                      className="prompt-helper-btn"
                      onClick={() => {
                        const current = data.project.motivation?.trim() || "";
                        const nextText = current ? `${current}\n\n${p.text}` : p.text;
                        set("project.motivation", nextText);
                      }}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>

                <textarea
                  id="motivation-input"
                  className={`textarea-input ${errors["project.motivation"] ? "input-error" : ""}`}
                  rows={4}
                  placeholder={
                    isPt
                      ? "Conte sobre o momento atual e o que fez você buscar esse próximo passo..."
                      : "Tell us about your current moment and what sparked this next step..."
                  }
                  value={data.project.motivation}
                  onChange={(e) => set("project.motivation", e.target.value)}
                />
                {errors["project.motivation"] && (
                  <p className="field-error-msg">{errors["project.motivation"]}</p>
                )}
              </div>

              <div className="input-group">
                <label className="field-title" htmlFor="desired-change-input">
                  {isPt
                    ? "Quando o projeto estiver pronto, que percepção você quer despertar? (Opcional)"
                    : "When the project is complete, what perception do you want to create? (Optional)"}
                </label>
                <textarea
                  id="desired-change-input"
                  className="textarea-input"
                  rows={3}
                  placeholder={
                    isPt
                      ? "Ex: Quero que o cliente sinta imediatamente que somos uma marca sólida, confiável e com padrão superior..."
                      : "e.g. I want clients to immediately feel we are a solid, trustworthy brand with superior standards..."
                  }
                  value={data.project.desiredChange || ""}
                  onChange={(e) => set("project.desiredChange", e.target.value)}
                />
              </div>

              {/* Free Expression Canvas */}
              <div className="input-group free-canvas-box">
                <div className="free-canvas-head">
                  <span className="eyebrow">
                    {isPt ? "Espaço Livre de Ideias (Opcional)" : "Free Idea Canvas (Optional)"}
                  </span>
                  <label className="field-title" htmlFor="free-notes-input">
                    {isPt
                      ? "Deseja acrescentar alguma ideia, história, detalhe do produto ou dúvida?"
                      : "Would you like to add any free ideas, backstory, product details, or questions?"}
                  </label>
                </div>
                <textarea
                  id="free-notes-input"
                  className="textarea-input free-canvas-textarea"
                  rows={4}
                  placeholder={
                    isPt
                      ? "Use este espaço livremente para registrar qualquer pensamento solto, curiosidades sobre o negócio ou expectativas específicas..."
                      : "Use this space freely to jot down any thoughts, business backstory, or specific expectations..."
                  }
                  value={data.project.freeNotes || ""}
                  onChange={(e) => set("project.freeNotes", e.target.value)}
                />
              </div>

              {/* Timeline */}
              <div className="input-group">
                <label className="field-title">
                  {isPt
                    ? "Qual é a sua expectativa de prazo para este projeto?"
                    : "What is your expected timeline for this project?"}
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
            </div>
          )}

          {/* =========================================================
              STEP 05: CONTATO & DOCUMENTO CONSOLIDADO
              ========================================================= */}
          {step === 4 && (
            <div className="step-section">
              <div className="form-grid-2">
                <div className="input-group">
                  <label className="field-title" htmlFor="name-input">
                    {isPt ? "Como podemos te chamar?" : "What should we call you?"}
                  </label>
                  <input
                    id="name-input"
                    className={`text-input ${errors["personal.name"] ? "input-error" : ""}`}
                    placeholder={isPt ? "Seu nome" : "Your name"}
                    value={data.personal.name}
                    onChange={(e) => set("personal.name", e.target.value)}
                  />
                  {errors["personal.name"] && (
                    <p className="field-error-msg">{errors["personal.name"]}</p>
                  )}
                </div>

                <div className="input-group">
                  <label className="field-title">
                    {isPt ? "Seu papel no negócio" : "Your role in the business"}
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
                    {isPt ? "E-mail para retorno" : "Contact email"}
                  </label>
                  <input
                    id="email-input"
                    type="email"
                    className={`text-input ${errors["contact.email"] ? "input-error" : ""}`}
                    placeholder="voce@empresa.com"
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
                    {isPt ? "Canal de preferência para conversarmos" : "Preferred contact channel"}
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
                    {isPt
                      ? "Instagram ou Website da empresa (Opcional)"
                      : "Company Instagram or Website (Optional)"}
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

              <div className="input-group">
                <label className="field-title">
                  {isPt ? "Como você conheceu a Fortunato Brands? (Opcional)" : "How did you hear about Fortunato Brands? (Optional)"}
                </label>
                <div className="chips-grid-compact">
                  {sources.map((src) => (
                    <button
                      key={src.id}
                      type="button"
                      className={`chip-button-sm ${data.contact.source === src.id ? "active" : ""}`}
                      onClick={() => set("contact.source", src.id)}
                    >
                      {src.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Consolidated Professional Briefing Document Preview */}
              <div className="doc-preview-section">
                <div className="doc-preview-header">
                  <div>
                    <span className="eyebrow">
                      {isPt ? "Documento Consolidado Automaticamente" : "Automatically Consolidated Document"}
                    </span>
                    <h3>
                      {isPt
                        ? "Dossiê do seu Projeto"
                        : "Your Project Dossier"}
                    </h3>
                  </div>
                </div>
                {renderConsolidatedDocument(false)}
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
                      ? "Li e concordo com o uso das informações enviadas para análise e contato sobre este projeto pela Fortunato Brands."
                      : "I agree to the use of the submitted information for project analysis and contact by Fortunato Brands."}
                  </span>
                </label>
                {errors["consent.privacyAccepted"] && (
                  <p className="field-error-msg">{errors["consent.privacyAccepted"]}</p>
                )}

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

          {/* Navigation Footer */}
          <div className="briefing-form-actions">
            {step > 0 ? (
              <button className="back-btn" type="button" onClick={back}>
                ← {isPt ? "Etapa anterior" : "Previous step"}
              </button>
            ) : (
              <Link className="back-btn" href={`/${locale}`}>
                ← {isPt ? "Voltar ao site" : "Back to site"}
              </Link>
            )}

            <div className="actions-right">
              {step < 4 ? (
                <button className="button primary-btn" type="button" onClick={next}>
                  {isPt ? "Continuar descoberta" : "Continue discovery"} →
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
                      ? "Consolidando e enviando…"
                      : "Consolidating & sending…"
                    : isPt
                    ? "Enviar briefing do projeto"
                    : "Submit project briefing"}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Live Notion-style Briefing Dossier Sidebar */}
        <aside
          className={`live-dossier-sidebar no-print ${mobileDossierOpen ? "mobile-open" : ""}`}
          aria-label={isPt ? "Resumo estruturado em tempo real" : "Real-time structured summary"}
        >
          <div className="live-dossier-card">
            <div className="live-dossier-header">
              <div>
                <span className="eyebrow">{isPt ? "Organização Automática" : "Auto-Organized"}</span>
                <h3>{isPt ? "Dossiê em Construção" : "Live Project Dossier"}</h3>
              </div>
              <span className="live-status-pill">
                <span className="live-dot" />
                {Math.round((completedCount / 5) * 100)}%
              </span>
            </div>

            <div className="live-dossier-sections">
              {/* Block 1 */}
              <div
                className={`live-block ${step === 0 ? "current" : ""}`}
                onClick={() => jumpToStep(0)}
              >
                <div className="live-block-title">
                  <span>01 · {isPt ? "Escopo" : "Scope"}</span>
                  <span className="live-edit-hint">{isPt ? "Ir" : "Go"} →</span>
                </div>
                <p className="live-block-primary">{selectedService?.title || "—"}</p>
                {selectedDeliverables.length > 0 && (
                  <p className="live-block-sub">
                    {selectedDeliverables.map((d) => d.label).join(", ")}
                  </p>
                )}
              </div>

              {/* Block 2 */}
              <div
                className={`live-block ${step === 1 ? "current" : ""}`}
                onClick={() => jumpToStep(1)}
              >
                <div className="live-block-title">
                  <span>02 · {isPt ? "Negócio" : "Business"}</span>
                  <span className="live-edit-hint">{isPt ? "Ir" : "Go"} →</span>
                </div>
                <p className="live-block-primary">
                  {data.business.hasName
                    ? data.business.name || (isPt ? "Nome a informar" : "Name pending")
                    : isPt
                    ? "Naming a criar no projeto"
                    : "Naming to be created"}
                </p>
                <p className="live-block-sub">
                  {data.business.segment || (isPt ? "Segmento a informar" : "Sector pending")} ·{" "}
                  {selectedStage?.title}
                </p>
              </div>

              {/* Block 3 */}
              <div
                className={`live-block ${step === 2 ? "current" : ""}`}
                onClick={() => jumpToStep(2)}
              >
                <div className="live-block-title">
                  <span>03 · {isPt ? "Território Visual" : "Visual Territory"}</span>
                  <span className="live-edit-hint">{isPt ? "Ir" : "Go"} →</span>
                </div>
                <p className="live-block-primary">
                  {selectedTerritories.length > 0
                    ? selectedTerritories.map((t) => t.title).join(" + ")
                    : isPt
                    ? "Calibragem padrão ativa"
                    : "Default calibration active"}
                </p>
                <div className="live-mini-bars">
                  <span style={{ width: `${data.project.brandSpectrum?.classicModern ?? 50}%` }} />
                  <span style={{ width: `${data.project.brandSpectrum?.minimalExpressive ?? 35}%` }} />
                  <span style={{ width: `${data.project.brandSpectrum?.warmExclusive ?? 60}%` }} />
                </div>
              </div>

              {/* Block 4 */}
              <div
                className={`live-block ${step === 3 ? "current" : ""}`}
                onClick={() => jumpToStep(3)}
              >
                <div className="live-block-title">
                  <span>04 · {isPt ? "Contexto & Prazo" : "Context & Timeline"}</span>
                  <span className="live-edit-hint">{isPt ? "Ir" : "Go"} →</span>
                </div>
                <p className="live-block-primary">
                  {data.project.motivation
                    ? data.project.motivation.length > 75
                      ? `${data.project.motivation.slice(0, 75)}…`
                      : data.project.motivation
                    : isPt
                    ? "Motivação a descrever"
                    : "Motivation pending"}
                </p>
                <p className="live-block-sub">{selectedTimeline?.label}</p>
              </div>

              {/* Block 5 */}
              <div
                className={`live-block ${step === 4 ? "current" : ""}`}
                onClick={() => jumpToStep(4)}
              >
                <div className="live-block-title">
                  <span>05 · {isPt ? "Responsável" : "Contact"}</span>
                  <span className="live-edit-hint">{isPt ? "Ir" : "Go"} →</span>
                </div>
                <p className="live-block-primary">
                  {data.personal.name || (isPt ? "Identificação na etapa 05" : "Details in step 05")}
                </p>
                {data.contact.email && <p className="live-block-sub">{data.contact.email}</p>}
              </div>
            </div>

            <div className="live-dossier-footer">
              <p>
                {isPt
                  ? "Na última etapa, você poderá exportar ou imprimir o documento completo deste briefing."
                  : "In the final step, you can export or print the full consolidated briefing document."}
              </p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
