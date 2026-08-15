import { ProjectCard } from "@/components/home";
import { getProjects } from "@/content/site";
import { isLocale, type Locale } from "@/lib/i18n";
import { notFound } from "next/navigation";

export default async function Projects({params}:{params:Promise<{locale:string}>}){const {locale}=await params;if(!isLocale(locale))notFound();return <div className="container"><header className="page-head"><span className="eyebrow">Fortunato Brands</span><h1>{locale==="pt"?"Projetos selecionados":"Selected projects"}</h1><p>{locale==="pt"?"Trabalhos construídos com clareza, intenção e presença visual.":"Work built with clarity, intention and visual presence."}</p></header><div className="project-grid section">{getProjects(locale).map(p=><ProjectCard key={p.slug} locale={locale as Locale} project={p}/>)}</div></div>}
