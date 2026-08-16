import { z } from "zod";

const text = (max: number) => z.string().trim().max(max);

export const briefingSchema = z.object({
  locale: z.enum(["pt-BR", "en"]),
  honeypot: z.string().optional(),
  personal: z.object({
    name: text(100).min(1, "Informe seu nome."),
    role: z.enum(["owner", "partner", "marketing", "other"]).optional(),
    roleOther: text(100).optional(),
  }),
  business: z.object({
    name: text(140).optional(),
    hasName: z.boolean(),
    segment: text(140).min(1, "Informe o segmento de atuação."),
    stage: z.enum(["starting", "operating", "growing", "established"]),
    presence: z.array(z.string()).max(7).optional(),
    presenceOther: text(140).optional(),
  }),
  project: z.object({
    primaryNeed: z.enum(["new-brand", "visual-identity", "rebranding", "website", "unsure"]),
    namingStatus: z.enum(["has-name", "needs-name", "deciding"]).optional(),
    existingLogo: z.enum(["yes", "no", "temporary"]).optional(),
    rebrandingReasons: z.array(text(80)).max(7).optional(),
    rebrandingReasonsOther: text(200).optional(),
    websiteType: z.enum(["institutional", "landing-page", "portfolio", "unsure", "other"]).optional(),
    websiteTypeOther: text(140).optional(),
    motivation: text(1500).min(1, "Conte brevemente o que motivou o projeto."),
    desiredChange: text(1500).optional(),
    references: text(1500).optional(),
  }),
  planning: z.object({
    timeline: z.enum([
      "no-specific-date",
      "within-one-month",
      "one-two-months",
      "two-three-months",
      "more-than-three-months",
      "specific-date",
    ]),
    specificDate: z.string().date().optional(),
  }),
  contact: z.object({
    email: z.string().trim().email("Digite um e-mail válido.").max(254),
    phone: text(40).optional(),
    preferredChannel: z.enum(["whatsapp", "email", "either"]),
    businessProfile: text(300).optional(),
    source: z.enum(["instagram", "behance", "google", "referral", "project", "other"]).optional(),
    sourceOther: text(140).optional(),
  }),
  consent: z.object({
    privacyAccepted: z.literal(true, {
      errorMap: () => ({ message: "É necessário aceitar a política de privacidade." }),
    }),
  }),
}).superRefine((data, ctx) => {
  const add = (path: (string | number)[], message: string) =>
    ctx.addIssue({ code: z.ZodIssueCode.custom, path, message });

  if (data.business.hasName && !data.business.name) {
    add(["business", "name"], "Informe o nome do negócio.");
  }
  if (data.project.primaryNeed === "new-brand" && !data.project.namingStatus) {
    add(["project", "namingStatus"], "Escolha o status do nome da marca.");
  }
  if (data.project.primaryNeed === "visual-identity" && !data.project.existingLogo) {
    add(["project", "existingLogo"], "Informe se já possui logotipo.");
  }
  if (data.project.primaryNeed === "rebranding" && !data.project.rebrandingReasons?.length) {
    add(["project", "rebrandingReasons"], "Escolha ao menos um motivo para o rebranding.");
  }
  if (data.project.primaryNeed === "website" && !data.project.websiteType) {
    add(["project", "websiteType"], "Escolha o tipo de website.");
  }
  if (data.planning.timeline === "specific-date" && !data.planning.specificDate) {
    add(["planning", "specificDate"], "Informe a data limite desejada.");
  }
});

export type BriefingDraft = Omit<z.infer<typeof briefingSchema>, "consent"> & {
  consent: { privacyAccepted: boolean };
};

export const needs = (data: Partial<BriefingDraft>) => ({
  namingStatus: data.project?.primaryNeed === "new-brand",
  existingLogo: data.project?.primaryNeed === "visual-identity",
  rebrandingReasons: data.project?.primaryNeed === "rebranding",
  websiteType: data.project?.primaryNeed === "website",
  specificDate: data.planning?.timeline === "specific-date",
});

export function emptyDraft(locale: "pt-BR" | "en"): BriefingDraft {
  return {
    locale,
    honeypot: "",
    personal: { name: "", role: "owner" },
    business: { name: "", hasName: true, segment: "", stage: "starting", presence: [] },
    project: { primaryNeed: "visual-identity", motivation: "" },
    planning: { timeline: "no-specific-date" },
    contact: { email: "", phone: "", preferredChannel: "whatsapp", businessProfile: "" },
    consent: { privacyAccepted: false },
  };
}

export function normalizedDraft<T extends BriefingDraft>(data: T): T {
  const result = structuredClone(data);
  const show = needs(result);
  if (!show.namingStatus) delete result.project.namingStatus;
  if (!show.existingLogo) delete result.project.existingLogo;
  if (!show.rebrandingReasons) {
    delete result.project.rebrandingReasons;
    delete result.project.rebrandingReasonsOther;
  }
  if (!show.websiteType) {
    delete result.project.websiteType;
    delete result.project.websiteTypeOther;
  }
  if (!show.specificDate) delete result.planning.specificDate;
  return result;
}
