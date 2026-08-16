import Link from "next/link";
import { requireAdmin } from "@/lib/admin-auth";
import { getSupabaseServerClient } from "@/lib/supabase";
import { logoutAction } from "../actions";

const PAGE_SIZE = 20;
const options = {
  primary_need: { "new-brand": "Nova marca", "visual-identity": "Identidade visual", rebranding: "Rebranding", website: "Website", unsure: "Ainda não sei" },
  stage: { starting: "Começando", operating: "Em operação", growing: "Crescendo", established: "Estabelecida" },
  timeline: { "no-specific-date": "Sem data definida", "within-one-month": "Em até um mês", "one-two-months": "1–2 meses", "two-three-months": "2–3 meses", "more-than-three-months": "Mais de 3 meses", "specific-date": "Data específica" },
} as const;
type Filter = keyof typeof options;
type BriefingRow = { id: string; created_at: string; name: string; business_name: string | null; email: string; phone: string | null; primary_need: string; stage: string; timeline: string };
const label = (group: Filter, value: string | null) => value ? (options[group] as Record<string, string>)[value] || value : "—";

export default async function BriefingsPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  await requireAdmin();
  const params = await searchParams;
  const value = (key: string) => typeof params[key] === "string" ? params[key] : "";
  const query = value("q").trim().slice(0, 100);
  const page = Math.max(1, Number.parseInt(value("page"), 10) || 1);
  const selected = Object.fromEntries((Object.keys(options) as Filter[]).map((key) => [key, value(key)])) as Record<Filter, string>;
  const supabase = getSupabaseServerClient();
  let rows: BriefingRow[] = [], count = 0, failed = !supabase;
  if (supabase) {
    let request = supabase.from("briefings").select("id,created_at,name,business_name,email,phone,primary_need,stage,timeline", { count: "exact" }).order("created_at", { ascending: false });
    if (query) {
      const safe = query.replace(/[,%().]/g, " ").replace(/\s+/g, " ").trim();
      if (safe) request = request.or(`name.ilike.*${safe}*,business_name.ilike.*${safe}*,email.ilike.*${safe}*`);
    }
    for (const key of Object.keys(options) as Filter[]) if (selected[key] && selected[key] in options[key]) request = request.eq(key, selected[key]);
    const result = await request.range((page - 1) * PAGE_SIZE, page * PAGE_SIZE - 1);
    rows = (result.data || []) as BriefingRow[]; count = result.count || 0; failed = Boolean(result.error);
  }
  const pages = Math.max(1, Math.ceil(count / PAGE_SIZE));
  const href = (nextPage: number) => { const p = new URLSearchParams(); if (query) p.set("q", query); for (const key of Object.keys(options) as Filter[]) if (selected[key]) p.set(key, selected[key]); p.set("page", String(nextPage)); return `/admin/briefings?${p}`; };
  return <>
    <header className="admin-header"><div><p className="eyebrow">Administração</p><h1>Briefings</h1></div><form action={logoutAction}><button className="admin-text-button">Sair</button></form></header>
    <form className="admin-filters"><label className="admin-search">Buscar<input name="q" defaultValue={query} placeholder="Nome, empresa ou e-mail" /></label>{(Object.keys(options) as Filter[]).map((key) => <label key={key}>{key === "primary_need" ? "Necessidade" : key === "stage" ? "Etapa" : "Prazo"}<select name={key} defaultValue={selected[key]}><option value="">Todos</option>{Object.entries(options[key]).map(([id, name]) => <option key={id} value={id}>{name}</option>)}</select></label>)}<button className="button" type="submit">Filtrar</button></form>
    {failed ? <p className="admin-error">Não foi possível carregar os briefings. Tente novamente mais tarde.</p> : rows.length === 0 ? <p className="admin-empty">Nenhum briefing encontrado para estes filtros.</p> : <div className="admin-table-wrap"><table className="admin-table"><thead><tr><th>Enviado</th><th>Contato</th><th>Necessidade</th><th>Etapa e prazo</th><th><span className="sr-only">Abrir</span></th></tr></thead><tbody>{rows.map((item) => <tr key={item.id}><td>{new Intl.DateTimeFormat("pt-BR", { dateStyle: "short", timeStyle: "short" }).format(new Date(item.created_at))}</td><td><strong>{item.name}</strong><span>{item.business_name || "—"}</span><span>{item.email}{item.phone ? ` · ${item.phone}` : ""}</span></td><td>{label("primary_need", item.primary_need)}</td><td>{label("stage", item.stage)}<span>{label("timeline", item.timeline)}</span></td><td><Link className="link" href={`/admin/briefings/${item.id}`}>Ver</Link></td></tr>)}</tbody></table></div>}
    {count > PAGE_SIZE ? <nav className="admin-pagination" aria-label="Paginação"><span>Página {page} de {pages} · {count} registros</span>{page > 1 ? <Link className="link" href={href(page - 1)}>Anterior</Link> : null}{page < pages ? <Link className="link" href={href(page + 1)}>Próxima</Link> : null}</nav> : null}
  </>;
}
