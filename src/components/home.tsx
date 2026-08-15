import Link from "next/link";
import Image from "next/image";
import { copy, getProjects, type Project } from "@/content/site";
import type { Locale } from "@/lib/i18n";

export function ProjectCard({
  locale,
  project
}: {
  locale: Locale;
  project: Project;
}) {
  const isFirst = project.order === 1;
  const isContain = project.cardImage.fit === "contain";

  return (
    <article className="project">
      <Link href={`/${locale}/projects/${project.slug}`}>
        <div className={`project-visual ${project.tone} ${isContain ? "visual-contain" : ""}`}>
          <Image
            src={project.cardImage.src}
            alt={project.cardImage.alt}
            fill
            sizes={isFirst ? "(max-width: 768px) 100vw, 1440px" : "(max-width: 768px) 100vw, 700px"}
            priority={isFirst}
            className={`project-image ${isContain ? "object-contain" : "object-cover"}`}
          />
        </div>
        <div className="project-meta">
          <h3>{project.name}</h3>
          <p>
            {String(project.order).padStart(2, "0")} · {project.segment}
          </p>
          <p>{project.services.join(" · ")}</p>
        </div>
      </Link>
    </article>
  );
}

export function Home({ locale }: { locale: Locale }) {
  const t = copy(locale);
  const projects = getProjects(locale);

  return (
    <>
      <section className="container hero">
        <h1>{t.hero.title}</h1>
        <div className="hero-bottom">
          <p>{t.hero.body}</p>
          <div className="actions">
            <Link className="button" href={`/${locale}/start`}>
              {t.hero.primary}
            </Link>
            <Link className="link" href={`/${locale}/projects`}>
              {t.hero.secondary} →
            </Link>
          </div>
        </div>
      </section>

      <section className="container section">
        <div className="projects-intro">
          <span className="eyebrow">{t.projects}</span>
          <span className="eyebrow">01—03</span>
        </div>
        <div className="project-grid">
          {projects.map((project) => (
            <ProjectCard key={project.slug} locale={locale} project={project} />
          ))}
        </div>
      </section>

      <section className="manifesto section">
        <div className="container">
          <h2>{t.manifesto.title}</h2>
          <p className="body">{t.manifesto.body}</p>
        </div>
      </section>

      <section className="container section">
        <span className="eyebrow">{t.services.label}</span>
        <h2>{t.services.title}</h2>
        {t.services.items.map((item, index) => (
          <article className="service-feature" key={item.title}>
            <span className="eyebrow">0{index + 1}</span>
            <h3>{item.title}</h3>
            <p>{item.body}</p>
          </article>
        ))}
      </section>

      <section className="container section">
        <h2>{t.process.title}</h2>
        <div className="process">
          {t.process.items.map((item, index) => (
            <div key={item.title}>
              <span className="eyebrow">0{index + 1}</span>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container section about">
        <h2>{t.about.title}</h2>
        <p>{t.about.body}</p>
      </section>

      <section className="final section">
        <div className="container">
          <h2>{t.final.title}</h2>
          <Link className="button" href={`/${locale}/start`}>
            {t.final.action}
          </Link>
        </div>
      </section>
    </>
  );
}
