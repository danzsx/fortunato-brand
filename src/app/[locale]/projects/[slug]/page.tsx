import Link from "next/link";
import Image from "next/image";
import { getProject, getProjects } from "@/content/site";
import { isLocale, localPath, type Locale } from "@/lib/i18n";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export function generateStaticParams() {
  return ["pt", "en"].flatMap((locale) =>
    getProjects().map((project) => ({ locale, slug: project.slug }))
  );
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const p = getProject(slug, locale);
  if (!p) return {};

  return {
    title: `${p.name} — Fortunato Brands`,
    description: p.intro,
    alternates: {
      canonical: localPath(locale, `/projects/${slug}`),
      languages: {
        "pt-BR": localPath("pt", `/projects/${slug}`),
        en: localPath("en", `/projects/${slug}`)
      }
    }
  };
}

export default async function Case({
  params
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();

  const currentLocale = locale as Locale;
  const p = getProject(slug, currentLocale);
  if (!p) notFound();

  const next = getProject(p.next, currentLocale)!;
  const isContain = p.heroImage.fit === "contain";

  return (
    <>
      <header className="container case-title">
        <div>
          <span className="eyebrow">
            0{p.order} · {p.segment}
          </span>
          <h1>{p.name}</h1>
        </div>
        <div>
          <p>{p.intro}</p>
          <ul className="case-facts">
            {p.services.map((service) => (
              <li key={service}>{service}</li>
            ))}
          </ul>
        </div>
      </header>

      <div className="container">
        <div className={`case-hero-container ${p.tone} ${isContain ? "visual-contain" : ""}`}>
          <Image
            src={p.heroImage.src}
            alt={p.heroImage.alt}
            width={p.heroImage.width}
            height={p.heroImage.height}
            priority
            sizes="(max-width: 768px) 100vw, 1440px"
            className={`case-hero-img ${isContain ? "object-contain" : "object-cover"}`}
          />
        </div>
      </div>

      <article className="container case-content">
        <span className="eyebrow">{locale === "pt" ? "Projeto" : "Project"}</span>
        <h2>{locale === "pt" ? "O que foi desenvolvido" : "What was developed"}</h2>
        <p>{p.facts.join(". ")}.</p>
      </article>

      {p.sections && p.sections.length > 0 && (
        <div className="container case-sections">
          {p.sections.map((section) => (
            <section key={section.id} className="case-section-item">
              <div className="case-section-media">
                <Image
                  src={section.media.src}
                  alt={section.media.alt}
                  width={section.media.width}
                  height={section.media.height}
                  sizes="(max-width: 768px) 100vw, 1200px"
                  className="case-section-img"
                />
              </div>
              {(section.title || section.body) && (
                <div className="case-section-copy">
                  {section.title && <h3>{section.title}</h3>}
                  {section.body && <p>{section.body}</p>}
                </div>
              )}
            </section>
          ))}
        </div>
      )}

      <section className="container next-project">
        <span className="eyebrow">
          {locale === "pt" ? "Próximo projeto" : "Next project"}
        </span>
        <h2>
          <Link className="link" href={`/${locale}/projects/${next.slug}`}>
            {next.name} →
          </Link>
        </h2>
      </section>

      <section className="final section">
        <div className="container">
          <h2>
            {locale === "pt"
              ? "Tem um projeto em mente?"
              : "Have a project in mind?"}
          </h2>
          <Link className="button" href={`/${locale}/start`}>
            {locale === "pt" ? "Começar um projeto" : "Start a project"}
          </Link>
        </div>
      </section>
    </>
  );
}
