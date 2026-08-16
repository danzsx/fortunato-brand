import Link from "next/link";
import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/admin-auth";
import { getSupabaseServerClient } from "@/lib/supabase";

type Briefing = Record<string, unknown>;
const labels: Record<string, string> = {
  name: "Nome", role: "Cargo", role_other: "Outro cargo", email: "E-mail", phone: "Telefone", preferred_channel: "Canal preferido",
  business_name: "Nome do negócio", has_name: "Já possui nome", segment: "Segmento", stage: "Etapa", business_profile: "Perfil do negócio",
  primary_need: "Necessidade principal", naming_status: "Status do nome", existing_logo: "Logotipo existente", rebranding_reasons: "Motivos do rebranding", website_type: "Tipo de website", motivation: "Motivação", desired_change: "Mudança desejada", references_text: "Referências",
  timeline: "Prazo", specific_date: "Data desejada", locale: "Idioma",
};
const groups = [
  ["Contato", ["name", "role", "role_other", "email", "phone", "preferred_channel"]],
  ["Negócio", ["business_name", "has_name", "segment", "stage", "business_profile"]],
  ["Projeto", ["primary_need", "naming_status", "existing_logo", "rebranding_reasons", "website_type", "motivation", "desired_change", "references_text"]],
  ["Planejamento", ["timeline", "specific_date"]],
] as const;

function print(value: unknown): string {
  if (value === null || value === undefined || value === "") return "—";
  if (typeof value === "boolean") return value ? "Sim" : "Não";
  if (Array.isArray(value)) return value.join(", ") || "—";
  if (typeof value === "object") return JSON.stringify(value);
  return String(value).replaceAll("-", " ");
}

function ExtraFields({ raw }: { raw: unknown }) {
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) return null;
  const structured = new Set(Object.keys(labels));
  const extras = Object.entries(raw as Record<string, unknown>).filter(([key, value]) => !structured.has(key) && value !== "" && value !== undefined);
  if (!extras.length) return null;
  return <section className="admin-detail-section"><h2>Informações complementares</h2><dl>{extras.map(([key, value]) => <div key={key}><dt>{key.replace(/([A-Z])/g, " $1")}</dt><dd>{typeof value === "object" ? <pre>{JSON.stringify(value, null, 2)}</pre> : print(value)}</dd></div>)}</dl></section>;
}

export default async function BriefingDetailPage({ params }: { params: Promise<{ id: string }> }) {
  await requireAdmin();
  const { id } = await params;
  const supabase = getSupabaseServerClient();
  if (!supabase) return <p className="admin-error">Não foi possível carregar o briefing. Tente novamente mais tarde.</p>;
  const { data, error } = await supabase.from("briefings").select("*").eq("id", id).maybeSingle();
  if (error) return <p className="admin-error">Não foi possível carregar o briefing. Tente novamente mais tarde.</p>;
  if (!data) notFound();
  const briefing = data as Briefing;
  return <>
    <header className="admin-header admin-detail-head"><div><Link className="link" href="/admin/briefings">← Todos os briefings</Link><p className="eyebrow">Enviado em {briefing.created_at ? new Intl.DateTimeFormat("pt-BR", { dateStyle: "long", timeStyle: "short" }).format(new Date(String(briefing.created_at))) : "—"}</p><h1>{print(briefing.name)}</h1></div></header>
    <div className="admin-detail-grid">{groups.map(([title, fields]) => <section className="admin-detail-section" key={title}><h2>{title}</h2><dl>{fields.map((field) => <div key={field}><dt>{labels[field]}</dt><dd>{print(briefing[field])}</dd></div>)}</dl></section>)}</div>
    <ExtraFields raw={briefing.raw_data} />
  </>;
}
